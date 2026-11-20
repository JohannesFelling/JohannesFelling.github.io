#!/usr/bin/env python3
"""Aufsatzkorrektur-Helfer für die Lern-App (läuft im Claude-Projekt).

  python3 korrektur.py holen <ordner>          → offene Aufsätze als <id>.jpg + <id>.json in <ordner>
  python3 korrektur.py zurueck <id> <datei>    → Korrektur (JSON) in die App schreiben, Status "korrigiert"

Anmeldung als korrektur@johannesfelling.at; Passwort aus der Umgebungsvariable LERNAPP_KORREKTUR_PASSWORT.
Korrektur-JSON: {lesbar, originaltext, korrigierter_text, fehler:[{original,korrektur,art,erklaerung}], lob, tipps:[...], einschaetzung}
"""
import base64, datetime, json, os, sys, urllib.request

API_KEY = "AIzaSyBA-fsdUjsL47WNf9Y-YaDVDen9D0ZZK8M"  # öffentlicher Web-Schlüssel aus firebase-config.js
PROJEKT = "lernheld-e261d"
DOCS = f"https://firestore.googleapis.com/v1/projects/{PROJEKT}/databases/(default)/documents"

def anfrage(url, daten=None, methode=None, token=None):
    req = urllib.request.Request(url, data=json.dumps(daten).encode() if daten is not None else None, method=methode)
    req.add_header("Content-Type", "application/json")
    if token: req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read() or b"{}")

def anmelden():
    pw = os.environ.get("LERNAPP_KORREKTUR_PASSWORT")
    if not pw: sys.exit("FEHLT: Umgebungsvariable LERNAPP_KORREKTUR_PASSWORT ist nicht gesetzt.")
    r = anfrage(f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}",
                {"email": "korrektur@johannesfelling.at", "password": pw, "returnSecureToken": True})
    return r["idToken"]

def von_fs(v):
    if "stringValue" in v: return v["stringValue"]
    if "booleanValue" in v: return v["booleanValue"]
    if "integerValue" in v: return int(v["integerValue"])
    if "doubleValue" in v: return v["doubleValue"]
    if "nullValue" in v: return None
    if "timestampValue" in v: return v["timestampValue"]
    if "arrayValue" in v: return [von_fs(x) for x in v["arrayValue"].get("values", [])]
    if "mapValue" in v: return {k: von_fs(x) for k, x in v["mapValue"].get("fields", {}).items()}
    return None

def zu_fs(x):
    if x is None: return {"nullValue": None}
    if isinstance(x, bool): return {"booleanValue": x}
    if isinstance(x, int): return {"integerValue": str(x)}
    if isinstance(x, float): return {"doubleValue": x}
    if isinstance(x, str): return {"stringValue": x}
    if isinstance(x, list): return {"arrayValue": {"values": [zu_fs(y) for y in x]}}
    if isinstance(x, dict): return {"mapValue": {"fields": {k: zu_fs(v) for k, v in x.items()}}}
    return {"stringValue": str(x)}

def holen(ordner):
    token = anmelden()
    os.makedirs(ordner, exist_ok=True)
    q = {"structuredQuery": {"from": [{"collectionId": "aufsaetze"}],
         "where": {"fieldFilter": {"field": {"fieldPath": "status"}, "op": "EQUAL", "value": {"stringValue": "offen"}}}}}
    res = anfrage(f"{DOCS}:runQuery", q, "POST", token)
    n = 0
    for zeile in res:
        d = zeile.get("document")
        if not d: continue
        id_ = d["name"].split("/")[-1]
        f = {k: von_fs(v) for k, v in d.get("fields", {}).items()}
        with open(os.path.join(ordner, f"{id_}.jpg"), "wb") as fh: fh.write(base64.b64decode(f.pop("bild", "")))
        with open(os.path.join(ordner, f"{id_}.json"), "w") as fh: json.dump(f, fh, ensure_ascii=False, indent=1)
        print(f"{id_}\t{f.get('kind')}\t{f.get('fach') or 'deutsch'}\t{f.get('datum')}\t{f.get('aufgabe') or '-'}")
        n += 1
    print(f"{n} offene Aufsätze")

def zurueck(id_, datei):
    k = json.load(open(datei))
    for feld in ["lesbar", "originaltext", "korrigierter_text", "fehler", "lob", "tipps", "einschaetzung"]:
        if feld not in k: sys.exit(f"Feld fehlt: {feld}")
    token = anmelden()
    felder = {"status": zu_fs("korrigiert"), "korrektur": zu_fs(k),
              "korrigiert_am": zu_fs(datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))}
    maske = "&".join(f"updateMask.fieldPaths={x}" for x in felder)
    anfrage(f"{DOCS}/aufsaetze/{id_}?{maske}", {"fields": felder}, "PATCH", token)
    print(f"{id_}: Korrektur gespeichert")

if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "holen": holen(sys.argv[2])
    elif len(sys.argv) >= 4 and sys.argv[1] == "zurueck": zurueck(sys.argv[2], sys.argv[3])
    else: print(__doc__)
