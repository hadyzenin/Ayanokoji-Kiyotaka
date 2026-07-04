/* Hady Zen'in */
/* dibuat oleh Hady with love - Copyright HadyZenin 2025 */

 const express = require('express');
 const app = express();
 const login = require('hadyzen-fca');
 const { logo, warna, font, ayanokoji } = require('./hady-zen/log');
 const fs = require('fs');
 const path = require('path');
 const axios = require('axios');
 const cron = require('node-cron');
 const cheerio = require('cheerio');
 const { spawn } = require('child_process');
 const akun = fs.readFileSync('akun.txt', 'utf8');
 const { version } = require('./package');
 const gradient = require('gradient-string');
 const { awalan, nama, admin, maintain, chatdm, imgbbkey, aikey, setting, zonawaktu } = require('./kiyotaka');
 const { kuldown } = require('./hady-zen/kuldown');
 const moment = require('moment-timezone');
 const now = moment.tz(zonawaktu);

const kiyopon = gradient("#ADD8E6", "#4682B4", "#00008B")(logo.ayanokoji);
const tanggal = now.format('YYYY-MM-DD');
const waktu = now.format('HH:mm:ss');
global.Ayanokoji = { awalan: awalan, nama: nama, admin: admin, logo: logo, imgbbkey: imgbbkey,  aikey: aikey, maintain: maintain, waktu: waktu, tanggal: tanggal };

// FUNCTION AYANOKOJI 
async function getStream(hadi, isekai) {
    try {
  const kiyotaka = await axios.get(hadi, { responseType: 'arraybuffer' });
  const otaku = Buffer.from(kiyotaka.data, 'binary');
  const wibu = path.join(__dirname, 'assets', isekai);
    fs.writeFileSync(wibu, otaku);
      return wibu;
  } catch (error) {
    throw error;
 }
};
async function fbid(link) {
	try {
		const response = await axios.post(
			'https://seomagnifier.com/fbid',
			new URLSearchParams({
				'facebook': '1',
				'sitelink': link
			}),
			{
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Cookie': 'PHPSESSID=0d8feddd151431cf35ccb0522b056dc6'
				}
			}
		);
		const id = response.data;
		if (isNaN(id)) {
			const html = await axios.get(link);
			const $ = cheerio.load(html.data);
			const el = $('meta[property="al:android:url"]').attr('content');
			if (!el) {
				throw new Error('UID not found');
			}
			const number = el.split('/').pop();
			return number;
		}
		return id;
	} catch (error) {
		throw new Error('An unexpected error occurred. Please try again.');
	}
};

let data = {};
if (fs.existsSync(path.join('hady-zen', 'kiyopon.db'))) {
    data = JSON.parse(fs.readFileSync(path.join('hady-zen', 'kiyopon.db'), 'utf-8'));
}

function addData(id) {
    if (data[id]) {
    } else {
        data[id] = { "nama": "Kiyopon", "yen": 0, "exp": 0, "level": 1, "chat": 0, "pp": "", "bg": "", "title": "Noob", "flag": "jp", "daily": null };
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
if (!body || global.Ayanokoji.maintain === true && !admin.includes(event.senderID) || chatdm === false && event.isGroup == false && !admin.includes(event.senderID)) return; 
  addData(event.senderID);
if (body.toLowerCase() == "prefix") return api.sendMessage(`Awalan ${nama} adalah: ${awalan}`, event.threadID, event.messageID);
if (body.toLowerCase().startsWith("kiyopon")) {
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
 async function hady_cmd(cmd, api, event) {
    const pipi = body?.replace(`${awalan}${cmd}`, "")?.trim();
    const args = pipi?.split(' ');
	 try {
    const skibidi = await new Promise((resolve, reject) => { api.getThreadInfo(event.threadID, (err, info) => { if (err) reject(err); else resolve(info); }); });
    const fitri = skibidi.adminIDs.map(admin => admin.id);
    const files = fs.readdirSync(path.join(__dirname, '/perintah'));
       for (const file of files) {
   if (file.endsWith('.js')) {
    const anime = path.join(path.join(__dirname, '/perintah'), file);
    const { hady, Ayanokoji } = require(anime);
   if (hady && hady.nama === cmd && typeof Ayanokoji === 'function') {
  console.log(logo.info + `Menjalankan perintah ${hady.nama}`);
 const bhs = function(veng) { return bahasa[nakano][veng]; };	
   if (kuldown(event.senderID, hady.nama, hady.kuldown) == 'hadi') {    
if (hady.peran == 0 || !hady.peran) {
    await Ayanokoji({ api, event, args, getStream, setUser, getData, fbid });
    return;
}
if ((hady.peran == 2 || hady.peran == 1) && admin.includes(event.senderID) || hady.peran == 0) {
    await Ayanokoji({ api, event, args, getStream, setUser, getData, fbid });
    return;
} else if (hady.peran == 1 && fitri.join(', ').includes(event.senderID) || hady.peran == 0) {
    await Ayanokoji({ api, event, args, getStream, setUser, getData, fbid });
    return;
} else { 
    api.setMessageReaction("🥀", event.messageID);
}
  } else {
   api.sendMessage("Sabar dong :v", event.threadID, event.messageID);
   }
  } 
 }
}
 } catch (error) {
   console.log(logo.error + 'Perintah error: ' + error.message);
 }
}
 hady_cmd(cmd, api, event);
 });
});

//AI AYANOKOJI 
async function DyAI(pesan) {
const res = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
  model: "llama-3.1-8b-instant",
  messages: [{ role: "user", content: pesan }]
}, {
  headers: {
    "Authorization": `Bearer ${aikey}`,
    "Content-Type": "application/json"
  }
}); 
  return res.data.choices[0].message.content;
};

//HAPUS CACHE AYANOKOJI 
function clear() {
  fs.readdir('assets', (err, files) => {
    if (err) {
      return;
    }
    files.forEach((file) => {
      const filePath = path.join('assets', file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          return;
	}
        if (stats.isFile()) {
          fs.unlink(filePath, (err) => { });
	} else if (stats.isDirectory()) {
          clear(filePath);
        }
      });
    });
  });
};

//WEBVIEW AYANOKOJI 
app.get('/', (req, res) => { 
 res.sendFile(path.join(__dirname, 'hady-zen', 'kiyotaka', 'ayanokoji.html'));
});
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'hady-zen', 'kiyotaka', 'kiyotaka.html'));
});

process.on('unhandledRejection', error => console.log(logo.error + error));
process.on('uncaughtException', error => console.log(logo.error + error));
