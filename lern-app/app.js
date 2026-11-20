// Lern-Helden – einfache Lern-App ohne Server. Fortschritt bleibt im Browser (localStorage).
const PERSONEN = [
  { id: "valentin", name: "Valentin", emo: "🦸‍♂️" },
  { id: "elias", name: "Elias", emo: "🚀" },
];
const FAECHER = [
  { id: "englisch", name: "Englisch", emo: "🇬🇧" },
  { id: "mathe", name: "Mathe", emo: "🔢" },
  { id: "biologie", name: "Biologie", emo: "🌿" },
  { id: "deutsch", name: "Deutsch", emo: "📖" },
  { id: "geografie", name: "Geografie", emo: "🌍" },
];
const RUNDE = 10;
const LOB = ["Super!", "Richtig!", "Klasse!", "Spitze!", "Genau!", "Stark!"];
const HELDEN_LOB = ["Brilliant! 🦸", "Splendid! ⚡", "Jolly good! 🛡️", "Heldenhaft! 💥", "Avengers-reif! 🌟", "Spidey-Sinn stimmt! 🕷️"];
const BADGES = [
  { id: "erste", emo: "🎉", name: "Erste Runde", ok: s => s.runden >= 1 },
  { id: "perfekt", emo: "💯", name: "Perfekte Runde", ok: s => s.perfekt >= 1 },
  { id: "s25", emo: "⭐", name: "25 Sterne", ok: s => s.sterne >= 25 },
  { id: "s100", emo: "🌟", name: "100 Sterne", ok: s => s.sterne >= 100 },
  { id: "r5", emo: "🏅", name: "5 Runden", ok: s => s.runden >= 5 },
  { id: "r20", emo: "🏆", name: "20 Runden", ok: s => s.runden >= 20 },
];

const app = document.getElementById("app");
const zeige = (...kids) => app.replaceChildren(...kids.filter(k => k != null));
const titel = document.getElementById("titel");
const zurueck = document.getElementById("zurueck");
const sterneTop = document.getElementById("sterne-top");
let person = null, fach = null, daten = null, runde = null, zurueckZiel = null;

// ---------- Speicher ----------
function key(p, f) { return `lernhelden:${p}:${f}`; }
function laden(p, f) {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(key(p, f))); } catch (e) {}
  return Object.assign({ sterne: 0, runden: 0, perfekt: 0, offen: [], gesehen: {} }, s || {});
}
function speichern(p, f, s) { try { localStorage.setItem(key(p, f), JSON.stringify(s)); } catch (e) {} }
function sterneGesamt(p) { return FAECHER.reduce((n, f) => n + laden(p, f.id).sterne, 0); }

