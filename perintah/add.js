module.exports = {
  hady: {
    nama: "add",
    penulis: "Hady Zen",
    peran: 1,
    kuldown: 10,
    tutor: "<id>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    if (!args[0]) {

      return api.sendMessage(
        "Kamu belum memberikan id nya.",
        event.threadID,
        event.messageID
      );

    }

    try {

      await api.addUserToGroup(
        args[0],
        event.threadID
      );

      api.sendMessage(
        "Berhasil menambahkan pengguna.",
        event.threadID,
        event.messageID
      );

    } catch (e) {

      console.log(e);

      api.sendMessage(
        "Gagal menambahkan pengguna.",
        event.threadID,
        event.messageID
      );

    }

  }
};
