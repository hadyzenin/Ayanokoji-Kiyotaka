/* Hady Zen'in */
/* dibuat oleh Hady with love - Copyright HadyZenin 2025 */

 const express = require('express');
 const app = express();
 const { logo, ayanokoji } = require('./hady-zen/log');
 const fs = require('fs');
 const path = require('path');
 const login = require('hadyzen-fca');
 const { clear, getStream, fbid, DyAI } = require('./hady-zen/func');
 const akun = fs.readFileSync('akun.txt', 'utf8');
 const { version } = require('./package');
 const gradient = require('gradient-string');
 const { awalan, nama, admin, maintain, chatdm, imgbbkey, setting, zonawaktu } = require('./kiyotaka');
 
 const { kuldown } = require('./hady-zen/kuldown');
 const moment = require('moment-timezone');
 const now = moment.tz(zonawaktu);

const kiyopon = gradient("#ADD8E6", "#4682B4", "#00008B")(logo.ayanokoji);
const tanggal = now.format('YYYY-MM-DD');
const waktu = now.format('HH:mm:ss');
global.Ayanokoji = { awalan: awalan, nama: nama, admin: admin, logo: logo, imgbbkey: imgbbkey, maintain: maintain, waktu: waktu, tanggal: tanggal };

//DATA AYANOKOJI 
let data = {};
if (fs.existsSync(path.join('hady-zen', 'kiyopon.db'))) {
    data = JSON.parse(fs.readFileSync(path.join('hady-zen', 'kiyopon.db'), 'utf-8'));
}

function addData(id) {
    if (data[id]) {
    } else {
        data[id] = { "nama": "Kiyopon", "yen": 0, "exp": 0, "level": 1, "chat": 0, "pp": "", "bg": "", "title": "Dark Sistem", "flag": "id", "daily": null };
        console.log(ayanokoji('database') + `${id} pengguna baru.`);
    }
    simpan();
};

function setUser(id, item, value) {
  if (!data[id]) return;
  const stringItem = ["nama", "pp", "bg", "title", "flag", "daily"];
  const numberItem = ["yen", "exp", "level", "chat"];
  if (stringItem.includes(item)) {
    data[id][item] = value;
  } else if (numberItem.includes(item)) {
    if (typeof value !== "number") {
      return console.log(
        ayanokoji("database") + `${item} harus berupa angka.`
      );
    }
    data[id][item] = value;
  } else {
    return console.log(
      ayanokoji("database") + `Item "${item}" tidak ditemukan.`
    );
  }
  simpan();
  console.log(
    ayanokoji("database") + `${item} berhasil diperbarui.`
  );
}

function getData(id) {
  return data[id] || data;
};

function simpan() {
    fs.writeFile(path.join('hady-zen', 'kiyopon.db'), JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.log(logo.error + "Terjadi kesalahan pada db: ", err);
        } else { }
 });
};

//LOG AYANOKOJI 
clear();
console.log(kiyopon);
console.log(logo.info + `Versi ${version}`);
console.log(logo.info + `Awalan ${awalan}`);
console.log(logo.info + `Admin ${admin}`);
fs.readdir('./perintah', (err, files) => { 
 const shadow = files.map(file => path.parse(file).name);
console.log(ayanokoji('perintah') + `${shadow}.`);
});