// ---------- Hilfen ----------
const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v; else if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v);
  }
  for (const k of kids) if (k != null) e.append(k.nodeType ? k : document.createTextNode(k));
  return e;
};
const mischen = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const zufall = a => a[Math.floor(Math.random() * a.length)];
function norm(t) {
  return String(t).toLowerCase().replace(/[’`´]/g, "'").replace(/[.!?;:]+$/g, "").replace(/\s+/g, " ").trim();
}
function zahl(t) { const s = String(t).replace(/\s/g, "").replace(",", "."); return s !== "" && !isNaN(s) ? Number(s) : null; }
function stimmt(eingabe, antworten) {
  antworten = [].concat(antworten);
  const n = norm(eingabe), z = zahl(eingabe);
  return antworten.some(a => norm(a) === n || (z !== null && zahl(a) !== null && Math.abs(zahl(a) - z) < 1e-9));
}
function setzeKopf(t, ziel) {
  titel.textContent = t;
  zurueckZiel = ziel; zurueck.hidden = !ziel;
  sterneTop.textContent = person ? `⭐ ${sterneGesamt(person.id)}` : "";
}
zurueck.addEventListener("click", () => zurueckZiel && zurueckZiel());

// ---------- Bildschirme ----------
function startseite() {
  person = null; fach = null;
  setzeKopf("Lern-Helden", null);
  zeige(
    el("h2", {}, "Wer lernt heute?"),
    el("div", { class: "raster" }, ...PERSONEN.map((p, i) =>
      el("button", { class: `gross person c${i ? 1 : 0}`, onclick: () => { person = p; faecherSeite(); } },
        el("span", { class: "emo" }, p.emo), `Lernen ${p.name}`, el("small", {}, `⭐ ${sterneGesamt(p.id)} Sterne`))))
  );
}

function faecherSeite() {
  fach = null;
  setzeKopf(`Hallo ${person.name}!`, startseite);
  zeige(
    el("h2", {}, "Welches Fach?"),
    el("div", { class: "raster" }, ...FAECHER.map((f, i) => {
      const s = laden(person.id, f.id);
      return el("button", { class: `gross c${i}`, onclick: () => fachLaden(f) },
        el("span", { class: "emo" }, f.emo), f.name,
        el("small", {}, `⭐ ${s.sterne} · ${s.runden} Runden`));
    }))
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
  const s = laden(person.id, fach.id);
  setzeKopf(fach.name, faecherSeite);
  const held = daten.thema === "helden";
  zeige(
    el("div", { class: `karte ergebnis ${held ? "held" : ""}` },
      el("div", { class: "big" }, held ? "🦸‍♂️" : fach.emo),
      el("h2", {}, daten.titel || fach.name),
      daten.untertitel ? el("p", {}, daten.untertitel) : null,
      el("p", {}, `⭐ ${s.sterne} Sterne · ${s.runden} Runden · ${daten.fragen.length} Fragen`),
      s.offen.length ? el("p", {}, `🔁 ${s.offen.length} Fragen zum Wiederholen`) : null),
    daten.platzhalter ? el("div", { class: "platzhalter" }, "Übungsfragen zum Ausprobieren – die echten Fragen aus dem Schulstoff kommen bald.") : null,
    el("button", { class: "knopf", onclick: rundeStarten }, `Los geht's! (${Math.min(RUNDE, daten.fragen.length)} Fragen)`),
    el("div", { class: "karte" }, el("b", {}, "Abzeichen"),
      el("div", { class: "badges" }, ...BADGES.map(b => el("span", { class: `badge ${b.ok(s) ? "" : "aus"}` }, `${b.emo} ${b.name}`)))),
    el("button", { class: "reset", onclick: () => { if (confirm(`Fortschritt in ${fach.name} für ${person.name} löschen?`)) { speichern(person.id, fach.id, {}); fachSeite(); } } }, "Fortschritt zurücksetzen")
  );
}

function rundeStarten() {
  const s = laden(person.id, fach.id);
  const alle = daten.fragen;
  const nachId = Object.fromEntries(alle.map(q => [q.id, q]));
  const wdh = mischen(s.offen.filter(id => nachId[id])).slice(0, 4).map(id => nachId[id]);
  const rest = mischen(alle.filter(q => !wdh.includes(q)))
    .sort((a, b) => (s.gesehen[a.id] || 0) - (s.gesehen[b.id] || 0));
  const auswahl = mischen([...wdh, ...rest.slice(0, RUNDE - wdh.length)]);
  runde = { fragen: auswahl, i: 0, richtig: 0, falsch: [] };
  frageZeigen();
}

function frageZeigen() {
  const q = runde.fragen[runde.i];
  const held = daten.thema === "helden";
  setzeKopf(fach.name, () => { if (confirm("Runde abbrechen?")) fachSeite(); });
  const feedback = el("div");
  const weiter = el("button", { class: "knopf", onclick: naechste }, runde.i + 1 < runde.fragen.length ? "Weiter →" : "Ergebnis anzeigen");
  weiter.hidden = true;
  let fertig = false;

  function auswerten(ok, gegeben) {
    if (fertig) return; fertig = true;
    const s = laden(person.id, fach.id);
    s.gesehen[q.id] = (s.gesehen[q.id] || 0) + 1;
    if (ok) {
      runde.richtig++; s.sterne++;
      s.offen = s.offen.filter(id => id !== q.id);
    } else {
      runde.falsch.push(q);
      if (!s.offen.includes(q.id)) s.offen.push(q.id);
    }
    speichern(person.id, fach.id, s);
    sterneTop.textContent = `⭐ ${sterneGesamt(person.id)}`;
    const loesung = [].concat(q.antwort)[0];
    feedback.replaceChildren(el("div", { class: `feedback pop ${ok ? "ok" : "nein"}` },
      el("b", {}, ok ? `${zufall(held ? HELDEN_LOB : LOB)} +1 ⭐` : "Leider nicht ganz."),
      !ok ? el("div", {}, "Richtig ist: ", el("b", {}, loesung)) : null,
      q.erklaerung ? el("div", {}, "💡 ", q.erklaerung) : null));
    weiter.hidden = false; setTimeout(() => weiter.focus(), 0);
  }

  let eingabeTeil;
  if (q.typ === "auswahl") {
    const opts = mischen(q.optionen);
    const knoepfe = opts.map(o => el("button", { class: "opt", onclick: () => {
      const ok = stimmt(o, q.antwort);
      knoepfe.forEach(k => { k.disabled = true; if (stimmt(k.textContent, q.antwort)) k.classList.add("richtig"); });
      if (!ok) btn(o).classList.add("falsch");
      auswerten(ok, o);
    } }, o));
    const btn = o => knoepfe[opts.indexOf(o)];
    eingabeTeil = el("div", { class: "optionen" }, ...knoepfe);
  } else {
    const inp = el("input", { class: "eingabe", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: q.platzhalter || "Antwort eintippen …", inputmode: q.zahl ? "decimal" : "text" });
    const pruefen = el("button", { class: "knopf", onclick: () => { if (!inp.value.trim()) return; inp.disabled = true; pruefen.hidden = true; auswerten(stimmt(inp.value, q.antwort), inp.value); } }, "Prüfen ✔");
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); if (!fertig) pruefen.click(); } });
    eingabeTeil = el("div", {}, inp, pruefen);
    setTimeout(() => inp.focus(), 50);
  }

  zeige(
    el("div", { class: "fortschritt" }, el("div", { style: `width:${(runde.i / runde.fragen.length) * 100}%` })),
    el("div", { class: "karte pop" },
      el("div", { class: "frage-nr" }, el("span", {}, `Frage ${runde.i + 1} von ${runde.fragen.length}`), el("span", {}, q.art || "")),
      el("p", { class: "frage" }, q.frage),
      eingabeTeil, feedback, weiter)
  );
}

