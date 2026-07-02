module.exports = {
  hady: {
    nama: "uid",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<kosong/reply/tag/link>"
  },

  Ayanokoji: async function ({ api, event, args, fbid }) {
    if (event.messageReply) return api.sendMessage(event.messageReply.senderID, event.threadID, event.messageID);

    if (!args[0]) return api.sendMessage(event.senderID, event.threadID, event.messageID);

    const { mentions } = event;

    if (Object.keys(mentions).length) {
      let hadi = "";
      for (const id in mentions) hadi += `${mentions[id].replace("@", "")}: ${id}\n`;
      return api.sendMessage(hadi.trim(), event.threadID, event.messageID);
    }

    const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

    if (regExCheckURL.test(args[0])) {
      try {
        const uid = await fbid(args[0]);
        return api.sendMessage(uid, event.threadID, event.messageID);
      } catch (e) {
        return api.sendMessage(e.message, event.threadID, event.messageID);
      }
    }

    api.sendMessage("Masukkan link Facebook yang valid.", event.threadID, event.messageID);
  }
};
