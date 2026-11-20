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

def schreiben(person, fach, titel, fragen, platzhalter, untertitel="", thema=None, prefix=None, tests=None, wissen=None, sprechen=None):
    fragen = json.loads(json.dumps(fragen))
    for i, q in enumerate(fragen): q["id"] = f"{prefix or fach[:2]}{i+1:03d}"
    d = {"titel": titel, "untertitel": untertitel, "platzhalter": platzhalter}
    if thema: d["thema"] = thema
    d["fragen"] = fragen
    if tests:
        tests = json.loads(json.dumps(tests))
        for t in tests:
            for i, q in enumerate(t["fragen"]): q["id"] = f"{t['id']}-{i+1:02d}"
        d["tests"] = tests
    if wissen: d["wissen"] = wissen
    if sprechen: d["sprechen"] = sprechen
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

def W(titel, kurz, text=None, schritte=None, beispiel=None, merke=None, video=None):
    d = {"titel": titel, "kurz": kurz}
    for k, v in [("text", text), ("schritte", schritte), ("beispiel", beispiel), ("merke", merke), ("video", video)]:
        if v: d[k] = v
    return d
def G(titel, kurz, schritte): return {"titel": titel, "kurz": kurz, "schritte": [dict(sagt=a, erwartet=b, tipp=c) for a, b, c in schritte]}

# ---------- Englisch-Grammatik-Wissen (aus Valentins Workbook) ----------
def englisch_wissen(held):
    a, b, c = ("Hulk", "Ant-Man", "Thor") if held else ("Haaland", "Saka", "Salah")
    return [
     W("should / shouldn't", "Ratschläge geben", [
        "Mit should gibst du einen Rat: Du solltest … – mit shouldn't sagst du: Du solltest nicht …",
        "should bleibt IMMER gleich – auch bei he/she/it kein -s. Danach kommt die Grundform des Verbs, ohne „to“."],
       ["Wer? (I, you, he …)", "should oder shouldn't", "Verb in der Grundform (go, eat, see …)", "Rest des Satzes"],
       f"{a} is tired.\n→ He should go to bed.\n→ He shouldn't watch TV so late.\n\n✗ He shoulds go   ✗ He should to go   ✓ He should go",
       "should + Grundform. Kein -s, kein to.", "should shouldn't english grammar einfach erklärt"),
     W("a oder an?", "Der unbestimmte Artikel", [
        "Es kommt auf den KLANG am Wortanfang an, nicht auf den Buchstaben.",
        "an vor einem Vokal-Laut (a, e, i, o, u gesprochen), a vor einem Konsonanten-Laut."],
       ["Sprich das Wort laut aus.", "Klingt der Anfang wie a, e, i, o, u? → an", "Sonst → a"],
       "an apple, an ostrich, an old house, an hour (h ist stumm!)\na ghost, a pumpkin, a dog, a uniform (klingt wie „ju“)",
       "Das Ohr entscheidet, nicht das Auge.", "a or an english grammar erklärt"),
     W("Komparativ – vergleichen mit than", "bigger than, more dangerous than", [
        "Wenn du ZWEI Dinge vergleichst, nimmst du den Komparativ + than."],
       ["Kurzes Adjektiv → -er: fast → faster, tall → taller", "Endet auf -y → -ier: heavy → heavier, funny → funnier",
        "Ein Vokal + Konsonant am Ende → verdoppeln: big → bigger, hot → hotter", "Lange Adjektive → more: more dangerous, more intelligent",
        "Unregelmäßig: good → better, bad → worse"],
       f"{a} is stronger than {b}.\n{c} is faster than {a}.\nA snake is more dangerous than a spider.",
       "Komparativ + than (nicht then!).", "comparative adjectives english erklärt deutsch"),
     W("as … as – gleich viel", "as big as, not as fast as", [
        "Wenn zwei Dinge GLEICH sind, nimmst du as + Grundform + as.",
        "Verneint (not as … as) heißt es: weniger … als."],
       ["as", "Adjektiv in der GRUNDFORM (big, strong, good)", "as"],
       f"{a} is as strong as {c}.\n{b} isn't as tall as {a}.\n\n✗ as stronger as   ✗ as better as   ✓ as strong as / as good as",
       "Zwischen as und as steht NIE ein Komparativ. Das ist der häufigste Fehler!", "as as comparison english grammar"),
     W("Superlativ – der/die/das Beste", "the fastest, the most dangerous", [
        "Wenn etwas an der Spitze ist (von dreien oder mehr), nimmst du den Superlativ mit the."],
       ["Kurz → the …-est: the fastest, the tallest", "-y → the …-iest: the heaviest, the funniest",
        "Lang → the most …: the most dangerous, the most venomous", "Unregelmäßig: good → the best, bad → the worst"],
       f"The cheetah is the fastest animal on land.\n{a} is the strongest.\nThe taipan is the most venomous snake.",
       "Komparativ = zwei vergleichen (+ than). Superlativ = der/die/das -ste (+ the).", "superlative adjectives english erklärt"),
    ]

