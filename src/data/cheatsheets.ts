export interface CheatMethod {
  name: string;
  emoji: string;
  oneliner: string;
  steps?: string[];
  tip: string;
  quote?: string;
  quoteAuthor?: string;
}

export interface CheatSheet {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  tagline: string;
  keyInsight: string;
  methods: CheatMethod[];
}

export const CHEAT_SHEETS: CheatSheet[] = [
  {
    chapterId: "ch1",
    chapterNumber: 1,
    chapterTitle: "Všimej si",
    accentColor: "#0C447C",
    accentBg: "#E6F1FB",
    accentBorder: "#B5D4F4",
    tagline: "Než něco změníš, musíš to vidět.",
    keyInsight: "Mezi tím, co se stane, a tím, co uděláš, existuje prostor. Ten prostor jsi ty.",
    methods: [
      {
        name: "Prostor mezi",
        emoji: "🌱",
        oneliner: "Covey — mezi podnětem a reakcí je okamžik, který si můžeš vzít.",
        tip: "Všimni si, kdy reaguješ automaticky. Stačí si to pojmenovat — to už je první krok.",
        quote: "Není důležité, co se ti děje. Důležité je, co s tím děláš.",
        quoteAuthor: "Stephen R. Covey",
      },
      {
        name: "Name it to tame it",
        emoji: "🧠",
        oneliner: "Siegel — pojmenuj emoci přesným slovem a amygdala se ztíší.",
        steps: [
          "Zastav se — co teď cítíš?",
          "Najdi přesnější slovo než \"je mi blbě\"",
          "Řekni to nahlas nebo zapiš: \"Cítím zklamání, protože...\"",
        ],
        tip: "Čím konkrétnější slovo, tím větší efekt. \"Cítím hanbu\" funguje lépe než \"je mi špatně\".",
      },
      {
        name: "RAIN",
        emoji: "🌧️",
        oneliner: "Tara Brach — 4 kroky pro chvíle, kdy tě emoce zaplavují.",
        steps: [
          "R — Rozpoznej: Co teď cítím?",
          "A — Akceptuj: Nech to tam být, neodháněj to.",
          "I — Investiguj: Kde to cítím v těle? (hrudník, žaludek...)",
          "N — Náklonnost: Co bys řekla blízké kamarádce, která cítí totéž? Řekni to sobě.",
        ],
        tip: "Stačí 2 minuty. Nejlepší před důležitým hovorem nebo po těžké situaci.",
        quote: "Dvě minuty mezi emocí a reakcí změní všechno.",
        quoteAuthor: "Tara Brach",
      },
      {
        name: "Slovo \"zatím\"",
        emoji: "✨",
        oneliner: "Dweck — jedno slovo mění fixed mindset na growth mindset.",
        steps: [
          "Neumím vyjednávat. → Zatím neumím vyjednávat.",
          "Nejsem typ na vedení. → Zatím nemám zkušenosti.",
          "Nikdy mě neposlouchají. → Zatím nenacházím způsob.",
        ],
        tip: "\"Zatím\" není výmluva. Je to plán.",
        quote: "Slovo \"zatím\" otevírá dveře k budoucnosti.",
        quoteAuthor: "Carol Dweck",
      },
      {
        name: "Změkčovač",
        emoji: "🌊",
        oneliner: "NVC — řekni totéž, ale tak, aby tě druhý slyšel.",
        steps: [
          "Rozkaz → návrh: \"musíme\" → \"co kdybychom\"",
          "Přiznej perspektivu: \"z mého pohledu\" / \"jak to vidím já\"",
          "Konči otázkou: \"Jak to vidíš ty?\" / \"Vidíš to jinak?\"",
        ],
        tip: "Obsah zůstává stejný. Šance, že tě druhý uslyší, roste dramaticky.",
        quote: "Nejsilnější věta končí otazníkem.",
        quoteAuthor: "Marshall Rosenberg",
      },
    ],
  },
  {
    chapterId: "ch2",
    chapterNumber: 2,
    chapterTitle: "Vzorce",
    accentColor: "#085041",
    accentBg: "#E1F5EE",
    accentBorder: "#9FE1CB",
    tagline: "Co se opakuje a proč.",
    keyInsight: "Největší překážka změny není nevědění. Je to iluze, že to už dělám.",
    methods: [
      {
        name: "Espoused vs. actual",
        emoji: "🧬",
        oneliner: "Argyris — co říkám, že dělám vs. co doopravdy dělám.",
        steps: [
          "Vyber jedno tvrzení o sobě (\"Mám ownership\")",
          "Popiš, co to znamená konkrétně v chování",
          "Porovnej s tím, co jsi udělala v posledním týdnu",
          "Rozdíl není pokrytectví — je to slepé místo",
        ],
        tip: "Otázka k zamyšlení: \"Dělám opravdu to, co říkám, že dělám?\"",
        quote: "Největší překážka změny není nevědění. Je to iluze, že to už dělám.",
        quoteAuthor: "Chris Argyris",
      },
      {
        name: "5× proč",
        emoji: "🔍",
        oneliner: "Toyota metoda — zeptej se proč 5× za sebou, abys našla skutečnou příčinu.",
        steps: [
          "Popiš problém konkrétně (ne obecně)",
          "Zeptej se: \"Proč se to děje?\"",
          "Na každou odpověď znovu: \"A proč tohle?\"",
          "Opakuj 5× — dokud nedojdeš k něčemu, co lze změnit",
        ],
        tip: "Pokud se ve 3. nebo 4. proč dostaneš k sobě — to je ten správný moment.",
      },
      {
        name: "Confirmation bias",
        emoji: "🪞",
        oneliner: "Mozek automaticky hledá důkazy pro to, čemu už věří — a ignoruje ostatní.",
        steps: [
          "Všimni si svého příběhu o situaci",
          "Ptej se: \"Jaký důkaz by mě přesvědčil, že se mýlím?\"",
          "Hledej aktivně opačné příklady",
        ],
        tip: "Nejsilnější bias je ten, který nevidíme — proto si ho musíme pojmenovávat nahlas.",
      },
      {
        name: "Kruh zájmu vs. vlivu",
        emoji: "🎯",
        oneliner: "Covey — rozlišuj, co tě trápí od toho, co reálně ovlivníš.",
        steps: [
          "Napiš, co tě aktuálně trápí nebo bere energii",
          "Každá věc: \"Mohu to přímo ovlivnit svými činy?\"",
          "ANO → kruh vlivu: jednej",
          "NE → kruh zájmu: pusť to, nebo najdi, co z toho ovlivnit JDE",
        ],
        tip: "Energie do kruhu zájmu unavuje. Energie do kruhu vlivu posouvá.",
        quote: "Proaktivní lidé nosí s sebou vlastní počasí.",
        quoteAuthor: "Stephen R. Covey",
      },
      {
        name: "Tři žánry",
        emoji: "🎬",
        oneliner: "Gross — emoce nejsou reakcí na situaci, ale na příběh, který si o ní vyprávíš.",
        steps: [
          "Horor — nejhorší interpretace, ta automatická",
          "Dokument — co se objektivně stalo, fakta bez interpretace",
          "Coming-of-age — co mě tahle situace učí, jak mě posouvá",
          "Kterou verzi si chci vybrat?",
        ],
        tip: "Tohle není pozitivní myšlení — je to přesnější myšlení. Máš víc možností, jak to vidět.",
        quote: "Změníš-li příběh, změníš emoci — beze změny situace.",
        quoteAuthor: "James Gross",
      },
    ],
  },
];
