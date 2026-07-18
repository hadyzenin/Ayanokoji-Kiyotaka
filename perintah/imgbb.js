const axios = require('axios');
const from = require('form-data');

module.exports = {
  hady: {
    nama: "imgbb",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<reply foto>"
  },

  Ayanokoji: async function ({ api, event, bhs }) {
    const itsuki = event.messageReply?.attachments[0]?.url;
    if (!itsuki) {
      return api.sendMessage('Kamu harus memreply ke sebuah gambar.', event.threadID, event.messageID);
    }

    try {
      const miku = await axios.get(itsuki, {
        responseType: 'arraybuffer'
      });
      const formData = new from();
      formData.append('image', Buffer.from(miku.data, 'binary'), {
        filename: 'hady.png'
      });
      const nino = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: `${global.Ayanokoji.imgbbkey}`
        }
      });
      await api.sendMessage(nino.data.data.url, event.threadID, event.messageID);
    } catch (hadi) {
      api.sendMessage('Error: ' + hadi, event.threadID, event.messageID);
    }
  },
};
