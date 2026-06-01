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

  // ─── KAPITOLA 3 — OWNERSHIP ─────────────────────────────────────────────────
  {
    chapterId: "ch3",
    chapterNumber: 3,
    chapterTitle: "Ownership",
    accentColor: "#1D6B42",
    accentBg: "#E3F4EF",
    accentBorder: "#9FD4C0",
    tagline: "Přestaň čekat, začni vlastnit.",
    keyInsight: "Když je to jejich chyba, jsi bezmocná. Když je to tvoje zodpovědnost — i za to, co nezavinila — můžeš něco změnit.",
    methods: [
      {
        name: "Kruh vlivu — pokročile",
        emoji: "🎯",
        oneliner: "Covey — každá situace patří do kruhu zájmu nebo vlivu. Tvoje energie rozhoduje, který roste.",
        steps: [
          "Popiš, co tě aktuálně trápí nebo stresuje",
          "Zeptej se: mohu to změnit svými činy?",
          "ANO → kruh vlivu: co konkrétně udělám?",
          "NE → kruh zájmu: najdi, co z okraje ovlivnit JDE, a pusť zbytek",
        ],
        tip: "Proaktivní lidé neignorují kruh zájmu — jen do něj neinvestují energii. Soustředí se na to, kde mají moc.",
        quote: "Proaktivní lidé nosí počasí v sobě.",
        quoteAuthor: "Stephen R. Covey",
      },
      {
        name: "Extreme Ownership",
        emoji: "🏋️",
        oneliner: "Willink — přebírám zodpovědnost za vše ve své sféře, i za to, co není moje chyba.",
        steps: [
          "Vyber situaci, kde viniš někoho jiného",
          "Zeptej se: co jsem mohla udělat jinak JÁ?",
          "Najdi alespoň jeden bod, kde si mohla jednat",
          "To není sebemrskání — je to návrat moci",
        ],
        tip: "Extreme Ownership není o vině. Je o moci. Když přijmu zodpovědnost, mohu věc změnit.",
        quote: "Neexistují špatné týmy. Jen špatní vedoucí.",
        quoteAuthor: "Jocko Willink",
      },
      {
        name: "See it — Own it — Solve it — Do it",
        emoji: "📊",
        oneliner: "Oz Principle — neviditelná čára odděluje ownership od výmluv.",
        steps: [
          "See it: vidím realitu takovou, jaká je — bez přikrášlování",
          "Own it: přiznám, že je to i moje zodpovědnost",
          "Solve it: co konkrétně mohu udělat?",
          "Do it: udělám to — ne zítra, teď",
        ],
        tip: "Nejčastěji se zasekáváme na prvním kroku. \"See it\" vyžaduje odvahu vidět věci, které nechceme vidět.",
        quote: "Nad čarou je ownership. Pod čarou jsou výmluvy.",
        quoteAuthor: "Roger Connors",
      },
      {
        name: "Locus of Control",
        emoji: "🧭",
        oneliner: "Rotter — jsi pilot svého života, nebo cestující?",
        steps: [
          "Vzpomeň si na situaci, kde věci nešly jak sis přála",
          "Jak jsi to vysvětlila? (okolnosti / ostatní / smůla = externí)",
          "Přeformuluj: co jsem mohla ovlivnit JÁ?",
          "Interní locus není popírání reality — je to volba soustředění",
        ],
        tip: "Lidé s interním locus nemají víc štěstí. Mají víc akce — a akce přináší výsledky.",
        quote: "Jsi pilot svého života, ne cestující.",
        quoteAuthor: "Julian Rotter",
      },
      {
        name: "Managing Up",
        emoji: "📤",
        oneliner: "Abbajay — ownership neznamená jen svoji práci. Znamená řídit vztah nahoru.",
        steps: [
          "Informuj dřív, než se zeptá — každý pátek 3 věty šéfce",
          "Přicházej s řešením, ne s problémem",
          "Anticipuj otázky — co bude šéfka chtít vědět?",
          "Po projektu se zeptej: co bylo dobré? co jinak?",
        ],
        tip: "Šéf má 15 lidí a nemá čas se ptát každého. Kdo informuje dobrovolně, ten existuje.",
        quote: "Tvůj šéf není zodpovědný za tvůj úspěch. Ty ano.",
        quoteAuthor: "Mary Abbajay",
      },
    ],
  },

  // ─── KAPITOLA 4 — PRIORITY ──────────────────────────────────────────────────
  {
    chapterId: "ch4",
    chapterNumber: 4,
    chapterTitle: "Priority",
    accentColor: "#185FA5",
    accentBg: "#E6F1FB",
    accentBorder: "#85B7EB",
    tagline: "Co dělat první, co nedělat vůbec.",
    keyInsight: "Zaneprázdněnost není totéž co efektivita. Většina lidí pracuje tvrdě na věcech, které nepotřebují dělat vůbec.",
    methods: [
      {
        name: "Coveyho kvadranty",
        emoji: "🗂️",
        oneliner: "Covey — ne vše naléhavé je důležité. A to nejdůležitější málokdy křičí.",
        steps: [
          "Q1 — důležité + naléhavé: požáry, krize, deadliny → řeš, ale minimalizuj",
          "Q2 — důležité + nenaléhavé: strategie, vztahy, rozvoj → sem patří tvůj čas",
          "Q3 — naléhavé + nedůležité: zdánlivá urgentnost, schůzky bez výsledku → odmítni",
          "Q4 — nedůležité + nenaléhavé: únik, scrollování → omez",
        ],
        tip: "Zeptej se: \"Je tohle urgentní pro MŮJ výsledek, nebo jen pro pohodlí někoho jiného?\" Q3 se vždy maskuje jako Q1.",
        quote: "Nejdůležitější věci nesmí být na milost vydány těm nejméně důležitým.",
        quoteAuthor: "Stephen R. Covey",
      },
      {
        name: "Pareto — 80/20",
        emoji: "📊",
        oneliner: "Koch — 20 % tvých aktivit přináší 80 % výsledků. Najdi je a zdvojnásob.",
        steps: [
          "Podívej se zpětně na posledních 90 dní",
          "Které 2–3 aktivity přinesly nejvíc výsledků nebo viditelnosti?",
          "Dělám je záměrně a pravidelně, nebo nastaly náhodou?",
          "Co by se stalo, kdybych je zdvojnásobila?",
        ],
        tip: "Pareto není teorie. Je to audit. Čísla ti řeknou, co tvoje intuice přehlíží.",
        quote: "Většina věcí nemá smysl. Vzácné věci jsou neuvěřitelně cenné.",
        quoteAuthor: "Richard Koch",
      },
      {
        name: "Deep Work",
        emoji: "🧠",
        oneliner: "Newport — soustředěná práce bez rozptýlení je vzácná kompetence. Chraň ji.",
        steps: [
          "Identifikuj své Deep Work úkoly (strategie, analýza, psaní, kreativa)",
          "Najdi, kdy je tvůj mozek nejostřejší — a blokuj tam čas",
          "Zavři mail, Slack, notifikace — Deep Work blok je nedotknutelný",
          "Začni s 90 minutami. Postupně prodlužuj.",
        ],
        tip: "Schopnost soustředění se cvičí. První týden je těžký. Druhý týden je přijatelný. Třetí týden je výhoda.",
        quote: "Schopnost soustředit se bez rozptýlení je superschopnost naší doby.",
        quoteAuthor: "Cal Newport",
      },
      {
        name: "Ideální týden (Ferriss)",
        emoji: "🗓️",
        oneliner: "Ferriss — navrhni týden záměrně dopředu, jinak ho navrhnou ostatní za tebe.",
        steps: [
          "V neděli večer otevři kalendář na příští týden",
          "Blokuj Deep Work: ráno 08:00–10:30, zavřená dveře nebo sluchátka",
          "Seskup schůzky: ideálně jeden blok odpoledne (13:00–16:00)",
          "Batch mail: dvě pevná okna (10:30 + 16:30) — mimo ně inbox nezíráš",
          "Nech buffer: páteční odpoledne na nečekané věci",
        ],
        tip: "Elimination test: \"Co nejhoršího se stane, když tohle přestanu dělat?\" Pokud odpověď je nic moc — přestaň.",
        quote: "Zaneprázdněnost je formou lenosti — lenosti přemýšlet a stanovit priority.",
        quoteAuthor: "Tim Ferriss",
      },
      {
        name: "Esencialismus",
        emoji: "✂️",
        oneliner: "McKeown — každé ano je implicitní ne všemu ostatnímu. Vybírej záměrně.",
        steps: [
          "Dostaneš žádost: zastav se před automatickým \"jasně\"",
          "Zeptej se: je toto moje 20 %? Posune mě to tam, kde chci být?",
          "Pokud ne: \"Ráda pomůžu — mohu se podívat pozítří ráno, to ti stačí?\"",
          "Pokud přibývá úkol k existujícím: \"Mám A, B, C. Co má jít dolů?\"",
        ],
        tip: "Esencialistické ne není o tom být přísná. Je o tom chránit to, na čem záleží. Říkáš ne věci, ne člověku.",
        quote: "Pokud nestanovíš vlastní priority, ostatní to udělají za tebe.",
        quoteAuthor: "Greg McKeown",
      },
    ],
  },
];
