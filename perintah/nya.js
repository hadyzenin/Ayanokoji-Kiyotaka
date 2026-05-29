module.exports = {
  hady: {
    nama: "nya",
    penulis: "Hady Zen",
    kuldown: 2,
    peran: 0,
    tutor: ""
  },

  Ayanokoji: async function ({ api, event }) {

    api.sendMessage(
      "nya",
      event.threadID,
      event.messageID
    );

  }
};
