/* Banc d'essai ARES — verifie l'interpreteur Python et le contenu pedagogique.
   Lancer :  node _test.js                                                     */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.join(__dirname, 'src');
const ctx = vm.createContext({ console, Math, Date, JSON, Map, Set, Number, String, Array, Object, RegExp, isNaN, parseInt, parseFloat, Infinity });
const files = fs.readdirSync(SRC).filter(f => f.endsWith('.js')).sort();
for (const f of files) {
  try { vm.runInContext(fs.readFileSync(path.join(SRC, f), 'utf8'), ctx, { filename: f }); }
  catch (e) { console.error('X  Impossible de charger ' + f + ' : ' + e.message); process.exit(1); }
}

let pass = 0, fail = 0;
const bad = [];
function ok(cond, label, detail) {
  if (cond) pass++;
  else { fail++; bad.push(label + (detail ? '\n     ' + detail : '')); }
}
function py(src, inputs) { return ctx.PyRun.run(src, { inputs: inputs || [], seed: 7 }); }
function out(src, expected, label, inputs) {
  const r = py(src, inputs);
  if (r.error) return ok(false, label, 'ERREUR ' + r.errorType + ' ligne ' + r.errorLine + ' : ' + r.error);
  const got = r.out.replace(/\n$/, '');
  ok(got === expected, label, 'attendu ' + JSON.stringify(expected) + '\n     obtenu ' + JSON.stringify(got));
}
function errType(src, type, label) {
  const r = py(src);
  ok(r.errorType === type, label, 'attendu ' + type + ', obtenu ' + (r.errorType || 'aucune erreur'));
}

/* ---------------- 1. Bases ---------------- */
out('print("Bonjour ARES")', 'Bonjour ARES', 'print texte');
out('print(2 + 3 * 4)', '14', 'priorites');
out('print(7 / 2)', '3.5', 'division reelle');
out('print(10 / 2)', '5.0', 'division donne un float');
out('print(7 // 2, 7 % 2)', '3 1', 'division entiere et modulo');
out('print(2 ** 10)', '1024', 'puissance');
out('print(-3 ** 2)', '-9', 'priorite puissance/unaire');
out('x = 5\ny = x + 2\nprint(y)', '7', 'variables');
out('a = b = 3\nprint(a, b)', '3 3', 'affectation chainee');
out('x = 4\nx += 6\nx *= 2\nprint(x)', '20', 'operateurs augmentes');
out('print("ab" * 3)', 'ababab', 'texte multiplie');
out('print("Ares" + " " + "Forge")', 'Ares Forge', 'concatenation');
out('print(len("bonjour"))', '7', 'len texte');
out('print(int("42") + 1)', '43', 'int()');
out('print(float("2.5") * 2)', '5.0', 'float()');
out('print(str(12) + "3")', '123', 'str()');
out('print(type(3), type(3.0), type("a"), type([1]), type(True))', "int float str list bool", 'type()');
out('print(round(3.14159, 2))', '3.14', 'round');
out('print(abs(-7))', '7', 'abs');
out('print(True and False, True or False, not True)', 'False True False', 'booleens');
out('print(10 > 3, 10 == 10, 10 != 3, 3 <= 3)', 'True True True True', 'comparaisons');
out('print(1 < 5 < 10)', 'True', 'comparaison chainee');
out('print("a" in "chat", "z" in "chat")', 'True False', 'in sur texte');

/* ---------------- 2. f-strings ---------------- */
out('nom = "Lea"\nprint(f"Salut {nom} !")', 'Salut Lea !', 'f-string simple');
out('a = 3\nprint(f"{a} x 2 = {a * 2}")', '3 x 2 = 6', 'f-string avec calcul');
out('p = 12.3456\nprint(f"{p:.2f}")', '12.35', 'f-string format .2f');
out('print(f"{5:>4}|")', '   5|', 'f-string alignement');
out('print("Note : {}/20".format(15))', 'Note : 15/20', 'format()');