# ---------- Valentin Englisch: Tests + Sprechen ----------
val_tests = [
 {"id": "unit3", "titel": "Test Unit 3 – Halloween & should", "fragen": [
   UE("Kürbis", "pumpkin"), UE("Friedhof", "graveyard"), UE("Kostüm", "costume"), UE("Süßigkeiten", "sweets"), UE("Gespenst", "ghost"),
   UE("scary", ["gruselig", "unheimlich"]), UE("Treppe", "stairs"),
   A("Spider-Man has a headache. He ___ see a doctor.", ["should", "shouldn't", "shoulds"], "should"),
   A("Loki ___ eat ten bags of sweets.", ["shouldn't", "should", "should to"], "shouldn't"),
   A("Which sentence is correct?", ["Thor should take an umbrella.", "Thor should takes an umbrella.", "Thor should to take an umbrella."], "Thor should take an umbrella."),
   A("Wanda sees ___ old castle.", ["an", "a"], "an"), A("Hawkeye has ___ mask.", ["a", "an"], "a"),
 ]},
 {"id": "unit4", "titel": "Test Unit 4 – Animals & Vergleiche", "fragen": [
   UE("Nashorn", "rhino"), UE("Gepard", "cheetah"), UE("Fledermaus", "bat"), UE("giftig (Schlange)", "venomous"), UE("Säugetier", "mammal"),
   L("Hulk is ___ than Spider-Man. (heavy)", "heavier"), L("Black Panther is ___ than Hawkeye. (fast)", "faster"),
   L("Doctor Strange is ___ than Groot. (intelligent)", "more intelligent"),
   A("Captain America is ___ Bucky.", ["as strong as", "as stronger as", "stronger as"], "as strong as"),
   L("Hulk is the ___ Avenger. (strong)", "strongest"), L("Thanos is the ___ villain. (dangerous)", "most dangerous"),
   A("Iron Man's suit is ___ than his old one. (good)", ["better", "gooder", "best"], "better"),
 ]},
]
val_sprechen = [
 G("Halloween mit Spider-Man", "Kostüme, Süßigkeiten, should", [
  ("Hi, I'm Peter Parker! It's Halloween tonight. What costume do you want to wear?", [["costume"], ["i", "want"], ["i'm"], ["i", "wear"], ["i", "will"]], "I want to wear a vampire costume."),
  ("Cool! I want to go trick or treating. What do we say at the door?", [["trick", "or", "treat"]], "Trick or treat!"),
  ("I'm scared of the old house at the end of the street. Should we go there?", [["should"], ["shouldn't"], ["no"], ["yes"]], "No, we shouldn't go there."),
  ("I ate too many sweets and I feel sick. What should I do?", [["should"]], "You should drink some water."),
  ("Thanks, mate! What's your favourite Halloween sweet?", [["my", "favourite"], ["i", "like"], ["chocolate"]], "My favourite sweet is chocolate."),
 ]),
 G("Safari mit Black Panther", "Tiere vergleichen", [
  ("Welcome to Africa! I'm T'Challa. Which animal is faster, a cheetah or a rhino?", [["cheetah", "faster"], ["cheetah"]], "A cheetah is faster than a rhino."),
  ("Right! Is a rhino heavier than a giraffe?", [["heavier"], ["yes"], ["no"]], "Yes, a rhino is heavier than a giraffe."),
  ("What is the most dangerous animal you know?", [["most", "dangerous"], ["dangerous"]], "The most dangerous animal is the taipan."),
  ("Is a baboon as big as a gorilla?", [["as", "big", "as"], ["not", "as"], ["isn't"], ["no"]], "No, a baboon isn't as big as a gorilla."),
  ("Great! What's your favourite animal, and why?", [["because"], ["favourite"]], "My favourite animal is the cheetah because it's fast."),
 ]),
]
schreiben("valentin", "englisch", "Englisch-Helden", val_en, False,
          "Workbook Unit 3 (Halloween) & Unit 4 (What an animal!)", "helden", "ve",
          tests=val_tests, wissen=englisch_wissen(True), sprechen=val_sprechen)

# ---------- Elias Englisch: Fußball / Premier League (Platzhalter) ----------
eli_en = [
 UE("„Tor“ (das Tor, in das der Ball geht) auf Englisch?", ["goal"], "goal = Tor. „He scored a goal.“"),
 UE("„Schiedsrichter“ auf Englisch?", ["referee", "ref"], "referee = Schiedsrichter."),
 UE("„Mannschaft“ auf Englisch?", ["team", "side"], "team = Mannschaft."),
 UE("„Spieler“ auf Englisch?", ["player"], "player = Spieler."),
 UE("„Torwart“ auf Englisch?", ["goalkeeper", "keeper", "goalie"], "goalkeeper = Torwart."),
 UE("„Elfmeter“ auf Englisch?", ["penalty"], "penalty = Elfmeter."),
 UE("„Stadion“ auf Englisch?", ["stadium"], "stadium = Stadion."),
 UE("„Fans / Zuschauer“ auf Englisch?", ["fans", "supporters", "crowd"], "fans, supporters, crowd."),
 UE("„to score“ – was heißt das?", ["treffen", "ein tor schießen", "tor schießen", "scoren"], "to score = ein Tor schießen."),
 UE("„to win“ – was heißt das?", ["gewinnen"], "win – won – won."),
 UE("„to lose“ – was heißt das?", ["verlieren"], "lose – lost – lost."),
 UE("„draw“ – was heißt das beim Fußball?", ["unentschieden", "remis"], "It was a draw = Es war unentschieden."),
 UE("„Verletzung“ auf Englisch? (Bukayo Saka has an ___.)", ["injury"], "injury = Verletzung."),
 UE("„stark“ auf Englisch?", ["strong"]), UE("„schnell“ auf Englisch?", ["fast", "quick"]),
 A("Erling Haaland is tired after the match. He ___ go to bed early.", ["should", "shouldn't", "shoulds"], "should", "should + Grundform."),
 A("It's raining at Anfield. The fans ___ forget their jackets.", ["shouldn't", "should"], "shouldn't"),
 A("Which sentence is correct?", ["Saka should practise his penalties.", "Saka shoulds practise his penalties.", "Saka should to practise his penalties."], "Saka should practise his penalties.", "should + Grundform, kein -s, kein to."),
 A("Salah scores ___ amazing goal.", ["an", "a"], "an", "amazing beginnt mit Vokal-Laut → an."),
 A("Rice is ___ great midfielder.", ["a", "an"], "a"),
 A("The referee shows ___ yellow card.", ["a", "an"], "a"),
 L("Haaland is ___ than Foden. (tall)", "taller", "tall → taller."),
 L("Salah is ___ than the goalkeeper. (fast)", "faster"),
 L("Van Dijk is ___ than Ødegaard. (big)", "bigger", "big → bigger (g verdoppeln)."),
 L("This match is ___ than the last one. (exciting)", "more exciting", "Lang → more exciting."),
 A("Arsenal played ___ than Chelsea. (good)", ["better", "gooder", "best"], "better", "good → better → the best."),
 A("Saka is ___ Martinelli. (gleich schnell)", ["as fast as", "as faster as", "faster as"], "as fast as", "as + Grundform + as."),
 A("Foden isn't ___ Haaland. (nicht so groß wie)", ["as tall as", "as taller as", "taller as"], "as tall as"),
 L("Haaland is the ___ striker in the league. (strong)", "strongest"),
 L("Wembley is the ___ stadium in England. (big)", "biggest"),
 L("That was the ___ goal of the season! (beautiful)", "most beautiful"),
 A("Yesterday Liverpool ___ 3–1.", ["won", "win", "winned", "wins"], "won", "win → won (unregelmäßig)."),
 A("___ you play football every week?", ["Do", "Does", "Are"], "Do"),
 A("Which word means „Abseits“?", ["offside", "outside", "sideline", "offline"], "offside"),
]
eli_tests = [{"id": "kap1", "titel": "Test Kapitel 1 – Football English", "fragen": [
   UE("Tor (das man schießt)", "goal"), UE("Schiedsrichter", ["referee", "ref"]), UE("Torwart", ["goalkeeper", "keeper"]), UE("Elfmeter", "penalty"),
   A("Haaland ___ rest after the match.", ["should", "shoulds", "should to"], "should"),
   A("Salah scores ___ easy goal.", ["an", "a"], "an"),
   L("Saka is ___ than the defender. (fast)", "faster"), L("Haaland is ___ than Foden. (big)", "bigger"),
   A("Rice is ___ Ødegaard. (gleich gut)", ["as good as", "as better as", "better as"], "as good as"),
   L("Wembley is the ___ stadium. (famous)", "most famous"),
 ]}]
