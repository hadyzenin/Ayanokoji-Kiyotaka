module.exports = {
  hady: {
    nama: "kick",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 1,
    tutor: "<id/reply/tag>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    let target;

    if (event.messageReply) {

      target = event.messageReply.senderID;

    } else if (Object.keys(event.mentions).length > 0) {

      target = Object.keys(event.mentions)[0];

    } else if (args[0]) {

      target = args[0];

    } else {

      return api.sendMessage(
        "Kamu belum memasukkan id nya.",
        event.threadID,
        event.messageID
      );

    }

    try {

      await api.removeUserFromGroup(
        target,
        event.threadID
      );

      api.sendMessage(
        "Berhasil mengeluarkan pengguna.",
        event.threadID,
        event.messageID
      );

    } catch (e) {

      console.log(e);

      api.sendMessage(
        "Gagal mengeluarkan pengguna.",
        event.threadID,
        event.messageID
      );

    }

  }
};
