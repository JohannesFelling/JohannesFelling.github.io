# Lern-Helden

Lern-App für Valentin (Helden-Design) und Elias (Fußball-Design). Adresse: https://johannesfelling.github.io/lern-app/

- Fragen, Tests, Wissen und Sprech-Übungen: `daten/<kind>/<fach>.json`, erzeugt von `werkzeug/fragen_bauen.py`.
  - `fragen`: Übungsfragen (`auswahl` oder `eingabe`)
  - `tests`: Kapiteltests – fehlerfrei = Gutschein
  - `wissen`: Erklärungen mit Schritten, Beispiel, Merksatz, YouTube-Suchbegriff (`video`)
  - `sprechen`: Gespräche (App spricht vor, Kind antwortet; `erwartet` = Listen von Schlüsselwörtern)
- Belohnungen (Sterne-Stufen, Tage-Serie, Testgutschein): `belohnungen.json`
- Anmeldung + Online-Spielstand: Firebase (`firebase-config.js`). Konten: `valentin@johannesfelling.at`, `elias@johannesfelling.at`.
- Testkonto auf der Startseite: alles ansehen, nichts wird gespeichert.
