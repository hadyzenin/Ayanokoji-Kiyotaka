const fs = require("fs");
const axios = require("axios");

module.exports = {
  hady: {
    nama: "musik",
    penulis: "Hady Zen",
    kuldown: 24,
    peran: 0,
    tutor: "<judul>"
  },

  Ayanokoji: async function ({ api, event, args, getStream }) {
    const query = args.join(" ");
    if (!query) return api.sendMessage("Berikan saya judul musiknya.", event.threadID, event.messageID);

    try {
      const { data } = await axios.get(
        `https://music.zedxnexus.my.id/api/search?q=${encodeURIComponent(query)}`
      );

      const musik = data.data?.[0];
      if (!musik) return api.sendMessage("Musik tidak ditemukan.", event.threadID, event.messageID);

      const { data: stream } = await axios.get(
        `https://music.zedxnexus.my.id/api/stream?videoId=${musik.videoId}`
      );

      const file = await getStream(stream.stream_data, "musik.mp3");

      api.sendMessage({
        body: `Judul: ${musik.name}\nDownload: ${stream.stream_data}`,
        attachment: fs.createReadStream(file)
      }, event.threadID, event.messageID);

    } catch (err) {
      api.sendMessage("Gagal mengambil musik.", event.threadID, event.messageID);
    }
  }
};
