/* ARES — banques de jeux : chasse au bug, devine la sortie, remise en ordre, quiz eclair */
var GAMES = {

  /* ============ CHASSE AU BUG : trouver la ligne fautive ============ */
  bughunt: {
    py1: [
      { lines: ['prenom = "Lea"', 'age = 14', 'print("Bonjour " + prenom)', 'print("Tu as " + age + " ans")'],
        bad: 3, why: "On ne peut pas coller du texte et un nombre avec +. Il faut str(age) ou une f-string." },
      { lines: ['print("Debut")', 'x = 10', 'print(X)', 'print("Fin")'],
        bad: 2, why: "Python distingue les majuscules : la variable s'appelle x, pas X." },
      { lines: ['message = "salut', 'print(message)'],
        bad: 0, why: "La chaîne n'est jamais refermee : il manque le guillemet final." },
      { lines: ['note = 15', 'if note >= 10', '    print("Admis")'],
        bad: 1, why: "Il manque les deux-points à la fin de la ligne du if." },
      { lines: ['for i in range(3):', 'print(i)'],
        bad: 1, why: "Le corps de la boucle doit être indente (4 espaces) sous le for." },
      { lines: ['age = input("Age ? ")', 'if age > 18:', '    print("Majeur")'],
        bad: 0, why: "input() renvoie du texte : il faut int(input(...)) pour pouvoir comparer avec un nombre." },
      { lines: ['nombres = [1, 2, 3]', 'print(nombres[3])'],
        bad: 1, why: "Les index vont de 0 à 2 : nombres[3] n'existe pas. Le dernier est nombres[2] ou nombres[-1]." },
      { lines: ['total = 0', 'for i in range(5):', '    total = 0', '    total += i', 'print(total)'],
        bad: 2, why: "Remettre total à zéro dans la boucle efface l'accumulation a chaque tour." },
      { lines: ['def carre(x):', '    x * x', 'print(carre(4))'],
        bad: 1, why: "Il manque return : sans lui, la fonction calcule puis jette le résultat et renvoie None." },
      { lines: ['x = 5', 'if x = 5:', '    print("egal")'],
        bad: 1, why: "= affecte une valeur, == compare. Dans un if, c'est toujours ==." }
    ],
    web1: [
      { lines: ['<h1>Mon titre</h1>', '<p>Un paragraphe', '<p>Un autre paragraphe</p>'],
        bad: 1, why: "Le premier paragraphe n'est jamais fermé : il manque </p>." },
      { lines: ['<ul>', '  <li>Un</li>', '  <li>Deux</li>', '</ol>'],
        bad: 3, why: "On ouvre avec <ul> mais on ferme avec </ol> : les balises doivent correspondre." },
      { lines: ['<a href="https://ares.fr">Visiter<a>'],
        bad: 0, why: "La fermeture du lien s'écrit </a> avec un slash." },
      { lines: ['<img src="photo.jpg">', '<p>Ma photo</p>'],
        bad: 0, why: "Il manque l'attribut alt, obligatoire pour l'accessibilite." },
      { lines: ['<style>', '  h1 { color: red }', '  p { color: blue; }', '</style>'],
        bad: 1, why: "Il manque le point-virgule après red : chaque déclaration CSS se termine par ;." },
      { lines: ['<style>', '  .carte { padding: 10px; }', '</style>', '<div class=carte>Texte</div>'],
        bad: 3, why: "La valeur d'un attribut doit être entre guillemets : class=\"carte\"." },
      { lines: ['<style>', '  #menu { display: flex; }', '</style>', '<div class="menu">Menu</div>'],
        bad: 3, why: "Le CSS cible un id (#menu) mais le HTML déclare une classe : il faut id=\"menu\" ou changer le sélecteur en .menu." }
    ],
    js1: [
      { lines: ['const score = 0;', 'score = score + 10;', 'console.log(score);'],
        bad: 1, why: "On ne peut pas reaffecter une const. Il fallait déclarer let score = 0." },
      { lines: ['let nom = "Nova"', 'console.log("Salut " + Nom);'],
        bad: 1, why: "JavaScript distingue les majuscules : la variable est nom, pas Nom." },
      { lines: ['for (let i = 0; i < 3; i++ {', '  console.log(i);', '}'],
        bad: 0, why: "Il manque la parenthèse fermante après i++." },
      { lines: ['const t = [1, 2, 3];', 'console.log(t.length());'],
        bad: 1, why: "length est une propriete, pas une fonction : on écrit t.length sans parentheses." },
      { lines: ['function double(x) {', '  x * 2;', '}', 'console.log(double(4));'],
        bad: 1, why: "Il manque return : la fonction renvoie undefined." },
      { lines: ['const bouton = document.querySelector("#go");', 'bouton.addEventListener("click", direBonjour());'],
        bad: 1, why: "Les parenthèses exécutent la fonction immédiatement. Il faut passer direBonjour sans parentheses." },
      { lines: ['let age = "18";', 'if (age === 18) {', '  console.log("Majeur");', '}'],
        bad: 0, why: 'age est une chaîne "18" : avec ===, la comparaison avec le nombre 18 est fausse. Il faut Number(age).' },
      { lines: ['const t = [10, 20, 30];', 'for (let i = 0; i <= t.length; i++) {', '  console.log(t[i]);', '}'],
        bad: 1, why: "i <= t.length va une case trop loin et affiche undefined. Il faut i < t.length." }
    ]
  },

  /* ============ DEVINE LA SORTIE ============ */
  predict: {
    py2: [
      { code: 'x = 5\nx += 3\nprint(x)', answer: '8', why: "x += 3 ajoute 3 a la valeur actuelle." },
      { code: 'print(7 // 2)', answer: '3', why: "// donne le quotient entier, sans virgule." },
      { code: 'print(10 % 3)', answer: '1', why: "10 = 3 x 3 + 1, le modulo renvoie le reste." },
      { code: 'for i in range(3):\n    print(i)', answer: '0\n1\n2', why: "range(3) commence a 0 et s'arrete avant 3." },
      { code: 'mot = "python"\nprint(mot[1])', answer: 'y', why: "L'index 0 est le p, donc l'index 1 est le y." },
      { code: 'l = [1, 2, 3]\nl.append(4)\nprint(len(l))', answer: '4', why: "append ajoute un element : la liste passe de 3 a 4." },
      { code: 'print("ab" * 3)', answer: 'ababab', why: "Multiplier une chaine la repete." },
      { code: 'x = 10\nif x > 5:\n    print("grand")\nelif x > 8:\n    print("tres grand")', answer: 'grand', why: "Python s'arrete au premier cas vrai : le elif n'est jamais teste." },
      { code: 'total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)', answer: '10', why: "1 + 2 + 3 + 4 = 10." },
      { code: 'print(2 + 3 * 4)', answer: '14', why: "La multiplication passe avant l'addition." },
      { code: 'print(10 / 4)', answer: '2.5', why: "L'operateur / renvoie toujours un nombre a virgule." },
      { code: 'mots = "un deux trois".split()\nprint(len(mots))', answer: '3', why: "split() coupe sur les espaces et renvoie 3 mots." }
    ],
    js2: [
      { lang: 'js', code: 'console.log("3" + 4);', answer: '34', why: "Avec un texte, le + colle au lieu d'additionner." },
      { lang: 'js', code: 'console.log("3" * 4);', answer: '12', why: "L'operateur * convertit le texte en nombre, contrairement au +." },
      { lang: 'js', code: 'console.log(5 === "5");', answer: 'false', why: "=== compare aussi le type : number contre string." },
      { lang: 'js', code: 'const t = [1, 2, 3];\nconsole.log(t.map(n => n * 2));', answer: '[2, 4, 6]', why: "map transforme chaque element." },
      { lang: 'js', code: 'let x = 0;\nfor (let i = 0; i < 4; i++) x += i;\nconsole.log(x);', answer: '6', why: "0 + 1 + 2 + 3 = 6." },
      { lang: 'js', code: 'console.log([1, 2, 3].filter(n => n > 1).length);', answer: '2', why: "filter garde 2 et 3." },
      { lang: 'js', code: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nconsole.log("C");', answer: 'A\nC\nB', why: "Meme avec 0 ms, le callback attend la fin du code principal." },
      { lang: 'js', code: 'function f() {}\nconsole.log(f());', answer: 'undefined', why: "Une fonction sans return renvoie undefined." },
      { lang: 'js', code: 'const o = { a: 1 };\no.b = 2;\nconsole.log(Object.keys(o).length);', answer: '2', why: "L'objet a maintenant deux proprietes." }
    ]
  },

  /* ============ REMETS LE CODE DANS L'ORDRE ============ */
  order: {
    py3: [
      { goal: "Calculer et afficher la moyenne d'une liste",
        lines: ['notes = [12, 15, 9]', 'total = sum(notes)', 'moyenne = total / len(notes)', 'print(moyenne)'] },
      { goal: 'Afficher les nombres pairs de 1 à 10',
        lines: ['for i in range(1, 11):', '    if i % 2 == 0:', '        print(i)'] },
      { goal: 'Une fonction qui salue, puis son appel',
        lines: ['def saluer(nom):', '    return "Salut " + nom', 'message = saluer("Nova")', 'print(message)'] },
      { goal: 'Compter les voyelles d\'un mot',
        lines: ['mot = "forgeron"', 'compteur = 0', 'for lettre in mot:', '    if lettre in "aeiouy":', '        compteur += 1', 'print(compteur)'] },
      { goal: 'Trouver le maximum sans utiliser max()',
        lines: ['nombres = [4, 9, 2]', 'plus_grand = nombres[0]', 'for n in nombres:', '    if n > plus_grand:', '        plus_grand = n', 'print(plus_grand)'] },
      { goal: 'Remplir un dictionnaire puis le parcourir',
        lines: ['stock = {}', 'stock["epee"] = 3', 'stock["potion"] = 5', 'for objet, quantite in stock.items():', '    print(objet, quantite)'] }
    ],
    web3: [
      { lang: 'html', goal: 'Une page structurée correctement',
        lines: ['<header>', '  <h1>Mon club</h1>', '</header>', '<main>', '  <p>Bienvenue</p>', '</main>', '<footer>2026</footer>'] },
      { lang: 'html', goal: 'Une liste à puces complète',
        lines: ['<h2>Activites</h2>', '<ul>', '  <li>Escalade</li>', '  <li>Robotique</li>', '</ul>'] },
      { lang: 'html', goal: 'Un style applique a une carte',
        lines: ['<style>', '  .carte { padding: 20px; }', '</style>', '<div class="carte">Contenu</div>'] },
      { lang: 'html', goal: 'Un champ de formulaire accessible',
        lines: ['<form>', '  <label for="mail">Email</label>', '  <input type="email" id="mail">', '  <button type="submit">Envoyer</button>', '</form>'] }
    ],
    js3: [
      { lang: 'js', goal: 'Attraper un élément, le modifier et le styler',
        lines: ['const titre = document.querySelector("#titre");', 'titre.textContent = "Nouveau titre";',
                'titre.style.color = "#E2762E";', 'console.log("Titre mis à jour");'] },
      { lang: 'js', goal: 'Un compteur au clic',
        lines: ['let score = 0;', 'const bouton = document.querySelector("#plus");', 'bouton.addEventListener("click", () => {', '  score++;', '  console.log(score);', '});'] },
      { lang: 'js', goal: 'Créer un élément et l\'ajouter à la page',
        lines: ['const liste = document.querySelector("#liste");', 'const item = document.createElement("li");', 'item.textContent = "Nouvel article";', 'liste.appendChild(item);'] },
      { lang: 'js', goal: 'Calculer une moyenne et l\'afficher',
        lines: ['const notes = [12, 15, 9];', 'const total = notes.reduce((t, n) => t + n, 0);', 'const moyenne = total / notes.length;', 'console.log(moyenne.toFixed(2));'] }
    ]
  },

  /* ============ QUIZ ECLAIR ============ */
  quizgame: {
    css: [
      { q: 'Quelle propriete ecarte une boîte des autres ?', opts: ['padding', 'margin', 'border'], a: 1, why: 'margin agit a l\'extérieur, padding a l\'intérieur.' },
      { q: 'display: flex + justify-content: center fait quoi ?', opts: ['Centre horizontalement', 'Centre verticalement', 'Empile les éléments'], a: 0, why: 'justify-content gere l\'axe principal, horizontal par defaut.' },
      { q: 'Comment cible-t-on class="carte" ?', opts: ['#carte', '.carte', 'carte'], a: 1, why: 'Le point pour une classe, le diese pour un id.' },
      { q: 'Que fait border-radius: 50% sur un carre ?', opts: ['Un cercle', 'Un losange', 'Rien'], a: 0, why: 'Les quatre coins arrondis à moitie donnent un cercle parfait.' },
      { q: 'Quelle unité s\'adapte a l\'espace disponible en grid ?', opts: ['px', 'fr', 'pt'], a: 1, why: 'fr répartit les fractions d\'espace restant.' },
      { q: 'Que fait margin: 0 auto sur une boîte de largeur fixe ?', opts: ['La colle a gauche', 'La centre horizontalement', 'La rend invisible'], a: 1, why: 'auto répartit l\'espace restant à gauche et à droite.' },
      { q: 'Quelle propriete anime le mieux (performance) ?', opts: ['width', 'transform', 'margin'], a: 1, why: 'transform est gere par la carte graphique, sans recalcul de mise en page.' },
      { q: 'Où déclare-t-on les variables CSS globales ?', opts: [':root', 'body', '@media'], a: 0, why: ':root est la racine du document.' },
      { q: 'Que signifie @media (max-width: 600px) ?', opts: ['Écrans de 600px et moins', 'Écrans de plus de 600px', 'Uniquement a l\'impression'], a: 0, why: 'max-width = jusqu\'à cette largeur.' },
      { q: 'Comment relier un label a son champ ?', opts: ['label name=', 'label for= et input id=', 'Ils sont relies automatiquement'], a: 1, why: 'for doit valoir exactement l\'id du champ.' },
      { q: 'Quelle balise pour le contenu principal ?', opts: ['<div>', '<main>', '<section>'], a: 1, why: '<main> est unique et identifie le contenu principal.' },
      { q: 'Que fait img { max-width: 100% } ?', opts: ['Agrandit l\'image', 'Empeche l\'image de deborder', 'Centre l\'image'], a: 1, why: 'L\'image ne dépasse jamais son conteneur.' }
    ]
  }
};
