const font = require("fontstyles");

module.exports = {
  hady: {
    nama: "rand",
    penulis: "Hady Zen",
    kuldown: 8,
    peran: 0,
    tutor: "<pilihan>, <pilihan>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    const hadi = args.join(" ");

    if (!hadi.includes(",")) {

      return api.sendMessage(
        "Berikan setidaknya dua pilihan.",
        event.threadID,
        event.messageID
      );

    }
    

    const itsuki = hadi
      .split(",")
      .map(x => x.trim())
      .filter(x => x);

    const rand = Math.floor(
      Math.random() * itsuki.length
    );

    const pilihan = font.bold(
      itsuki[rand]
    );

    api.sendMessage(
      `Saya lebih memilih ${pilihan}`,
      event.threadID,
      event.messageID
    );

  }
};
