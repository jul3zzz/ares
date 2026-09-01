/* ARES ULTRA — « L'Atelier du Bâtisseur » : HTML/CSS niveau professionnel */
var PATH_PRO_WEB = {
  id: 'pro-web', lang: 'html', name: 'WEB ULTRA', glyph: "l'atelier du bâtisseur",
  tag: 'ULTRA · 8 modules', color: '#E2762E', pro: true,
  title: "L'Atelier du Bâtisseur",
  blurb: "Grid, variables, animations, composants réutilisables et accessibilité : la différence entre « une page qui marche » et « un site qu'on a envie de montrer ».",
  chips: ['8 modules', '3 projets complets', 'Techniques 2026'],
  promise: "Tu sais poser des balises et des couleurs. Ici tu apprends la mise en page moderne, le système de design, l'animation et les règles pros — puis tu livres un portfolio et une landing page.",
  days: [
    /* ---------------- MODULE 1 ---------------- */
    {
      n: 1, title: 'CSS Grid', sub: 'La mise en page en deux dimensions',
      lessons: [
        {
          id: 'pw-1-1', title: 'Grid : lignes et colonnes', kind: 'lecon', xp: 35,
          goal: 'Construire une grille en une déclaration, là où flexbox demande des acrobaties.',
          blocks: [
            { t: 'p', v: "Flexbox aligne dans <b>une</b> direction. Grid organise en <b>deux</b> dimensions à la fois : lignes ET colonnes. Pour une galerie, un tableau de bord ou une page entière, c'est l'outil." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .grille {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 12px;\n  }\n  .case { background: #E2762E; color: white; padding: 24px; border-radius: 8px; text-align: center; }\n</style>\n\n<div class="grille">\n  <div class="case">1</div>\n  <div class="case">2</div>\n  <div class="case">3</div>\n  <div class="case">4</div>\n  <div class="case">5</div>\n  <div class="case">6</div>\n</div>` },
            { t: 'h', v: "L'unité fr" },
            { t: 'p', v: "<code>fr</code> signifie « fraction de l'espace disponible ». <code>1fr 1fr 1fr</code> = trois colonnes egales. <code>2fr 1fr</code> = la première deux fois plus large." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .layout {\n    display: grid;\n    grid-template-columns: 2fr 1fr;\n    gap: 14px;\n  }\n  .principal { background: #241917; color: #F6ECE3; padding: 20px; border-radius: 10px; }\n  .cote { background: #F6B23D; padding: 20px; border-radius: 10px; }\n</style>\n\n<div class="layout">\n  <main class="principal">Contenu principal (2 parts)</main>\n  <aside class="cote">Barre laterale (1 part)</aside>\n</div>` },
            { t: 'h', v: 'La grille qui s\'adapte toute seule' },
            { t: 'p', v: "Cette seule ligne remplace trois media queries : les colonnes s'ajoutent ou disparaissent selon la place." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .auto {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n    gap: 10px;\n  }\n  .carte { background: #4FBFB4; color: #08201E; padding: 18px; border-radius: 8px; font-weight: bold; }\n</style>\n\n<div class="auto">\n  <div class="carte">A</div>\n  <div class="carte">B</div>\n  <div class="carte">C</div>\n  <div class="carte">D</div>\n</div>` },
            { t: 'tip', h: 'La ligne magique', v: "<code>repeat(auto-fit, minmax(140px, 1fr))</code> : « autant de colonnes que possible, chacune d'au moins 140px, se partageant le reste ». Retiens-la, tu la reutiliseras partout." },
            { t: 'key', h: 'A retenir', v: "display: grid · grid-template-columns définit les colonnes · fr = fraction · repeat(auto-fit, minmax()) = responsive sans media query." }
          ],
          ex: [
            {
              brief: "Transforme <code>.galerie</code> en grille de 3 colonnes egales avec un <code>gap</code> de <code>16px</code>.",
              starter: '<style>\n  .galerie {\n    \n  }\n  .item { background: #E2762E; padding: 20px; border-radius: 8px; }\n</style>\n\n<div class="galerie">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>\n',
              hint: 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;',
              solution: `<style>\n  .galerie {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 16px;\n  }\n  .item { background: #E2762E; padding: 20px; border-radius: 8px; }\n</style>\n\n<div class="galerie">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
              must: [['display\\s*:\\s*grid', 'Il faut display: grid;'],
                     ['grid-template-columns\\s*:\\s*(1fr\\s+1fr\\s+1fr|repeat\\(\\s*3)', 'Définis trois colonnes egales (1fr 1fr 1fr ou repeat(3, 1fr)).'],
                     ['gap\\s*:\\s*16px', 'Il faut gap: 16px;']]
            },
            {
              brief: "Crée une grille responsive : colonnes automatiques d'au moins <code>150px</code>, gap <code>12px</code>, avec <code>repeat(auto-fit, minmax(...))</code>.",
              starter: '<style>\n  .auto {\n    display: grid;\n    \n  }\n  .c { background: #4FBFB4; padding: 16px; border-radius: 6px; }\n</style>\n\n<div class="auto">\n  <div class="c">A</div>\n  <div class="c">B</div>\n  <div class="c">C</div>\n</div>\n',
              hint: 'grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));',
              solution: `<style>\n  .auto {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n    gap: 12px;\n  }\n  .c { background: #4FBFB4; padding: 16px; border-radius: 6px; }\n</style>\n\n<div class="auto">\n  <div class="c">A</div>\n  <div class="c">B</div>\n  <div class="c">C</div>\n</div>`,
              must: [['repeat\\(\\s*auto-fit', 'Utilise repeat(auto-fit, ...).'],
                     ['minmax\\(\\s*150px\\s*,\\s*1fr\\s*\\)', 'Utilise minmax(150px, 1fr).'],
                     ['gap\\s*:\\s*12px', 'Il faut gap: 12px;']]
            }
          ],
          quiz: [
            { q: 'Que signifie 1fr ?', opts: ['1 pixel', 'Une fraction de l\'espace disponible', '1 pourcent'], a: 1, why: 'fr répartit l\'espace restant entre les colonnes.' },
            { q: 'Quand preferer Grid a Flexbox ?', opts: ['Pour une mise en page en lignes ET colonnes', 'Pour aligner 3 boutons', 'Jamais'], a: 0, why: 'Flexbox = une dimension, Grid = deux dimensions.' }
          ]
        },
        {
          id: 'pw-1-2', title: 'Zones nommees et gabarit de page', kind: 'lecon', xp: 35,
          goal: 'Dessiner la structure d\'une page entière de facon lisible.',
          blocks: [
            { t: 'p', v: "Grid permet de <b>dessiner</b> la page en toutes lettres. C'est la technique la plus lisible du CSS moderne." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .page {\n    display: grid;\n    grid-template-areas:\n      "entete entete"\n      "menu   contenu"\n      "pied   pied";\n    grid-template-columns: 180px 1fr;\n    gap: 10px;\n  }\n  .entete  { grid-area: entete;  background: #E2762E; color: white; }\n  .menu    { grid-area: menu;    background: #F6B23D; }\n  .contenu { grid-area: contenu; background: #f2efec; }\n  .pied    { grid-area: pied;    background: #241917; color: #B9A395; }\n  .page > * { padding: 16px; border-radius: 8px; }\n</style>\n\n<div class="page">\n  <header class="entete">En-tete</header>\n  <nav class="menu">Menu</nav>\n  <main class="contenu">Contenu principal</main>\n  <footer class="pied">Pied de page</footer>\n</div>` },
            { t: 'p', v: "Le dessin entre guillemets <b>est</b> la mise en page : une ligne de texte par ligne de grille. N'importe qui comprend la structure en un coup d'oeil." },
            { t: 'h', v: 'Occuper plusieurs cases' },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .g { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }\n  .b { background: #4FBFB4; padding: 18px; border-radius: 6px; text-align: center; }\n  .large { grid-column: span 2; background: #E2762E; color: white; }\n  .haute { grid-row: span 2; background: #241917; color: white; }\n</style>\n\n<div class="g">\n  <div class="b large">span 2 colonnes</div>\n  <div class="b haute">span 2 lignes</div>\n  <div class="b">3</div>\n  <div class="b">4</div>\n  <div class="b">5</div>\n</div>` },
            { t: 'tip', h: 'Le réflexe responsive', v: "Sur mobile, on redessine simplement les zones en une seule colonne dans une media query. La structure change, le HTML ne bouge pas." },
            { t: 'key', h: 'A retenir', v: "grid-template-areas dessine la page · grid-area nomme chaque bloc · span N occupe plusieurs cases." }
          ],
          ex: [
            {
              brief: "Construis un gabarit a deux colonnes avec zones nommees : <code>entete</code> sur toute la largeur, puis <code>contenu</code> et <code>cote</code>, colonnes <code>1fr 220px</code>, gap <code>12px</code>.",
              starter: '<style>\n  .page {\n    display: grid;\n    \n  }\n  .entete  { grid-area: entete; background: #E2762E; }\n  .contenu { grid-area: contenu; background: #eee; }\n  .cote    { grid-area: cote; background: #F6B23D; }\n  .page > * { padding: 14px; border-radius: 8px; }\n</style>\n\n<div class="page">\n  <header class="entete">En-tete</header>\n  <main class="contenu">Contenu</main>\n  <aside class="cote">Cote</aside>\n</div>\n',
              hint: 'grid-template-areas avec deux lignes : "entete entete" puis "contenu cote".',
              solution: `<style>\n  .page {\n    display: grid;\n    grid-template-areas:\n      "entete entete"\n      "contenu cote";\n    grid-template-columns: 1fr 220px;\n    gap: 12px;\n  }\n  .entete  { grid-area: entete; background: #E2762E; }\n  .contenu { grid-area: contenu; background: #eee; }\n  .cote    { grid-area: cote; background: #F6B23D; }\n  .page > * { padding: 14px; border-radius: 8px; }\n</style>\n\n<div class="page">\n  <header class="entete">En-tete</header>\n  <main class="contenu">Contenu</main>\n  <aside class="cote">Cote</aside>\n</div>`,
              must: [['grid-template-areas', 'Utilise grid-template-areas.'],
                     ['"entete\\s+entete"', 'La première ligne doit être "entete entete".'],
                     ['"contenu\\s+cote"', 'La deuxieme ligne doit être "contenu cote".'],
                     ['grid-template-columns\\s*:\\s*1fr\\s+220px', 'Colonnes attendues : 1fr 220px.']]
            }
          ],
          quiz: [
            { q: 'Que fait grid-column: span 2 ?', opts: ['Déplace en 2e colonne', 'Fait occuper 2 colonnes', 'Crée 2 colonnes'], a: 1, why: 'span N etend l\'élément sur N pistes.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 2 ---------------- */
    {
      n: 2, title: 'Système de design', sub: 'Variables CSS et thème sombre',
      lessons: [
        {
          id: 'pw-2-1', title: 'Les variables CSS', kind: 'lecon', xp: 35,
          goal: 'Centraliser couleurs et espacements pour changer tout un site en une ligne.',
          blocks: [
            { t: 'p', v: "Écrire <code>#E2762E</code> a quarante endroits, c'est se condamner a quarante modifications le jour ou la couleur change. Les variables CSS reglent ça définitivement." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  :root {\n    --accent: #E2762E;\n    --fond: #241917;\n    --texte: #F6ECE3;\n    --rayon: 10px;\n    --espace: 16px;\n  }\n\n  .carte {\n    background: var(--fond);\n    color: var(--texte);\n    border-radius: var(--rayon);\n    padding: var(--espace);\n    border-left: 4px solid var(--accent);\n    margin-bottom: 10px;\n  }\n  .titre { color: var(--accent); font-weight: bold; }\n</style>\n\n<div class="carte"><span class="titre">Carte 1</span><p>Change --accent dans :root et TOUT suit.</p></div>\n<div class="carte"><span class="titre">Carte 2</span><p>Un seul endroit a modifier.</p></div>` },
            { t: 'h', v: 'La syntaxe' },
            { t: 'ul', v: [
              "On déclare avec deux tirets : <code>--nom: valeur;</code>, en général dans <code>:root</code> (la racine du document).",
              "On utilise avec <code>var(--nom)</code>.",
              "On peut prévoir un secours : <code>var(--nom, #ccc)</code>."
            ] },
            { t: 'h', v: 'Le thème sombre en 6 lignes' },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  :root { --fond: #ffffff; --texte: #1a1a1a; }\n\n  @media (prefers-color-scheme: dark) {\n    :root { --fond: #16100E; --texte: #F6ECE3; }\n  }\n\n  .boite {\n    background: var(--fond);\n    color: var(--texte);\n    padding: 20px; border-radius: 10px; border: 1px solid #8886;\n  }\n</style>\n\n<div class="boite">Cette boite suit le theme clair ou sombre de ton systeme.</div>` },
            { t: 'tip', h: 'Ce que font les pros', v: "On ne redéfinit <b>que les variables</b> dans le thème sombre, jamais les composants. Le reste du CSS n'a pas à savoir quel thème est actif." },
            { t: 'key', h: 'A retenir', v: "--nom: valeur dans :root · var(--nom) pour utiliser · un theme = un jeu de variables · une seule source de vérité." }
          ],
          ex: [
            {
              brief: "Crée trois variables dans <code>:root</code> : <code>--accent</code> = <code>#E2762E</code>, <code>--fond</code> = <code>#241917</code>, <code>--rayon</code> = <code>12px</code>, et utilise-les toutes les trois dans <code>.boite</code>.",
              starter: '<style>\n  :root {\n    \n  }\n  .boite {\n    color: white;\n    padding: 20px;\n  }\n</style>\n\n<div class="boite">Bloc</div>\n',
              hint: 'background: var(--fond); border: 2px solid var(--accent); border-radius: var(--rayon);',
              solution: `<style>\n  :root {\n    --accent: #E2762E;\n    --fond: #241917;\n    --rayon: 12px;\n  }\n  .boite {\n    color: white;\n    padding: 20px;\n    background: var(--fond);\n    border: 2px solid var(--accent);\n    border-radius: var(--rayon);\n  }\n</style>\n\n<div class="boite">Bloc</div>`,
              must: [['--accent\\s*:\\s*#E2762E', 'Declare --accent: #E2762E;'],
                     ['--fond\\s*:\\s*#241917', 'Déclare --fond: #241917;'],
                     ['--rayon\\s*:\\s*12px', 'Déclare --rayon: 12px;'],
                     ['var\\(--accent\\)', 'Utilise var(--accent) dans .boîte.'],
                     ['var\\(--fond\\)', 'Utilise var(--fond) dans .boîte.'],
                     ['var\\(--rayon\\)', 'Utilise var(--rayon) dans .boîte.']]
            }
          ],
          quiz: [
            { q: 'Comment utilise-t-on une variable CSS ?', opts: ['$nom', 'var(--nom)', '{{nom}}'], a: 1, why: 'La fonction var() lit la valeur de la propriete personnalisee.' },
            { q: 'Où déclare-t-on les variables globales ?', opts: ['Dans :root', 'Dans body uniquement', 'Dans le head'], a: 0, why: ':root est la racine : les variables y sont visibles partout.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 3 ---------------- */
    {
      n: 3, title: 'Mouvement', sub: 'Transitions, animations, micro-interactions',
      lessons: [
        {
          id: 'pw-3-1', title: 'Transitions et effets au survol', kind: 'lecon', xp: 35,
          goal: 'Rendre une interface vivante sans une ligne de JavaScript.',
          blocks: [
            { t: 'p', v: "Une transition adoucit un changement d'etat. Sans elle, un bouton saute. Avec elle, il glisse — et l'interface paraît dix fois plus soignee." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .bouton {\n    background: #E2762E; color: white; border: 0;\n    padding: 12px 22px; border-radius: 8px; font-size: 15px; cursor: pointer;\n    transition: transform .18s ease, box-shadow .18s ease, background .18s ease;\n  }\n  .bouton:hover {\n    transform: translateY(-3px);\n    background: #F6B23D;\n    box-shadow: 0 10px 22px rgba(226,118,46,.4);\n  }\n  .bouton:active { transform: translateY(0); }\n</style>\n\n<button class="bouton">Survole-moi</button>` },
            { t: 'h', v: 'La formule' },
            { t: 'code', v: `transition: propriete duree courbe delai;\n/* exemple : transition: transform .2s ease-out; */` },
            { t: 'warn', h: 'N\'anime jamais tout', v: "<code>transition: all .3s</code> force le navigateur à surveiller chaque propriete : ça rame. Nomme précisément ce qui change. Et privilegie <code>transform</code> et <code>opacity</code> : ce sont les deux seules proprietes que la carte graphique anime sans effort." },
            { t: 'h', v: 'Les animations en boucle' },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  @keyframes pulsation {\n    0%   { transform: scale(1);    opacity: 1; }\n    50%  { transform: scale(1.12); opacity: .75; }\n    100% { transform: scale(1);    opacity: 1; }\n  }\n  .pastille {\n    width: 70px; height: 70px; border-radius: 50%;\n    background: #4FBFB4; margin: 20px;\n    animation: pulsation 1.6s ease-in-out infinite;\n  }\n\n  @keyframes apparition {\n    from { opacity: 0; transform: translateY(14px); }\n    to   { opacity: 1; transform: none; }\n  }\n  .titre { animation: apparition .7s ease-out both; }\n</style>\n\n<h2 class="titre">J'apparais en glissant</h2>\n<div class="pastille"></div>` },
            { t: 'tip', h: 'Respecter les utilisateurs sensibles', v: "Certaines personnes sont malades devant les animations. Un site professionnel ajoute toujours :<br><code>@media (prefers-reduced-motion: reduce) { * { animation: none; transition: none; } }</code>" },
            { t: 'key', h: 'A retenir', v: "transition adoucit un changement · @keyframes définit une animation · anime transform et opacity · respecte prefers-reduced-motion." }
          ],
          ex: [
            {
              brief: "Ajoute a <code>.carte</code> une transition de <code>transform</code> de <code>0.2s</code>, et au survol une elevation <code>translateY(-6px)</code> avec une ombre.",
              starter: '<style>\n  .carte {\n    background: #241917; color: white; padding: 24px;\n    border-radius: 12px; width: 200px;\n  }\n</style>\n\n<div class="carte">Survole-moi</div>\n',
              hint: 'transition: transform .2s ease; puis .carte:hover { transform: translateY(-6px); box-shadow: ...; }',
              solution: `<style>\n  .carte {\n    background: #241917; color: white; padding: 24px;\n    border-radius: 12px; width: 200px;\n    transition: transform .2s ease, box-shadow .2s ease;\n  }\n  .carte:hover {\n    transform: translateY(-6px);\n    box-shadow: 0 12px 26px rgba(0,0,0,.35);\n  }\n</style>\n\n<div class="carte">Survole-moi</div>`,
              must: [['transition\\s*:[^;]*transform', 'Declare une transition sur transform.'],
                     ['\\.carte:hover', 'Il faut une règle .carte:hover.'],
                     ['translateY\\(\\s*-6px\\s*\\)', 'Au survol : transform: translateY(-6px);'],
                     ['box-shadow', 'Ajoute une ombre au survol.']]
            },
            {
              brief: "Crée une animation <code>@keyframes glisser</code> qui va de <code>opacity: 0</code> et <code>translateX(-30px)</code> vers <code>opacity: 1</code> et <code>translateX(0)</code>, et applique-la au titre pendant <code>0.8s</code>.",
              starter: '<style>\n  \n  h2 {  }\n</style>\n\n<h2>Titre anime</h2>\n',
              hint: '@keyframes glisser { from { ... } to { ... } } puis animation: glisser .8s ease-out both;',
              solution: `<style>\n  @keyframes glisser {\n    from { opacity: 0; transform: translateX(-30px); }\n    to   { opacity: 1; transform: translateX(0); }\n  }\n  h2 { animation: glisser 0.8s ease-out both; }\n</style>\n\n<h2>Titre anime</h2>`,
              must: [['@keyframes\\s+glisser', 'Cree @keyframes glisser.'],
                     ['from\\s*\\{[^}]*opacity\\s*:\\s*0', 'L\'état de départ doit avoir opacity: 0.'],
                     ['translateX\\(\\s*-30px\\s*\\)', 'Départ a translateX(-30px).'],
                     ['animation\\s*:\\s*glisser\\s+0?\\.8s', 'Applique animation: glisser 0.8s ...;']]
            }
          ],
          quiz: [
            { q: 'Quelles proprietes s\'animent le plus efficacement ?', opts: ['width et height', 'transform et opacity', 'margin et padding'], a: 1, why: 'Elles sont traitees par la carte graphique, sans recalcul de mise en page.' },
            { q: 'À quoi sert prefers-reduced-motion ?', opts: ['À accelerer le site', 'À desactiver les animations pour qui en a besoin', 'À charger moins d\'images'], a: 1, why: 'C\'est un reglage système d\'accessibilité qu\'un site pro respecte.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 4 ---------------- */
    {
      n: 4, title: 'Composants professionnels', sub: 'Boutons, cartes, navigation responsive',
      lessons: [
        {
          id: 'pw-4-1', title: 'Une famille de boutons coherente', kind: 'lecon', xp: 35,
          goal: 'Construire un composant declinable, comme dans un vrai système de design.',
          blocks: [
            { t: 'p', v: "Dans une equipe, on n'écrit pas un style par bouton : on crée une <b>classe de base</b> et des <b>variantes</b>. C'est la methode de Bootstrap, Tailwind et de tous les design systems." },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  :root { --accent: #E2762E; --accent-clair: #F6B23D; }\n\n  .btn {\n    display: inline-flex; align-items: center; gap: 8px;\n    padding: 11px 20px; border-radius: 9px; border: 1px solid transparent;\n    font-size: 15px; font-weight: 700; cursor: pointer;\n    transition: transform .16s ease, background .16s ease;\n  }\n  .btn:hover { transform: translateY(-2px); }\n\n  .btn--principal { background: var(--accent); color: white; }\n  .btn--principal:hover { background: var(--accent-clair); color: #241917; }\n\n  .btn--fantome { background: transparent; border-color: var(--accent); color: var(--accent); }\n  .btn--fantome:hover { background: rgba(226,118,46,.12); }\n\n  .btn--danger { background: #E2544B; color: white; }\n  .btn--petit { padding: 7px 13px; font-size: 13px; }\n  .btn:disabled { opacity: .45; cursor: not-allowed; transform: none; }\n</style>\n\n<button class="btn btn--principal">Valider</button>\n<button class="btn btn--fantome">Annuler</button>\n<button class="btn btn--danger btn--petit">Supprimer</button>\n<button class="btn btn--principal" disabled>Indisponible</button>` },
            { t: 'tip', h: 'La convention BEM', v: "<code>bloc__element--variante</code> : <code>.btn</code> est le bloc, <code>.btn--danger</code> une variante. Ce nommage évite les collisions de classes dans un gros projet. Tu le verras dans beaucoup d'offres de stage." },
            { t: 'h', v: "N'oublie jamais l'état de focus" },
            { t: 'p', v: "Une personne qui navigue au clavier doit voir ou elle se trouve. Supprimer le contour sans le remplacer est une faute professionnelle." },
            { t: 'code', v: `.btn:focus-visible {\n  outline: 3px solid var(--accent-clair);\n  outline-offset: 2px;\n}` },
            { t: 'key', h: 'A retenir', v: "Une classe de base + des variantes · convention BEM · gerer :hover, :active, :disabled ET :focus-visible." }
          ],
          ex: [
            {
              brief: "Crée la classe de base <code>.btn</code> (padding <code>10px 18px</code>, <code>border-radius: 8px</code>, <code>cursor: pointer</code>, bordure transparente) et deux variantes : <code>.btn--vert</code> (fond <code>#7CC98A</code>) et <code>.btn--rouge</code> (fond <code>#E2544B</code>).",
              starter: '<style>\n  .btn {  }\n  .btn--vert {  }\n  .btn--rouge {  }\n</style>\n\n<button class="btn btn--vert">Accepter</button>\n<button class="btn btn--rouge">Refuser</button>\n',
              hint: 'Les proprietes communes vont dans .btn, seule la couleur change dans les variantes.',
              solution: `<style>\n  .btn {\n    padding: 10px 18px;\n    border-radius: 8px;\n    cursor: pointer;\n    border: 1px solid transparent;\n    color: white;\n    font-weight: bold;\n  }\n  .btn--vert { background: #7CC98A; }\n  .btn--rouge { background: #E2544B; }\n</style>\n\n<button class="btn btn--vert">Accepter</button>\n<button class="btn btn--rouge">Refuser</button>`,
              must: [['\\.btn\\s*\\{[\\s\\S]*?padding\\s*:\\s*10px\\s+18px', 'La base .btn doit avoir padding: 10px 18px;'],
                     ['\\.btn\\s*\\{[\\s\\S]*?border-radius\\s*:\\s*8px', 'La base .btn doit avoir border-radius: 8px;'],
                     ['\\.btn\\s*\\{[\\s\\S]*?cursor\\s*:\\s*pointer', 'La base .btn doit avoir cursor: pointer;'],
                     ['\\.btn--vert\\s*\\{[\\s\\S]*?#7CC98A', 'La variante verte doit utiliser #7CC98A.'],
                     ['\\.btn--rouge\\s*\\{[\\s\\S]*?#E2544B', 'La variante rouge doit utiliser #E2544B.']]
            }
          ],
          quiz: [
            { q: 'Pourquoi séparer .btn et .btn--danger ?', opts: ['Pour écrire plus de code', 'Pour ne définir la base qu\'une fois et decliner facilement', 'C\'est obligatoire en CSS'], a: 1, why: 'Une seule source pour le comportement commun, des variantes minimales.' },
            { q: 'Que ne faut-il jamais supprimer sans remplacement ?', opts: ['Le hover', 'Le contour de focus', 'Le border-radius'], a: 1, why: 'Sans focus visible, la navigation au clavier devient impossible.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 5 ---------------- */
    {
      n: 5, title: 'Qualité pro', sub: 'Accessibilité, SEO, performance',
      lessons: [
        {
          id: 'pw-5-1', title: 'Le site que tout le monde peut utiliser', kind: 'lecon', xp: 35,
          goal: 'Les règles qui distinguent un site amateur d\'un site publiable.',
          blocks: [
            { t: 'p', v: "En France, l'accessibilité numérique est une <b>obligation legale</b> pour les services publics et de nombreuses entreprises. C'est aussi ce qui fait qu'un site est bien classe par Google." },
            { t: 'h', v: 'La liste de contrôle' },
            {
              t: 'table', head: ['Règle', 'Pourquoi'],
              rows: [
                ['Un seul <code>&lt;h1&gt;</code>, hiérarchie sans trou', 'les lecteurs d\'écran naviguent par titres'],
                ['<code>alt</code> sur chaque image utile', 'decrit l\'image quand on ne la voit pas'],
                ['<code>alt=""</code> sur les images décoratives', 'évite de polluer la lecture vocale'],
                ['<code>label for</code> sur chaque champ', 'annonce le rôle du champ'],
                ['Contraste texte/fond suffisant', 'lisible en plein soleil comme avec une vue faible'],
                ['<code>lang="fr"</code> sur &lt;html&gt;', 'la synthèse vocale prononce en français'],
                ['Focus visible', 'navigation au clavier possible']
              ]
            },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  .mauvais { color: #b0b0b0; background: #ffffff; padding: 10px; }\n  .bon     { color: #2b2b2b; background: #ffffff; padding: 10px; }\n</style>\n\n<p class="mauvais">Contraste insuffisant : illisible pour beaucoup de gens.</p>\n<p class="bon">Contraste correct : lisible par tous.</p>` },
            { t: 'h', v: 'Le SEO minimal' },
            { t: 'code', v: `<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Club Robotique de Lyon - Ateliers pour ados</title>\n  <meta name="description" content="Ateliers de robotique et de programmation pour les 12-18 ans, tous les mercredis.">\n</head>` },
            { t: 'p', v: "Le <code>title</code> et la <code>description</code> sont exactement ce que les gens lisent dans les résultats Google. Ce sont deux lignes qui décident si on clique sur ton site." },
            { t: 'tip', h: 'Le test des 30 secondes', v: "Debranche ta souris et navigue avec la touche Tab. Si tu ne vois pas ou tu es ou si tu ne peux pas atteindre un bouton : ton site est casse pour une partie du public." },
            { t: 'key', h: 'A retenir', v: "Hiérarchie de titres · alt partout · label for · contraste · lang · focus visible · title et description soignes." }
          ],
          ex: [
            {
              brief: "Corrige cette page : ajoute un <code>alt</code> descriptif a l'image, relie le label au champ (<code>for</code> / <code>id</code> valant <code>email</code>), et remplace le <code>div</code> de titre par un vrai <code>h1</code>.",
              starter: '<div class="titre">Inscription</div>\n<img src="https://placehold.co/120x60">\n<label>Ton email</label>\n<input type="email">\n',
              hint: 'h1, alt="...", label for="email" et input id="email".',
              solution: `<h1>Inscription</h1>\n<img src="https://placehold.co/120x60" alt="Logo du club">\n<label for="email">Ton email</label>\n<input type="email" id="email">`,
              must: [['<h1>[\\s\\S]*?</h1>', 'Le titre doit etre un vrai <h1>.'],
                     ['<img[^>]*alt=["\\\'][^"\\\']+["\\\']', 'L\'image doit avoir un alt non vide.'],
                     ['<label[^>]*for=["\\\']email["\\\']', 'Le label doit avoir for="email".'],
                     ['<input[^>]*id=["\\\']email["\\\']', 'Le champ doit avoir id="email".']],
              success: 'Cette page est maintenant utilisable au clavier et par un lecteur d\'ecran.'
            }
          ],
          quiz: [
            { q: 'Que mettre dans le alt d\'une image purement décorative ?', opts: ['Une description détaillée', 'alt="" (vide)', 'Rien du tout, on omet l\'attribut'], a: 1, why: 'Un alt vide dit au lecteur d\'écran d\'ignorer l\'image ; omettre l\'attribut lui fait lire le nom du fichier.' },
            { q: 'Combien de h1 par page ?', opts: ['Un seul', 'Autant qu\'on veut', 'Au moins trois'], a: 0, why: 'Un h1 = le sujet de la page.' }
          ]
        }
      ]
    },

    /* ---------------- MODULE 6 : PROJET ---------------- */
    {
      n: 6, title: 'PROJET · Le portfolio', sub: 'Ta vraie page personnelle, publiable',
      lessons: [
        {
          id: 'pw-6-1', title: 'Portfolio — construction guidee', kind: 'projet', xp: 95,
          goal: 'Assembler grid, variables, transitions et accessibilité dans une page que tu peux vraiment mettre en ligne.',
          blocks: [
            { t: 'p', v: "Un portfolio, c'est la page qu'on envoie pour un stage, une candidature ou juste pour montrer ce qu'on sait faire. Elle doit être <b>simple, rapide et impeccable</b>." },
            { t: 'h', v: 'La structure gagnante' },
            { t: 'ol', v: [
              "<b>Banniere</b> : ton nom, une phrase qui dit ce que tu fais, un bouton de contact.",
              "<b>Projets</b> : une grille de cartes, chacune avec titre, description et technologies.",
              "<b>À propos</b> : trois lignes maximum. Personne ne lit un pave.",
              "<b>Contact</b> : un moyen simple de te joindre.",
              "<b>Pied de page</b> discret."
            ] },
            { t: 'h', v: 'Le squelette a copier' },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  :root { --accent: #E2762E; --fond: #17100E; --carte: #241917; --texte: #F6ECE3; --doux: #B9A395; }\n  .folio { background: var(--fond); color: var(--texte); padding: 24px; border-radius: 14px; font-family: system-ui, sans-serif; }\n  .banniere h1 { font-size: 34px; margin: 0 0 6px; }\n  .banniere p { color: var(--doux); margin: 0 0 16px; }\n  .cta { display: inline-block; background: var(--accent); color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; transition: transform .16s ease; }\n  .cta:hover { transform: translateY(-2px); }\n  .projets { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-top: 26px; }\n  .projet { background: var(--carte); padding: 16px; border-radius: 10px; border-left: 3px solid var(--accent); transition: transform .18s ease; }\n  .projet:hover { transform: translateY(-4px); }\n  .projet h3 { margin: 0 0 6px; }\n  .projet p { color: var(--doux); font-size: 14px; margin: 0; }\n  .tags { margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap; }\n  .tag { font-size: 11px; background: #3B2A23; padding: 3px 9px; border-radius: 99px; }\n</style>\n\n<div class="folio">\n  <header class="banniere">\n    <h1>Lea Martin</h1>\n    <p>Eleve de 3e — je construis des sites et des petits jeux en Python.</p>\n    <a class="cta" href="#contact">Me contacter</a>\n  </header>\n\n  <section class="projets">\n    <article class="projet">\n      <h3>Jeu du pendu</h3>\n      <p>Un pendu en console avec dictionnaire de mots.</p>\n      <div class="tags"><span class="tag">Python</span></div>\n    </article>\n    <article class="projet">\n      <h3>Page du club</h3>\n      <p>Site du club de robotique du college.</p>\n      <div class="tags"><span class="tag">HTML</span><span class="tag">CSS</span></div>\n    </article>\n    <article class="projet">\n      <h3>Compteur interactif</h3>\n      <p>Un compteur qui reagit au clic.</p>\n      <div class="tags"><span class="tag">JavaScript</span></div>\n    </article>\n  </section>\n</div>` },
            { t: 'tip', h: 'Le conseil qui compte', v: "Trois projets bien présentés valent mieux que dix bacles. Pour chacun : ce que c'est, ce que tu as appris, ce que tu ferais differemment." }
          ],
          ex: [
            {
              brief: "Réalise ton portfolio. Exigences : des variables CSS dans <code>:root</code> (au moins <code>--accent</code>), un <code>header</code> avec <code>h1</code> et une accroche, une grille <code>repeat(auto-fit, minmax(...))</code> contenant au moins 3 <code>article</code>, une transition au survol des cartes, et un <code>footer</code>.",
              starter: '<style>\n  :root {\n    --accent: #E2762E;\n  }\n</style>\n\n<header>\n  <h1>Ton nom</h1>\n</header>\n',
              hint: "Reprends le squelette de la leçon et personnalise-le. Vérifie chaque exigence une par une.",
              solution: `<style>\n  :root { --accent: #E2762E; --carte: #241917; --texte: #F6ECE3; }\n  body { font-family: system-ui, sans-serif; }\n  header h1 { color: var(--accent); }\n  .projets { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }\n  .projet { background: var(--carte); color: var(--texte); padding: 16px; border-radius: 10px; transition: transform .18s ease; }\n  .projet:hover { transform: translateY(-4px); }\n</style>\n\n<header>\n  <h1>Lea Martin</h1>\n  <p>Eleve de 3e, je construis des sites et des jeux.</p>\n</header>\n\n<section class="projets">\n  <article class="projet"><h3>Pendu</h3><p>Jeu en Python.</p></article>\n  <article class="projet"><h3>Club</h3><p>Site du club robotique.</p></article>\n  <article class="projet"><h3>Compteur</h3><p>Interaction en JavaScript.</p></article>\n</section>\n\n<footer>Lea Martin - 2026</footer>`,
              must: [[':root\\s*\\{[\\s\\S]*?--accent', 'Declare au moins --accent dans :root.'],
                     ['var\\(--accent\\)', 'Utilise var(--accent) quelque part.'],
                     ['<header>[\\s\\S]*?<h1>[\\s\\S]*?</h1>', 'Il faut un header avec un h1.'],
                     ['repeat\\(\\s*auto-fit', 'La grille des projets doit utiliser repeat(auto-fit, minmax(...)).'],
                     ['(<article[\\s\\S]*?</article>[\\s\\S]*?){3}', 'Il faut au moins trois <article> de projet.'],
                     ['transition\\s*:', 'Ajoute une transition sur les cartes.'],
                     [':hover', 'Ajoute un effet au survol.'],
                     ['<footer>[\\s\\S]*?</footer>', 'Il manque le footer.']],
              success: "Portfolio termine. Copie ce code dans un fichier index.html : il est publiable tel quel (GitHub Pages, Netlify...)."
            }
          ]
        }
      ]
    },

    /* ---------------- MODULE 7 : PROJET ---------------- */
    {
      n: 7, title: 'PROJET · La landing page', sub: 'La page qui vend',
      lessons: [
        {
          id: 'pw-7-1', title: 'Landing page — construction guidee', kind: 'projet', xp: 95,
          goal: 'Construire la page d\'accueil d\'un produit : structure de persuasion et mise en page pro.',
          blocks: [
            { t: 'p', v: "Une landing page a un seul but : faire faire <b>une</b> action. S'inscrire, acheter, s'abonner. Sa structure est toujours la même, dans cet ordre." },
            {
              t: 'table', head: ['Section', 'Rôle'],
              rows: [['Héros', 'promesse claire en une phrase + bouton'],
                     ['Benefices', '3 raisons, en 3 cartes'],
                     ['Preuve', 'témoignages ou chiffres'],
                     ['Prix', 'l\'offre, sans ambiguïté'],
                     ['Rappel', 'le même bouton, en bas']]
            },
            { t: 'code', lang: 'html', run: true, v: `<style>\n  :root { --accent: #E2762E; --sombre: #17100E; --clair: #F6ECE3; }\n  .lp { font-family: system-ui, sans-serif; }\n  .heros { background: var(--sombre); color: var(--clair); padding: 46px 28px; border-radius: 16px; text-align: center; }\n  .heros h1 { font-size: 38px; margin: 0 0 10px; }\n  .heros p { color: #B9A395; max-width: 46ch; margin: 0 auto 20px; }\n  .btn { background: var(--accent); color: white; border: 0; padding: 13px 26px; border-radius: 9px; font-size: 16px; font-weight: bold; cursor: pointer; transition: transform .16s; }\n  .btn:hover { transform: translateY(-2px); }\n  .benefices { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 14px; margin-top: 20px; }\n  .b { background: #f5f1ee; padding: 20px; border-radius: 12px; border-top: 3px solid var(--accent); }\n  .b h3 { margin: 0 0 6px; }\n  .b p { margin: 0; font-size: 14px; color: #5b4c44; }\n</style>\n\n<div class="lp">\n  <section class="heros">\n    <h1>Apprends a coder en 3 jours</h1>\n    <p>Trois parcours guides, des exercices corriges automatiquement et de vrais projets. Sans installation.</p>\n    <button class="btn">Commencer gratuitement</button>\n  </section>\n\n  <section class="benefices">\n    <div class="b"><h3>Zero installation</h3><p>Tout tourne dans ton navigateur.</p></div>\n    <div class="b"><h3>Correction immediate</h3><p>Chaque exercice est verifie a la seconde.</p></div>\n    <div class="b"><h3>De vrais projets</h3><p>Tu repars avec des programmes qui marchent.</p></div>\n  </section>\n</div>` }
          ],
          ex: [
            {
              brief: "Construis la landing page d'un produit de ton choix : une section <code>heros</code> (h1 + paragraphe + bouton), une grille de <b>3</b> benefices en <code>repeat(auto-fit, minmax(...))</code>, et une section tarif avec un prix. Utilise au moins deux variables CSS.",
              starter: '<style>\n  :root {\n    --accent: #E2762E;\n    --sombre: #17100E;\n  }\n</style>\n\n<section class="heros">\n  <h1></h1>\n</section>\n',
              hint: "Trois sections : héros, benefices (grid), tarif. Chaque exigence est vérifiée separement.",
              solution: `<style>\n  :root { --accent: #E2762E; --sombre: #17100E; }\n  .heros { background: var(--sombre); color: white; padding: 40px; border-radius: 14px; text-align: center; }\n  .btn { background: var(--accent); color: white; border: 0; padding: 12px 24px; border-radius: 8px; cursor: pointer; }\n  .benefices { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 18px; }\n  .b { background: #f4f0ed; padding: 18px; border-radius: 10px; }\n  .tarif { margin-top: 18px; padding: 20px; border: 2px solid var(--accent); border-radius: 12px; text-align: center; }\n</style>\n\n<section class="heros">\n  <h1>Le carnet d'entrainement du grimpeur</h1>\n  <p>Note tes seances, suis ta progression, depasse tes blocs.</p>\n  <button class="btn">Essayer gratuitement</button>\n</section>\n\n<section class="benefices">\n  <div class="b"><h3>Simple</h3><p>Une seance se note en 20 secondes.</p></div>\n  <div class="b"><h3>Visuel</h3><p>Ta progression en un graphique.</p></div>\n  <div class="b"><h3>Hors ligne</h3><p>Fonctionne meme dans la salle.</p></div>\n</section>\n\n<section class="tarif">\n  <h2>4,90 euros par mois</h2>\n  <button class="btn">Je m'abonne</button>\n</section>`,
              must: [[':root\\s*\\{[\\s\\S]*?--\\w+[\\s\\S]*?--\\w+', 'Declare au moins deux variables CSS.'],
                     ['<h1>[\\s\\S]*?</h1>', 'Il faut un h1 dans le heros.'],
                     ['<button[\\s\\S]*?</button>', 'Il faut un bouton d\'action.'],
                     ['repeat\\(\\s*auto-fit', 'La grille des benefices doit utiliser repeat(auto-fit, minmax(...)).'],
                     ['(<div class="b">[\\s\\S]*?</div>[\\s\\S]*?){3}|(<h3>[\\s\\S]*?</h3>[\\s\\S]*?){3}', 'Il faut trois benefices.'],
                     ['(euro|EUR|€|\\d+,\\d+|\\$)', 'La section tarif doit afficher un prix.']],
              success: "ATELIER DU BATISSEUR TERMINE. Grid, système de design, animations, composants, accessibilité et deux pages publiables."
            }
          ]
        }
      ]
    }
  ]
};
