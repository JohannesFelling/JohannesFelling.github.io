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

# WICHTIGSTE REGEL: streng nur das hochgeladene Material (Johannes, 22.11.2026)
- Jede Frage, jede Erklärung, jede Wissen-Karte und jede Podcast-Folge stützt sich **nur** auf das, was auf den hochgeladenen Fotos steht. Kein allgemeines Wissen dazu erfinden (keine eigenen Beispiele, Zahlen, Fakten oder Begriffe, die nicht im Material vorkommen).
- Liegt ein Teststoff-Blatt dabei: **genau lesen, was es pro Seite als relevant nennt.** Steht dort z. B. „Abbildungen beschreiben: S. 14“ oder „S. 14: nur die Abbildungen links“, dann zu dieser Seite **nur diese Abbildungen** abfragen, nicht den übrigen Seitentext. Seiten außerhalb der genannten Bereiche nicht abfragen.
- Jede Frage einem Teststoff-Punkt (`stoff`) zuordnen; in der `erklaerung` die Fundstelle nennen (z. B. „Buch S. 16“, „Abb. 24.2“).
- Nennt das Teststoff-Blatt ein Arbeitsblatt oder eine Unterlage, die nicht hochgeladen wurde: nichts dazu erfinden, sondern im Bericht an Johannes ausdrücklich sagen, dass sie fehlt, und um Upload bitten.
- **Wissen und Podcast genauso aufbauen wie das Teststoff-Blatt** (Johannes 22.11.): je Teststoff-Punkt eine Wissen-Karte, in derselben Reihenfolge, Titel „1 · …“, „2 · …“; im Feld `problem` den Punkt möglichst wörtlich zitieren und die Seiten nennen. Inhalt nur aus diesen Seiten/Abbildungen (bei „Abbildungen S. x“ jede genannte Abbildung einzeln beschreiben). Podcast: eine Folge pro Teststoff-Punkt, gleiche Reihenfolge, nur Buchinhalte, keine Namen der Kinder im Text außer beim eigenen Fach. Fehlt eine genannte Unterlage (Arbeitsblatt), in der Karte darauf hinweisen statt etwas zu erfinden.
- Reichen die Seiten nicht für 100 Fragen: lieber dieselben Inhalte in anderer Form fragen (Auswahl, Eintippen, richtig/falsch, offen, Abbildung lesen) als Stoff von außen dazuholen.

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

## Podcast (immer mitliefern)
Jedes Paket bekommt ein Feld `podcast` – frei erzählte Erklärung zum Anhören (Web Speech, de-AT), NICHT vorgelesener Buchtext:
```json
"podcast": {"titel": "…", "kurz": "ein Satz", "kapitel": [{"titel": "…", "text": "…"}]}
```
- 4–6 Kapitel, je ca. 250–400 Wörter, in Du-Form, locker wie ein Podcast: Kind mit Namen ansprechen, Alltagsbeispiele, Fragen an die Zuhörer, Merksätze, Test-Tipps und typische Fallen. Inhalt aus den Fotos (alle Teststoff-Punkte abdecken), aber in eigenen Worten.
- Klingt nur mit KURZEN Sätzen natürlich (meist 5–12 Wörter, ein Gedanke pro Satz), Umgangston, rhetorische Fragen („Denk mal mit.“, „Achtung, Falle!“). Neuer Absatz = neue Zeile (\n) → im Player kurze Pause.
- Sprechbar schreiben: keine Abkürzungen mit Punkt (z. B., S. 16, ca.), keine Pfeile/Symbole, Hochzahlen und Formeln in Worten („zehn hoch minus drei“, „Meter pro Sekunde“). Zahlen wie „27. November“ sind ok.
- Letztes Kapitel endet mit kurzer Zusammenfassung + Hinweis auf Probetest.

## Menge und Abwechslung (Johannes 21.11.2026)
- Jedes Paket hat MINDESTENS 100 verschiedene Übungsfragen (ohne die Testfragen mitzuzählen) – wirklich weit ausholen: jeder Fachbegriff, jede Zahl, jede Abbildung, jede Tabelle aus den Fotos; dazu Richtig/Falsch-Aussagen, Zuordnungen, Rechenaufgaben mit verschiedenen Zahlen, Alltagsbeispiele, umgekehrte Fragen (Begriff → Erklärung und Erklärung → Begriff).
- Fragetypen mischen: auswahl, eingabe, offen (5–15) und – wo es passt – Karte (typ "karte").
- Keine Doppelungen mit nur anders formuliertem Text.

## Kapiteltest wird jedes Mal neu gezogen (seit 21.11.2026)
Die App stellt den Test bei jedem Start neu aus ALLEN Fragen des Pakets plus `test.fragen` zusammen – gleich viele Fragen wie `test.fragen`, verteilt über die Teststoff-Punkte (`stoff`), höchstens 3 offene, die Fragen der letzten zwei Durchgänge werden gemieden. `test.fragen` ist also nur ein Grundstock (10–20 Stück, legt die Testlänge fest); wichtig ist ein großer Fragenpool mit `stoff`-Angaben.
