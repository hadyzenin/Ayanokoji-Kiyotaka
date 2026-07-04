const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  hady: {
    nama: "setpp",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<reply gambar>"
  },

  Ayanokoji: async function ({ api, event, getData, setUser }) {
    const { yen } = getData(event.senderID);

    if (yen < 2) {
      return api.sendMessage(
        "Minimal memiliki 2¥ untuk mengganti foto profil.",
        event.threadID,
        event.messageID
      );
    }

    const photo = event.messageReply?.attachments?.[0]?.url;

    if (!photo) {
      return api.sendMessage(
        "Reply sebuah gambar untuk dijadikan foto profil.",
        event.threadID,
        event.messageID
      );
    }

    try {
      const { data: image } = await axios.get(photo, {
        responseType: "arraybuffer"
      });

      const form = new FormData();
      form.append("image", Buffer.from(image), "avatar.png");

      const { data: upload } = await axios.post(
        "https://api.imgbb.com/1/upload",
        form,
        {
          params: {
            key: global.Ayanokoji.imgbbkey
          },
          headers: form.getHeaders()
        }
      );

      setUser(event.senderID, "pp", upload.data.url);
      setUser(event.senderID, "yen", yen - 2);

      return api.sendMessage(
        "Berhasil mengganti foto profil.",
        event.threadID,
        event.messageID
      );

    } catch (err) {
      return api.sendMessage(
        err.message,
        event.threadID,
        event.messageID
      );
    }
  }
};
