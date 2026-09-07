/* =====================================================================
   ARES — exécution du code eleve (JavaScript, HTML) et correction auto.
   Tout est local : rien n'est envoye sur un serveur.
   ===================================================================== */
var Runner = (function () {
  'use strict';

  /* ---------- normalisation des sorties ---------- */
  function norm(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/\r/g, '')
      .split('\n').map(function (l) { return l.replace(/\s+$/, ''); }).join('\n')
      .replace(/\n+$/, '').trim();
  }
  function loose(s) {
    var t = norm(s).toLowerCase();
    if (t.normalize) t = t.normalize('NFD').replace(/[̀-ͯ]/g, '');
    return t.replace(/\s+/g, ' ');
  }

  /* ---------- garde anti-boucle-infinie pour JavaScript ---------- */
  // On réécrit uniquement les en-têtes de boucle : while (c) -> while (__G() && (c))
  function guardLoops(code) {
    var out = '', i = 0;
    while (i < code.length) {
      var c = code[i];
      // sauter chaînes et commentaires
      if (c === '"' || c === "'" || c === '`') {
        var q = c; out += c; i++;
        while (i < code.length) { out += code[i]; if (code[i] === '\\') { out += code[i + 1] || ''; i += 2; continue; } if (code[i] === q) { i++; break; } i++; }
        continue;
      }
      if (c === '/' && code[i + 1] === '/') { while (i < code.length && code[i] !== '\n') { out += code[i]; i++; } continue; }
      if (c === '/' && code[i + 1] === '*') { out += '/*'; i += 2; while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) { out += code[i]; i++; } out += '*/'; i += 2; continue; }
      var kw = /^(while|for)\b/.exec(code.slice(i, i + 6));
      var prev = out.replace(/\s+$/, '').slice(-1);
      if (kw && !/[.\w$]/.test(prev)) {
        var j = i + kw[1].length;
        while (j < code.length && /\s/.test(code[j])) j++;
        if (code[j] === '(') {
          var depth = 0, start = j, semis = [];
          for (var k = j; k < code.length; k++) {
            if (code[k] === '(') depth++;
            else if (code[k] === ')') { depth--; if (!depth) { var end = k; break; } }
            else if (code[k] === ';' && depth === 1) semis.push(k);
          }
          if (typeof end === 'number') {
            var header = code.slice(start + 1, end);
            var newHeader;
            if (kw[1] === 'for' && semis.length >= 2) {
              var a = code.slice(start + 1, semis[0]), b = code.slice(semis[0] + 1, semis[1]), d = code.slice(semis[1] + 1, end);
              newHeader = a + ';__G()&&(' + (b.trim() === '' ? 'true' : b) + ');' + d;
            } else if (kw[1] === 'while') {
              newHeader = '__G()&&(' + header + ')';
            } else {
              newHeader = header;  // for ... of / in : garde posee dans le corps
            }
            out += code.slice(i, start + 1) + newHeader + ')';
            i = end + 1;
            if (kw[1] === 'for' && semis.length < 2) {
              var m = i; while (m < code.length && /\s/.test(code[m])) m++;
              if (code[m] === '{') { out += code.slice(i, m + 1) + '__G();'; i = m + 1; }
            }
            end = undefined;
            continue;
          }
        }
      }
      out += c; i++;
    }
    return out;
  }

  /* ---------- exécution JavaScript ---------- */
  function runJS(code, opts) {
    opts = opts || {};
    var lines = [], res = { out: '', error: null, lines: lines, value: undefined };
    var started = Date.now(), steps = 0;
    function guard() {
      steps++;
      if (steps > 400000) throw new Error('__ARES_LOOP__');
      if ((steps & 1023) === 0 && Date.now() - started > 2500) throw new Error('__ARES_LOOP__');
      return true;
    }
    function push(args) {
      lines.push(args.map(fmt).join(' '));
      if (lines.length > 400) throw new Error('__ARES_OUT__');
    }
    var consoleShim = {
      log: function () { push([].slice.call(arguments)); },
      info: function () { push([].slice.call(arguments)); },
      warn: function () { push([].slice.call(arguments)); },
      error: function () { push([].slice.call(arguments)); },
      table: function () { push([].slice.call(arguments)); }
    };
    // setTimeout deterministe : les callbacks sont mis en file puis executes
    // après le script principal, dans l'ordre des delais. Même ordre que la vraie
    // vie, mais sans attente réelle — ce qui rend l'asynchrone testable.
    var timers = [], seq = 0;
    function setTimeoutShim(f, delay) {
      if (typeof f !== 'function') return 0;
      seq++;
      timers.push({ f: f, d: Number(delay) || 0, i: seq, id: seq });
      return seq;
    }
    function clearTimeoutShim(id) {
      for (var i = 0; i < timers.length; i++) {
        if (timers[i].id === id) { timers.splice(i, 1); return; }
      }
    }
    try {
      var body = guardLoops(code);
      var fn = new Function('console', '__G', 'document', 'window', 'alert', 'prompt', 'fetch', 'XMLHttpRequest', 'localStorage',
        'setTimeout', 'clearTimeout', 'setInterval', 'requestAnimationFrame',
        '"use strict";\n' + body + '\n');
      res.value = fn(consoleShim, guard, opts.document, opts.window, function () {}, function () { return ''; },
        undefined, undefined, undefined, setTimeoutShim, clearTimeoutShim, setTimeoutShim,
        opts.raf || function (f) { return setTimeoutShim(f, 16); });
      var rounds = 0;
      while (timers.length && rounds++ < 3000) {
        timers.sort(function (x, y) { return x.d - y.d || x.i - y.i; });
        timers.shift().f();
      }
    } catch (e) {
      var msg = e && e.message ? e.message : String(e);
      if (msg === '__ARES_LOOP__') res.error = 'Boucle sans fin : ton programme ne s’arrête jamais. Vérifie la condition de ta boucle (elle doit finir par devenir fausse).';
      else if (msg === '__ARES_OUT__') res.error = 'Trop d’affichages (400 lignes max). Réduis le nombre de console.log().';
      else res.error = frenchJSError(e);
    }
    res.out = lines.join('\n');
    return res;
  }

  function frenchJSError(e) {
    var m = (e && e.message) || String(e), name = (e && e.name) || 'Error';
    var t = m;
    if (/is not defined/.test(m)) t = 'Le nom « ' + m.split(' ')[0] + ' » n’existe pas. Déclare-le avec let/const, ou vérifie l’orthographe.';
    else if (/is not a function/.test(m)) t = m.replace(/is not a function/, 'n’est pas une fonction (vérifie le nom de la methode).');
    else if (/Unexpected token/.test(m)) t = 'Erreur de syntaxe : ' + m + '. Souvent une parenthèse, une accolade ou un point-virgule manquant.';
    else if (/Unexpected end of input/.test(m)) t = 'Il manque une accolade fermante « } » ou une parenthèse « ) ».';
    else if (/Assignment to constant/.test(m)) t = 'Impossible de changer une variable déclarée avec const. Utilise let si la valeur doit changer.';
    else if (/Cannot read propert/.test(m)) t = m + ' — tu utilises une valeur qui vaut undefined ou null.';
    return name + ' : ' + t;
  }

  function fmt(v) {
    if (typeof v === 'string') return v;
    if (v === undefined) return 'undefined';
    if (v === null) return 'null';
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (Array.isArray(v)) return '[' + v.map(function (x) { return typeof x === 'string' ? '"' + x + '"' : fmt(x); }).join(', ') + ']';
    if (typeof v === 'function') return 'function ' + (v.name || '');
    try { return JSON.stringify(v); } catch (e) { return String(v); }
  }

  /* ---------- correction d'un exercice ---------- */
  // ex = { tests:[{in:[], expect:'...'}], expect:'...', must:[[regex,'message']], mustnot:[[regex,'message']] }
  function checkRules(code, ex) {
    var i;
    if (ex.must) for (i = 0; i < ex.must.length; i++) {
      var re = new RegExp(ex.must[i][0], ex.must[i][2] || '');
      if (!re.test(code)) return { ok: false, title: 'Il manque quelque chose', msg: ex.must[i][1] };
    }
    if (ex.mustnot) for (i = 0; i < ex.mustnot.length; i++) {
      var re2 = new RegExp(ex.mustnot[i][0], ex.mustnot[i][2] || '');
      if (re2.test(code)) return { ok: false, title: 'Pas comme ça', msg: ex.mustnot[i][1] };
    }
    return null;
  }

  function diffHint(expected, got) {
    var e = norm(expected), g = norm(got);
    if (!g) return 'Ton programme n’affiche rien. As-tu bien utilise print (Python) ou console.log (JavaScript) ?';
    if (loose(e) === loose(g)) return 'C’est presque bon ! Il y a une différence de majuscules, d’accents ou d’espaces. Recopie le texte attendu a l’identique.';
    var el = e.split('\n'), gl = g.split('\n');
    if (el.length !== gl.length) return 'Nombre de lignes différent : attendu ' + el.length + ', obtenu ' + gl.length + '.';
    for (var i = 0; i < el.length; i++) if (el[i] !== gl[i]) return 'La ligne ' + (i + 1) + ' ne correspond pas.';
    return '';
  }

  function checkPython(code, ex) {
    var r = checkRules(code, ex);
    if (r) return r;
    var tests = ex.tests || [{ in: ex.inputs || [], expect: ex.expect }];
    for (var i = 0; i < tests.length; i++) {
      var t = tests[i];
      var run = PyRun.run(code, { inputs: t.in || [], seed: t.seed !== undefined ? t.seed : 7 });
      if (run.error) {
        return { ok: false, title: run.errorType + (run.errorLine ? ' — ligne ' + run.errorLine : ''), msg: run.error, out: run.out };
      }
      if (t.expect !== undefined && norm(run.out) !== norm(t.expect)) {
        return {
          ok: false, title: 'Pas encore la bonne sortie',
          msg: diffHint(t.expect, run.out) + (tests.length > 1 ? ' (essai ' + (i + 1) + '/' + tests.length + (t.in && t.in.length ? ', saisie : ' + t.in.join(', ') : '') + ')' : ''),
          expected: norm(t.expect), got: norm(run.out)
        };
      }
      if (t.contains) for (var c = 0; c < t.contains.length; c++)
        if (norm(run.out).indexOf(t.contains[c]) < 0)
          return { ok: false, title: 'Il manque une information', msg: 'La sortie devrait contenir « ' + t.contains[c] + ' ».', got: norm(run.out) };
    }
    return { ok: true, title: 'Forge réussie !', msg: ex.success || 'Ton code fait exactement ce qui etait demande.' };
  }

  // Vérifie qu'un code JavaScript est syntaxiquement valide sans l'exécuter.
  function parseOK(code) {
    try { new Function(code); return null; }
    catch (e) { return frenchJSError(e); }
  }

  function checkJS(code, ex) {
    var r = checkRules(code, ex);
    if (r) return r;
    // Exercice sur le DOM : la vérification du résultat visuel est faite par
    // l'application (dans l'aperçu réel). Ici on valide les règles et la syntaxe.
    if (ex.dom) {
      var syn = parseOK(code);
      if (syn) return { ok: false, title: 'Le code ne compile pas', msg: syn };
      return { ok: true, title: 'Syntaxe valide', msg: 'Vérification du rendu en cours...', domPending: true };
    }
    var tests = ex.tests || [{ expect: ex.expect }];
    for (var i = 0; i < tests.length; i++) {
      var t = tests[i];
      var pre = t.pre ? t.pre + '\n' : '';
      var post = t.post ? '\n' + t.post : '';
      var run = runJS(pre + code + post, {});
      if (run.error) return { ok: false, title: 'Le code plante', msg: run.error, out: run.out };
      if (t.expect !== undefined && norm(run.out) !== norm(t.expect))
        return {
          ok: false, title: 'Pas encore la bonne sortie', msg: diffHint(t.expect, run.out),
          expected: norm(t.expect), got: norm(run.out)
        };
      if (t.contains) for (var c = 0; c < t.contains.length; c++)
        if (norm(run.out).indexOf(t.contains[c]) < 0)
          return { ok: false, title: 'Il manque une information', msg: 'La sortie devrait contenir « ' + t.contains[c] + ' ».', got: norm(run.out) };
    }
    return { ok: true, title: 'Étincelle réussie !', msg: ex.success || 'Ton code produit exactement le résultat attendu.' };
  }

  function stripTags(html) {
    return html.replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ')
      .replace(/\s+([.,!?;:])/g, '$1').trim();
  }
  function checkHTML(code, ex) {
    var r = checkRules(code, ex);
    if (r) return r;
    if (ex.text) {
      var txt = stripTags(code);
      for (var i = 0; i < ex.text.length; i++)
        if (loose(txt).indexOf(loose(ex.text[i])) < 0)
          return { ok: false, title: 'Texte manquant', msg: 'La page doit afficher « ' + ex.text[i] + ' ».' };
    }
    var open = (code.match(/<([a-zA-Z][a-zA-Z0-9]*)\b(?![^>]*\/>)[^>]*>/g) || []).length;
    if (ex.balance !== false) {
      var tags = {};
      var re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g, m;
      var VOID = ['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'area', 'col'];
      while ((m = re.exec(code))) {
        var name = m[2].toLowerCase();
        if (VOID.indexOf(name) >= 0 || m[3] === '/') continue;
        tags[name] = (tags[name] || 0) + (m[1] ? -1 : 1);
      }
      for (var t in tags) if (tags[t] > 0)
        return { ok: false, title: 'Balise non fermee', msg: 'La balise <' + t + '> est ouverte mais jamais fermee (</' + t + '>).' };
      for (var t2 in tags) if (tags[t2] < 0)
        return { ok: false, title: 'Balise fermee en trop', msg: 'Il y a un </' + t2 + '> sans <' + t2 + '> correspondant.' };
    }
    return { ok: true, title: 'Construction validée !', msg: ex.success || 'Ta page contient tout ce qui etait demande.' };
  }

  // Assembleur : execution reelle, exactement comme Python (meme forme de
  // resultat, memes principes de comparaison de sortie).
  function checkAsm(code, ex) {
    var r = checkRules(code, ex);
    if (r) return r;
    var tests = ex.tests || [{ expect: ex.expect }];
    for (var i = 0; i < tests.length; i++) {
      var t = tests[i];
      var run = AsmRun.run(code);
      if (run.error) return { ok: false, title: run.errorType + (run.errorLine ? ' — ligne ' + run.errorLine : ''), msg: run.error, out: run.out };
      if (t.expect !== undefined && norm(run.out) !== norm(t.expect))
        return {
          ok: false, title: 'Pas encore la bonne sortie', msg: diffHint(t.expect, run.out),
          expected: norm(t.expect), got: norm(run.out)
        };
      if (t.regs) {
        for (var reg in t.regs) {
          var attendu = t.regs[reg], obtenu = run.regs ? run.regs[AsmRun.normReg(reg)] : undefined;
          if (obtenu !== attendu)
            return { ok: false, title: 'Registre incorrect', msg: 'Le registre ' + reg + ' devrait valoir ' + attendu + ' a la fin, il vaut ' + obtenu + '.' };
        }
      }
    }
    return { ok: true, title: 'Instructions validees !', msg: ex.success || 'Ton programme s’execute exactement comme attendu.' };
  }

  // C / C++ / C# : sans compilateur disponible dans un site statique, la
  // correction verifie la structure du code ecrit (comme pour HTML/CSS),
  // pas son execution reelle.
  function checkPattern(code, ex) {
    var r = checkRules(code, ex);
    if (r) return r;
    return { ok: true, title: 'Code valide !', msg: ex.success || 'Ton code contient exactement ce qui etait demande.' };
  }

  function check(lang, code, ex) {
    if (!code || !code.trim()) return { ok: false, title: 'Editeur vide', msg: 'Écris ton code dans l’editeur avant de forger.' };
    if (lang === 'python') return checkPython(code, ex);
    if (lang === 'js') return checkJS(code, ex);
    if (lang === 'html') return checkHTML(code, ex);
    if (lang === 'asm') return checkAsm(code, ex);
    if (lang === 'c' || lang === 'cpp' || lang === 'csharp') return checkPattern(code, ex);
    return checkHTML(code, ex);
  }

  return {
    runJS: runJS, guardLoops: guardLoops, check: check, norm: norm, stripTags: stripTags, parseOK: parseOK,
    checkPython: checkPython, checkJS: checkJS, checkHTML: checkHTML, fmt: fmt
  };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Runner;
