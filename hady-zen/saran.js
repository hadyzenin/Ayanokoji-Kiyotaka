/* Hady Zen'in */
/* dibuat oleh Hady with love - Copyright HadyZenin 2025 */

function levenshtein(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function saran(input, commands) {
  let best = null;
  let score = Infinity;
  for (const cmd of commands) {
    const d = levenshtein(input, cmd);
    if (d < score) {
      score = d;
      best = cmd;
    }
  }
  return score <= 3 ? best : null;
}

module.exports = { saran };
