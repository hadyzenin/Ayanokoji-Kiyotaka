const axios = require("axios");
const moment = require("moment-timezone");
const Canvas = require("canvas");
const fs = require("fs-extra");

function convertFtoC(F) {
  return Math.floor((F - 32) / 1.8);
}

function formatHours(hours) {
  return moment(hours)
    .tz("Asia/Jakarta")
    .format("HH[h]mm[p]");
}

module.exports = {
  hady: {
    nama: "cuaca",
    penulis: "Hady Zen",
    kuldown: 10,
    peran: 0,
    tutor: "<lokasi>"
  },

  Ayanokoji: async function ({ api, event, args }) {

    const area = args.join(" ");

    if (!area) {

      return api.sendMessage(
        "Tolong masukkan lokasi.",
        event.threadID,
        event.messageID
      );

    }

    let areaKey;
    let areaName;
    let dataWeather;

    try {

      const response = (
        await axios.get(
          `https://api.accuweather.com/locations/v1/cities/search.json?q=${encodeURIComponent(area)}&apikey=d7e795ae6a0d44aaa8abb1a0a7ac19e4&language=id`
        )
      ).data;

      if (!response.length) {

        return api.sendMessage(
          `Lokasi tidak ditemukan: ${area}`,
          event.threadID,
          event.messageID
        );

      }

      areaKey = response[0].Key;
      areaName = response[0].LocalizedName;

    } catch (err) {

      return api.sendMessage(
        "Terjadi kesalahan.",
        event.threadID,
        event.messageID
      );

    }

    try {

      dataWeather = (
        await axios.get(
          `http://api.accuweather.com/forecasts/v1/daily/10day/${areaKey}?apikey=d7e795ae6a0d44aaa8abb1a0a7ac19e4&details=true&language=id`
        )
      ).data;

    } catch (err) {

      return api.sendMessage(
        "Gagal mengambil data cuaca.",
        event.threadID,
        event.messageID
      );

    }

    const today = dataWeather.DailyForecasts[0];

    const msg =
`Cuaca sekarang di ${areaName}

${dataWeather.Headline.Text}

Suhu rendah - tinggi:
${convertFtoC(today.Temperature.Minimum.Value)}°C - ${convertFtoC(today.Temperature.Maximum.Value)}°C

Terasa seperti:
${convertFtoC(today.RealFeelTemperature.Minimum.Value)}°C - ${convertFtoC(today.RealFeelTemperature.Maximum.Value)}°C

Matahari terbit:
${formatHours(today.Sun.Rise)}

Matahari terbenam:
${formatHours(today.Sun.Set)}

Bulan terbit:
${formatHours(today.Moon.Rise)}

Bulan terbenam:
${formatHours(today.Moon.Set)}

Hari:
${today.Day.LongPhrase}

Malam:
${today.Night.LongPhrase}`;

    const bg = await Canvas.loadImage(
      "https://raw.githubusercontent.com/HadyZen/Ayanokoji-Kiyotaka/refs/heads/main/assets/cuaca.png"
    );

    const canvas = Canvas.createCanvas(
      bg.width,
      bg.height
    );

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      bg,
      0,
      0,
      bg.width,
      bg.height
    );

    let X = 100;

    ctx.fillStyle = "#ffffff";

    const data = dataWeather.DailyForecasts.slice(0, 7);

    for (const item of data) {

      const icon = await Canvas.loadImage(
        `http://vortex.accuweather.com/adc2010/images/slate/icons/${item.Day.Icon}.svg`
      );

      ctx.drawImage(
        icon,
        X,
        210,
        80,
        80
      );

      ctx.font = "30px Sans";

      ctx.fillText(
        `${convertFtoC(item.Temperature.Maximum.Value)}°C`,
        X,
        366
      );

      ctx.fillText(
        `${convertFtoC(item.Temperature.Minimum.Value)}°C`,
        X,
        445
      );

      ctx.fillText(
        moment(item.Date).format("DD"),
        X + 20,
        140
      );

      X += 135;

    }

    const pathSaveImg = "hady-zen-cuaca.png";

    fs.writeFileSync(
      pathSaveImg,
      canvas.toBuffer()
    );

    api.sendMessage(
      {
        body: msg,
        attachment: fs.createReadStream(pathSaveImg)
      },
      event.threadID,
      () => fs.unlinkSync(pathSaveImg),
      event.messageID
    );

  }
};