eli_sprechen = [
 G("Interview nach dem Spiel", "Wie ein Profi antworten", [
  ("Hi, I'm a reporter from Sky Sports. Congratulations! Did your team win today?", [["win"], ["won"], ["yes"], ["no"], ["lost"], ["draw"]], "Yes, we won the match."),
  ("Brilliant! How many goals did you score?", [["goal"], ["one"], ["two"], ["three"], ["scored"]], "I scored two goals."),
  ("Who is the best player in your team?", [["best"]], "The best player in my team is Max."),
  ("Is your team faster than the other team?", [["faster"], ["yes"], ["no"]], "Yes, we are faster than the other team."),
  ("What should young players do to get better?", [["should"]], "They should train every day."),
 ]),
 G("Mein Lieblingsverein", "Über Fußball reden", [
  ("Hi! Which football team do you support?", [["support"], ["my", "favourite"], ["i", "like"], ["team"]], "I support Arsenal."),
  ("Nice! Who is your favourite player?", [["favourite", "player"], ["my", "favourite"], ["i", "like"]], "My favourite player is Bukayo Saka."),
  ("Why do you like him?", [["because"]], "Because he is very fast and skilful."),
  ("Is he as fast as Mohamed Salah?", [["as", "fast", "as"], ["faster"], ["not", "as"], ["yes"], ["no"]], "Yes, he is as fast as Salah."),
 ]),
]
schreiben("elias", "englisch", "Football English", eli_en, True, "Englisch mit Premier League & Fußball", "sport", "en",
          tests=eli_tests, wissen=englisch_wissen(False), sprechen=eli_sprechen)

# ---------- Mathe-Wissen + Test (Platzhalter, beide) ----------
mathe_wissen = [
 W("Brüche kürzen und erweitern", "Gleich viel, andere Zahlen", ["Kürzen: Zähler und Nenner durch dieselbe Zahl teilen. Erweitern: beide mit derselben Zahl malnehmen. Der Wert bleibt gleich."],
   ["Suche eine Zahl, durch die Zähler UND Nenner teilbar sind.", "Teile beide durch diese Zahl.", "Geht es nochmal? Dann wiederholen, bis nichts mehr geht."],
   "12/18  → beide durch 6 →  2/3\n 1/4  → beide mal 3   →  3/12", "Was du oben machst, musst du auch unten machen.", "Brüche kürzen und erweitern einfach erklärt"),
 W("Brüche addieren", "Erst gleicher Nenner, dann addieren", ["Brüche kann man nur addieren, wenn sie denselben Nenner haben."],
   ["Gemeinsamen Nenner finden (kgV der Nenner).", "Beide Brüche auf diesen Nenner erweitern.", "Zähler addieren, Nenner bleibt gleich.", "Ergebnis kürzen, wenn es geht."],
   "1/2 + 1/4\n= 2/4 + 1/4\n= 3/4", "Nenner werden nie addiert!", "Brüche addieren mit verschiedenen Nennern erklärt"),
 W("Dezimalzahlen addieren und subtrahieren", "Komma unter Komma", None,
   ["Schreibe die Zahlen so untereinander, dass Komma unter Komma steht.", "Fehlende Stellen mit 0 auffüllen.", "Rechnen wie bei ganzen Zahlen.", "Komma im Ergebnis an dieselbe Stelle setzen."],
   "  3,50\n+ 2,75\n------\n  6,25", "Komma unter Komma.", "Dezimalzahlen schriftlich addieren subtrahieren"),
 W("Umfang und Flächeninhalt vom Rechteck", "u = 2·(a+b),  A = a·b", ["Der Umfang ist der Weg einmal rundherum. Der Flächeninhalt ist, wie viel Fläche drinnen ist."],
   ["Länge a und Breite b ablesen (gleiche Einheit!).", "Umfang: a + b + a + b = 2·(a + b).", "Fläche: a · b, Einheit hoch 2 (cm²)."],
   "a = 6 cm, b = 4 cm\nu = 2·(6+4) = 20 cm\nA = 6·4 = 24 cm²", "Umfang in cm, Fläche in cm².", "Umfang und Flächeninhalt Rechteck erklärt"),
 W("Einfache Gleichungen lösen", "x allein auf eine Seite bringen", ["Eine Gleichung ist wie eine Waage: Was du links machst, musst du auch rechts machen."],
   ["Was passiert mit x? (+, −, ·, :)", "Mach das Gegenteil auf beiden Seiten.", "Probe: x einsetzen und nachrechnen."],
   "x + 15 = 42   | −15\n     x = 27\n\n4 · x = 36    | :4\n     x = 9", "Immer auf beiden Seiten dasselbe tun.", "Gleichungen lösen einfach erklärt Klasse 6"),
 W("Prozent", "Hundertstel", ["Prozent heißt „von Hundert“. 25 % = 25/100 = 1/4."],
   ["Grundwert durch 100 teilen (= 1 %).", "Mit der Prozentzahl malnehmen."],
   "25 % von 80\n80 : 100 = 0,8\n0,8 · 25 = 20", "50 % = Hälfte, 25 % = Viertel, 10 % = durch 10.", "Prozentrechnung einfach erklärt"),
]
mathe_tests = [{"id": "kap1", "titel": "Test Kapitel 1 – Brüche & Dezimalzahlen", "fragen": [
  M("Kürze 6/8 so weit wie möglich. Zähler =", "3"), M("1/2 + 1/4 als Dezimalzahl =", "0,75"), M("2,4 + 3,85 =", "6,25"),
  M("7 − 2,6 =", "4,4"), M("Rechteck 5 cm × 3 cm: Fläche in cm² =", "15"), M("x + 9 = 20. x =", "11"),
  M("10 % von 250 =", "25"), M("ggT von 8 und 12 =", "4"),
]}]
geo_wissen = [W("Österreichs Bundesländer", "9 Länder, 9 Hauptstädte", ["Österreich hat 9 Bundesländer."], None,
  "Wien – Wien\nNiederösterreich – St. Pölten\nOberösterreich – Linz\nSalzburg – Salzburg\nTirol – Innsbruck\nVorarlberg – Bregenz\nKärnten – Klagenfurt\nSteiermark – Graz\nBurgenland – Eisenstadt",
  "Merksatz für die Reihenfolge von West nach Ost: Vorarlberg, Tirol, Salzburg, Kärnten, Steiermark, Oberösterreich, Niederösterreich, Wien, Burgenland.", "Bundesländer Österreich Hauptstädte erklärt")]
