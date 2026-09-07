/* ARES — « Les Olympiens du Code » : la formation ultime, assembleur x86-64.
   Produit a part entiere, vendu separement d'ARES ULTRA (cle exclusive) :
   ce chemin n'est PAS ajoute au tableau PRO, donc aucune cle "tout debloquer"
   ne l'ouvre jamais — seule sa propre cle le peut. Voir src/70-app.js.        */
var PATH_OLYMPIENS = {
  id: 'olympiens-asm', lang: 'asm', name: 'ASSEMBLEUR', glyph: 'les olympiens du code',
  tag: 'OLYMPIENS · 9 modules', color: '#D4AF37', pro: true, exclusif: true,
  title: 'Les Olympiens du Code',
  blurb: "La formation ultime. Descends sous Python, sous le navigateur, sous tout : parle directement au processeur. Six a douze mois pour une maitrise reelle — cette formation en est le socle complet.",
  chips: ['9 modules', 'Un vrai processeur simule', 'Niveau expert'],
  promise: "Personne n'apprend l'assembleur en trois jours, et cette formation ne le prétend pas. Elle te donne les fondations completes — registres, pile, sauts, fonctions, memoire — sur lesquelles se construit une vraie maitrise au fil des mois : celle de quelqu'un qui comprend ce que fait vraiment un ordinateur, instruction par instruction.",
  days: [

    /* ============ MODULE 1 : LES REGISTRES ============ */
    {
      n: 1, title: 'Les registres', sub: 'Semaine 1 — parler directement au processeur',
      lessons: [
        {
          id: 'oa-1-1', title: "Ce qu'est vraiment l'assembleur", kind: 'lecon', xp: 40,
          goal: "Comprendre pourquoi l'assembleur n'a ni variables ni fonctions integrees : il n'y a que le processeur, nu.",
          blocks: [
            { t: 'p', v: "Python cache la machine derriere des variables, des listes, des fonctions. L'assembleur ne cache rien : chaque ligne correspond directement a une instruction que le processeur execute. Pas de magie, pas de traduction cachee — ce que tu ecris est ce qui tourne, cycle par cycle." },
            { t: 'analogy', v: "<b>L'image a retenir :</b> Python, c'est conduire une voiture automatique. L'assembleur, c'est manipuler soi-meme l'embrayage, l'allumage, l'injection. Plus lent a apprendre, mais plus rien ne t'echappe sur ce qui se passe sous le capot — et c'est exactement ce que fait un compilateur pour toi en silence." },
            { t: 'code', run: true, v: `mov rax, 42\nprint rax` },
            { t: 'p', v: "<code>mov rax, 42</code> place la valeur 42 dans un registre nomme <code>rax</code>. <code>print rax</code> l'affiche. Deux instructions, deux actions, rien de plus." },
            { t: 'warn', h: "PRINT n'est pas une vraie instruction x86", v: "Un vrai processeur ne sait pas afficher du texte : il faut demander a l'OS via un appel systeme, different sur Linux, Windows ou Mac. Pour rester concentre sur l'assembleur lui-meme, la forge ARES fournit <code>print</code> comme instruction pedagogique. Tout le reste que tu vas apprendre est du vrai x86-64." },
            { t: 'key', h: 'A retenir', v: "L'assembleur execute directement le materiel · mov deplace une valeur · print affiche (convention de la forge, pas du vrai x86)." }
          ],
          ex: [
            {
              brief: "Place la valeur <code>7</code> dans le registre <code>rax</code>, puis affiche-le.",
              starter: '; ecris ton code ici\n',
              hint: 'mov rax, 7 puis print rax',
              solution: `mov rax, 7\nprint rax`,
              tests: [{ expect: '7' }]
            }
          ],
          quiz: [
            { q: "Que fait mov rax, 42 ?", opts: ['Additionne 42 a rax', 'Place 42 dans rax', 'Affiche 42'], a: 1, why: "mov (move) copie une valeur dans un registre — il n'additionne ni n'affiche rien." },
            { q: "print est-il une vraie instruction du processeur x86 ?", opts: ['Oui', 'Non, c\'est une convention de la forge'], a: 1, why: "Un vrai programme demande a l'OS d'afficher du texte via un appel systeme, different selon la plateforme." }
          ]
        },
        {
          id: 'oa-1-2', title: 'Les registres, les tiroirs du processeur', kind: 'lecon', xp: 45,
          goal: 'Connaitre les registres generaux et deplacer des valeurs entre eux.',
          blocks: [
            { t: 'p', v: "Un processeur x86-64 possede 16 registres generaux : <code>rax, rbx, rcx, rdx, rsi, rdi, rbp, rsp</code>, et <code>r8</code> a <code>r15</code>. Ce sont des cases memoire ultra-rapides, directement dans la puce — bien plus rapides que la RAM, mais il n'y en a que 16." },
            { t: 'code', run: true, v: `mov rax, 10\nmov rbx, 20\nmov rcx, rax\nprint rcx` },
            { t: 'p', v: "<code>mov rcx, rax</code> copie la valeur de <code>rax</code> dans <code>rcx</code> — <code>rax</code> garde sa valeur, elle est dupliquee, pas deplacee malgre le nom \"mov\"." },
            { t: 'tip', h: 'Des noms herites des annees 1970', v: "rax (accumulator), rbx (base), rcx (counter), rdx (data) viennent des tout premiers processeurs Intel. Aujourd'hui ils sont interchangeables pour l'essentiel, mais certaines instructions (comme <code>div</code>) utilisent encore <code>rax</code> et <code>rdx</code> de maniere implicite — tu le verras au module 2." },
            { t: 'key', h: 'A retenir', v: "16 registres generaux · mov dst, src copie src dans dst sans le modifier · rax/rbx/rcx/rdx ont des roles historiques encore actifs." }
          ],
          ex: [
            {
              brief: "Place <code>5</code> dans <code>rax</code>, copie <code>rax</code> dans <code>rbx</code>, puis affiche <code>rbx</code> suivi de <code>rax</code> (deux print).",
              starter: 'mov rax, 5\n',
              hint: 'mov rbx, rax puis print rbx et print rax.',
              solution: `mov rax, 5\nmov rbx, rax\nprint rbx\nprint rax`,
              tests: [{ expect: '5\n5' }]
            }
          ],
          quiz: [
            { q: 'Combien de registres generaux possede un processeur x86-64 ?', opts: ['4', '8', '16'], a: 2, why: 'rax a rdx, rsi, rdi, rbp, rsp, puis r8 a r15 : seize au total.' }
          ]
        },
        {
          id: 'oa-1-3', title: 'eax et rax : le petit et le grand tiroir', kind: 'lecon', xp: 45,
          goal: 'Comprendre la difference entre les registres 64 bits et leurs alias 32 bits.',
          blocks: [
            { t: 'p', v: "Chaque registre 64 bits comme <code>rax</code> a un alias 32 bits : <code>eax</code>. C'est un heritage de l'evolution des processeurs (16 bits, puis 32, puis 64) : <code>eax</code> designe la moitie basse de <code>rax</code>." },
            { t: 'code', run: true, v: `mov eax, 100\nadd rax, 5\nprint eax` },
            { t: 'warn', h: 'Simplification de la forge', v: "Sur un vrai processeur, ecrire dans <code>eax</code> remet a zero la moitie haute de <code>rax</code> — une subtilite qui piege meme des developpeurs experimentes. Dans la forge ARES, <code>eax</code> et <code>rax</code> partagent exactement la meme valeur, sans troncature, pour rester concentre sur l'essentiel." },
            { t: 'key', h: 'A retenir', v: "eax/ebx/ecx/edx... sont les alias 32 bits de rax/rbx/rcx/rdx... · dans cette forge, ils partagent la meme valeur sans troncature." }
          ],
          ex: [
            {
              brief: "Place <code>50</code> dans <code>ebx</code>, ajoute <code>25</code> a <code>rbx</code>, puis affiche <code>ebx</code>.",
              starter: '',
              hint: 'mov ebx, 50 puis add rbx, 25 puis print ebx',
              solution: `mov ebx, 50\nadd rbx, 25\nprint ebx`,
              tests: [{ expect: '75' }]
            }
          ],
          quiz: [
            { q: "Dans la forge ARES, que vaut eax apres mov rax, 9 ?", opts: ['0', '9', 'Une erreur'], a: 1, why: 'eax et rax partagent la meme valeur dans cette forge : ils désignent le même tiroir.' }
          ]
        },
        {
          id: 'oa-1-4', title: 'Epreuve I — Echanger deux valeurs', kind: 'boss', xp: 70,
          goal: "Le premier vrai probleme d'algorithmique bas niveau : echanger deux registres sans variable auxiliaire visible.",
          blocks: [
            { t: 'p', v: "Un classique absolu : echanger le contenu de deux registres. En assembleur, il n'y a pas de \"variable temporaire\" magique — il faut vraiment reflechir a l'ordre des operations pour ne rien ecraser trop tot." },
            { t: 'tip', h: 'La methode la plus simple', v: "Utilise un troisieme registre comme intermediaire : c'est parfaitement legitime, un processeur en a seize pour une raison." }
          ],
          ex: [
            {
              brief: "rax vaut 3 et rbx vaut 8. Echange leurs valeurs (a la fin, rax doit valoir 8 et rbx doit valoir 3), puis affiche rax et rbx dans cet ordre.",
              starter: 'mov rax, 3\nmov rbx, 8\n',
              hint: 'mov rcx, rax (sauvegarde) — mov rax, rbx — mov rbx, rcx',
              solution: `mov rax, 3\nmov rbx, 8\nmov rcx, rax\nmov rax, rbx\nmov rbx, rcx\nprint rax\nprint rbx`,
              tests: [{ expect: '8\n3' }],
              success: "Premiere epreuve reussie. Ce motif d'echange via un registre intermediaire reapparaitra partout, y compris dans le tri final du module 9."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 2 : ARITHMETIQUE ============ */
    {
      n: 2, title: 'Arithmetique', sub: 'Semaine 2 — calculer avec des registres',
      lessons: [
        {
          id: 'oa-2-1', title: 'add, sub, inc, dec', kind: 'lecon', xp: 45,
          goal: 'Maitriser les quatre instructions arithmetiques de base.',
          blocks: [
            { t: 'p', v: "Quatre instructions couvrent l'essentiel de l'arithmetique simple : <code>add</code> et <code>sub</code> pour additionner et soustraire, <code>inc</code> et <code>dec</code> pour ajouter ou retirer 1 rapidement (increment/decrement)." },
            { t: 'code', run: true, v: `mov rax, 10\nadd rax, 5\nsub rax, 3\ninc rax\ndec rax\ndec rax\nprint rax` },
            { t: 'p', v: "Trace a la main : 10, +5=15, -3=12, +1=13, -1=12, -1=11. Toujours verifier une suite d'instructions ligne par ligne avant de l'executer — c'est le reflexe numero un en assembleur." },
            { t: 'key', h: 'A retenir', v: "add dst, src : dst += src · sub dst, src : dst -= src · inc/dec : +1/-1, plus rapides et plus lisibles qu'un add/sub de 1." }
          ],
          ex: [
            {
              brief: "rax vaut 20. Soustrais 8, ajoute 3, puis decremente deux fois. Affiche le resultat final.",
              starter: 'mov rax, 20\n',
              hint: 'sub rax, 8 — add rax, 3 — dec rax — dec rax',
              solution: `mov rax, 20\nsub rax, 8\nadd rax, 3\ndec rax\ndec rax\nprint rax`,
              tests: [{ expect: '13' }]
            }
          ],
          quiz: [
            { q: 'Que fait inc rax par rapport a add rax, 1 ?', opts: ['Rien de different, resultat identique', 'inc multiplie par 1', 'inc est reserve aux tableaux'], a: 0, why: 'inc est juste une ecriture plus courte (et historiquement plus rapide) pour ajouter 1.' }
          ]
        },
        {
          id: 'oa-2-2', title: 'mul et div : le role special de rax', kind: 'lecon', xp: 50,
          goal: "Comprendre pourquoi mul et div n'ont qu'un seul operande, et ou vont les resultats.",
          blocks: [
            { t: 'p', v: "Contrairement a <code>add</code> ou <code>sub</code>, <code>mul</code> et <code>div</code> n'ont qu'un seul operande explicite : ils utilisent <b>toujours</b> <code>rax</code> de maniere implicite." },
            { t: 'code', run: true, v: `mov rax, 6\nmov rbx, 7\nmul rbx\nprint rax` },
            { t: 'p', v: "<code>mul rbx</code> calcule <code>rax = rax * rbx</code>. Le resultat remplace <code>rax</code>." },
            { t: 'code', run: true, v: `mov rax, 17\nmov rbx, 5\ndiv rbx\nprint rax\nprint rdx` },
            { t: 'p', v: "<code>div rbx</code> divise <code>rax</code> par <code>rbx</code> : le <b>quotient</b> va dans <code>rax</code>, le <b>reste</b> va automatiquement dans <code>rdx</code>. 17 / 5 = 3 reste 2." },
            { t: 'warn', h: 'Division par zero', v: "Comme sur un vrai processeur, diviser par zero est une erreur fatale — le programme s'arrete. Verifie toujours ton diviseur avant un <code>div</code>." },
            { t: 'key', h: 'A retenir', v: "mul src : rax = rax * src · div src : rax = quotient, rdx = reste · les deux modifient rax implicitement." }
          ],
          ex: [
            {
              brief: "Calcule 9 x 4 dans rax, affiche-le. Puis divise 50 par 7, affiche le quotient puis le reste.",
              starter: '',
              hint: 'mov rax, 9 / mov rbx, 4 / mul rbx / print rax — puis recommence avec 50 et 7 pour div.',
              solution: `mov rax, 9\nmov rbx, 4\nmul rbx\nprint rax\nmov rax, 50\nmov rbx, 7\ndiv rbx\nprint rax\nprint rdx`,
              tests: [{ expect: '36\n7\n1' }]
            }
          ],
          quiz: [
            { q: 'Apres div rbx, ou se trouve le reste de la division ?', opts: ['rax', 'rbx', 'rdx'], a: 2, why: 'rax recoit le quotient, rdx recoit toujours le reste.' },
            { q: 'Que se passe-t-il si on divise par zero ?', opts: ['rax vaut 0', 'Le programme plante', 'rdx vaut -1'], a: 1, why: 'La division par zero est une erreur fatale, comme sur un vrai processeur.' }
          ]
        },
        {
          id: 'oa-2-3', title: 'Epreuve II — Convertir des secondes', kind: 'boss', xp: 75,
          goal: 'Un vrai probleme : convertir une duree en secondes vers minutes et secondes restantes.',
          blocks: [
            { t: 'p', v: "Un programme utile pour de vrai : convertir 125 secondes en \"2 minutes et 5 secondes\". C'est exactement <code>div</code> avec son quotient et son reste — la meme logique qu'une horloge." }
          ],
          ex: [
            {
              brief: "rax vaut 125 (des secondes). Affiche le nombre de minutes completes, puis le nombre de secondes restantes (deux print, dans cet ordre).",
              starter: 'mov rax, 125\n',
              hint: 'mov rbx, 60 — div rbx — print rax (minutes) — print rdx (secondes restantes)',
              solution: `mov rax, 125\nmov rbx, 60\ndiv rbx\nprint rax\nprint rdx`,
              tests: [{ expect: '2\n5' }],
              success: "125 secondes, c'est bien 2 minutes et 5 secondes. Cette meme technique convertit des centimes en euros, des pixels en pages, ou des octets en kilo-octets."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 3 : LA PILE ============ */
    {
      n: 3, title: 'La pile', sub: 'Semaine 3 — push, pop, et le dernier arrive, premier sorti',
      lessons: [
        {
          id: 'oa-3-1', title: 'push et pop : la pile de livres', kind: 'lecon', xp: 45,
          goal: "Comprendre le fonctionnement LIFO de la pile, l'une des structures les plus fondamentales de l'informatique.",
          blocks: [
            { t: 'p', v: "La pile (stack) est une zone de memoire qui fonctionne comme une pile d'assiettes : on ne peut poser (<code>push</code>) ou retirer (<code>pop</code>) que par le dessus. Le dernier pose est toujours le premier retire : c'est le principe <b>LIFO</b> (Last In, First Out)." },
            { t: 'code', run: true, v: `mov rax, 1\nmov rbx, 2\npush rax\npush rbx\npop rax\npop rbx\nprint rax\nprint rbx` },
            { t: 'analogy', v: "<b>L'image a retenir :</b> empile 1 puis 2 sur une pile d'assiettes. Retire une assiette : c'est le 2 qui vient en premier, pas le 1. C'est exactement pour ca que le code ci-dessus affiche 2 puis 1 : rax et rbx ont ete <b>echanges</b> par la pile, sans variable intermediaire !" },
            { t: 'key', h: 'A retenir', v: "push valeur : empile · pop registre : depile dans ce registre · dernier entre, premier sorti (LIFO)." }
          ],
          ex: [
            {
              brief: "Empile rax, rbx et rcx (valant 10, 20, 30) dans cet ordre, puis depile trois fois de suite avec trois print directement (sans passer par un registre intermediaire n'est pas possible : depile dans rax a chaque fois et affiche).",
              starter: 'mov rax, 10\nmov rbx, 20\nmov rcx, 30\n',
              hint: 'push rax, push rbx, push rcx, puis trois fois : pop rax puis print rax.',
              solution: `mov rax, 10\nmov rbx, 20\nmov rcx, 30\npush rax\npush rbx\npush rcx\npop rax\nprint rax\npop rax\nprint rax\npop rax\nprint rax`,
              tests: [{ expect: '30\n20\n10' }],
              success: "L'ordre est inverse : c'est la signature de toute pile. Retiens ce reflexe, il explique a lui seul le fonctionnement des appels de fonction du module 6."
            }
          ],
          quiz: [
            { q: 'Si on empile 1 puis 2 puis 3, dans quel ordre ressortent-ils ?', opts: ['1, 2, 3', '3, 2, 1', 'Un ordre aleatoire'], a: 1, why: 'LIFO : le dernier entre (3) est toujours le premier sorti.' }
          ]
        },
        {
          id: 'oa-3-2', title: 'Sauvegarder un registre le temps d\'un calcul', kind: 'lecon', xp: 50,
          goal: "Utiliser la pile pour proteger une valeur pendant qu'on reutilise un registre pour autre chose.",
          blocks: [
            { t: 'p', v: "Avec seize registres, on en manque vite quand un calcul se complique. La pile sert de \"memoire temporaire\" : on y depose une valeur precieuse, on utilise librement le registre pour un calcul intermediaire, puis on la recupere." },
            { t: 'code', run: true, v: `mov rax, 100\npush rax\nmov rax, 5\nmul rax\nprint rax\npop rax\nprint rax` },
            { t: 'p', v: "rax vaut 100, on le sauvegarde. On le reutilise librement (100 x 5, sans rapport). Puis on restaure exactement la valeur d'avant : 100 est intact." },
            { t: 'key', h: 'A retenir', v: "push avant de reutiliser un registre, pop pour le restaurer plus tard — dans l'ordre inverse des push." }
          ],
          ex: [
            {
              brief: "rax vaut 7. Sauvegarde-le sur la pile, calcule 12 x 3 dans rax et affiche-le, puis restaure la valeur d'origine de rax et affiche-la.",
              starter: 'mov rax, 7\n',
              hint: 'push rax — mov rax, 12 — mov rbx, 3 — mul rbx — print rax — pop rax — print rax',
              solution: `mov rax, 7\npush rax\nmov rax, 12\nmov rbx, 3\nmul rbx\nprint rax\npop rax\nprint rax`,
              tests: [{ expect: '36\n7' }]
            }
          ]
        },
        {
          id: 'oa-3-3', title: 'Epreuve III — Inverser trois valeurs', kind: 'boss', xp: 70,
          goal: 'Utiliser la pile pour inverser l\'ordre de trois valeurs, sans aucun calcul, juste par sa structure.',
          blocks: [
            { t: 'p', v: "La pile inverse naturellement l'ordre de tout ce qu'on y met. C'est un outil, pas juste une curiosite : c'est ainsi qu'un navigateur retient l'historique \"page precedente\", ou qu'un editeur de texte annule tes dernieres actions dans le bon ordre." }
          ],
          ex: [
            {
              brief: "rax, rbx, rcx valent 100, 200, 300. Affiche-les dans l'ordre inverse (300, 200, 100) en utilisant uniquement la pile (push puis pop), pas de mov entre eux.",
              starter: 'mov rax, 100\nmov rbx, 200\nmov rcx, 300\n',
              hint: 'push rax, push rbx, push rcx, puis trois pop rax + print rax d\'affilee.',
              solution: `mov rax, 100\nmov rbx, 200\nmov rcx, 300\npush rax\npush rbx\npush rcx\npop rax\nprint rax\npop rax\nprint rax\npop rax\nprint rax`,
              tests: [{ expect: '300\n200\n100' }],
              success: "La pile a fait tout le travail d'inversion toute seule."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 4 : COMPARER ET SAUTER ============ */
    {
      n: 4, title: 'Comparer et sauter', sub: 'Semaine 4 — les conditions, sans if',
      lessons: [
        {
          id: 'oa-4-1', title: 'cmp et les sauts conditionnels', kind: 'lecon', xp: 50,
          goal: "Comprendre qu'un if n'est, au fond, qu'une comparaison suivie d'un saut.",
          blocks: [
            { t: 'p', v: "L'assembleur n'a pas de <code>if</code>. Il a <code>cmp</code> (compare deux valeurs) et des sauts conditionnels qui se declenchent selon le resultat. Tout <code>if</code> de Python ou JavaScript se traduit exactement comme ca une fois compile." },
            { t: 'code', run: true, v: `mov rax, 10\ncmp rax, 5\njg plus_grand\nprint "pas plus grand"\njmp fin\nplus_grand:\nprint "plus grand"\nfin:` },
            {
              t: 'table', head: ['Instruction', 'Saute si...'],
              rows: [['<code>je</code> / <code>jz</code>', 'egal (equal / zero)'], ['<code>jne</code> / <code>jnz</code>', 'different'],
                     ['<code>jg</code>', 'strictement superieur'], ['<code>jge</code>', 'superieur ou egal'],
                     ['<code>jl</code>', 'strictement inferieur'], ['<code>jle</code>', 'inferieur ou egal']]
            },
            { t: 'tip', h: 'Le motif a retenir', v: "cmp a, b se lit \"compare a a b\". <code>jg</code> saute si a &gt; b. C'est toujours dans cet ordre-la : le premier operande de cmp est la reference." },
            { t: 'key', h: 'A retenir', v: "cmp a, b compare sans rien modifier · un saut conditionnel juste apres teste le resultat · jmp saute toujours, sans condition." }
          ],
          ex: [
            {
              brief: "rax vaut 8. Si rax est strictement inferieur a 10, affiche <code>petit</code>, sinon affiche <code>grand</code>.",
              starter: 'mov rax, 8\n',
              hint: 'cmp rax, 10 — jl petit — print "grand" — jmp fin — petit: print "petit" — fin:',
              solution: `mov rax, 8\ncmp rax, 10\njl petit\nprint "grand"\njmp fin\npetit:\nprint "petit"\nfin:`,
              tests: [{ expect: 'petit' }]
            }
          ],
          quiz: [
            { q: 'Que fait cmp rax, rbx ?', opts: ['Additionne rax et rbx', 'Compare rax et rbx sans les modifier', 'Copie rbx dans rax'], a: 1, why: 'cmp calcule la difference en interne pour les sauts suivants, mais ne change ni rax ni rbx.' },
            { q: "Quelle instruction saute si a est superieur ou egal a b (apres cmp a, b) ?", opts: ['jg', 'jge', 'jle'], a: 1, why: 'jge = jump if greater or equal.' }
          ]
        },
        {
          id: 'oa-4-2', title: 'Construire un if/elif/else complet', kind: 'lecon', xp: 55,
          goal: "Enchainer plusieurs comparaisons pour reproduire un if/elif/else a trois branches.",
          blocks: [
            { t: 'p', v: "Un <code>if/elif/else</code> a trois branches se construit en enchainant les comparaisons, chacune sautant vers son propre bloc, avec un <code>jmp fin</code> a la fin de chaque bloc pour eviter de \"tomber\" dans le suivant." },
            { t: 'code', run: true, v: `mov rax, 15\ncmp rax, 16\njge majeur\ncmp rax, 13\njge ado\nprint "enfant"\njmp fin\nado:\nprint "ado"\njmp fin\nmajeur:\nprint "majeur"\nfin:` },
            { t: 'warn', h: "N'oublie jamais le jmp fin", v: "Sans lui, apres avoir affiche \"ado\", l'execution continuerait tout droit dans le bloc \"majeur\" juste en dessous ! C'est l'erreur la plus frequente de ce module." },
            { t: 'key', h: 'A retenir', v: "Chaque branche se termine par jmp fin, sauf la derniere · verifie du cas le plus exigeant au moins exigeant." }
          ],
          ex: [
            {
              brief: "rax contient une note sur 20. Affiche <code>tres bien</code> si rax >= 16, <code>bien</code> si rax >= 12, sinon <code>a revoir</code>. Teste avec rax = 14.",
              starter: 'mov rax, 14\n',
              hint: 'cmp rax, 16 / jge tresbien / cmp rax, 12 / jge bien / print "a revoir" / jmp fin / bien: print "bien" / jmp fin / tresbien: print "tres bien" / fin:',
              solution: `mov rax, 14\ncmp rax, 16\njge tresbien\ncmp rax, 12\njge bien\nprint "a revoir"\njmp fin\nbien:\nprint "bien"\njmp fin\ntresbien:\nprint "tres bien"\nfin:`,
              tests: [{ expect: 'bien' }]
            }
          ]
        },
        {
          id: 'oa-4-3', title: 'Epreuve IV — Le signe d\'un nombre', kind: 'boss', xp: 70,
          goal: 'Classer un nombre en negatif, nul ou positif : un algorithme simple mais qu\'il faut ecrire sans erreur.',
          blocks: [
            { t: 'p', v: "Trois cas, deux comparaisons, un piege classique : ne pas confondre l'ordre des tests. Ce petit programme est un excellent test de rigueur avant d'attaquer les boucles." }
          ],
          ex: [
            {
              brief: "rax vaut -4. Affiche <code>negatif</code> si rax < 0, <code>nul</code> si rax == 0, sinon <code>positif</code>.",
              starter: 'mov rax, -4\n',
              hint: 'cmp rax, 0 / jl negatif / je nul / print "positif" / jmp fin / negatif: ... / nul: ...',
              solution: `mov rax, -4\ncmp rax, 0\njl negatif\nje nul\nprint "positif"\njmp fin\nnegatif:\nprint "negatif"\njmp fin\nnul:\nprint "nul"\nfin:`,
              tests: [{ expect: 'negatif' }],
              success: "Trois branches, zero erreur de saut : la base de tout algorithme de decision est acquise."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 5 : BOUCLES ============ */
    {
      n: 5, title: 'Boucles', sub: 'Semaine 5-6 — repeter avec des etiquettes',
      lessons: [
        {
          id: 'oa-5-1', title: 'Construire une boucle avec jmp', kind: 'lecon', xp: 55,
          goal: "Comprendre qu'une boucle n'est qu'une etiquette, une condition de sortie, et un saut vers le debut.",
          blocks: [
            { t: 'p', v: "Comme le <code>if</code>, la boucle <code>for</code> ou <code>while</code> n'existe pas en assembleur : elle se construit avec une etiquette, une comparaison de sortie, le corps de la boucle, et un <code>jmp</code> qui revient au debut." },
            { t: 'code', run: true, v: `mov rcx, 0\nboucle:\ncmp rcx, 5\njge fin\nprint rcx\ninc rcx\njmp boucle\nfin:` },
            { t: 'analogy', v: "<b>L'image a retenir :</b> l'etiquette <code>boucle:</code> est un point de repere, pas une action. <code>jmp boucle</code> dit litteralement \"retourne lire les instructions a partir d'ici\". Une boucle, c'est juste... revenir en arriere dans le texte du programme." },
            { t: 'key', h: 'A retenir', v: "etiquette: marque un point de retour · condition de sortie au debut (cmp + saut vers la fin) · jmp etiquette revient au debut · toujours faire evoluer la variable de test." }
          ],
          ex: [
            {
              brief: "Affiche les nombres de 1 a 4 inclus (quatre print), en utilisant une boucle avec des etiquettes.",
              starter: 'mov rcx, 1\n',
              hint: 'boucle: / cmp rcx, 5 / jge fin / print rcx / inc rcx / jmp boucle / fin:',
              solution: `mov rcx, 1\nboucle:\ncmp rcx, 5\njge fin\nprint rcx\ninc rcx\njmp boucle\nfin:`,
              tests: [{ expect: '1\n2\n3\n4' }]
            }
          ],
          quiz: [
            { q: "Qu'arrive-t-il si on oublie inc rcx dans une boucle qui teste rcx ?", opts: ['Rien, la boucle s\'arrete quand meme', 'La boucle tourne indefiniment', 'Erreur de compilation'], a: 1, why: 'Sans evolution de la variable testee, la condition de sortie ne devient jamais vraie.' }
          ]
        },
        {
          id: 'oa-5-2', title: 'Compte a rebours et accumulation', kind: 'lecon', xp: 55,
          goal: "Faire decroitre un compteur, et accumuler un total au fil d'une boucle.",
          blocks: [
            { t: 'p', v: "Une boucle peut aussi bien descendre que monter, et peut faire evoluer un second registre a chaque tour — c'est exactement le motif de l'accumulateur, deja rencontre en Python." },
            { t: 'code', run: true, v: `mov rax, 0\nmov rcx, 1\nboucle:\ncmp rcx, 6\njge fin\nadd rax, rcx\ninc rcx\njmp boucle\nfin:\nprint rax` },
            { t: 'p', v: "rax accumule la somme de 1 a 5 : 1+2+3+4+5 = 15. Le squelette est identique a la boucle precedente, seule une ligne <code>add rax, rcx</code> a ete ajoutee." },
            { t: 'key', h: 'A retenir', v: "un accumulateur s\'initialise avant la boucle et se met a jour dedans, comme en Python." }
          ],
          ex: [
            {
              brief: "Calcule la somme des nombres de 1 a 10 dans rax avec une boucle, puis affiche-la.",
              starter: 'mov rax, 0\nmov rcx, 1\n',
              hint: 'cmp rcx, 11 / jge fin / add rax, rcx / inc rcx / jmp boucle',
              solution: `mov rax, 0\nmov rcx, 1\nboucle:\ncmp rcx, 11\njge fin\nadd rax, rcx\ninc rcx\njmp boucle\nfin:\nprint rax`,
              tests: [{ expect: '55' }]
            }
          ]
        },
        {
          id: 'oa-5-3', title: 'Epreuve V — Table de multiplication', kind: 'boss', xp: 75,
          goal: 'Un vrai petit programme utile : afficher une table de multiplication complete.',
          blocks: [
            { t: 'p', v: "Une boucle qui multiplie et affiche a chaque tour : c'est le meme squelette que d'habitude, avec <code>mul</code> a l'interieur." }
          ],
          ex: [
            {
              brief: "Affiche la table de 7, de 7x1 a 7x10 (dix print, un resultat par ligne : 7, 14, 21... jusqu'a 70).",
              starter: 'mov rcx, 1\n',
              hint: 'boucle: cmp rcx, 11 / jge fin / mov rax, 7 / mul rcx / print rax / inc rcx / jmp boucle',
              solution: `mov rcx, 1\nboucle:\ncmp rcx, 11\njge fin\nmov rax, 7\nmul rcx\nprint rax\ninc rcx\njmp boucle\nfin:`,
              tests: [{ expect: '7\n14\n21\n28\n35\n42\n49\n56\n63\n70' }],
              success: "Dix lignes generees par sept lignes de code : c'est toute la puissance de la boucle."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 6 : FONCTIONS ET CONVENTION D'APPEL ============ */
    {
      n: 6, title: "Fonctions et convention d'appel", sub: 'Mois 2 — call, ret, et la recursivite',
      lessons: [
        {
          id: 'oa-6-1', title: 'call et ret : la pile refait surface', kind: 'lecon', xp: 55,
          goal: "Comprendre comment call et ret utilisent la pile pour se souvenir d'ou revenir.",
          blocks: [
            { t: 'p', v: "<code>call etiquette</code> fait deux choses : il empile l'adresse de l'instruction suivante (pour savoir ou revenir), puis saute a l'etiquette. <code>ret</code> depile cette adresse et y retourne. C'est exactement la pile du module 3, utilisee automatiquement." },
            { t: 'code', run: true, v: `call dire_bonjour\nprint "retour au programme principal"\njmp fin\ndire_bonjour:\nprint "bonjour depuis la fonction"\nret\nfin:` },
            { t: 'analogy', v: "<b>L'image a retenir :</b> call, c'est partir en courses en laissant un post-it \"je reviens juste apres cette ligne\". ret, c'est lire le post-it et y retourner. Sans post-it (sans call), impossible de savoir ou revenir — c'est pour ca que ret sans call correspondant est une erreur." },
            { t: 'key', h: 'A retenir', v: "call empile l\'adresse de retour puis saute · ret depile cette adresse et y revient · une fonction assembleur, c\'est juste une etiquette qui finit par ret." }
          ],
          ex: [
            {
              brief: "Ecris une fonction <code>saluer</code> qui affiche <code>salut</code>, appelle-la deux fois de suite, puis affiche <code>fini</code>.",
              starter: '',
              hint: 'call saluer / call saluer / print "fini" / jmp fin / saluer: print "salut" / ret / fin:',
              solution: `call saluer\ncall saluer\nprint "fini"\njmp fin\nsaluer:\nprint "salut"\nret\nfin:`,
              tests: [{ expect: 'salut\nsalut\nfini' }]
            }
          ],
          quiz: [
            { q: 'Ou call range-t-il l\'adresse de retour ?', opts: ['Dans rax', 'Sur la pile', 'Dans un fichier'], a: 1, why: 'call empile l\'adresse de retour, exactement comme un push.' }
          ]
        },
        {
          id: 'oa-6-2', title: 'Passer un argument et recuperer un resultat', kind: 'lecon', xp: 60,
          goal: 'Utiliser la convention la plus repandue : argument dans rdi, resultat dans rax.',
          blocks: [
            { t: 'p', v: "Sur de vrais systemes (convention System V, utilisee sur Linux et Mac), le premier argument d'une fonction voyage dans <code>rdi</code>, et le resultat ressort dans <code>rax</code>. La forge ARES suit exactement cette convention." },
            { t: 'code', run: true, v: `mov rdi, 6\ncall carre\nprint rax\njmp fin\ncarre:\nmov rax, rdi\nmul rax\nret\nfin:` },
            { t: 'p', v: "On place l'argument (6) dans <code>rdi</code> avant l'appel. La fonction <code>carre</code> le lit depuis <code>rdi</code>, calcule, et laisse le resultat dans <code>rax</code> — exactement comme <code>return</code> en Python." },
            { t: 'key', h: 'A retenir', v: "argument -> rdi avant call · resultat -> rax avant ret · c\'est une convention, pas une regle imposee par le processeur, mais elle est quasi universelle." }
          ],
          ex: [
            {
              brief: "Ecris une fonction <code>double</code> qui recoit sa valeur dans rdi et renvoie le double dans rax. Appelle-la avec 9 et affiche le resultat.",
              starter: '',
              hint: 'mov rdi, 9 / call double / print rax / jmp fin / double: mov rax, rdi / add rax, rdi / ret / fin:',
              solution: `mov rdi, 9\ncall double\nprint rax\njmp fin\ndouble:\nmov rax, rdi\nadd rax, rdi\nret\nfin:`,
              tests: [{ expect: '18' }]
            }
          ]
        },
        {
          id: 'oa-6-3', title: 'La recursivite : une fonction qui s\'appelle elle-meme', kind: 'lecon', xp: 65,
          goal: 'Ecrire une fonction recursive en assembleur, en protegeant les registres sur la pile.',
          blocks: [
            { t: 'p', v: "Une fonction recursive s'appelle elle-meme. Le piege : chaque appel utilise les <b>memes registres</b>. Il faut donc sauvegarder sur la pile ce qu'on veut retrouver apres l'appel recursif." },
            { t: 'code', run: true, v: `mov rdi, 5\ncall fact\nprint rax\njmp fin\nfact:\ncmp rdi, 1\njg suite\nmov rax, 1\nret\nsuite:\npush rdi\ndec rdi\ncall fact\npop rdi\nmul rdi\nret\nfin:` },
            { t: 'p', v: "Avant l'appel recursif, on sauvegarde <code>rdi</code> (sinon l'appel imbrique l'ecraserait). Apres le retour, on le restaure pour pouvoir multiplier <code>rax</code> (le resultat de l'appel imbrique) par la bonne valeur." },
            { t: 'warn', h: 'Le cas de base est obligatoire', v: "Comme en Python, une recursivite sans condition d'arret (ici <code>cmp rdi, 1 / jg suite</code>) boucle indefiniment — la forge la coupera avec une erreur de limite de pas." },
            { t: 'key', h: 'A retenir', v: "sauvegarde les registres utiles sur la pile avant un appel recursif, restaure-les juste apres · toujours un cas de base qui arrete la recursion." }
          ],
          ex: [
            {
              brief: "Ecris <code>somme</code>, une fonction recursive qui calcule 1+2+...+n (n dans rdi, resultat dans rax). Cas de base : somme(1) = 1. Teste avec n = 6 (reponse : 21).",
              starter: 'mov rdi, 6\ncall somme\nprint rax\njmp fin\n',
              hint: 'somme: cmp rdi, 1 / jg suite / mov rax, 1 / ret / suite: push rdi / dec rdi / call somme / pop rdi / add rax, rdi / ret',
              solution: `mov rdi, 6\ncall somme\nprint rax\njmp fin\nsomme:\ncmp rdi, 1\njg suite\nmov rax, 1\nret\nsuite:\npush rdi\ndec rdi\ncall somme\npop rdi\nadd rax, rdi\nret\nfin:`,
              tests: [{ expect: '21' }],
              success: "Une fonction recursive complete, avec sauvegarde de registre sur la pile : tu maitrises maintenant le mecanisme exact qu'utilise n'importe quel compilateur."
            }
          ]
        },
        {
          id: 'oa-6-4', title: 'Epreuve VI — La suite de Fibonacci', kind: 'boss', xp: 90,
          goal: "L'epreuve recursive la plus celebre de toute la programmation, en assembleur pur.",
          blocks: [
            { t: 'p', v: "fibonacci(n) = fibonacci(n-1) + fibonacci(n-2), avec fibonacci(0)=0 et fibonacci(1)=1. Cette fois, il faut sauvegarder DEUX resultats intermediaires sur la pile — le meme principe que la factorielle, pousse un cran plus loin." }
          ],
          ex: [
            {
              brief: "Ecris <code>fib</code> (recursive, n dans rdi, resultat dans rax) et affiche fib(9) (reponse attendue : 34).",
              starter: 'mov rdi, 9\ncall fib\nprint rax\njmp fin\n',
              hint: "fib: cmp rdi, 1 / jg suite / mov rax, rdi / ret / suite: push rdi / dec rdi / call fib / pop rdi / push rax (sauve fib(n-1)) / push rdi / sub rdi, 2 / call fib / pop rdi / pop rbx (recupere fib(n-1)) / add rax, rbx / ret",
              solution: `mov rdi, 9\ncall fib\nprint rax\njmp fin\nfib:\ncmp rdi, 1\njg suite\nmov rax, rdi\nret\nsuite:\npush rdi\ndec rdi\ncall fib\npop rdi\npush rax\npush rdi\nsub rdi, 2\ncall fib\npop rdi\npop rbx\nadd rax, rbx\nret\nfin:`,
              tests: [{ expect: '34' }],
              success: "Fibonacci recursif en assembleur pur, avec double sauvegarde sur la pile. Tres peu de gens arrivent jusqu'ici — tu en fais partie."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 7 : LOGIQUE BINAIRE ============ */
    {
      n: 7, title: 'Logique binaire', sub: 'Mois 3 — and, or, xor, et les masques de bits',
      lessons: [
        {
          id: 'oa-7-1', title: 'and, or, xor : la logique bit a bit', kind: 'lecon', xp: 55,
          goal: 'Manipuler des nombres bit par bit plutot que comme des quantites.',
          blocks: [
            { t: 'p', v: "Chaque nombre est, au fond, une suite de bits (0 ou 1). <code>and</code>, <code>or</code> et <code>xor</code> comparent deux nombres bit par bit — un outil essentiel pour les drapeaux, la compression, ou la cryptographie." },
            { t: 'code', run: true, v: `mov rax, 6\nand rax, 3\nprint rax\nmov rbx, 6\nor rbx, 1\nprint rbx\nmov rcx, 5\nxor rcx, 3\nprint rcx` },
            {
              t: 'table', head: ['Operation', 'Regle bit a bit'],
              rows: [['<code>and</code>', '1 seulement si les deux bits valent 1'], ['<code>or</code>', '1 si au moins un bit vaut 1'], ['<code>xor</code>', '1 si les deux bits sont differents']]
            },
            { t: 'tip', h: 'xor a a : le zero le plus rapide', v: "Un nombre XORe avec lui-meme vaut toujours 0 (chaque bit est identique a lui-meme, donc \"different\" est faux partout). Beaucoup de vrai code assembleur utilise <code>xor rax, rax</code> plutot que <code>mov rax, 0</code> — plus rapide sur un vrai processeur." },
            { t: 'key', h: 'A retenir', v: "and/or/xor comparent bit a bit · xor reg, reg met un registre a zero, une astuce tres repandue." }
          ],
          ex: [
            {
              brief: "Mets rax a zero en utilisant xor (pas mov), puis ajoute 42 et affiche.",
              starter: '',
              hint: 'xor rax, rax puis add rax, 42',
              solution: `xor rax, rax\nadd rax, 42\nprint rax`,
              tests: [{ expect: '42' }],
              must: [['xor\\s+rax\\s*,\\s*rax', 'Utilise xor rax, rax pour mettre rax a zero, pas mov.']]
            }
          ],
          quiz: [
            { q: 'Que vaut toujours x xor x, quel que soit x ?', opts: ['x', '0', '1'], a: 1, why: 'Chaque bit compare a lui-meme est toujours identique, jamais different : le resultat est 0 partout.' }
          ]
        },
        {
          id: 'oa-7-2', title: 'shl, shr et le test de parite par bit', kind: 'lecon', xp: 55,
          goal: 'Decaler des bits, et tester la parite d\'un nombre par son bit de poids faible.',
          blocks: [
            { t: 'p', v: "<code>shl</code> (shift left) decale les bits vers la gauche — equivalent a multiplier par une puissance de 2. <code>shr</code> fait l'inverse, equivalent a une division entiere par une puissance de 2." },
            { t: 'code', run: true, v: `mov rax, 3\nshl rax, 2\nprint rax\nmov rbx, 20\nshr rbx, 2\nprint rbx` },
            { t: 'p', v: "3 decale de 2 crans a gauche donne 12 (3 x 2 x 2). 20 decale de 2 crans a droite donne 5 (20 / 2 / 2)." },
            { t: 'h', v: 'Tester si un nombre est pair, sans div' },
            { t: 'code', run: true, v: `mov rax, 7\nand rax, 1\ncmp rax, 0\nje pair\nprint "impair"\njmp fin\npair:\nprint "pair"\nfin:` },
            { t: 'p', v: "Le dernier bit d'un nombre binaire vaut 1 s'il est impair, 0 s'il est pair. <code>and rax, 1</code> isole exactement ce bit — plus rapide qu'un <code>div</code> pour cette seule question." },
            { t: 'key', h: 'A retenir', v: "shl = multiplier par 2^n · shr = diviser par 2^n · and avec 1 isole le dernier bit, pour tester la parite." }
          ],
          ex: [
            {
              brief: "rax vaut 13. Teste sa parite avec and (pas div), affiche <code>pair</code> ou <code>impair</code>.",
              starter: 'mov rax, 13\n',
              hint: 'push la valeur ou utilise un autre registre pour le test avec and rbx, 1 sans detruire rax si besoin — ici, comme rax n\'est plus utilise apres, and rax, 1 direct suffit.',
              solution: `mov rax, 13\nand rax, 1\ncmp rax, 0\nje pair\nprint "impair"\njmp fin\npair:\nprint "pair"\nfin:`,
              tests: [{ expect: 'impair' }]
            }
          ]
        },
        {
          id: 'oa-7-3', title: 'Epreuve VII — Compter les bits a 1', kind: 'boss', xp: 80,
          goal: "Un algorithme classique des entretiens techniques : compter les bits actives d'un nombre.",
          blocks: [
            { t: 'p', v: "Compter les bits a 1 d'un nombre est un exercice frequent en entretien d'embauche. La methode : tester le dernier bit avec <code>and</code>, decaler avec <code>shr</code>, repeter jusqu'a ce que le nombre soit vide." }
          ],
          ex: [
            {
              brief: "rax vaut 13 (binaire 1101, donc 3 bits a 1). Compte le nombre de bits a 1 et affiche-le dans rcx.",
              starter: 'mov rax, 13\nmov rcx, 0\n',
              hint: 'boucle: cmp rax, 0 / je fin / mov rbx, rax / and rbx, 1 / add rcx, rbx / shr rax, 1 / jmp boucle / fin: print rcx',
              solution: `mov rax, 13\nmov rcx, 0\nboucle:\ncmp rax, 0\nje fin\nmov rbx, rax\nand rbx, 1\nadd rcx, rbx\nshr rax, 1\njmp boucle\nfin:\nprint rcx`,
              tests: [{ expect: '3' }],
              success: "13 en binaire, c'est 1101 : trois bits a 1. Ton algorithme les a tous trouves, un par un."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 8 : MEMOIRE ET TABLEAUX ============ */
    {
      n: 8, title: 'Memoire et tableaux', sub: 'Mois 4 — sortir des registres',
      lessons: [
        {
          id: 'oa-8-1', title: 'Declarer et lire un tableau', kind: 'lecon', xp: 55,
          goal: 'Utiliser la section de donnees pour stocker plus de valeurs que de registres disponibles.',
          blocks: [
            { t: 'p', v: "Seize registres, ca ne suffit pas pour cent valeurs. La memoire prend le relais : on declare un tableau nomme avec <code>dq</code> (define quad), et on y accede par son nom entre crochets." },
            { t: 'code', run: true, v: `notes: dq 12, 15, 8, 17\nmov rax, [notes]\nprint rax` },
            { t: 'p', v: "<code>[notes]</code> lit le premier element du tableau <code>notes</code> (index 0), soit 12." },
            { t: 'h', v: 'Adressage indexe' },
            { t: 'code', run: true, v: `notes: dq 12, 15, 8, 17\nmov rbx, 2\nmov rax, [notes + rbx]\nprint rax` },
            { t: 'p', v: "<code>[notes + rbx]</code> lit l'element a l'index contenu dans <code>rbx</code> — ici l'index 2, donc la valeur 8." },
            { t: 'warn', h: 'Simplification de la forge', v: "Sur un vrai processeur, on ecrirait <code>[notes + rbx*8]</code> car chaque nombre occupe 8 octets en memoire. Dans la forge ARES, chaque case du tableau compte pour un seul element logique : <code>[notes + rbx]</code> et <code>[notes + rbx*8]</code> font exactement la meme chose, pour rester concentre sur la logique plutot que sur le calcul d'adresses en octets." },
            { t: 'key', h: 'A retenir', v: "nom: dq v1, v2, ... declare un tableau · [nom] lit l\'index 0 · [nom + reg] lit a l\'index contenu dans reg." }
          ],
          ex: [
            {
              brief: "Un tableau <code>ages</code> contient 14, 16, 12, 18. Affiche le troisieme element (index 2).",
              starter: 'ages: dq 14, 16, 12, 18\n',
              hint: 'mov rbx, 2 / mov rax, [ages + rbx] / print rax',
              solution: `ages: dq 14, 16, 12, 18\nmov rbx, 2\nmov rax, [ages + rbx]\nprint rax`,
              tests: [{ expect: '12' }]
            }
          ]
        },
        {
          id: 'oa-8-2', title: 'Ecrire en memoire et parcourir un tableau', kind: 'lecon', xp: 60,
          goal: 'Modifier un tableau, et le parcourir entierement avec une boucle.',
          blocks: [
            { t: 'p', v: "On peut aussi bien ecrire dans un tableau que le lire : <code>mov [nom + reg], valeur</code>." },
            { t: 'code', run: true, v: `scores: dq 0, 0, 0\nmov rbx, 1\nmov rax, 99\nmov [scores + rbx], rax\nprint [scores + rbx]` },
            { t: 'h', v: 'Parcourir tout un tableau : combiner boucle et memoire' },
            { t: 'code', run: true, v: `nombres: dq 4, 8, 15, 16, 23\nmov rax, 0\nmov rcx, 0\nboucle:\ncmp rcx, 5\njge fin\nmov rbx, [nombres + rcx]\nadd rax, rbx\ninc rcx\njmp boucle\nfin:\nprint rax` },
            { t: 'p', v: "Le squelette de boucle deja connu, avec une seule ligne nouvelle : <code>mov rbx, [nombres + rcx]</code> lit l'element courant avant de l'ajouter au total." },
            { t: 'key', h: 'A retenir', v: "mov [nom + reg], valeur ecrit dans le tableau · parcourir un tableau = une boucle qui incremente l\'indice de lecture." }
          ],
          ex: [
            {
              brief: "Un tableau <code>notes</code> contient 10, 12, 14, 16, 18. Calcule et affiche leur somme avec une boucle.",
              starter: 'notes: dq 10, 12, 14, 16, 18\nmov rax, 0\nmov rcx, 0\n',
              hint: 'boucle: cmp rcx, 5 / jge fin / mov rbx, [notes + rcx] / add rax, rbx / inc rcx / jmp boucle',
              solution: `notes: dq 10, 12, 14, 16, 18\nmov rax, 0\nmov rcx, 0\nboucle:\ncmp rcx, 5\njge fin\nmov rbx, [notes + rcx]\nadd rax, rbx\ninc rcx\njmp boucle\nfin:\nprint rax`,
              tests: [{ expect: '70' }]
            }
          ]
        },
        {
          id: 'oa-8-3', title: 'Epreuve VIII — Trouver le maximum', kind: 'boss', xp: 85,
          goal: "L'algorithme de recherche du maximum, combinant boucle, memoire et comparaison.",
          blocks: [
            { t: 'p', v: "Trouver le plus grand element d'un tableau : on part du premier comme \"meilleur candidat\", puis on compare chaque element suivant, en remplacant le candidat s'il est depasse. C'est l'algorithme le plus repete de toute la programmation, ici en assembleur pur." }
          ],
          ex: [
            {
              brief: "Un tableau <code>valeurs</code> contient 4, 19, 7, 42, 11. Trouve et affiche le maximum avec une boucle.",
              starter: 'valeurs: dq 4, 19, 7, 42, 11\nmov rax, [valeurs]\nmov rcx, 1\n',
              hint: 'boucle: cmp rcx, 5 / jge fin / mov rbx, [valeurs + rcx] / cmp rbx, rax / jle pas_plus_grand / mov rax, rbx / pas_plus_grand: inc rcx / jmp boucle',
              solution: `valeurs: dq 4, 19, 7, 42, 11\nmov rax, [valeurs]\nmov rcx, 1\nboucle:\ncmp rcx, 5\njge fin\nmov rbx, [valeurs + rcx]\ncmp rbx, rax\njle pas_plus_grand\nmov rax, rbx\npas_plus_grand:\ninc rcx\njmp boucle\nfin:\nprint rax`,
              tests: [{ expect: '42' }],
              success: "42 trouve, un element a la fois. Cet algorithme est le squelette exact du tri du module final."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 9 : EPREUVE FINALE ============ */
    {
      n: 9, title: 'Épreuve finale', sub: "Le trone de l'Olympe",
      lessons: [
        {
          id: 'oa-9-1', title: "Le tri a bulles, brique par brique", kind: 'lecon', xp: 70,
          goal: "Comprendre le tri a bulles avant de l'ecrire en entier : comparer et echanger les voisins.",
          blocks: [
            { t: 'p', v: "Le tri a bulles compare chaque paire d'elements voisins, et les echange s'ils sont dans le mauvais ordre. En repetant ce parcours plusieurs fois, les plus grandes valeurs \"remontent\" comme des bulles vers la fin du tableau." },
            { t: 'p', v: "Tu as deja tout ce qu'il faut : l'echange de deux valeurs (module 1), la comparaison (module 4), la boucle et l'adressage indexe (modules 5 et 8). Ce dernier module ne fait qu'assembler ce que tu maitrises deja." },
            { t: 'code', run: true, v: `t: dq 5, 2\nmov rax, [t]\nmov rbx, [t + 1]\ncmp rax, rbx\njle fin\nmov [t], rbx\nmov [t + 1], rax\nfin:\nprint [t]\nprint [t + 1]` },
            { t: 'p', v: "Une seule paire, comparee et echangee si besoin : 5 et 2 deviennent 2 et 5. Le tri complet repete exactement cette logique sur toutes les paires voisines, plusieurs fois de suite." },
            { t: 'key', h: 'A retenir', v: "comparer deux voisins, les echanger si dans le mauvais ordre, repeter sur tout le tableau, plusieurs fois : c\'est tout le tri a bulles." }
          ],
          ex: [
            {
              brief: "Un tableau <code>t</code> contient 9, 3. Compare ses deux elements et echange-les s'ils sont dans le mauvais ordre (le plus petit doit finir en premier), puis affiche les deux valeurs dans l'ordre du tableau.",
              starter: 't: dq 9, 3\n',
              hint: 'mov rax, [t] / mov rbx, [t + 1] / cmp rax, rbx / jle fin / mov [t], rbx / mov [t + 1], rax / fin: print [t] / print [t + 1]',
              solution: `t: dq 9, 3\nmov rax, [t]\nmov rbx, [t + 1]\ncmp rax, rbx\njle fin\nmov [t], rbx\nmov [t + 1], rax\nfin:\nprint [t]\nprint [t + 1]`,
              tests: [{ expect: '3\n9' }]
            }
          ]
        },
        {
          id: 'oa-9-2', title: 'Épreuve finale — Le trône de l\'Olympe', kind: 'boss', xp: 150,
          goal: "L'epreuve ultime : trier un tableau entier, en assembleur, du debut a la fin.",
          blocks: [
            { t: 'p', v: "Voici l'epreuve qui reunit toute la formation : deux boucles imbriquees (une qui repete les passages, une qui parcourt les paires), une comparaison, un echange en memoire — exactement les huit modules precedents, dans un seul programme." },
            { t: 'p', v: "Prends ton temps. Ecris d'abord la boucle exterieure (\"repeter le passage 4 fois\"), puis la boucle interieure (\"comparer chaque paire\"), et enfin l'echange. Teste mentalement avec un petit tableau avant de valider." }
          ],
          ex: [
            {
              brief: "Un tableau <code>t</code> contient 5 valeurs : 8, 3, 9, 1, 6. Trie-le par ordre croissant avec un tri a bulles (boucle exterieure sur 4 passages, boucle interieure comparant les paires voisines), puis affiche les 5 valeurs dans l'ordre, une par ligne.",
              starter: 't: dq 8, 3, 9, 1, 6\n',
              hint: "passage: mov rdx, 0 (compteur de passages) — boucle_passage: cmp rdx, 4 / jge affichage — mov rcx, 0 (indice) — boucle_paire: cmp rcx, 4 / jge fin_passage — mov rax, [t + rcx] — mov rbx, rcx / inc rbx / mov rbx, [t + rbx] (element suivant, attention a ne pas ecraser rcx) — cmp rax, rbx / jle pas_echange — echanger [t+rcx] et [t+rcx+1] — pas_echange: inc rcx / jmp boucle_paire — fin_passage: inc rdx / jmp boucle_passage — affichage: 5 print.",
              solution: `t: dq 8, 3, 9, 1, 6\nmov rdx, 0\nboucle_passage:\ncmp rdx, 4\njge affichage\nmov rcx, 0\nboucle_paire:\ncmp rcx, 4\njge fin_passage\nmov rax, [t + rcx]\nmov rsi, rcx\ninc rsi\nmov rbx, [t + rsi]\ncmp rax, rbx\njle pas_echange\nmov [t + rcx], rbx\nmov [t + rsi], rax\npas_echange:\ninc rcx\njmp boucle_paire\nfin_passage:\ninc rdx\njmp boucle_passage\naffichage:\nmov rcx, 0\nboucle_affiche:\ncmp rcx, 5\njge fin\nprint [t + rcx]\ninc rcx\njmp boucle_affiche\nfin:`,
              tests: [{ expect: '1\n3\n6\n8\n9' }],
              success: "LA FORMATION OLYMPIENNE EST ACHEVEE — sa base, du moins. Tu viens de trier un tableau en assembleur pur : registres, pile, sauts, fonctions, memoire et logique binaire, tout y est passe. La vraie maitrise se construit maintenant, mois apres mois, en relisant ces modules et en ecrivant toujours plus de programmes. Tu en as desormais les fondations completes."
            }
          ]
        }
      ]
    }
  ]
};
