// VALIAS PRO – Duelle zwischen den Konten.
// „Auf Zeit“: beide bekommen dieselben 10 Fragen und spielen, wann sie wollen.
// „Live“: beide spielen gleichzeitig, man sieht den Stand des Gegners in Echtzeit.
// Mehr Richtige gewinnt, bei Gleichstand die schnellere Zeit.
// Gespeichert in Firestore (Sammlung „duelle“); ohne Firebase im Browser (localStorage, zwei Tabs = zwei Geräte).
const DUELL_N = 10;
const mailVon = pid => `${pid}@${MAIL_DOMAIN}`;
const pName = pid => (PERSONEN.find(p => p.id === pid) || { name: pid }).name;
const duellAn = () => !gast && (!CFG || (fb && wolke));
let DUELL_LIVE = null;
const rc = (box, ...k) => box.replaceChildren(...k.flat().filter(x => x != null && x !== false)); // aktuelles Live-Duell (zuletzt bekannter Stand)

// ---------- Speicher ----------
const DS = (() => {
  const LK = "valias-duelle";
  const lokal = () => { try { return JSON.parse(localStorage.getItem(LK) || "{}"); } catch (e) { return {}; } };
  const lokalSchreiben = o => { localStorage.setItem(LK, JSON.stringify(o)); window.dispatchEvent(new Event("duelle-lokal")); };
  const setzPfad = (o, pfad, v) => { const k = pfad.split("."); let x = o; while (k.length > 1) { const a = k.shift(); x = x[a] = x[a] || {}; } x[k[0]] = v; };
  const online = () => !!(CFG && fb);
  const lauschen = fn => { window.addEventListener("storage", fn); window.addEventListener("duelle-lokal", fn); return () => { window.removeEventListener("storage", fn); window.removeEventListener("duelle-lokal", fn); }; };
  return {
    async neu(d) {
      if (online()) return (await fb.F.addDoc(fb.F.collection(fb.db, "duelle"), d)).id;
      const o = lokal(), id = "d" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); o[id] = d; lokalSchreiben(o); return id;
    },
    async setz(id, patch) {
      if (online()) return fb.F.updateDoc(fb.F.doc(fb.db, "duelle", id), patch);
      const o = lokal(); if (!o[id]) return; for (const [k, v] of Object.entries(patch)) setzPfad(o[id], k, v); lokalSchreiben(o);
    },
    async weg(id) {
      if (online()) return fb.F.deleteDoc(fb.F.doc(fb.db, "duelle", id));
      const o = lokal(); delete o[id]; lokalSchreiben(o);
    },
    abo(id, cb) {
      if (online()) return fb.F.onSnapshot(fb.F.doc(fb.db, "duelle", id), s => cb(s.exists() ? Object.assign({ id: s.id }, s.data()) : null), () => cb(null));
      const f = () => { const d = lokal()[id]; cb(d ? Object.assign({ id }, d) : null); }; f(); return lauschen(f);
    },
    meine(cb) {
      const ich = mailVon(person.id);
      if (online()) return fb.F.onSnapshot(fb.F.query(fb.F.collection(fb.db, "duelle"), fb.F.where("teilnehmer", "array-contains", ich)),
        snap => { const l = []; snap.forEach(s => l.push(Object.assign({ id: s.id }, s.data()))); cb(l); }, () => cb(null));
      const f = () => cb(Object.entries(lokal()).map(([id, d]) => Object.assign({ id }, d)).filter(d => d.teilnehmer.includes(ich))); f(); return lauschen(f);
    },
  };
})();
// Abo nur so lange, wie das Element auf der Seite ist
function aboFuer(elem, start, cb) {
  let ab = null, tot = false;
  ab = start(x => {
    if (tot) return;
    if (!document.contains(elem)) { tot = true; if (ab) ab(); return; }
    cb(x);
  });
  if (tot && ab) ab();
  return ab;
}

