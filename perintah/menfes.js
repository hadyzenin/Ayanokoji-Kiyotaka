module.exports = {
  hady: {
    nama: "menfes",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<id> <pesan>"
  },

  Ayanokoji: async function ({ api, event, args }) {
    if (args.length < 2) return api.sendMessage("Contoh:\nmenfes 1000123456789 Halo apa kabar", event.threadID, event.messageID);

    const id = args[0];
    const pesan = args.slice(1).join(" ");

    api.sendMessage(`📩 𝗠𝗲𝗻𝗳𝗲𝘀\n\n${pesan}`, id, err => {
      if (err) return api.sendMessage("Gagal mengirim menfes.", event.threadID, event.messageID);
      api.sendMessage("Menfes berhasil dikirim.", event.threadID, event.messageID);
    });
  }
};
