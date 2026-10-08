module.exports = {
  hady: {
    nama: "slot",
    penulis: "Hady Zen",
    kuldown: 30,
    peran: 0,
    tutor: "slot <jumlah>"
  },

  Ayanokoji: async function ({ api, event, getData, setUser, args }) {
    const senderID = event.senderID;
    const bet = parseInt(args[0]) || 10;

    if (isNaN(bet) || bet <= 0) {
      return api.sendMessage("Gunakan <jumlah>, contoh: slot 10", event.threadID, event.messageID);
    }

    if (bet < 10) {
      return api.sendMessage("Minimal taruhan 10 yen!", event.threadID, event.messageID);
    }

    const userData = getData(senderID);
    if (!userData) {
      return api.sendMessage("Data user tidak ditemukan!", event.threadID, event.messageID);
    }

    if (userData.yen < bet) {
      return api.sendMessage(`Yen tidak cukup! yen kamu ${userData.yen}`, event.threadID, event.messageID);
    }

    const colors = ["❤️", "💛", "💚", "💙", "💜", "🧡"];
    let slot = [];
    const isJackpotRoll = Math.random() < 0.10;

    if (isJackpotRoll) {
      const winColor = colors[Math.floor(Math.random() * colors.length)];
      slot = [winColor, winColor, winColor];
    } else {
      for (let i = 0; i < 3; i++) {
        slot.push(colors[Math.floor(Math.random() * colors.length)]);
      }
      if (slot[0] === slot[1] && slot[1] === slot[2] && Math.random() * 0.10) {
        slot[2] = colors.filter(c => c!== slot[0])[Math.floor(Math.random() * (colors.length - 1))];
      }
    }

    const [a, b, c] = slot;
    let winAmount = 0;
    let status = "KALAH";
    let resultText = "";

    if (a === b && b === c) {
      status = "JACKPOT!!!";
      winAmount = bet * 3;
      resultText = "JACKPOT 3 warna sama!";
    } else if (a === b || b === c || a === c) {
      status = "MENANG";
      winAmount = bet * 2;
      resultText = "Menang! 2 warna sama!";
    } else {
      status = "KALAH";
      winAmount = -bet;
      resultText = "Yah kalah, coba lagi!";
    }

    if (winAmount > 0) {
      setUser(senderID, 'yen', userData.yen + winAmount);
    } else {
      setUser(senderID, 'yen', userData.yen - bet);
    }
    const msg = `🎰 ┃ SLOT MACHINE ┃ 🎰
━━━━━━━━━━━━━━━
[ ${a} | ${b} | ${c} ]

${resultText}

💰 Taruhan: ${bet} Yen
${winAmount > 0? `💸 Menang: +${winAmount} Yen` : `💸 Kalah: -${bet} Yen`}
👛 Saldo: ${userData.yen} Yen
━━━━━━━━━━━━━━━`;

    return api.sendMessage(msg, event.threadID, event.messageID);
  }
};