/* ---------------- 3. Conditions ---------------- */
out('age = 15\nif age >= 18:\n    print("majeur")\nelse:\n    print("mineur")', 'mineur', 'if/else');
out('n = 0\nif n > 0:\n    print("+")\nelif n < 0:\n    print("-")\nelse:\n    print("zero")', 'zero', 'elif');
out('x = 7\nif x % 2 == 0:\n    print("pair")\nelse:\n    print("impair")', 'impair', 'parite');
out('note = 14\nprint("admis" if note >= 10 else "recale")', 'admis', 'expression conditionnelle');
out('if True:\n    if False:\n        print("non")\n    else:\n        print("imbrique")', 'imbrique', 'if imbrique');

/* ---------------- 4. Boucles ---------------- */
out('for i in range(3):\n    print(i)', '0\n1\n2', 'for range');
out('for i in range(1, 4):\n    print(i)', '1\n2\n3', 'range depart');
out('for i in range(10, 0, -3):\n    print(i)', '10\n7\n4\n1', 'range pas negatif');
out('total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)', '5050', 'somme 1..100');
out('i = 0\nwhile i < 3:\n    print(i)\n    i += 1', '0\n1\n2', 'while');
out('for c in "abc":\n    print(c)', 'a\nb\nc', 'for sur texte');
out('for i in range(10):\n    if i == 3:\n        break\n    if i % 2 == 0:\n        continue\n    print(i)', '1', 'break et continue');
out('for i in range(2):\n    for j in range(2):\n        print(i, j)', '0 0\n0 1\n1 0\n1 1', 'boucles imbriquees');
out('n = 5\nf = 1\nwhile n > 1:\n    f *= n\n    n -= 1\nprint(f)', '120', 'factorielle');

/* ---------------- 5. Listes / dicos / tuples ---------------- */
out('l = [3, 1, 2]\nl.append(4)\nprint(l)', '[3, 1, 2, 4]', 'append');
out('l = [3, 1, 2]\nl.sort()\nprint(l)', '[1, 2, 3]', 'sort');
out('l = ["b", "a"]\nprint(sorted(l))', "['a', 'b']", 'sorted texte + repr');
out('l = [1, 2, 3]\nprint(l[0], l[-1], len(l))', '1 3 3', 'indices');
out('l = [1, 2, 3, 4, 5]\nprint(l[1:3], l[:2], l[::-1])', '[2, 3] [1, 2] [5, 4, 3, 2, 1]', 'tranches');
out('m = "python"\nprint(m[0], m[-1], m[1:4], m[::-1])', 'p n yth nohtyp', 'tranches de texte');
out('l = [1, 2, 3]\nprint(sum(l), min(l), max(l))', '6 1 3', 'sum/min/max');
out('l = [1, 2, 3]\nl.pop()\nl.remove(1)\nprint(l)', '[2]', 'pop/remove');
out('notes = {"maths": 15, "svt": 12}\nprint(notes["maths"])', '15', 'dico lecture');
out('d = {}\nd["a"] = 1\nd["b"] = 2\nprint(d)', "{'a': 1, 'b': 2}", 'dico ecriture');
out('d = {"a": 1}\nprint(d.get("z", 0), "a" in d)', '0 True', 'dico get/in');
out('d = {"a": 1, "b": 2}\nfor k, v in d.items():\n    print(k, v)', 'a 1\nb 2', 'items + depaquetage');
out('t = (1, 2)\na, b = t\nprint(a, b)', '1 2', 'tuple');
out('for i, x in enumerate(["a", "b"]):\n    print(i, x)', '0 a\n1 b', 'enumerate');
out('for a, b in zip([1, 2], ["x", "y"]):\n    print(a, b)', '1 x\n2 y', 'zip');
out('print([x * 2 for x in range(4)])', '[0, 2, 4, 6]', 'comprehension');
out('print([x for x in range(10) if x % 3 == 0])', '[0, 3, 6, 9]', 'comprehension filtree');
out('mots = "un deux trois".split()\nprint(mots, len(mots))', "['un', 'deux', 'trois'] 3", 'split');
out('print("-".join(["a", "b", "c"]))', 'a-b-c', 'join');
out('print("Bonjour".upper(), "AB".lower(), " x ".strip())', 'BONJOUR ab x', 'methodes texte');
out('print("chat".replace("ch", "r"))', 'rat', 'replace');
out('print("banane".count("a"), "banane".find("n"))', '2 2', 'count/find');
out('print("42".isdigit(), "a1".isalpha())', 'True False', 'isdigit/isalpha');

