/* Hady Zen'in */
/* dibuat oleh Hady with love - Copyright HadyZenin 2025 */

let hady = new Date();
hady.setHours(hady.getHours() + 7);
const jam = hady.getHours();
const menit = hady.getMinutes();
const detik = hady.getSeconds();
const tahun = hady.getFullYear();
const tanggal = hady.getDate();
bulan = hady.getMonth() + 1;

let waktu = `${jam.toString().padStart(2, '0')}:${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')} ${tanggal.toString().padStart(2, '0')}/${bulan.toString().padStart(2, '0')}/${tahun}`;

const font = {
  bold: `\x1b[1m`,
  italic: `\x1b[3m`
};
const warna = {
  reset: `\x1b[0m`, 
  hitam: `\x1b[38;5;240m`,
  merah: `\x1b[31m`,
  hijau: `\x1b[32m`,
  kuning: `\x1b[33m`,
  biru: `\x1b[34m`,
  magenta: `\x1b[35m`,
  cyan: `\x1b[36m`,
  putih: `\x1b[37m`
};

const logo = {
  error: `${warna.hitam}${waktu}${warna.reset} ${warna.merah}${font.bold}[ERROR] ${warna.reset}`, 
  sukses: `${warna.hitam}${waktu}${warna.reset} ${warna.hijau}${font.bold}[SUKSES] ${warna.reset}`,
  proses: `${warna.hitam}${waktu}${warna.reset} ${warna.biru}${font.bold}[PROSES] ${warna.reset}`,
  chat: `${warna.hitam}${waktu}${warna.reset} ${warna.cyan}${font.bold}[CHAT] ${warna.reset}`,
  kiyopon: `▄▀█ █▄█ ▄▀█ █▄ █ █▀█ █▄▀ █▀█  █ █\n█▀█  █  █▀█ █ ▀█ █▄█ █ █ █▄█ ▄█ █`
};

module.exports = { warna, font, logo };
