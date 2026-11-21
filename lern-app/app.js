// VALIAS PRO – Lern-App für Valentin und Elias.
// Ohne firebase-config.js: Fortschritt nur im Browser. Mit Firebase: Anmeldung + Online-Spielstand.
const PERSONEN = [
  { id: "valentin", name: "Valentin", emo: "🦸‍♂️", thema: "held", slogan: "Hero Training Program",
    lob: ["Brilliant.", "Mission accomplished.", "Splendid!", "Avengers-Niveau.", "Spidey-Sinn stimmt.", "Thor wäre stolz.", "Stark wie Stark."],
    raenge: ["Rookie", "Held", "Superheld", "Avenger", "Legende", "Gott des Donners"],
    punkt: { zeichen: "⚡", icon: "hammer" } },
  { id: "elias", name: "Elias", emo: "⚽", thema: "sport", slogan: "Matchday Academy",
    lob: ["TOOOR!", "Back of the net!", "Weltklasse-Pass.", "Hattrick-reif.", "Was für ein Volley!", "Man of the Match.", "Top-Corner."],
    raenge: ["Nachwuchs", "Stammspieler", "Kapitän", "Nationalspieler", "Weltstar", "GOAT"],
    punkt: { zeichen: "⚽", icon: "ball" } },
];
const FAECHER = [
  { id: "deutsch", name: "Deutsch" }, { id: "englisch", name: "Englisch" }, { id: "spanisch", name: "Spanisch" },
  { id: "mathe", name: "Mathe" }, { id: "dg", name: "Darstellende Geometrie" },
  { id: "biologie", name: "Biologie" }, { id: "physik", name: "Physik" }, { id: "chemie", name: "Chemie" },
  { id: "geografie", name: "Geografie" }, { id: "geschichte", name: "Geschichte" },
  { id: "informatik", name: "Informatik" }, { id: "digital", name: "Digitale Grundbildung" },
  { id: "musik", name: "Musik" }, { id: "kunst", name: "Kunst" }, { id: "technik", name: "Technik & Design" },
];
// Fächer pro Kind (österr. AHS-Lehrplan): Valentin 2. Klasse Gymnasium, Elias 5. Klasse Realgymnasium
const FAECHER_VON = {
  valentin: ["englisch", "mathe", "deutsch", "biologie", "geografie", "geschichte", "physik", "digital", "musik", "kunst", "technik"],
  elias: ["englisch", "spanisch", "mathe", "deutsch", "biologie", "physik", "chemie", "geografie", "geschichte", "informatik", "dg", "musik", "kunst"],
};
const faecherVon = pid => (FAECHER_VON[pid] || []).map(id => FAECHER.find(f => f.id === id));
const ICONS = {
  englisch: '<path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c-1 4-4 7-7 8"/><path d="M13 21l4-10 4 10M14.5 17h5"/>',
  mathe: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
  biologie: '<path d="M5 21c0-9 5-15 15-16-1 10-7 15-15 16z"/><path d="M5 21l8-8"/>',
  deutsch: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2v-1.5z"/><path d="M8 7h8M8 11h6"/>',
  geografie: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  spanisch: '<path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c-1 4-4 7-7 8"/><path d="M13 21l4-10 4 10M14.5 17h5"/>',
  dg: '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 22V12M21 7l-9 5-9-5"/>',
  physik: '<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  chemie: '<path d="M9 2h6M10 2v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 8V2"/><path d="M7 15h10"/>',
  geschichte: '<path d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2"/>',
  informatik: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/>',
  digital: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  musik: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  kunst: '<path d="M12 22a10 10 0 1 1 10-10c0 3-2 4-4 4h-2a2 2 0 0 0-1 3.7A2 2 0 0 1 12 22z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16.5" cy="10.5" r="1"/>',
  technik: '<path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L2 10l8-8z"/>',
  hammer: '<path d="M3.5 4.5L5 3h14l1.5 1.5v6L19 12H5l-1.5-1.5z"/><path d="M6.5 5.5h11v4h-11z" fill="currentColor" stroke="none"/><path d="M10.5 12h3v7h-3z"/><path d="M10.5 14l3 1.5M10.5 16.5l3 1.5"/><path d="M10 19h4v1.5h-4z"/><path d="M12 20.5c-2 0-3 1-3 2M12 20.5c2 0 3 1 3 2"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5l3.2 2.3-1.2 3.7h-4l-1.2-3.7z" fill="currentColor"/><path d="M12 7.5V3.2M15.2 9.8l4-1.5M14 13.5l2.5 3.6M10 13.5l-2.5 3.6M8.8 9.8l-4-1.5"/>',
  flamme: '<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-4 5-4 7-1-1-2-2-2-4-2 2-3 5-3 9 0 4 3 7 7 7z"/>',
  test: '<path d="M9 3h6l1 2h3v16H5V5h3z"/><path d="M9 13l2 2 4-4"/>',
  schloss: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  haken: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 0 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 1 0-4V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
  auge: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
  wissen: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  kamera: '<path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/>',
  mikro: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>',
};
const ic = (n) => { const w = document.createElement("span"); w.innerHTML = `<svg class="ic" viewBox="0 0 24 24">${ICONS[n] || ""}</svg>`; return w.firstChild; };
const RUNDE = 10;
const PUNKT_STD = { zeichen: "⭐", icon: "stern" };
const pk = pid => (PERSONEN.find(p => p.id === pid) || {}).punkt || PUNKT_STD;
const pIcon = (pid, cls) => window.KUNST ? (pk(pid).icon === "hammer" ? KUNST.hammer(cls) : KUNST.ball(cls)) : ic(pk(pid).icon);
const punkte = (pid, n) => el("span", { class: "pkt" }, String(n), pIcon(pid));
const pktIc = pid => el("span", { class: "pkt" }, pIcon(pid));
const PROFIL = "_profil";
let BELOHNUNG = {
  stufen: [{sterne: 100, belohnung: "🍫 Süßigkeit nach Wahl (bis 2 €)"}, {sterne: 250, belohnung: "🥤 Softdrink nach Wahl (bis 1,50 €)"}, {sterne: 1000, belohnung: "🍝 Lieblingsessen"}, {sterne: 2000, belohnung: "🎬 Kinoabend – du suchst den Film aus"}, {sterne: 5000, belohnung: "🎁 Überraschung (Papa wählt)"}],
  serie: { tage: 7, belohnung: "🍫 Süßigkeit nach Wahl (bis 2 €)" },
  test: { belohnung: "🥤 Softdrink nach Wahl (bis 1,50 €)" },
};

const app = document.getElementById("app");
const zeige = (...kids) => { app.replaceChildren(...kids.filter(k => k != null)); window.scrollTo(0, 0); };
const titel = document.getElementById("titel");
const zurueck = document.getElementById("zurueck");
const sterneTop = document.getElementById("sterne-top");
let person = null, fach = null, daten = null, runde = null, zurueckZiel = null, gast = false, gastStand = {};

// ---------- Speicher ----------
const key = (p, f) => `lernhelden:${p}:${f}`;
function lokalLaden(p, f) { try { return JSON.parse(localStorage.getItem(key(p, f))); } catch (e) { return null; } }
function roh(p, f) {
  if (gast) return gastStand[f];
  if (wolke && wolke.kind === p) return wolke.stand[f];
  return lokalLaden(p, f);
}
const kopie = o => JSON.parse(JSON.stringify(o || {}));
function laden(p, f) { return Object.assign({ sterne: 0, runden: 0, perfekt: 0, offen: [], gesehen: {} }, kopie(roh(p, f))); }
const PROFIL_LEER = () => ({ tage: [], gutscheine: [], stufen: [], serien: [], tests: {}, zeit: {}, log: [], gelesen: {}, gespraeche: {} });
function profil(p) { return Object.assign(PROFIL_LEER(), kopie(roh(p, PROFIL))); }
function uhrzeit() { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }
function protokoll(pr, e) { pr.log.push(Object.assign({ d: heute(), t: uhrzeit() }, e)); pr.log = pr.log.slice(-200); }
// Lernzeit: alle 15 s, solange die App offen ist und in den letzten 2 Minuten etwas getippt wurde
let letzteAktion = Date.now();
["click", "keydown", "touchstart"].forEach(ev => addEventListener(ev, () => { letzteAktion = Date.now(); }, { passive: true }));
setInterval(() => {
  if (!person || gast || document.visibilityState !== "visible" || Date.now() - letzteAktion > 120000) return;
  const pr = profil(person.id), z = pr.zeit[heute()] || (pr.zeit[heute()] = {});
  z.ges = (z.ges || 0) + 15;
  if (fach) z[fach.id] = (z[fach.id] || 0) + 15;
  const tage = Object.keys(pr.zeit).sort(); while (tage.length > 120) delete pr.zeit[tage.shift()];
  speichern(person.id, PROFIL, pr);
}, 15000);
function speichern(p, f, s) {
  if (gast) { gastStand[f] = kopie(s); return; }
  try { localStorage.setItem(key(p, f), JSON.stringify(s)); } catch (e) {}
  if (wolke && wolke.kind === p) { wolke.stand[f] = s; wolkeSichern(); }
}
const sterneGesamt = p => faecherVon(p).reduce((n, f) => n + laden(p, f.id).sterne, 0);

