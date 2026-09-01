/* ARES ULTRA — « L'Arsenal de l'Étincelle » : JavaScript niveau professionnel */
var PATH_PRO_JS = {
  id: 'pro-js', lang: 'js', name: 'JAVASCRIPT ULTRA', glyph: "l'arsenal de l'étincelle",
  tag: 'ULTRA · 9 modules', color: '#F6B23D', pro: true,
  title: "L'Arsenal de l'Étincelle",
  blurb: "Closures, classes, DOM avance, asynchrone, stockage local et canvas. Plus deux applications completes : un quiz interactif et un jeu de casse-brique.",
  chips: ['9 modules', '3 applications', 'Le JS des vrais sites'],
  promise: "Tu sais faire reagir un bouton. Ici tu apprends à structurer une application : état, composants, persistance, asynchrone et rendu graphique.",
  days: [
    /* ---------------- MODULE 1 ---------------- */
    {
      n: 1, title: 'Fonctions avancees', sub: 'Callbacks, closures, portee',
      lessons: [
        {
          id: 'pj-1-1', title: 'Les fonctions sont des valeurs', kind: 'lecon', xp: 35,
          goal: 'Passer une fonction en argument : le concept qui debloque tout le JavaScript moderne.',
          blocks: [
            { t: 'p', v: "En JavaScript, une fonction est une valeur comme une autre. On peut la ranger dans une variable, la passer en argument, la renvoyer. C'est ce qui rend <code>map</code>, <code>filter</code> et <code>addEventListener</code> possibles." },
            { t: 'code', lang: 'js', run: true, v: `const direBonjour = () => "Bonjour";\nconst salut = direBonjour;          // on copie la fonction, sans l'appeler\n\nconsole.log(typeof direBonjour);\nconsole.log(salut());` },
            { t: 'h', v: 'Une fonction qui reçoit une fonction' },
            { t: 'code', lang: 'js', run: true, v: `function repeter(n, action) {\n  for (let i = 1; i <= n; i++) {\n    action(i);\n  }\n}\n\nrepeter(3, (numero) => console.log("Tour " + numero));\nrepeter(2, (numero) => console.log("*".repeat(numero)));` },
            { t: 'p', v: "<code>action</code> est un <b>callback</b> : une fonction qu'on confie a une autre pour qu'elle l'appelle au bon moment. C'est exactement ce que fait <code>addEventListener</code>." },
            { t: 'warn', h: 'Le piège des parenthèses', v: "<code>bouton.addEventListener(\"click\", maFonction)</code> passe la fonction.<br><code>bouton.addEventListener(\"click\", maFonction())</code> l'<b>exécute tout de suite</b> et passe son resultat. Une paire de parenthèses change tout." },
            { t: 'h', v: 'Une fonction qui renvoie une fonction' },
            { t: 'code', lang: 'js', run: true, v: `function multiplicateur(facteur) {\n  return (x) => x * facteur;\n}\n\nconst doubler = multiplicateur(2);\nconst tripler = multiplicateur(3);\n\nconsole.log(doubler(10));\nconsole.log(tripler(10));` },
            { t: 'key', h: 'A retenir', v: "Une fonction est une valeur · callback = fonction confiee · sans parenthèses on passe, avec on exécute · une fonction peut fabriquer des fonctions." }
          ],
          ex: [
            {
              brief: "Écris <code>appliquer(tableau, fonction)</code> qui affiche le résultat de la fonction pour chaque element (un par ligne), sans utiliser <code>map</code>.",
              starter: 'function appliquer(tableau, fonction) {\n  \n}\n\nappliquer([1, 2, 3], (n) => n * 10);\nappliquer(["a", "b"], (s) => s.toUpperCase());\n',
              hint: 'Boucle for...of, et dans la boucle console.log(fonction(element)).',
              solution: `function appliquer(tableau, fonction) {\n  for (const element of tableau) {\n    console.log(fonction(element));\n  }\n}\n\nappliquer([1, 2, 3], (n) => n * 10);\nappliquer(["a", "b"], (s) => s.toUpperCase());`,
              tests: [{ expect: '10\n20\n30\nA\nB' }],
              mustnot: [['\\.map\\s*\\(', 'Sans map : on reconstruit le mecanisme a la main.']]
            },
            {
              brief: "Écris <code>creerCompteur()</code> qui renvoie une fonction ; chaque appel de cette fonction renvoie 1, puis 2, puis 3...",
              starter: 'function creerCompteur() {\n  \n}\n\nconst compteur = creerCompteur();\nconsole.log(compteur());\nconsole.log(compteur());\nconsole.log(compteur());\n\nconst autre = creerCompteur();\nconsole.log(autre());\n',
              hint: 'Déclare let n = 0 dans creerCompteur, et renvoie une fonction qui fait n++ puis renvoie n.',
              solution: `function creerCompteur() {\n  let n = 0;\n  return () => {\n    n++;\n    return n;\n  };\n}\n\nconst compteur = creerCompteur();\nconsole.log(compteur());\nconsole.log(compteur());\nconsole.log(compteur());\n\nconst autre = creerCompteur();\nconsole.log(autre());`,
              tests: [{ expect: '1\n2\n3\n1' }],
              success: "Tu viens d'écrire une closure : la fonction renvoyée se souvient de son environnement. Chaque compteur a sa propre mémoire."
            }
          ],
          quiz: [
            { q: 'Quelle différence entre f et f() ?', opts: ['Aucune', 'f est la fonction, f() son résultat', 'f() est plus rapide'], a: 1, why: 'Les parenthèses declenchent l\'exécution.' },
            { q: 'Qu\'est-ce qu\'un callback ?', opts: ['Une fonction passee a une autre pour être appelée plus tard', 'Un type d\'erreur', 'Une boucle'], a: 0, why: 'C\'est la base des evenements et des traitements asynchrones.' }
          ]
        },
        {
          id: 'pj-1-2', title: 'Closures et etat prive', kind: 'lecon', xp: 40,
          goal: 'Comprendre la mémoire des fonctions, et s\'en servir pour protéger des donnees.',
          blocks: [
            { t: 'p', v: "Une <b>closure</b> (fermeture) est une fonction qui garde l'acces aux variables de l'endroit où elle a été créée, même longtemps après." },
            { t: 'code', lang: 'js', run: true, v: `function creerBanque(soldeInitial) {\n  let solde = soldeInitial;          // invisible de l'exterieur\n\n  return {\n    deposer(montant) {\n      if (montant <= 0) return "Montant invalide";\n      solde += montant;\n      return solde;\n    },\n    retirer(montant) {\n      if (montant > solde) return "Fonds insuffisants";\n      solde -= montant;\n      return solde;\n    },\n    consulter() { return solde; }\n  };\n}\n\nconst compte = creerBanque(100);\nconsole.log(compte.deposer(50));\nconsole.log(compte.retirer(300));\nconsole.log(compte.consulter());\nconsole.log(compte.solde);          // undefined : la variable est protegee` },
            { t: 'analogy', v: "<b>L'image à retenir :</b> la closure est un coffre-fort. <code>solde</code> est a l'intérieur ; personne ne peut y toucher directement. Les seules portes sont les methodes que tu exposes, et elles vérifient chaque opération." },
            { t: 'h', v: 'Le piège classique en entretien' },
            { t: 'code', lang: 'js', run: true, v: `// Avec var : les 3 fonctions partagent la MEME variable\nvar fonctionsVar = [];\nfor (var i = 0; i < 3; i++) {\n  fonctionsVar.push(() => i);\n}\nconsole.log(fonctionsVar[0](), fonctionsVar[1](), fonctionsVar[2]());\n\n// Avec let : chaque tour a SA variable\nconst fonctionsLet = [];\nfor (let j = 0; j < 3; j++) {\n  fonctionsLet.push(() => j);\n}\nconsole.log(fonctionsLet[0](), fonctionsLet[1](), fonctionsLet[2]());` },
            { t: 'p', v: "Le premier affiche <code>3 3 3</code> : <code>var</code> ne crée qu'une seule variable pour toute la boucle. Le second affiche <code>0 1 2</code> : <code>let</code> en crée une par tour. C'est <b>la</b> raison pour laquelle on n'utilise plus jamais <code>var</code>." },
            { t: 'key', h: 'A retenir', v: "Une closure retient son environnement · elle permet des données privees · let cree une variable par tour de boucle, pas var." }
          ],
          ex: [
            {
              brief: "Écris <code>creerCoffre(code)</code> qui renvoie un objet avec <code>ouvrir(essai)</code> renvoyant <code>Ouvert</code> ou <code>Refuse</code>, et <code>changerCode(ancien, nouveau)</code> renvoyant <code>true</code> ou <code>false</code>. Le code ne doit pas être accessible directement.",
              starter: 'function creerCoffre(code) {\n  \n}\n\nconst coffre = creerCoffre("1234");\nconsole.log(coffre.ouvrir("0000"));\nconsole.log(coffre.ouvrir("1234"));\nconsole.log(coffre.changerCode("1234", "9999"));\nconsole.log(coffre.ouvrir("9999"));\nconsole.log(coffre.code);\n',
              hint: 'La variable code reste dans la fonction ; renvoie un objet avec deux methodes qui la lisent et la modifient.',
              solution: `function creerCoffre(code) {\n  return {\n    ouvrir(essai) {\n      return essai === code ? "Ouvert" : "Refuse";\n    },\n    changerCode(ancien, nouveau) {\n      if (ancien !== code) return false;\n      code = nouveau;\n      return true;\n    }\n  };\n}\n\nconst coffre = creerCoffre("1234");\nconsole.log(coffre.ouvrir("0000"));\nconsole.log(coffre.ouvrir("1234"));\nconsole.log(coffre.changerCode("1234", "9999"));\nconsole.log(coffre.ouvrir("9999"));\nconsole.log(coffre.code);`,
              tests: [{ expect: 'Refuse\nOuvert\ntrue\nOuvert\nundefined' }],
              success: "Encapsulation réussie : la donnée sensible est inaccessible de l'extérieur."
            }
          ],
          quiz: [
            { q: 'Qu\'affiche une boucle var i avec 3 closures ?', opts: ['0 1 2', '3 3 3', 'undefined'], a: 1, why: 'var partage une seule variable, qui vaut 3 à la fin de la boucle.' },
            { q: 'À quoi sert principalement une closure ?', opts: ['À accelerer le code', 'À garder un état prive', 'A créer des classes'], a: 1, why: 'Elle conserve des variables inaccessibles de l\'extérieur.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 2 ---------------- */
    {
      n: 2, title: 'Classes et objets', sub: 'Modéliser une application',
      lessons: [
        {
          id: 'pj-2-1', title: 'Les classes JavaScript', kind: 'lecon', xp: 40,
          goal: 'Créer des objets structures avec constructeur, methodes et heritage.',
          blocks: [
            { t: 'p', v: "Même idée qu'en Python, syntaxe différente : la classe est un moule, l'instance une piece fabriquee." },
            { t: 'code', lang: 'js', run: true, v: 'class Joueur {\n  constructor(pseudo, vie = 100) {\n    this.pseudo = pseudo;\n    this.vie = vie;\n    this.vieMax = vie;\n  }\n\n  subir(degats) {\n    this.vie = Math.max(0, this.vie - degats);\n    return this.vie;\n  }\n\n  estVivant() {\n    return this.vie > 0;\n  }\n\n  toString() {\n    return `${this.pseudo} (${this.vie}/${this.vieMax} PV)`;\n  }\n}\n\nconst nova = new Joueur("Nova");\nnova.subir(30);\nconsole.log(nova.toString());\nconsole.log(nova.estVivant());' },
            { t: 'warn', h: 'Le mot new est obligatoire', v: "<code>Joueur(\"Nova\")</code> sans <code>new</code> provoque une erreur. <code>new</code> crée l'objet vide, exécute le constructeur et renvoie l'objet." },
            { t: 'h', v: 'Heritage' },
            { t: 'code', lang: 'js', run: true, v: 'class Personnage {\n  constructor(nom, vie) {\n    this.nom = nom;\n    this.vie = vie;\n  }\n  decrire() { return `${this.nom} : ${this.vie} PV`; }\n}\n\nclass Magicien extends Personnage {\n  constructor(nom, vie, mana) {\n    super(nom, vie);          // obligatoire, et AVANT tout this\n    this.mana = mana;\n  }\n  decrire() {\n    return super.decrire() + ` et ${this.mana} mana`;\n  }\n}\n\nconsole.log(new Personnage("Kaz", 100).decrire());\nconsole.log(new Magicien("Nova", 70, 30).decrire());' },
            { t: 'h', v: 'Champs prives' },
            { t: 'code', lang: 'js', run: true, v: `class Compte {\n  #solde = 0;                  // le # rend le champ VRAIMENT prive\n\n  deposer(montant) {\n    if (montant > 0) this.#solde += montant;\n    return this.#solde;\n  }\n  get solde() { return this.#solde; }\n}\n\nconst c = new Compte();\nconsole.log(c.deposer(120));\nconsole.log(c.solde);\nconsole.log(Object.keys(c).length);   // 0 : rien n'est visible de l'exterieur` },
            { t: 'key', h: 'A retenir', v: "class + constructor · new pour instancier · extends + super() pour heriter · #champ pour du vraiment prive · get pour une lecture calculee." }
          ],
          ex: [
            {
              brief: "Crée la classe <code>Livre</code> (<code>titre</code>, <code>auteur</code>, <code>pages</code>) avec <code>estLong()</code> (plus de 300 pages) et <code>toString()</code> renvoyant <code>Titre - Auteur (N p.)</code>.",
              starter: 'class Livre {\n  \n}\n\nconst l = new Livre("Dune", "Herbert", 412);\nconsole.log(l.toString());\nconsole.log(l.estLong());\nconsole.log(new Livre("Court", "X", 90).estLong());\n',
              hint: 'constructor(titre, auteur, pages) avec trois this.x = x.',
              solution: 'class Livre {\n  constructor(titre, auteur, pages) {\n    this.titre = titre;\n    this.auteur = auteur;\n    this.pages = pages;\n  }\n  estLong() {\n    return this.pages > 300;\n  }\n  toString() {\n    return `${this.titre} - ${this.auteur} (${this.pages} p.)`;\n  }\n}\n\nconst l = new Livre("Dune", "Herbert", 412);\nconsole.log(l.toString());\nconsole.log(l.estLong());\nconsole.log(new Livre("Court", "X", 90).estLong());',
              tests: [{ expect: 'Dune - Herbert (412 p.)\ntrue\nfalse' }],
              must: [['class\\s+Livre', 'Utilise une classe nommee Livre.'], ['constructor', 'Il faut un constructeur.']]
            },
            {
              brief: "Crée <code>Vehicule</code> (nom, roues) avec <code>decrire()</code> renvoyant <code>Nom : N roues</code>, puis <code>Moto</code> qui herite et fixe 2 roues, en ajoutant <code> (vroum)</code> à la description.",
              starter: 'class Vehicule {\n  \n}\n\nclass Moto extends Vehicule {\n  \n}\n\nconsole.log(new Vehicule("Camion", 6).decrire());\nconsole.log(new Moto("Ducati").decrire());\n',
              hint: 'Dans Moto : constructor(nom) { super(nom, 2); } et decrire() { return super.decrire() + " (vroum)"; }',
              solution: 'class Vehicule {\n  constructor(nom, roues) {\n    this.nom = nom;\n    this.roues = roues;\n  }\n  decrire() {\n    return `${this.nom} : ${this.roues} roues`;\n  }\n}\n\nclass Moto extends Vehicule {\n  constructor(nom) {\n    super(nom, 2);\n  }\n  decrire() {\n    return super.decrire() + " (vroum)";\n  }\n}\n\nconsole.log(new Vehicule("Camion", 6).decrire());\nconsole.log(new Moto("Ducati").decrire());',
              tests: [{ expect: 'Camion : 6 roues\nDucati : 2 roues (vroum)' }],
              must: [['extends\\s+Vehicule', 'Moto doit etendre Vehicule.'], ['super\\s*\\(', 'Appelle super() dans le constructeur de Moto.']]
            }
          ],
          quiz: [
            { q: 'Que fait le mot-clé new ?', opts: ['Il crée une instance et exécute le constructeur', 'Il copie une classe', 'Il supprime un objet'], a: 0, why: 'Sans new, this n\'est pas defini et le code echoue.' },
            { q: 'Où doit-on appeler super() ?', opts: ['À la fin du constructeur', 'Avant toute utilisation de this', 'C\'est optionnel'], a: 1, why: 'Tant que super() n\'a pas tourne, this n\'existe pas dans une classe derivee.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 3 ---------------- */
    {
      n: 3, title: 'DOM avance', sub: 'Delegation, formulaires, validation',
      lessons: [
        {
          id: 'pj-3-1', title: 'La delegation d\'evenements', kind: 'lecon', xp: 40,
          dom: `<ul id="liste">\n  <li>Pain <button class="sup">x</button></li>\n  <li>Lait <button class="sup">x</button></li>\n  <li>Oeufs <button class="sup">x</button></li>\n</ul>\n<p id="info">3 elements</p>`,
          goal: 'Gerer les clics sur des éléments qui n\'existent pas encore.',
          blocks: [
            { t: 'p', v: "Problème classique : tu attaches un écouteur à chaque bouton... puis tu ajoutes un élément par JavaScript, et son bouton ne fait rien. Normal : il n'existait pas au moment où tu as attache les ecouteurs." },
            { t: 'p', v: "La solution professionnelle : écouter sur le <b>parent</b>, qui lui existe toujours, et regarder d'où vient le clic. C'est la <b>delegation</b>." },
            { t: 'code', lang: 'js', dom: true, run: true, v: `const liste = document.querySelector("#liste");\n\nliste.addEventListener("click", (evenement) => {\n  const cible = evenement.target;\n  if (!cible.classList.contains("sup")) return;   // on ignore les autres clics\n  cible.parentElement.remove();\n  document.querySelector("#info").textContent =\n    liste.children.length + " elements";\n});\n\nconsole.log("Clique sur un x dans l'apercu : meme les futurs boutons marcheront.");` },
            { t: 'h', v: "L'objet evenement" },
            {
              t: 'table', head: ['Propriete', 'Contenu'],
              rows: [['<code>event.target</code>', "l'élément reellement clique"],
                     ['<code>event.currentTarget</code>', "l'élément qui écoute"],
                     ['<code>event.preventDefault()</code>', 'annule le comportement par défaut'],
                     ['<code>event.key</code>', 'la touche pressee (evenements clavier)']]
            },
            { t: 'tip', h: 'Un écouteur au lieu de mille', v: "Sur une liste de 500 éléments, la delegation utilise 1 écouteur au lieu de 500 : moins de mémoire, et ça fonctionne pour les éléments ajoutes plus tard. C'est la bonne pratique par defaut." },
            { t: 'key', h: 'A retenir', v: "Écoute sur le parent stable · event.target dit qui a été clique · filtre avec classList.contains · fonctionne pour le futur contenu." }
          ],
          ex: [
            {
              dom: true,
              brief: "Avec une <b>seule</b> ligne <code>addEventListener</code> sur <code>#liste</code>, supprime l'élément parent quand on clique sur un bouton <code>.sup</code>, et mets à jour <code>#info</code> au format <code>N elements</code>.",
              starter: 'const liste = document.querySelector("#liste");\nconst info = document.querySelector("#info");\n\n',
              hint: 'Un seul écouteur sur liste ; teste event.target.classList.contains("sup") puis .parentElement.remove().',
              solution: `const liste = document.querySelector("#liste");\nconst info = document.querySelector("#info");\n\nliste.addEventListener("click", (e) => {\n  if (!e.target.classList.contains("sup")) return;\n  e.target.parentElement.remove();\n  info.textContent = liste.children.length + " elements";\n});`,
              expectDom: [['#liste .sup', 'click', ''], ['#liste li', 'count', '2'], ['#info', 'text', '2 elements']],
              must: [['addEventListener', 'Il faut un ecouteur.'],
                     ['(target)', 'Utilise event.target pour savoir ou le clic a eu lieu.']],
              mustnot: [['querySelectorAll\\s*\\([^)]*sup', 'Justement : pas de boucle sur tous les boutons, un seul ecouteur sur le parent.']]
            }
          ],
          quiz: [
            { q: 'Pourquoi la delegation fonctionne-t-elle pour les éléments ajoutes plus tard ?', opts: ['Parce que l\'écouteur est sur le parent, qui existe déjà', 'Parce que JavaScript re-scanne la page', 'Ce n\'est pas le cas'], a: 0, why: 'L\'evenement remonte jusqu\'au parent, qui l\'intercepte quel que soit l\'enfant.' },
            { q: 'Que contient event.target ?', opts: ['L\'élément qui écoute', 'L\'élément reellement clique', 'La page entière'], a: 1, why: 'currentTarget est celui qui écoute, target celui qui a recu le clic.' }
          ]
        },
        {
          id: 'pj-3-2', title: 'Formulaires et validation', kind: 'lecon', xp: 40,
          dom: `<form id="form">\n  <input id="pseudo" placeholder="Pseudo">\n  <input id="age" placeholder="Age">\n  <button type="submit">Envoyer</button>\n</form>\n<p id="erreur"></p>\n<p id="resultat"></p>`,
          goal: 'Récupérer et vérifier des données saisies avant de les traiter.',
          blocks: [
            { t: 'p', v: "Un formulaire recharge la page par defaut. En JavaScript, on intercepte l'envoi, on vérifie, et on traite sans rechargement." },
            { t: 'code', lang: 'js', dom: true, run: true, v: `const form = document.querySelector("#form");\nconst erreur = document.querySelector("#erreur");\nconst resultat = document.querySelector("#resultat");\n\nform.addEventListener("submit", (e) => {\n  e.preventDefault();                       // sans ca, la page se recharge\n\n  const pseudo = document.querySelector("#pseudo").value.trim();\n  const age = Number(document.querySelector("#age").value);\n\n  if (pseudo.length < 3) {\n    erreur.textContent = "Le pseudo doit faire au moins 3 caracteres.";\n    return;\n  }\n  if (!Number.isInteger(age) || age < 8 || age > 120) {\n    erreur.textContent = "Age invalide.";\n    return;\n  }\n\n  erreur.textContent = "";\n  resultat.textContent = pseudo + " (" + age + " ans) inscrit !";\n});\n\nconsole.log("Remplis le formulaire dans l'apercu et valide.");` },
            { t: 'h', v: 'La règle des messages d\'erreur' },
            { t: 'ul', v: [
              "Dire <b>ce qui</b> ne va pas, pas seulement « erreur ».",
              "Dire <b>comment</b> corriger : « au moins 3 caractères ».",
              "Afficher l'erreur <b>à cote</b> du champ concerne.",
              "Ne jamais faire disparaitre ce que la personne a déjà tape."
            ] },
            { t: 'warn', h: 'La validation cote navigateur ne protège rien', v: "Elle sert au confort de l'utilisateur. N'importe qui peut la contourner en 10 secondes. Toute donnée doit <b>aussi</b> être vérifiée par le serveur. C'est une règle de sécurité absolue." },
            { t: 'key', h: 'A retenir', v: "e.preventDefault() sur submit · .value.trim() lit le champ · Number() convertit · un message d'erreur précis et utile · le serveur revalide toujours." }
          ],
          ex: [
            {
              dom: true,
              brief: "Au <code>submit</code> du formulaire : empeche le rechargement, et si <code>#pseudo</code> fait moins de 3 caractères affiche <code>Pseudo trop court</code> dans <code>#erreur</code>, sinon affiche <code>Bienvenue PSEUDO</code> dans <code>#resultat</code> et vide <code>#erreur</code>.",
              starter: 'const form = document.querySelector("#form");\n\nform.addEventListener("submit", (e) => {\n  \n});\n',
              hint: 'e.preventDefault() en premier, puis .value.trim(), puis le test de longueur.',
              solution: `const form = document.querySelector("#form");\n\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const pseudo = document.querySelector("#pseudo").value.trim();\n  if (pseudo.length < 3) {\n    document.querySelector("#erreur").textContent = "Pseudo trop court";\n    return;\n  }\n  document.querySelector("#erreur").textContent = "";\n  document.querySelector("#resultat").textContent = "Bienvenue " + pseudo;\n});`,
              expectDom: [['#pseudo', 'setvalue', 'ab'], ['#form', 'submit', ''], ['#erreur', 'text', 'Pseudo trop court'],
                          ['#pseudo', 'setvalue', 'Nova'], ['#form', 'submit', ''], ['#résultat', 'text', 'Bienvenue Nova'], ['#erreur', 'text', '']],
              must: [['preventDefault', 'Appelle e.preventDefault() pour empecher le rechargement.'],
                     ['\\.value', 'Lis la saisie avec .value.']]
            }
          ],
          quiz: [
            { q: 'Que fait e.preventDefault() sur un submit ?', opts: ['Vide le formulaire', 'Empeche le rechargement de la page', 'Envoie les données'], a: 1, why: 'On reprend la main pour traiter les données en JavaScript.' },
            { q: 'La validation cote navigateur suffit-elle ?', opts: ['Oui', 'Non, le serveur doit revalider'], a: 1, why: 'Elle est facilement contournable : elle sert au confort, pas à la sécurité.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 4 ---------------- */
    {
      n: 4, title: 'Asynchrone', sub: 'Callbacks, promesses, async/await',
      lessons: [
        {
          id: 'pj-4-1', title: 'Le temps qui passe', kind: 'lecon', xp: 40,
          goal: 'Comprendre pourquoi le code ne s\'exécute pas toujours dans l\'ordre ou il est écrit.',
          blocks: [
            { t: 'p', v: "JavaScript n'a qu'un seul fil d'exécution. Pour ne pas bloquer la page pendant une attente (reseau, minuterie), il met les tâches longues de cote et continue." },
            { t: 'code', lang: 'js', run: true, v: `console.log("1 - Je commande une pizza");\n\nsetTimeout(() => {\n  console.log("3 - La pizza arrive");\n}, 1000);\n\nconsole.log("2 - Je mets la table pendant ce temps");` },
            { t: 'p', v: "L'ordre affiche est 1, 2, 3 : le <code>setTimeout</code> est mis en attente, le reste continue. Si JavaScript attendait, la page serait figee une seconde." },
            { t: 'analogy', v: "<b>L'image à retenir :</b> un serveur de restaurant ne reste pas plante devant la cuisine. Il prend la commande, va servir d'autres tables, et revient quand le plat est prêt. <code>setTimeout</code>, c'est la sonnette de la cuisine." },
            { t: 'h', v: 'Les callbacks imbriques : la pyramide de la honte' },
            { t: 'code', lang: 'js', run: true, v: `function etape(nom, suite) {\n  setTimeout(() => {\n    console.log(nom);\n    if (suite) suite();\n  }, 100);\n}\n\netape("Chargement", () => {\n  etape("Traitement", () => {\n    etape("Affichage", null);\n  });\n});` },
            { t: 'p', v: "Trois étapes et le code part déjà en escalier vers la droite. Avec dix étapes, c'est illisible : on appelle ça le <i>callback hell</i>. Les promesses ont été inventees pour ça." },
            { t: 'key', h: 'A retenir', v: "Un seul fil d'exécution · setTimeout differe sans bloquer · l'ordre du code n'est pas l'ordre d'exécution · les callbacks imbriques deviennent vite illisibles." }
          ],
          ex: [
            {
              brief: "Affiche dans cet ordre : <code>Debut</code> immédiatement, <code>Fin</code> immédiatement, puis <code>Milieu</code> après un setTimeout de 500 ms.",
              starter: 'console.log("Debut");\n\n',
              hint: 'Le setTimeout se place entre les deux console.log, mais son contenu s\'affiche en dernier.',
              solution: `console.log("Debut");\n\nsetTimeout(() => {\n  console.log("Milieu");\n}, 500);\n\nconsole.log("Fin");`,
              tests: [{ expect: 'Debut\nFin\nMilieu' }],
              must: [['setTimeout', 'Utilise setTimeout.']]
            },
            {
              brief: "Écris <code>compteARebours(n)</code> qui affiche n, n-1... jusqu'à 1 puis <code>Partez !</code>, en utilisant <code>setTimeout</code> à chaque etape (100 ms).",
              starter: 'function compteARebours(n) {\n  \n}\n\ncompteARebours(3);\n',
              hint: 'Cas d\'arrêt : si n === 0 on affiche Partez ! sinon on affiche n et on rappelle la fonction avec n - 1 dans un setTimeout.',
              solution: `function compteARebours(n) {\n  if (n === 0) {\n    console.log("Partez !");\n    return;\n  }\n  console.log(n);\n  setTimeout(() => compteARebours(n - 1), 100);\n}\n\ncompteARebours(3);`,
              tests: [{ expect: '3\n2\n1\nPartez !' }],
              success: 'Recursivite + asynchrone : le motif exact des animations et des jeux.'
            }
          ],
          quiz: [
            { q: 'Qu\'affiche : log("A"); setTimeout(()=>log("B"),0); log("C") ?', opts: ['A B C', 'A C B', 'B A C'], a: 1, why: 'Même avec un delai de 0, le callback attend que le code principal soit fini.' },
            { q: 'Pourquoi ne pas bloquer le fil d\'exécution ?', opts: ['Ça consomme de la batterie', 'La page entière se fige : plus aucun clic ne répond', 'Ça fait planter le serveur'], a: 1, why: 'Un seul fil : s\'il est occupe, l\'interface ne répond plus.' }
          ]
        },
        {
          id: 'pj-4-2', title: 'Promesses et async / await', kind: 'lecon', xp: 45,
          goal: 'Lire et écrire du code asynchrone moderne, celui de tous les sites qui parlent a un serveur.',
          blocks: [
            { t: 'p', v: "Une <b>promesse</b> représente un résultat qui n'est pas encore la. Elle a trois états : en attente, tenue (<i>resolved</i>) ou rompue (<i>rejected</i>)." },
            { t: 'analogy', v: "<b>L'image à retenir :</b> le buzzer qu'on te donne au fast-food. Tu n'as pas ton plateau, mais tu as la <i>promesse</i> d'un plateau. Tu peux aller t'asseoir. Quand ça vibre : soit ton plat arrive (tenue), soit on t'annonce une rupture de stock (rompue)." },
            { t: 'h', v: 'Consommer une promesse' },
            { t: 'code', lang: 'js', v: `chargerProfil(42)\n  .then(profil => console.log(profil.nom))\n  .catch(erreur => console.log("Echec :", erreur))\n  .finally(() => console.log("Termine"));` },
            { t: 'h', v: 'La version moderne : async / await' },
            { t: 'code', lang: 'js', v: `async function afficherProfil(id) {\n  try {\n    const profil = await chargerProfil(id);   // on attend, sans bloquer la page\n    console.log(profil.nom);\n  } catch (erreur) {\n    console.log("Echec :", erreur);\n  }\n}\n\nafficherProfil(42);` },
            { t: 'p', v: "<code>await</code> met en pause <b>cette fonction</b> jusqu'à ce que la promesse soit tenue — le reste de la page continue de fonctionner. Le code se lit de haut en bas, comme du code normal : c'est tout l'intérêt." },
            {
              t: 'table', head: ['Règle', 'Détail'],
              rows: [['<code>await</code> exige <code>async</code>', "on ne peut attendre que dans une fonction async"],
                     ['erreurs', '<code>try / catch</code> remplace <code>.catch()</code>'],
                     ['en parallele', '<code>await Promise.all([a, b])</code> lance les deux en même temps'],
                     ['fetch', '<code>const r = await fetch(url); const d = await r.json();</code>']]
            },
            { t: 'warn', h: "Dans la forge ARES", v: "L'aperçu exécute ton code sans acces reseau et sans file de promesses : les blocs ci-dessus sont donnes en lecture. Recopie-les dans la console de ton navigateur (touche F12) pour les voir tourner en vrai. Les exercices, eux, utilisent des callbacks executables." },
            { t: 'h', v: 'Fabriquer sa propre promesse' },
            { t: 'code', lang: 'js', v: `function attendre(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function demo() {\n  console.log("debut");\n  await attendre(1000);\n  console.log("une seconde plus tard");\n}` },
            { t: 'key', h: 'A retenir', v: "Promesse = résultat futur · .then/.catch ou async/await · await seulement dans async · try/catch pour les erreurs · Promise.all pour paralleliser." }
          ],
          ex: [
            {
              brief: "Écris une fonction <code>chargerDonnees(callback)</code> qui simule un chargement : après 200 ms, elle appelle le callback avec le tableau <code>[1, 2, 3]</code>. Le code d'appel affiche <code>Chargement...</code> puis <code>Recu : 3 elements</code>.",
              starter: 'function chargerDonnees(callback) {\n  \n}\n\nconsole.log("Chargement...");\nchargerDonnees((donnees) => {\n  console.log("Recu : " + donnees.length + " elements");\n});\n',
              hint: 'setTimeout(() => callback([1, 2, 3]), 200);',
              solution: `function chargerDonnees(callback) {\n  setTimeout(() => callback([1, 2, 3]), 200);\n}\n\nconsole.log("Chargement...");\nchargerDonnees((donnees) => {\n  console.log("Recu : " + donnees.length + " elements");\n});`,
              tests: [{ expect: 'Chargement...\nRecu : 3 elements' }],
              must: [['setTimeout', 'Simule l\'attente avec setTimeout.'], ['callback\\s*\\(', 'Appelle le callback avec les donnees.']]
            },
            {
              brief: "Écris une chaîne de trois étapes avec callbacks : affiche <code>Connexion</code>, puis après 100 ms <code>Authentification</code>, puis après 100 ms encore <code>Bienvenue</code>.",
              starter: 'function etape(nom, delai, suite) {\n  \n}\n\n',
              hint: 'La fonction affiche après un setTimeout, puis appelle suite() si elle existe.',
              solution: `function etape(nom, delai, suite) {\n  setTimeout(() => {\n    console.log(nom);\n    if (suite) suite();\n  }, delai);\n}\n\netape("Connexion", 0, () => {\n  etape("Authentification", 100, () => {\n    etape("Bienvenue", 100, null);\n  });\n});`,
              tests: [{ expect: 'Connexion\nAuthentification\nBienvenue' }],
              success: "Tu viens de vivre le callback hell : trois niveaux d'imbrication pour trois etapes. C'est exactement le problème que resolvent async/await."
            }
          ],
          quiz: [
            { q: 'Où peut-on utiliser await ?', opts: ['Partout', 'Uniquement dans une fonction async', 'Uniquement dans une boucle'], a: 1, why: 'await n\'est valide qu\'a l\'intérieur d\'une fonction déclaree async.' },
            { q: 'Comment attraper une erreur avec async/await ?', opts: ['avec .catch() uniquement', 'avec try / catch', 'ce n\'est pas possible'], a: 1, why: 'C\'est justement l\'avantage : la gestion d\'erreur redevient classique.' },
            { q: 'Que fait Promise.all([a, b]) ?', opts: ['Lance a puis b', 'Lance les deux en parallele et attend les deux', 'Annule b si a echoue'], a: 1, why: 'Utile pour ne pas additionner les temps d\'attente.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 5 ---------------- */
    {
      n: 5, title: 'Persistance', sub: 'Garder les données entre deux visites',
      lessons: [
        {
          id: 'pj-5-1', title: 'localStorage', kind: 'lecon', xp: 35,
          goal: 'Sauvegarder l\'état de ton application dans le navigateur.',
          blocks: [
            { t: 'p', v: "Sans sauvegarde, tout disparait au rechargement. <code>localStorage</code> est un petit coffre (environ 5 Mo) attache au site, dans le navigateur de la personne." },
            { t: 'code', lang: 'js', v: `localStorage.setItem("pseudo", "Nova");\nconst pseudo = localStorage.getItem("pseudo");   // "Nova"\nlocalStorage.removeItem("pseudo");\nlocalStorage.clear();` },
            { t: 'warn', h: 'Il ne stocke que du texte', v: "Pour un objet ou un tableau, il faut convertir : <code>JSON.stringify()</code> pour écrire, <code>JSON.parse()</code> pour relire. C'est l'erreur numéro 1 : sans ça, tu relis la chaîne <code>[object Object]</code>." },
            { t: 'code', lang: 'js', run: true, v: `// JSON fonctionne partout, meme sans navigateur\nconst partie = { pseudo: "Nova", niveau: 7, inventaire: ["epee", "potion"] };\n\nconst texte = JSON.stringify(partie);\nconsole.log(texte);\n\nconst relu = JSON.parse(texte);\nconsole.log(relu.niveau, relu.inventaire[0]);` },
            { t: 'h', v: 'Le motif complet de sauvegarde' },
            { t: 'code', lang: 'js', v: `function sauvegarder(partie) {\n  localStorage.setItem("partie", JSON.stringify(partie));\n}\n\nfunction charger() {\n  const texte = localStorage.getItem("partie");\n  if (!texte) return { pseudo: "", niveau: 1, inventaire: [] };   // valeur par defaut\n  try {\n    return JSON.parse(texte);\n  } catch (e) {\n    return { pseudo: "", niveau: 1, inventaire: [] };             // donnee corrompue\n  }\n}` },
            { t: 'tip', h: 'Toujours prévoir le vide et le casse', v: "Première visite : rien n'est stocke. Donnée modifiée à la main : <code>JSON.parse</code> plante. Un code pro gere les deux cas — c'est exactement ce que fait la sauvegarde de ta progression sur ARES." },
            { t: 'key', h: 'A retenir', v: "setItem / getItem / removeItem · uniquement du texte · JSON.stringify et JSON.parse · toujours une valeur par défaut et un try/catch." }
          ],
          ex: [
            {
              brief: "Écris <code>encoder(objet)</code> qui renvoie sa version texte, et <code>decoder(texte)</code> qui renvoie l'objet, ou <code>{}</code> si le texte est invalide.",
              starter: 'function encoder(objet) {\n  \n}\n\nfunction decoder(texte) {\n  \n}\n\nconsole.log(encoder({ a: 1 }));\nconsole.log(decoder(\'{"a":1}\').a);\nconsole.log(JSON.stringify(decoder("casse")));\n',
              hint: 'JSON.stringify pour encoder ; JSON.parse dans un try/catch pour decoder.',
              solution: `function encoder(objet) {\n  return JSON.stringify(objet);\n}\n\nfunction decoder(texte) {\n  try {\n    return JSON.parse(texte);\n  } catch (e) {\n    return {};\n  }\n}\n\nconsole.log(encoder({ a: 1 }));\nconsole.log(decoder('{"a":1}').a);\nconsole.log(JSON.stringify(decoder("casse")));`,
              tests: [{ expect: '{"a":1}\n1\n{}' }],
              must: [['JSON\\.stringify', 'Utilise JSON.stringify.'], ['JSON\\.parse', 'Utilise JSON.parse.'], ['try', 'Protege le decodage avec try/catch.']]
            }
          ],
          quiz: [
            { q: 'Que peut stocker localStorage ?', opts: ['N\'importe quel objet', 'Uniquement du texte', 'Uniquement des nombres'], a: 1, why: 'Tout est converti en chaîne : d\'ou JSON.stringify.' },
            { q: 'Que renvoie getItem sur une clé inexistante ?', opts: ['null', 'undefined', 'Une erreur'], a: 0, why: 'null : il faut donc prévoir une valeur par defaut.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 6 ---------------- */
    {
      n: 6, title: 'Canvas', sub: 'Dessiner et animer',
      lessons: [
        {
          id: 'pj-6-1', title: 'Dessiner sur un canvas', kind: 'lecon', xp: 40,
          dom: `<canvas id="toile" width="320" height="180" style="background:#17100E; border-radius:8px"></canvas>`,
          goal: 'Prendre le contrôle des pixels : la base de tous les jeux web.',
          blocks: [
            { t: 'p', v: "Le <code>&lt;canvas&gt;</code> est une zone de dessin. Le HTML fournit le cadre, JavaScript peint dedans avec un « contexte »." },
            { t: 'code', lang: 'js', dom: true, run: true, v: `const toile = document.querySelector("#toile");\nconst ctx = toile.getContext("2d");\n\nctx.fillStyle = "#E2762E";\nctx.fillRect(20, 20, 90, 60);          // x, y, largeur, hauteur\n\nctx.fillStyle = "#4FBFB4";\nctx.beginPath();\nctx.arc(200, 60, 34, 0, Math.PI * 2);  // x, y, rayon, debut, fin\nctx.fill();\n\nctx.strokeStyle = "#F6B23D";\nctx.lineWidth = 3;\nctx.strokeRect(20, 110, 260, 45);\n\nctx.fillStyle = "#F6ECE3";\nctx.font = "16px sans-serif";\nctx.fillText("Forge ARES", 34, 138);\n\nconsole.log("Regarde l'apercu !");` },
            { t: 'h', v: 'Le repère' },
            { t: 'p', v: "Attention : l'origine <code>(0, 0)</code> est en <b>haut à gauche</b>, et l'axe Y descend. Un y de 100 est plus bas qu'un y de 20." },
            { t: 'h', v: "La boucle d'animation" },
            { t: 'code', lang: 'js', v: `let x = 0;\n\nfunction boucle() {\n  ctx.clearRect(0, 0, toile.width, toile.height);   // 1. effacer\n  ctx.fillStyle = "#E2762E";\n  ctx.fillRect(x, 70, 40, 40);                     // 2. dessiner\n  x = x + 2;                                       // 3. mettre a jour\n  if (x < toile.width) requestAnimationFrame(boucle);  // 4. recommencer\n}\n\nboucle();` },
            { t: 'p', v: "<b>Effacer, dessiner, mettre à jour, recommencer</b> : c'est la boucle de tous les jeux video du monde, du Pong de 1972 aux jeux 3D d'aujourd'hui." },
            { t: 'tip', h: 'requestAnimationFrame', v: "Il synchronise le dessin avec l'ecran (60 images par seconde) et se met en pause quand l'onglet est cache : bien meilleur qu'un setInterval." },
            { t: 'key', h: 'A retenir', v: "getContext(\"2d\") donne le pinceau · fillRect / arc / fillText dessinent · (0,0) en haut à gauche · effacer-dessiner-mettre à jour-recommencer." }
          ],
          ex: [
            {
              dom: true,
              brief: "Sur le canvas <code>#toile</code> : dessine un rectangle rouge <code>#E2544B</code> en (10, 10) de 80x40, et un cercle vert <code>#7CC98A</code> de rayon 30 centre en (200, 90).",
              starter: 'const ctx = document.querySelector("#toile").getContext("2d");\n\n',
              hint: 'fillStyle puis fillRect ; puis fillStyle, beginPath, arc(200, 90, 30, 0, Math.PI * 2) et fill.',
              solution: `const ctx = document.querySelector("#toile").getContext("2d");\n\nctx.fillStyle = "#E2544B";\nctx.fillRect(10, 10, 80, 40);\n\nctx.fillStyle = "#7CC98A";\nctx.beginPath();\nctx.arc(200, 90, 30, 0, Math.PI * 2);\nctx.fill();`,
              must: [['getContext\\s*\\(\\s*["\\\']2d', 'Recupere le contexte 2d.'],
                     ['fillRect\\s*\\(\\s*10\\s*,\\s*10\\s*,\\s*80\\s*,\\s*40', 'fillRect(10, 10, 80, 40) attendu.'],
                     ['#E2544B', 'Le rectangle doit être en #E2544B.'],
                     ['arc\\s*\\(\\s*200\\s*,\\s*90\\s*,\\s*30', 'arc(200, 90, 30, ...) attendu.'],
                     ['#7CC98A', 'Le cercle doit être en #7CC98A.']]
            }
          ],
          quiz: [
            { q: 'Où se trouve le point (0, 0) d\'un canvas ?', opts: ['En bas a gauche', 'En haut a gauche', 'Au centre'], a: 1, why: 'Et l\'axe Y augmente vers le bas.' },
            { q: 'Quelle est la première étape de la boucle d\'animation ?', opts: ['Dessiner', 'Effacer l\'image précédente', 'Attendre'], a: 1, why: 'Sans clearRect, les positions successives laissent une trainee.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 7 : PROJET ---------------- */
    {
      n: 7, title: 'PROJET · Le quiz interactif', sub: 'Une application complète avec état',
      lessons: [
        {
          id: 'pj-7-1', title: 'Quiz — construction guidee', kind: 'projet', xp: 100,
          dom: `<div id="quiz">\n  <h3 id="question">Question</h3>\n  <div id="choix"></div>\n  <p id="score">Score : 0</p>\n</div>`,
          goal: 'Structurer une application autour d\'un état central : le motif de tous les frameworks modernes.',
          blocks: [
            { t: 'p', v: "Une application, c'est trois choses : un <b>état</b> (les données), un <b>rendu</b> (l'affichage de l'état) et des <b>actions</b> (qui modifient l'état et redessinent). React, Vue et Angular ne font rien d'autre." },
            { t: 'h', v: 'Étape 1 — les données' },
            { t: 'code', lang: 'js', run: true, v: 'const questions = [\n  { texte: "Quel mot-clé déclare une constante ?", options: ["let", "const", "var"], bonne: 1 },\n  { texte: "Que renvoie typeof 42 ?", options: ["number", "int", "string"], bonne: 0 }\n];\n\nconsole.log(questions.length + " questions");\nconsole.log(questions[0].options[questions[0].bonne]);' },
            { t: 'h', v: "Étape 2 — l'état" },
            { t: 'code', lang: 'js', run: true, v: `const etat = { index: 0, score: 0, termine: false };\n\nfunction repondre(choix, questions) {\n  if (choix === questions[etat.index].bonne) etat.score++;\n  etat.index++;\n  if (etat.index >= questions.length) etat.termine = true;\n  return etat;\n}\n\nconst qs = [{ bonne: 1 }, { bonne: 0 }];\nconsole.log(JSON.stringify(repondre(1, qs)));\nconsole.log(JSON.stringify(repondre(2, qs)));` },
            { t: 'tip', h: 'La règle d\'or', v: "<b>Une seule source de vérité.</b> Le score n'existe qu'a un endroit : dans l'etat. L'affichage n'est qu'un reflet. Le jour ou tu stockes la même information a deux endroits, elles finiront par diverger." },
            { t: 'h', v: 'Étape 3 — le rendu' },
            { t: 'code', lang: 'js', v: `function afficher() {\n  const q = questions[etat.index];\n  document.querySelector("#question").textContent = q.texte;\n\n  const zone = document.querySelector("#choix");\n  zone.innerHTML = "";                       // on repart de zero\n  q.options.forEach((option, i) => {\n    const b = document.createElement("button");\n    b.textContent = option;\n    b.addEventListener("click", () => repondre(i));\n    zone.appendChild(b);\n  });\n\n  document.querySelector("#score").textContent = "Score : " + etat.score;\n}` }
          ],
          ex: [
            {
              brief: "Écris la logique pure du quiz : <code>repondre(etat, questions, choix)</code> qui incrémente le score si la réponse est bonne, avance l'index, et renvoie l'etat. Puis <code>resume(etat, questions)</code> qui renvoie <code>Score : 2/3</code>.",
              starter: 'const questions = [\n  { bonne: 1 }, { bonne: 0 }, { bonne: 2 }\n];\n\nfunction repondre(etat, questions, choix) {\n  \n}\n\nfunction resume(etat, questions) {\n  \n}\n\nlet etat = { index: 0, score: 0 };\netat = repondre(etat, questions, 1);\netat = repondre(etat, questions, 0);\netat = repondre(etat, questions, 0);\nconsole.log(etat.index, etat.score);\nconsole.log(resume(etat, questions));\n',
              hint: 'Compare choix a questions[etat.index].bonne, puis etat.index++. Le resume utilise un template literal.',
              solution: 'const questions = [\n  { bonne: 1 }, { bonne: 0 }, { bonne: 2 }\n];\n\nfunction repondre(etat, questions, choix) {\n  if (choix === questions[etat.index].bonne) etat.score++;\n  etat.index++;\n  return etat;\n}\n\nfunction resume(etat, questions) {\n  return `Score : ${etat.score}/${questions.length}`;\n}\n\nlet etat = { index: 0, score: 0 };\netat = repondre(etat, questions, 1);\netat = repondre(etat, questions, 0);\netat = repondre(etat, questions, 0);\nconsole.log(etat.index, etat.score);\nconsole.log(resume(etat, questions));',
              tests: [{ expect: '3 2\nScore : 2/3' }]
            },
            {
              dom: true,
              brief: "Le quiz complet a l'écran : affiche la question dans <code>#question</code>, crée un bouton par option dans <code>#choix</code>, et au clic mets à jour <code>#score</code> (format <code>Score : N</code>) puis passe à la question suivante. À la fin, affiche <code>Termine !</code> dans <code>#question</code>.",
              starter: 'const questions = [\n  { texte: "Combien font 2 + 2 ?", options: ["3", "4"], bonne: 1 },\n  { texte: "Quelle couleur a le ciel ?", options: ["Bleu", "Vert"], bonne: 0 }\n];\n\nconst etat = { index: 0, score: 0 };\n\nfunction afficher() {\n  \n}\n\nafficher();\n',
              hint: "Dans afficher() : si etat.index >= questions.length, écrire Termine ! et vider #choix ; sinon remplir la question, vider #choix, créer un bouton par option avec un écouteur qui incrémente le score, avance l'index et rappelle afficher().",
              solution: `const questions = [\n  { texte: "Combien font 2 + 2 ?", options: ["3", "4"], bonne: 1 },\n  { texte: "Quelle couleur a le ciel ?", options: ["Bleu", "Vert"], bonne: 0 }\n];\n\nconst etat = { index: 0, score: 0 };\n\nfunction afficher() {\n  const zone = document.querySelector("#choix");\n  document.querySelector("#score").textContent = "Score : " + etat.score;\n  zone.innerHTML = "";\n  if (etat.index >= questions.length) {\n    document.querySelector("#question").textContent = "Termine !";\n    return;\n  }\n  const q = questions[etat.index];\n  document.querySelector("#question").textContent = q.texte;\n  q.options.forEach((option, i) => {\n    const b = document.createElement("button");\n    b.textContent = option;\n    b.addEventListener("click", () => {\n      if (i === q.bonne) etat.score++;\n      etat.index++;\n      afficher();\n    });\n    zone.appendChild(b);\n  });\n}\n\nafficher();`,
              expectDom: [['#question', 'text', 'Combien font 2 + 2 ?'], ['#choix button', 'count', '2'],
                          ['#choix button:nth-child(2)', 'click', ''], ['#score', 'text', 'Score : 1'],
                          ['#question', 'text', 'Quelle couleur à le ciel ?'],
                          ['#choix button:nth-child(1)', 'click', ''], ['#score', 'text', 'Score : 2'],
                          ['#question', 'text', 'Termine !']],
              must: [['createElement', 'Cree les boutons avec createElement.'], ['addEventListener', 'Chaque bouton doit ecouter le clic.']],
              success: "Application complète : état central, rendu derive de l'état, actions qui redessinent. C'est exactement l'architecture de React."
            }
          ]
        }
      ]
    },

    /* ---------------- MODULE 8 : PROJET ---------------- */
    {
      n: 8, title: 'PROJET · Le casse-brique', sub: 'Le grand final : un jeu complet sur canvas',
      lessons: [
        {
          id: 'pj-8-1', title: 'Casse-brique — construction guidee', kind: 'projet', xp: 120,
          dom: `<canvas id="jeu" width="360" height="240" style="background:#0F0908; border-radius:8px"></canvas>\n<p id="etat">Prêt</p>`,
          goal: 'Assembler boucle de jeu, physique simple, collisions et état : ton premier vrai jeu.',
          blocks: [
            { t: 'p', v: "Dernier projet de l'Arsenal. Un casse-brique contient tout ce qu'il faut savoir : boucle d'animation, déplacement, rebonds, collisions, score et fin de partie." },
            { t: 'h', v: 'Étape 1 — la balle qui bouge' },
            { t: 'code', lang: 'js', v: `const balle = { x: 180, y: 200, dx: 2.4, dy: -2.4, r: 7 };\n\nfunction deplacer() {\n  balle.x += balle.dx;\n  balle.y += balle.dy;\n}` },
            { t: 'p', v: "<code>dx</code> et <code>dy</code> sont la <b>vitesse</b> sur chaque axe. Additionner la vitesse a la position a chaque image, c'est toute la physique d'un jeu d'arcade." },
            { t: 'h', v: 'Étape 2 — les rebonds' },
            { t: 'code', lang: 'js', run: true, v: `const toile = { width: 360, height: 240 };\nconst balle = { x: 355, y: 100, dx: 3, dy: -2, r: 7 };\n\nfunction rebondir(balle, toile) {\n  if (balle.x + balle.r > toile.width || balle.x - balle.r < 0) balle.dx = -balle.dx;\n  if (balle.y - balle.r < 0) balle.dy = -balle.dy;\n  return balle;\n}\n\nconsole.log(rebondir(balle, toile).dx);   // -3 : la balle repart a gauche` },
            { t: 'tip', h: 'Un rebond, c\'est un signe', v: "Inverser le signe de la vitesse sur un axe suffit à simuler un rebond parfait. Ce réflexe sert dans tous les jeux 2D." },
            { t: 'h', v: 'Étape 3 — les collisions avec les briques' },
            { t: 'code', lang: 'js', run: true, v: `function touche(balle, brique) {\n  return balle.x > brique.x &&\n         balle.x < brique.x + brique.l &&\n         balle.y > brique.y &&\n         balle.y < brique.y + brique.h;\n}\n\nconsole.log(touche({ x: 50, y: 30 }, { x: 40, y: 20, l: 40, h: 20 }));\nconsole.log(touche({ x: 200, y: 30 }, { x: 40, y: 20, l: 40, h: 20 }));` },
            { t: 'h', v: 'Étape 4 — la boucle complète' },
            { t: 'code', lang: 'js', v: `function boucle() {\n  ctx.clearRect(0, 0, toile.width, toile.height);\n  dessinerBriques();\n  dessinerBalle();\n  dessinerRaquette();\n  deplacer();\n  gererCollisions();\n  if (!fini) requestAnimationFrame(boucle);\n}\nboucle();` },
            { t: 'warn', h: 'La methode qui évite la crise de nerfs', v: "Ne code jamais un jeu d'un seul coup. Fais d'abord bouger un carre. Puis fais-le rebondir. Puis ajoute la raquette. Puis les briques. Puis le score. À chaque étape, ça marche." }
          ],
          ex: [
            {
              brief: "Écris <code>rebondir(balle, toile)</code> qui inverse <code>dx</code> si la balle sort à gauche ou à droite, et <code>dy</code> si elle sort en haut, puis renvoie la balle. Rayon inclus dans le calcul.",
              starter: 'function rebondir(balle, toile) {\n  \n}\n\nconst t = { width: 300, height: 200 };\nconsole.log(rebondir({ x: 297, y: 100, dx: 4, dy: -3, r: 6 }, t).dx);\nconsole.log(rebondir({ x: 2, y: 100, dx: -4, dy: -3, r: 6 }, t).dx);\nconsole.log(rebondir({ x: 150, y: 3, dx: 4, dy: -3, r: 6 }, t).dy);\nconsole.log(rebondir({ x: 150, y: 100, dx: 4, dy: -3, r: 6 }, t).dx);\n',
              hint: 'Deux if : un pour les bords verticaux (x), un pour le haut (y). N\'oublie pas de renvoyer balle.',
              solution: `function rebondir(balle, toile) {\n  if (balle.x + balle.r > toile.width || balle.x - balle.r < 0) balle.dx = -balle.dx;\n  if (balle.y - balle.r < 0) balle.dy = -balle.dy;\n  return balle;\n}\n\nconst t = { width: 300, height: 200 };\nconsole.log(rebondir({ x: 297, y: 100, dx: 4, dy: -3, r: 6 }, t).dx);\nconsole.log(rebondir({ x: 2, y: 100, dx: -4, dy: -3, r: 6 }, t).dx);\nconsole.log(rebondir({ x: 150, y: 3, dx: 4, dy: -3, r: 6 }, t).dy);\nconsole.log(rebondir({ x: 150, y: 100, dx: 4, dy: -3, r: 6 }, t).dx);`,
              tests: [{ expect: '-4\n4\n3\n4' }]
            },
            {
              brief: "Écris <code>casser(balle, briques)</code> : supprime la première brique touchee (propriete <code>vivante</code> passee a <code>false</code>), renvoie <code>true</code> si une brique a été cassee. Une brique a x, y, l (largeur), h (hauteur).",
              starter: 'function casser(balle, briques) {\n  \n}\n\nconst briques = [\n  { x: 0, y: 0, l: 50, h: 20, vivante: true },\n  { x: 60, y: 0, l: 50, h: 20, vivante: true }\n];\nconsole.log(casser({ x: 70, y: 10 }, briques));\nconsole.log(briques[1].vivante, briques[0].vivante);\nconsole.log(casser({ x: 200, y: 10 }, briques));\n',
              hint: 'Boucle sur les briques vivantes, teste la collision (x entre b.x et b.x + b.l, idem en y), passe vivante a false et return true.',
              solution: `function casser(balle, briques) {\n  for (const b of briques) {\n    if (!b.vivante) continue;\n    if (balle.x > b.x && balle.x < b.x + b.l && balle.y > b.y && balle.y < b.y + b.h) {\n      b.vivante = false;\n      return true;\n    }\n  }\n  return false;\n}\n\nconst briques = [\n  { x: 0, y: 0, l: 50, h: 20, vivante: true },\n  { x: 60, y: 0, l: 50, h: 20, vivante: true }\n];\nconsole.log(casser({ x: 70, y: 10 }, briques));\nconsole.log(briques[1].vivante, briques[0].vivante);\nconsole.log(casser({ x: 200, y: 10 }, briques));`,
              tests: [{ expect: 'true\nfalse true\nfalse' }]
            },
            {
              dom: true,
              brief: "Le jeu a l'écran : dessine une balle qui rebondit sur les bords du canvas <code>#jeu</code>, animee par <code>requestAnimationFrame</code>. (Effacer, dessiner, déplacer, rebondir, recommencer.)",
              starter: 'const toile = document.querySelector("#jeu");\nconst ctx = toile.getContext("2d");\nconst balle = { x: 60, y: 60, dx: 3, dy: 2.2, r: 8 };\n\nfunction boucle() {\n  \n}\n\nboucle();\n',
              hint: 'clearRect, puis beginPath + arc + fill, puis balle.x += balle.dx (idem y), puis les tests de rebond sur les 4 bords, puis requestAnimationFrame(boucle).',
              solution: `const toile = document.querySelector("#jeu");\nconst ctx = toile.getContext("2d");\nconst balle = { x: 60, y: 60, dx: 3, dy: 2.2, r: 8 };\n\nfunction boucle() {\n  ctx.clearRect(0, 0, toile.width, toile.height);\n\n  ctx.fillStyle = "#F6B23D";\n  ctx.beginPath();\n  ctx.arc(balle.x, balle.y, balle.r, 0, Math.PI * 2);\n  ctx.fill();\n\n  balle.x += balle.dx;\n  balle.y += balle.dy;\n\n  if (balle.x + balle.r > toile.width || balle.x - balle.r < 0) balle.dx = -balle.dx;\n  if (balle.y + balle.r > toile.height || balle.y - balle.r < 0) balle.dy = -balle.dy;\n\n  requestAnimationFrame(boucle);\n}\n\nboucle();`,
              must: [['clearRect', 'Efface l\'image precedente avec clearRect.'],
                     ['arc\\s*\\(', 'Dessine la balle avec arc().'],
                     ['balle\\.x\\s*\\+=|balle\\.x\\s*=\\s*balle\\.x\\s*\\+', 'Déplace la balle en ajoutant dx a x.'],
                     ['-\\s*balle\\.dx', 'Inverse dx lors d\'un rebond horizontal.'],
                     ['-\\s*balle\\.dy', 'Inverse dy lors d\'un rebond vertical.'],
                     ['requestAnimationFrame', 'Relance la boucle avec requestAnimationFrame.']],
              success: "ARSENAL DE L'ETINCELLE TERMINE. Closures, classes, DOM avance, asynchrone, persistance, canvas et deux applications completes. Tu peux construire de vrais produits."
            }
          ]
        }
      ]
    }
  ]
};