// ---------- Hilfen ----------
const gegnerVon = d => d.vonPid === person.id ? d.anPid : d.vonPid;
const sp = (d, pid) => (d.spieler || {})[pid] || { i: 0, richtig: 0, zeit: 0, fertig: false, bereit: false };
function sieger(d) {
  const a = sp(d, d.vonPid), b = sp(d, d.anPid);
  if (!a.fertig || !b.fertig) return undefined;
  if (a.richtig !== b.richtig) return a.richtig > b.richtig ? d.vonPid : d.anPid;
  if (Math.abs(a.zeit - b.zeit) >= 100) return a.zeit < b.zeit ? d.vonPid : d.anPid;
  return null;
}
const zeitText = ms => { const s = Math.round(ms / 1000); return s < 60 ? `${s} s` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} min`; };
const artText = d => d.art === "live" ? "⚡ Live" : "⏱ Auf Zeit";
function braucheMich(d) {
  const ich = sp(d, person.id);
  if (d.status === "fertig" || ich.fertig) return false;
  if (d.art === "live") return d.anPid === person.id && !ich.bereit;
  return true;
}

// ---------- Kachel auf der Startseite des Kindes ----------
function duellKachel() {
  if (!duellAn()) return null;
  const zahl = el("span", { class: "duell-zahl", hidden: "hidden" });
  const k = el("button", { class: "fach klein-fach duell-kachel", onclick: duellSeite },
    el("span", { class: "duell-ic" }, "⚔️"), el("div", {}, el("div", { class: "fach-name" }, "Duelle"), el("small", {}, "Fordere jemanden heraus – auf Zeit oder live")), zahl);
  setTimeout(() => aboFuer(k, DS.meine, l => {
    const n = (l || []).filter(braucheMich).length;
    zahl.hidden = !n; zahl.textContent = n;
    const live = (l || []).find(d => d.art === "live" && d.status !== "fertig" && d.anPid === person.id && !sp(d, person.id).bereit);
    k.classList.toggle("ruft", !!live);
  }), 0);
  return k;
}

// ---------- Übersicht ----------
function duellSeite() {
  setzeKopf("⚔️ Duelle", faecherSeite);
  const inhalt = el("div", {}, el("p", { class: "hinweis" }, "Lade Duelle …"));
  zeige(el("button", { class: "knopf", onclick: duellNeu }, "⚔️ Neues Duell"), inhalt);
  aboFuer(inhalt, DS.meine, l => {
    if (!l) { rc(inhalt, el("div", { class: "karte" }, el("p", {}, "Duelle sind gerade nicht erreichbar. Bitte später nochmal probieren."))); return; }
    l.sort((a, b) => (b.erstellt || 0) - (a.erstellt || 0));
    const offen = l.filter(d => d.status !== "fertig"), fertig = l.filter(d => d.status === "fertig");
    const zeile = (d, knoepfe, info) => el("div", { class: "duell-zeile" },
      el("div", {}, el("b", {}, `${artText(d)} gegen ${pName(gegnerVon(d))}`), el("small", {}, `${d.fachName} · ${d.gebiet}`), info ? el("small", {}, info) : null),
      el("div", { class: "duell-knoepfe" }, ...knoepfe));
    const knopf = (t, f, zweit) => el("button", { class: `mini-knopf ${zweit ? "zweit" : ""}`, onclick: f }, t);
    const dran = offen.filter(braucheMich), warten = offen.filter(d => !braucheMich(d));
    const bilanz = {};
    for (const d of fertig) { const g = gegnerVon(d), s = sieger(d), b = bilanz[g] = bilanz[g] || { s: 0, u: 0, n: 0 }; if (s === person.id) b.s++; else if (s === null) b.u++; else b.n++; }
    rc(inhalt, 
      dran.length ? el("div", { class: "karte duell-karte dran" }, el("div", { class: "label" }, "🔥 Du bist dran"),
        ...dran.map(d => zeile(d, [knopf(d.art === "live" ? "Beitreten" : "Spielen", () => d.art === "live" ? duellLive(d.id) : duellSpielen(d))],
          d.art === "live" ? `${pName(d.vonPid)} wartet im Live-Raum!` : sp(d, gegnerVon(d)).fertig ? `${pName(gegnerVon(d))} hat schon gespielt – schlägst du das?` : null))) : null,
      warten.length ? el("div", { class: "karte duell-karte" }, el("div", { class: "label" }, "⏳ Warten auf den Gegner"),
        ...warten.map(d => {
          const g = sp(d, gegnerVon(d)), ich = sp(d, person.id);
          const k = [];
          if (d.art === "live" && !ich.fertig) k.push(knopf("Live-Raum", () => duellLive(d.id)));
          if (d.vonPid === person.id && !g.i && !g.bereit) k.push(knopf("Zurückziehen", () => { if (confirm("Duell zurückziehen?")) DS.weg(d.id); }, true));
          return zeile(d, k, ich.fertig ? `Du: ${ich.richtig}/${d.fragen.length} in ${zeitText(ich.zeit)}` : null);
        })) : null,
      Object.keys(bilanz).length ? el("div", { class: "karte" }, el("div", { class: "label" }, "🏆 Bilanz"),
        ...Object.entries(bilanz).map(([g, b]) => el("div", { class: "duell-bilanz" }, el("b", {}, `gegen ${pName(g)}`), el("span", {}, `${b.s} Siege · ${b.u} unentschieden · ${b.n} Niederlagen`)))) : null,
      fertig.length ? el("div", { class: "karte duell-karte" }, el("div", { class: "label" }, "Letzte Ergebnisse"),
        ...fertig.slice(0, 12).map(d => {
          const s = sieger(d), ich = sp(d, person.id), g = sp(d, gegnerVon(d));
          return el("div", { class: `duell-zeile erg ${s === person.id ? "sieg" : s === null ? "remis" : "niederlage"}`, onclick: () => duellErgebnis(d.id) },
            el("div", {}, el("b", {}, s === person.id ? "🏆 Gewonnen" : s === null ? "🤝 Unentschieden" : "Verloren"), el("small", {}, `${artText(d)} gegen ${pName(gegnerVon(d))} · ${d.fachName} · ${d.gebiet}`)),
            el("div", { class: "duell-stand" }, `${ich.richtig} : ${g.richtig}`));
        })) : null,
      !l.length ? el("div", { class: "karte" }, el("p", {}, "Noch keine Duelle. Fordere jemanden heraus! Ihr bekommt beide dieselben 10 Fragen – mehr Richtige gewinnt, bei Gleichstand entscheidet die Zeit.")) : null);
  });
}

// ---------- Neues Duell ----------
async function duellNeu() {
  setzeKopf("Neues Duell", duellSeite);
  const wahl = { gegner: null, art: "zeit", fach: null, gebiet: 0 };
  let fachDaten = null, gebiete = [];
  const box = el("div");
  const reihe = (opts, key, nachher) => el("div", { class: "wahl-reihe" }, ...opts.map(([v, t]) =>
    el("button", { class: `wahl ${wahl[key] === v ? "an" : ""}`, onclick: async () => { wahl[key] = v; if (nachher) await nachher(); malen(); } }, t)));
  async function fachLadenDuell() {
    wahl.gebiet = 0; fachDaten = null; gebiete = []; malen();
    try { const r = await fetch(`daten/${dq(person.id)}/${wahl.fach}.json?v=${Date.now()}`); fachDaten = await r.json(); } catch (e) { fachDaten = { fragen: [] }; }
    const passt = q => (q.typ === "auswahl" || q.typ === "eingabe") && !q.karte;
    const alle = (fachDaten.fragen || []).filter(passt);
    gebiete = [{ t: "Ganzes Fach", fr: alle }];
    for (const t of fachDaten.teststoff || []) {
      const p = alle.filter(q => q.id.startsWith(t.id + "-"));
      if (p.length >= 4) gebiete.push({ t: t.titel, fr: p });
      (t.punkte || []).forEach((pt, i) => { const f = p.filter(q => q.stoff === i); if (f.length >= 4) gebiete.push({ t: pt, fr: f, klein: true }); });
    }
  }
  function malen() {
    const g = gebiete[wahl.gebiet];
    rc(box, 
      el("div", { class: "karte" }, el("div", { class: "label" }, "1 · Gegner"), reihe(PERSONEN.filter(p => p.id !== person.id).map(p => [p.id, p.name]), "gegner")),
      el("div", { class: "karte" }, el("div", { class: "label" }, "2 · Art"), reihe([["zeit", "⏱ Auf Zeit"], ["live", "⚡ Live"]], "art"),
        el("p", { class: "klein" }, wahl.art === "live" ? "Ihr spielt gleichzeitig und seht den Stand des anderen. Dein Gegner muss dafür jetzt auch in der App sein." : "Du spielst jetzt, dein Gegner später – wann er will. Gleiche Fragen für beide.")),
      el("div", { class: "karte" }, el("div", { class: "label" }, "3 · Fach"), reihe(faecherVon(person.id).map(f => [f.id, f.name]), "fach", fachLadenDuell)),
      wahl.fach ? el("div", { class: "karte" }, el("div", { class: "label" }, "4 · Gebiet"),
        !fachDaten ? el("p", { class: "hinweis" }, "Lade …") :
        gebiete[0].fr.length < 4 ? el("p", { class: "hinweis" }, "In diesem Fach gibt es noch zu wenige Fragen für ein Duell.") :
        el("div", { class: "wahl-liste" }, ...gebiete.map((x, i) => el("button", { class: `wahl ${wahl.gebiet === i ? "an" : ""} ${x.klein ? "klein-wahl" : ""}`, onclick: () => { wahl.gebiet = i; malen(); } }, `${x.t} (${x.fr.length})`)))) : null,
      el("button", { class: "knopf", disabled: wahl.gegner && g && g.fr.length >= 4 ? null : "disabled", onclick: () => duellErstellen(wahl, g) }, "⚔️ Herausfordern"));
  }
  zeige(box); malen();
}
async function duellErstellen(wahl, g) {
  const f = FAECHER.find(x => x.id === wahl.fach);
  // gleichmäßig über die Teststoff-Punkte verteilen, dann mischen
  const gruppen = {};
  for (const q of mischen(g.fr)) (gruppen[q.stoff ?? q.art ?? "x"] = gruppen[q.stoff ?? q.art ?? "x"] || []).push(q);
  const fragen = [], keys = mischen(Object.keys(gruppen));
  while (fragen.length < Math.min(DUELL_N, g.fr.length)) for (const k of keys) { if (gruppen[k].length && fragen.length < DUELL_N) fragen.push(gruppen[k].pop()); }
  const sauber = mischen(fragen).map(q => JSON.parse(JSON.stringify(q)));
  const leer = { i: 0, richtig: 0, zeit: 0, fertig: false, bereit: false };
  const d = {
    art: wahl.art, vonPid: person.id, anPid: wahl.gegner, vonMail: mailVon(person.id), anMail: mailVon(wahl.gegner),
    teilnehmer: [mailVon(person.id), mailVon(wahl.gegner)], fach: f.id, fachName: f.name, gebiet: g.t,
    fragen: sauber, erstellt: Date.now(), status: "offen", start: 0, spieler: { [person.id]: Object.assign({}, leer), [wahl.gegner]: Object.assign({}, leer) },
  };
  try {
    const id = await DS.neu(d); d.id = id;
    if (d.art === "live") duellLive(id); else duellSpielen(d);
  } catch (e) { alert("Das Duell konnte nicht gespeichert werden. Ist die Internetverbindung da?"); }
}

// ---------- Live-Raum ----------
function duellLive(id) {
  setzeKopf("⚡ Live-Duell", duellSeite);
  const box = el("div", { class: "karte live-raum" }, el("p", { class: "hinweis" }, "Verbinde …"));
  zeige(box);
  let gestartet = false, beigetreten = false;
  aboFuer(box, cb => DS.abo(id, cb), d => {
    if (!d) { rc(box, el("p", {}, "Dieses Duell gibt es nicht mehr."), el("button", { class: "knopf zweit", onclick: duellSeite }, "Zurück")); return; }
    const ich = sp(d, person.id), g = gegnerVon(d), gs = sp(d, g);
    if (!beigetreten && !ich.bereit) { beigetreten = true; DS.setz(id, { [`spieler.${person.id}.bereit`]: true }); }
    if (ich.bereit && gs.bereit && !d.start && d.anPid === person.id) DS.setz(id, { start: Date.now() + 3500 });
    if (ich.fertig) { duellErgebnis(id); return; }
    if (d.start && !gestartet) {
      gestartet = true;
      const zaehlen = () => {
        const rest = Math.ceil((d.start - Date.now()) / 1000);
        if (!document.contains(box)) return;
        if (rest > 0) { rc(box, el("div", { class: "label mitte" }, `Gleich geht's los – gegen ${pName(g)}`), el("div", { class: "countdown pop" }, String(rest))); setTimeout(zaehlen, 250); }
        else duellSpielen(d, true);
      };
      zaehlen(); return;
    }
    if (!gestartet) rc(box, 
      el("div", { class: "label" }, `${d.fachName} · ${d.gebiet}`),
      el("div", { class: "live-spieler" },
        el("div", { class: "live-name an" }, `✅ ${person.name}`),
        el("div", { class: "vs" }, "VS"),
        el("div", { class: `live-name ${gs.bereit ? "an" : ""}` }, gs.bereit ? `✅ ${pName(g)}` : `⏳ ${pName(g)}`)),
      el("p", { class: "klein mitte" }, gs.bereit ? "Beide da – Start!" : `Warte auf ${pName(g)} … Sag Bescheid, dass ${pName(g)} die App öffnet und unter „Duelle“ beitritt.`),
      d.vonPid === person.id ? el("button", { class: "knopf zweit", onclick: () => { if (confirm("Live-Duell abbrechen?")) DS.weg(id).then(duellSeite); } }, "Abbrechen") : null);
  });
}

