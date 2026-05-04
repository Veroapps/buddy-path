export type NodeType = "theory" | "game" | "reflection" | "challenge";
export interface PathNode {
  id: string; order: number; type: NodeType; title: string; subtitle: string; emoji: string;
  principle?: string; content?: string; examples?: string[];
  quote_cz?: string; quote_en?: string; quote_author?: string;
  quote2_cz?: string; quote2_en?: string; quote2_author?: string;
  gameType?: string; gameData?: unknown; prompt?: string; placeholder?: string;
  cards?: { text: string; type: "fact" | "story" }[];
  bodyAreas?: string[];
  challengeDesc?: string; challengeDays?: number;
}
export interface Chapter { id: string; number: number; title: string; subtitle: string; description: string; nodes: PathNode[]; }
export const chapter1: Chapter = {
  id: "ch1",
  number: 1,
  title: "V\u0161\u00EDmej si",
  subtitle: "Ne\u017E n\u011Bco zm\u011Bn\u00ED\u0161, mus\u00ED\u0161 to vid\u011Bt",
  description: "Nau\u010D\u00ED\u0161 se ch\u00FDtat vlastn\u00ED slova za puls a pojmenovat, co se d\u011Bje uvnit\u0159.",
  nodes: [
    {
      id: "n1", order: 1, type: "theory",
      title: "Prostor mezi",
      subtitle: "Covey \u2013 N\u00E1vyk 1",
      emoji: "\u{1F331}",
      principle: "Bu\u010F proaktivn\u00ED",
      content: "Ka\u017Ed\u00FD den reagujes na des\u00EDtky situac\u00ED. V\u011Bt\u0161inou automaticky \u2013 n\u011Bkdo t\u011B p\u0159eru\u0161\u00ED, ty se na\u0161ekne\u0161. \u0160\u00E9f n\u011Bco \u0159ekne, ty se st\u00E1hne\u0161. Ale mezi t\u00EDm, co se stane, a t\u00EDm, co ud\u011Bl\u00E1\u0161, existuje okam\u017Eik. V\u011Bt\u0161\u00ED ne\u017E si mysl\u00ED\u0161. Proaktivn\u00ED \u010Dlov\u011Bk ten okam\u017Eik vid\u00ED a pou\u017Eije ho. Reaktivn\u00ED ne \u2013 c\u00EDt\u00ED se jako loutka okolnost\u00ED.",
      examples: [
        "Kolega na porad\u011B zpochybn\u00ED tv\u016Fj n\u00E1vrh. Automatika: zrudne\u0161, ml\u010D\u00ED\u0161. Proaktivn\u011B: 'D\u00EDky za pohled. M\u016F\u017Eu vysv\u011Btlit, pro\u010D jsem to navrhla takhle?'",
        "Klient neodpov\u00EDd\u00E1 3 dny. Automatika: \u010Dek\u00E1\u0161 d\u00E1l. Proaktivn\u011B: zavol\u00E1m mu z\u00EDtra v 10, a\u0165 to nen\u00ED dal\u0161\u00ED t\u00FDden v limbu.",
        "V mailu od nad\u0159\u00EDzen\u00E9ho c\u00EDt\u00ED\u0161 podt\u00F3n kritiky. Automatika: p\u00ED\u0161e\u0161 obrannou odpov\u011B\u010F hned. Proaktivn\u011B: zav\u0159e\u0161 mail, p\u0159e\u010Dte\u0161 znovu za hodinu, odpov\u00ED\u0161 v\u011Bcn\u011B."
      ],
      quote_cz: "Nen\u00ED d\u016Fle\u017Eit\u00E9, co se ti d\u011Bje. D\u016Fle\u017Eit\u00E9 je, co s t\u00EDm d\u011Bl\u00E1\u0161.",
      quote_en: "It is not what happens to you, but how you respond.",
      quote_author: "Stephen R. Covey"
    },
    {
      id: "n2", order: 2, type: "game",
      title: "Chy\u0165 slovo",
      subtitle: "Ozna\u010D reaktivn\u00ED jazyk",
      emoji: "\u{1F3AF}",
      gameType: "highlight-words",
      gameData: {
        sentences: [
          { text: "Mus\u00EDm to dodělat do p\u00E1tku, i kdy\u017E v\u00EDm, \u017Ee to nikdo \u010D\u00EDst nebude.", reactive: ["Mus\u00EDm"] },
          { text: "Ned\u00E1 se s t\u00EDm nic d\u011Blat, \u0161\u00E9fka to chce takhle.", reactive: ["Ned\u00E1 se"] },
          { text: "On mi neodpov\u011Bd\u011Bl, tak\u017Ee \u010Dek\u00E1m d\u00E1l.", reactive: ["On mi neodpov\u011Bd\u011Bl", "\u010Dek\u00E1m d\u00E1l"] },
          { text: "V\u017Edycky to nakonec zvo\u0159\u00EDm, nem\u00E1 cenu se sna\u017Eit.", reactive: ["V\u017Edycky", "nem\u00E1 cenu"] },
          { text: "Kdyby mi dali v\u00EDc \u010Dasu, ud\u011Blala bych to l\u00EDp.", reactive: ["Kdyby mi dali"] }
        ]
      },
      content: "Zobraz\u00ED se 5 v\u011Bt z pracovn\u00EDho \u017Eivota. Klikni na slova, kter\u00E1 zn\u00ED reaktivn\u011B \u2013 slova, kde se vzd\u00E1v\u00E1\u0161 kontroly. Správn\u011B = zezelená, \u0161patn\u011B = zat\u0159ese se."
    },
    {
      id: "n3", order: 3, type: "reflection",
      title: "M\u016Fj prvn\u00ED p\u0159epis",
      subtitle: "Jazykov\u00FD detektor",
      emoji: "\u270D\uFE0F",
      prompt: "Vzpome\u0148 si na situaci z posledn\u00EDch dn\u016F, kdy jsi reagovala automaticky. Co jsi \u0159ekla nebo si pomyslela? A jak by to zn\u011Blo, kdybys m\u011Bla \u010Das se rozhodnout?",
      placeholder: "Situace: ...\nCo jsem \u0159ekla/pomyslela: ...\nKdybych m\u011Bla \u010Das: ..."
    },
    {
      id: "n4", order: 4, type: "theory",
      title: "Pojmenuj a zkrot\u00ED\u0161",
      subtitle: "Daniel Siegel",
      emoji: "\u{1F9E0}",
      principle: "Name it to tame it",
      content: "Mozek m\u00E1 zkratku: kdy\u017E c\u00EDt\u00ED\u0161 n\u011Bco siln\u00E9ho, amygdala p\u0159eb\u00EDr\u00E1 kontrolu a ty reagujes d\u0159\u00EDv ne\u017E p\u0159em\u00FD\u0161l\u00ED\u0161. Ale je tu hack \u2013 kdy\u017E emoci pojmenuje\u0161 p\u0159esn\u00FDm slovem, aktivuje\u0161 prefrontální kortex a amygdala se zti\u0161\u00ED. \u010C\u00EDm p\u0159esn\u011Bj\u0161\u00ED slovo, t\u00EDm v\u011Bt\u0161\u00ED efekt. 'Je mi blb\u011B' nepom\u016F\u017Ee. 'C\u00EDt\u00EDm hanbu, proto\u017Ee si mysl\u00EDm, \u017Ee jsem m\u011Bla reagovat rychleji' \u2013 to u\u017E ano.",
      examples: [
        "Po ne\u00FAsp\u011B\u0161n\u00E9 prezentaci: m\u00EDsto 'to bylo hrozn\u00FD' zkus 'c\u00EDt\u00EDm zklam\u00E1n\u00ED a styd\u00EDm se p\u0159ed kolegy'",
        "Kdy\u017E ti n\u011Bkdo sko\u010D\u00ED do \u0159e\u010Di: m\u00EDsto 'to m\u011B \u0161tve' zkus 'c\u00EDt\u00EDm se p\u0159ehl\u00ED\u017Eena a m\u00E1m pot\u0159ebu b\u00FDt vyslechnuta'",
        "Kdy\u017E d\u011Bl\u00E1\u0161 n\u011Bco, co t\u011B nebav\u00ED: m\u00EDsto 'nechce se mi' zkus 'c\u00EDt\u00EDm odpor k tomuhle \u00FAkolu, proto\u017Ee v n\u011Bm nevid\u00EDm smysl'"
      ],
      quote_cz: "P\u0159esn\u00E9 slovo je prvn\u00ED krok k regulaci.",
      quote_en: "Naming an emotion begins to tame it.",
      quote_author: "Daniel Siegel"
    },
    {
      id: "n5", order: 5, type: "game",
      title: "Paleta pocit\u016F",
      subtitle: "Najdi p\u0159esn\u00FD pocit",
      emoji: "\u{1F3A8}",
      gameType: "emotion-picker",
      gameData: {
        scenarios: [
          {
            situation: "Kolega ti sko\u010Dil do \u0159e\u010Di na porad\u011B.",
            topEmotions: ["frustrace", "hn\u011Bv", "bezmoc", "hanba"],
            deeperOptions: {
              frustrace: ["podr\u00E1\u017Ed\u011Bnost", "pocit nerespektu", "beznad\u011Bj", "vy\u010Derp\u00E1n\u00ED"],
              "hn\u011Bv": ["vztek na sebe", "vztek na n\u011Bj", "pocit k\u0159ivdy", "touha po odplat\u011B"],
              bezmoc: ["rezignace", "ztr\u00E1ta kontroly", "podcen\u011Bnost", "neviditelnost"],
              hanba: ["trapnost", "strach z posuzov\u00E1n\u00ED", "pocit neschopnosti", "zranitelnost"]
            }
          },
          {
            situation: "Dostala jsi mail s kritikou tv\u00E9 pr\u00E1ce.",
            topEmotions: ["zklam\u00E1n\u00ED", "strach", "\u00FAzkost", "hn\u011Bv"],
            deeperOptions: {
              "zklam\u00E1n\u00ED": ["smutek", "pocit nespravedlnosti", "vyho\u0159en\u00ED", "l\u00EDtost"],
              strach: ["strach z ne\u00FAsp\u011Bchu", "strach z hodnocen\u00ED", "panika", "ned\u016Fv\u011Bra v sebe"],
              "\u00FAzkost": ["sv\u00EDr\u00E1n\u00ED na hrudi", "neklid", "katastrofick\u00E9 my\u0161len\u00ED", "pocit ohro\u017Een\u00ED"],
              "hn\u011Bv": ["pocit k\u0159ivdy", "cynismus", "defenzivnost", "pohrdn\u00E1n\u00ED"]
            }
          },
          {
            situation: "Tv\u016Fj n\u00E1vrh v\u0161ichni na porad\u011B ignorovali.",
            topEmotions: ["smutek", "frustrace", "bezmoc", "hanba"],
            deeperOptions: {
              smutek: ["opu\u0161t\u011Bnost", "zklam\u00E1n\u00ED ze sebe", "l\u00EDtost", "pr\u00E1zdnota"],
              frustrace: ["podr\u00E1\u017Ed\u011Bnost", "pocit marn\u00E9 snahy", "vy\u010Derpanost", "rezignace"],
              bezmoc: ["neviditelnost", "podcen\u011Bnost", "ztr\u00E1ta smyslu", "beznad\u011Bj"],
              hanba: ["trapnost", "strach z posuzov\u00E1n\u00ED", "zranitelnost", "pochybnosti o sob\u011B"]
            }
          }
        ]
      },
      content: "Zobraz\u00ED se situace z pr\u00E1ce. Vyber emoci, kterou c\u00EDt\u00ED\u0161. Pak p\u016Fjde\u0161 hloub\u011Bji \u2013 vyber p\u0159esn\u011Bj\u0161\u00ED odst\u00EDn. C\u00EDl: naj\u00EDt to t\u0159et\u00ED, \u010Dtvrt\u00E9 slovo, ne prvn\u00ED, co napadne."
    },
    {
      id: "n6", order: 6, type: "reflection",
      title: "Jakou barvu m\u00E1 dnes?",
      subtitle: "Emo\u010Dn\u00ED semafor",
      emoji: "\u{1F6A6}",
      prompt: "Zastav se na chv\u00EDli. Nadechni se. Jak se pr\u00E1v\u011B te\u010F c\u00EDt\u00ED\u0161?",
      placeholder: ""
    },
    {
      id: "n7", order: 7, type: "theory",
      title: "Zat\u00EDm.",
      subtitle: "Carol Dweck \u2013 Mindset",
      emoji: "\u{1F4A1}",
      principle: "Growth mindset",
      content: "Existuj\u00ED dva zp\u016Fsoby, jak p\u0159em\u00FD\u0161let o sv\u00FDch schopnostech. Fixed: 'Takov\u00E1 prost\u011B jsem. Bu\u010F to um\u00EDm, nebo ne.' Growth: 'Tohle jsem se je\u0161t\u011B nenau\u010Dila, ale m\u016F\u017Eu.' Rozd\u00EDl nen\u00ED v talentu \u2013 je v jednom slov\u011B: ZAT\u00CDM. 'Neum\u00EDm vyjedn\u00E1vat' vs. 'Zat\u00EDm neum\u00EDm vyjedn\u00E1vat.' Prvn\u00ED v\u011Bta zav\u0159e dve\u0159e. Druh\u00E1 je nech\u00E1v\u00E1 otev\u0159en\u00E9.",
      examples: [
        "'Nejsem typ na veden\u00ED lid\u00ED.' \u2192 'Zat\u00EDm nem\u00E1m zku\u0161enosti s veden\u00EDm \u2013 ale m\u016F\u017Eu za\u010D\u00EDt s mal\u00FDm t\u00FDmem.'",
        "'Nikdy jsem nebyla dobr\u00E1 v \u010D\u00EDslech.' \u2192 '\u010C\u00EDsla mi zat\u00EDm nesednou, ale ka\u017Ed\u00E1 tabulka m\u011B posouv\u00E1.'",
        "'Nem\u00E1m na to osobnost.' \u2192 'M\u016Fj styl je jin\u00FD. To neznamen\u00E1 hor\u0161\u00ED \u2013 znamen\u00E1 to, \u017Ee hled\u00E1m sv\u016Fj zp\u016Fsob.'"
      ],
      quote_cz: "Slovo 'zat\u00EDm' nen\u00ED v\u00FDmluva. Je to pl\u00E1n.",
      quote_en: "'Yet' is not an excuse. It is a plan.",
      quote_author: "Carol Dweck"
    },
    {
      id: "n8", order: 8, type: "game",
      title: "Dopl\u0148 zat\u00EDm",
      subtitle: "Jedno slovo m\u011Bn\u00ED v\u0161e",
      emoji: "\u2728",
      gameType: "add-yet",
      gameData: {
        sentences: [
          { fixed: "Neum\u00EDm prezentovat p\u0159ed lidmi.", hint: "Zkus p\u0159idat 'zat\u00EDm' a p\u0159eformulovat" },
          { fixed: "Nejsem dost dobr\u00E1 na to, abych vedla projekt.", hint: "Co kdybys m\u011Bla \u010Das se to nau\u010Dit?" },
          { fixed: "Nedok\u00E1\u017Eu \u0159\u00EDct ne, kdy\u017E m\u011B n\u011Bkdo po\u017E\u00E1d\u00E1.", hint: "Je to dovednost, ne vlastnost" },
          { fixed: "Nem\u00E1m zku\u0161enosti se strategi\u00ED.", hint: "Ka\u017Ed\u00E1 strategie je prvn\u00ED" },
          { fixed: "Nikdy jsem nezvl\u00E1dla pracovat pod tlakem.", hint: "Co kdy\u017E jsi to je\u0161t\u011B nezkusila jinak?" },
          { fixed: "Neum\u00EDm ps\u00E1t texty, kter\u00E9 lidi zaujmou.", hint: "Ka\u017Ed\u00FD text je tr\u00E9nink" }
        ]
      },
      content: "6 v\u011Bt s fixed mindsetem. U ka\u017Ed\u00E9 napi\u0161 p\u0159epis s 'zat\u00EDm' \u2013 ale ne jen p\u0159idej slovo. P\u0159eformuluj celou v\u011Btu tak, aby otv\u00EDrala dve\u0159e. Dostane\u0161 n\u00E1pov\u011Bdu."
    },
    {
      id: "n9", order: 9, type: "theory",
      title: "\u0158\u00EDct to jinak",
      subtitle: "NVC \u2013 Crucial Conv.",
      emoji: "\u{1F54A}\uFE0F",
      principle: "Asertivn\u00ED komunikace",
      content: "N\u011Bkdy chce\u0161 \u0159\u00EDct n\u011Bco d\u016Fle\u017Eit\u00E9ho, ale vyjde to jako rozkaz. Nebo jako \u00FAtok. T\u0159i pravidla m\u011Bkk\u00E9 s\u00EDly: 1) Rozkaz zm\u011B\u0148 na n\u00E1vrh: 'mus\u00EDme' \u2192 'co kdybychom'. 2) P\u0159iznej perspektivu: p\u0159idej 'z m\u00E9ho pohledu' nebo 'jak to vid\u00EDm j\u00E1'. 3) Kon\u010Di ot\u00E1zkou: 'Co si o tom mysl\u00ED\u0161?' nebo 'Vid\u00ED\u0161 to jinak?'. Obsah z\u016Fst\u00E1v\u00E1 stejn\u00FD. \u0160ance, \u017Ee t\u011B druh\u00FD usly\u0161\u00ED, roste dramaticky.",
      examples: [
        "'Tohle se mus\u00ED p\u0159ed\u011Blat.' \u2192 'P\u0159em\u00FD\u0161l\u00EDm, jestli by nest\u00E1lo za to tohle p\u0159epracovat. Jak to vid\u00ED\u0161?'",
        "'V\u00E1\u0161 p\u0159\u00EDstup nefunguje.' \u2192 'Z m\u00E9 zku\u0161enosti tohle p\u0159in\u00E1\u0161\u00ED jin\u00E9 v\u00FDsledky, ne\u017E bychom cht\u011Bli. Co kdybychom zkusili...?'",
        "'J\u00E1 v\u00EDm, jak to m\u00E1 b\u00FDt.' \u2192 'M\u00E1m jednu zku\u0161enost, kter\u00E1 by mohla pomoct. Chce\u0161 ji sly\u0161et?'"
      ],
      quote_cz: "Nejsiln\u011Bj\u0161\u00ED v\u011Bta kon\u010D\u00ED otazn\u00EDkem.",
      quote_en: "The strongest sentence ends with a question mark.",
      quote_author: "Marshall Rosenberg"
    },
    {
      id: "n10", order: 10, type: "game",
      title: "Zm\u011Bk\u010Dova\u010D",
      subtitle: "P\u0159epis bez ztr\u00E1ty obsahu",
      emoji: "\u{1F30A}",
      gameType: "softener",
      gameData: {
        sentences: [
          { hard: "Tohle je \u0161patn\u011B, p\u0159ed\u011Blej to.", hint: "Zkus n\u00E1vrh m\u00EDsto rozkazu" },
          { hard: "V\u017Edycky to d\u011Bl\u00E1te \u0161patn\u011B.", hint: "P\u0159iznej svou perspektivu" },
          { hard: "To je hloup\u00FD n\u00E1pad.", hint: "Kon\u010Di ot\u00E1zkou" },
          { hard: "Mus\u00ED\u0161 to m\u00EDt hotov\u00E9 do z\u00EDt\u0159ka.", hint: "Zm\u011B\u0148 rozkaz na dohodu" },
          { hard: "Tohle v\u016Fbec ned\u00E1v\u00E1 smysl.", hint: "P\u0159idej 'z m\u00E9ho pohledu'" }
        ]
      },
      content: "5 tvrd\u00FDch v\u011Bt \u2013 rozkazy, \u00FAtoky, kategorick\u00E9 soudy. U ka\u017Ed\u00E9 napi\u0161 m\u011Bk\u010D\u00ED verzi, kter\u00E1 \u0159\u00EDk\u00E1 tot\u00E9\u017E, ale druh\u00FD \u010Dlov\u011Bk ji usly\u0161\u00ED. Dostane\u0161 n\u00E1pov\u011Bdu, kter\u00E9 pravidlo pou\u017E\u00EDt."
    },
    {
      id: "n11", order: 11, type: "reflection",
      title: "Zrcadlo",
      subtitle: "Co vid\u00EDm po t\u00FDdnu?",
      emoji: "\u{1FA9E}",
      prompt: "Ohl\u00E9dni se za posledn\u00EDch p\u00E1r dn\u016F. Jak\u00FD vzorec vid\u00ED\u0161 ve sv\u00E9m jazyce? Kdy reagujes automaticky? Kdy se ti poda\u0159ilo zastavit?",
      placeholder: "Vzorec, kter\u00E9ho jsem si v\u0161imla: ...\nSituace, kdy jsem se zastavila: ...\nCo chci zkusit p\u0159\u00ED\u0161t\u011B: ..."
    },
    {
      id: "n12", order: 12, type: "theory",
      title: "RAIN \u2013 2 min pro sebe",
      subtitle: "Tara Brach",
      emoji: "\u{1F327}\uFE0F",
      principle: "RAIN",
      content: "Kdy\u017E t\u011B emoce zaplav\u00ED, sta\u010D\u00ED 2 minuty a 4 kroky: R \u2013 ROZPOZNEJ: Co te\u010F c\u00EDt\u00EDm? A \u2013 AKCEPTUJ: Nech to tam b\u00FDt, neodh\u00E1n\u011Bj to. I \u2013 INVESTIGUJ: Kde to c\u00EDt\u00EDm v t\u011Ble? Tlak na hrudi? Sv\u00EDr\u00E1n\u00ED v \u017Ealudku? N \u2013 N\u00C1KLONNOST: Co bys \u0159ekla bl\u00EDzk\u00E9 kamar\u00E1dce, kter\u00E1 c\u00EDt\u00ED tot\u00E9\u017E? \u0158ekni to sob\u011B.",
      examples: [
        "P\u0159ed d\u016Fle\u017Eit\u00FDm hovorem: R: \u00FAzkost. A: 'je norm\u00E1ln\u00ED b\u00FDt nervozn\u00ED'. I: sv\u00EDr\u00E1 m\u011B \u017Ealudek. N: 'zvl\u00E1dnu to, i kdy\u017E to nebude dokonal\u00E9'.",
        "Po kritice od kolegy: R: hn\u011Bv + hanba. A: 'ob\u011B emoce d\u00E1vaj\u00ED smysl'. I: zat\u00EDn\u00E1m p\u011Bsti pod stolem. N: 'jedna kritika nen\u00ED pravda o mn\u011B'.",
        "P\u0159i prokrastinaci: R: odpor + vina. A: 'nechce se mi a je to ok'. I: t\u011B\u017Ek\u00E9 nohy, nechci vst\u00E1t. N: 'nemus\u00EDm cht\u00EDt \u2013 sta\u010D\u00ED za\u010D\u00EDt na 5 minut'."
      ],
      quote_cz: "Dv\u011B minuty mezi emoc\u00ED a reakc\u00ED zm\u011Bn\u00ED v\u0161echno.",
      quote_en: "Two minutes between emotion and reaction changes everything.",
      quote_author: "Tara Brach"
    },
    {
      id: "n13", order: 13, type: "game",
      title: "P\u0159epi\u0161 to",
      subtitle: "Rychlokolo na \u010Das!",
      emoji: "\u26A1",
      gameType: "rewrite-speed",
      gameData: {
        sentences: [
          "Mus\u00EDm mu napsat, je to otrava.",
          "\u0160\u00E9fka m\u011B zase nepustila ke slovu.",
          "Nem\u00E1m \u010Das na strategii.",
          "M\u011Bla bych to ud\u011Blat, ale fakt se mi nechce.",
          "Ten kolega se m\u011B nikdy nezept\u00E1.",
          "Po\u0159\u00E1d jen has\u00EDm po\u017E\u00E1ry.",
          "Kdyby mi dali v\u00EDc \u010Dasu, ud\u011Blala bych to l\u00EDp.",
          "V\u017Edycky to nakonec zvo\u0159\u00EDm."
        ],
        timePerSentence: 30
      },
      content: "8 reaktivn\u00EDch v\u011Bt, 30 sekund na ka\u017Edou. Napi\u0161 proaktivn\u00ED p\u0159epis. Timer b\u011B\u017E\u00ED! Na konci p\u0159ehled v\u0161ech tv\u00FDch p\u0159epis\u016F."
    },
    {
      id: "n14", order: 14, type: "challenge",
      title: "Co si odn\u00E1\u0161\u00EDm",
      subtitle: "Shrnut\u00ED kapitoly 1",
      emoji: "\u{1F3D4}\uFE0F",
      challengeDesc: "Pro\u0161la jsi celou prvn\u00ED kapitolu. Te\u010F se zastav a ohl\u00E9dni se \u2013 ne na to, co jsi 'm\u011Bla ud\u011Blat', ale na to, co se ti stalo uvnit\u0159.\n\n5 v\u011Bc\u00ED, kter\u00E9 se v t\u00E9hle kapitole prob\u00EDraly \u2013 pojmy, techniky, pohledy, kter\u00E9 jsi potkala.\n\n4 v\u011Bci, kter\u00E9 jsi u\u017E znala, ale te\u010F vid\u00ED\u0161 jinak \u2013 co ti p\u0159i\u0161lo samoz\u0159ejm\u00E9, ale kapitola to posunula.\n\n3 n\u00E1stroje, kter\u00E9 bude\u0161 pou\u017E\u00EDvat d\u00E1l \u2013 z cel\u00E9 kapitoly si vyber t\u0159i, kter\u00E9 ti d\u00E1vaj\u00ED smysl.\n\n2 v\u011Bci, kter\u00E9 t\u011B p\u0159ekvapily o sob\u011B \u2013 co jsi ne\u010Dekala, \u017Ee zjist\u00ED\u0161.\n\n1 v\u011Bta, kterou si bude\u0161 pamatovat nav\u017Edy \u2013 ta, kter\u00E1 t\u011B nejv\u00EDc zas\u00E1hla. Tvoje v\u011Bta, tv\u016Fj cit\u00E1t, tvoje pravidlo.",
      challengeDays: 0
    }
  ]
};
