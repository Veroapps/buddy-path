import { type Chapter } from "./chapter1";

export const chapter3: Chapter = {
  id: "ch3",
  number: 3,
  title: "Ownership",
  subtitle: "P\u0159esta\u0148 \u010Dekat, za\u010Dni vlastnit",
  description: "Nau\u010D\u00ED\u0161 se p\u0159eb\u00EDrat zodpov\u011Bdnost i za v\u011Bci, kter\u00E9 nejsou tvoje chyba \u2014 proto\u017Ee teprve pak s nimi m\u016F\u017Ee\u0161 n\u011Bco ud\u011Blat.",
  nodes: [
    {
      id: "ch3n1", order: 1, type: "theory",
      title: "Co je ownership",
      subtitle: "Z\u00E1klad t\u00E9to kapitoly",
      emoji: "\u{1F3AF}",
      principle: "Vlastnit znamen\u00E1 jednat",
      content: "Ownership nen\u00ED pocit. Je to rozhodnut\u00ED. Rozhodnut\u00ED, \u017Ee v\u011Bci ve tv\u00E9 sf\u00E9\u0159e jsou tvoje \u2014 v\u010Detn\u011B t\u011Bch, kter\u00E9 nejsou tvoje chyba. Proto\u017Ee teprve kdy\u017E je to tvoje, m\u016F\u017Ee\u0161 s t\u00EDm n\u011Bco ud\u011Blat.\n\nV\u011Bt\u0161ina lid\u00ED si mysl\u00ED, \u017Ee ownership znamen\u00E1 'd\u011Bl\u00E1m svou pr\u00E1ci po\u0159\u00E1dn\u011B.' Ale to je z\u00E1klad, ne ownership. Skute\u010Dn\u00FD ownership znamen\u00E1: kdy\u017E n\u011Bco nefunguje, nezept\u00E1\u0161 se '\u010D\u00ED je to chyba?' ale 'co s t\u00EDm ud\u011Bl\u00E1m j\u00E1?' Ne proto, \u017Ee v\u0161echno je tvoje vina \u2014 ale proto, \u017Ee \u010Dek\u00E1n\u00ED na druh\u00E9 je strategie, kter\u00E1 nikdy nefunguje.\n\nOwnership m\u00E1 t\u0159i \u00FArovn\u011B: 1) Vlastn\u00EDm svou pr\u00E1ci \u2014 d\u011Bl\u00E1m co m\u00E1m. 2) Vlastn\u00EDm v\u00FDsledek \u2014 nezaj\u00EDm\u00E1 m\u011B jestli jsem 'ud\u011Blala sv\u016Fj d\u00EDl', zaj\u00EDm\u00E1 m\u011B jestli to funguje. 3) Vlastn\u00EDm i to, co nen\u00ED moje \u2014 kdy\u017E vid\u00EDm probl\u00E9m, neprojdu kolem.\n\nV t\u00E9to kapitole se nau\u010D\u00ED\u0161 v\u0161echny t\u0159i \u00FArovn\u011B.",
      examples: [
        "Kolega nedodal podklady. \u00DArove\u0148 1: 'J\u00E1 svou \u010D\u00E1st ud\u011Blala.' \u00DArove\u0148 2: 'V\u00FDsledek nen\u00ED hotov\u00FD \u2014 zavolam mu a dod\u00E1me to spolu.' \u00DArove\u0148 3: 'P\u0159\u00ED\u0161t\u011B navrh\u00E1m syst\u00E9m kontroln\u00EDch bod\u016F, a\u0165 se to neopakuje.'",
        "LinkedIn nem\u00E1 strategii. \u00DArove\u0148 1: 'Publkuju co mi \u0159eknou.' \u00DArove\u0148 2: 'Chci v\u011Bd\u011Bt, jestli to funguje \u2014 pod\u00EDv\u00E1m se na data.' \u00DArove\u0148 3: 'Nikdo strategii nenapsal, tak ji nap\u00ED\u0161u j\u00E1 a p\u0159edlo\u017E\u00EDm.'",
        "\u0160\u00E9fov\u00E1 m\u011B kritizuje. \u00DArove\u0148 1: 'D\u011Bl\u00E1m co um\u00EDm.' \u00DArove\u0148 2: 'Zept\u00E1m se co konkr\u00E9tn\u011B m\u00E1m zm\u011Bnit.' \u00DArove\u0148 3: 'Ka\u017Ed\u00FD p\u00E1tek j\u00ED po\u0161lu update, a\u0165 vid\u00ED co d\u011Bl\u00E1m d\u0159\u00EDv ne\u017E za\u010Dne kritizovat.'"
      ],
      quote_cz: "Zodpov\u011Bdnost nen\u00ED b\u0159\u00EDm\u011B. Je to p\u00E1ka, kter\u00E1 ti d\u00E1v\u00E1 moc n\u011Bco zm\u011Bnit.",
      quote_en: "Responsibility is not a burden. It is the lever that gives you power to change things.",
      quote_author: "Jocko Willink",
      quote2_cz: "Nejv\u011Bt\u0161\u00ED iluze je myslet si, \u017Ee n\u011Bkdo jin\u00FD vy\u0159e\u0161\u00ED tv\u016Fj probl\u00E9m.",
      quote2_en: "The greatest illusion is thinking someone else will solve your problem.",
      quote2_author: "Roger Connors"
    },
    {
      id: "ch3n2", order: 2, type: "game",
      title: "Kruh nebo past?",
      subtitle: "T\u0159i\u010F situace rychle",
      emoji: "\u{1F504}",
      gameType: "sort-influence-timed",
      gameData: {
        timePerItem: 8,
        situations: [
          { text: "\u0160\u00E9fov\u00E1 m\u011B kritizuje p\u0159ed cel\u00FDm t\u00FDmem.", correct: "concern", flip: "Mohu si p\u0159ipravit body p\u0159edem a d\u00E1t j\u00ED kontext d\u0159\u00EDv ne\u017E porada." },
          { text: "LinkedIn algoritmus sni\u017Euje dosah.", correct: "concern", flip: "Mohu testovat jin\u00E9 form\u00E1ty, \u010Dasy, hooky." },
          { text: "Kolega neodpov\u00EDd\u00E1 na mail t\u0159et\u00ED den.", correct: "influence", flip: "" },
          { text: "Firma m\u011Bn\u00ED strategii a nikdo mi nic ne\u0159ekl.", correct: "concern", flip: "Mohu se zeptat p\u0159\u00EDmo: co to znamen\u00E1 pro m\u016Fj projekt?" },
          { text: "Nem\u00E1m jasn\u00E9 KPI pro sv\u016Fj projekt.", correct: "influence", flip: "" },
          { text: "Klient zm\u011Bnil po\u017Eadavky den p\u0159ed deadlinem.", correct: "concern", flip: "Mohu navrhnout realistick\u00FD \u010Dasov\u00FD pl\u00E1n." },
          { text: "Na porad\u011B m\u011B nikdo neposlou\u010D\u00E1.", correct: "influence", flip: "" },
          { text: "T\u00FDm nem\u00E1 motivaci.", correct: "concern", flip: "Mohu p\u0159ij\u00EDt s konkr\u00E9tn\u00EDm n\u00E1vrhem a sd\u00EDlet ho." }
        ]
      }
    },
    {
      id: "ch3n3", order: 3, type: "reflection",
      title: "Co odkl\u00E1d\u00E1m?",
      subtitle: "Up\u0159\u00EDmn\u00FD pohled",
      emoji: "\u{1F50D}",
      prompt: "Jakou jednu v\u011Bc v pr\u00E1ci odkl\u00E1d\u00E1m, proto\u017Ee 'to nen\u00ED na m\u011B' nebo '\u010Dek\u00E1m na n\u011Bkoho'? Co by se stalo, kdybych to vzala do vlastn\u00EDch rukou z\u00EDtra r\u00E1no? Co m\u011B od toho dr\u017E\u00ED?",
      placeholder: "Odkl\u00E1d\u00E1m: ...\nKdybych to vzala do rukou: ...\nCo m\u011B dr\u017E\u00ED: ..."
    },
    {
      id: "ch3n4", order: 4, type: "theory",
      title: "Extreme Ownership",
      subtitle: "Willink a Babin",
      emoji: "\u{1F3CB}\uFE0F",
      principle: "V\u0161echno je moje",
      content: "Jocko Willink velel jednotce Navy SEAL v Ir\u00E1ku. Jednoho dne jeho mu\u017Ei omylem st\u0159\u00EDleli na vlastn\u00ED \u2014 p\u0159\u00E1telsk\u00E1 palba, zran\u011Bn\u00ED, chaos. Kdy\u017E p\u0159i\u0161el rozbor, ka\u017Ed\u00FD \u010Dlen t\u00FDmu m\u011Bl sv\u00E9 vysv\u011Btlen\u00ED, pro\u010D to nebyla jeho chyba. Willink \u0159ekl jednu v\u011Btu: 'To je moje zodpov\u011Bdnost. V\u0161echno.'\n\nPro\u010D? Ne proto, \u017Ee v\u0161echno zp\u016Fsobil. Ale proto, \u017Ee jako velitel m\u011Bl moc tomu p\u0159edej\u00EDt \u2014 lep\u0161\u00ED p\u0159\u00EDprava, jasn\u011Bj\u0161\u00ED komunikace, d\u016Fkladn\u011Bj\u0161\u00ED kontrola. A dokud to nebude jeho, nem\u016F\u017Ee to zm\u011Bnit.\n\nTohle nen\u00ED vojensk\u00FD princip. Je to princip pro ka\u017Ed\u00E9ho, kdo chce m\u00EDt vliv na sv\u016Fj \u017Eivot. V praxi to znamen\u00E1: p\u0159esta\u0148 hledat, \u010D\u00ED je to chyba, a za\u010Dni hledat, co m\u016F\u017Ee\u0161 ud\u011Blat TY. Ne proto, \u017Ee ostatn\u00ED nemaj\u00ED sv\u016Fj d\u00EDl \u2014 ale proto, \u017Ee \u010Dekat a\u017E to oni naprav\u00ED je strategie, kter\u00E1 nikdy nefunguje.\n\nExtreme Ownership NEN\u00CD sebemrsk\u00E1n\u00ED. Nen\u00ED to '\u0159\u00EDk\u00E1m si, \u017Ee jsem \u0161patn\u00E1.' Je to: '\u0159\u00EDk\u00E1m si, \u017Ee m\u00E1m moc to zm\u011Bnit.' Rozd\u00EDl je obrovsk\u00FD. Prvn\u00ED tah\u00E1 dol\u016F. Druh\u00FD d\u00E1v\u00E1 energii jednat.",
      examples: [
        "Projekt se zdr\u017Eel kv\u016Fli kolegovi. Sebemrsk\u00E1n\u00ED: 'Jsem \u0161patn\u00E1 mana\u017Eerka.' Extreme Ownership: 'Nedala jsem mu jasn\u00FD deadline, nekontrolovala pr\u016Fb\u011Bh, nem\u011Bla pl\u00E1n B. P\u0159\u00ED\u0161t\u011B to ud\u011Bl\u00E1m jinak.'",
        "LinkedIn nem\u00E1 strategii. V\u00FDmluva: '\u0160\u00E9fka ji nechce.' Extreme Ownership: '\u010Cekala jsem, a\u017E ji n\u011Bkdo definuje. Nikdo to neud\u011Blal. Tak ji nap\u00ED\u0161u j\u00E1 a p\u0159edlo\u017E\u00EDm.'",
        "\u0160\u00E9fov\u00E1 m\u011B kritizuje p\u0159ed t\u00FDmem. Ob\u011B\u0165: 'Je nefer.' Extreme Ownership: 'Ned\u00E1v\u00E1m j\u00ED dost viditelnosti do m\u00E9 pr\u00E1ce. Ka\u017Ed\u00FD p\u00E1tek j\u00ED po\u0161lu t\u0159i v\u011Bty \u2014 pak nebude m\u00EDt d\u016Fvod h\u00E1dat.'"
      ],
      quote_cz: "Neexistuj\u00ED \u0161patn\u00E9 t\u00FDmy. Jen \u0161patn\u00ED vedouc\u00ED.",
      quote_en: "There are no bad teams, only bad leaders.",
      quote_author: "Jocko Willink",
      quote2_cz: "Kdy\u017E p\u0159ijme\u0161 zodpov\u011Bdnost za v\u0161echno, z\u00EDsk\u00E1\u0161 moc zm\u011Bnit cokoli.",
      quote2_en: "When you accept responsibility for everything, you gain the power to change anything.",
      quote2_author: "Jocko Willink"
    },
    {
      id: "ch3n5", order: 5, type: "game",
      title: "P\u0159evra\u0165 obvin\u011Bn\u00ED",
      subtitle: "Klikej rychle \u2014 vyber spr\u00E1vn\u00FD p\u0159epis",
      emoji: "\u26A1",
      gameType: "blame-flip",
      gameData: {
        timePerItem: 10,
        complaints: [
          { complaint: "\u0160\u00E9fka mi nedala feedback.", options: ["Nezeptala jsem se na konkr\u00E9tn\u00ED feedback.", "To je jej\u00ED pr\u00E1ce, ne moje.", "Jsem \u0161patn\u00E1 pracovnice."], correct: 0 },
          { complaint: "Kolega nedodal podklady v\u010Das.", options: ["M\u011Bl by b\u00FDt zodpov\u011Bdn\u011Bj\u0161\u00ED.", "V\u017Edycky to tak d\u011Bl\u00E1.", "Nedala jsem mu p\u00EDsemn\u00FD deadline a nezkontrolovala v p\u016Flce."], correct: 2 },
          { complaint: "Na porad\u011B m\u011B nikdo neposlouchal.", options: ["Nep\u0159ipravila jsem si jasn\u00E9 body a ne\u0159ekla si o slovo.", "Jsou to ignoranti.", "Asi nem\u00E1m co \u0159\u00EDct."], correct: 0 },
          { complaint: "LinkedIn post m\u011Bl nula reakc\u00ED.", options: ["Algoritmus je rozbit\u00FD.", "Netestovala jsem hook, \u010Das ani form\u00E1t \u2014 p\u0159\u00ED\u0161t\u011B jinak.", "Nem\u00E1m talent."], correct: 1 },
          { complaint: "T\u00FDm nefunguje a nikdo nic ned\u011Bl\u00E1.", options: ["To nen\u00ED m\u016Fj probl\u00E9m.", "Nep\u0159i\u0161la jsem s n\u00E1vrhem, jak to zlep\u0161it.", "V\u0161ichni jsou l\u00EDn\u00ED."], correct: 1 },
          { complaint: "\u0160\u00E9fov\u00E1 zadala nesmysln\u00FD \u00FAkol.", options: ["Nezeptala jsem se na kontext a prioritu.", "Ona d\u00E1v\u00E1 zbyte\u010Dn\u00E9 \u00FAkoly.", "Nem\u016F\u017Eu \u0159\u00EDct ne."], correct: 0 }
        ]
      }
    },
    {
      id: "ch3n6", order: 6, type: "reflection",
      title: "Moje st\u00ED\u017Enost",
      subtitle: "Kdo za to m\u016F\u017Ee? J\u00E1.",
      emoji: "\u{1FA9E}",
      prompt: "Vyber jednu st\u00ED\u017Enost z posledn\u00EDho t\u00FDdne \u2014 n\u011Bco, co t\u011B \u0161tvalo a kde vin\u00ED\u0161 n\u011Bkoho jin\u00E9ho. P\u0159eformuluj t\u0159ikr\u00E1t: 1) Co jsem mohla ud\u011Blat P\u0158ED t\u00EDm? 2) Co jsem mohla V TU CHVILI? 3) Co ud\u011Bl\u00E1m P\u0158I\u0160T\u011A?",
      placeholder: "St\u00ED\u017Enost: ...\nP\u0159ed t\u00EDm: ...\nV tu chv\u00EDli: ...\nP\u0159\u00ED\u0161t\u011B: ..."
    },
    {
      id: "ch3n7", order: 7, type: "theory",
      title: "Nad \u010Darou, pod \u010Darou",
      subtitle: "Oz Principle",
      emoji: "\u{1F4CA}",
      principle: "See it \u2013 Own it \u2013 Solve it \u2013 Do it",
      content: "P\u0159edstav si neviditelnou \u010D\u00E1ru, kter\u00E1 rozd\u011Bluje dva sv\u011Bty. Pod \u010Darou je zem\u011B v\u00FDmluv: obvi\u0148ov\u00E1n\u00ED ('\u0161\u00E9fka je nefer'), vymlouv\u00E1n\u00ED ('nem\u011Bla jsem \u010Das'), \u010Dek\u00E1n\u00ED ('n\u011Bkdo to vy\u0159e\u0161\u00ED') a ignorov\u00E1n\u00ED ('to nen\u00ED m\u016Fj probl\u00E9m'). Pod \u010Darou se c\u00EDt\u00ED\u0161 bezpe\u010Dn\u011B, proto\u017Ee nic nen\u00ED tvoje chyba. Ale taky se tam nic nem\u011Bn\u00ED.\n\nNad \u010Darou jsou \u010Dty\u0159i kroky k ownership:\n\nSEE IT \u2014 Vid\u011Bt realitu tak, jak\u00E1 je, ne jak bych cht\u011Bla. Tohle je nejobt\u00ED\u017En\u011Bj\u0161\u00ED krok, proto\u017Ee vy\u017Eaduje p\u0159ipustit, \u017Ee probl\u00E9m existuje. 'Tr\u00E1v\u00EDm 4 hodiny t\u00FDdn\u011B tabulkou, kterou nikdo ne\u010Dte' \u2014 vid\u011Bt tohle bol\u00ED.\n\nOWN IT \u2014 P\u0159iznat, \u017Ee je to moje zodpov\u011Bdnost. Ne \u017Ee jsem to zp\u016Fsobila, ale \u017Ee j\u00E1 jsem ta, kdo to m\u016F\u017Ee zm\u011Bnit.\n\nSOLVE IT \u2014 Naj\u00EDt konkr\u00E9tn\u00ED \u0159e\u0161en\u00ED. Ne 'n\u011Bco se mus\u00ED zm\u011Bnit' ale 'zept\u00E1m se t\u0159\u00ED lid\u00ED, jestli tu tabulku pou\u017E\u00EDvaj\u00ED.'\n\nDO IT \u2014 Ud\u011Blat to. Ne zav\u00EDst t\u00FDden, ne 'a\u017E budu m\u00EDt \u010Das.' Ted.\n\nKl\u00ED\u010D: v\u011Bt\u0161ina lid\u00ED se zasekne na prvn\u00EDm kroku. Vid\u011Bt probl\u00E9m znamen\u00E1 p\u0159ipustit nepohodl\u00ED. Proto je tak snadn\u00E9 z\u016Fstat pod \u010Darou.",
      examples: [
        "Tabulka, kterou nikdo ne\u010Dte: SEE = 'Tr\u00E1v\u00EDm 4 hodiny t\u00FDdn\u011B zbyte\u010Dn\u011B.' OWN = 'J\u00E1 jsem ta, kdo to mus\u00ED zviditelnit nebo zru\u0161it.' SOLVE = 'Zept\u00E1m se t\u0159\u00ED lid\u00ED, jestli ji pou\u017E\u00EDvaj\u00ED.' DO = 'V p\u00E1tek se zept\u00E1m.'",
        "Konflikt se \u0161\u00E9fovou: SEE = 'N\u00E1\u0161 vztah nefunguje a j\u00E1 \u010Dek\u00E1m.' OWN = 'M\u016F\u017Eu zm\u011Bnit jak komunikuju j\u00E1.' SOLVE = 'Zavedu p\u00E1te\u010Dn\u00ED update.' DO = 'Tento p\u00E1tek po\u0161lu prvn\u00ED.'",
        "Chyb\u00ED LinkedIn strategie: SEE = 'Nem\u00E1m pl\u00E1n, improvizuju.' OWN = 'Nikdo mi ho nedal, tak ho nap\u00ED\u0161u j\u00E1.' SOLVE = 'V ned\u011Bli 2 hodiny draft.' DO = 'V pond\u011Bl\u00ED po\u0161lu \u0161\u00E9fov\u00E9.'"
      ],
      quote_cz: "Lid\u00E9, kte\u0159\u00ED \u010Dekaj\u00ED na povolen\u00ED jednat, ho nikdy nedostanou.",
      quote_en: "People who wait for permission to act never receive it.",
      quote_author: "Roger Connors",
      quote2_cz: "Ka\u017Ed\u00FD den se rozhoduji: budu nad \u010Darou, nebo pod n\u00ED?",
      quote2_en: "Every day I choose: above the line, or below it?",
      quote2_author: "Craig Hickman"
    },
    {
      id: "ch3n8", order: 8, type: "game",
      title: "4 kroky",
      subtitle: "Se\u0159a\u010F spr\u00E1vn\u011B",
      emoji: "\u{1F9E9}",
      gameType: "oz-sequence",
      gameData: {
        situations: [
          {
            situation: "LinkedIn nem\u00E1 strategii a nikdo se s tebou nekonzultuje.",
            steps: { see: "Nem\u00E1m pl\u00E1n \u2014 jen reaguji na to, co p\u0159ijde.", own: "Nikdo mi strategii ned\u00E1 \u2014 je na m\u011B ji navrhnout.", solve: "V ned\u011Bli si sednu na 2 hodiny a nap\u00ED\u0161u draft.", do: "V pond\u011Bl\u00ED po\u0161lu draft \u0161\u00E9fov\u00E9." }
          },
          {
            situation: "Tabulku p\u0159ipravuje\u0161 ka\u017Ed\u00FD t\u00FDden, ale nikdo ji ne\u010Dte.",
            steps: { see: "Tr\u00E1v\u00EDm 4 hodiny t\u00FDdn\u011B n\u011B\u010D\u00EDm zbyte\u010Dn\u00FDm.", own: "J\u00E1 jsem ta, kdo to mus\u00ED zviditelnit nebo zru\u0161it.", solve: "Zept\u00E1m se t\u0159\u00ED lid\u00ED, jestli ji pou\u017E\u00EDvaj\u00ED.", do: "V p\u00E1tek se zept\u00E1m a p\u0159\u00ED\u0161t\u00ED t\u00FDden rozhodnu." }
          },
          {
            situation: "Vztah se \u0161\u00E9fovou je nap\u00EDnat\u00FD a nikdo to ne\u0159e\u0161\u00ED.",
            steps: { see: "N\u00E1\u0161 vztah nefunguje a \u010Dek\u00E1m, a\u017E se zm\u011Bn\u00ED ona.", own: "M\u016F\u017Eu za\u010D\u00EDt od sebe \u2014 zm\u011Bnit jak komunikuju nahoru.", solve: "Zavedu p\u00E1te\u010Dn\u00ED update: 3 v\u011Bty.", do: "Tento p\u00E1tek po\u0161lu prvn\u00ED update." }
          }
        ]
      }
    },
    {
      id: "ch3n9", order: 9, type: "theory",
      title: "Intern\u00ED vs. extern\u00ED",
      subtitle: "Locus of Control",
      emoji: "\u{1F9ED}",
      principle: "Jsi pilot, ne cestuj\u00EDc\u00ED",
      content: "Psycholog Julian Rotter v 50. letech zjistil n\u011Bco z\u00E1sadn\u00EDho: lid\u00E9 se li\u0161\u00ED v tom, komu p\u0159ipisuj\u00ED v\u00FDsledky sv\u00E9ho \u017Eivota. A tento rozd\u00EDl p\u0159edpov\u00EDd\u00E1 jejich \u00FAsp\u011Bch l\u00E9pe ne\u017E IQ.\n\nExtern\u00ED locus of control: 'V\u00FDsledek z\u00E1vis\u00ED na okolnostech. Na \u0161t\u011Bst\u00ED, na \u0161\u00E9fov\u00E9, na algoritmu, na n\u00E1hod\u011B.' Kdy\u017E se n\u011Bco povede, je to \u0161t\u011Bst\u00ED. Kdy\u017E ne, m\u016F\u017Eou za to druz\u00ED.\n\nIntern\u00ED locus of control: 'V\u00FDsledek z\u00E1vis\u00ED na tom, co ud\u011Bl\u00E1m j\u00E1.' Kdy\u017E se n\u011Bco povede, v\u00EDm pro\u010D. Kdy\u017E ne, hled\u00E1m co zm\u011Bnit.\n\nPro\u010D na tom z\u00E1le\u017E\u00ED? Proto\u017Ee je to sebenaplnuj\u00EDc\u00ED proroctv\u00ED. Kdy\u017E v\u011B\u0159\u00ED\u0161, \u017Ee tvoje kroky maj\u00ED vliv, d\u011Bl\u00E1\u0161 jich v\u00EDc. Kdy\u017E d\u011Bl\u00E1\u0161 v\u00EDc krok\u016F, m\u00E1\u0161 v\u00EDc v\u00FDsledk\u016F. Kdy\u017E v\u00FDsledky p\u0159ichazej\u00ED, je\u0161t\u011B v\u00EDc v\u011B\u0159\u00ED\u0161, \u017Ee m\u00E1\u0161 vliv. A koloto\u010D se to\u010D\u00ED.\n\nD\u016Fle\u017Eit\u00E9: intern\u00ED locus nen\u00ED pozitivn\u00ED my\u0161len\u00ED ani pop\u00EDr\u00E1n\u00ED reality. Nep\u0159edst\u00EDr\u00E1\u0161, \u017Ee v\u0161echno z\u00E1vis\u00ED na tob\u011B. Uzn\u00E1v\u00E1\u0161, \u017Ee existuj\u00ED v\u011Bci mimo tvoji kontrolu \u2014 ale v\u011Bdom\u011B se soust\u0159ed\u00ED\u0161 na ty, kde m\u016F\u017Ee\u0161 jednat. To je strategick\u00E9 my\u0161len\u00ED, ne naivita.",
      examples: [
        "LinkedIn post nefungoval. Extern\u00ED: 'Algoritmus je \u0161patn\u00FD, ned\u00E1 se nic d\u011Blat.' Intern\u00ED: 'Ten hook nezaujal \u2014 p\u0159\u00ED\u0161t\u011B za\u010Dnu ot\u00E1zkou m\u00EDsto tvrzen\u00ED.'",
        "Deadline nest\u00EDh\u00E1m. Extern\u00ED: 'Dali mi m\u00E1lo \u010Dasu.' Intern\u00ED: 'Mohla jsem za\u010D\u00EDt d\u0159\u00EDv, rozd\u011Blit to na men\u0161\u00ED \u010D\u00E1sti, nebo \u0159\u00EDct ne.'",
        "\u0160\u00E9fov\u00E1 m\u011B ignoruje na porad\u011B. Extern\u00ED: 'Je takov\u00E1, nem\u00E1 m\u011B r\u00E1da.' Intern\u00ED: 'Po\u0161lu j\u00ED body den p\u0159edem, a\u0165 v\u00ED, \u017Ee m\u00E1m co \u0159\u00EDct.'"
      ],
      quote_cz: "Jsi pilot sv\u00E9ho \u017Eivota, ne cestuj\u00EDc\u00ED.",
      quote_en: "You are the pilot of your life, not a passenger.",
      quote_author: "Julian Rotter",
      quote2_cz: "Lid\u00E9, kte\u0159\u00ED v\u011B\u0159\u00ED, \u017Ee mohou ovlivnit v\u00FDsledek, ho ovliv\u0148uj\u00ED \u010Dast\u011Bji.",
      quote2_en: "Those who believe they can influence the outcome do so more often.",
      quote2_author: "Julian Rotter"
    },
    {
      id: "ch3n10", order: 10, type: "game",
      title: "Pilot nebo cestuj\u00EDc\u00ED?",
      subtitle: "Posu\u010F ka\u017Edou v\u011Btu",
      emoji: "\u2708\uFE0F",
      gameType: "locus-meter",
      gameData: {
        statements: [
          { text: "Nem\u00E1m \u010Das na strategii, proto\u017Ee m\u00E1m moc sch\u016Fzek.", correct: 15 },
          { text: "P\u0159\u00ED\u0161t\u011B zku\u0161\u00EDm jin\u00FD form\u00E1t postu, tento nefungoval.", correct: 85 },
          { text: "Kdy\u017E mi \u0161\u00E9fov\u00E1 ned\u00E1 prostor, nem\u016F\u017Eu nic zm\u011Bnit.", correct: 10 },
          { text: "Zeptala jsem se na konkr\u00E9tn\u00ED feedback po prezentaci.", correct: 90 },
          { text: "Algoritmus LinkedInu je nepredikovateln\u00FD, ned\u00E1 se pl\u00E1novat.", correct: 10 },
          { text: "P\u0159ipravila jsem si 3 body na poradu, abych dostala slovo.", correct: 90 },
          { text: "V t\u00E9hle firm\u011B se nic nezm\u011Bn\u00ED, dokud neodejde \u0161\u00E9fov\u00E1.", correct: 5 },
          { text: "Napsala jsem \u0161\u00E9fov\u00E9 p\u00E1te\u010Dn\u00ED update, i kdy\u017E se neptala.", correct: 95 }
        ]
      }
    },
    {
      id: "ch3n11", order: 11, type: "theory",
      title: "Managing Up",
      subtitle: "Mary Abbajay",
      emoji: "\u{1F4E4}",
      principle: "\u0158\u00EDd\u00ED\u0161 i vztah nahoru",
      content: "V\u011Bt\u0161ina lid\u00ED vid\u00ED vztah se \u0161\u00E9fem jako jednosm\u011Brku: on/ona d\u00E1v\u00E1 \u00FAkoly, ty je pln\u00ED\u0161. Kdy\u017E \u0161\u00E9f nekomunikuje, ned\u00E1v\u00E1 feedback nebo neocen\u00ED tvoji pr\u00E1ci, c\u00EDt\u00ED\u0161 se bezmocn\u011B. Ale co kdybys ten vztah za\u010Dala \u0159\u00EDdit TY?\n\nManaging Up nen\u00ED podl\u00E9z\u00E1n\u00ED ani manipulace. Je to profesion\u00E1ln\u00ED dovednost: v\u011Bdom\u011B \u0159\u00EDdit komunikaci a vztah se sv\u00FDm nad\u0159\u00EDzen\u00FDm tak, abys mohla d\u011Blat svou pr\u00E1ci l\u00E9pe.\n\nPro\u010D to funguje? Proto\u017Ee tv\u016Fj \u0161\u00E9f m\u00E1 patn\u00E1ct lid\u00ED a tis\u00EDc starost\u00ED. Nem\u00E1 \u010Das se pt\u00E1t ka\u017Ed\u00E9ho, co d\u011Bl\u00E1. Kdo informuje proaktivn\u011B, ten existuje. Kdo \u010Dek\u00E1, ten je neviditeln\u00FD \u2014 a pak se div\u00ED, \u017Ee ho p\u0159ehl\u00ED\u017Eej\u00ED.\n\nT\u0159i pravidla:\n\n1) INFORMUJ D\u0158\u00CDV NE\u017D SE ZEPT\u00C1. Ka\u017Ed\u00FD p\u00E1tek t\u0159i v\u011Bty mailem: co jsem ud\u011Blala, co pl\u00E1nuju, kde pot\u0159ebuju input. \u0160\u00E9fov\u00E1 to p\u0159e\u010Dte za 30 sekund \u2014 ale ten mail \u0159\u00EDk\u00E1 'j\u00E1 m\u00E1m p\u0159ehled, j\u00E1 \u0159\u00EDd\u00EDm svou pr\u00E1ci.'\n\n2) P\u0158ICH\u00C1ZEJ S \u0158E\u0160EN\u00CDM, NE S PROBL\u00C9MEM. \u0160\u00E9fov\u00E1 nechce sly\u0161et 'm\u00E1me probl\u00E9m.' Chce sly\u0161et 'm\u00E1me probl\u00E9m a navrhuji \u0159e\u0161en\u00ED A nebo B \u2014 kter\u00E9 prefere\u0161?' Tenhle rozd\u00EDl je cela kari\u00E9ra.\n\n3) ANTICIPUJ OT\u00C1ZKY. P\u0159ed ka\u017Edou poradou, ka\u017Ed\u00FDm mailem, ka\u017Ed\u00FDm 1:1 si polo\u017E: co se m\u011B zept\u00E1? A m\u011Bj odpov\u011B\u010F p\u0159ipravenou.",
      examples: [
        "M\u00EDsto '\u0161\u00E9fka se nept\u00E1 co d\u011Bl\u00E1m' \u2192 ka\u017Ed\u00FD p\u00E1tek po\u0161lu mail: 'Tento t\u00FDden: X, Y, Z. P\u0159\u00ED\u0161t\u00ED t\u00FDden: A, B. Pot\u0159ebuji: C.'",
        "M\u00EDsto '\u0161\u00E9fka m\u011B kritizuje' \u2192 na p\u0159\u00ED\u0161t\u00EDm 1:1 se zept\u00E1m: 'co konkr\u00E9tn\u011B bys cht\u011Bla p\u0159\u00ED\u0161t\u011B jinak?' A zap\u00ED\u0161u si to.",
        "M\u00EDsto '\u0161\u00E9fka m\u011B nepust\u00ED ke slovu na porad\u011B' \u2192 po\u0161lu j\u00ED body DEN P\u0158EDEM mailem.",
        "M\u00EDsto '\u0161\u00E9fka mi ned\u00E1 feedback' \u2192 po ka\u017Ed\u00E9m projektu se zept\u00E1m: 'co bylo dobr\u00E9? co p\u0159\u00ED\u0161t\u011B jinak?'"
      ],
      quote_cz: "Tv\u016Fj \u0161\u00E9f nen\u00ED zodpov\u011Bdn\u00FD za tv\u016Fj \u00FAsp\u011Bch. Ty ano.",
      quote_en: "Your boss is not responsible for your success. You are.",
      quote_author: "Mary Abbajay",
      quote2_cz: "Ne\u0159\u00EDkej \u0161\u00E9fovi probl\u00E9m bez n\u00E1vrhu \u0159e\u0161en\u00ED.",
      quote2_en: "Never bring your boss a problem without a proposed solution.",
      quote2_author: "Mary Abbajay"
    },
    {
      id: "ch3n12", order: 12, type: "game",
      title: "P\u00E1te\u010Dn\u00ED update",
      subtitle: "Sestav mail \u0161\u00E9fov\u00E9",
      emoji: "\u{1F4E7}",
      gameType: "boss-email-builder",
      prompt: "P\u00E1te\u010Dn\u00ED update je kr\u00E1tk\u00FD mail, kter\u00FD pos\u00EDl\u00E1\u0161 \u0161\u00E9fov\u00E9 ka\u017Ed\u00FD p\u00E1tek. M\u00E1 t\u0159i \u010D\u00E1sti: co jsem tento t\u00FDden ud\u011Blala, co pl\u00E1nuju p\u0159\u00ED\u0161t\u00ED t\u00FDden, kde pot\u0159ebuju tv\u016Fj input. N\u011Bkter\u00E9 v\u011Bty do mailu nepat\u0159\u00ED \u2014 jsou to v\u00FDmluvy nebo pr\u00E1zdn\u00E9 fr\u00E1ze. Ty vyhod. Rozt\u0159id fragmenty do spr\u00E1vn\u00FDch kategori\u00ED.",
      gameData: {
        fragments: [
          { text: "Tento t\u00FDden jsem dokon\u010Dila anal\u00FDzu LinkedInu za Q1.", category: "done" },
          { text: "P\u0159ipravila jsem draft nov\u00E9 obsahov\u00E9 strategie.", category: "done" },
          { text: "Nemohla jsem nic ud\u011Blat, proto\u017Ee kolega nedodal data.", category: "wrong" },
          { text: "P\u0159\u00ED\u0161t\u00ED t\u00FDden chci otestovat 3 nov\u00E9 form\u00E1ty postu.", category: "plan" },
          { text: "Pot\u0159ebovala bych tv\u016Fj feedback k draftu strategie do st\u0159edy.", category: "input" },
          { text: "Pl\u00E1nuju sch\u016Fzku s extern\u00ED agenturou na \u00FAter\u00FD.", category: "plan" },
          { text: "Snad to p\u0159\u00ED\u0161t\u00ED t\u00FDden bude lep\u0161\u00ED.", category: "wrong" },
          { text: "M\u016F\u017Ee\u0161 potvrdit priority pro Q2?", category: "input" },
          { text: "Bylo toho moc a m\u011Bla jsem m\u00E1lo \u010Dasu.", category: "wrong" },
          { text: "Vy\u0159e\u0161ila jsem blokov\u00E1n\u00ED od grafick\u00E9ho t\u00FDmu \u2014 dodaj\u00ED vizu\u00E1l do p\u00E1tku.", category: "done" }
        ]
      }
    },
    {
      id: "ch3n13", order: 13, type: "reflection",
      title: "Kde stoj\u00EDm?",
      subtitle: "Up\u0159\u00EDmn\u00E1 \u0161k\u00E1la",
      emoji: "\u{1F4CF}",
      prompt: "Na \u0161k\u00E1le 1\u201310, jak moc vlastn\u00EDm sv\u016Fj hlavn\u00ED pracovn\u00ED projekt? Co konkr\u00E9tn\u011B by znamenalo posunout se o JEDEN bod v\u00FD\u0161? Ne o p\u011Bt \u2014 o jeden. Co p\u0159esn\u011B ud\u011Bl\u00E1m tento t\u00FDden?",
      placeholder: "Moje \u010D\u00EDslo: ...\nO jeden bod v\u00FD\u0161 znamen\u00E1: ...\nTento t\u00FDden ud\u011Bl\u00E1m: ..."
    },
    {
      id: "ch3n14", order: 14, type: "challenge",
      title: "Co si odn\u00E1\u0161\u00EDm",
      subtitle: "Shrnut\u00ED kapitoly 3",
      emoji: "\u{1F3C6}",
      challengeDesc: "Zastav se a ohl\u00E9dni se za celou kapitolou. Co ses nau\u010Dila? Co t\u011B p\u0159ekvapilo? Co si odn\u00E1\u0161\u00ED\u0161 do pr\u00E1ce? Vypl\u0148 5-4-3-2-1 shrnut\u00ED.",
      challengeDays: 0
    }
  ]
};
