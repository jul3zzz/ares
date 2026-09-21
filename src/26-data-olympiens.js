/* ARES — « Les Olympiens du Code » : la formation ultime, C++ en profondeur.
   Produit a part entiere, vendu separement d'ARES ULTRA (cle exclusive) :
   ce chemin n'est PAS ajoute au tableau PRO, donc aucune cle "tout debloquer"
   ne l'ouvre jamais — seule sa propre cle le peut. Voir src/70-app.js.

   Difference avec le C++ du parcours ULTRA normal (src/27-data-pro-cfamily.js,
   modules 5-7) : celui-la enseigne les fondations (cout/cin, classes, heritage,
   vector). Celui-ci part du principe que ces fondations sont acquises et va
   directement vers ce qui separe un debutant d'un ingenieur : templates, STL
   avancee, gestion moderne de la memoire, semantique de deplacement, polymor-
   phisme, programmation fonctionnelle, exceptions et concurrence. Comme pour
   le reste du C/C++/C#, aucun compilateur n'est disponible dans un site
   statique : la correction verifie la structure du code (checkPattern).      */
var PATH_OLYMPIENS = {
  id: 'olympiens-cpp', lang: 'cpp', name: 'C++ ULTIME', glyph: 'les olympiens du code',
  tag: 'OLYMPIENS · 9 modules', color: '#D4AF37', pro: true, exclusif: true,
  title: 'Les Olympiens du Code',
  blurb: "La formation ultime. Le C++ que la plupart des tutoriels n'abordent jamais : templates, pointeurs intelligents, semantique de deplacement, polymorphisme, concurrence. Le langage qui fait tourner les moteurs de jeux, les systemes financiers a haute frequence et les logiciels embarques les plus exigeants.",
  chips: ['9 modules', 'Le C++ que peu de developpeurs maitrisent', 'Niveau expert'],
  promise: "Ce parcours suppose que tu connais deja les bases du C++ (variables, fonctions, classes) — c'est le parcours C/C++/C# d'ARES ULTRA qui les enseigne. Ici, on va plus loin : chaque module attaque une notion qui fait vraiment la difference entre quelqu'un qui a suivi un cours et quelqu'un qui construit des systemes reels. Plusieurs mois de travail serieux pour une maitrise authentique.",
  days: [

    /* ============ MODULE 1 : TEMPLATES ET PROGRAMMATION GENERIQUE ============ */
    {
      n: 1, title: 'Templates et programmation generique', sub: 'Semaine 1-2 — un seul code pour tous les types',
      lessons: [
        {
          id: 'elc-1-1', title: 'Une fonction pour tous les types : les templates', kind: 'lecon', xp: 50,
          goal: 'Comprendre pourquoi les templates existent, et ecrire une fonction generique.',
          blocks: [
            { t: 'p', v: "Ecrire <code>maximum(int, int)</code>, puis <code>maximum(double, double)</code>, puis <code>maximum(string, string)</code> : c'est le meme algorithme recopie trois fois. Les <b>templates</b> permettent d'ecrire l'algorithme une seule fois, et de laisser le compilateur generer la bonne version pour chaque type utilise." },
            { t: 'code', v: `template<typename T>\nT maximum(T a, T b) {\n    return (a > b) ? a : b;\n}\n\nint main() {\n    cout << maximum(3, 7) << endl;        // T = int\n    cout << maximum(2.5, 1.1) << endl;    // T = double\n    return 0;\n}` },
            { t: 'analogy', v: "<b>L'image a retenir :</b> un template est un moule a gateau, pas un gateau. <code>template&lt;typename T&gt;</code> dit « ce moule accepte n'importe quel type T ». Le compilateur ne cuit le vrai gateau (le code machine) qu'au moment ou tu precises le type, en l'utilisant." },
            { t: 'warn', h: "T n'est qu'un nom", v: "Le nom <code>T</code> est une convention, pas un mot-cle : tu pourrais l'appeler <code>Type</code> ou <code>Valeur</code>. Ce qui compte, c'est <code>template&lt;typename ...&gt;</code> juste avant la fonction ou la classe." },
            { t: 'key', h: 'A retenir', v: "template<typename T> declare un type generique T · le compilateur genere une version specialisee par type reellement utilise." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Ecris une fonction template <code>T minimum(T a, T b)</code> qui renvoie la plus petite des deux valeurs.",
              starter: '#include <iostream>\nusing namespace std;\n\n\n\nint main() {\n    cout << minimum(4, 9) << endl;\n    return 0;\n}\n',
              hint: 'template<typename T>\nT minimum(T a, T b) {\n    return (a < b) ? a : b;\n}',
              solution: `#include <iostream>\nusing namespace std;\n\ntemplate<typename T>\nT minimum(T a, T b) {\n    return (a < b) ? a : b;\n}\n\nint main() {\n    cout << minimum(4, 9) << endl;\n    return 0;\n}`,
              must: [['template\\s*<\\s*typename\\s+T\\s*>', 'Declare template<typename T> juste avant la fonction.'],
                     ['T\\s+minimum\\s*\\(\\s*T\\s+a\\s*,\\s*T\\s+b\\s*\\)', 'La fonction doit avoir la signature T minimum(T a, T b).'],
                     ['return\\s*\\(\\s*a\\s*<\\s*b\\s*\\)\\s*\\?\\s*a\\s*:\\s*b', 'Renvoie (a < b) ? a : b.']],
              success: "Une seule fonction, valable pour les entiers, les decimaux, et tout type qui sait se comparer avec <."
            }
          ],
          quiz: [
            { q: 'Que represente T dans template<typename T> ?', opts: ['Un type fixe impose par C++', 'Un type generique, choisi au moment de l\'utilisation', 'Une variable globale'], a: 1, why: 'T est un espace reserve : le compilateur le remplace par le vrai type a chaque appel different.' }
          ]
        },
        {
          id: 'elc-1-2', title: 'Les classes template', kind: 'lecon', xp: 55,
          goal: 'Ecrire une classe generique qui stocke n\'importe quel type.',
          blocks: [
            { t: 'p', v: "Le meme principe s'applique aux classes : une <code>Boite&lt;T&gt;</code> peut contenir un <code>int</code>, un <code>string</code>, ou n'importe quel autre type — sans dupliquer le code de la classe." },
            { t: 'code', v: `template<typename T>\nclass Boite {\nprivate:\n    T contenu;\npublic:\n    Boite(T valeur) {\n        contenu = valeur;\n    }\n    T obtenir() {\n        return contenu;\n    }\n};\n\nint main() {\n    Boite<int> b1(42);\n    Boite<string> b2("Ares");\n    cout << b1.obtenir() << " " << b2.obtenir() << endl;\n    return 0;\n}` },
            { t: 'key', h: 'A retenir', v: "template<typename T> class Nom { T membre; ... }; · a l'utilisation, on precise le type entre chevrons : Nom<int>, Nom<string>." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Complete la classe template <code>Paire&lt;T&gt;</code> : deux membres prives <code>premier</code> et <code>second</code> (de type T), un constructeur qui les initialise, et une methode <code>afficher()</code> qui affiche <code>premier - second</code>.",
              starter: '#include <iostream>\nusing namespace std;\n\ntemplate<typename T>\nclass Paire {\nprivate:\n    \npublic:\n    \n};\n\nint main() {\n    Paire<int> p(3, 7);\n    p.afficher();\n    return 0;\n}\n',
              hint: 'T premier; T second; puis Paire(T a, T b) { premier = a; second = b; } et void afficher() { cout << premier << " - " << second << endl; }',
              solution: `#include <iostream>\nusing namespace std;\n\ntemplate<typename T>\nclass Paire {\nprivate:\n    T premier;\n    T second;\npublic:\n    Paire(T a, T b) {\n        premier = a;\n        second = b;\n    }\n    void afficher() {\n        cout << premier << " - " << second << endl;\n    }\n};\n\nint main() {\n    Paire<int> p(3, 7);\n    p.afficher();\n    return 0;\n}`,
              must: [['template\\s*<\\s*typename\\s+T\\s*>', 'Garde template<typename T> devant la classe.'],
                     ['T\\s+premier\\s*;', 'Declare T premier; en prive.'],
                     ['T\\s+second\\s*;', 'Declare T second; en prive.'],
                     ['void\\s+afficher\\s*\\(\\s*\\)', 'Ajoute une methode void afficher().']]
            }
          ],
          quiz: [
            { q: 'A quel moment precise-t-on le vrai type T d\'une classe template ?', opts: ['A la definition de la classe', 'A l\'utilisation, entre chevrons (ex : Boite<int>)', 'Jamais, C++ le devine seul'], a: 1, why: "Le type concret n'est choisi qu'au moment de l'instanciation, en ecrivant NomDeClasse<Type>." }
          ]
        },
        {
          id: 'elc-1-3', title: 'Épreuve I — Une pile générique', kind: 'boss', xp: 90,
          goal: 'Construire une vraie structure de donnees generique : une pile qui accepte n\'importe quel type.',
          blocks: [
            { t: 'p', v: "Une pile (stack) empile et depile toujours dans le meme ordre : le dernier arrive est le premier sorti (LIFO). En interne, elle peut tres bien s'appuyer sur un <code>vector&lt;T&gt;</code> deja fourni par la bibliotheque standard." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Complete la classe template <code>Pile&lt;T&gt;</code> : un <code>vector&lt;T&gt; data</code> prive, une methode <code>empiler(T valeur)</code> (push_back), une methode <code>depiler()</code> qui renvoie et retire le dernier element (back() puis pop_back()), et <code>estVide()</code> qui renvoie <code>data.empty()</code>.",
              starter: '#include <iostream>\n#include <vector>\nusing namespace std;\n\ntemplate<typename T>\nclass Pile {\nprivate:\n    vector<T> data;\npublic:\n    \n};\n\nint main() {\n    Pile<int> p;\n    p.empiler(1);\n    p.empiler(2);\n    cout << p.depiler() << endl;\n    return 0;\n}\n',
              hint: 'void empiler(T valeur) { data.push_back(valeur); } T depiler() { T v = data.back(); data.pop_back(); return v; } bool estVide() { return data.empty(); }',
              solution: `#include <iostream>\n#include <vector>\nusing namespace std;\n\ntemplate<typename T>\nclass Pile {\nprivate:\n    vector<T> data;\npublic:\n    void empiler(T valeur) {\n        data.push_back(valeur);\n    }\n    T depiler() {\n        T v = data.back();\n        data.pop_back();\n        return v;\n    }\n    bool estVide() {\n        return data.empty();\n    }\n};\n\nint main() {\n    Pile<int> p;\n    p.empiler(1);\n    p.empiler(2);\n    cout << p.depiler() << endl;\n    return 0;\n}`,
              must: [['void\\s+empiler\\s*\\(\\s*T\\s+valeur\\s*\\)', 'Declare void empiler(T valeur).'],
                     ['data\\.push_back\\s*\\(\\s*valeur\\s*\\)', 'empiler doit faire data.push_back(valeur);.'],
                     ['T\\s+depiler\\s*\\(\\s*\\)', 'Declare T depiler().'],
                     ['data\\.pop_back\\s*\\(\\s*\\)', 'depiler doit retirer avec data.pop_back();.'],
                     ['bool\\s+estVide\\s*\\(\\s*\\)', 'Ajoute bool estVide().']],
              success: "Une pile generique construite sur vector<T> : exactement comme le fait std::stack en coulisses."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 2 : LA BIBLIOTHEQUE STANDARD EN PROFONDEUR ============ */
    {
      n: 2, title: 'La bibliotheque standard en profondeur', sub: 'Semaine 3-4 — iterateurs, map et algorithmes',
      lessons: [
        {
          id: 'elc-2-1', title: 'Les iterateurs : parcourir sans indice', kind: 'lecon', xp: 50,
          goal: 'Comprendre les iterateurs, le mecanisme derriere begin()/end() et le for-each.',
          blocks: [
            { t: 'p', v: "Un <b>iterateur</b> est un objet qui pointe vers un element d'un conteneur et sait avancer vers le suivant — un peu comme un pointeur, mais generalise a tous les conteneurs de la STL, pas seulement aux tableaux." },
            { t: 'code', v: `vector<int> notes = {12, 8, 17};\n\nvector<int>::iterator it;\nfor (it = notes.begin(); it != notes.end(); ++it) {\n    cout << *it << endl;\n}` },
            { t: 'p', v: "<code>begin()</code> renvoie un iterateur vers le premier element, <code>end()</code> vers une position <em>apres</em> le dernier (jamais un element valide, juste une sentinelle d'arret). <code>*it</code> lit la valeur pointee, comme pour un pointeur." },
            { t: 'tip', h: 'Le for-each est du sucre syntaxique', v: "<code>for (int n : notes)</code> fait exactement ce que fait la boucle a iterateurs ci-dessus, en plus court. Savoir ce qu'il y a derriere permet de comprendre les messages d'erreur du compilateur, et d'ecrire ses propres classes iterables plus tard." },
            { t: 'key', h: 'A retenir', v: "vector<T>::iterator it declare un iterateur · begin()/end() delimitent le parcours · *it deref (lit la valeur), ++it avance." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Un <code>vector&lt;int&gt; nombres = {5, 10, 15};</code> est donne. Affiche chaque element avec une boucle a iterateur explicite (pas de for-each).",
              starter: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nombres = {5, 10, 15};\n    \n    return 0;\n}\n',
              hint: 'vector<int>::iterator it; for (it = nombres.begin(); it != nombres.end(); ++it) { cout << *it << endl; }',
              solution: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nombres = {5, 10, 15};\n    vector<int>::iterator it;\n    for (it = nombres.begin(); it != nombres.end(); ++it) {\n        cout << *it << endl;\n    }\n    return 0;\n}`,
              must: [['vector<int>::iterator\\s+it', 'Declare vector<int>::iterator it;.'],
                     ['it\\s*=\\s*nombres\\.begin\\s*\\(\\s*\\)', 'Initialise it a nombres.begin().'],
                     ['it\\s*!=\\s*nombres\\.end\\s*\\(\\s*\\)', 'Condition d\'arret : it != nombres.end().'],
                     ['\\*it', 'Deref l\'iterateur avec *it pour lire la valeur.']]
            }
          ],
          quiz: [
            { q: 'Que pointe l\'iterateur renvoye par end() ?', opts: ['Le dernier element valide', 'Une position juste apres le dernier element (jamais dereferencable)', 'Le premier element'], a: 1, why: "end() est une sentinelle d'arret, pas un element reel : la dereferencer avec * est un comportement indefini." }
          ]
        },
        {
          id: 'elc-2-2', title: 'std::map et std::set', kind: 'lecon', xp: 55,
          goal: 'Utiliser map (association cle-valeur) et set (ensemble sans doublons).',
          blocks: [
            { t: 'p', v: "<code>map&lt;K, V&gt;</code> associe une cle a une valeur, comme un dictionnaire Python. <code>set&lt;T&gt;</code> stocke des valeurs uniques, triees automatiquement." },
            { t: 'code', v: `#include <map>\n\nmap<string, int> ages;\nages["Nova"] = 14;\nages["Kaz"] = 15;\n\nfor (auto &p : ages) {\n    cout << p.first << " a " << p.second << " ans" << endl;\n}` },
            { t: 'p', v: "Dans une boucle for-each sur une <code>map</code>, chaque element est une <b>paire</b> : <code>p.first</code> est la cle, <code>p.second</code> est la valeur." },
            { t: 'key', h: 'A retenir', v: "map<K,V> associe cle et valeur, acces/creation via [] · set<T> stocke des valeurs uniques · p.first / p.second sur une paire de map." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Cree une <code>map&lt;string, int&gt; stock</code>, ajoute deux articles avec leur quantite via <code>stock[\"nom\"] = quantite;</code>, puis affiche chaque paire sous la forme <code>nom : quantite</code> avec une boucle for-each.",
              starter: '#include <iostream>\n#include <map>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'map<string, int> stock; stock["pommes"] = 10; stock["poires"] = 5; for (auto &p : stock) { cout << p.first << " : " << p.second << endl; }',
              solution: `#include <iostream>\n#include <map>\nusing namespace std;\n\nint main() {\n    map<string, int> stock;\n    stock["pommes"] = 10;\n    stock["poires"] = 5;\n    for (auto &p : stock) {\n        cout << p.first << " : " << p.second << endl;\n    }\n    return 0;\n}`,
              must: [['map<string,\\s*int>\\s+stock', 'Declare map<string, int> stock;.'],
                     ['stock\\[[^\\]]+\\]\\s*=', 'Ajoute au moins un element via stock["..."] = ...;.'],
                     ['for\\s*\\(\\s*auto\\s*&\\s*\\w+\\s*:\\s*stock\\s*\\)', 'Parcours stock avec un for-each par reference.'],
                     ['\\.first[\\s\\S]*\\.second|\\.second[\\s\\S]*\\.first', 'Affiche .first et .second de chaque paire.']]
            }
          ],
          quiz: [
            { q: 'Dans une boucle for-each sur une map, que represente p.first ?', opts: ['La valeur', 'La cle', 'L\'index de l\'element'], a: 1, why: "Chaque element d'une map est une paire cle/valeur : first est la cle, second la valeur." }
          ]
        },
        {
          id: 'elc-2-3', title: 'Les algorithmes de <algorithm>', kind: 'lecon', xp: 55,
          goal: 'Utiliser sort() et accumulate() au lieu de reecrire des boucles a la main.',
          blocks: [
            { t: 'p', v: "La bibliotheque standard fournit des dizaines d'algorithmes prets a l'emploi qui operent sur des paires d'iterateurs — ils marchent donc sur n'importe quel conteneur, pas seulement vector." },
            { t: 'code', v: `#include <algorithm>\n#include <numeric>\n\nvector<int> notes = {12, 8, 17, 5};\n\nsort(notes.begin(), notes.end());\nint total = accumulate(notes.begin(), notes.end(), 0);\n\ncout << total << endl;` },
            { t: 'warn', h: 'accumulate a besoin de <numeric>', v: "<code>sort</code> et <code>find</code> viennent de <code>&lt;algorithm&gt;</code>, mais <code>accumulate</code> (la somme) vient d'un en-tete different : <code>&lt;numeric&gt;</code>. Un oubli d'include est l'erreur la plus frequente ici." },
            { t: 'key', h: 'A retenir', v: "sort(deb, fin) trie sur place · accumulate(deb, fin, depart) additionne · les deux prennent des iterateurs, pas des conteneurs directement." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Un <code>vector&lt;int&gt; valeurs = {40, 10, 30, 20};</code> est donne. Trie-le avec <code>sort</code>, calcule sa somme avec <code>accumulate</code> (depart 0), et affiche la somme (attendu : 100).",
              starter: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> valeurs = {40, 10, 30, 20};\n    \n    return 0;\n}\n',
              hint: 'sort(valeurs.begin(), valeurs.end()); int total = accumulate(valeurs.begin(), valeurs.end(), 0); cout << total << endl;',
              solution: `#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> valeurs = {40, 10, 30, 20};\n    sort(valeurs.begin(), valeurs.end());\n    int total = accumulate(valeurs.begin(), valeurs.end(), 0);\n    cout << total << endl;\n    return 0;\n}`,
              must: [['sort\\s*\\(\\s*valeurs\\.begin\\s*\\(\\s*\\)\\s*,\\s*valeurs\\.end\\s*\\(\\s*\\)\\s*\\)', 'Trie avec sort(valeurs.begin(), valeurs.end()).'],
                     ['accumulate\\s*\\(\\s*valeurs\\.begin\\s*\\(\\s*\\)\\s*,\\s*valeurs\\.end\\s*\\(\\s*\\)\\s*,\\s*0\\s*\\)', 'Somme avec accumulate(valeurs.begin(), valeurs.end(), 0).']]
            }
          ],
          quiz: [
            { q: 'Quel en-tete faut-il inclure pour utiliser accumulate ?', opts: ['<algorithm>', '<numeric>', '<vector>'], a: 1, why: "accumulate vient de <numeric>, un en-tete distinct d'<algorithm> malgre l'usage frequent des deux ensemble." }
          ]
        },
        {
          id: 'elc-2-4', title: 'Épreuve II — Frequence de mots', kind: 'boss', xp: 90,
          goal: 'Combiner map et boucles pour un vrai petit outil d\'analyse de texte.',
          blocks: [{ t: 'p', v: "Compter les occurrences de chaque mot dans un texte est l'exercice fondateur de tout traitement de donnees textuelles — moteurs de recherche compris." }],
          ex: [
            {
              lang: 'cpp',
              brief: "Un <code>vector&lt;string&gt; mots = {\"ares\", \"code\", \"ares\", \"forge\", \"code\", \"ares\"};</code> est donne. Construis une <code>map&lt;string, int&gt; compte</code> qui compte les occurrences (astuce : <code>compte[mot]++;</code> cree l'entree a 0 si besoin puis l'incremente), puis affiche chaque mot avec son compte, sous la forme <code>mot : n</code>.",
              starter: '#include <iostream>\n#include <vector>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> mots = {"ares", "code", "ares", "forge", "code", "ares"};\n    \n    return 0;\n}\n',
              hint: 'map<string, int> compte; for (const auto &mot : mots) { compte[mot]++; } for (auto &p : compte) { cout << p.first << " : " << p.second << endl; }',
              solution: `#include <iostream>\n#include <vector>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> mots = {"ares", "code", "ares", "forge", "code", "ares"};\n    map<string, int> compte;\n    for (const auto &mot : mots) {\n        compte[mot]++;\n    }\n    for (auto &p : compte) {\n        cout << p.first << " : " << p.second << endl;\n    }\n    return 0;\n}`,
              must: [['map<string,\\s*int>\\s+compte', 'Declare map<string, int> compte;.'],
                     ['compte\\[\\s*mot\\s*\\]\\s*\\+\\+', 'Incremente avec compte[mot]++;.'],
                     ['for\\s*\\(\\s*const\\s+auto\\s*&\\s*mot\\s*:\\s*mots\\s*\\)', 'Parcours mots avec un for-each.'],
                     ['for\\s*\\(\\s*auto\\s*&\\s*\\w+\\s*:\\s*compte\\s*\\)', 'Parcours compte avec un for-each pour l\'affichage.']],
              success: "Une map remplie par une boucle, relue par une autre : le squelette de tout compteur de frequences."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 3 : GESTION MODERNE DE LA MEMOIRE ============ */
    {
      n: 3, title: 'Gestion moderne de la memoire', sub: 'Semaine 5-6 — RAII et pointeurs intelligents',
      lessons: [
        {
          id: 'elc-3-1', title: 'RAII : le principe qui evite les fuites', kind: 'lecon', xp: 55,
          goal: "Comprendre RAII (Resource Acquisition Is Initialization), le principe central du C++ moderne.",
          blocks: [
            { t: 'p', v: "<b>RAII</b> : une ressource (memoire, fichier, connexion) est acquise dans le <b>constructeur</b> d'un objet, et liberee dans son <b>destructeur</b>. Comme le destructeur s'execute automatiquement quand l'objet sort de sa portee, la ressource ne peut pas etre oubliee." },
            { t: 'code', v: `class Ressource {\npublic:\n    Ressource() {\n        cout << "acquisition" << endl;\n    }\n    ~Ressource() {\n        cout << "liberation" << endl;\n    }\n};\n\nint main() {\n    {\n        Ressource r;\n        cout << "utilisation" << endl;\n    }   // r sort de portee ici : liberation automatique\n    cout << "fin du programme" << endl;\n    return 0;\n}` },
            { t: 'analogy', v: "<b>L'image a retenir :</b> RAII, c'est une chambre d'hotel dont la carte magnetique arrete de fonctionner automatiquement au moment du check-out — impossible d'« oublier » de rendre la chambre, le systeme le fait pour toi." },
            { t: 'key', h: 'A retenir', v: "Constructeur = acquisition de la ressource · destructeur (~Nom()) = liberation automatique, meme en cas d'erreur en cours de route." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Ecris une classe <code>JournalRAII</code> dont le constructeur affiche <code>ouverture du journal</code> et le destructeur affiche <code>fermeture du journal</code>.",
              starter: '#include <iostream>\nusing namespace std;\n\nclass JournalRAII {\npublic:\n    \n};\n\nint main() {\n    JournalRAII j;\n    return 0;\n}\n',
              hint: 'JournalRAII() { cout << "ouverture du journal" << endl; } ~JournalRAII() { cout << "fermeture du journal" << endl; }',
              solution: `#include <iostream>\nusing namespace std;\n\nclass JournalRAII {\npublic:\n    JournalRAII() {\n        cout << "ouverture du journal" << endl;\n    }\n    ~JournalRAII() {\n        cout << "fermeture du journal" << endl;\n    }\n};\n\nint main() {\n    JournalRAII j;\n    return 0;\n}`,
              must: [['JournalRAII\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*?"ouverture du journal"', 'Le constructeur doit afficher "ouverture du journal".'],
                     ['~JournalRAII\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*?"fermeture du journal"', 'Le destructeur ~JournalRAII() doit afficher "fermeture du journal".']]
            }
          ],
          quiz: [
            { q: 'Quand le destructeur d\'un objet local s\'execute-t-il ?', opts: ['Jamais automatiquement', 'Automatiquement quand l\'objet sort de sa portee', 'Seulement si on appelle delete dessus'], a: 1, why: "C'est exactement ce declenchement automatique qui rend RAII fiable : pas besoin d'y penser." }
          ]
        },
        {
          id: 'elc-3-2', title: 'unique_ptr : un seul proprietaire', kind: 'lecon', xp: 60,
          goal: "Remplacer new/delete manuels par unique_ptr, qui libere automatiquement sa memoire.",
          blocks: [
            { t: 'p', v: "<code>unique_ptr&lt;T&gt;</code> possede <em>seul</em> l'objet qu'il pointe : quand il sort de portee, il le detruit automatiquement (RAII applique aux pointeurs). Il ne peut pas etre copie — seulement deplace — ce qui garantit qu'il n'y a jamais deux proprietaires en meme temps." },
            { t: 'code', v: `#include <memory>\n\nclass Monstre {\npublic:\n    void afficher() {\n        cout << "Un monstre rode." << endl;\n    }\n};\n\nint main() {\n    unique_ptr<Monstre> m = make_unique<Monstre>();\n    m->afficher();\n    return 0;\n}   // m est detruit automatiquement ici, pas besoin de delete` },
            { t: 'warn', h: 'make_unique plutot que new', v: "Ecrire <code>unique_ptr&lt;Monstre&gt; m(new Monstre());</code> fonctionne, mais <code>make_unique&lt;Monstre&gt;()</code> est la maniere moderne recommandee : plus sure en cas d'exception pendant la construction." },
            { t: 'key', h: 'A retenir', v: "unique_ptr<T> possede seul son objet · make_unique<T>(...) le cree · -> accede aux membres, comme un pointeur classique." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "La classe <code>Monstre</code> avec sa methode <code>afficher()</code> est deja definie. Cree un <code>unique_ptr&lt;Monstre&gt;</code> avec <code>make_unique</code>, puis appelle <code>afficher()</code> dessus.",
              starter: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Monstre {\npublic:\n    void afficher() {\n        cout << "Un monstre rode." << endl;\n    }\n};\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'unique_ptr<Monstre> m = make_unique<Monstre>(); m->afficher();',
              solution: `#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Monstre {\npublic:\n    void afficher() {\n        cout << "Un monstre rode." << endl;\n    }\n};\n\nint main() {\n    unique_ptr<Monstre> m = make_unique<Monstre>();\n    m->afficher();\n    return 0;\n}`,
              must: [['unique_ptr<Monstre>\\s+\\w+\\s*=\\s*make_unique<Monstre>\\s*\\(\\s*\\)', 'Cree le pointeur avec unique_ptr<Monstre> ... = make_unique<Monstre>().'],
                     ['->afficher\\s*\\(\\s*\\)', 'Appelle afficher() via -> sur le unique_ptr.']]
            }
          ],
          quiz: [
            { q: 'Peut-on copier un unique_ptr ?', opts: ['Oui, comme n\'importe quelle variable', 'Non, seulement le deplacer', 'Oui, mais une seule fois'], a: 1, why: "unique_ptr interdit la copie pour garantir qu'il n'existe jamais deux proprietaires du meme objet ; il peut seulement etre deplace." }
          ]
        },
        {
          id: 'elc-3-3', title: 'shared_ptr : un proprietaire partage', kind: 'lecon', xp: 60,
          goal: "Utiliser shared_ptr quand plusieurs parties du programme doivent posseder le meme objet.",
          blocks: [
            { t: 'p', v: "Parfois, aucun proprietaire unique n'a de sens : plusieurs objets doivent partager la meme ressource. <code>shared_ptr&lt;T&gt;</code> compte combien de <code>shared_ptr</code> pointent vers le meme objet, et ne le detruit que quand ce compte tombe a zero." },
            { t: 'code', v: `#include <memory>\n\nshared_ptr<int> a = make_shared<int>(10);\nshared_ptr<int> b = a;   // copie autorisee : b partage la propriete\n\ncout << *a << " " << *b << endl;\ncout << a.use_count() << endl;   // 2 : a et b pointent vers la meme case` },
            { t: 'tip', h: 'unique_ptr par defaut', v: "En pratique, on prefere <code>unique_ptr</code> par defaut — plus simple, plus rapide, zero ambiguite sur qui possede quoi. On ne passe a <code>shared_ptr</code> que quand un partage reel de propriete est necessaire." },
            { t: 'key', h: 'A retenir', v: "shared_ptr<T> autorise plusieurs proprietaires · make_shared<T>(...) le cree · use_count() donne le nombre de proprietaires actuels." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Cree un <code>shared_ptr&lt;int&gt; a</code> avec <code>make_shared</code> valant 10, cree un second <code>shared_ptr&lt;int&gt; b</code> qui partage la propriete de a (<code>b = a;</code>), puis affiche <code>a.use_count()</code>.",
              starter: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'shared_ptr<int> a = make_shared<int>(10); shared_ptr<int> b = a; cout << a.use_count() << endl;',
              solution: `#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n    shared_ptr<int> a = make_shared<int>(10);\n    shared_ptr<int> b = a;\n    cout << a.use_count() << endl;\n    return 0;\n}`,
              must: [['shared_ptr<int>\\s+a\\s*=\\s*make_shared<int>\\s*\\(\\s*10\\s*\\)', 'Cree a avec make_shared<int>(10).'],
                     ['shared_ptr<int>\\s+b\\s*=\\s*a\\s*;', 'Cree b comme copie de a (partage de propriete).'],
                     ['a\\.use_count\\s*\\(\\s*\\)', 'Affiche a.use_count().']]
            }
          ],
          quiz: [
            { q: 'Quand un objet gere par shared_ptr est-il reellement detruit ?', opts: ['Des qu\'un premier shared_ptr est detruit', 'Quand le compte de proprietaires (use_count) tombe a zero', 'Jamais automatiquement'], a: 1, why: "shared_ptr compte ses proprietaires ; l'objet n'est libere que lorsque le dernier disparait." }
          ]
        },
        {
          id: 'elc-3-4', title: 'Épreuve III — Un gestionnaire sans fuite', kind: 'boss', xp: 95,
          goal: 'Construire une classe qui gere plusieurs ressources sans jamais risquer une fuite memoire.',
          blocks: [
            { t: 'p', v: "En combinant <code>vector</code> et <code>unique_ptr</code>, on obtient une collection d'objets dont la duree de vie est geree automatiquement — le motif exact utilise par des moteurs de jeu reels pour gerer leurs entites." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "La classe <code>Ressource</code> est deja definie. Complete <code>GestionnaireRessources</code> : un <code>vector&lt;unique_ptr&lt;Ressource&gt;&gt; items</code> prive, et une methode <code>ajouter()</code> qui cree une <code>Ressource</code> avec <code>make_unique</code> et l'ajoute au vector avec <code>push_back(std::move(...))</code>.",
              starter: '#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Ressource {\npublic:\n    void utiliser() {\n        cout << "ressource utilisee" << endl;\n    }\n};\n\nclass GestionnaireRessources {\nprivate:\n    \npublic:\n    \n};\n\nint main() {\n    GestionnaireRessources g;\n    g.ajouter();\n    return 0;\n}\n',
              hint: 'vector<unique_ptr<Ressource>> items; void ajouter() { items.push_back(std::move(make_unique<Ressource>())); }',
              solution: `#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Ressource {\npublic:\n    void utiliser() {\n        cout << "ressource utilisee" << endl;\n    }\n};\n\nclass GestionnaireRessources {\nprivate:\n    vector<unique_ptr<Ressource>> items;\npublic:\n    void ajouter() {\n        unique_ptr<Ressource> r = make_unique<Ressource>();\n        items.push_back(std::move(r));\n    }\n};\n\nint main() {\n    GestionnaireRessources g;\n    g.ajouter();\n    return 0;\n}`,
              must: [['vector<unique_ptr<Ressource>>\\s+items', 'Declare vector<unique_ptr<Ressource>> items;.'],
                     ['make_unique<Ressource>\\s*\\(\\s*\\)', 'Cree la ressource avec make_unique<Ressource>().'],
                     ['items\\.push_back\\s*\\(\\s*std::move\\s*\\(', 'Ajoute-la au vector avec items.push_back(std::move(...)).']],
              success: "Un vector de unique_ptr : la collection ne peut techniquement pas fuir, le compilateur l'interdit."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 4 : SEMANTIQUE DE DEPLACEMENT ============ */
    {
      n: 4, title: 'Semantique de deplacement', sub: 'Semaine 7-8 — arreter de copier ce qui est cher',
      lessons: [
        {
          id: 'elc-4-1', title: 'Le cout cache des copies', kind: 'lecon', xp: 50,
          goal: "Comprendre pourquoi copier un objet volumineux est couteux, et ou ca arrive sans qu'on le voie.",
          blocks: [
            { t: 'p', v: "Passer un <code>vector</code> de 10 000 elements « par valeur » a une fonction, ou l'affecter a une autre variable, recopie <em>chaque element</em>. C'est souvent invisible dans le code — et souvent inutile, si l'original n'est plus utilise apres." },
            { t: 'code', v: `class GrosBuffer {\nprivate:\n    int taille;\npublic:\n    GrosBuffer(int t) : taille(t) {}\n    GrosBuffer(const GrosBuffer &autre) {\n        taille = autre.taille;\n        cout << "copie couteuse" << endl;\n    }\n};` },
            { t: 'warn', h: 'La copie est parfois silencieuse', v: "<code>GrosBuffer b2 = b1;</code>, un retour de fonction par valeur (dans les anciennes versions du langage), ou passer un objet a une fonction sans <code>&</code> : toutes ces ecritures declenchent une copie sans le crier." },
            { t: 'key', h: 'A retenir', v: "Un constructeur de copie (const T &autre) s'execute a chaque duplication d'un objet · pour un objet volumineux, c'est le point chaud a surveiller en premier." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Ecris une classe <code>GrosBuffer</code> avec un membre <code>int taille</code>, un constructeur qui l'initialise, et un <b>constructeur de copie</b> <code>GrosBuffer(const GrosBuffer &amp;autre)</code> qui recopie <code>taille</code> et affiche <code>copie couteuse</code>.",
              starter: '#include <iostream>\nusing namespace std;\n\nclass GrosBuffer {\nprivate:\n    int taille;\npublic:\n    GrosBuffer(int t) {\n        taille = t;\n    }\n    \n};\n\nint main() {\n    GrosBuffer a(1000);\n    GrosBuffer b = a;\n    return 0;\n}\n',
              hint: 'GrosBuffer(const GrosBuffer &autre) { taille = autre.taille; cout << "copie couteuse" << endl; }',
              solution: `#include <iostream>\nusing namespace std;\n\nclass GrosBuffer {\nprivate:\n    int taille;\npublic:\n    GrosBuffer(int t) {\n        taille = t;\n    }\n    GrosBuffer(const GrosBuffer &autre) {\n        taille = autre.taille;\n        cout << "copie couteuse" << endl;\n    }\n};\n\nint main() {\n    GrosBuffer a(1000);\n    GrosBuffer b = a;\n    return 0;\n}`,
              must: [['GrosBuffer\\s*\\(\\s*const\\s+GrosBuffer\\s*&\\s*autre\\s*\\)', 'Declare le constructeur de copie GrosBuffer(const GrosBuffer &autre).'],
                     ['taille\\s*=\\s*autre\\.taille', 'Recopie taille depuis autre.'],
                     ['"copie couteuse"', 'Affiche "copie couteuse" dans le constructeur de copie.']]
            }
          ],
          quiz: [
            { q: 'Quand le constructeur de copie d\'une classe s\'execute-t-il ?', opts: ['Seulement si on l\'appelle explicitement', 'A chaque duplication d\'un objet de cette classe (affectation, passage par valeur...)', 'Jamais en C++ moderne'], a: 1, why: "Toute duplication declenche le constructeur de copie, sauf si un deplacement est possible et utilise a la place." }
          ]
        },
        {
          id: 'elc-4-2', title: 'References rvalue && et std::move', kind: 'lecon', xp: 60,
          goal: "Distinguer lvalue et rvalue, et utiliser std::move pour transferer une ressource au lieu de la copier.",
          blocks: [
            { t: 'p', v: "Une <b>lvalue</b> a un nom et perdure (une variable). Une <b>rvalue</b> est temporaire (un litteral, un resultat de calcul non stocke). <code>T&amp;&amp;</code> est une <b>reference rvalue</b> : elle capture specifiquement ces valeurs temporaires, qu'on peut « piller » sans consequence puisqu'elles vont disparaitre de toute facon." },
            { t: 'code', v: `void consommer(string &&s) {\n    cout << "recu : " << s << endl;\n}\n\nint main() {\n    string texte = "bonjour";\n    consommer(std::move(texte));\n    // texte ne doit plus etre utilise normalement apres ce move\n    return 0;\n}` },
            { t: 'warn', h: 'std::move ne deplace rien tout seul', v: "<code>std::move(x)</code> ne fait que <em>convertir</em> x en reference rvalue — c'est une promesse « tu peux piller cette valeur ». C'est le constructeur ou l'operateur qui recoit ensuite cette reference qui decide reellement de piller les ressources." },
            { t: 'key', h: 'A retenir', v: "T&& est une reference vers une valeur temporaire · std::move(x) transforme x en reference rvalue, signalant qu'on peut recuperer ses ressources sans copier." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Ecris une fonction <code>void consommer(string &amp;&amp;s)</code> qui affiche <code>recu : </code> suivi de s, puis appelle-la avec <code>std::move(texte)</code> depuis main (le code de main est deja ecrit).",
              starter: '#include <iostream>\n#include <string>\nusing namespace std;\n\n\n\nint main() {\n    string texte = "bonjour";\n    consommer(std::move(texte));\n    return 0;\n}\n',
              hint: 'void consommer(string &&s) { cout << "recu : " << s << endl; }',
              solution: `#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid consommer(string &&s) {\n    cout << "recu : " << s << endl;\n}\n\nint main() {\n    string texte = "bonjour";\n    consommer(std::move(texte));\n    return 0;\n}`,
              must: [['void\\s+consommer\\s*\\(\\s*string\\s*&&\\s*s\\s*\\)', 'Declare void consommer(string &&s).'],
                     ['"recu : "', 'Affiche "recu : " suivi de s.']]
            }
          ],
          quiz: [
            { q: 'Que fait exactement std::move(x) ?', opts: ['Il deplace physiquement x en memoire', 'Il convertit x en reference rvalue, autorisant a piller ses ressources', 'Il copie x'], a: 1, why: "std::move ne deplace rien lui-meme : c'est une conversion de type qui autorise le code suivant a piller les ressources de x." }
          ]
        },
        {
          id: 'elc-4-3', title: 'Épreuve IV — Un constructeur de deplacement', kind: 'boss', xp: 100,
          goal: 'Ecrire un vrai constructeur de deplacement qui vole les ressources au lieu de les copier.',
          blocks: [
            { t: 'p', v: "Un constructeur de deplacement transfere la propriete d'une ressource (ici, un pointeur brut) d'un objet source vers un nouvel objet, puis met la source dans un etat sur a detruire — generalement en mettant son pointeur a <code>nullptr</code>." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Complete la classe <code>Buffer</code> : elle a un membre <code>int* donnees</code>. Ecris son <b>constructeur de deplacement</b> <code>Buffer(Buffer &amp;&amp;autre)</code> qui recupere <code>autre.donnees</code>, puis met <code>autre.donnees = nullptr;</code>. Ecris aussi le destructeur qui fait <code>delete donnees;</code> uniquement si <code>donnees</code> n'est pas nul.",
              starter: '#include <iostream>\nusing namespace std;\n\nclass Buffer {\npublic:\n    int* donnees;\n\n    Buffer(int valeur) {\n        donnees = new int(valeur);\n    }\n\n    \n\n    \n};\n\nint main() {\n    Buffer a(42);\n    Buffer b(std::move(a));\n    return 0;\n}\n',
              hint: 'Buffer(Buffer &&autre) { donnees = autre.donnees; autre.donnees = nullptr; } ~Buffer() { if (donnees != nullptr) { delete donnees; } }',
              solution: `#include <iostream>\nusing namespace std;\n\nclass Buffer {\npublic:\n    int* donnees;\n\n    Buffer(int valeur) {\n        donnees = new int(valeur);\n    }\n\n    Buffer(Buffer &&autre) {\n        donnees = autre.donnees;\n        autre.donnees = nullptr;\n    }\n\n    ~Buffer() {\n        if (donnees != nullptr) {\n            delete donnees;\n        }\n    }\n};\n\nint main() {\n    Buffer a(42);\n    Buffer b(std::move(a));\n    return 0;\n}`,
              must: [['Buffer\\s*\\(\\s*Buffer\\s*&&\\s*autre\\s*\\)', 'Declare le constructeur de deplacement Buffer(Buffer &&autre).'],
                     ['donnees\\s*=\\s*autre\\.donnees', 'Recupere le pointeur : donnees = autre.donnees;.'],
                     ['autre\\.donnees\\s*=\\s*nullptr', 'Vide la source : autre.donnees = nullptr;.'],
                     ['~Buffer\\s*\\(\\s*\\)', 'Ajoute le destructeur ~Buffer().'],
                     ['delete\\s+donnees', 'Le destructeur doit faire delete donnees;.']],
              success: "Le pointeur change de proprietaire sans qu'un seul octet ne soit recopie — c'est tout l'interet du deplacement."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 5 : OPERATEURS ET POLYMORPHISME ============ */
    {
      n: 5, title: 'Surcharge d\'operateurs et polymorphisme', sub: 'Semaine 9-10',
      lessons: [
        {
          id: 'elc-5-1', title: 'Surcharger ses propres operateurs', kind: 'lecon', xp: 55,
          goal: 'Faire fonctionner +, ==, << sur ses propres types.',
          blocks: [
            { t: 'p', v: "C++ permet de definir ce que fait <code>+</code> entre deux objets d'une classe qu'on a soi-meme ecrite — c'est ce qui rend <code>vector1 + vector2</code> ou <code>a == b</code> possibles pour des types personnalises." },
            { t: 'code', v: `class Vecteur2D {\npublic:\n    double x, y;\n    Vecteur2D(double px, double py) : x(px), y(py) {}\n\n    Vecteur2D operator+(const Vecteur2D &autre) const {\n        return Vecteur2D(x + autre.x, y + autre.y);\n    }\n};\n\nint main() {\n    Vecteur2D a(1, 2), b(3, 4);\n    Vecteur2D c = a + b;   // appelle operator+\n    cout << c.x << " " << c.y << endl;\n    return 0;\n}` },
            { t: 'key', h: 'A retenir', v: "Type operator+(const Type &autre) const { ... } surcharge + · le mot-cle const final garantit que l'operation ne modifie pas l'objet de gauche." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "La classe <code>Fraction</code> a deux membres <code>num</code> et <code>denom</code>. En supposant que les deux fractions ont le meme <code>denom</code>, ecris <code>operator+</code> qui renvoie une nouvelle <code>Fraction</code> dont le numerateur est la somme des deux <code>num</code>, avec le meme <code>denom</code>.",
              starter: '#include <iostream>\nusing namespace std;\n\nclass Fraction {\npublic:\n    int num, denom;\n    Fraction(int n, int d) : num(n), denom(d) {}\n\n    \n};\n\nint main() {\n    Fraction a(1, 4), b(2, 4);\n    Fraction c = a + b;\n    cout << c.num << "/" << c.denom << endl;\n    return 0;\n}\n',
              hint: 'Fraction operator+(const Fraction &autre) const { return Fraction(num + autre.num, denom); }',
              solution: `#include <iostream>\nusing namespace std;\n\nclass Fraction {\npublic:\n    int num, denom;\n    Fraction(int n, int d) : num(n), denom(d) {}\n\n    Fraction operator+(const Fraction &autre) const {\n        return Fraction(num + autre.num, denom);\n    }\n};\n\nint main() {\n    Fraction a(1, 4), b(2, 4);\n    Fraction c = a + b;\n    cout << c.num << "/" << c.denom << endl;\n    return 0;\n}`,
              must: [['Fraction\\s+operator\\+\\s*\\(\\s*const\\s+Fraction\\s*&\\s*autre\\s*\\)\\s*const', 'Declare Fraction operator+(const Fraction &autre) const.'],
                     ['return\\s+Fraction\\s*\\(\\s*num\\s*\\+\\s*autre\\.num\\s*,\\s*denom\\s*\\)', 'Renvoie Fraction(num + autre.num, denom).']]
            }
          ],
          quiz: [
            { q: 'A quoi sert le const final dans Fraction operator+(const Fraction &autre) const ?', opts: ['Rien, c\'est une simple convention', 'Il garantit que l\'operation ne modifie pas l\'objet de gauche', 'Il rend l\'operateur plus rapide'], a: 1, why: "Ce const promet — et le compilateur verifie — que a + b ne modifie ni a ni b." }
          ]
        },
        {
          id: 'elc-5-2', title: 'Polymorphisme et classes abstraites', kind: 'lecon', xp: 60,
          goal: 'Definir une interface commune avec virtual et = 0, implementee differemment par chaque classe fille.',
          blocks: [
            { t: 'p', v: "Une methode <code>virtual</code> peut etre <b>redefinie</b> par une classe fille ; appelee via un pointeur ou une reference vers la classe de base, c'est la version de la classe reelle de l'objet qui s'execute — pas celle de la base. Une methode <code>= 0</code> est <b>pure</b> : la classe de base ne fournit aucune implementation, elle impose juste un contrat." },
            { t: 'code', v: `class Forme {\npublic:\n    virtual double aire() const = 0;   // methode pure : Forme est abstraite\n    virtual ~Forme() {}\n};\n\nclass Carre : public Forme {\nprivate:\n    double cote;\npublic:\n    Carre(double c) : cote(c) {}\n    double aire() const override {\n        return cote * cote;\n    }\n};` },
            { t: 'warn', h: 'On ne peut pas instancier Forme', v: "Une classe avec au moins une methode pure (<code>= 0</code>) est <b>abstraite</b> : <code>Forme f;</code> est une erreur de compilation. Seules des classes filles qui implementent toutes les methodes pures peuvent etre instanciees." },
            { t: 'key', h: 'A retenir', v: "virtual ... = 0 declare une methode pure (classe abstraite) · override signale explicitement une redefinition dans une classe fille." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "La classe abstraite <code>Forme</code> avec <code>virtual double aire() const = 0;</code> existe deja. Cree <code>class Carre : public Forme</code> avec un membre <code>cote</code>, un constructeur, et <code>double aire() const override</code> qui renvoie <code>cote * cote</code>.",
              starter: '#include <iostream>\nusing namespace std;\n\nclass Forme {\npublic:\n    virtual double aire() const = 0;\n    virtual ~Forme() {}\n};\n\n\n\nint main() {\n    Carre c(4);\n    cout << c.aire() << endl;\n    return 0;\n}\n',
              hint: 'class Carre : public Forme { private: double cote; public: Carre(double c) : cote(c) {} double aire() const override { return cote * cote; } };',
              solution: `#include <iostream>\nusing namespace std;\n\nclass Forme {\npublic:\n    virtual double aire() const = 0;\n    virtual ~Forme() {}\n};\n\nclass Carre : public Forme {\nprivate:\n    double cote;\npublic:\n    Carre(double c) : cote(c) {}\n    double aire() const override {\n        return cote * cote;\n    }\n};\n\nint main() {\n    Carre c(4);\n    cout << c.aire() << endl;\n    return 0;\n}`,
              must: [['class\\s+Carre\\s*:\\s*public\\s+Forme', 'Declare class Carre : public Forme.'],
                     ['double\\s+cote\\s*;', 'Ajoute un membre double cote;.'],
                     ['double\\s+aire\\s*\\(\\s*\\)\\s*const\\s+override', 'Redefinis double aire() const override.'],
                     ['return\\s+cote\\s*\\*\\s*cote', 'aire() doit renvoyer cote * cote.']]
            }
          ]
        },
        {
          id: 'elc-5-3', title: 'Épreuve V — Le jardin polymorphe', kind: 'boss', xp: 100,
          goal: 'Stocker des formes differentes dans une seule collection, et les traiter uniformement grace au polymorphisme.',
          blocks: [
            { t: 'p', v: "C'est ici que templates du module 1, smart pointers du module 3 et polymorphisme se rejoignent : un <code>vector&lt;unique_ptr&lt;Forme&gt;&gt;</code> peut contenir des <code>Cercle</code> et des <code>Carre</code> en meme temps, et appeler <code>aire()</code> sur chacun sans savoir lequel c'est vraiment." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "<code>Forme</code> (abstraite) et <code>Cercle</code> sont deja definies. Cree un <code>vector&lt;unique_ptr&lt;Forme&gt;&gt; jardin</code>, ajoute-y deux <code>Cercle</code> differents avec <code>push_back(make_unique&lt;Cercle&gt;(...))</code>, puis affiche l'aire de chaque forme avec une boucle for-each.",
              starter: '#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Forme {\npublic:\n    virtual double aire() const = 0;\n    virtual ~Forme() {}\n};\n\nclass Cercle : public Forme {\nprivate:\n    double rayon;\npublic:\n    Cercle(double r) : rayon(r) {}\n    double aire() const override {\n        return 3.14159 * rayon * rayon;\n    }\n};\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'vector<unique_ptr<Forme>> jardin; jardin.push_back(make_unique<Cercle>(2.0)); jardin.push_back(make_unique<Cercle>(3.0)); for (const auto &f : jardin) { cout << f->aire() << endl; }',
              solution: `#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Forme {\npublic:\n    virtual double aire() const = 0;\n    virtual ~Forme() {}\n};\n\nclass Cercle : public Forme {\nprivate:\n    double rayon;\npublic:\n    Cercle(double r) : rayon(r) {}\n    double aire() const override {\n        return 3.14159 * rayon * rayon;\n    }\n};\n\nint main() {\n    vector<unique_ptr<Forme>> jardin;\n    jardin.push_back(make_unique<Cercle>(2.0));\n    jardin.push_back(make_unique<Cercle>(3.0));\n    for (const auto &f : jardin) {\n        cout << f->aire() << endl;\n    }\n    return 0;\n}`,
              must: [['vector<unique_ptr<Forme>>\\s+jardin', 'Declare vector<unique_ptr<Forme>> jardin;.'],
                     ['jardin\\.push_back\\s*\\(\\s*make_unique<Cercle>\\s*\\(', 'Ajoute des Cercle avec jardin.push_back(make_unique<Cercle>(...)).'],
                     ['for\\s*\\(\\s*const\\s+auto\\s*&\\s*\\w+\\s*:\\s*jardin\\s*\\)', 'Parcours jardin avec un for-each par reference constante.'],
                     ['->aire\\s*\\(\\s*\\)', 'Appelle ->aire() sur chaque element (polymorphisme).']],
              success: "Le meme appel ->aire(), deux comportements differents selon l'objet reel : c'est exactement ca, le polymorphisme."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 6 : PROGRAMMATION FONCTIONNELLE ============ */
    {
      n: 6, title: 'Programmation fonctionnelle en C++', sub: 'Semaine 11 — lambdas et comportements',
      lessons: [
        {
          id: 'elc-6-1', title: 'Les lambdas et leurs captures', kind: 'lecon', xp: 55,
          goal: 'Ecrire des fonctions anonymes (lambdas) et comprendre leurs captures.',
          blocks: [
            { t: 'p', v: "Une <b>lambda</b> est une fonction sans nom, ecrite directement la ou elle est utilisee. Les crochets <code>[]</code> au debut sont sa <b>capture</b> : ce qu'elle a le droit d'utiliser depuis le contexte autour d'elle." },
            { t: 'code', v: `auto carre = [](int x) {\n    return x * x;\n};\n\nint main() {\n    cout << carre(5) << endl;   // 25\n\n    int facteur = 10;\n    auto multiplie = [facteur](int x) {   // capture facteur par copie\n        return x * facteur;\n    };\n    cout << multiplie(3) << endl;   // 30\n    return 0;\n}` },
            {
              t: 'table', head: ['Capture', 'Sens'],
              rows: [['<code>[]</code>', 'ne capture rien de l\'exterieur'],
                     ['<code>[x]</code>', 'capture x par copie'],
                     ['<code>[&x]</code>', 'capture x par reference (le modifier affecte l\'original)'],
                     ['<code>[=]</code>', 'capture tout ce qui est utilise, par copie'],
                     ['<code>[&]</code>', 'capture tout ce qui est utilise, par reference']]
            },
            { t: 'key', h: 'A retenir', v: "[](parametres) { corps } est une lambda · les [] controlent ce qu'elle capture de son environnement." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Ecris une lambda <code>carre</code> (sans capture) qui prend un <code>int x</code> et renvoie <code>x * x</code>, stocke-la dans un <code>auto</code>, puis affiche <code>carre(6)</code>.",
              starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'auto carre = [](int x) { return x * x; }; cout << carre(6) << endl;',
              solution: `#include <iostream>\nusing namespace std;\n\nint main() {\n    auto carre = [](int x) {\n        return x * x;\n    };\n    cout << carre(6) << endl;\n    return 0;\n}`,
              must: [['auto\\s+carre\\s*=\\s*\\[\\s*\\]\\s*\\(\\s*int\\s+x\\s*\\)', 'Declare auto carre = [](int x) { ... }.'],
                     ['return\\s+x\\s*\\*\\s*x', 'La lambda doit renvoyer x * x.'],
                     ['carre\\s*\\(\\s*6\\s*\\)', 'Appelle carre(6).']]
            }
          ],
          quiz: [
            { q: 'Que fait la capture [&] dans une lambda ?', opts: ['Elle ne capture rien de l\'exterieur', 'Elle capture tout ce qui est utilise, par reference', 'Elle capture tout, par copie'], a: 1, why: "[&] capture par reference tout ce que la lambda utilise de son environnement ; [=] ferait la meme chose mais par copie." }
          ]
        },
        {
          id: 'elc-6-2', title: 'std::function : stocker un comportement', kind: 'lecon', xp: 55,
          goal: 'Utiliser std::function pour donner un type a une lambda et la passer comme une donnee.',
          blocks: [
            { t: 'p', v: "<code>std::function&lt;Retour(Arguments)&gt;</code> est un type qui peut contenir n'importe quelle fonction ou lambda ayant cette signature. Il permet de stocker un « comportement » dans une variable, un membre de classe, ou de le passer en parametre." },
            { t: 'code', v: `#include <functional>\n\nfunction<bool(int)> estPositif = [](int n) {\n    return n > 0;\n};\n\nint main() {\n    cout << estPositif(-3) << endl;   // 0 (false)\n    cout << estPositif(5) << endl;    // 1 (true)\n    return 0;\n}` },
            { t: 'key', h: 'A retenir', v: "function<bool(int)> declare un conteneur pour toute fonction prenant un int et renvoyant un bool · une lambda peut y etre affectee directement." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Declare <code>std::function&lt;bool(int)&gt; estPair</code>, affecte-lui une lambda qui renvoie <code>true</code> si <code>n % 2 == 0</code>, puis affiche <code>estPair(8)</code>.",
              starter: '#include <iostream>\n#include <functional>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'std::function<bool(int)> estPair = [](int n) { return n % 2 == 0; }; cout << estPair(8) << endl;',
              solution: `#include <iostream>\n#include <functional>\nusing namespace std;\n\nint main() {\n    std::function<bool(int)> estPair = [](int n) {\n        return n % 2 == 0;\n    };\n    cout << estPair(8) << endl;\n    return 0;\n}`,
              must: [['std::function<bool\\(int\\)>\\s+estPair', 'Declare std::function<bool(int)> estPair.'],
                     ['n\\s*%\\s*2\\s*==\\s*0', 'La lambda doit tester n % 2 == 0.'],
                     ['estPair\\s*\\(\\s*8\\s*\\)', 'Appelle estPair(8).']]
            }
          ],
          quiz: [
            { q: 'Que peut contenir une variable de type std::function<bool(int)> ?', opts: ['Seulement une fonction nommee', 'Une fonction ou une lambda ayant cette signature', 'Seulement un entier'], a: 1, why: "std::function accepte tout ce qui peut etre appele avec cette signature : fonction classique, lambda, objet fonction..." }
          ]
        },
        {
          id: 'elc-6-3', title: 'Épreuve VI — Filtrer avec des lambdas', kind: 'boss', xp: 95,
          goal: 'Utiliser un algorithme standard pilote par une lambda pour filtrer des donnees.',
          blocks: [{ t: 'p', v: "<code>copy_if</code> parcourt une source, teste chaque element avec la lambda fournie, et copie ceux qui passent le test vers une destination — ici construite au fur et a mesure avec <code>back_inserter</code>." }],
          ex: [
            {
              lang: 'cpp',
              brief: "Un <code>vector&lt;int&gt; nombres = {1, 2, 3, 4, 5, 6, 7, 8};</code> et un <code>vector&lt;int&gt; pairs;</code> vide sont donnes. Utilise <code>copy_if</code> avec une lambda testant <code>n % 2 == 0</code> pour remplir <code>pairs</code> avec <code>back_inserter(pairs)</code>, puis affiche chaque element de pairs.",
              starter: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <iterator>\nusing namespace std;\n\nint main() {\n    vector<int> nombres = {1, 2, 3, 4, 5, 6, 7, 8};\n    vector<int> pairs;\n    \n    return 0;\n}\n',
              hint: 'copy_if(nombres.begin(), nombres.end(), back_inserter(pairs), [](int n) { return n % 2 == 0; }); for (int p : pairs) { cout << p << endl; }',
              solution: `#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <iterator>\nusing namespace std;\n\nint main() {\n    vector<int> nombres = {1, 2, 3, 4, 5, 6, 7, 8};\n    vector<int> pairs;\n    copy_if(nombres.begin(), nombres.end(), back_inserter(pairs), [](int n) {\n        return n % 2 == 0;\n    });\n    for (int p : pairs) {\n        cout << p << endl;\n    }\n    return 0;\n}`,
              must: [['copy_if\\s*\\(\\s*nombres\\.begin\\s*\\(\\s*\\)\\s*,\\s*nombres\\.end\\s*\\(\\s*\\)\\s*,\\s*back_inserter\\s*\\(\\s*pairs\\s*\\)', 'Appelle copy_if(nombres.begin(), nombres.end(), back_inserter(pairs), ...).'],
                     ['\\[\\s*\\]\\s*\\(\\s*int\\s+\\w+\\s*\\)\\s*\\{[\\s\\S]*%\\s*2\\s*==\\s*0', 'La lambda de filtre doit tester % 2 == 0.'],
                     ['for\\s*\\(\\s*int\\s+\\w+\\s*:\\s*pairs\\s*\\)', 'Affiche pairs avec une boucle for-each.']],
              success: "Un algorithme standard, une lambda comme critere : le style dominant du C++ moderne pour traiter des collections."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 7 : ROBUSTESSE — EXCEPTIONS AVANCEES ============ */
    {
      n: 7, title: 'Robustesse : exceptions avancees', sub: 'Semaine 12',
      lessons: [
        {
          id: 'elc-7-1', title: 'Creer ses propres exceptions', kind: 'lecon', xp: 55,
          goal: 'Definir une exception personnalisee derivee de std::exception.',
          blocks: [
            { t: 'p', v: "Plutot que de lancer un simple texte, une exception professionnelle est une <b>classe</b> derivee de <code>std::exception</code>, qui redefinit <code>what()</code> pour fournir un message explicite au code qui l'attrape." },
            { t: 'code', v: `#include <exception>\n\nclass ErreurValidation : public std::exception {\npublic:\n    const char* what() const noexcept override {\n        return "valeur invalide";\n    }\n};` },
            { t: 'warn', h: 'noexcept override, mot pour mot', v: "La signature de <code>what()</code> dans <code>std::exception</code> est exactement <code>const char* what() const noexcept</code>. La redefinir avec une signature legerement differente est une erreur classique — <code>override</code> force le compilateur a le verifier." },
            { t: 'key', h: 'A retenir', v: "class MonErreur : public std::exception { ... } · const char* what() const noexcept override renvoie le message d'erreur." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Cree une classe <code>SoldeInsuffisant</code> derivee de <code>std::exception</code>, avec <code>what()</code> qui renvoie <code>\"solde insuffisant\"</code>.",
              starter: '#include <iostream>\n#include <exception>\nusing namespace std;\n\n\n\nint main() {\n    SoldeInsuffisant e;\n    cout << e.what() << endl;\n    return 0;\n}\n',
              hint: 'class SoldeInsuffisant : public std::exception { public: const char* what() const noexcept override { return "solde insuffisant"; } };',
              solution: `#include <iostream>\n#include <exception>\nusing namespace std;\n\nclass SoldeInsuffisant : public std::exception {\npublic:\n    const char* what() const noexcept override {\n        return "solde insuffisant";\n    }\n};\n\nint main() {\n    SoldeInsuffisant e;\n    cout << e.what() << endl;\n    return 0;\n}`,
              must: [['class\\s+SoldeInsuffisant\\s*:\\s*public\\s+std::exception', 'Declare class SoldeInsuffisant : public std::exception.'],
                     ['const\\s+char\\s*\\*\\s*what\\s*\\(\\s*\\)\\s*const\\s+noexcept\\s+override', 'Redefinis const char* what() const noexcept override.'],
                     ['"solde insuffisant"', 'what() doit renvoyer "solde insuffisant".']]
            }
          ],
          quiz: [
            { q: 'Que doit renvoyer what() sur une exception personnalisee ?', opts: ['Un int', 'Un message d\'erreur (const char*)', 'Rien, what() est facultatif'], a: 1, why: "what() renvoie un const char* decrivant l'erreur, lu par tout code qui attrape l'exception." }
          ]
        },
        {
          id: 'elc-7-2', title: 'Lancer et propager une exception', kind: 'lecon', xp: 55,
          goal: 'Utiliser throw pour signaler une erreur, et comprendre pourquoi RAII protege la coherence des objets.',
          blocks: [
            { t: 'p', v: "<code>throw</code> interrompt immediatement la fonction courante et remonte la pile d'appels jusqu'a trouver un <code>catch</code> compatible. Pendant cette remontee (le « deroulement de pile »), les destructeurs des objets locaux s'executent quand meme — c'est pour ca que RAII (module 3) protege meme en cas d'erreur." },
            { t: 'code', v: `void retirer(int montant, int solde) {\n    if (montant > solde) {\n        throw SoldeInsuffisant();\n    }\n    cout << "retrait de " << montant << endl;\n}` },
            { t: 'key', h: 'A retenir', v: "throw MonException(); leve l\'exception · la pile se deroule jusqu\'au catch, en executant au passage tous les destructeurs des objets locaux." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "La classe <code>SoldeInsuffisant</code> existe deja. Ecris <code>void retirer(int montant, int solde)</code> qui lance <code>SoldeInsuffisant()</code> si <code>montant &gt; solde</code>, sinon affiche <code>retrait effectue</code>.",
              starter: '#include <iostream>\n#include <exception>\nusing namespace std;\n\nclass SoldeInsuffisant : public std::exception {\npublic:\n    const char* what() const noexcept override {\n        return "solde insuffisant";\n    }\n};\n\n\n\nint main() {\n    retirer(50, 100);\n    return 0;\n}\n',
              hint: 'void retirer(int montant, int solde) { if (montant > solde) { throw SoldeInsuffisant(); } cout << "retrait effectue" << endl; }',
              solution: `#include <iostream>\n#include <exception>\nusing namespace std;\n\nclass SoldeInsuffisant : public std::exception {\npublic:\n    const char* what() const noexcept override {\n        return "solde insuffisant";\n    }\n};\n\nvoid retirer(int montant, int solde) {\n    if (montant > solde) {\n        throw SoldeInsuffisant();\n    }\n    cout << "retrait effectue" << endl;\n}\n\nint main() {\n    retirer(50, 100);\n    return 0;\n}`,
              must: [['void\\s+retirer\\s*\\(\\s*int\\s+montant\\s*,\\s*int\\s+solde\\s*\\)', 'Declare void retirer(int montant, int solde).'],
                     ['if\\s*\\(\\s*montant\\s*>\\s*solde\\s*\\)', 'Teste if (montant > solde).'],
                     ['throw\\s+SoldeInsuffisant\\s*\\(\\s*\\)', 'Leve throw SoldeInsuffisant();.']]
            }
          ],
          quiz: [
            { q: 'Que se passe-t-il pour les objets locaux pendant qu\'une exception remonte la pile ?', opts: ['Ils restent inchanges jusqu\'a la fin du programme', 'Leurs destructeurs s\'executent normalement', 'Le programme plante immediatement'], a: 1, why: "Le deroulement de pile execute les destructeurs de tous les objets locaux traverses, comme pour une sortie de portee normale." }
          ]
        },
        {
          id: 'elc-7-3', title: 'Épreuve VII — Une transaction sure', kind: 'boss', xp: 95,
          goal: 'Ecrire le code appelant qui attrape et gere l\'exception proprement.',
          blocks: [{ t: 'p', v: "Un <code>try/catch</code> autour d'un appel qui peut echouer permet de reagir a l'erreur sans que le programme entier ne s'arrete brutalement." }],
          ex: [
            {
              lang: 'cpp',
              brief: "<code>SoldeInsuffisant</code> et <code>retirer()</code> existent deja. Dans <code>main</code>, entoure l'appel <code>retirer(500, 100);</code> d'un <code>try { ... } catch (SoldeInsuffisant &amp;e) { ... }</code> qui affiche <code>e.what()</code> en cas d'echec.",
              starter: '#include <iostream>\n#include <exception>\nusing namespace std;\n\nclass SoldeInsuffisant : public std::exception {\npublic:\n    const char* what() const noexcept override {\n        return "solde insuffisant";\n    }\n};\n\nvoid retirer(int montant, int solde) {\n    if (montant > solde) {\n        throw SoldeInsuffisant();\n    }\n    cout << "retrait effectue" << endl;\n}\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'try { retirer(500, 100); } catch (SoldeInsuffisant &e) { cout << e.what() << endl; }',
              solution: `#include <iostream>\n#include <exception>\nusing namespace std;\n\nclass SoldeInsuffisant : public std::exception {\npublic:\n    const char* what() const noexcept override {\n        return "solde insuffisant";\n    }\n};\n\nvoid retirer(int montant, int solde) {\n    if (montant > solde) {\n        throw SoldeInsuffisant();\n    }\n    cout << "retrait effectue" << endl;\n}\n\nint main() {\n    try {\n        retirer(500, 100);\n    } catch (SoldeInsuffisant &e) {\n        cout << e.what() << endl;\n    }\n    return 0;\n}`,
              must: [['try\\s*\\{', 'Ouvre un bloc try {.'],
                     ['catch\\s*\\(\\s*SoldeInsuffisant\\s*&\\s*e\\s*\\)', 'Attrape avec catch (SoldeInsuffisant &e).'],
                     ['e\\.what\\s*\\(\\s*\\)', 'Affiche e.what() dans le catch.']],
              success: "L'erreur est geree, pas subie : le programme continue proprement au lieu de s'arreter brutalement."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 8 : CONCURRENCE ============ */
    {
      n: 8, title: 'Concurrence : les threads', sub: 'Semaine 13-14',
      lessons: [
        {
          id: 'elc-8-1', title: 'std::thread : lancer du code en parallele', kind: 'lecon', xp: 60,
          goal: 'Lancer une fonction dans un thread separe, et attendre sa fin avec join().',
          blocks: [
            { t: 'p', v: "Un <b>thread</b> est une ligne d'execution independante : le programme principal et le thread avancent en meme temps (ou en alternance rapide, selon le materiel). <code>std::thread</code> encapsule cette idee." },
            { t: 'code', v: `#include <thread>\n\nvoid saluer() {\n    cout << "bonjour depuis le thread" << endl;\n}\n\nint main() {\n    thread t(saluer);\n    t.join();   // attend que le thread se termine\n    cout << "fin du programme principal" << endl;\n    return 0;\n}` },
            { t: 'warn', h: 'join() est obligatoire', v: "Un <code>thread</code> qu'on ne rejoint jamais (ni avec <code>join()</code>, ni avec <code>detach()</code>) provoque un plantage du programme a sa destruction. C'est l'erreur numero un des debutants en concurrence." },
            { t: 'key', h: 'A retenir', v: "thread t(fonction); lance fonction en parallele · t.join(); attend sa fin avant de continuer." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "La fonction <code>saluer()</code> existe deja. Lance-la dans un <code>std::thread</code> nomme <code>t</code>, puis attends sa fin avec <code>t.join()</code>.",
              starter: '#include <iostream>\n#include <thread>\nusing namespace std;\n\nvoid saluer() {\n    cout << "bonjour depuis le thread" << endl;\n}\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'thread t(saluer); t.join();',
              solution: `#include <iostream>\n#include <thread>\nusing namespace std;\n\nvoid saluer() {\n    cout << "bonjour depuis le thread" << endl;\n}\n\nint main() {\n    thread t(saluer);\n    t.join();\n    return 0;\n}`,
              must: [['thread\\s+t\\s*\\(\\s*saluer\\s*\\)', 'Cree thread t(saluer);.'],
                     ['t\\.join\\s*\\(\\s*\\)', 'Attends la fin avec t.join();.']]
            }
          ],
          quiz: [
            { q: 'Que se passe-t-il si on ne rejoint (join) et ne detache (detach) jamais un thread lance ?', opts: ['Rien, C++ le gere automatiquement', 'Le programme plante a la destruction du thread', 'Le thread continue indefiniment sans probleme'], a: 1, why: "Un thread ni rejoint ni detache provoque un arret brutal du programme au moment de sa destruction." }
          ]
        },
        {
          id: 'elc-8-2', title: 'Race conditions et std::mutex', kind: 'lecon', xp: 60,
          goal: 'Comprendre pourquoi deux threads qui modifient la meme donnee peuvent la corrompre, et proteger l\'acces avec un mutex.',
          blocks: [
            { t: 'p', v: "Quand deux threads lisent et modifient la meme variable en meme temps, le resultat final depend de l'ordre exact d'execution — imprevisible et non reproductible. C'est une <b>race condition</b>. Un <code>mutex</code> (mutual exclusion) garantit qu'un seul thread a la fois execute la section protegee." },
            { t: 'code', v: `#include <mutex>\n\nmutex verrou;\nint compteur = 0;\n\nvoid incrementer() {\n    lock_guard<mutex> garde(verrou);\n    compteur++;\n}   // le verrou est libere automatiquement ici (encore du RAII)` },
            { t: 'analogy', v: "<b>L'image a retenir :</b> un mutex est la cle unique d'une salle de bain a une seule porte. Un seul thread entre a la fois ; les autres attendent leur tour devant la porte." },
            { t: 'key', h: 'A retenir', v: "mutex verrou; declare le verrou · lock_guard<mutex> garde(verrou); le prend, et le libere automatiquement (RAII) a la fin du bloc." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Un <code>mutex verrou</code> global existe deja. Protege la fonction <code>incrementer()</code> avec un <code>lock_guard&lt;mutex&gt;</code> avant d'incrementer <code>compteur</code>.",
              starter: '#include <iostream>\n#include <mutex>\nusing namespace std;\n\nmutex verrou;\nint compteur = 0;\n\nvoid incrementer() {\n    \n    compteur++;\n}\n\nint main() {\n    incrementer();\n    cout << compteur << endl;\n    return 0;\n}\n',
              hint: 'lock_guard<mutex> garde(verrou);',
              solution: `#include <iostream>\n#include <mutex>\nusing namespace std;\n\nmutex verrou;\nint compteur = 0;\n\nvoid incrementer() {\n    lock_guard<mutex> garde(verrou);\n    compteur++;\n}\n\nint main() {\n    incrementer();\n    cout << compteur << endl;\n    return 0;\n}`,
              must: [['lock_guard<mutex>\\s+garde\\s*\\(\\s*verrou\\s*\\)', 'Protege avec lock_guard<mutex> garde(verrou);.']]
            }
          ],
          quiz: [
            { q: 'A quel moment lock_guard libere-t-il le mutex qu\'il detient ?', opts: ['Il faut l\'appeler manuellement', 'Automatiquement, a la fin du bloc ou il a ete cree', 'Jamais, il faut redemarrer le programme'], a: 1, why: "lock_guard applique RAII au verrouillage : le mutex est libere automatiquement quand le lock_guard sort de portee." }
          ]
        },
        {
          id: 'elc-8-3', title: 'Épreuve VIII — Un compteur thread-safe', kind: 'boss', xp: 100,
          goal: 'Combiner thread et mutex pour incrementer un compteur partage depuis plusieurs threads sans le corrompre.',
          blocks: [{ t: 'p', v: "Lancer plusieurs threads qui appellent tous la meme fonction protegee par mutex : c'est le motif exact utilise par les serveurs qui traitent des requetes en parallele sur des donnees partagees." }],
          ex: [
            {
              lang: 'cpp',
              brief: "<code>incrementer()</code> (protegee par mutex) existe deja. Cree deux <code>thread</code>, <code>t1</code> et <code>t2</code>, qui appellent tous les deux <code>incrementer</code>, attends leur fin avec <code>join()</code> sur chacun, puis affiche <code>compteur</code>.",
              starter: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex verrou;\nint compteur = 0;\n\nvoid incrementer() {\n    lock_guard<mutex> garde(verrou);\n    compteur++;\n}\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'thread t1(incrementer); thread t2(incrementer); t1.join(); t2.join(); cout << compteur << endl;',
              solution: `#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex verrou;\nint compteur = 0;\n\nvoid incrementer() {\n    lock_guard<mutex> garde(verrou);\n    compteur++;\n}\n\nint main() {\n    thread t1(incrementer);\n    thread t2(incrementer);\n    t1.join();\n    t2.join();\n    cout << compteur << endl;\n    return 0;\n}`,
              must: [['thread\\s+t1\\s*\\(\\s*incrementer\\s*\\)', 'Cree thread t1(incrementer);.'],
                     ['thread\\s+t2\\s*\\(\\s*incrementer\\s*\\)', 'Cree thread t2(incrementer);.'],
                     ['t1\\.join\\s*\\(\\s*\\)', 'Attends t1 avec t1.join();.'],
                     ['t2\\.join\\s*\\(\\s*\\)', 'Attends t2 avec t2.join();.']],
              success: "Deux threads, un compteur, zero corruption : le mutex a fait exactement son travail."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 9 : EPREUVE FINALE ============ */
    {
      n: 9, title: 'Épreuve finale', sub: 'Semaine 15 — tout assembler',
      lessons: [
        {
          id: 'elc-9-1', title: 'Combiner templates et pointeurs intelligents', kind: 'lecon', xp: 60,
          goal: 'Ecrire une classe generique qui gere elle-meme la duree de vie de ses objets.',
          blocks: [
            { t: 'p', v: "Un conteneur generique qui possede des objets polymorphes combine trois notions de ce parcours : le <b>template</b> (module 1) pour accepter n'importe quel type de base, le <b>unique_ptr</b> (module 3) pour la gestion automatique de la memoire, et le <b>polymorphisme</b> (module 5) pour traiter des objets de types derives differents de facon uniforme." },
            { t: 'code', v: `template<typename T>\nclass Conteneur {\nprivate:\n    vector<unique_ptr<T>> objets;\npublic:\n    void ajouter(unique_ptr<T> obj) {\n        objets.push_back(std::move(obj));\n    }\n    size_t taille() const {\n        return objets.size();\n    }\n};` },
            { t: 'key', h: 'A retenir', v: "Un conteneur template de unique_ptr<T> : generique dans son type, automatique dans sa gestion memoire, pret pour le polymorphisme si T est une classe de base." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Complete la classe template <code>Boite&lt;T&gt;</code> : un <code>vector&lt;unique_ptr&lt;T&gt;&gt; objets</code> prive, une methode <code>ajouter(unique_ptr&lt;T&gt; obj)</code> qui l'ajoute via <code>std::move</code>, et <code>taille()</code> qui renvoie le nombre d'objets.",
              starter: '#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\ntemplate<typename T>\nclass Boite {\nprivate:\n    \npublic:\n    \n};\n\nint main() {\n    Boite<int> b;\n    b.ajouter(make_unique<int>(42));\n    cout << b.taille() << endl;\n    return 0;\n}\n',
              hint: 'vector<unique_ptr<T>> objets; void ajouter(unique_ptr<T> obj) { objets.push_back(std::move(obj)); } size_t taille() const { return objets.size(); }',
              solution: `#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\ntemplate<typename T>\nclass Boite {\nprivate:\n    vector<unique_ptr<T>> objets;\npublic:\n    void ajouter(unique_ptr<T> obj) {\n        objets.push_back(std::move(obj));\n    }\n    size_t taille() const {\n        return objets.size();\n    }\n};\n\nint main() {\n    Boite<int> b;\n    b.ajouter(make_unique<int>(42));\n    cout << b.taille() << endl;\n    return 0;\n}`,
              must: [['template\\s*<\\s*typename\\s+T\\s*>', 'Garde template<typename T> devant la classe.'],
                     ['vector<unique_ptr<T>>\\s+objets', 'Declare vector<unique_ptr<T>> objets;.'],
                     ['void\\s+ajouter\\s*\\(\\s*unique_ptr<T>\\s+obj\\s*\\)', 'Declare void ajouter(unique_ptr<T> obj).'],
                     ['objets\\.push_back\\s*\\(\\s*std::move\\s*\\(\\s*obj\\s*\\)\\s*\\)', 'ajouter doit faire objets.push_back(std::move(obj));.'],
                     ['size_t\\s+taille\\s*\\(\\s*\\)\\s*const', 'Ajoute size_t taille() const.']]
            }
          ],
          quiz: [
            { q: 'Pourquoi utiliser vector<unique_ptr<T>> plutot que vector<T> directement ?', opts: ['C\'est plus rapide a ecrire', 'Pour posseder des objets polymorphes (types derives de T) via une interface commune', 'vector<T> n\'existe pas en C++'], a: 1, why: "vector<T> stocke des T par valeur (pas de polymorphisme) ; vector<unique_ptr<T>> peut stocker des objets de classes derivees de T, geres automatiquement." }
          ]
        },
        {
          id: 'elc-9-2', title: 'Épreuve finale — Le trone de l\'Olympe', kind: 'boss', xp: 150,
          goal: 'Assembler smart pointers, polymorphisme et STL dans un seul systeme coherent.',
          blocks: [
            { t: 'p', v: "Dernier defi du parcours : un <b>registre</b> qui possede une collection de formes polymorphes via <code>unique_ptr</code>, et qui sait calculer une statistique globale en parcourant tous ses objets par leur interface commune — exactement le genre de code qu'on trouve dans un vrai moteur de rendu ou un vrai moteur physique." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "<code>Forme</code> et <code>Cercle</code> sont deja definies. Complete la classe <code>Registre</code> : un <code>vector&lt;unique_ptr&lt;Forme&gt;&gt; formes</code> prive, une methode <code>ajouter(unique_ptr&lt;Forme&gt; forme)</code> qui l'ajoute via <code>std::move</code>, et une methode <code>aireTotale() const</code> qui additionne <code>aire()</code> de toutes les formes stockees (boucle for-each, accumulateur <code>double total = 0;</code>).",
              starter: '#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Forme {\npublic:\n    virtual double aire() const = 0;\n    virtual ~Forme() {}\n};\n\nclass Cercle : public Forme {\nprivate:\n    double rayon;\npublic:\n    Cercle(double r) : rayon(r) {}\n    double aire() const override {\n        return 3.14159 * rayon * rayon;\n    }\n};\n\nclass Registre {\nprivate:\n    \npublic:\n    \n};\n\nint main() {\n    Registre r;\n    r.ajouter(make_unique<Cercle>(2.0));\n    r.ajouter(make_unique<Cercle>(3.0));\n    cout << r.aireTotale() << endl;\n    return 0;\n}\n',
              hint: 'vector<unique_ptr<Forme>> formes; void ajouter(unique_ptr<Forme> forme) { formes.push_back(std::move(forme)); } double aireTotale() const { double total = 0; for (const auto &f : formes) { total += f->aire(); } return total; }',
              solution: `#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Forme {\npublic:\n    virtual double aire() const = 0;\n    virtual ~Forme() {}\n};\n\nclass Cercle : public Forme {\nprivate:\n    double rayon;\npublic:\n    Cercle(double r) : rayon(r) {}\n    double aire() const override {\n        return 3.14159 * rayon * rayon;\n    }\n};\n\nclass Registre {\nprivate:\n    vector<unique_ptr<Forme>> formes;\npublic:\n    void ajouter(unique_ptr<Forme> forme) {\n        formes.push_back(std::move(forme));\n    }\n    double aireTotale() const {\n        double total = 0;\n        for (const auto &f : formes) {\n            total += f->aire();\n        }\n        return total;\n    }\n};\n\nint main() {\n    Registre r;\n    r.ajouter(make_unique<Cercle>(2.0));\n    r.ajouter(make_unique<Cercle>(3.0));\n    cout << r.aireTotale() << endl;\n    return 0;\n}`,
              must: [['vector<unique_ptr<Forme>>\\s+formes', 'Declare vector<unique_ptr<Forme>> formes;.'],
                     ['void\\s+ajouter\\s*\\(\\s*unique_ptr<Forme>\\s+forme\\s*\\)', 'Declare void ajouter(unique_ptr<Forme> forme).'],
                     ['formes\\.push_back\\s*\\(\\s*std::move\\s*\\(\\s*forme\\s*\\)\\s*\\)', 'ajouter doit faire formes.push_back(std::move(forme));.'],
                     ['double\\s+aireTotale\\s*\\(\\s*\\)\\s*const', 'Declare double aireTotale() const.'],
                     ['total\\s*\\+=\\s*\\w+->aire\\s*\\(\\s*\\)', 'Accumule avec total += f->aire();.']],
              success: "PARCOURS ELITE TERMINE. Templates, memoire moderne, semantique de deplacement, polymorphisme, lambdas, exceptions, concurrence — le C++ que peu de developpeurs maitrisent vraiment est desormais le tien."
            }
          ]
        }
      ]
    }
  ]
};
