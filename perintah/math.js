const axios = require("axios");

module.exports = {
  hady: {
    nama: "math",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<soal>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    if (!args[0]) {

      return api.sendMessage(
        "Kamu belum memberikan soal nya.",
        event.threadID,
        event.messageID
      );

    }

    try {

      const soal = args.join(" ");

      const jumlah = await axios.get(
        `http://api.mathjs.org/v4/?expr=${encodeURIComponent(soal)}`
      );

      api.sendMessage(
        `${soal} = ${jumlah.data}`,
        event.threadID,
        event.messageID
      );

    } catch (error) {

      api.sendMessage(
        "Error: " + error.message,
        event.threadID,
        event.messageID
      );

    }

  }
};
