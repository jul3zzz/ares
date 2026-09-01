/* =====================================================================
   ARES — Petit interpréteur Python écrit en JavaScript.
   Couvre le sous-ensemble enseigne sur le site : variables, types, f-strings,
   conditions, boucles, listes/dicos/tuples, fonctions, classes, exceptions,
   modules math/random, comprehensions, slicing.
   Aucun reseau, aucun serveur : tout tourne dans le navigateur.
   ===================================================================== */
var PyRun = (function () {
  'use strict';

  /* ---------- valeurs ---------- */
  // Les flottants a valeur entière sont emballes pour afficher "5.0" et non "5".
  function PyF(v) { this.v = v; }
  function mkfloat(v) { return Number.isInteger(v) ? new PyF(v) : v; }
  function isFloat(x) { return x instanceof PyF || (typeof x === 'number' && !Number.isInteger(x)); }
  function isNum(x) { return typeof x === 'number' || x instanceof PyF; }
  function N(x) { return x instanceof PyF ? x.v : x; }
  function isInt(x) { return typeof x === 'number' && Number.isInteger(x); }
  function isTuple(a) { return Array.isArray(a) && a.__tuple === true; }
  function mktuple(a) { a.__tuple = true; return a; }

  function PyFunc(name, params, defaults, body, env) {
    this.name = name; this.params = params; this.defaults = defaults; this.body = body; this.env = env;
  }
  function PyClass(name, methods, base, isExc) { this.name = name; this.methods = methods; this.base = base; this.isExc = !!isExc; }
  function PyObj(cls) { this.cls = cls; this.fields = new Map(); }
  function PyBound(self, fn, owner) { this.self = self; this.fn = fn; this.owner = owner || null; }
  function PySuper(self, cls) { this.self = self; this.cls = cls; }
  function PyModule(name, members) { this.name = name; this.members = members; }

  function Err(type, msg, line) { this.type = type; this.msg = msg; this.line = line; this.__py = true; }
  function fail(type, msg, line) { throw new Err(type, msg, line); }

  var BREAK = { sig: 'break' }, CONTINUE = { sig: 'continue' };
  function Ret(v) { this.v = v; }

  /* ================= 1. TOKENIZER ================= */
  var KEYWORDS = ['False', 'None', 'True', 'and', 'as', 'break', 'class', 'continue', 'def', 'elif',
    'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda',
    'not', 'or', 'pass', 'raise', 'return', 'try', 'while'];
  var OPS = ['**=', '//=', '==', '!=', '<=', '>=', '**', '//', '+=', '-=', '*=', '/=', '%=', '->',
    '+', '-', '*', '/', '%', '<', '>', '=', '(', ')', '[', ']', '{', '}', ',', ':', '.', ';'];

  function tokenize(src) {
    var toks = [], i = 0, line = 1, depth = 0, indents = [0], atLineStart = true;
    var s = src.replace(/\r\n?/g, '\n');
    if (s.length > 40000) fail('LimiteError', 'Ton programme est trop long pour la forge (40 000 caractères max).', 1);

    function push(t, v) { toks.push({ t: t, v: v, line: line }); }

    while (i < s.length) {
      if (atLineStart && depth === 0) {
        var j = i, col = 0;
        while (j < s.length && (s[j] === ' ' || s[j] === '\t')) { col += s[j] === '\t' ? 4 : 1; j++; }
        if (j >= s.length) { i = j; break; }
        if (s[j] === '\n') { i = j + 1; line++; continue; }          // ligne vide
        if (s[j] === '#') { while (j < s.length && s[j] !== '\n') j++; i = j; continue; }
        if (col > indents[indents.length - 1]) { indents.push(col); push('INDENT'); }
        else while (col < indents[indents.length - 1]) {
          indents.pop(); push('DEDENT');
          if (col > indents[indents.length - 1])
            fail('IndentationError', "L'indentation ne retombe sur aucun bloc connu. Aligne tes espaces (4 par niveau).", line);
        }
        i = j; atLineStart = false; continue;
      }
      var c = s[i];
      if (c === '\n') {
        line++; i++;
        if (depth === 0) { push('NEWLINE'); atLineStart = true; }
        continue;
      }
      if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }
      if (c === '\\' && s[i + 1] === '\n') { i += 2; line++; continue; }
      if (c === '#') { while (i < s.length && s[i] !== '\n') i++; continue; }

      // chaînes (avec prefixe f / r)
      var pre = '', k = i;
      if (/[fFrRbB]/.test(c) && (s[i + 1] === '"' || s[i + 1] === "'")) { pre = c.toLowerCase(); k = i + 1; }
      if (s[k] === '"' || s[k] === "'") {
        var q = s[k], triple = s[k + 1] === q && s[k + 2] === q;
        var end = triple ? k + 3 : k + 1, val = '';
        while (end < s.length) {
          if (!triple && s[end] === '\n') fail('SyntaxError', 'Guillemet non ferme : une chaîne doit se terminer sur la même ligne.', line);
          if (s[end] === '\\' && !(pre === 'r')) {
            var n = s[end + 1], map = { n: '\n', t: '\t', '\\': '\\', "'": "'", '"': '"', r: '\r', '0': '\0' };
            if (n in map) { val += map[n]; end += 2; continue; }
            val += '\\'; end++; continue;
          }
          if (triple ? (s[end] === q && s[end + 1] === q && s[end + 2] === q) : s[end] === q) break;
          if (s[end] === '\n') line++;
          val += s[end]; end++;
        }
        if (end >= s.length) fail('SyntaxError', "Une chaîne de caractères n'est jamais refermee.", line);
        push(pre === 'f' ? 'FSTRING' : 'STRING', val);
        i = end + (triple ? 3 : 1);
        continue;
      }
      // nombres
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(s[i + 1] || ''))) {
        var num = '', dot = false;
        while (i < s.length && /[0-9_.eE]/.test(s[i])) {
          if (s[i] === '.') { if (dot) break; dot = true; }
          if ((s[i] === 'e' || s[i] === 'E') && !/[0-9+\-]/.test(s[i + 1] || '')) break;
          num += s[i]; i++;
          if ((num.slice(-1) === 'e' || num.slice(-1) === 'E') && /[+\-]/.test(s[i] || '')) { num += s[i]; i++; }
        }
        num = num.replace(/_/g, '');
        var value = parseFloat(num);
        if (isNaN(value)) fail('SyntaxError', 'Nombre mal écrit : ' + num, line);
        push('NUMBER', dot || /[eE]/.test(num) ? mkfloat(value) : value);
        continue;
      }
      // noms
      if (/[A-Za-z_À-ɏ]/.test(c)) {
        var name = '';
        while (i < s.length && /[A-Za-z0-9_À-ɏ]/.test(s[i])) { name += s[i]; i++; }
        push(KEYWORDS.indexOf(name) >= 0 ? 'KW' : 'NAME', name);
        continue;
      }
      // opérateurs
      var found = null;
      for (var o = 0; o < OPS.length; o++) if (s.substr(i, OPS[o].length) === OPS[o]) { found = OPS[o]; break; }
      if (!found) fail('SyntaxError', "Caractère inattendu : « " + c + " ». Vérifie ton clavier (accents, symboles).", line);
      if ('([{'.indexOf(found) >= 0) depth++;
      if (')]}'.indexOf(found) >= 0) depth = Math.max(0, depth - 1);
      push('OP', found); i += found.length;
    }
    if (toks.length && toks[toks.length - 1].t !== 'NEWLINE') push('NEWLINE');
    while (indents.length > 1) { indents.pop(); push('DEDENT'); }
    push('EOF');
    return toks;
  }

  /* ================= 2. PARSER ================= */
  function Parser(toks) { this.k = toks; this.i = 0; }
  Parser.prototype = {
    peek: function (n) { return this.k[this.i + (n || 0)]; },
    at: function (t, v) { var x = this.peek(); return x.t === t && (v === undefined || x.v === v); },
    atOp: function (v) { return this.at('OP', v); },
    atKw: function (v) { return this.at('KW', v); },
    next: function () { return this.k[this.i++]; },
    line: function () { return this.peek().line; },
    expect: function (t, v, what) {
      if (!this.at(t, v)) {
        var got = this.peek();
        var g = got.t === 'NEWLINE' ? 'une fin de ligne' : got.t === 'EOF' ? 'la fin du programme' : '« ' + got.v + ' »';
        fail('SyntaxError', (what || 'Il manque ' + (v ? '« ' + v + ' »' : t)) + ' — trouve ' + g + '.', got.line);
      }
      return this.next();
    },
    skipNl: function () { while (this.at('NEWLINE')) this.next(); },

    parseModule: function () {
      var body = [];
      this.skipNl();
      while (!this.at('EOF')) { body.push(this.statement()); this.skipNl(); }
      return { type: 'Module', body: body };
    },

    block: function () {
      this.expect('OP', ':', 'Il manque les deux-points « : » à la fin de la ligne');
      if (this.at('NEWLINE')) {
        this.next(); this.skipNl();
        if (!this.at('INDENT'))
          fail('IndentationError', 'Le bloc doit être indente (4 espaces) sous la ligne précédente.', this.line());
        this.next();
        var body = [];
        this.skipNl();
        while (!this.at('DEDENT') && !this.at('EOF')) { body.push(this.statement()); this.skipNl(); }
        if (this.at('DEDENT')) this.next();
        return body;
      }
      return [this.simpleStatement()];
    },

    statement: function () {
      var t = this.peek();
      if (t.t === 'KW') {
        switch (t.v) {
          case 'if': return this.ifStmt();
          case 'while': return this.whileStmt();
          case 'for': return this.forStmt();
          case 'def': return this.funcDef();
          case 'class': return this.classDef();
          case 'try': return this.tryStmt();
        }
      }
      return this.simpleStatement();
    },

    simpleStatement: function () {
      var t = this.peek(), line = t.line, st;
      if (t.t === 'KW' && (t.v === 'pass' || t.v === 'break' || t.v === 'continue')) {
        this.next(); st = { type: t.v === 'pass' ? 'Pass' : t.v === 'break' ? 'Break' : 'Continue', line: line };
      } else if (this.atKw('return')) {
        this.next();
        var val = (this.at('NEWLINE') || this.at('EOF') || this.at('DEDENT')) ? null : this.exprList();
        st = { type: 'Return', value: val, line: line };
      } else if (this.atKw('raise')) {
        this.next();
        st = { type: 'Raise', exc: (this.at('NEWLINE') ? null : this.expr()), line: line };
      } else if (this.atKw('global')) {
        this.next(); var names = [this.expect('NAME').v];
        while (this.atOp(',')) { this.next(); names.push(this.expect('NAME').v); }
        st = { type: 'Global', names: names, line: line };
      } else if (this.atKw('import') || this.atKw('from')) {
        st = this.importStmt();
      } else {
        var e = this.exprList();
        if (this.at('OP') && /^(\+=|-=|\*=|\/=|%=|\*\*=|\/\/=)$/.test(this.peek().v)) {
          var op = this.next().v.slice(0, -1);
          st = { type: 'AugAssign', target: e, op: op, value: this.exprList(), line: line };
        } else if (this.atOp('=')) {
          var targets = [e];
          while (this.atOp('=')) { this.next(); targets.push(this.exprList()); }
          var value = targets.pop();
          st = { type: 'Assign', targets: targets, value: value, line: line };
        } else {
          st = { type: 'ExprStmt', value: e, line: line };
        }
      }
      if (this.atOp(';')) this.next();
      else if (!this.at('EOF') && !this.at('DEDENT')) this.expect('NEWLINE', undefined, 'Instruction incomplete');
      return st;
    },

    importStmt: function () {
      var line = this.line();
      if (this.atKw('import')) {
        this.next(); var names = [];
        do { var n = this.expect('NAME').v; var alias = n; if (this.atKw('as')) { this.next(); alias = this.expect('NAME').v; } names.push([n, alias]); }
        while (this.atOp(',') && this.next());
        return { type: 'Import', names: names, line: line };
      }
      this.next(); var mod = this.expect('NAME').v;
      this.expect('KW', 'import', 'Il manque « import » après le nom du module');
      var items = [];
      if (this.atOp('*')) { this.next(); items = '*'; }
      else do { var m = this.expect('NAME').v; var a = m; if (this.atKw('as')) { this.next(); a = this.expect('NAME').v; } items.push([m, a]); }
      while (this.atOp(',') && this.next());
      return { type: 'FromImport', mod: mod, items: items, line: line };
    },

    ifStmt: function () {
      var line = this.line(); this.next();
      var test = this.expr(), body = this.block(), orelse = [];
      this.skipNl();
      if (this.atKw('elif')) orelse = [this.ifStmt()];
      else if (this.atKw('else')) { this.next(); orelse = this.block(); }
      return { type: 'If', test: test, body: body, orelse: orelse, line: line };
    },
    whileStmt: function () {
      var line = this.line(); this.next();
      var test = this.expr(), body = this.block(), orelse = [];
      this.skipNl();
      if (this.atKw('else')) { this.next(); orelse = this.block(); }
      return { type: 'While', test: test, body: body, orelse: orelse, line: line };
    },
    forStmt: function () {
      var line = this.line(); this.next();
      var target = this.targetList();
      this.expect('KW', 'in', 'Il manque « in » dans la boucle for');
      var iter = this.exprList(), body = this.block(), orelse = [];
      this.skipNl();
      if (this.atKw('else')) { this.next(); orelse = this.block(); }
      return { type: 'For', target: target, iter: iter, body: body, orelse: orelse, line: line };
    },
    targetList: function () {
      var first = this.postfix(this.atom());
      if (this.atOp(',')) {
        var items = [first];
        while (this.atOp(',')) { this.next(); if (this.atKw('in')) break; items.push(this.postfix(this.atom())); }
        return { type: 'Tuple', items: items, line: first.line };
      }
      return first;
    },
    funcDef: function () {
      var line = this.line(); this.next();
      var name = this.expect('NAME', undefined, 'Il manque le nom de la fonction').v;
      this.expect('OP', '(', 'Il manque « ( » après le nom de la fonction');
      var params = [], defaults = {};
      while (!this.atOp(')')) {
        if (this.atOp('*')) { this.next(); var star = this.expect('NAME').v; params.push('*' + star); }
        else {
          var p = this.expect('NAME', undefined, 'Nom de paramètre attendu').v;
          if (this.atOp(':')) { this.next(); this.expr(); }          // annotation ignoree
          if (this.atOp('=')) { this.next(); defaults[p] = this.expr(); }
          params.push(p);
        }
        if (this.atOp(',')) this.next(); else break;
      }
      this.expect('OP', ')', 'Il manque « ) »');
      if (this.atOp('->')) { this.next(); this.expr(); }
      var body = this.block();
      return { type: 'FuncDef', name: name, params: params, defaults: defaults, body: body, line: line };
    },
    classDef: function () {
      var line = this.line(); this.next();
      var name = this.expect('NAME', undefined, 'Il manque le nom de la classe').v, base = null;
      if (this.atOp('(')) {
        this.next();
        if (!this.atOp(')')) base = this.expect('NAME').v;
        this.expect('OP', ')');
      }
      var body = this.block();
      return { type: 'ClassDef', name: name, base: base, body: body, line: line };
    },
    tryStmt: function () {
      var line = this.line(); this.next();
      var body = this.block(), handlers = [], orelse = [], fin = [];
      this.skipNl();
      while (this.atKw('except')) {
        this.next();
        var etype = null, ename = null;
        if (!this.atOp(':')) { etype = this.expect('NAME').v; if (this.atKw('as')) { this.next(); ename = this.expect('NAME').v; } }
        handlers.push({ etype: etype, ename: ename, body: this.block() });
        this.skipNl();
      }
      if (this.atKw('else')) { this.next(); orelse = this.block(); this.skipNl(); }
      if (this.atKw('finally')) { this.next(); fin = this.block(); }
      if (!handlers.length && !fin.length) fail('SyntaxError', 'Un « try » a besoin d’au moins un « except ».', line);
      return { type: 'Try', body: body, handlers: handlers, orelse: orelse, fin: fin, line: line };
    },

    /* --- expressions --- */
    exprList: function () {
      var first = this.expr();
      if (this.atOp(',')) {
        var items = [first];
        while (this.atOp(',')) {
          this.next();
          if (this.at('NEWLINE') || this.atOp('=') || this.at('EOF')) break;
          items.push(this.expr());
        }
        return mkNode({ type: 'Tuple', items: items, line: first.line });
      }
      return first;
    },
    expr: function () { return this.ternary(); },
    ternary: function () {
      var v = this.orExpr();
      if (this.atKw('if')) {
        this.next();
        var cond = this.orExpr();
        this.expect('KW', 'else', 'Il manque « else » dans l’expression conditionnelle');
        return { type: 'IfExp', test: cond, then: v, other: this.expr(), line: v.line };
      }
      return v;
    },
    orExpr: function () { var l = this.andExpr(); while (this.atKw('or')) { this.next(); l = { type: 'BoolOp', op: 'or', l: l, r: this.andExpr(), line: l.line }; } return l; },
    andExpr: function () { var l = this.notExpr(); while (this.atKw('and')) { this.next(); l = { type: 'BoolOp', op: 'and', l: l, r: this.notExpr(), line: l.line }; } return l; },
    notExpr: function () { if (this.atKw('not')) { var ln = this.line(); this.next(); return { type: 'Unary', op: 'not', v: this.notExpr(), line: ln }; } return this.comparison(); },
    comparison: function () {
      var l = this.arith(), ops = [], rs = [];
      for (;;) {
        var op = null;
        if (this.at('OP') && ['<', '>', '<=', '>=', '==', '!='].indexOf(this.peek().v) >= 0) op = this.next().v;
        else if (this.atKw('in')) { this.next(); op = 'in'; }
        else if (this.atKw('not') && this.peek(1).t === 'KW' && this.peek(1).v === 'in') { this.next(); this.next(); op = 'not in'; }
        else if (this.atKw('is')) { this.next(); if (this.atKw('not')) { this.next(); op = 'is not'; } else op = 'is'; }
        if (!op) break;
        ops.push(op); rs.push(this.arith());
      }
      return ops.length ? { type: 'Compare', l: l, ops: ops, rs: rs, line: l.line } : l;
    },
    arith: function () {
      var l = this.term();
      while (this.at('OP') && (this.peek().v === '+' || this.peek().v === '-')) { var op = this.next().v; l = { type: 'Bin', op: op, l: l, r: this.term(), line: l.line }; }
      return l;
    },
    term: function () {
      var l = this.factor();
      while (this.at('OP') && ['*', '/', '//', '%'].indexOf(this.peek().v) >= 0) { var op = this.next().v; l = { type: 'Bin', op: op, l: l, r: this.factor(), line: l.line }; }
      return l;
    },
    factor: function () {
      if (this.at('OP') && (this.peek().v === '-' || this.peek().v === '+')) {
        var ln = this.line(), op = this.next().v;
        return { type: 'Unary', op: op, v: this.factor(), line: ln };
      }
      return this.power();
    },
    power: function () {
      var b = this.postfix(this.atom());
      if (this.atOp('**')) { this.next(); return { type: 'Bin', op: '**', l: b, r: this.factor(), line: b.line }; }
      return b;
    },
    postfix: function (node) {
      for (;;) {
        if (this.atOp('(')) {
          this.next();
          var args = [], kwargs = {};
          while (!this.atOp(')')) {
            if (this.at('NAME') && this.peek(1).t === 'OP' && this.peek(1).v === '=' ) {
              var kn = this.next().v; this.next(); kwargs[kn] = this.expr();
            } else {
              args.push(this.expr());
              // expression generatrice : sum(x for x in liste)
              if (this.atKw('for')) {
                var gelt = args.pop();
                this.next();
                var gtgt = this.targetList();
                this.expect('KW', 'in', 'Il manque « in » dans l’expression generatrice');
                var git = this.orExpr(), gcond = null;
                if (this.atKw('if')) { this.next(); gcond = this.orExpr(); }
                args.push({ type: 'Comp', elt: gelt, target: gtgt, iter: git, cond: gcond, line: gelt.line });
              }
            }
            if (this.atOp(',')) this.next(); else break;
          }
          this.expect('OP', ')', 'Il manque une parenthèse fermante « ) »');
          node = { type: 'Call', func: node, args: args, kwargs: kwargs, line: node.line };
        } else if (this.atOp('[')) {
          this.next();
          var lo = null, hi = null, step = null, slice = false;
          if (!this.atOp(':')) lo = this.expr();
          if (this.atOp(':')) {
            slice = true; this.next();
            if (!this.atOp(']') && !this.atOp(':')) hi = this.expr();
            if (this.atOp(':')) { this.next(); if (!this.atOp(']')) step = this.expr(); }
          }
          this.expect('OP', ']', 'Il manque un crochet fermant « ] »');
          node = slice ? { type: 'Slice', obj: node, lo: lo, hi: hi, step: step, line: node.line }
                       : { type: 'Index', obj: node, idx: lo, line: node.line };
        } else if (this.atOp('.')) {
          this.next();
          var at = this.expect('NAME', undefined, 'Il manque le nom après le point').v;
          node = { type: 'Attr', obj: node, attr: at, line: node.line };
        } else break;
      }
      return node;
    },
    atom: function () {
      var t = this.peek(), line = t.line;
      if (t.t === 'NUMBER') { this.next(); return { type: 'Const', v: t.v, line: line }; }
      if (t.t === 'STRING') { this.next(); return { type: 'Const', v: t.v, line: line }; }
      if (t.t === 'FSTRING') { this.next(); return { type: 'FStr', raw: t.v, line: line }; }
      if (t.t === 'NAME') { this.next(); return { type: 'Name', id: t.v, line: line }; }
      if (t.t === 'KW') {
        if (t.v === 'True' || t.v === 'False') { this.next(); return { type: 'Const', v: t.v === 'True', line: line }; }
        if (t.v === 'None') { this.next(); return { type: 'Const', v: null, line: line }; }
        if (t.v === 'lambda') {
          this.next(); var ps = [];
          while (this.at('NAME')) { ps.push(this.next().v); if (this.atOp(',')) this.next(); }
          this.expect('OP', ':');
          return { type: 'Lambda', params: ps, body: this.expr(), line: line };
        }
        if (t.v === 'not') return this.notExpr();
      }
      if (this.atOp('(')) {
        this.next();
        if (this.atOp(')')) { this.next(); return { type: 'TupleLit', items: [], line: line }; }
        var e = this.expr();
        if (this.atOp(',')) {
          var items = [e];
          while (this.atOp(',')) { this.next(); if (this.atOp(')')) break; items.push(this.expr()); }
          this.expect('OP', ')');
          return { type: 'TupleLit', items: items, line: line };
        }
        this.expect('OP', ')', 'Il manque une parenthèse fermante « ) »');
        return e;
      }
      if (this.atOp('[')) {
        this.next();
        if (this.atOp(']')) { this.next(); return { type: 'ListLit', items: [], line: line }; }
        var first = this.expr();
        if (this.atKw('for')) {
          this.next();
          var tgt = this.targetList();
          this.expect('KW', 'in');
          var it = this.orExpr(), cond = null;
          if (this.atKw('if')) { this.next(); cond = this.orExpr(); }
          this.expect('OP', ']', 'Il manque « ] » à la fin de la comprehension');
          return { type: 'Comp', elt: first, target: tgt, iter: it, cond: cond, line: line };
        }
        var arr = [first];
        while (this.atOp(',')) { this.next(); if (this.atOp(']')) break; arr.push(this.expr()); }
        this.expect('OP', ']', 'Il manque un crochet fermant « ] »');
        return { type: 'ListLit', items: arr, line: line };
      }
      if (this.atOp('{')) {
        this.next();
        var pairs = [];
        if (this.atOp('}')) { this.next(); return { type: 'DictLit', pairs: pairs, line: line }; }
        var k0 = this.expr();
        this.expect('OP', ':', 'Dans un dictionnaire, chaque clé est suivie de « : »');
        var v0 = this.expr();
        if (this.atKw('for')) {                    // comprehension de dictionnaire
          this.next();
          var dtgt = this.targetList();
          this.expect('KW', 'in', 'Il manque « in » dans la comprehension');
          var dit = this.orExpr(), dcond = null;
          if (this.atKw('if')) { this.next(); dcond = this.orExpr(); }
          this.expect('OP', '}', 'Il manque « } » à la fin de la comprehension');
          return { type: 'DictComp', key: k0, val: v0, target: dtgt, iter: dit, cond: dcond, line: line };
        }
        pairs.push([k0, v0]);
        if (this.atOp(',')) this.next();
        while (!this.atOp('}')) {
          var k = this.expr();
          this.expect('OP', ':', 'Dans un dictionnaire, chaque clé est suivie de « : »');
          pairs.push([k, this.expr()]);
          if (this.atOp(',')) this.next(); else break;
        }
        this.expect('OP', '}', 'Il manque une accolade fermante « } »');
        return { type: 'DictLit', pairs: pairs, line: line };
      }
      fail('SyntaxError', 'Je ne comprends pas « ' + (t.v !== undefined ? t.v : t.t) + ' » ici.', line);
    }
  };
  function mkNode(n) { return n; }

  /* ================= 3. AFFICHAGE DES VALEURS ================= */
  function fmtNum(x) {
    if (x instanceof PyF) return x.v.toFixed(1);
    if (Number.isInteger(x)) return String(x);
    if (!isFinite(x)) return x > 0 ? 'inf' : (x < 0 ? '-inf' : 'nan');
    return String(x);
  }
  function str(v) {
    if (v === null || v === undefined) return 'None';
    if (typeof v === 'boolean') return v ? 'True' : 'False';
    if (isNum(v)) return fmtNum(v);
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) {
      var inner = v.map(repr).join(', ');
      return isTuple(v) ? (v.length === 1 ? '(' + inner + ',)' : '(' + inner + ')') : '[' + inner + ']';
    }
    if (v instanceof Map) {
      var parts = [];
      v.forEach(function (val, key) { parts.push(repr(key) + ': ' + repr(val)); });
      return '{' + parts.join(', ') + '}';
    }
    if (v instanceof PyObj) {
      if (v.cls.isExc) return String(v.fields.get('message') || v.cls.name);
      var f = findMethod(v.cls, '__str__');
      if (f) return str(callFunction(new PyBound(v, f, findOwner(v.cls, '__str__')), [], {}, 0));
      return '<' + v.cls.name + ' objet>';
    }
    if (v instanceof PyFunc) return '<fonction ' + v.name + '>';
    if (v instanceof PyClass) return "<classe '" + v.name + "'>";
    if (v instanceof PyModule) return "<module '" + v.name + "'>";
    if (typeof v === 'function') return '<fonction native ' + (v.pyname || '?') + '>';
    return String(v);
  }
  function repr(v) {
    if (typeof v === 'string') return v.indexOf("'") >= 0 && v.indexOf('"') < 0 ? '"' + v + '"' : "'" + v.replace(/'/g, "\\'") + "'";
    return str(v);
  }
  function typeName(v) {
    if (v === null || v === undefined) return 'NoneType';
    if (typeof v === 'boolean') return 'bool';
    if (v instanceof PyF || (typeof v === 'number' && !Number.isInteger(v))) return 'float';
    if (typeof v === 'number') return 'int';
    if (typeof v === 'string') return 'str';
    if (isTuple(v)) return 'tuple';
    if (Array.isArray(v)) return 'list';
    if (v instanceof Map) return 'dict';
    if (v instanceof PyObj) return v.cls.name;
    return 'function';
  }
  function truthy(v) {
    if (v === null || v === undefined || v === false) return false;
    if (v === true) return true;
    if (isNum(v)) return N(v) !== 0;
    if (typeof v === 'string' || Array.isArray(v)) return v.length > 0;
    if (v instanceof Map) return v.size > 0;
    return true;
  }
  function eq(a, b) {
    if (isNum(a) && isNum(b)) return N(a) === N(b);
    if (typeof a === 'boolean' || typeof b === 'boolean') {
      if (isNum(a) || isNum(b)) return (a === true ? 1 : a === false ? 0 : N(a)) === (b === true ? 1 : b === false ? 0 : N(b));
      return a === b;
    }
    if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every(function (x, i) { return eq(x, b[i]); });
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      var ok = true; a.forEach(function (v, k) { if (!b.has(k) || !eq(v, b.get(k))) ok = false; });
      return ok;
    }
    return a === b;
  }

  /* ================= 4. INTERPRETEUR ================= */
  function Env(parent) { this.vars = new Map(); this.parent = parent; this.globals = null; }
  Env.prototype.get = function (n) {
    var e = this;
    while (e) { if (e.vars.has(n)) return e.vars.get(n); e = e.parent; }
    return undefined;
  };
  Env.prototype.has = function (n) { var e = this; while (e) { if (e.vars.has(n)) return true; e = e.parent; } return false; };
  Env.prototype.set = function (n, v) {
    if (this.globals && this.globals.has(n)) { this.setGlobal(n, v); return; }
    this.vars.set(n, v);
  };
  Env.prototype.setGlobal = function (n, v) { var e = this; while (e.parent) e = e.parent; e.vars.set(n, v); };

  var ST = null;   // état courant

  function tick(line) {
    ST.steps++;
    if (ST.steps > 900000)
      fail('BoucleInfinie', "Ton programme tourne sans fin (plus de 900 000 étapes). Vérifie qu'une boucle « while » finit bien par devenir fausse.", line);
  }
  function write(text) {
    ST.buf += text;
    if (ST.buf.length > 24000) { ST.buf = ST.buf.slice(0, 24000); fail('LimiteError', 'Trop de texte affiche (24 000 caractères max). Réduis tes boucles d’affichage.', 0); }
  }

  function findMethod(cls, name) {
    var c = cls;
    while (c) { if (c.methods[name]) return c.methods[name]; c = c.base; }
    return null;
  }
  function findOwner(cls, name) {
    var c = cls;
    while (c) { if (c.methods[name]) return c; c = c.base; }
    return null;
  }

  function callFunction(fn, args, kwargs, line) {
    kwargs = kwargs || {};
    tick(line);
    if (ST.depth > 90) fail('RecursionError', 'Trop d’appels imbriques : une fonction s’appelle sans fin ?', line);
    if (fn instanceof PyBound) {
      ST.selfStack.push({ self: fn.self, owner: fn.owner });
      try { return callFunction(fn.fn, [fn.self].concat(args), kwargs, line); }
      finally { ST.selfStack.pop(); }
    }
    if (typeof fn === 'function') return fn(args, kwargs, line);
    if (fn instanceof PyClass) {
      var obj = new PyObj(fn);
      if (fn.isExc) { obj.fields.set('message', args.length ? str(args[0]) : fn.name); return obj; }
      var init = findMethod(fn, '__init__');
      if (init) callFunction(new PyBound(obj, init, findOwner(fn, '__init__')), args, kwargs, line);
      else if (args.length) fail('TypeError', fn.name + '() ne prend pas d’argument (pas de methode __init__).', line);
      return obj;
    }
    if (!(fn instanceof PyFunc)) fail('TypeError', "« " + str(fn) + " » n’est pas une fonction : on ne peut pas l’appeler avec ().", line);

    var env = new Env(fn.env), np = fn.params.length, starIdx = -1;
    for (var p = 0; p < np; p++) if (fn.params[p][0] === '*') starIdx = p;
    if (starIdx >= 0) {
      for (var a = 0; a < starIdx; a++) env.set(fn.params[a], args[a]);
      env.set(fn.params[starIdx].slice(1), mktuple(args.slice(starIdx)));
    } else {
      if (args.length > np)
        fail('TypeError', fn.name + '() attend ' + np + ' argument(s) mais en reçoit ' + args.length + '.', line);
      for (var i2 = 0; i2 < np; i2++) {
        var name = fn.params[i2];
        if (i2 < args.length) env.set(name, args[i2]);
        else if (Object.prototype.hasOwnProperty.call(kwargs, name)) env.set(name, kwargs[name]);
        else if (fn.defaults[name] !== undefined) env.set(name, evaluate(fn.defaults[name], fn.env));
        else fail('TypeError', fn.name + "() : il manque l’argument « " + name + " ».", line);
      }
      for (var kk in kwargs) if (fn.params.indexOf(kk) < 0)
        fail('TypeError', fn.name + "() ne connaît pas l’argument « " + kk + " ».", line);
    }
    ST.depth++;
    try {
      execBlock(fn.body, env);
    } catch (e) {
      if (e instanceof Ret) { ST.depth--; return e.v === undefined ? null : e.v; }
      ST.depth--; throw e;
    }
    ST.depth--;
    return null;
  }

  function iterate(v, line) {
    if (typeof v === 'string') return v.split('');
    if (Array.isArray(v)) return v.slice();
    if (v instanceof Map) { var ks = []; v.forEach(function (_, k) { ks.push(k); }); return ks; }
    fail('TypeError', 'On ne peut pas parcourir un objet de type ' + typeName(v) + ' avec une boucle for.', line);
  }

  function assign(target, value, env) {
    if (target.type === 'Name') { env.set(target.id, value); return; }
    if (target.type === 'Tuple' || target.type === 'TupleLit' || target.type === 'ListLit') {
      var vals = iterate(value, target.line);
      if (vals.length !== target.items.length)
        fail('ValueError', 'Impossible de repartir ' + vals.length + ' valeur(s) dans ' + target.items.length + ' variable(s).', target.line);
      for (var i = 0; i < vals.length; i++) assign(target.items[i], vals[i], env);
      return;
    }
    if (target.type === 'Index') {
      var obj = evaluate(target.obj, env), idx = evaluate(target.idx, env);
      if (Array.isArray(obj)) {
        var k = N(idx); if (k < 0) k += obj.length;
        if (!Number.isInteger(k) || k < 0 || k >= obj.length)
          fail('IndexError', 'Indice ' + str(idx) + ' hors de la liste (taille ' + obj.length + ').', target.line);
        obj[k] = value; return;
      }
      if (obj instanceof Map) { obj.set(keyOf(idx), value); return; }
      if (typeof obj === 'string') fail('TypeError', 'Les chaînes de caractères ne se modifient pas case par case. Crée une nouvelle chaîne.', target.line);
      fail('TypeError', 'Impossible de modifier un élément de ' + typeName(obj) + '.', target.line);
    }
    if (target.type === 'Attr') {
      var o = evaluate(target.obj, env);
      if (o instanceof PyObj) { o.fields.set(target.attr, value); return; }
      fail('AttributeError', 'Impossible d’ajouter un attribut a ' + typeName(o) + '.', target.line);
    }
    fail('SyntaxError', 'Cette expression ne peut pas recevoir de valeur avec « = ».', target.line);
  }
  function keyOf(k) { return isNum(k) ? N(k) : k; }

  function execBlock(body, env) { for (var i = 0; i < body.length; i++) exec(body[i], env); }

  function exec(node, env) {
    tick(node.line);
    switch (node.type) {
      case 'ExprStmt': evaluate(node.value, env); return;
      case 'Assign':
        var v = evaluate(node.value, env);
        for (var i = 0; i < node.targets.length; i++) assign(node.targets[i], v, env);
        return;
      case 'AugAssign':
        var cur = evaluate(node.target, env);
        assign(node.target, binop(node.op, cur, evaluate(node.value, env), node.line), env);
        return;
      case 'If':
        if (truthy(evaluate(node.test, env))) execBlock(node.body, env);
        else execBlock(node.orelse, env);
        return;
      case 'While': {
        var broke = false;
        while (truthy(evaluate(node.test, env))) {
          tick(node.line);
          try { execBlock(node.body, env); }
          catch (e) { if (e === BREAK) { broke = true; break; } if (e === CONTINUE) continue; throw e; }
        }
        if (!broke) execBlock(node.orelse, env);
        return;
      }
      case 'For': {
        var items = iterate(evaluate(node.iter, env), node.line), brk = false;
        for (var j = 0; j < items.length; j++) {
          tick(node.line);
          assign(node.target, items[j], env);
          try { execBlock(node.body, env); }
          catch (e) { if (e === BREAK) { brk = true; break; } if (e === CONTINUE) continue; throw e; }
        }
        if (!brk) execBlock(node.orelse, env);
        return;
      }
      case 'FuncDef': env.set(node.name, new PyFunc(node.name, node.params, node.defaults, node.body, env)); return;
      case 'ClassDef': {
        var methods = {}, base = node.base ? env.get(node.base) : null;
        if (node.base && !(base instanceof PyClass)) fail('NameError', 'La classe parente « ' + node.base + ' » est inconnue.', node.line);
        var cenv = new Env(env);
        for (var m = 0; m < node.body.length; m++) {
          var st = node.body[m];
          if (st.type === 'FuncDef') methods[st.name] = new PyFunc(st.name, st.params, st.defaults, st.body, cenv);
          else exec(st, cenv);
        }
        env.set(node.name, new PyClass(node.name, methods, base));
        return;
      }
      case 'Return': throw new Ret(node.value ? evaluate(node.value, env) : null);
      case 'Break': throw BREAK;
      case 'Continue': throw CONTINUE;
      case 'Pass': return;
      case 'Global':
        if (!env.globals) env.globals = new Set();
        for (var g = 0; g < node.names.length; g++) {
          env.globals.add(node.names[g]);
          if (!env.has(node.names[g])) env.setGlobal(node.names[g], null);
        }
        return;
      case 'Raise': {
        var e2 = node.exc ? evaluate(node.exc, env) : null;
        if (e2 instanceof PyObj) fail(e2.cls.name, String(e2.fields.get('message') || e2.cls.name), node.line);
        if (e2 instanceof PyClass) fail(e2.name, e2.name, node.line);
        fail('Exception', str(e2), node.line);
      }
      /* falls through */
      case 'Import':
        for (var im = 0; im < node.names.length; im++) {
          var mod = MODULES[node.names[im][0]];
          if (!mod) fail('ModuleNotFoundError', 'Le module « ' + node.names[im][0] + ' » n’existe pas dans la forge ARES. Disponibles : math, random, time.', node.line);
          env.set(node.names[im][1], mod);
        }
        return;
      case 'FromImport': {
        var md = MODULES[node.mod];
        if (!md) fail('ModuleNotFoundError', 'Le module « ' + node.mod + ' » n’existe pas ici. Disponibles : math, random, time.', node.line);
        if (node.items === '*') { for (var kx in md.members) env.set(kx, md.members[kx]); return; }
        for (var it = 0; it < node.items.length; it++) {
          var mm = node.items[it][0];
          if (!(mm in md.members)) fail('ImportError', '« ' + mm + ' » n’existe pas dans le module ' + node.mod + '.', node.line);
          env.set(node.items[it][1], md.members[mm]);
        }
        return;
      }
      case 'Try': {
        try { execBlock(node.body, env); execBlock(node.orelse, env); }
        catch (e) {
          if (e === BREAK || e === CONTINUE || e instanceof Ret) { execBlock(node.fin, env); throw e; }
          if (!e || !e.__py) { execBlock(node.fin, env); throw e; }
          var handled = false;
          for (var h = 0; h < node.handlers.length; h++) {
            var hd = node.handlers[h];
            if (!hd.etype || hd.etype === e.type || hd.etype === 'Exception') {
              if (hd.ename) { var o = new PyObj(new PyClass(e.type, {}, null, true)); o.fields.set('message', e.msg); env.set(hd.ename, o); }
              execBlock(hd.body, env); handled = true; break;
            }
          }
          execBlock(node.fin, env);
          if (!handled) throw e;
          return;
        }
        execBlock(node.fin, env);
        return;
      }
      default: fail('SyntaxError', 'Instruction inconnue : ' + node.type, node.line);
    }
  }

  function binop(op, a, b, line) {
    if (op === '+') {
      if (typeof a === 'string' && typeof b === 'string') return a + b;
      if (typeof a === 'string' || typeof b === 'string')
        fail('TypeError', 'On ne peut pas additionner du texte (' + typeName(a) + ') et un nombre (' + typeName(b) + '). Utilise str() ou une f-string.', line);
      if (Array.isArray(a) && Array.isArray(b)) return a.concat(b);
      return num2(a, b, N(a) + N(b));
    }
    if (op === '-') { chkNum(a, b, op, line); return num2(a, b, N(a) - N(b)); }
    if (op === '*') {
      if (typeof a === 'string' && isNum(b)) return isInt(N(b)) ? a.repeat(Math.max(0, N(b))) : fail('TypeError', 'On ne peut multiplier du texte que par un entier.', line);
      if (typeof b === 'string' && isNum(a)) return b.repeat(Math.max(0, N(a)));
      if (Array.isArray(a) && isNum(b)) { var r = []; for (var i = 0; i < N(b); i++) r = r.concat(a); return r; }
      chkNum(a, b, op, line); return num2(a, b, N(a) * N(b));
    }
    if (op === '/') {
      chkNum(a, b, op, line);
      if (N(b) === 0) fail('ZeroDivisionError', 'Division par zéro : impossible de diviser par 0.', line);
      return mkfloat(N(a) / N(b));
    }
    if (op === '//') {
      chkNum(a, b, op, line);
      if (N(b) === 0) fail('ZeroDivisionError', 'Division entière par zéro.', line);
      var q = Math.floor(N(a) / N(b));
      return (isFloat(a) || isFloat(b)) ? mkfloat(q) : q;
    }
    if (op === '%') {
      chkNum(a, b, op, line);
      if (N(b) === 0) fail('ZeroDivisionError', 'Modulo par zéro.', line);
      var m = N(a) - Math.floor(N(a) / N(b)) * N(b);
      return num2(a, b, m);
    }
    if (op === '**') { chkNum(a, b, op, line); return num2(a, b, Math.pow(N(a), N(b))); }
    fail('SyntaxError', 'Opérateur inconnu ' + op, line);
  }
  function chkNum(a, b, op, line) {
    if (!isNum(a) && typeof a !== 'boolean') fail('TypeError', 'Impossible de faire « ' + op + " » avec " + typeName(a) + '. Convertis-le en nombre avec int() ou float().', line);
    if (!isNum(b) && typeof b !== 'boolean') fail('TypeError', 'Impossible de faire « ' + op + " » avec " + typeName(b) + '. Convertis-le en nombre avec int() ou float().', line);
  }
  function num2(a, b, res) { return (isFloat(a) || isFloat(b)) ? mkfloat(res) : (Number.isInteger(res) ? res : mkfloat(res)); }

  function compare(op, a, b, line) {
    switch (op) {
      case '==': return eq(a, b);
      case '!=': return !eq(a, b);
      case 'is': return a === b || (a === null && b === null);
      case 'is not': return !(a === b || (a === null && b === null));
      case 'in': case 'not in': {
        var found = false;
        if (typeof b === 'string') found = typeof a === 'string' ? b.indexOf(a) >= 0 : fail('TypeError', 'Avec « in » sur du texte, il faut chercher du texte.', line);
        else if (Array.isArray(b)) found = b.some(function (x) { return eq(x, a); });
        else if (b instanceof Map) found = b.has(keyOf(a));
        else fail('TypeError', 'On ne peut pas utiliser « in » sur ' + typeName(b) + '.', line);
        return op === 'in' ? found : !found;
      }
    }
    if (typeof a === 'string' && typeof b === 'string') {
      var c = a < b ? -1 : a > b ? 1 : 0;
      return op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : c >= 0;
    }
    if (!isNum(a) && typeof a !== 'boolean' || !isNum(b) && typeof b !== 'boolean')
      fail('TypeError', 'Impossible de comparer ' + typeName(a) + ' et ' + typeName(b) + ' avec « ' + op + ' ».', line);
    var x = a === true ? 1 : a === false ? 0 : N(a), y = b === true ? 1 : b === false ? 0 : N(b);
    return op === '<' ? x < y : op === '>' ? x > y : op === '<=' ? x <= y : x >= y;
  }

  function formatSpec(v, spec, line) {
    if (!spec) return str(v);
    var m = /^([<>^])?(\d+)?(,)?(?:\.(\d+))?([fdse%])?$/.exec(spec);
    if (!m) return str(v);
    var align = m[1], width = m[2] ? parseInt(m[2], 10) : 0, comma = m[3], prec = m[4], kind = m[5], out;
    if (kind === '%') out = (N(v) * 100).toFixed(prec === undefined ? 2 : +prec) + '%';
    else if (kind === 'f' || prec !== undefined) out = N(v).toFixed(prec === undefined ? 6 : +prec);
    else if (kind === 'd') out = String(Math.trunc(N(v)));
    else out = str(v);
    if (comma) {
      var parts = out.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      out = parts.join('.');
    }
    if (width && out.length < width) {
      var pad = width - out.length;
      if (align === '>') out = ' '.repeat(pad) + out;
      else if (align === '^') out = ' '.repeat(Math.floor(pad / 2)) + out + ' '.repeat(Math.ceil(pad / 2));
      else if (align === '<') out = out + ' '.repeat(pad);
      else out = isNum(v) ? ' '.repeat(pad) + out : out + ' '.repeat(pad);
    }
    return out;
  }

  function evalFString(raw, env, line) {
    var out = '', i = 0;
    while (i < raw.length) {
      var c = raw[i];
      if (c === '{') {
        if (raw[i + 1] === '{') { out += '{'; i += 2; continue; }
        var depth = 1, j = i + 1, inner = '';
        while (j < raw.length && depth > 0) {
          if (raw[j] === '{') depth++;
          if (raw[j] === '}') { depth--; if (!depth) break; }
          inner += raw[j]; j++;
        }
        if (depth) fail('SyntaxError', 'Accolade « { } » non fermee dans la f-string.', line);
        var spec = null, cut = inner.lastIndexOf(':');
        if (cut > 0 && !/[\[\('"]/.test(inner.slice(cut))) { spec = inner.slice(cut + 1); inner = inner.slice(0, cut); }
        var sub;
        try { sub = new Parser(tokenize(inner)).expr(); }
        catch (e) { fail('SyntaxError', 'Expression invalide dans la f-string : { ' + inner + ' }', line); }
        out += formatSpec(evaluate(sub, env), spec, line);
        i = j + 1; continue;
      }
      if (c === '}') { out += '}'; i += raw[i + 1] === '}' ? 2 : 1; continue; }
      out += c; i++;
    }
    return out;
  }

  function sliceOf(obj, lo, hi, step, line) {
    var isStr = typeof obj === 'string';
    if (!isStr && !Array.isArray(obj)) fail('TypeError', 'On ne peut decouper ([:]) que du texte ou une liste.', line);
    var arr = isStr ? obj.split('') : obj, n = arr.length;
    var st = step === null || step === undefined ? 1 : N(step);
    if (st === 0) fail('ValueError', 'Le pas d’une tranche ne peut pas être 0.', line);
    var a, b;
    if (st > 0) {
      a = lo === null || lo === undefined ? 0 : N(lo); b = hi === null || hi === undefined ? n : N(hi);
      if (a < 0) a += n; if (b < 0) b += n;
      a = Math.max(0, Math.min(n, a)); b = Math.max(0, Math.min(n, b));
    } else {
      a = lo === null || lo === undefined ? n - 1 : N(lo); b = hi === null || hi === undefined ? -1 : N(hi);
      if (a < 0 && lo !== null && lo !== undefined) a += n;
      if (b < 0 && hi !== null && hi !== undefined) b += n;
      a = Math.min(n - 1, a);
    }
    var res = [];
    for (var i = a; st > 0 ? i < b : i > b; i += st) if (i >= 0 && i < n) res.push(arr[i]);
    return isStr ? res.join('') : res;
  }

  function evaluate(node, env) {
    tick(node.line);
    switch (node.type) {
      case 'Const': return node.v;
      case 'Name': {
        if (env.has(node.id)) return env.get(node.id);
        if (BUILTINS[node.id] !== undefined) return BUILTINS[node.id];
        fail('NameError', 'Le nom « ' + node.id + ' » n’existe pas encore. Vérifie l’orthographe, ou crée-le avant de l’utiliser.', node.line);
      }
      /* falls through */
      case 'FStr': return evalFString(node.raw, env, node.line);
      case 'ListLit': return node.items.map(function (x) { return evaluate(x, env); });
      case 'TupleLit': case 'Tuple': return mktuple((node.items || []).map(function (x) { return evaluate(x, env); }));
      case 'DictLit': {
        var m = new Map();
        node.pairs.forEach(function (p) { m.set(keyOf(evaluate(p[0], env)), evaluate(p[1], env)); });
        return m;
      }
      case 'Comp': {
        var out = [], items = iterate(evaluate(node.iter, env), node.line), e2 = new Env(env);
        for (var i = 0; i < items.length; i++) {
          tick(node.line);
          assign(node.target, items[i], e2);
          if (!node.cond || truthy(evaluate(node.cond, e2))) out.push(evaluate(node.elt, e2));
        }
        return out;
      }
      case 'DictComp': {
        var dm = new Map(), dit = iterate(evaluate(node.iter, env), node.line), e3 = new Env(env);
        for (var di = 0; di < dit.length; di++) {
          tick(node.line);
          assign(node.target, dit[di], e3);
          if (!node.cond || truthy(evaluate(node.cond, e3)))
            dm.set(keyOf(evaluate(node.key, e3)), evaluate(node.val, e3));
        }
        return dm;
      }
      case 'Bin': return binop(node.op, evaluate(node.l, env), evaluate(node.r, env), node.line);
      case 'Unary': {
        var v = evaluate(node.v, env);
        if (node.op === 'not') return !truthy(v);
        if (node.op === '-') { chkNum(v, 0, '-', node.line); return isFloat(v) ? mkfloat(-N(v)) : -N(v); }
        return v;
      }
      case 'BoolOp': {
        var l = evaluate(node.l, env);
        if (node.op === 'and') return truthy(l) ? evaluate(node.r, env) : l;
        return truthy(l) ? l : evaluate(node.r, env);
      }
      case 'Compare': {
        var left = evaluate(node.l, env);
        for (var c = 0; c < node.ops.length; c++) {
          var right = evaluate(node.rs[c], env);
          if (!compare(node.ops[c], left, right, node.line)) return false;
          left = right;
        }
        return true;
      }
      case 'IfExp': return truthy(evaluate(node.test, env)) ? evaluate(node.then, env) : evaluate(node.other, env);
      case 'Lambda': return new PyFunc('<lambda>', node.params, {}, [{ type: 'Return', value: node.body, line: node.line }], env);
      case 'Index': {
        var obj = evaluate(node.obj, env), idx = evaluate(node.idx, env);
        if (typeof obj === 'string' || Array.isArray(obj)) {
          var k = N(idx);
          if (typeof k !== 'number' || !Number.isInteger(k))
            fail('TypeError', 'Un indice doit être un nombre entier (recu : ' + typeName(idx) + ').', node.line);
          if (k < 0) k += obj.length;
          if (k < 0 || k >= obj.length)
            fail('IndexError', 'Indice ' + str(idx) + ' hors ' + (typeof obj === 'string' ? 'du texte' : 'de la liste') + ' : il n’y a que ' + obj.length + ' element(s) (0 a ' + (obj.length - 1) + ').', node.line);
          return obj[k];
        }
        if (obj instanceof Map) {
          var key = keyOf(idx);
          if (!obj.has(key)) fail('KeyError', 'La clé ' + repr(idx) + ' n’existe pas dans ce dictionnaire.', node.line);
          return obj.get(key);
        }
        fail('TypeError', 'On ne peut pas utiliser [ ] sur ' + typeName(obj) + '.', node.line);
      }
      /* falls through */
      case 'Slice': {
        var o = evaluate(node.obj, env);
        return sliceOf(o, node.lo ? evaluate(node.lo, env) : null, node.hi ? evaluate(node.hi, env) : null,
          node.step ? evaluate(node.step, env) : null, node.line);
      }
      case 'Attr': {
        var target = evaluate(node.obj, env);
        return getAttr(target, node.attr, node.line);
      }
      case 'Call': {
        var fn;
        if (node.func.type === 'Attr') fn = getAttr(evaluate(node.func.obj, env), node.func.attr, node.line);
        else fn = evaluate(node.func, env);
        var args = node.args.map(function (a) { return evaluate(a, env); }), kw = {};
        for (var kn in node.kwargs) kw[kn] = evaluate(node.kwargs[kn], env);
        return callFunction(fn, args, kw, node.line);
      }
    }
    fail('SyntaxError', 'Expression inconnue : ' + node.type, node.line);
  }

  /* ---------- attributs & methodes ---------- */
  function getAttr(o, name, line) {
    if (o instanceof PyModule) {
      if (!(name in o.members)) fail('AttributeError', 'Le module ' + o.name + ' ne contient pas « ' + name + ' ».', line);
      return o.members[name];
    }
    if (o instanceof PySuper) {
      var sm = findMethod(o.cls, name);
      if (!sm) fail('AttributeError', 'La classe parente n’a pas de methode « ' + name + ' ».', line);
      return new PyBound(o.self, sm, findOwner(o.cls, name));
    }
    if (o instanceof PyObj) {
      if (o.fields.has(name)) return o.fields.get(name);
      var m = findMethod(o.cls, name);
      if (m) return new PyBound(o, m, findOwner(o.cls, name));
      fail('AttributeError', "L'objet " + o.cls.name + ' n’a pas d’attribut « ' + name + ' ».', line);
    }
    if (o instanceof PyClass) {
      if (o.methods[name]) return o.methods[name];
      fail('AttributeError', 'La classe ' + o.name + ' n’a pas de methode « ' + name + ' ».', line);
    }
    var table = typeof o === 'string' ? STRM : Array.isArray(o) ? LISTM : (o instanceof Map ? DICTM : null);
    if (table && table[name]) {
      var f = table[name];
      return function (args, kwargs, ln) { return f(o, args, kwargs || {}, ln || line); };
    }
    fail('AttributeError', 'Le type ' + typeName(o) + ' n’a pas de methode « ' + name + ' ». (Vérifie l’orthographe.)', line);
  }

  function argInt(a, i, def, line, who) {
    if (a.length <= i) return def;
    var v = N(a[i]);
    if (typeof v !== 'number') fail('TypeError', who + ' attend un nombre.', line);
    return v;
  }

  var STRM = {
    upper: function (s) { return s.toUpperCase(); },
    lower: function (s) { return s.toLowerCase(); },
    capitalize: function (s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); },
    title: function (s) { return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(); }); },
    strip: function (s, a) { return a.length ? s.replace(new RegExp('^[' + esc(a[0]) + ']+|[' + esc(a[0]) + ']+$', 'g'), '') : s.trim(); },
    lstrip: function (s) { return s.replace(/^\s+/, ''); },
    rstrip: function (s) { return s.replace(/\s+$/, ''); },
    split: function (s, a) { return a.length ? s.split(a[0]) : s.split(/\s+/).filter(function (x) { return x.length; }); },
    join: function (s, a, k, line) {
      var arr = a[0];
      if (!Array.isArray(arr)) fail('TypeError', 'join() attend une liste.', line);
      return arr.map(function (x) {
        if (typeof x !== 'string') fail('TypeError', 'join() ne fonctionne qu’avec une liste de textes (trouve : ' + typeName(x) + ').', line);
        return x;
      }).join(s);
    },
    replace: function (s, a) { return s.split(a[0]).join(a[1]); },
    find: function (s, a) { return s.indexOf(a[0]); },
    index: function (s, a, k, line) { var i = s.indexOf(a[0]); if (i < 0) fail('ValueError', 'Sous-chaîne introuvable.', line); return i; },
    count: function (s, a) { return a[0] === '' ? s.length + 1 : s.split(a[0]).length - 1; },
    startswith: function (s, a) { return s.indexOf(a[0]) === 0; },
    endswith: function (s, a) { return s.lastIndexOf(a[0]) === s.length - a[0].length && a[0].length <= s.length; },
    isdigit: function (s) { return s.length > 0 && /^[0-9]+$/.test(s); },
    isalpha: function (s) { return s.length > 0 && /^[A-Za-zÀ-ɏ]+$/.test(s); },
    isalnum: function (s) { return s.length > 0 && /^[A-Za-z0-9À-ɏ]+$/.test(s); },
    isspace: function (s) { return s.length > 0 && /^\s+$/.test(s); },
    isupper: function (s) { return /[A-Z]/.test(s) && s === s.toUpperCase(); },
    islower: function (s) { return /[a-z]/.test(s) && s === s.toLowerCase(); },
    zfill: function (s, a) { var w = N(a[0]); return s.length >= w ? s : '0'.repeat(w - s.length) + s; },
    ljust: function (s, a) { var w = N(a[0]); return s.length >= w ? s : s + (a[1] || ' ').repeat(w - s.length); },
    rjust: function (s, a) { var w = N(a[0]); return s.length >= w ? s : (a[1] || ' ').repeat(w - s.length) + s; },
    center: function (s, a) {
      var w = N(a[0]); if (s.length >= w) return s;
      var p = w - s.length; return ' '.repeat(Math.floor(p / 2)) + s + ' '.repeat(Math.ceil(p / 2));
    },
    format: function (s, a, k, line) {
      var i = 0;
      return s.replace(/\{([^}]*)\}/g, function (_, inner) {
        var spec = null, cut = inner.indexOf(':');
        if (cut >= 0) { spec = inner.slice(cut + 1); inner = inner.slice(0, cut); }
        var v = inner === '' ? a[i++] : (/^\d+$/.test(inner) ? a[+inner] : k[inner]);
        return formatSpec(v, spec, line);
      });
    }
  };
  function esc(x) { return x.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&'); }

  var LISTM = {
    append: function (l, a) { l.push(a[0]); return null; },
    extend: function (l, a) { a[0].forEach(function (x) { l.push(x); }); return null; },
    insert: function (l, a) { l.splice(N(a[0]), 0, a[1]); return null; },
    pop: function (l, a, k, line) {
      if (!l.length) fail('IndexError', 'pop() sur une liste vide.', line);
      var i = a.length ? N(a[0]) : l.length - 1; if (i < 0) i += l.length;
      if (i < 0 || i >= l.length) fail('IndexError', 'pop(' + str(a[0]) + ') : indice hors de la liste.', line);
      return l.splice(i, 1)[0];
    },
    remove: function (l, a, k, line) {
      for (var i = 0; i < l.length; i++) if (eq(l[i], a[0])) { l.splice(i, 1); return null; }
      fail('ValueError', str(a[0]) + ' ne se trouve pas dans la liste.', line);
    },
    clear: function (l) { l.length = 0; return null; },
    index: function (l, a, k, line) {
      for (var i = 0; i < l.length; i++) if (eq(l[i], a[0])) return i;
      fail('ValueError', str(a[0]) + ' ne se trouve pas dans la liste.', line);
    },
    count: function (l, a) { return l.filter(function (x) { return eq(x, a[0]); }).length; },
    sort: function (l, a, k, line) { var s = sortArr(l, k, line); l.length = 0; s.forEach(function (x) { l.push(x); }); return null; },
    reverse: function (l) { l.reverse(); return null; },
    copy: function (l) { return l.slice(); }
  };
  function sortArr(arr, kw, line) {
    var key = kw && kw.key, rev = kw && truthy(kw.reverse);
    var out = arr.slice().sort(function (a, b) {
      var x = key ? callFunction(key, [a], {}, line) : a, y = key ? callFunction(key, [b], {}, line) : b;
      if (typeof x === 'string' && typeof y === 'string') return x < y ? -1 : x > y ? 1 : 0;
      return N(x) - N(y);
    });
    return rev ? out.reverse() : out;
  }
  var DICTM = {
    keys: function (d) { var r = []; d.forEach(function (_, k) { r.push(k); }); return r; },
    values: function (d) { var r = []; d.forEach(function (v) { r.push(v); }); return r; },
    items: function (d) { var r = []; d.forEach(function (v, k) { r.push(mktuple([k, v])); }); return r; },
    get: function (d, a) { var k = keyOf(a[0]); return d.has(k) ? d.get(k) : (a.length > 1 ? a[1] : null); },
    pop: function (d, a, k, line) {
      var key = keyOf(a[0]);
      if (!d.has(key)) { if (a.length > 1) return a[1]; fail('KeyError', 'Clé ' + repr(a[0]) + ' absente.', line); }
      var v = d.get(key); d.delete(key); return v;
    },
    update: function (d, a) { a[0].forEach(function (v, k) { d.set(k, v); }); return null; },
    clear: function (d) { d.clear(); return null; },
    copy: function (d) { return new Map(d); }
  };

  /* ---------- builtins ---------- */
  function B(name, fn) { fn.pyname = name; return fn; }
  var BUILTINS = {
    print: B('print', function (a, k, line) {
      var sep = k.sep !== undefined ? k.sep : ' ', end = k.end !== undefined ? k.end : '\n';
      write(a.map(str).join(sep) + end);
      return null;
    }),
    input: B('input', function (a, k, line) {
      var prompt = a.length ? str(a[0]) : '';
      var v = ST.inputs.length ? ST.inputs.shift() : '';
      write(prompt + v + '\n');
      if (!ST.inputs.length) ST.inputUsedUp = true;
      return v;
    }),
    len: B('len', function (a, k, line) {
      var v = a[0];
      if (typeof v === 'string' || Array.isArray(v)) return v.length;
      if (v instanceof Map) return v.size;
      fail('TypeError', 'len() ne marche pas sur ' + typeName(v) + '.', line);
    }),
    range: B('range', function (a, k, line) {
      var start = 0, stop, step = 1;
      if (a.length === 1) stop = N(a[0]);
      else { start = N(a[0]); stop = N(a[1]); if (a.length > 2) step = N(a[2]); }
      if (step === 0) fail('ValueError', 'range() : le pas ne peut pas être 0.', line);
      if ([start, stop, step].some(function (x) { return typeof x !== 'number'; }))
        fail('TypeError', 'range() attend des nombres entiers.', line);
      var out = [];
      for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        out.push(i);
        if (out.length > 200000) fail('LimiteError', 'range() trop grand (200 000 max).', line);
      }
      return out;
    }),
    str: B('str', function (a) { return a.length ? str(a[0]) : ''; }),
    int: B('int', function (a, k, line) {
      if (!a.length) return 0;
      var v = a[0];
      if (typeof v === 'string') {
        var t = v.trim();
        if (!/^[+-]?\d+$/.test(t)) fail('ValueError', 'int() : « ' + v + ' » n’est pas un nombre entier valide.', line);
        return parseInt(t, 10);
      }
      if (typeof v === 'boolean') return v ? 1 : 0;
      if (isNum(v)) return Math.trunc(N(v));
      fail('TypeError', 'int() ne sait pas convertir ' + typeName(v) + '.', line);
    }),
    float: B('float', function (a, k, line) {
      var v = a[0];
      if (typeof v === 'string') {
        var f = parseFloat(v.trim());
        if (isNaN(f)) fail('ValueError', 'float() : « ' + v + ' » n’est pas un nombre.', line);
        return mkfloat(f);
      }
      if (typeof v === 'boolean') return mkfloat(v ? 1 : 0);
      if (isNum(v)) return mkfloat(N(v));
      fail('TypeError', 'float() ne sait pas convertir ' + typeName(v) + '.', line);
    }),
    bool: B('bool', function (a) { return a.length ? truthy(a[0]) : false; }),
    list: B('list', function (a, k, line) { return a.length ? iterate(a[0], line) : []; }),
    tuple: B('tuple', function (a, k, line) { return mktuple(a.length ? iterate(a[0], line) : []); }),
    dict: B('dict', function () { return new Map(); }),
    abs: B('abs', function (a, k, line) { chkNum(a[0], 0, 'abs', line); return isFloat(a[0]) ? mkfloat(Math.abs(N(a[0]))) : Math.abs(N(a[0])); }),
    round: B('round', function (a, k, line) {
      var v = N(a[0]), d = a.length > 1 ? N(a[1]) : 0;
      var p = Math.pow(10, d), r = Math.round((v * p + (v >= 0 ? 1e-9 : -1e-9))) / p;
      return d > 0 ? mkfloat(r) : (isFloat(a[0]) && a.length > 1 ? mkfloat(r) : r);
    }),
    sum: B('sum', function (a, k, line) {
      var arr = iterate(a[0], line), acc = a.length > 1 ? a[1] : 0;
      arr.forEach(function (x) { acc = binop('+', acc, x, line); });
      return acc;
    }),
    min: B('min', function (a, k, line) {
      var arr = a.length === 1 ? iterate(a[0], line) : a;
      if (!arr.length) fail('ValueError', 'min() sur une suite vide.', line);
      return arr.reduce(function (m, x) { return compare('<', x, m, line) ? x : m; });
    }),
    max: B('max', function (a, k, line) {
      var arr = a.length === 1 ? iterate(a[0], line) : a;
      if (!arr.length) fail('ValueError', 'max() sur une suite vide.', line);
      return arr.reduce(function (m, x) { return compare('>', x, m, line) ? x : m; });
    }),
    sorted: B('sorted', function (a, k, line) { return sortArr(iterate(a[0], line), k, line); }),
    reversed: B('reversed', function (a, k, line) { return iterate(a[0], line).reverse(); }),
    enumerate: B('enumerate', function (a, k, line) {
      var start = a.length > 1 ? N(a[1]) : 0;
      return iterate(a[0], line).map(function (x, i) { return mktuple([i + start, x]); });
    }),
    zip: B('zip', function (a, k, line) {
      var lists = a.map(function (x) { return iterate(x, line); });
      var n = Math.min.apply(null, lists.map(function (l) { return l.length; }));
      var out = [];
      for (var i = 0; i < n; i++) out.push(mktuple(lists.map(function (l) { return l[i]; })));
      return out;
    }),
    type: B('type', function (a) { return typeName(a[0]); }),
    isinstance: B('isinstance', function (a, k, line) {
      var t = a[1], n = typeName(a[0]);
      var want = (t && t.pyname) ? t.pyname : (t instanceof PyClass ? t.name : str(t));
      if (want === 'float') return typeName(a[0]) === 'float' || typeName(a[0]) === 'int';
      return n === want;
    }),
    chr: B('chr', function (a) { return String.fromCharCode(N(a[0])); }),
    ord: B('ord', function (a) { return String(a[0]).charCodeAt(0); }),
    any: B('any', function (a, k, line) { return iterate(a[0], line).some(truthy); }),
    all: B('all', function (a, k, line) { return iterate(a[0], line).every(truthy); }),
    map: B('map', function (a, k, line) { return iterate(a[1], line).map(function (x) { return callFunction(a[0], [x], {}, line); }); }),
    filter: B('filter', function (a, k, line) { return iterate(a[1], line).filter(function (x) { return truthy(callFunction(a[0], [x], {}, line)); }); }),
    repr: B('repr', function (a) { return repr(a[0]); }),
    super: B('super', function (a, k, line) {
      var top = ST.selfStack[ST.selfStack.length - 1];
      if (!top || !top.owner || !top.owner.base)
        fail('RuntimeError', 'super() ne s’utilise que dans une methode d’une classe qui herite d’une autre.', line);
      return new PySuper(top.self, top.owner.base);
    })
  };

  /* les types d'erreurs, utilisables avec raise et except */
  ['Exception', 'ValueError', 'TypeError', 'ZeroDivisionError', 'KeyError', 'IndexError',
   'NameError', 'AttributeError', 'RuntimeError', 'ArithmeticError', 'StopIteration'
  ].forEach(function (n) { BUILTINS[n] = new PyClass(n, {}, null, true); });

  /* ---------- modules ---------- */
  var rngState = 123456789;
  function rnd() { rngState = (1103515245 * rngState + 12345) % 2147483648; return rngState / 2147483648; }
  var MODULES = {
    math: new PyModule('math', {
      pi: mkfloat(Math.PI), e: mkfloat(Math.E), inf: Infinity,
      sqrt: B('sqrt', function (a, k, line) { if (N(a[0]) < 0) fail('ValueError', 'sqrt() : pas de racine carree d’un nombre negatif.', line); return mkfloat(Math.sqrt(N(a[0]))); }),
      floor: B('floor', function (a) { return Math.floor(N(a[0])); }),
      ceil: B('ceil', function (a) { return Math.ceil(N(a[0])); }),
      pow: B('pow', function (a) { return mkfloat(Math.pow(N(a[0]), N(a[1]))); }),
      fabs: B('fabs', function (a) { return mkfloat(Math.abs(N(a[0]))); }),
      factorial: B('factorial', function (a, k, line) { var n = N(a[0]), r = 1; if (n < 0 || !Number.isInteger(n)) fail('ValueError', 'factorial() attend un entier positif.', line); for (var i = 2; i <= n; i++) r *= i; return r; }),
      gcd: B('gcd', function (a) { var x = Math.abs(N(a[0])), y = Math.abs(N(a[1])); while (y) { var t = y; y = x % y; x = t; } return x; }),
      sin: B('sin', function (a) { return mkfloat(Math.sin(N(a[0]))); }),
      cos: B('cos', function (a) { return mkfloat(Math.cos(N(a[0]))); }),
      tan: B('tan', function (a) { return mkfloat(Math.tan(N(a[0]))); }),
      log: B('log', function (a) { return mkfloat(a.length > 1 ? Math.log(N(a[0])) / Math.log(N(a[1])) : Math.log(N(a[0]))); }),
      log10: B('log10', function (a) { return mkfloat(Math.log10(N(a[0]))); }),
      radians: B('radians', function (a) { return mkfloat(N(a[0]) * Math.PI / 180); }),
      degrees: B('degrees', function (a) { return mkfloat(N(a[0]) * 180 / Math.PI); })
    }),
    random: new PyModule('random', {
      random: B('random', function () { return mkfloat(rnd()); }),
      seed: B('seed', function (a) { rngState = Math.abs(Math.trunc(N(a[0]) || 1)) % 2147483647 || 1; return null; }),
      randint: B('randint', function (a, k, line) {
        var lo = N(a[0]), hi = N(a[1]);
        if (lo > hi) fail('ValueError', 'randint(a, b) : a doit être <= b.', line);
        return lo + Math.floor(rnd() * (hi - lo + 1));
      }),
      randrange: B('randrange', function (a) { var lo = a.length > 1 ? N(a[0]) : 0, hi = a.length > 1 ? N(a[1]) : N(a[0]); return lo + Math.floor(rnd() * (hi - lo)); }),
      choice: B('choice', function (a, k, line) {
        var arr = iterate(a[0], line);
        if (!arr.length) fail('IndexError', 'choice() sur une suite vide.', line);
        return arr[Math.floor(rnd() * arr.length)];
      }),
      shuffle: B('shuffle', function (a) {
        var l = a[0];
        for (var i = l.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = l[i]; l[i] = l[j]; l[j] = t; }
        return null;
      }),
      sample: B('sample', function (a, k, line) {
        var arr = iterate(a[0], line).slice(), n = N(a[1]), out = [];
        for (var i = 0; i < n && arr.length; i++) out.push(arr.splice(Math.floor(rnd() * arr.length), 1)[0]);
        return out;
      }),
      uniform: B('uniform', function (a) { return mkfloat(N(a[0]) + rnd() * (N(a[1]) - N(a[0]))); })
    }),
    time: new PyModule('time', {
      sleep: B('sleep', function () { return null; }),
      time: B('time', function () { return mkfloat(1767225600); })
    })
  };

  /* ---------- point d'entrée ---------- */
  function run(src, opts) {
    opts = opts || {};
    ST = { steps: 0, depth: 0, buf: '', inputs: (opts.inputs || []).map(String), inputUsedUp: false, selfStack: [] };
    rngState = opts.seed !== undefined ? opts.seed : 123456789;
    var res = { out: '', error: null, errorLine: 0, errorType: '', globals: null };
    try {
      var ast = new Parser(tokenize(src)).parseModule();
      var env = new Env(null);
      execBlock(ast.body, env);
      res.globals = env.vars;
    } catch (e) {
      if (e instanceof Ret) { res.error = 'return en dehors d’une fonction : « return » ne s’utilise que dans une fonction.'; res.errorType = 'SyntaxError'; }
      else if (e === BREAK || e === CONTINUE) { res.error = '« break » / « continue » ne s’utilisent que dans une boucle.'; res.errorType = 'SyntaxError'; }
      else if (e && e.__py) { res.error = e.msg; res.errorType = e.type; res.errorLine = e.line || 0; }
      else { res.error = 'Erreur interne : ' + (e && e.message ? e.message : String(e)); res.errorType = 'InternalError'; }
    }
    res.out = ST.buf;
    res.lines = ST.buf.length ? ST.buf.replace(/\n$/, '').split('\n') : [];
    return res;
  }

  return { run: run, str: str, repr: repr, version: '1.0' };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = PyRun;