// ---------- Belohnungen ----------
function heute(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function serie(pr) {
  const tage = new Set(pr.tage);
  const d = new Date();
  if (!tage.has(heute(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (tage.has(heute(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function rang(p, sterne) {
  const st = [0, ...BELOHNUNG.stufen.map(s => s.sterne)];
  let i = 0; while (i + 1 < st.length && sterne >= st[i + 1]) i++;
  const namen = p.raenge;
  return { name: namen[Math.min(i, namen.length - 1)], ab: st[i], naechste: st[i + 1] ?? null, naechsterName: namen[Math.min(i + 1, namen.length - 1)] };
}
function code() { const z = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; let c = ""; for (let i = 0; i < 6; i++) c += z[Math.floor(Math.random() * z.length)]; return `${person.id[0].toUpperCase()}-${c}`; }
function gutscheinGeben(pr, was, grund) {
  const g = { code: code(), was, grund, datum: heute() };
  pr.gutscheine.push(g);
  return g;
}
// nach jeder Runde / jedem Test aufrufen; gibt neue Gutscheine zurück
function belohnungenPruefen(extra) {
  const pr = profil(person.id);
  const neu = [];
  if (!pr.tage.includes(heute())) {
    pr.tage.push(heute());
    pr.tage = pr.tage.slice(-60);
    const n = serie(pr);
    if (n > 0 && n % BELOHNUNG.serie.tage === 0) { pr.serien.push(heute()); neu.push(gutscheinGeben(pr, BELOHNUNG.serie.belohnung, `${n} Tage hintereinander geübt 🔥`)); }
  }
  const st = sterneGesamt(person.id);
  for (const s of BELOHNUNG.stufen) {
    if (st >= s.sterne && !pr.stufen.includes(s.sterne)) { pr.stufen.push(s.sterne); neu.push(gutscheinGeben(pr, s.belohnung, `Stufe ${s.sterne} erreicht ${pk(person.id).zeichen}`)); }
  }
  if (extra) extra(pr, neu);
  speichern(person.id, PROFIL, pr);
  return neu;
}

// ---------- Hilfen ----------
const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") e.className = v; else if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v);
  }
  for (const k of kids.flat(Infinity)) if (k != null && k !== false) e.append(k.nodeType ? k : document.createTextNode(k));
  return e;
};
const mischen = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const zufall = a => a[Math.floor(Math.random() * a.length)];
const norm = t => String(t).toLowerCase().replace(/[’`´]/g, "'").replace(/[.!?;:]+$/g, "").replace(/\s+/g, " ").trim();
function zahl(t) { const s = String(t).replace(/\s/g, "").replace(",", "."); return s !== "" && !isNaN(s) ? Number(s) : null; }
function stimmt(eingabe, antworten) {
  antworten = [].concat(antworten);
  const n = norm(eingabe), z = zahl(eingabe);
  return antworten.some(a => norm(a) === n || (z !== null && zahl(a) !== null && Math.abs(zahl(a) - z) < 1e-9));
}
// ---------- Mündlich antworten (Spracherkennung) ----------
const FACH_SPRACHE = { englisch: "en-GB", spanisch: "es-ES", franzoesisch: "fr-FR", italienisch: "it-IT" };
function antwortSprache(q) {
  if (q.sprache) return q.sprache;
  const fs = FACH_SPRACHE[fach.id];
  if (!fs) return "de-AT";
  return /auf deutsch|ins deutsche|deutsche[ns]? (wort|bedeutung|übersetzung)/i.test(q.frage) ? "de-AT" : fs;
}
function muendlich() { return !!SR && profil(person.id).modus === "muendlich"; }
function zuhoeren(lang, knopf, fertig, info) {
  const r = new SR(); r.lang = lang; r.interimResults = false; r.maxAlternatives = 5;
  let ergebnis = false;
  knopf.classList.add("an");
  r.onresult = e => { ergebnis = true; fertig([...e.results[0]].map(a => a.transcript.trim())); };
  r.onerror = e => { if (info) info.replaceChildren(el("div", { class: "feedback neutral" }, e.error === "not-allowed" ? "Bitte erlaube das Mikrofon (Schloss-Symbol neben der Adresse)." : "Nichts verstanden – tippe aufs Mikrofon und sag es nochmal.")); };
  r.onend = () => { knopf.classList.remove("an"); };
  try { r.start(); } catch (e) { knopf.classList.remove("an"); }
  return r;
}
const ZAHLWORT = { a: 0, b: 1, c: 2, d: 3, e: 4, eins: 0, erste: 0, erstens: 0, zwei: 1, zweite: 1, drei: 2, dritte: 2, vier: 3, vierte: 3, "1": 0, "2": 1, "3": 2, "4": 3, one: 0, two: 1, three: 2, four: 3, uno: 0, dos: 1, tres: 2, cuatro: 3 };
function optionFinden(alts, opts) {
  for (const a of alts) {
    const n = norm(a).replace(/[,]/g, "");
    let i = opts.findIndex(o => norm(o).replace(/[,]/g, "") === n);
    if (i >= 0) return i;
    const m = n.match(/^(?:antwort |nummer |buchstabe |letter |option )?([a-e]|eins|erste|erstens|zwei|zweite|drei|dritte|vier|vierte|[1-4]|one|two|three|four|uno|dos|tres|cuatro)$/);
    if (m && ZAHLWORT[m[1]] < opts.length) return ZAHLWORT[m[1]];
    const treffer = opts.map((o, k) => [k, norm(o)]).filter(([k, o]) => o.length > 2 && (n.includes(o) || (n.length > 3 && o.includes(n))));
    if (treffer.length === 1) return treffer[0][0];
  }
  return -1;
}
function modusWahl() {
  if (!SR) return el("p", { class: "klein mitte" }, "Mündlich antworten geht in diesem Browser nicht (am besten Chrome verwenden).");
  const pr = profil(person.id), m = pr.modus === "muendlich" ? "muendlich" : "schrift";
  const setze = w => { const p2 = profil(person.id); p2.modus = w; speichern(person.id, PROFIL, p2); fachSeite(); };
  return el("div", { class: "modus-wahl" }, el("span", { class: "label" }, "Antworten"),
    el("button", { class: m === "schrift" ? "an" : "", onclick: () => setze("schrift") }, "✍️ Schreiben"),
    el("button", { class: m === "muendlich" ? "an" : "", onclick: () => setze("muendlich") }, ic("mikro"), "Sprechen"));
}

function thema(p) { document.body.className = p ? `thema-${p.thema}` : ""; }
function setzeKopf(t, ziel) {
  titel.textContent = t;
  zurueckZiel = ziel; zurueck.hidden = !ziel;
  if (person) {
    const n = serie(profil(person.id));
    sterneTop.replaceChildren(...(n ? [`🔥 ${n}  ·  `] : []), pIcon(person.id), ` ${sterneGesamt(person.id)}`);
  } else sterneTop.textContent = "";
}
zurueck.addEventListener("click", () => zurueckZiel && zurueckZiel());
const gastBanner = () => gast ? el("div", { class: "gast-banner" }, "Testkonto – nichts wird gespeichert") : null;

// ---------- Online-Speicher (Firebase) ----------
const CFG = window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey ? window.FIREBASE_CONFIG : null;
const MAIL_DOMAIN = "johannesfelling.at";
let wolke = null, fb = null, sichernTimer = null;
async function fbLaden() {
  if (fb) return fb;
  const v = "10.12.2", base = `https://www.gstatic.com/firebasejs/${v}/`;
  const [a, auth, fs] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-auth.js"), import(base + "firebase-firestore.js")]);
  const inst = a.initializeApp(CFG);
  fb = { auth: auth.getAuth(inst), db: fs.getFirestore(inst), A: auth, F: fs };
  return fb;
}
// Hat Papa inzwischen zurückgesetzt? Dann den Server-Stand übernehmen statt ihn zu überschreiben.
async function wolkeAbgleich() {
  if (!wolke || gast) return false;
  const snap = await fb.F.getDoc(fb.F.doc(fb.db, "fortschritt", wolke.uid));
  const server = snap.exists() ? (snap.data().stand || {}) : null;
  if (server && (server._reset || 0) !== (wolke.stand._reset || 0)) {
    wolke.stand = server;
    try { Object.keys(localStorage).filter(k => k.includes(wolke.kind)).forEach(k => localStorage.removeItem(k)); } catch (e) {}
    return true;
  }
  return false;
}
const wolkeDoc = async () => {
  if (await wolkeAbgleich().catch(() => false)) return;
  return fb.F.setDoc(fb.F.doc(fb.db, "fortschritt", wolke.uid), { stand: wolke.stand, kind: wolke.kind, zeit: fb.F.serverTimestamp() });
};
function wolkeSichern() {
  clearTimeout(sichernTimer);
  sichernTimer = setTimeout(() => wolkeDoc().catch(e => console.error(e)), 400);
}
async function wolkeVerbinden(user) {
  const kind = user.email.split("@")[0].toLowerCase();
  if (kind === "papa") throw new Error("papa");
  const p = PERSONEN.find(x => x.id === kind);
  if (!p) { await fb.A.signOut(fb.auth); throw new Error("unbekannt"); }
  const snap = await fb.F.getDoc(fb.F.doc(fb.db, "fortschritt", user.uid));
  let stand = snap.exists() ? (snap.data().stand || {}) : null;
  if (!stand) { stand = {}; for (const f of [...faecherVon(kind).map(f => f.id), PROFIL]) { const l = lokalLaden(kind, f); if (l) stand[f] = l; } }
  wolke = { uid: user.uid, kind, stand };
  if (!snap.exists()) wolkeSichern();
  person = p;
}
async function abmelden() {
  if (gast) { gast = false; gastStand = {}; person = null; startseite(); return; }
  if (!confirm("Wirklich abmelden?")) return;
  clearTimeout(sichernTimer);
  if (wolke) await wolkeDoc().catch(() => {});
  if (fb) await fb.A.signOut(fb.auth);
  wolke = null; person = null;
  startseite();
}

// ---------- Bildschirme ----------
function startseite() {
  if (CFG && wolke && !gast) { faecherSeite(); return; }
  person = null; fach = null; gast = false; thema(null);
  setzeKopf("VALIAS PRO", null);
  zeige(
    el("div", { class: "start-kopf" }, el("div", { class: "marke" }, el("span", { class: "marke-v" }, "VALI"), el("span", { class: "marke-e" }, "AS"), el("span", { class: "marke-pro" }, "PRO")), el("div", { class: "label" }, "Vali & Elias · Wer ist dran?")),
    el("div", { class: "start-raster" }, ...PERSONEN.map(p =>
      el("button", { class: `start-karte start-${p.thema}`, onclick: () => { if (CFG) anmeldeSeite(p); else { person = p; faecherSeite(); } } },
        window.KUNST ? KUNST.plakat(p.thema) : null,
        el("small", {}, p.slogan), el("span", { class: "start-name" }, p.name),
        (() => { const t = kommend(p.id)[0]; return t ? el("span", { class: "start-termin" }, `Nächster Test: ${t.titel} · ${wannText(tageBis(t.datum))}`) : null; })(),
        el("span", { class: "start-info" }, CFG ? "Anmelden mit Passwort" : punkte(p.id, sterneGesamt(p.id)))))),
    el("button", { class: "eltern-karte", onclick: gastWahl },
      el("span", { class: "eltern-bild" }, (() => { const b = el("img", { src: "papa.jpg", alt: "" }); b.onerror = () => b.replaceWith(el("span", { class: "eltern-init" }, "P")); return b; })()),
      el("span", { class: "eltern-text" }, el("small", {}, "Papa"), el("b", {}, "Eltern-Bereich"), el("span", {}, "Statistik · Eingang · Testkonto")),
      el("span", { class: "eltern-pfeil" }, "›"))
  );
}
function gastWahl() {
  thema(null);
  setzeKopf("Testkonto", startseite);
  zeige(
    el("h2", { class: "mitte" }, "Testkonto"),
    el("p", { class: "hinweis mitte" }, "Alles funktioniert wie echt, aber nichts wird gespeichert. Tests sind sofort freigeschaltet."),
    el("button", { class: "knopf", onclick: elternStart }, ic("auge"), "Eltern-Statistik"),
    el("p", { class: "klein mitte" }, "Lernzeit, Kapitel, Tests und Gutscheine von beiden Burschen."),
    el("div", { class: "label", style: "margin-top:22px" }, "App ansehen als"),
    el("div", { class: "start-raster", style: "margin-top:10px" }, ...PERSONEN.map(p =>
      el("button", { class: `start-karte start-${p.thema}`, onclick: () => { gast = true; gastStand = {}; person = p; faecherSeite(); } },
        window.KUNST ? KUNST.plakat(p.thema) : null,
        el("small", {}, "Ansicht von"), el("span", { class: "start-name" }, p.name)))));
}
function anmeldeSeite(p) {
  thema(p);
  setzeKopf("Anmelden", startseite);
  const pw = el("input", { class: "eingabe", type: "password", autocomplete: "current-password", placeholder: "Passwort" });
  const fehler = el("div");
  const los = el("button", { class: "knopf", onclick: async () => {
    if (!pw.value) return;
    los.disabled = true; los.textContent = "Einen Moment …"; fehler.replaceChildren();
    try {
      const c = await fb.A.signInWithEmailAndPassword(fb.auth, `${p.id}@${MAIL_DOMAIN}`, pw.value);
      await wolkeVerbinden(c.user);
      faecherSeite();
    } catch (e) {
      console.error(e);
      const falsch = /invalid-credential|wrong-password|user-not-found|invalid-login/.test(e.code || "");
      fehler.replaceChildren(el("div", { class: "feedback nein pop" }, falsch ? "Das Passwort stimmt nicht. Probier es nochmal!" : (e.code === "auth/too-many-requests" ? "Zu viele Versuche. Warte kurz und probier es dann nochmal." : "Anmelden hat nicht geklappt. Ist das Internet an?")));
      los.disabled = false; los.textContent = "Anmelden";
    }
  } }, "Anmelden");
  pw.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); los.click(); } });
  zeige(el("div", { class: "karte" }, el("div", { class: "label" }, p.slogan), el("h2", {}, `Hi ${p.name}`), el("p", { class: "klein" }, "Gib dein Passwort ein."), pw, los, fehler));
  setTimeout(() => pw.focus(), 50);
}

// „Nächstes Geschenk“: was fehlt noch bis zum nächsten Gutschein?
function geschenkWege() {
  const st = sterneGesamt(person.id), pr = profil(person.id), n = serie(pr);
  const heuteGeuebt = pr.tage.includes(heute());
  const stufe = BELOHNUNG.stufen.find(s => s.sterne > st);
  const vorher = stufe ? [0, ...BELOHNUNG.stufen.map(s => s.sterne)].filter(x => x < stufe.sterne).pop() : 0;
  const T = BELOHNUNG.serie.tage, inSerie = n % T, bisSerie = T - inSerie;
  const wege = [];
  if (stufe) wege.push({ icon: "stern", was: stufe.belohnung, geheim: "Überraschung", fehlt: ["Noch ", punkte(person.id, stufe.sterne - st)], info: ["Ziel: ", punkte(person.id, stufe.sterne), " · +1 pro richtige Antwort, +3 für eine fehlerfreie Runde"], anteil: (st - vorher) / (stufe.sterne - vorher), rest: (stufe.sterne - st) / 8 });
  wege.push({ icon: "flamme", was: BELOHNUNG.serie.belohnung, geheim: "Serien-Überraschung", fehlt: `Noch ${bisSerie} ${bisSerie === 1 ? "Tag" : "Tage"} üben`, info: `${T} Tage hintereinander mindestens eine Runde · ${heuteGeuebt ? "heute schon erledigt ✓" : "heute noch offen!"}`, anteil: inSerie / T, rest: bisSerie });
  wege.push({ icon: "test", was: BELOHNUNG.test.belohnung, geheim: "Test-Überraschung", fehlt: "Einen Kapiteltest fehlerfrei", info: "Jeder Kapiteltest, der zum ersten Mal ganz ohne Fehler bestanden wird", anteil: null, rest: 99 });
  return wege;
}
function geschenkBlock(kompakt) {
  const wege = geschenkWege(), bester = wege.filter(w => w.anteil !== null).sort((a, b) => a.rest - b.rest)[0];
  const zeile = w => el("div", { class: `geschenk-zeile ${w === bester ? "nah" : ""}` },
    el("div", { class: "geschenk-kopf" }, el("span", { class: "geschenk-was" }, el("span", { class: "geheim" }, "?"), w.geheim), el("b", {}, w.fehlt)),
    w.anteil !== null ? el("div", { class: "akku" }, el("div", { class: "akku-fuellung", style: `width:${Math.max(3, Math.round(w.anteil * 100))}%` }), el("span", { class: "akku-text" }, `${Math.round(w.anteil * 100)} % aufgeladen`)) : null,
    kompakt ? null : el("div", { class: "klein" }, w.info));
  return el("div", { class: "geschenke" }, el("div", { class: "label" }, "🎁 Nächste Überraschung"), ...(kompakt ? [zeile(bester)] : wege.map(zeile)));
}
function statusKarte() {
  const st = sterneGesamt(person.id), pr = profil(person.id), r = rang(person, st), n = serie(pr);
  const anteil = r.naechste ? (st - r.ab) / (r.naechste - r.ab) : 1;
  const stufe = BELOHNUNG.stufen.find(s => s.sterne === r.naechste);
  const heuteGeuebt = pr.tage.includes(heute());
  const bisSerie = BELOHNUNG.serie.tage - (n % BELOHNUNG.serie.tage);
  return el("div", { class: "karte status" },
    window.KUNST ? pIcon(person.id, "status-motiv") : null,
    el("div", { class: "status-kopf" },
      el("div", {}, el("div", { class: "label" }, "Rang"), el("div", { class: "rang" }, r.name)),
      el("div", { class: "status-sterne" }, el("div", { class: "label" }, "Gesammelt"), el("div", { class: "wert" }, pIcon(person.id), String(st)))),
    el("div", { class: "fortschritt" }, el("div", { style: `width:${Math.round(anteil * 100)}%` })),
    el("div", { class: "klein" }, r.naechste ? ["Noch ", punkte(person.id, r.naechste - st), ` bis zum Rang ${r.naechsterName}`] : "Höchster Rang erreicht."),
    geschenkBlock(),
    el("button", { class: "knopf zweit", onclick: gutscheinListe }, ic("ticket"), `Gutscheine (${pr.gutscheine.length})`));
}

// ---------- Termine (Tests / Schularbeiten) ----------
const TERMINE = {};
async function termineLaden(pid) {
  try { const r = await fetch(`daten/${pid}/termine.json?v=${Date.now()}`); TERMINE[pid] = r.ok ? await r.json() : { termine: [] }; }
  catch (e) { TERMINE[pid] = TERMINE[pid] || { termine: [] }; }
}
const WT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function tageBis(datum) { const [y, m, d] = datum.split("-").map(Number); const a = new Date(); a.setHours(0, 0, 0, 0); return Math.round((new Date(y, m - 1, d) - a) / 86400000); }
function datumLang(datum) { const [y, m, d] = datum.split("-").map(Number); return `${WT[new Date(y, m - 1, d).getDay()]} ${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.`; }
function wannText(n) { return n === 0 ? "HEUTE" : n === 1 ? "morgen" : `in ${n} Tagen`; }
const kommend = pid => ((TERMINE[pid] || {}).termine || []).filter(t => tageBis(t.datum) >= 0).sort((a, b) => a.datum.localeCompare(b.datum));
function naechsterTerminFuer(pid, fid) { return kommend(pid).find(t => t.fach === fid && tageBis(t.datum) <= 14); }
function termineKarte() {
  const k = kommend(person.id);
  if (!k.length) return null;
  const [n, ...rest] = k, tage = tageBis(n.datum), bald = rest.filter(t => tageBis(t.datum) <= 14);
  const f = FAECHER.find(x => x.id === n.fach);
  return el("div", { class: `karte termin-karte ${tage <= 3 ? "dringend" : ""}` },
    el("div", { class: "label" }, "Als Nächstes"),
    el("div", { class: "termin-haupt" },
      el("div", {}, el("div", { class: "termin-titel" }, n.titel), el("div", { class: "klein" }, `${datumLang(n.datum)}${n.zeit ? `, ${n.zeit} Uhr` : ""}${n.dauer ? ` · ${n.dauer} min` : ""}`)),
      el("div", { class: "termin-countdown" }, el("div", { class: "wert" }, tage === 0 ? "!" : String(tage)), el("div", { class: "klein" }, tage === 0 ? "heute" : tage === 1 ? "Tag" : "Tage"))),
    f ? el("button", { class: "knopf", onclick: () => fachLaden(f) }, ic("play"), `Jetzt ${f.name} lernen`) : el("p", { class: "klein" }, "Dieses Fach ist (noch) nicht in der App – lern mit deinen Unterlagen."),
    bald.length ? el("div", { class: "termin-liste" }, el("div", { class: "label" }, "In den nächsten 2 Wochen"),
      ...bald.map(t => el("div", { class: "zeile" }, el("span", {}, `${datumLang(t.datum)}${t.zeit ? `, ${t.zeit} Uhr` : ""} · ${t.titel}`), el("b", {}, wannText(tageBis(t.datum)))))) : null,
    el("button", { class: "reset", onclick: termineSeite }, "Alle Termine"));
}
function termineSeite() {
  const T = TERMINE[person.id] || { termine: [] };
  setzeKopf("Termine", faecherSeite);
  const alle = (T.termine || []).slice().sort((a, b) => a.datum.localeCompare(b.datum));
  zeige(el("div", { class: "label" }, person.name), el("h2", {}, "Tests & Schularbeiten"),
    el("div", { class: "karte" }, ...alle.map(t => { const n = tageBis(t.datum);
      return el("div", { class: `zeile ${n < 0 ? "vorbei" : n <= 14 ? "bald" : ""}` }, el("span", {}, `${datumLang(t.datum)}${t.zeit ? `, ${t.zeit} Uhr` : ""} · ${t.titel}${t.dauer ? ` (${t.dauer} min)` : ""}`), el("b", {}, n < 0 ? "vorbei" : wannText(n))); })),
    (T.frei || []).length ? el("div", { class: "karte" }, el("div", { class: "label" }, "Frei"), ...T.frei.map(f => el("div", { class: "zeile" }, el("span", {}, f.titel), el("b", {}, `${datumLang(f.von)} – ${datumLang(f.bis)}`)))) : null);
}

// Markierung: echter Schulstoff oder nur Beispielfragen
const STOFF = {};
const stoffMarke = echt => echt === null ? null : el("span", { class: `stoff ${echt ? "echt" : "beispiel"}` }, echt ? "✓ Schulstoff" : "Beispiel");
function stoffPlatz(pid, fid) {
  const box = el("span", { class: "stoff-platz" });
  const setzen = () => { const v = (STOFF[pid] || {})[fid]; if (v !== undefined) box.replaceChildren(stoffMarke(v)); };
  if (STOFF[pid]) setzen();
  else {
    STOFF[pid + "_laden"] = STOFF[pid + "_laden"] || Promise.all(faecherVon(pid).map(async f => {
      try { const r = await fetch(`daten/${pid}/${f.id}.json?v=${Date.now()}`); if (!r.ok) return [f.id, null]; const d = await r.json(); return [f.id, d.fragen && d.fragen.length ? !d.platzhalter : null]; } catch (e) { return [f.id, null]; }
    })).then(l => { STOFF[pid] = Object.fromEntries(l); });
    STOFF[pid + "_laden"].then(setzen);
  }
  return box;
}
function faecherSeite() {
  fach = null; thema(person);
  if (wolke && !gast) wolkeAbgleich().then(neu => { if (neu && !fach) faecherSeite(); }).catch(() => {});
  setzeKopf(person.name, CFG && !gast ? null : startseite);
  zeige(
    gastBanner(),
    termineKarte(),
    statusKarte(),
    el("h2", {}, person.thema === "held" ? "Missionen" : "Trainingseinheiten"),
    el("div", { class: "raster" }, ...faecherVon(person.id).map((f, i) => {
      const s = laden(person.id, f.id);
      const t = naechsterTerminFuer(person.id, f.id);
      return el("button", { class: `fach ${t ? "markiert" : ""}`, onclick: () => fachLaden(f) },
        t ? el("span", { class: "termin-badge" }, `${t.art === "Schularbeit" ? "SA" : "Test"} ${wannText(tageBis(t.datum))}`) : el("span", { class: "nr" }, String(i + 1).padStart(2, "0")), ic(f.id),
        el("div", {}, el("div", { class: "fach-name" }, f.name), stoffPlatz(person.id, f.id), el("small", {}, punkte(person.id, s.sterne), ` · ${s.runden} Runden`)));
    })),
    (CFG || gast) ? el("button", { class: "reset", onclick: abmelden }, gast ? "Testkonto beenden" : `Abmelden (${person.name})`) : null
  );
}

async function fachLaden(f) {
  fach = f;
  setzeKopf(f.name, faecherSeite);
  zeige(el("p", { class: "hinweis" }, "Lade Fragen …"));
  try {
    const r = await fetch(`daten/${person.id}/${f.id}.json?v=${Date.now()}`);
    if (!r.ok) throw new Error(r.status);
    daten = await r.json();
  } catch (e) {
    zeige(el("div", { class: "karte" }, el("p", {}, "Hier gibt es noch keine Fragen. 🙈")), el("button", { class: "knopf", onclick: faecherSeite }, "Zurück"));
    return;
  }
  fachSeite();
}

function fachSeite() {
  const s = laden(person.id, fach.id), pr = profil(person.id);
  setzeKopf(fach.name, faecherSeite);
  const tests = daten.tests || [];
  const frei = gast || s.runden > 0;
  zeige(
    gastBanner(),
    el("div", { class: "karte titelkarte" },
      el("div", { class: "label" }, fach.name),
      el("h2", {}, daten.titel || fach.name),
      stoffMarke(!daten.platzhalter),
      daten.untertitel ? el("p", { class: "klein" }, daten.untertitel) : null,
      el("p", { class: "klein" }, punkte(person.id, s.sterne), ` · ${s.runden} Runden · ${daten.fragen.length} Fragen` + (s.offen.length ? ` · ${s.offen.length} zum Wiederholen` : ""))),
    (() => { const t = naechsterTerminFuer(person.id, fach.id); return t ? el("div", { class: "termin-banner" }, ic("test"), `${t.titel} am ${datumLang(t.datum)}${t.zeit ? `, ${t.zeit} Uhr` : ""} – ${wannText(tageBis(t.datum))}`) : null; })(),
    daten.platzhalter ? el("div", { class: "platzhalter" }, "Übungsfragen zum Ausprobieren – die echten Fragen aus dem Schulstoff kommen bald.") : null,
    modusWahl(),
    el("button", { class: "knopf", onclick: rundeStarten }, ic("play"), person.thema === "held" ? "Mission starten" : "Anpfiff"),
    ...(teststoffKarte(s) || []),
    el("div", { class: "label hochladen-label" }, "Hochladen"),
    el("div", { class: "raster zwei hochladen" },
      el("button", { class: "fach klein-fach material-knopf", onclick: materialSeite }, ic("plus"), el("div", {}, el("div", { class: "fach-name" }, "Lernmaterial"), el("small", {}, "Buch- oder Heftseiten → daraus werden Übungen, Erklärungen und ein Test"))),
      el("button", { class: "fach klein-fach aufsatz-knopf", onclick: aufsatzListe }, ic("kamera"), el("div", {}, el("div", { class: "fach-name" }, "Aufgabe zur Korrektur"), el("small", {}, fotoText().kurz)))),
    (daten.wissen || []).length || (daten.sprechen || []).length ? el("div", { class: "raster zwei" },
      (daten.wissen || []).length ? el("button", { class: "fach klein-fach", onclick: wissenListe }, ic("wissen"), el("div", {}, el("div", { class: "fach-name" }, "Wissen"), el("small", {}, `${daten.wissen.length} Erklärungen + Videos`))) : null,
      (daten.sprechen || []).length ? el("button", { class: "fach klein-fach", onclick: sprechListe }, ic("mikro"), el("div", {}, el("div", { class: "fach-name" }, "Sprechen"), el("small", {}, `${daten.sprechen.length} Gespräche`))) : null) : null,
    tests.length ? el("div", { class: "karte" },
      el("div", { class: "label" }, "Kapiteltests"),
      el("p", { class: "klein" }, "Alles richtig = 🎁 Überraschung." + (frei ? "" : " Erst eine Trainingsrunde spielen, dann ist der Test frei.")),
      ...tests.map(t => {
        const info = pr.tests[`${fach.id}/${t.id}`] || {};
        return el("button", { class: `test-knopf ${info.bestanden ? "ok" : ""}`, disabled: frei ? null : "disabled", onclick: () => testStarten(t) },
          el("span", {}, t.titel, el("small", {}, info.bestanden ? "Bestanden – Gutschein erhalten" : info.versuche ? `Bester Versuch: ${info.beste} von ${t.fragen.length}` : `${t.fragen.length} Fragen`)),
          ic(info.bestanden ? "haken" : frei ? "test" : "schloss"));
      })) : null,
  );
}

const schwerpunktAktiv = q => q.schwerpunkt && tageBis(q.schwerpunkt) >= 0 && tageBis(q.schwerpunkt) <= 21;
function teststoffKarte(s) {
  const ts = (daten.teststoff || []).filter(t => !t.termin || tageBis(t.termin) >= 0);
  if (!ts.length) return null;
  return ts.map(t => {
    const fr = daten.fragen.filter(q => q.id.startsWith(t.id + "-"));
    const n = t.termin ? tageBis(t.termin) : null;
    return el("div", { class: "karte teststoff" },
      el("div", { class: "label" }, "🎯 Teststoff"),
      el("div", { class: "termin-titel" }, t.titel || "Test"),
      el("div", { class: "klein" }, t.termin ? `${datumLang(t.termin)} – ${wannText(n)} · Übungsrunden fragen jetzt genau diesen Stoff ab` : "Übungsrunden fragen genau diesen Stoff ab"),
      el("div", { class: "teststoff-liste" }, ...(t.punkte || []).map((p, i) => {
        const qs = fr.filter(q => q.stoff === i), gesehen = qs.filter(q => s.gesehen[q.id]).length, offen = qs.filter(q => s.offen.includes(q.id)).length;
        const sitzt = qs.length && gesehen === qs.length && !offen;
        return el("div", { class: `ts-punkt ${sitzt ? "sitzt" : ""}` },
          el("span", { class: "ts-haken" }, sitzt ? "✓" : String(i + 1)),
          el("span", { class: "ts-text" }, p, qs.length ? el("small", {}, ` · ${gesehen}/${qs.length} geübt${offen ? ` · ${offen} wiederholen` : ""}`) : null));
      })),
      t.quelle ? el("div", { class: "klein" }, `Quelle: ${t.quelle}`) : null);
  });
}
function rundeStarten() {
  const s = laden(person.id, fach.id);
  const alle = daten.fragen;
  const nachId = Object.fromEntries(alle.map(q => [q.id, q]));
  const wdh = mischen(s.offen.filter(id => nachId[id])).slice(0, 4).map(id => nachId[id]);
  // Vor einem Test: gezielt den abgegrenzten Teststoff üben
  const fokus = alle.filter(schwerpunktAktiv);
  const pool = fokus.length >= 5 ? fokus : alle;
  const rest = mischen(pool.filter(q => !wdh.includes(q))).sort((a, b) => (s.gesehen[a.id] || 0) - (s.gesehen[b.id] || 0));
  runde = { fragen: mischen([...wdh, ...rest.slice(0, RUNDE - wdh.length)]), i: 0, richtig: 0, falsch: [], test: null };
  frageZeigen();
}
function testStarten(t) {
  if (!confirm(`${t.titel}\n\n${t.fragen.length} Fragen. Die Lösungen siehst du erst am Ende. Bereit?`)) return;
  runde = { fragen: mischen(t.fragen), i: 0, richtig: 0, falsch: [], test: t };
  frageZeigen();
}

function frageZeigen() {
  const q = runde.fragen[runde.i];
  const test = !!runde.test;
  setzeKopf(test ? "📝 Test" : fach.name, () => { if (confirm(test ? "Test abbrechen? Er zählt dann nicht." : "Runde abbrechen?")) fachSeite(); });
  const feedback = el("div");
  const weiter = el("button", { class: "knopf", onclick: naechste }, runde.i + 1 < runde.fragen.length ? "Weiter →" : (test ? "Test abgeben ✔" : "Ergebnis anzeigen"));
  weiter.hidden = true;
  let fertig = false;

  function auswerten(ok, gegeben) {
    if (fertig) return; fertig = true;
    const s = laden(person.id, fach.id);
    if (!test) s.gesehen[q.id] = (s.gesehen[q.id] || 0) + 1;
    if (ok) { runde.richtig++; s.sterne++; s.offen = s.offen.filter(id => id !== q.id); }
    else { runde.falsch.push({ q, gegeben }); if (!test && !s.offen.includes(q.id)) s.offen.push(q.id); }
    speichern(person.id, fach.id, s);
    setzeKopf(test ? "📝 Test" : fach.name, zurueckZiel);
    if (test) feedback.replaceChildren(el("div", { class: "feedback neutral pop" }, "Antwort gespeichert."));
    else feedback.replaceChildren(el("div", { class: `feedback pop ${ok ? "ok" : "nein"}` },
      el("b", {}, ok ? [`${zufall(person.lob)} +`, punkte(person.id, 1)] : "Knapp daneben."),
      !ok ? el("div", {}, "Richtig ist: ", el("b", {}, [].concat(q.antwort)[0])) : null,
      q.erklaerung ? el("div", {}, "💡 ", q.erklaerung) : null));
    const w = !test && wissenFuer(q);
    if (w) feedback.append(el("details", { class: "erklaer-mehr" }, el("summary", {}, `📖 Ausführlich erklärt: ${w.titel}`), el("div", { class: "wissen-text" }, vorleseKnopf(w), ...wissenInhalt(w))));
    weiter.hidden = false; setTimeout(() => weiter.focus(), 0);
  }

  let teil;
  if (q.typ === "auswahl") {
    const opts = mischen(q.optionen);
    const knoepfe = opts.map((o, i) => el("button", { class: "opt", onclick: () => {
      const ok = stimmt(o, q.antwort);
      knoepfe.forEach(k => { k.disabled = true; if (!test && stimmt(k.textContent, q.antwort)) k.classList.add("richtig"); });
      knoepfe[i].classList.add(test ? "gewaehlt" : (ok ? "richtig" : "falsch"));
      auswerten(ok, o);
    } }, o));
    teil = el("div", { class: "optionen" }, ...knoepfe);
    if (muendlich()) {
      knoepfe.forEach((k, i) => k.dataset.b = "ABCDE"[i]);
      teil.classList.add("buchstaben");
      const info = el("div");
      const mik = el("button", { class: "mikro klein-mikro", onclick: () => { if (!fertig) zuhoeren(antwortSprache(q), mik, alts => {
        const i = optionFinden(alts, opts);
        if (i >= 0) knoepfe[i].click();
        else info.replaceChildren(el("div", { class: "feedback neutral" }, `Verstanden: „${alts[0]}“ – das passt zu keiner Antwort. Sag den Buchstaben (A, B, C …) oder tippe.`));
      }, info); } }, ic("mikro"));
      teil = el("div", {}, teil, el("p", { class: "klein mitte" }, "Sag die Antwort oder den Buchstaben."), mik, info);
      setTimeout(() => { if (!fertig) mik.click(); }, 400);
    }
  } else {
    const inp = el("input", { class: "eingabe", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: "Antwort eintippen …", inputmode: q.zahl ? "decimal" : "text" });
    const pruefen = el("button", { class: "knopf", onclick: () => { if (!inp.value.trim()) return; inp.disabled = true; pruefen.hidden = true; auswerten(stimmt(inp.value, q.antwort), inp.value); } }, test ? "Antwort abgeben" : "Prüfen ✔");
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); if (!fertig) pruefen.click(); } });
    if (muendlich()) {
      const info = el("div");
      const mik = el("button", { class: "mikro klein-mikro", onclick: () => { if (!fertig) zuhoeren(antwortSprache(q), mik, alts => {
        const gut = alts.find(a => stimmt(a, q.antwort));
        inp.value = gut || alts[0]; info.replaceChildren();
        if (gut) pruefen.click();
        else info.replaceChildren(el("div", { class: "feedback neutral" }, "Stimmt das so? Dann „Prüfen“ – sonst nochmal sprechen oder ausbessern."));
      }, info); } }, ic("mikro"));
      inp.placeholder = "Antwort sprechen (oder tippen) …";
      teil = el("div", {}, mik, info, inp, pruefen);
      setTimeout(() => { if (!fertig) mik.click(); }, 400);
    } else {
      teil = el("div", {}, inp, pruefen);
      setTimeout(() => inp.focus(), 50);
    }
  }
  zeige(
    gastBanner(),
    el("div", { class: "fortschritt" }, el("div", { style: `width:${(runde.i / runde.fragen.length) * 100}%` })),
    el("div", { class: "karte pop frage-karte" },
      el("div", { class: "frage-nr" }, el("span", { class: "label" }, `${test ? "Test" : "Frage"} ${runde.i + 1} / ${runde.fragen.length}`), el("span", { class: "label" }, q.art || "")),
      el("p", { class: "frage" }, q.frage), teil, feedback, weiter));
}