/* ---------------- 6. Fonctions ---------------- */
out('def salut(nom):\n    return "Salut " + nom\nprint(salut("Zoe"))', 'Salut Zoe', 'fonction avec retour');
out('def carre(x):\n    return x * x\nprint(carre(5))', '25', 'fonction carre');
out('def bonjour(nom="ami"):\n    print("Bonjour", nom)\nbonjour()\nbonjour("Max")', 'Bonjour ami\nBonjour Max', 'parametre par defaut');
out('def add(a, b):\n    return a + b\nprint(add(b=2, a=1))', '3', 'arguments nommes');
def_rec = 'def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\nprint(fact(5))';
out(def_rec, '120', 'recursivite');
out('def rien():\n    pass\nprint(rien())', 'None', 'fonction sans return');
out('def stats(l):\n    return min(l), max(l)\na, b = stats([4, 9, 1])\nprint(a, b)', '1 9', 'retour multiple');
out('f = lambda x: x + 1\nprint(f(4))', '5', 'lambda');
out('print(sorted(["bbb", "a", "cc"], key=len))', "['a', 'cc', 'bbb']", 'sorted avec key');
out('compteur = 0\ndef inc():\n    global compteur\n    compteur += 1\ninc()\ninc()\nprint(compteur)', '2', 'global');

/* ---------------- 7. input ---------------- */
out('nom = input("Ton nom ? ")\nprint("Salut " + nom)', 'Ton nom ? Lea\nSalut Lea', 'input simule', ['Lea']);
out('n = int(input())\nprint(n * 2)', '21\n42', 'input converti', ['21']);

/* ---------------- 8. Classes / exceptions / modules ---------------- */
out('class Chien:\n    def __init__(self, nom):\n        self.nom = nom\n    def aboyer(self):\n        return self.nom + " : Wouf !"\nc = Chien("Rex")\nprint(c.aboyer())', 'Rex : Wouf !', 'classe simple');
out('class A:\n    def salut(self):\n        return "A"\nclass B(A):\n    pass\nprint(B().salut())', 'A', 'heritage');
out('class P:\n    def __init__(self, n):\n        self.n = n\n    def __str__(self):\n        return "P(" + str(self.n) + ")"\nprint(P(3))', 'P(3)', '__str__');
out('try:\n    x = int("abc")\nexcept ValueError:\n    print("pas un nombre")', 'pas un nombre', 'try/except');
out('try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print("division impossible")\nfinally:\n    print("fin")', 'division impossible\nfin', 'finally');
out('import math\nprint(math.sqrt(16), math.floor(2.7), math.pi > 3)', '4.0 2 True', 'module math');
out('from math import sqrt\nprint(sqrt(9))', '3.0', 'from import');
out('import random\nn = random.randint(1, 6)\nprint(1 <= n <= 6)', 'True', 'random.randint borne');
out('import random\nprint(random.choice(["a"]) )', 'a', 'random.choice');

