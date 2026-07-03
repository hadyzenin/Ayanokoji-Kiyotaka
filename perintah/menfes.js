module.exports = {
  hady: {
    nama: "menfes",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<id> <pesan>"
  },

  Ayanokoji: async function ({ api, event, args }) {
    if (args.length < 2) return api.sendMessage("Contoh: menfes 1000123456789 halo", event.threadID, event.messageID);

    const id = args[0];
    const pesan = args.slice(1).join(" ");

    api.sendMessage(`✦˚₊‧꒰ა MENFES KIYOPON ໒꒱ ‧₊˚✦

୨୧💛 from: human
୨୧🩵 for: you

┈┈┈୨୧┈┈┈

⏤͟͟͞͞ pesan: ${pesan}

┈┈┈୨୧┈┈┈

jangan lupa dibaca yaa sayangg 💌`, id, err => {
      if (err) return api.sendMessage("Gagal mengirim menfes.", event.threadID, event.messageID);
      api.sendMessage("Menfes berhasil dikirim.", event.threadID, event.messageID);
    });
  }
};
