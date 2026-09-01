/* ARES — controle : aucun accent ne doit se trouver dans du code JavaScript
   de l'application (hors chaines de caracteres et commentaires).
   Lancer : node audit.js                                                     */
const fs = require('fs');
const path = require('path');

// Retire commentaires et chaines de caracteres d'une source JS, en suivant
// le caractere de guillemet reellement ouvert (au lieu de 3 passes regex
// independantes, qui se font piéger des qu'une chaine double contient une
// apostrophe — exactement le bug que ce fichier a lui-meme provoque).
function sansChainesNiCommentaires(src) {
  let out = '', i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') { i += 2; while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++; i += 2; continue; }
    if (c === '"' || c === "'" || c === '`') {
      const q = c; i++;
      while (i < src.length && src[i] !== q) { if (src[i] === '\\') i++; i++; }
      i++;
      out += q + q;
      continue;
    }
    out += c; i++;
  }
  return out;
}

const ACCENTS = /[A-Za-z_$]*[À-ſ][A-Za-z_$]*/g;
let souci = 0;
['70-app.js', '50-pyrun.js', '60-runners.js', '05-cloud.js'].forEach(f => {
  const src = fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
  const sansTexte = sansChainesNiCommentaires(src);
  const trouves = [...new Set(sansTexte.match(ACCENTS) || [])];
  if (trouves.length) {
    souci += trouves.length;
    console.log('X ' + f + ' : ' + trouves.join(' | '));
  } else {
    console.log('OK ' + f);
  }
});
process.exitCode = souci ? 1 : 0;
