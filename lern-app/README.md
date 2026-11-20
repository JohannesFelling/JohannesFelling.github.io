# Lern-Helden

Lern-App für Valentin und Elias. Läuft direkt im Browser, ohne Anmeldung.

- Fragen liegen in `daten/<kind>/<fach>.json` (Fächer: englisch, mathe, biologie, deutsch, geografie).
- Fragetypen: `auswahl` (Multiple Choice, `optionen` + `antwort`) und `eingabe` (Antwort eintippen, `antwort` ist eine Liste erlaubter Antworten; Groß/Kleinschreibung egal; bei Zahlen ist Komma oder Punkt egal).
- `"platzhalter": true` zeigt den Hinweis „Übungsfragen zum Ausprobieren“.
- Fortschritt wird im Browser gespeichert (pro Gerät, pro Kind und Fach).
