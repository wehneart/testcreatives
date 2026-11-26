# Decorate the Tree – interaktív karácsonyfa

A közönség beolvassa a QR-kódot, a telefonján kiválaszt egy díszt, kiszínezi, rárajzol vagy arany/ezüst/színes csillámport szór rá, majd felküldi a fára. A dísz azonnal megjelenik a kivetített fán. A közönségnek nem kell bejelentkeznie. A felület angol nyelvű.

## Oldalak
| Cím | Mire való |
|---|---|
| `/#display` | **Kivetítő (admin, jelszóval):** teljes képernyős, élő fa, QR-kód, moderálás |
| `/#make` | Díszkészítő telefonra (ide visz a QR-kód) |
| `/#tree` | Nyilvános, csak nézhető fa (pl. telefonon) |
| `/` | Demó; telefonon automatikusan a díszkészítő jelenik meg |

## Kivetítés
1. A projektorhoz kötött gépen nyisd meg a `/#display` oldalt, és add meg az admin jelszót. A böngésző megjegyzi.
2. Az eszköztár akkor jelenik meg, ha megmozdítod az egeret, és 3 mp múlva magától eltűnik, az egérmutatóval együtt:
   - **Fullscreen (F):** teljes képernyő
   - **Tree (T):** a rajzolt fa ki/be. Valódi fára vetítéskor kapcsold ki, ilyenkor fekete háttéren csak a díszek látszanak.
   - **QR (Q):** a QR-kód ki/be
   - **Remove mode (R):** ilyenkor egy díszre kattintva törlöd azt (moderálás)
   - **Classic / 3D / Neon (1, 2, 3):** a fa típusa. *Classic:* elmosott, fénylő fa. *3D:* lassan körbeforgó fa, a díszek is körbejárnak vele. *Neon:* lila-rózsaszín, Blade Runner hangulat esővel. A váltás minden kijelzőn egyszerre történik.
   - **Edit title:** a „Merry Christmas” felirat átírása (pl. „Feliz Navidad”). Minden kijelzőn és telefonon azonnal frissül.
   - **Clear all:** az egész fa törlése (kétszer kell rákattintani)

**TouchDesigner / Syphon / Spout:** a TD **Web Render TOP**-jába írd be a `/#display` címet. Ott kattints bele egyszer, és add meg a jelszót. Ezután a kép TD textúra lesz: mappelheted (Kantan / stoner), effektezheted, vagy Syphon Spout Out TOP-pal továbbküldheted (például Resolume vagy MadMapper felé).

## Közzététel ingyen (Render.com)
1. Lépj be a render.com oldalra a GitHub-fiókoddal.
2. Válaszd a **New** → **Blueprint** lehetőséget, és jelöld ki ezt a repót.
3. A kivetítő jelszava alapból **12345**. Ha meg akarod változtatni, a Renderen: Environment → `ADMIN_KEY`.
4. Kattints az **Apply** gombra. Pár perc múlva kész a cím, például `https://karacsonyfa.onrender.com`

Az ingyenes csomag korlátai: 15 perc tétlenség után a szerver elalszik, és az első megnyitás kb. 1 percig tart. Ha a kivetítő oldal nyitva van, a szerver ébren marad. Újraindításkor a fán lévő díszek eltűnnek.

## Helyi futtatás (Wi-Fin, internet nélkül)
```
npm install
npm start
```
A terminál kiírja a címeket és az admin jelszót (alapból `12345`). Ilyenkor csak az ugyanarra a Wi-Fire csatlakozott telefonok érik el az oldalt.

## Beállítások (server.js)
- `MAX = 45`: egyszerre legfeljebb ennyi dísz van a fán
- `COOLDOWN_MS = 3000`: egy telefonról legfeljebb 3 másodpercenként küldhető egy dísz
