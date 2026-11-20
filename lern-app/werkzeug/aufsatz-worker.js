// Cloudflare Worker: Aufsatzkorrektur für die Lern-App "Lern-Helden".
// Einrichten: Cloudflare-Dashboard → Workers & Pages → Worker erstellen → diesen Code einfügen → Deploy.
// Danach unter Einstellungen → Variablen und Geheimnisse → Geheimnis "ANTHROPIC_API_KEY" anlegen.
// Der Schlüssel bleibt nur hier im Worker gespeichert – nie in der App.

const FIREBASE_PROJEKT = "lernheld-e261d";
const ERLAUBTE_KONTEN = ["valentin@johannesfelling.at", "elias@johannesfelling.at", "papa@johannesfelling.at"];
const ERLAUBTE_HERKUNFT = ["https://johannesfelling.github.io"];
const MODELL = "claude-opus-5-5";

const SCHEMA = {
  type: "object",
  properties: {
    lesbar: { type: "boolean" },
    originaltext: { type: "string" },
    korrigierter_text: { type: "string" },
    fehler: {
      type: "array",
      items: {
        type: "object",
        properties: {
          original: { type: "string" },
          korrektur: { type: "string" },
          art: { type: "string", enum: ["Rechtschreibung", "Grammatik", "Zeichensetzung", "Ausdruck", "Inhalt"] },
          erklaerung: { type: "string" },
        },
        required: ["original", "korrektur", "art", "erklaerung"],
        additionalProperties: false,
      },
    },
    lob: { type: "string" },
    tipps: { type: "array", items: { type: "string" } },
    einschaetzung: { type: "string" },
  },
  required: ["lesbar", "originaltext", "korrigierter_text", "fehler", "lob", "tipps", "einschaetzung"],
  additionalProperties: false,
};

const SYSTEM = `Du bist eine freundliche, genaue Deutschlehrerin an einer österreichischen Mittelschule/AHS-Unterstufe (Schüler ca. 12–13 Jahre).
Du bekommst das Foto eines handgeschriebenen Aufsatzes.
1. Schreib den Text so genau wie möglich ab (originaltext) – mit allen Fehlern, nichts verbessern. Unleserliche Stellen als [unleserlich].
2. Finde Fehler in Rechtschreibung, Grammatik, Zeichensetzung und Ausdruck. Jeder Fehler: das falsche Wort/die Stelle (original), die Verbesserung, die Art und eine kurze, kindgerechte Erklärung (1 Satz, österreichisches Deutsch, Regel nennen wenn möglich).
3. korrigierter_text: der ganze Aufsatz mit allen Verbesserungen, Inhalt und Stil des Kindes so weit wie möglich behalten.
4. lob: 1–2 Sätze, was wirklich gut gelungen ist (konkret).
5. tipps: 2–4 konkrete Tipps für den nächsten Aufsatz (Aufbau, Einleitung/Schluss, Wortwahl, Absätze …), passend zur Aufgabenstellung falls angegeben.
6. einschaetzung: 1–2 Sätze, ehrliche, ermutigende Gesamteinschätzung. Keine Schulnote.
Wenn auf dem Bild kein lesbarer Aufsatz ist: lesbar=false und erkläre in einschaetzung, was das Kind besser machen soll (z. B. heller fotografieren). Andere Felder dann leer.`;

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": ERLAUBTE_HERKUNFT.includes(origin) ? origin : ERLAUBTE_HERKUNFT[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}
const antwort = (obj, status, origin) => new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...cors(origin) } });

// --- Firebase-Anmeldung prüfen (nur angemeldete Kinder dürfen korrigieren lassen) ---
let schluesselCache = null, schluesselBis = 0;
async function googleSchluessel() {
  if (schluesselCache && Date.now() < schluesselBis) return schluesselCache;
  const r = await fetch("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com");
  const j = await r.json();
  schluesselCache = j.keys; schluesselBis = Date.now() + 3600 * 1000;
  return schluesselCache;
}
const b64url = s => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")), c => c.charCodeAt(0));
async function tokenPruefen(token) {
  const [h, p, sig] = token.split(".");
  if (!sig) throw new Error("kein Token");
  const kopf = JSON.parse(new TextDecoder().decode(b64url(h)));
  const daten = JSON.parse(new TextDecoder().decode(b64url(p)));
  const jwk = (await googleSchluessel()).find(k => k.kid === kopf.kid);
  if (!jwk || kopf.alg !== "RS256") throw new Error("Schlüssel unbekannt");
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64url(sig), new TextEncoder().encode(`${h}.${p}`));
  const jetzt = Date.now() / 1000;
  if (!ok || daten.aud !== FIREBASE_PROJEKT || daten.iss !== `https://securetoken.google.com/${FIREBASE_PROJEKT}` || daten.exp < jetzt || daten.iat > jetzt + 300) throw new Error("Token ungültig");
  if (!ERLAUBTE_KONTEN.includes((daten.email || "").toLowerCase())) throw new Error("Konto nicht erlaubt");
  return daten.email;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(origin) });
    if (request.method !== "POST") return antwort({ fehler: "Nur POST" }, 405, origin);
    if (!ERLAUBTE_HERKUNFT.includes(origin)) return antwort({ fehler: "Herkunft nicht erlaubt" }, 403, origin);
    try {
      await tokenPruefen((request.headers.get("Authorization") || "").replace(/^Bearer /, ""));
    } catch (e) {
      return antwort({ fehler: "Bitte zuerst in der App anmelden." }, 401, origin);
    }
    let eingabe;
    try { eingabe = await request.json(); } catch (e) { return antwort({ fehler: "Ungültige Anfrage" }, 400, origin); }
    const bild = String(eingabe.bild || "");
    if (!bild || bild.length > 6_000_000) return antwort({ fehler: "Bild fehlt oder ist zu groß." }, 400, origin);
    const aufgabe = String(eingabe.aufgabe || "").slice(0, 500);

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2026-10-21",
        "anthropic-beta": "server-side-fallback-2026-07-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODELL,
        max_tokens: 16000,
        fallbacks: "default",
        system: SYSTEM,
        output_config: { effort: "medium", format: { type: "json_schema", schema: SCHEMA } },
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: bild } },
            { type: "text", text: aufgabe ? `Aufgabenstellung: ${aufgabe}` : "Keine Aufgabenstellung angegeben." },
          ],
        }],
      }),
    });
    const j = await r.json();
    if (!r.ok) return antwort({ fehler: "Die Korrektur hat gerade nicht geklappt. Bitte später nochmal probieren.", detail: j.error && j.error.message }, 502, origin);
    if (j.stop_reason === "refusal") return antwort({ fehler: "Dieses Bild konnte nicht korrigiert werden." }, 422, origin);
    const text = (j.content || []).filter(b => b.type === "text").map(b => b.text).join("");
    try { return antwort({ ergebnis: JSON.parse(text) }, 200, origin); }
    catch (e) { return antwort({ fehler: "Die Antwort war unvollständig. Bitte nochmal probieren." }, 502, origin); }
  },
};
