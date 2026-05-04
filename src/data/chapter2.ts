import { type Chapter } from "./chapter1";

export const chapter2: Chapter = {
  id: "ch2",
  number: 2,
  title: "Vzorce",
  subtitle: "Co se opakuje a pro\u010D",
  description: "Nau\u010D\u00ED\u0161 se analyzovat syst\u00E9m za sv\u00FDmi reakcemi \u2013 vid\u011Bt vzorce, pasti my\u0161len\u00ED a kruhy, ve kter\u00FDch se to\u010D\u00ED\u0161.",
  nodes: [
    {
      id: "c2n1", order: 1, type: "theory",
      title: "Tv\u016Fj opera\u010Dn\u00ED syst\u00E9m",
      subtitle: "Argyris \u2013 espoused vs. theory-in-use",
      emoji: "\u{1F9EC}",
      principle: "Co \u0159\u00EDk\u00E1m vs. co d\u011Bl\u00E1m",
      content: "Chris Argyris, harvardsk\u00FD profesor, str\u00E1vil des\u00EDtky let studiem jednoho paradoxu: pro\u010D chyt\u0159\u00ED lid\u00E9 d\u011Blaj\u00ED hlouposti. Zjistil, \u017Ee ka\u017Ed\u00FD \u010Dlov\u011Bk m\u00E1 dv\u011B verze sebe. Prvn\u00ED je 'espoused theory' \u2013 to, co \u0159\u00EDk\u00E1\u0161, \u017Ee d\u011Bl\u00E1\u0161. 'Jsem zodpov\u011Bdn\u00E1. M\u00E1m ownership. \u0158\u00EDk\u00E1m v\u011Bci na rovinu.' Druh\u00E1 je 'theory-in-use' \u2013 to, co doopravdy d\u011Bl\u00E1\u0161, kdy\u017E t\u011B nikdo nepozoruje. \u010Cek\u00E1\u0161. Odkl\u00E1d\u00E1\u0161. Vyh\u00FDb\u00E1\u0161 se konfliktu. Rozd\u00EDl mezi t\u011Bma dv\u011Bma verzemi nen\u00ED pokrytectv\u00ED \u2013 je to slep\u00E9 m\u00EDsto. V\u011Bt\u0161ina lid\u00ED ho nem\u00E1, proto\u017Ee se nikdy nezeptali: 'D\u011Bl\u00E1m opravdu to, co \u0159\u00EDk\u00E1m, \u017Ee d\u011Bl\u00E1m?' Cel\u00E1 tahle kapitola je o tom naj\u00EDt ten rozd\u00EDl. Ne proto, aby ses trestala \u2013 ale proto, aby sis v\u011Bd\u011Bla, s \u010D\u00EDm pracuje\u0161.",
      examples: [
        "\u0158\u00EDk\u00E1\u0161: 'Chci m\u00EDt ownership nad projektem.' D\u011Bl\u00E1\u0161: \u010Dek\u00E1\u0161 na schv\u00E1len\u00ED ka\u017Ed\u00E9ho kroku, nept\u00E1\u0161 se na metriky, nenavrhujes strategii. Co kdybys z\u00EDtra p\u0159i\u0161la se t\u0159emi n\u00E1vrhy, ani\u017E by t\u011B n\u011Bkdo po\u017E\u00E1dal?",
        "\u0158\u00EDk\u00E1\u0161: 'Um\u00EDm p\u0159ijmout feedback.' D\u011Bl\u00E1\u0161: kdy\u017E ti nad\u0159\u00EDzen\u00E1 n\u011Bco \u0159ekne, cel\u00FD t\u00FDden o tom p\u0159em\u00FD\u0161l\u00ED\u0161, ale nikdy se nezept\u00E1\u0161 'co p\u0159esn\u011B m\u00E1m ud\u011Blat jinak?'",
        "\u0158\u00EDk\u00E1\u0161: 'Nejsem konfliktn\u00ED typ.' Mo\u017En\u00E1 pravda. Ale taky mo\u017En\u00E1 ne\u0159\u00EDk\u00E1\u0161, co si mysl\u00ED\u0161, a pak se div\u00ED\u0161, \u017Ee t\u011B nikdo nesly\u0161\u00ED."
      ],
      quote_cz: "Lid\u00E9 ned\u011Blaj\u00ED to, co \u0159\u00EDkaj\u00ED. D\u011Blaj\u00ED to, co se nau\u010Dili, \u017Ee funguje.",
      quote_en: "People don't do what they say. They do what they have learned works.",
      quote_author: "Chris Argyris",
      quote2_cz: "Nejv\u011Bt\u0161\u00ED p\u0159ek\u00E1\u017Eka zm\u011Bny nen\u00ED nev\u011Bd\u011Bn\u00ED. Je to iluze, \u017Ee u\u017E to d\u011Bl\u00E1m.",
      quote2_en: "The biggest obstacle to change is not ignorance. It is the illusion that I am already doing it.",
      quote2_author: "Chris Argyris"
    },
    {
      id: "c2n2", order: 2, type: "game",
      title: "Co \u0159\u00EDk\u00E1m vs. co d\u011Bl\u00E1m",
      subtitle: "6 sc\u00E9n\u00E1\u0159\u016F z pr\u00E1ce",
      emoji: "\u{1F3AD}",
      gameType: "espoused-vs-actual",
      gameData: {
        scenarios: [
          { situation: "Kolega ti po\u0161le nedod\u011Blanou pr\u00E1ci a \u010Dek\u00E1, \u017Ee to dopln\u00ED\u0161.", idealLabel: "Co bych \u0159ekla, \u017Ee ud\u011Bl\u00E1m", realLabel: "Co doopravdy ud\u011Bl\u00E1m" },
          { situation: "Na porad\u011B se prob\u00EDr\u00E1 t\u00E9ma, kde m\u00E1\u0161 jin\u00FD n\u00E1zor ne\u017E v\u011Bt\u0161ina.", idealLabel: "Co bych \u0159ekla, \u017Ee ud\u011Bl\u00E1m", realLabel: "Co doopravdy ud\u011Bl\u00E1m" },
          { situation: "Nad\u0159\u00EDzen\u00E1 ti zad\u00E1 \u00FAkol, kter\u00FD nem\u00E1 smysl a zdr\u017E\u00ED t\u011B od d\u016Fle\u017Eit\u011Bj\u0161\u00ED pr\u00E1ce.", idealLabel: "Co bych \u0159ekla, \u017Ee ud\u011Bl\u00E1m", realLabel: "Co doopravdy ud\u011Bl\u00E1m" },
          { situation: "M\u00E1\u0161 n\u00E1pad na zlep\u0161en\u00ED procesu, ale nikdo se t\u011B neptal.", idealLabel: "Co bych \u0159ekla, \u017Ee ud\u011Bl\u00E1m", realLabel: "Co doopravdy ud\u011Bl\u00E1m" },
          { situation: "Deadline se bl\u00ED\u017E\u00ED a v\u00ED\u0161, \u017Ee to nest\u00EDhne\u0161 v po\u017Eadovan\u00E9 kvalit\u011B.", idealLabel: "Co bych \u0159ekla, \u017Ee ud\u011Bl\u00E1m", realLabel: "Co doopravdy ud\u011Bl\u00E1m" },
          { situation: "Kolega opakovan\u011B neodpov\u00EDd\u00E1 na tv\u00E9 zpr\u00E1vy.", idealLabel: "Co bych \u0159ekla, \u017Ee ud\u011Bl\u00E1m", realLabel: "Co doopravdy ud\u011Bl\u00E1m" }
        ]
      },
      content: "6 re\u00E1ln\u00FDch sc\u00E9n\u00E1\u0159\u016F z pr\u00E1ce. U ka\u017Ed\u00E9ho sama napi\u0161 dv\u011B verze: 'Co bych \u0159ekla, \u017Ee ud\u011Bl\u00E1m' a 'Co doopravdy ud\u011Bl\u00E1m, kdy\u017E jsem up\u0159\u00EDmn\u00E1.' Pak u ka\u017Ed\u00E9 dvojice ohodnotí\u0161 na \u0161k\u00E1le 1\u201310, jak velk\u00E1 je mezera. Na konci ti hra uk\u00E1\u017Ee: kde \u017Eije\u0161 nejv\u00EDc v iluzi o sob\u011B."
    },
    {
      id: "c2n3", order: 3, type: "reflection",
      title: "Pitva jednoho t\u00FDdne",
      subtitle: "Tvrd\u00E1 reflexe s \u010D\u00EDsly",
      emoji: "\u{1F52C}",
      prompt: "Vezmi si posledn\u00ED pracovn\u00ED t\u00FDden. Bu\u010F up\u0159\u00EDmn\u00E1 \u2013 \u010D\u00EDsla nel\u017Eou.\n\nKolik \u00FAkol\u016F, kter\u00E9 by t\u011B skute\u010Dn\u011B posunuly (strategie, vlastn\u00ED n\u00E1vrhy, d\u016Fle\u017Eit\u00E9 konverzace), jsi re\u00E1ln\u011B ud\u011Blala?\n\nKolik hodin jsi str\u00E1vila v 'bezpe\u010Dn\u00FDch' \u010Dinnostech \u2013 tabulky, form\u00E1tov\u00E1n\u00ED, \u00FAklid inboxu, v\u011Bci kter\u00E9 se c\u00EDt\u00ED produktivn\u011B ale nic nem\u011Bn\u00ED?\n\nKde jsi \u0159ekla 'nest\u00EDh\u00E1m' \u2013 a kde by up\u0159\u00EDmn\u011Bj\u0161\u00ED slovo bylo 'nechci' nebo 'boj\u00EDm se'?\n\nCo t\u011B to u\u010D\u00ED o tob\u011B?",
      placeholder: "\u00DAkoly, kter\u00E9 m\u011B posunuly: ...\nHodiny v 'bezpe\u010Dn\u00FDch' \u010Dinnostech: ...\nKde jsem \u0159ekla 'nest\u00EDh\u00E1m' m\u00EDsto pravdy: ...\nCo m\u011B to u\u010D\u00ED: ..."
    },
    {
      id: "c2n4", order: 4, type: "theory",
      title: "Pasti my\u0161len\u00ED",
      subtitle: "Kahneman \u2013 Syst\u00E9m 1 a 2",
      emoji: "\u{1FA64}",
      principle: "Kognitivn\u00ED zkreslen\u00ED",
      content: "Daniel Kahneman, nositel Nobelovy ceny za ekonomii, str\u00E1vil 40 let studiem toho, jak mozek d\u011Bl\u00E1 rozhodnut\u00ED. Zjistil, \u017Ee mozek pracuje ve dvou re\u017Eimech. Syst\u00E9m 1 je rychl\u00FD, automatick\u00FD, l\u00EDn\u00FD \u2013 rozhoduje za tebe bez pt\u00E1n\u00ED. D\u011Bl\u00E1\u0161 ho, kdy\u017E \u0159\u00EDd\u00ED\u0161 auto, kdy\u017E reagujes na mail, kdy\u017E se na\u0161ekne\u0161 na kolegu. Syst\u00E9m 2 je pomal\u00FD, analytick\u00FD \u2013 ale zap\u00EDn\u00E1 se jen kdy\u017E mus\u00ED, proto\u017Ee stoj\u00ED hodn\u011B energie. Probl\u00E9m: v\u011Bt\u0161inu dne jede Syst\u00E9m 1. A ten m\u00E1 t\u0159i typick\u00E9 pasti.\n\nConfirmation bias (potvrzovac\u00ED zkreslen\u00ED): hled\u00E1\u0161 d\u016Fkazy pro to, \u010Demu u\u017E v\u011B\u0159\u00ED\u0161, a ignoruje\u0161 ty, kter\u00E9 ti odporuj\u00ED. Nad\u0159\u00EDzen\u00E1 t\u011B jednou za t\u00FDden pochv\u00E1l\u00ED a t\u0159ikr\u00E1t zkritizuje. Pamatuje\u0161 si jen kritiku. Ne proto, \u017Ee l\u017Ee\u0161 \u2013 proto, \u017Ee mozek hled\u00E1 d\u016Fkazy pro p\u0159\u00EDb\u011Bh 'nem\u00E1 m\u011B r\u00E1da'.\n\nSunk cost (utopen\u00E9 n\u00E1klady): 'u\u017E jsem tomu dala 3 hodiny, mus\u00EDm pokra\u010Dovat' i kdy\u017E to nikam nevede. Investovan\u00FD \u010Das 'nesm\u00ED p\u0159ij\u00EDt nazmar' \u2013 ale u\u017E p\u0159i\u0161el, a dal\u0161\u00ED hodina ho nezachr\u00E1n\u00ED.\n\nStatus quo bias (zaujatost v\u016F\u010Di sou\u010Dasn\u00E9mu stavu): 'takhle to d\u011Bl\u00E1me v\u017Edycky' jako d\u016Fvod ned\u011Blat to jinak. Mozek nesn\u00E1\u0161\u00ED zm\u011Bnu, proto\u017Ee zm\u011Bna = riziko. Ale nezm\u011Bna taky = riziko, jen ho nevid\u00ED\u0161.",
      examples: [
        "Confirmation bias: kolega ti \u0159ekl 'dobr\u00E1 pr\u00E1ce' p\u0159ed t\u00FDdnem a nad\u0159\u00EDzen\u00E1 t\u011B dnes pochv\u00E1lila za prezentaci. Ale ty si pamatuje\u0161 jen tu jednu kritiku z porady. Pro\u010D? Proto\u017Ee tv\u016Fj p\u0159\u00EDb\u011Bh zn\u00ED 'jsem tu nev\u00EDtan\u00E1' a mozek sb\u00EDr\u00E1 d\u016Fkazy.",
        "Sunk cost: pracuje\u0161 na tabulce 4 hodiny. Je zbyte\u010Dn\u00E1 \u2013 nikdo ji nepou\u017Eije. Ale 'u\u017E jsem tomu dala tolik \u010Dasu'. Tak pokra\u010Duje\u0161. A ztr\u00E1c\u00ED\u0161 dal\u0161\u00ED 2 hodiny.",
        "Status quo bias: 'P\u0159\u00EDsp\u011Bvky na soci\u00E1ln\u00ED s\u00EDt\u011B d\u011Bl\u00E1me v\u017Edycky takhle.' Pro\u010D? 'Proto\u017Ee v\u017Edycky.' To nen\u00ED d\u016Fvod. To je setrva\u010Dnost."
      ],
      quote_cz: "Jsme slep\u00ED v\u016F\u010Di vlastn\u00ED slepot\u011B.",
      quote_en: "We are blind to our own blindness.",
      quote_author: "Daniel Kahneman",
      quote2_cz: "Prvn\u00ED pravidlo: mozek nechce pravdu. Chce potvrzen\u00ED.",
      quote2_en: "The first rule: the brain does not want truth. It wants confirmation.",
      quote2_author: "Daniel Kahneman"
    },
    {
      id: "c2n5", order: 5, type: "game",
      title: "Advok\u00E1t \u010F\u00E1bla",
      subtitle: "Rozbij vlastn\u00ED p\u0159esv\u011Bd\u010Den\u00ED",
      emoji: "\u{1F9E0}",
      gameType: "devils-advocate",
      gameData: {
        beliefs: [
          "Nad\u0159\u00EDzen\u00E1 m\u011B nerespektuje.",
          "Nem\u00E1m dost zku\u0161enost\u00ED na to, abych navrhovala strategii.",
          "T\u00FDm nefunguje a j\u00E1 s t\u00EDm nic neud\u011Bl\u00E1m.",
          "Kdy\u017E \u0159eknu sv\u016Fj n\u00E1zor, bude to hor\u0161\u00ED.",
          "Ostatn\u00ED to zvl\u00E1daj\u00ED l\u00EDp ne\u017E j\u00E1."
        ],
        biasOptions: ["Confirmation bias", "Sunk cost", "Status quo bias"],
        timePerBelief: 60
      },
      content: "5 typick\u00FDch p\u0159esv\u011Bd\u010Den\u00ED. U ka\u017Ed\u00E9ho: (1) napi\u0161 2 d\u016Fkazy PRO \u2013 pro\u010D tomu v\u011B\u0159\u00ED\u0161, co to potvrzuje. (2) Napi\u0161 2 d\u016Fkazy PROTI \u2013 co to vyvrac\u00ED, jak\u00E9 d\u016Fkazy ze sv\u00E9ho \u017Eivota ignoruje\u0161. (3) Identifikuj, kter\u00E9 kognitivn\u00ED zkreslen\u00ED tvoje p\u0159esv\u011Bd\u010Den\u00ED \u017Eiv\u00ED. \u010Casov\u00FD limit 60 sekund na p\u0159esv\u011Bd\u010Den\u00ED."
    },
    {
      id: "c2n6", order: 6, type: "theory",
      title: "Pod povrch",
      subtitle: "Sakichi Toyoda \u2013 5\u00D7 pro\u010D",
      emoji: "\u26CF\uFE0F",
      principle: "5\u00D7 pro\u010D",
      content: "Sakichi Toyoda, zakladatel Toyoty, vynalezl techniku, kterou dodnes pou\u017E\u00EDv\u00E1 cel\u00FD sv\u011Bt. Je brut\u00E1ln\u011B jednoduch\u00E1: kdy\u017E m\u00E1\u0161 probl\u00E9m, zeptej se 'pro\u010D?' \u2013 a na odpov\u011B\u010F se zeptej znovu 'pro\u010D?' Opakuj p\u011Btkr\u00E1t. Prvn\u00ED odpov\u011B\u010F je v\u017Edycky povrchní \u2013 je to symptom, ne p\u0159\u00ED\u010Dina. P\u00E1t\u00E1 je v\u017Edycky hlubok\u00E1 \u2013 je to ko\u0159en.\n\nToyoda to vymyslel pro v\u00FDrobn\u00ED linky: pro\u010D se stroj zastavil? Proto\u017Ee pojistka p\u0159esko\u010Dila. Pro\u010D? Proto\u017Ee lo\u017Eisko nem\u011Blo olej. Pro\u010D? Proto\u017Ee \u010Derpadlo net\u011Bsnilo. Pro\u010D? Proto\u017Ee se \u010Derpadlo nekontrolovalo. Pro\u010D? Proto\u017Ee neexistuje harmonogram \u00FAdr\u017Eby. \u0158e\u0161en\u00ED nen\u00ED vym\u011Bnit pojistku \u2013 je zav\u00E9st harmonogram.\n\nFunguje to stejn\u011B dob\u0159e na lidi. 'Pro\u010D odkl\u00E1d\u00E1m strategii?' \u2192 'Nem\u00E1m \u010Das.' \u2192 Pro\u010D? \u2192 'D\u011Bl\u00E1m tabulky.' \u2192 Pro\u010D? \u2192 'Nad\u0159\u00EDzen\u00E1 to chce.' \u2192 'Pro\u010D jsem ne\u0159ekla, \u017Ee strategie m\u00E1 vy\u0161\u0161\u00ED prioritu?' \u2192 'Boj\u00EDm se konfliktu.' \u2192 Pro\u010D? \u2192 'Mysl\u00EDm, \u017Ee nem\u00E1m pr\u00E1vo m\u00EDt vlastn\u00ED n\u00E1zor.' P\u011Bt vrstev od 'nem\u00E1m \u010Das' ke 'nem\u00E1m pr\u00E1vo.' To je \u00FApln\u011B jin\u00FD probl\u00E9m \u2013 a \u00FApln\u011B jin\u00E9 \u0159e\u0161en\u00ED.",
      examples: [
        "'Pro\u010D nest\u00EDh\u00E1m deadliny?' \u2192 D\u011Bl\u00E1m moc v\u011Bc\u00ED naraz. \u2192 Pro\u010D? \u2192 Neum\u00EDm \u0159\u00EDct ne. \u2192 Pro\u010D? \u2192 Boj\u00EDm se, \u017Ee budu vn\u00EDm\u00E1na jako neochotn\u00E1. \u2192 Pro\u010D? \u2192 Ochota je moje identita. \u2192 Pro\u010D? \u2192 Proto\u017Ee kdy\u017E pom\u00E1h\u00E1m, c\u00EDt\u00EDm se hodnotn\u00E1. Skute\u010Dn\u00FD probl\u00E9m: sebehodnota nav\u00E1zan\u00E1 na ochotu, ne \u010Das.",
        "'Pro\u010D m\u011B \u0161tve nad\u0159\u00EDzen\u00E1?' \u2192 Kritizuje m\u011B p\u0159ed ostatn\u00EDmi. \u2192 Pro\u010D m\u011B to tak bol\u00ED? \u2192 C\u00EDt\u00EDm se pon\u00ED\u017Een\u00E1. \u2192 Pro\u010D? \u2192 Mysl\u00EDm si, \u017Ee si ostatn\u00ED pomysl\u00ED, \u017Ee jsem neschopn\u00E1. \u2192 Pro\u010D? \u2192 Sama si to mysl\u00EDm. Skute\u010Dn\u00FD probl\u00E9m: pochybnosti o sob\u011B, ne nad\u0159\u00EDzen\u00E1.",
        "'Pro\u010D nedokon\u010D\u00EDm strategii?' \u2192 Je to p\u0159\u00EDli\u0161 velk\u00E9. \u2192 Pro\u010D to nerozd\u011Bl\u00EDm? \u2192 Nev\u00EDm, kde za\u010D\u00EDt. \u2192 Pro\u010D? \u2192 Nikdo mi ne\u0159ekl, co p\u0159esn\u011B chce. \u2192 Pro\u010D jsem se nezeptala? \u2192 Boj\u00EDm se, \u017Ee ot\u00E1zka odhál\u00ED, \u017Ee nev\u00EDm, co d\u011Bl\u00E1m. Skute\u010Dn\u00FD probl\u00E9m: strach z odhalen\u00ED, ne velikost \u00FAkolu."
      ],
      quote_cz: "Opakuj 'pro\u010D' p\u011Btkr\u00E1t \u2013 prvn\u00ED odpov\u011B\u010F je v\u017Edycky symptom, ne p\u0159\u00ED\u010Dina.",
      quote_en: "Repeat 'why' five times - the first answer is always the symptom, not the cause.",
      quote_author: "Sakichi Toyoda",
      quote2_cz: "Pravda je pod p\u00E1t\u00FDm pro\u010D.",
      quote2_en: "The truth is beneath the fifth why.",
      quote2_author: "Sakichi Toyoda"
    },
    {
      id: "c2n7", order: 7, type: "reflection",
      title: "Rentgen m\u00E9ho vzorce",
      subtitle: "5 vrstev a\u017E ke ko\u0159eni",
      emoji: "\u{1FA7B}",
      prompt: "Vyber jeden opakuj\u00EDc\u00ED se probl\u00E9m ze sv\u00E9ho pracovn\u00EDho \u017Eivota. N\u011Bco, co t\u011B tr\u00E1p\u00ED opakovan\u011B \u2013 ne jednou, ale po\u0159\u00E1d dokola. A projdi 5 vrstev:\n\nProbl\u00E9m: ...\n\n1. pro\u010D: ...\n2. pro\u010D: ...\n3. pro\u010D: ...\n4. pro\u010D: ...\n5. pro\u010D: ...\n\nPosledn\u00ED odpov\u011B\u010F je v\u017Edycky o identit\u011B nebo o strachu, nikdy o okolnostech. Co jsi na\u0161la?",
      placeholder: "Probl\u00E9m: ...\n1. pro\u010D: ...\n2. pro\u010D: ...\n3. pro\u010D: ...\n4. pro\u010D: ...\n5. pro\u010D: ...\nCo jsem na\u0161la na dn\u011B: ..."
    },
    {
      id: "c2n8", order: 8, type: "theory",
      title: "Kde t\u011B to \u017Eere",
      subtitle: "Covey \u2013 Kruh vlivu",
      emoji: "\u2B55",
      principle: "Kruh vlivu vs. Kruh z\u00E1jmu",
      content: "Stephen Covey popsal dva kruhy, ve kter\u00FDch tr\u00E1v\u00EDme energii. Jsou jako dv\u011B krabice, do kter\u00FDch m\u016F\u017Ee\u0161 rozd\u011Blit v\u0161echno, co t\u011B v pr\u00E1ci (a v \u017Eivot\u011B) tr\u00E1p\u00ED.\n\nKruh z\u00E1jmu je velk\u00FD \u2013 je v n\u011Bm v\u0161echno, co t\u011B ovliv\u0148uje, ale ty to neovlivn\u00ED\u0161: n\u00E1lada nad\u0159\u00EDzen\u00E9, kolegova rychlost, firemn\u00ED politika, co si o tob\u011B mysl\u00ED ostatn\u00ED, jestli klient odpov\u00ED, jestli se zm\u011Bn\u00ED zad\u00E1n\u00ED. M\u016F\u017Ee\u0161 o tom p\u0159em\u00FD\u0161let, st\u011B\u017Eovat si, tr\u00E1pit se \u2013 ale zm\u011Bnit to nem\u016F\u017Ee\u0161.\n\nKruh vlivu je men\u0161\u00ED \u2013 je v n\u011Bm to, co re\u00E1ln\u011B m\u016F\u017Ee\u0161 ud\u011Blat: tvoje reakce, tv\u016Fj mail, tvoje ot\u00E1zka, tv\u016Fj n\u00E1vrh, tv\u016Fj \u010Das, tvoje rozhodnut\u00ED. Nic glamor\u00F3zn\u00EDho. Ale v\u0161echno, co m\u00E1 smysl.\n\nReaktivn\u00ED lid\u00E9 tr\u00E1v\u00ED v\u011Bt\u0161inu energie v kruhu z\u00E1jmu \u2013 st\u011B\u017Euj\u00ED si, \u010Dekaj\u00ED, doufaj\u00ED, \u017Ee se n\u011Bco zm\u011Bn\u00ED. Jejich kruh vlivu se zmen\u0161uje, proto\u017Ee nic ned\u011Blaj\u00ED. Proaktivn\u00ED lid\u00E9 investuj\u00ED energii do kruhu vlivu \u2013 a ten roste. Ne proto, \u017Ee zm\u011Bn\u00ED sv\u011Bt \u2013 proto, \u017Ee za\u010Dnou d\u011Blat to, co mohou.",
      examples: [
        "Kruh z\u00E1jmu: 'Nad\u0159\u00EDzen\u00E1 m\u011B hodnot\u00ED negativn\u011B ka\u017Ed\u00FD t\u00FDden.' Kruh vlivu: 'P\u0159ed hodnocen\u00EDm j\u00ED po\u0161lu mail se 3 v\u011Bcmi, kter\u00E9 jsem tento t\u00FDden posunula. A\u0165 m\u00E1 na \u010Dem stav\u011Bt, ne jen na dojmu.'",
        "Kruh z\u00E1jmu: 'T\u00FDm nefunguje, nikdo nedod\u00E1v\u00E1.' Kruh vlivu: 'Nastav\u00EDm deadline a den p\u0159edem p\u0159ipomenu. Kdy\u017E nedod\u00E1, eskaluji \u2013 ne \u010Dek\u00E1m.'",
        "Kruh z\u00E1jmu: 'Projekt nem\u016F\u017Eu \u0159\u00EDdit, nad\u0159\u00EDzen\u00E1 to chce po sv\u00FDm.' Kruh vlivu: 'P\u0159iprav\u00EDm 3 varianty s daty a d\u00E1m j\u00ED vybrat. Nechci souhlas \u2013 chci dialog.'",
        "Kruh z\u00E1jmu: 'Na porad\u011B m\u011B nikdo neposlouch\u00E1.' Kruh vlivu: 'P\u0159iprav\u00EDm si 1 jasn\u00FD bod p\u0159edem, \u0159eknu ho v prvn\u00EDch 2 minut\u00E1ch, a pak se zept\u00E1m: jak to vid\u00EDte vy?'"
      ],
      quote_cz: "Proaktivn\u00ED lid\u00E9 nos\u00ED s sebou vlastn\u00ED po\u010Das\u00ED.",
      quote_en: "Proactive people carry their own weather.",
      quote_author: "Stephen R. Covey",
      quote2_cz: "Nen\u00ED to o tom m\u00EDt v\u00EDc kontroly. Je to o tom investovat energii tam, kde kontrolu M\u00C1\u0160.",
      quote2_en: "It is not about having more control. It is about investing energy where you DO have control.",
      quote2_author: "Stephen R. Covey"
    },
    {
      id: "c2n9", order: 9, type: "game",
      title: "P\u0159et\u00E1hni do kruhu",
      subtitle: "12 situac\u00ED, 12 akc\u00ED",
      emoji: "\u26A1",
      gameType: "circle-of-influence",
      gameData: {
        situations: [
          { text: "Nad\u0159\u00EDzen\u00E1 m\u011B kritizuje p\u0159ede v\u0161emi.", default: "concern", hint: "Co m\u016F\u017Ee\u0161 ud\u011Blat TY?" },
          { text: "Kolega neodpov\u00EDd\u00E1 na m\u00E9 zpr\u00E1vy u\u017E t\u0159et\u00ED den.", default: "concern", hint: "Jak\u00FD je tv\u016Fj dal\u0161\u00ED krok?" },
          { text: "Firemn\u00ED politika se m\u011Bn\u00ED a nikdo m\u011B neinformoval.", default: "concern", hint: "Koho se m\u016F\u017Ee\u0161 zeptat?" },
          { text: "M\u00E1m pocit, \u017Ee si o mn\u011B v t\u00FDmu \u0161eptaj\u00ED.", default: "concern", hint: "Co m\u016F\u017Ee\u0161 ov\u011B\u0159it?" },
          { text: "Deadline je za 2 dny a zad\u00E1n\u00ED je nejasn\u00E9.", default: "concern", hint: "Kdo m\u00E1 informace?" },
          { text: "Prezentaci m\u016F\u017Eu p\u0159ipravit l\u00E9pe ne\u017E minule.", default: "influence", hint: "" },
          { text: "M\u016F\u017Eu se nau\u010Dit l\u00E9pe strukturovat maily.", default: "influence", hint: "" },
          { text: "Z\u00EDtra m\u00E1m poradou \u2013 p\u0159iprav\u00EDm si jeden jasn\u00FD bod.", default: "influence", hint: "" },
          { text: "Klient je nespokojen\u00FD s v\u00FDsledky kampan\u011B.", default: "concern", hint: "Co m\u016F\u017Ee\u0161 zm\u011Bnit na sv\u00E9 stran\u011B?" },
          { text: "Nad\u0159\u00EDzen\u00E1 m\u00E1 \u0161patnou n\u00E1ladu.", default: "concern", hint: "Mus\u00ED\u0161 to \u0159e\u0161it, nebo to nen\u00ED tvoje?" },
          { text: "Chci v\u00EDc odpov\u011Bdnosti, ale nikdo mi ji ned\u00E1v\u00E1.", default: "concern", hint: "Jak si ji m\u016F\u017Ee\u0161 vz\u00EDt?" },
          { text: "M\u016F\u017Eu ka\u017Ed\u00FD den str\u00E1vit 15 minut u\u010Den\u00EDm.", default: "influence", hint: "" }
        ]
      },
      content: "12 situac\u00ED ze sv\u00E9ho pracovn\u00EDho \u017Eivota. Nejd\u0159\u00EDv ka\u017Edou roztr\u00ED\u010F: kruh vlivu nebo kruh z\u00E1jmu? Pak u ka\u017Ed\u00E9 situace v kruhu z\u00E1jmu mus\u00ED\u0161 naj\u00EDt jednu konkr\u00E9tn\u00ED akci, kterou bys ji p\u0159et\u00E1hla do kruhu vlivu. Ne obecn\u011B 'budu proaktivn\u00ED' \u2013 konkr\u00E9tn\u00ED krok. Kdo, co, kdy."
    },
    {
      id: "c2n10", order: 10, type: "theory",
      title: "Stejn\u00FD film, jin\u00FD \u017E\u00E1nr",
      subtitle: "James Gross \u2013 kognitivn\u00ED p\u0159ehodnocen\u00ED",
      emoji: "\u{1F3AC}",
      principle: "Kognitivn\u00ED p\u0159ehodnocen\u00ED",
      content: "James Gross, profesor ze Stanfordu, str\u00E1vil 20 let v\u00FDzkumem toho, jak lid\u00E9 zvl\u00E1daj\u00ED emoce. Zjistil n\u011Bco podstatn\u00E9ho: emoce nejsou reakc\u00ED na situaci. Jsou reakc\u00ED na p\u0159\u00EDb\u011Bh, kter\u00FD si o situaci vypr\u00E1v\u00ED\u0161. Situace se nem\u011Bn\u00ED. P\u0159\u00EDb\u011Bh ano.\n\n'Nad\u0159\u00EDzen\u00E1 m\u011B kritizuje, proto\u017Ee m\u011B nem\u00E1 r\u00E1da' = horor. C\u00EDt\u00ED\u0161 hn\u011Bv, k\u0159ivdu, bezmoc.\n'Nad\u0159\u00EDzen\u00E1 kritizuje, proto\u017Ee neum\u00ED jinak a m\u00E1 vlastn\u00ED tlak shora' = drama. C\u00EDt\u00ED\u0161 pochopen\u00ED, mo\u017En\u00E1 l\u00EDtost.\n'Nad\u0159\u00EDzen\u00E1 mi nev\u011Bdomky d\u00E1v\u00E1 materi\u00E1l, na kter\u00E9m se u\u010D\u00EDm \u010D\u00EDst mezi \u0159\u00E1dky' = coming-of-age. C\u00EDt\u00ED\u0161 zv\u011Bdavost, mo\u017En\u00E1 i vd\u011B\u010Dnost.\n\nStejn\u00FD film. T\u0159i \u017E\u00E1nry. T\u0159i \u00FApln\u011B jin\u00E9 emoce.\n\nTohle nen\u00ED pozitivn\u00ED my\u0161len\u00ED \u2013 to je p\u0159esn\u011Bj\u0161\u00ED my\u0161len\u00ED. P\u0159ehodnocen\u00ED neznamen\u00E1 'nem\u00E1m pr\u00E1vo se zlobit.' Znamen\u00E1 'm\u00E1m v\u00EDc mo\u017Enost\u00ED, jak to vid\u011Bt, a m\u016F\u017Eu si vybrat tu, kter\u00E1 mi pom\u00E1h\u00E1 jednat, m\u00EDsto tu, kter\u00E1 m\u011B paralyzuje.'\n\nGrossovy v\u00FDzkumy ukazuj\u00ED, \u017Ee lid\u00E9, kte\u0159\u00ED pravideln\u011B pou\u017E\u00EDvaj\u00ED p\u0159ehodnocen\u00ED, maj\u00ED ni\u017E\u0161\u00ED stres, lep\u0161\u00ED vztahy a vy\u0161\u0161\u00ED v\u00FDkonnost. Ne proto, \u017Ee potla\u010Duj\u00ED emoce \u2013 proto, \u017Ee si vyb\u00EDraj\u00ED, jak\u00FD p\u0159\u00EDb\u011Bh si vypr\u00E1v\u011Bj\u00ED.",
      examples: [
        "'Kolega neodpov\u00EDd\u00E1, proto\u017Ee ho nezaj\u00EDm\u00E1m.' \u2192 Horor. 'Kolega neodpov\u00EDd\u00E1, proto\u017Ee m\u00E1 pln\u00FD inbox a moje zpr\u00E1va nebyla dost jasn\u00E1.' \u2192 Dokument. Co se zm\u011Bnilo? Nic zvenku. V\u0161echno uvnit\u0159.",
        "'Nad\u0159\u00EDzen\u00E1 mi vr\u00E1tila prezentaci s 20 p\u0159ipom\u00EDnkami. Nen\u00ED spokojen\u00E1, nikdy nebude.' \u2192 Horor. 'Str\u00E1vila \u010Das t\u00EDm, \u017Ee mi napsala 20 konkr\u00E9tn\u00EDch bod\u016F. Mohla \u0159\u00EDct jen \u2013 p\u0159ed\u011Blej to.' \u2192 Coming-of-age.",
        "'Na porad\u011B ml\u010Deli, kdy\u017E jsem prezentovala. Asi to bylo \u0161patn\u00E9.' \u2192 Horor. 'Ml\u010Deli, proto\u017Ee p\u0159em\u00FD\u0161leli. Nebo proto\u017Ee to bylo jasn\u00E9 a nem\u011Bli co dodat.' \u2192 Dokument. Kter\u00FD p\u0159\u00EDb\u011Bh si vybere\u0161, ten \u017Eije."
      ],
      quote_cz: "Zm\u011Bn\u00ED\u0161-li p\u0159\u00EDb\u011Bh, zm\u011Bn\u00ED\u0161 emoci \u2013 beze zm\u011Bny situace.",
      quote_en: "Change the story, change the emotion - without changing the situation.",
      quote_author: "James Gross",
      quote2_cz: "Netr\u00E1p\u00ED n\u00E1s v\u011Bci, ale to, co si o nich mysl\u00EDme.",
      quote2_en: "It is not things that disturb us, but our judgments about things.",
      quote2_author: "Epikt\u00E9tos"
    },
    {
      id: "c2n11", order: 11, type: "game",
      title: "T\u0159i \u017E\u00E1nry",
      subtitle: "Horor, dokument, coming-of-age",
      emoji: "\u{1F3AC}",
      gameType: "three-genres",
      gameData: {
        situations: [
          "Na porad\u011B ti nad\u0159\u00EDzen\u00E1 \u0159ekla 'tohle mus\u00ED\u0161 p\u0159ed\u011Blat' p\u0159ed cel\u00FDm t\u00FDmem.",
          "Poslala jsi n\u00E1vrh a u\u017E t\u0159i dny nikdo nereagoval.",
          "Kolega dostal projekt, o kter\u00FD jsi stála ty.",
          "Na t\u00FDmov\u00E9m callu jsi \u0159ekla n\u011Bco a v\u0161ichni ml\u010Deli."
        ],
        genres: ["horor", "dokument", "coming-of-age"]
      },
      content: "4 re\u00E1ln\u00E9 situace z pr\u00E1ce. U ka\u017Ed\u00E9 napi\u0161 t\u0159i verze p\u0159\u00EDb\u011Bhu: (1) HOROR \u2013 nejhor\u0161\u00ED interpretace, ta, kterou si obvykle vypr\u00E1v\u00ED\u0161. (2) DOKUMENT \u2013 co se objektivn\u011B stalo, fakta bez interpretace. (3) COMING-OF-AGE \u2013 co m\u011B tahle situace u\u010D\u00ED, jak m\u011B posouv\u00E1. Pak u ka\u017Ed\u00E9 trojice ozna\u010D\u00ED\u0161: kterou verzi si vypr\u00E1v\u00EDm automaticky?"
    },
    {
      id: "c2n12", order: 12, type: "challenge",
      title: "Co si odn\u00E1\u0161\u00EDm",
      subtitle: "Shrnut\u00ED kapitoly 2",
      emoji: "\u{1F3D4}\uFE0F",
      challengeDesc: "Pro\u0161la jsi celou druhou kapitolu. Tohle nen\u00ED test \u2013 je to zrcadlo. Zastav se a ohl\u00E9dni se.\n\n5 v\u011Bc\u00ED, kter\u00E9 se v t\u00E9hle kapitole prob\u00EDraly \u2013 pojmy, techniky, pohledy, kter\u00E9 jsi potkala.\n\n4 v\u011Bci, kter\u00E9 jsi u\u017E znala, ale te\u010F vid\u00ED\u0161 jinak \u2013 co ti p\u0159i\u0161lo samoz\u0159ejm\u00E9, ale kapitola to posunula.\n\n3 n\u00E1stroje, kter\u00E9 bude\u0161 pou\u017E\u00EDvat d\u00E1l \u2013 z cel\u00E9 kapitoly si vyber t\u0159i, kter\u00E9 ti d\u00E1vaj\u00ED smysl.\n\n2 v\u011Bci, kter\u00E9 t\u011B p\u0159ekvapily o sob\u011B \u2013 co jsi ne\u010Dekala, \u017Ee zjist\u00ED\u0161.\n\n1 v\u011Bta, kterou si bude\u0161 pamatovat nav\u017Edy \u2013 ta, kter\u00E1 t\u011B nejv\u00EDc zas\u00E1hla. Tvoje v\u011Bta, tv\u016Fj cit\u00E1t, tvoje pravidlo.",
      challengeDays: 0
    }
  ]
};