function naechste() { runde.i++; if (runde.i < runde.fragen.length) frageZeigen(); else ergebnis(); }

function ergebnis() {
  const n = runde.fragen.length, perfekt = runde.richtig === n, test = runde.test;
  const s = laden(person.id, fach.id);
  if (!test) { s.runden++; if (perfekt) { s.perfekt++; s.sterne += 3; } }
  speichern(person.id, fach.id, s);
  const neu = belohnungenPruefen((pr, neu) => {
    protokoll(pr, { f: fach.id, art: test ? "Test" : "Übungsrunde", titel: test ? test.titel : "", erg: `${runde.richtig}/${n}` });
    if (!test) return;
    const k = `${fach.id}/${test.id}`, info = pr.tests[k] || { versuche: 0, beste: 0, bestanden: false };
    info.versuche++; info.beste = Math.max(info.beste, runde.richtig);
    if (perfekt && !info.bestanden) { info.bestanden = true; neu.push(gutscheinGeben(pr, BELOHNUNG.test.belohnung, `${test.titel} fehlerfrei bestanden 📝`)); }
    pr.tests[k] = info;
  });
  const anteil = runde.richtig / n, held = person.thema === "held";
  const text = perfekt ? (test ? "Fehlerfrei bestanden." : [held ? "Mission erfüllt. +" : "Zu null gewonnen. +", punkte(person.id, 3), " Bonus."])
    : anteil >= .7 ? (held ? "Starke Mission." : "Starkes Spiel.") : anteil >= .4 ? "Solide. Mit Training wird's noch besser." : "Dranbleiben – jede Runde macht dich stärker.";
  setzeKopf(fach.name, fachSeite);
  zeige(
    gastBanner(),
    el("div", { class: "karte pop titelkarte" },
      el("div", { class: "label" }, test ? "Testergebnis" : (held ? "Missionsbericht" : "Spielbericht")),
      el("h2", {}, `${runde.richtig} / ${n} richtig`),
      el("p", {}, text),
      test && !perfekt ? el("p", { class: "klein" }, "Für den Gutschein muss alles richtig sein. Übe die Fehler und probier den Test nochmal.") : null),
    gast ? null : el("div", { class: "karte" }, geschenkBlock(true)),
    ...neu.map(g => el("button", { class: "gutschein-neu pop", onclick: () => gutscheinZeigen(g) }, ic("ticket"), el("span", {}, el("b", {}, "Neuer Gutschein: "), g.was, el("small", {}, "Antippen zum Anzeigen")))),
    runde.falsch.length ? el("div", { class: "karte" }, el("div", { class: "label" }, test ? "Noch falsch" : "Kommt später nochmal"),
      el("ul", {}, ...runde.falsch.map(({ q }) => el("li", {}, q.frage, " → ", el("b", {}, [].concat(q.antwort)[0]))))) : null,
    el("button", { class: "knopf", onclick: rundeStarten }, "Nächste Runde"),
    el("button", { class: "knopf zweit", onclick: fachSeite }, "Zurück zum Fach"),
    el("button", { class: "knopf zweit", onclick: faecherSeite }, "Anderes Fach")
  );
  ueberraschung(neu);
}