// ---------- Spielen ----------
function duellSpielen(d, live) {
  fach = FAECHER.find(f => f.id === d.fach) || { id: d.fach, name: d.fachName };
  daten = { fragen: d.fragen, wissen: [] };
  runde = { fragen: d.fragen, i: 0, richtig: 0, falsch: [], test: null, duell: { id: d.id, live: !!live, zeit: 0, t: 0, gegner: gegnerVon(d) } };
  DUELL_LIVE = d;
  if (live) {
    runde.duell.ab = DS.abo(d.id, x => { if (x) { DUELL_LIVE = x; duellLeisteMalen(); } });
  }
  frageZeigen();
}
function duellAntwort(ok) {
  const du = runde.duell;
  du.zeit += Math.min(Date.now() - du.t, 5 * 60 * 1000); du.t = 0;
  DS.setz(du.id, { [`spieler.${person.id}.i`]: runde.i + 1, [`spieler.${person.id}.richtig`]: runde.richtig, [`spieler.${person.id}.zeit`]: du.zeit }).catch(() => {});
}
function duellLeiste() { const l = el("div", { class: "duell-leiste" }); setTimeout(duellLeisteMalen, 0); return l; }
function duellLeisteMalen() {
  const l = document.querySelector(".duell-leiste"), d = DUELL_LIVE;
  if (!l || !d || !runde || !runde.duell) return;
  const n = d.fragen.length, g = runde.duell.gegner, gs = sp(d, g);
  const ichI = runde.i + (document.querySelector(".feedback") ? 1 : 0);
  const zeile = (name, i, r, ich) => el("div", { class: `dl-zeile ${ich ? "ich" : ""}` },
    el("span", { class: "dl-name" }, name), el("span", { class: "dl-balken" }, el("span", { style: `width:${(i / n) * 100}%` })), el("span", { class: "dl-wert" }, `✓ ${r}`));
  rc(l, zeile(person.name, ichI, runde.richtig, true), zeile(pName(g), gs.i, gs.richtig, false), gs.fertig ? el("small", {}, `${pName(g)} ist fertig!`) : null);
}
function duellAbbruch() {
  if (!confirm("Duell aufgeben? Es zählt dann dein aktueller Stand.")) return;
  duellEnde();
}
function duellEnde() {
  const du = runde.duell;
  if (du.ab) { du.ab(); du.ab = null; }
  DS.setz(du.id, { [`spieler.${person.id}.fertig`]: true, [`spieler.${person.id}.richtig`]: runde.richtig, [`spieler.${person.id}.zeit`]: du.zeit, [`spieler.${person.id}.i`]: runde.fragen.length })
    .catch(() => {}).then(() => duellErgebnis(du.id, runde.falsch));
}

