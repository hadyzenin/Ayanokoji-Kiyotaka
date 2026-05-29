const { exec } = require("child_process");

module.exports = {
  hady: {
    nama: "shell",
    kuldown: 6,
    peran: 2,
    penulis: "Hady Zen",
    tutor: "<kode>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    if (!args[0]) {

      return api.sendMessage(
        "Kamu belum memasukkan kode terminal nya.",
        event.threadID,
        event.messageID
      );

    }

    exec(args.join(" "), (error, stdout, stderr) => {

      let hadi = "";

      if (error) {
        hadi = error.message;
      }

      if (stdout) {
        hadi = stdout;
      }

      if (stderr) {
        hadi = stderr;
      }

      if (!hadi) {
        hadi = "Tidak ada output.";
      }

      api.sendMessage(
        hadi,
        event.threadID,
        event.messageID
      );

    });

  },
};
