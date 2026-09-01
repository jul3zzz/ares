/* ARES — Parcours libre HTML/CSS : « Les 3 Jours du Bâtisseur » */
var PATH_WEB = {
  id: 'web', lang: 'html', name: 'HTML & CSS', glyph: '</> web',
  tag: 'Parcours 2 · 3 jours', color: '#E2762E',
  title: 'Les 3 Jours du Bâtisseur',
  blurb: "Toutes les pages que tu regardes sont faites de balises et de style. En 3 jours tu construis et tu decores ta propre page, visible en direct à cote de ton code.",
  chips: ['Aperçu en direct', 'Aucun logiciel', 'Résultat visible'],
  promise: "À la fin du jour 3, tu auras construit une vraie page web complète : structure, style, mise en page et formulaire.",
  days: [
    /* ======================= JOUR 1 ======================= */
    {
      n: 1, title: 'Construire la structure', sub: 'Balises, texte, liens, images',
      lessons: [
        {
          id: 'web-1-1', title: 'Comment marche une page web', kind: 'lecon', xp: 20,
          goal: 'Comprendre le rôle du HTML et écrire tes premières balises.',
          blocks: [
            { t: 'p', v: "Toute page web est un simple fichier texte. Le navigateur le lit et le transforme en ce que tu vois. Ce texte utilise un langage de <b>balisage</b> : le HTML." },
            { t: 'analogy', v: "<b>L'image à retenir :</b> le HTML est le <i>squelette</i> (les os : titres, paragraphes, images), le CSS est la <i>peau et les vetements</i> (couleurs, tailles, position), le JavaScript est le <i>système nerveux</i> (ce qui reagit quand tu cliques). Aujourd'hui : le squelette." },
            { t: 'h', v: 'Une balise, c\'est quoi ?' },
            { t: 'p', v: "Une balise est un mot entre chevrons qui <b>étiquette</b> un morceau de contenu. On ouvre, on met le contenu, on ferme avec un slash." },
            { t: 'code', lang: 'html', run: true, v: `<h1>Je suis un grand titre</h1>\n<p>Je suis un paragraphe de texte normal.</p>` },
            { t: 'p', v: "À droite, tu vois le rendu <b>en direct</b>. Modifie le texte, relance : la page change. C'est exactement ce que fait un développeur web toute la journee." },
            { t: 'h', v: 'La règle absolue' },
            { t: 'p', v: "Ce qui est ouvert doit être fermé, et dans le bon ordre. Comme des parenthèses en maths." },
            { t: 'code', lang: 'html', v: `<p>Correct : <b>gras</b> puis normal</p>\n\n<p>Faux : <b>on ferme dans le desordre</p></b>` },
            { t: 'tip', h: 'Les balises orphelines', v: "Quelques balises n'ont pas de contenu, donc pas de fermeture : <code>&lt;br&gt;</code> (saut de ligne), <code>&lt;hr&gt;</code> (trait horizontal), <code>&lt;img&gt;</code> (image)." },
            { t: 'key', h: 'A retenir', v: "HTML = structure · &lt;balise&gt;contenu&lt;/balise&gt; · on ferme toujours, dans l'ordre inverse de l'ouverture." }
          ],
          ex: [
            {
              brief: "Écris un grand titre contenant <code>Ma page</code> et, en dessous, un paragraphe contenant <code>Bienvenue chez moi.</code>",
              starter: '<h1></h1>\n',
              hint: 'Deux balises : <h1>...</h1> puis <p>...</p>',
              solution: `<h1>Ma page</h1>\n<p>Bienvenue chez moi.</p>`,
              must: [['<h1>[\\s\\S]*</h1>', 'Il faut une balise <h1> ouverte et fermee.'], ['<p>[\\s\\S]*</p>', 'Il faut une balise <p> ouverte et fermee.']],
              text: ['Ma page', 'Bienvenue chez moi.']
            }
          ],
          quiz: [
            { q: 'À quoi sert le HTML ?', opts: ['À donner la structure et le contenu', 'À colorer la page', 'A faire des calculs'], a: 0, why: 'La couleur, c\'est le CSS ; les calculs, c\'est le JavaScript. Le HTML structure.' },
            { q: 'Quelle écriture est correcte ?', opts: ['<p>texte<p>', '<p>texte</p>', '</p>texte<p>'], a: 1, why: 'On ouvre avec <p> et on ferme avec </p>.' }
          ]
        },

        {
          id: 'web-1-2', title: 'Le squelette d\'une vraie page', kind: 'lecon', xp: 20,
          goal: 'Connaître la structure minimale d\'un fichier HTML complet.',
          blocks: [
            { t: 'p', v: "Une page complète a toujours la même ossature. Apprends-la une fois, tu la reecriras toute ta vie." },
            { t: 'code', lang: 'html', v: `<!DOCTYPE html>\n<html lang="fr">\n<head>\n    <meta charset="UTF-8">\n    <title>Le titre dans l'onglet</title>\n</head>\n<body>\n    <h1>Ce que voit le visiteur</h1>\n</body>\n</html>` },
            {
              t: 'table', head: ['Élément', 'Rôle'],
              rows: [
                ['<code>&lt;!DOCTYPE html&gt;</code>', 'prévient le navigateur : c\'est du HTML moderne'],
                ['<code>&lt;html lang="fr"&gt;</code>', 'contient toute la page, en français'],
                ['<code>&lt;head&gt;</code>', 'les infos invisibles : titre d\'onglet, encodage, styles'],
                ['<code>&lt;meta charset="UTF-8"&gt;</code>', 'permet les accents (sans ça : « Ã© » à la place de « é »)'],
                ['<code>&lt;body&gt;</code>', 'tout ce que le visiteur voit']
              ]
            },
            { t: 'tip', h: 'Dans la forge ARES', v: "Pour aller droit au but, l'editeur ci-contre écrit directement le contenu du <code>&lt;body&gt;</code>. Sur ton ordinateur, il faudra le squelette complet dans un fichier <code>index.html</code>." },
            { t: 'h', v: 'Les titres : une hiérarchie' },
            { t: 'code', lang: 'html', run: true, v: `<h1>Titre principal (un seul par page)</h1>\n<h2>Grande partie</h2>\n<h3>Sous-partie</h3>\n<p>Un paragraphe.</p>` },
            { t: 'warn', h: 'Ne saute pas les niveaux', v: "h1 puis h2 puis h3. Un h1 par page. Ce n'est pas une règle esthetique : c'est comme ça que Google et les lecteurs d'écran comprennent ta page." },
            { t: 'key', h: 'A retenir', v: "DOCTYPE, html, head (invisible), body (visible) · h1 a h6 hiérarchisent · charset UTF-8 pour les accents." }
          ],
          ex: [
            {
              brief: "Crée la structure d'un article : un titre principal <code>Mon club</code>, un sous-titre <code>Nos horaires</code>, et un paragraphe <code>On s'entraine le mercredi.</code>",
              starter: '<h1>Mon club</h1>\n',
              hint: 'h1, puis h2, puis p.',
              solution: `<h1>Mon club</h1>\n<h2>Nos horaires</h2>\n<p>On s'entraine le mercredi.</p>`,
              must: [['<h1>', 'Il faut un <h1>.'], ['<h2>', 'Il faut un <h2> pour le sous-titre.'], ['<p>', 'Il faut un paragraphe <p>.']],
              text: ['Mon club', 'Nos horaires', 'entraine le mercredi']
            }
          ],
          quiz: [
            { q: 'Où met-on le titre affiche dans l\'onglet du navigateur ?', opts: ['Dans le body', 'Dans le head, avec <title>', 'Dans un h1'], a: 1, why: '<title> vit dans le <head>. Le <h1> s\'affiche dans la page.' },
            { q: 'À quoi sert meta charset="UTF-8" ?', opts: ['À afficher correctement les accents', 'À choisir la police', 'À charger le CSS'], a: 0, why: 'Sans lui, les caractères accentues s\'affichent en charabia.' }
          ]
        },

        {
          id: 'web-1-3', title: 'Mettre en forme le texte', kind: 'lecon', xp: 25,
          goal: 'Utiliser les balises de texte et les listes.',
          blocks: [
            { t: 'p', v: "Le contenu d'une page, c'est surtout du texte. Voici les balises qui servent tous les jours." },
            { t: 'code', lang: 'html', run: true, v: `<p>Un mot en <strong>gras important</strong> et un autre en <em>italique</em>.</p>\n<p>Une ligne<br>coupee en deux.</p>\n<hr>\n<p>Apres le trait de separation.</p>` },
            { t: 'tip', h: 'strong plutôt que b', v: "<code>&lt;strong&gt;</code> veut dire « c'est important » (et l'affiche en gras). <code>&lt;b&gt;</code> ne veut dire que « en gras ». Les lecteurs d'écran des personnes aveugles insistent sur strong, pas sur b." },
            { t: 'h', v: 'Les listes' },
            { t: 'code', lang: 'html', run: true, v: `<h2>Ma to-do</h2>\n<ul>\n    <li>Apprendre le HTML</li>\n    <li>Apprendre le CSS</li>\n</ul>\n\n<h2>Les etapes, dans l'ordre</h2>\n<ol>\n    <li>Ouvrir l'editeur</li>\n    <li>Ecrire le code</li>\n    <li>Regarder le resultat</li>\n</ol>` },
            { t: 'p', v: "<code>&lt;ul&gt;</code> = liste à puces (unordered), <code>&lt;ol&gt;</code> = liste numerotee (ordered). Dans les deux cas, chaque élément est un <code>&lt;li&gt;</code>." },
            { t: 'warn', h: 'Erreur classique', v: "Un <code>&lt;li&gt;</code> doit toujours être <b>a l'intérieur</b> d'un ul ou d'un ol. Seul, il ne veut rien dire." },
            { t: 'key', h: 'A retenir', v: "strong / em pour l'accent · br et hr sans fermeture · ul + li pour les puces, ol + li pour les numéros." }
          ],
          ex: [
            {
              brief: "Écris un titre <code>Mes 3 passions</code> (h2) suivi d'une liste à puces de trois éléments de ton choix.",
              starter: '<h2>Mes 3 passions</h2>\n<ul>\n  <li></li>\n</ul>\n',
              hint: 'Trois balises <li> a l\'intérieur du <ul>.',
              solution: `<h2>Mes 3 passions</h2>\n<ul>\n  <li>Le skate</li>\n  <li>Le code</li>\n  <li>La musique</li>\n</ul>`,
              must: [['<ul>', 'Il faut une liste <ul>.'], ['(<li>[\\s\\S]*?</li>[\\s\\S]*?){3}', 'Il faut exactement trois elements <li> remplis.']],
              mustnot: [['<li>\\s*</li>', 'Un de tes <li> est vide : ecris quelque chose dedans.']],
              text: ['Mes 3 passions']
            },
            {
              brief: "Écris un paragraphe contenant la phrase <code>Le CSS sert a décorer.</code> avec le mot <code>décorer</code> en gras important (strong).",
              starter: '<p>Le CSS sert a </p>\n',
              hint: '<p>Le CSS sert a <strong>décorer</strong>.</p>',
              solution: `<p>Le CSS sert a <strong>decorer</strong>.</p>`,
              must: [['<strong>\\s*decorer\\s*</strong>', 'Le mot decorer doit etre entoure de <strong>...</strong>.']],
              text: ['Le CSS sert a decorer.']
            }
          ],
          quiz: [
            { q: 'Quelle balise fait une liste numérotée ?', opts: ['<ul>', '<ol>', '<li>'], a: 1, why: 'ol = ordered list = liste ordonnée, donc numerotee.' },
            { q: 'Quelle balise ne se ferme pas ?', opts: ['<p>', '<br>', '<h1>'], a: 1, why: '<br> est une balise orpheline : elle n\'a pas de contenu.' }
          ]
        },

        {
          id: 'web-1-4', title: 'Liens et images', kind: 'lecon', xp: 25,
          goal: 'Relier des pages et afficher des images grace aux attributs.',
          blocks: [
            { t: 'p', v: "Une balise peut recevoir des <b>attributs</b> : des informations supplémentaires écrites dans le chevron ouvrant, sous la forme <code>nom=\"valeur\"</code>." },
            { t: 'h', v: 'Le lien' },
            { t: 'code', lang: 'html', run: true, v: `<p>Va voir <a href="https://fr.wikipedia.org">Wikipedia</a>.</p>\n<p><a href="https://exemple.fr" target="_blank">Ouvrir dans un nouvel onglet</a></p>` },
            { t: 'p', v: "<code>href</code> (hypertext référence) dit <b>ou</b> mene le lien. Le texte entre les balises est ce qu'on clique." },
            { t: 'h', v: "L'image" },
            { t: 'code', lang: 'html', run: true, v: `<img src="https://placehold.co/240x120/E2762E/fff?text=ARES" alt="Une banniere orange ARES" width="240">` },
            {
              t: 'table', head: ['Attribut', 'Rôle'],
              rows: [['<code>src</code>', "l'adresse du fichier image"],
                     ['<code>alt</code>', "la description, lue a voix haute si l'image ne s'affiche pas"],
                     ['<code>width</code> / <code>height</code>', 'la taille en pixels']]
            },
            { t: 'warn', h: "alt n'est pas optionnel", v: "Sans <code>alt</code>, une personne aveugle n'a aucune idée de ce que montre ton image, et Google non plus. C'est une règle professionnelle, pas un detail." },
            { t: 'tip', h: 'Une image cliquable', v: "Mets simplement l'image a l'intérieur du lien : <code>&lt;a href=\"...\"&gt;&lt;img src=\"...\" alt=\"...\"&gt;&lt;/a&gt;</code>." },
            { t: 'key', h: 'A retenir', v: "&lt;a href=\"...\"&gt;texte&lt;/a&gt; · &lt;img src=\"...\" alt=\"...\"&gt; · les attributs vont dans le chevron ouvrant." }
          ],
          ex: [
            {
              brief: "Crée un lien vers <code>https://python.org</code> dont le texte cliquable est <code>Le site officiel de Python</code>.",
              starter: '<p></p>\n',
              hint: '<a href="https://python.org">Le site officiel de Python</a>',
              solution: `<p><a href="https://python.org">Le site officiel de Python</a></p>`,
              must: [['<a\\s[^>]*href=["\\\']https://python\\.org["\\\']', 'Le lien doit pointer vers https://python.org avec l\'attribut href.']],
              text: ['Le site officiel de Python']
            },
            {
              brief: "Affiche l'image <code>https://placehold.co/200x100</code> avec le texte alternatif <code>Ma banniere</code>.",
              starter: '<img src="" alt="">\n',
              hint: 'Remplis les deux attributs src et alt.',
              solution: `<img src="https://placehold.co/200x100" alt="Ma banniere">`,
              must: [['<img[^>]*src=["\\\']https://placehold\\.co/200x100["\\\']', 'L\'attribut src doit contenir l\'adresse exacte de l\'image.'],
                     ['<img[^>]*alt=["\\\']Ma banniere["\\\']', 'L\'attribut alt doit valoir exactement « Ma banniere ».']]
            }
          ],
          quiz: [
            { q: 'Quel attribut indique la destination d\'un lien ?', opts: ['src', 'href', 'link'], a: 1, why: 'href pour les liens, src pour les images.' },
            { q: 'À quoi sert alt sur une image ?', opts: ['A l\'agrandir', 'À la decrire pour l\'accessibilité', 'À la centrer'], a: 1, why: 'C\'est la description lue par les lecteurs d\'écran et affichée si l\'image ne charge pas.' }
          ]
        },

        {
          id: 'web-1-5', title: 'Jeu : la chasse au bug HTML', kind: 'jeu', xp: 30,
          goal: 'Repérer la balise mal écrite. Un oubli de fermeture peut casser une page entiere.',
          game: { type: 'bughunt', bank: 'web1' },
          blocks: [{ t: 'p', v: "Une seule ligne est fautive dans chaque page. Trouve-la." }]
        },

        {
          id: 'web-1-6', title: 'BOSS · Ta page « à propos de moi »', kind: 'boss', xp: 55,
          goal: 'Assembler toutes les balises du jour 1 dans une page coherente.',
          blocks: [
            { t: 'p', v: "Première page complète. Elle doit contenir un titre, une présentation, une liste, une image et un lien. Regarde l'aperçu à chaque étape : c'est ta récompense immédiate." }
          ],
          ex: [
            {
              brief: "Construis une page contenant, dans cet ordre : un <code>h1</code> avec ton titre, un <code>p</code> de présentation, un <code>h2</code> <code>Mes passions</code>, une liste <code>ul</code> d'au moins 2 éléments, une image (avec src et alt) et un lien.",
              starter: '<h1>A propos de moi</h1>\n<p>Je m\'appelle ... et j\'apprends a coder.</p>\n\n',
              hint: "Reprends chaque balise vue aujourd'hui : h1, p, h2, ul + li, img, a.",
              solution: `<h1>A propos de moi</h1>\n<p>Je m'appelle Lea et j'apprends a coder sur ARES.</p>\n<h2>Mes passions</h2>\n<ul>\n  <li>Le code</li>\n  <li>Le basket</li>\n</ul>\n<img src="https://placehold.co/200x100" alt="Ma photo de profil">\n<p><a href="https://python.org">Mon langage prefere</a></p>`,
              must: [
                ['<h1>[\\s\\S]*?</h1>', 'Il manque le titre principal <h1>.'],
                ['<p>[\\s\\S]*?</p>', 'Il manque un paragraphe <p> de presentation.'],
                ['<h2>[\\s\\S]*?</h2>', 'Il manque le sous-titre <h2>.'],
                ['<ul>[\\s\\S]*?<li>[\\s\\S]*?</li>[\\s\\S]*?<li>[\\s\\S]*?</li>[\\s\\S]*?</ul>', 'Il manque une liste <ul> avec au moins deux <li>.'],
                ['<img[^>]*src=["\\\'][^"\\\']+["\\\'][^>]*>', 'Il manque une image avec un attribut src rempli.'],
                ['<img[^>]*alt=["\\\'][^"\\\']+["\\\']', 'Ton image doit avoir un texte alternatif alt non vide.'],
                ['<a[^>]*href=["\\\'][^"\\\']+["\\\'][^>]*>[\\s\\S]*?</a>', 'Il manque un lien <a href="..."> avec du texte.']
              ],
              success: "Jour 1 termine : tu sais structurer une page web. Demain, on la rend belle."
            }
          ]
        }
      ]
    },

    /* ======================= JOUR 2 ======================= */
    {
      n: 2, title: 'Donner du style', sub: 'CSS : couleurs, boîtes, sélecteurs, flexbox',
      lessons: [
        {
          id: 'web-2-1', title: 'Le CSS : couleurs et texte', kind: 'lecon', xp: 25,
          goal: 'Écrire des règles CSS et modifier l\'apparence du texte.',
          blocks: [
            { t: 'p', v: "Le HTML dit <i>ce que c'est</i>. Le CSS dit <i>à quoi ça ressemble</i>. On écrit le CSS dans une balise <code>&lt;style&gt;</code>." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  h1 {\n    color: #E2762E;\n    font-size: 42px;\n  }\n  p {\n    color: #444;\n    font-family: Arial, sans-serif;\n  }\n</style>\n\n<h1>Un titre orange</h1>\n<p>Un paragraphe gris en Arial.</p>` },
            { t: 'h', v: 'Anatomie d\'une règle CSS' },
            { t: 'code', v: `h1 {              /* le SELECTEUR : quoi ? */\n  color: red;     /* PROPRIETE : valeur ;   */\n}` },
            { t: 'ul', v: [
              "Le <b>sélecteur</b> designe les éléments à modifier (<code>h1</code> = tous les h1).",
              "Chaque déclaration s'écrit <code>propriete: valeur;</code> — le point-virgule est obligatoire.",
              "Tout tient entre accolades <code>{ }</code>."
            ] },
            { t: 'h', v: 'Les couleurs' },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .nom  { color: red; }\n  .code { color: #4FBFB4; }\n  .rgb  { color: rgb(226, 118, 46); }\n  body  { background-color: #1A1211; }\n</style>\n\n<p class="nom">Par son nom : red</p>\n<p class="code">Par code hexa : #4FBFB4</p>\n<p class="rgb">Par rouge-vert-bleu</p>` },
            { t: 'tip', h: 'Le code hexadecimal', v: "<code>#E2762E</code> = deux caractères de rouge, deux de vert, deux de bleu, de 00 (rien) a FF (maximum). <code>#000000</code> est noir, <code>#FFFFFF</code> blanc." },
            { t: 'h', v: 'Les proprietes de texte utiles' },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  p {\n    font-size: 20px;\n    font-weight: bold;\n    text-align: center;\n    line-height: 1.8;\n    text-transform: uppercase;\n  }\n</style>\n<p>Un texte transforme</p>` },
            { t: 'key', h: 'A retenir', v: "sélecteur { propriete: valeur; } · color = texte, background-color = fond · le point-virgule termine chaque ligne." }
          ],
          ex: [
            {
              brief: "Ajoute un bloc <code>&lt;style&gt;</code> qui met tous les <code>h1</code> en couleur <code>#E2762E</code> et centres (<code>text-align: center</code>).",
              starter: '<style>\n  h1 {\n    \n  }\n</style>\n\n<h1>Forge ARES</h1>\n',
              hint: 'Deux déclarations dans la règle h1 : color et text-align.',
              solution: `<style>\n  h1 {\n    color: #E2762E;\n    text-align: center;\n  }\n</style>\n\n<h1>Forge ARES</h1>`,
              must: [['h1\\s*\\{[\\s\\S]*color\\s*:\\s*#E2762E', 'La regle h1 doit contenir color: #E2762E;'],
                     ['h1\\s*\\{[\\s\\S]*text-align\\s*:\\s*center', 'La règle h1 doit contenir text-align: center;']]
            }
          ],
          quiz: [
            { q: 'Quel caractère termine chaque déclaration CSS ?', opts: ['Le point .', 'Le point-virgule ;', 'La virgule ,'], a: 1, why: 'Sans point-virgule, la déclaration suivante est ignoree.' },
            { q: 'Que fait background-color ?', opts: ['Change la couleur du texte', 'Change la couleur du fond', 'Change la police'], a: 1, why: 'color = texte, background-color = fond.' }
          ]
        },

        {
          id: 'web-2-2', title: 'Le modèle de boîte', kind: 'lecon', xp: 30,
          goal: 'Comprendre padding, border et margin — la base de toute mise en page.',
          blocks: [
            { t: 'p', v: "En CSS, <b>tout élément est une boîte rectangulaire</b>. Même un mot. Maîtriser ces trois proprietes, c'est maîtriser la moitie du CSS." },
            {
              t: 'table', head: ['Propriete', 'Ou ?', 'Image mentale'],
              rows: [['<code>padding</code>', 'a l\'INTERIEUR, entre le contenu et le bord', 'la mousse dans le carton'],
                     ['<code>border</code>', 'le bord lui-même', 'le carton'],
                     ['<code>margin</code>', 'a l\'EXTERIEUR, entre cette boîte et les autres', 'l\'espace vide autour du colis']]
            },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .boite {\n    background: #F6B23D;\n    padding: 20px;\n    border: 3px solid #E2762E;\n    margin: 20px;\n    border-radius: 12px;\n  }\n</style>\n\n<div class="boite">Une boite avec de l'air autour du texte</div>\n<div class="boite">Une deuxieme boite</div>` },
            { t: 'p', v: "Change <code>padding: 20px</code> en <code>padding: 4px</code> et relance : le texte etouffe. C'est le padding qui donne l'impression de « propre »." },
            { t: 'h', v: 'La balise div' },
            { t: 'p', v: "<code>&lt;div&gt;</code> est une boîte sans signification particulière : elle sert a <b>grouper</b> des éléments pour les styler ensemble." },
            { t: 'h', v: 'Taille et centrage' },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .carte {\n    width: 260px;\n    margin: 0 auto;          /* haut/bas 0, gauche/droite automatique = centre */\n    padding: 16px;\n    background: #241917;\n    color: #F6ECE3;\n    border-radius: 10px;\n    text-align: center;\n  }\n</style>\n\n<div class="carte">Carte centree</div>` },
            { t: 'tip', h: 'Le raccourci qui sauve', v: "<code>margin: 0 auto;</code> centre horizontalement n'importe quelle boîte qui a une largeur. À retenir par coeur." },
            { t: 'key', h: 'A retenir', v: "padding = dedans · border = le bord · margin = dehors · div groupe · margin: 0 auto centre." }
          ],
          ex: [
            {
              brief: "Crée une <code>div</code> de classe <code>encadre</code> contenant <code>Attention</code>, avec un fond <code>#F6B23D</code>, un padding de <code>16px</code> et une bordure <code>2px solid #E2762E</code>.",
              starter: '<style>\n  .encadre {\n    \n  }\n</style>\n\n<div class="encadre">Attention</div>\n',
              hint: 'Trois déclarations : background, padding, border.',
              solution: `<style>\n  .encadre {\n    background: #F6B23D;\n    padding: 16px;\n    border: 2px solid #E2762E;\n  }\n</style>\n\n<div class="encadre">Attention</div>`,
              must: [['\\.encadre\\s*\\{[\\s\\S]*background', 'La classe .encadre doit definir un fond (background).'],
                     ['padding\\s*:\\s*16px', 'Il faut padding: 16px;'],
                     ['border\\s*:\\s*2px\\s+solid', 'Il faut border: 2px solid #E2762E;']],
              text: ['Attention']
            }
          ],
          quiz: [
            { q: 'Quelle propriete ajoute de l\'espace A L\'INTERIEUR d\'une boîte ?', opts: ['margin', 'padding', 'border'], a: 1, why: 'padding pousse le contenu loin du bord ; margin ecarte la boîte des autres.' },
            { q: 'Que fait margin: 0 auto ?', opts: ['Centre la boîte horizontalement', 'Supprime les marges', 'Colle la boîte en haut'], a: 0, why: '« auto » répartit l\'espace restant à gauche et à droite, donc centre.' }
          ]
        },

        {
          id: 'web-2-3', title: 'Classes et id : viser juste', kind: 'lecon', xp: 25,
          goal: 'Cibler précisément les éléments à styler.',
          blocks: [
            { t: 'p', v: "Styler <code>p</code> touche <b>tous</b> les paragraphes. Souvent tu veux n'en toucher qu'un. C'est le rôle des classes." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .alerte  { color: #E2544B; font-weight: bold; }\n  .discret { color: #8C776C; font-size: 13px; }\n  #unique  { background: #241917; color: white; padding: 10px; }\n</style>\n\n<p class="alerte">Attention, danger !</p>\n<p class="discret">Petite note de bas de page.</p>\n<p id="unique">Element unique dans la page.</p>` },
            {
              t: 'table', head: ['Type', 'HTML', 'CSS', 'Quand ?'],
              rows: [['classe', '<code>class="alerte"</code>', '<code>.alerte</code>', 'réutilisable autant de fois qu\'on veut'],
                     ['id', '<code>id="menu"</code>', '<code>#menu</code>', 'une seule fois dans la page']]
            },
            { t: 'tip', h: 'La règle des pros', v: "Utilise des <b>classes</b> 95% du temps. Les id servent surtout de点 d'ancrage pour le JavaScript ou les liens internes." },
            { t: 'h', v: 'Plusieurs classes, sélecteurs combines' },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .carte  { padding: 14px; border: 1px solid #ccc; border-radius: 8px; }\n  .rouge  { border-color: #E2544B; }\n  .carte p { color: #666; }        /* les p A L'INTERIEUR d'une carte */\n</style>\n\n<div class="carte rouge">\n  <h3>Titre</h3>\n  <p>Texte gris, car il est dans une carte.</p>\n</div>` },
            { t: 'key', h: 'A retenir', v: ".classe est réutilisable · #id est unique · « A B » cible B a l'intérieur de A · un élément peut cumuler plusieurs classes." }
          ],
          ex: [
            {
              brief: "Deux paragraphes existent. Donne au premier la classe <code>important</code> (rouge <code>#E2544B</code> et gras) sans toucher au second.",
              starter: '<style>\n  \n</style>\n\n<p>Ceci est un message normal.</p>\n<p>Ceci est une alerte.</p>\n',
              hint: 'Ajoute class="important" au bon paragraphe, puis la règle .important dans le style.',
              solution: `<style>\n  .important { color: #E2544B; font-weight: bold; }\n</style>\n\n<p>Ceci est un message normal.</p>\n<p class="important">Ceci est une alerte.</p>`,
              must: [['\\.important\\s*\\{[\\s\\S]*color', 'Il faut une regle CSS .important avec une couleur.'],
                     ['class=["\\\']important["\\\']', 'Un des paragraphes doit porter class="important".'],
                     ['font-weight\\s*:\\s*bold', 'La classe doit aussi mettre le texte en gras.']]
            }
          ],
          quiz: [
            { q: 'Comment cible-t-on la classe "menu" en CSS ?', opts: ['#menu', '.menu', 'menu'], a: 1, why: 'Le point pour les classes, le diese pour les id.' },
            { q: 'Combien de fois peut-on utiliser le même id dans une page ?', opts: ['Une seule', 'Autant qu\'on veut', 'Trois maximum'], a: 0, why: 'Un id doit être unique ; pour répéter, utilise une classe.' }
          ]
        },

        {
          id: 'web-2-4', title: 'Flexbox : aligner enfin sans souffrir', kind: 'lecon', xp: 35,
          goal: 'Placer des éléments cote à cote et les centrer proprement.',
          blocks: [
            { t: 'p', v: "Pendant vingt ans, centrer une boîte a été le cauchemar du web. Flexbox a règle le problème. Trois lignes suffisent." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .rangee {\n    display: flex;\n    gap: 12px;\n  }\n  .case { background: #E2762E; color: white; padding: 20px; border-radius: 8px; }\n</style>\n\n<div class="rangee">\n  <div class="case">1</div>\n  <div class="case">2</div>\n  <div class="case">3</div>\n</div>` },
            { t: 'p', v: "<code>display: flex</code> transforme un conteneur en <b>rangee</b> : ses enfants se placent cote à cote. <code>gap</code> met de l'espace entre eux." },
            { t: 'h', v: 'Les deux proprietes qui font tout' },
            {
              t: 'table', head: ['Propriete', 'Effet'],
              rows: [['<code>justify-content</code>', 'répartit horizontalement : flex-start, center, space-between, space-around'],
                     ['<code>align-items</code>', 'aligne verticalement : flex-start, center, stretch'],
                     ['<code>flex-direction</code>', 'row (défaut) ou column pour empiler'],
                     ['<code>flex-wrap</code>', 'wrap autorise le passage à la ligne']]
            },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .barre {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: #241917;\n    padding: 14px 18px;\n    border-radius: 10px;\n    color: #F6ECE3;\n  }\n  .logo { font-size: 22px; font-weight: bold; color: #F6B23D; }\n</style>\n\n<div class="barre">\n  <div class="logo">ARES</div>\n  <div>Accueil · Cours · Contact</div>\n</div>` },
            { t: 'tip', h: 'Le centrage parfait', v: "<code>display:flex; justify-content:center; align-items:center;</code> centre un contenu horizontalement ET verticalement. C'est LE combo à retenir." },
            { t: 'key', h: 'A retenir', v: "display:flex sur le PARENT · gap espace les enfants · justify-content = horizontal · align-items = vertical." }
          ],
          ex: [
            {
              brief: "Transforme le conteneur <code>.menu</code> en barre horizontale : les trois liens cote à cote, espaces de <code>16px</code>, avec le contenu reparti par <code>space-between</code>.",
              starter: '<style>\n  .menu {\n    background: #241917;\n    padding: 12px;\n  }\n</style>\n\n<div class="menu">\n  <span>Accueil</span>\n  <span>Cours</span>\n  <span>Contact</span>\n</div>\n',
              hint: 'Ajoute display: flex; gap: 16px; justify-content: space-between; à la règle .menu.',
              solution: `<style>\n  .menu {\n    background: #241917;\n    padding: 12px;\n    display: flex;\n    gap: 16px;\n    justify-content: space-between;\n  }\n</style>\n\n<div class="menu">\n  <span>Accueil</span>\n  <span>Cours</span>\n  <span>Contact</span>\n</div>`,
              must: [['display\\s*:\\s*flex', 'Il faut display: flex; sur le conteneur.'],
                     ['gap\\s*:\\s*16px', 'Il faut gap: 16px;'],
                     ['justify-content\\s*:\\s*space-between', 'Il faut justify-content: space-between;']]
            }
          ],
          quiz: [
            { q: 'Sur quel élément applique-t-on display: flex ?', opts: ['Sur les enfants', 'Sur le conteneur parent', 'Sur le body uniquement'], a: 1, why: 'Le parent devient flex, ce sont ses enfants directs qui s\'alignent.' },
            { q: 'Quelle propriete centre verticalement dans un flex en rangee ?', opts: ['justify-content: center', 'align-items: center', 'text-align: center'], a: 1, why: 'align-items gere l\'axe vertical quand la direction est row.' }
          ]
        },

        {
          id: 'web-2-5', title: 'Jeu : devine le rendu', kind: 'jeu', xp: 30,
          goal: 'Associer une règle CSS a son effet visuel.',
          game: { type: 'quizgame', bank: 'css' },
          blocks: [{ t: 'p', v: "Série rapide : lis la règle, choisis l'effet. Enchaine les bonnes réponses pour faire monter ton combo." }]
        },

        {
          id: 'web-2-6', title: 'BOSS · La carte de profil', kind: 'boss', xp: 60,
          goal: 'Reproduire un composant réel : la carte de profil qu\'on trouve sur tous les sites.',
          blocks: [
            { t: 'p', v: "Objectif : une carte centree, avec un fond sombre, des coins arrondis, du padding, un titre orange et une rangee de deux boutons cote à cote." },
            { t: 'p', v: "C'est exactement le type de composant qu'on demande a un développeur junior en test technique." }
          ],
          ex: [
            {
              brief: "Complète le CSS : <code>.carte</code> doit avoir une largeur de <code>280px</code>, être centree (<code>margin: 0 auto</code>), avoir <code>padding: 20px</code>, un fond <code>#241917</code> et <code>border-radius: 14px</code>. Le <code>h2</code> doit être en <code>#F6B23D</code>. La classe <code>.actions</code> doit être en flex avec <code>gap: 10px</code>.",
              starter: '<style>\n  .carte {\n    \n  }\n  .carte h2 {\n    \n  }\n  .actions {\n    \n  }\n  .actions button {\n    padding: 8px 14px; border: 0; border-radius: 6px;\n    background: #E2762E; color: white; cursor: pointer;\n  }\n</style>\n\n<div class="carte">\n  <h2>Nova</h2>\n  <p>Apprentie forgeronne, niveau 7.</p>\n  <div class="actions">\n    <button>Suivre</button>\n    <button>Message</button>\n  </div>\n</div>\n',
              hint: 'Recopie les valeurs demandees une par une, chacune terminee par un point-virgule.',
              solution: `<style>\n  .carte {\n    width: 280px;\n    margin: 0 auto;\n    padding: 20px;\n    background: #241917;\n    border-radius: 14px;\n  }\n  .carte h2 {\n    color: #F6B23D;\n  }\n  .actions {\n    display: flex;\n    gap: 10px;\n  }\n  .actions button {\n    padding: 8px 14px; border: 0; border-radius: 6px;\n    background: #E2762E; color: white; cursor: pointer;\n  }\n</style>\n\n<div class="carte">\n  <h2>Nova</h2>\n  <p>Apprentie forgeronne, niveau 7.</p>\n  <div class="actions">\n    <button>Suivre</button>\n    <button>Message</button>\n  </div>\n</div>`,
              must: [['width\\s*:\\s*280px', 'La carte doit faire 280px de large.'],
                     ['margin\\s*:\\s*0\\s+auto', 'La carte doit être centree avec margin: 0 auto;'],
                     ['padding\\s*:\\s*20px', 'Il manque padding: 20px;'],
                     ['background\\s*:\\s*#241917', 'Il manque le fond #241917.'],
                     ['border-radius\\s*:\\s*14px', 'Il manque border-radius: 14px;'],
                     ['h2\\s*\\{[\\s\\S]*?color\\s*:\\s*#F6B23D', 'Le h2 doit être en #F6B23D.'],
                     ['\\.actions\\s*\\{[\\s\\S]*?display\\s*:\\s*flex', 'La zone .actions doit être en display: flex;'],
                     ['\\.actions\\s*\\{[\\s\\S]*?gap\\s*:\\s*10px', 'Il manque gap: 10px; dans .actions.']],
              success: "Jour 2 termine. Tu sais habiller une page : couleurs, boîtes, sélecteurs et flexbox."
            }
          ]
        }
      ]
    },

    /* ======================= JOUR 3 ======================= */
    {
      n: 3, title: 'Une page professionnelle', sub: 'Semantique, formulaires, responsive, projet',
      lessons: [
        {
          id: 'web-3-1', title: 'La structure semantique', kind: 'lecon', xp: 25,
          goal: 'Organiser une page comme un professionnel avec header, nav, main, section et footer.',
          blocks: [
            { t: 'p', v: "On pourrait tout faire avec des <code>div</code>. Mais une page pro utilise des balises qui <b>disent ce que sont</b> les zones." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  header, nav, main, footer { padding: 12px; margin-bottom: 8px; border-radius: 8px; }\n  header { background: #E2762E; color: white; }\n  nav    { background: #F6B23D; }\n  main   { background: #f4f4f4; }\n  footer { background: #241917; color: #B9A395; font-size: 13px; }\n</style>\n\n<header><h1>Mon site</h1></header>\n<nav>Accueil · Cours · Contact</nav>\n<main>\n  <section>\n    <h2>Bienvenue</h2>\n    <p>Le contenu principal de la page.</p>\n  </section>\n</main>\n<footer>2026 - Tous droits reserves</footer>` },
            {
              t: 'table', head: ['Balise', 'Contenu attendu'],
              rows: [['<code>&lt;header&gt;</code>', 'le haut de page : logo, titre'],
                     ['<code>&lt;nav&gt;</code>', 'les liens de navigation'],
                     ['<code>&lt;main&gt;</code>', 'le contenu principal, unique dans la page'],
                     ['<code>&lt;section&gt;</code>', 'une grande partie thematique'],
                     ['<code>&lt;article&gt;</code>', 'un contenu autonome (un billet, une fiche)'],
                     ['<code>&lt;aside&gt;</code>', 'un contenu de cote'],
                     ['<code>&lt;footer&gt;</code>', 'le bas de page']]
            },
            { t: 'tip', h: 'Pourquoi ça compte vraiment', v: "Google lit ces balises pour comprendre ta page, et les lecteurs d'écran permettent de sauter directement au <code>main</code>. Une page en div partout est illisible pour eux." },
            { t: 'key', h: 'A retenir', v: "header / nav / main / section / footer remplacent les div anonymes · un seul main par page." }
          ],
          ex: [
            {
              brief: "Structure une page avec, dans l'ordre : un <code>header</code> contenant un <code>h1</code>, un <code>nav</code>, un <code>main</code> contenant une <code>section</code> avec un <code>h2</code> et un <code>p</code>, puis un <code>footer</code>.",
              starter: '<header>\n  <h1>Club robotique</h1>\n</header>\n',
              hint: 'Empile les cinq balises. Chacune doit être fermee.',
              solution: `<header>\n  <h1>Club robotique</h1>\n</header>\n<nav>Accueil · Projets · Contact</nav>\n<main>\n  <section>\n    <h2>Nos projets</h2>\n    <p>Nous construisons un robot suiveur de ligne.</p>\n  </section>\n</main>\n<footer>Club robotique - 2026</footer>`,
              must: [['<header>[\\s\\S]*<h1>[\\s\\S]*</h1>[\\s\\S]*</header>', 'Le <header> doit contenir un <h1>.'],
                     ['<nav>[\\s\\S]*</nav>', 'Il manque la balise <nav>.'],
                     ['<main>[\\s\\S]*<section>[\\s\\S]*<h2>[\\s\\S]*</h2>[\\s\\S]*<p>[\\s\\S]*</p>[\\s\\S]*</section>[\\s\\S]*</main>', 'Le <main> doit contenir une <section> avec un <h2> et un <p>.'],
                     ['<footer>[\\s\\S]*</footer>', 'Il manque la balise <footer>.']]
            }
          ],
          quiz: [
            { q: 'Combien de <main> par page ?', opts: ['Un seul', 'Autant qu\'on veut', 'Un par section'], a: 0, why: 'Le contenu principal est unique par définition.' },
            { q: 'Quelle balise pour les liens de navigation ?', opts: ['<menu>', '<nav>', '<links>'], a: 1, why: '<nav> est la balise dediee à la navigation.' }
          ]
        },

        {
          id: 'web-3-2', title: 'Les formulaires', kind: 'lecon', xp: 30,
          goal: 'Créer des champs de saisie utilisables et accessibles.',
          blocks: [
            { t: 'p', v: "Dès qu'un site demande une information, c'est un formulaire : inscription, recherche, contact, commande." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  label { display: block; margin-top: 10px; font-weight: bold; }\n  input, textarea, select { padding: 8px; width: 100%; max-width: 320px; }\n  button { margin-top: 12px; padding: 10px 18px; }\n</style>\n\n<form>\n  <label for="pseudo">Pseudo</label>\n  <input type="text" id="pseudo" placeholder="Ton pseudo">\n\n  <label for="mail">Email</label>\n  <input type="email" id="mail" placeholder="toi@exemple.fr">\n\n  <label for="age">Age</label>\n  <input type="number" id="age" min="8" max="99">\n\n  <label for="msg">Message</label>\n  <textarea id="msg" rows="3"></textarea>\n\n  <button type="submit">Envoyer</button>\n</form>` },
            { t: 'h', v: 'Les types d\'input qui changent tout' },
            {
              t: 'table', head: ['type', 'Effet'],
              rows: [['<code>text</code>', 'texte libre'], ['<code>email</code>', 'vérifie la presence du @, clavier adapte sur mobile'],
                     ['<code>number</code>', 'chiffres seulement, avec fleches'], ['<code>password</code>', 'masque la saisie'],
                     ['<code>date</code>', 'ouvre un calendrier'], ['<code>checkbox</code> / <code>radio</code>', 'cases à cocher / choix unique']]
            },
            { t: 'warn', h: 'Le label n\'est pas decoratif', v: "L'attribut <code>for</code> du label doit valoir le <code>id</code> du champ. Résultat : cliquer sur le texte place le curseur dans le champ, et les lecteurs d'écran annoncent le bon libelle. C'est la règle d'accessibilité la plus souvent oubliee." },
            { t: 'key', h: 'A retenir', v: "form contient les champs · label for = id du champ · type change le comportement · placeholder n'est pas un label." }
          ],
          ex: [
            {
              brief: "Crée un formulaire avec un champ texte pour le pseudo (id <code>pseudo</code>, avec son label) et un bouton <code>Rejoindre</code>.",
              starter: '<form>\n  \n</form>\n',
              hint: '<label for="pseudo">...</label> puis <input type="text" id="pseudo"> puis <button>.',
              solution: `<form>\n  <label for="pseudo">Pseudo</label>\n  <input type="text" id="pseudo">\n  <button type="submit">Rejoindre</button>\n</form>`,
              must: [['<form>[\\s\\S]*</form>', 'Il faut une balise <form>.'],
                     ['<label[^>]*for=["\\\']pseudo["\\\']', 'Le label doit avoir for="pseudo".'],
                     ['<input[^>]*id=["\\\']pseudo["\\\']', 'Le champ doit avoir id="pseudo".'],
                     ['<button[^>]*>\\s*Rejoindre', 'Il faut un bouton dont le texte est Rejoindre.']]
            }
          ],
          quiz: [
            { q: 'À quoi sert l\'attribut for d\'un label ?', opts: ['À le styler', 'À le relier au champ portant cet id', 'À définir sa largeur'], a: 1, why: 'for = id du champ : ça relie le libelle a la zone de saisie.' },
            { q: 'Quel type d\'input masque le texte saisi ?', opts: ['hidden', 'password', 'secret'], a: 1, why: 'type="password" affiche des points à la place des caractères.' }
          ]
        },

        {
          id: 'web-3-3', title: 'S\'adapter aux écrans', kind: 'lecon', xp: 30,
          goal: 'Rendre une page lisible sur téléphone comme sur ordinateur.',
          blocks: [
            { t: 'p', v: "Plus de la moitie du web est consulte sur téléphone. Une page qui oblige à zoomer est une page ratee." },
            { t: 'h', v: '1. La balise meta viewport' },
            { t: 'p', v: "À mettre dans le <code>&lt;head&gt;</code> de toute page. Sans elle, le téléphone fait semblant d'être un ordinateur et affiche tout en minuscule." },
            { t: 'code', v: `<meta name="viewport" content="width=device-width, initial-scale=1">` },
            { t: 'h', v: '2. Des tailles souples' },
            { t: 'p', v: "Évite <code>width: 900px</code> qui deborde sur mobile. Prefere des pourcentages et <code>max-width</code>." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .contenu {\n    width: 100%;\n    max-width: 620px;    /* jamais plus large que 620px */\n    margin: 0 auto;\n    padding: 16px;\n    background: #f4f4f4;\n  }\n  img { max-width: 100%; }   /* une image ne deborde jamais */\n</style>\n\n<div class="contenu">\n  <h2>Colonne souple</h2>\n  <p>Elle s'adapte a la largeur disponible, avec une limite.</p>\n</div>` },
            { t: 'h', v: '3. Les media queries' },
            { t: 'p', v: "Elles appliquent des règles différentes selon la largeur de l'ecran." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .grille { display: flex; gap: 12px; flex-wrap: wrap; }\n  .bloc { background: #E2762E; color: white; padding: 20px; flex: 1 1 160px; border-radius: 8px; }\n\n  @media (max-width: 600px) {\n    .bloc { background: #4FBFB4; }   /* sur petit ecran, autre couleur */\n  }\n</style>\n\n<div class="grille">\n  <div class="bloc">A</div>\n  <div class="bloc">B</div>\n  <div class="bloc">C</div>\n</div>` },
            { t: 'tip', h: 'Teste sans téléphone', v: "Réduis simplement la fenêtre de ton navigateur : les media queries se declenchent pareil." },
            { t: 'key', h: 'A retenir', v: "meta viewport obligatoire · max-width plutôt que width fixe · img { max-width: 100% } · @media pour adapter." }
          ],
          ex: [
            {
              brief: "Rends le bloc <code>.zone</code> souple : largeur <code>100%</code>, <code>max-width: 500px</code>, centre. Ajoute une media query qui, en dessous de <code>600px</code>, met son fond en <code>#4FBFB4</code>.",
              starter: '<style>\n  .zone {\n    background: #E2762E;\n    color: white;\n    padding: 20px;\n  }\n</style>\n\n<div class="zone">Redimensionne la fenetre</div>\n',
              hint: 'Ajoute width, max-width et margin dans .zone, puis un bloc @media (max-width: 600px) { .zone { ... } }.',
              solution: `<style>\n  .zone {\n    background: #E2762E;\n    color: white;\n    padding: 20px;\n    width: 100%;\n    max-width: 500px;\n    margin: 0 auto;\n  }\n  @media (max-width: 600px) {\n    .zone { background: #4FBFB4; }\n  }\n</style>\n\n<div class="zone">Redimensionne la fenetre</div>`,
              must: [['max-width\\s*:\\s*500px', 'Il faut max-width: 500px; sur .zone.'],
                     ['margin\\s*:\\s*0\\s+auto', 'Centre la zone avec margin: 0 auto;'],
                     ['@media[^{]*max-width\\s*:\\s*600px', 'Il manque la media query @media (max-width: 600px).'],
                     ['@media[\\s\\S]*#4FBFB4', 'Dans la media query, le fond doit devenir #4FBFB4.']]
            }
          ],
          quiz: [
            { q: 'Que fait img { max-width: 100% } ?', opts: ['Agrandit toutes les images', 'Empeche une image de deborder de son conteneur', 'Centre les images'], a: 1, why: 'L\'image ne depassera jamais la largeur disponible.' },
            { q: 'Quand s\'applique @media (max-width: 600px) ?', opts: ['Sur les écrans de 600px ou moins', 'Sur les écrans de plus de 600px', 'Uniquement a l\'impression'], a: 0, why: 'max-width = « jusqu\'à cette largeur ».' }
          ]
        },

        {
          id: 'web-3-4', title: 'Jeu : remets la page dans l\'ordre', kind: 'jeu', xp: 30,
          goal: 'Reconstituer une page HTML valide à partir de lignes melangees.',
          game: { type: 'order', bank: 'web3' },
          blocks: [{ t: 'p', v: "Les balises doivent s'ouvrir et se fermer dans le bon ordre. Clique dans l'ordre correct." }]
        },

        {
          id: 'web-3-5', title: 'PROJET · La page de ton club', kind: 'projet', xp: 60,
          goal: 'Assembler structure semantique, style et flexbox dans une page complète.',
          blocks: [
            { t: 'p', v: "Ton projet : la page d'accueil d'un club (sport, jeux video, robotique, musique — à toi de choisir). Elle doit tenir debout toute seule." },
            { t: 'h', v: 'Le cahier des charges' },
            { t: 'ol', v: [
              "Un <code>header</code> avec le nom du club en <code>h1</code>.",
              "Un <code>nav</code> en flexbox avec au moins 3 liens.",
              "Un <code>main</code> avec une <code>section</code> de presentation (h2 + paragraphe).",
              "Une liste des activites (<code>ul</code> avec au moins 3 <code>li</code>).",
              "Un <code>footer</code>.",
              "Un bloc <code>&lt;style&gt;</code> qui définit au moins une couleur de fond et le flex du menu."
            ] },
            { t: 'tip', h: 'Methode de pro', v: "Écris <b>d'abord tout le HTML sans style</b>, vérifie que la structure est logique, et style ensuite. Faire les deux en même temps est le meilleur moyen de s'emmeler." }
          ],
          ex: [
            {
              brief: "Réalise la page complète du club en respectant les 6 points du cahier des charges ci-contre.",
              starter: '<style>\n  body { font-family: Arial, sans-serif; }\n  nav { }\n</style>\n\n<header>\n  <h1>Club </h1>\n</header>\n',
              hint: "Reprends la structure : header > h1, nav (display:flex), main > section > h2 + p, ul avec 3 li, footer. N'oublie pas de fermer chaque balise.",
              solution: `<style>\n  body { font-family: Arial, sans-serif; background: #f7f4f2; }\n  header { background: #E2762E; color: white; padding: 18px; border-radius: 10px; }\n  nav { display: flex; gap: 18px; padding: 12px; }\n  main { padding: 12px; }\n  footer { background: #241917; color: #B9A395; padding: 12px; border-radius: 10px; }\n</style>\n\n<header>\n  <h1>Club Robotique</h1>\n</header>\n<nav>\n  <a href="#accueil">Accueil</a>\n  <a href="#activites">Activites</a>\n  <a href="#contact">Contact</a>\n</nav>\n<main>\n  <section>\n    <h2>Qui sommes-nous ?</h2>\n    <p>Nous construisons des robots tous les mercredis apres-midi.</p>\n  </section>\n  <ul>\n    <li>Programmation Arduino</li>\n    <li>Impression 3D</li>\n    <li>Competition regionale</li>\n  </ul>\n</main>\n<footer>Club Robotique - 2026</footer>`,
              must: [['<header>[\\s\\S]*<h1>[\\s\\S]*</h1>[\\s\\S]*</header>', 'Il faut un <header> contenant un <h1>.'],
                     ['<nav>[\\s\\S]*</nav>', 'Il manque le <nav>.'],
                     ['nav[^}]*display\\s*:\\s*flex', 'Le <nav> doit être en display: flex; dans le CSS.'],
                     ['<main>[\\s\\S]*<section>[\\s\\S]*<h2>[\\s\\S]*</h2>[\\s\\S]*<p>[\\s\\S]*</p>', 'Le <main> doit contenir une <section> avec h2 et paragraphe.'],
                     ['<ul>[\\s\\S]*(<li>[\\s\\S]*?</li>[\\s\\S]*?){3}</ul>', 'Il faut une liste de 3 activités minimum.'],
                     ['<footer>[\\s\\S]*</footer>', 'Il manque le <footer>.'],
                     ['(background|background-color)\\s*:', 'Ton CSS doit définir au moins une couleur de fond.']],
              success: "Une page complète, structurée et stylee. Mets-la dans un fichier index.html : elle marche telle quelle dans n'importe quel navigateur."
            }
          ]
        },

        {
          id: 'web-3-6', title: 'BOSS FINAL · L\'epreuve du Bâtisseur', kind: 'boss', xp: 90,
          goal: 'Deux defis qui mobilisent les 3 jours.',
          blocks: [{ t: 'p', v: "Dernière epreuve. Précision demandée : chaque exigence est vérifiée automatiquement." }],
          ex: [
            {
              brief: "<b>Defi 1 — La banniere centree.</b> Crée une <code>div</code> de classe <code>heros</code> contenant un <code>h1</code> et un <code>p</code>, avec : fond <code>#241917</code>, texte blanc, <code>padding: 40px</code>, <code>text-align: center</code> et <code>border-radius: 16px</code>.",
              starter: '<style>\n  .heros {\n    \n  }\n</style>\n\n<div class="heros">\n  <h1>Bienvenue</h1>\n  <p>Le club le plus rapide de la region.</p>\n</div>\n',
              hint: 'Cinq déclarations dans .heros.',
              solution: `<style>\n  .heros {\n    background: #241917;\n    color: white;\n    padding: 40px;\n    text-align: center;\n    border-radius: 16px;\n  }\n</style>\n\n<div class="heros">\n  <h1>Bienvenue</h1>\n  <p>Le club le plus rapide de la region.</p>\n</div>`,
              must: [['\\.heros[\\s\\S]*background\\s*:\\s*#241917', 'Fond #241917 attendu.'],
                     ['\\.heros[\\s\\S]*color\\s*:\\s*(white|#fff)', 'Texte blanc attendu.'],
                     ['padding\\s*:\\s*40px', 'padding: 40px attendu.'],
                     ['text-align\\s*:\\s*center', 'text-align: center attendu.'],
                     ['border-radius\\s*:\\s*16px', 'border-radius: 16px attendu.']]
            },
            {
              brief: "<b>Defi 2 — La galerie.</b> Crée une <code>div</code> de classe <code>galerie</code> en flex avec <code>gap: 12px</code> et <code>flex-wrap: wrap</code>, contenant 3 divs de classe <code>vignette</code> (fond <code>#E2762E</code>, <code>padding: 30px</code>, coins arrondis <code>8px</code>).",
              starter: '<style>\n  .galerie { }\n  .vignette { }\n</style>\n\n<div class="galerie">\n  \n</div>\n',
              hint: 'La galerie est le conteneur flex ; les vignettes sont ses trois enfants.',
              solution: `<style>\n  .galerie { display: flex; gap: 12px; flex-wrap: wrap; }\n  .vignette { background: #E2762E; padding: 30px; border-radius: 8px; }\n</style>\n\n<div class="galerie">\n  <div class="vignette">1</div>\n  <div class="vignette">2</div>\n  <div class="vignette">3</div>\n</div>`,
              must: [['\\.galerie\\s*\\{[\\s\\S]*?display\\s*:\\s*flex', 'La galerie doit etre en display: flex;'],
                     ['\\.galerie\\s*\\{[\\s\\S]*?gap\\s*:\\s*12px', 'Il manque gap: 12px;'],
                     ['flex-wrap\\s*:\\s*wrap', 'Il manque flex-wrap: wrap;'],
                     ['\\.vignette\\s*\\{[\\s\\S]*?background\\s*:\\s*#E2762E', 'Les vignettes doivent avoir le fond #E2762E.'],
                     ['(class=["\\\']vignette["\\\'][\\s\\S]*?){3}', 'Il faut trois vignettes dans la galerie.']],
              success: "PARCOURS WEB LIBRE TERMINE. Tu sais structurer, styler et adapter une page. La Forge ULTRA t'attend pour les grilles, les animations et un vrai portfolio."
            }
          ]
        }
      ]
    }
  ]
};