// Überraschung: Geschenk öffnet sich mit Animation und zeigt den Gutschein
function ueberraschung(neu) {
  if (!neu || !neu.length) return;
  const g = neu[0], rest = neu.slice(1);
  const held = person.thema === "held";
  const konfetti = el("div", { class: "konfetti" }, ...Array.from({ length: 36 }, (_, i) => el("i", { style: `--x:${Math.round(Math.random() * 100)}%;--d:${(Math.random() * .8).toFixed(2)}s;--r:${Math.round(Math.random() * 720 - 360)}deg;--f:${["#ffd676", "#ffffff", held ? "#ff3b30" : "#8fd0ff", "#2ee59d"][i % 4]}` })));
  const fertig = () => { o.remove(); if (rest.length) ueberraschung(rest); };
  const o = el("div", { class: `ueber ${held ? "ueber-held" : "ueber-sport"}`, onclick: e => { if (e.target === o) fertig(); } },
    el("div", { class: "ueber-strahlen" }),
    konfetti,
    el("div", { class: "ueber-buehne" },
      el("div", { class: "ueber-titel" }, "Überraschung!"),
      el("div", { class: "box" }, el("div", { class: "box-deckel" }), el("div", { class: "box-koerper" }), el("div", { class: "box-licht" })),
      el("div", { class: "ueber-gs" },
        el("div", { class: "gs-kopf" }, "Gutschein · VALIAS PRO"),
        el("div", { class: "gs-was" }, g.was),
        el("div", { class: "gs-grund" }, g.grund)),
      el("button", { class: "knopf", onclick: () => { o.remove(); gutscheinZeigen(g); } }, ic("ticket"), "Gutschein ansehen"),
      el("button", { class: "knopf zweit", onclick: fertig }, rest.length ? "Nächste Überraschung" : "Weiter")));
  document.body.append(o);
  try { navigator.vibrate && navigator.vibrate([60, 80, 160]); } catch (e) {}
}
function gutscheinZeigen(g) {
  setzeKopf("Gutschein", gutscheinListe);
  const [d1, d2, d3] = g.datum.split("-");
  zeige(
    el("div", { class: `gutschein pop ${gast ? "ungueltig" : ""}` },
      el("div", { class: "gs-kopf" }, "Gutschein · VALIAS PRO"),
      el("div", { class: "gs-was" }, g.was),
      el("div", { class: "gs-fuer" }, `für ${person.name}`),
      el("div", { class: "gs-grund" }, g.grund),
      el("div", { class: "gs-fuss" }, el("span", {}, `${d3}.${d2}.${d1}`), el("span", { class: "gs-code" }, g.code)),
      gast ? el("div", { class: "gs-stempel" }, "TEST") : null),
    el("p", { class: "hinweis mitte" }, "Screenshot machen und an Papa schicken."),
    el("button", { class: "knopf zweit", onclick: gutscheinListe }, "Alle Gutscheine"),
    el("button", { class: "knopf zweit", onclick: faecherSeite }, "Zurück"));
}
function gutscheinListe() {
  const pr = profil(person.id);
  setzeKopf("Meine Gutscheine", faecherSeite);
  zeige(
    gastBanner(),
    el("h2", {}, "Gutscheine"),
    pr.gutscheine.length ? null : el("p", { class: "hinweis" }, "Noch keine Gutscheine. Sammle ", pktIc(person.id), ", übe jeden Tag oder schaffe einen Test fehlerfrei!"),
    ...pr.gutscheine.slice().reverse().map(g => el("button", { class: "test-knopf", onclick: () => gutscheinZeigen(g) }, el("span", {}, g.was, el("small", {}, `${g.grund} · ${g.code}`)), ic("ticket"))),
    el("div", { class: "karte" }, el("div", { class: "label" }, "So bekommst du Gutscheine"),
      el("ul", {},
        el("li", {}, "Kapiteltest fehlerfrei → 🎁 Überraschung"),
        el("li", {}, `${BELOHNUNG.serie.tage} Tage hintereinander üben → 🎁 Überraschung`),
        ...BELOHNUNG.stufen.map(s => el("li", {}, punkte(person.id, s.sterne), " → 🎁 Überraschung")))));
}

