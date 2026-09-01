/* ARES — controle : aucun accent ne doit se trouver dans du code JavaScript
   de l'application (hors chaines de caracteres et commentaires).
   Lancer : node audit.js                                                     */
const fs = require('fs');
const path = require('path');

// 1. reparation du nom de variable casse par la passe d'accents
const p = path.join(__dirname, 'src', '70-app.js');
let t = fs.readFileSync(p, 'utf8');
if (t.indexOf('détail') >= 0) {
  t = t.split('détail').join('detailHTML').split('var detail =').join('var detailHTML =')
       .split('detail = ').join('detailHTML = ');
  t = t.split('detailHTMLHTML').join('detailHTML');
  fs.writeFileSync(p, t, 'utf8');
  console.log('variable « detail » reparee');
}

// 2. audit
const ACCENTS = /[A-Za-z_$]*[À-ſ][A-Za-z_$]*/g;
let souci = 0;
['70-app.js', '50-pyrun.js', '60-runners.js'].forEach(f => {
  const src = fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
  const sansTexte = src.split(String.fromCharCode(192)+String.fromCharCode(45)+String.fromCharCode(591)).join("")
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``');
  const trouves = [...new Set(sansTexte.match(ACCENTS) || [])];
  if (trouves.length) {
    souci += trouves.length;
    console.log('X ' + f + ' : ' + trouves.join(' | '));
  } else {
    console.log('OK ' + f);
  }
});
process.exitCode = souci ? 1 : 0;
