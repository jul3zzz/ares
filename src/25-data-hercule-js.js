/* ARES ULTRA — Module final de l'Arsenal de l'Étincelle : « Les 12 Travaux d'Hercule ».
   Douze défis de maîtrise JavaScript : closures, classes, motifs professionnels
   (debounce, throttle, mémoïsation, composition) et un composant final au DOM.  */
(function () {
  var m = {
    n: 9,
    title: "Les 12 Travaux d'Hercule",
    sub: "L'épreuve finale : douze motifs professionnels, plusieurs semaines de pratique",
    lessons: [

      {
        id: 'jh-1', title: "Travail I — Le Lion de Némée", kind: 'boss', xp: 90,
        goal: "Une peau qu'on ne peut plus jamais modifier : verrouiller un objet pour de bon.",
        blocks: [
          { t: 'p', v: "La peau du Lion de Némée est impossible à percer. En JavaScript, <code>Object.freeze()</code> rend un objet tout aussi impénétrable : plus aucune propriété ne peut être modifiée après coup, ce qui protège des données sensibles d'une modification accidentelle ailleurs dans un gros programme." },
          { t: 'code', lang: 'js', run: true, v: `const relique = Object.freeze({ nom: "Peau du Lion", puissance: 100 });\nconsole.log(Object.isFrozen(relique));\nconsole.log(relique.nom);` }
        ],
        ex: [
          {
            brief: "Écris <code>creerRelique(nom, valeur)</code> qui renvoie un objet <code>{ nom, valeur }</code> totalement figé avec <code>Object.freeze()</code>, pour qu'aucun code extérieur ne puisse plus le modifier.",
            starter: 'function creerRelique(nom, valeur) {\n  \n}\n\nconst relique = creerRelique("Peau du Lion", 100);\nconsole.log(Object.isFrozen(relique));\nconsole.log(relique.nom, relique.valeur);\n',
            hint: "return Object.freeze({ nom, valeur });",
            solution: `function creerRelique(nom, valeur) {\n  return Object.freeze({ nom, valeur });\n}\n\nconst relique = creerRelique("Peau du Lion", 100);\nconsole.log(Object.isFrozen(relique));\nconsole.log(relique.nom, relique.valeur);`,
            tests: [{ expect: 'true\nPeau du Lion 100' }],
            must: [['Object\\.freeze', 'Utilise Object.freeze() pour verrouiller l\'objet.']],
            success: "La relique est désormais increvable : personne ne pourra plus jamais la modifier."
          }
        ]
      },

      {
        id: 'jh-2', title: "Travail II — L'Hydre de Lerne", kind: 'boss', xp: 95,
        goal: "Chaque tête coupée en fait repousser deux : simuler l'aggravation avant la victoire.",
        blocks: [
          { t: 'p', v: "Même combat qu'en Python, en JavaScript cette fois : à chaque coup, la tête la plus puissante est retirée ; si sa moitié entière est encore positive, deux nouvelles têtes de cette puissance repoussent." }
        ],
        ex: [
          {
            brief: "Écris <code>combattreHydre(tetes)</code> (un tableau de nombres, modifié sur place) qui renvoie le nombre de coups nécessaires pour vider complètement le tableau, en retirant à chaque coup la tête la plus forte (<code>Math.max(...tetes)</code>).",
            starter: 'function combattreHydre(tetes) {\n  let coups = 0;\n  while (tetes.length > 0) {\n    \n  }\n  return coups;\n}\n\nconsole.log(combattreHydre([4]));\nconsole.log(combattreHydre([1, 1]));\n',
            hint: "const max = Math.max(...tetes); trouve son index avec indexOf, retire-la avec splice, incrémente coups, et si Math.floor(max / 2) > 0 fais deux push.",
            solution: `function combattreHydre(tetes) {\n  let coups = 0;\n  while (tetes.length > 0) {\n    const max = Math.max(...tetes);\n    const idx = tetes.indexOf(max);\n    tetes.splice(idx, 1);\n    coups++;\n    const moitie = Math.floor(max / 2);\n    if (moitie > 0) {\n      tetes.push(moitie, moitie);\n    }\n  }\n  return coups;\n}\n\nconsole.log(combattreHydre([4]));\nconsole.log(combattreHydre([1, 1]));`,
            tests: [{ expect: '7\n2' }]
          }
        ]
      },

      {
        id: 'jh-3', title: "Travail III — La Biche de Cérynée", kind: 'boss', xp: 100,
        goal: "Une biche trop rapide pour être brusquée : implémenter le motif professionnel du debounce.",
        blocks: [
          { t: 'p', v: "On ne capture pas la Biche d'un geste brutal : il faut attendre qu'elle se stabilise. C'est exactement le rôle du <b>debounce</b>, l'un des motifs JavaScript les plus demandés en entretien : retarder l'exécution d'une fonction jusqu'à ce que les appels rapprochés s'arrêtent — utile pour une recherche en temps réel qui n'interroge le serveur qu'une fois que l'utilisateur a fini de taper." },
          { t: 'tip', h: "Le mécanisme", v: "À chaque appel, on annule le délai précédent avec <code>clearTimeout</code> et on en programme un nouveau avec <code>setTimeout</code>. Seul le tout dernier appel d'une rafale survit jusqu'au bout." }
        ],
        ex: [
          {
            brief: "Complète <code>debounce(fn, delai)</code> : elle renvoie une fonction qui, à chaque appel, annule le délai précédent puis en programme un nouveau ; <code>fn</code> ne doit s'exécuter qu'une fois le délai écoulé sans nouvel appel.",
            starter: 'function debounce(fn, delai) {\n  let minuteur;\n  return (...args) => {\n    \n  };\n}\n\nlet compteur = 0;\nconst alerte = debounce(() => {\n  compteur++;\n  console.log("Alerte declenchee, total :", compteur);\n}, 100);\n\nalerte();\nalerte();\nalerte();\nconsole.log("Appels rapides envoyes");\n',
            hint: "clearTimeout(minuteur); minuteur = setTimeout(() => fn(...args), delai);",
            solution: `function debounce(fn, delai) {\n  let minuteur;\n  return (...args) => {\n    clearTimeout(minuteur);\n    minuteur = setTimeout(() => fn(...args), delai);\n  };\n}\n\nlet compteur = 0;\nconst alerte = debounce(() => {\n  compteur++;\n  console.log("Alerte declenchee, total :", compteur);\n}, 100);\n\nalerte();\nalerte();\nalerte();\nconsole.log("Appels rapides envoyes");`,
            tests: [{ expect: 'Appels rapides envoyes\nAlerte declenchee, total : 1' }],
            must: [['clearTimeout', 'Annule le délai précédent avec clearTimeout.'], ['setTimeout', 'Programme un nouveau délai avec setTimeout.']],
            success: "Trois appels rapprochés, une seule exécution : c'est exactement le motif utilisé par toutes les barres de recherche du web."
          }
        ]
      },

      {
        id: 'jh-4', title: "Travail IV — Le Sanglier d'Érymanthe", kind: 'boss', xp: 100,
        goal: "Le capturer à intervalles réguliers, sans jamais le brusquer d'un coup répété.",
        blocks: [
          { t: 'p', v: "Contrairement au debounce, il faut ici agir <b>régulièrement</b> même si les tentatives sont incessantes : c'est le <b>throttle</b>, qui garantit qu'une fonction ne s'exécute au maximum qu'une fois par intervalle de temps, quel que soit le nombre d'appels." }
        ],
        ex: [
          {
            brief: "Complète <code>throttle(fn, intervalle)</code> : elle renvoie une fonction qui n'exécute <code>fn</code> que si au moins <code>intervalle</code> millisecondes se sont écoulées depuis le dernier appel accepté.",
            starter: 'function throttle(fn, intervalle) {\n  let dernierAppel = 0;\n  return (...args) => {\n    \n  };\n}\n\nlet compteur = 0;\nconst tirer = throttle(() => { compteur++; }, 1000);\ntirer();\ntirer();\ntirer();\nconsole.log(compteur);\n',
            hint: "const maintenant = Date.now(); if (maintenant - dernierAppel >= intervalle) { dernierAppel = maintenant; fn(...args); }",
            solution: `function throttle(fn, intervalle) {\n  let dernierAppel = 0;\n  return (...args) => {\n    const maintenant = Date.now();\n    if (maintenant - dernierAppel >= intervalle) {\n      dernierAppel = maintenant;\n      fn(...args);\n    }\n  };\n}\n\nlet compteur = 0;\nconst tirer = throttle(() => { compteur++; }, 1000);\ntirer();\ntirer();\ntirer();\nconsole.log(compteur);`,
            tests: [{ expect: '1' }],
            must: [['Date\\.now\\(\\)', 'Utilise Date.now() pour mesurer le temps écoulé.']],
            success: "Trois tentatives rapprochées, un seul tir accepté : le sanglier est maîtrisé sans excès."
          }
        ]
      },

      {
        id: 'jh-5', title: "Travail V — Les Écuries d'Augias", kind: 'boss', xp: 100,
        goal: "Nettoyer une immense liste en un seul passage, sans comparer chaque élément à tous les autres.",
        blocks: [
          { t: 'p', v: "Détourner deux rivières plutôt que porter des seaux : la structure de données <code>Set</code> fait le même détour. Elle élimine les doublons d'un tableau, quelle que soit sa taille, sans jamais comparer chaque élément à tous les autres." }
        ],
        ex: [
          {
            brief: "Écris <code>nettoyerEcuries(tas)</code> qui renvoie un tableau sans doublons, dans l'ordre de première apparition, en utilisant <code>Set</code>.",
            starter: 'function nettoyerEcuries(tas) {\n  \n}\n\nconsole.log(nettoyerEcuries([3, 3, 1, 2, 1, 4, 2, 3]));\n',
            hint: "return [...new Set(tas)];",
            solution: `function nettoyerEcuries(tas) {\n  return [...new Set(tas)];\n}\n\nconsole.log(nettoyerEcuries([3, 3, 1, 2, 1, 4, 2, 3]));`,
            tests: [{ expect: '[3, 1, 2, 4]' }],
            must: [['new Set', 'Utilise un Set pour éliminer les doublons efficacement.']]
          }
        ]
      },

      {
        id: 'jh-6', title: "Travail VI — Les Oiseaux du Lac Stymphale", kind: 'boss', xp: 105,
        goal: "Faire du bruit pour être entendu : construire ton propre système d'événements.",
        blocks: [
          { t: 'p', v: "Le crotale de bronze fait sortir les oiseaux d'un seul coup de bruit. C'est exactement le principe d'un <b>émetteur d'événements</b> : un objet central sur lequel on s'abonne (<code>on</code>), et qui prévient tous les abonnés d'un coup (<code>emit</code>) — le mécanisme derrière <code>addEventListener</code> lui-même." }
        ],
        ex: [
          {
            brief: "Complète la classe <code>Emetteur</code> : <code>on(evenement, fn)</code> enregistre une fonction pour un événement donné, <code>emit(evenement, donnee)</code> appelle toutes les fonctions enregistrées pour cet événement, dans l'ordre d'inscription, avec <code>donnee</code> en argument.",
            starter: 'class Emetteur {\n  constructor() {\n    this.ecouteurs = {};\n  }\n\n  on(evenement, fn) {\n    \n  }\n\n  emit(evenement, donnee) {\n    \n  }\n}\n\nconst cor = new Emetteur();\ncor.on("oiseaux", (nb) => console.log(nb + " oiseaux s\'envolent"));\ncor.on("oiseaux", () => console.log("Bruit de bronze entendu"));\ncor.emit("oiseaux", 12);\n',
            hint: "Dans on : si this.ecouteurs[evenement] n'existe pas, crée un tableau vide, puis push(fn). Dans emit : (this.ecouteurs[evenement] || []).forEach(fn => fn(donnee)).",
            solution: `class Emetteur {\n  constructor() {\n    this.ecouteurs = {};\n  }\n\n  on(evenement, fn) {\n    if (!this.ecouteurs[evenement]) this.ecouteurs[evenement] = [];\n    this.ecouteurs[evenement].push(fn);\n  }\n\n  emit(evenement, donnee) {\n    (this.ecouteurs[evenement] || []).forEach((fn) => fn(donnee));\n  }\n}\n\nconst cor = new Emetteur();\ncor.on("oiseaux", (nb) => console.log(nb + " oiseaux s'envolent"));\ncor.on("oiseaux", () => console.log("Bruit de bronze entendu"));\ncor.emit("oiseaux", 12);`,
            tests: [{ expect: "12 oiseaux s'envolent\nBruit de bronze entendu" }],
            success: "Deux abonnés, un seul signal : tu viens de reconstruire le mécanisme derrière addEventListener."
          }
        ]
      },

      {
        id: 'jh-7', title: "Travail VII — Le Taureau de Crète", kind: 'boss', xp: 105,
        goal: "Dompter un animal sauvage : modéliser ses états successifs avec une classe.",
        blocks: [
          { t: 'p', v: "Le Taureau de Crète passe par plusieurs états avant d'être dompté. C'est une <b>machine à états</b> : un objet dont le comportement change selon son état interne, une technique centrale dans les jeux comme dans les interfaces (un bouton \"inactif / en cours / termine\", par exemple)." }
        ],
        ex: [
          {
            brief: "Complète la classe <code>Taureau</code> : elle démarre à l'état <code>\"sauvage\"</code>. Chaque appel à <code>approcher()</code> fait avancer l'état d'un cran (<code>sauvage → agite → dompte</code>) et renvoie un message adapté ; une fois <code>\"dompte\"</code>, elle renvoie toujours <code>\"Le taureau est deja calme\"</code>.",
            starter: 'class Taureau {\n  constructor() {\n    this.etat = "sauvage";\n  }\n\n  approcher() {\n    \n  }\n}\n\nconst taureau = new Taureau();\nconsole.log(taureau.approcher());\nconsole.log(taureau.approcher());\nconsole.log(taureau.approcher());\nconsole.log(taureau.etat);\n',
            hint: 'if (this.etat === "sauvage") { this.etat = "agite"; return "..."; } if (this.etat === "agite") { this.etat = "dompte"; return "..."; } return "...";',
            solution: `class Taureau {\n  constructor() {\n    this.etat = "sauvage";\n  }\n\n  approcher() {\n    if (this.etat === "sauvage") {\n      this.etat = "agite";\n      return "Le taureau s'agite";\n    }\n    if (this.etat === "agite") {\n      this.etat = "dompte";\n      return "Le taureau est dompte !";\n    }\n    return "Le taureau est deja calme";\n  }\n}\n\nconst taureau = new Taureau();\nconsole.log(taureau.approcher());\nconsole.log(taureau.approcher());\nconsole.log(taureau.approcher());\nconsole.log(taureau.etat);`,
            tests: [{ expect: "Le taureau s'agite\nLe taureau est dompte !\nLe taureau est deja calme\ndompte" }]
          }
        ]
      },

      {
        id: 'jh-8', title: "Travail VIII — Les Juments de Diomède", kind: 'boss', xp: 110,
        goal: "Neutraliser une fonction dangereuse : envelopper un risque dans une protection réutilisable.",
        blocks: [
          { t: 'p', v: "Les juments de Diomède attaquent quiconque s'approche sans précaution. Une fonction risquée peut être neutralisée de la même façon : on l'enveloppe dans une fonction d'ordre supérieur qui capture ses erreurs, pour que le reste du programme continue de tourner en toute sécurité." }
        ],
        ex: [
          {
            brief: "Écris <code>neutraliser(fonctionRisquee)</code> qui renvoie une nouvelle fonction : elle appelle <code>fonctionRisquee</code> avec les arguments reçus dans un <code>try</code>, et si une erreur est levée, renvoie <code>\"Neutralisee : \" + erreur.message</code> au lieu de planter.",
            starter: 'function neutraliser(fonctionRisquee) {\n  return (...args) => {\n    \n  };\n}\n\nfunction nourrir(nom) {\n  if (nom === "sauvage") throw new Error("attaque !");\n  return nom + " est calme";\n}\n\nconst nourrirEnSecurite = neutraliser(nourrir);\nconsole.log(nourrirEnSecurite("Podarge"));\nconsole.log(nourrirEnSecurite("sauvage"));\n',
            hint: "try { return fonctionRisquee(...args); } catch (erreur) { return \"Neutralisee : \" + erreur.message; }",
            solution: `function neutraliser(fonctionRisquee) {\n  return (...args) => {\n    try {\n      return fonctionRisquee(...args);\n    } catch (erreur) {\n      return "Neutralisee : " + erreur.message;\n    }\n  };\n}\n\nfunction nourrir(nom) {\n  if (nom === "sauvage") throw new Error("attaque !");\n  return nom + " est calme";\n}\n\nconst nourrirEnSecurite = neutraliser(nourrir);\nconsole.log(nourrirEnSecurite("Podarge"));\nconsole.log(nourrirEnSecurite("sauvage"));`,
            tests: [{ expect: 'Podarge est calme\nNeutralisee : attaque !' }],
            success: "La fonction dangereuse ne peut plus rien casser : elle est enveloppée une fois pour toutes."
          }
        ]
      },

      {
        id: 'jh-9', title: "Travail IX — La Ceinture d'Hippolyte", kind: 'boss', xp: 110,
        goal: "Ne jamais refaire deux fois le même calcul coûteux : la mémoïsation.",
        blocks: [
          { t: 'p', v: "Hippolyte offre sa ceinture sans qu'on ait à se battre pour l'obtenir : parfois, le résultat est déjà là, il suffit d'aller le chercher. C'est le principe de la <b>mémoïsation</b> : garder en mémoire (dans une closure) le résultat d'un calcul déjà fait, pour ne jamais le refaire deux fois avec les mêmes arguments." }
        ],
        ex: [
          {
            brief: "Complète <code>memoiser(fn)</code> : elle renvoie une fonction qui garde un cache des résultats déjà calculés. Si <code>n</code> est déjà dans le cache, affiche <code>\"Depuis le cache :\", n</code> puis renvoie la valeur en cache ; sinon, calcule <code>fn(n)</code>, le stocke, et le renvoie.",
            starter: 'function memoiser(fn) {\n  const cache = {};\n  return (n) => {\n    \n  };\n}\n\nfunction calculLong(n) {\n  return n * n;\n}\n\nconst calculRapide = memoiser(calculLong);\nconsole.log(calculRapide(7));\nconsole.log(calculRapide(7));\nconsole.log(calculRapide(3));\n',
            hint: "if (n in cache) { console.log(\"Depuis le cache :\", n); return cache[n]; } const resultat = fn(n); cache[n] = resultat; return resultat;",
            solution: `function memoiser(fn) {\n  const cache = {};\n  return (n) => {\n    if (n in cache) {\n      console.log("Depuis le cache :", n);\n      return cache[n];\n    }\n    const resultat = fn(n);\n    cache[n] = resultat;\n    return resultat;\n  };\n}\n\nfunction calculLong(n) {\n  return n * n;\n}\n\nconst calculRapide = memoiser(calculLong);\nconsole.log(calculRapide(7));\nconsole.log(calculRapide(7));\nconsole.log(calculRapide(3));`,
            tests: [{ expect: '49\nDepuis le cache : 7\n49\n9' }],
            success: "Le deuxième calculRapide(7) n'a rien recalculé : c'est cette technique qui rend rapides les applications qui manipulent de grosses données."
          }
        ]
      },

      {
        id: 'jh-10', title: "Travail X — Les Bœufs de Géryon", kind: 'boss', xp: 115,
        goal: "Un long voyage en plusieurs étapes : composer des fonctions en une seule chaîne.",
        blocks: [
          { t: 'p', v: "Pour ramener les bœufs de Géryon, Hercule enchaîne les étapes une à une sur un très long trajet. En programmation fonctionnelle, <b>composer</b> des fonctions fait exactement ça : chaîner plusieurs transformations pour qu'une valeur passe de l'une à l'autre, dans l'ordre." }
        ],
        ex: [
          {
            brief: "Écris <code>composer(...fonctions)</code> qui renvoie une fonction prenant une <code>valeurInitiale</code> et lui appliquant chaque fonction du tableau <code>fonctions</code>, dans l'ordre, chacune recevant le résultat de la précédente.",
            starter: 'function composer(...fonctions) {\n  \n}\n\nconst ajouterPeage = (d) => d + 10;\nconst traverserFleuve = (d) => d + 25;\nconst trajetTotal = composer(ajouterPeage, traverserFleuve, ajouterPeage);\n\nconsole.log(trajetTotal(100));\n',
            hint: "return (valeurInitiale) => fonctions.reduce((valeur, fn) => fn(valeur), valeurInitiale);",
            solution: `function composer(...fonctions) {\n  return (valeurInitiale) => fonctions.reduce((valeur, fn) => fn(valeur), valeurInitiale);\n}\n\nconst ajouterPeage = (d) => d + 10;\nconst traverserFleuve = (d) => d + 25;\nconst trajetTotal = composer(ajouterPeage, traverserFleuve, ajouterPeage);\n\nconsole.log(trajetTotal(100));`,
            tests: [{ expect: '145' }],
            must: [['\\.reduce\\s*\\(', 'Utilise reduce pour enchaîner les fonctions.']],
            success: "100 -> 110 -> 135 -> 145 : trois étapes du voyage enchaînées en une seule fonction réutilisable."
          }
        ]
      },

      {
        id: 'jh-11', title: "Travail XI — Les Pommes des Hespérides", kind: 'boss', xp: 120,
        goal: "Un jardin bien gardé : orchestrer une série d'étapes asynchrones, sans jamais les emboîter.",
        blocks: [
          { t: 'p', v: "Franchir le jardin, endormir le dragon, cueillir les pommes : trois étapes qui doivent se suivre, chacune après que la précédente est terminée. Écrites à la main avec des callbacks imbriqués, ça devient vite illisible (le « callback hell » déjà rencontré). La solution professionnelle : une fonction générique <code>serie()</code> qui enchaîne n'importe quelle liste d'étapes sans jamais s'emboîter à la main." }
        ],
        ex: [
          {
            brief: "Complète <code>serie(etapes)</code> : elle exécute chaque étape du tableau <code>etapes</code> (chacune avec un <code>nom</code> et un <code>delai</code>) l'une après l'autre grâce à la fonction <code>etape</code> déjà fournie, et affiche <code>\"Toutes les pommes sont recoltees\"</code> une fois toutes les étapes terminées.",
            starter: 'function etape(nom, delai, suite) {\n  setTimeout(() => {\n    console.log(nom);\n    if (suite) suite();\n  }, delai);\n}\n\nfunction serie(etapes) {\n  function suivante(i) {\n    \n  }\n  suivante(0);\n}\n\nserie([\n  { nom: "Franchir le jardin", delai: 100 },\n  { nom: "Endormir le dragon", delai: 50 },\n  { nom: "Cueillir les pommes", delai: 30 }\n]);\n',
            hint: "if (i >= etapes.length) { console.log(\"Toutes les pommes sont recoltees\"); return; } etape(etapes[i].nom, etapes[i].delai, () => suivante(i + 1));",
            solution: `function etape(nom, delai, suite) {\n  setTimeout(() => {\n    console.log(nom);\n    if (suite) suite();\n  }, delai);\n}\n\nfunction serie(etapes) {\n  function suivante(i) {\n    if (i >= etapes.length) {\n      console.log("Toutes les pommes sont recoltees");\n      return;\n    }\n    etape(etapes[i].nom, etapes[i].delai, () => suivante(i + 1));\n  }\n  suivante(0);\n}\n\nserie([\n  { nom: "Franchir le jardin", delai: 100 },\n  { nom: "Endormir le dragon", delai: 50 },\n  { nom: "Cueillir les pommes", delai: 30 }\n]);`,
            tests: [{ expect: 'Franchir le jardin\nEndormir le dragon\nCueillir les pommes\nToutes les pommes sont recoltees' }],
            success: "Trois étapes enchaînées sans un seul niveau d'emboîtement supplémentaire : le motif exact derrière les Promises."
          }
        ]
      },

      {
        id: 'jh-12', title: "Travail XII — Cerbère", kind: 'boss', xp: 160,
        dom: `<div id="cerbere">\n  <button class="tete" data-nom="Garde">Tête 1</button>\n  <button class="tete" data-nom="Ombre">Tête 2</button>\n  <button class="tete" data-nom="Nuit">Tête 3</button>\n</div>\n<p id="dominant">Aucune tête ne domine</p>\n<p id="historique"></p>`,
        goal: "L'épreuve finale : un composant interactif complet au DOM, combinant sélection, état et évènements.",
        blocks: [
          { t: 'p', v: "Le dernier travail : ramener Cerbère, à mains nues, sans arme. Ce composant final réunit sélection du DOM, gestion d'état partagé et évènements — exactement ce que fait n'importe quel composant d'interface professionnel." }
        ],
        ex: [
          {
            dom: true,
            brief: "Attache un écouteur de clic à <b>chaque</b> bouton <code>.tete</code> (via <code>querySelectorAll</code> et <code>forEach</code>) : au clic, incrémente un compteur d'interventions, affiche <code>\"NOM domine\"</code> dans <code>#dominant</code> (le nom vient de <code>bouton.dataset.nom</code>), et affiche <code>\"N intervention(s)\"</code> dans <code>#historique</code>.",
            starter: 'const dominant = document.querySelector("#dominant");\nconst historique = document.querySelector("#historique");\nlet compte = 0;\n\ndocument.querySelectorAll(".tete").forEach((bouton) => {\n  \n});\n',
            hint: "bouton.addEventListener(\"click\", () => { compte++; dominant.textContent = bouton.dataset.nom + \" domine\"; historique.textContent = compte + \" intervention(s)\"; });",
            solution: `const dominant = document.querySelector("#dominant");\nconst historique = document.querySelector("#historique");\nlet compte = 0;\n\ndocument.querySelectorAll(".tete").forEach((bouton) => {\n  bouton.addEventListener("click", () => {\n    compte++;\n    dominant.textContent = bouton.dataset.nom + " domine";\n    historique.textContent = compte + " intervention(s)";\n  });\n});`,
            expectDom: [
              ['.tete:nth-child(1)', 'click', ''], ['#dominant', 'text', 'Garde domine'], ['#historique', 'text', '1 intervention(s)'],
              ['.tete:nth-child(2)', 'click', ''], ['#dominant', 'text', 'Ombre domine'], ['#historique', 'text', '2 intervention(s)'],
              ['.tete:nth-child(1)', 'click', ''], ['#dominant', 'text', 'Garde domine'], ['#historique', 'text', '3 intervention(s)']
            ],
            must: [['querySelectorAll', 'Utilise querySelectorAll pour sélectionner toutes les têtes.'],
                   ['addEventListener', 'Attache un écouteur de clic à chaque bouton.'],
                   ['forEach', 'Utilise forEach pour parcourir la liste des boutons.']],
            success: "LES 12 TRAVAUX SONT ACCOMPLIS. Closures, classes, motifs professionnels (debounce, throttle, mémoïsation, composition) et un composant DOM complet : il ne reste plus aucun secret entre toi et JavaScript."
          }
        ]
      }
    ]
  };
  PATH_PRO_JS.days.push(m);
})();
