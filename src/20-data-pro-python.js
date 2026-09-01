/* ARES ULTRA — « La Forge du Serpent » : Python niveau professionnel */
var PATH_PRO_PYTHON = {
  id: 'pro-python', lang: 'python', name: 'PYTHON ULTRA', glyph: 'la forge du serpent',
  tag: 'ULTRA · 9 modules', color: '#4FBFB4', pro: true,
  title: 'La Forge du Serpent',
  blurb: "Le passage de « je connais les bases » à « je construis des programmes que les gens utilisent ». Objets, robustesse, algorithmes et trois projets complets.",
  chips: ['9 modules', '4 projets guidés', 'Niveau lycée / début supérieur'],
  promise: "Tu sais déjà parler Python. Ici tu apprends a l'architecturer : découper, protéger, modéliser, optimiser — et livrer trois vrais logiciels.",
  days: [
    /* ---------------- MODULE 1 ---------------- */
    {
      n: 1, title: 'Fonctions professionnelles', sub: 'Portee, arguments, decoupage, documentation',
      lessons: [
        {
          id: 'pp-1-1', title: 'La portee des variables', kind: 'lecon', xp: 30,
          goal: 'Comprendre ou vit une variable, et pourquoi ton code plante « alors que la variable existe ».',
          blocks: [
            { t: 'p', v: "Chaque fonction possède son propre espace de noms. Une variable créée dedans <b>n'existe pas dehors</b>. C'est la source d'erreur numéro 1 des debutants intermediaires." },
            { t: 'code', run: true, err: true, v: `def compter():\n    total = 10        # variable LOCALE\n    print(total)\n\ncompter()\nprint(total)          # NameError : total n'existe pas ici` },
            { t: 'analogy', v: "<b>L'image à retenir :</b> une fonction est un atelier ferme. Les outils poses sur son etabli (variables locales) disparaissent quand l'atelier ferme. Pour sortir quelque chose, il faut le faire passer par la porte : c'est <code>return</code>." },
            { t: 'h', v: 'Lire oui, écrire non' },
            { t: 'code', run: true, v: `message = "global"\n\ndef lire():\n    print(message)      # OK : on peut LIRE une variable globale\n\ndef ecrire():\n    message = "local"   # cree une NOUVELLE variable locale\n    print(message)\n\nlire()\necrire()\nprint(message)          # inchange !` },
            { t: 'warn', h: 'global : a éviter', v: "Le mot-clé <code>global</code> permet de modifier une variable globale depuis une fonction. Dans du code professionnel, on l'évite presque toujours : il rend le programme imprevisible. Prefere <b>passer en paramètre et renvoyer</b>." },
            { t: 'code', run: true, v: `# Mauvais : dependance cachee\nscore = 0\ndef ajouter_mauvais():\n    global score\n    score += 10\n\n# Bon : entree explicite, sortie explicite\ndef ajouter_bon(score, points):\n    return score + points\n\nscore = ajouter_bon(score, 10)\nprint(score)` },
            { t: 'key', h: 'A retenir', v: "Une variable locale meurt à la fin de la fonction · on peut lire une globale, pas la modifier sans global · une fonction pure prend des paramètres et renvoie un resultat." }
          ],
          ex: [
            {
              brief: "Corrige la fonction pour qu'elle fonctionne <b>sans</b> variable globale : <code>appliquer_degats</code> doit recevoir la vie et les dégâts, et renvoyer la nouvelle vie. Sortie attendue : <code>70</code> puis <code>55</code>.",
              starter: 'def appliquer_degats(vie, degats):\n    \n\nvie = 100\nvie = appliquer_degats(vie, 30)\nprint(vie)\nvie = appliquer_degats(vie, 15)\nprint(vie)\n',
              hint: 'return vie - degats',
              solution: `def appliquer_degats(vie, degats):\n    return vie - degats\n\nvie = 100\nvie = appliquer_degats(vie, 30)\nprint(vie)\nvie = appliquer_degats(vie, 15)\nprint(vie)`,
              tests: [{ expect: '70\n55' }],
              mustnot: [['global', 'Justement : on veut se passer du mot-cle global.']]
            }
          ],
          quiz: [
            { q: 'Une variable créée dans une fonction est visible...', opts: ['Partout', 'Uniquement dans cette fonction', 'Dans les fonctions appelees ensuite'], a: 1, why: 'Elle est locale : elle disparait dès que la fonction se termine.' },
            { q: 'Pourquoi éviter global ?', opts: ['C\'est plus lent', 'Ça crée des dépendances cachees et des bugs difficiles', 'C\'est interdit par Python'], a: 1, why: 'N\'importe quelle fonction peut alors modifier l\'état : on ne sait plus qui casse quoi.' }
          ]
        },
        {
          id: 'pp-1-2', title: 'Arguments avances et documentation', kind: 'lecon', xp: 30,
          goal: 'Écrire des fonctions souples et lisibles par une autre personne.',
          blocks: [
            { t: 'h', v: 'Valeurs par défaut et arguments nommes' },
            { t: 'code', run: true, v: `def creer_joueur(pseudo, vie=100, niveau=1):\n    return {"pseudo": pseudo, "vie": vie, "niveau": niveau}\n\nprint(creer_joueur("Nova"))\nprint(creer_joueur("Kaz", niveau=5))\nprint(creer_joueur("Mia", vie=50, niveau=3))` },
            { t: 'tip', h: 'Les arguments nommes documentent', v: "<code>dessiner(True, False, True)</code> est illisible. <code>dessiner(grille=True, axes=False, legende=True)</code> se comprend sans documentation." },
            { t: 'h', v: 'Un nombre variable d\'arguments' },
            { t: 'code', run: true, v: `def total(*nombres):\n    somme = 0\n    for n in nombres:\n        somme += n\n    return somme\n\nprint(total(1, 2))\nprint(total(1, 2, 3, 4, 5))` },
            { t: 'h', v: 'La docstring' },
            { t: 'p', v: "Une chaîne placee en première ligne d'une fonction devient sa documentation officielle. Tous les projets sérieux en ont." },
            { t: 'code', run: true, v: `def moyenne(notes):\n    """Renvoie la moyenne d'une liste de nombres.\n\n    notes : liste de nombres (non vide)\n    retour : float\n    """\n    return sum(notes) / len(notes)\n\nprint(moyenne([10, 20]))` },
            { t: 'warn', h: 'Le piège mortel du défaut mutable', v: "N'écris <b>jamais</b> <code>def f(liste=[])</code>. La liste par défaut est créée une seule fois et se souvient de tout entre les appels. Utilise <code>def f(liste=None)</code> puis <code>if liste is None: liste = []</code>." },
            { t: 'key', h: 'A retenir', v: "defaut = souplesse · arguments nommes = lisibilité · *args = nombre libre · docstring = contrat · jamais de liste en valeur par defaut." }
          ],
          ex: [
            {
              brief: "Écris <code>saluer(nom, titre=\"Recrue\")</code> qui renvoie <code>Titre Nom</code>. Les appels de test sont donnes.",
              starter: 'def saluer(nom, titre="Recrue"):\n    \n\nprint(saluer("Nova"))\nprint(saluer("Kaz", "Champion"))\nprint(saluer("Mia", titre="Legende"))\n',
              hint: 'return f"{titre} {nom}"',
              solution: `def saluer(nom, titre="Recrue"):\n    return f"{titre} {nom}"\n\nprint(saluer("Nova"))\nprint(saluer("Kaz", "Champion"))\nprint(saluer("Mia", titre="Legende"))`,
              tests: [{ expect: 'Recrue Nova\nChampion Kaz\nLegende Mia' }]
            },
            {
              brief: "Écris <code>statistiques(*valeurs)</code> qui renvoie un tuple (minimum, maximum, moyenne arrondie à 1 décimale). Les appels sont donnes.",
              starter: 'def statistiques(*valeurs):\n    \n\nprint(statistiques(4, 8, 15))\nprint(statistiques(10, 20))\n',
              hint: 'return min(valeurs), max(valeurs), round(sum(valeurs) / len(valeurs), 1)',
              solution: `def statistiques(*valeurs):\n    return min(valeurs), max(valeurs), round(sum(valeurs) / len(valeurs), 1)\n\nprint(statistiques(4, 8, 15))\nprint(statistiques(10, 20))`,
              tests: [{ expect: '(4, 15, 9.0)\n(10, 20, 15.0)' }]
            }
          ],
          quiz: [
            { q: 'Que fait *nombres dans def total(*nombres) ?', opts: ['Multiplie les arguments', 'Regroupe tous les arguments dans un tuple', 'Rend la fonction plus rapide'], a: 1, why: 'L\'étoile collecte un nombre libre d\'arguments positionnels.' },
            { q: 'Pourquoi def f(l=[]) est-il dangereux ?', opts: ['C\'est une erreur de syntaxe', 'La liste est partagee entre tous les appels', 'Python la recree à chaque fois'], a: 1, why: 'Elle est créée une fois à la définition et conserve les modifications.' }
          ]
        },
        {
          id: 'pp-1-3', title: 'Decouper un problème', kind: 'lecon', xp: 35,
          goal: 'La competence qui sépare un debutant d\'un développeur : transformer un gros problème en petites fonctions.',
          blocks: [
            { t: 'p', v: "Un programme de 200 lignes d'affilee est impossible à corriger. Un programme de 10 fonctions de 20 lignes se corrige fonction par fonction." },
            { t: 'h', v: 'La règle : une fonction = une phrase' },
            { t: 'p', v: "Si tu ne peux pas decrire ta fonction en une phrase sans « et », elle en fait trop." },
            { t: 'code', run: true, v: `# AVANT : une fonction qui fait tout\ndef traiter(notes):\n    total = 0\n    for n in notes:\n        total += n\n    moy = total / len(notes)\n    if moy >= 10:\n        mention = "Admis"\n    else:\n        mention = "Recale"\n    print(f"Moyenne {moy:.2f} - {mention}")\n\ntraiter([12, 15, 8])` },
            { t: 'code', run: true, v: `# APRES : trois fonctions testables separement\ndef calculer_moyenne(notes):\n    return sum(notes) / len(notes)\n\ndef mention(moyenne):\n    return "Admis" if moyenne >= 10 else "Recale"\n\ndef afficher_bulletin(notes):\n    m = calculer_moyenne(notes)\n    print(f"Moyenne {m:.2f} - {mention(m)}")\n\nafficher_bulletin([12, 15, 8])` },
            { t: 'p', v: "La deuxieme version est plus longue... et infiniment meilleure : <code>calculer_moyenne</code> est réutilisable partout, et si la mention change, une seule fonction bouge." },
            { t: 'tip', h: 'Séparer le calcul de l\'affichage', v: "Règle d'or professionnelle : une fonction qui <b>calcule</b> ne doit pas <b>afficher</b>. Sinon tu ne peux ni la tester, ni la réutiliser dans une interface graphique ou un site web." },
            { t: 'h', v: 'Le bloc main' },
            { t: 'code', v: `def main():\n    notes = [12, 15, 8]\n    afficher_bulletin(notes)\n\nif __name__ == "__main__":\n    main()` },
            { t: 'p', v: "Cette dernière ligne signifie « exécute seulement si ce fichier est lance directement ». Elle permet d'importer tes fonctions ailleurs sans declencher le programme. Tous les fichiers Python professionnels la contiennent." },
            { t: 'key', h: 'A retenir', v: "Une fonction = une responsabilité · calculer et afficher sont deux metiers · if __name__ == \"__main__\" protège le point d'entrée." }
          ],
          ex: [
            {
              brief: "Découpe ce programme en trois fonctions : <code>convertir(celsius)</code> qui renvoie les fahrenheit, <code>categorie(celsius)</code> qui renvoie <code>Froid</code> (moins de 15) ou <code>Chaud</code>, et <code>rapport(celsius)</code> qui affiche <code>20C = 68.0F (Chaud)</code>.",
              starter: 'def convertir(celsius):\n    \n\ndef categorie(celsius):\n    \n\ndef rapport(celsius):\n    \n\nrapport(20)\nrapport(5)\n',
              hint: 'F = C * 9 / 5 + 32. Puis rapport utilise les deux autres fonctions dans une f-string.',
              solution: `def convertir(celsius):\n    return celsius * 9 / 5 + 32\n\ndef categorie(celsius):\n    return "Froid" if celsius < 15 else "Chaud"\n\ndef rapport(celsius):\n    print(f"{celsius}C = {convertir(celsius)}F ({categorie(celsius)})")\n\nrapport(20)\nrapport(5)`,
              tests: [{ expect: '20C = 68.0F (Chaud)\n5C = 41.0F (Froid)' }],
              must: [['def\\s+convertir', 'Il faut une fonction convertir.'], ['def\\s+categorie', 'Il faut une fonction categorie.'], ['def\\s+rapport', 'Il faut une fonction rapport.']],
              success: 'Trois fonctions, trois responsabilites. Ce code se relit, se teste et se modifie sans risque.'
            }
          ]
        }
      ]
    },

    /* ---------------- MODULE 2 ---------------- */
    {
      n: 2, title: 'Données et comprehensions', sub: 'Le Python idiomatique',
      lessons: [
        {
          id: 'pp-2-1', title: 'Les comprehensions de liste', kind: 'lecon', xp: 35,
          goal: 'Écrire en une ligne ce qui prenait cinq lignes — la signature du code Python professionnel.',
          blocks: [
            { t: 'p', v: "Créer une liste à partir d'une autre est tellement fréquent que Python offre une syntaxe dediee." },
            { t: 'code', run: true, v: `# La version longue\ncarres = []\nfor n in range(1, 6):\n    carres.append(n ** 2)\nprint(carres)\n\n# La comprehension : meme resultat, une ligne\ncarres = [n ** 2 for n in range(1, 6)]\nprint(carres)` },
            { t: 'h', v: 'La structure' },
            { t: 'code', v: `[  expression   for element in source   if condition  ]\n#  ce qu'on garde         d'ou ca vient      filtre optionnel` },
            { t: 'code', run: true, v: `notes = [12, 8, 17, 5, 15]\n\nprint([n for n in notes if n >= 10])          # filtrer\nprint([n + 1 for n in notes])                # transformer\nprint([n for n in notes if n >= 10][:2])     # filtrer puis couper\n\nmots = ["forge", "code", "ares"]\nprint([m.upper() for m in mots])\nprint([len(m) for m in mots])` },
            { t: 'warn', h: 'Lisibilité avant tout', v: "Une comprehension doit tenir sur une ligne lisible. Dès qu'il y a deux conditions et une boucle imbriquee, reviens à la boucle classique : le but est la clarté, pas la performance sportive." },
            { t: 'h', v: 'Comprehension de dictionnaire' },
            { t: 'code', run: true, v: `mots = ["forge", "code", "ares"]\nlongueurs = {m: len(m) for m in mots}\nprint(longueurs)` },
            { t: 'key', h: 'A retenir', v: "[expr for x in source if cond] · transforme et filtre en une ligne · {clé: valeur for ...} pour les dictionnaires · reste lisible." }
          ],
          ex: [
            {
              brief: "En une seule comprehension, crée et affiche la liste des multiples de 3 entre 1 et 30 inclus.",
              starter: 'multiples = [ ]\nprint(multiples)\n',
              hint: '[n for n in range(1, 31) if n % 3 == 0]',
              solution: `multiples = [n for n in range(1, 31) if n % 3 == 0]\nprint(multiples)`,
              tests: [{ expect: '[3, 6, 9, 12, 15, 18, 21, 24, 27, 30]' }],
              must: [['\\[[^\\]]*for[^\\]]*\\]', 'Utilise une comprehension de liste.']]
            },
            {
              brief: "À partir de la liste de prix HT, crée en une comprehension la liste des prix TTC arrondis à 2 decimales (TVA 20%), et affiche-la.",
              starter: 'ht = [10, 24.5, 7]\n',
              hint: '[round(p * 1.2, 2) for p in ht]',
              solution: `ht = [10, 24.5, 7]\nttc = [round(p * 1.2, 2) for p in ht]\nprint(ttc)`,
              tests: [{ expect: '[12.0, 29.4, 8.4]' }],
              must: [['for\\s+\\w+\\s+in', 'Utilise une comprehension.']]
            }
          ],
          quiz: [
            { q: 'Que produit [x * 2 for x in [1, 2, 3]] ?', opts: ['[2, 4, 6]', '[1, 2, 3, 1, 2, 3]', '12'], a: 0, why: 'Chaque élément est transforme, la longueur ne change pas.' },
            { q: 'Ou place-t-on le filtre ?', opts: ['Au début', 'À la fin, avec if', 'Il n\'y en a pas'], a: 1, why: '[expr for x in source if condition] : le if vient en dernier.' }
          ]
        },
        {
          id: 'pp-2-2', title: 'Trier, grouper, compter', kind: 'lecon', xp: 35,
          goal: 'Les opérations de traitement de données que tu utiliseras dans tous tes projets.',
          blocks: [
            { t: 'h', v: 'Trier avec une clé' },
            { t: 'code', run: true, v: `eleves = [\n    {"nom": "Lea", "note": 15},\n    {"nom": "Sam", "note": 8},\n    {"nom": "Zoe", "note": 17}\n]\n\npar_note = sorted(eleves, key=lambda e: e["note"], reverse=True)\nfor e in par_note:\n    print(e["nom"], e["note"])` },
            { t: 'p', v: "<code>key</code> reçoit une fonction qui dit <b>sur quoi</b> trier. <code>lambda e: e[\"note\"]</code> est une mini-fonction anonyme : « donne-moi la note de cet élève »." },
            { t: 'code', run: true, v: `mots = ["forgeron", "ares", "code"]\nprint(sorted(mots))                  # alphabetique\nprint(sorted(mots, key=len))         # par longueur\nprint(sorted(mots, key=len, reverse=True))` },
            { t: 'h', v: 'Compter les occurrences' },
            { t: 'code', run: true, v: `phrase = "la forge de la forge"\nmots = phrase.split()\n\ncompteur = {}\nfor m in mots:\n    compteur[m] = compteur.get(m, 0) + 1\n\nprint(compteur)` },
            { t: 'tip', h: 'Le motif get(clé, 0) + 1', v: "C'est LE motif de comptage en Python. <code>get(m, 0)</code> renvoie 0 si le mot n'a jamais été vu, sinon son compte actuel. Apprends-le par coeur : tu l'ecriras des centaines de fois." },
            { t: 'h', v: 'Grouper' },
            { t: 'code', run: true, v: `eleves = [("Lea", "3A"), ("Sam", "3B"), ("Zoe", "3A")]\n\nclasses = {}\nfor nom, classe in eleves:\n    if classe not in classes:\n        classes[classe] = []\n    classes[classe].append(nom)\n\nprint(classes)` },
            { t: 'key', h: 'A retenir', v: "sorted(..., key=lambda x: ...) trie sur un critere · get(clé, 0) + 1 compte · dictionnaire de listes pour grouper." }
          ],
          ex: [
            {
              brief: "Trie les joueurs par score decroissant et affiche <code>1. Nova (250)</code>, <code>2. Mia (220)</code>, <code>3. Kaz (180)</code>.",
              starter: 'joueurs = [{"nom": "Kaz", "score": 180}, {"nom": "Nova", "score": 250}, {"nom": "Mia", "score": 220}]\n',
              hint: 'sorted(joueurs, key=lambda j: j["score"], reverse=True) puis enumerate pour le rang.',
              solution: `joueurs = [{"nom": "Kaz", "score": 180}, {"nom": "Nova", "score": 250}, {"nom": "Mia", "score": 220}]\nclassement = sorted(joueurs, key=lambda j: j["score"], reverse=True)\nfor i, j in enumerate(classement, 1):\n    print(f"{i}. {j['nom']} ({j['score']})")`,
              tests: [{ expect: '1. Nova (250)\n2. Mia (220)\n3. Kaz (180)' }],
              must: [['sorted', 'Utilise sorted avec une cle.'], ['key\\s*=', 'Precise le critere avec key=.']]
            },
            {
              brief: "Compte les lettres du mot <code>forgeron</code> et affiche le dictionnaire des occurrences (ordre d'apparition).",
              starter: 'mot = "forgeron"\ncompteur = {}\n',
              hint: 'Boucle sur les lettres avec le motif get(lettre, 0) + 1.',
              solution: `mot = "forgeron"\ncompteur = {}\nfor lettre in mot:\n    compteur[lettre] = compteur.get(lettre, 0) + 1\nprint(compteur)`,
              tests: [{ expect: "{'f': 1, 'o': 2, 'r': 2, 'g': 1, 'e': 1, 'n': 1}" }]
            }
          ],
          quiz: [
            { q: 'Que fait key=len dans sorted ?', opts: ['Trie par longueur', 'Garde les éléments de même longueur', 'Trie alphabetiquement'], a: 0, why: 'key indique la valeur à comparer : ici la longueur de chaque element.' },
            { q: 'Que renvoie d.get("x", 0) quand "x" est absent ?', opts: ['None', '0', 'Une KeyError'], a: 1, why: 'C\'est la valeur par défaut fournie en second argument.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 3 ---------------- */
    {
      n: 3, title: 'Code robuste', sub: 'Exceptions, validation, tests',
      lessons: [
        {
          id: 'pp-3-1', title: 'Gerer les erreurs sans planter', kind: 'lecon', xp: 35,
          goal: 'Transformer un plantage en message clair grace a try / except.',
          blocks: [
            { t: 'p', v: "Un programme professionnel ne plante pas quand l'utilisateur tape n'importe quoi : il explique poliment." },
            { t: 'code', run: true, err: true, v: `age = int("abc")   # ValueError : le programme s'arrete net\nprint("jamais atteint")` },
            { t: 'code', run: true, v: `try:\n    age = int("abc")\n    print(age)\nexcept ValueError:\n    print("Ce n'est pas un nombre valide.")\n\nprint("Le programme continue.")` },
            { t: 'h', v: 'La structure complète' },
            { t: 'code', run: true, v: `def diviser(a, b):\n    try:\n        resultat = a / b\n    except ZeroDivisionError:\n        return "Division par zero impossible"\n    else:\n        return f"Resultat : {resultat}"\n    finally:\n        pass   # execute dans tous les cas\n\nprint(diviser(10, 2))\nprint(diviser(10, 0))` },
            {
              t: 'table', head: ['Bloc', 'Quand'],
              rows: [['<code>try</code>', 'le code risque'], ['<code>except X</code>', "si l'erreur X survient"],
                     ['<code>else</code>', 'si aucune erreur'], ['<code>finally</code>', 'toujours (nettoyage, fermeture de fichier)']]
            },
            { t: 'h', v: 'Les erreurs les plus frequentes' },
            {
              t: 'table', head: ['Erreur', 'Cause typique'],
              rows: [['<code>ValueError</code>', 'int("abc")'], ['<code>ZeroDivisionError</code>', 'x / 0'],
                     ['<code>KeyError</code>', 'dico["cle_absente"]'], ['<code>IndexError</code>', 'liste[99]'],
                     ['<code>TypeError</code>', '"a" + 1']]
            },
            { t: 'warn', h: 'Jamais de except nu', v: "<code>except:</code> tout seul attrape absolument tout, y compris tes propres fautes de frappe : tu ne verras plus jamais tes bugs. Précise toujours le type d'erreur." },
            { t: 'h', v: 'Lever ses propres erreurs' },
            { t: 'code', run: true, v: `def racine(x):\n    if x < 0:\n        raise ValueError("Pas de racine carree d'un nombre negatif")\n    return x ** 0.5\n\ntry:\n    print(racine(-4))\nexcept ValueError as e:\n    print("Erreur attrapee :", e)` },
            { t: 'key', h: 'A retenir', v: "try/except capture · précise le type · finally nettoie · raise signale une erreur metier." }
          ],
          ex: [
            {
              brief: "Écris <code>lire_entier()</code> qui demande un nombre avec <code>Nombre : </code> et affiche <code>Nombre valide : N</code>, ou <code>Saisie invalide</code> si ce n'est pas un entier.",
              starter: 'try:\n    \nexcept ValueError:\n    \n',
              hint: 'int(input(...)) dans le try, message dans le except ValueError.',
              solution: `try:\n    n = int(input("Nombre : "))\n    print(f"Nombre valide : {n}")\nexcept ValueError:\n    print("Saisie invalide")`,
              tests: [{ in: ['42'], expect: 'Nombre : 42\nNombre valide : 42' }, { in: ['abc'], expect: 'Nombre : abc\nSaisie invalide' }],
              must: [['except\\s+ValueError', 'Attrape precisement ValueError.']]
            },
            {
              brief: "Écris <code>diviser(a, b)</code> qui renvoie le quotient, ou la chaîne <code>impossible</code> si b vaut 0. Les appels sont donnes.",
              starter: 'def diviser(a, b):\n    \n\nprint(diviser(10, 4))\nprint(diviser(7, 0))\n',
              hint: 'try: return a / b — except ZeroDivisionError: return "impossible"',
              solution: `def diviser(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "impossible"\n\nprint(diviser(10, 4))\nprint(diviser(7, 0))`,
              tests: [{ expect: '2.5\nimpossible' }]
            }
          ],
          quiz: [
            { q: 'Quelle erreur leve int("bonjour") ?', opts: ['TypeError', 'ValueError', 'SyntaxError'], a: 1, why: 'Le type est bon (une chaîne) mais la valeur ne représente pas un entier.' },
            { q: 'Pourquoi éviter except: tout seul ?', opts: ['C\'est plus lent', 'Il masque aussi tes propres bugs', 'Ce n\'est pas valide'], a: 1, why: 'Il attrape tout, y compris les fautes de frappe : le programme devient indebuggable.' }
          ]
        },
        {
          id: 'pp-3-2', title: 'Valider les entrees', kind: 'lecon', xp: 30,
          goal: 'Ne jamais faire confiance a une donnée qui vient de l\'extérieur.',
          blocks: [
            { t: 'p', v: "Règle de sécurité universelle : <b>toute donnée venant de l'utilisateur est suspecte</b> jusqu'à preuve du contraire. C'est vrai pour un exercice de classe comme pour une banque." },
            { t: 'h', v: 'Le motif de la boucle de validation' },
            { t: 'code', run: true, v: `def demander_age():\n    while True:\n        reponse = input("Ton age : ")\n        if not reponse.isdigit():\n            print("Chiffres uniquement.")\n            continue\n        age = int(reponse)\n        if age < 5 or age > 120:\n            print("Age irrealiste.")\n            continue\n        return age\n\nprint("Age retenu :", demander_age())` },
            { t: 'p', v: "La fonction ne rend la main que lorsque la donnée est <b>certainement</b> valide. Le reste du programme peut alors lui faire confiance." },
            { t: 'h', v: 'Valider un choix dans une liste' },
            { t: 'code', run: true, v: `def demander_choix(options):\n    while True:\n        for i, o in enumerate(options, 1):\n            print(f"{i}. {o}")\n        reponse = input("Ton choix : ")\n        if reponse.isdigit() and 1 <= int(reponse) <= len(options):\n            return options[int(reponse) - 1]\n        print("Choix invalide.")\n\nprint("Tu as choisi :", demander_choix(["Epee", "Arc", "Baton"]))` },
            { t: 'key', h: 'A retenir', v: "while True + return quand c'est valide · isdigit() avant int() · vérifie aussi les bornes, pas seulement le type." }
          ],
          ex: [
            {
              brief: "Écris une boucle qui demande <code>Note : </code> jusqu'à obtenir un entier entre 0 et 20, puis affiche <code>Note enregistree : N</code>. Message <code>Invalide</code> à chaque mauvaise saisie.",
              starter: 'while True:\n    ',
              hint: 'isdigit() puis conversion puis test 0 <= n <= 20, sinon print("Invalide") et on recommence.',
              solution: `while True:\n    reponse = input("Note : ")\n    if reponse.isdigit() and 0 <= int(reponse) <= 20:\n        print(f"Note enregistree : {int(reponse)}")\n        break\n    print("Invalide")`,
              tests: [
                { in: ['12'], expect: 'Note : 12\nNote enregistree : 12' },
                { in: ['abc', '99', '15'], expect: 'Note : abc\nInvalide\nNote : 99\nInvalide\nNote : 15\nNote enregistree : 15' }
              ],
              success: "Ton programme est maintenant increvable : aucune saisie ne peut le faire planter."
            }
          ]
        }
      ]
    },

    /* ---------------- MODULE 4 ---------------- */
    {
      n: 4, title: 'Programmation orientee objet', sub: 'Modéliser le monde avec des classes',
      lessons: [
        {
          id: 'pp-4-1', title: 'Classes et objets', kind: 'lecon', xp: 40,
          goal: 'Créer tes propres types de données, avec leurs proprietes et leurs actions.',
          blocks: [
            { t: 'p', v: "Jusqu'ici tu utilisais les types de Python. Maintenant tu vas créer les tiens : un <code>Joueur</code>, un <code>Compte</code>, un <code>Monstre</code>." },
            { t: 'analogy', v: "<b>L'image à retenir :</b> une <b>classe</b> est un moule a gaufres. Un <b>objet</b> est une gaufre. Le moule définit la forme (les attributs) et ce qu'on peut faire (les methodes) ; chaque gaufre a ensuite sa propre garniture." },
            { t: 'code', run: true, v: `class Joueur:\n    def __init__(self, pseudo, vie=100):\n        self.pseudo = pseudo\n        self.vie = vie\n\n    def subir(self, degats):\n        self.vie = self.vie - degats\n        if self.vie < 0:\n            self.vie = 0\n\n    def est_vivant(self):\n        return self.vie > 0\n\nnova = Joueur("Nova")\nkaz = Joueur("Kaz", 50)\n\nnova.subir(30)\nprint(nova.pseudo, nova.vie, nova.est_vivant())\nprint(kaz.pseudo, kaz.vie)` },
            { t: 'h', v: 'Les trois mots a comprendre' },
            {
              t: 'table', head: ['Mot', 'Rôle'],
              rows: [['<code>class</code>', 'définit le moule'],
                     ['<code>__init__</code>', 'le constructeur : appelé automatiquement à la création, il installe les attributs'],
                     ['<code>self</code>', "l'objet en train d'être manipule ; toujours le premier paramètre d'une methode"]]
            },
            { t: 'warn', h: 'self n\'est pas optionnel', v: "Oublier <code>self</code> dans la définition d'une methode est l'erreur numéro 1 en POO. Et a l'intérieur, <code>vie = 10</code> crée une variable locale : il faut écrire <code>self.vie = 10</code>." },
            { t: 'h', v: 'Affichage lisible : __str__' },
            { t: 'code', run: true, v: `class Joueur:\n    def __init__(self, pseudo, vie=100):\n        self.pseudo = pseudo\n        self.vie = vie\n\n    def __str__(self):\n        return f"{self.pseudo} ({self.vie} PV)"\n\nprint(Joueur("Nova"))\nprint(Joueur("Kaz", 40))` },
            { t: 'key', h: 'A retenir', v: "class = moule · __init__ construit · self designe l'objet · self.attribut stocke · __str__ rend l'affichage lisible." }
          ],
          ex: [
            {
              brief: "Crée une classe <code>Livre</code> avec <code>titre</code>, <code>auteur</code>, <code>pages</code>, une methode <code>__str__</code> qui renvoie <code>Titre - Auteur (N pages)</code>, et une methode <code>est_long()</code> renvoyant True si plus de 300 pages.",
              starter: 'class Livre:\n    def __init__(self, titre, auteur, pages):\n        \n\nl1 = Livre("Dune", "Herbert", 412)\nl2 = Livre("Le Petit Prince", "Saint-Exupery", 96)\nprint(l1)\nprint(l2)\nprint(l1.est_long())\nprint(l2.est_long())\n',
              hint: 'Trois self.x = x dans __init__, puis __str__ avec une f-string, puis return self.pages > 300.',
              solution: `class Livre:\n    def __init__(self, titre, auteur, pages):\n        self.titre = titre\n        self.auteur = auteur\n        self.pages = pages\n\n    def __str__(self):\n        return f"{self.titre} - {self.auteur} ({self.pages} pages)"\n\n    def est_long(self):\n        return self.pages > 300\n\nl1 = Livre("Dune", "Herbert", 412)\nl2 = Livre("Le Petit Prince", "Saint-Exupery", 96)\nprint(l1)\nprint(l2)\nprint(l1.est_long())\nprint(l2.est_long())`,
              tests: [{ expect: 'Dune - Herbert (412 pages)\nLe Petit Prince - Saint-Exupery (96 pages)\nTrue\nFalse' }],
              must: [['class\\s+Livre', 'La classe doit s\'appeler Livre.'], ['def\\s+__str__', 'Il faut une methode __str__.']]
            }
          ],
          quiz: [
            { q: 'Quand __init__ est-il appelé ?', opts: ['À chaque methode', 'À la création de l\'objet', 'Jamais automatiquement'], a: 1, why: 'C\'est le constructeur : Python l\'appelle dès que tu écris Classe(...).' },
            { q: 'Que designe self ?', opts: ['La classe', 'L\'objet sur lequel la methode est appelée', 'Le module'], a: 1, why: 'self est l\'instance courante : nova.subir(10) passe nova comme self.' }
          ]
        },
        {
          id: 'pp-4-2', title: 'Heritage et reutilisation', kind: 'lecon', xp: 40,
          goal: 'Créer une classe specialisee à partir d\'une classe générale sans copier-coller.',
          blocks: [
            { t: 'p', v: "Un <code>Magicien</code> est un <code>Personnage</code> qui, en plus, lance des sorts. L'heritage évite de réécrire tout ce qui est commun." },
            { t: 'code', run: true, v: `class Personnage:\n    def __init__(self, nom, vie):\n        self.nom = nom\n        self.vie = vie\n\n    def subir(self, degats):\n        self.vie -= degats\n\n    def __str__(self):\n        return f"{self.nom} ({self.vie} PV)"\n\n\nclass Magicien(Personnage):\n    def __init__(self, nom, vie, mana):\n        super().__init__(nom, vie)   # on appelle le constructeur du parent\n        self.mana = mana\n\n    def lancer_sort(self, cible):\n        if self.mana >= 10:\n            self.mana -= 10\n            cible.subir(25)\n            return f"{self.nom} lance un sort sur {cible.nom} !"\n        return "Pas assez de mana"\n\n\nguerrier = Personnage("Kaz", 100)\nmage = Magicien("Nova", 70, 30)\n\nprint(mage.lancer_sort(guerrier))\nprint(guerrier)\nprint(mage.mana)` },
            { t: 'h', v: 'Ce que fait l\'heritage' },
            { t: 'ul', v: [
              "<code>class Magicien(Personnage)</code> : Magicien reçoit <b>toutes</b> les methodes de Personnage.",
              "<code>super().__init__(...)</code> exécute le constructeur du parent, puis on ajoute le spécifique.",
              "Redéfinir une methode dans l'enfant remplace celle du parent : c'est la <b>surcharge</b>."
            ] },
            { t: 'code', run: true, v: `class Personnage:\n    def crier(self):\n        return "Aaah !"\n\nclass Barbare(Personnage):\n    def crier(self):                     # surcharge\n        return "AAAARGH POUR LA FORGE !"\n\nprint(Personnage().crier())\nprint(Barbare().crier())` },
            { t: 'tip', h: 'La bonne question', v: "Avant d'heriter, demande-toi : « est-ce que B EST UN A ? ». Un Magicien EST UN Personnage : heritage justifie. Une Voiture n'EST PAS UN Moteur (elle en a un) : la, on utilise un attribut, pas l'heritage." },
            { t: 'key', h: 'A retenir', v: "class Enfant(Parent) herite de tout · super().__init__() construit la partie parente · redefinir = surcharger · test : « est un »." }
          ],
          ex: [
            {
              brief: "Crée <code>Animal</code> (avec <code>nom</code> et methode <code>parler()</code> renvoyant <code>...</code>), puis <code>Chien</code> et <code>Chat</code> qui heritent et surchargent <code>parler()</code> en <code>Wouf</code> et <code>Miaou</code>. Le code de test est donne.",
              starter: 'class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n\n    def parler(self):\n        return "..."\n\n\n\nanimaux = [Chien("Rex"), Chat("Felix"), Animal("Truc")]\nfor a in animaux:\n    print(f"{a.nom} dit {a.parler()}")\n',
              hint: 'class Chien(Animal): def parler(self): return "Wouf" — pas besoin de redéfinir __init__.',
              solution: `class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n\n    def parler(self):\n        return "..."\n\n\nclass Chien(Animal):\n    def parler(self):\n        return "Wouf"\n\n\nclass Chat(Animal):\n    def parler(self):\n        return "Miaou"\n\n\nanimaux = [Chien("Rex"), Chat("Felix"), Animal("Truc")]\nfor a in animaux:\n    print(f"{a.nom} dit {a.parler()}")`,
              tests: [{ expect: 'Rex dit Wouf\nFelix dit Miaou\nTruc dit ...' }],
              must: [['class\\s+Chien\\s*\\(\\s*Animal\\s*\\)', 'Chien doit heriter d\'Animal.'], ['class\\s+Chat\\s*\\(\\s*Animal\\s*\\)', 'Chat doit heriter d\'Animal.']],
              success: "Tu viens d'écrire du polymorphisme : la même boucle appelle trois comportements differents. C'est un concept de niveau supérieur."
            }
          ],
          quiz: [
            { q: 'À quoi sert super().__init__() ?', opts: ['A créer un objet plus rapide', 'À exécuter le constructeur de la classe parente', 'À supprimer l\'heritage'], a: 1, why: 'On réutilise l\'initialisation du parent avant d\'ajouter le spécifique.' },
            { q: 'Quand utiliser l\'heritage ?', opts: ['Quand B EST UN A', 'Quand B A UN A', 'Toujours'], a: 0, why: 'Relation « est un » : sinon, on utilise la composition (un attribut).' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 5 ---------------- */
    {
      n: 5, title: 'Algorithmes essentiels', sub: 'Recherche, tri, recursivite, complexité',
      lessons: [
        {
          id: 'pp-5-1', title: 'Chercher vite : la dichotomie', kind: 'lecon', xp: 40,
          goal: 'Comprendre pourquoi un algorithme intelligent bat une machine puissante.',
          blocks: [
            { t: 'p', v: "Chercher un mot dans un dictionnaire de 1000 pages : tu ne commences pas par la page 1. Tu ouvres au milieu. C'est la <b>recherche dichotomique</b>." },
            { t: 'code', run: true, v: `def recherche_lineaire(liste, cible):\n    """Parcourt tout : jusqu'a n comparaisons."""\n    for i in range(len(liste)):\n        if liste[i] == cible:\n            return i\n    return -1\n\ndef recherche_dichotomique(liste_triee, cible):\n    """Coupe en deux a chaque etape : log2(n) comparaisons."""\n    debut = 0\n    fin = len(liste_triee) - 1\n    etapes = 0\n    while debut <= fin:\n        etapes += 1\n        milieu = (debut + fin) // 2\n        if liste_triee[milieu] == cible:\n            print(f"Trouve en {etapes} etapes")\n            return milieu\n        if liste_triee[milieu] < cible:\n            debut = milieu + 1\n        else:\n            fin = milieu - 1\n    return -1\n\nnombres = list(range(0, 1000, 2))     # 500 nombres tries\nprint(recherche_dichotomique(nombres, 874))` },
            { t: 'p', v: "Sur 500 éléments : la recherche lineaire fait jusqu'à 500 comparaisons, la dichotomie <b>9</b>. Sur un million d'éléments : un million contre <b>20</b>." },
            {
              t: 'table', head: ['Taille', 'Lineaire', 'Dichotomique'],
              rows: [['100', '100 étapes', '7 étapes'], ['1 000', '1 000', '10'], ['1 000 000', '1 000 000', '20'], ['1 milliard', '1 milliard', '30']]
            },
            { t: 'warn', h: 'Condition obligatoire', v: "La dichotomie ne fonctionne que sur une liste <b>déjà triée</b>. C'est pour ça que les bases de données maintiennent des index tries en permanence." },
            { t: 'h', v: 'La notation grand O' },
            { t: 'p', v: "On resume la vitesse d'un algorithme par sa croissance : <code>O(n)</code> = proportionnel à la taille, <code>O(log n)</code> = coupe en deux, <code>O(n²)</code> = deux boucles imbriquees (a fuir sur de grandes données)." },
            { t: 'key', h: 'A retenir', v: "Dichotomie = couper en deux · exige une liste triée · O(log n) contre O(n) · l'algorithme compte plus que la machine." }
          ],
          ex: [
            {
              brief: "Complète <code>recherche(liste_triee, cible)</code> : renvoie l'index de la cible, ou <code>-1</code>. Utilise la dichotomie (les tests vérifient aussi que tu ne fais pas de parcours simple).",
              starter: 'def recherche(liste_triee, cible):\n    debut = 0\n    fin = len(liste_triee) - 1\n    while debut <= fin:\n        \n    return -1\n\nprint(recherche([1, 3, 5, 7, 9, 11], 7))\nprint(recherche([1, 3, 5, 7, 9, 11], 1))\nprint(recherche([1, 3, 5, 7, 9, 11], 4))\n',
              hint: 'milieu = (début + fin) // 2 ; si egal on renvoie, si trop petit debut = milieu + 1, sinon fin = milieu - 1.',
              solution: `def recherche(liste_triee, cible):\n    debut = 0\n    fin = len(liste_triee) - 1\n    while debut <= fin:\n        milieu = (debut + fin) // 2\n        if liste_triee[milieu] == cible:\n            return milieu\n        if liste_triee[milieu] < cible:\n            debut = milieu + 1\n        else:\n            fin = milieu - 1\n    return -1\n\nprint(recherche([1, 3, 5, 7, 9, 11], 7))\nprint(recherche([1, 3, 5, 7, 9, 11], 1))\nprint(recherche([1, 3, 5, 7, 9, 11], 4))`,
              tests: [{ expect: '3\n0\n-1' }],
              must: [['//\\s*2', 'La dichotomie calcule un milieu avec // 2.']],
              mustnot: [['for\\s+\\w+\\s+in\\s+liste_triee', 'Pas de parcours element par element : c\'est justement ce qu\'on veut eviter.']]
            }
          ],
          quiz: [
            { q: 'Combien d\'étapes pour trouver dans 1000 éléments tries par dichotomie ?', opts: ['Environ 10', 'Environ 100', 'Environ 500'], a: 0, why: 'log2(1000) vaut environ 10 : on divise par deux dix fois.' },
            { q: 'Quelle condition la dichotomie exige-t-elle ?', opts: ['Une liste triée', 'Une liste de nombres', 'Une liste courte'], a: 0, why: 'Sans tri, on ne peut pas savoir de quel cote chercher.' }
          ]
        },
        {
          id: 'pp-5-2', title: 'La recursivite', kind: 'lecon', xp: 40,
          goal: 'Écrire une fonction qui s\'appelle elle-même, sans provoquer d\'infini.',
          blocks: [
            { t: 'p', v: "Une fonction recursive résout un problème en le ramenant a une version plus petite du même problème." },
            { t: 'code', run: true, v: `def factorielle(n):\n    if n <= 1:          # CAS DE BASE : on s'arrete\n        return 1\n    return n * factorielle(n - 1)   # CAS RECURSIF : plus petit\n\nprint(factorielle(5))   # 5 x 4 x 3 x 2 x 1` },
            { t: 'analogy', v: "<b>L'image à retenir :</b> deux miroirs face a face. Chaque reflet contient un reflet plus petit. Sans limite, ça continue a l'infini : le <b>cas de base</b> est le mur qui arrête le reflet." },
            { t: 'h', v: 'Les deux règles absolues' },
            { t: 'ol', v: [
              "Un <b>cas de base</b> qui ne s'appelle pas lui-meme (sinon : RecursionError).",
              "Chaque appel doit <b>se rapprocher</b> du cas de base (n - 1, liste plus courte...)."
            ] },
            { t: 'code', run: true, v: `def compte_a_rebours(n):\n    if n == 0:\n        print("Decollage !")\n        return\n    print(n)\n    compte_a_rebours(n - 1)\n\ncompte_a_rebours(5)` },
            { t: 'code', run: true, v: `def somme_liste(liste):\n    if not liste:                 # liste vide : cas de base\n        return 0\n    return liste[0] + somme_liste(liste[1:])\n\nprint(somme_liste([1, 2, 3, 4]))` },
            { t: 'warn', h: 'Quand ne PAS l\'utiliser', v: "En Python, la recursivite est limitee (environ 1000 appels) et plus lente qu'une boucle. Utilise-la quand elle rend le code <b>plus clair</b> : parcours d'arbre, fractales, jeux de plateau. Pour compter jusqu'à 1000, une boucle suffit." },
            { t: 'key', h: 'A retenir', v: "Cas de base obligatoire · progression vers le cas de base · élégante pour les structures imbriquees · pas systematique." }
          ],
          ex: [
            {
              brief: "Écris <code>puissance(base, exposant)</code> de facon <b>recursive</b> (sans <code>**</code> ni boucle). Rappel : x^0 = 1 et x^n = x * x^(n-1).",
              starter: 'def puissance(base, exposant):\n    \n\nprint(puissance(2, 10))\nprint(puissance(5, 0))\nprint(puissance(3, 3))\n',
              hint: 'if exposant == 0: return 1 — sinon return base * puissance(base, exposant - 1)',
              solution: `def puissance(base, exposant):\n    if exposant == 0:\n        return 1\n    return base * puissance(base, exposant - 1)\n\nprint(puissance(2, 10))\nprint(puissance(5, 0))\nprint(puissance(3, 3))`,
              tests: [{ expect: '1024\n1\n27' }],
              must: [['puissance\\s*\\([^)]*exposant\\s*-\\s*1', 'La fonction doit s\'appeler elle-meme avec exposant - 1.']],
              mustnot: [['\\*\\*', 'Sans l\'operateur ** : c\'est justement ce qu\'on reconstruit.'], ['for\\s|while\\s', 'Sans boucle : uniquement de la recursivite.']]
            },
            {
              brief: "Écris <code>compter_lettre(mot, lettre)</code> de facon recursive : renvoie le nombre d'occurrences de la lettre dans le mot.",
              starter: 'def compter_lettre(mot, lettre):\n    \n\nprint(compter_lettre("forgeron", "r"))\nprint(compter_lettre("ares", "z"))\n',
              hint: 'Si le mot est vide : 0. Sinon : (1 si la première lettre correspond, 0 sinon) + compter_lettre(mot[1:], lettre).',
              solution: `def compter_lettre(mot, lettre):\n    if mot == "":\n        return 0\n    premier = 1 if mot[0] == lettre else 0\n    return premier + compter_lettre(mot[1:], lettre)\n\nprint(compter_lettre("forgeron", "r"))\nprint(compter_lettre("ares", "z"))`,
              tests: [{ expect: '2\n0' }]
            }
          ],
          quiz: [
            { q: 'Que se passe-t-il sans cas de base ?', opts: ['La fonction renvoie None', 'RecursionError : appels infinis', 'Python optimise tout seul'], a: 1, why: 'Chaque appel empile le suivant jusqu\'a saturation.' },
            { q: 'Quel est le cas de base de factorielle ?', opts: ['n == 0 ou n <= 1', 'n == 100', 'Il n\'y en a pas'], a: 0, why: '0! = 1! = 1 : c\'est là où la recursion s\'arrête.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 6 : PROJET 1 ---------------- */
    {
      n: 6, title: 'PROJET · Le pendu', sub: 'Un jeu complet, guide étape par étape',
      lessons: [
        {
          id: 'pp-6-1', title: 'Le pendu — construction guidee', kind: 'projet', xp: 90,
          goal: 'Construire un jeu complet en 5 étapes, chacune vérifiée.',
          blocks: [
            { t: 'p', v: "Tu vas écrire le jeu du pendu en entier. On procède comme un professionnel : une étape, un test, on avance." },
            { t: 'h', v: 'Étape 1 — afficher le mot masque' },
            { t: 'p', v: "Le coeur du jeu : transformer <code>forge</code> et les lettres trouvées <code>[\"f\", \"e\"]</code> en <code>f _ _ _ e</code>." },
            { t: 'code', run: true, v: `def masquer(mot, trouvees):\n    affichage = ""\n    for lettre in mot:\n        if lettre in trouvees:\n            affichage += lettre + " "\n        else:\n            affichage += "_ "\n    return affichage.strip()\n\nprint(masquer("forge", ["f", "e"]))\nprint(masquer("forge", []))` },
            { t: 'h', v: 'Étape 2 — la boucle de jeu' },
            { t: 'code', v: `mot = "forge"\ntrouvees = []\nvies = 6\n\nwhile vies > 0:\n    print(masquer(mot, trouvees))\n    lettre = input("Une lettre : ")\n    if lettre in mot:\n        trouvees.append(lettre)\n    else:\n        vies -= 1\n        print(f"Rate ! {vies} vies restantes")` },
            { t: 'h', v: 'Étape 3 — detecter la victoire' },
            { t: 'code', run: true, v: `def gagne(mot, trouvees):\n    for lettre in mot:\n        if lettre not in trouvees:\n            return False\n    return True\n\nprint(gagne("forge", ["f", "o", "r", "g", "e"]))\nprint(gagne("forge", ["f", "o"]))` },
            { t: 'tip', h: 'La version courte', v: "<code>all(l in trouvees for l in mot)</code> fait la même chose en une ligne. Les deux sont correctes : écris d'abord la version claire, optimise ensuite." },
            { t: 'h', v: 'Étape 4 — l\'assemblage' },
            { t: 'p', v: "C'est ton exercice ci-contre : reunir les morceaux en un jeu jouable." }
          ],
          ex: [
            {
              brief: "Écris <code>masquer(mot, trouvees)</code> qui renvoie le mot avec des <code>_</code> pour les lettres non trouvées, séparés par des espaces. Exemple : <code>masquer(\"ares\", [\"a\", \"s\"])</code> donne <code>a _ _ s</code>.",
              starter: 'def masquer(mot, trouvees):\n    \n\nprint(masquer("ares", ["a", "s"]))\nprint(masquer("forge", []))\nprint(masquer("code", ["c", "o", "d", "e"]))\n',
              hint: 'Construis une chaîne dans une boucle, ajoute lettre + " " ou "_ ", puis .strip() à la fin.',
              solution: `def masquer(mot, trouvees):\n    affichage = ""\n    for lettre in mot:\n        if lettre in trouvees:\n            affichage += lettre + " "\n        else:\n            affichage += "_ "\n    return affichage.strip()\n\nprint(masquer("ares", ["a", "s"]))\nprint(masquer("forge", []))\nprint(masquer("code", ["c", "o", "d", "e"]))`,
              tests: [{ expect: 'a _ _ s\n_ _ _ _ _\nc o d e' }]
            },
            {
              brief: "Le jeu complet. Le mot est <code>forge</code>, 3 vies. Boucle : afficher le mot masque, demander <code>Lettre : </code>. Si la lettre est dans le mot, l'ajouter aux trouvées ; sinon afficher <code>Rate</code> et perdre une vie. Quand tout est trouve : afficher <code>Gagne !</code> et s'arrêter. A court de vies : afficher <code>Perdu ! Le mot etait forge</code>.",
              starter: 'def masquer(mot, trouvees):\n    return " ".join([l if l in trouvees else "_" for l in mot])\n\nmot = "forge"\ntrouvees = []\nvies = 3\n\nwhile True:\n    ',
              hint: "Dans la boucle : print(masquer(...)), input, test d'appartenance, mise à jour, puis les deux conditions de fin (all(...) pour gagner, vies == 0 pour perdre).",
              solution: `def masquer(mot, trouvees):\n    return " ".join([l if l in trouvees else "_" for l in mot])\n\nmot = "forge"\ntrouvees = []\nvies = 3\n\nwhile True:\n    print(masquer(mot, trouvees))\n    lettre = input("Lettre : ")\n    if lettre in mot:\n        trouvees.append(lettre)\n    else:\n        vies -= 1\n        print("Rate")\n    if all(l in trouvees for l in mot):\n        print("Gagne !")\n        break\n    if vies == 0:\n        print(f"Perdu ! Le mot etait {mot}")\n        break`,
              tests: [
                { in: ['f', 'o', 'r', 'g', 'e'], expect: '_ _ _ _ _\nLettre : f\nf _ _ _ _\nLettre : o\nf o _ _ _\nLettre : r\nf o r _ _\nLettre : g\nf o r g _\nLettre : e\nGagne !' },
                { in: ['a', 'b', 'c'], expect: '_ _ _ _ _\nLettre : a\nRate\n_ _ _ _ _\nLettre : b\nRate\n_ _ _ _ _\nLettre : c\nRate\nPerdu ! Le mot etait forge' }
              ],
              success: "PROJET PENDU TERMINE. Boucle de jeu, état, conditions de victoire et de defaite : tu as la structure de n'importe quel jeu."
            }
          ]
        }
      ]
    },

    /* ---------------- MODULE 7 : PROJET 2 ---------------- */
    {
      n: 7, title: 'PROJET · Le gestionnaire de notes', sub: 'Une application a menu, en objets',
      lessons: [
        {
          id: 'pp-7-1', title: 'Application de gestion — construction guidee', kind: 'projet', xp: 95,
          goal: 'Assembler classes, dictionnaires, validation et boucle de menu dans une vraie application.',
          blocks: [
            { t: 'p', v: "Objectif : une application de bulletin qui stocke des élèves, ajoute des notes, calcule les moyennes et affiche un classement. C'est l'archetype de 80% des logiciels de gestion." },
            { t: 'h', v: 'Étape 1 — la classe Élève' },
            { t: 'code', run: true, v: `class Eleve:\n    def __init__(self, nom):\n        self.nom = nom\n        self.notes = []\n\n    def ajouter_note(self, note):\n        if 0 <= note <= 20:\n            self.notes.append(note)\n            return True\n        return False\n\n    def moyenne(self):\n        if not self.notes:\n            return 0\n        return sum(self.notes) / len(self.notes)\n\n    def __str__(self):\n        return f"{self.nom} : {self.moyenne():.2f}/20 ({len(self.notes)} notes)"\n\n\ne = Eleve("Nova")\ne.ajouter_note(15)\ne.ajouter_note(12)\nprint(e)\nprint(e.ajouter_note(25))   # refuse : hors bornes` },
            { t: 'tip', h: 'La validation vit dans l\'objet', v: "<code>ajouter_note</code> refuse les notes impossibles. Ainsi, <b>aucun</b> code extérieur ne peut corrompre l'eleve. C'est le principe d'encapsulation." },
            { t: 'h', v: 'Étape 2 — la classe Classe' },
            { t: 'code', run: true, v: `class Eleve:\n    def __init__(self, nom):\n        self.nom = nom\n        self.notes = []\n    def moyenne(self):\n        return sum(self.notes) / len(self.notes) if self.notes else 0\n\n\nclass Classe:\n    def __init__(self, nom):\n        self.nom = nom\n        self.eleves = []\n\n    def inscrire(self, eleve):\n        self.eleves.append(eleve)\n\n    def moyenne_generale(self):\n        if not self.eleves:\n            return 0\n        return sum(e.moyenne() for e in self.eleves) / len(self.eleves)\n\n    def classement(self):\n        return sorted(self.eleves, key=lambda e: e.moyenne(), reverse=True)\n\n\nc = Classe("3B")\nfor nom, notes in [("Lea", [15, 13]), ("Sam", [8, 12]), ("Zoe", [17, 18])]:\n    el = Eleve(nom)\n    el.notes = notes\n    c.inscrire(el)\n\nprint(f"Moyenne de la classe : {c.moyenne_generale():.2f}")\nfor i, e in enumerate(c.classement(), 1):\n    print(f"{i}. {e.nom} - {e.moyenne():.2f}")` },
            { t: 'h', v: 'Étape 3 — la boucle de menu' },
            { t: 'code', v: `def menu():\n    print("1. Ajouter une note")\n    print("2. Voir le classement")\n    print("3. Quitter")\n    return input("Choix : ")\n\nwhile True:\n    choix = menu()\n    if choix == "3":\n        print("Au revoir")\n        break\n    elif choix == "1":\n        ...` }
          ],
          ex: [
            {
              brief: "Complète la classe <code>Eleve</code> : <code>ajouter_note</code> refuse les notes hors de 0-20 (renvoie False, sinon True), <code>moyenne</code> renvoie 0 si aucune note, et <code>__str__</code> renvoie <code>Nom : 13.50/20 (2 notes)</code>.",
              starter: 'class Eleve:\n    def __init__(self, nom):\n        self.nom = nom\n        self.notes = []\n\n    def ajouter_note(self, note):\n        \n\n    def moyenne(self):\n        \n\n    def __str__(self):\n        \n\n\ne = Eleve("Nova")\nprint(e.ajouter_note(15))\nprint(e.ajouter_note(12))\nprint(e.ajouter_note(25))\nprint(e)\nprint(Eleve("Vide"))\n',
              hint: 'Teste 0 <= note <= 20 avant d\'ajouter. Pour la moyenne, protège le cas de la liste vide.',
              solution: `class Eleve:\n    def __init__(self, nom):\n        self.nom = nom\n        self.notes = []\n\n    def ajouter_note(self, note):\n        if 0 <= note <= 20:\n            self.notes.append(note)\n            return True\n        return False\n\n    def moyenne(self):\n        if not self.notes:\n            return 0\n        return sum(self.notes) / len(self.notes)\n\n    def __str__(self):\n        return f"{self.nom} : {self.moyenne():.2f}/20 ({len(self.notes)} notes)"\n\n\ne = Eleve("Nova")\nprint(e.ajouter_note(15))\nprint(e.ajouter_note(12))\nprint(e.ajouter_note(25))\nprint(e)\nprint(Eleve("Vide"))`,
              tests: [{ expect: 'True\nTrue\nFalse\nNova : 13.50/20 (2 notes)\nVide : 0.00/20 (0 notes)' }]
            },
            {
              brief: "Écris la fonction <code>classement(eleves)</code> qui reçoit une liste de dictionnaires <code>{\"nom\":..., \"notes\":[...]}</code> et affiche le classement par moyenne decroissante au format <code>1. Zoe - 17.50</code>, puis la dernière ligne <code>Moyenne generale : 13.25</code>.",
              starter: 'def classement(eleves):\n    \n\nclassement([\n    {"nom": "Lea", "notes": [15, 13]},\n    {"nom": "Sam", "notes": [8, 12]},\n    {"nom": "Zoe", "notes": [17, 18]}\n])\n',
              hint: 'Calcule d\'abord une moyenne par élève, trie avec sorted(key=..., reverse=True), affiche avec enumerate, puis la moyenne des moyennes.',
              solution: `def classement(eleves):\n    for e in eleves:\n        e["moyenne"] = sum(e["notes"]) / len(e["notes"])\n    tries = sorted(eleves, key=lambda e: e["moyenne"], reverse=True)\n    for i, e in enumerate(tries, 1):\n        print(f"{i}. {e['nom']} - {e['moyenne']:.2f}")\n    generale = sum(e["moyenne"] for e in eleves) / len(eleves)\n    print(f"Moyenne generale : {generale:.2f}")\n\nclassement([\n    {"nom": "Lea", "notes": [15, 13]},\n    {"nom": "Sam", "notes": [8, 12]},\n    {"nom": "Zoe", "notes": [17, 18]}\n])`,
              tests: [{ expect: '1. Zoe - 17.50\n2. Lea - 14.00\n3. Sam - 10.00\nMoyenne generale : 13.83' }],
              success: "Une application de gestion complète : modèle de données, calculs, tri et rapport."
            }
          ]
        }
      ]
    },

    /* ---------------- MODULE 8 : PROJET 3 ---------------- */
    {
      n: 8, title: 'PROJET · Le RPG au tour par tour', sub: 'Le grand final : POO, hasard, boucle de combat',
      lessons: [
        {
          id: 'pp-8-1', title: 'Combat au tour par tour — construction guidee', kind: 'projet', xp: 110,
          goal: 'Le projet final : un système de combat complet en programmation objet.',
          blocks: [
            { t: 'p', v: "Dernier projet de la Forge du Serpent : un combat au tour par tour entre un héros et un monstre, avec attaques, dégâts aléatoires, potions et fin de partie." },
            { t: 'h', v: 'Étape 1 — la classe de base' },
            { t: 'code', run: true, v: `import random\n\nclass Combattant:\n    def __init__(self, nom, vie, force):\n        self.nom = nom\n        self.vie = vie\n        self.vie_max = vie\n        self.force = force\n\n    def est_vivant(self):\n        return self.vie > 0\n\n    def attaquer(self, cible):\n        degats = random.randint(self.force - 2, self.force + 2)\n        cible.vie = max(0, cible.vie - degats)\n        return f"{self.nom} inflige {degats} degats a {cible.nom}"\n\n    def __str__(self):\n        barre = "#" * (self.vie * 10 // self.vie_max)\n        return f"{self.nom:<10} [{barre:<10}] {self.vie}/{self.vie_max}"\n\n\nheros = Combattant("Heros", 40, 8)\ngobelin = Combattant("Gobelin", 30, 6)\nprint(heros)\nprint(gobelin)\nprint(heros.attaquer(gobelin))\nprint(gobelin)` },
            { t: 'tip', h: 'La barre de vie en texte', v: "<code>\"#\" * (vie * 10 // vie_max)</code> dessine une barre de 10 cases proportionnelle. Un détail d'affichage qui change tout pour le joueur." },
            { t: 'h', v: 'Étape 2 — la specialisation par heritage' },
            { t: 'code', run: true, v: `import random\n\nclass Combattant:\n    def __init__(self, nom, vie, force):\n        self.nom = nom\n        self.vie = vie\n        self.force = force\n    def est_vivant(self):\n        return self.vie > 0\n\n\nclass Heros(Combattant):\n    def __init__(self, nom):\n        super().__init__(nom, 40, 8)\n        self.potions = 2\n\n    def boire_potion(self):\n        if self.potions <= 0:\n            return "Plus de potions !"\n        self.potions -= 1\n        self.vie += 15\n        return f"{self.nom} recupere 15 PV (potions restantes : {self.potions})"\n\n\nh = Heros("Nova")\nprint(h.vie, h.potions)\nprint(h.boire_potion())\nprint(h.vie)` },
            { t: 'h', v: 'Étape 3 — la boucle de combat' },
            { t: 'code', v: `tour = 1\nwhile heros.est_vivant() and monstre.est_vivant():\n    print(f"--- Tour {tour} ---")\n    action = input("1. Attaquer  2. Potion : ")\n    if action == "1":\n        print(heros.attaquer(monstre))\n    else:\n        print(heros.boire_potion())\n\n    if monstre.est_vivant():\n        print(monstre.attaquer(heros))\n    tour += 1` },
            { t: 'warn', h: 'Le détail qui compte', v: "Avant de laisser le monstre riposter, on vérifie qu'il est encore vivant. Sans ce test, un monstre mort attaque une dernière fois : c'est le genre de bug qui ruine un jeu." }
          ],
          ex: [
            {
              brief: "Écris la classe <code>Combattant</code> avec <code>nom</code>, <code>vie</code>, <code>force</code>, la methode <code>est_vivant()</code>, et <code>attaquer(cible)</code> qui retire exactement <code>self.force</code> points (sans descendre sous 0) et renvoie <code>Nom frappe Cible pour N degats</code>.",
              starter: 'class Combattant:\n    def __init__(self, nom, vie, force):\n        \n\n    def est_vivant(self):\n        \n\n    def attaquer(self, cible):\n        \n\n\na = Combattant("Heros", 30, 8)\nb = Combattant("Gobelin", 10, 4)\nprint(a.attaquer(b))\nprint(b.vie, b.est_vivant())\nprint(a.attaquer(b))\nprint(b.vie, b.est_vivant())\n',
              hint: 'cible.vie = max(0, cible.vie - self.force) puis un return avec f-string.',
              solution: `class Combattant:\n    def __init__(self, nom, vie, force):\n        self.nom = nom\n        self.vie = vie\n        self.force = force\n\n    def est_vivant(self):\n        return self.vie > 0\n\n    def attaquer(self, cible):\n        cible.vie = max(0, cible.vie - self.force)\n        return f"{self.nom} frappe {cible.nom} pour {self.force} degats"\n\n\na = Combattant("Heros", 30, 8)\nb = Combattant("Gobelin", 10, 4)\nprint(a.attaquer(b))\nprint(b.vie, b.est_vivant())\nprint(a.attaquer(b))\nprint(b.vie, b.est_vivant())`,
              tests: [{ expect: 'Heros frappe Gobelin pour 8 degats\n2 True\nHeros frappe Gobelin pour 8 degats\n0 False' }]
            },
            {
              brief: "Le combat automatique. Les deux combattants s'attaquent à tour de role (le héros commence). Affiche chaque attaque, et à la fin <code>NOM remporte le combat !</code>. Le perdant ne riposte pas s'il est mort.",
              starter: 'class Combattant:\n    def __init__(self, nom, vie, force):\n        self.nom = nom\n        self.vie = vie\n        self.force = force\n\n    def est_vivant(self):\n        return self.vie > 0\n\n    def attaquer(self, cible):\n        cible.vie = max(0, cible.vie - self.force)\n        return f"{self.nom} frappe {cible.nom} pour {self.force} degats"\n\n\nheros = Combattant("Heros", 30, 10)\nmonstre = Combattant("Gobelin", 25, 7)\n\nwhile ',
              hint: 'while heros.est_vivant() and monstre.est_vivant(): le héros attaque ; si le monstre est encore vivant il riposte. Après la boucle, un if pour designer le vainqueur.',
              solution: `class Combattant:\n    def __init__(self, nom, vie, force):\n        self.nom = nom\n        self.vie = vie\n        self.force = force\n\n    def est_vivant(self):\n        return self.vie > 0\n\n    def attaquer(self, cible):\n        cible.vie = max(0, cible.vie - self.force)\n        return f"{self.nom} frappe {cible.nom} pour {self.force} degats"\n\n\nheros = Combattant("Heros", 30, 10)\nmonstre = Combattant("Gobelin", 25, 7)\n\nwhile heros.est_vivant() and monstre.est_vivant():\n    print(heros.attaquer(monstre))\n    if monstre.est_vivant():\n        print(monstre.attaquer(heros))\n\nif heros.est_vivant():\n    print(f"{heros.nom} remporte le combat !")\nelse:\n    print(f"{monstre.nom} remporte le combat !")`,
              tests: [{ expect: 'Heros frappe Gobelin pour 10 degats\nGobelin frappe Heros pour 7 degats\nHeros frappe Gobelin pour 10 degats\nGobelin frappe Heros pour 7 degats\nHeros frappe Gobelin pour 10 degats\nHeros remporte le combat !' }],
              success: "FORGE DU SERPENT TERMINEE. Portee, objets, heritage, exceptions, algorithmes et trois projets complets : tu n'es plus un debutant en Python."
            }
          ]
        }
      ]
    }
  ]
};
