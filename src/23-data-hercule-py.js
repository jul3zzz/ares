/* ARES ULTRA — Module final de la Forge du Serpent : « Les 12 Travaux d'Hercule ».
   Douze épreuves légendaires, chacune pensée pour occuper plusieurs jours de
   pratique réelle. On ajoute ce module en poussant un nouveau jour/module sur
   le parcours déjà défini, sans toucher au reste (convention du projet).      */
(function () {
  var m = {
    n: 9,
    title: "Les 12 Travaux d'Hercule",
    sub: "L'épreuve finale : douze défis légendaires, plusieurs semaines de travail",
    lessons: [

      {
        id: 'ph-1', title: "Travail I — Le Lion de Némée", kind: 'boss', xp: 90,
        goal: "Une peau qu'aucune lame ne perce : il faut trouver la faille plutôt que la force brute.",
        blocks: [
          { t: 'p', v: "Le Lion de Némée a une peau que rien ne transperce. Attaquer de front ne sert à rien : Hercule a dû chercher la faille exacte. En cryptographie, c'est la même histoire avec le <b>chiffrement de César</b> : chaque lettre d'un message est décalée d'un nombre fixe de positions dans l'alphabet. Sans connaître le décalage, le message semble increvable — mais il n'y a que 26 possibilités à essayer." },
          { t: 'code', run: true, v: `# Encoder : décaler chaque lettre vers l'avant\ndef chiffrer(message, decalage):\n    resultat = ""\n    for lettre in message:\n        if lettre == " ":\n            resultat += " "\n        else:\n            code = ord(lettre) - ord("a")\n            resultat += chr((code + decalage) % 26 + ord("a"))\n    return resultat\n\nprint(chiffrer("lion de nemee", 3))` },
          { t: 'tip', h: "La faille", v: "<code>ord(lettre)</code> donne le code numérique d'un caractère, <code>chr(n)</code> fait l'inverse. En soustrayant <code>ord(\"a\")</code>, on ramène chaque lettre à un nombre entre 0 et 25 — pratique pour décaler et revenir avec un simple modulo." }
        ],
        ex: [
          {
            brief: "Écris <code>dechiffrer(message, decalage)</code>, l'inverse de la fonction de chiffrement : elle décale chaque lettre <b>vers l'arrière</b> de <code>decalage</code> positions (les espaces restent inchangés).",
            starter: 'def dechiffrer(message, decalage):\n    \n\nprint(dechiffrer("olrq gh qhphh", 3))\n',
            hint: "Même principe que chiffrer, mais avec un moins : (code - decalage) % 26.",
            solution: `def dechiffrer(message, decalage):\n    resultat = ""\n    for lettre in message:\n        if lettre == " ":\n            resultat += " "\n        else:\n            code = ord(lettre) - ord("a")\n            resultat += chr((code - decalage) % 26 + ord("a"))\n    return resultat\n\nprint(dechiffrer("olrq gh qhphh", 3))`,
            tests: [{ expect: 'lion de nemee' }],
            success: "La peau du lion est percée. Premier trophée."
          }
        ]
      },

      {
        id: 'ph-2', title: "Travail II — L'Hydre de Lerne", kind: 'boss', xp: 95,
        goal: "Chaque tête coupée en fait repousser deux : simuler un problème qui s'aggrave avant de se résoudre.",
        blocks: [
          { t: 'p', v: "Chaque fois qu'Hercule tranche une tête de l'Hydre, deux repoussent — sauf si la tête était déjà trop faible pour se régénérer. C'est un excellent exercice de <b>simulation</b> : modéliser un état qui évolue selon une règle, jusqu'à ce qu'il se stabilise (ou pas)." },
          { t: 'p', v: "Règle du combat : à chaque coup, on retire la tête la plus puissante de la liste. Si sa puissance divisée par deux (entière) est encore positive, deux nouvelles têtes de cette puissance repoussent. Sinon, elle est cautérisée pour de bon." }
        ],
        ex: [
          {
            brief: "Écris <code>combattre_hydre(tetes)</code> qui renvoie le nombre de coups nécessaires pour vider complètement la liste des têtes, en appliquant la règle ci-dessus (retirer la plus forte à chaque coup, éventuellement en faire repousser deux).",
            starter: 'def combattre_hydre(tetes):\n    coups = 0\n    while tetes:\n        \n    return coups\n\nprint(combattre_hydre([4]))\nprint(combattre_hydre([1, 1]))\n',
            hint: "max(tetes) donne la plus forte, tetes.remove(...) la retire. Si tete // 2 > 0, ajoute deux fois cette valeur avec append.",
            solution: `def combattre_hydre(tetes):\n    coups = 0\n    while tetes:\n        plus_forte = max(tetes)\n        tetes.remove(plus_forte)\n        coups += 1\n        moitie = plus_forte // 2\n        if moitie > 0:\n            tetes.append(moitie)\n            tetes.append(moitie)\n    return coups\n\nprint(combattre_hydre([4]))\nprint(combattre_hydre([1, 1]))`,
            tests: [{ expect: '7\n2' }],
            success: "L'Hydre est vaincue : 7 coups pour une seule tête de départ, la régénération fait vite grimper l'addition."
          }
        ]
      },

      {
        id: 'ph-3', title: "Travail III — La Biche de Cérynée", kind: 'boss', xp: 95,
        goal: "Une biche plus rapide qu'aucun chasseur : simuler une poursuite qui converge.",
        blocks: [
          { t: 'p', v: "La Biche de Cérynée est trop rapide pour être rattrapée d'un coup — mais si le poursuivant avance un peu plus vite qu'elle à chaque tour, l'écart finit par se fermer. C'est un classique de simulation : deux positions qui évoluent à des vitesses différentes." }
        ],
        ex: [
          {
            brief: "Écris <code>rattrape_biche(pos_h, pos_b, vitesse_h, vitesse_b)</code> qui simule tour par tour l'avancée du chasseur et de la biche (chacun avance de sa vitesse à chaque tour) et renvoie le nombre de tours nécessaires pour que le chasseur rattrape ou dépasse la biche.",
            starter: 'def rattrape_biche(pos_h, pos_b, vitesse_h, vitesse_b):\n    tours = 0\n    while pos_h < pos_b:\n        \n    return tours\n\nprint(rattrape_biche(0, 50, 7, 4))\n',
            hint: "Dans la boucle : pos_h += vitesse_h, pos_b += vitesse_b, tours += 1.",
            solution: `def rattrape_biche(pos_h, pos_b, vitesse_h, vitesse_b):\n    tours = 0\n    while pos_h < pos_b:\n        pos_h += vitesse_h\n        pos_b += vitesse_b\n        tours += 1\n    return tours\n\nprint(rattrape_biche(0, 50, 7, 4))`,
            tests: [{ expect: '17' }],
            success: "17 tours pour combler 50 mètres d'écart : la vitesse relative (7-4=3 par tour) fait toute la différence."
          }
        ]
      },

      {
        id: 'ph-4', title: "Travail IV — Le Sanglier d'Érymanthe", kind: 'boss', xp: 105,
        goal: "Le traquer dans un labyrinthe sans le tuer : ton premier vrai algorithme de parcours de graphe.",
        blocks: [
          { t: 'p', v: "Il faut capturer le Sanglier vivant dans un terrain semé de pièges. Le bon outil : le <b>parcours en largeur</b> (BFS), l'algorithme qui trouve le plus court chemin dans une grille en explorant case par case, par cercles concentriques." },
          { t: 'code', run: true, v: `def voisins(l, c, grille):\n    resultat = []\n    for dl, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n        nl, nc = l + dl, c + dc\n        if 0 <= nl < len(grille) and 0 <= nc < len(grille[0]):\n            if grille[nl][nc] == 0:\n                resultat.append((nl, nc))\n    return resultat\n\nprint(voisins(0, 0, [[0, 0], [1, 0]]))` },
          { t: 'tip', h: "La file d'attente", v: "Sans <code>deque</code> en Python de base, une liste normale fait très bien le travail : <code>file.append(x)</code> ajoute à la fin, <code>file.pop(0)</code> retire le premier. C'est exactement le comportement d'une file (FIFO), le cœur du parcours en largeur." }
        ],
        ex: [
          {
            brief: "Complète <code>distance_min(grille, depart, arrivee)</code> par un parcours en largeur (BFS) : elle renvoie le nombre minimal de déplacements pour aller de <code>depart</code> à <code>arrivee</code> dans la grille (0 = libre, 1 = mur), en se déplaçant seulement haut/bas/gauche/droite.",
            starter: 'def distance_min(grille, depart, arrivee):\n    lignes = len(grille)\n    colonnes = len(grille[0])\n    visites = [[False for c in range(colonnes)] for l in range(lignes)]\n    file = [(depart[0], depart[1], 0)]\n    visites[depart[0]][depart[1]] = True\n    while file:\n        l, c, d = file.pop(0)\n        if (l, c) == arrivee:\n            return d\n        \n    return -1\n\ngrille = [\n    [0, 0, 1, 0],\n    [1, 0, 1, 0],\n    [0, 0, 0, 0],\n    [0, 1, 1, 0]\n]\nprint(distance_min(grille, (0, 0), (3, 3)))\nprint(distance_min(grille, (0, 0), (0, 0)))\n',
            hint: "Pour chaque direction (dl, dc) dans [(-1,0),(1,0),(0,-1),(0,1)] : calcule nl, nc, vérifie qu'ils sont dans la grille, non visités et libres (0), puis marque-les visités et ajoute (nl, nc, d + 1) à la file.",
            solution: `def distance_min(grille, depart, arrivee):\n    lignes = len(grille)\n    colonnes = len(grille[0])\n    visites = [[False for c in range(colonnes)] for l in range(lignes)]\n    file = [(depart[0], depart[1], 0)]\n    visites[depart[0]][depart[1]] = True\n    while file:\n        l, c, d = file.pop(0)\n        if (l, c) == arrivee:\n            return d\n        for dl, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n            nl, nc = l + dl, c + dc\n            if 0 <= nl < lignes and 0 <= nc < colonnes and not visites[nl][nc] and grille[nl][nc] == 0:\n                visites[nl][nc] = True\n                file.append((nl, nc, d + 1))\n    return -1\n\ngrille = [\n    [0, 0, 1, 0],\n    [1, 0, 1, 0],\n    [0, 0, 0, 0],\n    [0, 1, 1, 0]\n]\nprint(distance_min(grille, (0, 0), (3, 3)))\nprint(distance_min(grille, (0, 0), (0, 0)))`,
            tests: [{ expect: '6\n0' }],
            success: "Un vrai algorithme de parcours de graphe, celui qui alimente les GPS et les cases atteignables d'un jeu de plateau."
          }
        ]
      },

      {
        id: 'ph-5', title: "Travail V — Les Écuries d'Augias", kind: 'boss', xp: 100,
        goal: "Trente ans de fumier à nettoyer en un jour : détourner deux rivières plutôt que porter des seaux.",
        blocks: [
          { t: 'p', v: "Hercule ne nettoie pas les écuries seau par seau : il détourne deux rivières pour que le courant fasse le travail. En algorithmique, c'est la différence entre une solution en <code>O(n²)</code> (deux boucles imbriquées, qui écroule tout sur de grandes données) et une solution en <code>O(n)</code> (un seul passage, avec une structure de données bien choisie)." },
          { t: 'p', v: "Le problème classique : trouver deux nombres d'une liste dont la somme vaut une valeur cible. La version naïve compare chaque paire (deux boucles). La version rapide garde en mémoire ce qu'on a déjà vu." }
        ],
        ex: [
          {
            brief: "Écris <code>deux_piles(quantites, cible)</code> qui renvoie un tuple des deux valeurs dont la somme vaut <code>cible</code> (ou <code>None</code> si aucune paire ne convient), en parcourant la liste <b>une seule fois</b> grâce à une liste des valeurs déjà vues.",
            starter: 'def deux_piles(quantites, cible):\n    vus = []\n    for q in quantites:\n        \n    return None\n\nprint(deux_piles([8, 3, 5, 13, 2, 9], 11))\nprint(deux_piles([1, 2, 4], 100))\n',
            hint: "Pour chaque q, calcule complement = cible - q. S'il est déjà dans vus, renvoie (complement, q). Sinon, ajoute q à vus.",
            solution: `def deux_piles(quantites, cible):\n    vus = []\n    for q in quantites:\n        complement = cible - q\n        if complement in vus:\n            return (complement, q)\n        vus.append(q)\n    return None\n\nprint(deux_piles([8, 3, 5, 13, 2, 9], 11))\nprint(deux_piles([1, 2, 4], 100))`,
            tests: [{ expect: '(8, 3)\nNone' }],
            success: "Les écuries sont propres en un seul passage : c'est exactement la technique qui évite qu'un programme mette une heure au lieu d'une seconde sur un million de lignes."
          }
        ]
      },

      {
        id: 'ph-6', title: "Travail VI — Les Oiseaux du Lac Stymphale", kind: 'boss', xp: 100,
        goal: "Des oiseaux cachés dans le feuillage : les faire sortir du bruit avec le bon filtre.",
        blocks: [
          { t: 'p', v: "Les oiseaux du lac Stymphale se cachent dans une forêt si dense qu'on ne les voit pas. Hercule utilise un objet bruyant (le crotale de bronze d'Athéna) pour les faire s'envoler d'un coup. En traitement de données, c'est le rôle du <b>filtre</b> : isoler ce qui compte dans un tas d'informations mélangées." }
        ],
        ex: [
          {
            brief: "Écris <code>trouver_oiseaux(bruit)</code> qui reçoit une liste de mots, et renvoie — triée par ordre alphabétique — la liste des mots entièrement en MAJUSCULES (les vrais oiseaux, qui « font du bruit » au milieu du feuillage silencieux).",
            starter: 'def trouver_oiseaux(bruit):\n    \n\nprint(trouver_oiseaux(["foret", "AIGLE", "vent", "GRUE", "riviere", "CORBEAU"]))\n',
            hint: "Une compréhension de liste avec mot.isupper(), puis sorted(...) sur le résultat.",
            solution: `def trouver_oiseaux(bruit):\n    oiseaux = [mot for mot in bruit if mot.isupper()]\n    return sorted(oiseaux)\n\nprint(trouver_oiseaux(["foret", "AIGLE", "vent", "GRUE", "riviere", "CORBEAU"]))`,
            tests: [{ expect: "['AIGLE', 'CORBEAU', 'GRUE']" }],
            success: "Trois oiseaux repérés au milieu du bruit — filter et sorted enchaînés, le duo qui nettoie n'importe quel jeu de données."
          }
        ]
      },

      {
        id: 'ph-7', title: "Travail VII — Le Taureau de Crète", kind: 'boss', xp: 105,
        goal: "Un animal sauvage qu'il faut dompter progressivement : modéliser un état qui évolue avec une classe.",
        blocks: [
          { t: 'p', v: "Le Taureau de Crète ne se capture pas d'un coup : il faut l'affaiblir progressivement, coup après coup, jusqu'à ce qu'il cède. C'est un travail parfait pour une classe : un objet qui garde en mémoire son propre état (sa résistance) entre les appels." }
        ],
        ex: [
          {
            brief: "Complète la classe <code>Taureau</code> : <code>__init__(self, resistance)</code> initialise la résistance et un drapeau <code>capture</code> à <code>False</code>. <code>tenter(self, force)</code> retire <code>force</code> à la résistance ; si elle tombe à 0 ou moins, passe <code>capture</code> à <code>True</code> et renvoie <code>\"Capture !\"</code> ; sinon renvoie <code>f\"Il resiste encore ({resistance})\"</code> ; si déjà capturé, renvoie <code>\"Deja capture\"</code> sans rien changer.",
            starter: 'class Taureau:\n    def __init__(self, resistance):\n        \n\n    def tenter(self, force):\n        \n\ntaureau = Taureau(20)\nprint(taureau.tenter(7))\nprint(taureau.tenter(7))\nprint(taureau.tenter(7))\n',
            hint: "self.resistance -= force, puis un if pour tester si elle est descendue a 0 ou moins.",
            solution: `class Taureau:\n    def __init__(self, resistance):\n        self.resistance = resistance\n        self.capture = False\n\n    def tenter(self, force):\n        if self.capture:\n            return "Deja capture"\n        self.resistance -= force\n        if self.resistance <= 0:\n            self.capture = True\n            return "Capture !"\n        return f"Il resiste encore ({self.resistance})"\n\ntaureau = Taureau(20)\nprint(taureau.tenter(7))\nprint(taureau.tenter(7))\nprint(taureau.tenter(7))`,
            tests: [{ expect: 'Il resiste encore (13)\nIl resiste encore (6)\nCapture !' }],
            success: "Un objet qui se souvient de son propre état d'un appel à l'autre : c'est la base de tous les personnages de jeu vidéo."
          }
        ]
      },

      {
        id: 'ph-8', title: "Travail VIII — Les Juments de Diomède", kind: 'boss', xp: 105,
        goal: "Des chevaux mangeurs d'hommes : un programme qui ne doit jamais planter, même face au danger.",
        blocks: [
          { t: 'p', v: "Les juments de Diomède dévorent quiconque les approche mal préparé. Un programme professionnel doit pareillement survivre à une entrée dangereuse : au lieu de planter, il capture le problème et continue." }
        ],
        ex: [
          {
            brief: "Écris <code>nourrir(jument, nourriture)</code> qui lève un <code>ValueError(f\"{jument} a faim de viande !\")</code> si la nourriture n'est pas <code>\"viande\"</code>, sinon renvoie <code>f\"{jument} mange tranquillement\"</code>. Puis écris <code>nourrir_toutes(juments, nourritures)</code> qui essaie de nourrir chaque jument (listes de même longueur) et renvoie la liste des résultats, en capturant l'erreur pour chaque jument problématique (message de l'erreur récupéré avec <code>str(e)</code>) sans jamais arrêter le programme.",
            starter: 'def nourrir(jument, nourriture):\n    \n\ndef nourrir_toutes(juments, nourritures):\n    resultats = []\n    for i in range(len(juments)):\n        \n    return resultats\n\njuments = ["Podarge", "Lampon", "Xanthos", "Deinos"]\nnourritures = ["viande", "foin", "viande", "herbe"]\nprint(nourrir_toutes(juments, nourritures))\n',
            hint: "Dans nourrir_toutes : try: resultats.append(nourrir(...)) sauf ValueError as e: resultats.append(str(e)).",
            solution: `def nourrir(jument, nourriture):\n    if nourriture != "viande":\n        raise ValueError(f"{jument} a faim de viande !")\n    return f"{jument} mange tranquillement"\n\ndef nourrir_toutes(juments, nourritures):\n    resultats = []\n    for i in range(len(juments)):\n        try:\n            resultats.append(nourrir(juments[i], nourritures[i]))\n        except ValueError as e:\n            resultats.append(str(e))\n    return resultats\n\njuments = ["Podarge", "Lampon", "Xanthos", "Deinos"]\nnourritures = ["viande", "foin", "viande", "herbe"]\nprint(nourrir_toutes(juments, nourritures))`,
            tests: [{ expect: "['Podarge mange tranquillement', 'Lampon a faim de viande !', 'Xanthos mange tranquillement', 'Deinos a faim de viande !']" }],
            success: "Quatre juments, deux dangereuses — et le programme n'a jamais planté. C'est exactement ce qu'on attend d'un vrai logiciel."
          }
        ]
      },

      {
        id: 'ph-9', title: "Travail IX — La Ceinture d'Hippolyte", kind: 'boss', xp: 100,
        goal: "Une rumeur semée par Héra fait tout dégénérer : corriger un texte empoisonné.",
        blocks: [
          { t: 'p', v: "Héra répand une fausse rumeur parmi les Amazones, et la mission tourne au combat par malentendu. Le traitement de texte peut réparer ce genre de dégât : repérer un mot fautif et le remplacer partout, en sachant exactement combien de fois il est intervenu." }
        ],
        ex: [
          {
            brief: "Écris <code>corriger_rumeur(message, faux_mot, vrai_mot)</code> qui renvoie un tuple : le message corrigé (toutes les occurrences de <code>faux_mot</code> remplacées par <code>vrai_mot</code>), et le nombre de corrections effectuées.",
            starter: 'def corriger_rumeur(message, faux_mot, vrai_mot):\n    \n\nmessage = "Hercule veut voler la ceinture, Hercule est un voleur"\nprint(corriger_rumeur(message, "voleur", "ami"))\n',
            hint: "message.count(faux_mot) pour compter, message.replace(faux_mot, vrai_mot) pour corriger, puis renvoie les deux dans un tuple.",
            solution: `def corriger_rumeur(message, faux_mot, vrai_mot):\n    nombre = message.count(faux_mot)\n    corrige = message.replace(faux_mot, vrai_mot)\n    return corrige, nombre\n\nmessage = "Hercule veut voler la ceinture, Hercule est un voleur"\nprint(corriger_rumeur(message, "voleur", "ami"))`,
            tests: [{ expect: "('Hercule veut voler la ceinture, Hercule est un ami', 1)" }],
            success: "La rumeur est corrigée, et on sait exactement combien de fois elle avait infecté le message."
          }
        ]
      },

      {
        id: 'ph-10', title: "Travail X — Les Bœufs de Géryon", kind: 'boss', xp: 110,
        goal: "Un voyage jusqu'au bout du monde pour ramener un troupeau : additionner les étapes d'un itinéraire.",
        blocks: [
          { t: 'p', v: "Pour voler les bœufs du géant Géryon, Hercule traverse tout le monde connu, étape après étape. Un itinéraire, ce n'est jamais qu'une liste d'étapes et une table de distances entre elles — exactement ce que modélise un dictionnaire." }
        ],
        ex: [
          {
            brief: "Écris <code>longueur_voyage(itineraire, distances)</code> qui additionne la distance de chaque étape à la suivante, en cherchant chaque segment dans le dictionnaire <code>distances</code> avec une clé du type <code>\"Ville1-Ville2\"</code>.",
            starter: 'def longueur_voyage(itineraire, distances):\n    total = 0\n    for i in range(len(itineraire) - 1):\n        \n    return total\n\ndistances = {"Erythie-Iberie": 120, "Iberie-Gaule": 340, "Gaule-Italie": 210, "Italie-Grece": 560}\nitineraire = ["Erythie", "Iberie", "Gaule", "Italie", "Grece"]\nprint(longueur_voyage(itineraire, distances))\n',
            hint: 'Construis la clé avec une f-string : f"{itineraire[i]}-{itineraire[i + 1]}", puis ajoute distances[cle] au total.',
            solution: `def longueur_voyage(itineraire, distances):\n    total = 0\n    for i in range(len(itineraire) - 1):\n        etape = f"{itineraire[i]}-{itineraire[i + 1]}"\n        total += distances[etape]\n    return total\n\ndistances = {"Erythie-Iberie": 120, "Iberie-Gaule": 340, "Gaule-Italie": 210, "Italie-Grece": 560}\nitineraire = ["Erythie", "Iberie", "Gaule", "Italie", "Grece"]\nprint(longueur_voyage(itineraire, distances))`,
            tests: [{ expect: '1230' }],
            success: "1230 kilomètres jusqu'au bout du monde et retour — additionnés en quatre lignes de code."
          }
        ]
      },

      {
        id: 'ph-11', title: "Travail XI — Les Pommes des Hespérides", kind: 'boss', xp: 115,
        goal: "Le jardin est bien trop gardé : déléguer la corvée à Atlas plutôt que de tout faire soi-même.",
        blocks: [
          { t: 'p', v: "Pour cueillir les pommes d'or, Hercule ruse : il tient le ciel à la place d'Atlas le temps que celui-ci aille chercher les pommes. C'est le principe même d'une <b>fonction d'ordre supérieur</b> : une fonction qui en reçoit une autre en paramètre pour lui déléguer une partie du travail." }
        ],
        ex: [
          {
            brief: "Écris <code>avec_assistance(tache_principale, assistance)</code> qui appelle d'abord <code>assistance()</code>, puis <code>tache_principale()</code>, et renvoie un tuple <code>(resultat_assistance, resultat_tache)</code> dans cet ordre.",
            starter: 'def porter_ciel():\n    return "Atlas tient le ciel"\n\ndef recolter():\n    return "3 pommes en or recoltees"\n\ndef avec_assistance(tache_principale, assistance):\n    \n\nprint(avec_assistance(recolter, porter_ciel))\n',
            hint: "message = assistance() ; resultat = tache_principale() ; return message, resultat",
            solution: `def porter_ciel():\n    return "Atlas tient le ciel"\n\ndef recolter():\n    return "3 pommes en or recoltees"\n\ndef avec_assistance(tache_principale, assistance):\n    message = assistance()\n    resultat = tache_principale()\n    return message, resultat\n\nprint(avec_assistance(recolter, porter_ciel))`,
            tests: [{ expect: "('Atlas tient le ciel', '3 pommes en or recoltees')" }],
            success: "Les pommes sont cueillies sans jamais porter le ciel soi-même : déléguer à la bonne fonction, c'est la moitié de la programmation avancée."
          }
        ]
      },

      {
        id: 'ph-12', title: "Travail XII — Cerbère", kind: 'boss', xp: 150,
        goal: "L'épreuve finale : dompter le chien à trois têtes à mains nues, sans arme ni magie.",
        blocks: [
          { t: 'p', v: "Le dernier travail : ramener Cerbère vivant, à mains nues, sans arme. C'est le résumé parfait de ce module — une classe pour modéliser l'état des trois têtes, et de la récursivité pour répéter l'effort jusqu'au succès." },
          { t: 'p', v: "Cerbère a trois têtes, chacune avec un niveau de colère. Chaque tentative calme un peu les trois têtes à la fois. On recommence tant qu'aucune tête n'est calmée, jusqu'à un nombre maximal de tentatives." }
        ],
        ex: [
          {
            brief: "La classe <code>Cerbere</code> est déjà écrite. Complète <code>dompter(cerbere, tentatives_max)</code> par récursivité : si <code>cerbere.est_calme()</code>, renvoie <code>True</code> ; si <code>tentatives_max</code> est épuisé, renvoie <code>False</code> ; sinon, calme les trois têtes (indices 0, 1, 2) puis rappelle <code>dompter</code> avec une tentative de moins.",
            starter: 'class Cerbere:\n    def __init__(self):\n        self.tetes = [10, 10, 10]\n\n    def calmer(self, index):\n        if self.tetes[index] <= 0:\n            return\n        self.tetes[index] -= 5\n\n    def est_calme(self):\n        return all(t <= 0 for t in self.tetes)\n\n\ndef dompter(cerbere, tentatives_max):\n    \n\nc = Cerbere()\nresultat = dompter(c, 5)\nprint(resultat)\nprint(c.tetes)\n',
            hint: "if cerbere.est_calme(): return True — if tentatives_max <= 0: return False — sinon boucle for i in range(3): cerbere.calmer(i), puis return dompter(cerbere, tentatives_max - 1).",
            solution: `class Cerbere:\n    def __init__(self):\n        self.tetes = [10, 10, 10]\n\n    def calmer(self, index):\n        if self.tetes[index] <= 0:\n            return\n        self.tetes[index] -= 5\n\n    def est_calme(self):\n        return all(t <= 0 for t in self.tetes)\n\n\ndef dompter(cerbere, tentatives_max):\n    if cerbere.est_calme():\n        return True\n    if tentatives_max <= 0:\n        return False\n    for i in range(3):\n        cerbere.calmer(i)\n    return dompter(cerbere, tentatives_max - 1)\n\nc = Cerbere()\nresultat = dompter(c, 5)\nprint(resultat)\nprint(c.tetes)`,
            tests: [{ expect: 'True\n[0, 0, 0]' }],
            success: "LES 12 TRAVAUX SONT ACCOMPLIS. Chiffrement, simulation, parcours de graphe, optimisation, classes, exceptions, fonctions d'ordre supérieur et récursivité — il ne reste plus aucun secret entre toi et Python."
          }
        ]
      }
    ]
  };
  PATH_PRO_PYTHON.days.push(m);
})();
