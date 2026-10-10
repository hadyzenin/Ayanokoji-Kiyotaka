module.exports = {
  hady: { 
    nama: "pay", 
    penulis: "Hady Zen", 
    kuldown: 10,
    peran: 0,
    tutor: "pay <id> <jumlah>"
  }, 
  
  Ayanokoji: async function ({ api, event, getData, setUser, args }) {
    const senderID = event.senderID;

    if (args.length < 2) {
      return api.sendMessage("Format salah! contoh: pay <id> <jumlah>", event.threadID, event.messageID);
    }

    const targetID = args[0];
    const duit = parseInt(args[1]);

    if (isNaN(duit) || duit <= 0) {
      return api.sendMessage("Jumlah harus angka valid!", event.threadID, event.messageID);
    }

    const senderData = getData(senderID);
    const targetData = getData(targetID);

    if (!targetData) {
      return api.sendMessage("User tujuan tidak ditemukan!", event.threadID, event.messageID);
    }

    if (senderData.yen < duit) {
      return api.sendMessage("Saldo kamu tidak cukup!", event.threadID, event.messageID);
    }

    setUser(senderID, 'yen', senderData.yen - duit);

    setUser(targetID, 'yen', targetData.yen + duit);

    api.sendMessage(
      `Berhasil transfer ${duit} yen ke ${targetData.nama}`,
      event.threadID,
      event.messageID
    );
  }
};
