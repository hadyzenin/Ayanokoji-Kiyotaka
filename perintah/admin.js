const fs = require('fs');
const noah = JSON.parse(fs.readFileSync('kiyotaka.json', 'utf8'));

module.exports = {
  hady: {
    nama: "admin",
    penulis: "Hady Zen",
    kuldown: 6,
    peran: 2,
    tutor: "<list/add/del>"
  },

  Ayanokoji: async function({ api, event, args, loadC }) {

    switch (args[0]) {

      case 'list':

        api.sendMessage(
          noah.admin.join('\n'),
          event.threadID,
          event.messageID
        );

      break;

      case 'add':

        if (args.length < 2) {
          return api.sendMessage(
            "Kamu belum memberikan id nya.",
            event.threadID,
            event.messageID
          );
        }

        noah.admin.push(args[1]);

        fs.writeFileSync(
          'kiyotaka.json',
          JSON.stringify(noah, null, 2)
        );

        api.sendMessage(
          "Berhasil menambahkan admin.",
          event.threadID,
          event.messageID
        );

        await loadC();

      break;

      case 'del':

        if (args.length < 2) {
          return api.sendMessage(
            "Kamu belum memberikan id nya.",
            event.threadID,
            event.messageID
          );
        }

        const index = noah.admin.indexOf(args[1]);

        if (index !== -1) {

          noah.admin.splice(index, 1);

          fs.writeFileSync(
            'kiyotaka.json',
            JSON.stringify(noah, null, 2)
          );

          api.sendMessage(
            "Berhasil menghapus admin.",
            event.threadID,
            event.messageID
          );

          await loadC();

        } else {

          api.sendMessage(
            "Id yang kamu berikan bukanlah admin.",
            event.threadID,
            event.messageID
          );

        }

      break;

      default:

        api.sendMessage(
          "Kamu salah penggunaan, gunakan list, add, del.",
          event.threadID,
          event.messageID
        );
    }
  }
};