// ---------- Ergebnis ----------
function duellErgebnis(id, falsch) {
  setzeKopf("⚔️ Ergebnis", duellSeite);
  const box = el("div", {}, el("p", { class: "hinweis" }, "Lade …"));
  zeige(box);
  let gefeiert = false;
  aboFuer(box, cb => DS.abo(id, cb), d => {
    if (!d) { rc(box, el("p", {}, "Dieses Duell gibt es nicht mehr."), el("button", { class: "knopf", onclick: duellSeite }, "Zu den Duellen")); return; }
    const g = gegnerVon(d), ich = sp(d, person.id), gs = sp(d, g), s = sieger(d);
    if (s !== undefined && d.status !== "fertig") DS.setz(id, { status: "fertig" }).catch(() => {});
    const n = d.fragen.length;
    const spalte = (name, x, gewinner) => el("div", { class: `erg-spalte ${gewinner ? "gewinner" : ""}` },
      el("div", { class: "label" }, name), el("div", { class: "erg-zahl" }, x.fertig || x.i ? `${x.richtig}` : "–"), el("small", {}, x.fertig ? `von ${n} · ${zeitText(x.zeit)}` : x.i ? `spielt … ${x.i}/${n}` : "noch nicht gespielt"));
    rc(box, 
      el("div", { class: "karte duell-erg pop" },
        el("div", { class: "label" }, `${artText(d)} · ${d.fachName} · ${d.gebiet}`),
        el("h2", {}, s === undefined ? "Warte auf " + pName(g) : s === person.id ? "🏆 Gewonnen!" : s === null ? "🤝 Unentschieden" : `${pName(g)} gewinnt`),
        el("div", { class: "erg-reihe" }, spalte(person.name, ich, s === person.id), el("div", { class: "vs" }, "VS"), spalte(pName(g), gs, s === g)),
        s === undefined ? el("p", { class: "klein" }, d.art === "live" ? `${pName(g)} spielt noch – der Stand aktualisiert sich von selbst.` : `${pName(g)} kann jetzt spielen, wann er oder sie will. Das Ergebnis siehst du dann unter „Duelle“.`) :
          (ich.richtig === gs.richtig && s ? el("p", { class: "klein" }, "Gleich viele Richtige – die schnellere Zeit hat entschieden.") : null)),
      falsch && falsch.length ? el("div", { class: "karte" }, el("div", { class: "label" }, "Deine Fehler"),
        ...falsch.map(f => el("div", { class: "fehler-zeile" }, el("div", {}, f.q.frage), el("small", {}, "Richtig: ", el("b", {}, [].concat(f.q.antwort)[0]))))) : null,
      el("button", { class: "knopf", onclick: duellNeu }, "⚔️ Revanche / neues Duell"),
      el("button", { class: "knopf zweit", onclick: duellSeite }, "Alle Duelle"));
    if (s === person.id && !gefeiert) {
      gefeiert = true;
      box.firstChild.append(el("div", { class: "konfetti" }, ...Array.from({ length: 36 }, (_, i) => el("i", { style: `--x:${Math.round(Math.random() * 100)}%;--d:${(Math.random() * .8).toFixed(2)}s;--r:${Math.round(Math.random() * 720 - 360)}deg;--f:${["#ffd676", "#ffffff", "#8fd0ff", "#2ee59d"][i % 4]}` }))));
    }
  });
}
