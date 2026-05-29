const startTime = Date.now();

module.exports = {
  hady: {
    nama: "r",
    penulis: "Hady Zen",
    kuldown: 2,
    peran: 0,
    tutor: ""
  },

  Ayanokoji: async function ({ api, event }) {

    const uptime = Date.now() - startTime;

    const jam = Math.floor(
      uptime / (1000 * 60 * 60)
    );

    const menit = Math.floor(
      (uptime % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const detik = Math.floor(
      (uptime % (1000 * 60)) /
      1000
    );

    api.sendMessage(
     `Online selama ${jam} jam ${menit} mnt ${detik} dtk.`,
      event.threadID,
      event.messageID
    );

  }
};