bio_wissen = [W("Die 5 Wirbeltierklassen", "Fische, Amphibien, Reptilien, Vögel, Säugetiere", None,
  ["Fische: Kiemen, Schuppen, leben im Wasser.", "Amphibien: z. B. Frosch – Larve im Wasser, später Lunge.", "Reptilien: trockene Schuppenhaut, Eier an Land.", "Vögel: Federn, Schnabel, legen Eier.", "Säugetiere: Fell, Junge trinken Milch."],
  None, "Delfin und Wal sind Säugetiere, keine Fische!", "Wirbeltiere Klassen einfach erklärt")]
deutsch_wissen = [W("das oder dass?", "Der Ersatz-Trick", ["„das“ ist Artikel oder Pronomen, „dass“ verbindet Sätze."],
  ["Kannst du „dieses“, „jenes“ oder „welches“ einsetzen? → das", "Geht das nicht? → dass"],
  "Das Buch, das ich lese …  (welches ✓) → das\nIch hoffe, dass du kommst. (welches ✗) → dass", None, "das dass Unterschied einfach erklärt")]
for p in ["valentin", "elias"]:
    schreiben(p, "mathe", "Mathe", mathe, True, prefix="ma", tests=mathe_tests, wissen=mathe_wissen)
    schreiben(p, "biologie", "Biologie", bio, True, prefix="bi", wissen=bio_wissen)
    schreiben(p, "deutsch", "Deutsch", deutsch, True, prefix="de", wissen=deutsch_wissen)
    schreiben(p, "geografie", "Geografie", geo, True, prefix="ge", wissen=geo_wissen)
print("fertig")

# =============== WEITERE FÄCHER (Platzhalter nach österr. AHS-Lehrplan) ===============
def platz(person, fach, titel, fragen, prefix, wissen=None, untertitel=""):
    schreiben(person, fach, titel, fragen, True, untertitel, prefix=prefix, wissen=wissen)

