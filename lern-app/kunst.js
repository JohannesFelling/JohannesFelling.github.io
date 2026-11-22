// VALIAS PRO – detaillierte Symbole und Plakat-Grafiken (eigene Zeichnungen, keine Logos).
(function () {
  let n = 0;
  const svgEl = (html, cls) => { const w = document.createElement("span"); w.innerHTML = html; const s = w.firstChild; if (cls) s.setAttribute("class", cls); return s; };

  // Donnerhammer: Metallkopf mit Gravur, Lederriemen-Griff, Knauf und Schlaufe
  function hammer(cls = "kunst-ic", blitze = false) {
    const i = ++n;
    if (cls === "kunst-ic") return svgEl(`<svg viewBox="0 0 64 64" aria-hidden="true">
  <defs>
    <linearGradient id="hk${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#c9d0dc"/><stop offset=".55" stop-color="#7d8698"/><stop offset="1" stop-color="#c3cad6"/></linearGradient>
    <linearGradient id="hg${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3415"/><stop offset=".5" stop-color="#c07a3c"/><stop offset="1" stop-color="#5a3415"/></linearGradient>
  </defs>
  <g transform="rotate(-30 32 32)">
    <path d="M6 8l3-4h46l3 4v18l-3 4H9l-3-4z" fill="url(#hk${i})" stroke="#1d2029" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="26" y="30" width="12" height="24" rx="2" fill="url(#hg${i})" stroke="#1d2029" stroke-width="2.5"/>
    <path d="M24 54h16l-2 7H26z" fill="url(#hk${i})" stroke="#1d2029" stroke-width="2.5" stroke-linejoin="round"/>
  </g>
</svg>`, cls);
    return svgEl(`<svg viewBox="0 0 64 64" aria-hidden="true">
  <defs>
    <linearGradient id="hk${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".18" stop-color="#d9dee7"/><stop offset=".5" stop-color="#8b94a5"/><stop offset=".62" stop-color="#5b6372"/><stop offset="1" stop-color="#b9c0cc"/></linearGradient>
    <linearGradient id="hs${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3b414d"/><stop offset="1" stop-color="#6b7383"/></linearGradient>
    <linearGradient id="hg${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a2210"/><stop offset=".45" stop-color="#9a6234"/><stop offset="1" stop-color="#3a2210"/></linearGradient>
    <linearGradient id="hb${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#ffb02e"/></linearGradient>
  </defs>
  ${blitze ? `<path d="M6 2l7 9-4 1 6 10-11-11 4-1z M58 2l-7 9 4 1-6 10 11-11-4-1z" fill="url(#hb${i})" opacity=".95"/>` : ""}
  <path d="M7 9l3-4h44l3 4v15l-3 4H10l-3-4z" fill="url(#hk${i})" stroke="#2b2f38" stroke-width="1"/>
  <path d="M54 5l3 4v15l-3 4z" fill="url(#hs${i})"/>
  <path d="M7 9l3-4v23l-3-4z" fill="#4a505c"/>
  <path d="M10 8.5h44" stroke="#ffffff" stroke-opacity=".7" stroke-width="1"/>
  <g fill="none" stroke="#3b414d" stroke-width="1.1" stroke-linecap="round" opacity=".85">
    <path d="M22 12c4 0 6 3 10 3s6-3 10-3M22 21c4 0 6-3 10-3s6 3 10 3"/>
    <circle cx="32" cy="16.5" r="2.6"/><path d="M15 11v11M49 11v11"/>
  </g>
  <rect x="28" y="28" width="8" height="24" rx="1.5" fill="url(#hg${i})" stroke="#24160a" stroke-width=".8"/>
  <g stroke="#24160a" stroke-width="1.2" opacity=".75"><path d="M28 32l8-3M28 36l8-3M28 40l8-3M28 44l8-3M28 48l8-3"/></g>
  <path d="M26 52h12l-1 5H27z" fill="url(#hk${i})" stroke="#2b2f38" stroke-width=".8"/>
  <path d="M30 57c-6 1-8 6-2 6.5h8c6-.5 4-5.5-2-6.5" fill="none" stroke="#7a4a22" stroke-width="2.2" stroke-linecap="round"/>
</svg>`, cls);
  }

  // Fußball: klassische Panels mit Schattierung
  function ball(cls = "kunst-ic") {
    const i = ++n;
    return svgEl(`<svg viewBox="0 0 64 64" aria-hidden="true">
  <defs>
    <radialGradient id="bw${i}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e6ebf2"/><stop offset="1" stop-color="#8e9aae"/></radialGradient>
    <radialGradient id="bs${i}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#3a4256"/><stop offset="1" stop-color="#05070d"/></radialGradient>
    <clipPath id="bc${i}"><circle cx="32" cy="32" r="29"/></clipPath>
  </defs>
  <circle cx="32" cy="32" r="29.5" fill="url(#bw${i})" stroke="#1a2233" stroke-width="1"/>
  <g clip-path="url(#bc${i})">
    <g fill="url(#bs${i})">
      <polygon points="32.0,24.5 39.1,29.7 36.4,38.1 27.6,38.1 24.9,29.7"/>
      <polygon points="32.0,18.0 24.9,12.8 27.6,4.4 36.4,4.4 39.1,12.8"/>
      <polygon points="45.3,27.7 48.0,19.3 56.9,19.3 59.6,27.7 52.4,32.9"/>
      <polygon points="40.2,43.3 49.0,43.3 51.8,51.7 44.6,56.9 37.5,51.7"/>
      <polygon points="23.8,43.3 26.5,51.7 19.4,56.9 12.2,51.7 15.0,43.3"/>
      <polygon points="18.7,27.7 11.6,32.9 4.4,27.7 7.1,19.3 16.0,19.3"/>
    </g>
    <path d="M32.0 24.5L32.0 18.0 M24.9 12.8L21.5 3.9 M39.1 12.8L42.5 3.9 M39.1 29.7L45.3 27.7 M48.0 19.3L55.5 13.4 M52.4 32.9L62.0 33.3 M36.4 38.1L40.2 43.3 M49.0 43.3L57.0 48.6 M37.5 51.7L40.1 60.9 M27.6 38.1L23.8 43.3 M26.5 51.7L23.9 60.9 M15.0 43.3L7.0 48.6 M24.9 29.7L18.7 27.7 M11.6 32.9L2.0 33.3 M16.0 19.3L8.5 13.4" stroke="#55627a" stroke-width=".9" fill="none"/>
    <ellipse cx="22" cy="17" rx="11" ry="5" fill="#fff" opacity=".18" transform="rotate(-35 22 17)"/>
  </g>
</svg>`, cls);
  }

  // Stern (neutrales Thema „Anderer Nutzer“)
  function stern(cls = "kunst-ic") {
    const i = ++n;
    return svgEl(`<svg viewBox="0 0 64 64" aria-hidden="true">
  <defs><linearGradient id="sg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6e4ff"/><stop offset=".5" stop-color="#a5a3ff"/><stop offset="1" stop-color="#5b5bd6"/></linearGradient></defs>
  <path d="M32 4l8.2 17.6L59 24l-14 13.2L48.6 56 32 46.8 15.4 56 19 37.2 5 24l18.8-2.4z" fill="url(#sg${i})" stroke="#2b2a6e" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M32 10l6 13 14 1.8" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
</svg>`, cls);
  }

  // Große Plakat-Grafiken für Startkarten und Statuskarte
  function plakat(thema) {
    const i = ++n;
    if (thema === "neutral") {
      const s = svgEl(`<svg viewBox="0 0 200 200" aria-hidden="true">
  <defs><radialGradient id="pn${i}" cx=".5" cy=".45" r=".55"><stop offset="0" stop-color="#a5a3ff" stop-opacity=".75"/><stop offset="1" stop-color="#5b5bd6" stop-opacity="0"/></radialGradient></defs>
  <circle cx="100" cy="90" r="95" fill="url(#pn${i})"/>
  <g fill="none" stroke="#c9c7ff" stroke-opacity=".35">${[40,62,84].map(r => `<circle cx="100" cy="90" r="${r}"/>`).join("")}</g>
</svg>`, "plakat-licht");
      const box = document.createElement("span"); box.className = "plakat plakat-neutral";
      box.append(s, stern("plakat-motiv"));
      return box;
    }
    if (thema === "held") {
      const s = svgEl(`<svg viewBox="0 0 200 200" aria-hidden="true">
  <defs>
    <radialGradient id="pg${i}" cx=".5" cy=".42" r=".55"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset=".25" stop-color="#ff4a2a" stop-opacity=".55"/><stop offset="1" stop-color="#ff1a1a" stop-opacity="0"/></radialGradient>
    <linearGradient id="pb${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#9fd8ff"/></linearGradient>
  </defs>
  <circle cx="100" cy="86" r="96" fill="url(#pg${i})"/>
  <filter id="pf${i}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
  ${["M14 0L30 26 22 30 40 58 34 62 52 96","M186 0L170 22 178 28 160 52 168 58 150 90","M0 132L22 138 18 146 44 150","M200 120L178 128 184 136 160 142"].map(d => `<path d="${d}" fill="none" stroke="#ff7a3d" stroke-width="7" stroke-linejoin="round" filter="url(#pf${i})" opacity=".9"/><path d="${d}" fill="none" stroke="url(#pb${i})" stroke-width="2.2" stroke-linejoin="round"/>`).join("")}
</svg>`, "plakat-licht");
      const box = document.createElement("span"); box.className = "plakat plakat-held";
      box.append(s, hammer("plakat-motiv"));
      return box;
    }
    const s = svgEl(`<svg viewBox="0 0 200 200" aria-hidden="true">
  <defs>
    <linearGradient id="pl${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
    <radialGradient id="pr${i}" cx=".5" cy=".6" r=".5"><stop offset="0" stop-color="#7fb6ff" stop-opacity=".7"/><stop offset="1" stop-color="#1b3cff" stop-opacity="0"/></radialGradient>
  </defs>
  <path d="M18 0L0 0 70 200 120 200z" fill="url(#pl${i})" opacity=".55"/><path d="M182 0L200 0 130 200 80 200z" fill="url(#pl${i})" opacity=".55"/>
  <circle cx="100" cy="120" r="80" fill="url(#pr${i})"/>
  <g fill="#fff">${[[30,40,3],[160,30,2.5],[140,70,2],[52,90,2],[178,110,3],[22,150,2.4],[90,24,2]].map(([x,y,r]) => `<path d="M${x} ${y-r*2.4}L${x+r*.5} ${y-r*.5}L${x+r*2.4} ${y}L${x+r*.5} ${y+r*.5}L${x} ${y+r*2.4}L${x-r*.5} ${y+r*.5}L${x-r*2.4} ${y}L${x-r*.5} ${y-r*.5}z" opacity=".85"/>`).join("")}</g>
</svg>`, "plakat-licht");
    const box = document.createElement("span"); box.className = "plakat plakat-sport";
    box.append(s, ball("plakat-motiv"));
    return box;
  }

  window.KUNST = { hammer, ball, stern, plakat };
})();
