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
