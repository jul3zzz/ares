/* ARES — Parcours libre PYTHON : « Les 3 Jours du Serpent » */
var PATH_PYTHON = {
  id: 'python', lang: 'python', name: 'PYTHON', glyph: '>>> python3',
  tag: 'Parcours 1 · 3 jours', color: '#4FBFB4',
  title: 'Les 3 Jours du Serpent',
  blurb: "Le langage le plus simple a lire du monde, et pourtant celui de YouTube, d'Instagram et de la NASA. En 3 jours tu écris tes premiers vrais programmes.",
  chips: ['Zéro installation', 'Vrai Python dans le navigateur', 'Debutant total'],
  promise: "À la fin du jour 3, tu sauras écrire un programme qui parle, qui choisit, qui répète et qui range des donnees. C'est exactement ce que fait un développeur toute la journee.",
  days: [
    /* ======================= JOUR 1 ======================= */
    {
      n: 1, title: 'Parler à la machine', sub: 'Afficher, stocker, calculer, dialoguer',
      lessons: [

        {
          id: 'py-1-1', title: 'Ton premier ordre', kind: 'lecon', xp: 20,
          goal: "Faire dire quelque chose a l'ordinateur, comprendre la console et lire une erreur sans paniquer.",
          blocks: [
            { t: 'p', v: "Un programme, c'est une <b>liste d'ordres</b> que la machine exécute dans l'ordre, du haut vers le bas. Elle ne devine rien, elle n'improvise jamais. Elle fait <em>exactement</em> ce que tu écris." },
            { t: 'analogy', v: "<b>L'image à retenir :</b> un programme est une recette de cuisine pour quelqu'un de très rapide... et de très bête. Si tu écris « casse les oeufs » sans dire « dans le saladier », il les casse par terre. Ta précision fait toute la qualité du programme." },
            { t: 'h', v: "L'ordre numéro 1 : print()" },
            { t: 'p', v: "<code>print</code> veut dire « affiche ». On met entre parenthèses ce qu'on veut voir apparaitre. Du texte se met toujours entre guillemets." },
            { t: 'code', run: true, v: `print("Bonjour, je suis vivant !")\nprint("Et je fais ce qu'on me dit.")` },
            { t: 'p', v: "Clique sur <b>Exécuter</b> au-dessus : les deux lignes s'affichent l'une après l'autre. Chaque <code>print</code> passe à la ligne suivante." },
            { t: 'h', v: 'Guillemets : la règle en or' },
            { t: 'p', v: "Tout ce qui est entre guillemets est du <b>texte brut</b> : Python ne cherche pas à le comprendre, il le recopie. Sans guillemets, Python croit que c'est un nom de variable et se fache." },
            { t: 'code', v: `print("bonjour")   # affiche : bonjour\nprint(bonjour)     # ERREUR : bonjour n'existe pas` },
            { t: 'tip', h: 'Astuce', v: "Tu peux utiliser des guillemets doubles \"...\" ou simples '...'. L'important : commencer et finir avec le meme." },
            { t: 'h', v: 'Les commentaires' },
            { t: 'p', v: "Tout ce qui suit un <code>#</code> est ignore par Python. C'est pour expliquer ton code a un humain (souvent : toi, dans deux semaines)." },
            { t: 'code', run: true, v: `# Ceci est un commentaire, Python l'ignore\nprint("Le code, lui, s'execute")  # meme apres du code` },
            { t: 'warn', h: 'Les erreurs sont normales', v: "Un développeur professionnel provoque des dizaines d'erreurs par jour. Une erreur n'est pas une punition, c'est la machine qui t'explique ce qu'elle n'a pas compris. Ici, chaque erreur est traduite en français avec le numéro de ligne." },
            { t: 'code', run: true, err: true, v: `print("il manque un guillemet)` },
            { t: 'key', h: 'A retenir', v: "print() affiche · les guillemets encadrent le texte · # commente · les erreurs indiquent la ligne fautive." }
          ],
          ex: [
            {
              brief: "Affiche exactement <code>Salut la forge !</code> puis, sur une deuxieme ligne, <code>Je code en Python.</code>",
              starter: 'print("...")\n',
              hint: "Deux lignes = deux print(). Recopie le texte a l'identique, majuscules et ponctuation comprises.",
              solution: `print("Salut la forge !")\nprint("Je code en Python.")`,
              tests: [{ expect: 'Salut la forge !\nJe code en Python.' }]
            },
            {
              brief: "Affiche ton propre message d'accueil sur 3 lignes : ton prénom, ton age, et une phrase de motivation. Le contenu est libre, mais il faut exactement <b>3 lignes</b> affichées.",
              starter: 'print("Je m\'appelle ...")\n',
              hint: "Trois print(), chacun avec du texte entre guillemets.",
              solution: `print("Je m'appelle Lea")\nprint("J'ai 14 ans")\nprint("Je vais devenir developpeuse")`,
              tests: [{}],
              must: [['(print\\s*\\([^)]*\\)[\\s\\S]*){3}', 'Il faut au moins trois instructions print().']],
              success: "Trois ordres, trois lignes affichées. Tu viens d'écrire ton premier programme personnel."
            }
          ],
          quiz: [
            { q: "Que fait exactement print(\"2 + 3\") ?", opts: ['Affiche 5', 'Affiche 2 + 3', 'Provoque une erreur'], a: 1, why: "Entre guillemets, c'est du texte : Python le recopie sans calculer. Sans guillemets, print(2 + 3) afficherait 5." },
            { q: 'À quoi sert le symbole # ?', opts: ['À afficher du texte', 'À écrire un commentaire ignore par Python', 'À terminer le programme'], a: 1, why: 'Tout ce qui suit # sur la ligne est ignore : c\'est une note pour les humains.' }
          ]
        },

        {
          id: 'py-1-2', title: 'Les variables, tes boîtes de rangement', kind: 'lecon', xp: 25,
          goal: 'Stocker une information dans une variable, la réutiliser, la modifier, et connaître les 4 grands types.',
          blocks: [
            { t: 'p', v: "Une <b>variable</b>, c'est une boîte avec une étiquette. Tu ranges une valeur dedans, et ensuite tu appelles la boîte par son nom au lieu de répéter la valeur." },
            { t: 'code', run: true, v: `pseudo = "Ares"\nvie = 100\n\nprint(pseudo)\nprint(vie)` },
            { t: 'p', v: "Le signe <code>=</code> n'est pas l'égalité des maths : il veut dire <em>« range cette valeur dans cette boîte »</em>. On lit toujours de droite à gauche." },
            { t: 'analogy', v: "<b>L'image à retenir :</b> <code>vie = 100</code> se lit « la boîte <i>vie</i> reçoit 100 ». D'ailleurs <code>vie = vie - 10</code> est absurde en maths, mais parfaitement logique ici : « la boîte vie reçoit son ancien contenu moins 10 »." },
            { t: 'code', run: true, v: `vie = 100\nvie = vie - 30   # le monstre attaque\nprint(vie)       # 70` },
            { t: 'h', v: 'Les 4 types que tu utiliseras 90% du temps' },
            {
              t: 'table', head: ['Type', 'Ce que c\'est', 'Exemple'],
              rows: [
                ['<code>str</code>', 'du texte (string)', '"Bonjour", "42"'],
                ['<code>int</code>', 'un nombre entier', '7, -3, 0'],
                ['<code>float</code>', 'un nombre à virgule', '3.14, 20.0'],
                ['<code>bool</code>', 'vrai ou faux', 'True, False']
              ]
            },
            { t: 'p', v: "La fonction <code>type()</code> te dit dans quelle catégorie se trouve une valeur." },
            { t: 'code', run: true, v: `print(type("Ares"))\nprint(type(15))\nprint(type(9.81))\nprint(type(True))` },
            { t: 'warn', h: 'Piège classique', v: "<code>\"42\"</code> avec des guillemets n'est PAS le nombre 42 : c'est du texte. <code>\"2\" + \"2\"</code> donne <code>22</code>, pas 4 ! On y revient dans la leçon sur input()." },
            { t: 'h', v: 'Bien nommer ses boîtes' },
            { t: 'ul', v: [
              "Uniquement lettres, chiffres et <code>_</code> ; jamais d'espace ni d'accent.",
              "Jamais de chiffre en premier : <code>2joueurs</code> est interdit, <code>joueurs2</code> est valide.",
              "Un nom qui <b>decrit</b> : <code>nombre_de_vies</code> vaut mieux que <code>x</code>. Ton futur toi te remerciera."
            ] },
            { t: 'key', h: 'A retenir', v: "nom = valeur range une valeur · le nom sert de raccourci · type() donne le type · str / int / float / bool." }
          ],
          ex: [
            {
              brief: "Crée une variable <code>prenom</code> contenant <code>Nina</code>, une variable <code>age</code> contenant <code>13</code>, puis affiche les deux (un print par variable).",
              starter: 'prenom = \nage = \n',
              hint: 'Le texte prend des guillemets, le nombre non.',
              solution: `prenom = "Nina"\nage = 13\nprint(prenom)\nprint(age)`,
              tests: [{ expect: 'Nina\n13' }],
              must: [['prenom\\s*=', 'Ta variable doit s\'appeler exactement prenom.'], ['age\\s*=', 'Ta variable doit s\'appeler exactement age.']]
            },
            {
              brief: "Un joueur a <code>50</code> points de vie. Il perd <code>15</code> points, puis gagne <code>8</code> points grace a une potion. Affiche uniquement la vie finale.",
              starter: 'vie = 50\n',
              hint: 'Modifie la variable vie deux fois, puis affiche-la une seule fois à la fin.',
              solution: `vie = 50\nvie = vie - 15\nvie = vie + 8\nprint(vie)`,
              tests: [{ expect: '43' }],
              success: 'Une variable qui evolue au fil du programme : c\'est le coeur de tous les jeux video.'
            }
          ],
          quiz: [
            { q: 'Que vaut x après : x = 4 puis x = x + 3 ?', opts: ['4', '7', 'Erreur, on ne peut pas écrire ça'], a: 1, why: "Python calcule d'abord la droite (4 + 3 = 7) puis range 7 dans x." },
            { q: 'Quel nom de variable est INTERDIT ?', opts: ['score_final', '2joueurs', 'vieMax'], a: 1, why: "Un nom de variable ne peut jamais commencer par un chiffre." },
            { q: 'Quel est le type de 20.0 ?', opts: ['int', 'float', 'str'], a: 1, why: "Dès qu'il y a un point decimal, c'est un float, même si la partie décimale vaut zéro." }
          ]
        },

        {
          id: 'py-1-3', title: 'Calculer comme une machine', kind: 'lecon', xp: 25,
          goal: 'Maîtriser les 7 opérateurs, les priorités, et les raccourcis += pour faire evoluer une valeur.',
          blocks: [
            { t: 'p', v: "Python est une calculatrice surpuissante. Tu connais déjà +, -, mais trois opérateurs vont te surprendre." },
            {
              t: 'table', head: ['Opérateur', 'Rôle', 'Exemple', 'Résultat'],
              rows: [
                ['<code>+</code>', 'addition', '7 + 2', '9'],
                ['<code>-</code>', 'soustraction', '7 - 2', '5'],
                ['<code>*</code>', 'multiplication', '7 * 2', '14'],
                ['<code>/</code>', 'division (toujours à virgule)', '7 / 2', '3.5'],
                ['<code>//</code>', 'division entiere (le quotient)', '7 // 2', '3'],
                ['<code>%</code>', 'modulo (le reste)', '7 % 2', '1'],
                ['<code>**</code>', 'puissance', '7 ** 2', '49']
              ]
            },
            { t: 'code', run: true, v: `print(7 / 2)    # 3.5\nprint(7 // 2)   # 3  -> le quotient\nprint(7 % 2)    # 1  -> le reste\nprint(2 ** 10)  # 1024` },
            { t: 'tip', h: 'Le modulo, ton meilleur ami', v: "<code>n % 2 == 0</code> teste si un nombre est pair (reste nul). <code>n % 5 == 0</code> teste s'il est dans la table de 5. Tu l'utiliseras dans presque tous les exercices de jeu." },
            { t: 'h', v: 'Les priorités' },
            { t: 'p', v: "Comme en maths : puissance, puis multiplication/division, puis addition/soustraction. Les parenthèses passent avant tout." },
            { t: 'code', run: true, v: `print(2 + 3 * 4)     # 14, pas 20\nprint((2 + 3) * 4)   # 20\nprint(10 - 2 - 3)    # 5, on lit de gauche a droite` },
            { t: 'h', v: 'Les raccourcis' },
            { t: 'p', v: "<code>score = score + 10</code> s'écrit plus court : <code>score += 10</code>. Même chose avec <code>-=</code>, <code>*=</code>, <code>/=</code>." },
            { t: 'code', run: true, v: `score = 0\nscore += 10   # +10\nscore += 5    # +5\nscore *= 2    # double\nprint(score)  # 30` },
            { t: 'key', h: 'A retenir', v: "/ donne un float · // donne l'entier · % donne le reste · ** est la puissance · += est un raccourci." }
          ],
          ex: [
            {
              brief: "Un cinema vend <code>3</code> places a <code>9.5</code> euros. Affiche le prix total (attendu : <code>28.5</code>).",
              starter: 'places = 3\nprix = 9.5\n',
              hint: 'Multiplie les deux variables dans un print().',
              solution: `places = 3\nprix = 9.5\nprint(places * prix)`,
              tests: [{ expect: '28.5' }]
            },
            {
              brief: "On a <code>17</code> bonbons à partager entre <code>5</code> enfants. Affiche sur deux lignes : d'abord le nombre de bonbons par enfant (division entière), puis le nombre de bonbons restants.",
              starter: 'bonbons = 17\nenfants = 5\n',
              hint: 'Un // pour le partage, un % pour le reste.',
              solution: `bonbons = 17\nenfants = 5\nprint(bonbons // enfants)\nprint(bonbons % enfants)`,
              tests: [{ expect: '3\n2' }],
              success: 'Division entière et modulo : le duo qui résout la moitie des exercices d\'algorithmique.'
            },
            {
              brief: "Calcule et affiche l'aire d'un cercle de rayon <code>4</code> avec pi = <code>3.14159</code>. Formule : pi x rayon x rayon. Arrondis à 2 décimales avec <code>round(valeur, 2)</code>.",
              starter: 'pi = 3.14159\nrayon = 4\n',
              hint: 'round(pi * rayon ** 2, 2)',
              solution: `pi = 3.14159\nrayon = 4\nprint(round(pi * rayon ** 2, 2))`,
              tests: [{ expect: '50.27' }]
            }
          ],
          quiz: [
            { q: 'Que vaut 13 % 4 ?', opts: ['3', '1', '3.25'], a: 1, why: '13 = 4 x 3 + 1. Le modulo renvoie le reste, donc 1.' },
            { q: 'Que vaut 10 / 5 en Python 3 ?', opts: ['2', '2.0', '5'], a: 1, why: "L'opérateur / renvoie TOUJOURS un float, même quand ça tombe juste." },
            { q: 'Quel calcul donne 20 ?', opts: ['2 + 3 * 4', '(2 + 3) * 4', '2 * 3 + 4'], a: 1, why: 'Les parenthèses forcent l\'addition en premier : 5 x 4 = 20.' }
          ]
        },

        {
          id: 'py-1-4', title: 'Le texte et les f-strings', kind: 'lecon', xp: 25,
          goal: 'Assembler du texte et des variables proprement, et découvrir les methodes de chaînes.',
          blocks: [
            { t: 'p', v: "Afficher « Bonjour Nina, tu as 13 ans » quand le prénom et l'age sont dans des variables : c'est le geste le plus fréquent du debutant. Il existe une methode moderne et une methode penible." },
            { t: 'h', v: 'La methode penible (à connaître)' },
            { t: 'code', v: `prenom = "Nina"\nage = 13\nprint("Bonjour " + prenom + ", tu as " + str(age) + " ans")` },
            { t: 'p', v: "Il faut coller les morceaux avec <code>+</code>, gerer les espaces à la main, et convertir les nombres avec <code>str()</code> sinon Python refuse d'additionner du texte et un nombre." },
            { t: 'h', v: 'La methode moderne : la f-string' },
            { t: 'p', v: "On met un <code>f</code> juste avant le guillemet ouvrant, et on glisse les variables entre <code>{ }</code> directement dans la phrase." },
            { t: 'code', run: true, v: `prenom = "Nina"\nage = 13\nprint(f"Bonjour {prenom}, tu as {age} ans")\nprint(f"L'an prochain tu auras {age + 1} ans")` },
            { t: 'tip', h: 'Dans les accolades, tout est permis', v: "Tu peux mettre un calcul, un appel de fonction, ce que tu veux : <code>f\"Total : {prix * quantite}\"</code>." },
            { t: 'h', v: 'Contrôler les décimales' },
            { t: 'p', v: "<code>{valeur:.2f}</code> affiche exactement 2 chiffres après la virgule. Indispensable pour les prix." },
            { t: 'code', run: true, v: `prix = 12.5\nprint(f"Total : {prix:.2f} euros")\nmoyenne = 14.6666666\nprint(f"Moyenne : {moyenne:.1f}/20")` },
            { t: 'h', v: 'Quelques pouvoirs du texte' },
            { t: 'code', run: true, v: `mot = "python"\nprint(len(mot))          # 6 caracteres\nprint(mot.upper())       # PYTHON\nprint(mot.capitalize())  # Python\nprint(mot[0])            # p  (on compte a partir de 0 !)\nprint(mot[-1])           # n  (le dernier)` },
            { t: 'warn', h: 'On compte à partir de zéro', v: "En informatique, le premier caractère porte le numéro 0. C'est déroutant deux jours, puis naturel pour toujours." },
            { t: 'key', h: 'A retenir', v: "f\"...{variable}...\" est la facon moderne d'assembler · {x:.2f} arrondit l'affichage · len() compte · .upper() / .lower() transforment." }
          ],
          ex: [
            {
              brief: "Avec les variables données, affiche exactement : <code>Zoe a 15 ans et adore le skate.</code> — en utilisant une f-string.",
              starter: 'prenom = "Zoe"\nage = 15\npassion = "le skate"\n',
              hint: 'print(f"{prénom} a {age} ans et adore {passion}.")',
              solution: `prenom = "Zoe"\nage = 15\npassion = "le skate"\nprint(f"{prenom} a {age} ans et adore {passion}.")`,
              tests: [{ expect: 'Zoe a 15 ans et adore le skate.' }],
              must: [['f"', 'Utilise bien une f-string (un f colle avant le guillemet).']]
            },
            {
              brief: "Un article coute <code>4.5</code> euros et on en achete <code>3</code>. Affiche : <code>3 articles = 13.50 euros</code> (deux décimales obligatoires).",
              starter: 'prix = 4.5\nquantite = 3\n',
              hint: 'Le format {total:.2f} force les deux decimales.',
              solution: `prix = 4.5\nquantite = 3\ntotal = prix * quantite\nprint(f"{quantite} articles = {total:.2f} euros")`,
              tests: [{ expect: '3 articles = 13.50 euros' }]
            }
          ],
          quiz: [
            { q: 'Que produit print("2" + "2") ?', opts: ['4', '22', 'Une erreur'], a: 1, why: 'Le + entre deux textes les colle : "2" + "2" donne "22".' },
            { q: 'Quelle ligne est correcte ?', opts: ['print(f"age : {age}")', 'print("age : {age}")', 'print(f"age : age")'], a: 0, why: 'Sans le f, les accolades ne sont pas interpretees ; sans accolades, la variable n\'est pas remplacee.' },
            { q: 'Que vaut mot[0] si mot = "code" ?', opts: ['c', 'o', 'code'], a: 0, why: "L'index 0 designe le premier caractère." }
          ]
        },

        {
          id: 'py-1-5', title: 'Dialoguer avec input()', kind: 'lecon', xp: 30,
          goal: "Poser une question a l'utilisateur, récupérer sa réponse, et la convertir au bon type.",
          blocks: [
            { t: 'p', v: "Jusqu'ici ton programme parlait tout seul. Avec <code>input()</code>, il ecoute." },
            { t: 'code', run: true, v: `prenom = input("Comment tu t'appelles ? ")\nprint(f"Enchante {prenom} !")` },
            { t: 'tip', h: 'Ici, dans la forge', v: "Sur ARES, les réponses de l'utilisateur sont pré-remplies pour toi (tu les vois s'écrire toutes seules). Sur un vrai ordinateur, c'est toi qui tapes au clavier puis appuies sur Entrée." },
            { t: 'h', v: 'LE piège le plus fréquent de tout Python' },
            { t: 'p', v: "<code>input()</code> renvoie <b>toujours du texte</b>. Même si l'utilisateur tape 15, tu reçois le texte \"15\", pas le nombre 15." },
            { t: 'code', run: true, err: true, v: `age = input("Ton age ? ")\nprint(age + 1)   # ERREUR : on ne peut pas additionner texte et nombre` },
            { t: 'p', v: "La solution : <b>convertir</b> avec <code>int()</code> pour un entier, <code>float()</code> pour un nombre a virgule." },
            { t: 'code', run: true, v: `age = int(input("Ton age ? "))\nprint(f"L'an prochain tu auras {age + 1} ans")` },
            { t: 'analogy', v: "<b>L'image à retenir :</b> input() te tend toujours une <i>étiquette de carton</i> avec un dessin dessus. Même si le dessin représente 15 pommes, tu ne peux pas manger l'étiquette. <code>int()</code> transforme l'étiquette en vraies pommes." },
            { t: 'key', h: 'A retenir', v: "input(\"question\") renvoie du texte · int(input(...)) pour un entier · float(input(...)) pour un decimal." }
          ],
          ex: [
            {
              brief: "Demande le prénom avec le texte <code>Ton prenom : </code> puis affiche <code>Bienvenue dans la forge, PRENOM !</code>",
              starter: 'prenom = input("Ton prenom : ")\n',
              hint: 'Utilise une f-string pour la reponse.',
              solution: `prenom = input("Ton prenom : ")\nprint(f"Bienvenue dans la forge, {prenom} !")`,
              tests: [
                { in: ['Ilyes'], expect: 'Ton prenom : Ilyes\nBienvenue dans la forge, Ilyes !' },
                { in: ['Mia'], expect: 'Ton prenom : Mia\nBienvenue dans la forge, Mia !' }
              ]
            },
            {
              brief: "Demande un nombre avec <code>Un nombre : </code>, puis affiche son double. Attention a la conversion !",
              starter: 'n = input("Un nombre : ")\n',
              hint: 'Entoure input(...) par int(...).',
              solution: `n = int(input("Un nombre : "))\nprint(n * 2)`,
              tests: [{ in: ['7'], expect: 'Un nombre : 7\n14' }, { in: ['-3'], expect: 'Un nombre : -3\n-6' }],
              must: [['int\\s*\\(', 'Il faut convertir la reponse avec int().']]
            },
            {
              brief: "Mini-convertisseur : demande une longueur en metres avec <code>Metres : </code> (nombre à virgule possible) et affiche <code>X m = Y cm</code> ou Y est la valeur en centimetres, sans décimale inutile. Exemple pour 2.5 : <code>2.5 m = 250.0 cm</code>",
              starter: 'm = float(input("Metres : "))\n',
              hint: 'Multiplie par 100 et utilise une f-string avec les deux valeurs.',
              solution: `m = float(input("Metres : "))\nprint(f"{m} m = {m * 100} cm")`,
              tests: [{ in: ['2.5'], expect: 'Metres : 2.5\n2.5 m = 250.0 cm' }]
            }
          ],
          quiz: [
            { q: 'Quel est le type de la valeur renvoyée par input() ?', opts: ['int', 'str', 'Ça dépend de ce que tape l\'utilisateur'], a: 1, why: "Toujours str. C'est à toi de convertir si tu veux calculer." },
            { q: "Comment lire un age et pouvoir l'additionner ?", opts: ['age = input("Age ?")', 'age = int(input("Age ?"))', 'age = str(input("Age ?"))'], a: 1, why: 'int() transforme le texte recu en nombre entier.' }
          ]
        },

        {
          id: 'py-1-6', title: 'Jeu : la chasse au bug', kind: 'jeu', xp: 30,
          goal: 'Repérer la ligne fautive dans un programme casse. Un vrai développeur passe la moitie de son temps a faire ça.',
          game: { type: 'bughunt', bank: 'py1' },
          blocks: [
            { t: 'p', v: "Chaque programme ci-dessous contient <b>exactement une ligne fautive</b>. Clique dessus. Tu gagnes des points de combo si tu enchaines les bonnes réponses." }
          ]
        },

        {
          id: 'py-1-7', title: 'BOSS · La carte de recrue', kind: 'boss', xp: 60,
          goal: "Assembler tout le jour 1 dans un seul programme : variables, calculs, input et f-strings.",
          blocks: [
            { t: 'p', v: "Première epreuve. Tu vas fabriquer la <b>carte de recrue</b> d'un joueur : le programme pose trois questions, calcule une statistique, et affiche une fiche propre." },
            { t: 'p', v: "Le format de sortie doit être <b>exactement</b> celui demande. Chez un développeur, un espace en trop, c'est un bug." },
            { t: 'callout', h: 'Ce que le jury attend', v: '' }
          ],
          ex: [
            {
              brief: "Le programme doit : 1) demander le pseudo avec <code>Pseudo : </code> 2) demander l'age avec <code>Age : </code> 3) demander le nombre d'heures d'entraînement par semaine avec <code>Heures : </code>. Puis afficher trois lignes :<br><code>=== CARTE DE RECRUE ===</code><br><code>PSEUDO, AGE ans</code><br><code>Entrainement annuel : X heures</code><br>ou X vaut heures x 52.",
              starter: 'pseudo = input("Pseudo : ")\n\n',
              hint: "Trois input (dont deux convertis en int), puis trois print. La troisieme ligne utilise heures * 52.",
              solution: `pseudo = input("Pseudo : ")\nage = int(input("Age : "))\nheures = int(input("Heures : "))\nprint("=== CARTE DE RECRUE ===")\nprint(f"{pseudo}, {age} ans")\nprint(f"Entrainement annuel : {heures * 52} heures")`,
              tests: [
                { in: ['Kaz', '14', '6'], expect: 'Pseudo : Kaz\nAge : 14\nHeures : 6\n=== CARTE DE RECRUE ===\nKaz, 14 ans\nEntrainement annuel : 312 heures' },
                { in: ['Nova', '17', '10'], expect: 'Pseudo : Nova\nAge : 17\nHeures : 10\n=== CARTE DE RECRUE ===\nNova, 17 ans\nEntrainement annuel : 520 heures' }
              ],
              success: "Jour 1 termine. Tu sais faire parler, retenir, calculer et écouter une machine."
            }
          ],
          quiz: [
            { q: 'Dans quel ordre Python exécute-t-il les lignes ?', opts: ['De haut en bas', 'Dans le désordre', 'Les print en dernier'], a: 0, why: 'Toujours de haut en bas, une ligne après l\'autre.' },
            { q: 'int(input("Age ?")) fait quoi, dans l\'ordre ?', opts: ['Convertit puis demande', 'Demande puis convertit', 'Les deux en même temps'], a: 1, why: "Python évalue l'intérieur des parenthèses d'abord : input() s'exécute, puis int() convertit le resultat." }
          ]
        }
      ]
    },

    /* ======================= JOUR 2 ======================= */
    {
      n: 2, title: 'Decider et répéter', sub: 'Conditions, boucles, et ton premier jeu',
      lessons: [
        {
          id: 'py-2-1', title: 'if / else : la machine choisit', kind: 'lecon', xp: 25,
          goal: 'Écrire une condition, comprendre l\'indentation, et tester une valeur.',
          blocks: [
            { t: 'p', v: "Un programme qui fait toujours la même chose est un aller simple. Avec <code>if</code>, ton programme devient un carrefour." },
            { t: 'code', run: true, v: `age = 15\n\nif age >= 18:\n    print("Tu peux voter")\nelse:\n    print("Pas encore majeur")` },
            { t: 'h', v: 'Les 3 éléments obligatoires' },
            { t: 'ol', v: [
              "Le mot <code>if</code> suivi d'une <b>condition</b> qui vaut vrai ou faux.",
              "Les <b>deux-points</b> <code>:</code> à la fin de la ligne. Oubli le plus fréquent au monde.",
              "Le bloc <b>indente</b> de 4 espaces en dessous : c'est ce qui s'exécute si la condition est vraie."
            ] },
            { t: 'analogy', v: "<b>L'image à retenir :</b> l'indentation, c'est le decalage vers la droite. En Python, ce n'est pas de la décoration : c'est ce qui dit « ces lignes appartiennent au if ». Déplace un espace, tu changes le programme." },
            { t: 'h', v: 'Les opérateurs de comparaison' },
            {
              t: 'table', head: ['Écriture', 'Signification'],
              rows: [['<code>==</code>', 'est egal a (deux signes !)'], ['<code>!=</code>', 'est différent de'],
                     ['<code>&gt;</code> <code>&lt;</code>', 'strictement supérieur / inférieur'],
                     ['<code>&gt;=</code> <code>&lt;=</code>', 'supérieur ou egal / inférieur ou egal']]
            },
            { t: 'warn', h: 'Le piège du = et du ==', v: "<code>=</code> range une valeur dans une variable. <code>==</code> compare deux valeurs. Écrire <code>if age = 18:</code> provoque une erreur de syntaxe." },
            { t: 'code', run: true, v: `mot_de_passe = "ares123"\nsaisie = "ares123"\n\nif saisie == mot_de_passe:\n    print("Acces autorise")\nelse:\n    print("Acces refuse")` },
            { t: 'key', h: 'A retenir', v: "if condition: puis bloc indente · else: pour le reste · == compare, = affecte." }
          ],
          ex: [
            {
              brief: "La variable <code>note</code> vaut 12. Affiche <code>Admis</code> si la note est supérieure ou égale à 10, sinon <code>Recale</code>.",
              starter: 'note = 12\n',
              hint: 'if note >= 10: ... else: ...',
              solution: `note = 12\nif note >= 10:\n    print("Admis")\nelse:\n    print("Recale")`,
              tests: [{ expect: 'Admis' }],
              must: [['if\\s', 'Utilise une instruction if.'], ['else\\s*:', 'Utilise aussi un else.']]
            },
            {
              brief: "Demande un nombre avec <code>Nombre : </code> et affiche <code>pair</code> ou <code>impair</code>.",
              starter: 'n = int(input("Nombre : "))\n',
              hint: 'Un nombre est pair si n % 2 == 0.',
              solution: `n = int(input("Nombre : "))\nif n % 2 == 0:\n    print("pair")\nelse:\n    print("impair")`,
              tests: [{ in: ['8'], expect: 'Nombre : 8\npair' }, { in: ['7'], expect: 'Nombre : 7\nimpair' }, { in: ['0'], expect: 'Nombre : 0\npair' }]
            }
          ],
          quiz: [
            { q: 'Quelle ligne est correcte ?', opts: ['if x = 5:', 'if x == 5:', 'if x := 5'], a: 1, why: 'Comparer, c\'est ==. Le simple = sert à ranger une valeur.' },
            { q: 'Que se passe-t-il si on oublie les deux-points après la condition ?', opts: ['Rien', 'SyntaxError', 'Le if est ignore'], a: 1, why: 'Python signale une erreur de syntaxe : il attend « : » pour ouvrir le bloc.' }
          ]
        },

        {
          id: 'py-2-2', title: 'elif et conditions combinees', kind: 'lecon', xp: 25,
          goal: 'Gerer plusieurs cas, et combiner des conditions avec and / or / not.',
          blocks: [
            { t: 'p', v: "Deux cas, c'est <code>if/else</code>. Trois cas ou plus, c'est <code>elif</code> (contraction de <i>else if</i>)." },
            { t: 'code', run: true, v: `note = 14\n\nif note >= 16:\n    print("Tres bien")\nelif note >= 14:\n    print("Bien")\nelif note >= 10:\n    print("Passable")\nelse:\n    print("Insuffisant")` },
            { t: 'tip', h: "L'ordre compte enormement", v: "Python teste dans l'ordre et <b>s'arrête au premier vrai</b>. Si tu mets <code>note >= 10</code> en premier, un 18 afficherait « Passable ». Va toujours du plus exigeant au moins exigeant." },
            { t: 'h', v: 'Combiner des conditions' },
            {
              t: 'table', head: ['Mot', 'Vrai quand...', 'Exemple'],
              rows: [['<code>and</code>', 'les DEUX conditions sont vraies', 'age >= 13 and age <= 17'],
                     ['<code>or</code>', 'AU MOINS une est vraie', 'jour == "sam" or jour == "dim"'],
                     ['<code>not</code>', 'la condition est fausse', 'not connecte']]
            },
            { t: 'code', run: true, v: `age = 15\naccompagne = True\n\nif age >= 16 or (age >= 12 and accompagne):\n    print("Entree autorisee")\nelse:\n    print("Entree refusee")` },
            { t: 'p', v: "Python accepte aussi l'écriture mathematique : <code>if 13 <= age <= 17:</code> est parfaitement valide et très lisible." },
            { t: 'key', h: 'A retenir', v: "elif enchaine les cas · le premier vrai gagne · and exige tout, or se contente d'un · 0 < x < 10 fonctionne." }
          ],
          ex: [
            {
              brief: "Demande une temperature avec <code>Temperature : </code> puis affiche <code>Glacial</code> (moins de 0), <code>Froid</code> (0 à 14), <code>Doux</code> (15 à 24) ou <code>Chaud</code> (25 et plus).",
              starter: 't = int(input("Temperature : "))\n',
              hint: 'Quatre cas : if, elif, elif, else. Va du plus froid au plus chaud (ou l\'inverse), sans trou.',
              solution: `t = int(input("Temperature : "))\nif t < 0:\n    print("Glacial")\nelif t <= 14:\n    print("Froid")\nelif t <= 24:\n    print("Doux")\nelse:\n    print("Chaud")`,
              tests: [
                { in: ['-5'], expect: 'Temperature : -5\nGlacial' },
                { in: ['10'], expect: 'Temperature : 10\nFroid' },
                { in: ['20'], expect: 'Temperature : 20\nDoux' },
                { in: ['30'], expect: 'Temperature : 30\nChaud' }
              ]
            },
            {
              brief: "Un manege est accessible si la taille est d'au moins 140 cm <b>et</b> l'age d'au moins 10 ans. Avec les variables données, affiche <code>Acces autorise</code> ou <code>Acces refuse</code>.",
              starter: 'taille = 145\nage = 9\n',
              hint: 'Une seule condition avec and.',
              solution: `taille = 145\nage = 9\nif taille >= 140 and age >= 10:\n    print("Acces autorise")\nelse:\n    print("Acces refuse")`,
              tests: [{ expect: 'Acces refuse' }],
              must: [['and', 'Utilise le mot-cle and pour combiner les deux conditions.']]
            }
          ],
          quiz: [
            { q: 'Si note = 18 avec if note >= 10 en premier puis elif note >= 16, qu\'affiche-t-on ?', opts: ['Le cas du >= 16', 'Le cas du >= 10', 'Les deux'], a: 1, why: 'Python s\'arrête au premier cas vrai : il faut trier du plus exigeant au moins exigeant.' },
            { q: 'True and False vaut...', opts: ['True', 'False'], a: 1, why: 'and exige que les deux soient vrais.' },
            { q: 'Combien de blocs s\'exécutent dans une chaîne if/elif/else ?', opts: ['Un seul', 'Tous ceux qui sont vrais', 'Aucun si else est absent'], a: 0, why: 'Exactement un seul bloc, le premier dont la condition est vraie.' }
          ]
        },

        {
          id: 'py-2-3', title: 'La boucle for : repeter sans se fatiguer', kind: 'lecon', xp: 30,
          goal: 'Répéter des actions avec for et range, et accumuler un resultat.',
          blocks: [
            { t: 'p', v: "Afficher 100 fois une ligne en copiant-collant 100 print ? Jamais. Une boucle fait ça en 2 lignes." },
            { t: 'code', run: true, v: `for i in range(5):\n    print("Coup de marteau", i)` },
            { t: 'h', v: 'Comprendre range()' },
            {
              t: 'table', head: ['Écriture', 'Valeurs parcourues'],
              rows: [['<code>range(5)</code>', '0, 1, 2, 3, 4 — cinq valeurs, on démarre à 0'],
                     ['<code>range(1, 6)</code>', '1, 2, 3, 4, 5 — la borne de fin est exclue'],
                     ['<code>range(0, 10, 2)</code>', '0, 2, 4, 6, 8 — avec un pas de 2'],
                     ['<code>range(5, 0, -1)</code>', '5, 4, 3, 2, 1 — a l\'envers']]
            },
            { t: 'warn', h: 'La borne de fin est TOUJOURS exclue', v: "<code>range(1, 11)</code> s'arrête à 10. Pour aller de 1 a n inclus, on écrit <code>range(1, n + 1)</code>." },
            { t: 'h', v: 'La variable de boucle' },
            { t: 'p', v: "<code>i</code> prend une nouvelle valeur à chaque tour. Tu peux l'utiliser dans le bloc, par exemple pour une table de multiplication." },
            { t: 'code', run: true, v: `table = 7\nfor i in range(1, 11):\n    print(f"{table} x {i} = {table * i}")` },
            { t: 'h', v: 'Accumuler : le motif le plus utile du monde' },
            { t: 'p', v: "On crée une variable <b>avant</b> la boucle, on la modifie <b>dedans</b>, on l'affiche <b>après</b>." },
            { t: 'code', run: true, v: `total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)   # 5050, la somme de 1 a 100` },
            { t: 'tip', h: 'Parcourir du texte', v: "for fonctionne aussi sur une chaîne : <code>for lettre in \"ares\":</code> te donne a, r, e, s une par une." },
            { t: 'key', h: 'A retenir', v: "for i in range(n): répète n fois · la fin est exclue · on initialise l'accumulateur avant la boucle." }
          ],
          ex: [
            {
              brief: "Affiche les nombres de 1 à 10, un par ligne.",
              starter: 'for i in range(...):\n    print(i)\n',
              hint: 'range(1, 11) car la fin est exclue.',
              solution: `for i in range(1, 11):\n    print(i)`,
              tests: [{ expect: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10' }]
            },
            {
              brief: "Affiche la table de 9 sous la forme <code>9 x 1 = 9</code> jusqu'à <code>9 x 10 = 90</code>.",
              starter: 'for i in range(1, 11):\n    ',
              hint: 'Une f-string avec i et 9 * i.',
              solution: `for i in range(1, 11):\n    print(f"9 x {i} = {9 * i}")`,
              tests: [{ expect: '9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81\n9 x 10 = 90' }]
            },
            {
              brief: "Calcule et affiche la somme de tous les nombres <b>pairs</b> de 1 à 50 (résultat attendu : un seul nombre).",
              starter: 'total = 0\n',
              hint: 'Boucle de 1 à 50, et n\'ajoute que si i % 2 == 0. (Ou boucle avec un pas de 2.)',
              solution: `total = 0\nfor i in range(2, 51, 2):\n    total += i\nprint(total)`,
              tests: [{ expect: '650' }]
            }
          ],
          quiz: [
            { q: 'Combien de tours fait range(3) ?', opts: ['2', '3', '4'], a: 1, why: 'range(3) donne 0, 1, 2 : trois tours.' },
            { q: 'Quelle boucle affiche 1, 2, 3, 4, 5 ?', opts: ['range(5)', 'range(1, 5)', 'range(1, 6)'], a: 2, why: 'La borne de fin est exclue, donc il faut 6 pour aller jusqu\'à 5.' },
            { q: 'Où faut-il initialiser total = 0 ?', opts: ['Avant la boucle', 'Dans la boucle', 'Après la boucle'], a: 0, why: 'Dans la boucle, il serait remis à zéro à chaque tour !' }
          ]
        },

        {
          id: 'py-2-4', title: 'La boucle while : tant que...', kind: 'lecon', xp: 30,
          goal: 'Répéter tant qu\'une condition reste vraie, et éviter la boucle infinie.',
          blocks: [
            { t: 'p', v: "<code>for</code> sert quand tu connais le nombre de tours. <code>while</code> sert quand tu ne le connais pas : « tant que le joueur n'a pas trouve », « tant qu'il reste de la vie »." },
            { t: 'code', run: true, v: `vies = 3\nwhile vies > 0:\n    print(f"Il reste {vies} vies")\n    vies -= 1\nprint("Game over")` },
            { t: 'h', v: 'Les 3 temps d\'un while' },
            { t: 'ol', v: [
              "<b>Avant</b> : préparer la variable testee (<code>vies = 3</code>).",
              "<b>Condition</b> : elle doit pouvoir devenir fausse un jour.",
              "<b>Dedans</b> : faire evoluer la variable (<code>vies -= 1</code>). C'est la ligne qu'on oublie."
            ] },
            { t: 'warn', h: 'La boucle infinie', v: "Si tu oublies de faire evoluer la variable, la condition reste vraie pour toujours et ton programme ne s'arrête jamais. Ici la forge coupe automatiquement au bout de 900 000 étapes et te prévient." },
            { t: 'code', run: true, v: `n = 5\nwhile n > 0:\n    print(n)\n    # ligne manquante : n -= 1\n    n -= 1   # enleve ce -= 1 pour voir la forge te sauver` },
            { t: 'h', v: 'break : sortir immédiatement' },
            { t: 'code', run: true, v: `essai = 0\nwhile True:            # boucle volontairement infinie\n    essai += 1\n    if essai == 3:\n        print("Trouve au 3e essai")\n        break          # on sort de la boucle` },
            { t: 'key', h: 'A retenir', v: "while condition: répète tant que c'est vrai · fais evoluer la variable · break sort de la boucle." }
          ],
          ex: [
            {
              brief: "Avec un while, affiche le compte a rebours de 5 à 1 (un par ligne) puis <code>Decollage !</code>",
              starter: 'n = 5\nwhile n > 0:\n    ',
              hint: 'Affiche n, puis diminue n de 1. Le message final est après la boucle (non indente).',
              solution: `n = 5\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("Decollage !")`,
              tests: [{ expect: '5\n4\n3\n2\n1\nDecollage !' }],
              must: [['while', 'Cet exercice demande une boucle while.']]
            },
            {
              brief: "Un compte contient 1000 euros et perd 10% chaque annee. Affiche le nombre d'années nécessaires pour passer sous 500 euros (un seul nombre).",
              starter: 'argent = 1000\nannees = 0\n',
              hint: 'Tant que argent >= 500 : multiplie par 0.9 et incrémente annees.',
              solution: `argent = 1000\nannees = 0\nwhile argent >= 500:\n    argent = argent * 0.9\n    annees += 1\nprint(annees)`,
              tests: [{ expect: '7' }]
            }
          ],
          quiz: [
            { q: 'Quand utiliser while plutôt que for ?', opts: ['Quand on connaît le nombre de tours', 'Quand on ne le connaît pas a l\'avance', 'Jamais, for suffit'], a: 1, why: 'while est fait pour « tant que la condition tient », sans nombre de tours connu.' },
            { q: 'Qu\'est-ce qui provoque une boucle infinie ?', opts: ['Un break', 'Une variable de condition qui ne change jamais', 'Un print dans la boucle'], a: 1, why: 'Si rien ne fait evoluer la condition, elle reste vraie pour toujours.' }
          ]
        },

        {
          id: 'py-2-5', title: 'Jeu : devine la sortie', kind: 'jeu', xp: 30,
          goal: 'Lire un programme dans sa tête et prédire ce qu\'il affiche. La competence numéro 1 pour deboguer.',
          game: { type: 'predict', bank: 'py2' },
          blocks: [{ t: 'p', v: "Lis le programme, écris ce qu'il affiche, valide. Pas d'ordinateur dans la tête : simule ligne par ligne, comme le ferait Python." }]
        },

        {
          id: 'py-2-6', title: 'PROJET · Le nombre mystere', kind: 'projet', xp: 55,
          goal: 'Construire un vrai jeu jouable : tirage aléatoire, boucle, indices et compteur de coups.',
          blocks: [
            { t: 'p', v: "Voici ton premier <b>vrai jeu</b>. L'ordinateur choisit un nombre secret, tu proposes, il répond « plus grand » ou « plus petit » jusqu'à ce que tu trouves." },
            { t: 'h', v: 'Étape 1 — le hasard' },
            { t: 'p', v: "<code>random</code> est un module : une boîte a outils fournie avec Python. On l'importe puis on tire un entier." },
            { t: 'code', run: true, v: `import random\n\nsecret = random.randint(1, 100)\nprint("J'ai choisi un nombre entre 1 et 100")\nprint("(chut, c'etait", secret, ")")` },
            { t: 'h', v: 'Étape 2 — la structure du jeu' },
            { t: 'p', v: "Le squelette est toujours le même : une boucle qui tourne tant que ce n'est pas trouve." },
            { t: 'code', v: `import random\n\nsecret = random.randint(1, 100)\ntrouve = False\ncoups = 0\n\nwhile not trouve:\n    proposition = int(input("Ta proposition : "))\n    coups += 1\n    if proposition < secret:\n        print("Plus grand !")\n    elif proposition > secret:\n        print("Plus petit !")\n    else:\n        trouve = True\n        print(f"Bravo ! Trouve en {coups} coups")` },
            { t: 'tip', h: 'La stratégie gagnante', v: "En coupant l'intervalle en deux à chaque coup (50, puis 25 ou 75...), on trouve n'importe quel nombre entre 1 et 100 en 7 essais maximum. Ça s'appelle la <b>recherche dichotomique</b>, et c'est ce que fait ton téléphone pour chercher dans un annuaire." },
            { t: 'h', v: 'Étape 3 — à toi de jouer' },
            { t: 'p', v: "Dans l'exercice ci-contre, tu écris la version « arbitre » : le secret est fixe, et le programme doit reagir correctement à chaque proposition." }
          ],
          ex: [
            {
              brief: "Le nombre secret est <code>42</code> (déjà donne). Boucle : demande une proposition avec <code>Proposition : </code>, affiche <code>Plus grand !</code> ou <code>Plus petit !</code>, et quand c'est trouve affiche <code>Bravo ! Trouve en N coups</code> puis arrête-toi.",
              starter: 'secret = 42\ncoups = 0\n\nwhile True:\n    ',
              hint: 'Dans la boucle : lire, incrémenter coups, comparer avec if/elif/else, et break quand c\'est trouve.',
              solution: `secret = 42\ncoups = 0\n\nwhile True:\n    proposition = int(input("Proposition : "))\n    coups += 1\n    if proposition < secret:\n        print("Plus grand !")\n    elif proposition > secret:\n        print("Plus petit !")\n    else:\n        print(f"Bravo ! Trouve en {coups} coups")\n        break`,
              tests: [
                { in: ['50', '25', '42'], expect: 'Proposition : 50\nPlus petit !\nProposition : 25\nPlus grand !\nProposition : 42\nBravo ! Trouve en 3 coups' },
                { in: ['42'], expect: 'Proposition : 42\nBravo ! Trouve en 1 coups' }
              ],
              success: "Tu viens d'écrire un jeu complet, avec boucle, conditions et compteur. Ajoute-lui un nombre d'essais limite pour le rendre plus dur !"
            }
          ]
        },

        {
          id: 'py-2-7', title: 'BOSS · FizzBuzz et la pyramide', kind: 'boss', xp: 70,
          goal: 'Les deux exercices que les entreprises font passer en entretien. Serieusement.',
          blocks: [
            { t: 'p', v: "<b>FizzBuzz</b> est le test d'embauche le plus célèbre du monde : il élimine ceux qui ne savent pas combiner une boucle et des conditions. Tu vas le réussir aujourd'hui." },
            { t: 'p', v: "La règle : pour chaque nombre de 1 a n, on affiche <code>Fizz</code> si multiple de 3, <code>Buzz</code> si multiple de 5, <code>FizzBuzz</code> si multiple des deux, sinon le nombre." },
            { t: 'warn', h: "L'ordre des tests", v: "Teste <b>d'abord</b> le multiple de 15 (3 et 5), sinon 15 afficherait « Fizz » et tu raterais le piege. C'est exactement ce que le recruteur observe." }
          ],
          ex: [
            {
              brief: "Écris le FizzBuzz de 1 à 20 inclus.",
              starter: 'for i in range(1, 21):\n    ',
              hint: 'if i % 15 == 0 ... elif i % 3 == 0 ... elif i % 5 == 0 ... else print(i)',
              solution: `for i in range(1, 21):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)`,
              tests: [{ expect: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz' }],
              success: "FizzBuzz valide. Tu viens de passer le filtre d'entretien numéro 1 de l'industrie."
            },
            {
              brief: "Affiche une pyramide d'étoiles de 5 lignes :<br><code>*</code><br><code>**</code><br><code>***</code><br><code>****</code><br><code>*****</code>",
              starter: 'for i in range(1, 6):\n    ',
              hint: 'Le texte "*" multiplie par un nombre se répète : "*" * 3 donne ***',
              solution: `for i in range(1, 6):\n    print("*" * i)`,
              tests: [{ expect: '*\n**\n***\n****\n*****' }]
            },
            {
              brief: "Compte a rebours croise : affiche les nombres de 10 à 1, mais remplace les multiples de 3 par <code>tic</code>. (10, tic, 8, 7, tic, 5, 4, tic, 2, 1)",
              starter: 'for i in range(10, 0, -1):\n    ',
              hint: 'range(10, 0, -1) descend. Ensuite un if sur i % 3.',
              solution: `for i in range(10, 0, -1):\n    if i % 3 == 0:\n        print("tic")\n    else:\n        print(i)`,
              tests: [{ expect: '10\ntic\n8\n7\ntic\n5\n4\ntic\n2\n1' }],
              success: 'Jour 2 termine. Tu sais faire choisir et répéter une machine : 80% de la programmation est la.'
            }
          ]
        }
      ]
    },

    /* ======================= JOUR 3 ======================= */
    {
      n: 3, title: 'Ranger et réutiliser', sub: 'Listes, dictionnaires, fonctions et projet final',
      lessons: [
        {
          id: 'py-3-1', title: 'Les listes : ranger plusieurs valeurs', kind: 'lecon', xp: 30,
          goal: 'Créer, lire, modifier et parcourir une liste.',
          blocks: [
            { t: 'p', v: "Une variable = une valeur. Mais pour stocker 30 notes d'élèves, tu ne vas pas créer note1, note2... note30. Il te faut une <b>liste</b>." },
            { t: 'code', run: true, v: `notes = [12, 15, 8, 17]\nprint(notes)\nprint(len(notes))   # combien d'elements` },
            { t: 'h', v: 'Acceder a un élément' },
            { t: 'p', v: "Chaque case a un numéro, appelé <b>index</b>, qui démarre a <b>0</b>." },
            { t: 'code', run: true, v: `notes = [12, 15, 8, 17]\nprint(notes[0])    # 12, le premier\nprint(notes[2])    # 8\nprint(notes[-1])   # 17, le dernier\nnotes[1] = 20      # on remplace\nprint(notes)` },
            { t: 'analogy', v: "<b>L'image à retenir :</b> une liste, c'est un immeuble. <code>notes</code> est l'adresse de l'immeuble, <code>notes[2]</code> l'appartement numéro 2. Le rez-de-chaussee porte le numéro 0, et <code>notes[-1]</code> est le penthouse." },
            { t: 'h', v: 'Ajouter et retirer' },
            { t: 'code', run: true, v: `equipe = ["Lea", "Sam"]\nequipe.append("Zoe")     # ajoute a la fin\nequipe.insert(0, "Ali")  # insere en position 0\nequipe.remove("Sam")     # retire par valeur\nprint(equipe)\nprint(equipe.pop())      # retire ET renvoie le dernier\nprint(equipe)` },
            { t: 'h', v: 'Parcourir : le geste essentiel' },
            { t: 'code', run: true, v: `notes = [12, 15, 8, 17]\nfor note in notes:\n    print(f"Note : {note}")` },
            { t: 'tip', h: 'Deux facons de parcourir', v: "<code>for note in notes:</code> te donne les <b>valeurs</b>. <code>for i in range(len(notes)):</code> te donne les <b>index</b> (utile si tu dois modifier la liste)." },
            { t: 'key', h: 'A retenir', v: "[] crée une liste · index à partir de 0 · -1 = dernier · append/remove/pop modifient · for parcourt." }
          ],
          ex: [
            {
              brief: "Crée une liste <code>animaux</code> avec <code>chat</code>, <code>chien</code>, <code>loutre</code>. Affiche le premier, puis le dernier, puis le nombre total (3 lignes).",
              starter: 'animaux = [...]\n',
              hint: 'animaux[0], animaux[-1], len(animaux)',
              solution: `animaux = ["chat", "chien", "loutre"]\nprint(animaux[0])\nprint(animaux[-1])\nprint(len(animaux))`,
              tests: [{ expect: 'chat\nloutre\n3' }]
            },
            {
              brief: "À partir de la liste donnée, affiche chaque prénom precede de son numéro de passage, sous la forme <code>1. Lea</code>, <code>2. Sam</code>, etc.",
              starter: 'joueurs = ["Lea", "Sam", "Zoe"]\n',
              hint: 'Utilise for i in range(len(joueurs)) et affiche i + 1 puis joueurs[i]. (enumerate marche aussi.)',
              solution: `joueurs = ["Lea", "Sam", "Zoe"]\nfor i in range(len(joueurs)):\n    print(f"{i + 1}. {joueurs[i]}")`,
              tests: [{ expect: '1. Lea\n2. Sam\n3. Zoe' }]
            }
          ],
          quiz: [
            { q: 'Que vaut l[1] si l = [10, 20, 30] ?', opts: ['10', '20', '30'], a: 1, why: "L'index 0 vaut 10, donc l'index 1 vaut 20." },
            { q: 'Que fait liste.append("x") ?', opts: ['Ajoute "x" à la fin', 'Remplace le dernier par "x"', 'Crée une nouvelle liste'], a: 0, why: 'append ajoute à la fin et modifie la liste existante.' }
          ]
        },

        {
          id: 'py-3-2', title: 'La boîte a outils des listes', kind: 'lecon', xp: 25,
          goal: 'Trier, calculer, chercher et découper une liste sans réécrire de boucle.',
          blocks: [
            { t: 'p', v: "Python fournit des outils tout faits. Les utiliser, c'est écrire moins de code et faire moins de bugs." },
            { t: 'code', run: true, v: `notes = [12, 15, 8, 17, 10]\n\nprint(sum(notes))            # somme\nprint(len(notes))            # nombre\nprint(sum(notes) / len(notes))  # moyenne\nprint(min(notes), max(notes))\nprint(sorted(notes))         # copie triee\nprint(sorted(notes, reverse=True))` },
            { t: 'h', v: 'Chercher dans une liste' },
            { t: 'code', run: true, v: `equipe = ["Lea", "Sam", "Zoe"]\nprint("Sam" in equipe)        # True\nprint("Max" in equipe)        # False\nprint(equipe.index("Zoe"))    # 2\nprint(equipe.count("Lea"))    # 1` },
            { t: 'h', v: 'Les tranches (slicing)' },
            { t: 'p', v: "<code>liste[debut:fin]</code> extrait un morceau. La fin est exclue, comme toujours." },
            { t: 'code', run: true, v: `l = [0, 1, 2, 3, 4, 5]\nprint(l[1:4])    # [1, 2, 3]\nprint(l[:3])     # les 3 premiers\nprint(l[3:])     # a partir de l'index 3\nprint(l[::-1])   # la liste a l'envers` },
            { t: 'tip', h: 'Ça marche aussi sur le texte', v: "<code>\"kayak\"[::-1]</code> donne <code>kayak</code> a l'envers. C'est la facon la plus courte de tester un palindrome." },
            { t: 'h', v: 'Du texte vers une liste, et retour' },
            { t: 'code', run: true, v: `phrase = "je forge du code"\nmots = phrase.split()          # coupe sur les espaces\nprint(mots, len(mots))\nprint("-".join(mots))          # recolle avec un tiret` },
            { t: 'key', h: 'A retenir', v: "sum/min/max/sorted calculent · in cherche · [a:b] découpe · split coupe le texte, join recolle." }
          ],
          ex: [
            {
              brief: "Avec la liste donnée, affiche sur 3 lignes : la note la plus haute, la note la plus basse, puis la moyenne arrondie à 2 decimales.",
              starter: 'notes = [14, 8, 17, 11, 15]\n',
              hint: 'max(), min(), et round(sum(notes) / len(notes), 2)',
              solution: `notes = [14, 8, 17, 11, 15]\nprint(max(notes))\nprint(min(notes))\nprint(round(sum(notes) / len(notes), 2))`,
              tests: [{ expect: '17\n8\n13.0' }]
            },
            {
              brief: "Demande une phrase avec <code>Phrase : </code>, puis affiche le nombre de mots qu'elle contient.",
              starter: 'phrase = input("Phrase : ")\n',
              hint: 'split() puis len().',
              solution: `phrase = input("Phrase : ")\nmots = phrase.split()\nprint(len(mots))`,
              tests: [{ in: ['je forge du code'], expect: 'Phrase : je forge du code\n4' }, { in: ['ares'], expect: 'Phrase : ares\n1' }]
            },
            {
              brief: "Demande un mot avec <code>Mot : </code> et affiche <code>palindrome</code> s'il se lit pareil a l'envers, sinon <code>non</code>.",
              starter: 'mot = input("Mot : ")\n',
              hint: 'Compare mot et mot[::-1].',
              solution: `mot = input("Mot : ")\nif mot == mot[::-1]:\n    print("palindrome")\nelse:\n    print("non")`,
              tests: [{ in: ['kayak'], expect: 'Mot : kayak\npalindrome' }, { in: ['forge'], expect: 'Mot : forge\nnon' }]
            }
          ],
          quiz: [
            { q: 'Que renvoie sorted([3, 1, 2]) ?', opts: ['[1, 2, 3]', 'None', 'Rien, ça trie sur place'], a: 0, why: 'sorted() renvoie une NOUVELLE liste triee. C\'est .sort() qui trie sur place et ne renvoie rien.' },
            { q: 'Que vaut [10, 20, 30, 40][1:3] ?', opts: ['[20, 30]', '[10, 20, 30]', '[20, 30, 40]'], a: 0, why: 'On part de l\'index 1 inclus jusqu\'a l\'index 3 exclu.' }
          ]
        },

        {
          id: 'py-3-3', title: 'Les dictionnaires : associer une clé a une valeur', kind: 'lecon', xp: 30,
          goal: 'Stocker des données etiquetees et les parcourir.',
          blocks: [
            { t: 'p', v: "Une liste range par <b>position</b>. Un dictionnaire range par <b>étiquette</b>. C'est ce qui te permet d'écrire <code>eleve[\"nom\"]</code> plutôt que <code>eleve[0]</code>." },
            { t: 'code', run: true, v: `eleve = {"nom": "Nina", "age": 13, "moyenne": 15.5}\n\nprint(eleve["nom"])\nprint(eleve["moyenne"])` },
            { t: 'analogy', v: "<b>L'image à retenir :</b> un dictionnaire, c'est un vrai dictionnaire de français. Tu ne cherches pas « le mot numéro 4218 », tu cherches le mot <i>forge</i> et tu obtiens sa définition. Clé -> valeur." },
            { t: 'h', v: 'Ajouter, modifier, vérifier' },
            { t: 'code', run: true, v: `stock = {"epee": 3}\nstock["bouclier"] = 5     # ajoute\nstock["epee"] = 2         # modifie\nprint(stock)\nprint("epee" in stock)    # True\nprint(stock.get("arc", 0))  # 0 : valeur par defaut si absent` },
            { t: 'warn', h: 'Clé absente = KeyError', v: "<code>stock[\"arc\"]</code> plante si la clé n'existe pas. <code>stock.get(\"arc\", 0)</code> renvoie 0 sans planter. Utilise <code>get</code> dès que tu n'es pas sur." },
            { t: 'h', v: 'Parcourir un dictionnaire' },
            { t: 'code', run: true, v: `notes = {"maths": 15, "svt": 12, "histoire": 17}\n\nfor matiere in notes:\n    print(matiere)                    # les cles\n\nfor matiere, note in notes.items():\n    print(f"{matiere} : {note}/20")   # cles ET valeurs` },
            { t: 'code', run: true, v: `notes = {"maths": 15, "svt": 12, "histoire": 17}\nvaleurs = list(notes.values())\nprint(f"Moyenne : {sum(valeurs) / len(valeurs):.2f}")` },
            { t: 'key', h: 'A retenir', v: "{clé: valeur} · acces par d[\"clé\"] · get() évite le plantage · .items() parcourt les paires." }
          ],
          ex: [
            {
              brief: "Crée un dictionnaire <code>joueur</code> avec <code>pseudo</code> = <code>Nova</code>, <code>niveau</code> = <code>7</code>, <code>vie</code> = <code>100</code>. Affiche <code>Nova (niveau 7) - 100 PV</code>.",
              starter: 'joueur = {...}\n',
              hint: 'Une f-string avec joueur["pseudo"], joueur["niveau"], joueur["vie"].',
              solution: `joueur = {"pseudo": "Nova", "niveau": 7, "vie": 100}\nprint(f"{joueur['pseudo']} (niveau {joueur['niveau']}) - {joueur['vie']} PV")`,
              tests: [{ expect: 'Nova (niveau 7) - 100 PV' }]
            },
            {
              brief: "Avec le dictionnaire de notes donne, affiche une ligne par matière sous la forme <code>maths : 15/20</code>, puis en dernière ligne <code>Moyenne : 14.67</code> (2 décimales).",
              starter: 'notes = {"maths": 15, "svt": 12, "histoire": 17}\n',
              hint: 'Boucle sur .items(), puis calcule avec sum(notes.values()) / len(notes).',
              solution: `notes = {"maths": 15, "svt": 12, "histoire": 17}\nfor matiere, note in notes.items():\n    print(f"{matiere} : {note}/20")\nmoyenne = sum(notes.values()) / len(notes)\nprint(f"Moyenne : {moyenne:.2f}")`,
              tests: [{ expect: 'maths : 15/20\nsvt : 12/20\nhistoire : 17/20\nMoyenne : 14.67' }]
            }
          ],
          quiz: [
            { q: 'Comment lire la valeur associée a "nom" ?', opts: ['d[0]', 'd["nom"]', 'd.nom'], a: 1, why: 'On accède par la clé, entre crochets et entre guillemets.' },
            { q: 'Que fait d.get("x", 0) si "x" n\'existe pas ?', opts: ['Plante', 'Renvoie 0', 'Crée la clé'], a: 1, why: 'get renvoie la valeur par défaut sans lever d\'erreur.' }
          ]
        },

        {
          id: 'py-3-4', title: 'Les fonctions : ecrire une fois, utiliser partout', kind: 'lecon', xp: 35,
          goal: 'Définir une fonction avec des paramètres et un return, et comprendre pourquoi c\'est indispensable.',
          blocks: [
            { t: 'p', v: "Une fonction, c'est un <b>bloc de code range dans un tiroir avec une étiquette</b>. Tu l'écris une fois, tu l'appelles autant de fois que tu veux." },
            { t: 'code', run: true, v: `def saluer(nom):\n    print(f"Bonjour {nom} !")\n\nsaluer("Lea")\nsaluer("Sam")\nsaluer("Zoe")` },
            { t: 'h', v: 'La grammaire' },
            { t: 'ul', v: [
              "<code>def</code> annonce une définition, suivi du nom et de parentheses.",
              "Entre parenthèses : les <b>paramètres</b>, les informations dont la fonction a besoin.",
              "Deux-points, puis le bloc indente.",
              "Définir une fonction ne l'exécute pas : il faut l'<b>appeler</b> par son nom."
            ] },
            { t: 'h', v: 'return : renvoyer un résultat' },
            { t: 'p', v: "<code>print</code> <b>affiche</b>, <code>return</code> <b>renvoie</b>. C'est la distinction la plus importante de la lecon." },
            { t: 'code', run: true, v: `def double(x):\n    return x * 2\n\nresultat = double(21)     # on recupere la valeur\nprint(resultat)\nprint(double(5) + double(5))   # on peut la reutiliser` },
            { t: 'analogy', v: "<b>L'image à retenir :</b> une fonction qui <code>print</code> est un ami qui te <i>crie</i> la réponse : tu l'entends, mais tu ne peux rien en faire. Une fonction qui <code>return</code> te <i>tend un papier</i> : tu peux le ranger, le recalculer, le renvoyer." },
            { t: 'warn', h: 'return arrête la fonction', v: "Dès que Python rencontre un return, il sort immédiatement de la fonction. Le code écrit après ne s'exécute jamais." },
            { t: 'h', v: 'Valeur par défaut' },
            { t: 'code', run: true, v: `def saluer(nom, message="Bonjour"):\n    return f"{message} {nom} !"\n\nprint(saluer("Lea"))\nprint(saluer("Sam", "Salut"))` },
            { t: 'key', h: 'A retenir', v: "def nom(paramètres): définit · l'appel exécute · return renvoie une valeur réutilisable · une fonction = une seule responsabilité." }
          ],
          ex: [
            {
              brief: "Écris une fonction <code>aire_rectangle(longueur, largeur)</code> qui <b>renvoie</b> l'aire. Le code de test est déjà écrit : ne le modifie pas.",
              starter: 'def aire_rectangle(longueur, largeur):\n    \n\nprint(aire_rectangle(5, 3))\nprint(aire_rectangle(10, 2))\n',
              hint: 'return longueur * largeur',
              solution: `def aire_rectangle(longueur, largeur):\n    return longueur * largeur\n\nprint(aire_rectangle(5, 3))\nprint(aire_rectangle(10, 2))`,
              tests: [{ expect: '15\n20' }],
              must: [['def\\s+aire_rectangle', 'La fonction doit s\'appeler aire_rectangle.'], ['return', 'La fonction doit renvoyer (return) le resultat, pas seulement l\'afficher.']]
            },
            {
              brief: "Écris une fonction <code>est_majeur(age)</code> qui renvoie <code>True</code> ou <code>False</code>, puis affiche le résultat pour 20 et pour 12.",
              starter: 'def est_majeur(age):\n    \n\nprint(est_majeur(20))\nprint(est_majeur(12))\n',
              hint: 'return age >= 18 suffit : une comparaison vaut déjà True ou False.',
              solution: `def est_majeur(age):\n    return age >= 18\n\nprint(est_majeur(20))\nprint(est_majeur(12))`,
              tests: [{ expect: 'True\nFalse' }]
            },
            {
              brief: "Écris une fonction <code>moyenne(notes)</code> qui reçoit une liste et renvoie la moyenne arrondie à 2 decimales. Teste-la sur <code>[12, 15, 18]</code> et <code>[10, 10]</code>.",
              starter: 'def moyenne(notes):\n    \n\nprint(moyenne([12, 15, 18]))\nprint(moyenne([10, 10]))\n',
              hint: 'return round(sum(notes) / len(notes), 2)',
              solution: `def moyenne(notes):\n    return round(sum(notes) / len(notes), 2)\n\nprint(moyenne([12, 15, 18]))\nprint(moyenne([10, 10]))`,
              tests: [{ expect: '15.0\n10.0' }],
              success: 'Une fonction réutilisable, testée sur deux jeux de données : tu codes comme un pro.'
            }
          ],
          quiz: [
            { q: 'Quelle est la différence entre print et return ?', opts: ['Aucune', 'print affiche, return renvoie une valeur utilisable', 'return affiche en couleur'], a: 1, why: "Une valeur renvoyée peut être stockée et recalculee ; un affichage est perdu." },
            { q: 'Que fait def carre(x): sans appel ?', opts: ['Calcule le carre', 'Rien pour l\'instant, la fonction est juste définie', 'Une erreur'], a: 1, why: 'Définir range la recette dans le tiroir. Il faut appeler carre(4) pour l\'exécuter.' },
            { q: 'Que renvoie une fonction sans return ?', opts: ['0', 'None', 'Une erreur'], a: 1, why: 'Par défaut, une fonction renvoie None.' }
          ]
        },

        {
          id: 'py-3-5', title: 'Jeu : remets le code dans l\'ordre', kind: 'jeu', xp: 30,
          goal: 'Reconstituer un programme dont les lignes ont été melangees. Excellent pour l\'indentation.',
          game: { type: 'order', bank: 'py3' },
          blocks: [{ t: 'p', v: "Clique sur les lignes dans le bon ordre d'exécution. Attention aux niveaux d'indentation : ils font partie du sens." }]
        },

        {
          id: 'py-3-6', title: 'PROJET · Le carnet de notes', kind: 'projet', xp: 60,
          goal: 'Un programme complet qui combine dictionnaire, fonctions, boucle et calculs.',
          blocks: [
            { t: 'p', v: "Objectif : un carnet qui stocke les notes par matière, calcule la moyenne générale, et designe la meilleure matière." },
            { t: 'h', v: 'Étape 1 — la structure de données' },
            { t: 'p', v: "Le bon choix ici est un dictionnaire dont chaque valeur est une <b>liste</b> de notes." },
            { t: 'code', run: true, v: `carnet = {\n    "maths": [15, 12, 18],\n    "svt": [9, 14],\n    "histoire": [16, 17, 13]\n}\n\nprint(carnet["maths"])\nprint(len(carnet), "matieres")` },
            { t: 'h', v: 'Étape 2 — une fonction moyenne' },
            { t: 'code', run: true, v: `def moyenne(notes):\n    return sum(notes) / len(notes)\n\nprint(round(moyenne([15, 12, 18]), 2))` },
            { t: 'h', v: 'Étape 3 — le bulletin' },
            { t: 'code', run: true, v: `carnet = {"maths": [15, 12, 18], "svt": [9, 14]}\n\ndef moyenne(notes):\n    return sum(notes) / len(notes)\n\nfor matiere, notes in carnet.items():\n    print(f"{matiere:<10} {moyenne(notes):.2f}")` },
            { t: 'tip', h: 'Le format {texte:<10}', v: "Le <code>&lt;10</code> aligne le texte à gauche sur 10 caractères : les colonnes s'alignent parfaitement, comme dans un vrai bulletin." }
          ],
          ex: [
            {
              brief: "Complète le programme : pour chaque matière affiche <code>matiere : moyenne</code> avec 2 décimales, puis la dernière ligne <code>Meilleure matiere : X</code> ou X est la matière ayant la plus haute moyenne.",
              starter: 'carnet = {"maths": [15, 12, 18], "svt": [9, 14], "histoire": [16, 17, 13]}\n\ndef moyenne(notes):\n    return sum(notes) / len(notes)\n\n',
              hint: "Boucle sur .items() pour afficher. Garde deux variables (meilleure_matiere et meilleure_moyenne) mises à jour quand tu trouves mieux.",
              solution: `carnet = {"maths": [15, 12, 18], "svt": [9, 14], "histoire": [16, 17, 13]}\n\ndef moyenne(notes):\n    return sum(notes) / len(notes)\n\nmeilleure = ""\nmeilleure_moy = -1\nfor matiere, notes in carnet.items():\n    m = moyenne(notes)\n    print(f"{matiere} : {m:.2f}")\n    if m > meilleure_moy:\n        meilleure_moy = m\n        meilleure = matiere\nprint(f"Meilleure matiere : {meilleure}")`,
              tests: [{ expect: 'maths : 15.00\nsvt : 11.50\nhistoire : 15.33\nMeilleure matiere : histoire' }],
              success: "Dictionnaire, listes imbriquees, fonction et recherche du maximum : c'est un vrai petit logiciel."
            }
          ]
        },

        {
          id: 'py-3-7', title: 'BOSS FINAL · L\'epreuve du Serpent', kind: 'boss', xp: 100,
          goal: 'Trois defis qui mobilisent les 3 jours. Réussis-les et le parcours Python libre est termine.',
          blocks: [
            { t: 'p', v: "Dernière épreuve du parcours libre. Aucun nouvel outil : uniquement ce que tu sais déjà, mais combine." },
            { t: 'p', v: "Prends le temps de lire chaque énoncé deux fois. Écris d'abord en français ce que doit faire le programme, puis traduis en Python. C'est exactement la methode des professionnels." }
          ],
          ex: [
            {
              brief: "<b>Defi 1 — Le videur.</b> Écris une fonction <code>peut_entrer(age, invite)</code> qui renvoie <code>True</code> si la personne a 18 ans ou plus, OU si elle a au moins 16 ans et est invitee. Sinon <code>False</code>. Les 4 tests sont déjà écrits.",
              starter: 'def peut_entrer(age, invite):\n    \n\nprint(peut_entrer(20, False))\nprint(peut_entrer(17, True))\nprint(peut_entrer(17, False))\nprint(peut_entrer(15, True))\n',
              hint: 'return age >= 18 or (age >= 16 and invite)',
              solution: `def peut_entrer(age, invite):\n    return age >= 18 or (age >= 16 and invite)\n\nprint(peut_entrer(20, False))\nprint(peut_entrer(17, True))\nprint(peut_entrer(17, False))\nprint(peut_entrer(15, True))`,
              tests: [{ expect: 'True\nTrue\nFalse\nFalse' }]
            },
            {
              brief: "<b>Defi 2 — Le compteur de voyelles.</b> Demande un mot avec <code>Mot : </code> et affiche le nombre de voyelles (a, e, i, o, u, y) qu'il contient.",
              starter: 'mot = input("Mot : ")\nvoyelles = "aeiouy"\n',
              hint: 'Parcours chaque lettre du mot et compte si elle est dans la chaîne voyelles.',
              solution: `mot = input("Mot : ")\nvoyelles = "aeiouy"\ncompteur = 0\nfor lettre in mot:\n    if lettre in voyelles:\n        compteur += 1\nprint(compteur)`,
              tests: [{ in: ['forgeron'], expect: 'Mot : forgeron\n3' }, { in: ['python'], expect: 'Mot : python\n2' }, { in: ['bzz'], expect: 'Mot : bzz\n0' }]
            },
            {
              brief: "<b>Defi 3 — Le podium.</b> À partir du dictionnaire de scores, affiche le classement du meilleur au moins bon, sous la forme <code>1. Nova - 250</code> (une ligne par joueur).",
              starter: 'scores = {"Kaz": 180, "Nova": 250, "Mia": 220}\n',
              hint: 'sorted(scores.items(), key=..., reverse=True) — ou bien transforme en liste de tuples et trie sur le score. Astuce : sorted(scores, key=scores.get, reverse=True) trie les clés par score.',
              solution: `scores = {"Kaz": 180, "Nova": 250, "Mia": 220}\nclassement = sorted(scores, key=scores.get, reverse=True)\nfor i in range(len(classement)):\n    nom = classement[i]\n    print(f"{i + 1}. {nom} - {scores[nom]}")`,
              tests: [{ expect: '1. Nova - 250\n2. Mia - 220\n3. Kaz - 180' }],
              success: "PARCOURS PYTHON LIBRE TERMINE. Tu maîtrises les fondations : variables, conditions, boucles, listes, dictionnaires et fonctions. La suite (fichiers, objets, vrais projets) t'attend dans la Forge ULTRA."
            }
          ],
          quiz: [
            { q: 'Quelle structure choisir pour associer un nom a un score ?', opts: ['Une liste', 'Un dictionnaire', 'Une variable par joueur'], a: 1, why: 'Clé -> valeur : c\'est exactement le rôle du dictionnaire.' },
            { q: 'Quel outil évite de répéter 3 fois le même calcul ?', opts: ['Une fonction', 'Un commentaire', 'Un print'], a: 0, why: 'Écrire une fois, appeler partout : c\'est la définition d\'une fonction.' }
          ]
        }
      ]
    }
  ]
};
