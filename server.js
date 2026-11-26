// Interaktív karácsonyfa – kis relay szerver
// Telefon (/#telefon) -> szerver -> kijelző (/#kijelzo)
const express = require('express');
const http = require('http');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const QRCode = require('qrcode');

const PORT = process.env.PORT || 3000;
const MAX = 45;                 // egyszerre ennyi dísz lehet a fán
const COOLDOWN_MS = 3000;       // egy telefonról max. 3 mp-enként egy dísz
const FILE = path.join(__dirname, 'ornaments.json');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { maxHttpBufferSize: 1e6 });

app.use(express.static(path.join(__dirname, 'public')));

function lanIP() {
  for (const list of Object.values(os.networkInterfaces()))
    for (const a of list || []) if (a.family === 'IPv4' && !a.internal) return a.address;
  return 'localhost';
}
// Render.com automatikusan megadja a RENDER_EXTERNAL_URL-t, így nincs mit beállítani
const publicURL = () => process.env.PUBLIC_URL || process.env.RENDER_EXTERNAL_URL || `http://${lanIP()}:${PORT}`;
// A kijelző innen tudja, mire mutasson a QR-kód
app.get('/config', (req, res) => {
  res.json({ url: publicURL() });
});

// QR-kód SVG-ként (internet nélkül is működik)
app.get('/qr.svg', async (req, res) => {
  const u = String(req.query.u || '').slice(0, 300);
  if (!/^https?:\/\//.test(u)) return res.status(400).end();
  const svg = await QRCode.toString(u, { type: 'svg', margin: 1, color: { dark: '#0b1f15', light: '#f3e6c8' } });
  res.type('image/svg+xml').send(svg);
});

let list = [];
try { list = JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (e) {}
let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => fs.writeFile(FILE, JSON.stringify(list), () => {}), 1000);
}

io.on('connection', (socket) => {
  socket.emit('history', list);
  let last = 0;
  socket.on('ornament', (m, ack) => {
    const now = Date.now();
    const ok = m && typeof m.img === 'string'
      && m.img.startsWith('data:image/png;base64,')
      && m.img.length < 400000
      && now - last > COOLDOWN_MS;
    if (!ok) { if (typeof ack === 'function') ack({ ok: false }); return; }
    last = now;
    const o = { id: now.toString(36) + Math.random().toString(36).slice(2, 6), img: m.img };
    list.push(o);
    if (list.length > MAX) list.shift();
    save();
    io.emit('ornament', o);
    if (typeof ack === 'function') ack({ ok: true });
  });
});

server.listen(PORT, () => {
  const base = publicURL();
  console.log(`\n  Kijelző (projektor):  ${base}/#kijelzo`);
  console.log(`  Telefon (QR-kód):     ${base}/#telefon\n`);
});
