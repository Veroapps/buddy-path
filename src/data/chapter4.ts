import { type Chapter } from "./chapter1";

export const chapter4: Chapter = {
  id: "ch4",
  number: 4,
  title: "Priority",
  subtitle: "Co dělat první, co nedělat vůbec",
  description: "Naučíš se přestat být zaneprázdněná a začít být efektivní — rozlišovat, co ti přinese výsledky, od toho, co ti jen zabírá čas.",
  nodes: [

    // ─── UZEL 1: TEORIE — Covey kvadranty ─────────────────────────────────────
    {
      id: "ch4n1", order: 1, type: "theory",
      title: "Matice naléhavosti",
      subtitle: "Covey — 7 návyků, Návyk 3",
      emoji: "🗂️",
      principle: "Řiď se důležitostí, ne naléhavostí",
      content: "Stephen Covey rozdělil všechny úkoly do čtyř kvadrantů podle dvou os: důležité/nedůležité a naléhavé/nenaléhavé.\n\nKvadrant 1 (důležité + naléhavé): krize, deadliny, požáry. Tady trávíš čas, když se nevěnuješ Q2.\n\nKvadrant 2 (důležité + nenaléhavé): strategie, vztahy, prevence, rozvoj. Toto je kvadrant, kde se tvoří výsledky. Nikdy nekřičí, proto ho většina lidí ignoruje.\n\nKvadrant 3 (naléhavé + nedůležité): chybně markovaná naléhavost. Schůzky, kde nejsi potřebná. Maile, které čekají na odpověď ale nemusíš. Pocit produktivity bez výsledku.\n\nKvadrant 4 (nedůležité + nenaléhavé): únik — scrollování, prokrastinace.\n\nVětšina zaneprázdněných profesionálů tráví 70 % v Q1 a Q3, mají pocit vytíženosti, ale Q2 — to, co by je posunulo — se nikdy nestane. Cíl není mít méně práce. Cíl je mít víc Q2.",
      examples: [
        "Q1: klient potřebuje opravu do hodiny. Q2: napsat obsahovou strategii na Q3, která Q1 příště sníží. Q3: zodpovědět mail od kolegy, který 'čeká na vyjádření' ale nezablokoval nic. Q4: kontrolovat statistiky Instagramu bez plánu.",
        "Záludnost Q3: přijde jako Q1. Někdo píše 'urgentně'. Ale urgentní pro koho? Coveyho test: je to důležité pro MŮJ výsledek, nebo jen pro jejich pohodlí?",
        "Q2 nikdy nekřičí. Proto ho musíš aktivně hlídat. Blokovat čas. Říct lidem ne. Jinak se Q2 vždy odloží — na příští týden, příští měsíc, příští rok."
      ],
      quote_cz: "Nejdůležitější věci nesmí být na milost vydány těm nejméně důležitým.",
      quote_en: "The main thing is to keep the main thing the main thing.",
      quote_author: "Stephen R. Covey",
      quote2_cz: "Zaneprázdněnost není totéž co produktivita.",
      quote2_en: "Busyness is not the same as productivity.",
      quote2_author: "Tim Ferriss"
    },

    // ─── UZEL 2: HRA — Roztřiď týden ──────────────────────────────────────────
    {
      id: "ch4n2", order: 2, type: "game",
      title: "Roztřiď svůj týden",
      subtitle: "Kam patří co? Rozhoduj rychle.",
      emoji: "⚡",
      gameType: "quadrant-sort",
      gameData: {
        timePerItem: 8,
        items: [
          { text: "Připravit strategii obsahu na příští kvartál.", correct: "q2", explanation: "Důležité, ale nekřičí — čistý Q2." },
          { text: "Odpovědět na mail kolegy 'co si myslíš o tomhle návrhu'.", correct: "q3", explanation: "Naléhavé jen zdánlivě — záleží na obsahu, ale většinou Q3." },
          { text: "Klient potřebuje opravenou prezentaci do 14:00.", correct: "q1", explanation: "Důležité + naléhavé — Q1. Omezte jeho četnost strategií." },
          { text: "Číst LinkedIn feed bez záměru.", correct: "q4", explanation: "Q4 — únik. Máš plán, proč tam jdeš?" },
          { text: "Promluvit si se šéfkou o prioritách na příští měsíc.", correct: "q2", explanation: "Vztah + strategie = Q2. Typicky se odloží, dokud není Q1." },
          { text: "Aktualizovat tabulku, kterou nikdo nečte.", correct: "q3", explanation: "Pocit produktivity = Q3. Stojí to vůbec za tvůj čas?" },
          { text: "Web spadl a klienti vidí chybu.", correct: "q1", explanation: "Q1 — krize. Jednej." },
          { text: "Naučit se práci s nástrojem, který by ušetřil 3 hodiny týdně.", correct: "q2", explanation: "Investice do budoucna = Q2. Nikdy není 'teď'." },
          { text: "Zodpovědět 12 nepodstatných mailů z CC.", correct: "q3", explanation: "Q3 nebo Q4. Musíš na to všechno odpovídat?" },
          { text: "Dokončit report, který měl být odevzdán včera.", correct: "q1", explanation: "Opožděný deadline = Q1. Ale proč se dostal do zpoždění?" }
        ]
      },
      content: "10 úkolů z reálného pracovního týdne. Roztřiď je do Coveyho kvadrantů: Q1 (důležité + naléhavé), Q2 (důležité + nenaléhavé), Q3 (naléhavé + nedůležité), Q4 (ani jedno). Timer běží — 8 sekund na rozhodnutí."
    },

    // ─── UZEL 3: REFLEXE — Kde trávím čas? ───────────────────────────────────
    {
      id: "ch4n3", order: 3, type: "reflection",
      title: "Můj reálný týden",
      subtitle: "Upřímná inventura",
      emoji: "🔍",
      prompt: "Vzpomeň si na minulý pracovní týden. Odhadni procenta: kolik času jsi strávila v Q1 (požáry, deadliny), Q2 (strategie, prevence, vztahy), Q3 (zdánlivá naléhavost, schůzky bez výsledku), Q4 (únik, prokrastinace).\n\nPak odpověz na tři otázky: Co konkrétního patřilo do Q2 a nestalo se? Co ti bere nejvíc času, ale přináší nejméně výsledků? Jaký jeden posun by ti dal víc Q2?",
      placeholder: "Q1: __% Q2: __% Q3: __% Q4: __%\n\nCo patřilo do Q2 a nestalo se: ...\nCo bere čas bez výsledku: ...\nJeden posun: ..."
    },

    // ─── UZEL 4: TEORIE — Pareto 80/20 ───────────────────────────────────────
    {
      id: "ch4n4", order: 4, type: "theory",
      title: "Princip 80/20",
      subtitle: "Pareto — nerovnoměrné rozložení výsledků",
      emoji: "📊",
      principle: "20 % příčin způsobuje 80 % výsledků",
      content: "Vilfredo Pareto v roce 1896 zjistil, že 20 % obyvatel Itálie vlastní 80 % půdy. Ekonom Richard Koch tento princip aplikoval na byznys a produktivitu: 20 % tvých aktivit přináší 80 % výsledků. 20 % klientů generuje 80 % příjmů. 20 % postů má 80 % dosahu.\n\nPareto není magie — je to empirické pozorování, které se potvrzuje napříč obory znovu a znovu. Ale důsledek je radikální: pokud najdeš svých 20 % a zaměříš tam energii, výsledky se znásobí. Pokud jich nenajdeš a děláš všechno rovnoměrně, plýtváš 80 % času.\n\nPro marketing to znamená: ne víc obsahu, ale lepší obsah na správné téma. Ne víc schůzek, ale správné schůzky. Ne víc reportů, ale správné metriky.\n\nZákladní otázka Pareta: 'Které dvě nebo tři věci by, kdybych je dělala výjimečně dobře, přinesly nejvíc?' A pak: 'Dělám je? Nebo dělám všechno ostatní?'",
      examples: [
        "LinkedIn: 3 posty měly 80 % všech interakcí za půl roku. Co mají společného? To je tvoje 20 %.",
        "Projekty: jeden projekt přinesl nejvíc viditelnosti u šéfky. Proč? Co ho odlišovalo? To je vzor.",
        "Energie: jeden typ práce tě nabíjí a jde ti nejlépe. Kdybys ho dělala víc — co by se stalo? Pareto říká: výsledky by se znásobily."
      ],
      quote_cz: "Dělat méně je cesta k více. Soustřeď se na výsledky, ne na aktivitu.",
      quote_en: "Do less, achieve more. Focus on outputs, not inputs.",
      quote_author: "Richard Koch",
      quote2_cz: "Většina věcí nemá smysl. Vzácné věci jsou neuvěřitelně cenné.",
      quote2_en: "Most things make no difference. A very few things are incredibly valuable.",
      quote2_author: "Richard Koch"
    },

    // ─── UZEL 5: HRA — Pareto audit ───────────────────────────────────────────
    {
      id: "ch4n5", order: 5, type: "game",
      title: "Pareto audit",
      subtitle: "Co ti přináší výsledky, co jenom zabírá čas?",
      emoji: "🎯",
      gameType: "pareto-audit",
      gameData: {
        categories: [
          {
            category: "Typy obsahu na LinkedIn",
            items: [
              { text: "Sdílení firemních novinek beze svého komentáře", value: "low" },
              { text: "Osobní zkušenost s konkrétním výsledkem nebo číslem", value: "high" },
              { text: "Přepis z meetingu formou 'key takeaways'", value: "medium" },
              { text: "Otázka komunitě s vlastním názorem v prvním komentáři", value: "high" },
              { text: "Sdílení článku s jednou větou 'zajímavé čtení'", value: "low" },
              { text: "Pohled za kulisy projektu — co se pokazilo a co se naučila", value: "high" }
            ]
          },
          {
            category: "Typy schůzek a komunikace",
            items: [
              { text: "1:1 se šéfkou — přichází s body a otázkami", value: "high" },
              { text: "Status call kde čteš ze slidů co všichni vědí", value: "low" },
              { text: "Brainstorming s konkrétním zadáním a výstupem", value: "high" },
              { text: "Schůzka kde jsi v CC ale nikdo se tě nezeptal", value: "low" },
              { text: "Feedback session po dokončeném projektu", value: "high" },
              { text: "Schůzka o schůzce — domlouváte se, kdy se sejdete", value: "low" }
            ]
          }
        ],
        instruction: "U každé položky zvol: HIGH (přináší výsledky — tvoje 20 %), MEDIUM (průměrné), LOW (zabírá čas bez výsledku). Na konci uvidíš svůj Pareto profil."
      },
      content: "Dvě kategorie, reálné položky. Ohodnoť každou jako HIGH / MEDIUM / LOW z hlediska výsledků, které přináší. Nejde o to, co děláš ráda — jde o to, co ti reálně přináší výsledky."
    },

    // ─── UZEL 6: REFLEXE — Moje 20 % ─────────────────────────────────────────
    {
      id: "ch4n6", order: 6, type: "reflection",
      title: "Moje 20 %",
      subtitle: "Co opravdu přináší výsledky?",
      emoji: "💎",
      prompt: "Zamysli se nad posledními třemi měsíci v práci. Které tři aktivity, projekty nebo momenty přinesly nejvíc viditelnosti, výsledků nebo pocitu posunu?\n\nPak se zeptej: Dělám tyto věci záměrně a pravidelně, nebo nastaly náhodou? Co jim předcházelo — co jsem dělala jinak? Pokud bych je zdvojnásobila, co by se změnilo?",
      placeholder: "Moje 3 aktivity s největším dopadem:\n1. ...\n2. ...\n3. ...\n\nDělám je záměrně? ...\nCo jim předcházelo: ...\nKdybych je zdvojnásobila: ..."
    },

    // ─── UZEL 7: TEORIE — Deep Work (Cal Newport) ─────────────────────────────
    {
      id: "ch4n7", order: 7, type: "theory",
      title: "Hluboká práce",
      subtitle: "Cal Newport — Deep Work",
      emoji: "🧠",
      principle: "Soustředěná práce je vzácná a cenná",
      content: "Cal Newport definuje Deep Work jako profesionální aktivity prováděné v podmínkách bez rozptýlení, které vedou k maximálnímu využití kognitivních schopností a produkují výsledky, které se těžko replikují.\n\nProtipólem je Shallow Work — logistické, administrativní, komunikační úkoly, které zvládneš napůl pozornosti. Problém je, že Shallow Work zahlcuje kalendář a Deep Work se odkládá na 'volné odpoledne', které nikdy nenastane.\n\nNewport tvrdí, že schopnost Deep Work je jedna z nejcennějších a nejohroženějších kompetencí 21. století. Nejohroženějších, protože open-space, notifikace, Slack a kultura neustálé dostupnosti ji aktivně ničí.\n\nPro práci v marketingu to znamená: strategie, analýza, psaní, kreativní myšlení — to jsou Deep Work úkoly. Kalendář plný schůzek a inbox jako centrum životní aktivity jsou nejlepší způsob, jak se stát výborným v Shallow Work a průměrným ve výsledcích.\n\nTři pravidla Newportovy praxe: (1) Plánuj Deep Work bloky dopředu — nestane se samo. (2) Akceptuj nudu — schopnost soustředit se se cvičí. (3) Omez sociální sítě na záměrný nástroj, ne zvyk.",
      examples: [
        "Dvě hodiny ráno bez mailu, Slacku ani schůzky — věnuješ je strategii obsahu. Za 4 týdny máš hotové to, co by jinak trvalo 3 měsíce.",
        "Brian je výborný v komunikaci a vždy odpovídá za 5 minut. Ty bereš 2 hodiny. Ale Brian nikdy nedokončí strategický projekt, protože je vždy dostupný. Ty ano.",
        "Každé ráno si dáš 'nejhorší úkol jako první' (Eat the Frog — Brian Tracy). Co nejraději odkládáš? To dělej první."
      ],
      quote_cz: "Schopnost soustředit se bez rozptýlení je superschopnost naší doby.",
      quote_en: "The ability to concentrate without distraction is becoming increasingly rare and valuable.",
      quote_author: "Cal Newport",
      quote2_cz: "Co dělám, když mám 4 hodiny volna? To je otázka, která ti ukáže tvoje priority.",
      quote2_en: "What would I do with 4 hours of free time? The answer reveals your real priorities.",
      quote2_author: "Cal Newport"
    },

    // ─── UZEL 8: HRA — Deep nebo Shallow? ─────────────────────────────────────
    {
      id: "ch4n8", order: 8, type: "game",
      title: "Deep nebo Shallow?",
      subtitle: "Tříď a přemýšlej — co z toho vyžaduje soustředění?",
      emoji: "🌊",
      gameType: "deep-shallow-sort",
      gameData: {
        timePerItem: 7,
        tasks: [
          { text: "Napsat první draft obsahové strategie na příští kvartál.", correct: "deep", explanation: "Vyžaduje soustředění, analýzu, tvůrčí myšlení — čistý Deep Work." },
          { text: "Přeposlat mail s komentářem 'viz níže'.", correct: "shallow", explanation: "Shallow — udělá se za 30 sekund, nevyžaduje plnou pozornost." },
          { text: "Analyzovat, proč 3 posty fungují a ostatní ne.", correct: "deep", explanation: "Deep — potřebuješ vidět vzory, myslet v kontextu." },
          { text: "Nasdílet firemní příspěvek s emoji.", correct: "shallow", explanation: "Shallow — automatické, nízká kognitivní zátěž." },
          { text: "Připravit strukturu prezentace pro šéfku od nuly.", correct: "deep", explanation: "Deep — architektura myšlenek, logika, kontext." },
          { text: "Odpovědět na 5 mailů, které čekají na potvrzení.", correct: "shallow", explanation: "Shallow — rutinní, dělej v bloku, ne průběžně." },
          { text: "Napsat post, který ti dal 200 reakcí — ale tentokrát jiný formát.", correct: "deep", explanation: "Deep — kreativní práce s jasným záměrem." },
          { text: "Aktualizovat tabulku s metrikami z minulého týdne.", correct: "shallow", explanation: "Shallow — mechanické, nízká přidaná hodnota." },
          { text: "Přemýšlet, jak se zeptat šéfky na povýšení.", correct: "deep", explanation: "Deep — strategické myšlení, vysoké sázky." },
          { text: "Přidat si úkol do Todoist.", correct: "shallow", explanation: "Shallow — 10 sekund." }
        ]
      },
      content: "10 pracovních úkolů. Roztřiď je na Deep Work (vyžaduje soustředění, kognitivní kapacitu) nebo Shallow Work (rutinní, komunikační, mechanické). 7 sekund na rozhodnutí. Na konci vidíš, co si myslíš o své práci."
    },

    // ─── UZEL 9: REFLEXE — Kdy mám svůj čas? ─────────────────────────────────
    {
      id: "ch4n9", order: 9, type: "reflection",
      title: "Kdy mám svůj čas?",
      subtitle: "Reálný pohled na kalendář",
      emoji: "📅",
      prompt: "Otevři si kalendář na příští týden. Odpověz upřímně na tyhle otázky:\n\nKolik hodin máš bez schůzky a bez povinnosti být dostupná? Kdy je tvůj mozek nejostřejší — ráno, dopoledne, odpoledne? Je ten čas v kalendáři chráněný nebo kdokoli si ho může vzít?\n\nJak by vypadal ideální týden, kdybys ho navrhla sama — kde by byl Deep Work blok, kde schůzky, kde admin?",
      placeholder: "Volné bloky v příštím týdnu: ...\nKdy jsem nejostřejší: ...\nJe ten čas chráněný? ...\n\nIdeální týden — jak by vypadal: ..."
    },

    // ─── UZEL 10: TEORIE — Tim Ferriss / Čtyřhodinový pracovní týden ──────────
    {
      id: "ch4n10", order: 10, type: "theory",
      title: "Navrhni svůj týden",
      subtitle: "Tim Ferriss — Čtyřhodinový pracovní týden",
      emoji: "🗓️",
      principle: "Nejde o to pracovat méně. Jde o to pracovat záměrně.",
      content: "Tim Ferriss v knize Čtyřhodinový pracovní týden (2007) neříká, že stačí pracovat čtyři hodiny. Říká něco jinak radikálního: většina lidí pracuje 40–60 hodin týdně na věcech, které nepotřebují dělat vůbec, a pak nemají čas na to, co by je skutečně posunulo.\n\nFerriss přišel s konceptem ideálního týdne — záměrně navrženého rozvrhu, kde každý blok má explicitní účel. Nereaguješ na to, co přijde. Plánuješ dopředu, co chceš, aby se stalo.\n\nTři klíčové principy:\n\n(1) Batch processing — místo průběžného zpracování mailů, zpráv a admin úkolů je seskupíš do dvou pevných bloků denně (např. 10:00 a 16:00) a mimo ně inbox nezíráš. Zbytek dne patří práci s vysokou hodnotou.\n\n(2) Elimination before delegation — než něco deleguješ nebo optimalizuješ, zeptej se: je to vůbec potřeba dělat? Ferriss odhaduje, že 30–40 % typické pracovní náplně by šlo zrušit bez znatelného dopadu na výsledky.\n\n(3) Ideal week design — v neděli večer si navrhuješ příští týden jako záměrnou architekturu: které bloky jsou pro Deep Work, které pro schůzky, které pro admin, kde je buffer. Bez toho se týden navrhne sám — a výsledek nebude tvůj.",
      examples: [
        "Batch mail: místo odpovídání kdykoli máš dva okna — 10:00 a 16:30. Ostatní se naučí, že odpověď za 2 hodiny je normální. Ty ušetříš hodinu denně fragmentovaného času.",
        "Elimination test: vezmi si seznam všeho, co děláš pravidelně. U každé věci si polož otázku: 'Co nejhoršího se stane, když to přestanu dělat?' Pokud je odpověď 'nic moc' — přestaň.",
        "Ideal week: v neděli otevřeš kalendář a záměrně naplníš příští týden. Deep Work ráno (08:00–11:00, blok v kalendáři, zavřená dveře nebo sluchátka). Schůzky v bloku (13:00–16:00). Admin a mail ve dvou oknech. Buffer páteční odpoledne."
      ],
      quote_cz: "Zaneprázdněnost je formou lenosti — lenosti přemýšlet a stanovit priority.",
      quote_en: "Busyness is a form of laziness — lazy thinking and indiscriminate action.",
      quote_author: "Tim Ferriss",
      quote2_cz: "Neptej se 'jak to udělám efektivněji?' Ptej se 'je to vůbec potřeba dělat?'",
      quote2_en: "Never automate something that can be eliminated. Never delegate something that can be automated.",
      quote2_author: "Tim Ferriss"
    },

    // ─── UZEL 11: HRA — Navrhni svůj ideální týden (Ferriss batch + design) ───
    {
      id: "ch4n11", order: 11, type: "game",
      title: "Ideální týden",
      subtitle: "Navrhni ho — ne popisuj, jak to teď je",
      emoji: "🏗️",
      gameType: "ideal-week-builder",
      gameData: {
        instruction: "Roztřiď 12 typických pracovních aktivit do tří kategorií: CHRÁNĚNÝ ČAS (Deep Work bloky — nedotknutelné, zavřené dveře), BATCHED (seskupené bloky — mail, schůzky, admin v pevných oknech), ELIMINOVAT (věci, které by šly zrušit nebo přestat dělat bez velkého dopadu).",
        items: [
          { text: "Psaní obsahové strategie nebo analýzy", correct: "protected", explanation: "Čistý Deep Work — patří do chráněného ranního bloku." },
          { text: "Průběžné kontrolování inboxu každých 20 minut", correct: "eliminate", explanation: "Fragmentuje soustředění. Nahraď dvěma pevnými okny denně." },
          { text: "Odpovídání na interní Slack zprávy okamžitě", correct: "batch", explanation: "Batch — pevná okna pro komunikaci, ne průběžně." },
          { text: "Týdenní status report, který nikdo nečte celý", correct: "eliminate", explanation: "Ferrissův elimination test: co nejhoršího se stane, když přestaneš? Nic moc." },
          { text: "1:1 se šéfkou s připravenými body", correct: "batch", explanation: "Schůzka s jasným výstupem — patří do seskupeného bloku schůzek." },
          { text: "Příprava nového formátu LinkedIn postu", correct: "protected", explanation: "Kreativní Deep Work — potřebuje soustředění bez přerušení." },
          { text: "Přeposílání mailů s komentářem 'viz níže'", correct: "batch", explanation: "Admin — dělej v mail bloku, ne průběžně." },
          { text: "Schůzky, kam jsi přizvána 'pro případ, že bys měla dotaz'", correct: "eliminate", explanation: "Klasický candidát na odmítnutí nebo asynchronní update." },
          { text: "Hluboká analýza dat z minulého měsíce", correct: "protected", explanation: "Deep Work — vyžaduje celý blok bez přerušení." },
          { text: "Kontrola notifikací na telefonu každou chvíli", correct: "eliminate", explanation: "Největší zloděj soustředění. Batch nebo vypni úplně." },
          { text: "Brainstorming s kolegou nad konkrétním problémem", correct: "batch", explanation: "Schůzka s výstupem — patří do bloku schůzek, ne do Deep Work." },
          { text: "Buffer čas na nečekané věci", correct: "protected", explanation: "Ferriss doporučuje záměrný buffer — jinak ho sežerou Q3 urgence." }
        ]
      },
      content: "12 pracovních aktivit. Roztřiď každou do tří kategorií: CHRÁNĚNÝ ČAS (Deep Work — nedotknutelné bloky), BATCHED (seskupené v pevných oknech), ELIMINOVAT (přestat dělat). Na konci vidíš architekturu svého ideálního týdne."
    },

    // ─── UZEL 12: TEORIE — Esencialismus (Greg McKeown) ──────────────────────
    {
      id: "ch4n12", order: 12, type: "theory",
      title: "Esencialismus",
      subtitle: "Greg McKeown — méně, ale lépe",
      emoji: "✂️",
      principle: "Dělej méně věcí, ale ty správné",
      content: "Greg McKeown ve své knize Esencialismus popisuje paradox dnešní práce: čím víc toho děláš, tím méně dosahneš. Ne proto, že by si lenivá — ale proto, že rozpiluješ energii na sto věcí a žádná nedosáhne plného potenciálu.\n\nEsencialista si klade jiné otázky než ostatní. Místo 'Jak zvládnu všechno?' se ptá: 'Co je ten jeden nejdůležitější cíl?' Místo 'Jak udělám tohle rychleji?' se ptá: 'Proč to vlastně dělám?'\n\nKlíčový mentální model: Každé 'ano' je implicitní 'ne' všemu ostatnímu. Když řekneš ano schůzce, říkáš ne hodině na strategii. Když řekneš ano projektu, který tě neposouvá, říkáš ne projektu, který by tě posunul.\n\nEsencialismus neznamená méně práce. Znamená práci s chirurgickou přesností na věcech s nejvyšším dopadem. McKeown to nazývá 'disciplinovaná volba' — ne omezení, ale svoboda.",
      examples: [
        "Dostaneš pozvánku na schůzku. Esencialistická otázka: 'Kdybych tam nebyla, stalo by se něco, na čem mi záleží?' Pokud ne — omluvíš se.",
        "Přichází nový projekt. Esencialistická otázka: 'Je toto moje 20 %? Posune mě to tam, kde chci být?' Pokud ne — odmítneš nebo deleguješ.",
        "Šéfka přidá úkol ke stávajícím. Esencialistická odpověď: 'Ráda to udělám. Mám teď A, B, C. Co má nejvyšší prioritu?' Ne obrana — ale management expectation."
      ],
      quote_cz: "Pokud nestanovíš vlastní priority, ostatní to udělají za tebe.",
      quote_en: "If you don't prioritize your life, someone else will.",
      quote_author: "Greg McKeown",
      quote2_cz: "Cílem esencialismu není dělat méně. Je to dělat správné věci výjimečně dobře.",
      quote2_en: "The goal of essentialism is not to do less. It's to do the right things at their best.",
      quote2_author: "Greg McKeown"
    },

    // ─── UZEL 13: HRA — Esencialistická rozhodnutí ────────────────────────────
    {
      id: "ch4n13", order: 13, type: "game",
      title: "Ano, ne, nebo: kdy?",
      subtitle: "Rozhodni se jako esencialista",
      emoji: "⚖️",
      gameType: "essentialism-triage",
      gameData: {
        scenarios: [
          {
            scenario: "Kolega tě žádá, abys zkontrolovala jeho prezentaci do zítřka. Máš nabitý den a jsi uprostřed strategie Q3.",
            options: [
              { label: "Ano, udělám to hned", outcome: "Přerušíš Deep Work. Strategie Q3 se zpozdí. Kolega si zvykne, že jsi vždy dostupná.", type: "wrong" },
              { label: "Ne, nemám kapacitu, ať si najde někoho jiného", outcome: "Možná příliš tvrdé — vztah záleží. Záleží na kontextu.", type: "partial" },
              { label: "Ráda pomůžu — mohu se podívat pozítří ráno, to ti stačí?", outcome: "Esencialismus v akci: ano + podmínky. Chrání tvůj čas i vztah.", type: "correct" }
            ]
          },
          {
            scenario: "Šéfka tě požádá o nový weekly report navíc ke stávajícím třem.",
            options: [
              { label: "Jasně, hned začnu.", outcome: "Q3 aktivita přibyla. Žádný výsledek, 2 hodiny týdně pryč.", type: "wrong" },
              { label: "Ráda to udělám. Abych to stihla dobře — má ten report nahradit jeden ze stávajících, nebo přibývá?", outcome: "Správně — říkáš ano, ale spravuješ očekávání a chráníš kapacitu.", type: "correct" },
              { label: "Nemám na to čas, mám dost práce.", outcome: "Možná pravda, ale bez kontextu a návrhu to zní jako stížnost.", type: "partial" }
            ]
          },
          {
            scenario: "Dostaneš pozvánku na oborovou konferenci — zajímavá, ale nepřímá vazba na tvoje cíle.",
            options: [
              { label: "Jdu — nikdy nevíš, co z toho bude.", outcome: "FOMO jako rozhodovací strategie. Plníš kalendář a spotřebuješ energii na věc mimo tvoje 20 %.", type: "wrong" },
              { label: "Podívám se na program — jdu jen pokud je tam jeden konkrétní důvod.", outcome: "Esencialistický filtr: záměrné ano místo reflexivního.", type: "correct" },
              { label: "Nezajímá mě to, odmítnu.", outcome: "Možná dobré, ale bez reflexe. Co kdybys program prošla?", type: "partial" }
            ]
          },
          {
            scenario: "Máš na stole 5 úkolů a šéfka přišla se šestým. Všechny jsou 'prioritní'.",
            options: [
              { label: "Zapíšu si to a uvidím, co stihnu.", outcome: "Odpovědnost bez struktury. Šéfka neví, co se odloží.", type: "wrong" },
              { label: "Mám teď pět věcí: A, B, C, D, E. Přidáš-li F, co má jít dolů?", outcome: "McKeown v akci — neodmítáš, ale vynucuješ prioritizaci nahoru.", type: "correct" },
              { label: "To nestihnu, mám toho moc.", outcome: "Stížnost bez návrhu. Nic se nezmění.", type: "partial" }
            ]
          }
        ]
      },
      content: "4 reálné scénáře z práce. U každého vyber nejlepší odpověď. Nejde o to být milá nebo přísná — jde o záměrná rozhodnutí, která chrání tvůj čas a výsledky."
    },

    // ─── UZEL 14: REFLEXE — Reflexivní 'ano' ──────────────────────────────────
    {
      id: "ch4n14", order: 14, type: "reflection",
      title: "Reflexivní 'ano'",
      subtitle: "Kdy říkám ano, aniž bych přemýšlela?",
      emoji: "🪞",
      prompt: "Zamysli se: kdy říkáš 'ano' automaticky — ze zvyku, ze slušnosti, ze strachu, ze zvyku být dostupná?\n\nVyber tři situace z posledního měsíce, kde jsi řekla ano a pak toho litovala nebo tě to stálo čas, který jsi chtěla jinak. Co tě k tomu vedlo? Strach z odmítnutí? Zvyk? Nejasné priority?\n\nJak by esencialista tyhle situace vyřešil jinak?",
      placeholder: "Situace 1: ...\nProč jsem řekla ano: ...\nEsencialista by: ...\n\nSituace 2: ...\nProč jsem řekla ano: ...\nEsencialista by: ...\n\nSituace 3: ...\nProč jsem řekla ano: ...\nEsencialista by: ..."
    },

    // ─── UZEL 15: HRA — Matice dopadu ─────────────────────────────────────────
    {
      id: "ch4n15", order: 15, type: "game",
      title: "Matice dopadu",
      subtitle: "Co dělat první? Rozhodni se.",
      emoji: "📐",
      gameType: "impact-effort-matrix",
      gameData: {
        instruction: "Ohodnoť každý úkol/projekt na dvou osách: DOPAD (jak moc to posune tvoje výsledky nebo viditelnost) a ÚSILÍ (kolik to bude stát čas a energie). Pak uvidíš, co patří kam.",
        axes: {
          x: { label: "Úsilí", low: "Nízké", high: "Vysoké" },
          y: { label: "Dopad", low: "Nízký", high: "Vysoký" }
        },
        quadrants: {
          highImpactLowEffort: { label: "Udělej hned", description: "Vysoký dopad, nízké úsilí — tvoje zlaté úkoly." },
          highImpactHighEffort: { label: "Plánuj strategicky", description: "Vysoký dopad, vysoké úsilí — Deep Work projekty. Potřebují blok v kalendáři." },
          lowImpactLowEffort: { label: "Deleguj nebo automatizuj", description: "Nízký dopad, nízké úsilí — udělej rychle nebo předej." },
          lowImpactHighEffort: { label: "Přestaň dělat", description: "Nízký dopad, vysoké úsilí — klasické Q3. Proč to ještě děláš?" }
        },
        items: [
          { text: "Týdenní report, který nikdo nečte", suggestedQuadrant: "lowImpactHighEffort" },
          { text: "Jeden silný LinkedIn post týdně", suggestedQuadrant: "highImpactLowEffort" },
          { text: "Obsahová strategie na Q3", suggestedQuadrant: "highImpactHighEffort" },
          { text: "Přeposlání mailu s komentářem", suggestedQuadrant: "lowImpactLowEffort" },
          { text: "1:1 se šéfkou — s připravenými body", suggestedQuadrant: "highImpactLowEffort" },
          { text: "Naučit se nový nástroj pro analýzu", suggestedQuadrant: "highImpactHighEffort" },
          { text: "Účast na schůzce, kde nejsi potřebná", suggestedQuadrant: "lowImpactHighEffort" },
          { text: "Rychlá aktualizace tabulky metrik", suggestedQuadrant: "lowImpactLowEffort" }
        ]
      },
      content: "8 pracovních úkolů — ohodnoť každý na dvou osách: DOPAD a ÚSILÍ. Matice ti ukáže, co dělat hned, co plánovat, co delegovat a co přestat dělat."
    },

    // ─── UZEL 16: CHALLENGE — Co si odnáším ──────────────────────────────────
    {
      id: "ch4n16", order: 16, type: "challenge",
      title: "Co si odnáším",
      subtitle: "Shrnutí kapitoly 4",
      emoji: "🏔️",
      challengeDesc: "Prošla jsi celou čtvrtou kapitolu. Nebylo to o time managementu — bylo to o rozhodnutích. Co dělat, co nedělat, co chránit.\n\n5 konceptů, které se v téhle kapitole probíraly — napiš je vlastními slovy, ne jako definice.\n\n4 věci, které jsi dělala, a teď víš, že patří do Q3 nebo Q4 — co přestanou nebo změní.\n\n3 nástroje nebo otázky, které si vezmeš dál — ne jako teorie, ale jako reálná praxe. Který kvadrant, který princip, která otázka.\n\n2 konkrétní rozhodnutí, která uděláš příští týden — co řekneš ne, co zablokuješ, co přesměruješ.\n\n1 věta, která tě v téhle kapitole zasáhla nejvíc — tvoje, ne citát z knihy.",
      challengeDays: 0
    }

  ]
};
