/* ARES ULTRA — « C, C++, C# » : le trio qui fait tourner les systemes.
   Fait partie du bundle PRO normal (la cle "all" l'ouvre), possede aussi sa
   propre cle dediee. Aucun compilateur n'existe dans un site statique : la
   correction verifie la structure du code ecrit (comme HTML/CSS), pas son
   execution reelle — voir Runner.checkPattern dans src/60-runners.js.       */
var PATH_PRO_CFAMILY = {
  id: 'pro-cfamily', lang: 'c', name: 'C / C++ / C#', glyph: 'le trio des systemes',
  tag: 'ULTRA · 9 modules', color: '#8C9EFF', pro: true,
  title: 'C, C++ et C#',
  blurb: "Trois langages, un seul parcours : celui qui fait tourner un systeme d'exploitation (C), un moteur de jeu (C++), et la moitie des logiciels d'entreprise (C#). Environ trois mois pour les trois.",
  chips: ['9 modules', 'Le trio des systemes', 'Environ 3 mois'],
  promise: "Le C t'apprend a penser comme la machine : memoire, pointeurs, rien de cache. Le C++ ajoute les objets sans rien retirer. Le C# garde les objets et retire la gestion manuelle de la memoire. Les trois ensemble, c'est comprendre tout le spectre entre le materiel et l'entreprise.",
  days: [

    /* ============ MODULE 1 : C — LES BASES ============ */
    {
      n: 1, title: 'C — Les bases', sub: 'Semaine 1-2 — le langage qui ne cache rien',
      lessons: [
        {
          id: 'cf-1-1', title: 'Ton premier programme C', kind: 'lecon', xp: 40,
          goal: 'Comprendre la structure minimale obligatoire de tout programme C.',
          blocks: [
            { t: 'p', v: "Le C est le langage sous tous les autres : Python, le noyau Windows/Linux, et une bonne partie des objets connectes sont ecrits en C ou s'appuient dessus. Contrairement a Python, un programme C doit etre <b>compile</b> avant de tourner — dans cette forge, sans compilateur disponible, tu ecris et on verifie la structure de ton code, pas son execution." },
            { t: 'code', v: `#include <stdio.h>\n\nint main() {\n    printf("Bonjour la forge !\\n");\n    return 0;\n}` },
            {
              t: 'table', head: ['Ligne', 'Role'],
              rows: [['<code>#include &lt;stdio.h&gt;</code>', "importe les outils d'entree/sortie (printf, scanf)"],
                     ['<code>int main() { }</code>', 'le point de depart obligatoire de tout programme C'],
                     ['<code>printf("...")</code>', 'affiche du texte (le print de Python)'],
                     ['<code>return 0;</code>', "signale a l'OS que le programme s'est bien termine"]]
            },
            { t: 'warn', h: "Le point-virgule est obligatoire", v: "Contrairement a Python, chaque instruction C se termine par <code>;</code>. L'oublier est l'erreur numero un des debutants — et elle bloque toute la compilation." },
            { t: 'key', h: 'A retenir', v: "#include importe des outils · int main() est le point de depart · printf affiche · chaque instruction finit par ;." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Ecris un programme C complet et valide qui affiche <code>Salut le monde</code> avec printf.",
              starter: '#include <stdio.h>\n\nint main() {\n    \n}\n',
              hint: 'printf("Salut le monde\\n"); puis return 0;',
              solution: `#include <stdio.h>\n\nint main() {\n    printf("Salut le monde\\n");\n    return 0;\n}`,
              must: [['#include\\s*<stdio\\.h>', 'Il faut #include <stdio.h> pour utiliser printf.'],
                     ['int\\s+main\\s*\\(', 'Il faut une fonction int main().'],
                     ['printf\\s*\\(\\s*"Salut le monde', 'Utilise printf pour afficher exactement "Salut le monde".'],
                     ['return\\s+0\\s*;', 'Termine main() par return 0;.']],
              success: "Ton premier programme C est structurellement complet."
            }
          ],
          quiz: [
            { q: 'Par quelle fonction commence obligatoirement un programme C ?', opts: ['start()', 'main()', 'run()'], a: 1, why: "main() est le point d'entree impose par le langage C." },
            { q: 'Que se passe-t-il si on oublie un point-virgule ?', opts: ['Rien, il est optionnel', 'Le programme ne compile pas', 'Une ligne vide s\'affiche'], a: 1, why: "En C, l'absence de point-virgule est une erreur de syntaxe qui bloque la compilation." }
          ]
        },
        {
          id: 'cf-1-2', title: 'Les types et les variables', kind: 'lecon', xp: 45,
          goal: "Declarer des variables typees, et afficher plusieurs valeurs avec printf.",
          blocks: [
            { t: 'p', v: "En C, chaque variable doit annoncer son type des sa creation : <code>int</code> (entier), <code>float</code> ou <code>double</code> (decimal), <code>char</code> (un seul caractere). Contrairement a Python, le type ne change jamais ensuite." },
            { t: 'code', v: `int age = 14;\nfloat taille = 1.62;\nchar lettre = 'A';\n\nprintf("J'ai %d ans et je mesure %.2f m\\n", age, taille);` },
            { t: 'p', v: "<code>printf</code> utilise des <b>specificateurs de format</b> : <code>%d</code> pour un entier, <code>%f</code> pour un decimal, <code>%c</code> pour un caractere, <code>%s</code> pour du texte. Chaque <code>%</code> correspond a une valeur listee apres la chaine, dans l'ordre." },
            { t: 'key', h: 'A retenir', v: "int/float/double/char annoncent le type · %d, %f, %c, %s dans printf correspondent aux valeurs listees ensuite, dans l'ordre." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Declare un entier <code>score</code> valant 42 et un decimal <code>moyenne</code> valant 15.5, puis affiche-les avec printf sous la forme <code>Score : 42, moyenne : 15.50</code>.",
              starter: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'int score = 42; float moyenne = 15.5; printf("Score : %d, moyenne : %.2f\\n", score, moyenne);',
              solution: `#include <stdio.h>\n\nint main() {\n    int score = 42;\n    float moyenne = 15.5;\n    printf("Score : %d, moyenne : %.2f\\n", score, moyenne);\n    return 0;\n}`,
              must: [['int\\s+score\\s*=\\s*42', 'Declare int score = 42;.'],
                     ['float\\s+moyenne\\s*=\\s*15\\.5', 'Declare float moyenne = 15.5;.'],
                     ['%d[\\s\\S]*%\\.2f|%\\.2f[\\s\\S]*%d', "Utilise %d et %.2f dans le printf."]]
            }
          ],
          quiz: [
            { q: "Quel specificateur affiche un entier avec printf ?", opts: ['%s', '%d', '%c'], a: 1, why: '%d designe un entier (decimal).' }
          ]
        },
        {
          id: 'cf-1-3', title: 'Lire une entree avec scanf', kind: 'lecon', xp: 45,
          goal: "Comprendre pourquoi scanf a besoin de l'adresse d'une variable (&).",
          blocks: [
            { t: 'p', v: "<code>scanf</code> lit une entree clavier et la stocke dans une variable — mais il a besoin de savoir <b>ou</b> ranger la valeur en memoire, pas juste son nom. C'est pour ca qu'on lui donne l'<b>adresse</b> de la variable avec <code>&</code>." },
            { t: 'code', v: `int age;\nprintf("Ton age : ");\nscanf("%d", &age);\nprintf("Tu as %d ans\\n", age);` },
            { t: 'warn', h: "L'esperluette est obligatoire pour scanf", v: "Oublier le <code>&</code> devant <code>age</code> est l'un des bugs les plus frequents et les plus deroutants du C debutant : le programme compile parfois quand meme, mais se comporte n'importe comment." },
            { t: 'key', h: 'A retenir', v: "scanf(\"%d\", &variable) lit un entier · le & donne l'adresse memoire, indispensable pour que scanf sache ou ecrire." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Declare un <code>int note</code>, lis-le avec scanf, puis affiche <code>Ta note : X</code>.",
              starter: '#include <stdio.h>\n\nint main() {\n    int note;\n    \n    return 0;\n}\n',
              hint: 'scanf("%d", &note); puis printf("Ta note : %d\\n", note);',
              solution: `#include <stdio.h>\n\nint main() {\n    int note;\n    scanf("%d", &note);\n    printf("Ta note : %d\\n", note);\n    return 0;\n}`,
              must: [['scanf\\s*\\(\\s*"%d"\\s*,\\s*&note\\s*\\)', 'Utilise scanf("%d", &note); avec le & obligatoire.'],
                     ['printf[\\s\\S]*%d[\\s\\S]*note', 'Affiche la note avec printf et %d.']]
            }
          ]
        },
        {
          id: 'cf-1-4', title: 'Épreuve I — La fiche complete', kind: 'boss', xp: 70,
          goal: 'Combiner variables, types multiples et printf dans un vrai petit programme.',
          blocks: [{ t: 'p', v: "Un condense du module : plusieurs types, plusieurs formats, une seule sortie propre." }],
          ex: [
            {
              lang: 'c',
              brief: "Declare <code>char initiale</code> valant 'N', <code>int niveau</code> valant 7, <code>float experience</code> valant 82.5, puis affiche <code>Joueur N, niveau 7, experience 82.50%</code> avec un seul printf.",
              starter: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}\n',
              hint: "char initiale = 'N'; int niveau = 7; float experience = 82.5; printf(\"Joueur %c, niveau %d, experience %.2f%%\\n\", initiale, niveau, experience);",
              solution: `#include <stdio.h>\n\nint main() {\n    char initiale = 'N';\n    int niveau = 7;\n    float experience = 82.5;\n    printf("Joueur %c, niveau %d, experience %.2f%%\\n", initiale, niveau, experience);\n    return 0;\n}`,
              must: [["char\\s+initiale\\s*=\\s*'N'", "Declare char initiale = 'N';."],
                     ['int\\s+niveau\\s*=\\s*7', 'Declare int niveau = 7;.'],
                     ['float\\s+experience\\s*=\\s*82\\.5', 'Declare float experience = 82.5;.'],
                     ['%c[\\s\\S]*%d[\\s\\S]*%\\.2f', 'Le printf doit utiliser %c, %d puis %.2f, dans cet ordre.']],
              success: "Trois types differents, un seul printf : la base du C est acquise."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 2 : C — CONDITIONS ET BOUCLES ============ */
    {
      n: 2, title: 'C — Conditions et boucles', sub: 'Semaine 3',
      lessons: [
        {
          id: 'cf-2-1', title: 'if / else en C', kind: 'lecon', xp: 45,
          goal: 'Ecrire des conditions avec la syntaxe a accolades du C.',
          blocks: [
            { t: 'p', v: "La logique est identique a Python, la syntaxe change : parentheses autour de la condition, accolades autour du bloc, pas de deux-points." },
            { t: 'code', v: `int age = 15;\n\nif (age >= 18) {\n    printf("Majeur\\n");\n} else {\n    printf("Mineur\\n");\n}` },
            { t: 'key', h: 'A retenir', v: "if (condition) { ... } else { ... } · == compare, = affecte, comme en JavaScript." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Avec <code>int note = 8;</code>, affiche <code>Admis</code> si note >= 10, sinon <code>Recale</code>.",
              starter: '#include <stdio.h>\n\nint main() {\n    int note = 8;\n    \n    return 0;\n}\n',
              hint: 'if (note >= 10) { printf("Admis\\n"); } else { printf("Recale\\n"); }',
              solution: `#include <stdio.h>\n\nint main() {\n    int note = 8;\n    if (note >= 10) {\n        printf("Admis\\n");\n    } else {\n        printf("Recale\\n");\n    }\n    return 0;\n}`,
              must: [['if\\s*\\(\\s*note\\s*>=\\s*10\\s*\\)', 'Utilise if (note >= 10).'], ['else', 'Ajoute un else.']]
            }
          ]
        },
        {
          id: 'cf-2-2', title: 'for et while', kind: 'lecon', xp: 50,
          goal: 'Ecrire des boucles for et while en C, presque identiques a celles de JavaScript.',
          blocks: [
            { t: 'p', v: "La boucle <code>for</code> du C a directement inspire celle de JavaScript : meme structure en trois parties." },
            { t: 'code', v: `for (int i = 0; i < 5; i++) {\n    printf("%d\\n", i);\n}\n\nint n = 3;\nwhile (n > 0) {\n    printf("%d\\n", n);\n    n--;\n}` },
            { t: 'key', h: 'A retenir', v: "for (depart; condition; increment) { ... } · while (condition) { ... }, identiques a JavaScript." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Affiche les nombres de 1 a 5 avec une boucle for (cinq printf, un par ligne).",
              starter: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'for (int i = 1; i <= 5; i++) { printf("%d\\n", i); }',
              solution: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
              must: [['for\\s*\\(\\s*int\\s+i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*5\\s*;\\s*i\\+\\+\\s*\\)', 'Utilise for (int i = 1; i <= 5; i++).']]
            }
          ]
        },
        {
          id: 'cf-2-3', title: 'Épreuve II — FizzBuzz en C', kind: 'boss', xp: 70,
          goal: 'Le classique FizzBuzz, cette fois avec la syntaxe C.',
          blocks: [{ t: 'p', v: "Meme algorithme que dans le parcours Python, traduit fidelement en C." }],
          ex: [
            {
              lang: 'c',
              brief: "Affiche FizzBuzz de 1 a 15 : Fizz si multiple de 3, Buzz si multiple de 5, FizzBuzz si les deux, sinon le nombre.",
              starter: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 15; i++) {\n        \n    }\n    return 0;\n}\n',
              hint: 'if (i % 15 == 0) { printf("FizzBuzz\\n"); } else if (i % 3 == 0) { printf("Fizz\\n"); } else if (i % 5 == 0) { printf("Buzz\\n"); } else { printf("%d\\n", i); }',
              solution: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 15; i++) {\n        if (i % 15 == 0) {\n            printf("FizzBuzz\\n");\n        } else if (i % 3 == 0) {\n            printf("Fizz\\n");\n        } else if (i % 5 == 0) {\n            printf("Buzz\\n");\n        } else {\n            printf("%d\\n", i);\n        }\n    }\n    return 0;\n}`,
              must: [['i\\s*%\\s*15\\s*==\\s*0', 'Teste le multiple de 15 en premier.'],
                     ['i\\s*%\\s*3\\s*==\\s*0', 'Teste le multiple de 3.'],
                     ['i\\s*%\\s*5\\s*==\\s*0', 'Teste le multiple de 5.']],
              success: "FizzBuzz en C : la meme logique, un accent syntaxique different."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 3 : C — FONCTIONS ET POINTEURS ============ */
    {
      n: 3, title: 'C — Fonctions et pointeurs', sub: 'Semaine 4-5 — le cœur du langage',
      lessons: [
        {
          id: 'cf-3-1', title: 'Declarer et utiliser une fonction', kind: 'lecon', xp: 50,
          goal: "Ecrire une fonction C avec un type de retour explicite.",
          blocks: [
            { t: 'p', v: "Une fonction C annonce le type de sa valeur de retour avant son nom. <code>void</code> signifie \"ne renvoie rien\"." },
            { t: 'code', v: `int carre(int x) {\n    return x * x;\n}\n\nint main() {\n    printf("%d\\n", carre(5));\n    return 0;\n}` },
            { t: 'key', h: 'A retenir', v: "type_retour nom(parametres) { ... return valeur; } · void si rien n'est renvoye." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Ecris une fonction <code>int double_de(int x)</code> qui renvoie le double, et affiche double_de(9) dans main.",
              starter: '#include <stdio.h>\n\n\n\nint main() {\n    printf("%d\\n", double_de(9));\n    return 0;\n}\n',
              hint: 'int double_de(int x) { return x * 2; }',
              solution: `#include <stdio.h>\n\nint double_de(int x) {\n    return x * 2;\n}\n\nint main() {\n    printf("%d\\n", double_de(9));\n    return 0;\n}`,
              must: [['int\\s+double_de\\s*\\(\\s*int\\s+x\\s*\\)', 'Declare int double_de(int x).'], ['return\\s+x\\s*\\*\\s*2', 'Renvoie x * 2.']]
            }
          ]
        },
        {
          id: 'cf-3-2', title: 'Les pointeurs : l\'adresse plutot que la valeur', kind: 'lecon', xp: 60,
          goal: "Comprendre & (adresse) et * (dereferencement), les deux operateurs signature du C.",
          blocks: [
            { t: 'p', v: "Un pointeur est une variable qui stocke une <b>adresse memoire</b> plutot qu'une valeur directe. <code>&x</code> donne l'adresse de <code>x</code> ; <code>*p</code> lit (ou modifie) la valeur a l'adresse pointee par <code>p</code>." },
            { t: 'code', v: `int x = 10;\nint *p = &x;\n\nprintf("%d\\n", *p);\n*p = 20;\nprintf("%d\\n", x);` },
            { t: 'analogy', v: "<b>L'image a retenir :</b> une variable normale est une boite. Un pointeur est un post-it avec l'adresse d'une autre boite ecrite dessus. <code>*p</code>, c'est suivre le post-it pour ouvrir la vraie boite." },
            { t: 'key', h: 'A retenir', v: "int *p declare un pointeur vers un int · &x donne l'adresse de x · *p lit ou ecrit la valeur pointee." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Declare <code>int x = 5;</code>, un pointeur <code>p</code> vers <code>x</code>, modifie la valeur de <code>x</code> a 50 via <code>*p</code>, puis affiche <code>x</code>.",
              starter: '#include <stdio.h>\n\nint main() {\n    int x = 5;\n    \n    return 0;\n}\n',
              hint: 'int *p = &x; *p = 50; printf("%d\\n", x);',
              solution: `#include <stdio.h>\n\nint main() {\n    int x = 5;\n    int *p = &x;\n    *p = 50;\n    printf("%d\\n", x);\n    return 0;\n}`,
              must: [['int\\s*\\*\\s*p\\s*=\\s*&x', 'Declare int *p = &x;.'], ['\\*p\\s*=\\s*50', 'Modifie la valeur pointee avec *p = 50;.']]
            }
          ],
          quiz: [
            { q: 'Que donne &x ?', opts: ["La valeur de x", "L'adresse memoire de x", 'Le double de x'], a: 1, why: '& (adresse-de) donne ou se trouve x en memoire, pas sa valeur.' }
          ]
        },
        {
          id: 'cf-3-3', title: 'Épreuve III — Echanger par pointeurs', kind: 'boss', xp: 85,
          goal: "L'exercice le plus celebre du C : une fonction swap qui modifie vraiment ses arguments.",
          blocks: [
            { t: 'p', v: "En C, une fonction recoit des <b>copies</b> de ses arguments : les modifier a l'interieur ne change rien a l'exterieur. Pour vraiment modifier une variable depuis une fonction, il faut lui passer son adresse — c'est le role classique des pointeurs." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Ecris <code>void echanger(int *a, int *b)</code> qui echange les valeurs pointees par a et b, en utilisant une variable temporaire. Le code de test dans main est deja ecrit.",
              starter: '#include <stdio.h>\n\n\n\nint main() {\n    int x = 1, y = 2;\n    echanger(&x, &y);\n    printf("%d %d\\n", x, y);\n    return 0;\n}\n',
              hint: 'void echanger(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }',
              solution: `#include <stdio.h>\n\nvoid echanger(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 1, y = 2;\n    echanger(&x, &y);\n    printf("%d %d\\n", x, y);\n    return 0;\n}`,
              must: [['void\\s+echanger\\s*\\(\\s*int\\s*\\*\\s*a\\s*,\\s*int\\s*\\*\\s*b\\s*\\)', 'Declare void echanger(int *a, int *b).'],
                     ['int\\s+temp\\s*=\\s*\\*a', 'Sauvegarde *a dans une variable temporaire.'],
                     ['\\*a\\s*=\\s*\\*b', 'Affecte *b a *a.'],
                     ['\\*b\\s*=\\s*temp', 'Affecte la valeur temporaire a *b.']],
              success: "L'exercice le plus repete de tout apprentissage du C : echanger deux valeurs a travers une fonction, grace aux pointeurs."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 4 : C — TABLEAUX ET CHAINES ============ */
    {
      n: 4, title: 'C — Tableaux et chaines', sub: 'Semaine 6',
      lessons: [
        {
          id: 'cf-4-1', title: 'Declarer et parcourir un tableau', kind: 'lecon', xp: 50,
          goal: 'Utiliser des tableaux de taille fixe, et les parcourir avec une boucle.',
          blocks: [
            { t: 'p', v: "Un tableau C a une taille fixee a la declaration, et ne peut pas grandir ensuite (contrairement a une liste Python)." },
            { t: 'code', v: `int notes[4] = {12, 15, 8, 17};\n\nfor (int i = 0; i < 4; i++) {\n    printf("%d\\n", notes[i]);\n}` },
            { t: 'key', h: 'A retenir', v: "type nom[taille] = {v1, v2, ...} · nom[i] accede a l'element d'index i, comme en JavaScript." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Declare <code>int t[3] = {4, 8, 15};</code> et affiche ses trois elements avec une boucle for.",
              starter: '#include <stdio.h>\n\nint main() {\n    int t[3] = {4, 8, 15};\n    \n    return 0;\n}\n',
              hint: 'for (int i = 0; i < 3; i++) { printf("%d\\n", t[i]); }',
              solution: `#include <stdio.h>\n\nint main() {\n    int t[3] = {4, 8, 15};\n    for (int i = 0; i < 3; i++) {\n        printf("%d\\n", t[i]);\n    }\n    return 0;\n}`,
              must: [['for\\s*\\(\\s*int\\s+i\\s*=\\s*0\\s*;\\s*i\\s*<\\s*3', 'Boucle for de 0 a 2.'], ['t\\[i\\]', 'Accede aux elements via t[i].']]
            }
          ]
        },
        {
          id: 'cf-4-2', title: 'Les chaines de caracteres', kind: 'lecon', xp: 50,
          goal: "Comprendre qu'une chaine C est un tableau de caracteres termine par un zero invisible.",
          blocks: [
            { t: 'p', v: "En C, il n'existe pas de vrai type \"texte\" : une chaine est un tableau de <code>char</code>, termine automatiquement par un caractere invisible <code>'\\0'</code> qui marque la fin." },
            { t: 'code', v: `#include <string.h>\n\nchar nom[20] = "Nova";\nprintf("%s a %d lettres\\n", nom, (int)strlen(nom));` },
            { t: 'key', h: 'A retenir', v: "char nom[taille] = \"texte\" declare une chaine · %s l'affiche avec printf · strlen() (avec #include <string.h>) donne sa longueur." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Declare <code>char mot[10] = \"forge\";</code> et affiche <code>mot</code> avec printf et %s.",
              starter: '#include <stdio.h>\n\nint main() {\n    char mot[10] = "forge";\n    \n    return 0;\n}\n',
              hint: 'printf("%s\\n", mot);',
              solution: `#include <stdio.h>\n\nint main() {\n    char mot[10] = "forge";\n    printf("%s\\n", mot);\n    return 0;\n}`,
              must: [['printf\\s*\\(\\s*"%s\\\\n"\\s*,\\s*mot\\s*\\)', 'Utilise printf("%s\\n", mot);.']]
            }
          ]
        },
        {
          id: 'cf-4-3', title: 'Épreuve IV — Fonction sur un tableau', kind: 'boss', xp: 80,
          goal: "Ecrire une fonction qui recoit un tableau et sa taille, et renvoie une statistique.",
          blocks: [
            { t: 'p', v: "En C, un tableau ne connait pas sa propre taille une fois passe a une fonction : il faut toujours la fournir a part, en second parametre." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "Ecris <code>int somme(int t[], int taille)</code> qui renvoie la somme des elements, et affiche le resultat pour {3, 7, 2, 9} (taille 4, reponse : 21).",
              starter: '#include <stdio.h>\n\n\n\nint main() {\n    int t[4] = {3, 7, 2, 9};\n    printf("%d\\n", somme(t, 4));\n    return 0;\n}\n',
              hint: 'int somme(int t[], int taille) { int total = 0; for (int i = 0; i < taille; i++) { total += t[i]; } return total; }',
              solution: `#include <stdio.h>\n\nint somme(int t[], int taille) {\n    int total = 0;\n    for (int i = 0; i < taille; i++) {\n        total += t[i];\n    }\n    return total;\n}\n\nint main() {\n    int t[4] = {3, 7, 2, 9};\n    printf("%d\\n", somme(t, 4));\n    return 0;\n}`,
              must: [['int\\s+somme\\s*\\(\\s*int\\s+t\\[\\]\\s*,\\s*int\\s+taille\\s*\\)', 'Declare int somme(int t[], int taille).'],
                     ['for\\s*\\([\\s\\S]*taille', 'La boucle doit parcourir jusqu\'a taille.'],
                     ['total\\s*\\+=\\s*t\\[i\\]', 'Accumule avec total += t[i];.']],
              success: "Une fonction generique sur tableau : elle marche pour n'importe quelle taille, tant qu'on la lui donne."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 5 : C++ — CE QUI CHANGE ============ */
    {
      n: 5, title: 'C++ — Ce qui change', sub: 'Semaine 7 — le C, avec des objets',
      lessons: [
        {
          id: 'cf-5-1', title: 'cout, cin et namespace std', kind: 'lecon', xp: 50,
          goal: "Decouvrir la nouvelle facon d'afficher et de lire, propre au C++.",
          blocks: [
            { t: 'p', v: "Le C++ est une extension du C : tout ce que tu sais deja fonctionne encore. Mais le C++ propose sa propre facon d'afficher et de lire, plus simple a enchainer : <code>cout</code> et <code>cin</code>, avec l'operateur <code>&lt;&lt;</code>." },
            { t: 'code', v: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    cout << "Ton age : ";\n    cin >> age;\n    cout << "Tu as " << age << " ans" << endl;\n    return 0;\n}` },
            { t: 'p', v: "<code>using namespace std;</code> evite d'ecrire <code>std::cout</code> a chaque fois. <code>&lt;&lt;</code> \"envoie\" une valeur vers la sortie ; <code>&gt;&gt;</code> \"recoit\" une valeur depuis l'entree." },
            { t: 'key', h: 'A retenir', v: "#include <iostream> + using namespace std · cout << pour afficher, cin >> pour lire · endl termine la ligne." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Affiche <code>Bonjour depuis le C++</code> avec cout, en C++.",
              starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'cout << "Bonjour depuis le C++" << endl;',
              solution: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Bonjour depuis le C++" << endl;\n    return 0;\n}`,
              must: [['cout\\s*<<\\s*"Bonjour depuis le C\\+\\+"', 'Utilise cout << "Bonjour depuis le C++".']]
            }
          ]
        },
        {
          id: 'cf-5-2', title: 'Les references : un alias, pas un pointeur', kind: 'lecon', xp: 55,
          goal: 'Utiliser les references du C++, plus simples a lire que les pointeurs.',
          blocks: [
            { t: 'p', v: "Le C++ ajoute les <b>references</b> : un autre nom pour une variable existante, sans le symbole <code>*</code> a chaque usage. Elles remplacent souvent les pointeurs pour passer une variable modifiable a une fonction." },
            { t: 'code', v: `void incrementer(int &x) {\n    x = x + 1;\n}\n\nint main() {\n    int n = 5;\n    incrementer(n);\n    cout << n << endl;\n    return 0;\n}` },
            { t: 'key', h: 'A retenir', v: "int &x dans une signature de fonction fait de x un alias du parametre fourni · plus lisible qu'un pointeur, meme effet sur la variable d'origine." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Ecris <code>void doubler(int &x)</code> qui double la valeur de x par reference. Teste-la avec n = 6 (affiche 12).",
              starter: '#include <iostream>\nusing namespace std;\n\n\n\nint main() {\n    int n = 6;\n    doubler(n);\n    cout << n << endl;\n    return 0;\n}\n',
              hint: 'void doubler(int &x) { x = x * 2; }',
              solution: `#include <iostream>\nusing namespace std;\n\nvoid doubler(int &x) {\n    x = x * 2;\n}\n\nint main() {\n    int n = 6;\n    doubler(n);\n    cout << n << endl;\n    return 0;\n}`,
              must: [['void\\s+doubler\\s*\\(\\s*int\\s*&x\\s*\\)', 'Declare void doubler(int &x).'], ['x\\s*=\\s*x\\s*\\*\\s*2', 'Double x avec x = x * 2;.']]
            }
          ],
          quiz: [
            { q: 'Quelle est la difference principale entre une reference et un pointeur ?', opts: ['Aucune, c\'est pareil', 'La reference ne s\'ecrit pas avec * a chaque usage', 'La reference ne peut viser un int'], a: 1, why: 'Une reference se comporte comme un simple alias : pas de dereferencement explicite necessaire.' }
          ]
        },
        {
          id: 'cf-5-3', title: 'Épreuve V — Swap en C++', kind: 'boss', xp: 75,
          goal: 'Reecrire le swap du module 3, mais avec des references : plus court, plus lisible.',
          blocks: [{ t: 'p', v: "Le meme probleme que l'echange en C, mais la syntaxe C++ retire tout le bruit des etoiles et esperluettes repetees." }],
          ex: [
            {
              lang: 'cpp',
              brief: "Ecris <code>void echanger(int &a, int &b)</code> qui echange deux valeurs par reference.",
              starter: '#include <iostream>\nusing namespace std;\n\n\n\nint main() {\n    int x = 1, y = 2;\n    echanger(x, y);\n    cout << x << " " << y << endl;\n    return 0;\n}\n',
              hint: 'void echanger(int &a, int &b) { int temp = a; a = b; b = temp; }',
              solution: `#include <iostream>\nusing namespace std;\n\nvoid echanger(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 1, y = 2;\n    echanger(x, y);\n    cout << x << " " << y << endl;\n    return 0;\n}`,
              must: [['void\\s+echanger\\s*\\(\\s*int\\s*&a\\s*,\\s*int\\s*&b\\s*\\)', 'Declare void echanger(int &a, int &b).'],
                     ['int\\s+temp\\s*=\\s*a', 'Sauvegarde a dans temp.']],
              success: "Meme resultat qu'en C, sans une seule etoile : c'est exactement ce que le C++ ameliore."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 6 : C++ — PROGRAMMATION ORIENTEE OBJET ============ */
    {
      n: 6, title: 'C++ — Programmation orientee objet', sub: 'Semaine 8-9',
      lessons: [
        {
          id: 'cf-6-1', title: 'Classes et constructeurs', kind: 'lecon', xp: 60,
          goal: 'Definir une classe C++ avec attributs prives et methodes publiques.',
          blocks: [
            { t: 'p', v: "Une classe C++ regroupe des donnees (<code>private</code>, cachees) et des methodes pour les manipuler (<code>public</code>, accessibles depuis l'exterieur). Le constructeur porte le meme nom que la classe." },
            { t: 'code', v: `class Personnage {\nprivate:\n    string nom;\n    int vie;\npublic:\n    Personnage(string n, int v) {\n        nom = n;\n        vie = v;\n    }\n    void afficher() {\n        cout << nom << " : " << vie << " PV" << endl;\n    }\n};\n\nint main() {\n    Personnage kaz("Kaz", 100);\n    kaz.afficher();\n    return 0;\n}` },
            { t: 'key', h: 'A retenir', v: "class Nom { private: ... public: Nom(params) { ... } methode() { ... } }; · objet.methode() appelle une methode." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Complete la classe <code>Livre</code> : attributs prives <code>titre</code> (string) et <code>pages</code> (int), constructeur qui les initialise, methode <code>afficher()</code> qui affiche <code>titre (pages pages)</code>.",
              starter: '#include <iostream>\nusing namespace std;\n\nclass Livre {\nprivate:\n    \npublic:\n    \n};\n\nint main() {\n    Livre l("Dune", 412);\n    l.afficher();\n    return 0;\n}\n',
              hint: 'string titre; int pages; puis Livre(string t, int p) { titre = t; pages = p; } et void afficher() { cout << titre << " (" << pages << " pages)" << endl; }',
              solution: `#include <iostream>\nusing namespace std;\n\nclass Livre {\nprivate:\n    string titre;\n    int pages;\npublic:\n    Livre(string t, int p) {\n        titre = t;\n        pages = p;\n    }\n    void afficher() {\n        cout << titre << " (" << pages << " pages)" << endl;\n    }\n};\n\nint main() {\n    Livre l("Dune", 412);\n    l.afficher();\n    return 0;\n}`,
              must: [['class\\s+Livre', 'Garde le nom de classe Livre.'],
                     ['string\\s+titre\\s*;', 'Declare string titre; en prive.'],
                     ['int\\s+pages\\s*;', 'Declare int pages; en prive.'],
                     ['Livre\\s*\\(\\s*string\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)', 'Le constructeur doit recevoir un string et un int.'],
                     ['void\\s+afficher\\s*\\(\\s*\\)', 'Ajoute une methode void afficher().']]
            }
          ]
        },
        {
          id: 'cf-6-2', title: "L'heritage en C++", kind: 'lecon', xp: 65,
          goal: 'Faire heriter une classe d\'une autre avec : public.',
          blocks: [
            { t: 'p', v: "Comme en Python, une classe peut heriter d'une autre. La syntaxe C++ utilise <code>: public</code> pour signaler un heritage classique." },
            { t: 'code', v: `class Animal {\npublic:\n    void manger() {\n        cout << "miam" << endl;\n    }\n};\n\nclass Chien : public Animal {\npublic:\n    void aboyer() {\n        cout << "wouf" << endl;\n    }\n};\n\nint main() {\n    Chien rex;\n    rex.manger();\n    rex.aboyer();\n    return 0;\n}` },
            { t: 'key', h: 'A retenir', v: "class Enfant : public Parent { ... }; herite de toutes les methodes publiques du parent." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Cree <code>class Vehicule</code> avec une methode <code>rouler()</code> affichant <code>ca roule</code>, puis <code>class Voiture : public Vehicule</code> avec une methode <code>klaxonner()</code> affichant <code>tut tut</code>.",
              starter: '#include <iostream>\nusing namespace std;\n\n\n\nint main() {\n    Voiture v;\n    v.rouler();\n    v.klaxonner();\n    return 0;\n}\n',
              hint: 'class Vehicule { public: void rouler() { cout << "ca roule" << endl; } }; class Voiture : public Vehicule { public: void klaxonner() { cout << "tut tut" << endl; } };',
              solution: `#include <iostream>\nusing namespace std;\n\nclass Vehicule {\npublic:\n    void rouler() {\n        cout << "ca roule" << endl;\n    }\n};\n\nclass Voiture : public Vehicule {\npublic:\n    void klaxonner() {\n        cout << "tut tut" << endl;\n    }\n};\n\nint main() {\n    Voiture v;\n    v.rouler();\n    v.klaxonner();\n    return 0;\n}`,
              must: [['class\\s+Vehicule', 'Garde class Vehicule.'],
                     ['class\\s+Voiture\\s*:\\s*public\\s+Vehicule', 'Voiture doit heriter avec : public Vehicule.']]
            }
          ]
        },
        {
          id: 'cf-6-3', title: 'Épreuve VI — Un compte bancaire encapsule', kind: 'boss', xp: 90,
          goal: "Une classe complete qui protege ses donnees : impossible de les modifier sans passer par les methodes prevues.",
          blocks: [{ t: 'p', v: "L'encapsulation est le principe central de la POO : les donnees sensibles restent privees, seules des methodes controlees peuvent les changer." }],
          ex: [
            {
              lang: 'cpp',
              brief: "Cree <code>class Compte</code> avec <code>solde</code> prive (int, initialise a 0 dans le constructeur sans parametre), une methode <code>deposer(int montant)</code> qui l'augmente, et <code>afficherSolde()</code> qui affiche <code>Solde : X</code>.",
              starter: '#include <iostream>\nusing namespace std;\n\nclass Compte {\nprivate:\n    \npublic:\n    \n};\n\nint main() {\n    Compte c;\n    c.deposer(100);\n    c.deposer(50);\n    c.afficherSolde();\n    return 0;\n}\n',
              hint: 'int solde; Compte() { solde = 0; } void deposer(int montant) { solde += montant; } void afficherSolde() { cout << "Solde : " << solde << endl; }',
              solution: `#include <iostream>\nusing namespace std;\n\nclass Compte {\nprivate:\n    int solde;\npublic:\n    Compte() {\n        solde = 0;\n    }\n    void deposer(int montant) {\n        solde += montant;\n    }\n    void afficherSolde() {\n        cout << "Solde : " << solde << endl;\n    }\n};\n\nint main() {\n    Compte c;\n    c.deposer(100);\n    c.deposer(50);\n    c.afficherSolde();\n    return 0;\n}`,
              must: [['int\\s+solde\\s*;', 'solde doit etre un int prive.'],
                     ['Compte\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*?solde\\s*=\\s*0', 'Le constructeur sans parametre doit initialiser solde a 0.'],
                     ['void\\s+deposer\\s*\\(\\s*int\\s+montant\\s*\\)', 'Ajoute void deposer(int montant).'],
                     ['solde\\s*\\+=\\s*montant', 'deposer doit faire solde += montant;.']],
              success: "Une classe qui protege vraiment son etat : solde ne peut changer que via deposer()."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 7 : C++ — BIBLIOTHEQUE STANDARD ============ */
    {
      n: 7, title: 'C++ — La bibliotheque standard', sub: 'Semaine 10 — vector et string',
      lessons: [
        {
          id: 'cf-7-1', title: 'vector : un tableau qui grandit', kind: 'lecon', xp: 55,
          goal: "Utiliser vector, l'equivalent C++ d'une liste Python.",
          blocks: [
            { t: 'p', v: "Contrairement a un tableau C classique, <code>vector</code> peut grandir dynamiquement — c'est l'outil que les vrais programmes C++ utilisent presque toujours a la place des tableaux fixes." },
            { t: 'code', v: `#include <vector>\n\nvector<int> notes = {12, 15, 8};\nnotes.push_back(17);\n\nfor (int n : notes) {\n    cout << n << endl;\n}\ncout << "Total : " << notes.size() << endl;` },
            { t: 'key', h: 'A retenir', v: "vector<type> nom = {...} · push_back() ajoute · size() donne la taille · for (type x : vecteur) le parcourt." }
          ],
          ex: [
            {
              lang: 'cpp',
              brief: "Cree un <code>vector&lt;int&gt; scores</code> avec {3, 7, 2}, ajoute 9 avec push_back, puis affiche chaque element avec une boucle for-each.",
              starter: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
              hint: 'vector<int> scores = {3, 7, 2}; scores.push_back(9); for (int s : scores) { cout << s << endl; }',
              solution: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {3, 7, 2};\n    scores.push_back(9);\n    for (int s : scores) {\n        cout << s << endl;\n    }\n    return 0;\n}`,
              must: [['vector<int>\\s+scores\\s*=\\s*\\{\\s*3\\s*,\\s*7\\s*,\\s*2\\s*\\}', 'Declare vector<int> scores = {3, 7, 2};.'],
                     ['scores\\.push_back\\s*\\(\\s*9\\s*\\)', 'Ajoute 9 avec push_back.'],
                     ['for\\s*\\(\\s*int\\s+\\w+\\s*:\\s*scores\\s*\\)', 'Utilise une boucle for-each sur scores.']]
            }
          ]
        },
        {
          id: 'cf-7-2', title: 'Épreuve VII — Moyenne avec vector', kind: 'boss', xp: 80,
          goal: 'Calculer une moyenne en parcourant un vector.',
          blocks: [{ t: 'p', v: "Le meme calcul de moyenne que dans les autres langages de ce site, avec les outils modernes du C++." }],
          ex: [
            {
              lang: 'cpp',
              brief: "Un <code>vector&lt;int&gt; notes = {12, 8, 17, 15};</code> est donne. Calcule et affiche sa moyenne (avec 2 decimales, attendu : 13.00).",
              starter: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> notes = {12, 8, 17, 15};\n    \n    return 0;\n}\n',
              hint: 'int total = 0; for (int n : notes) { total += n; } double moyenne = (double)total / notes.size(); cout << moyenne << endl; (utilise printf ou cout avec precision selon besoin)',
              solution: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> notes = {12, 8, 17, 15};\n    int total = 0;\n    for (int n : notes) {\n        total += n;\n    }\n    double moyenne = (double)total / notes.size();\n    printf("%.2f\\n", moyenne);\n    return 0;\n}`,
              must: [['for\\s*\\(\\s*int\\s+n\\s*:\\s*notes\\s*\\)', 'Parcours notes avec une boucle for-each.'],
                     ['total\\s*\\+=\\s*n', 'Accumule avec total += n;.'],
                     ['notes\\.size\\s*\\(\\s*\\)', 'Utilise notes.size() pour diviser.']],
              success: "vector, boucle moderne, et un calcul classique : le C++ du quotidien."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 8 : C# — UN LANGAGE MANAGE ============ */
    {
      n: 8, title: 'C# — Un langage manage', sub: 'Semaine 11 — les objets, sans la memoire manuelle',
      lessons: [
        {
          id: 'cf-8-1', title: 'Console.WriteLine et les bases du C#', kind: 'lecon', xp: 50,
          goal: 'Decouvrir la syntaxe C#, tres proche du C++ mais geree automatiquement.',
          blocks: [
            { t: 'p', v: "Le C# (prononce \"C sharp\") ressemble beaucoup au C++ en surface, mais gere automatiquement la memoire (pas de pointeurs a manier au quotidien) — c'est le langage principal de Microsoft, utilise pour des applications d'entreprise et le moteur de jeu Unity." },
            { t: 'code', v: `using System;\n\nclass Programme {\n    static void Main() {\n        int age = 14;\n        Console.WriteLine("J'ai " + age + " ans");\n    }\n}` },
            { t: 'p', v: "<code>Console.WriteLine</code> remplace <code>printf</code>/<code>cout</code>. Chaque programme C# vit dans une <code>class</code>, avec un point d'entree <code>static void Main()</code>." },
            { t: 'key', h: 'A retenir', v: "using System; · class + static void Main() · Console.WriteLine(\"...\") affiche une ligne." }
          ],
          ex: [
            {
              lang: 'csharp',
              brief: "Ecris un programme C# complet qui affiche <code>Salut depuis C#</code>.",
              starter: 'using System;\n\nclass Programme {\n    static void Main() {\n        \n    }\n}\n',
              hint: 'Console.WriteLine("Salut depuis C#");',
              solution: `using System;\n\nclass Programme {\n    static void Main() {\n        Console.WriteLine("Salut depuis C#");\n    }\n}`,
              must: [['using\\s+System\\s*;', 'Garde using System;.'], ['static\\s+void\\s+Main\\s*\\(', 'Garde static void Main().'],
                     ['Console\\.WriteLine\\s*\\(\\s*"Salut depuis C#"', 'Affiche exactement "Salut depuis C#" avec Console.WriteLine.']]
            }
          ]
        },
        {
          id: 'cf-8-2', title: "L'interpolation de chaines et var", kind: 'lecon', xp: 50,
          goal: "Utiliser $\"...\" pour assembler du texte, et var pour laisser le type se deduire.",
          blocks: [
            { t: 'p', v: "Le C# offre l'interpolation de chaines, tres proche des f-strings Python : un <code>$</code> avant les guillemets, et des accolades pour inserer une variable." },
            { t: 'code', v: `string nom = "Nova";\nint niveau = 7;\nConsole.WriteLine($"{nom} est niveau {niveau}");\n\nvar score = 42;   // le type int est deduit automatiquement` },
            { t: 'key', h: 'A retenir', v: "$\"texte {variable}\" interpole, comme une f-string · var laisse le compilateur deduire le type depuis la valeur." }
          ],
          ex: [
            {
              lang: 'csharp',
              brief: "Declare <code>string prenom = \"Mia\";</code> et <code>int age = 13;</code>, puis affiche <code>Mia a 13 ans</code> avec l'interpolation de chaines.",
              starter: 'using System;\n\nclass Programme {\n    static void Main() {\n        \n    }\n}\n',
              hint: 'string prenom = "Mia"; int age = 13; Console.WriteLine($"{prenom} a {age} ans");',
              solution: `using System;\n\nclass Programme {\n    static void Main() {\n        string prenom = "Mia";\n        int age = 13;\n        Console.WriteLine($"{prenom} a {age} ans");\n    }\n}`,
              must: [['string\\s+prenom\\s*=\\s*"Mia"', 'Declare string prenom = "Mia";.'],
                     ['\\$"[^"]*\\{prenom\\}[^"]*\\{age\\}', "Utilise l'interpolation $\"...{prenom}...{age}...\"."]]
            }
          ]
        },
        {
          id: 'cf-8-3', title: 'Épreuve VIII — Conditions et boucles en C#', kind: 'boss', xp: 75,
          goal: 'Un mini-programme combinant tout ce qui a ete vu en C# jusqu\'ici.',
          blocks: [{ t: 'p', v: "if/else et for en C# sont identiques a ceux du C++ — seule Console.WriteLine change." }],
          ex: [
            {
              lang: 'csharp',
              brief: "Affiche les nombres pairs de 1 a 10 avec une boucle for et un if (attendu : 2, 4, 6, 8, 10 chacun sur sa ligne).",
              starter: 'using System;\n\nclass Programme {\n    static void Main() {\n        \n    }\n}\n',
              hint: 'for (int i = 1; i <= 10; i++) { if (i % 2 == 0) { Console.WriteLine(i); } }',
              solution: `using System;\n\nclass Programme {\n    static void Main() {\n        for (int i = 1; i <= 10; i++) {\n            if (i % 2 == 0) {\n                Console.WriteLine(i);\n            }\n        }\n    }\n}`,
              must: [['for\\s*\\(\\s*int\\s+i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*10', 'Boucle for de 1 a 10.'], ['i\\s*%\\s*2\\s*==\\s*0', 'Teste la parite avec i % 2 == 0.']],
              success: "if, for, Console.WriteLine : le C# de tous les jours."
            }
          ]
        }
      ]
    },

    /* ============ MODULE 9 : C# — CLASSES ET EPREUVE FINALE ============ */
    {
      n: 9, title: 'C# — Classes et épreuve finale', sub: 'Semaine 12 — le mot de la fin',
      lessons: [
        {
          id: 'cf-9-1', title: 'Classes et proprietes en C#', kind: 'lecon', xp: 60,
          goal: "Ecrire une classe C# avec des proprietes { get; set; }, plus concises qu'en C++.",
          blocks: [
            { t: 'p', v: "Le C# simplifie l'encapsulation avec les <b>proprietes</b> : <code>{ get; set; }</code> cree automatiquement un acces controle, sans ecrire de methodes separees." },
            { t: 'code', v: `class Joueur {\n    public string Nom { get; set; }\n    public int Vie { get; set; }\n\n    public Joueur(string nom, int vie) {\n        Nom = nom;\n        Vie = vie;\n    }\n\n    public void Afficher() {\n        Console.WriteLine($"{Nom} : {Vie} PV");\n    }\n}\n\nJoueur j = new Joueur("Kaz", 100);\nj.Afficher();` },
            { t: 'key', h: 'A retenir', v: "public Type Nom { get; set; } declare une propriete · new NomClasse(...) cree un objet, comme new en JavaScript." }
          ],
          ex: [
            {
              lang: 'csharp',
              brief: "Complete la classe <code>Livre</code> avec des proprietes <code>Titre</code> (string) et <code>Pages</code> (int), un constructeur, et une methode <code>Afficher()</code> qui affiche <code>Titre (Pages pages)</code>.",
              starter: 'using System;\n\nclass Livre {\n    \n\n    public Livre(string titre, int pages) {\n        \n    }\n\n    public void Afficher() {\n        \n    }\n}\n\nclass Programme {\n    static void Main() {\n        Livre l = new Livre("Dune", 412);\n        l.Afficher();\n    }\n}\n',
              hint: 'public string Titre { get; set; } / public int Pages { get; set; } — dans le constructeur : Titre = titre; Pages = pages; — dans Afficher : Console.WriteLine($"{Titre} ({Pages} pages)");',
              solution: `using System;\n\nclass Livre {\n    public string Titre { get; set; }\n    public int Pages { get; set; }\n\n    public Livre(string titre, int pages) {\n        Titre = titre;\n        Pages = pages;\n    }\n\n    public void Afficher() {\n        Console.WriteLine($"{Titre} ({Pages} pages)");\n    }\n}\n\nclass Programme {\n    static void Main() {\n        Livre l = new Livre("Dune", 412);\n        l.Afficher();\n    }\n}`,
              must: [['public\\s+string\\s+Titre\\s*\\{\\s*get\\s*;\\s*set\\s*;\\s*\\}', 'Declare public string Titre { get; set; }.'],
                     ['public\\s+int\\s+Pages\\s*\\{\\s*get\\s*;\\s*set\\s*;\\s*\\}', 'Declare public int Pages { get; set; }.'],
                     ['Titre\\s*=\\s*titre', 'Le constructeur doit affecter Titre = titre;.']]
            }
          ]
        },
        {
          id: 'cf-9-2', title: 'Épreuve finale — Le meme programme, trois langages', kind: 'boss', xp: 100,
          goal: "L'epreuve de synthese : le meme petit programme, ecrit dans chacun des trois langages.",
          blocks: [
            { t: 'p', v: "Dernier exercice du parcours : un seul et meme programme — calculer et afficher si un nombre est premier — a ecrire dans les trois langages. Une facon de sentir, dans les doigts, ce qui change et ce qui reste identique d'un langage a l'autre." }
          ],
          ex: [
            {
              lang: 'c',
              brief: "En C : ecris une fonction <code>int est_premier(int n)</code> qui renvoie 1 si n est premier, 0 sinon (teste les diviseurs de 2 a n-1). Affiche le resultat pour n = 13 (attendu : premier).",
              starter: '#include <stdio.h>\n\n\n\nint main() {\n    int n = 13;\n    if (est_premier(n)) {\n        printf("premier\\n");\n    } else {\n        printf("non premier\\n");\n    }\n    return 0;\n}\n',
              hint: 'int est_premier(int n) { for (int i = 2; i < n; i++) { if (n % i == 0) { return 0; } } return 1; }',
              solution: `#include <stdio.h>\n\nint est_premier(int n) {\n    for (int i = 2; i < n; i++) {\n        if (n % i == 0) {\n            return 0;\n        }\n    }\n    return 1;\n}\n\nint main() {\n    int n = 13;\n    if (est_premier(n)) {\n        printf("premier\\n");\n    } else {\n        printf("non premier\\n");\n    }\n    return 0;\n}`,
              must: [['int\\s+est_premier\\s*\\(\\s*int\\s+n\\s*\\)', 'Declare int est_premier(int n).'],
                     ['n\\s*%\\s*i\\s*==\\s*0', 'Teste la divisibilite avec n % i == 0.'],
                     ['return\\s+0\\s*;[\\s\\S]*return\\s+1\\s*;', 'Renvoie 0 si un diviseur est trouve, 1 sinon (dans cet ordre dans le code).']]
            },
            {
              lang: 'cpp',
              brief: "Le meme programme en C++ : fonction <code>bool estPremier(int n)</code>, renvoyant un vrai booleen cette fois.",
              starter: '#include <iostream>\nusing namespace std;\n\n\n\nint main() {\n    int n = 13;\n    if (estPremier(n)) {\n        cout << "premier" << endl;\n    } else {\n        cout << "non premier" << endl;\n    }\n    return 0;\n}\n',
              hint: 'bool estPremier(int n) { for (int i = 2; i < n; i++) { if (n % i == 0) { return false; } } return true; }',
              solution: `#include <iostream>\nusing namespace std;\n\nbool estPremier(int n) {\n    for (int i = 2; i < n; i++) {\n        if (n % i == 0) {\n            return false;\n        }\n    }\n    return true;\n}\n\nint main() {\n    int n = 13;\n    if (estPremier(n)) {\n        cout << "premier" << endl;\n    } else {\n        cout << "non premier" << endl;\n    }\n    return 0;\n}`,
              must: [['bool\\s+estPremier\\s*\\(\\s*int\\s+n\\s*\\)', 'Declare bool estPremier(int n), avec un vrai type bool.'],
                     ['return\\s+false\\s*;[\\s\\S]*return\\s+true\\s*;', 'Renvoie false si un diviseur est trouve, true sinon.']]
            },
            {
              lang: 'csharp',
              brief: "Le meme programme en C# : methode <code>static bool EstPremier(int n)</code>, appelee depuis Main.",
              starter: 'using System;\n\nclass Programme {\n    \n\n    static void Main() {\n        int n = 13;\n        if (EstPremier(n)) {\n            Console.WriteLine("premier");\n        } else {\n            Console.WriteLine("non premier");\n        }\n    }\n}\n',
              hint: 'static bool EstPremier(int n) { for (int i = 2; i < n; i++) { if (n % i == 0) { return false; } } return true; }',
              solution: `using System;\n\nclass Programme {\n    static bool EstPremier(int n) {\n        for (int i = 2; i < n; i++) {\n            if (n % i == 0) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    static void Main() {\n        int n = 13;\n        if (EstPremier(n)) {\n            Console.WriteLine("premier");\n        } else {\n            Console.WriteLine("non premier");\n        }\n    }\n}`,
              must: [['static\\s+bool\\s+EstPremier\\s*\\(\\s*int\\s+n\\s*\\)', 'Declare static bool EstPremier(int n).'],
                     ['return\\s+false\\s*;[\\s\\S]*return\\s+true\\s*;', 'Renvoie false si un diviseur est trouve, true sinon.']],
              success: "PARCOURS C / C++ / C# TERMINE. Le meme algorithme, trois syntaxes : tu sens maintenant ce qui distingue vraiment ces langages — et surtout, tout ce qu'ils partagent."
            }
          ]
        }
      ]
    }
  ]
};
