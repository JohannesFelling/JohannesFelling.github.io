# Erzeugt die JSON-Fragedateien. Fragen kann man auch direkt in daten/*/*.json ändern.
import json, os
def A(frage, optionen, antwort, erkl="", art="Auswählen"):
    return {"typ": "auswahl", "art": art, "frage": frage, "optionen": optionen, "antwort": antwort, "erklaerung": erkl}
def E(frage, antwort, erkl="", art="Eintippen", zahl=False):
    d = {"typ": "eingabe", "art": art, "frage": frage, "antwort": antwort if isinstance(antwort, list) else [antwort], "erklaerung": erkl}
    if zahl: d["zahl"] = True
    return d
def UE(frage, antwort, erkl=""): return E(frage, antwort, erkl, "Übersetzen")
def L(frage, antwort, erkl=""): return E(frage, antwort, erkl, "Lücke füllen")
def M(frage, antwort, erkl=""): return E(frage, antwort, erkl, "Rechnen", True)

def schreiben(person, fach, titel, fragen, platzhalter, untertitel="", thema=None, prefix=None):
    for i, q in enumerate(fragen): q["id"] = f"{prefix or fach[:2]}{i+1:03d}"
    d = {"titel": titel, "untertitel": untertitel, "platzhalter": platzhalter}
    if thema: d["thema"] = thema
    d["fragen"] = fragen
    os.makedirs(f"daten/{person}", exist_ok=True)
    with open(f"daten/{person}/{fach}.json", "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=1)

# ================= VALENTIN ENGLISCH (aus dem Workbook Unit 3 + 4, Marvel-Thema) =================
val_en = [
 # Vokabeln Halloween
 UE("Spider-Man geht als Gespenst verkleidet zur Party. Was heißt „Kostüm“ auf Englisch?", "costume", "costume – Achtung Schreibweise: c-o-s-t-u-m-e."),
 UE("Hulk liebt „Süßigkeiten“. Wie heißt das auf Englisch?", "sweets", "sweets = Süßigkeiten (immer mit -s am Ende)."),
 UE("Thor schnitzt einen „Kürbis“ mit seinem Hammer. Englisch?", "pumpkin", "pumpkin = Kürbis."),
 UE("Black Widow schleicht nachts über den „Friedhof“. Englisch?", "graveyard", "graveyard = Friedhof (grave = Grab, yard = Hof)."),
 UE("Doctor Strange sieht ein „Gespenst“. Englisch?", "ghost", "ghost – das h nicht vergessen: g-h-o-s-t."),
 UE("Was ruft Groot an der Haustür zu Halloween? („Süßes oder Saures!“)", ["trick or treat", "trick or treat!"], "Trick or treat! = Süßes oder Saures!"),
 UE("Iron Man läuft die „Treppe“ hinauf. Englisch?", "stairs", "stairs = Treppe."),
 UE("„superheroine“ – was heißt das auf Deutsch?", ["superheldin", "die superheldin"], "superheroine = Superheldin, z. B. Captain Marvel."),
 UE("„scary“ – was heißt das auf Deutsch?", ["gruselig", "unheimlich"], "scary = gruselig, unheimlich."),
 UE("„to be proud of“ – was heißt das? (Captain America is proud of his team.)", ["stolz sein auf", "stolz sein", "stolz"], "to be proud of = stolz sein auf."),
 UE("„century“ – was heißt das auf Deutsch? (Captain America slept for more than half a century.)", ["jahrhundert", "das jahrhundert"], "century = Jahrhundert."),
 UE("„knife“ heißt Messer. Wie heißt die Mehrzahl (Messer, viele)?", "knives", "knife → knives (f wird zu v + -es)."),
 UE("Rocket fährt mit dem Rad und trägt einen „Fahrradhelm“. Englisch?", "cycle helmet", "cycle helmet = Fahrradhelm."),
 UE("„vet“ – was heißt das? (Rocket has to go to the vet.)", ["tierarzt", "tierärztin", "der tierarzt", "die tierärztin"], "vet = Tierarzt / Tierärztin."),
 A("„to scare“ bedeutet …", ["Angst machen, erschrecken", "teilen", "verlieren", "bellen"], "Angst machen, erschrecken", "to scare = erschrecken, Angst machen. scary = gruselig."),
 A("„to lose“ bedeutet …", ["verlieren", "lösen", "behalten", "verteilen"], "verlieren", "to lose = verlieren. Thanos didn't want to lose!"),
 A("„to share out“ bedeutet …", ["verteilen", "abschneiden", "wiegen", "tragen"], "verteilen", "to share out = verteilen, z. B. sweets an Freunde."),
 # Vokabeln Unit 4
 UE("Black Panther sieht in der Wüste ein „Nashorn“. Englisch?", "rhino", "rhino = Nashorn."),
 UE("Der schnellste Freund von Quicksilver ist der „Gepard“. Englisch?", "cheetah", "cheetah = Gepard: c-h-e-e-t-a-h."),
 UE("Nachts fliegt eine „Fledermaus“ an Doctor Stranges Fenster vorbei. Englisch?", "bat", "bat = Fledermaus."),
 UE("Ant-Man ist klein, aber „stark“. Englisch?", "strong", "strong = stark."),
 UE("„venomous“ – was heißt das auf Deutsch? (Venom ist es sicher!)", "giftig", "venomous = giftig – wie der Name Venom!"),
 UE("„powerful“ – was heißt das?", ["mächtig", "kräftig", "mächtig, kräftig"], "powerful = mächtig, kräftig."),
 UE("„Wüste“ auf Englisch?", "desert", "desert = Wüste (nicht verwechseln mit dessert = Nachspeise!)."),
 UE("„to protect“ – was heißt das? (The Avengers protect the Earth.)", ["schützen", "beschützen"], "to protect = (be)schützen."),
 UE("„mammal“ – was heißt das?", ["säugetier", "das säugetier"], "mammal = Säugetier. Wale und Fledermäuse sind mammals."),
 UE("„to weigh“ – was heißt das? (Hulk weighs 600 kilos.)", "wiegen", "to weigh = wiegen."),
 UE("„scientist“ – was heißt das? (Bruce Banner is a scientist.)", ["wissenschaftler", "wissenschaftlerin"], "scientist = Wissenschaftler/in."),
 UE("„Geschwindigkeit“ auf Englisch?", "speed", "speed = Geschwindigkeit."),
 UE("„gefährlich“ auf Englisch? (Achtung Schreibweise!)", "dangerous", "d-a-n-g-e-r-o-u-s."),
 UE("„schwer“ (Gewicht) auf Englisch?", "heavy", "heavy = schwer. heavy → heavier → the heaviest."),
 UE("„intelligent“ auf Englisch?", ["intelligent", "smart", "clever"], "intelligent, smart oder clever."),
 UE("„niemand“ auf Englisch? (... can lift Thor's hammer.)", "nobody", "nobody = niemand."),
 # should / shouldn't
 A("Spider-Man is tired. → You ___ go to bed so late.", ["shouldn't", "should", "shoulds"], "shouldn't", "Ein Rat, etwas NICHT zu tun → shouldn't."),
 A("It's raining and Thor wants to go out. → He ___ take an umbrella.", ["should", "shouldn't", "should to"], "should", "Guter Rat → should + Grundform (take). Kein „to“!"),
 A("Hulk's leg hurts. → He ___ see a doctor.", ["should", "shouldn't", "shoulds"], "should", "should bleibt immer gleich – auch bei he/she/it kein -s."),
 A("Groot is hungry. → He should ___ a banana.", ["eat", "eats", "to eat", "eating"], "eat", "Nach should kommt die Grundform: should eat."),
 A("It's a very scary film. → Peter ___ watch it alone.", ["shouldn't", "should", "should not to"], "shouldn't", "shouldn't + Grundform: shouldn't watch."),
 A("Tony's mum is angry. → He ___ say he's sorry.", ["should", "shouldn't"], "should", "Entschuldigen ist ein guter Rat → should."),
 A("Loki ate too many sweets and feels sick. → He ___ eat so many sweets.", ["shouldn't", "should"], "shouldn't", "shouldn't = sollte nicht."),
 A("Welcher Satz ist richtig?", ["She should visit her grandma.", "She shoulds visit her grandma.", "She should to visit her grandma.", "She should visits her grandma."], "She should visit her grandma.", "should + Grundform, ohne „to“, ohne -s."),
 L("Black Widow's cat is ill. → She should take it to the ___. (Tierarzt)", "vet", "You should take it to the vet."),
 # a / an
 A("Captain Marvel sees ___ ostrich.", ["an", "a"], "an", "ostrich beginnt mit einem Vokal-Laut (o) → an."),
 A("Doctor Strange meets ___ ghost.", ["a", "an"], "a", "ghost beginnt mit einem Konsonanten-Laut (g) → a."),
 A("Hawkeye shoots ___ apple off the tree.", ["an", "a"], "an", "an vor Vokal-Laut: an apple."),
 A("Thor waits for ___ hour.", ["an", "a"], "an", "hour spricht man „auer“ – das h ist stumm → an hour."),
 A("Iron Man carries ___ pumpkin.", ["a", "an"], "a", "pumpkin beginnt mit p → a."),
 A("Black Panther sees ___ antelope.", ["an", "a"], "an", "antelope beginnt mit a → an."),
 # Komparativ
 L("Hulk is ___ than Ant-Man. (big)", "bigger", "big → bigger (g verdoppeln)."),
 L("Quicksilver is ___ than Captain America. (fast)", "faster", "kurzes Adjektiv → -er: faster."),
 L("Thor's hammer is ___ than a pumpkin. (heavy)", "heavier", "-y wird zu -ier: heavy → heavier."),
 L("Venom is ___ than Spider-Man. (scary)", "scarier", "scary → scarier."),
 L("A snake is ___ than a spider. (dangerous)", ["more dangerous"], "Lange Adjektive: more + Adjektiv: more dangerous."),
 L("Tony Stark is ___ than Hulk in the lab. (intelligent)", ["more intelligent"], "more intelligent."),
 A("Spider-Man's new suit is ___ than his old suit. (good)", ["better", "gooder", "more good", "best"], "better", "Unregelmäßig: good → better → the best."),
 A("Loki's joke was ___ than Thor's. (bad)", ["worse", "badder", "worst", "more bad"], "worse", "Unregelmäßig: bad → worse → the worst."),
 # as ... as
 A("Captain America is ___ Bucky. (gleich stark)", ["as strong as", "as stronger as", "stronger as", "as strongest as"], "as strong as", "as + GRUNDFORM + as. Nie „as stronger as“!"),
 A("Hawkeye's arrow is ___ Black Widow's. (gleich gut)", ["as good as", "as better as", "as best as", "gooder as"], "as good as", "as good as – kein Komparativ zwischen as und as!"),
 A("Ant-Man isn't ___ Hulk. (nicht so groß wie)", ["as big as", "as bigger as", "bigger as", "as biggest as"], "as big as", "not as big as = nicht so groß wie."),
 L("Thor is as ___ as Hulk. (strong)", "strong", "as strong as – Grundform!"),
 L("Groot's arm is as ___ as a tree. (long)", "long", "as long as – nicht „as longer as“."),
 # Superlativ
 L("Hulk is the ___ Avenger. (strong)", ["strongest"], "Superlativ: the + -est: the strongest."),
 L("Groot is the ___ hero. (tall)", ["tallest"], "the tallest."),
 L("The taipan is the ___ snake in the world. (venomous)", ["most venomous"], "Lange Adjektive: the most …: the most venomous."),
 L("Rocket is the ___ Guardian. (funny)", ["funniest"], "-y → -iest: the funniest."),
 A("The cheetah is ___ animal on land.", ["the fastest", "the faster", "the most fast", "fastest than"], "the fastest", "Superlativ = der/die/das schnellste: the fastest."),
 A("Spider-Man is faster ___ Ant-Man.", ["than", "as", "then", "that"], "than", "Komparativ + than: faster than."),
 A("Welche Form ist richtig? Thanos is the ___ villain.", ["most dangerous", "dangerousest", "more dangerous", "dangerouser"], "most dangerous", "the most dangerous."),
 A("Komparativ oder Superlativ? Groot is ___ than Rocket. (tall)", ["taller", "tallest", "the tallest", "more tall"], "taller", "Zwei werden verglichen + than → Komparativ: taller."),
 # Lesetext + Wortschatz-Wissen
 A("„The house on the hill“: Who opens the door?", ["an old woman", "a police officer", "a ghost", "Darren"], "an old woman", "Eine alte Frau öffnet und schließt die Tür wortlos."),
 A("„The house on the hill“: Why do Laura and Darren run to the gate?", ["because of the barking dogs", "because it's raining", "because of a ghost", "because they are hungry"], "because of the barking dogs", "Zwei Hunde jagen sie zum Tor."),
 A("„The house on the hill“: What does the police officer say?", ["Nobody lives there.", "The house is a shop.", "Mrs Smith is on holiday.", "The dogs are friendly."], "Nobody lives there.", "Die Besitzerin Mrs Smith ist letztes Jahr gestorben."),
 A("Welches Tier ist ein „mammal“ (Säugetier)?", ["whale", "ostrich", "crocodile", "mosquito"], "whale", "Wale sind Säugetiere, auch wenn sie im Meer leben."),
 A("Welches Tier ist ein „reptile“?", ["crocodile", "parrot", "baboon", "bat"], "crocodile", "Krokodile, Schlangen (snake, anaconda) sind reptiles."),
 E("Buchstabiere „gruselig“ auf Englisch:", "scary", "s-c-a-r-y.", "Buchstabieren"),
 E("Buchstabiere „Giraffe“ auf Englisch:", "giraffe", "g-i-r-a-f-f-e (zwei f!).", "Buchstabieren"),
 E("Buchstabiere „Schimpanse“ auf Englisch:", "chimpanzee", "c-h-i-m-p-a-n-z-e-e.", "Buchstabieren"),
]
schreiben("valentin", "englisch", "Englisch-Helden", val_en, False,
          "Workbook Unit 3 (Halloween) & Unit 4 (What an animal!) – mit deinen Lieblingshelden", "helden", "ve")

# ================= PLATZHALTER (bis echtes Lernmaterial da ist) =================
mathe = [
 M("Rechne: 7 · 8 =", "56"), M("Rechne: 144 : 12 =", "12"), M("Rechne: 3,5 + 2,75 =", "6,25", "Komma untereinander schreiben."),
 M("Rechne: 10 − 4,3 =", "5,7"), M("Rechne: 0,5 · 8 =", "4", "0,5 ist die Hälfte – die Hälfte von 8 ist 4."),
 M("Wie viel ist 1/2 + 1/4? (als Dezimalzahl)", "0,75", "1/2 = 2/4, also 2/4 + 1/4 = 3/4 = 0,75."),
 A("Welcher Bruch ist gleich groß wie 2/4?", ["1/2", "2/8", "4/2", "1/4"], "1/2", "Kürzen: 2/4 = 1/2."),
 A("Welche Zahl ist durch 3 teilbar?", ["123", "124", "125", "130"], "123", "Ziffernsumme 1+2+3 = 6 ist durch 3 teilbar."),
 M("Ein Rechteck ist 6 cm lang und 4 cm breit. Wie groß ist der Umfang in cm?", "20", "u = 2 · (6 + 4) = 20 cm."),
 M("Ein Rechteck ist 6 cm lang und 4 cm breit. Wie groß ist der Flächeninhalt in cm²?", "24", "A = 6 · 4 = 24 cm²."),
 M("Löse: x + 15 = 42. x =", "27", "42 − 15 = 27."),
 M("Löse: 4 · x = 36. x =", "9", "36 : 4 = 9."),
 M("Wie viele Minuten haben 2,5 Stunden?", "150", "2 h = 120 min, 0,5 h = 30 min."),
 M("Wie viele Gramm sind 1,2 kg?", "1200", "1 kg = 1000 g."),
 M("Was ist der größte gemeinsame Teiler (ggT) von 12 und 18?", "6"),
 M("Was ist das kleinste gemeinsame Vielfache (kgV) von 4 und 6?", "12"),
 A("Wie groß ist ein rechter Winkel?", ["90°", "180°", "45°", "360°"], "90°"),
 M("Runde 3,46 auf eine Dezimalstelle.", "3,5", "Die 6 ist 5 oder mehr → aufrunden."),
 M("Rechne: 25 % von 80 =", "20", "25 % = ein Viertel. 80 : 4 = 20."),
 A("Welche Zahl ist am größten?", ["0,7", "0,65", "0,09", "0,659"], "0,7", "0,7 = 0,700 – das ist größer als 0,659."),
]
bio = [
 A("Welches Tier ist ein Säugetier?", ["Delfin", "Hai", "Pinguin", "Frosch"], "Delfin", "Delfine säugen ihre Jungen und atmen Luft."),
 A("Wie atmen Fische?", ["mit Kiemen", "mit Lungen", "durch die Haut", "mit der Nase"], "mit Kiemen"),
 A("Was brauchen Pflanzen für die Fotosynthese?", ["Licht, Wasser und Kohlendioxid", "nur Erde", "Sauerstoff und Zucker", "nur Wasser"], "Licht, Wasser und Kohlendioxid", "Daraus machen sie Zucker und Sauerstoff."),
 A("Welches Gas geben Pflanzen bei der Fotosynthese ab?", ["Sauerstoff", "Kohlendioxid", "Stickstoff", "Helium"], "Sauerstoff"),
 A("Wie heißt der grüne Farbstoff in den Blättern?", ["Chlorophyll", "Hämoglobin", "Melanin", "Karotin"], "Chlorophyll"),
 A("Welches Organ pumpt das Blut durch den Körper?", ["Herz", "Lunge", "Leber", "Magen"], "Herz"),
 E("Wie viele Knochen hat ein erwachsener Mensch ungefähr? (Zahl)", ["206"], "Rund 206 Knochen.", zahl=True),
 A("Welche Tiergruppe hat Federn?", ["Vögel", "Reptilien", "Amphibien", "Insekten"], "Vögel"),
 A("Wie viele Beine haben Insekten?", ["6", "8", "4", "10"], "6", "Spinnen haben 8 Beine – sie sind keine Insekten."),
 A("Was ist ein Amphibium?", ["Frosch", "Eidechse", "Maus", "Forelle"], "Frosch", "Amphibien leben an Land und im Wasser."),
 A("Wie nennt man Tiere, die nur Pflanzen fressen?", ["Pflanzenfresser", "Fleischfresser", "Allesfresser", "Aasfresser"], "Pflanzenfresser"),
 A("Was macht ein Igel im Winter?", ["Winterschlaf", "Er fliegt in den Süden", "Er wechselt sein Fell", "Nichts Besonderes"], "Winterschlaf"),
 A("Welcher Teil der Pflanze nimmt Wasser aus dem Boden auf?", ["Wurzel", "Blüte", "Blatt", "Frucht"], "Wurzel"),
 A("Wo wird die Nahrung im Körper zuerst zerkleinert?", ["im Mund", "im Magen", "im Darm", "in der Leber"], "im Mund", "Die Zähne zerkleinern, der Speichel beginnt die Verdauung."),
 A("Welches Tier ist ein Nagetier?", ["Eichhörnchen", "Fuchs", "Igel", "Maulwurf"], "Eichhörnchen"),
 A("Wie nennt man den Wechsel von der Kaulquappe zum Frosch?", ["Metamorphose", "Fotosynthese", "Winterstarre", "Häutung"], "Metamorphose"),
]
deutsch = [
 A("Welches Wort ist ein Nomen?", ["Haus", "laufen", "schön", "und"], "Haus", "Nomen schreibt man groß."),
 A("Welches Wort ist ein Verb?", ["springen", "Tisch", "blau", "unter"], "springen"),
 A("Welches Wort ist ein Adjektiv?", ["lustig", "Hund", "essen", "weil"], "lustig"),
 L("Ich hoffe, ___ du morgen kommst. (das / dass)", "dass", "„dass“ leitet einen Nebensatz ein und lässt sich nicht durch „welches“ ersetzen."),
 L("___ Buch liegt auf dem Tisch. (Das / Dass)", "das", "Artikel → „das“."),
 A("In welchem Fall steht „dem Hund“?", ["3. Fall (Dativ)", "1. Fall (Nominativ)", "2. Fall (Genitiv)", "4. Fall (Akkusativ)"], "3. Fall (Dativ)", "Wem? → dem Hund."),
 A("In welchem Fall steht „den Ball“ in „Ich werfe den Ball“?", ["4. Fall (Akkusativ)", "3. Fall (Dativ)", "1. Fall (Nominativ)", "2. Fall (Genitiv)"], "4. Fall (Akkusativ)", "Wen oder was? → den Ball."),
 L("Setze ins Präteritum: ich gehe → ich ___", "ging"),
 L("Setze ins Perfekt: ich schwimme → ich bin ___", "geschwommen"),
 L("Mehrzahl von „die Maus“: die ___", ["mäuse"]),
 A("Welches Wort ist richtig geschrieben?", ["Fahrrad", "Farrad", "Fahrad", "Varrad"], "Fahrrad"),
 A("Welches Wort ist richtig geschrieben?", ["vielleicht", "fieleicht", "vieleicht", "vielleich"], "vielleicht"),
 A("Was ist das Subjekt in: „Der kleine Kater schläft.“?", ["Der kleine Kater", "schläft", "klein", "Der"], "Der kleine Kater", "Wer oder was schläft? → der kleine Kater."),
 L("Steigere: gut – besser – am ___", "besten"),
 A("Welches Satzzeichen fehlt? „Kommst du morgen mit“", ["?", "!", ".", ","], "?", "Es ist eine Frage."),
 A("Was ist ein Synonym für „schnell“?", ["rasch", "langsam", "laut", "müde"], "rasch", "Synonym = Wort mit gleicher Bedeutung."),
]
geo = [
 A("Was ist die Hauptstadt von Österreich?", ["Wien", "Graz", "Salzburg", "Linz"], "Wien"),
 E("Wie viele Bundesländer hat Österreich? (Zahl)", ["9"], "Wien, NÖ, OÖ, Salzburg, Tirol, Vorarlberg, Kärnten, Steiermark, Burgenland.", zahl=True),
 A("Was ist die Hauptstadt von Tirol?", ["Innsbruck", "Bregenz", "Klagenfurt", "St. Pölten"], "Innsbruck"),
 A("Was ist die Hauptstadt von Niederösterreich?", ["St. Pölten", "Wien", "Krems", "Wiener Neustadt"], "St. Pölten"),
 A("Was ist die Hauptstadt der Steiermark?", ["Graz", "Leoben", "Villach", "Linz"], "Graz"),
 A("Wie heißt der höchste Berg Österreichs?", ["Großglockner", "Dachstein", "Zugspitze", "Schneeberg"], "Großglockner", "3.798 m hoch."),
 A("Welcher große Fluss fließt durch Wien?", ["Donau", "Inn", "Rhein", "Mur"], "Donau"),
 A("Welches Land grenzt NICHT an Österreich?", ["Frankreich", "Deutschland", "Ungarn", "Slowenien"], "Frankreich"),
 E("Wie viele Kontinente gibt es? (Zahl)", ["7"], "Afrika, Antarktis, Asien, Australien, Europa, Nordamerika, Südamerika.", zahl=True),
 A("Welcher ist der größte Ozean?", ["Pazifik", "Atlantik", "Indischer Ozean", "Nordpolarmeer"], "Pazifik"),
 A("Auf welchem Kontinent liegt Ägypten?", ["Afrika", "Asien", "Europa", "Südamerika"], "Afrika"),
 A("Was zeigt der Maßstab auf einer Karte?", ["wie stark verkleinert wurde", "die Himmelsrichtung", "die Höhe der Berge", "das Wetter"], "wie stark verkleinert wurde"),
 A("Wo geht die Sonne auf?", ["im Osten", "im Westen", "im Norden", "im Süden"], "im Osten"),
 A("Welcher See liegt zum Teil in Österreich und zum Teil in Ungarn?", ["Neusiedler See", "Bodensee", "Wörthersee", "Attersee"], "Neusiedler See"),
 A("Was ist die Hauptstadt von Deutschland?", ["Berlin", "München", "Hamburg", "Frankfurt"], "Berlin"),
 A("Welches Bundesland liegt ganz im Westen Österreichs?", ["Vorarlberg", "Burgenland", "Kärnten", "Salzburg"], "Vorarlberg"),
]
eng_allg = [
 UE("„Kürbis“ auf Englisch?", "pumpkin"), UE("„Süßigkeiten“ auf Englisch?", "sweets"), UE("„Kostüm“ auf Englisch?", "costume"),
 UE("„gefährlich“ auf Englisch?", "dangerous"), UE("„schnell“ auf Englisch?", "fast"), UE("„Wüste“ auf Englisch?", "desert"),
 UE("„strong“ auf Deutsch?", "stark"), UE("„scary“ auf Deutsch?", ["gruselig", "unheimlich"]),
 A("You look tired. You ___ go to bed.", ["should", "shouldn't", "should to"], "should", "should + Grundform."),
 A("It's cold. You ___ go out without a jacket.", ["shouldn't", "should"], "shouldn't"),
 A("I saw ___ elephant at the zoo.", ["an", "a"], "an", "an vor Vokal-Laut."),
 A("She has ___ dog.", ["a", "an"], "a"),
 L("An elephant is ___ than a mouse. (big)", "bigger"), L("A cheetah is ___ than a horse. (fast)", "faster"),
 L("This film is ___ than that one. (interesting)", "more interesting"),
 A("Tom is ___ Ben. (gleich groß)", ["as tall as", "as taller as", "taller as"], "as tall as", "as + Grundform + as."),
 L("The blue whale is the ___ animal in the world. (big)", "biggest"),
 A("My bike is ___ than yours. (good)", ["better", "gooder", "best"], "better"),
 A("Yesterday I ___ to school by bus.", ["went", "go", "goed", "going"], "went", "go → went (unregelmäßig)."),
 A("___ you like pizza?", ["Do", "Does", "Are", "Is"], "Do"),
]
for p in ["valentin", "elias"]:
    schreiben(p, "mathe", "Mathe", mathe, True, prefix="ma")
    schreiben(p, "biologie", "Biologie", bio, True, prefix="bi")
    schreiben(p, "deutsch", "Deutsch", deutsch, True, prefix="de")
    schreiben(p, "geografie", "Geografie", geo, True, prefix="ge")
schreiben("elias", "englisch", "Englisch", eng_allg, True, prefix="en")
print("fertig")
