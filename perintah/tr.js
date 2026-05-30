const axios = require("axios");

module.exports = {
  hady: {
    nama: "tr",
    penulis: "Hady Zen",
    peran: 0,
    kuldown: 10,
    tutor: "<bahasa> <teks>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    if (args.length < 2) {

      return api.sendMessage(
        "Kamu belum memasukkan code bahasa atau teksnya.",
        event.threadID,
        event.messageID
      );

    }

    try {

      const basa = args[0];

      const hady = args
        .slice(1)
        .join(" ");

      const respon = await axios.get(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${basa}&dt=t&q=${encodeURIComponent(hady)}`
      );

      const hasil = respon.data[0]
        .map(item => item[0])
        .join("");

      api.sendMessage(
`𝗧𝗲𝗿𝗷𝗲𝗺𝗮𝗵𝗮𝗻

${hasil}`,
        event.threadID,
        event.messageID
      );

    } catch (e) {

      api.sendMessage(
        "Gagal menerjemahkan teks.",
        event.threadID,
        event.messageID
      );

    }

  }
};
