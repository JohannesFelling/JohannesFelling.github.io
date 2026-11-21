# Material-Pakete

Hier landen Übungen, die aus hochgeladenem Unterrichtsmaterial (Fotos aus der App) erzeugt wurden:
`<kind>/<fach>/<paket>.json`. Danach `python3 werkzeug/fragen_bauen.py` (aus dem Ordner lern-app/) ausführen.
Sobald ein Fach echtes Material hat, ersetzt es die Beispiel-Fragen (Platzhalter).

Format:
```json
{"paket": "valentin-xyz", "kapitel": "Unit 5 – Food", "datum": "2026-11-20 13:00",
 "fragen": [{"typ": "auswahl", "art": "Auswählen", "frage": "…", "optionen": ["…"], "antwort": "…", "erklaerung": "…"},
            {"typ": "eingabe", "art": "Übersetzen", "frage": "…", "antwort": ["…", "…"], "erklaerung": "…", "zahl": false}],
 "wissen": [{"titel": "…", "kurz": "…", "problem": "…", "text": ["…"], "schritte": ["…"], "beispiel": "…", "fehler": ["…"], "merke": "…", "video": "Suchbegriff", "stichworte": ["regex"]}],
 "test": {"titel": "Test Unit 5 – Food", "fragen": [ … 8–12 Fragen … ]}}
```

## Stoffabgrenzung / Teststoff (Schwerpunkt)
Ist im Material eine konkrete Stoffabgrenzung für einen Test oder eine Schularbeit erkennbar (z. B. „Teststoff“, „Stoff für die Schularbeit“, Liste von Kompetenzen, Kapitel- oder Seitenangaben, Datum), dann:
- Feld `"teststoff": {"termin": "JJJJ-MM-TT", "titel": "Physik-Test am 24.11.", "quelle": "…", "punkte": ["Punkt 1", "Punkt 2", …]}` ins Paket schreiben – die Punkte möglichst wörtlich aus der Abgrenzung.
- Jede Frage bekommt `"stoff": <Index des passenden Punkts>`. **Jeder Punkt braucht mehrere Fragen** (mind. 3–4), Gewichtung so wie im Test zu erwarten; nichts abfragen, was nicht zur Abgrenzung gehört. Lieber 30–60 Fragen als zu wenige.
- Der Kapiteltest heißt „Probetest …“ und deckt jeden Punkt mindestens einmal ab.
- Termin auch in `lern-app/daten/<kind>/termine.json` eintragen, falls er dort fehlt.
- Bis zum Termin (max. 21 Tage vorher) üben die Runden in der App dann nur diese Fragen; die Fachseite zeigt eine Teststoff-Checkliste mit Lernstand pro Punkt.

## Offene Fragen (frei formulieren) – immer einige mitliefern
Neben Auswahl- und Eingabefragen pro Paket **5–15 offene Fragen** („Erkläre …“, „Nenne drei …“, „Beschreibe die Grafik …“), auch 2–3 im Test:
```json
{"typ": "offen", "art": "Frei antworten", "frage": "Erkläre …", "stoff": 2,
 "kern": [{"t": "Kernpunkt in Worten", "w": ["regex1", "regex2"]}, …],
 "mindest": 2, "muster": "Musterlösung in ganzen Sätzen", "antwort": "(gleich wie muster)", "erklaerung": "optional"}
```
Die App prüft, welche Kernpunkte (Regex, Groß/klein egal, Wortstämme großzügig) vorkommen; richtig ab `mindest`. Danach sieht das Kind, was gefehlt hat, und die Musterlösung.

## Sprache beim Sprechen
Das Mikrofon hört in der Sprache der erwarteten Antwort. In Sprachfächern die Richtung in der Frage klar machen („… auf Englisch?“ / „… was heißt das auf Deutsch?“) oder `"sprache": "de-AT" | "en-GB" | "es-ES"` setzen.
