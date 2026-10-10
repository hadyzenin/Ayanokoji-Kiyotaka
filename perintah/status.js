const Canvas = require("canvas");
const fs = require("fs");

function roundRect(ctx, x, y, w, h, r, color) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}
function drawCover(ctx, img, x, y, w, h) {
  const scale = Math.max(w / img.width, h / img.height);
  const nw = img.width * scale;
  const nh = img.height * scale;
  const nx = x + (w - nw) / 2;
  const ny = y + (h - nh) / 2;
  ctx.drawImage(img, nx, ny, nw, nh);
}
function drawAvatar(ctx, img, x, y, size) {
  const scale = Math.max(size / img.width, size / img.height);
  const nw = img.width * scale;
  const nh = img.height * scale;
  const nx = x - (nw - size) / 2;
  const ny = y - (nh - size) / 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, nx, ny, nw, nh);
  ctx.restore();
}

module.exports = {
  hady: {
    nama: "status",
    penulis: "Hady Zen",
    kuldown: 30,
    peran: 0,
    tutor: ".status"
  },

  Ayanokoji: async function ({ api, event, getData }) {
    const { nama, level, exp, yen, chat, pp, bg, title, flag } = getData(event.senderID);
    const warna = `${global.Ayanokoji.warna}`;
    const canvas = Canvas.createCanvas(900, 450);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(bg || "https://i.ibb.co/ccMWzGjT/background.jpg");
    drawCover(ctx, background, 0, 0, 900, 450);
    ctx.fillStyle = "rgba(0,0,0,.5)";
    ctx.fillRect(0, 0, 900, 450);

    roundRect(ctx, 25, 25, 850, 400, 24, "rgba(18,18,28,.75)");
    ctx.strokeStyle = "rgba(255,255,255,.07)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(25, 25, 850, 400);

    const avatar = await Canvas.loadImage(pp || "https://i.ibb.co/jZDZs118/hady.jpg");
    const avatarSize = 160, avatarX = 45, avatarY = 55;
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 2, 0, Math.PI * 2);
    ctx.fillStyle = warna;
    ctx.fill();
    drawAvatar(ctx, avatar, avatarX, avatarY, avatarSize);

    const badgeW = 140, badgeH = 34, badgeX = avatarX + (avatarSize - badgeW) / 2, badgeY = avatarY + avatarSize + 14;
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 18, "rgba(123,97,255,.18)");
    ctx.strokeStyle = warna;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 18);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 17px Sans";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(title, badgeX + badgeW / 2, badgeY + badgeH / 2);
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";

    const infoX = 255;
    const nameY = 145; 

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px Sans";
    ctx.fillText(nama, infoX, nameY);

    const barW = 570, barH = 18, barX = infoX, barY = 250;
    const maxExp = 100;
    const persen = Math.min(exp, maxExp) / maxExp;

    ctx.fillStyle = "#d6d6e5";
    ctx.font = "700 19px Sans";
    ctx.fillText(`Level ${level}`, barX + 2, barY - 10);

    roundRect(ctx, barX, barY, barW, barH, 9, "#2c2f3a");
    const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    grad.addColorStop(0, warna);
    grad.addColorStop(1, "#4cc9f0");
    roundRect(ctx, barX, barY, barW * persen, barH, 9, grad);

    const bendera = await Canvas.loadImage(`https://flagcdn.com/w80/${flag}.png`);
    const flagW = 44, flagH = 30, flagX = canvas.width - flagW - 54, flagY = 54;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(flagX, flagY, flagW, flagH, 7);
    ctx.clip();
    ctx.drawImage(bendera, flagX, flagY, flagW, flagH);
    ctx.restore();

    const panelX = 25, panelW = 850, boxY = 305, boxH = 95, gap = 20;
    const boxW = (panelW - gap * 3) / 2;

    const box = (x, label, value, color) => {
      ctx.save();
      roundRect(ctx, x, boxY, boxW, boxH, 16, "rgba(255,255,255,.07)");
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.strokeStyle = color + "55";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(x, boxY, boxW, boxH, 16);
      ctx.stroke();
      ctx.shadowBlur = 0;
      roundRect(ctx, x, boxY, boxW, 3, 3, color);
      ctx.fillStyle = "rgba(255,255,255,.55)";
      ctx.font = "600 13px Sans";
      ctx.fillText(label.toUpperCase(), x + 20, boxY + 28);
      ctx.fillStyle = color;
      ctx.font = "bold 28px Sans";
      ctx.fillText(value, x + 20, boxY + 64);
      ctx.fillStyle = color + "22";
      ctx.beginPath();
      ctx.arc(x + boxW - 30, boxY + 32, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.font = "bold 12px Sans";
      ctx.textAlign = "center";
      ctx.fillText(label[0], x + boxW - 30, boxY + 36);
      ctx.textAlign = "start";
      ctx.restore();
    };

    box(panelX + gap, "yen", `${yen} ¥`, warna);
    box(panelX + gap + boxW + gap, "chat", `${chat}`, warna);

    const file = "assets/status.png";
    fs.writeFileSync(file, canvas.toBuffer("image/png"));
    return api.sendMessage({ attachment: fs.createReadStream(file) }, event.threadID, event.messageID);
  }
};
