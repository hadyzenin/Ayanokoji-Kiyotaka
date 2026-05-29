module.exports = {
  hady: {
    nama: "randr",
    penulis: "Hady Zen",
    kuldown: 8,
    peran: 0,
    tutor: "<angka-angka>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    if (!args[0] || !args[0].includes("-")) {

      return api.sendMessage(
        "Berikan angkanya, contoh 1-100.",
        event.threadID,
        event.messageID
      );

    }

    const [min, max] = args[0]
      .split("-")
      .map(Number);

    if (isNaN(min) || isNaN(max)) {

      return api.sendMessage(
        "Angka kamu tidak valid.",
        event.threadID,
        event.messageID
      );

    }

    const hasil =
      Math.floor(
        Math.random() * (max - min + 1)
      ) + min;

    api.sendMessage(
      `Angkamu: ${hasil}`,
      event.threadID,
      event.messageID
    );

  }
};