// ---------- Wissen ----------
function wissenListe() {
  setzeKopf("Wissen", fachSeite);
  zeige(el("div", { class: "label" }, fach.name), el("h2", {}, "Wissen"),
    ...daten.wissen.map((w, i) => el("button", { class: "test-knopf", onclick: () => wissenZeigen(i) }, el("span", {}, w.titel, el("small", {}, w.kurz || "")), ic("wissen"))));
}
function wissenZeigen(i) {
  const w = daten.wissen[i];
  { const pr = profil(person.id); if (!pr.gelesen[`${fach.id}/${w.titel}`]) { pr.gelesen[`${fach.id}/${w.titel}`] = heute(); protokoll(pr, { f: fach.id, art: "Wissen", titel: w.titel }); speichern(person.id, PROFIL, pr); } }
  setzeKopf("Wissen", () => { try { speechSynthesis.cancel(); } catch (e) {} wissenListe(); });
  const yt = w.video ? `https://www.youtube.com/results?search_query=${encodeURIComponent(w.video)}` : null;
  zeige(
    el("div", { class: "karte wissen-text pop" },
      el("div", { class: "label" }, fach.name), el("h2", {}, w.titel),
      vorleseKnopf(w),
      ...wissenInhalt(w),
      yt ? el("a", { class: "link-knopf", href: yt, target: "_blank", rel: "noopener" }, ic("play"), "Zusätzlich: Erklärvideos auf YouTube") : null),
    i + 1 < daten.wissen.length ? el("button", { class: "knopf zweit", onclick: () => wissenZeigen(i + 1) }, `Weiter: ${daten.wissen[i + 1].titel}`) : null,
    el("button", { class: "knopf", onclick: rundeStarten }, ic("play"), "Jetzt üben"));
}