# ---- Valentin, 2. Klasse Gymnasium (6. Schulstufe) ----
platz("valentin", "geschichte", "Geschichte", [
 A("Wie nennt man die Zeit, bevor es Schrift gab?", ["Urgeschichte", "Mittelalter", "Neuzeit", "Antike"], "Urgeschichte"),
 A("Wie heißt die berühmte Gletschermumie aus den Ötztaler Alpen?", ["Ötzi", "Tutanchamun", "Lucy", "Venus"], "Ötzi"),
 A("Welche Figur wurde in Willendorf (Niederösterreich) gefunden?", ["Venus von Willendorf", "Der Denker", "Die Mona Lisa", "Der Diskuswerfer"], "Venus von Willendorf"),
 A("An welchem Fluss entstand die Hochkultur Ägypten?", ["Nil", "Donau", "Euphrat", "Amazonas"], "Nil"),
 A("Wie heißt die Schrift der alten Ägypter?", ["Hieroglyphen", "Keilschrift", "Runen", "Latein"], "Hieroglyphen"),
 A("Wer war der König im alten Ägypten?", ["Pharao", "Kaiser", "Konsul", "Sultan"], "Pharao"),
 A("In welcher griechischen Stadt entstand die Demokratie?", ["Athen", "Sparta", "Rom", "Troja"], "Athen"),
 A("Wo fanden die ersten Olympischen Spiele statt?", ["Olympia", "Athen", "Rom", "Kreta"], "Olympia"),
 A("Wie hieß das römische Lager auf dem Gebiet des heutigen Wien?", ["Vindobona", "Carnuntum", "Juvavum", "Lentia"], "Vindobona"),
 E("Gründungsjahr Roms laut Sage (… v. Chr.)? Nur die Zahl.", ["753"], "„Sieben-fünf-drei, Rom schlüpft aus dem Ei.“", "Eintippen", True),
], "gs", [W("Zeitleiste", "Von der Urgeschichte zu den Römern", None, ["Urgeschichte: Altsteinzeit, Jungsteinzeit (Sesshaftigkeit), Metallzeit", "Hochkulturen: Ägypten (ab ca. 3000 v. Chr.)", "Griechen: Athen, Demokratie, Olympische Spiele", "Römer: Gründung 753 v. Chr., Weltreich bis 476 n. Chr."], None, "v. Chr. zählt rückwärts: 753 v. Chr. ist früher als 500 v. Chr.", "Zeitleiste Urgeschichte Antike einfach erklärt")])
platz("valentin", "physik", "Physik", [
 A("Woraus bestehen alle Stoffe nach dem Teilchenmodell?", ["aus winzigen Teilchen", "aus Luft", "aus Wasser", "aus Energie"], "aus winzigen Teilchen"),
 A("Welcher Aggregatzustand hat eine feste Form?", ["fest", "flüssig", "gasförmig"], "fest"),
 A("Wie heißt der Übergang von flüssig zu gasförmig?", ["Verdampfen", "Schmelzen", "Erstarren", "Kondensieren"], "Verdampfen"),
 A("Bei wie viel Grad Celsius gefriert Wasser?", ["0 °C", "100 °C", "−10 °C", "4 °C"], "0 °C"),
 A("Was passiert meistens mit Stoffen beim Erwärmen?", ["Sie dehnen sich aus", "Sie schrumpfen", "Nichts", "Sie werden schwerer"], "Sie dehnen sich aus"),
 A("In welcher Einheit misst man die Masse?", ["Kilogramm", "Meter", "Liter", "Newton"], "Kilogramm"),
 A("In welcher Einheit misst man eine Kraft?", ["Newton", "Kilogramm", "Watt", "Grad"], "Newton"),
 M("Wie viele Milliliter sind 1 Liter?", "1000"),
 A("Warum schwimmt Holz auf Wasser?", ["Es hat eine kleinere Dichte als Wasser", "Es ist leicht gebaut", "Es ist hohl", "Wegen der Farbe"], "Es hat eine kleinere Dichte als Wasser"),
 A("Was zeigt ein Thermometer an?", ["Temperatur", "Masse", "Volumen", "Kraft"], "Temperatur"),
], "ph", [W("Aggregatzustände", "fest, flüssig, gasförmig", ["Im Teilchenmodell bewegen sich die Teilchen umso schneller, je wärmer es ist."], ["fest: Teilchen dicht, schwingen am Platz", "flüssig: Teilchen verschiebbar", "gasförmig: Teilchen fliegen frei herum"], "fest → flüssig: Schmelzen\nflüssig → fest: Erstarren\nflüssig → gasförmig: Verdampfen\ngasförmig → flüssig: Kondensieren", None, "Aggregatzustände Teilchenmodell erklärt")])
platz("valentin", "digital", "Digitale Grundbildung", [
 A("Welches Passwort ist am sichersten?", ["T!ger-Blau-42-Wolke", "123456", "passwort", "valentin2014"], "T!ger-Blau-42-Wolke", "Lang, mit Zeichen und Zahlen, kein Name."),
 A("Was solltest du NICHT öffentlich posten?", ["Deine Adresse", "Ein Foto von einem Sonnenuntergang", "Dein Lieblingsessen", "Einen Witz"], "Deine Adresse"),
 A("Was ist Phishing?", ["Betrüger wollen per Nachricht Passwörter stehlen", "Ein Angelspiel", "Ein Virenschutz", "Eine Suchmaschine"], "Betrüger wollen per Nachricht Passwörter stehlen"),
 A("Was ist Hardware?", ["Die Geräte, die man anfassen kann", "Programme", "Apps", "Das Internet"], "Die Geräte, die man anfassen kann"),
 A("Was ist Software?", ["Programme und Apps", "Die Tastatur", "Der Bildschirm", "Das Kabel"], "Programme und Apps"),
 A("Wie erkennst du eher eine Fake News?", ["Keine Quelle, reißerische Überschrift", "Sie steht auf mehreren seriösen Seiten", "Sie hat ein Datum", "Sie ist kurz"], "Keine Quelle, reißerische Überschrift"),
 A("Was bedeutet Cybermobbing?", ["Jemanden online absichtlich fertigmachen", "Online-Spiele spielen", "E-Mails schreiben", "Fotos speichern"], "Jemanden online absichtlich fertigmachen"),
 A("Was gehört in eine gute Suchanfrage?", ["Wichtige Stichwörter", "Ein ganzer Roman", "Nur Emojis", "Gar nichts"], "Wichtige Stichwörter"),
], "dg")
platz("valentin", "musik", "Musik", [
 A("Wie viele Linien hat ein Notensystem?", ["5", "4", "6", "3"], "5"),
 A("Wie viele Viertelnoten passen in eine ganze Note?", ["4", "2", "8", "3"], "4"),
 A("Zu welcher Instrumentengruppe gehört die Geige?", ["Streichinstrumente", "Blechblasinstrumente", "Schlaginstrumente", "Holzblasinstrumente"], "Streichinstrumente"),
 A("Zu welcher Gruppe gehört die Trompete?", ["Blechblasinstrumente", "Streichinstrumente", "Tasteninstrumente", "Holzblasinstrumente"], "Blechblasinstrumente"),
 A("Welcher berühmte Komponist wurde in Salzburg geboren?", ["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Antonio Vivaldi"], "Wolfgang Amadeus Mozart"),
 A("Welcher Schlüssel steht meistens am Anfang für hohe Töne?", ["Violinschlüssel", "Bassschlüssel", "Hausschlüssel", "Altschlüssel"], "Violinschlüssel"),
 A("Was bedeutet „forte“?", ["laut", "leise", "schnell", "langsam"], "laut"),
 A("Was bedeutet „piano“ in den Noten?", ["leise", "laut", "Klavier spielen", "schnell"], "leise"),
], "mu")
platz("valentin", "kunst", "Kunst und Gestaltung", [
 A("Welche sind die drei Grundfarben (Malen)?", ["Gelb, Rot (Magenta), Blau (Cyan)", "Grün, Orange, Lila", "Schwarz, Weiß, Grau", "Rot, Grün, Braun"], "Gelb, Rot (Magenta), Blau (Cyan)"),
 A("Was entsteht, wenn man Gelb und Blau mischt?", ["Grün", "Orange", "Violett", "Braun"], "Grün"),
 A("Was entsteht aus Rot und Gelb?", ["Orange", "Grün", "Violett", "Rosa"], "Orange"),
 A("Was ist eine Komplementärfarbe zu Rot?", ["Grün", "Orange", "Gelb", "Blau"], "Grün"),
 A("Welche Farben wirken „warm“?", ["Rot, Orange, Gelb", "Blau, Türkis", "Grau, Schwarz", "Grün, Blau"], "Rot, Orange, Gelb"),
 A("Wer malte die Mona Lisa?", ["Leonardo da Vinci", "Pablo Picasso", "Gustav Klimt", "Vincent van Gogh"], "Leonardo da Vinci"),
 A("Welcher österreichische Maler malte „Der Kuss“?", ["Gustav Klimt", "Egon Schiele", "Friedensreich Hundertwasser", "Claude Monet"], "Gustav Klimt"),
], "ku")
platz("valentin", "technik", "Technik und Design", [
 A("Welches Werkzeug nimmst du zum Sägen von Holz?", ["Laubsäge", "Zange", "Schraubenzieher", "Pinsel"], "Laubsäge"),
 A("Was ist Holz?", ["Ein nachwachsender Rohstoff", "Ein Metall", "Ein Kunststoff", "Ein Stein"], "Ein nachwachsender Rohstoff"),
 A("Welcher Werkstoff leitet Strom gut?", ["Kupfer", "Holz", "Papier", "Kunststoff"], "Kupfer"),
 A("Wozu verwendet man Schleifpapier?", ["Zum Glätten von Oberflächen", "Zum Kleben", "Zum Bohren", "Zum Messen"], "Zum Glätten von Oberflächen"),
 A("Was ist beim Arbeiten mit der Bohrmaschine wichtig?", ["Werkstück gut festspannen", "Handschuhe beim Bohren tragen", "Schnell arbeiten", "Haare offen lassen"], "Werkstück gut festspannen"),
 A("Was macht ein Hebel?", ["Er spart Kraft", "Er macht Strom", "Er misst Länge", "Er klebt Teile"], "Er spart Kraft"),
], "te")

