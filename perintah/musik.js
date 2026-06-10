const fs = require("fs");
const axios = require("axios");

module.exports = {
  hady: {
    nama: "musik",
    penulis: "Hady Zen",
    kuldown: 30,
    peran: 0,
    tutor: "<judul>"
  },

  Ayanokoji: async function ({ api, event, args, getStream }) {
    const query = args.join(" ");

    if (!query) return api.sendMessage("Masukkan judul musik.", event.threadID, event.messageID);

    try {
      const { data } = await axios.get(`https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(query)}`);
      const musik = data.data[0];

      if (!musik) return api.sendMessage("Musik tidak ditemukan.", event.threadID, event.messageID);

      const audio = `https://discoveryprovider.audius.co/v1/tracks/${musik.id}/stream`;
      const file = await getStream(audio, "musik.mp3");

      api.sendMessage({
        body: `Judul: ${musik.title}\n Link: ${audio}`,
        attachment: fs.createReadStream(file)
      }, event.threadID, event.messageID);

    } catch {
      api.sendMessage("Gagal mengambil musik.", event.threadID, event.messageID);
    }
  }
};
