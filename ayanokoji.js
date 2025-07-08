/* Hady Zen'in */
/* dibuat oleh Hady with love - Copyright HadyZenin 2025 */

const express = require('express');
const app = express();
const login = require('hadyzen-fca');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cron = require('node-cron');
const moment = require('moment-timezone');
const { spawn } = require('child_process');
const gradient = require('gradient-string');
const akun = fs.readFileSync('hady.txt', 'utf8');
const { logo, warna, font } = require('./hady-zen/hady');
const { nama, port, chatdm, aikey, setting, zonawaktu } = require('./kiyotaka');
const now = moment.tz(zonawaktu);
const waktu = now.format('HH:mm:ss');
const tanggal = now.format('YYYY-MM-DD');
const web = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
const kiyopon = gradient("#ADD8E6", "#4682B4", "#00008B")(logo.kiyopon);

process.on('unhandledRejection', error => console.log(logo.error + error));
process.on('uncaughtException', error => console.log(logo.error + error));

function gotoubun() {
  try {
  const futaro = fs.readFileSync('kiyopon.json', 'utf-8');
  return JSON.parse(futaro);
} catch (e) {
  return {};
 }
};
function cote(arisu) {
  fs.writeFileSync('kiyopon.json', JSON.stringify(arisu, null, 2), 'utf-8');
};
async function gambar(hadi, isekai) {
  try {
  const kiyotaka = await axios.get(hadi, { responseType: 'arraybuffer' });
  const otaku = Buffer.from(kiyotaka.data, 'binary');
  const wibu = path.join(__dirname, 'hady-zen', 'otaku', isekai);
  fs.writeFileSync(wibu, otaku);
  return wibu;
} catch (error) {
  throw error;
 }
};

console.log(kiyopon);
  if (!akun || akun.length < 0 || !JSON.parse(akun)) {
console.log(logo.error + 'Kamu belum memasukkan cookie.');
}
login({ appState: JSON.parse(akun) }, setting, (err, api) => {
  if (err) {
console.log(logo.error + `Terjadi kesalahan saat login: ${err.message || err.error}`);
}
  
api.listenMqtt((err, event) => {
  if (err) {
console.log(logo.error + `${err.message || err.error}`);
process.exit();
}
const hadi = Object.keys(event.mentions);
const hady = api.getCurrentUserID();
const { data } = axios.get(`${web}/kiyopon?id=${event.senderID}&chat=${encodeURIComponent(event.body)}`);

  if (hadi == hady) {
app.lisapi.sendMessage(data.kiyopon, event.messageID, event.threadID);
}
 });
});

app.listen(port, () => {});
app.use(express.static(path.join(__dirname, 'hady-zen')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'hady-zen', 'ayanokoji', 'ayanokoji.html'));
});

app.get('/kiyopon', async (req, res) => {
  const kanokari = req.query.id || '4';
  const higehiro = req.query.chat || 'hai';
  const hyouka = gotoubun();
  
  if (!hyouka[kanokari]) hyouka[kanokari] = [];
  hyouka[kanokari].push({ role: 'user', content: higehiro });
  const messages = hyouka[kanokari].map(m => ({ role: m.role, parts: [{ text: m.content }] }));

  const dandadan = { contents: messages };

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${aikey}`,
      dandadan,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const otaku = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada jawaban.';
    hyouka[kanokari].push({ role: 'model', content: otaku });

    if (hyouka[kanokari].length > 10) {
      hyouka[kanokari] = hyouka[kanokari].slice(hyouka[kanokari].length - 10);
    }

    cote(hyouka);

    res.json({ buatan: "Hady Zen'in", kiyopon: otaku });
  } catch (error) {
    res.json({ error: 'Maaf ada kesalahan: ' + error.message });
  }
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'hady-zen', 'ayanokoji', 'kiyotaka.html'));
});