# ---- Elias, 5. Klasse Realgymnasium (9. Schulstufe) ----
platz("elias", "spanisch", "Español", [
 UE("„Hallo“ auf Spanisch?", ["hola"]), UE("„Danke“ auf Spanisch?", ["gracias"]), UE("„Wie heißt du?“ auf Spanisch?", ["¿cómo te llamas?", "como te llamas", "cómo te llamas"]),
 UE("„Ich heiße Elias.“ auf Spanisch?", ["me llamo elias", "soy elias"]), UE("„die Schule“ auf Spanisch?", ["la escuela", "el colegio", "el instituto"]),
 A("Yo ___ de Austria.", ["soy", "estoy", "es", "eres"], "soy", "ser für Herkunft: yo soy, tú eres, él es."),
 A("¿Cómo ___ (tú)? – Bien, gracias.", ["estás", "eres", "está", "soy"], "estás", "estar für Befinden."),
 A("Welcher Artikel passt? ___ casa", ["la", "el", "los", "un"], "la", "Wörter auf -a sind meist weiblich: la casa."),
 A("Welcher Artikel passt? ___ libro", ["el", "la", "las", "una"], "el"),
 A("Wie heißt die Zahl 15?", ["quince", "cinco", "cincuenta", "catorce"], "quince"),
 A("Messi ___ argentino.", ["es", "está", "soy", "son"], "es"),
 A("Nosotros ___ al fútbol. (jugar)", ["jugamos", "juegan", "juego", "jugáis"], "jugamos"),
], "sp", [W("ser oder estar?", "Beide heißen „sein“", None, ["ser: Herkunft, Beruf, Eigenschaften, Uhrzeit (Soy de Austria. Es alto.)", "estar: Befinden, Ort, vorübergehender Zustand (Estoy cansado. Madrid está en España.)"],
  "ser: soy, eres, es, somos, sois, son\nestar: estoy, estás, está, estamos, estáis, están", "Wie du BIST → ser. Wo und wie es dir GEHT → estar.", "ser estar Unterschied Spanisch einfach erklärt")])
