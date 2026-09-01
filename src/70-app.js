/* =====================================================================
   ARES — application : navigation, rendu des leçons, atelier de code,
   jeux, progression, badges et déverrouillage ULTRA.
   ===================================================================== */
(function () {
  'use strict';
  if (typeof document === 'undefined') return;   // charge aussi dans node pour les tests

  var FREE = [PATH_PYTHON, PATH_WEB, PATH_JS];
  var PRO = [PATH_PRO_PYTHON, PATH_PRO_WEB, PATH_PRO_JS];
  var ALL = FREE.concat(PRO);

  /* ================= progression ================= */
  var STORE = 'ares.progress.v1';
  var P = { xp: 0, done: {}, ex: {}, quiz: {}, keys: [], badges: [], games: {}, jours: [], vus: 0 };

  function load() {
    try {
      var raw = localStorage.getItem(STORE);
      if (raw) P = Object.assign(P, JSON.parse(raw));
    } catch (e) { /* première visite ou stockage bloque */ }
    if (!Array.isArray(P.keys)) P.keys = [];
    if (!Array.isArray(P.badges)) P.badges = [];
    if (!Array.isArray(P.jours)) P.jours = [];
  }
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(P)); } catch (e) { /* mode privé */ }
    if (typeof CloudSync !== 'undefined' && CloudSync.available && CloudSync.user) CloudSync.schedulePush(P);
  }

  var RANKS = [
    [0, 'Recrue'], [150, 'Apprenti'], [400, 'Forgeron'], [800, 'Hoplite'],
    [1400, 'Centurion'], [2200, 'Champion'], [3200, 'Légende d’ARES'],
    [5000, 'Demi-dieu du Code'], [7500, 'Héraclès Numérique']
  ];
  function rank() {
    var r = RANKS[0], next = null;
    for (var i = 0; i < RANKS.length; i++) {
      if (P.xp >= RANKS[i][0]) r = RANKS[i];
      else { next = RANKS[i]; break; }
    }
    return { nom: r[1], base: r[0], next: next };
  }

  var BADGES = [
    { id: 'premier', ico: '🔥', nom: 'Étincelle', desc: 'Ta première leçon terminée', test: function () { return countDone() >= 1; } },
    { id: 'dix', ico: '⚒️', nom: 'Apprenti', desc: '10 leçons terminées', test: function () { return countDone() >= 10; } },
    { id: 'trente', ico: '🛡️', nom: 'Endurant', desc: '30 leçons terminées', test: function () { return countDone() >= 30; } },
    { id: 'py-j1', ico: '🐍', nom: 'Jour 1 Python', desc: 'Le jour 1 du Serpent boucle', test: function () { return dayDone(PATH_PYTHON, 0); } },
    { id: 'py-fin', ico: '👑', nom: 'Maître du Serpent', desc: 'Parcours Python libre terminé', test: function () { return pathDone(PATH_PYTHON); } },
    { id: 'web-fin', ico: '🏛️', nom: 'Bâtisseur', desc: 'Parcours HTML/CSS terminé', test: function () { return pathDone(PATH_WEB); } },
    { id: 'js-fin', ico: '⚡', nom: 'Étincelle vive', desc: 'Parcours JavaScript terminé', test: function () { return pathDone(PATH_JS); } },
    { id: 'trois', ico: '🌟', nom: 'Triple forge', desc: 'Les 3 parcours libres terminés', test: function () { return pathDone(PATH_PYTHON) && pathDone(PATH_WEB) && pathDone(PATH_JS); } },
    { id: 'exo25', ico: '🎯', nom: 'Tireur d’élite', desc: '25 exercices réussis', test: function () { return Object.keys(P.ex).length >= 25; } },
    { id: 'exo75', ico: '💎', nom: 'Forgeron d’acier', desc: '75 exercices réussis', test: function () { return Object.keys(P.ex).length >= 75; } },
    { id: 'jeu', ico: '🎮', nom: 'Chasseur de bugs', desc: 'Un score de 8+ a un jeu', test: function () { return Object.keys(P.games).some(function (k) { return P.games[k] >= 8; }); } },
    { id: 'ultra', ico: '🗝️', nom: 'ULTRA', desc: 'Un parcours ULTRA déverrouillé', test: function () { return P.keys.length > 0; } },
    { id: 'pro1', ico: '🏗️', nom: 'Architecte', desc: 'Un projet ULTRA terminé', test: function () { return PRO.some(function (p) { return p.days.some(function (d) { return d.lessons.some(function (l) { return l.kind === 'projet' && P.done[l.id]; }); }); }); } },
    { id: 'assidu', ico: '📅', nom: 'Assidu', desc: 'Revenu 3 jours differents', test: function () { return P.jours.length >= 3; } },
    { id: 'herc-py', ico: '🦁', nom: 'Héraclès du Serpent', desc: 'Les 12 Travaux — Python accomplis', test: function () { for (var i = 1; i <= 12; i++) if (!P.done['ph-' + i]) return false; return true; } },
    { id: 'herc-web', ico: '🏛️', nom: 'Héraclès du Bâtisseur', desc: 'Les 12 Travaux — Web accomplis', test: function () { for (var i = 1; i <= 12; i++) if (!P.done['wh-' + i]) return false; return true; } },
    { id: 'herc-js', ico: '⚡', nom: 'Héraclès de l’Étincelle', desc: 'Les 12 Travaux — JS accomplis', test: function () { for (var i = 1; i <= 12; i++) if (!P.done['jh-' + i]) return false; return true; } },
    { id: 'herc-all', ico: '👑', nom: 'Les 12 Travaux', desc: 'Les 3 séries de 12 Travaux accomplies', test: function () {
        function fait(pre) { for (var i = 1; i <= 12; i++) if (!P.done[pre + i]) return false; return true; }
        return fait('ph-') && fait('wh-') && fait('jh-');
      } }
  ];

  function eachLesson(cb) {
    ALL.forEach(function (p) { p.days.forEach(function (d) { d.lessons.forEach(function (l) { cb(l, p, d); }); }); });
  }
  function findLesson(id) {
    var found = null;
    eachLesson(function (l, p, d) { if (l.id === id) found = { lesson: l, path: p, day: d }; });
    return found;
  }
  function countDone() { return Object.keys(P.done).length; }
  function dayDone(path, i) { return path.days[i].lessons.every(function (l) { return P.done[l.id]; }); }
  function pathDone(path) { return path.days.every(function (d, i) { return dayDone(path, i); }); }
  function pathStats(path) {
    var total = 0, done = 0;
    path.days.forEach(function (d) { d.lessons.forEach(function (l) { total++; if (P.done[l.id]) done++; }); });
    return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0 };
  }
  function unlocked(path) { return !path.pro || P.keys.indexOf(path.id) >= 0 || P.keys.indexOf('all') >= 0; }

  /* clefs de deverrouillage (encodees pour ne pas être lisibles au premier coup d'oeil) */
  var KEYS = {
    'QVJFUy1VTFRSQS0yMDI2': 'all',
    'UExVUy1VTFRSQQ==': 'all',
    'QVJFUy1QWVRIT04tUFJP': 'pro-python',
    'QVJFUy1XRUItUFJP': 'pro-web',
    'QVJFUy1KUy1QUk8=': 'pro-js',
    // 10 cles de vente (une par client), toutes deverrouillent l'integralite d'ARES ULTRA
    'QVJFUy03SzJNLTlYUVA=': 'all',
    'QVJFUy0zVFpMLTZCV0g=': 'all',
    'QVJFUy01Uk5GLThWREs=': 'all',
    'QVJFUy0yTVBYLTRHSFo=': 'all',
    'QVJFUy05V1FULTFGS1I=': 'all',
    'QVJFUy02WFpCLTNOVk0=': 'all',
    'QVJFUy00S1BELTdSVFM=': 'all',
    'QVJFUy04SE1ZLTJRV0w=': 'all',
    'QVJFUy0xVlhLLTVCVE4=': 'all',
    'QVJFUy0zUUdaLTlNRlA=': 'all'
  };
  function tryKey(raw) {
    var k = String(raw || '').trim().toUpperCase().replace(/\s+/g, '');
    var enc;
    try { enc = btoa(k); } catch (e) { return null; }
    var target = KEYS[enc];
    if (!target) return null;
    var added = [];
    if (target === 'all') PRO.forEach(function (p) { if (P.keys.indexOf(p.id) < 0) { P.keys.push(p.id); added.push(p.name); } });
    else if (P.keys.indexOf(target) < 0) { P.keys.push(target); added.push(findPath(target).name); }
    save();
    return added;
  }
  function findPath(id) { for (var i = 0; i < ALL.length; i++) if (ALL[i].id === id) return ALL[i]; return null; }

  function addXP(n, why) {
    P.xp += n;
    var before = P.badges.slice();
    BADGES.forEach(function (b) { if (P.badges.indexOf(b.id) < 0 && b.test()) P.badges.push(b.id); });
    save(); refreshXP();
    if (why) toast('+' + n + ' XP', why);
    P.badges.forEach(function (id) {
      if (before.indexOf(id) < 0) {
        var b = BADGES.filter(function (x) { return x.id === id; })[0];
        if (b) setTimeout(function () { toast(b.ico + ' ' + b.nom, b.desc); sparks(); }, 500);
      }
    });
  }
  function markDone(lessonId, xp) {
    if (P.done[lessonId]) return;
    P.done[lessonId] = true;
    addXP(xp, 'Leçon terminée');
  }

  /* ================= utilitaires DOM ================= */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function $(sel) { return document.querySelector(sel); }

  /* coloration syntaxique legere */
  var PYKW = 'False|None|True|and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield';
  var PYNB = 'print|len|range|str|int|float|bool|list|dict|tuple|set|sum|min|max|abs|round|sorted|reversed|enumerate|zip|type|input|isinstance|open|map|filter|any|all|super|self';
  var JSKW = 'const|let|var|function|return|if|else|for|while|do|break|continue|class|extends|new|this|super|try|catch|finally|throw|typeof|instanceof|of|in|switch|case|default|async|await|yield|delete|void|null|undefined|true|false';
  var JSNB = 'console|document|window|Math|JSON|Object|Array|Number|String|Boolean|Promise|setTimeout|setInterval|requestAnimationFrame|querySelector|querySelectorAll|addEventListener|createElement|appendChild|textContent|length|push|pop|map|filter|reduce|forEach|includes';

  function hl(code, lang) {
    var s = esc(code);
    if (lang === 'html') {
      return s
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="cm">$1</span>')
        .replace(/(&lt;\/?)([a-zA-Z][\w-]*)/g, '$1<span class="tg">$2</span>')
        .replace(/([\w-]+)=("[^"]*"|'[^']*')/g, '<span class="nb">$1</span>=<span class="str">$2</span>');
    }
    var kw = lang === 'js' ? JSKW : PYKW, nb = lang === 'js' ? JSNB : PYNB;
    var re = new RegExp(
      '(' + (lang === 'js' ? '\\/\\/[^\\n]*' : '#[^\\n]*') + ')' +
      '|("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`)' +
      '|\\b(' + kw + ')\\b' +
      '|\\b(' + nb + ')\\b' +
      '|\\b(\\d+\\.?\\d*)\\b', 'g');
    return s.replace(re, function (m, c, str, k, n, num) {
      if (c) return '<span class="cm">' + c + '</span>';
      if (str) return '<span class="str">' + str + '</span>';
      if (k) return '<span class="kw">' + k + '</span>';
      if (n) return '<span class="nb">' + n + '</span>';
      if (num) return '<span class="nu">' + num + '</span>';
      return m;
    });
  }

  /* ================= toasts et etincelles ================= */
  function toast(titre, texte) {
    var t = el('div', 'toast', '<b>' + esc(titre) + '</b><span>' + esc(texte || '') + '</span>');
    $('#toasts').appendChild(t);
    setTimeout(function () {
      t.style.transition = 'opacity .4s, transform .4s';
      t.style.opacity = '0'; t.style.transform = 'translateX(30px)';
      setTimeout(function () { t.remove(); }, 420);
    }, 3600);
  }
  var sparkCanvas, sparkCtx, particles = [];
  function sparks() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!sparkCanvas) {
      sparkCanvas = $('#sparks'); sparkCtx = sparkCanvas.getContext('2d');
    }
    sparkCanvas.width = window.innerWidth; sparkCanvas.height = window.innerHeight;
    var cx = window.innerWidth / 2, cy = window.innerHeight * 0.42;
    for (var i = 0; i < 60; i++) {
      var a = Math.random() * Math.PI * 2, v = 2 + Math.random() * 7;
      particles.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, vie: 1, c: Math.random() < .5 ? '#F6B23D' : '#E2762E' });
    }
    if (particles.length <= 60) requestAnimationFrame(drawSparks);
  }
  function drawSparks() {
    sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    particles = particles.filter(function (p) { return p.vie > 0; });
    particles.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.22; p.vie -= 0.017;
      sparkCtx.globalAlpha = Math.max(0, p.vie);
      sparkCtx.fillStyle = p.c;
      sparkCtx.fillRect(p.x, p.y, 3.2, 3.2);
    });
    sparkCtx.globalAlpha = 1;
    if (particles.length) requestAnimationFrame(drawSparks);
    else sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
  }

  /* ================= execution du code ================= */
  var domToken = { n: 0 };

  function makeDoc(root) {
    return {
      querySelector: function (s) { return root.querySelector(s); },
      querySelectorAll: function (s) { return root.querySelectorAll(s); },
      getElementById: function (id) { return root.querySelector('#' + id); },
      createElement: function (t) { return document.createElement(t); },
      createTextNode: function (t) { return document.createTextNode(t); },
      body: root.firstElementChild ? root : root,
      addEventListener: function (t, f) { root.addEventListener(t, f); },
      documentElement: root
    };
  }

  // Zone d'aperçu : un shadow DOM isole (le CSS de l'élève ne peut pas fuir).
  function makePreview(container, html) {
    container.innerHTML = '';
    var host = el('div');
    host.style.all = 'initial';
    container.appendChild(host);
    var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    root.innerHTML = '<style>:host{all:initial;font-family:system-ui,Arial,sans-serif;color:#111}' +
      '*{box-sizing:border-box;max-width:100%}img{max-width:100%;height:auto}</style>' + (html || '');
    return root;
  }

  function runCode(lang, code, outEl, previewEl, domHTML) {
    if (lang === 'python') {
      var r = PyRun.run(code, { inputs: collectInputs(code) });
      outEl.innerHTML = '';
      if (r.out) outEl.appendChild(document.createTextNode(r.out));
      if (r.error) {
        var e = el('div', 'err', esc('✖ ' + r.errorType + (r.errorLine ? ' — ligne ' + r.errorLine : '') + '\n' + r.error));
        e.style.whiteSpace = 'pre-wrap';
        outEl.appendChild(e);
      } else if (!r.out) outEl.innerHTML = '<span class="muted">(aucun affichage — utilise print() pour voir quelque chose)</span>';
      return r;
    }
    if (lang === 'html') {
      makePreview(previewEl, code);
      if (outEl) outEl.innerHTML = '<span class="muted">Aperçu mis à jour.</span>';
      return { error: null };
    }
    // JavaScript
    var opts = {};
    if (domHTML !== undefined && previewEl) {
      var root = makePreview(previewEl, domHTML);
      opts.document = makeDoc(root);
      opts.window = { document: opts.document };
    }
    domToken.n++;
    var mine = domToken.n;
    opts.raf = function (cb) { if (domToken.n !== mine) return 0; return requestAnimationFrame(cb); };
    var res = Runner.runJS(code, opts);
    outEl.innerHTML = '';
    if (res.out) outEl.appendChild(document.createTextNode(res.out));
    if (res.error) {
      var e2 = el('div', 'err', esc('✖ ' + res.error));
      e2.style.whiteSpace = 'pre-wrap';
      outEl.appendChild(e2);
    } else if (!res.out) outEl.innerHTML = '<span class="muted">(aucun affichage — utilise console.log() pour voir quelque chose)</span>';
    return res;
  }

  // Les entrees d'un programme Python : on prend celles indiquees dans la leçon,
  // sinon quelques valeurs neutres pour que les demonstrations tournent.
  var demoInputs = ['7', '3', 'Nova', '5'];
  function collectInputs(code) { return (code.indexOf('input(') >= 0) ? demoInputs.slice() : []; }

  /* vérification d'un exercice DOM dans un bac a sable invisible */
  function checkDom(lesson, ex, code) {
    var box = el('div');
    box.style.position = 'fixed'; box.style.left = '-10000px'; box.style.top = '0';
    box.style.width = '400px'; box.style.height = '300px';
    document.body.appendChild(box);
    var root = makePreview(box, lesson.dom || '');
    var res = Runner.runJS(code, { document: makeDoc(root), window: {} });
    var verdict = { ok: true, title: 'Parfait !', msg: ex.success || 'La page reagit exactement comme demande.' };
    if (res.error) verdict = { ok: false, title: 'Le code plante', msg: res.error };
    else {
      var steps = ex.expectDom || [];
      for (var i = 0; i < steps.length; i++) {
        var sel = steps[i][0], action = steps[i][1], val = steps[i][2];
        var node = root.querySelector(sel);
        if (!node && action !== 'count') {
          verdict = { ok: false, title: 'Élément introuvable', msg: 'Impossible de trouver « ' + sel + ' » dans la page. As-tu supprime ou renomme quelque chose ?' };
          break;
        }
        try {
          if (action === 'click') node.click();
          else if (action === 'submit') node.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          else if (action === 'setvalue') { node.value = val; node.dispatchEvent(new Event('input', { bubbles: true })); }
          else if (action === 'count') {
            var n = root.querySelectorAll(sel).length;
            if (String(n) !== String(val)) { verdict = { ok: false, title: 'Nombre incorrect', msg: 'Il devrait y avoir ' + val + ' élément(s) « ' + sel +' », il y en a ' + n + '.' }; break; }
          } else if (action === 'text') {
            var t = (node.textContent || '').trim();
            if (t !== val) { verdict = { ok: false, title: 'Texte incorrect', msg: '« ' + sel + ' » devrait afficher « ' + val + ' » mais affiche « ' + t + ' ».' }; break; }
          } else if (action === 'value') {
            if ((node.value || '') !== val) { verdict = { ok: false, title: 'Champ incorrect', msg: 'Le champ « ' + sel + ' » devrait contenir « ' + val + ' ».' }; break; }
          } else if (action === 'contains') {
            if ((node.textContent || '').indexOf(val) < 0) { verdict = { ok: false, title: 'Contenu manquant', msg: '« ' + sel + ' » devrait contenir « ' + val + ' ».' }; break; }
          }
        } catch (err) {
          verdict = { ok: false, title: 'Erreur pendant le test', msg: String(err && err.message || err) };
          break;
        }
      }
    }
    box.remove();
    return verdict;
  }

  /* ================= vues ================= */
  var views = null, current = 'home';

  function show(html, name) {
    views.innerHTML = '';
    var v = el('div', 'view on');
    v.appendChild(html);
    views.appendChild(v);
    current = name;
    window.scrollTo(0, 0);
    document.querySelectorAll('.nav-item').forEach(function (b) {
      b.classList.toggle('on', b.dataset.go === name || b.dataset.path === name);
    });
    $('#rail').classList.remove('open');
  }

  function wrap(inner) { var w = el('div', 'wrap'); w.appendChild(inner); return w; }

  /* ---------- accueil ---------- */
  function viewHome() {
    var box = el('div');
    var stats = { nbLecons: 0, exos: 0, quiz: 0 };
    eachLesson(function (l) { stats.nbLecons++; stats.exos += (l.ex || []).length; stats.quiz += (l.quiz || []).length; });

    var hero = el('section', 'hero');
    hero.innerHTML =
      '<canvas id="forge"></canvas>' +
      '<div class="hero-in">' +
        '<span class="kicker">Apprendre à coder · collège &amp; lycée</span>' +
        '<h1>ARES</h1>' +
        '<div class="sub">La forge du code. Trois langages, trois jours chacun.</div>' +
        '<p class="lead">Python, HTML/CSS et JavaScript, expliqués comme si tu n’avais <b>jamais</b> écrit une ligne de code. ' +
        'Tu écris ton code ici, il s’exécute <b>vraiment</b> ici, et il est corrigé <b>immédiatement</b>. ' +
        'Rien à installer, rien a payer pour commencer.</p>' +
        '<div class="cta-row">' +
          '<button class="btn primary" data-go-path="python">⚔️ Commencer par Python</button>' +
          '<button class="btn ghost" data-go="pro">🗝️ Voir ARES ULTRA</button>' +
        '</div>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + stats.nbLecons + '</b><span>leçons</span></div>' +
          '<div class="stat"><b>' + stats.exos + '</b><span>exercices corrigés</span></div>' +
          '<div class="stat"><b>' + stats.quiz + '</b><span>questions</span></div>' +
          '<div class="stat"><b>6</b><span>parcours</span></div>' +
        '</div>' +
      '</div>';
    box.appendChild(hero);

    var h1 = el('div', 'sec-head', '<div><h2>Choisis ta forge</h2><p>Trois parcours libres et complets. Chacun tient en trois jours : un jour = une soirée de travail, ou un mercredi après-midi.</p></div>');
    box.appendChild(h1);

    var grid = el('div', 'paths');
    FREE.forEach(function (p) { grid.appendChild(pathCard(p)); });
    box.appendChild(grid);

    var how = el('div');
    how.innerHTML =
      '<div class="sec-head"><div><h2>Comment ca marche</h2><p>La méthode est toujours la même, parce qu’elle fonctionne.</p></div></div>' +
      '<div class="grid3">' +
        '<div class="card"><div class="icon-row"><span class="icon-badge">1</span><h3>On expliqué</h3></div>' +
        '<p>Une notion a la fois, avec une image mentale qui la rend evidente. Zero jargon non expliqué.</p></div>' +
        '<div class="card"><div class="icon-row"><span class="icon-badge">2</span><h3>Tu essaies</h3></div>' +
        '<p>Chaque exemple a un bouton « Exécuter ». Modifie-le, casse-le, recommence : c’est comme ca qu’on apprend.</p></div>' +
        '<div class="card"><div class="icon-row"><span class="icon-badge">3</span><h3>On corrigé</h3></div>' +
        '<p>Ton code est teste sur de vrais cas. Si ca ne passe pas, on te dit précisément pourquoi, en francais.</p></div>' +
      '</div>';
    box.appendChild(how);

    var why = el('div');
    why.innerHTML =
      '<div class="sec-head"><div><h2>Pourquoi ARES marche</h2></div></div>' +
      '<div class="grid2">' +
        '<div class="card"><h3>Du vrai code, pas une video</h3><p>Un interpréteur Python complet tourne dans ton navigateur. ' +
        'Tes boucles, tes fonctions, tes classes s’executent pour de bon — et tes erreurs sont traduites en francais, avec le numéro de ligne.</p></div>' +
        '<div class="card"><h3>Des erreurs qui t’apprennent</h3><p>« NameError: x is not defined » ne veut rien dire quand on debute. ' +
        'Ici : « Le nom x n’existe pas encore. Vérifie l’orthographe, ou crée-le avant de l’utiliser. »</p></div>' +
        '<div class="card"><h3>Tu construis des choses</h3><p>Un jeu du nombre mystere, un pendu, un carnet de notes, un portfolio, ' +
        'un quiz interactif, un casse-brique. Des programmes qui marchent, que tu peux montrer.</p></div>' +
        '<div class="card"><h3>Ca reste amusant</h3><p>XP, rangs, badges, chasse au bug, devine la sortie, remise en ordre. ' +
        'Apprendre vite, c’est surtout ne pas s’arreter.</p></div>' +
      '</div>';
    box.appendChild(why);

    box.appendChild(proBanner());

    var foot = el('div', 'foot');
    foot.innerHTML = '<span>ARES — la forge du code. Fait pour les debutants francophones.</span><span>Ta progression est enregistrée dans ton navigateur.</span>';
    box.appendChild(foot);

    show(wrap(box), 'home');
    startForge();
  }

  function pathCard(p) {
    var st = pathStats(p), lock = !unlocked(p);
    var c = el('button', 'path-card');
    c.style.setProperty('--c', p.color);
    c.innerHTML =
      '<div class="glyph">' + esc(p.glyph) + '</div>' +
      '<h3>' + esc(p.name) + '</h3>' +
      '<div class="tag">' + esc(p.tag) + '</div>' +
      '<p>' + esc(p.blurb) + '</p>' +
      '<div class="chips">' + p.chips.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div>' +
      '<div class="prog"><div class="bar"><i style="width:' + st.pct + '%;background:' + p.color + '"></i></div>' +
      '<span>' + (lock ? '🔒 Déverrouillable avec une clé' : st.done + ' / ' + st.total + ' leçons · ' + st.pct + '%') + '</span></div>';
    c.addEventListener('click', function () { viewPath(p); });
    return c;
  }

  function proBanner() {
    var d = el('div', 'pro-banner');
    d.innerHTML =
      '<span class="kicker">La suite</span>' +
      '<h2>ARES ULTRA</h2>' +
      '<p style="color:var(--ash);max-width:62ch;margin-top:8px">Quand les bases sont acquises, il reste le plus interessant : ' +
      'la programmation objet, les algorithmes, la mise en page moderne, l’asynchrone, le canvas — et six projets construits pas a pas.</p>' +
      '<ul class="ticks">' +
        '<li>La Forge du Serpent — Python pro : objets, exceptions, algorithmes, pendu, carnet de notes, RPG</li>' +
        '<li>L’Atelier du Bâtisseur — Grid, variables CSS, animations, accessibilité, portfolio, landing page</li>' +
        '<li>L’Arsenal de l’Étincelle — closures, classes, DOM avance, asynchrone, canvas, quiz, casse-brique</li>' +
        '<li>23 modules supplementaires, 6 projets guidés étape par étape</li>' +
      '</ul>' +
      '<div class="price"><b>Clé unique</b><span>à saisir une seule fois, valable pour toujours sur cet appareil</span></div>' +
      '<div class="cta-row"><button class="btn primary" data-go="pro">Déverrouiller ARES ULTRA</button></div>';
    return d;
  }

  /* ---------- page ULTRA ---------- */
  function viewPro() {
    var box = el('div');
    var head = el('div');
    head.innerHTML =
      '<div class="crumb"><button data-go="home">Accueil</button> · ARES ULTRA</div>' +
      '<div class="path-hero" style="--c:var(--ember)">' +
        '<span class="kicker">Niveau superieur</span>' +
        '<h1 style="color:var(--ember)">ARES ULTRA</h1>' +
        '<p>Les trois forges avancees. Même méthode — on expliqué, tu essaies, on corrigé — mais sur les sujets qui font la différence ' +
        'entre quelqu’un qui a fait un peu de code et quelqu’un qui construit de vrais programmes.</p>' +
      '</div>';
    box.appendChild(head);

    var grid = el('div', 'paths');
    grid.style.marginTop = '22px';
    PRO.forEach(function (p) { grid.appendChild(pathCard(p)); });
    box.appendChild(grid);

    var detailHTML = el('div');
    detailHTML.innerHTML = '<div class="sec-head"><div><h2>Ce que contient ULTRA</h2></div></div>';
    var g = el('div', 'grid3');
    PRO.forEach(function (p) {
      var mods = p.days.map(function (d) { return '<li>' + esc(d.title) + ' — <span style="color:var(--ash2)">' + esc(d.sub) + '</span></li>'; }).join('');
      var c = el('div', 'card');
      c.innerHTML = '<h3 style="color:' + p.color + '">' + esc(p.title) + '</h3>' +
        '<p style="margin-bottom:10px">' + esc(p.promise) + '</p>' +
        '<ul style="padding-left:18px;color:#E4D7CC;font-size:14px;line-height:1.7">' + mods + '</ul>';
      g.appendChild(c);
    });
    detailHTML.appendChild(g);
    box.appendChild(detailHTML);

    var keyBox = el('div', 'pro-banner');
    keyBox.style.marginTop = '26px';
    var already = P.keys.length ? '<p style="color:var(--vine);font-weight:700;margin-bottom:10px">✔ Déverrouillé : ' +
      P.keys.map(function (k) { return esc(findPath(k) ? findPath(k).name : k); }).join(', ') + '</p>' : '';
    keyBox.innerHTML =
      '<h2>Entrer une clé</h2>' + already +
      '<p style="color:var(--ash);margin-bottom:14px">Saisis la clé recue lors de ton achat. Elle déverrouillé les parcours ULTRA sur cet appareil, definitivement.</p>' +
      '<div class="keyform"><input id="keyInput" placeholder="ARES-XXXX-XXXX" autocomplete="off" spellcheck="false">' +
      '<button class="btn primary" id="keyBtn">Déverrouiller</button></div>' +
      '<p id="keyMsg" style="margin-top:12px;font-size:14px"></p>';
    box.appendChild(keyBox);

    show(wrap(box), 'pro');

    function submitKey() {
      var v = $('#keyInput').value;
      var res = tryKey(v);
      var msg = $('#keyMsg');
      if (res === null) {
        msg.style.color = 'var(--blood)';
        msg.textContent = '✖ Clé inconnue. Vérifie les tirets et les majuscules.';
      } else if (!res.length) {
        msg.style.color = 'var(--ember)';
        msg.textContent = 'Cette clé est déjà active sur cet appareil.';
      } else {
        msg.style.color = 'var(--vine)';
        msg.textContent = '✔ Déverrouillé : ' + res.join(', ');
        toast('🗝️ ULTRA déverrouillé', res.join(', '));
        sparks(); addXP(0);
        buildNav();
        setTimeout(viewPro, 900);
      }
    }
    $('#keyBtn').addEventListener('click', submitKey);
    $('#keyInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') submitKey(); });
  }

  /* ---------- page parcours ---------- */
  function viewPath(p) {
    var box = el('div');
    var st = pathStats(p);
    var head = el('div');
    head.innerHTML =
      '<div class="crumb"><button data-go="home">Accueil</button> · ' + esc(p.name) + '</div>' +
      '<div class="path-hero" style="--c:' + p.color + '">' +
        '<span class="kicker">' + esc(p.tag) + '</span>' +
        '<h1>' + esc(p.title) + '</h1>' +
        '<p>' + esc(p.promise) + '</p>' +
        '<div class="prog" style="margin-top:18px;max-width:420px"><div class="bar"><i style="width:' + st.pct + '%;background:' + p.color + '"></i></div>' +
        '<span style="font-size:12px;color:var(--ash2);font-weight:700;display:block;margin-top:8px">' + st.done + ' / ' + st.total + ' leçons terminées</span></div>' +
      '</div>';
    box.appendChild(head);

    if (!unlocked(p)) {
      var veil = el('div', 'pro-banner');
      veil.innerHTML = '<h2>🔒 Parcours ULTRA</h2>' +
        '<p style="color:var(--ash);margin:10px 0 14px">Ce parcours fait partie d’ARES ULTRA. Entre ta clé pour l’ouvrir — le plan complet des modules reste visible ci-dessous.</p>' +
        '<div class="keyform"><input id="keyInline" placeholder="ARES-XXXX-XXXX" autocomplete="off"><button class="btn primary" id="keyInlineBtn">Déverrouiller</button></div>' +
        '<p id="keyInlineMsg" style="margin-top:10px;font-size:14px"></p>';
      box.appendChild(veil);
    }

    p.days.forEach(function (d, di) {
      var day = el('div', 'day');
      day.style.setProperty('--c', p.color);
      var doneCount = d.lessons.filter(function (l) { return P.done[l.id]; }).length;
      day.innerHTML =
        '<div class="day-head">' +
          '<div class="day-num">' + (p.pro ? 'M' + d.n : d.n) + '</div>' +
          '<div><h3>' + esc(d.title) + '</h3><p>' + esc(d.sub) + '</p></div>' +
          '<div class="lock">' + doneCount + '/' + d.lessons.length + '</div>' +
        '</div>';
      var list = el('div', 'lesson-list');
      d.lessons.forEach(function (l) {
        var row = el('button', 'lrow' + (P.done[l.id] ? ' done' : ''));
        row.innerHTML =
          '<span class="st">' + (P.done[l.id] ? '✔' : '') + '</span>' +
          '<span><span class="t">' + esc(l.title) + '</span><br><span class="d">' + esc(l.goal) + '</span></span>' +
          '<span class="kind" data-k="' + l.kind + '">' + l.kind + ' · ' + l.xp + ' xp</span>';
        row.addEventListener('click', function () {
          if (!unlocked(p)) { toast('🔒 Verrouille', 'Entre une clé ULTRA pour ouvrir ce parcours.'); return; }
          viewLesson(l.id);
        });
        list.appendChild(row);
      });
      day.appendChild(list);
      box.appendChild(day);
    });

    show(wrap(box), p.id);

    if (!unlocked(p)) {
      var go = function () {
        var res = tryKey($('#keyInline').value), m = $('#keyInlineMsg');
        if (res === null) { m.style.color = 'var(--blood)'; m.textContent = '✖ Clé inconnue.'; }
        else { m.style.color = 'var(--vine)'; m.textContent = '✔ Ouvert !'; toast('🗝️ Déverrouillé', p.name); sparks(); buildNav(); setTimeout(function () { viewPath(p); }, 800); }
      };
      $('#keyInlineBtn').addEventListener('click', go);
      $('#keyInline').addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    }
  }

  /* ---------- leçon ---------- */
  function viewLesson(id) {
    var f = findLesson(id);
    if (!f) return viewHome();
    var l = f.lesson, p = f.path, d = f.day;
    var box = el('div');

    var top = el('div');
    top.innerHTML =
      '<div class="crumb"><button data-go="home">Accueil</button> · <button data-path="' + p.id + '">' + esc(p.name) + '</button> · ' +
      (p.pro ? 'Module ' : 'Jour ') + d.n + '</div>' +
      '<div class="lesson-top"><div style="flex:1;min-width:280px">' +
        '<span class="kicker" style="color:' + p.color + ';border-color:' + p.color + '55">' + l.kind + ' · ' + l.xp + ' XP</span>' +
        '<h1 style="margin-top:12px">' + esc(l.title) + '</h1>' +
        '<p class="goal">' + esc(l.goal) + '</p>' +
      '</div></div>';
    box.appendChild(top);
    top.querySelector('[data-path]').addEventListener('click', function () { viewPath(p); });

    var grid = el('div', 'lesson-grid');
    var left = el('div', 'pane prose');
    var right = el('div');

    (l.blocks || []).forEach(function (b) { renderBlock(left, b, p, l); });
    if (!l.blocks || !l.blocks.length) left.innerHTML = '<p>Passe directement à la pratique →</p>';

    if (l.game) right.appendChild(renderGame(l));
    (l.ex || []).forEach(function (ex, i) { right.appendChild(renderExercise(l, p, ex, i)); });
    if (l.quiz && l.quiz.length) right.appendChild(renderQuiz(l));
    right.appendChild(renderFinish(l, p, d));

    grid.appendChild(left); grid.appendChild(right);
    box.appendChild(grid);
    show(wrap(box), p.id);
  }

  function renderBlock(host, b, p, l) {
    if (b.t === 'p') { host.appendChild(el('p', null, b.v)); return; }
    if (b.t === 'h') { host.appendChild(el('h2', null, esc(b.v))); return; }
    if (b.t === 'ul' || b.t === 'ol') {
      var list = el(b.t === 'ul' ? 'ul' : 'ol');
      b.v.forEach(function (x) { list.appendChild(el('li', null, x)); });
      host.appendChild(list); return;
    }
    if (b.t === 'analogy') { host.appendChild(el('div', 'analogy', b.v)); return; }
    if (b.t === 'tip' || b.t === 'warn' || b.t === 'key') {
      var titles = { tip: 'Astuce', warn: 'Attention', key: 'A retenir' };
      host.appendChild(el('div', 'callout ' + b.t, '<div class="h">' + esc(b.h || titles[b.t]) + '</div><p>' + b.v + '</p>'));
      return;
    }
    if (b.t === 'table') {
      var t = el('div');
      t.style.overflowX = 'auto';
      var rows = b.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td style="padding:9px 12px;border-top:1px solid var(--edge);color:#E4D7CC;font-size:14px">' + c + '</td>'; }).join('') + '</tr>'; }).join('');
      t.innerHTML = '<table style="width:100%;border-collapse:collapse;margin:16px 0;background:#0E0806;border:1px solid var(--edge);border-radius:9px;overflow:hidden">' +
        '<thead><tr>' + b.head.map(function (h) { return '<th style="text-align:left;padding:10px 12px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ash2);background:var(--slab)">' + esc(h) + '</th>'; }).join('') + '</tr></thead>' +
        '<tbody>' + rows + '</tbody></table>';
      host.appendChild(t); return;
    }
    if (b.t === 'code') {
      var lang = b.lang || p.lang;
      var cap = el('div', 'codecap', '<i></i>' + (lang === 'python' ? 'python' : lang === 'js' ? 'javascript' : 'html'));
      host.appendChild(cap);
      var pre = el('pre', 'code');
      pre.innerHTML = hl(b.v, lang);
      host.appendChild(pre);
      if (!b.run) return;

      var tools = el('div', 'run-row');
      var btn = el('button', 'btn sm primary', '▶ Exécuter');
      var edit = el('button', 'btn sm ghost', '✎ Modifier');
      tools.appendChild(btn); tools.appendChild(edit);
      host.appendChild(tools);

      var editorWrap = el('div');
      editorWrap.style.display = 'none';
      var ta = el('textarea');
      var ed = el('div', 'editor');
      ed.appendChild(el('div', 'editor-bar', '<span class="dots"><i></i><i></i><i></i></span><span class="fname">exemple.' + (lang === 'python' ? 'py' : lang === 'js' ? 'js' : 'html') + '</span>'));
      ta.value = b.v; ta.spellcheck = false;
      ed.appendChild(ta);
      editorWrap.appendChild(ed);
      host.appendChild(editorWrap);

      var outHead = el('div', 'out-head', '<span class="lamp"></span>' + (lang === 'html' ? 'aperçu' : 'console'));
      var out = el('div', 'out');
      var prev = el('div', 'preview');
      prev.style.display = 'none';
      host.appendChild(outHead);
      if (lang === 'html' || (lang === 'js' && b.dom)) { host.appendChild(prev); prev.style.display = 'block'; }
      host.appendChild(out);
      out.innerHTML = '<span class="muted">Clique sur Exécuter pour lancer ce programme.</span>';

      edit.addEventListener('click', function () {
        var open = editorWrap.style.display === 'none';
        editorWrap.style.display = open ? 'block' : 'none';
        pre.style.display = open ? 'none' : 'block';
        edit.textContent = open ? '✕ Revenir au code d’origine' : '✎ Modifier';
        if (!open) ta.value = b.v;
      });
      btn.addEventListener('click', function () {
        var code = editorWrap.style.display === 'none' ? b.v : ta.value;
        runCode(lang, code, out, prev, b.dom ? (l.dom || '') : undefined);
      });
      return;
    }
    if (b.t === 'callout') { host.appendChild(el('div', 'callout key', '<div class="h">' + esc(b.h) + '</div><p>' + b.v + '</p>')); return; }
  }

  /* ---------- exercice ---------- */
  function renderExercise(l, p, ex, i) {
    var lang = p.lang;
    var exId = l.id + '-' + i;
    var card = el('div', 'pane');
    card.style.marginBottom = '18px';
    card.innerHTML =
      '<div class="kicker" style="border-color:var(--edge2);color:var(--ember)">Exercice ' + (i + 1) + (P.ex[exId] ? ' · ✔ réussi' : '') + '</div>' +
      '<p style="margin:14px 0 4px;font-size:15.5px;color:#E4D7CC">' + ex.brief + '</p>';

    var ed = el('div', 'editor');
    ed.appendChild(el('div', 'editor-bar',
      '<span class="dots"><i></i><i></i><i></i></span><span class="fname">exercice.' +
      (lang === 'python' ? 'py' : lang === 'js' ? 'js' : 'html') + '</span>'));
    var ta = el('textarea');
    ta.spellcheck = false;
    ta.value = (P.code && P.code[exId]) || ex.starter || '';
    ed.appendChild(ta);
    card.appendChild(ed);

    // indentation automatique avec Tab et Entrée
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        var s = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 4;
      }
      if (e.key === 'Enter' && lang === 'python') {
        var pos = ta.selectionStart, ligne = ta.value.slice(0, pos).split('\n').pop();
        var indent = (ligne.match(/^\s*/) || [''])[0];
        if (/:\s*$/.test(ligne)) indent += '    ';
        if (indent) {
          e.preventDefault();
          ta.value = ta.value.slice(0, pos) + '\n' + indent + ta.value.slice(ta.selectionEnd);
          ta.selectionStart = ta.selectionEnd = pos + 1 + indent.length;
        }
      }
    });
    ta.addEventListener('input', function () {
      P.code = P.code || {}; P.code[exId] = ta.value; save();
    });

    var row = el('div', 'run-row');
    var bRun = el('button', 'btn sm', '▶ Tester mon code');
    var bCheck = el('button', 'btn sm primary', '⚒️ Forger (valider)');
    var bHint = el('button', 'btn sm ghost', '💡 Indice');
    var bSol = el('button', 'btn sm ghost', '👁 Solution');
    var bReset = el('button', 'btn sm ghost', '↺');
    bReset.title = 'Repartir du code de depart';
    row.appendChild(bCheck); row.appendChild(bRun); row.appendChild(bHint); row.appendChild(bSol); row.appendChild(bReset);
    card.appendChild(row);

    var verdict = el('div', 'verdict');
    card.appendChild(verdict);

    var prev = el('div', 'preview');
    prev.style.display = 'none';
    prev.style.marginTop = '12px';
    var outHead = el('div', 'out-head', '<span class="lamp"></span>' + (lang === 'html' ? 'aperçu' : 'console'));
    var out = el('div', 'out');
    if (lang === 'html' || (lang === 'js' && ex.dom)) { card.appendChild(prev); prev.style.display = 'block'; }
    card.appendChild(outHead); card.appendChild(out);
    out.innerHTML = '<span class="muted">Écris ton code, puis teste-le.</span>';
    if (lang === 'html') makePreview(prev, ta.value);
    if (lang === 'js' && ex.dom) makePreview(prev, l.dom || '');

    function doRun() {
      runCode(lang, ta.value, out, prev, ex.dom ? (l.dom || '') : undefined);
    }
    function doCheck() {
      var res = Runner.check(lang, ta.value, ex);
      if (res.ok && ex.dom && ex.expectDom) res = checkDom(l, ex, ta.value);
      doRun();
      verdict.className = 'verdict on ' + (res.ok ? 'ok' : 'ko');
      var detailHTML = '';
      if (!res.ok && res.expected !== undefined) {
        detailHTML = '<div style="margin-top:10px;font-family:var(--mono);font-size:12.5px;background:#0C0705;border:1px solid var(--edge);border-radius:7px;padding:10px">' +
          '<div style="color:var(--vine)">attendu :</div><div style="white-space:pre-wrap;color:#CFE8D5">' + esc(res.expected) + '</div>' +
          '<div style="color:var(--blood);margin-top:8px">obtenu :</div><div style="white-space:pre-wrap;color:#F6C4BF">' + esc(res.got || '(rien)') + '</div></div>';
      }
      verdict.innerHTML = '<b>' + (res.ok ? '✔ ' : '✖ ') + esc(res.title) + '</b>' + esc(res.msg) + detailHTML;
      if (res.ok && !P.ex[exId]) {
        P.ex[exId] = true;
        addXP(Math.max(6, Math.round(l.xp / Math.max(1, (l.ex || []).length))), 'Exercice réussi');
        sparks();
      } else if (res.ok) { sparks(); }
    }
    bRun.addEventListener('click', doRun);
    bCheck.addEventListener('click', doCheck);
    bHint.addEventListener('click', function () {
      verdict.className = 'verdict on';
      verdict.style.background = 'var(--slab)';
      verdict.style.borderColor = 'var(--edge2)';
      verdict.style.color = '#E4D7CC';
      verdict.innerHTML = '<b style="color:var(--ember)">💡 Indice</b>' + esc(ex.hint || '');
    });
    bSol.addEventListener('click', function () {
      if (!confirm('Afficher la solution ? Essaie encore un peu : c’est en cherchant qu’on apprend.')) return;
      ta.value = ex.solution;
      P.code = P.code || {}; P.code[exId] = ta.value; save();
      verdict.className = 'verdict on';
      verdict.innerHTML = '<b style="color:var(--ember)">Solution affichee</b>Lis-la ligne par ligne, puis relance-la. Refais l’exercice de mémoire demain.';
      doRun();
    });
    bReset.addEventListener('click', function () {
      ta.value = ex.starter || '';
      P.code = P.code || {}; P.code[exId] = ta.value; save();
    });
    return card;
  }

  /* ---------- quiz ---------- */
  function renderQuiz(l) {
    var box = el('div', 'pane');
    box.style.marginBottom = '18px';
    box.innerHTML = '<div class="kicker" style="border-color:var(--edge2);color:var(--serpent)">Vérifie que tu as compris</div>';
    l.quiz.forEach(function (q, qi) {
      var card = el('div', 'q');
      card.innerHTML = '<div class="num">Question ' + (qi + 1) + '</div><h4>' + esc(q.q) + '</h4>';
      var opts = el('div', 'opts');
      var expl = el('div', 'expl');
      q.opts.forEach(function (o, oi) {
        var b = el('button', 'opt', '<span class="k">' + 'ABCD'[oi] + '</span><span>' + esc(o) + '</span>');
        b.addEventListener('click', function () {
          Array.prototype.forEach.call(opts.children, function (x, xi) {
            x.disabled = true;
            if (xi === q.a) x.classList.add('good');
            else if (xi === oi) x.classList.add('bad');
          });
          expl.classList.add('on');
          expl.innerHTML = (oi === q.a ? '<b style="color:var(--vine)">Exact. </b>' : '<b style="color:var(--blood)">Pas tout a fait. </b>') + esc(q.why);
          var key = l.id + '-q' + qi;
          if (oi === q.a && !P.quiz[key]) { P.quiz[key] = true; addXP(4, 'Bonne réponse'); }
        });
        opts.appendChild(b);
      });
      card.appendChild(opts); card.appendChild(expl);
      box.appendChild(card);
    });
    return box;
  }

  /* ---------- fin de leçon ---------- */
  function renderFinish(l, p, d) {
    var box = el('div', 'pane');
    var next = nextLesson(l.id);
    box.innerHTML = '<h3 style="font-size:24px;margin-bottom:8px">' + (P.done[l.id] ? '✔ Leçon terminée' : 'Terminer la leçon') + '</h3>' +
      '<p style="color:var(--ash);font-size:14.5px">' + (P.done[l.id]
        ? 'Tu peux la relire autant de fois que tu veux : elle reste ouverte.'
        : 'Valide quand tu as lu la leçon et fait les exercices. Tu gagnes ' + l.xp + ' XP.') + '</p>';
    var row = el('div', 'run-row');
    var b = el('button', 'btn primary', P.done[l.id] ? '✔ Déjà validee' : '⚒️ Valider la leçon (+' + l.xp + ' XP)');
    b.disabled = !!P.done[l.id];
    b.addEventListener('click', function () {
      markDone(l.id, l.xp);
      sparks();
      b.disabled = true; b.textContent = '✔ Validee';
      if (next) setTimeout(function () { viewLesson(next.id); }, 700);
      else setTimeout(function () { viewPath(p); }, 700);
    });
    row.appendChild(b);
    if (next) {
      var n = el('button', 'btn ghost', 'Leçon suivante : ' + next.title + ' →');
      n.addEventListener('click', function () { viewLesson(next.id); });
      row.appendChild(n);
    } else {
      var r = el('button', 'btn ghost', '← Retour au parcours');
      r.addEventListener('click', function () { viewPath(p); });
      row.appendChild(r);
    }
    box.appendChild(row);
    return box;
  }
  function nextLesson(id) {
    var flat = [], hit = -1;
    ALL.forEach(function (p) { p.days.forEach(function (d) { d.lessons.forEach(function (l) { flat.push({ l: l, p: p }); }); }); });
    for (var i = 0; i < flat.length; i++) if (flat[i].l.id === id) hit = i;
    if (hit < 0 || hit + 1 >= flat.length) return null;
    var nx = flat[hit + 1];
    if (!unlocked(nx.p)) return null;
    return nx.l;
  }

  /* ================= jeux ================= */
  function renderGame(l) {
    var g = l.game, bank = (GAMES[g.type] || {})[g.bank] || [];
    var box = el('div', 'pane');
    box.style.marginBottom = '18px';
    var state = { i: 0, score: 0, combo: 0, best: P.games[g.bank] || 0, fini: false };
    var order = bank.map(function (_, i) { return i; }).sort(function () { return Math.random() - 0.5; });

    var hud = el('div', 'game-hud');
    var zone = el('div');
    var expl = el('div', 'expl');
    box.appendChild(hud); box.appendChild(zone); box.appendChild(expl);

    function drawHud() {
      hud.innerHTML =
        '<div class="hud"><b>' + state.score + '</b><span>score</span></div>' +
        '<div class="hud"><b>x' + (1 + state.combo) + '</b><span>combo</span></div>' +
        '<div class="hud"><b>' + (state.i + (state.fini ? 0 : 1)) + '/' + bank.length + '</b><span>manche</span></div>' +
        '<div class="hud"><b>' + state.best + '</b><span>record</span></div>';
    }
    function win(pts) {
      state.combo++; state.score += pts * (1 + Math.min(4, state.combo - 1));
      addXP(3, 'Bonne réponse');
    }
    function lose() { state.combo = 0; }
    function next() {
      expl.classList.remove('on');
      state.i++;
      if (state.i >= bank.length) return end();
      draw();
    }
    function end() {
      state.fini = true;
      if (state.score > state.best) { P.games[g.bank] = state.score; state.best = state.score; save(); }
      drawHud();
      zone.innerHTML = '';
      var f = el('div', 'callout key');
      f.innerHTML = '<div class="h">Manche terminée</div><p>Score : <b>' + state.score + '</b>. ' +
        (state.score >= bank.length * 8 ? 'Excellent — tu lis le code comme un pro.' : 'Rejoue pour battre ton record : la vitesse vient avec l’habitude.') + '</p>';
      zone.appendChild(f);
      var again = el('button', 'btn primary', '↻ Rejouer');
      again.addEventListener('click', function () {
        state.i = 0; state.score = 0; state.combo = 0; state.fini = false;
        order = bank.map(function (_, i) { return i; }).sort(function () { return Math.random() - 0.5; });
        draw();
      });
      zone.appendChild(again);
      addXP(l.xp > 0 && !P.done[l.id] ? 0 : 0);
    }
    function showExpl(bon, texte, suite) {
      expl.classList.add('on');
      expl.innerHTML = (bon ? '<b style="color:var(--vine)">✔ Bien vu. </b>' : '<b style="color:var(--blood)">✖ Rate. </b>') + esc(texte);
      var b = el('button', 'btn sm primary', 'Suivant →');
      b.style.marginTop = '10px';
      b.addEventListener('click', suite || next);
      expl.appendChild(b);
    }

    function draw() {
      drawHud();
      zone.innerHTML = '';
      var item = bank[order[state.i]];

      if (g.type === 'bughunt') {
        zone.appendChild(el('p', null, '<b>Trouve la ligne fautive :</b>'));
        var lines = el('div', 'lines');
        item.lines.forEach(function (txt, li) {
          var b = el('button', 'line');
          b.innerHTML = '<span class="ln">' + (li + 1) + '</span><span>' + hl(txt, item.lang || (g.bank[0] === 'p' ? 'python' : g.bank[0] === 'w' ? 'html' : 'js')) + '</span>';
          b.addEventListener('click', function () {
            Array.prototype.forEach.call(lines.children, function (x, xi) {
              x.disabled = true;
              if (xi === item.bad) x.classList.add('good');
              else if (xi === li) x.classList.add('bad');
            });
            if (li === item.bad) win(10); else lose();
            drawHud();
            showExpl(li === item.bad, item.why);
          });
          lines.appendChild(b);
        });
        zone.appendChild(lines);
        return;
      }

      if (g.type === 'predict') {
        zone.appendChild(el('p', null, '<b>Qu’affiche ce programme ?</b>'));
        var pre = el('pre', 'code');
        pre.innerHTML = hl(item.code, item.lang === 'js' ? 'js' : 'python');
        zone.appendChild(pre);
        var inp = el('textarea');
        inp.placeholder = 'Ta réponse (une ligne par ligne affichee)';
        inp.spellcheck = false;
        var wrapEd = el('div', 'editor');
        wrapEd.appendChild(el('div', 'editor-bar', '<span class="fname">ta réponse</span>'));
        inp.style.minHeight = '80px';
        wrapEd.appendChild(inp);
        zone.appendChild(wrapEd);
        var v = el('button', 'btn primary sm', 'Valider');
        v.style.marginTop = '10px';
        v.addEventListener('click', function () {
          var bon = Runner.norm(inp.value) === Runner.norm(item.answer);
          if (bon) win(10); else lose();
          drawHud();
          v.disabled = true; inp.disabled = true;
          showExpl(bon, (bon ? '' : 'La bonne réponse est : ' + item.answer + '. ') + item.why);
        });
        zone.appendChild(v);
        return;
      }

      if (g.type === 'order') {
        zone.appendChild(el('p', null, '<b>Objectif :</b> ' + esc(item.goal) + '<br>Clique les lignes dans le bon ordre.'));
        var melange = item.lines.map(function (t, i2) { return { t: t, i: i2 }; }).sort(function () { return Math.random() - 0.5; });
        var attendu = 0, rate = false;
        var pool = el('div', 'lines');
        var built = el('div', 'lines');
        built.style.marginBottom = '12px';
        zone.appendChild(built); zone.appendChild(pool);
        melange.forEach(function (o) {
          var b = el('button', 'line');
          b.innerHTML = '<span>' + hl(o.t, item.lang === 'js' ? 'js' : item.lang === 'html' ? 'html' : 'python') + '</span>';
          b.addEventListener('click', function () {
            if (b.disabled) return;
            if (o.i === attendu) {
              b.disabled = true; b.classList.add('good');
              built.appendChild(b);
              attendu++;
              if (attendu === item.lines.length) {
                if (!rate) win(12); else win(4);
                drawHud();
                showExpl(!rate, rate ? 'Reconstitue, mais avec des erreurs de chemin. Relis l’ordre logique : on déclare avant d’utiliser.' : 'Ordre parfait du premier coup.');
              }
            } else {
              rate = true; lose(); drawHud();
              b.classList.add('bad');
              setTimeout(function () { b.classList.remove('bad'); }, 500);
            }
          });
          pool.appendChild(b);
        });
        return;
      }

      if (g.type === 'quizgame') {
        var card = el('div', 'q');
        card.innerHTML = '<div class="num">Question ' + (state.i + 1) + '</div><h4>' + esc(item.q) + '</h4>';
        var opts = el('div', 'opts');
        item.opts.forEach(function (o, oi) {
          var b = el('button', 'opt', '<span class="k">' + 'ABCD'[oi] + '</span><span>' + esc(o) + '</span>');
          b.addEventListener('click', function () {
            Array.prototype.forEach.call(opts.children, function (x, xi) {
              x.disabled = true;
              if (xi === item.a) x.classList.add('good');
              else if (xi === oi) x.classList.add('bad');
            });
            if (oi === item.a) win(10); else lose();
            drawHud();
            showExpl(oi === item.a, item.why);
          });
          opts.appendChild(b);
        });
        card.appendChild(opts);
        zone.appendChild(card);
        return;
      }
    }
    draw();
    return box;
  }

  /* ---------- salle des jeux ---------- */
  function viewGames() {
    var box = el('div');
    box.innerHTML = '<div class="crumb"><button data-go="home">Accueil</button> · Salle des jeux</div>' +
      '<div class="sec-head"><div><h2>La salle des jeux</h2><p>Cinq minutes par jour ici valent une heure de lecture. ' +
      'Lire du code vite et reperer une erreur du regard : c’est ce qui fait la différence.</p></div></div>';
    var grid = el('div', 'grid2');
    var jeux = [
      { type: 'bughunt', bank: 'py1', titre: 'Chasse au bug — Python', ico: '🐛', desc: 'Trouve la ligne fautive dans un programme Python.' },
      { type: 'bughunt', bank: 'js1', titre: 'Chasse au bug — JavaScript', ico: '🐛', desc: 'Parenthèses, const, majuscules : traque l’erreur.' },
      { type: 'bughunt', bank: 'web1', titre: 'Chasse au bug — HTML/CSS', ico: '🐛', desc: 'Balise non fermee, point-virgule oublie...' },
      { type: 'predict', bank: 'py2', titre: 'Devine la sortie — Python', ico: '🔮', desc: 'Simule le programme dans ta tête et écris le résultat.' },
      { type: 'predict', bank: 'js2', titre: 'Devine la sortie — JavaScript', ico: '🔮', desc: 'Attention aux conversions automatiques.' },
      { type: 'order', bank: 'py3', titre: 'Remets dans l’ordre — Python', ico: '🧩', desc: 'Reconstitue un programme ligne par ligne.' },
      { type: 'order', bank: 'web3', titre: 'Remets dans l’ordre — HTML', ico: '🧩', desc: 'Structure une page correctement.' },
      { type: 'order', bank: 'js3', titre: 'Remets dans l’ordre — JavaScript', ico: '🧩', desc: 'Déclare avant d’utiliser.' },
      { type: 'quizgame', bank: 'css', titre: 'Quiz eclair — CSS', ico: '⚡', desc: 'Douze questions rapides sur la mise en page.' }
    ];
    jeux.forEach(function (j) {
      var c = el('div', 'card');
      c.innerHTML = '<div class="icon-row"><span class="icon-badge">' + j.ico + '</span><h3>' + esc(j.titre) + '</h3></div>' +
        '<p>' + esc(j.desc) + '</p>' +
        '<p style="margin-top:8px;color:var(--ash2);font-size:12.5px;font-weight:700">Record : ' + (P.games[j.bank] || 0) + '</p>';
      var b = el('button', 'btn sm primary', '▶ Jouer');
      b.style.marginTop = '12px';
      b.addEventListener('click', function () {
        var faux = { id: 'jeu-' + j.bank, xp: 0, game: { type: j.type, bank: j.bank } };
        var v = el('div');
        v.innerHTML = '<div class="crumb"><button data-go="games">Salle des jeux</button> · ' + esc(j.titre) + '</div>' +
          '<div class="lesson-top"><div><h1>' + esc(j.titre) + '</h1><p class="goal">' + esc(j.desc) + '</p></div></div>';
        v.appendChild(renderGame(faux));
        show(wrap(v), 'games');
      });
      c.appendChild(b);
      grid.appendChild(c);
    });
    box.appendChild(grid);
    show(wrap(box), 'games');
  }

  /* ---------- terrain libre ---------- */
  function viewSandbox() {
    var box = el('div');
    box.innerHTML = '<div class="crumb"><button data-go="home">Accueil</button> · Terrain libre</div>' +
      '<div class="sec-head"><div><h2>Terrain libre</h2><p>Aucun exercice, aucune correction : écris ce que tu veux et lance-le. ' +
      'C’est ici qu’on essaie les idées, qu’on teste une hypothese, qu’on bricole.</p></div></div>';

    var pane = el('div', 'pane');
    var tabs = el('div', 'run-row');
    var langs = [['python', 'Python'], ['js', 'JavaScript'], ['html', 'HTML/CSS']];
    var lang = 'python';
    var samples = {
      python: 'import random\n\n# Ton terrain de jeu. Modifie tout ce que tu veux !\nprenom = "forgeron"\nprint(f"Salut {prénom} !")\n\nfor i in range(1, 6):\n    print("*" * i)\n\nprint("Nombre au hasard :", random.randint(1, 100))',
      js: 'const equipe = ["Nova", "Kaz", "Mia"];\n\nequipe.forEach((nom, i) => {\n  console.log(`${i + 1}. ${nom}`);\n});\n\nconsole.log("Total :", equipe.length);',
      html: '<style>\n  .carte {\n    background: #241917; color: #F6ECE3;\n    padding: 24px; border-radius: 14px;\n    font-family: system-ui, sans-serif;\n  }\n  h2 { color: #F6B23D; margin-top: 0; }\n</style>\n\n<div class="carte">\n  <h2>Ma carte</h2>\n  <p>Modifie le style et relance l’aperçu.</p>\n</div>'
    };
    var ed = el('div', 'editor');
    ed.appendChild(el('div', 'editor-bar', '<span class="dots"><i></i><i></i><i></i></span><span class="fname" id="sbName">bac-a-sable.py</span>'));
    var ta = el('textarea');
    ta.spellcheck = false;
    ta.style.minHeight = '300px';
    ta.value = (P.sandbox && P.sandbox[lang]) || samples[lang];
    ed.appendChild(ta);

    langs.forEach(function (L) {
      var b = el('button', 'btn sm' + (L[0] === lang ? ' primary' : ' ghost'), L[1]);
      b.addEventListener('click', function () {
        P.sandbox = P.sandbox || {}; P.sandbox[lang] = ta.value; save();
        lang = L[0];
        Array.prototype.forEach.call(tabs.children, function (x, xi) {
          x.className = 'btn sm' + (langs[xi][0] === lang ? ' primary' : ' ghost');
        });
        ta.value = (P.sandbox && P.sandbox[lang]) || samples[lang];
        $('#sbName').textContent = 'bac-a-sable.' + (lang === 'python' ? 'py' : lang === 'js' ? 'js' : 'html');
        prev.style.display = lang === 'html' ? 'block' : 'none';
        out.innerHTML = '<span class="muted">Clique sur Exécuter.</span>';
        if (lang === 'html') makePreview(prev, ta.value);
      });
      tabs.appendChild(b);
    });
    pane.appendChild(tabs);
    pane.appendChild(ed);

    var row = el('div', 'run-row');
    var run = el('button', 'btn primary', '▶ Exécuter (Ctrl + Entrée)');
    row.appendChild(run);
    pane.appendChild(row);

    var prev = el('div', 'preview');
    prev.style.display = 'none'; prev.style.marginTop = '12px';
    pane.appendChild(prev);
    pane.appendChild(el('div', 'out-head', '<span class="lamp"></span>console'));
    var out = el('div', 'out');
    out.innerHTML = '<span class="muted">Clique sur Exécuter.</span>';
    pane.appendChild(out);

    function go() {
      P.sandbox = P.sandbox || {}; P.sandbox[lang] = ta.value; save();
      prev.style.display = lang === 'html' ? 'block' : 'none';
      runCode(lang, ta.value, out, prev);
    }
    run.addEventListener('click', go);
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); go(); }
      if (e.key === 'Tab') {
        e.preventDefault();
        var s = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 4;
      }
    });
    box.appendChild(pane);
    show(wrap(box), 'sandbox');
  }

  /* ---------- aide-mémoire ---------- */
  function viewMemo() {
    var box = el('div');
    box.innerHTML = '<div class="crumb"><button data-go="home">Accueil</button> · Aide-mémoire</div>' +
      '<div class="sec-head"><div><h2>Aide-mémoire</h2><p>Tout ce qu’il faut se rappeler, sur une page. ' +
      'Personne n’apprend une syntaxe par coeur : on la retrouve, jusqu’a ce qu’elle rentre toute seule.</p></div></div>';

    var memo = [
      { t: 'Python — les bases', lang: 'python', code: 'x = 5                  # nombre entier\ny = 3.5                # nombre a virgule\nnom = "Nova"           # texte\nok = True              # booleen\n\nprint(f"{nom} a {x} vies")\n\nage = int(input("Age ? "))    # saisie convertie' },
      { t: 'Python — conditions et boucles', lang: 'python', code: 'if note >= 16:\n    print("Très bien")\nelif note >= 10:\n    print("Admis")\nelse:\n    print("A revoir")\n\nfor i in range(1, 11):     # 1 a 10\n    print(i)\n\nwhile vies > 0:\n    vies -= 1' },
      { t: 'Python — listes et dictionnaires', lang: 'python', code: 'l = [1, 2, 3]\nl.append(4)      # ajouter\nl[0]             # premier\nl[-1]            # dernier\nl[1:3]           # tranche\nlen(l), sum(l), max(l), sorted(l)\n\nd = {"nom": "Nova", "vie": 100}\nd["vie"] = 90\nd.get("mana", 0)\nfor clé, valeur in d.items():\n    print(clé, valeur)' },
      { t: 'Python — fonctions et classes', lang: 'python', code: 'def moyenne(notes):\n    """Renvoie la moyenne."""\n    return sum(notes) / len(notes)\n\nclass Joueur:\n    def __init__(self, nom, vie=100):\n        self.nom = nom\n        self.vie = vie\n\n    def subir(self, degats):\n        self.vie -= degats\n\ntry:\n    n = int("abc")\nexcept ValueError:\n    print("pas un nombre")' },
      { t: 'HTML — la structure', lang: 'html', code: '<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mon site</title>\n</head>\n<body>\n  <header><h1>Titre</h1></header>\n  <nav>Menu</nav>\n  <main>\n    <section><h2>Partie</h2><p>Texte</p></section>\n  </main>\n  <footer>Pied</footer>\n</body>\n</html>' },
      { t: 'HTML — les balises courantes', lang: 'html', code: '<h1> a <h6>          titres\n<p>                  paragraphe\n<strong> <em>        important, accentue\n<ul> <ol> <li>       listes\n<a href="...">       lien\n<img src="..." alt="...">\n<div> <span>         conteneurs neutres\n<form> <label for="x"> <input id="x"> <button>' },
      { t: 'CSS — les essentiels', lang: 'html', code: '<style>\n  :root { --accent: #E2762E; }\n\n  .carte {\n    color: var(--accent);\n    background: #241917;\n    padding: 16px;          /* interieur */\n    margin: 12px;           /* exterieur */\n    border: 1px solid #444;\n    border-radius: 10px;\n    width: 100%;\n    max-width: 500px;\n  }\n\n  .rangee { display: flex; gap: 12px; justify-content: space-between; align-items: center; }\n  .grille { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }\n\n  @media (max-width: 600px) { .carte { padding: 10px; } }\n</style>' },
      { t: 'JavaScript — les bases', lang: 'js', code: 'const nom = "Nova";     // ne change pas\nlet score = 0;          // change\n\nconsole.log(`${nom} : ${score} points`);\n\nif (score >= 10 && vivant) { ... } else { ... }\n\nfor (let i = 0; i < 5; i++) { ... }\nfor (const x of tableau) { ... }\n\nconst double = (x) => x * 2;' },
      { t: 'JavaScript — tableaux et objets', lang: 'js', code: 'const t = [1, 2, 3];\nt.push(4); t.pop();\nt.length; t.includes(2);\nt.map(n => n * 2);\nt.filter(n => n > 1);\nt.reduce((a, b) => a + b, 0);\n\nconst o = { nom: "Nova", vie: 100 };\no.vie = 80;\nObject.keys(o);\n\nJSON.stringify(o);  JSON.parse(texte);' },
      { t: 'JavaScript — le DOM', lang: 'js', code: 'const el = document.querySelector("#id");\nconst tous = document.querySelectorAll(".classe");\n\nel.textContent = "Nouveau texte";\nel.style.background = "#E2762E";\nel.classList.add("actif");\nel.classList.toggle("ouvert");\n\nel.addEventListener("click", (e) => {\n  e.preventDefault();\n  console.log(e.target);\n});\n\nconst n = document.createElement("li");\nn.textContent = "Item";\nliste.appendChild(n);' }
    ];
    var g = el('div', 'grid2');
    memo.forEach(function (m) {
      var c = el('div', 'card');
      c.innerHTML = '<h3>' + esc(m.t) + '</h3>';
      var pre = el('pre', 'code');
      pre.innerHTML = hl(m.code, m.lang);
      c.appendChild(pre);
      g.appendChild(c);
    });
    box.appendChild(g);
    show(wrap(box), 'memo');
  }

  /* ---------- profil ---------- */
  function viewProfile() {
    var r = rank();
    var box = el('div');
    var exos = Object.keys(P.ex).length;
    box.innerHTML = '<div class="crumb"><button data-go="home">Accueil</button> · Mon profil</div>' +
      '<div class="path-hero" style="--c:var(--vine)">' +
      '<span class="kicker">Rang actuel</span><h1 style="color:var(--ember)">' + esc(r.nom) + '</h1>' +
      '<p>' + P.xp + ' XP · ' + countDone() + ' leçons terminées · ' + exos + ' exercices réussis' +
      (r.next ? ' · encore <b style="color:var(--bone)">' + (r.next[0] - P.xp) + ' XP</b> avant ' + esc(r.next[1]) : ' · rang maximal atteint') + '</p></div>';

    box.appendChild(renderAccountCard());

    var st = el('div', 'stats');
    st.style.marginTop = '20px';
    st.innerHTML =
      '<div class="stat"><b>' + P.xp + '</b><span>XP total</span></div>' +
      '<div class="stat"><b>' + countDone() + '</b><span>leçons</span></div>' +
      '<div class="stat"><b>' + exos + '</b><span>exercices</span></div>' +
      '<div class="stat"><b>' + P.badges.length + '</b><span>badges</span></div>';
    box.appendChild(st);

    var pg = el('div');
    pg.innerHTML = '<div class="sec-head"><div><h2>Progression</h2></div></div>';
    var list = el('div', 'grid2');
    ALL.forEach(function (p) {
      var s = pathStats(p);
      var c = el('div', 'card');
      c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">' +
        '<h3 style="font-size:22px;color:' + p.color + '">' + esc(p.name) + '</h3>' +
        '<span style="color:var(--ash2);font-size:13px;font-weight:700">' + (unlocked(p) ? s.done + '/' + s.total : '🔒') + '</span></div>' +
        '<div class="bar" style="margin-top:10px"><i style="width:' + (unlocked(p) ? s.pct : 0) + '%;background:' + p.color + '"></i></div>';
      c.style.cursor = 'pointer';
      c.addEventListener('click', function () { viewPath(p); });
      list.appendChild(c);
    });
    pg.appendChild(list);
    box.appendChild(pg);

    var bd = el('div');
    bd.innerHTML = '<div class="sec-head"><div><h2>Badges</h2><p>' + P.badges.length + ' sur ' + BADGES.length + ' débloqués.</p></div></div>';
    var bg = el('div', 'badges');
    BADGES.forEach(function (b) {
      var got = P.badges.indexOf(b.id) >= 0;
      bg.appendChild(el('div', 'badge' + (got ? ' got' : ''),
        '<div class="ico">' + b.ico + '</div><b>' + esc(b.nom) + '</b><span>' + esc(b.desc) + '</span>'));
    });
    bd.appendChild(bg);
    box.appendChild(bd);

    var danger = el('div', 'card');
    danger.style.marginTop = '26px';
    danger.innerHTML = '<h3>Données</h3><p>Ta progression est stockée uniquement dans ce navigateur : rien n’est envoye sur Internet. ' +
      'Vider les données du navigateur l’efface.</p>';
    var rz = el('button', 'btn sm ghost', '⚠ Réinitialiser ma progression');
    rz.style.marginTop = '12px';
    rz.addEventListener('click', function () {
      if (!confirm('Effacer toute ta progression (XP, leçons, badges) ? Les clés ULTRA sont conservees.')) return;
      var keys = P.keys.slice();
      P = { xp: 0, done: {}, ex: {}, quiz: {}, keys: keys, badges: [], games: {}, jours: [], code: {}, sandbox: {} };
      save(); refreshXP(); buildNav(); viewProfile();
      toast('Progression remise a zéro', 'Bonne nouvelle : tu vas aller plus vite cette fois.');
    });
    danger.appendChild(rz);
    box.appendChild(danger);

    show(wrap(box), 'profile');
  }

  /* ================= chrome (rail, XP, forge) ================= */
  function refreshXP() {
    var r = rank();
    $('#rankName').textContent = r.nom;
    $('#xpVal').textContent = P.xp + ' XP';
    var span = r.next ? (r.next[0] - r.base) : 1;
    var pct = r.next ? Math.min(100, Math.round((P.xp - r.base) / span * 100)) : 100;
    $('#xpBar').style.width = pct + '%';
  }

  /* ---------- compte (facultatif) ---------- */
  function refreshAccountUI() {
    var slot = $('#accountSlot');
    if (!slot) return;
    if (typeof CloudSync === 'undefined' || !CloudSync.available) { slot.innerHTML = ''; return; }
    if (CloudSync.user) {
      slot.innerHTML = '<button class="nav-item" data-go="profile" style="padding:7px 10px">' +
        '<span class="dot" style="--c:var(--vine)"></span>' + esc(CloudSync.user.email) + '</button>';
    } else {
      slot.innerHTML = '<button class="nav-item" data-go="profile" style="padding:7px 10px">' +
        '<span class="dot" style="--c:var(--ash2)"></span>Créer un compte</button>';
    }
  }

  function renderAccountCard() {
    var box = el('div', 'card');
    box.style.marginTop = '18px';
    if (typeof CloudSync === 'undefined' || !CloudSync.ready) {
      box.innerHTML = '<h3>Compte</h3><p style="color:var(--ash);font-size:14px">Vérification en cours...</p>';
      setTimeout(function () { if (current === 'profile') viewProfile(); }, 700);
      return box;
    }
    if (!CloudSync.available) {
      box.innerHTML = '<h3>Compte</h3><p style="color:var(--ash);font-size:14px">La création de compte fonctionne sur le site en ligne, pas dans cet aperçu. Ta progression reste sauvegardée sur cet appareil.</p>';
      return box;
    }
    if (CloudSync.user) {
      box.innerHTML = '<h3>Compte</h3><p style="color:var(--ash);font-size:14px">Connecté en tant que <b style="color:var(--bone)">' +
        esc(CloudSync.user.email) + '</b>. Ta progression se synchronise automatiquement sur tous tes appareils.</p>';
      var out = el('button', 'btn sm ghost', 'Se déconnecter');
      out.style.marginTop = '10px';
      out.addEventListener('click', function () { CloudSync.deconnecter(); });
      box.appendChild(out);
      return box;
    }
    box.innerHTML = '<h3>Compte</h3><p style="color:var(--ash);font-size:14px">Optionnel : crée un compte pour retrouver ta progression sur un autre ordinateur ou téléphone. Sans compte, tout reste sauvegardé ici.</p>';
    var form = el('div');
    form.style.marginTop = '12px';
    form.innerHTML =
      '<div class="keyform"><input id="accEmail" type="email" placeholder="Email" autocomplete="email">' +
      '<input id="accPass" type="password" placeholder="Mot de passe" autocomplete="current-password"></div>' +
      '<div class="run-row" style="margin-top:10px">' +
      '<button class="btn sm primary" id="accIn">Se connecter</button>' +
      '<button class="btn sm ghost" id="accUp">Créer un compte</button></div>' +
      '<button class="btn sm ghost" id="accForgot" style="margin-top:8px;font-size:12px;padding:4px 8px">Mot de passe oublié ?</button>' +
      '<p id="accMsg" style="margin-top:8px;font-size:13px"></p>';
    box.appendChild(form);
    function lire() { return { email: box.querySelector('#accEmail').value.trim(), pass: box.querySelector('#accPass').value }; }
    function statut(texte, ok) {
      var msg = box.querySelector('#accMsg');
      msg.style.color = ok === true ? 'var(--vine)' : ok === false ? 'var(--blood)' : 'var(--ash)';
      msg.textContent = texte;
    }
    box.querySelector('#accIn').addEventListener('click', function () {
      var v = lire(); statut('Un instant...');
      CloudSync.connecter(v.email, v.pass).then(function (res) {
        if (res.ok) { statut('Connecté !', true); }
        else statut(res.msg, false);
      });
    });
    box.querySelector('#accUp').addEventListener('click', function () {
      var v = lire(); statut('Un instant...');
      CloudSync.inscrire(v.email, v.pass).then(function (res) {
        if (res.ok) { statut('Compte créé !', true); }
        else statut(res.msg, false);
      });
    });
    box.querySelector('#accForgot').addEventListener('click', function () {
      var v = lire();
      if (!v.email) { statut('Écris ton email ci-dessus, puis reclique.', false); return; }
      statut('Envoi...');
      CloudSync.reinitialiserMotDePasse(v.email).then(function (res) {
        statut(res.ok ? 'Email envoyé si ce compte existe.' : res.msg, res.ok);
      });
    });
    return box;
  }

  function buildNav() {
    var f = $('#navPaths'); f.innerHTML = '';
    FREE.forEach(function (p) {
      var s = pathStats(p);
      var b = el('button', 'nav-item');
      b.dataset.path = p.id;
      b.innerHTML = '<span class="dot" style="--c:' + p.color + '"></span>' + esc(p.name) +
        '<span class="lk">' + s.done + '/' + s.total + '</span>';
      b.addEventListener('click', function () { viewPath(p); });
      f.appendChild(b);
    });
    var g = $('#navPro'); g.innerHTML = '';
    PRO.forEach(function (p) {
      var s = pathStats(p), open = unlocked(p);
      var b = el('button', 'nav-item');
      b.dataset.path = p.id;
      b.innerHTML = '<span class="dot" style="--c:' + (open ? p.color : 'var(--ash2)') + '"></span>' +
        esc(p.name.replace(' ULTRA', '')) + '<span class="lk">' + (open ? s.done + '/' + s.total : '🔒') + '</span>';
      b.addEventListener('click', function () { viewPath(p); });
      g.appendChild(b);
    });
    var pro = el('button', 'nav-item');
    pro.dataset.go = 'pro';
    pro.innerHTML = '<span class="dot" style="--c:var(--ember)"></span>Déverrouiller ULTRA';
    pro.addEventListener('click', viewPro);
    g.appendChild(pro);
  }

  /* braises animees derriere le titre */
  function startForge() {
    var c = $('#forge');
    if (!c) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var ctx = c.getContext('2d'), braises = [], stop = false;
    function size() { c.width = c.offsetWidth; c.height = c.offsetHeight; }
    size();
    window.addEventListener('resize', size);
    for (var i = 0; i < 46; i++) {
      braises.push({
        x: Math.random() * c.width, y: Math.random() * c.height,
        r: 0.7 + Math.random() * 2.1, v: 0.15 + Math.random() * 0.55,
        a: 0.15 + Math.random() * 0.5, dx: (Math.random() - 0.5) * 0.35
      });
    }
    // Les braises montent, puis se figent après 18 s : la page redevient
    // inactive (batterie, portables) et repart dès qu'on bouge.
    var reveil = Date.now(), anime = false;
    function frame() {
      if (stop || !document.body.contains(c)) { anime = false; return; }
      ctx.clearRect(0, 0, c.width, c.height);
      braises.forEach(function (b) {
        b.y -= b.v; b.x += b.dx;
        if (b.y < -6) { b.y = c.height + 6; b.x = Math.random() * c.width; }
        ctx.globalAlpha = b.a;
        ctx.fillStyle = b.r > 1.6 ? '#E2762E' : '#F6B23D';
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (Date.now() - reveil < 18000 && !document.hidden) requestAnimationFrame(frame);
      else anime = false;
    }
    function relancer() {
      reveil = Date.now();
      if (!anime) { anime = true; requestAnimationFrame(frame); }
    }
    window.addEventListener('scroll', relancer, { passive: true });
    c.parentNode.addEventListener('mousemove', relancer);
    relancer();
  }

  /* ================= demarrage ================= */
  function boot() {
    views = $('#views');
    load();
    var today = new Date().toISOString().slice(0, 10);
    if (P.jours.indexOf(today) < 0) { P.jours.push(today); save(); }
    buildNav();
    refreshXP();
    BADGES.forEach(function (b) { if (P.badges.indexOf(b.id) < 0 && b.test()) P.badges.push(b.id); });
    save();
    refreshAccountUI();

    if (typeof CloudSync !== 'undefined') {
      CloudSync.on('ready', refreshAccountUI);
      CloudSync.on('auth', function () { refreshAccountUI(); if (current === 'profile') viewProfile(); });
      CloudSync.on('cloud-data', function (cloudData) {
        if (!cloudData) { save(); return; }   // rien sur ce compte : on envoie la progression locale
        var local = countDone(), distante = Object.keys(cloudData.done || {}).length;
        if (local > distante) {
          var garder = confirm(
            'Ta progression sur cet appareil (' + local + ' leçons) est plus avancée que celle enregistrée sur ton compte (' +
            distante + ' leçons).\n\nGarder celle de cet appareil et l’envoyer sur ton compte ?\n(Annuler = utiliser celle du compte)'
          );
          if (garder) { save(); return; }
        }
        P = Object.assign({ xp: 0, done: {}, ex: {}, quiz: {}, keys: [], badges: [], games: {}, jours: [], code: {}, sandbox: {} }, cloudData);
        try { localStorage.setItem(STORE, JSON.stringify(P)); } catch (e) { /* mode privé */ }
        refreshXP(); buildNav();
        if (current === 'profile') viewProfile();
        toast('☁ Progression synchronisée', 'La progression de ton compte a été chargée.');
      });
    }

    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-go], [data-go-path]');
      if (!t) return;
      if (t.dataset.goPath) { var p = findPath(t.dataset.goPath); if (p) viewPath(p); return; }
      var dest = t.dataset.go;
      if (dest === 'home') viewHome();
      else if (dest === 'games') viewGames();
      else if (dest === 'sandbox') viewSandbox();
      else if (dest === 'memo') viewMemo();
      else if (dest === 'profile') viewProfile();
      else if (dest === 'pro') viewPro();
    });
    $('#burger').addEventListener('click', function () { $('#rail').classList.toggle('open'); });

    viewHome();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
