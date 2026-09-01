/* ARES — assemble src/ en deux fichiers :
   - ares.html  : source de l'artefact (sans doctype/html/body, ajoutes a la publication)
   - index.html : version autonome, ouvrable hors ligne d'un double-clic
   Lancer : node build.js                                                      */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const shell = fs.readFileSync(path.join(SRC, 'shell.html'), 'utf8');
const files = fs.readdirSync(SRC).filter(f => f.endsWith('.js')).sort();

let scripts = '';
for (const f of files) {
  const code = fs.readFileSync(path.join(SRC, f), 'utf8')
    .replace(/\nif \(typeof module !== 'undefined' && module\.exports\)[^\n]*\n?/g, '\n');
  scripts += '\n<script>\n/* ===== ' + f + ' ===== */\n' + code + '\n</script>\n';
}

const body = shell + scripts;
fs.writeFileSync(path.join(__dirname, 'ares.html'), body, 'utf8');

const standalone =
  '<!DOCTYPE html>\n<html lang="fr">\n<head>\n<meta charset="UTF-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  '<meta name="description" content="ARES — apprendre Python, HTML/CSS et JavaScript en 3 jours par langage. Lecons, exercices corriges automatiquement, jeux et projets.">\n' +
  '<style>*{box-sizing:border-box}html,body{margin:0}</style>\n' +
  '</head>\n<body>\n' + body + '\n</body>\n</html>\n';
fs.writeFileSync(path.join(__dirname, 'index.html'), standalone, 'utf8');

const ko = n => (n / 1024).toFixed(0) + ' ko';
console.log('ares.html   ' + ko(Buffer.byteLength(body)));
console.log('index.html  ' + ko(Buffer.byteLength(standalone)));
console.log('modules     ' + files.join(', '));