/* ---------------- 8bis. Niveau ULTRA ---------------- */
out('mots = ["ab", "c"]\nprint({m: len(m) for m in mots})', "{'ab': 2, 'c': 1}", 'comprehension de dictionnaire');
out('print(sum(n * 2 for n in [1, 2, 3]))', '12', 'expression generatrice');
out('def f():\n    print("main")\n\nif __name__ == "__main__":\n    f()', 'main', "idiome if __name__ == '__main__'");
out('print(__name__)', '__main__', '__name__ vaut __main__');
out('nombre: int = 5\nprint(nombre)', '5', 'annotation de type sur variable');
out('def f(x: int) -> int:\n    resultat: int = x * 2\n    return resultat\nprint(f(3))', '6', 'annotations dans une fonction');
out('x: int\nx = 7\nprint(x)', '7', 'annotation seule puis affectation separee');
out('class P:\n    def __init__(self, n):\n        self.n = n\n    def __repr__(self):\n        return f"P({self.n})"\nprint([P(1), P(2)])', '[P(1), P(2)]', '__repr__ personnalise utilise dans une liste');
out('print(all(l in "abc" for l in "ab"), any(x > 5 for x in [1, 9]))', 'True True', 'all/any avec generateur');
out('class A:\n    def __init__(self, n):\n        self.n = n\nclass B(A):\n    def __init__(self, n, m):\n        super().__init__(n)\n        self.m = m\nb = B(1, 2)\nprint(b.n, b.m)', '1 2', 'super().__init__');
out('class A:\n    def dis(self):\n        return "A"\nclass B(A):\n    def dis(self):\n        return super().dis() + "B"\nprint(B().dis())', 'AB', 'super() sur une methode');
out('try:\n    raise ValueError("mauvaise valeur")\nexcept ValueError as e:\n    print("attrape :", e)', 'attrape : mauvaise valeur', 'raise ValueError + as e');
out('def f(x):\n    if x < 0:\n        raise ValueError("negatif")\n    return x\nprint(f(3))\ntry:\n    f(-1)\nexcept ValueError as e:\n    print(e)', '3\nnegatif', 'raise dans une fonction');
out('print(sorted([{"n": 2}, {"n": 1}], key=lambda d: d["n"])[0]["n"])', '1', 'sorted avec lambda sur dico');
out('print(f"{\'x\':<5}|{12.3456:>8.2f}|")', 'x    |   12.35|', 'formats alignes en f-string');

/* ---------------- 9. Erreurs pedagogiques ---------------- */
errType('print(x)', 'NameError', 'NameError');
errType('print("a" + 1)', 'TypeError', 'TypeError texte + nombre');
errType('print(1 / 0)', 'ZeroDivisionError', 'ZeroDivisionError');
errType('l = [1]\nprint(l[5])', 'IndexError', 'IndexError');
errType('d = {}\nprint(d["x"])', 'KeyError', 'KeyError');
errType('print(int("abc"))', 'ValueError', 'ValueError');
errType('if True\n    print(1)', 'SyntaxError', 'SyntaxError deux-points manquants');
errType('if True:\nprint(1)', 'IndentationError', 'IndentationError');
errType('while True:\n    pass', 'BoucleInfinie', 'boucle infinie stoppee');
errType('print("hello)', 'SyntaxError', 'guillemet non ferme');
errType('import numpy', 'ModuleNotFoundError', 'module absent');
ok(py('print(x)').errorLine === 1, 'numero de ligne dans l erreur');
ok(py('a = 1\nb = 2\nprint(c)').errorLine === 3, 'numero de ligne correct sur 3 lignes');

/* ---------------- 10. Programmes complets ---------------- */
out(
  'def fizzbuzz(n):\n' +
  '    for i in range(1, n + 1):\n' +
  '        if i % 15 == 0:\n' +
  '            print("FizzBuzz")\n' +
  '        elif i % 3 == 0:\n' +
  '            print("Fizz")\n' +
  '        elif i % 5 == 0:\n' +
  '            print("Buzz")\n' +
  '        else:\n' +
  '            print(i)\n' +
  'fizzbuzz(5)', '1\n2\nFizz\n4\nBuzz', 'FizzBuzz');
out(
  'panier = {"pain": 1.2, "lait": 0.9}\n' +
  'total = 0\n' +
  'for produit, prix in panier.items():\n' +
  '    total += prix\n' +
  'print(f"Total : {total:.2f} euros")', 'Total : 2.10 euros', 'panier + f-string');
out(
  'mot = "kayak"\n' +
  'if mot == mot[::-1]:\n' +
  '    print("palindrome")\n' +
  'else:\n' +
  '    print("non")', 'palindrome', 'palindrome');

console.log('\n=== INTERPRETEUR PYTHON ===');
console.log('  ' + pass + ' verifications OK, ' + fail + ' echec(s)');
if (bad.length) { console.log('\nEchecs :'); bad.forEach(b => console.log('  X ' + b)); }

/* ================= CONTENU PEDAGOGIQUE =================
   Regle d'or : chaque solution de reference doit passer ses propres tests,
   chaque bloc de code marque "run" doit s'executer sans erreur,
   et chaque quiz doit avoir une bonne reponse valide.                     */