// ---------- Sprechen (Englisch, Vorlesen + Mikrofon) ----------
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function vorlesen(text, lang = "en-GB", fertig) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = lang.startsWith("de") ? 1 : 0.9;
    const stimmen = speechSynthesis.getVoices(), haupt = lang.slice(0, 2);
    const v = stimmen.find(v => v.lang.replace("_", "-").toLowerCase() === lang.toLowerCase()) || stimmen.find(v => v.lang.toLowerCase().startsWith(haupt));
    if (v) u.voice = v;
    if (fertig) { u.onend = fertig; u.onerror = fertig; }
    speechSynthesis.speak(u);
  } catch (e) { if (fertig) fertig(); }
}
// Erklärtext als Bausteine (für Wissen-Seite und „Ausführlich erklärt“ im Quiz)
function wissenInhalt(w) {
  return [
    w.problem ? el("div", { class: "problem" }, el("div", { class: "label" }, "Worum geht's?"), el("p", {}, w.problem)) : null,
    ...(w.text || []).map(t => el("p", {}, t)),
    (w.schritte || []).length ? el("div", { class: "label" }, "So gehst du vor") : null,
    ...(w.schritte || []).map((t, n) => el("div", { class: "schritt" }, el("b", {}, `Schritt ${n + 1}: `), t)),
    w.beispiel ? el("div", {}, el("div", { class: "label" }, "Beispiel"), el("div", { class: "beispiel" }, w.beispiel)) : null,
    (w.fehler || []).length ? el("div", { class: "typfehler" }, el("div", { class: "label" }, "Typische Fehler"), el("ul", {}, ...w.fehler.map(f => el("li", {}, f)))) : null,
    w.merke ? el("div", { class: "feedback ok" }, el("b", {}, "Merke: "), w.merke) : null];
}
function wissenVorlesetext(w) {
  return [w.titel, w.problem, ...(w.text || []), ...(w.schritte || []).map((t, n) => `Schritt ${n + 1}: ${t}`),
    w.beispiel ? "Beispiel: " + w.beispiel.replace(/→/g, ", also ").replace(/[✗]/g, " falsch: ").replace(/[✓]/g, " richtig: ") : "",
    (w.fehler || []).length ? "Typische Fehler: " + w.fehler.join(" ") : "", w.merke ? "Merke: " + w.merke : ""].filter(Boolean).join(". ").replace(/\.\./g, ".");
}
function vorleseKnopf(w) {
  if (!window.speechSynthesis) return null;
  let an = false;
  const k = el("button", { class: "knopf zweit vorlesen", onclick: () => {
    if (an) { speechSynthesis.cancel(); an = false; k.lastChild.textContent = "Erklärung vorlesen"; return; }
    an = true; k.lastChild.textContent = "Vorlesen stoppen";
    vorlesen(wissenVorlesetext(w), "de-AT", () => { an = false; k.lastChild.textContent = "Erklärung vorlesen"; });
  } }, "🔊 ", el("span", {}, "Erklärung vorlesen"));
  return k;
}
function wissenFuer(q) {
  const hay = [q.frage, ...[].concat(q.antwort), ...(q.optionen || [])].join(" | ").toLowerCase();
  return (daten.wissen || []).find(w => (w.stichworte || []).some(s => { try { return new RegExp(s, "i").test(hay); } catch (e) { return false; } }));
}
// ---------- Aufsatzkorrektur (Foto → Firestore → Korrektur kommt zurück) ----------
// ---------- Unterrichtsmaterial hochladen (mehrere Fotos → Firestore „material“ → stündlich zu Übungen verarbeitet) ----------
async function materialSeite() {
  setzeKopf("Lernmaterial", fachSeite);
  if (gast || !wolke || !fb) {
    zeige(el("div", { class: "karte" }, el("div", { class: "label" }, "Material hochladen"), el("p", {}, gast ? "Im Testkonto nicht verfügbar – dafür muss ein Kind angemeldet sein." : "Dafür musst du angemeldet sein.")));
    return;
  }
  zeige(el("p", { class: "hinweis mitte" }, "Lade …"));
  let alte = [];
  try {
    const snap = await fb.F.getDocs(fb.F.query(fb.F.collection(fb.db, "material"), fb.F.where("uid", "==", wolke.uid)));
    const pakete = {};
    snap.forEach(d => { const x = d.data(); if (x.fach !== fach.id) return; const k = x.paket; (pakete[k] = pakete[k] || { kapitel: x.kapitel, datum: x.datum, n: 0, fertig: 0 }); pakete[k].n++; if (x.status === "verarbeitet") pakete[k].fertig++; });
    alte = Object.values(pakete).sort((a, b) => (b.datum || "").localeCompare(a.datum || ""));
  } catch (e) { console.error(e); }
  const fotos = [];
  const vorschau = el("div", { class: "foto-raster" });
  const info = el("div");
  const kapitel = el("input", { class: "eingabe", placeholder: "Kapitel / Thema (z. B. „Unit 5 – Food“ oder „Brüche“)", maxlength: "120" });
  const kamera = el("input", { type: "file", accept: "image/*", capture: "environment", style: "display:none" });
  const galerie = el("input", { type: "file", accept: "image/*", multiple: "multiple", style: "display:none" });
  const senden = el("button", { class: "knopf", disabled: "disabled" }, ic("play"), "Hochladen");
  const neuZeichnen = () => {
    vorschau.replaceChildren(...fotos.map((f, i) => el("div", { class: "foto-klein" }, el("img", { src: f.url, alt: `Foto ${i + 1}` }), el("span", {}, String(i + 1)),
      el("button", { class: "foto-weg", title: "Entfernen", onclick: () => { URL.revokeObjectURL(f.url); fotos.splice(i, 1); neuZeichnen(); } }, "✕"))));
    senden.disabled = !fotos.length; senden.lastChild.textContent = fotos.length ? `${fotos.length} ${fotos.length === 1 ? "Foto" : "Fotos"} hochladen` : "Hochladen";
  };
  const dazu = inp => { for (const f of inp.files) if (fotos.length < 20) fotos.push({ datei: f, url: URL.createObjectURL(f) }); inp.value = ""; neuZeichnen(); };
  kamera.addEventListener("change", () => dazu(kamera));
  galerie.addEventListener("change", () => dazu(galerie));
  senden.addEventListener("click", async () => {
    if (!fotos.length) return;
    senden.disabled = true;
    const paket = `${wolke.kind}-${Date.now().toString(36)}`, datum = `${heute()} ${uhrzeit()}`, kap = kapitel.value.trim();
    try {
      for (let i = 0; i < fotos.length; i++) {
        info.replaceChildren(el("div", { class: "feedback neutral" }, `Foto ${i + 1} von ${fotos.length} wird hochgeladen …`));
        const bild = await bildVerkleinern(fotos[i].datei, 1800, 0.75);
        await fb.F.addDoc(fb.F.collection(fb.db, "material"), { uid: wolke.uid, kind: wolke.kind, fach: fach.id, kapitel: kap, paket, nr: i + 1, von: fotos.length, bild, status: "neu", datum, erstellt: fb.F.serverTimestamp() });
      }
      const pr = profil(person.id); protokoll(pr, { f: fach.id, art: "Material", titel: `${kap || "ohne Titel"} (${fotos.length} Fotos)` }); speichern(person.id, PROFIL, pr);
      info.replaceChildren(el("div", { class: "feedback ok pop" }, el("b", {}, "Danke! "), "Daraus werden in den nächsten Stunden neue Übungen, eine Erklärung und ein Kapiteltest."));
      fotos.splice(0); setTimeout(materialSeite, 3000);
    } catch (e) { console.error(e); info.replaceChildren(el("div", { class: "feedback nein" }, "Hochladen hat nicht geklappt. Ist das Internet an?")); senden.disabled = false; }
  });
  zeige(
    el("div", { class: "karte" }, el("div", { class: "label" }, `${fach.name} · Material`), el("h2", {}, "Lernmaterial hochladen"),
      el("p", { class: "klein" }, "Hier kommt LERNSTOFF hin: Seiten aus Buch, Heft-Mitschrift oder Arbeitsblatt (deine eigenen Lösungen bitte unter „Aufgabe zur Korrektur“). Fotografiere gerade von oben, bei gutem Licht. Du kannst viele Fotos auf einmal hochladen (bis 20)."),
      kapitel,
      el("div", { class: "raster zwei" },
        el("button", { class: "knopf zweit", onclick: () => kamera.click() }, ic("kamera"), "Foto machen"),
        el("button", { class: "knopf zweit", onclick: () => galerie.click() }, ic("plus"), "Aus Galerie")),
      vorschau, senden, kamera, galerie, info),
    alte.length ? el("div", { class: "label" }, "Schon hochgeladen") : null,
    ...alte.map(a => el("div", { class: `test-knopf ${a.fertig === a.n ? "ok" : ""}` },
      el("span", {}, a.kapitel || "Material", el("small", {}, `${a.datum || ""} · ${a.n} ${a.n === 1 ? "Foto" : "Fotos"} · ${a.fertig === a.n ? "Übungen sind da ✓" : "wird verarbeitet …"}`)),
      ic(a.fertig === a.n ? "haken" : "schloss"))));
}
function bildVerkleinern(datei, max = 1500, q = 0.72) {
  return new Promise((ok, fehler) => {
    const img = new Image();
    img.onload = () => {
      const f = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas"); c.width = Math.round(img.width * f); c.height = Math.round(img.height * f);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      let d = c.toDataURL("image/jpeg", q);
      if (d.length > 900000) d = c.toDataURL("image/jpeg", 0.5);
      URL.revokeObjectURL(img.src); ok(d.split(",")[1]);
    };
    img.onerror = fehler; img.src = URL.createObjectURL(datei);
  });
}
const FOTO = {
  deutsch: { titel: "Aufsatz korrigieren", kurz: "Aufsatz fotografieren, Korrektur kommt in die App", ding: "Aufsatz", platz: "Aufgabenstellung (z. B. „Erlebniserzählung: Mein schönster Tag“)", tipps: "Tipps für den nächsten Aufsatz", besser: "Verbesserter Text" },
  englisch: { titel: "Text korrigieren", kurz: "Englischen Text oder Hausübung fotografieren", ding: "Text", platz: "Aufgabe (z. B. „Write about your pet“ oder „Workbook S. 34“)", tipps: "Tipps für das nächste Mal", besser: "Verbesserter Text" },
  mathe: { titel: "Rechnung kontrollieren", kurz: "Rechnungen fotografieren, Lösungen prüfen lassen", ding: "Rechnung", platz: "Aufgabe (z. B. „Buch S. 45, Nr. 3–6“)", tipps: "Tipps zum Rechnen", besser: "Richtiger Rechenweg" },
};
const fotoFach = a => a.fach || "deutsch";
const fotoText = (f = fach.id) => FOTO[f] || { titel: "Aufgabe korrigieren", kurz: "Hausübung oder Lösung fotografieren, Korrektur kommt in die App", ding: "Aufgabe", platz: "Aufgabe (z. B. „Buch S. 30, Nr. 2“)", tipps: "Tipps für das nächste Mal", besser: "Richtige Lösung" };
async function aufsatzListe() {
  const T = fotoText();
  setzeKopf(T.ding, fachSeite);
  if (gast || !wolke || !fb) {
    zeige(el("div", { class: "karte" }, el("div", { class: "label" }, "Foto-Korrektur"), el("h2", {}, T.titel),
      el("p", {}, gast ? "Im Testkonto nicht verfügbar – dafür muss ein Kind angemeldet sein." : "Dafür musst du angemeldet sein.")));
    return;
  }
  zeige(el("p", { class: "hinweis mitte" }, "Lade …"));
  let liste = [];
  try {
    const q = fb.F.query(fb.F.collection(fb.db, "aufsaetze"), fb.F.where("uid", "==", wolke.uid));
    const snap = await fb.F.getDocs(q);
    snap.forEach(d => liste.push(Object.assign({ id: d.id }, d.data())));
    liste = liste.filter(a => fotoFach(a) === fach.id);
    liste.sort((a, b) => (b.datum || "").localeCompare(a.datum || ""));
  } catch (e) { console.error(e); }
  const datei = el("input", { type: "file", accept: "image/*", capture: "environment", style: "display:none" });
  const aufgabe = el("input", { class: "eingabe", placeholder: T.platz, maxlength: "300" });
  const info = el("div");
  const senden = el("button", { class: "knopf", onclick: () => datei.click() }, ic("play"), "Foto aufnehmen / auswählen");
  datei.addEventListener("change", async () => {
    if (!datei.files[0]) return;
    senden.disabled = true; info.replaceChildren(el("div", { class: "feedback neutral" }, "Foto wird hochgeladen …"));
    try {
      const bild = await bildVerkleinern(datei.files[0]);
      await fb.F.addDoc(fb.F.collection(fb.db, "aufsaetze"), { uid: wolke.uid, kind: wolke.kind, fach: fach.id, aufgabe: aufgabe.value.trim(), bild, status: "offen", datum: `${heute()} ${uhrzeit()}`, erstellt: fb.F.serverTimestamp() });
      const pr = profil(person.id); protokoll(pr, { f: fach.id, art: "Foto", titel: aufgabe.value.trim() || `${T.ding} hochgeladen` }); speichern(person.id, PROFIL, pr);
      info.replaceChildren(el("div", { class: "feedback ok pop" }, el("b", {}, "Abgegeben! "), "Die Korrektur kommt meistens innerhalb einer Stunde hier in die App."));
      setTimeout(aufsatzListe, 2500);
    } catch (e) { console.error(e); info.replaceChildren(el("div", { class: "feedback nein" }, "Hochladen hat nicht geklappt. Ist das Internet an?")); senden.disabled = false; }
  });
  zeige(
    el("div", { class: "karte" }, el("div", { class: "label" }, `${fach.name} · Aufgabe zur Korrektur`), el("h2", {}, T.titel),
      el("p", { class: "klein" }, "Hier lädst du DEINE Lösung hoch (Aufsatz, Hausübung, Rechnung). Lernstoff aus dem Buch gehört zu „Lernmaterial“. Fotografiere gerade von oben, bei gutem Licht. Mehrere Seiten: jede Seite einzeln abgeben."),
      aufgabe, senden, datei, info),
    el("div", { class: "label" }, "Meine Abgaben"),
    liste.length ? null : el("p", { class: "hinweis" }, "Noch nichts abgegeben."),
    ...liste.map(a => el("button", { class: `test-knopf ${a.status === "korrigiert" ? "ok" : ""}`, onclick: () => a.status === "korrigiert" ? aufsatzZeigen(a) : null },
      el("span", {}, a.aufgabe || T.ding, el("small", {}, `${a.datum || ""} · ${a.status === "korrigiert" ? `korrigiert · ${(a.korrektur.fehler || []).length} Fehler` : "wartet auf Korrektur …"}`)),
      ic(a.status === "korrigiert" ? "haken" : "schloss"))));
}
function aufsatzZeigen(a) {
  const k = a.korrektur || {}, T = fotoText(fotoFach(a));
  setzeKopf("Korrektur", aufsatzListe);
  const farbe = { Rechenfehler: "#ff4d5e", Rechenweg: "#ffb703", Einheit: "#8b8bff", Vokabel: "#2ee59d", Rechtschreibung: "#ff4d5e", Grammatik: "#ffb703", Zeichensetzung: "#8b8bff", Ausdruck: "#2ee59d", Inhalt: "#9a9aae" };
  zeige(
    el("div", { class: "karte titelkarte" }, el("div", { class: "label" }, "Korrektur"), el("h2", {}, a.aufgabe || `Dein ${T.ding}`),
      k.lob ? el("p", {}, "👍 ", k.lob) : null, k.einschaetzung ? el("p", { class: "klein" }, k.einschaetzung) : null),
    (k.fehler || []).length ? el("div", { class: "karte" }, el("div", { class: "label" }, `${k.fehler.length} Verbesserungen`),
      ...k.fehler.map(f => el("div", { class: "fehler-zeile" },
        el("span", { class: "fehler-art", style: `color:${farbe[f.art] || "#fff"}` }, f.art),
        el("div", {}, el("s", {}, f.original), " → ", el("b", {}, f.korrektur)),
        el("div", { class: "klein" }, f.erklaerung)))) : null,
    k.korrigierter_text ? el("div", { class: "karte" }, el("div", { class: "label" }, T.besser), el("div", { class: "aufsatz-text" }, k.korrigierter_text)) : null,
    (k.tipps || []).length ? el("div", { class: "karte" }, el("div", { class: "label" }, T.tipps), el("ul", {}, ...k.tipps.map(t => el("li", {}, t)))) : null,
    k.originaltext ? el("div", { class: "karte" }, el("div", { class: "label" }, "Dein Text (abgeschrieben)"), el("div", { class: "aufsatz-text klein" }, k.originaltext)) : null);
}