function naechste() {
  runde.i++;
  if (runde.i < runde.fragen.length) frageZeigen(); else ergebnis();
}

function ergebnis() {
  const s = laden(person.id, fach.id);
  const vorher = BADGES.filter(b => b.ok(s)).map(b => b.id);
  s.runden++;
  const n = runde.fragen.length;
  if (runde.richtig === n) { s.perfekt++; s.sterne += 3; }
  speichern(person.id, fach.id, s);
  const neu = BADGES.filter(b => b.ok(s) && !vorher.includes(b.id));
  const anteil = runde.richtig / n;
  const held = daten.thema === "helden";
  const text = anteil === 1 ? (held ? "Perfekt! Du bist ein echter Englisch-Superheld! 🦸‍♂️ +3 Bonus-Sterne" : "Perfekt! Alles richtig! +3 Bonus-Sterne")
    : anteil >= .7 ? "Toll gemacht! 💪" : anteil >= .4 ? "Gut! Mit Üben wird's noch besser. 🙂" : "Dranbleiben – jede Runde macht dich stärker! 💪";
  setzeKopf(fach.name, fachSeite);
  zeige(
    el("div", { class: `karte ergebnis pop ${held ? "held" : ""}` },
      el("div", { class: "big" }, anteil === 1 ? "🏆" : anteil >= .7 ? "🌟" : "⭐"),
      el("h2", {}, `${runde.richtig} von ${n} richtig`),
      el("p", {}, text),
      neu.length ? el("div", {}, el("p", {}, "Neues Abzeichen!"), el("div", { class: "badges" }, ...neu.map(b => el("span", { class: "badge" }, `${b.emo} ${b.name}`)))) : null),
    runde.falsch.length ? el("div", { class: "karte" }, el("b", {}, "Diese Fragen kommen später nochmal:"),
      el("ul", {}, ...runde.falsch.map(q => el("li", {}, q.frage, " → ", el("b", {}, [].concat(q.antwort)[0]))))) : null,
    el("button", { class: "knopf", onclick: rundeStarten }, "Noch eine Runde 🔁"),
    el("button", { class: "knopf zweit", onclick: faecherSeite }, "Anderes Fach")
  );
}

startseite();
