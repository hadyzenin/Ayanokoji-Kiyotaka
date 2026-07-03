const axios = require("axios");

module.exports = {
  hady: {
    nama: "lirik",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<judul>"
  },

  Ayanokoji: async function ({ api, event, args }) {
    const query = args.join(" ");
    if (!query) return api.sendMessage("Berikan saya judul lagunya.", event.threadID, event.messageID);

    try {
      const { data } = await axios.get(
        `https://music.zedxnexus.my.id/api/search?q=${encodeURIComponent(query)}`
      );

      const musik = data.data?.[0];
      if (!musik) return api.sendMessage("Lagu tidak ditemukan.", event.threadID, event.messageID);

      const { data: lyric } = await axios.get(
        `https://music.zedxnexus.my.id/api/lirik?videoId=${musik.videoId}`
      );

      api.sendMessage(
        `${musik.name}\n\n${lyric.data || "Lirik tidak tersedia."}`,
        event.threadID,
        event.messageID
      );

    } catch (err) {
      api.sendMessage("Gagal mengambil lirik.", event.threadID, event.messageID);
    }
  }
};
