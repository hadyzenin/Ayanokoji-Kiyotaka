module.exports = {
  hady: {
    nama: "maintain",
    penulis: "Hady Zen",
    kuldown: 6,
    peran: 2,
    tutor: "<on/off>"
  },

  Ayanokoji: async function({ api, event, args }) {

    if (!args[0]) {

      return api.sendMessage(
        "Harap gunakan on atau off.",
        event.threadID,
        event.messageID
      );

    }

    if (args[0] == 'on') {

      global.Ayanokoji.maintain = true;

      api.sendMessage(
        "Berhasil mengaktifkan mode admin.",
        event.threadID,
        event.messageID
      );

    } else if (args[0] == 'off') {

      global.Ayanokoji.maintain = false;

      api.sendMessage(
        "Berhasil menonaktifkan mode admin.",
        event.threadID,
        event.messageID
      );

    } else {

      api.sendMessage(
        "Harap gunakan on atau off.",
        event.threadID,
        event.messageID
      );

    }

  }
};
