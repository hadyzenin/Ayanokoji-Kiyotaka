const fs = require('fs');
const path = require('path');

module.exports = {
  hady: {
    nama: "file",
    penulis: "Hady Zen",
    peran: 2,
    kuldown: 6,
    tutor: "<nama file>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    if (!args[0]) {

      return api.sendMessage(
        "Kamu belum memasukkan nama file nya.",
        event.threadID,
        event.messageID
      );

    }

    const hadi = path.join(
      'perintah',
      `${args[0]}.js`
    );

    if (!fs.existsSync(hadi)) {

      return api.sendMessage(
        "File yang kamu minta tidak ada.",
        event.threadID,
        event.messageID
      );

    }

    const file = fs.readFileSync(hadi, 'utf8');

    api.sendMessage(
      file,
      event.threadID,
      event.messageID
    );

  }
};
