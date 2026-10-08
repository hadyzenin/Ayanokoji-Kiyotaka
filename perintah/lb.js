module.exports = {
  hady: {
    nama: "lb",
    penulis: "Hady Zen",
    kuldown: 60,
    peran: 0,
    tutor: "lb"
  },

  Ayanokoji: async function ({ api, event, getData }) {
    let allData;
    try {
      allData = getData();
    } catch {
      return api.sendMessage("Gagal ambil database!", event.threadID, event.messageID);
    }

    const users = Object.entries(allData).map(([id, data]) => ({
      id,
      yen: data.yen || 0,
      chat: data.chat || data.messageCount || 0,
      level: data.level || 0,
      exp: data.exp || 0,
      nama: data.nama || data.name || id
    }));

    let topYen = users.slice().sort((a, b) => b.yen - a.yen).slice(0, 6);
    let topChat = users.slice().sort((a, b) => b.chat - a.chat).slice(0, 6);
    let topLevel = users.slice().sort((a, b) => b.level - a.level || b.exp - a.exp).slice(0, 6);

    function format(list, key, title) {
      let t = `${title}\n`;
      list.forEach((u, i) => {
        let val = "";
        if (key === "yen") val = `${u.yen.toLocaleString()} Yen`;
        if (key === "chat") val = `${u.chat} chat`;
        if (key === "level") val = `Lv.${u.level}`;
        t += `${i + 1}. ${u.nama} - ${val}\n`;
      });
      return t.trim();
    }

    const msg = `${format(topYen, "yen", "TOP 6 YEN")}\n\n${format(topChat, "chat", "TOP 6 CHAT")}\n\n${format(topLevel, "level", "TOP 6 LEVEL")}`;

    return api.sendMessage(msg, event.threadID, event.messageID);
  }
};
