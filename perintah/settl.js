module.exports = {
  hady: {
    nama: "settl",
    penulis: "Hady Zen",
    kuldown: 2,
    peran: 2,
    tutor: "<reply> <title>"
  },

  Ayanokoji: async function ({ api, event, args, setUser }) {
    if (!event.messageReply) {
      return api.sendMessage(
        "Reply pesan pengguna yang ingin diubah title-nya.",
        event.threadID,
        event.messageID
      );
    }

    const title = args.join(" ").trim();

    if (!title) {
      return api.sendMessage(
        "Masukkan title. Contoh: settl Developer",
        event.threadID,
        event.messageID
      );
    }

    if (title.length > 10) {
      return api.sendMessage(
        "Maksimal 10 karakter.",
        event.threadID,
        event.messageID
      );
    }

    setUser(event.messageReply.senderID, "title", title);

    return api.sendMessage(
      `Berhasil mengubah title pengguna menjadi: ${title}`,
      event.threadID,
      event.messageID
    );
  }
};
