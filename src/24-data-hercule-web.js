/* ARES ULTRA — Module final de l'Atelier du Bâtisseur : « Les 12 Travaux d'Hercule ».
   Douze défis de mise en page et de qualité professionnelle, sans JavaScript :
   uniquement du HTML et du CSS, poussés à leur niveau le plus avancé.         */
(function () {
  var m = {
    n: 8,
    title: "Les 12 Travaux d'Hercule",
    sub: "L'épreuve finale : douze techniques CSS avancées, plusieurs semaines de pratique",
    lessons: [

      {
        id: 'wh-1', title: "Travail I — Le Lion de Némée", kind: 'boss', xp: 90,
        goal: "Une carte que rien ne peut faire déborder, même un texte impossible à couper.",
        blocks: [
          { t: 'p', v: "La peau du Lion de Némée résiste à toutes les lames. Ta carte doit résister à tous les contenus : un mot interminable, une URL sans espace, un texte trop long. Sans protection, ce genre de contenu fait déborder la boîte et casse toute la mise en page." },
          { t: 'code', lang: 'html', run: true, v: `<style>\n  .carte {\n    width: 200px;\n    background: #241917;\n    color: white;\n    padding: 16px;\n    border-radius: 10px;\n  }\n</style>\n\n<div class="carte">unmotimpossiblementlongquideborde de partout et casse la mise en page</div>` }
        ],
        ex: [
          {
            brief: "Corrige <code>.carte</code> pour qu'aucun mot, même très long, ne puisse plus déborder de la boîte : ajoute <code>overflow-wrap: break-word;</code> (ou <code>word-break: break-word;</code>).",
            starter: '<style>\n  .carte {\n    width: 200px;\n    background: #241917;\n    color: white;\n    padding: 16px;\n    border-radius: 10px;\n  }\n</style>\n\n<div class="carte">unmotimpossiblementlongquideborde de partout et casse la mise en page</div>\n',
            hint: "Ajoute overflow-wrap: break-word; à l'intérieur de la règle .carte.",
            solution: `<style>\n  .carte {\n    width: 200px;\n    background: #241917;\n    color: white;\n    padding: 16px;\n    border-radius: 10px;\n    overflow-wrap: break-word;\n  }\n</style>\n\n<div class="carte">unmotimpossiblementlongquideborde de partout et casse la mise en page</div>`,
            must: [['\\.carte\\s*\\{[\\s\\S]*?(overflow-wrap|word-break)\\s*:\\s*break-word', 'Ajoute overflow-wrap: break-word; (ou word-break: break-word;) dans .carte.']],
            success: "Peau increvable : plus aucun contenu ne peut casser cette carte."
          }
        ]
      },

      {
        id: 'wh-2', title: "Travail II — L'Hydre de Lerne", kind: 'boss', xp: 90,
        goal: "Une grille qui accepte n'importe quel nombre d'éléments sans jamais casser sa mise en page.",
        blocks: [
          { t: 'p', v: "Chaque tête coupée de l'Hydre en fait repousser deux : la grille doit accepter la même prolifération, qu'il y ait 3 images ou 300, sans qu'on ait à toucher au CSS." },
          { t: 'code', lang: 'html', run: true, v: `<style>\n  .galerie {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));\n    gap: 8px;\n  }\n  .galerie img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 6px; }\n</style>\n\n<div class="galerie">\n  <img src="https://placehold.co/100" alt="">\n  <img src="https://placehold.co/100" alt="">\n  <img src="https://placehold.co/100" alt="">\n  <img src="https://placehold.co/100" alt="">\n  <img src="https://placehold.co/100" alt="">\n</div>` }
        ],
        ex: [
          {
            brief: "Construis <code>.galerie</code> en grille auto-remplissante (<code>repeat(auto-fill, minmax(100px, 1fr))</code>), et force chaque <code>img</code> à rester carrée quelle que soit sa taille d'origine avec <code>aspect-ratio: 1 / 1;</code> et <code>object-fit: cover;</code>.",
            starter: '<style>\n  .galerie {\n    \n  }\n  .galerie img {\n    \n  }\n</style>\n\n<div class="galerie">\n  <img src="https://placehold.co/100" alt="">\n  <img src="https://placehold.co/100" alt="">\n  <img src="https://placehold.co/100" alt="">\n</div>\n',
            hint: "display: grid + grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); pour .galerie, aspect-ratio et object-fit pour les images.",
            solution: `<style>\n  .galerie {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));\n    gap: 8px;\n  }\n  .galerie img {\n    width: 100%;\n    aspect-ratio: 1 / 1;\n    object-fit: cover;\n  }\n</style>\n\n<div class="galerie">\n  <img src="https://placehold.co/100" alt="">\n  <img src="https://placehold.co/100" alt="">\n  <img src="https://placehold.co/100" alt="">\n</div>`,
            must: [['repeat\\(\\s*auto-fill', 'La galerie doit utiliser repeat(auto-fill, ...).'],
                   ['aspect-ratio\\s*:\\s*1\\s*/\\s*1', 'Les images doivent avoir aspect-ratio: 1 / 1;.'],
                   ['object-fit\\s*:\\s*cover', 'Les images doivent avoir object-fit: cover;.']],
            success: "La galerie peut maintenant accueillir des centaines d'images sans jamais casser."
          }
        ]
      },

      {
        id: 'wh-3', title: "Travail III — La Biche de Cérynée", kind: 'boss', xp: 95,
        goal: "Un défilement rapide et précis, comme une biche qu'on suit sans jamais la brusquer.",
        blocks: [
          { t: 'p', v: "La Biche de Cérynée est trop rapide pour être arrêtée net — il faut l'accompagner. Le <b>scroll-snap</b> fait exactement ça : un défilement fluide qui se cale précisément sur chaque élément, sans a-coup et sans JavaScript." },
          { t: 'code', lang: 'html', run: true, v: `<style>\n  .scroller {\n    display: flex;\n    overflow-x: auto;\n    scroll-snap-type: x mandatory;\n    gap: 10px;\n  }\n  .scroller > div {\n    scroll-snap-align: start;\n    flex: 0 0 200px;\n    background: #4FBFB4;\n    height: 100px;\n    border-radius: 8px;\n  }\n</style>\n\n<div class="scroller">\n  <div>1</div><div>2</div><div>3</div><div>4</div>\n</div>` }
        ],
        ex: [
          {
            brief: "Transforme <code>.scroller</code> en défilement à cale automatique horizontal : <code>overflow-x: auto;</code>, <code>scroll-snap-type: x mandatory;</code>, et chaque enfant direct avec <code>scroll-snap-align: start;</code>.",
            starter: '<style>\n  .scroller {\n    display: flex;\n    gap: 10px;\n  }\n  .scroller > div {\n    flex: 0 0 200px;\n    background: #4FBFB4;\n    height: 100px;\n    border-radius: 8px;\n  }\n</style>\n\n<div class="scroller">\n  <div>1</div><div>2</div><div>3</div><div>4</div>\n</div>\n',
            hint: "overflow-x: auto; et scroll-snap-type: x mandatory; sur .scroller ; scroll-snap-align: start; sur .scroller > div.",
            solution: `<style>\n  .scroller {\n    display: flex;\n    gap: 10px;\n    overflow-x: auto;\n    scroll-snap-type: x mandatory;\n  }\n  .scroller > div {\n    flex: 0 0 200px;\n    background: #4FBFB4;\n    height: 100px;\n    border-radius: 8px;\n    scroll-snap-align: start;\n  }\n</style>\n\n<div class="scroller">\n  <div>1</div><div>2</div><div>3</div><div>4</div>\n</div>`,
            must: [['overflow-x\\s*:\\s*auto', 'Il faut overflow-x: auto; sur .scroller.'],
                   ['scroll-snap-type\\s*:\\s*x\\s+mandatory', 'Il faut scroll-snap-type: x mandatory; sur .scroller.'],
                   ['scroll-snap-align\\s*:\\s*start', 'Il faut scroll-snap-align: start; sur les enfants.']]
          }
        ]
      },

      {
        id: 'wh-4', title: "Travail IV — Le Sanglier d'Érymanthe", kind: 'boss', xp: 100,
        goal: "Le capturer vivant : un composant accessible sans une seule ligne de JavaScript.",
        blocks: [
          { t: 'p', v: "Hercule doit ramener le Sanglier vivant, pas le tuer. En accessibilité, c'est la même exigence : un composant interactif (un panneau qu'on ouvre) doit rester utilisable au clavier et par un lecteur d'écran, sans qu'on ait besoin d'écrire une ligne de JavaScript." },
          { t: 'code', lang: 'html', run: true, v: `<style>\n  details { border: 1px solid #444; border-radius: 8px; padding: 10px 14px; }\n  summary { cursor: pointer; font-weight: bold; }\n  details[open] summary { color: #E2762E; }\n</style>\n\n<details>\n  <summary>Informations sur le piège</summary>\n  <p>Le filet est tendu, prêt à capturer le sanglier vivant.</p>\n</details>` }
        ],
        ex: [
          {
            brief: "Construis un panneau natif accessible avec <code>&lt;details&gt;</code> et <code>&lt;summary&gt;</code>, contenant un résumé cliquable et un paragraphe de contenu caché par défaut. Ajoute une règle qui change la couleur du <code>summary</code> quand le panneau est ouvert (<code>details[open] summary</code>).",
            starter: '<style>\n  \n</style>\n\n<details>\n  <summary>Le piège</summary>\n  \n</details>\n',
            hint: "Complète le paragraphe à l'intérieur de <details>, puis ajoute la règle details[open] summary { color: ...; } dans le style.",
            solution: `<style>\n  details[open] summary {\n    color: #E2762E;\n  }\n</style>\n\n<details>\n  <summary>Le piège</summary>\n  <p>Le sanglier est capturé vivant, pret pour le voyage.</p>\n</details>`,
            must: [['<details>[\\s\\S]*<summary>[\\s\\S]*</summary>[\\s\\S]*<p>[\\s\\S]*</p>[\\s\\S]*</details>', 'Il faut un <details> contenant <summary> et un <p>.'],
                   ['details\\[open\\]\\s+summary', 'Ajoute une règle details[open] summary { ... }.']],
            success: "Capturé vivant : ce panneau fonctionne au clavier, à la souris et avec un lecteur d'écran, sans une ligne de script."
          }
        ]
      },

      {
        id: 'wh-5', title: "Travail V — Les Écuries d'Augias", kind: 'boss', xp: 100,
        goal: "Trente ans de style en ligne à nettoyer : détourner le CSS répété vers des variables.",
        blocks: [
          { t: 'p', v: "Le code ci-dessous est le fumier des écuries d'Augias : la même série de propriétés copiée-collée dans trois attributs <code>style</code>. Le nettoyage professionnel détourne cette répétition vers une classe unique, appuyée sur des variables CSS." }
        ],
        ex: [
          {
            brief: "Élimine tous les attributs <code>style=\"...\"</code> ci-dessous. Crée une classe <code>.etable</code> qui reproduit le même rendu, avec au moins une variable définie dans <code>:root</code> et réutilisée via <code>var(...)</code>.",
            starter: '<div style="background: #241917; color: white; padding: 16px; border-radius: 10px; margin-bottom: 10px;">Etable 1</div>\n<div style="background: #241917; color: white; padding: 16px; border-radius: 10px; margin-bottom: 10px;">Etable 2</div>\n<div style="background: #241917; color: white; padding: 16px; border-radius: 10px;">Etable 3</div>\n',
            hint: "Définis --fond-etable dans :root, crée .etable qui l'utilise avec var(--fond-etable), puis remplace chaque style=\"...\" par class=\"etable\".",
            solution: `<style>\n  :root {\n    --fond-etable: #241917;\n    --espace: 16px;\n  }\n  .etable {\n    background: var(--fond-etable);\n    color: white;\n    padding: var(--espace);\n    border-radius: 10px;\n    margin-bottom: 10px;\n  }\n</style>\n\n<div class="etable">Etable 1</div>\n<div class="etable">Etable 2</div>\n<div class="etable">Etable 3</div>`,
            must: [[':root\\s*\\{[\\s\\S]*?--[a-zA-Z-]+\\s*:', 'Déclare au moins une variable dans :root.'],
                   ['var\\(--[a-zA-Z-]+\\)', 'Réutilise ta variable avec var(...).'],
                   ['class="etable"', 'Remplace la répétition par une classe .etable.']],
            mustnot: [['style="', "C'est justement le nettoyage demandé : élimine tous les attributs style=\"...\" en ligne."]],
            success: "Les écuries sont propres : la même apparence, mais une seule source de vérité au lieu de trois copies."
          }
        ]
      },

      {
        id: 'wh-6', title: "Travail VI — Les Oiseaux du Lac Stymphale", kind: 'boss', xp: 100,
        goal: "Cacher visuellement sans jamais rendre invisible pour un lecteur d'écran.",
        blocks: [
          { t: 'p', v: "Le crotale de bronze fait sortir les oiseaux du feuillage sans les blesser. En accessibilité, la technique équivalente s'appelle <code>.sr-only</code> (screen-reader only) : un texte retiré visuellement de la page, mais toujours lu par les technologies d'assistance — utile pour donner un vrai nom à un bouton qui n'a qu'une icône." },
          { t: 'code', lang: 'html', run: true, v: `<style>\n  .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n    white-space: nowrap;\n    clip-path: inset(50%);\n  }\n</style>\n\n<button>🔍<span class="sr-only">Rechercher un oiseau</span></button>` }
        ],
        ex: [
          {
            brief: "Crée la classe <code>.sr-only</code> exactement comme dans l'exemple (position, taille de 1px, overflow caché, pas de retour à la ligne, découpe totale), et applique-la à un texte descriptif dans le bouton donné.",
            starter: '<style>\n  \n</style>\n\n<button>🔔<span class=""></span></button>\n',
            hint: "Recopie les 6 propriétés de .sr-only vues dans la leçon, puis mets class=\"sr-only\" sur le span avec un texte comme \"Voir les notifications\".",
            solution: `<style>\n  .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n    white-space: nowrap;\n    clip-path: inset(50%);\n  }\n</style>\n\n<button>🔔<span class="sr-only">Voir les notifications</span></button>`,
            must: [['\\.sr-only\\s*\\{[\\s\\S]*?position\\s*:\\s*absolute', '.sr-only doit avoir position: absolute;.'],
                   ['\\.sr-only\\s*\\{[\\s\\S]*?width\\s*:\\s*1px', '.sr-only doit avoir width: 1px;.'],
                   ['class="sr-only"', 'Applique la classe sr-only au texte descriptif.']],
            success: "Les oiseaux sont sortis du feuillage : ce bouton a maintenant un vrai nom pour tout le monde, sans rien changer visuellement."
          }
        ]
      },

      {
        id: 'wh-7', title: "Travail VII — Le Taureau de Crète", kind: 'boss', xp: 105,
        goal: "Une animation sauvage qu'il faut savoir dompter pour les personnes sensibles au mouvement.",
        blocks: [
          { t: 'p', v: "Le Taureau de Crète ne se calme pas tout seul. De la même façon, une animation ne doit jamais s'imposer sans retenue : un site professionnel respecte toujours <code>prefers-reduced-motion</code>, le réglage qui dit qu'une personne préfère un site sans mouvement." },
          { t: 'code', lang: 'html', run: true, v: `<style>\n  @keyframes pulse {\n    0%, 100% { transform: scale(1); }\n    50% { transform: scale(1.15); }\n  }\n  .badge {\n    display: inline-block;\n    background: #E2762E;\n    color: white;\n    padding: 6px 12px;\n    border-radius: 99px;\n    animation: pulse 1.4s ease-in-out infinite;\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .badge { animation: none; }\n  }\n</style>\n\n<span class="badge">Nouveau</span>` }
        ],
        ex: [
          {
            brief: "Crée une animation <code>@keyframes pulse</code> qui agrandit légèrement puis rétrécit un élément (0%, 50%, 100%), applique-la à <code>.badge</code> en boucle infinie, puis désactive-la avec <code>@media (prefers-reduced-motion: reduce)</code>.",
            starter: '<style>\n  .badge {\n    display: inline-block;\n    background: #E2762E;\n    color: white;\n    padding: 6px 12px;\n    border-radius: 99px;\n  }\n</style>\n\n<span class="badge">Nouveau</span>\n',
            hint: "@keyframes pulse { 50% { transform: scale(1.15); } } puis animation: pulse 1.4s ease-in-out infinite; sur .badge, puis le bloc @media qui remet animation: none;.",
            solution: `<style>\n  @keyframes pulse {\n    0%, 100% { transform: scale(1); }\n    50% { transform: scale(1.15); }\n  }\n  .badge {\n    display: inline-block;\n    background: #E2762E;\n    color: white;\n    padding: 6px 12px;\n    border-radius: 99px;\n    animation: pulse 1.4s ease-in-out infinite;\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .badge { animation: none; }\n  }\n</style>\n\n<span class="badge">Nouveau</span>`,
            must: [['@keyframes\\s+pulse', 'Il faut une animation @keyframes pulse.'],
                   ['animation\\s*:\\s*pulse', 'Applique animation: pulse ... sur .badge.'],
                   ['@media\\s*\\([^)]*prefers-reduced-motion[^)]*reduce\\)[\\s\\S]*?animation\\s*:\\s*none', "Le bloc prefers-reduced-motion doit remettre animation: none;."]],
            success: "Le taureau est dompté : l'animation existe, mais elle sait s'effacer pour qui en a besoin."
          }
        ]
      },

      {
        id: 'wh-8', title: "Travail VIII — Les Juments de Diomède", kind: 'boss', xp: 105,
        goal: "Un formulaire dangereux à neutraliser : rendre les erreurs claires et accessibles.",
        blocks: [
          { t: 'p', v: "Les juments de Diomède dévorent quiconque s'approche sans précaution. Un formulaire mal conçu est presque aussi dangereux pour l'utilisateur : sans indication claire, une erreur de saisie devient incompréhensible. La bonne pratique relie le champ à son message d'erreur avec <code>aria-describedby</code>, et annonce l'erreur avec <code>role=\"alert\"</code>." },
          { t: 'code', lang: 'html', run: true, v: `<label for="mail">Email</label>\n<input type="email" id="mail" required aria-describedby="erreur-mail">\n<span id="erreur-mail" role="alert">Format d'email invalide</span>` }
        ],
        ex: [
          {
            brief: "Construis un champ email complet : <code>label</code> relié par <code>for</code>/<code>id</code>, <code>input</code> avec <code>required</code> et <code>aria-describedby</code> pointant vers un message d'erreur, et le message d'erreur portant <code>role=\"alert\"</code> avec le même <code>id</code>.",
            starter: '<label for=""></label>\n<input>\n<span id=""></span>\n',
            hint: 'id="mail" sur le label/input, aria-describedby="erreur-mail" sur input, id="erreur-mail" et role="alert" sur le span.',
            solution: `<label for="mail">Email</label>\n<input type="email" id="mail" required aria-describedby="erreur-mail">\n<span id="erreur-mail" role="alert">Format d'email invalide</span>`,
            must: [['<label[^>]*for=["\\\']mail["\\\']', 'Le label doit avoir for="mail".'],
                   ['<input[^>]*id=["\\\']mail["\\\']', "L'input doit avoir id=\"mail\"."],
                   ['<input[^>]*required', "L'input doit avoir l'attribut required."],
                   ['<input[^>]*aria-describedby=["\\\']erreur-mail["\\\']', 'L\'input doit avoir aria-describedby="erreur-mail".'],
                   ['role=["\\\']alert["\\\']', 'Le message d\'erreur doit avoir role="alert".']],
            success: "Les juments sont neutralisées : ce formulaire annonce clairement ses erreurs, y compris à un lecteur d'écran."
          }
        ]
      },

      {
        id: 'wh-9', title: "Travail IX — La Ceinture d'Hippolyte", kind: 'boss', xp: 105,
        goal: "Obtenir la ceinture sans combattre : un bascule de thème entièrement en CSS.",
        blocks: [
          { t: 'p', v: "Hippolyte était prête à offrir sa ceinture sans combat, avant qu'Héra ne mette le feu aux poudres. Certaines fonctionnalités s'obtiennent de la même façon, sans bataille : basculer entre thème clair et sombre ne demande pas forcément de JavaScript. La ruse : une case à cocher cachée, et le sélecteur <code>:checked ~</code>." },
          { t: 'code', lang: 'html', run: true, v: `<style>\n  :root { --fond: #ffffff; --texte: #1a1a1a; }\n  #theme-toggle:checked ~ .page { --fond: #17100E; --texte: #F6ECE3; }\n  .page { background: var(--fond); color: var(--texte); padding: 16px; border-radius: 10px; }\n</style>\n\n<input type="checkbox" id="theme-toggle">\n<label for="theme-toggle">Thème sombre</label>\n<div class="page">Ce bloc change de thème sans JavaScript.</div>` }
        ],
        ex: [
          {
            brief: "Construis une bascule de thème pure CSS : une case à cocher <code>#theme-toggle</code>, et une règle utilisant <code>#theme-toggle:checked ~</code> pour redéfinir au moins une variable CSS quand elle est cochée.",
            starter: '<style>\n  :root { --fond: #ffffff; --texte: #1a1a1a; }\n  .page { background: var(--fond); color: var(--texte); padding: 16px; border-radius: 10px; }\n</style>\n\n<input type="checkbox" id="theme-toggle">\n<label for="theme-toggle">Theme sombre</label>\n<div class="page">Contenu</div>\n',
            hint: "#theme-toggle:checked ~ .page { --fond: #17100E; --texte: #F6ECE3; }",
            solution: `<style>\n  :root { --fond: #ffffff; --texte: #1a1a1a; }\n  #theme-toggle:checked ~ .page { --fond: #17100E; --texte: #F6ECE3; }\n  .page { background: var(--fond); color: var(--texte); padding: 16px; border-radius: 10px; }\n</style>\n\n<input type="checkbox" id="theme-toggle">\n<label for="theme-toggle">Theme sombre</label>\n<div class="page">Contenu</div>`,
            must: [['<input[^>]*type=["\\\']checkbox["\\\'][^>]*id=["\\\']theme-toggle["\\\']', 'Il faut un input type="checkbox" id="theme-toggle".'],
                   ['#theme-toggle:checked\\s*~', 'Utilise le sélecteur #theme-toggle:checked ~ ...'],
                   ['--\\w+\\s*:', 'La règle doit redéfinir au moins une variable CSS.']],
            success: "La ceinture est obtenue sans combattre : un thème complet, zéro JavaScript."
          }
        ]
      },

      {
        id: 'wh-10', title: "Travail X — Les Bœufs de Géryon", kind: 'boss', xp: 110,
        goal: "Un géant à trois corps : une mise en page à trois colonnes, façon magazine.",
        blocks: [
          { t: 'p', v: "Géryon a trois corps soudés ensemble. C'est presque une métaphore de la mise en page multi-colonnes : un même contenu qui se répartit sur plusieurs corps de texte, comme dans un magazine imprimé." },
          { t: 'code', lang: 'html', run: true, v: `<style>\n  .article {\n    column-count: 3;\n    column-gap: 24px;\n  }\n  @media print {\n    .article { column-count: 1; }\n  }\n</style>\n\n<div class="article">\n  <p>Un long article qui se répartit automatiquement sur trois colonnes, comme dans un vrai magazine, et repasse en une seule colonne à l'impression.</p>\n</div>` }
        ],
        ex: [
          {
            brief: "Construis <code>.article</code> en trois colonnes (<code>column-count: 3;</code>, <code>column-gap: 24px;</code>), et ajoute une règle <code>@media print</code> qui repasse en une seule colonne pour l'impression.",
            starter: '<style>\n  .article {\n    \n  }\n</style>\n\n<div class="article">\n  <p>Un long article a repartir sur plusieurs colonnes.</p>\n</div>\n',
            hint: "column-count: 3; column-gap: 24px; sur .article, puis @media print { .article { column-count: 1; } }",
            solution: `<style>\n  .article {\n    column-count: 3;\n    column-gap: 24px;\n  }\n  @media print {\n    .article { column-count: 1; }\n  }\n</style>\n\n<div class="article">\n  <p>Un long article a repartir sur plusieurs colonnes.</p>\n</div>`,
            must: [['column-count\\s*:\\s*3', 'Il faut column-count: 3; sur .article.'],
                   ['column-gap\\s*:\\s*24px', 'Il faut column-gap: 24px;.'],
                   ['@media\\s+print[\\s\\S]*?column-count\\s*:\\s*1', 'Le bloc @media print doit remettre column-count: 1;.']]
          }
        ]
      },

      {
        id: 'wh-11', title: "Travail XI — Les Pommes des Hespérides", kind: 'boss', xp: 115,
        goal: "Protéger le jardin sans y toucher : styler une structure figée avec les seuls sélecteurs CSS.",
        blocks: [
          { t: 'p', v: "Le jardin des Hespérides est gardé par un dragon à cent têtes : on ne le modifie pas, on le contourne. Cette fois, le HTML ci-dessous est <b>intouchable</b> — aucune classe, aucun id à ajouter. Tout le style doit passer par des sélecteurs avancés : combinateurs, <code>:nth-child()</code>, <code>:not()</code>." },
          { t: 'code', lang: 'html', run: true, v: `<style>\n  ul > li:nth-child(odd) { background: #f4f0ed; }\n  ul > li:not(:last-child) { border-bottom: 1px solid #ddd; }\n</style>\n\n<ul>\n  <li>Pomme 1</li>\n  <li>Pomme 2</li>\n  <li>Pomme 3</li>\n</ul>` }
        ],
        ex: [
          {
            brief: "Sans ajouter la moindre <code>class</code> ou <code>id</code> au HTML donné, stylise les lignes impaires d'une liste avec un fond différent (<code>:nth-child(odd)</code>), et donne une bordure à toutes les lignes sauf la dernière (<code>:not(:last-child)</code>).",
            starter: '<style>\n  \n</style>\n\n<ul>\n  <li>Pomme 1</li>\n  <li>Pomme 2</li>\n  <li>Pomme 3</li>\n  <li>Pomme 4</li>\n</ul>\n',
            hint: "ul > li:nth-child(odd) { background: ...; } puis ul > li:not(:last-child) { border-bottom: ...; }",
            solution: `<style>\n  ul > li:nth-child(odd) {\n    background: #f4f0ed;\n  }\n  ul > li:not(:last-child) {\n    border-bottom: 1px solid #ddd;\n  }\n</style>\n\n<ul>\n  <li>Pomme 1</li>\n  <li>Pomme 2</li>\n  <li>Pomme 3</li>\n  <li>Pomme 4</li>\n</ul>`,
            must: [[':nth-child\\(\\s*odd\\s*\\)', 'Utilise :nth-child(odd) pour cibler les lignes impaires.'],
                   [':not\\(:last-child\\)', 'Utilise :not(:last-child) pour exclure la dernière ligne.'],
                   ['ul>li|ul\\s*>\\s*li', 'Utilise le combinateur enfant direct > entre ul et li.']],
            mustnot: [['class=["\\\']', "Le jardin est intouchable : n'ajoute aucune classe au HTML."],
                      ['id=["\\\']', "Le jardin est intouchable : n'ajoute aucun id au HTML."]],
            success: "Le jardin n'a pas été touché — seuls les sélecteurs ont fait tout le travail."
          }
        ]
      },

      {
        id: 'wh-12', title: "Travail XII — Cerbère", kind: 'boss', xp: 150,
        goal: "L'épreuve finale : un composant complet qui réunit toutes les techniques du module.",
        blocks: [
          { t: 'p', v: "Le dernier travail : ramener Cerbère à mains nues. Ce composant final réunit tout ce que tu as appris dans ce module — variables, mise en page moderne, mouvement maîtrisé, accessibilité — dans une seule carte." }
        ],
        ex: [
          {
            brief: "Construis une carte <code>.garde</code> qui combine : au moins une variable CSS utilisée avec <code>var()</code>, une mise en page en <code>display: grid</code> ou <code>display: flex</code>, une <code>transition</code> ou une <code>animation</code>, un bloc <code>@media</code> (dark mode ou reduced-motion), et un élément avec <code>aria-label</code> pour l'accessibilité.",
            starter: '<style>\n  :root {\n    --accent: #E2544B;\n  }\n</style>\n\n<div class="garde">\n  \n</div>\n',
            hint: "Reprends une variable de :root avec var(--accent), un display: flex ou grid, une transition sur :hover, un bloc @media, et un bouton avec aria-label=\"...\".",
            solution: `<style>\n  :root {\n    --accent: #E2544B;\n    --fond: #17100E;\n  }\n  .garde {\n    display: flex;\n    gap: 12px;\n    align-items: center;\n    background: var(--fond);\n    color: white;\n    padding: 16px;\n    border-radius: 12px;\n    border: 2px solid var(--accent);\n    transition: transform 0.2s ease;\n  }\n  .garde:hover {\n    transform: translateY(-4px);\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .garde { transition: none; }\n  }\n</style>\n\n<div class="garde">\n  <span>Cerbere veille a l'entree</span>\n  <button aria-label="Calmer Cerbere">🦴</button>\n</div>`,
            must: [['var\\(--\\w+\\)', 'Utilise au moins une variable avec var(...).'],
                   ['display\\s*:\\s*(flex|grid)', 'La carte .garde doit être en display: flex; ou display: grid;.'],
                   ['(transition|animation)\\s*:', 'Ajoute une transition ou une animation.'],
                   ['@media', 'Ajoute un bloc @media (dark mode ou reduced-motion).'],
                   ['aria-label=["\\\'][^"\\\']+["\\\']', 'Ajoute un aria-label sur un élément interactif.']],
            success: "LES 12 TRAVAUX SONT ACCOMPLIS. Boîtes increvables, grilles infinies, accessibilité, thèmes, sélecteurs avancés : il ne reste plus aucun secret entre toi et le CSS moderne."
          }
        ]
      }
    ]
  };
  PATH_PRO_WEB.days.push(m);
})();