const cPass = { n: 0 }, cBad = [];
function cok(cond, label, detail) {
  if (cond) cPass.n++;
  else cBad.push(label + (detail ? '\n     ' + detail : ''));
}

function allPaths() {
  const list = [];
  for (const k of Object.keys(ctx)) {
    if (/^PATH_/.test(k) && ctx[k] && ctx[k].days) list.push(ctx[k]);
  }
  if (ctx.PRO_PATHS) ctx.PRO_PATHS.forEach(p => list.push(p));
  return list;
}
function eachLesson(fn) {
  allPaths().forEach(p => (p.days || []).forEach(d => (d.lessons || []).forEach(l => fn(l, p, d))));
}

const ids = new Set();
let nLessons = 0, nEx = 0, nQuiz = 0, nBlocks = 0;

eachLesson((lesson, path) => {
  nLessons++;
  cok(!ids.has(lesson.id), 'id unique : ' + lesson.id);
  ids.add(lesson.id);
  cok(!!lesson.title && !!lesson.goal, 'titre + objectif : ' + lesson.id);
  cok(typeof lesson.xp === 'number' && lesson.xp > 0, 'xp defini : ' + lesson.id);

  (lesson.blocks || []).forEach((b, i) => {
    nBlocks++;
    if (b.t === 'code' && b.run && path.lang === 'python') {
      const r = py(b.v, ['7', '3', 'test', '5']);
      if (b.err) { cok(!!r.error, 'bloc-demo qui doit lever une erreur : ' + lesson.id + ' #' + i); return; }
      cok(!r.error, 'bloc executable ' + lesson.id + ' #' + i,
        r.error ? r.errorType + ' ligne ' + r.errorLine + ' : ' + r.error + '\n     ' + b.v.split('\n')[0] : '');
    }
    if (b.t === 'code' && b.run && path.lang === 'js') {
      if (b.dom) {   // manipule la page : verifiable seulement dans le navigateur
        cok(!ctx.Runner.parseOK(b.v), 'bloc DOM syntaxiquement valide : ' + lesson.id + ' #' + i,
          ctx.Runner.parseOK(b.v) || '');
        return;
      }
      const r = ctx.Runner.runJS(b.v, {});
      if (b.err) { cok(!!r.error, 'bloc-demo JS qui doit echouer : ' + lesson.id + ' #' + i); return; }
      cok(!r.error, 'bloc JS executable ' + lesson.id + ' #' + i, r.error || '');
    }
  });

  (lesson.ex || []).forEach((ex, i) => {
    nEx++;
    const tag = lesson.id + ' · exo ' + (i + 1);
    cok(!!ex.brief, 'enonce present : ' + tag);
    cok(!!ex.solution, 'solution de reference : ' + tag);
    cok(!!ex.hint, 'indice present : ' + tag);
    if (!ex.solution) return;
    const verdict = ctx.Runner.check(path.lang, ex.solution, ex);
    cok(verdict.ok, 'LA SOLUTION PASSE SES TESTS : ' + tag,
      verdict.ok ? '' : verdict.title + ' — ' + verdict.msg +
        (verdict.expected !== undefined ? '\n     attendu : ' + JSON.stringify(verdict.expected) + '\n     obtenu  : ' + JSON.stringify(verdict.got) : ''));
    // le starter ne doit surtout pas deja passer les tests
    if (ex.starter && ex.tests && ex.tests.some(t => t.expect !== undefined)) {
      const v2 = ctx.Runner.check(path.lang, ex.starter, ex);
      cok(!v2.ok, 'le code de depart ne passe pas deja : ' + tag);
    }
  });

  (lesson.quiz || []).forEach((q, i) => {
    nQuiz++;
    const tag = lesson.id + ' · quiz ' + (i + 1);
    cok(Array.isArray(q.opts) && q.opts.length >= 2, 'au moins 2 options : ' + tag);
    cok(typeof q.a === 'number' && q.a >= 0 && q.a < q.opts.length, 'bonne reponse valide : ' + tag);
    cok(!!q.why, 'explication fournie : ' + tag);
  });
});

