export type NodeType = "theory" | "game" | "reflection" | "challenge";
export interface PathNode {
  id: string; order: number; type: NodeType; title: string; subtitle: string; emoji: string;
  principle?: string; content?: string; examples?: string[];
  quote_cz?: string; quote_en?: string; quote_author?: string;
  quote2_cz?: string; quote2_en?: string; quote2_author?: string;
  gameType?: string; prompt?: string; placeholder?: string;
  challengeDesc?: string; challengeDays?: number;
}
export interface Chapter { id: string; number: number; title: string; subtitle: string; description: string; nodes: PathNode[]; }
export const chapter1: Chapter = {
  id: "ch1",
  number: 1,
  title: "Vs\u00EDmej si",
  subtitle: "Ne\u017E n\u011Bco zm\u011Bn\u00ED\u0161, mus\u00ED\u0161 to vid\u011Bt",
  description: "Nau\u010D\u00ED\u0161 se ch\u00FDtat vlastn\u00ED slova za puls a pojmenovat, co se d\u011Bje uvnit\u0159.",
  nodes: [
    {
      id: "n1", order: 1, type: "theory",
      title: "Prostor mezi",
      subtitle: "Covey \u00B7 N\u00E1vyk 1",
      emoji: "\u{1F331}",
      principle: "Bu\u010F proaktivn\u00ED",
      content: "Ka\u017Ed\u00FD den reagujes na des\u00EDtky situac\u00ED. V\u011Bt\u0161inou automaticky \u2014 n\u011Bkdo t\u011B p\u0159eru\u0161\u00ED, ty se na\u0161ekne\u0161. \u0160\u00E9f n\u011Bco \u0159ekne, ty se st\u00E1hne\u0161. Ale mezi t\u00EDm, co se stane, a t\u00EDm, co ud\u011Bl\u00E1\u0161, existuje okam\u017Eik. V\u011Bt\u0161\u00ED ne\u017E si mysl\u00ED\u0161. Proaktivn\u00ED \u010Dlov\u011Bk ten okam\u017Eik vid\u00ED a pou\u017Eije ho. Reaktivn\u00ED ne \u2014 c\u00EDt\u00ED se jako loutka okolnost\u00ED.",
      examples: [
        "Kolega na porad\u011B zpochybn\u00ED tv\u016Fj n\u00E1vrh. Automatika: zrudne\u0161, ml\u010D\u00ED\u0161. Proaktivn\u011B: 'D\u00EDky za pohled. M\u016F\u017Eu vysv\u011Btlit, pro\u010D jsem to navrhla takhle?'",
        "Klient neodpov\u00EDD\u00E1 3 dny. Automatika: \u010Dek\u00E1\u0161 d\u00E1l. Proaktivn\u011B: zavol\u00E1m mu z\u00EDtra v 10, a\u0165 to nen\u00ED dal\u0161\u00ED t\u00FDden v limbu.",
        "V mailu od nad\u0159\u00EDzen\u00E9ho c\u00EDt\u00ED\u0161 podt\u00F3n kritiky. Automatika: p\u00ED\u0161e\u0161 obrannou odpov\u011B\u010F hned. Proaktivn\u011B: zav\u0159e\u0161 mail, p\u0159e\u010Dte\u0161 znovu za hodinu, odpov\u00ED\u0161 v\u011Bcn\u011B."
      ],
      quote2_cz: "Svoboda je to, co ud\u011Bl\u00E1\u0161 s t\u00EDm, co se ti stalo.", quote2_en: "Freedom is what you do with what has been done to you.", quote2_author: "Jean-Paul Sartre",
      quote_cz: "Nen\u00ED d\u016Fle\u017Eit\u00E9, co se ti d\u011Bje. D\u016Fle\u017Eit\u00E9 je, co s t\u00EDm d\u011Bl\u00E1\u0161.", quote_en: "It is not what happens to you, but how you respond.", quote_author: "Stephen R. Covey"
    },
    { id: "n2", order: 2, type: "game", title: "Chy\u0165 slovo", subtitle: "Ozna\u010D reaktivn\u00ED jazyk", emoji: "\u{1F3AF}", gameType: "highlight-words" },
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
      subtitle: "Daniel Siegel \u00B7 neurov\u011Bda",
      emoji: "\u{1F9E0}",
      principle: "Name it to tame it",
      content: "Mozek m\u00E1 zkratku: kdy\u017E c\u00EDt\u00ED\u0161 n\u011Bco siln\u00E9ho, amygdala p\u0159eb\u00EDr\u00E1 kontrolu a ty reaguje\u0161 d\u0159\u00EDv ne\u017E p\u0159em\u00FD\u0161l\u00ED\u0161. Ale je tu hack \u2014 kdy\u017E emoci pojmenuje\u0161 p\u0159esn\u00FDm slovem, aktivuje\u0161 prefront\u00E1ln\u00ED kortex a amygdala se zti\u0161\u00ED. \u010C\u00EDm p\u0159esn\u011Bj\u0161\u00ED slovo, t\u00EDm v\u011Bt\u0161\u00ED efekt.",
      examples: [
        "Po ne\u00FAsp\u011B\u0161n\u00E9 prezentaci: m\u00EDsto 'to bylo hrozn\u00FD' zkus 'c\u00EDt\u00EDm zklam\u00E1n\u00ED a styd\u00EDm se p\u0159ed kolegy'",
        "Kdy\u017E ti n\u011Bkdo sko\u010D\u00ED do \u0159e\u010Di: m\u00EDsto 'to m\u011B \u0161tve' zkus 'c\u00EDt\u00EDm se p\u0159ehl\u00ED\u017Een\u00E1 a m\u00E1m pot\u0159ebu b\u00FDt vyslechnuta'",
        "Kdy\u017E d\u011Bl\u00E1\u0161 n\u011Bco, co t\u011B nebav\u00ED: m\u00EDsto 'nechce se mi' zkus 'c\u00EDt\u00EDm odpor k t\u00E9to pr\u00E1ci, proto\u017Ee v n\u00ED nevid\u00EDm smysl'"
      ],
      quote2_cz: "Emoce, kter\u00E9 nepojmenuje\u0161, t\u011B \u0159\u00EDd\u00ED. Emoce, kter\u00E9 pojmenuje\u0161, \u0159\u00EDd\u00ED\u0161 ty.", quote2_en: "Unnamed emotions control you. Named emotions you control.", quote2_author: "Marc Brackett",
      quote_cz: "P\u0159esn\u00E9 slovo je prvn\u00ED krok k regulaci.", quote_en: "Naming an emotion begins to tame it.", quote_author: "Daniel Siegel"
    },
    { id: "n5", order: 5, type: "game", title: "Paleta pocit\u016F", subtitle: "Vyber p\u0159esn\u00FD pocit", emoji: "\u{1F3A8}", gameType: "emotion-picker" },
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
      subtitle: "Carol Dweck \u00B7 Mindset",
      emoji: "\u{1F4A1}",
      principle: "R\u016Fstov\u00E9 my\u0161len\u00ED",
      content: "Existuj\u00ED dva zp\u016Fsoby, jak p\u0159em\u00FD\u0161let o sv\u00FDch schopnostech. Fixed: 'Takov\u00E1 prost\u011B jsem. Bu\u010F to um\u00EDm, nebo ne.' Growth: 'Tohle jsem se je\u0161t\u011B nenau\u010Dila, ale m\u016F\u017Eu.' Rozd\u00EDl nen\u00ED v talentu \u2014 je v jednom slov\u011B: ZAT\u00CDM.",
      examples: [
        "'Nejsem typ na veden\u00ED lid\u00ED.' \u2192 'Zat\u00EDm nem\u00E1m zku\u0161enosti s veden\u00EDm \u2014 ale m\u016F\u017Eu za\u010D\u00EDt s mal\u00FDm t\u00FDmem.'",
        "'Nikdy jsem nebyla dobr\u00E1 v \u010D\u00EDslech.' \u2192 '\u010C\u00EDsla mi zat\u00EDm nesednou, ale ka\u017Ed\u00E1 tabulka m\u011B posouv\u00E1.'",
        "'Nem\u00E1m na to osobnost.' \u2192 'M\u016Fj styl je jin\u00FD. To neznamen\u00E1 hor\u0161\u00ED \u2014 hled\u00E1m sv\u016Fj zp\u016Fsob.'"
      ],
      quote2_cz: "Nejde o to b\u00FDt nejlep\u0161\u00ED. Jde o to b\u00FDt lep\u0161\u00ED ne\u017E v\u010Dera.", quote2_en: "It is not about being the best. It is about being better than yesterday.", quote2_author: "Carol Dweck",
      quote_cz: "Slovo 'zat\u00EDm' nen\u00ED v\u00FDmluva. Je to pl\u00E1n.", quote_en: "'Yet' is not an excuse. It is a plan.", quote_author: "Carol Dweck"
    },
    { id: "n8", order: 8, type: "game", title: "Dopl\u0148 zat\u00EDm", subtitle: "Jedno slovo m\u011Bn\u00ED v\u0161e", emoji: "\u2728", gameType: "add-yet" },
    {
      id: "n9", order: 9, type: "theory",
      title: "\u0158\u00EDct to jinak",
      subtitle: "NVC \u00B7 Crucial Conversations",
      emoji: "\u{1F54A}\uFE0F",
      principle: "Asertivn\u00ED komunikace",
      content: "N\u011Bkdy chce\u0161 \u0159\u00EDct n\u011Bco d\u016Fle\u017Eit\u00E9ho, ale vyjde to jako rozkaz. T\u0159i pravidla m\u011Bkk\u00E9 s\u00EDly: 1) Rozkaz zm\u011B\u0148 na n\u00E1vrh: 'mus\u00EDme' \u2192 'co kdybychom'. 2) P\u0159iznej perspektivu: p\u0159idej 'z m\u00E9ho pohledu'. 3) Kon\u010Di ot\u00E1zkou: 'Jak to vid\u00ED\u0161 ty?'",
      examples: [
        "'Tohle se mus\u00ED p\u0159ed\u011Blat.' \u2192 'P\u0159em\u00FD\u0161l\u00EDm, jestli by nest\u00E1lo za to tohle p\u0159epracovat. Jak to vid\u00ED\u0161?'",
        "'V\u00E1\u0161 p\u0159\u00EDstup nefunguje.' \u2192 'Z m\u00E9 zku\u0161enosti tohle p\u0159in\u00E1\u0161\u00ED jin\u00E9 v\u00FDsledky, ne\u017E bychom cht\u011Bli.'",
        "'J\u00E1 v\u00EDm, jak to m\u00E1 b\u00FDt.' \u2192 'M\u00E1m jednu zku\u0161enost, kter\u00E1 by mohla pomoct. Chce\u0161 ji sly\u0161et?'"
      ],
      quote2_cz: "Mezi t\u00EDm, co chce\u0161 \u0159\u00EDct, a t\u00EDm, co druh\u00FD sly\u0161\u00ED, je cel\u00FD sv\u011Bt.", quote2_en: "Between what you want to say and what the other hears lies a whole world.", quote2_author: "Marshall Rosenberg",
      quote_cz: "Nejsiln\u011Bj\u0161\u00ED v\u011Bta kon\u010D\u00ED ot\u00E1zn\u00EDkem.", quote_en: "The strongest sentence ends with a question mark.", quote_author: "Marshall Rosenberg"
    },
    { id: "n10", order: 10, type: "game", title: "Zm\u011Bk\u010Dova\u010D", subtitle: "P\u0159epi\u0161 bez ztr\u00E1ty obsahu", emoji: "\u{1F30A}", gameType: "softener" },
    {
      id: "n11", order: 11, type: "reflection",
      title: "Zrcadlo",
      subtitle: "Co vid\u00EDm po t\u00FDdnu?",
      emoji: "\u{1FA9E}",
      prompt: "Ohl\u00E9dni se za posledn\u00EDch p\u00E1r dn\u016F. Jak\u00FD vzorec vid\u00ED\u0161 ve sv\u00E9m jazyce? Kdy reaguje\u0161 automaticky? Kdy se ti poda\u0159ilo zastavit?",
      placeholder: "Vzorec, kter\u00E9ho jsem si v\u0161imla: ...\nSituace, kdy jsem se zastavila: ...\nCo chci zkusit p\u0159\u00ED\u0161t\u011B: ..."
    },
    {
      id: "n12", order: 12, type: "theory",
      title: "RAIN \u2014 2 minuty pro sebe",
      subtitle: "Tara Brach \u00B7 mindfulness",
      emoji: "\u{1F327}\uFE0F",
      principle: "RAIN",
      content: "Kdy\u017E t\u011B emoce zaplav\u00ED, sta\u010D\u00ED 2 minuty a 4 kroky: R \u2014 ROZPOZNEJ: Co te\u010F c\u00EDt\u00EDm? A \u2014 AKCEPTUJ: Nech to tam b\u00FDt, neodh\u00E1n\u011Bj to. I \u2014 INVESTIGUJ: Kde to c\u00EDt\u00EDm v t\u011Ble? Tlak na hrudi? Sv\u00EDr\u00E1n\u00ED v \u017Ealudku? N \u2014 N\u00C1KLONNOST: Co bys \u0159ekla bl\u00EDzk\u00E9 kamar\u00E1dce, kter\u00E1 c\u00EDt\u00ED tot\u00E9\u017E? \u0158ekni to sob\u011B.",
      examples: [
        "P\u0159ed d\u016Fle\u017Eit\u00FDm hovorem: R: \u00FAzkost. A: 'je norm\u00E1ln\u00ED b\u00FDt nervozn\u00ED'. I: sv\u00EDr\u00E1 m\u011B \u017Ealudek. N: 'zvl\u00E1dnu to, i kdy\u017E to nebude dokonal\u00E9'.",
        "Po kritice od kolegy: R: hn\u011Bv + hanba. A: 'ob\u011B emoce d\u00E1vaj\u00ED smysl'. I: zat\u00EDn\u00E1m p\u011Bsti pod stolem. N: 'jedna kritika nen\u00ED pravda o m\u011B'.",
        "P\u0159i prokrastinaci: R: odpor + vina. A: 'nechce se mi a je to ok'. I: t\u011B\u017Ek\u00E9 nohy. N: 'nemus\u00EDm cht\u00EDt \u2014 sta\u010D\u00ED za\u010D\u00EDt na 5 minut'."
      ],
      quote2_cz: "Nem\u016F\u017Ee\u0161 zastavit vlny, ale m\u016F\u017Ee\u0161 se nau\u010Dit surfovat.", quote2_en: "You cannot stop the waves, but you can learn to surf.", quote2_author: "Jon Kabat-Zinn",
      quote_cz: "Dv\u011B minuty mezi emoc\u00ED a reakc\u00ED zm\u011Bn\u00ED v\u0161echno.", quote_en: "Two minutes between emotion and reaction changes everything.", quote_author: "Tara Brach"
    },
    { id: "n13", order: 13, type: "game", title: "P\u0159epi\u0161 to", subtitle: "Rychlokolo na \u010Das!", emoji: "\u26A1", gameType: "rewrite-speed" },
    {
      id: "n14", order: 14, type: "challenge",
      title: "5 dn\u00ED, 5 z\u00E1pis\u016F",
      subtitle: "Odemkni kapitolu 2",
      emoji: "\u{1F3C6}",
      challengeDesc: "P\u011Bt dn\u00ED za sebou ud\u011Blej dv\u011B v\u011Bci: zachy\u0165 jednu v\u011Btu v Detektoru a zaznamenej sv\u016Fj pocit v Semaforu. Nemus\u00ED to b\u00FDt dokonal\u00E9. Sta\u010D\u00ED si v\u0161imnout.",
      challengeDays: 5
    }
  ]
};
