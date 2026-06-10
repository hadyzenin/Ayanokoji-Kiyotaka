const fs = require("fs");
const axios = require("axios");

module.exports = {
  hady: {
    nama: "musik",
    penulis: "Hady Zen",
    kuldown: 26,
    peran: 0,
    tutor: "<judul>"
  },

  Ayanokoji: async function ({ api, event, args, getStream }) {
    const query = args.join(" ");
    if (!query) return api.sendMessage("Berikan saya judul musik nya.", event.threadID, event.messageID);

    try {
      const { data } = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=82684229&format=json&limit=1&search=${encodeURIComponent(query)}`);
      const musik = data.results[0];

      if (!musik) return api.sendMessage("Musik tidak ditemukan.", event.threadID, event.messageID);

      const file = await getStream(musik.audio, "musik.mp3");

      api.sendMessage({
        body: `Judul: ${musik.name}\n Download ${musik.audio}`,
        attachment: fs.createReadStream(file)
      }, event.threadID, event.messageID);

    } catch {
      api.sendMessage("Gagal mengambil musik.", event.threadID, event.messageID);
    }
  }
};