function sprechListe() {
  setzeKopf("Sprechen", fachSeite);
  zeige(el("div", { class: "label" }, fach.name), el("h2", {}, "Sprechen"),
    el("p", { class: "klein" }, SR ? "Die App spricht vor, du antwortest laut auf Englisch. Tipp: Kopfhörer oder ruhiger Raum." : "Dein Browser kann leider nicht zuhören (am besten Chrome verwenden). Du kannst die Antworten aber eintippen."),
    ...daten.sprechen.map((g, i) => el("button", { class: "test-knopf", onclick: () => gespraech(g) }, el("span", {}, g.titel, el("small", {}, g.kurz || `${g.schritte.length} Fragen`)), ic("mikro"))));
}
function gespraech(g) {
  let i = 0, pkt = 0;
  const verlauf = el("div");
  const bereich = el("div");
  setzeKopf("Sprechen", sprechListe);
  zeige(el("div", { class: "karte" }, el("div", { class: "label" }, g.titel), verlauf, bereich));
  const pruefe = (text, sch) => { const t = norm(text).replace(/[,.!?']/g, " "); return sch.erwartet.some(alt => alt.every(w => new RegExp(`\\b${norm(w).replace(/[,.!?']/g, " ")}\\b`).test(t))); };
  function schritt() {
    if (i >= g.schritte.length) {
      const s = laden(person.id, fach.id); s.sterne += pkt; speichern(person.id, fach.id, s);
      const neu = belohnungenPruefen(pr => {
        protokoll(pr, { f: fach.id, art: "Sprechen", titel: g.titel, erg: `${pkt}/${g.schritte.length}` });
        pr.gespraeche[`${fach.id}/${g.titel}`] = { d: heute(), erg: pkt, von: g.schritte.length };
      });
      setzeKopf("Sprechen", sprechListe);
      bereich.replaceChildren(el("div", { class: "feedback ok pop" }, el("b", {}, "Gespräch geschafft! +", punkte(person.id, pkt))),
        ...neu.map(gs => el("button", { class: "gutschein-neu pop", onclick: () => gutscheinZeigen(gs) }, ic("ticket"), el("span", {}, el("b", {}, "Neuer Gutschein: "), gs.was))),
        el("button", { class: "knopf", onclick: () => gespraech(g) }, "Nochmal"), el("button", { class: "knopf zweit", onclick: sprechListe }, "Andere Gespräche"));
      ueberraschung(neu);
      return;
    }
    const sch = g.schritte[i];
    verlauf.append(el("div", { class: "sprechblase pop" }, sch.sagt));
    vorlesen(sch.sagt);
    let versuche = 0;
    const info = el("div");
    const fertig = (ok, text) => {
      if (text) verlauf.append(el("div", { class: "sprechblase ich pop" }, text));
      if (ok) { pkt++; info.replaceChildren(el("div", { class: "feedback ok pop" }, el("b", {}, zufall(person.lob)), sch.lob ? ` ${sch.lob}` : "")); }
      else info.replaceChildren(el("div", { class: "feedback nein pop" }, el("b", {}, "Fast! "), "So könntest du sagen: ", el("b", {}, sch.tipp)));
      if (ok || versuche >= 2) { i++; knoepfe.replaceChildren(el("button", { class: "knopf", onclick: schritt }, "Weiter")); }
    };
    const knoepfe = el("div");
    const eingabe = el("input", { class: "eingabe", placeholder: "oder hier eintippen …", autocomplete: "off" });
    eingabe.addEventListener("keydown", e => { if (e.key === "Enter" && eingabe.value.trim()) { versuche++; const t = eingabe.value; eingabe.value = ""; fertig(pruefe(t, sch), t); } });
    const mikro = el("button", { class: "mikro", onclick: () => {
      if (!SR) return;
      const r = new SR(); r.lang = "en-GB"; r.interimResults = false; r.maxAlternatives = 3;
      mikro.classList.add("an");
      r.onresult = e => { const alts = [...e.results[0]].map(a => a.transcript); versuche++; const ok = alts.some(a => pruefe(a, sch)); fertig(ok, alts[0]); };
      r.onerror = e => info.replaceChildren(el("div", { class: "feedback neutral" }, e.error === "not-allowed" ? "Bitte erlaube das Mikrofon." : "Nichts gehört – tippe nochmal aufs Mikrofon."));
      r.onend = () => mikro.classList.remove("an");
      r.start();
    } }, ic("mikro"));
    knoepfe.replaceChildren(...[
      SR ? mikro : null,
      el("button", { class: "knopf zweit", onclick: () => vorlesen(sch.sagt) }, "Nochmal vorlesen"),
      eingabe,
      el("button", { class: "reset", onclick: () => { versuche = 9; fertig(false); } }, "Weiß ich nicht – zeig mir die Lösung")].filter(Boolean));
    bereich.replaceChildren(info, knoepfe);
  }
  schritt();
}

// ---------- Eltern-Statistik ----------
const PAPA = `papa@${MAIL_DOMAIN}`;
function dauer(sek) {
  sek = Math.round(sek || 0); if (sek < 60) return sek ? "< 1 min" : "–";
  const m = Math.round(sek / 60), h = Math.floor(m / 60);
  return h ? `${h} h ${String(m % 60).padStart(2, "0")} min` : `${m} min`;
}
const datumDE = d => { const [y, m, t] = d.split("-"); return `${t}.${m}.`; };
async function elternStart() {
  thema(null); person = null; gast = false;
  if (!CFG) { elternSeite(Object.fromEntries(PERSONEN.map(p => [p.id, Object.fromEntries([...faecherVon(p.id).map(f => f.id), PROFIL].map(f => [f, lokalLaden(p.id, f)]))])), true); return; }
  setzeKopf("Eltern", gastWahl);
  zeige(el("p", { class: "hinweis mitte" }, "Lade …"));
  try { await fbLaden(); } catch (e) { zeige(el("div", { class: "karte" }, "Keine Internetverbindung.")); return; }
  if (fb.auth.currentUser && fb.auth.currentUser.email === PAPA) { elternLaden(); return; }
  const pw = el("input", { class: "eingabe", type: "password", autocomplete: "current-password", placeholder: "Eltern-Passwort" });
  const fehler = el("div");
  const los = el("button", { class: "knopf", onclick: async () => {
    if (!pw.value) return; los.disabled = true; fehler.replaceChildren();
    try { await fb.A.signInWithEmailAndPassword(fb.auth, PAPA, pw.value); wolke = null; elternLaden(); }
    catch (e) { console.error(e); fehler.replaceChildren(el("div", { class: "feedback nein" }, /invalid|wrong|not-found/.test(e.code || "") ? "Passwort stimmt nicht (oder das Papa-Konto ist in Firebase noch nicht angelegt)." : "Anmelden hat nicht geklappt.")); los.disabled = false; }
  } }, "Anmelden");
  pw.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); los.click(); } });
  zeige(el("div", { class: "karte" }, el("div", { class: "label" }, "Eltern-Bereich"), el("h2", {}, "Statistik"), el("p", { class: "klein" }, "Nur für Papa. Melde dich mit dem Eltern-Passwort an."), pw, los, fehler));
  setTimeout(() => pw.focus(), 50);
}
async function elternLaden() {
  setzeKopf("Eltern", gastWahl);
  zeige(el("p", { class: "hinweis mitte" }, "Lade Statistik …"));
  try {
    const snap = await fb.F.getDocs(fb.F.collection(fb.db, "fortschritt"));
    const alle = {};
    snap.forEach(d => { const x = d.data(); if (x.kind) alle[x.kind] = Object.assign({}, x.stand, { _zeit: x.zeit && x.zeit.toDate ? x.zeit.toDate() : null, _uid: d.id }); });
    elternSeite(alle, false);
  } catch (e) {
    console.error(e);
    zeige(el("div", { class: "karte" }, el("div", { class: "label" }, "Kein Zugriff"), el("p", {}, "Die Speicherregeln in Firebase erlauben dem Papa-Konto noch nicht, die Daten zu lesen. Bitte die neuen Regeln aus der Anleitung einfügen.")),
      el("button", { class: "knopf zweit", onclick: elternAbmelden }, "Abmelden"));
  }
}
async function elternAbmelden() { if (fb) await fb.A.signOut(fb.auth); gastWahl(); }
async function elternSeite(alle, lokal) {
  setzeKopf("Eltern", gastWahl);
  const dateien = {};
  await Promise.all(PERSONEN.flatMap(p => faecherVon(p.id).map(async f => {
    try { const r = await fetch(`daten/${p.id}/${f.id}.json?v=${Date.now()}`); if (r.ok) dateien[`${p.id}/${f.id}`] = await r.json(); } catch (e) {}
  })));
  const tab = el("div");
  const zeigeKind = p => {
    [...reiter.children].forEach(b => b.classList.toggle("aktiv", b.dataset.k === p.id));
    tab.replaceChildren(kindStatistik(p, alle[p.id] || {}, dateien, lokal));
  };
  const reiter = el("div", { class: "reiter" }, ...PERSONEN.map(p => el("button", { "data-k": p.id, onclick: () => zeigeKind(p) }, p.name)));
  zeige(
    el("div", { class: "label" }, lokal ? "Eltern-Statistik · nur dieses Gerät" : "Eltern-Statistik · alle Geräte"),
    el("h2", {}, "Übersicht"),
    el("div", { class: "raster zwei" }, ...PERSONEN.map(p => {
      const st = alle[p.id] || {}, pr = Object.assign(PROFIL_LEER(), st[PROFIL] || {});
      const sterne = faecherVon(p.id).reduce((n, f) => n + ((st[f.id] || {}).sterne || 0), 0);
      const ges = Object.values(pr.zeit).reduce((n, z) => n + (z.ges || 0), 0);
      const letzt = pr.log.length ? pr.log[pr.log.length - 1] : null;
      return el("div", { class: "karte kpi" }, el("div", { class: "label" }, p.name),
        el("div", { class: "kpi-wert" }, dauer(ges)), el("div", { class: "klein" }, "Lernzeit gesamt"),
        el("div", { class: "klein" }, punkte(p.id, sterne), ` · ${rang(p, sterne).name} · Serie ${serie(pr)}`),
        el("div", { class: "klein" }, letzt ? `Zuletzt aktiv: ${datumDE(letzt.d)} ${letzt.t}` : "Noch nicht aktiv"));
    })),
    lokal ? null : eingangKarte(),
    reiter, tab,
    lokal ? null : el("button", { class: "reset", onclick: elternAbmelden }, "Eltern-Bereich abmelden"));
  zeigeKind(PERSONEN[0]);
}
// Eingang: was die Kinder hochgeladen haben und noch auf den Korrektur-Lauf wartet
const KORREKTUR_TEXT = "Jetzt korrigieren";
function eingangKarte() {
  const box = el("div", { class: "karte eingang" }, el("div", { class: "label" }, "Eingang"), el("p", { class: "klein" }, "Lade …"));
  (async () => {
    const holen = async (col, status) => { const r = []; const snap = await fb.F.getDocs(fb.F.query(fb.F.collection(fb.db, col), fb.F.where("status", "==", status))); snap.forEach(d => r.push(Object.assign({ id: d.id }, d.data()))); return r; };
    let abg, mat;
    try { [abg, mat] = await Promise.all([holen("aufsaetze", "offen"), holen("material", "neu")]); }
    catch (e) { console.error(e); box.replaceChildren(el("div", { class: "label" }, "Eingang"), el("p", { class: "klein" }, "Die Liste der Uploads kann noch nicht gelesen werden – in Firebase fehlt dafür noch eine Leseregel fürs Papa-Konto.")); return; }
    const pakete = Object.values(mat.reduce((m, x) => { (m[x.paket] = m[x.paket] || { ...x, n: 0 }).n++; return m; }, {}));
    const name = id => (PERSONEN.find(p => p.id === id) || { name: id || "?" }).name;
    const fname = id => (FAECHER.find(f => f.id === id) || { name: id || "Deutsch" }).name;
    const n = abg.length + pakete.length, dt = d => (d || "").replace(/^(\d{4})-(\d\d)-(\d\d)/, "$3.$2.");
    if (!n) { box.replaceChildren(el("div", { class: "label" }, "Eingang"), el("p", { class: "klein" }, "✓ Nichts offen. Alles, was die Burschen hochgeladen haben, ist schon verarbeitet.")); return; }
    const kopieren = async () => { try { await navigator.clipboard.writeText(KORREKTUR_TEXT); } catch (e) {} window.open("https://claude.ai/", "_blank", "noopener"); };
    box.classList.add("neu");
    box.replaceChildren(
      el("div", { class: "eingang-kopf" }, el("div", { class: "label" }, "Eingang"), el("span", { class: "eingang-zahl" }, String(n))),
      el("h2", {}, n === 1 ? "1 neuer Upload wartet" : `${n} neue Uploads warten`),
      ...abg.map(a => el("div", { class: "zeile" }, el("span", {}, `📝 ${name(a.kind)} · ${fname(a.fach)}${a.aufgabe ? ` · ${a.aufgabe}` : ""}`), el("b", {}, dt(a.datum)))),
      ...pakete.map(m => el("div", { class: "zeile" }, el("span", {}, `📚 ${name(m.kind)} · ${fname(m.fach)} · ${m.kapitel || "Lernmaterial"} (${m.n} Fotos)`), el("b", {}, dt(m.datum)))),
      el("p", { class: "klein" }, "Der automatische Lauf holt das spätestens zur nächsten vollen Stunde (jeweils um :12). Sofort geht's mit dem Knopf: er öffnet Claude, dort einfach „Jetzt korrigieren“ ins Projekt schreiben (der Text ist schon kopiert)."),
      el("button", { class: "knopf", onclick: kopieren }, ic("play"), "Jetzt korrigieren"));
  })();
  return box;
}
async function elternAllesReset(p, st, lokal) {
  if (!confirm(`Wirklich ALLES von ${p.name} löschen?\n\nPunkte, Runden, Ränge, Serie, Gutscheine, Tests und Lernzeit in allen Fächern. Das lässt sich nicht rückgängig machen.`)) return;
  if (!confirm(`Sicher? ${p.name} beginnt dann wieder bei 0.`)) return;
  if (lokal) { try { [...faecherVon(p.id).map(f => f.id), PROFIL].forEach(f => localStorage.removeItem(key(p.id, f))); } catch (e) {} elternStart(); return; }
  if (!st._uid) { alert(`${p.name} hat noch keinen gespeicherten Fortschritt.`); return; }
  try { await fb.F.setDoc(fb.F.doc(fb.db, "fortschritt", st._uid), { stand: { _reset: Date.now() }, kind: p.id, zeit: fb.F.serverTimestamp() }); alert(`Erledigt: ${p.name} startet wieder bei 0.`); elternLaden(); }
  catch (e) { console.error(e); alert("Löschen hat nicht geklappt: Firebase erlaubt dem Papa-Konto das Ändern noch nicht. Bitte die Speicherregel aus dem Chat eintragen."); }
}
function loeschKarte(p, st, lokal) {
  const wahl = el("select", { class: "eingabe" }, el("option", { value: "" }, "Fach wählen …"), ...faecherVon(p.id).map(f => el("option", { value: f.id }, f.name)));
  return el("details", { class: "karte loesch" },
    el("summary", {}, el("span", { class: "label" }, "Fortschritt löschen"), el("span", { class: "klein" }, ` · ${p.name}`)),
    el("p", { class: "klein" }, "Ein einzelnes Fach zurücksetzen (Punkte, Runden und offene Fragen in diesem Fach):"),
    wahl,
    el("button", { class: "knopf zweit", onclick: () => { const f = faecherVon(p.id).find(x => x.id === wahl.value); if (f) elternReset(p, f, st, lokal); else alert("Bitte zuerst ein Fach wählen."); } }, "Dieses Fach zurücksetzen"),
    el("p", { class: "klein", style: "margin-top:16px" }, "Oder komplett neu anfangen – alles in allen Fächern, auch Gutscheine und Lernzeit:"),
    el("button", { class: "knopf gefahr", onclick: () => elternAllesReset(p, st, lokal) }, `Alles von ${p.name} löschen`));
}
async function elternReset(p, f, st, lokal) {
  if (!confirm(`Übungs-Fortschritt in ${f.name} für ${p.name} wirklich löschen? (Punkte, Runden und offene Fragen in diesem Fach. Gutscheine, Tests und Lernzeit bleiben.)`)) return;
  if (lokal) { try { localStorage.setItem(key(p.id, f.id), "{}"); } catch (e) {} elternStart(); return; }
  if (!st._uid) { alert(`${p.name} hat noch keinen gespeicherten Fortschritt.`); return; }
  const stand = Object.fromEntries(Object.entries(st).filter(([k]) => !k.startsWith("_") || k === PROFIL));
  stand[f.id] = {}; stand._reset = Date.now();
  try { await fb.F.setDoc(fb.F.doc(fb.db, "fortschritt", st._uid), { stand, kind: p.id, zeit: fb.F.serverTimestamp() }); elternLaden(); }
  catch (e) { console.error(e); alert("Zurücksetzen hat nicht geklappt. Wahrscheinlich fehlt in Firebase noch die neue Regel, die dem Papa-Konto das Ändern erlaubt."); }
}
function kindStatistik(p, st, dateien, lokal) {
  const pr = Object.assign(PROFIL_LEER(), st[PROFIL] || {});
  const tage = []; for (let i = 13; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); tage.push(heute(d)); }
  const max = Math.max(600, ...tage.map(t => (pr.zeit[t] || {}).ges || 0));
  const sum = ts => ts.reduce((n, t) => n + ((pr.zeit[t] || {}).ges || 0), 0);
  const fachZeit = f => Object.values(pr.zeit).reduce((n, z) => n + (z[f] || 0), 0);
  const fachName = id => (FAECHER.find(f => f.id === id) || { name: id }).name;
  const kt = kommend(p.id).slice(0, 5);
  return el("div", { class: "pop" },
    loeschKarte(p, st, lokal),
    kt.length ? el("div", { class: "karte" }, el("div", { class: "label" }, "Nächste Tests & Schularbeiten"),
      ...kt.map(t => el("div", { class: `zeile ${tageBis(t.datum) <= 14 ? "bald" : ""}` }, el("span", {}, `${datumLang(t.datum)}${t.zeit ? `, ${t.zeit} Uhr` : ""} · ${t.titel}`), el("b", {}, wannText(tageBis(t.datum)))))) : null,
    el("div", { class: "karte" }, el("div", { class: "label" }, "Lernzeit"),
      el("div", { class: "kpi-reihe" },
        el("div", {}, el("div", { class: "kpi-wert" }, dauer((pr.zeit[heute()] || {}).ges)), el("div", { class: "klein" }, "heute")),
        el("div", {}, el("div", { class: "kpi-wert" }, dauer(sum(tage.slice(-7)))), el("div", { class: "klein" }, "letzte 7 Tage")),
        el("div", {}, el("div", { class: "kpi-wert" }, dauer(Object.values(pr.zeit).reduce((n, z) => n + (z.ges || 0), 0))), el("div", { class: "klein" }, "gesamt"))),
      el("div", { class: "balken" }, ...tage.map(t => { const v = (pr.zeit[t] || {}).ges || 0;
        return el("div", { class: "balken-tag", title: `${datumDE(t)}: ${dauer(v)}` }, el("div", { class: "balken-wert", style: `height:${Math.round(v / max * 100)}%` }), el("span", {}, datumDE(t).slice(0, 2))); })),
      el("div", { class: "klein" }, "Letzte 14 Tage (Minuten pro Tag). Gezählt wird nur, wenn die App offen ist und aktiv geübt wird.")),
    ...faecherVon(p.id).map(f => {
      const d = dateien[`${p.id}/${f.id}`] || { fragen: [] }, s = Object.assign({ sterne: 0, runden: 0, offen: [], gesehen: {} }, st[f.id] || {});
      const geuebt = d.fragen.filter(q => s.gesehen[q.id]).length;
      const zeilen = [];
      (d.tests || []).forEach(t => { const i = pr.tests[`${f.id}/${t.id}`]; zeilen.push(el("div", { class: "zeile" }, el("span", {}, "Test · ", t.titel), el("b", { class: i && i.bestanden ? "gut" : "" }, i ? (i.bestanden ? "✓ bestanden" : `${i.versuche}× · bestes ${i.beste}/${t.fragen.length}`) : "–"))); });
      (d.wissen || []).forEach(w => { const g = pr.gelesen[`${f.id}/${w.titel}`]; zeilen.push(el("div", { class: "zeile" }, el("span", {}, "Wissen · ", w.titel), el("b", { class: g ? "gut" : "" }, g ? `gelesen ${datumDE(g)}` : "–"))); });
      (d.sprechen || []).forEach(g => { const x = pr.gespraeche[`${f.id}/${g.titel}`]; zeilen.push(el("div", { class: "zeile" }, el("span", {}, "Sprechen · ", g.titel), el("b", { class: x ? "gut" : "" }, x ? `${x.erg}/${x.von} · ${datumDE(x.d)}` : "–"))); });
      return el("div", { class: "karte" },
        el("div", { class: "status-kopf" }, el("div", {}, el("div", { class: "fach-name" }, f.name), stoffMarke(d.fragen.length ? !d.platzhalter : null)), el("div", { class: "klein" }, dauer(fachZeit(f.id)))),
        el("div", { class: "fortschritt" }, el("div", { style: `width:${d.fragen.length ? Math.round(geuebt / d.fragen.length * 100) : 0}%` })),
        el("div", { class: "klein" }, `${geuebt} von ${d.fragen.length} Übungsfragen geübt · ${s.runden} Runden · `, punkte(p.id, s.sterne), ` · ${s.offen.length} Fragen offen`),
        ...zeilen,
        (s.runden || s.sterne || s.offen.length || geuebt) ? el("button", { class: "reset", onclick: () => elternReset(p, f, st, lokal) }, `${f.name} für ${p.name} zurücksetzen`) : null);
    }),
    el("div", { class: "karte" }, el("div", { class: "label" }, `Gutscheine (${pr.gutscheine.length})`),
      pr.gutscheine.length ? null : el("p", { class: "klein" }, "Noch keine."),
      ...pr.gutscheine.slice().reverse().map(g => el("div", { class: "zeile" }, el("span", {}, `${g.was} · ${g.grund}`), el("b", { class: "code" }, `${datumDE(g.datum)} ${g.code}`)))),
    el("div", { class: "karte" }, el("div", { class: "label" }, "Verlauf (zuletzt)"),
      pr.log.length ? null : el("p", { class: "klein" }, "Noch keine Aktivitäten."),
      ...pr.log.slice(-40).reverse().map(e => el("div", { class: "zeile" }, el("span", {}, `${datumDE(e.d)} ${e.t} · ${fachName(e.f)} · ${e.art}${e.titel ? " · " + e.titel : ""}`), el("b", {}, e.erg || "")))));
}

async function starten() {
  await Promise.all(PERSONEN.map(p => termineLaden(p.id)));
  try { const r = await fetch(`belohnungen.json?v=${Date.now()}`); if (r.ok) BELOHNUNG = Object.assign(BELOHNUNG, await r.json()); } catch (e) {}
  if (!CFG) { startseite(); return; }
  zeige(el("p", { class: "hinweis" }, "Lade …"));
  try {
    await fbLaden();
    const user = await new Promise(res => { const u = fb.A.onAuthStateChanged(fb.auth, x => { u(); res(x); }); });
    if (user) { try { await wolkeVerbinden(user); } catch (e) { console.error(e); } }
  } catch (e) {
    console.error(e);
    zeige(el("div", { class: "karte" }, el("p", {}, "Die App braucht Internet zum Anmelden. Bitte später nochmal probieren. 📶")),
      el("button", { class: "knopf", onclick: () => location.reload() }, "Nochmal versuchen"),
      el("button", { class: "reset", onclick: gastWahl }, "👀 Testkonto (Papa)"));
    return;
  }
  startseite();
}
starten();
