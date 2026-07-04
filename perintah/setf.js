const flags = [
  "id","jp","us","gb","kr","cn","tw","hk","sg","my",
  "th","vn","ph","in","pk","bd","np","lk","mm","kh",
  "la","bn","ae","sa","qa","kw","om","bh","ir","iq",
  "tr","ru","ua","de","fr","it","es","pt","nl","be",
  "lu","ch","at","pl","cz","sk","hu","ro","bg","gr",
  "hr","si","rs","ba","me","mk","al","xk","se","no",
  "fi","dk","is","ie","ee","lv","lt","by","md","ge",
  "am","az","kz","uz","tm","kg","tj","mn","au","nz",
  "ca","mx","br","ar","cl","pe","co","ve","uy","py",
  "bo","ec","gy","sr","za","eg","ng","ke","ma","dz"
];

module.exports = {
  hady: {
    nama: "setf",
    penulis: "Hady Zen",
    kuldown: 25,
    peran: 0,
    tutor: "<kode/list>"
  },

  Ayanokoji: async function ({ api, event, args, setUser }) {
    const code = args[0]?.toLowerCase();

    if (!code) {
      return api.sendMessage(
        "Masukkan kode negara. Contoh: setf jp.",
        event.threadID,
        event.messageID
      );
    }

    if (code === "list") {
      return api.sendMessage(
        `Daftar bendera (${flags.length})\n\n${flags.join(", ")}`,
        event.threadID,
        event.messageID
      );
    }

    if (!flags.includes(code)) {
      return api.sendMessage(
        "Kode flag tidak tersedia. Gunakan: setf list",
        event.threadID,
        event.messageID
      );
    }

    setUser(event.senderID, "flag", code);

    return api.sendMessage(
      `Berhasil mengganti flag menjadi ${code.toUpperCase()}.`,
      event.threadID,
      event.messageID
    );
  }
};
