/* ARES — Parcours libre JAVASCRIPT : « Les 3 Jours de l'Étincelle » */
var PATH_JS = {
  id: 'js', lang: 'js', name: 'JAVASCRIPT', glyph: 'js ▶',
  tag: 'Parcours 3 · 3 jours', color: '#F6B23D',
  title: "Les 3 Jours de l'Étincelle",
  blurb: "Le seul langage que comprend un navigateur. C'est lui qui rend les pages vivantes : boutons, animations, jeux. En 3 jours, tu fais bouger une vraie page.",
  chips: ['Exécution réelle', 'Manipulation du DOM', 'Résultat interactif'],
  promise: "À la fin du jour 3, tu sauras faire reagir une page au clic : compteur, liste dynamique, changement de style.",
  days: [
    /* ======================= JOUR 1 ======================= */
    {
      n: 1, title: 'Les fondations', sub: 'Variables, types, conditions, boucles',
      lessons: [
        {
          id: 'js-1-1', title: 'console.log et variables', kind: 'lecon', xp: 20,
          goal: 'Afficher, stocker, et choisir entre let et const.',
          blocks: [
            { t: 'p', v: "Le JavaScript s'exécute dans le navigateur. Son outil d'affichage s'appelle <code>console.log()</code> : c'est le <code>print</code> du web." },
            { t: 'code', lang: 'js', run: true, v: `console.log("Bonjour la forge !");\nconsole.log(2 + 3);` },
            { t: 'tip', h: 'Le point-virgule', v: "En JavaScript, on termine chaque instruction par <code>;</code>. Ce n'est pas toujours obligatoire, mais tous les codes professionnels le font : prends l'habitude." },
            { t: 'h', v: 'Deux facons de créer une variable' },
            { t: 'code', lang: 'js', run: true, v: `let score = 0;        // valeur qui va changer\nconst nom = "Nova";   // valeur qui ne changera jamais\n\nscore = score + 10;   // autorise\nconsole.log(nom, score);` },
            {
              t: 'table', head: ['Mot-clé', 'Quand l\'utiliser'],
              rows: [['<code>const</code>', 'par défaut, toujours. La valeur ne sera jamais remplacee.'],
                     ['<code>let</code>', 'seulement si la valeur doit changer (compteur, score, état).'],
                     ['<code>var</code>', 'ancien mot-clé : a ne plus utiliser.']]
            },
            { t: 'code', lang: 'js', run: true, err: true, v: `const vie = 100;\nvie = 90;   // ERREUR : on ne reaffecte pas une const\nconsole.log(vie);` },
            { t: 'analogy', v: "<b>L'image à retenir :</b> <code>const</code> est une étiquette collée à la super-glue sur une boîte : tu peux regarder dedans, mais tu ne peux pas changer la boîte. <code>let</code> est une étiquette repositionnable." },
            { t: 'key', h: 'A retenir', v: "console.log() affiche · const par défaut · let si ça change · point-virgule à la fin." }
          ],
          ex: [
            {
              brief: "Crée une constante <code>pseudo</code> valant <code>Kaz</code> et une variable <code>niveau</code> valant <code>1</code>. Augmente <code>niveau</code> de 2, puis affiche les deux valeurs avec un seul <code>console.log</code> (attendu : <code>Kaz 3</code>).",
              starter: 'const pseudo = ;\nlet niveau = ;\n',
              hint: 'console.log(pseudo, niveau) affiche les deux séparés par un espace.',
              solution: `const pseudo = "Kaz";\nlet niveau = 1;\nniveau = niveau + 2;\nconsole.log(pseudo, niveau);`,
              tests: [{ expect: 'Kaz 3' }],
              must: [['const\\s+pseudo', 'pseudo doit etre declare avec const.'], ['let\\s+niveau', 'niveau doit etre declare avec let (il change).']]
            }
          ],
          quiz: [
            { q: 'Quel mot-clé utiliser pour une valeur qui ne changera pas ?', opts: ['let', 'const', 'var'], a: 1, why: 'const empeche la reaffectation et rend le code plus sur.' },
            { q: 'Que fait console.log ?', opts: ['Il affiche dans la console', 'Il enregistre un fichier', 'Il envoie un message au serveur'], a: 0, why: "C'est l'outil d'affichage et de debogage numéro 1." }
          ]
        },

        {
          id: 'js-1-2', title: 'Types et texte', kind: 'lecon', xp: 25,
          goal: 'Manipuler nombres, chaînes et booleens, et assembler du texte avec les template literals.',
          blocks: [
            { t: 'p', v: "JavaScript manipule surtout trois types : <code>number</code>, <code>string</code> et <code>boolean</code>." },
            { t: 'code', lang: 'js', run: true, v: `console.log(typeof 42);\nconsole.log(typeof "ares");\nconsole.log(typeof true);\nconsole.log(typeof 3.5);   // number aussi : pas d'int/float separes` },
            { t: 'h', v: 'Assembler du texte : les template literals' },
            { t: 'p', v: "Comme les f-strings de Python, mais avec des <b>accents graves</b> <code>&#96;</code> et la syntaxe <code>\\${ }</code>." },
            { t: 'code', lang: 'js', run: true, v: 'const nom = "Mia";\nconst age = 14;\n\nconsole.log("Vieille methode : " + nom + ", " + age + " ans");\nconsole.log(`Methode moderne : \\${nom}, \\${age} ans`);\nconsole.log(`Dans 2 ans : \\${age + 2} ans`);' },
            { t: 'warn', h: 'Le piège du +', v: "En JavaScript, <code>\"5\" + 2</code> donne <code>\"52\"</code> (il colle), mais <code>\"5\" * 2</code> donne <code>10</code> (il convertit). C'est deroutant : utilise <code>Number(x)</code> pour convertir explicitement." },
            { t: 'code', lang: 'js', run: true, v: `console.log("5" + 2);          // 52\nconsole.log(Number("5") + 2);  // 7\nconsole.log(5 % 2, 7 / 2);     // reste, division` },
            { t: 'h', v: 'Quelques outils de texte' },
            { t: 'code', lang: 'js', run: true, v: `const mot = "forge";\nconsole.log(mot.length);        // 5\nconsole.log(mot.toUpperCase());\nconsole.log(mot[0]);            // f\nconsole.log(mot.includes("or")); // true` },
            { t: 'key', h: 'A retenir', v: "typeof donne le type · les backticks + \\${ } assemblent · \"5\" + 2 colle, Number() convertit · .length compte." }
          ],
          ex: [
            {
              brief: "Avec les variables donnees, affiche <code>Mia a 14 ans et code en JavaScript.</code> en utilisant un template literal (backticks).",
              starter: 'const nom = "Mia";\nconst age = 14;\nconst langage = "JavaScript";\n',
              hint: 'console.log(`\\${nom} a \\${age} ans et code en \\${langage}.`);',
              solution: 'const nom = "Mia";\nconst age = 14;\nconst langage = "JavaScript";\nconsole.log(`${nom} a ${age} ans et code en ${langage}.`);',
              tests: [{ expect: 'Mia a 14 ans et code en JavaScript.' }],
              must: [['`', 'Utilise un template literal (les accents graves ` `).']]
            },
            {
              brief: "Le prix est stocke sous forme de texte. Convertis-le et affiche le total pour 3 articles (attendu : <code>13.5</code>).",
              starter: 'const prixTexte = "4.5";\nconst quantite = 3;\n',
              hint: 'Number(prixTexte) * quantite',
              solution: `const prixTexte = "4.5";\nconst quantite = 3;\nconsole.log(Number(prixTexte) * quantite);`,
              tests: [{ expect: '13.5' }]
            }
          ],
          quiz: [
            { q: 'Que vaut "3" + 4 en JavaScript ?', opts: ['7', '"34"', 'Erreur'], a: 1, why: 'Dès qu\'un texte est présent, le + colle au lieu d\'additionner.' },
            { q: 'Quels caractères delimitent un template literal ?', opts: ['Les guillemets "', 'Les accents graves `', 'Les apostrophes'], a: 1, why: 'Seuls les backticks permettent d\'utiliser ${ }.' }
          ]
        },

        {
          id: 'js-1-3', title: 'Les conditions', kind: 'lecon', xp: 25,
          goal: 'Ecrire if/else if/else et comprendre === contre ==.',
          blocks: [
            { t: 'p', v: "Meme logique qu'en Python, mais la syntaxe change : parenthèses autour de la condition, accolades autour du bloc." },
            { t: 'code', lang: 'js', run: true, v: `const age = 15;\n\nif (age >= 18) {\n  console.log("Majeur");\n} else if (age >= 13) {\n  console.log("Ado");\n} else {\n  console.log("Enfant");\n}` },
            { t: 'h', v: 'LA regle du triple egal' },
            { t: 'p', v: "JavaScript possede deux operateurs d'egalite. Utilise <b>toujours</b> le triple." },
            { t: 'code', lang: 'js', run: true, v: `console.log(5 == "5");    // true  : compare après conversion (dangereux)\nconsole.log(5 === "5");   // false : compare valeur ET type (correct)\nconsole.log(5 !== "5");   // true` },
            { t: 'warn', h: 'Pourquoi ca compte', v: "Le double egal a provoque d'innombrables bugs en production. Dans toutes les entreprises, la regle est : <code>===</code> et <code>!==</code>, jamais autre chose." },
            { t: 'h', v: 'Combiner des conditions' },
            {
              t: 'table', head: ['Symbole', 'Sens'],
              rows: [['<code>&amp;&amp;</code>', 'ET — les deux doivent etre vraies'], ['<code>||</code>', 'OU — au moins une'], ['<code>!</code>', 'NON — inverse']]
            },
            { t: 'code', lang: 'js', run: true, v: `const taille = 150;\nconst accompagne = true;\n\nif (taille >= 140 && accompagne) {\n  console.log("Acces autorise");\n} else {\n  console.log("Acces refuse");\n}` },
            { t: 'key', h: 'A retenir', v: "if (condition) { ... } · === compare valeur et type · && ET · || OU · ! NON." }
          ],
          ex: [
            {
              brief: "Avec <code>note = 13</code>, affiche <code>Tres bien</code> (16+), <code>Bien</code> (14+), <code>Passable</code> (10+) ou <code>A revoir</code>.",
              starter: 'const note = 13;\n',
              hint: 'if / else if / else if / else, du plus exigeant au moins exigeant.',
              solution: `const note = 13;\nif (note >= 16) {\n  console.log("Tres bien");\n} else if (note >= 14) {\n  console.log("Bien");\n} else if (note >= 10) {\n  console.log("Passable");\n} else {\n  console.log("A revoir");\n}`,
              tests: [{ expect: 'Passable' }],
              must: [['else\\s+if', 'Utilise au moins un else if.']]
            },
            {
              brief: "Ecris le test qui affiche <code>Gagne</code> si le score est strictement superieur à 100 ET que le joueur est vivant, sinon <code>Perdu</code>.",
              starter: 'const score = 120;\nconst vivant = true;\n',
              hint: 'Une seule condition avec &&.',
              solution: `const score = 120;\nconst vivant = true;\nif (score > 100 && vivant) {\n  console.log("Gagne");\n} else {\n  console.log("Perdu");\n}`,
              tests: [{ expect: 'Gagne' }],
              must: [['&&', 'Combine les deux conditions avec &&.']]
            }
          ],
          quiz: [
            { q: 'Quel operateur comparer sans surprise ?', opts: ['==', '===', '='], a: 1, why: '=== compare la valeur ET le type : aucune conversion cachee.' },
            { q: 'Que vaut 0 === "0" ?', opts: ['true', 'false'], a: 1, why: 'Meme apparence, types differents (number et string) : donc false.' }
          ]
        },

        {
          id: 'js-1-4', title: 'Les boucles', kind: 'lecon', xp: 30,
          goal: 'Repeter avec for et while, et parcourir avec for...of.',
          blocks: [
            { t: 'p', v: "La boucle <code>for</code> classique tient en une ligne : depart, condition, increment." },
            { t: 'code', lang: 'js', run: true, v: `for (let i = 0; i < 5; i++) {\n  console.log("Tour numéro " + i);\n}` },
            { t: 'ol', v: [
              "<code>let i = 0</code> : le point de depart, execute une seule fois.",
              "<code>i < 5</code> : la condition, verifiee avant chaque tour.",
              "<code>i++</code> : ce qu'on fait apres chaque tour (raccourci de <code>i = i + 1</code>)."
            ] },
            { t: 'code', lang: 'js', run: true, v: `let total = 0;\nfor (let i = 1; i <= 100; i++) {\n  total += i;\n}\nconsole.log(total);   // 5050` },
            { t: 'h', v: 'while : tant que' },
            { t: 'code', lang: 'js', run: true, v: `let vies = 3;\nwhile (vies > 0) {\n  console.log("Vies restantes : " + vies);\n  vies--;\n}\nconsole.log("Game over");` },
            { t: 'warn', h: 'Boucle infinie', v: "Si tu oublies <code>vies--</code>, la condition reste vraie pour toujours. La forge ARES coupe automatiquement au bout de 2,5 secondes et te previent — dans un vrai navigateur, l'onglet se fige." },
            { t: 'h', v: 'for...of : parcourir une collection' },
            { t: 'code', lang: 'js', run: true, v: `const equipe = ["Lea", "Sam", "Zoe"];\n\nfor (const joueur of equipe) {\n  console.log("Joueur : " + joueur);\n}` },
            { t: 'key', h: 'A retenir', v: "for (let i = 0; i < n; i++) repete n fois · i++ incrémente · while pour un nombre de tours inconnu · for...of parcourt." }
          ],
          ex: [
            {
              brief: "Affiche les nombres de 1 à 5, un par ligne.",
              starter: 'for (let i = ; ; ) {\n  \n}\n',
              hint: 'Depart à 1, condition i <= 5.',
              solution: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`,
              tests: [{ expect: '1\n2\n3\n4\n5' }]
            },
            {
              brief: "Affiche la table de 7 sous la forme <code>7 x 1 = 7</code> jusqu'à <code>7 x 10 = 70</code> (template literal recommandé).",
              starter: 'for (let i = 1; i <= 10; i++) {\n  \n}\n',
              hint: 'console.log(`7 x \\${i} = \\${7 * i}`);',
              solution: 'for (let i = 1; i <= 10; i++) {\n  console.log(`7 x ${i} = ${7 * i}`);\n}',
              tests: [{ expect: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70' }]
            },
            {
              brief: "Parcours la liste donnee avec <code>for...of</code> et affiche chaque prénom en majuscules.",
              starter: 'const equipe = ["lea", "sam", "zoe"];\n',
              hint: 'joueur.toUpperCase()',
              solution: `const equipe = ["lea", "sam", "zoe"];\nfor (const joueur of equipe) {\n  console.log(joueur.toUpperCase());\n}`,
              tests: [{ expect: 'LEA\nSAM\nZOE' }],
              must: [['for\\s*\\(\\s*(const|let)\\s+\\w+\\s+of', 'Utilise bien une boucle for...of.']]
            }
          ],
          quiz: [
            { q: 'Que fait i++ ?', opts: ['Ajoute 1 a i', 'Multiplie i par 2', 'Remet i a zero'], a: 0, why: "C'est le raccourci de i = i + 1." },
            { q: 'Combien de tours fait for (let i = 0; i < 3; i++) ?', opts: ['2', '3', '4'], a: 1, why: 'i vaut 0, 1, 2 : trois tours.' }
          ]
        },

        {
          id: 'js-1-5', title: 'Jeu : la chasse au bug JS', kind: 'jeu', xp: 30,
          goal: 'Reperer la ligne fautive : parenthèse, accolade, egalite ou faute de frappe.',
          game: { type: 'bughunt', bank: 'js1' },
          blocks: [{ t: 'p', v: "Une ligne casse le programme. Trouve-la avant le chronometre mental." }]
        },

        {
          id: 'js-1-6', title: 'BOSS · La caisse enregistreuse', kind: 'boss', xp: 55,
          goal: 'Combiner variables, conditions et boucle dans un programme utile.',
          blocks: [{ t: 'p', v: "Un panier, un total, une remise conditionnelle : le calcul que fait chaque site de vente en ligne." }],
          ex: [
            {
              brief: "Additionne tous les prix du panier. Si le total depasse 50, applique une remise de 10%. Affiche <code>Total : X euros</code> avec 2 decimales (utilise <code>total.toFixed(2)</code>).",
              starter: 'const panier = [12.5, 20, 30];\nlet total = 0;\n',
              hint: 'Boucle for...of pour additionner, puis if (total > 50) { total = total * 0.9; }',
              solution: 'const panier = [12.5, 20, 30];\nlet total = 0;\nfor (const prix of panier) {\n  total += prix;\n}\nif (total > 50) {\n  total = total * 0.9;\n}\nconsole.log(`Total : ${total.toFixed(2)} euros`);',
              tests: [{ expect: 'Total : 56.25 euros' }],
              success: "Jour 1 termine : tu sais stocker, comparer et repeter en JavaScript."
            }
          ]
        }
      ]
    },

    /* ======================= JOUR 2 ======================= */
    {
      n: 2, title: 'Fonctions et donnees', sub: 'Fonctions, tableaux, objets, methodes modernes',
      lessons: [
        {
          id: 'js-2-1', title: 'Les fonctions', kind: 'lecon', xp: 30,
          goal: 'Declarer une fonction, la version flechee, et renvoyer une valeur.',
          blocks: [
            { t: 'p', v: "Une fonction range un bloc de code sous un nom, avec des entrees (parametres) et une sortie (return)." },
            { t: 'code', lang: 'js', run: true, v: `function saluer(nom) {\n  return "Salut " + nom + " !";\n}\n\nconsole.log(saluer("Lea"));\nconsole.log(saluer("Sam"));` },
            { t: 'h', v: 'La fonction flechee : la version moderne' },
            { t: 'code', lang: 'js', run: true, v: 'const double = (x) => x * 2;\nconst somme = (a, b) => a + b;\n\nconsole.log(double(21));\nconsole.log(somme(3, 4));\n\n// version longue, quand il y a plusieurs lignes\nconst decrire = (nom, age) => {\n  const majeur = age >= 18;\n  return `${nom} : ${majeur ? "majeur" : "mineur"}`;\n};\nconsole.log(decrire("Zoe", 15));' },
            { t: 'tip', h: 'Le raccourci a une ligne', v: "Quand la fleche est suivie directement d'une expression, le <code>return</code> est implicite : <code>x => x * 2</code> renvoie automatiquement." },
            { t: 'h', v: "L'operateur ternaire" },
            { t: 'p', v: "<code>condition ? valeurSiVrai : valeurSiFaux</code> — un if/else qui tient sur une ligne et qui renvoie une valeur." },
            { t: 'code', lang: 'js', run: true, v: `const age = 20;\nconst statut = age >= 18 ? "majeur" : "mineur";\nconsole.log(statut);` },
            { t: 'key', h: 'A retenir', v: "function nom(params) { return ... } · const nom = (params) => ... · return renvoie · ternaire pour les cas courts." }
          ],
          ex: [
            {
              brief: "Ecris une fonction flechee <code>aire</code> qui prend une longueur et une largeur et renvoie le produit. Les appels de test sont deja ecrits.",
              starter: 'const aire = ;\n\nconsole.log(aire(5, 3));\nconsole.log(aire(10, 2));\n',
              hint: 'const aire = (l, L) => l * L;',
              solution: `const aire = (l, L) => l * L;\n\nconsole.log(aire(5, 3));\nconsole.log(aire(10, 2));`,
              tests: [{ expect: '15\n20' }],
              must: [['=>', 'Utilise une fonction flechee (=>).']]
            },
            {
              brief: "Ecris une fonction <code>mention(note)</code> qui renvoie <code>Admis</code> si la note vaut 10 ou plus, sinon <code>Recale</code>. Utilise un ternaire.",
              starter: 'const mention = (note) => ;\n\nconsole.log(mention(15));\nconsole.log(mention(7));\n',
              hint: 'note >= 10 ? "Admis" : "Recale"',
              solution: `const mention = (note) => note >= 10 ? "Admis" : "Recale";\n\nconsole.log(mention(15));\nconsole.log(mention(7));`,
              tests: [{ expect: 'Admis\nRecale' }],
              must: [['\\?[\\s\\S]*:', 'Utilise l\'operateur ternaire condition ? a : b.']]
            }
          ],
          quiz: [
            { q: 'Que renvoie x => x * 2 quand on l\'appelle avec 5 ?', opts: ['5', '10', 'undefined'], a: 1, why: 'Le return est implicite dans une fleche a une expression.' },
            { q: 'Que renvoie une fonction sans return ?', opts: ['0', 'undefined', 'null'], a: 1, why: 'En JavaScript, l\'absence de return donne undefined.' }
          ]
        },

        {
          id: 'js-2-2', title: 'Les tableaux', kind: 'lecon', xp: 30,
          goal: 'Creer, lire, modifier et parcourir un tableau.',
          blocks: [
            { t: 'p', v: "Un tableau (array) range plusieurs valeurs dans une seule variable. Index à partir de 0, comme partout en informatique." },
            { t: 'code', lang: 'js', run: true, v: `const notes = [12, 15, 8, 17];\n\nconsole.log(notes[0]);        // 12\nconsole.log(notes.length);    // 4\nconsole.log(notes[notes.length - 1]);  // 17, le dernier` },
            { t: 'h', v: 'Ajouter et retirer' },
            { t: 'code', lang: 'js', run: true, v: `const equipe = ["Lea", "Sam"];\n\nequipe.push("Zoe");      // ajoute a la fin\nconsole.log(equipe);\n\nconst dernier = equipe.pop();   // retire le dernier et le renvoie\nconsole.log(dernier, equipe);\n\nconsole.log(equipe.includes("Lea"));  // true\nconsole.log(equipe.indexOf("Sam"));   // 1` },
            { t: 'tip', h: 'const et tableaux', v: "Un tableau declare avec <code>const</code> peut quand meme etre modifie avec push ! <code>const</code> interdit de <b>remplacer</b> le tableau, pas de changer son contenu." },
            { t: 'h', v: 'Parcourir' },
            { t: 'code', lang: 'js', run: true, v: `const notes = [12, 15, 8];\n\n// version classique, avec l'index\nfor (let i = 0; i < notes.length; i++) {\n  console.log(i + " -> " + notes[i]);\n}\n\n// version moderne, avec la valeur\nfor (const note of notes) {\n  console.log(note);\n}` },
            { t: 'key', h: 'A retenir', v: "[] cree · index à partir de 0 · .length compte · push/pop ajoutent et retirent · for...of parcourt." }
          ],
          ex: [
            {
              brief: "Ajoute <code>Ali</code> a l'equipe, puis affiche le nombre de joueurs, puis chaque joueur sur une ligne. Attendu : <code>3</code> puis <code>Lea</code>, <code>Sam</code>, <code>Ali</code>.",
              starter: 'const equipe = ["Lea", "Sam"];\n',
              hint: 'push, puis console.log(equipe.length), puis une boucle for...of.',
              solution: `const equipe = ["Lea", "Sam"];\nequipe.push("Ali");\nconsole.log(equipe.length);\nfor (const joueur of equipe) {\n  console.log(joueur);\n}`,
              tests: [{ expect: '3\nLea\nSam\nAli' }]
            },
            {
              brief: "Calcule la moyenne des notes et affiche-la avec 2 decimales (attendu : <code>13.00</code>).",
              starter: 'const notes = [12, 15, 8, 17];\nlet total = 0;\n',
              hint: 'Additionne dans la boucle, puis divise par notes.length et utilise .toFixed(2).',
              solution: `const notes = [12, 15, 8, 17];\nlet total = 0;\nfor (const note of notes) {\n  total += note;\n}\nconsole.log((total / notes.length).toFixed(2));`,
              tests: [{ expect: '13.00' }]
            }
          ],
          quiz: [
            { q: 'Que vaut [10, 20, 30].length ?', opts: ['2', '3', '30'], a: 1, why: 'length compte les elements, pas le dernier index.' },
            { q: 'Que fait tableau.push("x") ?', opts: ['Ajoute "x" à la fin', 'Retire le dernier', 'Trie le tableau'], a: 0, why: 'push ajoute à la fin ; pop retire à la fin.' }
          ]
        },

        {
          id: 'js-2-3', title: 'map, filter et reduce', kind: 'lecon', xp: 35,
          goal: 'Transformer un tableau sans ecrire de boucle : la marque des developpeurs JS modernes.',
          blocks: [
            { t: 'p', v: "Ces trois methodes remplacent 90% des boucles ecrites à la main. Elles ne modifient jamais le tableau d'origine : elles en renvoient un nouveau." },
            { t: 'h', v: 'map : transformer chaque element' },
            { t: 'code', lang: 'js', run: true, v: `const nombres = [1, 2, 3, 4];\nconst doubles = nombres.map(n => n * 2);\n\nconsole.log(doubles);\nconsole.log(nombres);   // inchange` },
            { t: 'h', v: 'filter : garder certains elements' },
            { t: 'code', lang: 'js', run: true, v: `const notes = [12, 8, 17, 5, 15];\nconst reussites = notes.filter(n => n >= 10);\n\nconsole.log(reussites);\nconsole.log(reussites.length + " notes au-dessus de la moyenne");` },
            { t: 'h', v: 'reduce : tout resumer en une valeur' },
            { t: 'code', lang: 'js', run: true, v: `const panier = [12.5, 20, 30];\nconst total = panier.reduce((somme, prix) => somme + prix, 0);\n\nconsole.log(total);` },
            { t: 'analogy', v: "<b>L'image à retenir :</b> <code>map</code> repeint chaque objet d'un tapis roulant. <code>filter</code> ejecte ceux qui ne passent pas le controle qualite. <code>reduce</code> fait fondre tout le tapis en un seul lingot." },
            { t: 'tip', h: 'On les enchaine', v: "<code>notes.filter(n => n >= 10).map(n => n + 1)</code> : d'abord on garde, ensuite on transforme. C'est lisible de gauche à droite." },
            { t: 'key', h: 'A retenir', v: "map transforme · filter selectionne · reduce agrege · aucun ne modifie l'original." }
          ],
          ex: [
            {
              brief: "Avec <code>map</code>, cree un tableau des prix TTC (prix x 1.2) et affiche-le. Attendu : <code>[ 12, 24, 36 ]</code> — utilise <code>console.log</code> sur le tableau.",
              starter: 'const prixHT = [10, 20, 30];\n',
              hint: 'prixHT.map(p => p * 1.2)',
              solution: `const prixHT = [10, 20, 30];\nconst ttc = prixHT.map(p => p * 1.2);\nconsole.log(ttc);`,
              tests: [{ expect: '[12, 24, 36]' }],
              must: [['\\.map\\s*\\(', 'Utilise la methode map.']]
            },
            {
              brief: "Avec <code>filter</code>, affiche uniquement les mots de plus de 4 lettres.",
              starter: 'const mots = ["code", "forge", "js", "marteau"];\n',
              hint: 'mots.filter(m => m.length > 4)',
              solution: `const mots = ["code", "forge", "js", "marteau"];\nconsole.log(mots.filter(m => m.length > 4));`,
              tests: [{ expect: '["forge", "marteau"]' }],
              must: [['\\.filter\\s*\\(', 'Utilise la methode filter.']]
            },
            {
              brief: "Avec <code>reduce</code>, calcule et affiche la somme des points.",
              starter: 'const points = [10, 25, 5, 40];\n',
              hint: 'points.reduce((total, p) => total + p, 0)',
              solution: `const points = [10, 25, 5, 40];\nconsole.log(points.reduce((total, p) => total + p, 0));`,
              tests: [{ expect: '80' }],
              must: [['\\.reduce\\s*\\(', 'Utilise la methode reduce.']]
            }
          ],
          quiz: [
            { q: 'Que renvoie [1,2,3].map(n => n * 10) ?', opts: ['[10, 20, 30]', '60', '[1, 2, 3]'], a: 0, why: 'map renvoie un nouveau tableau transforme, meme longueur.' },
            { q: 'Quelle methode garde seulement certains elements ?', opts: ['map', 'filter', 'reduce'], a: 1, why: 'filter conserve les elements pour lesquels la fonction renvoie true.' }
          ]
        },

        {
          id: 'js-2-4', title: 'Les objets', kind: 'lecon', xp: 30,
          goal: 'Regrouper des donnees liees dans une structure cle/valeur.',
          blocks: [
            { t: 'p', v: "Un objet regroupe des informations qui vont ensemble : un joueur a un pseudo, un niveau, des points de vie." },
            { t: 'code', lang: 'js', run: true, v: `const joueur = {\n  pseudo: "Nova",\n  niveau: 7,\n  vie: 100,\n  vivant: true\n};\n\nconsole.log(joueur.pseudo);\nconsole.log(joueur["niveau"]);   // autre écriture` },
            { t: 'code', lang: 'js', run: true, v: `const joueur = { pseudo: "Nova", vie: 100 };\n\njoueur.vie = 80;          // modifier\njoueur.arme = "epee";     // ajouter\nconsole.log(joueur);` },
            { t: 'h', v: 'Des methodes dans un objet' },
            { t: 'code', lang: 'js', run: true, v: 'const joueur = {\n  pseudo: "Nova",\n  vie: 100,\n  seDecrire() {\n    return `${this.pseudo} a ${this.vie} PV`;\n  }\n};\n\nconsole.log(joueur.seDecrire());' },
            { t: 'tip', h: 'this', v: "<code>this</code> designe l'objet lui-meme. Dans <code>seDecrire</code>, <code>this.pseudo</code> vaut « Nova »." },
            { t: 'h', v: 'Un tableau d\'objets : la structure la plus courante du web' },
            { t: 'code', lang: 'js', run: true, v: 'const eleves = [\n  { nom: "Lea", note: 15 },\n  { nom: "Sam", note: 8 },\n  { nom: "Zoe", note: 17 }\n];\n\nfor (const e of eleves) {\n  console.log(`${e.nom} : ${e.note}/20`);\n}\n\nconst admis = eleves.filter(e => e.note >= 10);\nconsole.log(admis.length + " admis");' },
            { t: 'key', h: 'A retenir', v: "{ cle: valeur } · acces par objet.cle · this dans les methodes · un tableau d'objets modelise presque tout." }
          ],
          ex: [
            {
              brief: "Cree un objet <code>livre</code> avec <code>titre</code> = <code>Dune</code>, <code>pages</code> = <code>412</code>, puis affiche <code>Dune (412 pages)</code>.",
              starter: 'const livre = {\n  \n};\n',
              hint: 'console.log(`${livre.titre} (${livre.pages} pages)`);',
              solution: 'const livre = {\n  titre: "Dune",\n  pages: 412\n};\nconsole.log(`${livre.titre} (${livre.pages} pages)`);',
              tests: [{ expect: 'Dune (412 pages)' }]
            },
            {
              brief: "À partir du tableau d'eleves, affiche une ligne par eleve sous la forme <code>Lea : 15</code>, puis en derniere ligne le nombre d'admis (note >= 10) sous la forme <code>2 admis</code>.",
              starter: 'const eleves = [\n  { nom: "Lea", note: 15 },\n  { nom: "Sam", note: 8 },\n  { nom: "Zoe", note: 17 }\n];\n',
              hint: 'Une boucle for...of pour afficher, puis filter().length pour compter.',
              solution: 'const eleves = [\n  { nom: "Lea", note: 15 },\n  { nom: "Sam", note: 8 },\n  { nom: "Zoe", note: 17 }\n];\nfor (const e of eleves) {\n  console.log(`${e.nom} : ${e.note}`);\n}\nconsole.log(`${eleves.filter(e => e.note >= 10).length} admis`);',
              tests: [{ expect: 'Lea : 15\nSam : 8\nZoe : 17\n2 admis' }]
            }
          ],
          quiz: [
            { q: 'Comment lire le pseudo dans const j = { pseudo: "Nova" } ?', opts: ['j[0]', 'j.pseudo', 'j->pseudo'], a: 1, why: 'On accède aux proprietes avec un point.' },
            { q: 'À quoi sert this dans une methode d\'objet ?', opts: ['À designer l\'objet lui-meme', 'A creer une copie', 'À supprimer une propriete'], a: 0, why: 'this pointe vers l\'objet sur lequel la methode est appelee.' }
          ]
        },

        {
          id: 'js-2-5', title: 'Jeu : devine la sortie', kind: 'jeu', xp: 30,
          goal: 'Prédire ce qu\'affiche un programme JavaScript, pièges de conversion inclus.',
          game: { type: 'predict', bank: 'js2' },
          blocks: [{ t: 'p', v: "Attention aux conversions automatiques : c'est la spécialité de JavaScript." }]
        },

        {
          id: 'js-2-6', title: 'BOSS · Le tableau de bord de la classe', kind: 'boss', xp: 60,
          goal: 'Fonctions, tableaux d\'objets et methodes modernes dans un seul programme.',
          blocks: [{ t: 'p', v: "Tu reçois une liste d'eleves. Tu dois produire un rapport : moyenne generale, meilleur eleve, et liste des admis." }],
          ex: [
            {
              brief: "Affiche exactement 3 lignes :<br><code>Moyenne : 12.75</code> (2 decimales)<br><code>Meilleur : Zoe</code><br><code>Admis : Lea, Zoe</code> (les noms des eleves ayant 10 ou plus, separes par une virgule et un espace).",
              starter: 'const eleves = [\n  { nom: "Lea", note: 15 },\n  { nom: "Sam", note: 8 },\n  { nom: "Zoe", note: 17 },\n  { nom: "Ali", note: 11 }\n];\n',
              hint: 'reduce pour la somme ; une boucle (ou reduce) pour le maximum ; filter + map + join(", ") pour la liste des admis.',
              solution: 'const eleves = [\n  { nom: "Lea", note: 15 },\n  { nom: "Sam", note: 8 },\n  { nom: "Zoe", note: 17 },\n  { nom: "Ali", note: 11 }\n];\nconst somme = eleves.reduce((t, e) => t + e.note, 0);\nconsole.log(`Moyenne : ${(somme / eleves.length).toFixed(2)}`);\n\nlet meilleur = eleves[0];\nfor (const e of eleves) {\n  if (e.note > meilleur.note) meilleur = e;\n}\nconsole.log(`Meilleur : ${meilleur.nom}`);\n\nconst admis = eleves.filter(e => e.note >= 10).map(e => e.nom);\nconsole.log(`Admis : ${admis.join(", ")}`);',
              tests: [{ expect: 'Moyenne : 12.75\nMeilleur : Zoe\nAdmis : Lea, Zoe, Ali' }],
              success: "Jour 2 termine. Tu manipules des donnees structurees comme un vrai developpeur front-end."
            }
          ]
        }
      ]
    },

    /* ======================= JOUR 3 ======================= */
    {
      n: 3, title: 'Faire vivre une page', sub: 'DOM, evenements, projets interactifs',
      lessons: [
        {
          id: 'js-3-1', title: 'Le DOM : attraper un element', kind: 'lecon', xp: 30,
          dom: `<h1 id="titre">Titre de départ</h1>\n<p class="texte">Premier paragraphe.</p>\n<p class="texte">Deuxieme paragraphe.</p>\n<button id="bouton">Cliquer</button>`,
          goal: 'Selectionner un element de la page et modifier son contenu.',
          blocks: [
            { t: 'p', v: "Le navigateur transforme ton HTML en un arbre d'objets : le <b>DOM</b> (Document Object Model). JavaScript peut attraper n'importe quelle branche et la modifier en direct." },
            { t: 'analogy', v: "<b>L'image à retenir :</b> le HTML est le plan de la maison, le DOM est la maison construite. JavaScript est l'ouvrier qui peut repeindre un mur pendant que tu es dedans." },
            { t: 'h', v: 'Attraper un element' },
            { t: 'code', lang: 'js', v: `document.querySelector("#titre")     // par id\ndocument.querySelector(".texte")     // la PREMIERE de la classe\ndocument.querySelectorAll(".texte")  // TOUTES, dans un tableau\ndocument.querySelector("h1")         // par balise` },
            { t: 'p', v: "La syntaxe des selecteurs est exactement celle du CSS : <code>#id</code>, <code>.classe</code>, <code>balise</code>." },
            { t: 'h', v: 'Modifier le contenu' },
            { t: 'code', lang: 'js', dom: true, run: true, v: `const titre = document.querySelector("#titre");\ntitre.textContent = "Titre change par JavaScript !";\n\nconsole.log("Ancien texte remplace");` },
            { t: 'p', v: "L'apercu à droite montre la page <b>réelle</b> : elle vient d'etre modifiée par ton code. Change le texte, relance." },
            { t: 'warn', h: 'textContent plutôt que innerHTML', v: "<code>textContent</code> insere du texte brut. <code>innerHTML</code> interprete les balises : pratique, mais dangereux si le texte vient d'un utilisateur (c'est la faille XSS, une des plus exploitees du web)." },
            { t: 'key', h: 'A retenir', v: "querySelector attrape (syntaxe CSS) · querySelectorAll renvoie tout · .textContent lit et ecrit le texte." }
          ],
          ex: [
            {
              dom: true,
              brief: "Change le texte du titre (<code>#titre</code>) en <code>Forge ARES</code>, et celui du bouton (<code>#bouton</code>) en <code>Go</code>.",
              starter: 'const titre = document.querySelector("#titre");\n',
              hint: 'element.textContent = "...";',
              solution: `const titre = document.querySelector("#titre");\ntitre.textContent = "Forge ARES";\ndocument.querySelector("#bouton").textContent = "Go";`,
              expectDom: [['#titre', 'text', 'Forge ARES'], ['#bouton', 'text', 'Go']],
              must: [['querySelector', 'Utilise document.querySelector pour attraper les elements.'],
                     ['textContent', 'Modifie le contenu avec .textContent.']]
            }
          ],
          quiz: [
            { q: 'Que renvoie document.querySelector(".texte") s\'il y a 3 elements de cette classe ?', opts: ['Les 3', 'Le premier seulement', 'Une erreur'], a: 1, why: 'querySelector renvoie le premier trouve ; querySelectorAll les renvoie tous.' },
            { q: 'Comment cible-t-on un element d\'id "menu" ?', opts: ['querySelector("menu")', 'querySelector("#menu")', 'querySelector(".menu")'], a: 1, why: 'Comme en CSS : # pour un id.' }
          ]
        },

        {
          id: 'js-3-2', title: 'Les evenements : reagir au clic', kind: 'lecon', xp: 35,
          dom: `<h2 id="score">Score : 0</h2>\n<button id="plus">+1</button>\n<button id="reset">Remettre a zéro</button>`,
          goal: 'Executer du code quand l\'utilisateur agit.',
          blocks: [
            { t: 'p', v: "Un site sans evenement est une image. <code>addEventListener</code> dit : « quand CECI arrive sur CET element, execute CETTE fonction »." },
            { t: 'code', lang: 'js', dom: true, run: true, v: `const bouton = document.querySelector("#plus");\nlet score = 0;\n\nbouton.addEventListener("click", () => {\n  score = score + 1;\n  document.querySelector("#score").textContent = "Score : " + score;\n});\n\nconsole.log("Clique sur +1 dans l'apercu !");` },
            { t: 'p', v: "Lance le code, puis <b>clique reellement</b> sur le bouton dans l'apercu : le compteur monte. C'est ton premier programme interactif." },
            { t: 'h', v: 'La structure a retenir' },
            { t: 'code', lang: 'js', v: `element.addEventListener("evenement", () => {\n  // ce qui se passe\n});` },
            {
              t: 'table', head: ['Evenement', 'Declenche quand...'],
              rows: [['<code>click</code>', "on clique"], ['<code>mouseover</code>', 'la souris passe dessus'],
                     ['<code>input</code>', 'on tape dans un champ'], ['<code>submit</code>', 'on envoie un formulaire'],
                     ['<code>keydown</code>', 'on appuie sur une touche']]
            },
            { t: 'tip', h: 'La fonction est un plan, pas une action', v: "La fonction passee à addEventListener ne s'execute <b>pas</b> tout de suite : elle est mise de cote et attend l'evenement. C'est pour ca qu'on l'appelle une fonction de rappel (callback)." },
            { t: 'key', h: 'A retenir', v: "addEventListener(\"click\", fonction) · la fonction attend l'evenement · un seul element peut écouter plusieurs evenements." }
          ],
          ex: [
            {
              dom: true,
              brief: "Fais fonctionner les deux boutons : <code>#plus</code> augmente le score de 1 et met à jour <code>#score</code> (format <code>Score : N</code>), <code>#reset</code> le remet à 0.",
              starter: 'let score = 0;\nconst affichage = document.querySelector("#score");\n\n',
              hint: 'Deux addEventListener("click", ...). Pense à mettre à jour affichage.textContent dans les deux.',
              solution: `let score = 0;\nconst affichage = document.querySelector("#score");\n\ndocument.querySelector("#plus").addEventListener("click", () => {\n  score++;\n  affichage.textContent = "Score : " + score;\n});\n\ndocument.querySelector("#reset").addEventListener("click", () => {\n  score = 0;\n  affichage.textContent = "Score : " + score;\n});`,
              expectDom: [['#plus', 'click', ''], ['#plus', 'click', ''], ['#score', 'text', 'Score : 2'],
                          ['#reset', 'click', ''], ['#score', 'text', 'Score : 0']],
              must: [['addEventListener[\\s\\S]*addEventListener', 'Il faut deux ecouteurs : un par bouton.']],
              success: "Ton premier composant interactif : il reagit vraiment au clic de l'utilisateur."
            }
          ],
          quiz: [
            { q: 'Quand s\'execute la fonction passee à addEventListener ?', opts: ['Immédiatement', 'Quand l\'evenement se produit', 'À la fin du script'], a: 1, why: 'Elle est enregistrée et attend son declencheur.' },
            { q: 'Quel evenement pour un clic ?', opts: ['"press"', '"click"', '"tap"'], a: 1, why: 'Le nom exact est "click", en minuscules.' }
          ]
        },

        {
          id: 'js-3-3', title: 'Creer, styler, supprimer', kind: 'lecon', xp: 35,
          dom: `<ul id="liste">\n  <li>Element de départ</li>\n</ul>\n<div id="zone">Zone a styler</div>`,
          goal: 'Fabriquer des elements en JavaScript et changer leur apparence.',
          blocks: [
            { t: 'p', v: "Tu peux creer du HTML depuis JavaScript. C'est ainsi que fonctionnent tous les fils d'actualite : le contenu n'existe pas dans le fichier HTML, il est fabrique à la volee." },
            { t: 'code', lang: 'js', dom: true, run: true, v: `const liste = document.querySelector("#liste");\n\nconst nouveau = document.createElement("li");\nnouveau.textContent = "Ajoute par JavaScript";\nliste.appendChild(nouveau);\n\nconsole.log("Element ajoute, regarde l'apercu");` },
            { t: 'ol', v: [
              "<code>document.createElement(\"li\")</code> fabrique l'element (il n'est pas encore visible).",
              "On le remplit : <code>.textContent = ...</code>",
              "<code>parent.appendChild(element)</code> l'accroche à la page : il apparait."
            ] },
            { t: 'h', v: 'Changer le style' },
            { t: 'code', lang: 'js', dom: true, run: true, v: `const zone = document.querySelector("#zone");\n\nzone.style.background = "#E2762E";\nzone.style.color = "white";\nzone.style.padding = "16px";\nzone.style.borderRadius = "10px";   // attention : borderRadius, pas border-radius` },
            { t: 'warn', h: 'Le nom des proprietes change', v: "En CSS on ecrit <code>background-color</code>, en JavaScript <code>style.backgroundColor</code>. Regle : on enleve le tiret et on met une majuscule." },
            { t: 'h', v: 'La bonne pratique : les classes' },
            { t: 'p', v: "Plutôt que d'ecrire dix lignes de style, definis une classe en CSS et ajoute-la." },
            { t: 'code', lang: 'js', v: `element.classList.add("actif");\nelement.classList.remove("actif");\nelement.classList.toggle("actif");   // ajoute si absent, retire si présent` },
            { t: 'key', h: 'A retenir', v: "createElement fabrique · appendChild accroche · .style.propCamelCase modifie · classList.toggle bascule une classe." }
          ],
          ex: [
            {
              dom: true,
              brief: "Ajoute deux nouveaux <code>li</code> à la liste <code>#liste</code> : <code>Pain</code> et <code>Lait</code>. Puis colore <code>#zone</code> en fond <code>#4FBFB4</code>.",
              starter: 'const liste = document.querySelector("#liste");\n\n',
              hint: 'createElement + textContent + appendChild, deux fois. Puis zone.style.background = "#4FBFB4";',
              solution: `const liste = document.querySelector("#liste");\n\nconst a = document.createElement("li");\na.textContent = "Pain";\nliste.appendChild(a);\n\nconst b = document.createElement("li");\nb.textContent = "Lait";\nliste.appendChild(b);\n\ndocument.querySelector("#zone").style.background = "#4FBFB4";`,
              expectDom: [['#liste li', 'count', '3'], ['#liste', 'contains', 'Pain'], ['#liste', 'contains', 'Lait']],
              must: [['createElement', 'Utilise document.createElement.'], ['appendChild', 'Accroche tes elements avec appendChild.']]
            }
          ],
          quiz: [
            { q: 'Que fait createElement seul ?', opts: ['Ajoute l\'element à la page', 'Fabrique l\'element sans l\'afficher', 'Supprime un element'], a: 1, why: 'Il faut ensuite appendChild pour l\'accrocher au document.' },
            { q: 'Comment ecrit-on background-color en JavaScript ?', opts: ['style.background-color', 'style.backgroundColor', 'style["background color"]'], a: 1, why: 'On supprime le tiret et on met une majuscule : camelCase.' }
          ]
        },

        {
          id: 'js-3-4', title: 'Jeu : remets le code dans l\'ordre', kind: 'jeu', xp: 30,
          goal: 'Reconstituer un script JavaScript coherent.',
          game: { type: 'order', bank: 'js3' },
          blocks: [{ t: 'p', v: "L'ordre compte : on attrape l'element avant de le modifier, on declare avant d'utiliser." }]
        },

        {
          id: 'js-3-5', title: 'PROJET · La liste de courses interactive', kind: 'projet', xp: 65,
          dom: `<h3>Ma liste</h3>\n<input id="champ" placeholder="Un article...">\n<button id="ajouter">Ajouter</button>\n<ul id="liste"></ul>\n<p id="compteur">0 article(s)</p>`,
          goal: 'Construire une vraie petite application : saisie, ajout, affichage, compteur.',
          blocks: [
            { t: 'p', v: "Voici l'exercice que tous les developpeurs front-end ont fait un jour : la to-do list. Elle contient tout : lecture d'un champ, creation d'element, evenement, mise à jour d'affichage." },
            { t: 'h', v: 'Etape 1 — lire un champ de saisie' },
            { t: 'p', v: "La valeur tapee dans un <code>&lt;input&gt;</code> se lit avec <code>.value</code> (et pas <code>.textContent</code>)." },
            { t: 'code', lang: 'js', dom: true, run: true, v: `const champ = document.querySelector("#champ");\nchamp.value = "Essai";\nconsole.log("Contenu du champ : " + champ.value);` },
            { t: 'h', v: 'Etape 2 — le squelette complet' },
            { t: 'code', lang: 'js', v: `const champ = document.querySelector("#champ");\nconst liste = document.querySelector("#liste");\nconst bouton = document.querySelector("#ajouter");\n\nbouton.addEventListener("click", () => {\n  const texte = champ.value;\n  if (texte === "") return;        // on ignore les ajouts vides\n\n  const item = document.createElement("li");\n  item.textContent = texte;\n  liste.appendChild(item);\n\n  champ.value = "";                // on vide le champ\n});` },
            { t: 'tip', h: 'Le return anticipe', v: "<code>if (texte === \"\") return;</code> sort immédiatement de la fonction. C'est plus lisible que d'imbriquer tout le reste dans un if." },
            { t: 'h', v: 'Etape 3 — le compteur' },
            { t: 'p', v: "Apres chaque ajout, on met à jour le paragraphe <code>#compteur</code> avec <code>liste.children.length</code>." }
          ],
          ex: [
            {
              dom: true,
              brief: "Complète l'application : au clic sur <code>#ajouter</code>, ajoute le contenu de <code>#champ</code> comme <code>li</code> dans <code>#liste</code>, vide le champ, et mets à jour <code>#compteur</code> au format <code>N article(s)</code>. Ignore les saisies vides.",
              starter: 'const champ = document.querySelector("#champ");\nconst liste = document.querySelector("#liste");\nconst compteur = document.querySelector("#compteur");\n\ndocument.querySelector("#ajouter").addEventListener("click", () => {\n  \n});\n',
              hint: 'Dans le clic : lire champ.value, tester le vide, creer le li, appendChild, vider champ.value, puis compteur.textContent = liste.children.length + " article(s)".',
              solution: `const champ = document.querySelector("#champ");\nconst liste = document.querySelector("#liste");\nconst compteur = document.querySelector("#compteur");\n\ndocument.querySelector("#ajouter").addEventListener("click", () => {\n  const texte = champ.value;\n  if (texte === "") return;\n  const item = document.createElement("li");\n  item.textContent = texte;\n  liste.appendChild(item);\n  champ.value = "";\n  compteur.textContent = liste.children.length + " article(s)";\n});`,
              expectDom: [['#champ', 'setvalue', 'Pain'], ['#ajouter', 'click', ''],
                          ['#champ', 'setvalue', 'Lait'], ['#ajouter', 'click', ''],
                          ['#liste li', 'count', '2'], ['#compteur', 'text', '2 article(s)'],
                          ['#champ', 'value', '']],
              must: [['\\.value', 'Lis le contenu du champ avec .value.'], ['appendChild', 'Ajoute le nouvel element avec appendChild.']],
              success: "Une application interactive complète. Ajoute-lui un bouton supprimer et tu as une vraie to-do list."
            }
          ]
        },

        {
          id: 'js-3-6', title: 'BOSS FINAL · L\'epreuve de l\'Étincelle', kind: 'boss', xp: 90,
          dom: `<h2 id="titre">Panneau</h2>\n<p id="etat">eteint</p>\n<button id="switch">Basculer</button>`,
          goal: 'Deux defis finaux : logique pure, puis interaction.',
          blocks: [{ t: 'p', v: "Derniere épreuve du parcours JavaScript libre." }],
          ex: [
            {
              brief: "<b>Defi 1 — L'analyste.</b> À partir du tableau, affiche 3 lignes : <code>Total : 90</code>, <code>Max : 40</code>, et <code>Au-dessus de la moyenne : 25, 40</code> (les valeurs strictement superieures à la moyenne, separees par virgule-espace).",
              starter: 'const scores = [10, 25, 40, 15];\n',
              hint: 'reduce pour le total, Math.max(...scores) pour le max, filter + join pour la derniere ligne.',
              solution: 'const scores = [10, 25, 40, 15];\nconst total = scores.reduce((t, n) => t + n, 0);\nconsole.log(`Total : ${total}`);\nconsole.log(`Max : ${Math.max(...scores)}`);\nconst moyenne = total / scores.length;\nconsole.log(`Au-dessus de la moyenne : ${scores.filter(n => n > moyenne).join(", ")}`);',
              tests: [{ expect: 'Total : 90\nMax : 40\nAu-dessus de la moyenne : 25, 40' }]
            },
            {
              dom: true,
              brief: "<b>Defi 2 — L'interrupteur.</b> Au clic sur <code>#switch</code>, le paragraphe <code>#etat</code> doit basculer entre <code>allume</code> et <code>eteint</code> à chaque clic.",
              starter: 'const etat = document.querySelector("#etat");\n\ndocument.querySelector("#switch").addEventListener("click", () => {\n  \n});\n',
              hint: 'Garde une variable booleenne, inverse-la (!allume), puis ecris le texte correspondant. Un ternaire fait ca en une ligne.',
              solution: `const etat = document.querySelector("#etat");\nlet allume = false;\n\ndocument.querySelector("#switch").addEventListener("click", () => {\n  allume = !allume;\n  etat.textContent = allume ? "allume" : "eteint";\n});`,
              expectDom: [['#switch', 'click', ''], ['#etat', 'text', 'allume'],
                          ['#switch', 'click', ''], ['#état', 'text', 'eteint'],
                          ['#switch', 'click', ''], ['#état', 'text', 'allume']],
              must: [['addEventListener', 'Il faut un ecouteur de clic.']],
              success: "PARCOURS JAVASCRIPT LIBRE TERMINE. Tu sais programmer la logique ET faire vivre une page. La Forge ULTRA t'attend pour les classes, les API et les jeux sur canvas."
            }
          ]
        }
      ]
    }
  ]
};
