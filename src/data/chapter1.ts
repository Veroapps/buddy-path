export type NodeType = "theory" | "game" | "reflection" | "challenge";
export type CardItem = { text: string; type: "fact" | "story" };

export interface PathNode {
  id: string; order: number; type: NodeType; title: string; subtitle: string; emoji: string;
  principle?: string;
  content?: string;
  examples?: string[];
  quote2_cz?: string; quote2_en?: string; quote2_author?: string;
  quote_cz?: string; quote_en?: string; quote_author?: string;
  gameType?: string;
  mechanic?: string;
  cards?: CardItem[];
  bodyAreas?: string[];
  transformerType?: string;
  prompt?: string;
  placeholder?: string;
  challengeDesc?: string;
  challengeDays?: number;
}

export interface Chapter {
  id: string; number: number; title: string; subtitle: string; description: string; nodes: PathNode[];
}

export function generateCoachSummary() {
  if (typeof window === "undefined") return null;
  const insights: { node_id: string; input_data: { story_bias_index?: number } }[] =
    JSON.parse(localStorage.getItem("user_insights") || "[]");
  return {
    semafor_value: parseFloat(localStorage.getItem("semafor_value") || "0"),
    story_bias_index: parseFloat(localStorage.getItem("story_bias_index") || "0"),
    somatic_trigger_points: JSON.parse(localStorage.getItem("somatic_trigger_points") || "[]") as string[],
    first_proactive_statement: localStorage.getItem("first_proactive_statement") || "",
    mirror_entries: insights.filter(i => i.node_id === "n10").length,
  };
}