platz("elias", "physik", "Physik", [
 A("Wie berechnet man die Geschwindigkeit?", ["v = s / t", "v = s · t", "v = t / s", "v = m · a"], "v = s / t"),
 M("Ein Radfahrer fährt 30 km in 2 h. Geschwindigkeit in km/h?", "15"),
 M("Wie viele m/s sind 36 km/h?", "10", "km/h : 3,6 = m/s"),
 A("Was besagt das Trägheitsprinzip (1. Newton’sches Axiom)?", ["Ein Körper bleibt in Ruhe oder gleichförmiger Bewegung, solange keine Kraft wirkt", "Kraft = Masse · Beschleunigung", "Actio = Reactio", "Energie geht nie verloren"], "Ein Körper bleibt in Ruhe oder gleichförmiger Bewegung, solange keine Kraft wirkt"),
 A("F = m · a ist …", ["das 2. Newton’sche Axiom", "das Ohm’sche Gesetz", "die Dichteformel", "das Hebelgesetz"], "das 2. Newton’sche Axiom"),
 M("Welche Kraft (N) braucht man, um 2 kg mit 3 m/s² zu beschleunigen?", "6"),
 A("Welche SI-Einheit hat die Energie?", ["Joule", "Watt", "Newton", "Pascal"], "Joule"),
 A("Gewichtskraft auf der Erde: ca. … pro kg", ["9,81 N", "1 N", "100 N", "0,5 N"], "9,81 N"),
 M("Dichte ρ = m/V. Ein Körper hat 200 g und 50 cm³. ρ in g/cm³?", "4"),
], "ph", [W("Bewegung: v = s / t", "Geschwindigkeit berechnen", None, ["Weg s und Zeit t ablesen, Einheiten prüfen", "v = s / t rechnen", "Umrechnen: m/s · 3,6 = km/h"], "s = 100 m, t = 12,5 s\nv = 100 / 12,5 = 8 m/s = 28,8 km/h", None, "Geschwindigkeit berechnen Physik erklärt")])
platz("elias", "chemie", "Chemie", [
 A("Woraus besteht ein Atom?", ["Kern aus Protonen und Neutronen, Hülle mit Elektronen", "Nur aus Elektronen", "Aus Molekülen", "Aus Zellen"], "Kern aus Protonen und Neutronen, Hülle mit Elektronen"),
 A("Welche Ladung hat ein Elektron?", ["negativ", "positiv", "neutral"], "negativ"),
 A("Was gibt die Ordnungszahl im Periodensystem an?", ["Anzahl der Protonen", "Anzahl der Neutronen", "Masse", "Anzahl der Moleküle"], "Anzahl der Protonen"),
 A("Chemisches Zeichen für Sauerstoff?", ["O", "S", "Sa", "Ox"], "O"),
 A("Chemisches Zeichen für Natrium?", ["Na", "N", "So", "Nt"], "Na"),
 A("H₂O ist …", ["Wasser", "Wasserstoffperoxid", "Salz", "Sauerstoff"], "Wasser"),
 A("Was ist ein Reinstoff?", ["Ein Stoff aus nur einer Stoffart", "Ein Gemisch", "Sauberes Wasser", "Eine Lösung"], "Ein Stoff aus nur einer Stoffart"),
 A("Wie trennt man Salz aus Salzwasser?", ["Eindampfen", "Filtrieren", "Sieben", "Magnet"], "Eindampfen"),
 A("pH-Wert 2 ist …", ["sauer", "neutral", "basisch (alkalisch)"], "sauer"),
], "ch")
platz("elias", "informatik", "Informatik", [
 M("Wie viel ist die Binärzahl 1010 im Dezimalsystem?", "10", "8 + 0 + 2 + 0 = 10"),
 E("Schreib 5 als Binärzahl:", ["101"], "4 + 1 = 101", "Eintippen"),
 M("Wie viele Bit hat ein Byte?", "8"),
 A("Was ist die CPU?", ["Der Prozessor, der rechnet", "Der Arbeitsspeicher", "Die Festplatte", "Der Bildschirm"], "Der Prozessor, der rechnet"),
 A("Was ist RAM?", ["Arbeitsspeicher (flüchtig)", "Dauerhafter Speicher", "Netzwerkkabel", "Ein Programm"], "Arbeitsspeicher (flüchtig)"),
 A("Was ist ein Algorithmus?", ["Eine eindeutige Schritt-für-Schritt-Anleitung", "Ein Computervirus", "Ein Speicher", "Eine Programmiersprache"], "Eine eindeutige Schritt-für-Schritt-Anleitung"),
 A("Wofür steht „www“?", ["World Wide Web", "World Wide Windows", "Web Without Wires", "Wide Web World"], "World Wide Web"),
 A("Was macht eine IP-Adresse?", ["Identifiziert ein Gerät im Netzwerk", "Speichert Passwörter", "Schützt vor Viren", "Macht Fotos kleiner"], "Identifiziert ein Gerät im Netzwerk"),
 A("Was ergibt in Python: print(3 * 4)?", ["12", "34", "7", "3*4"], "12"),
 M("1 Kilobyte sind wie viele Byte (Dezimal-Präfix)?", "1000"),
], "if", [W("Binärzahlen", "Nur 0 und 1", ["Jede Stelle hat einen doppelt so großen Wert wie die rechts davon: 1, 2, 4, 8, 16 …"], ["Stellenwerte unter die Ziffern schreiben", "Wo eine 1 steht, den Wert addieren"], "1 0 1 1\n8 4 2 1\n= 8 + 2 + 1 = 11", None, "Binärsystem umrechnen einfach erklärt")])
platz("elias", "geschichte", "Geschichte", [
 A("Wann endete das Weströmische Reich?", ["476 n. Chr.", "753 v. Chr.", "1492", "800 n. Chr."], "476 n. Chr."),
 A("Wer wurde im Jahr 800 zum Kaiser gekrönt?", ["Karl der Große", "Julius Caesar", "Maria Theresia", "Napoleon"], "Karl der Große"),
 A("Was ist eine Quelle in Geschichte?", ["Alles, woraus wir etwas über die Vergangenheit erfahren", "Ein Fluss", "Nur ein Schulbuch", "Eine Erfindung"], "Alles, woraus wir etwas über die Vergangenheit erfahren"),
 A("Welche Staatsform hatte Athen im 5. Jh. v. Chr.?", ["Demokratie", "Monarchie", "Diktatur", "Theokratie"], "Demokratie"),
 A("Was war die „Neolithische Revolution“?", ["Übergang zu Ackerbau und Sesshaftigkeit", "Ein Krieg", "Die Französische Revolution", "Erfindung des Buchdrucks"], "Übergang zu Ackerbau und Sesshaftigkeit"),
 A("Welches Volk baute die Pyramiden von Gizeh?", ["Ägypter", "Römer", "Griechen", "Maya"], "Ägypter"),
 A("Was ist der Unterschied Primärquelle / Sekundärquelle?", ["Primär stammt aus der Zeit selbst, sekundär ist später darüber geschrieben", "Es gibt keinen", "Primär ist wichtiger", "Sekundär ist älter"], "Primär stammt aus der Zeit selbst, sekundär ist später darüber geschrieben"),
], "gs")
platz("elias", "dg", "Darstellende Geometrie", [
 A("Was zeigt der Grundriss?", ["Die Ansicht von oben", "Die Ansicht von vorne", "Die Ansicht von links", "Ein Schrägbild"], "Die Ansicht von oben"),
 A("Was zeigt der Aufriss?", ["Die Ansicht von vorne", "Die Ansicht von oben", "Die Ansicht von hinten", "Den Querschnitt"], "Die Ansicht von vorne"),
 A("Wie viele Kanten hat ein Würfel?", ["12", "8", "6", "24"], "12"),
 A("Wie viele Ecken hat ein Würfel?", ["8", "6", "12", "4"], "8"),
 A("Welcher Körper hat genau eine Spitze und eine Kreis-Grundfläche?", ["Kegel", "Zylinder", "Pyramide", "Kugel"], "Kegel"),
 A("Bei der Normalprojektion treffen die Projektionsstrahlen …", ["rechtwinklig auf die Bildebene", "schräg auf die Bildebene", "in einem Punkt zusammen", "nie auf die Bildebene"], "rechtwinklig auf die Bildebene"),
], "dg")
platz("elias", "musik", "Musik", [
 A("Welches Intervall hat 3 Halbtöne (z. B. c–es)?", ["kleine Terz", "große Terz", "Quarte", "Sekunde"], "kleine Terz"),
 A("Aus welchen Tönen besteht der C-Dur-Dreiklang?", ["c – e – g", "c – es – g", "c – f – a", "c – d – e"], "c – e – g"),
 A("Wie viele Vorzeichen hat G-Dur?", ["1 Kreuz (fis)", "1 b", "keine", "2 Kreuze"], "1 Kreuz (fis)"),
 A("In welche Epoche gehört Mozart?", ["Klassik", "Barock", "Romantik", "Moderne"], "Klassik"),
 A("In welche Epoche gehört Johann Sebastian Bach?", ["Barock", "Klassik", "Romantik", "Renaissance"], "Barock"),
 A("Was bedeutet „Crescendo“?", ["lauter werdend", "leiser werdend", "schneller werdend", "kurz gespielt"], "lauter werdend"),
 A("Welcher Takt hat 3 Viertel pro Takt?", ["3/4-Takt (z. B. Walzer)", "4/4-Takt", "2/4-Takt", "6/8-Takt"], "3/4-Takt (z. B. Walzer)"),
], "mu")
platz("elias", "kunst", "Bildnerische Erziehung", [
 A("Was ist ein Fluchtpunkt?", ["Punkt, in dem parallele Linien in der Perspektive zusammenlaufen", "Der hellste Punkt im Bild", "Der Bildrand", "Ein Farbfleck"], "Punkt, in dem parallele Linien in der Perspektive zusammenlaufen"),
 A("Was ist die Komplementärfarbe zu Blau?", ["Orange", "Grün", "Rot", "Violett"], "Orange"),
 A("Welche Kunstrichtung prägte Gustav Klimt?", ["Jugendstil / Wiener Secession", "Barock", "Pop Art", "Impressionismus"], "Jugendstil / Wiener Secession"),
 A("Wer gehört zur Pop Art?", ["Andy Warhol", "Rembrandt", "Albrecht Dürer", "Michelangelo"], "Andy Warhol"),
 A("Was bedeutet „Goldener Schnitt“?", ["Ein als harmonisch empfundenes Teilungsverhältnis (ca. 1 : 1,618)", "Ein Rahmen aus Gold", "Ein Schnitt mit der Schere", "Eine Farbe"], "Ein als harmonisch empfundenes Teilungsverhältnis (ca. 1 : 1,618)"),
], "ku")

