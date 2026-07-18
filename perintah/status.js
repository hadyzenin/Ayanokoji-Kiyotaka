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
    kuldown: 24,
    peran: 0,
    tutor: ""
  },

  Ayanokoji: async function ({ api, event, getData, getStream }) {

    const {
      nama,
      level,
      exp,
      yen,
      chat,
      pp,
      bg,
      title,
      flag
    } = getData(event.senderID);

    const canvas = Canvas.createCanvas(900, 450);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
  bg || "https://i.ibb.co/DHF0mdSb/hady.jpg"
);
    drawCover(ctx, background, 0, 0, 900, 450);

    ctx.fillStyle = "rgba(0,0,0,.45)";
    ctx.fillRect(0, 0, 900, 450);

    roundRect(ctx, 25, 25, 850, 400, 22, "rgba(25,25,35,.65)");

    ctx.strokeStyle = "rgba(255,255,255,.08)";
    ctx.lineWidth = 2;
    ctx.strokeRect(25, 25, 850, 400);

    const avatar = await Canvas.loadImage(
  pp || "https://i.ibb.co/n8qKSx0Z/hady.jpg"
);

   const avatarSize = 160;
const avatarX = 45;
const avatarY = 58;
     const border = 2;
      
ctx.beginPath();
ctx.arc(
  avatarX + avatarSize / 2,
  avatarY + avatarSize / 2,
  avatarSize / 2 + border,
  0,
  Math.PI * 2
);
ctx.fillStyle = "#7b61ff";
ctx.fill();

drawAvatar(ctx, avatar, avatarX, avatarY, avatarSize);

const badgeW = 140;
const badgeH = 34;
const badgeX = avatarX + (avatarSize - badgeW) / 2;
const badgeY = avatarY + avatarSize + 16;
      
roundRect(
  ctx,
  badgeX,
  badgeY,
  badgeW,
  badgeH,
  18,
  "rgba(255,255,255,.06)"
);

ctx.strokeStyle = "rgba(123,97,255,.8)";
ctx.lineWidth = 2;
ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);

ctx.fillStyle = "#ffffff";
ctx.font = "bold 17px Sans";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

ctx.fillText(
  title,
  badgeX + badgeW / 2,
  badgeY + badgeH / 2
);

ctx.textAlign = "start";
ctx.textBaseline = "alphabetic";
      
    const infoX = 250; 
const nameY = 160; 
let fontSize = 26;
      
ctx.fillStyle = "#ffffff";
ctx.font = `bold ${fontSize}px Sans`;
ctx.fillText(nama, infoX, nameY);

      const bendera = await Canvas.loadImage(`https://flagcdn.com/w80/${flag}.png`);

const flagW = 44;
const flagH = 30;
const flagX = canvas.width - flagW - 54;
const flagY = 54;

ctx.save();
ctx.beginPath();
ctx.roundRect(flagX, flagY, flagW, flagH, 7);
ctx.clip();

ctx.drawImage(bendera, flagX, flagY, flagW, flagH);

ctx.restore();
      
const maxExp = 100;
const persen = Math.min(exp, maxExp) / maxExp;

const barW = 570;
const barH = 18;
const barX = infoX;
const barY = 250;
  
roundRect(ctx,ctx.fillStyle = "#d6d6e5");
ctx.font = "600 19px Sans";
ctx.fillText(`Level ${level}`, barX + 4, barY - 6);
roundRect(ctx, barX, barY, barW, barH, 9, "#2c2f3a");
      
const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
grad.addColorStop(0, "#7b61ff");
grad.addColorStop(1, "#4cc9f0");

roundRect(ctx, barX, barY, barW * persen, barH, 9, grad);
    
const panelX = 25;
const panelW = 850;

const boxY = 300; 
const boxH = 95;
const gap = 20;

const boxW = (panelW - gap * 4) / 3;

const box = (x, title, value, color) => {
  roundRect(ctx, x, boxY, boxW, boxH, 16, "rgba(255,255,255,.06)");

  ctx.strokeStyle = "rgba(255,255,255,.08)";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, boxY, boxW, boxH);
  
  ctx.fillStyle = "#d0d0d0";
ctx.font = "16px Sans";
ctx.fillText(title, x + 20, boxY + 26);

ctx.fillStyle = color;
ctx.font = "bold 26px Sans";
ctx.fillText(value, x + 20, boxY + 60);
};

const box1 = panelX + gap;
const box2 = box1 + boxW + gap
const box3 = box2 + boxW + gap;

box(box1, "YEN", `${yen} ¥`, "#FFD54F");
box(box2, "CHAT", `${chat}`, "#4CC9F0");
box(box3, "NO", `100`, "#6DF27D");

    const file = "assets/status.png";
    fs.writeFileSync(file, canvas.toBuffer("image/png"));

    return api.sendMessage({
      attachment: fs.createReadStream(file)
    }, event.threadID, event.messageID);
  }
};