export const chapter1: Chapter = {
  id: "ch1", number: 1,
  title: "Kapitola 1: Tvoje supermoc",
  subtitle: "Návyk 1: Buď proaktivní",
  description: "Mezi tím, co se ti děje, a tím, co uděláš, je prostor. V něm se rozhoduje o tvém štěstí.",
  nodes: [
    {
      id: "n1", order: 1, type: "theory",
      title: "Magická vteřina", subtitle: "Covey – Návyk 1", emoji: "🌱",
      principle: "Buď proaktivní",
      quote2_cz: "Nemohu řídit vítr. Mohu nastavit plachty.",
      quote2_en: "I cannot control the wind. I can adjust my sails.",
      quote2_author: "Jimmy Dean",
      content: "Mezi tím, co se ti stane, a tím, co uděláš, je okamžik. Covey ho nazval prostor mezi podnětem a reakcí. U reaktivního člověka je neviditelný — dochází k automatické odpovědi bez přemýšlení. Proaktivní člověk ho vidí a vědomě ho využívá. Nejde o to být chladný nebo pomalý — jde o to, kdo drží volant, ty nebo situace. V práci se ten prostor nejsnáze ztrácí tam, kde je tlak největší: nečekaná kritika, kolegovo zpoždění, změna zadání na poslední chvíli. Právě tam ho ale potřebuješ nejvíc.",
      examples: [
        "Dostaneš negativní zpětnou vazbu těsně před odevzdáním. Automatika: bráníš se nebo se stáhneš. Vědomě: zavřeš mail, vrátíš se po hodině a odpovíš věcně.",
        "Kolega přijde na meeting pozdě a bez omluvy. Automatika: převalíš oči. Vědomě: počkáš do pauzy a klidně mu řekneš jak to na tebe působí.",
        "Klient těsně před odevzdáním změní celé zadání. Automatika: stěžuješ si na chodbě. Vědomě: zavoláš a zjistíš co konkrétně potřebuje.",
        "Na poradě kolega zpochybní tvůj návrh před celým týmem. Automatika: ihned se bráníš. Vědomě: řekneš 'Díky za pohled — smím to vysvětlit podrobněji?'",
        "Nadřízená vrátí zprávu s poznámkou 'Přepracuj'. Automatika: cítíš demotivaci a odkládáš to. Vědomě: požádáš o krátký hovor abys věděl/a co přesně.",
      ],
      quote_cz: "Nejsem produktem svých okolností. Jsem produktem svých rozhodnutí.",
      quote_en: "I am not a product of my circumstances. I am a product of my decisions.",
      quote_author: "Stephen R. Covey",
    },
    {
      id: "n2", order: 2, type: "game", gameType: "the-gap",
      title: "The Gap", subtitle: "Vytvoř prostor", emoji: "↔️",
      mechanic: "Na obrazovce jsou dvě slova: PODNĚT a REAKCE. Uživatel posuvníkem nebo gestem roztahuje mezeru mezi nimi. Po dosažení maximální šířky se uvnitř mezery objeví text 'Tady jsi svobodný/á.' a Franklův citát. Pak tlačítko Pokračovat.",
      quote_cz: "Mezi podnětem a reakcí je prostor. V tom prostoru je naše svoboda.",
      quote_en: "Between stimulus and response there is a space. In that space lies our freedom.",
      quote_author: "Viktor E. Frankl",
    },
    {
      id: "n3", order: 3, type: "theory",
      title: "Fakt vs. Příběh", subtitle: "Co víš vs. co si domýšlíš", emoji: "🃏",
      principle: "Odděluj fakta od interpretací",
      quote2_cz: "Situace tě neovládá. Ovládá tě tvůj výklad situace.",
      quote2_en: "It's not the situation that controls you. It's your interpretation of it.",
      quote2_author: "Viktor E. Frankl",
      content: "Mozek nesnáší prázdná místa. Když nemá dost informací, okamžitě je doplní příběhem. Kolega neodpovídá — mozek doplní 'schválně mě ignoruje'. Nadřízená byla na poradě tichá — mozek doplní 'byla zklamaná'. Tyto příběhy vznikají za zlomek vteřiny, automaticky, bez tvého souhlasu. Problém není že je máš — problém je když je považuješ za fakta. Fakt je to, co by zachytila kamera. Příběh je interpretace, kterou přidáváš ty. Naučit se je rozlišovat je první krok k tomu přestat reagovat na věci, které se možná vůbec nestaly.",
      examples: [
        "FAKT: 'Klient změnil zadání.' PŘÍBĚH: 'Neváží si mé práce a chce mě potopit.' PROAKTIVNÍ VOLBA: 'Potřebuji si ujasnit priority a nový časový rámec.'",
        "FAKT: 'Kolega mi neodpověděl na mail.' PŘÍBĚH: 'Schválně mě ignoruje.' PROAKTIVNÍ VOLBA: 'Zavolám mu zítra nebo napíšu znovu.'",
        "FAKT: 'Na poradě mě přerušili.' PŘÍBĚH: 'Nikdo mě nebere vážně.' PROAKTIVNÍ VOLBA: 'Příště si řeknu o prostor před koncem porady.'",
        "FAKT: 'Projekt byl vrácen k přepracování.' PŘÍBĚH: 'Nic nedělám dost dobře.' PROAKTIVNÍ VOLBA: 'Zeptám se na konkrétní zpětnou vazbu co přesně upravit.'",
        "FAKT: 'Nadřízená na poradě nic neřekla.' PŘÍBĚH: 'Byla zklamaná z mého výkonu.' PROAKTIVNÍ VOLBA: 'Zeptám se ji po poradě jak to vnímala.'",
      ],
      quote_cz: "Nežere tě situace. Žere tě tvůj výklad.",
      quote_en: "You are not upset by events. You are upset by your interpretation of events.",
      quote_author: "Epiktétos",
    },
    {
      id: "n4", order: 4, type: "game", gameType: "fact-or-story",
      title: "Filtr reality", subtitle: "Fakt nebo příběh?", emoji: "🎯",
      mechanic: "Swipe karty — doprava = FAKT (zelená), doleva = PŘÍBĚH (červená). Po každém swipu okamžitá validace. Na konci zobrazit skóre a uložit do localStorage jako story_bias_index.",
      cards: [
        { text: "Kolega mi neodpovídá na e-mail.", type: "fact" },
        { text: "Ignoruje mě schválně.", type: "story" },
        { text: "Šéf řekl, že tohle musím předělat.", type: "fact" },
        { text: "Nic nedělám dost dobře.", type: "story" },
        { text: "Na poradě mě přerušili.", type: "fact" },
        { text: "Nikdy mě tu nebudou brát vážně.", type: "story" },
        { text: "Termín se posunul o týden.", type: "fact" },
        { text: "Nikdo mi to neřekl, protože mi nevěří.", type: "story" },
        { text: "Klient nezvedl telefon třikrát za sebou.", type: "fact" },
        { text: "Projekt dostanu já, protože ostatní jsou líní.", type: "story" },
      ],
    },
    {
      id: "n5", order: 5, type: "theory",
      title: "Pojmenuj a zkrotíš", subtitle: "Daniel Siegel", emoji: "🧠",
      principle: "Name it to tame it",
      quote2_cz: "Pojmenovat emoci je první krok k tomu, ji zkrotit.",
      quote2_en: "Name it to tame it.",
      quote2_author: "Daniel J. Siegel",
      content: "Když tě emoce přepadne naplno, mozek přepíná do nouzového režimu. Amygdala — část zodpovědná za přežití — převezme řízení dřív než vůbec začneš přemýšlet. Ale je tu zkratka: jakmile emoci pojmenuješ přesným slovem, aktivuješ prefrontální kortex a amygdala se zklidní. Ne proto že ignoruješ co cítíš, ale proto že mozek dostane přesnější informaci a přestane alarmovat. Čím konkrétnější slovo, tím větší efekt. Vágní pocit nepomůže — přesné pojmenování ano. A emoci cítíš nejdřív v těle: tlak v hrudi, svírání v žaludku, napětí v čelisti. Tělo ví dřív než hlava.",
      examples: [
        "Kolega tě přeruší při prezentaci. Auto: 'To mě štve.' Vědomě: 'Cítím zahanbení a potřebu obhájit svou kompetenci.'",
        "Zjistíš že kolega dostal projekt o který sis říkal/a. Auto: 'To je nespravedlivé.' Vědomě: 'Cítím závist a pochybnosti jestli si na takový projekt věřím.'",
        "Deadline se posunul aniž tě kdo informoval. Auto: 'Nemám na to náladu.' Vědomě: 'Cítím paniku z nedostatku času a frustraci že jsem nebyl/a zapojen/a.'",
        "Klient nezvedá telefon pátý den. Auto: 'Je to beznadějné.' Vědomě: 'Cítím bezmoc a starost jestli jsem udělal/a něco špatně.'",
        "Nadřízený tě pochválí před týmem. Auto: 'Bylo to fajn.' Vědomě: 'Cítím hrdost a úlevu — potvrdilo to že moje práce má smysl.'",
      ],
      quote_cz: "Emoce jsou data, ne příkazy.",
      quote_en: "Emotions are data, not commands.",
      quote_author: "Susan David",
    },
    {
      id: "n6", order: 6, type: "game", gameType: "body-map",
      title: "Body Scan", subtitle: "Kde to cítíš?", emoji: "🫀",
      mechanic: "SVG silueta lidského těla. Klikatelné oblasti: hlava, čelist, krk, hruď, břicho, ruce, nohy. Kliknutím se oblast rozsvítí žlutě — lze označit více oblastí. Po každém kliknutí se zobrazí feedback. Uložit označené oblasti do localStorage jako somatic_trigger_points.",
      prompt: "Vzpomeň si na poslední situaci kdy tě něco rozhodilo. Kde jsi to cítil/a v těle?",
      bodyAreas: ["hlava", "čelist", "krk", "hruď", "břicho", "ruce", "nohy"],
    },
    {
      id: "n7", order: 7, type: "reflection", gameType: "semafor-slider",
      title: "Můj Semafor", subtitle: "Jak se teď cítíš?", emoji: "🚦",
      prompt: "Jakou barvu máš právě teď? Co tvé tělo vysílá za signál?",
      mechanic: "Vertikální slider s gradientem zelená (0.0) → žlutá (0.5) → červená (1.0). Pod sliderem zobrazit aktivní definici podle hodnoty. Uložit hodnotu do localStorage jako semafor_value.",
      placeholder: "Zelená: Jsem v klidu, mám kapacitu volit reakci.\nŽlutá: Jsem napjatý/á, prostor mezi podnětem a reakcí se zmenšuje.\nČervená: Reaguji automaticky — útočím nebo utíkám.",
    },
    {
      id: "n8", order: 8, type: "theory",
      title: "Kouzlo slova Zatím", subtitle: "Carol Dweck – Mindset", emoji: "💡",
      principle: "Growth mindset",
      quote2_cz: "Mozek je jako sval. Roste když ho trénuješ.",
      quote2_en: "The brain is like a muscle. It grows when you exercise it.",
      quote2_author: "Carol S. Dweck",
      content: "Carol Dweck desítky let zkoumala co odlišuje lidi kteří se po neúspěchu zvednou od těch kteří se zaseknou. Odpověď nebyl talent — byl to způsob jakým přemýšlejí o svých schopnostech. Fixed mindset říká: 'Buď to umím nebo ne. Takový/taková prostě jsem.' Growth mindset říká: 'Tohle ještě neumím — ale mohu se to naučit.' Klíčové slovo je zatím. Reaktivní jazyk tě vězní — proaktivní jazyk ti dává cestu ven. Jedno slovo přepne tvůj mozek z módu oběť do módu student.",
      examples: [
        "'Neumím prezentovat.' → 'V prezentacích zatím nemám jistotu — ale každé vystoupení je trénink.'",
        "'Nejsem typ na vedení lidí.' → 'Vedoucím zatím jsem nebyl/a — ale řídit malý projekt může být první krok.'",
        "'Nikdy jsem nerozuměl/a strategii.' → 'Strategické myšlení mi zatím nejde — ale mohu začít klást lepší otázky.'",
        "'Vždy se ztrácím v číslech.' → 'S čísly mám zatím potíže — ale mohu si vzít jednu tabulku týdně.'",
        "'Nesnáším zpětnou vazbu.' → 'Zpětná vazba mi zatím přijde jako útok — ale mohu pracovat na tom jak ji slyšet.'",
      ],
      quote_cz: "Slovo zatím není výmluva. Je to plán.",
      quote_en: "Yet is not an excuse. It's a plan.",
      quote_author: "Carol S. Dweck",
    },
    {
      id: "n9", order: 9, type: "game", gameType: "add-yet",
      title: "Transformátor", subtitle: "Přidej zatím", emoji: "✨",
      mechanic: "Textové pole kde uživatel napíše větu s fixed mindset. Velké tlačítko [+ ZATÍM]. Po kliknutí se animovaně přidá ' zatím.' na konec věty. Uložit transformovanou větu do localStorage jako first_proactive_statement. Připravit výchozí příklady jako nápovědu pod polem.",
      examples: [
        "Tohle neumím.",
        "Nerozumím tomu.",
        "Na tohle nemám.",
        "Nejsem dost dobrý/á.",
        "Takhle to prostě mám.",
      ],
      quote_cz: "Slovo zatím není výmluva. Je to plán.",
      quote_en: "Yet is not an excuse. It's a plan.",
      quote_author: "Carol S. Dweck",
    },
    {
      id: "n10", order: 10, type: "reflection", gameType: "mirror-form",
      title: "První přepis", subtitle: "Zrcadlo", emoji: "🪞",
      prompt: "Vzpomeň si na situaci z posledních dní která tě rozhodila. Projdi ji přes čtyři pole níže.",
      placeholder: "Událost: Co se konkrétně stalo — jen fakta bez hodnocení.\nPříběh: Co ti o tom nakecala tvoje hlava?\nPocit: Jakou emoci jsi cítil/a? Přesné slovo.\nNové rozhodnutí: Jak by to vypadalo s přidáním slova zatím nebo změnou reakce?",
    },
    {
      id: "n11", order: 11, type: "game", gameType: "fact-or-story",
      title: "Lovci příběhů", subtitle: "Těžší kolo", emoji: "🔍",
      mechanic: "Stejná mechanika jako uzel 4 — swipe karty doprava (FAKT) nebo doleva (PŘÍBĚH). Tentokrát složitější situace. Po každém swipu krátké vysvětlení. Na konci porovnat skóre s uzlem 4 — zlepšil/a ses?",
      cards: [
        { text: "Kolega na mě na poradě nekoukl celou hodinu.", type: "fact" },
        { text: "Stydí se za mě před ostatními.", type: "story" },
        { text: "Zpráva, na které jsem pracoval/a tři týdny, prošla bez komentáře.", type: "fact" },
        { text: "Nikoho to nezajímalo, moje práce je zbytečná.", type: "story" },
        { text: "Nadřízená přidělila projekt kolegovi, ne mně.", type: "fact" },
        { text: "Ví, že to nezvládnu, proto mi to nedala.", type: "story" },
        { text: "Klient odpověděl na mail jedinou větou.", type: "fact" },
        { text: "Je nespokojený a hledá důvod jak se mě zbavit.", type: "story" },
        { text: "Na Slacku se rozběhla konverzace bez mého zahrnutí.", type: "fact" },
        { text: "Záměrně mě vyřadili, aby mě ukázali jako zbytečného/ou.", type: "story" },
      ],
    },
    {
      id: "n12", order: 12, type: "challenge",
      title: "5 dní lovcem příběhů", subtitle: "Odemkni kapitolu 2", emoji: "🏆",
      challengeDesc: "Příštích 5 dní jen sleduj. Kdykoliv tě něco píchne — v práci, v mailu, na poradě — zeptej se: Je to fakt, nebo příběh? Zapiš si co se stalo, jaký příběh ti hlava doplnila, a jaký byl skutečný fakt. Nemusí být dokonalé. Stačí si všimnout. Každý den kdy zápis uděláš se počítá.",
      challengeDays: 5,
    },
  ],
};
