const wiki = require("wikijs");

module.exports = {
  hady: {
    nama: "wiki",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<cari>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    const input = args.join(" ");

    if (!input) {

      return api.sendMessage(
        "Masukkan yang ingin kamu cari.",
        event.threadID,
        event.messageID
      );

    }

    try {

      const wikipedia = wiki.default({
        apiUrl: `https://${global.Ayanokoji.bahasa}.wikipedia.org/w/api.php`
      });

      const page = await wikipedia.find(input);

      const summary = await page.summary();

      api.sendMessage(
        summary,
        event.threadID,
        event.messageID
      );

    } catch (error) {

      api.sendMessage(
        "Tidak ada hasil ditemukan.",
        event.threadID,
        event.messageID
      );

    }

  }
};