# ---- Elias Oberstufen-Platzhalter für Mathe, Bio, Deutsch, Geo (ersetzen die Unterstufen-Fragen) ----
platz("elias", "mathe", "Mathe", [
 A("Zu welcher Zahlenmenge gehört √2?", ["irrationale Zahlen", "natürliche Zahlen", "ganze Zahlen", "rationale Zahlen"], "irrationale Zahlen"),
 M("Löse: 3x − 7 = 11. x =", "6"), M("Löse: 2(x + 4) = 18. x =", "5"),
 M("Berechne 2³ · 2⁴ als Potenz von 2. Exponent =", "7", "Gleiche Basis: Exponenten addieren."),
 M("(a²)³ = a^? → Exponent =", "6", "Potenz einer Potenz: Exponenten multiplizieren."),
 M("Steigung k der Geraden durch (0|1) und (2|5)?", "2", "k = (5 − 1) / (2 − 0)"),
 M("f(x) = 3x − 2. f(4) =", "10"),
 A("Was beschreibt der Parameter d in f(x) = kx + d?", ["Schnittpunkt mit der y-Achse", "Steigung", "Nullstelle", "Krümmung"], "Schnittpunkt mit der y-Achse"),
 M("Gleichungssystem: x + y = 10, x − y = 4. x =", "7"),
 M("Ein Preis von 80 € wird um 15 % erhöht. Neuer Preis in €?", "92"),
 M("(a + b)² für a = 3, b = 2 =", "25"),
], "ma", [W("Lineare Funktion f(x) = kx + d", "Steigung und Achsenabschnitt", None, ["d ablesen: wo schneidet die Gerade die y-Achse?", "k = Δy / Δx aus zwei Punkten", "Funktionsgleichung aufschreiben"], "P(0|1), Q(2|5)\nk = (5−1)/(2−0) = 2\nd = 1\nf(x) = 2x + 1", "k > 0: steigend, k < 0: fallend.", "lineare Funktion k und d bestimmen")])
platz("elias", "biologie", "Biologie", [
 A("Welches Zellorganell ist das „Kraftwerk“ der Zelle?", ["Mitochondrium", "Zellkern", "Ribosom", "Vakuole"], "Mitochondrium"),
 A("Was haben Pflanzenzellen, Tierzellen aber nicht?", ["Zellwand und Chloroplasten", "Zellkern", "Zellmembran", "Mitochondrien"], "Zellwand und Chloroplasten"),
 A("Wo liegt die Erbinformation (DNA) hauptsächlich?", ["im Zellkern", "in der Zellwand", "in der Vakuole", "im Zytoplasma"], "im Zellkern"),
 A("Was sind Prokaryoten?", ["Lebewesen ohne Zellkern (z. B. Bakterien)", "Pflanzen", "Pilze", "Tiere mit Wirbelsäule"], "Lebewesen ohne Zellkern (z. B. Bakterien)"),
 A("Welche Formel beschreibt die Fotosynthese grob?", ["CO₂ + H₂O + Licht → Glucose + O₂", "O₂ + Glucose → CO₂ + H₂O", "H₂O → H₂ + O₂", "CO₂ → C + O₂"], "CO₂ + H₂O + Licht → Glucose + O₂"),
 A("Was ist ein Ökosystem?", ["Lebensraum + Lebensgemeinschaft", "Nur die Pflanzen", "Eine Zelle", "Ein Organ"], "Lebensraum + Lebensgemeinschaft"),
 A("Wie heißen Lebewesen, die organische Stoffe selbst herstellen?", ["Produzenten", "Konsumenten", "Destruenten", "Parasiten"], "Produzenten"),
 A("Was macht ein Lichtmikroskop sichtbar?", ["z. B. Zellen und Zellkern", "einzelne Atome", "Viren im Detail", "Elektronen"], "z. B. Zellen und Zellkern"),
], "bi")
platz("elias", "deutsch", "Deutsch", [
 A("Was ist eine Metapher?", ["Ein bildlicher Ausdruck ohne „wie“ (z. B. „Das Leben ist eine Reise“)", "Ein Vergleich mit „wie“", "Eine Übertreibung", "Eine Wiederholung"], "Ein bildlicher Ausdruck ohne „wie“ (z. B. „Das Leben ist eine Reise“)"),
 A("„Er ist stark wie ein Bär.“ Welches Stilmittel?", ["Vergleich", "Metapher", "Alliteration", "Personifikation"], "Vergleich"),
 A("„Die Sonne lacht.“ Welches Stilmittel?", ["Personifikation", "Vergleich", "Ironie", "Anapher"], "Personifikation"),
 A("Welche Textsorte wägt Argumente ab und kommt zu einem Schluss?", ["Erörterung", "Bericht", "Inhaltsangabe", "Gedicht"], "Erörterung"),
 A("In welcher Zeit schreibt man eine Inhaltsangabe?", ["Präsens", "Präteritum", "Futur", "Plusquamperfekt"], "Präsens"),
 L("Er sagte, er ___ krank. (sein, Konjunktiv I)", ["sei"], "Indirekte Rede: Konjunktiv I – er sei."),
 A("Wo fehlt das Komma? „Ich glaube dass er kommt.“", ["vor „dass“", "nach „Ich“", "nach „er“", "kein Komma"], "vor „dass“"),
 A("Was ist ein Kommentar (Textsorte)?", ["Ein meinungsbetonter Zeitungstext", "Ein neutraler Bericht", "Eine Kurzgeschichte", "Ein Lexikonartikel"], "Ein meinungsbetonter Zeitungstext"),
], "de", deutsch_wissen + [W("Stilmittel erkennen", "Metapher, Vergleich, Personifikation …", None, ["Vergleich: mit „wie“ oder „als“", "Metapher: Bild ohne „wie“", "Personifikation: Dinge handeln wie Menschen", "Alliteration: gleicher Anfangslaut (Milch macht müde Männer munter)", "Anapher: gleicher Satzanfang wird wiederholt"], None, "Bei der Analyse immer: Stilmittel nennen + Beispiel zitieren + Wirkung erklären.", "Stilmittel Deutsch Oberstufe erklärt")])
platz("elias", "geografie", "Geografie und wirtschaftliche Bildung", [
 A("Was zeigt eine Bevölkerungspyramide?", ["Alters- und Geschlechtsaufbau einer Bevölkerung", "Höhe der Berge", "Wirtschaftsleistung", "Klimazonen"], "Alters- und Geschlechtsaufbau einer Bevölkerung"),
 A("Zu welchem Wirtschaftssektor gehört die Landwirtschaft?", ["primärer Sektor", "sekundärer Sektor", "tertiärer Sektor"], "primärer Sektor"),
 A("Zu welchem Sektor gehört eine Bank?", ["tertiärer Sektor (Dienstleistungen)", "primärer Sektor", "sekundärer Sektor"], "tertiärer Sektor (Dienstleistungen)"),
 A("Was misst das BIP?", ["Wert aller Waren und Dienstleistungen eines Landes in einem Jahr", "Anzahl der Einwohner", "Fläche eines Landes", "Höhe der Steuern"], "Wert aller Waren und Dienstleistungen eines Landes in einem Jahr"),
 A("Wodurch entstehen Erdbeben meistens?", ["Bewegung der Erdplatten", "Starken Regen", "Wind", "Mondphasen"], "Bewegung der Erdplatten"),
 A("Welche Klimazone hat ganzjährig hohe Temperaturen und viel Regen?", ["Tropen", "Subtropen", "gemäßigte Zone", "Polarzone"], "Tropen"),
 A("Was bedeutet Urbanisierung?", ["Verstädterung", "Abwanderung aufs Land", "Waldrodung", "Globalisierung"], "Verstädterung"),
], "ge", geo_wissen)
print("weitere Fächer fertig")
