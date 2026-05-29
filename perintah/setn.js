module.exports = {
  hady: {
    nama: "setn",
    penulis: "Hady Zen",
    kuldown: 8,
    peran: 0,
    tutor: "<nama>"
  },

  Ayanokoji: async function ({
    api,
    event,
    args,
    setUser,
    getData
  }) {

    const nama = args.join(" ");

    if (!nama) {

      return api.sendMessage(
        "Harap masukkan nama yang kamu mau.",
        event.threadID,
        event.messageID
      );

    }

    if (nama.length > 12) {

      return api.sendMessage(
        "Nama kamu lebih dari 12 huruf.",
        event.threadID,
        event.messageID
      );

    }

    const { yen } = getData(event.senderID);

    if (yen < 2) {

      return api.sendMessage(
        "Kamu membutuhkan 2 yen untuk mengganti nama.",
        event.threadID,
        event.messageID
      );

    }

    setUser(
      event.senderID,
      "nama",
      nama
    );

    setUser(
      event.senderID,
      "yen",
      yen - 2
    );

    api.sendMessage(
      `Kamu berhasil mengganti nama jadi ${nama}`,
      event.threadID,
      event.messageID
    );

  }
};