/* jeux : chaque banque doit exister et etre coherente */
if (ctx.GAMES) {
  eachLesson(lesson => {
    if (lesson.game) {
      const bank = ctx.GAMES[lesson.game.type] && ctx.GAMES[lesson.game.type][lesson.game.bank];
      cok(!!bank && bank.length > 0, 'banque de jeu ' + lesson.game.type + '/' + lesson.game.bank + ' (' + lesson.id + ')');
    }
  });
  Object.keys(ctx.GAMES.bughunt || {}).forEach(k => {
    ctx.GAMES.bughunt[k].forEach((g, i) => {
      cok(g.bad >= 0 && g.bad < g.lines.length, 'bughunt ' + k + '#' + i + ' : ligne fautive valide');
      cok(!!g.why, 'bughunt ' + k + '#' + i + ' : explication');
    });
  });
  Object.keys(ctx.GAMES.predict || {}).forEach(k => {
    ctx.GAMES.predict[k].forEach((g, i) => {
      const r = (g.lang === 'js') ? ctx.Runner.runJS(g.code, {}) : py(g.code);
      cok(!r.error && ctx.Runner.norm(r.out) === ctx.Runner.norm(g.answer),
        'predict ' + k + '#' + i + ' : reponse conforme au vrai resultat',
        r.error ? r.error : 'attendu ' + JSON.stringify(g.answer) + ', reel ' + JSON.stringify(ctx.Runner.norm(r.out)));
    });
  });
  Object.keys(ctx.GAMES.order || {}).forEach(k => {
    ctx.GAMES.order[k].forEach((g, i) => {
      cok(g.lines.length >= 3, 'order ' + k + '#' + i + ' : au moins 3 lignes');
      if (g.lang === 'python' || !g.lang) {
        const r = py(g.lines.join('\n'));
        cok(!r.error, 'order ' + k + '#' + i + ' : le code remis dans l ordre s execute', r.error || '');
      }
    });
  });
}

/* Aucun accent ne doit se glisser dans un identifiant de code : on retire
   commentaires et chaines de caracteres, ce qui reste doit etre pur ASCII. */
function codeSansTexte(code, lang) {
  let c = String(code);
  if (lang === 'python') c = c.replace(/#[^\n]*/g, '');
  else c = c.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  if (lang === 'html') c = c.replace(/>[^<]*</g, '><');          // texte affiche
  return c.replace(/"(?:[^"\\]|\\.)*"/g, '""')
          .replace(/'(?:[^'\\]|\\.)*'/g, "''")
          .replace(/`(?:[^`\\]|\\.)*`/g, '``');
}
eachLesson((lesson, path) => {
  const morceaux = [];
  (lesson.blocks || []).forEach((b, i) => { if (b.t === 'code') morceaux.push([b.v, b.lang || path.lang, 'bloc ' + i]); });
  (lesson.ex || []).forEach((ex, i) => {
    if (ex.solution) morceaux.push([ex.solution, path.lang, 'solution ' + (i + 1)]);
    if (ex.starter) morceaux.push([ex.starter, path.lang, 'depart ' + (i + 1)]);
  });
  if (lesson.dom) morceaux.push([lesson.dom, 'html', 'dom']);
  morceaux.forEach(([code, lang, quoi]) => {
    const reste = codeSansTexte(code, lang);
    const fautif = reste.match(/[A-Za-z_]*[àâäéèêëîïôöùûüçœÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ][A-Za-z_]*/);
    cok(!fautif, 'aucun accent dans le code : ' + lesson.id + ' ' + quoi,
      fautif ? 'trouve « ' + fautif[0] + ' » hors chaine et hors commentaire' : '');
  });
});

console.log('\n=== CONTENU PEDAGOGIQUE ===');
console.log('  ' + nLessons + ' lecons · ' + nEx + ' exercices · ' + nQuiz + ' questions de quiz · ' + nBlocks + ' blocs');
console.log('  ' + cPass.n + ' verifications OK, ' + cBad.length + ' echec(s)');
if (cBad.length) { console.log('\nEchecs :'); cBad.forEach(b => console.log('  X ' + b)); }

const total = fail + cBad.length;
console.log('\n' + (total ? 'X  ' + total + ' PROBLEME(S) A CORRIGER' : 'OK — tout est vert (' + (pass + cPass.n) + ' verifications)'));
process.exitCode = total ? 1 : 0;
