# Interaktív karácsonyfa

A közönség beolvassa a QR-kódot, a telefonján kiválaszt egy díszt, kiszínezi vagy rárajzol, majd felküldi a fára. A dísz megjelenik a vetített fán. Bejelentkezés nem kell.

## Közzététel ingyen (Render.com), kb. 10 perc

**1. GitHub (ingyenes)**
1. Regisztrálj a github.com oldalon.
2. Jobb felül kattints a **+** gombra, majd a **New repository** pontra. Név: `karacsonyfa`, láthatóság: **Public**, végül **Create repository**.
3. Kattints az **uploading an existing file** linkre, és húzd be a mappa **tartalmát**: `server.js`, `package.json`, `render.yaml`, `.gitignore`, `README.md` és a `public` mappa. A `node_modules` mappát ne töltsd fel. Végül **Commit changes**.

**2. Render (ingyenes)**
1. Regisztrálj a render.com oldalon a GitHub-fiókoddal.
2. Válaszd a **New**, majd a **Blueprint** lehetőséget, jelöld ki a `karacsonyfa` repót, és kattints az **Apply** gombra.
3. Pár perc múlva kész a cím, például: `https://karacsonyfa.onrender.com`

**3. Használat**
- A projektor gépén nyisd meg: `https://karacsonyfa.onrender.com/#kijelzo`. A QR-kód automatikusan a jó címre mutat.
- Nyomd meg az **F** billentyűt a teljes képernyőhöz. Ha valódi fára vetítesz, a **T** billentyűvel kapcsold ki a rajzolt fát.

**Az ingyenes csomag korlátai**
- Ha 15 percig senki sem használja, a szerver elalszik, és az első megnyitás kb. 1 percig tart. Esemény előtt nyisd meg a kijelzőt, utána ébren marad, amíg nyitva van.
- Ha a szerver újraindul, a fán lévő díszek eltűnnek.

## Oldalak
- `/#kijelzo`: a projektor kimenete (fa, díszek, QR-kód)
- `/#telefon`: a díszkészítő (ide visz a QR-kód)
- `/`: demó; telefonon automatikusan a díszkészítő jelenik meg

A kijelzőn használható billentyűk: **T** a fa ki/be, **Q** a QR-kód ki/be, **F** teljes képernyő.

## Helyi futtatás (Wi-Fin, internet nélkül)
```
npm install
npm start
```
Ilyenkor a QR-kód a gép helyi IP-címére mutat, és csak az ugyanarra a Wi-Fire csatlakozott telefonok érik el.

## Beállítások (server.js)
- `MAX = 45`: egyszerre legfeljebb ennyi dísz van a fán
- `COOLDOWN_MS = 3000`: egy telefonról legfeljebb 3 másodpercenként küldhető egy dísz
