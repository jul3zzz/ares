/* =====================================================================
   ARES — un interpreteur d'assembleur x86-64 (syntaxe Intel), ecrit en
   JavaScript. Sous-ensemble fidele et enseignable : registres, pile,
   indicateurs, sauts, appels de fonction, adressage memoire.

   Simplifications assumees et documentees (voir LISEZ-MOI.txt) :
   - eax/ebx/... sont de simples alias de rax/rbx/... (pas de troncature 32 bits)
   - mul/div utilisent rax de facon fidele, mais rdx est remis a 0 apres mul
     (les nombres manipules ici ne debordent jamais un vrai registre)
   - le drapeau de depassement signe (OF) n'est pas modelise : JG/JL/JGE/JLE
     comparent directement le resultat du dernier CMP
   - [tableau + reg*8] est equivalent a [tableau + reg] : chaque case compte
     pour un element logique, pas pour 8 octets de memoire brute
   - PRINT est une instruction inventee par la forge (un vrai programme a
     besoin d'un appel systeme different selon l'OS pour afficher du texte)
   ===================================================================== */
var AsmRun = (function () {
  'use strict';

  function Err(msg, line) { this.msg = msg; this.line = line; this.__asm = true; }
  function fail(msg, line) { throw new Err(msg, line); }

  var REGS64 = ['rax', 'rbx', 'rcx', 'rdx', 'rsi', 'rdi', 'rbp', 'rsp',
                'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15'];
  var ALIAS32 = { eax: 'rax', ebx: 'rbx', ecx: 'rcx', edx: 'rdx', esi: 'rsi', edi: 'rdi', ebp: 'rbp', esp: 'rsp' };

  function normReg(name) {
    var n = name.toLowerCase();
    if (ALIAS32[n]) return ALIAS32[n];
    if (REGS64.indexOf(n) >= 0) return n;
    return null;
  }

  /* ================= 1. ANALYSE (tokenize + parse) ================= */
  // Une ligne est soit vide/commentaire, soit une etiquette ("boucle:"),
  // soit une declaration de donnees ("tableau: dq 1, 2, 3"), soit une
  // instruction ("mov rax, 5"). On construit un programme = liste
  // d'instructions, plus une table des etiquettes (nom -> index).
  function analyser(source) {
    var lignesBrutes = source.replace(/\r\n?/g, '\n').split('\n');
    if (lignesBrutes.length > 4000) fail("Ce programme est trop long pour la forge (4000 lignes max).", 1);

    var programme = [], etiquettes = {}, donnees = {};

    for (var i = 0; i < lignesBrutes.length; i++) {
      var noLigne = i + 1;
      var brute = lignesBrutes[i];
      var sansCom = brute.split(';')[0].trim();
      if (!sansCom) continue;
      if (/^(section\s+)?\.?(data|text|bss)\s*:?$/i.test(sansCom)) continue;   // marqueurs de section, ignores

      var mData = /^([a-zA-Z_]\w*)\s*:\s*(dq|dd|db)\s+(.+)$/i.exec(sansCom);
      if (mData) {
        var nom = mData[1].toLowerCase();
        if (etiquettes[nom] !== undefined || donnees[nom]) fail("Le nom « " + mData[1] + " » est deja utilise.", noLigne);
        var valeurs = mData[3].split(',').map(function (v) {
          var n = Number(v.trim());
          if (isNaN(n)) fail("Valeur invalide dans la declaration de « " + nom + " » : " + v.trim(), noLigne);
          return n;
        });
        donnees[nom] = valeurs;
        continue;
      }

      var mLabel = /^([a-zA-Z_]\w*)\s*:$/.exec(sansCom);
      if (mLabel) {
        var etq = mLabel[1].toLowerCase();
        if (etiquettes[etq] !== undefined || donnees[etq]) fail("L'etiquette « " + mLabel[1] + " » est deja utilisee.", noLigne);
        etiquettes[etq] = programme.length;
        continue;
      }

      var espace = sansCom.indexOf(' ');
      var mnemonique = (espace < 0 ? sansCom : sansCom.slice(0, espace)).toLowerCase();
      var reste = espace < 0 ? '' : sansCom.slice(espace + 1).trim();
      var args = reste === '' ? [] : splitArgs(reste, noLigne);
      programme.push({ mnemonique: mnemonique, args: args, ligne: noLigne });
    }
    return { programme: programme, etiquettes: etiquettes, donnees: donnees };
  }

  // Coupe "rax, [tableau + rbx]" en ["rax", "[tableau + rbx]"] sans jamais
  // couper a l'interieur d'un crochet ou d'une chaine entre guillemets.
  function splitArgs(s, ligne) {
    var out = [], cur = '', profondeur = 0, enChaine = false;
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c === '"') enChaine = !enChaine;
      if (!enChaine) {
        if (c === '[') profondeur++;
        if (c === ']') profondeur--;
      }
      if (c === ',' && profondeur === 0 && !enChaine) { out.push(cur.trim()); cur = ''; continue; }
      cur += c;
    }
    if (profondeur !== 0) fail("Un crochet « [ » n'est jamais ferme.", ligne);
    if (cur.trim() !== '') out.push(cur.trim());
    return out;
  }

  /* ================= 2. EXECUTION ================= */
  function executer(analyse, opts) {
    opts = opts || {};
    var regs = {};
    REGS64.forEach(function (r) { regs[r] = 0; });
    var flags = { Z: false, S: false };
    var cmpDiff = 0;
    var pile = [];          // push/pop
    var pileAppels = [];    // call/ret (adresses de retour)
    var sortie = '';
    var pas = 0;
    var LIMITE_PAS = 500000;

    function tick(ligne) {
      pas++;
      if (pas > LIMITE_PAS) fail("Ce programme tourne sans fin (plus de " + LIMITE_PAS + " etapes). Verifie la condition de ton saut.", ligne);
    }
    function ecrire(texte) {
      sortie += texte;
      if (sortie.length > 20000) fail("Trop de texte affiche (20 000 caracteres max).", 0);
    }

    function resoudreAdresse(expr, ligne) {
      // Le decalage apres "+" peut etre un registre ([t + rbx]) ou un nombre
      // litteral ([t + 1]), exactement comme sur un vrai processeur.
      var m = /^\[\s*([a-zA-Z_]\w*)\s*(?:\+\s*(-?[a-zA-Z0-9_]\w*)\s*(?:\*\s*(\d+))?)?\s*\]$/.exec(expr);
      if (!m) fail("Adresse memoire mal ecrite : " + expr, ligne);
      var nomBase = m[1].toLowerCase(), decalage = m[2];
      var tableau = analyse.donnees[nomBase];
      var indice = 0;
      if (decalage) {
        var rn = normReg(decalage);
        if (rn) indice = regs[rn];
        else {
          var nDec = Number(decalage);
          if (isNaN(nDec)) fail("Decalage incompris dans l'adresse : " + decalage, ligne);
          indice = nDec;
        }
      }
      if (!tableau) {
        // [reg] tout seul : nomBase est en fait un registre (adressage indirect)
        var rn2 = normReg(nomBase);
        if (rn2 !== null && regIndex === undefined) {
          fail("Le registre " + nomBase + " ne pointe vers aucune donnee connue (adressage indirect non supporte ici : utilise le nom d'un tableau declare avec dq).", ligne);
        }
        fail("Aucune donnee nommee « " + nomBase + " » (declare-la avec « " + nomBase + ": dq ... »).", ligne);
      }
      if (indice < 0 || indice >= tableau.length || !Number.isInteger(indice)) {
        fail("Indice " + indice + " hors du tableau « " + nomBase + " » (taille " + tableau.length + ").", ligne);
      }
      return { tableau: tableau, indice: indice };
    }

    function lireValeur(op, ligne) {
      if (op[0] === '[') { var ad = resoudreAdresse(op, ligne); return ad.tableau[ad.indice]; }
      var rn = normReg(op);
      if (rn) return regs[rn];
      var n = Number(op);
      if (!isNaN(n) && op.trim() !== '') return n;
      fail("Operande incomprise : « " + op + " » (ni registre, ni nombre, ni [adresse]).", ligne);
    }
    function ecrireValeur(op, valeur, ligne) {
      if (op[0] === '[') { var a = resoudreAdresse(op, ligne); a.tableau[a.indice] = valeur; return; }
      var rn = normReg(op);
      if (!rn) fail("Impossible d'ecrire dans « " + op + " » : ce n'est pas un registre ni une adresse.", ligne);
      regs[rn] = valeur;
    }
    function majFlags(v) { flags.Z = v === 0; flags.S = v < 0; }

    var etats = analyse.etiquettes;
    function sauterVers(nomLabel, ligne) {
      var cible = etats[nomLabel.toLowerCase()];
      if (cible === undefined) fail("Etiquette inconnue : « " + nomLabel + " ».", ligne);
      return cible;
    }

    var prog = analyse.programme;
    var pc = 0;
    while (pc < prog.length) {
      var instr = prog[pc];
      tick(instr.ligne);
      var m = instr.mnemonique, a = instr.args, ln = instr.ligne;
      var saut = null;

      switch (m) {
        case 'mov': ecrireValeur(a[0], lireValeur(a[1], ln), ln); break;
        case 'add': { var v = lireValeur(a[0], ln) + lireValeur(a[1], ln); ecrireValeur(a[0], v, ln); majFlags(v); break; }
        case 'sub': { var v = lireValeur(a[0], ln) - lireValeur(a[1], ln); ecrireValeur(a[0], v, ln); majFlags(v); break; }
        case 'inc': { var v = lireValeur(a[0], ln) + 1; ecrireValeur(a[0], v, ln); majFlags(v); break; }
        case 'dec': { var v = lireValeur(a[0], ln) - 1; ecrireValeur(a[0], v, ln); majFlags(v); break; }
        case 'mul': case 'imul':
          if (a.length === 2) { var v2 = lireValeur(a[0], ln) * lireValeur(a[1], ln); ecrireValeur(a[0], v2, ln); majFlags(v2); }
          else { regs.rax = regs.rax * lireValeur(a[0], ln); regs.rdx = 0; majFlags(regs.rax); }
          break;
        case 'div': case 'idiv': {
          var diviseur = lireValeur(a[0], ln);
          if (diviseur === 0) fail("Division par zero.", ln);
          var quotient = Math.trunc(regs.rax / diviseur), reste = regs.rax % diviseur;
          regs.rax = quotient; regs.rdx = reste; majFlags(quotient);
          break;
        }
        case 'and': { var v3 = lireValeur(a[0], ln) & lireValeur(a[1], ln); ecrireValeur(a[0], v3, ln); majFlags(v3); break; }
        case 'or': { var v4 = lireValeur(a[0], ln) | lireValeur(a[1], ln); ecrireValeur(a[0], v4, ln); majFlags(v4); break; }
        case 'xor': { var v5 = lireValeur(a[0], ln) ^ lireValeur(a[1], ln); ecrireValeur(a[0], v5, ln); majFlags(v5); break; }
        case 'not': { var v6 = ~lireValeur(a[0], ln); ecrireValeur(a[0], v6, ln); break; }
        case 'shl': { var v7 = lireValeur(a[0], ln) << lireValeur(a[1], ln); ecrireValeur(a[0], v7, ln); majFlags(v7); break; }
        case 'shr': { var v8 = lireValeur(a[0], ln) >> lireValeur(a[1], ln); ecrireValeur(a[0], v8, ln); majFlags(v8); break; }
        case 'cmp': { cmpDiff = lireValeur(a[0], ln) - lireValeur(a[1], ln); majFlags(cmpDiff); break; }
        case 'test': { var v9 = lireValeur(a[0], ln) & lireValeur(a[1], ln); majFlags(v9); break; }
        case 'nop': break;

        case 'jmp': saut = sauterVers(a[0], ln); break;
        case 'je': case 'jz': if (flags.Z) saut = sauterVers(a[0], ln); break;
        case 'jne': case 'jnz': if (!flags.Z) saut = sauterVers(a[0], ln); break;
        case 'jg': if (cmpDiff > 0) saut = sauterVers(a[0], ln); break;
        case 'jge': if (cmpDiff >= 0) saut = sauterVers(a[0], ln); break;
        case 'jl': if (cmpDiff < 0) saut = sauterVers(a[0], ln); break;
        case 'jle': if (cmpDiff <= 0) saut = sauterVers(a[0], ln); break;
        case 'js': if (flags.S) saut = sauterVers(a[0], ln); break;
        case 'jns': if (!flags.S) saut = sauterVers(a[0], ln); break;

        case 'push': pile.push(lireValeur(a[0], ln)); break;
        case 'pop':
          if (!pile.length) fail("La pile est vide : impossible de faire pop.", ln);
          ecrireValeur(a[0], pile.pop(), ln);
          break;
        case 'call': pileAppels.push(pc + 1); saut = sauterVers(a[0], ln); break;
        case 'ret':
          if (!pileAppels.length) fail("ret sans call correspondant : la pile d'appels est vide.", ln);
          saut = pileAppels.pop();
          break;

        case 'print': case 'println':
          if (a[0] && a[0][0] === '"') ecrire(a[0].slice(1, -1) + (m === 'println' ? '\n' : '\n'));
          else ecrire(String(lireValeur(a[0], ln)) + '\n');
          break;

        default: fail("Instruction inconnue : « " + m + " ». Verifie l'orthographe (mov, add, cmp, jmp, push, call, print...).", ln);
      }

      pc = saut !== null ? saut : pc + 1;
    }

    return { out: sortie, regs: regs, flags: flags };
  }

  /* ================= 3. POINT D'ENTREE ================= */
  function run(source) {
    var res = { out: '', error: null, errorLine: 0, errorType: '', regs: null };
    try {
      var analyse = analyser(source);
      var etat = executer(analyse, {});
      res.out = etat.out;
      res.regs = etat.regs;
    } catch (e) {
      if (e && e.__asm) { res.error = e.msg; res.errorLine = e.line || 0; res.errorType = 'ErreurAsm'; }
      else { res.error = 'Erreur interne : ' + (e && e.message ? e.message : String(e)); res.errorType = 'InternalError'; }
    }
    res.lines = res.out.length ? res.out.replace(/\n$/, '').split('\n') : [];
    return res;
  }

  return { run: run, normReg: normReg };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = AsmRun;