//LOGIN AYANOKOJI 
if (!akun || akun.trim().length === 0) {
 console.log(logo.error + 'Kamu belum memasukkan cookie.');
}
login({
  appState: JSON.parse(akun)
}, setting, (err, api) => {
if (err) { 
  console.log(logo.error + `Terjadi kesalahan saat login: ${err.message || err.error}`);
 }  
   api.listenMqtt((err, event) => {
  if (err) {
    console.log(logo.error + (err.message || err.error)); return;
  }
  if (!event) return;
  if (event.type !== "message" && event.type !== "message_reply") return;
  if (!event.body) return;
  const body = event.body;

// YEN AND LV UP
  addData(event.senderID);
data[event.senderID].chat++;

if (data[event.senderID].chat % 10 === 0) {
  data[event.senderID].yen += 3;
  data[event.senderID].exp += 10;
  console.log(
    ayanokoji("yen") +
    `${data[event.senderID].nama} mendapatkan 3 Yen dan 10 Exp.`
  );
}
  if (data[event.senderID].exp >= 100) {
    data[event.senderID].exp -= 100;
    data[event.senderID].level += 1;
    api.sendMessage(
      `Selamat ${data[event.senderID].nama}, Kamu telah naik ke level ${data[event.senderID].level}!`,
      event.threadID
    );
console.log(ayanokoji('level') + `${data[event.senderID].nama} naik level.`);
  }
  simpan();


//ONCHAT AYANOKOJI 
if (global.Ayanokoji.maintain === true && !admin.includes(event.senderID) || chatdm === false && event.isGroup == false && !admin.includes(event.senderID)) return; 
  addData(event.senderID);
if (body.toLowerCase() == "prefix") return api.sendMessage(`Awalan ${nama} adalah: ${awalan}`, event.threadID, event.messageID);
if (body.toLowerCase().startsWith(nama)) {
   const ijo = body.slice(5) || " hai";
   const harmonie = "Prompt: Namamu adalah Kiyopon, respon kamu harus ramah, modern, gaul, suka becanda, dan singkat. User: " + ijo;  
   DyAI(harmonie).then(jawaban => {
    return api.sendMessage(jawaban, event.threadID, event.messageID);
  }).catch(e => {
    console.log(e);
    return api.sendMessage("Error: " + e, event.threadID, event.messageID);
  });
 };
if (!body.startsWith(awalan)) return console.log(logo.chat + `${event.senderID}: ${body}`);
   const cmd = body.slice(awalan.length).trim().split(/ +/g).shift().toLowerCase();
   
//CMDS AYANOKOJI 
  async function hady_cmd(cmd, api, event) {
  const pipi = body?.replace(`${awalan}${cmd}`, "").trim();
  const args = pipi?.split(" ");
  const { saran } = require('./hady-zen/saran');

  try {
    const skibidi = await new Promise((resolve, reject) => {
      api.getThreadInfo(event.threadID, (err, info) => err ? reject(err) : resolve(info));
    });

    const fitri = skibidi.adminIDs.map(v => v.id);
    const files = fs.readdirSync(path.join(__dirname, "perintah"));
    const listCmd = [];
    let ditemukan = false;

    for (const file of files) {
      if (!file.endsWith(".js")) continue;

      const { hady, Ayanokoji } = require(path.join(__dirname, "perintah", file));

      if (hady?.nama) listCmd.push(hady.nama);
      if (!hady || hady.nama !== cmd || typeof Ayanokoji !== "function") continue;

      ditemukan = true;

      console.log(logo.info + `Menjalankan perintah ${hady.nama}.`);

      if (kuldown(event.senderID, hady.nama, hady.kuldown) !== "hadi") {
        return api.sendMessage("Sabar dong :v", event.threadID, event.messageID);
      }

      if (!hady.peran || hady.peran == 0) {
        return await Ayanokoji({ api, event, args, getStream, setUser, getData, fbid });
      }

      if (hady.peran == 2 && admin.includes(event.senderID)) {
        return await Ayanokoji({ api, event, args, getStream, setUser, getData, fbid });
      }

      if (hady.peran == 1 && fitri.includes(event.senderID)) {
        return await Ayanokoji({ api, event, args, getStream, setUser, getData, fbid });
      }

      return api.setMessageReaction("🚫", event.messageID);
    }

    if (!ditemukan) {
  const mirip = saran(cmd, listCmd);
  console.log(logo.info + `Tidak ada perintah ${cmd}.`);

  return api.sendMessage(
    mirip
      ? `Mungkin maksud kamu ${awalan}${mirip}?`
      : `Perintah '${cmd}' tidak ada, gunakan ${awalan}menu buat lihat daftar perintah.`,
    event.threadID,
    event.messageID
  );
}
  } catch (error) {
    console.log(logo.error + "Perintah error: " + error.message);
  }
}
 hady_cmd(cmd, api, event);
 });
});

//WEBVIEW AYANOKOJI 
app.get('/', (req, res) => { 
 res.sendFile(path.join(__dirname, 'hady-zen', 'kiyotaka', 'ayanokoji.html'));
});
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'hady-zen', 'kiyotaka', 'kiyotaka.html'));
});

process.on('unhandledRejection', error => console.log(logo.error + error));
process.on('uncaughtException', error => console.log(logo.error + error));
