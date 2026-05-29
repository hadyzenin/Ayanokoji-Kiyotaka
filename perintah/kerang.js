module.exports = {
  hady: {
    nama: "kerang",
    peran: 0,
    penulis: "Hady Zen",
    kuldown: 16,
    tutor: "<tanya>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    if (!args[0]) {

      return api.sendMessage(
        "Tolong masukkan pertanyaan mu.",
        event.threadID,
        event.messageID
      );

    }

    const raffa = [
      "Tidak",
      "Tanyakan pada orang lain",
      "Mungkin suatu saat nanti",
      "Ya",
      "Tentu tidak",
      "Pake nanya",
      "Coba tanyakan lagi",
      "Mungkin ya",
      "Mungkin tidak",
      "Saya rasa tidak"
    ];

    const hadi =
      raffa[Math.floor(Math.random() * raffa.length)];

    api.sendMessage(
`🐚 𝗞𝗲𝗿𝗮𝗻𝗴 𝗔𝗷𝗮𝗶𝗯

Pertanyaan:
${args.join(" ")}

Jawaban:
${hadi}`,
      event.threadID,
      event.messageID
    );

  }
};
