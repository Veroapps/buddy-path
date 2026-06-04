import { type Chapter } from "./chapter1";

export const chapter5: Chapter = {
  id: "ch5",
  number: 5,
  title: "Komunikace",
  subtitle: "Říct to jinak — aby tě slyšeli",
  description: "Naučíš se dávat feedback, který nezraní. Říct těžké věci tak, aby je druhý slyšel. A vést konverzace, které většina lidí odkládá celé roky.",
  nodes: [

    // ─── UZEL 1: TEORIE — SBI model ───────────────────────────────────────────
    {
      id: "ch5n1", order: 1, type: "theory",
      title: "SBI model",
      subtitle: "Center for Creative Leadership",
      emoji: "🔬",
      principle: "Feedback bez útoku, bez obrany",
      content: "SBI je nejpraktičtější nástroj feedbacku, jaký existuje. Vyvinulo ho Center for Creative Leadership a stojí na třech prvcích:\n\nSituace — kdy a kde přesně k tomu došlo. Ne obecně, ne 'vždy' nebo 'nikdy'. Konkrétní moment: 'Na včerejší prezentaci...'\n\nChování — co druhý udělal nebo řekl. Jen fakta, žádná interpretace. Ne 'byl jsi arogantní' — ale 'přerušil jsi mě třikrát, než jsem dokončila větu.'\n\nDopad — co to způsobilo tobě nebo situaci. Ne soud o člověku — ale co jsi pocítila nebo co se stalo: 'Měla jsem pocit, že můj návrh nestojí za vyslechnutí, a přestala jsem mluvit.'\n\nProč to funguje: Mozek druhého slyší útok a okamžitě přejde do obrany — přestane poslouchat a začne se bránit. SBI útoku zabraňuje tím, že odděluje fakta od interpretace. Říkáš, co se stalo a co to udělalo tobě — ne jaký je druhý člověk.\n\nNejčastější chyba: Dopad se přemění v soud. 'Způsobilo mi to, že si myslím, že jsi nezodpovědná' — to není dopad, to je výrok o charakteru. Dopad je vždy o tobě: tvůj pocit, tvoje zkušenost, konkrétní důsledek.",
      examples: [
        "Špatně: 'Jsi vždy nepřipravená na schůzky.' Správně SBI: 'Na dnešní schůzce (S) jsi neměla připravené podklady, které jsme se dohodly (C) — musel se odložit rozhodovací bod a čekali jsme 20 minut (I).'",
        "Špatně: 'Nikdy mě neposloucháš.' Správně SBI: 'Když jsem dnes prezentovala návrh (S), přerušila jsi mě třikrát (C) — přestala jsem rozvíjet myšlenku a zbytek prezentace jsem zkrátila (I).'",
        "SBI funguje i pro pozitivní feedback: 'Na callu se zákazníkem (S) jsi shrnula jejich potřeby svými slovy (C) — zákazník se viditelně uvolnil a začal mluvit otevřeněji (I).'"
      ],
      quote_cz: "Feedback je dar. Ale jen pokud ho druhý dokáže přijmout.",
      quote_en: "Feedback is a gift. But only if the other person can receive it.",
      quote_author: "Center for Creative Leadership",
      quote2_cz: "Kritizuj chování, ne charakter.",
      quote2_en: "Criticize the behavior, not the person.",
      quote2_author: "Ken Blanchard"
    },

    // ─── UZEL 2: HRA — SBI stavebnice ─────────────────────────────────────────
    {
      id: "ch5n2", order: 2, type: "game",
      title: "SBI stavebnice",
      subtitle: "Sestav správný feedback ze tří fragmentů",
      emoji: "⚗️",
      gameType: "sbi-builder",
      gameData: {
        instruction: "Každá sada obsahuje 6 fragmentů — roztřiď je do tří košů: SITUACE (kdy/kde), CHOVÁNÍ (co přesně udělal/a), DOPAD (co to způsobilo tobě nebo situaci). Pozor: dopad nesmí být soud o osobě.",
        rounds: [
          {
            context: "Feedback kolegyni po prezentaci zákazníkovi",
            fragments: [
              { text: "Na včerejší prezentaci zákazníkovi", correct: "S", explanation: "Konkrétní moment — správná Situace." },
              { text: "Jsi vždy nepřipravená", correct: "wrong", explanation: "Generalizace 'vždy' — toto není SBI, je to útok." },
              { text: "Jsi nezodpovědná", correct: "wrong", explanation: "Soud o charakteru — SBI ho zakazuje." },
              { text: "Přeskočila jsi tři klíčové slidy bez vysvětlení", correct: "C", explanation: "Konkrétní pozorovatelné chování — správné C." },
              { text: "Zákazník se opakovaně ptal na věci, které jsme přeskočili, a schůzka se protáhla o 30 minut", correct: "I", explanation: "Konkrétní důsledek pro situaci — správný Dopad." },
              { text: "Myslím, že ti na zákaznících nezáleží", correct: "wrong", explanation: "Interpretace motivů — ne dopad, ale soud." }
            ]
          },
          {
            context: "Feedback kolegovi po týmové schůzce",
            fragments: [
              { text: "Dnes na ranní schůzce", correct: "S", explanation: "Konkrétní čas a místo — správná Situace." },
              { text: "Přerušil jsi mě čtyřikrát, když jsem prezentovala výsledky", correct: "C", explanation: "Přesně pozorovatelné chování — správné C." },
              { text: "Nedokončila jsem myšlenku a zbytek týmu ji neslyšel", correct: "I", explanation: "Konkrétní důsledek — správný Dopad." },
              { text: "Vždy si myslíš, že víš lépe", correct: "wrong", explanation: "Interpretace úmyslu — ne SBI." },
              { text: "Chováš se dominantně", correct: "wrong", explanation: "Hodnocení osobnosti — ne chování." },
              { text: "Bylo mi to nepříjemné", correct: "I", explanation: "Tvůj pocit je také platný Dopad — ale sám nestačí, kombinuj s konkrétním důsledkem." }
            ]
          },
          {
            context: "Pozitivní feedback šéfce po náročném projektu",
            fragments: [
              { text: "Když jsme minulý týden řešili krizi s klientem", correct: "S", explanation: "Konkrétní situace — správné S." },
              { text: "Nechala jsi mě vést řešení a zasáhla jen jednou s klíčovou informací", correct: "C", explanation: "Přesné pozorovatelné chování — správné C." },
              { text: "Měla jsem pocit, že mi důvěřuješ, a klienta jsme udrželi", correct: "I", explanation: "Tvůj pocit + konkrétní výsledek — silný Dopad." },
              { text: "Jsi skvělá manažerka", correct: "wrong", explanation: "Hodnocení osobnosti, ne SBI — i pozitivní feedback funguje lépe konkrétně." },
              { text: "Vždy děláš správná rozhodnutí", correct: "wrong", explanation: "Generalizace — 'vždy' nepatří do SBI." },
              { text: "Projekt byl úspěšný", correct: "wrong", explanation: "Příliš obecné — který projekt, co konkrétně?" }
            ]
          }
        ]
      },
      content: "3 kola, 6 fragmentů v každém. Roztřiď je: SITUACE / CHOVÁNÍ / DOPAD nebo ŠPATNĚ (ne SBI). Nejzáludnější jsou fragmenty, které vypadají jako dopad, ale jsou to ve skutečnosti soudy o člověku."
    },

    // ─── UZEL 3: REFLEXE — Můj feedback vzorec ────────────────────────────────
    {
      id: "ch5n3", order: 3, type: "reflection",
      title: "Můj feedback vzorec",
      subtitle: "Jak ho obvykle dávám?",
      emoji: "🔍",
      prompt: "Zamysli se: jak obvykle dáváš feedback v práci?\n\nVyhýbáš se mu — raději mlčíš, aby nedošlo ke konfliktu? Říkáš ho nepřímo — narážkami, humorem, 'jen se ptám'? Nebo ho říkáš rovnou, ale pak litujete jak to znělo?\n\nVzpomeň si na konkrétní situaci z posledního měsíce, kdy jsi feedback buď dala, nebo nedala a měla jsi. Co tě zastavilo nebo co jsi udělala jinak, než jsi chtěla? Jak by ta situace vypadala jako SBI?",
      placeholder: "Můj vzorec s feedbackem je obvykle: ...\n\nKonkrétní situace: ...\nCo se stalo nebo nestalo: ...\nJak by to znělo jako SBI: ..."
    },

    // ─── UZEL 4: TEORIE — Radical Candor ──────────────────────────────────────
    {
      id: "ch5n4", order: 4, type: "theory",
      title: "Radical Candor",
      subtitle: "Kim Scott — Radical Candor (2017)",
      emoji: "🍬",
      principle: "Care Personally. Challenge Directly.",
      content: "Kim Scott strávila roky v Googlu a Applu a přišla na to, že většina manažerů — a většina kolegů — dělá jednu ze dvou chyb: buď mlčí, aby neublížili (ruinous empathy), nebo říkají pravdu, ale bez ohledu na druhého (obnoxious aggression).\n\nRadical Candor je matice dvou os:\n\nCare Personally — záleží ti na člověku jako na osobě, ne jen jako na výkonu.\nChallenge Directly — říkáš pravdu přímo, i když je nepříjemná.\n\nČtyři kvadranty:\n\nRadical Candor (vysoké Care + vysoké Challenge): 'Tenhle report není dobře strukturovaný — a vím, že na to máš. Pojďme se podívat společně proč.' Upřímnost s péčí.\n\nRuinous Empathy (vysoké Care + nízké Challenge): Mlčíš nebo zmírňuješ, protože nechceš druhého zranit. Krátkodobě laskavé — dlouhodobě kruté. Člověk se nedozví, co musí změnit.\n\nObnoxious Aggression (nízké Care + vysoké Challenge): Říkáš pravdu, ale bez ohledu. 'Ten report je špatný.' Člověk slyší útok a přestane poslouchat.\n\nManipulative Insincerity (nízké Care + nízké Challenge): Říkáš to, co druhý chce slyšet. Neupřímný souhlas, prázdné pochvaly. Nejhorší kvadrant — ničí důvěru.\n\nNejčastější past profesionálních žen: Ruinous Empathy. Vychování k péči a harmonii způsobuje, že mlčíme nebo zjemňujeme, i když by upřímnost druhému opravdu pomohla.",
      examples: [
        "Ruinous Empathy v praxi: Kolegyně má špatný prezentační styl, všichni to vědí, nikdo jí to neřekne. Ona se dozví až od zákazníka — nebo se nedozví nikdy a přijde o příležitost.",
        "Radical Candor v praxi: 'Všimla jsem si, že na posledních třech schůzkách jsi neměla připravené podklady. Záleží mi na tom, abys uspěla — takže ti to říkám. Co se děje?'",
        "Test: Ptáš se sama sebe před zpětnou vazbou: 'Říkám to proto, že mi na ní záleží — nebo proto, abych vypadala dobře, nebo abych se vyhnula konfliktu?'"
      ],
      quote_cz: "Mlčení není laskavost. Je to zbabělost převlečená za slušnost.",
      quote_en: "Silence is not kindness. It's cowardice disguised as politeness.",
      quote_author: "Kim Scott",
      quote2_cz: "Radical Candor znamená říct pravdu lidem, kterým záleží na tobě — a tobě záleží na nich.",
      quote2_en: "Radical Candor is about caring personally while challenging directly.",
      quote2_author: "Kim Scott"
    },

    // ─── UZEL 5: HRA — Radical Candor mapa ───────────────────────────────────
    {
      id: "ch5n5", order: 5, type: "game",
      title: "Radical Candor mapa",
      subtitle: "Do kterého kvadrantu to patří?",
      emoji: "🗺️",
      gameType: "candor-quadrant",
      gameData: {
        timePerItem: 10,
        quadrants: [
          { id: "rc", label: "Radical Candor", desc: "Záleží mi + říkám přímo", color: "#2e7a55", bg: "#e3f4ef" },
          { id: "re", label: "Ruinous Empathy", desc: "Záleží mi + mlčím", color: "#b07a10", bg: "#fef4e0" },
          { id: "oa", label: "Obnoxious Aggression", desc: "Říkám přímo + nezáleží mi", color: "#a93a3a", bg: "#fce9e9" },
          { id: "mi", label: "Manipulative Insincerity", desc: "Neříkám + nezáleží mi", color: "#534AB7", bg: "#EEEDFE" }
        ],
        items: [
          { text: "Kolegyně má špatný prezentační styl. Všichni to vědí. Ty ji pochválíš, ať není smutná.", correct: "re", explanation: "Ruinous Empathy — záleží ti na ní, ale chráníš ji před pravdou, která by jí pomohla." },
          { text: "Šéfovi se nelíbí tvůj návrh. Řekneš: 'Chápu tvůj pohled, a zároveň mám data, která ukazují jinak — mohu je ukázat?'", correct: "rc", explanation: "Radical Candor — respektuješ ho a zároveň říkáš svůj názor přímo." },
          { text: "Kolega udělal chybu v reportu. Řekneš mu to před celým týmem bez varování.", correct: "oa", explanation: "Obnoxious Aggression — pravda bez péče. Člověk slyší útok, ne feedback." },
          { text: "Šéfka tě žádá o názor na strategii. Řekneš 'vypadá dobře', i když vidíš tři problémy.", correct: "mi", explanation: "Manipulative Insincerity — nejhorší kvadrant. Ani upřímnost, ani péče." },
          { text: "Kolegyně se tě ptá, jak jí šla prezentace. Řekneš: 'Obsah byl silný. Jedna věc k zamyšlení — v polovině jsi ztratila kontakt s publikem. Chceš vědět kdy?'", correct: "rc", explanation: "Radical Candor — pozitivní + konkrétní rozvoj. S péčí a přímo." },
          { text: "Kolega chodí pozdě na schůzky. Stěžuješ si na něj šéfce, ale jemu nic neříkáš.", correct: "mi", explanation: "Manipulative Insincerity — ani přímá komunikace, ani péče o vztah." },
          { text: "Kolegyně udělala velkou chybu. Řekneš jí to, ale přidáš: 'Stane se to každému, není to nic.' Přitom to opravdu problém je.", correct: "re", explanation: "Ruinous Empathy — chceš ji ochránit, ale tím jí bráníš pochopit závažnost." },
          { text: "Junior kolegovi řekneš: 'Ten mail byl příliš neformální pro zákazníka. Ukážu ti, jak ho přepsat — a taky proč na tom záleží.'", correct: "rc", explanation: "Radical Candor v praxi — přímá kritika s vysvětlením a pomocí." }
        ]
      },
      content: "8 situací z práce. Roztřiď každou do správného kvadrantu Radical Candor matice. 10 sekund na rozhodnutí — instinkt prozradí víc než přemýšlení."
    },

    // ─── UZEL 6: REFLEXE — Kdy mlčím ─────────────────────────────────────────
    {
      id: "ch5n6", order: 6, type: "reflection",
      title: "Kdy mlčím, protože se bojím?",
      subtitle: "Ruinous Empathy v mém životě",
      emoji: "🪞",
      prompt: "Vzpomeň si na dvě situace z posledního měsíce, kdy jsi neřekla, co si myslíš — nebo jsi to zjemnila tak, že se to ztratilo.\n\nPro každou situaci odpověz: Co jsi neřekla? Co tě zastavilo — strach z reakce, ze vztahu, z toho, že budeš 'ta problematická', z toho, že se mýlíš? Jaký byl důsledek tvého mlčení — pro druhou osobu, pro tebe, pro situaci? Jak by to znělo jako Radical Candor?",
      placeholder: "Situace 1: ...\nCo jsem neřekla: ...\nCo mě zastavilo: ...\nDůsledek mlčení: ...\nRadical Candor verze: ...\n\nSituace 2: ...\nCo jsem neřekla: ...\nCo mě zastavilo: ...\nDůsledek mlčení: ...\nRadical Candor verze: ..."
    },

    // ─── UZEL 7: TEORIE — Aktivní naslouchání ─────────────────────────────────
    {
      id: "ch5n7", order: 7, type: "theory",
      title: "Aktivní naslouchání",
      subtitle: "Carl Rogers + Crucial Conversations",
      emoji: "🎧",
      principle: "Poslouchat, ne čekat na svůj tah",
      content: "Carl Rogers, zakladatel humanistické psychologie, zjistil, že samotné pocítění, že jsi opravdu vyslyšena, má terapeutický účinek. Ne rady, ne řešení — ale skutečné slyšení.\n\nProblém je, že většina lidí neposlouchá. Čeká. Zatímco druhý mluví, formuluješ odpověď, hodnotíš, plánuješ protiargument. Výzkumy ukazují, že si pamatujeme jen 25–50 % toho, co slyšíme.\n\nTři nástroje aktivního naslouchání:\n\n(1) Parafráze — zopakuj vlastními slovy, co jsi slyšela. Ne papouškování — skutečné pochopení. 'Takže pokud tomu rozumím správně, říkáš, že...' Parafráze má dvojí efekt: druhý cítí, že ho slyšíš, a ty zjistíš, zda jsi opravdu pochopila.\n\n(2) Otevřené otázky — otázky, na které nelze odpovědět ano/ne. 'Jak ses při tom cítila?' místo 'Vadilo ti to?' Otevřené otázky zvou druhého hlouběji, uzavřené ho zastavují.\n\n(3) Ticho — nejpodceňovanější nástroj. Po otázce nebo po silné výpovědi: počkej. Nespěchej zaplnit ticho. Ticho dává druhému prostor, aby řekl, co opravdu chce říct — ne jen první vrstvu.\n\nZáludnost: Aktivní naslouchání se nedá předstírat. Lidé instinktivně poznají, zda jsi opravdu přítomná nebo jen čekáš na svůj tah.",
      examples: [
        "Kolegyně ti říká, že má problém se šéfem. Špatná reakce: 'Já měla taky jednou takového šéfa, a tady je co jsem dělala...' Dobrá reakce: 'Zní to náročně. Co tě na tom nejvíc vyčerpává?'",
        "Parafráze v praxi: 'Takže pokud tomu rozumím — cítíš, že tvůj příspěvek na projektu není vidět, i když jsi odvedla velkou část práce. Je to tak?' Druhý buď potvrdí, nebo upřesní.",
        "Ticho v praxi: Zeptáš se otevřenou otázkou. Druhý řekne větu. Počkáš 5 sekund. Často přijde druhá věta — ta pravá."
      ],
      quote_cz: "Být opravdu slyšen je tak blízko pocitu lásky, že je těžko rozlišit rozdíl.",
      quote_en: "When I am heard, it is so close to being loved that it is hard to tell the difference.",
      quote_author: "Carl Rogers",
      quote2_cz: "Většina lidí neposlouchá s úmyslem porozumět. Poslouchá s úmyslem odpovědět.",
      quote2_en: "Most people do not listen with the intent to understand. They listen with the intent to reply.",
      quote2_author: "Stephen R. Covey"
    },

    // ─── UZEL 8: HRA — Poslouchám, nebo čekám? ────────────────────────────────
    {
      id: "ch5n8", order: 8, type: "game",
      title: "Poslouchám, nebo čekám?",
      subtitle: "Vyber správnou reakci na výpověď",
      emoji: "👂",
      gameType: "listening-mode",
      gameData: {
        instruction: "Přečteš výpověď kolegy nebo kolegyně. Pak vyber nejlepší reakci ze čtyř možností: parafráze, otevřená otázka, rada, nebo ticho. Každá volba má kontext — někdy je správná více než jedna, ale vždy je jedna nejlepší.",
        scenarios: [
          {
            speaker: "Kolegyně po schůzce se šéfem",
            statement: "Nevím. Připadá mi, že cokoliv udělám, stejně to není ono. Dneska mi řekl, že report byl moc detailní. Minule, že moc stručný. Nevím, co chce.",
            options: [
              { type: "paraphrase", text: "Takže máš pocit, že dostáváš protichůdné signály a nevíš, co vlastně šéf očekává — je to tak?", quality: "best", explanation: "Parafráze ověřuje pochopení a dává jí pocit, že ji slyšíš. Ideální první krok." },
              { type: "question", text: "A zkusila jsi se ho přímo zeptat, co přesně chce?", quality: "ok", explanation: "Dobrá otázka — ale trochu předčasná. Nejdřív nech, ať se cítí vyslyšena." },
              { type: "advice", text: "Já bych na tvém místě zkusila napsat kratší verzi a přiložit detailní přílohu.", quality: "weak", explanation: "Rada přichází příliš brzy. Nevíš ještě, co opravdu potřebuje." },
              { type: "silence", text: "(mlčíš a čekáš)", quality: "ok", explanation: "Ticho je legitimní — ale bez parafrázování nevíš, zda jsi pochopila správně." }
            ]
          },
          {
            speaker: "Kolega po neúspěšné prezentaci zákazníkovi",
            statement: "Prostě... nevím. Myslel jsem, že to mám dobře připravené. Zákazník se tvářil znuděně a pak začal kontrolovat telefon. Hrozný pocit.",
            options: [
              { type: "paraphrase", text: "Takže jsi dal do toho práci, byl jsi připravený — a přesto to nešlo. To musí být frustrující.", quality: "best", explanation: "Pojmenuješ jeho pocit a validuješ ho. To je základ aktivního naslouchání." },
              { type: "question", text: "Co si myslíš, kde to šlo špatně?", quality: "ok", explanation: "Dobrá otázka — ale nejdřív musí cítit, že ho slyšíš, ne že ho posíláš do analýzy." },
              { type: "advice", text: "Příště zkus začít s jednou silnou větou — to zákazníky hned chytne.", quality: "weak", explanation: "Rada bez empatie. Slyší: 'udělal jsi to špatně, tady je fix.' Ne to, co potřebuje." },
              { type: "silence", text: "(mlčíš a čekáš)", quality: "ok", explanation: "Ticho po tak osobní výpovědi může být mocné — dáváš mu prostor. Ale parafráze by ho víc podpořila." }
            ]
          },
          {
            speaker: "Šéfka během 1:1",
            statement: "Chci, abys převzala koordinaci nového projektu. Budeš mít víc odpovědnosti.",
            options: [
              { type: "paraphrase", text: "Takže bych byla zodpovědná za koordinaci celého projektu — včetně komunikace s ostatními týmy?", quality: "best", explanation: "Parafráze ověřuje rozsah — a v tomto případě je to kritické. Lépe teď než po třech týdnech s jiným pochopením." },
              { type: "question", text: "Co konkrétně ta koordinace obnáší?", quality: "best", explanation: "Výborná otevřená otázka — v kontextu nového zadání je přesně správná." },
              { type: "advice", text: "Myslím, že bych to zvládla, ale potřebovala bych víc informací.", quality: "weak", explanation: "Předčasné hodnocení vlastních schopností — nejdřív pochop, co přesně chce." },
              { type: "silence", text: "(mlčíš a čekáš)", quality: "weak", explanation: "Ticho zde nefunguje — šéfka čeká na tvoji reakci, ne na prostor pro reflexi." }
            ]
          }
        ]
      },
      content: "3 reálné situace. Po každé výpovědi vyber nejlepší reakci ze čtyř. Pak uvidíš, proč ta volba funguje nebo nefunguje — a co by bylo lepší."
    },

    // ─── UZEL 9: TEORIE — Crucial Conversations ───────────────────────────────
    {
      id: "ch5n9", order: 9, type: "theory",
      title: "Crucial Conversations",
      subtitle: "Patterson, Grenny, McMillan, Switzler (2002)",
      emoji: "🌡️",
      principle: "Klíčové konverzace se nevyhýbají — vedou se dobře",
      content: "Kerry Patterson a jeho kolegové definují Crucial Conversations jako rozhovory, kde platí kombinace tří věcí: vysoké sázky, různé názory a silné emoce. Pracovní pohovor, žádost o povýšení, konflikt s kolegou, nepříjemná pravda zákazníkovi.\n\nVětšina lidí reaguje jedním ze dvou způsobů: buď konverzaci vyhýbá (mlčí, odkládá, posílá mail místo hovoru) nebo ji přehřeje (přijde s přílišnou emocí a situaci eskaluje). Oba způsoby selhávají.\n\nKlíčový koncept: Pool of Shared Meaning. Každý člověk přichází do konverzace se svým 'bazénkem' faktů, pocitů a příběhů. Cíl klíčové konverzace není vyhrát — je to rozšířit sdílený bazének porozumění. Čím větší sdílený bazének, tím lepší rozhodnutí.\n\nČtyři kroky klíčové konverzace:\n\n(1) Start with Heart — proč tuto konverzaci vedu? Co opravdu chci? Jaký vztah chci mít po ní? Než začneš, zkontroluj svůj záměr.\n\n(2) Make it safe — lidé přestávají otevřeně komunikovat, když necítí bezpečí. Signály: tichý ústup, sarkasmus, útok, přerušování. Bezpečí obnov tím, že pojmenuješ záměr: 'Říkám ti to proto, že mi na tobě záleží.'\n\n(3) STATE your path — Share facts (fakta, ne interpretace), Tell your story (tvůj příběh o situaci), Ask for their paths (požádej o jejich pohled), Talk tentatively (mluv s otazníkem), Encourage testing (vyzvi ke zpochybnění).\n\n(4) Explore others' paths — aktivně hledej jejich pohled. Nejsilnější otázka: 'Pomoz mi pochopit, jak to vidíš ty.'",
      examples: [
        "Pool of shared meaning: Ty si myslíš, že kolega je líný. On si myslí, že nebyl jasný brief. Dokud nesdílíte tato dvě fakta, rozhovor bude o různých věcech.",
        "Make it safe: Kolega začíná být defenzivní. Zastav se: 'Počkej — chci, abys věděl, že tě neútočím. Říkám ti to proto, že si myslím, že to důležité.' Pak pokračuj.",
        "Start with Heart: Před těžkým rozhovorem se zeptej sama sebe: 'Co opravdu chci? Chci, aby kolega věděl, že chyboval — nebo chci, aby se situace nezopakovala?' To jsou dvě různé konverzace."
      ],
      quote_cz: "Způsob, jakým vedeme klíčové konverzace, formuje kvalitu našich vztahů — a tím i kvalitu našich životů.",
      quote_en: "The way we handle crucial conversations shapes the quality of our relationships and, ultimately, the quality of our lives.",
      quote_author: "Kerry Patterson",
      quote2_cz: "Nejlepší způsob jak vyřešit problém je mluvit o něm dřív, než se stane krizí.",
      quote2_en: "The best way to solve a problem is to talk about it before it becomes a crisis.",
      quote2_author: "Joseph Grenny"
    },

    // ─── UZEL 10: HRA — Crucial Conversation simulator ────────────────────────
    {
      id: "ch5n10", order: 10, type: "game",
      title: "Klíčová konverzace",
      subtitle: "Simulátor — 3 kroky, větvená logika",
      emoji: "🌋",
      gameType: "crucial-convo-builder",
      gameData: {
        scenarios: [
          {
            title: "Žádost o povýšení",
            setup: "Jsi na 1:1 se šéfkou. Pracuješ v firmě 18 měsíců, máš dobré výsledky, ale povýšení se nikdy nezmínilo. Chceš to otevřít.",
            steps: [
              {
                prompt: "Jak konverzaci zahájíš?",
                options: [
                  { text: "Chtěla bych se zeptat na moje kariérní možnosti ve firmě — konkrétně na to, co by muselo nastat, abych se mohla posunout na vyšší pozici.", quality: "best", explanation: "Start with Heart — jasný záměr, otevřená otázka, bez útoku. Ideální otevření." },
                  { text: "Mám pocit, že dělám práci seniorní pozice a platí mi juniorní plat.", quality: "ok", explanation: "Fakta bez přípravy mohou znít jako útok. Chybí záměr — proč to říkáš?" },
                  { text: "Kdy dostanu povýšení? Jsem tu 18 měsíců.", quality: "weak", explanation: "Ultimátum bez kontextu. Šéfka přejde do obrany dřív, než konverzace začne." }
                ]
              },
              {
                prompt: "Šéfka říká: 'Oceňuji tvoji práci, ale teď není správný čas.' Jak reaguješ?",
                options: [
                  { text: "Rozumím. Mohu se zeptat — co by ten správný čas definovalo? Jaké konkrétní kroky bych měla udělat?", quality: "best", explanation: "Make it safe + Explore their path. Nepřijímáš ne jako konec — ale hledáš cestu vpřed." },
                  { text: "Dobře, rozumím.", quality: "weak", explanation: "Ruinous Empathy — přijímáš odpověď, i když ti nic neříká. Konverzace skončila bez výsledku." },
                  { text: "Ale já myslím, že čas je správný — mám výsledky a firma roste.", quality: "ok", explanation: "Obhajoba je legitimní, ale bez otázky to vypadá jako spor, ne dialog." }
                ]
              },
              {
                prompt: "Šéfka se zamyslí a řekne: 'Upřímně — potřebuješ víc viditelnosti napříč firmou.' Jak zakončíš konverzaci?",
                options: [
                  { text: "To je pro mě velmi užitečné. Takže pokud tomu rozumím — kdybych v příštích třech měsících udělala X a Y, bylo by to relevantní pro přehodnocení?", quality: "best", explanation: "Parafráze + konkrétní next step. Odcházíš s jasnou dohodou, ne s nejasným příslibem." },
                  { text: "Dobře, budu se snažit být víc viditelná.", quality: "weak", explanation: "Příliš vágní. Co znamená 'viditelná'? Za měsíc budete mít jiné pochopení téhož slova." },
                  { text: "A co to konkrétně znamená — viditelnost?", quality: "ok", explanation: "Správná otázka — ale chybí uzavření s next stepem." }
                ]
              }
            ]
          },
          {
            title: "Konflikt s kolegou",
            setup: "Kolega opakovaně přebírá tvoje úkoly na schůzkách — mluví za tebe, doplňuje tvoje věty, prezentuje výsledky tvé práce jako společné. Chceš to s ním probrat.",
            steps: [
              {
                prompt: "Kde a jak konverzaci zahájíš?",
                options: [
                  { text: "Požádám ho o krátký hovor pod čtyřma očima — ne na schůzce, ne mailem.", quality: "best", explanation: "Správná volba prostředí — crucial conversations patří do soukromí, ne na veřejnost." },
                  { text: "Na příští schůzce, kdy to udělá znovu, ho zastavím před ostatními.", quality: "weak", explanation: "Veřejná konfrontace vytvoří obrannou reakci a poškodí vztah i tvoji reputaci." },
                  { text: "Napíšu mu mail, ať to nemusím říkat osobně.", quality: "weak", explanation: "Mail chybí tón a kontext — klíčové konverzace se nedají dobře vést písemně." }
                ]
              },
              {
                prompt: "Jak to otevřeš v rozhovoru?",
                options: [
                  { text: "Všimla jsem si něčeho, co mi dělá starosti, a chci to s tebou probrat. Na posledních třech schůzkách jsi dokončoval moje věty a prezentoval výsledky mé části jako sdílené. Jak to vidíš ty?", quality: "best", explanation: "SBI + Explore their path. Fakta bez soudu a okamžitá otázka na jeho pohled." },
                  { text: "Potřebuji, abys přestal mluvit za mě na schůzkách.", quality: "ok", explanation: "Přímé — ale bez SBI to může znít jako útok. Chybí his side of the story." },
                  { text: "Nechápu proč to děláš, ale vadí mi to.", quality: "weak", explanation: "Nejasné a emocionálně nabité. Chybí konkrétní situace a jeho pohled." }
                ]
              },
              {
                prompt: "Kolega říká: 'To jsem takhle nemyslel, jen jsem chtěl pomoct.' Jak reaguješ?",
                options: [
                  { text: "Tomu věřím a jsem ráda, že to slyším. Zároveň — efekt na mě byl, že jsem se cítila přeskočená. Mohli bychom se domluvit, jak to fungovat jinak?", quality: "best", explanation: "Přijímáš jeho záměr + pojmenuješ dopad + hledáš dohodu. Přesný Radical Candor." },
                  { text: "Dobře, nevadí, zapomeňme na to.", quality: "weak", explanation: "Ruinous Empathy — přijímáš jeho vysvětlení a problém neřešíš. Stane se to znovu." },
                  { text: "I tak to není v pořádku.", quality: "ok", explanation: "Stojíš si za svým — ale bez konstruktivního kroku dál. Konverzace nikam nevede." }
                ]
              }
            ]
          }
        ]
      },
      content: "2 reálné klíčové konverzace — žádost o povýšení a konflikt s kolegou. Každá má 3 kroky a větvená rozhodnutí. Na konci vidíš, jak by konverzace dopadla s různými volbami."
    },

    // ─── UZEL 11: TEORIE — Nonviolent Communication ───────────────────────────
    {
      id: "ch5n11", order: 11, type: "theory",
      title: "Nonviolent Communication",
      subtitle: "Marshall Rosenberg — NVC (1960s–2003)",
      emoji: "🕊️",
      principle: "Za každým chováním je potřeba. Za každou kritikou je přání.",
      content: "Marshall Rosenberg byl americký psycholog, který strávil desetiletí v oblastech konfliktu — od amerických škol po válečné zóny v Africe a na Blízkém východě. Jeho závěr: většina konfliktů vzniká proto, že lidé vyjadřují potřeby způsobem, který druhý slyší jako útok.\n\nNVC stojí na čtyřech krocích:\n\n(1) Pozorování — co se objektivně stalo. Bez hodnocení. 'Přišel jsi na schůzku 20 minut po začátku' — ne 'vždy chodíš pozdě.'\n\n(2) Pocit — co cítím já. Ne interpretace druhého. 'Cítila jsem se nervózní' — ne 'cítila jsem, že ti nezáleží.' Druhá věta je interpretace, ne pocit.\n\n(3) Potřeba — jaká moje potřeba nebyla naplněna. 'Potřebuji spolehlivost a předvídatelnost v týmu.' Potřeba je univerzální — za ní lze najít pochopení.\n\n(4) Prosba — konkrétní, splnitelná, ne příkaz. 'Bylo by možné, abys mi napsal předem, když budeš mít zpoždění?' Prosba dává druhému svobodu — příkaz ji bere.\n\nProč to funguje: Útok aktivuje obranný mozek. Sdílení pocitu a potřeby aktivuje empatii. Stejný obsah — jiný efekt.\n\nNejdůležitější insight Rosenberga: Za každou kritikou je přání. Když někdo říká 'ty nikdy neposloucháš', přeje si být slyšen. Když říká 'jsi nezodpovědná', přeje si spolehlivost. NVC tě učí slyšet přání za kritikou — a odpovídat na to, co opravdu potřebuje.",
      examples: [
        "Útok: 'Nikdy mě neposloucháš.' NVC: 'Když jsem dnes prezentovala a přerušil jsi mě (pozorování), cítila jsem frustraci (pocit), protože potřebuji vědět, že moje myšlenky mají prostor (potřeba). Bylo by možné, abys nechal, až dokončím větu? (prosba)'",
        "Slyšet kritiku jako potřebu: Šéf říká 'ty reporty jsou vždy nepřehledné.' NVC filtr: Co potřebuje? Pravděpodobně přehlednost, rychlé pochopení, pocit kontroly. Místo obrany: 'Co by pro tebe bylo nejpřehlednější?'",
        "Prosba vs. příkaz: 'Musíš chodit včas' = příkaz. 'Bylo by možné přijít nejpozději v čas, nebo mi napsat předem?' = prosba. Stejný obsah — druhý slyší žádost, ne útok."
      ],
      quote_cz: "Nikdy nedělej nic, co není hra. Pokud to hra není, nevydá to za to.",
      quote_en: "Never do anything that isn't play. If it isn't play, it isn't worth doing.",
      quote_author: "Marshall Rosenberg",
      quote2_cz: "Za každou kritikou je přání. Nauč se ho slyšet.",
      quote2_en: "Behind every criticism is a wish. Learn to hear it.",
      quote2_author: "Marshall Rosenberg"
    },

    // ─── UZEL 12: HRA — NVC přepisovač ───────────────────────────────────────
    {
      id: "ch5n12", order: 12, type: "game",
      title: "NVC přepisovač",
      subtitle: "Přepiš útok na potřebu — 4 kroky",
      emoji: "🔄",
      gameType: "nvc-rewriter",
      gameData: {
        instruction: "Každá situace obsahuje útočnou větu. Tvůj úkol: roztřiď 4 fragmenty do správných kroků NVC — Pozorování, Pocit, Potřeba, Prosba. Záludnost: pocit nesmí být interpretace druhého, prosba nesmí být příkaz.",
        rounds: [
          {
            original: "Ty nikdy nedodáváš věci včas!",
            fragments: [
              { text: "Report z minulého týdne přišel o 2 dny po dohodnutém termínu", correct: "O", explanation: "Konkrétní pozorování bez hodnocení — správné." },
              { text: "Cítím se frustrovaná a nejistá ohledně dalšího plánování", correct: "P", explanation: "Vlastní pocit — ne interpretace druhého. Správně." },
              { text: "Cítím, že ti na projektu nezáleží", correct: "wrong", explanation: "Tohle není pocit — je to interpretace záměru druhého. NVC to zakazuje." },
              { text: "Potřebuji mít jistotu, že termíny jsou závazné, abych mohla plánovat svoji část", correct: "N", explanation: "Univerzální potřeba — spolehlivost. Správně." },
              { text: "Musíš příště dodat včas", correct: "wrong", explanation: "Příkaz, ne prosba. NVC dává druhému svobodu volby." },
              { text: "Bylo by možné, abys mi napsal den předem, pokud termín nestihnete?", correct: "PR", explanation: "Konkrétní, splnitelná prosba — správně." }
            ]
          },
          {
            original: "Vždy mi skáčeš do řeči a nikdo mě neposlouchá!",
            fragments: [
              { text: "Dnes na schůzce jsi mě třikrát přerušil, než jsem dokončila větu", correct: "O", explanation: "Konkrétní, pozorovatelné — správné." },
              { text: "Cítím se přehlížená a mám starost, že moje myšlenky se nedostanou k ostatním", correct: "P", explanation: "Vlastní pocit — správně." },
              { text: "Potřebuji prostor dokončit myšlenku, aby ostatní mohli posoudit celý návrh", correct: "N", explanation: "Potřeba prostoru a spravedlivého slyšení — správně." },
              { text: "Cítím, že mě záměrně ignoruješ", correct: "wrong", explanation: "Interpretace záměru — ne pocit. NVC ho nepoužívá." },
              { text: "Přestaň mě přerušovat", correct: "wrong", explanation: "Příkaz — ne prosba." },
              { text: "Bylo by možné nechat mě dokončit větu? Pokud chceš doplnit, klidně potom.", correct: "PR", explanation: "Konkrétní prosba s nabídkou — výborně." }
            ]
          },
          {
            original: "Tento report je katastrofa. Jak jsi to mohla odevzdat?",
            fragments: [
              { text: "V reportu chybí executive summary a tři datové zdroje nejsou citovány", correct: "O", explanation: "Fakta bez hodnocení — správné." },
              { text: "Cítím znepokojení, protože report jde zítra zákazníkovi", correct: "P", explanation: "Vlastní pocit v kontextu — správně." },
              { text: "Potřebuji, aby reporty které jdou ven splňovaly náš standard — kvůli důvěryhodnosti firmy", correct: "N", explanation: "Potřeba standardu a reputace — správně." },
              { text: "Jsi nezodpovědná", correct: "wrong", explanation: "Hodnocení osoby — ne NVC." },
              { text: "Byl bys schopen doplnit summary a citace do 16:00?", correct: "PR", explanation: "Konkrétní, časově ohraničená prosba — správně." },
              { text: "Tohle musíš předělat hned", correct: "wrong", explanation: "Příkaz bez kontextu a prosby — ne NVC." }
            ]
          }
        ]
      },
      content: "3 útočné věty z reálné práce. U každé roztřiď 6 fragmentů do 4 kroků NVC: Pozorování / Pocit / Potřeba / Prosba — nebo označ jako ŠPATNĚ pokud fragment do NVC nepatří."
    },

    // ─── UZEL 13: REFLEXE — Konverzace, která čeká ────────────────────────────
    {
      id: "ch5n13", order: 13, type: "reflection",
      title: "Konverzace, která čeká",
      subtitle: "Co odkládám a proč?",
      emoji: "📞",
      prompt: "Jakou konverzaci v práci nebo v životě odkládáš? Může to být feedback, který jsi měla dát. Žádost, kterou jsi ještě nepodala. Konflikt, který si přeješ, aby se vyřešil sám.\n\nNapiš: Kdo, co, jak dlouho to odkládáš? Co tě zastavuje — strach z reakce, ze vztahu, z vlastního výkonu v té konverzaci? Co nejhoršího se může stát, když ji budeš dál odkládat? Jaký by byl první krok — ne celá konverzace, jen první krok?",
      placeholder: "Konverzace, kterou odkládám: ...\nS kým a jak dlouho: ...\nCo mě zastavuje: ...\nCo nejhoršího se stane, když ji nebudu mít: ...\nPrvní krok (jen první): ..."
    },

    // ─── UZEL 14: VÝZVA — Co si odnáším ──────────────────────────────────────
    {
      id: "ch5n14", order: 14, type: "challenge",
      title: "Co si odnáším",
      subtitle: "Shrnutí kapitoly 5",
      emoji: "🏔️",
      challengeDesc: "Prošla jsi celou pátou kapitolu. Naučila ses pět nástrojů, které většina lidí nikdy nepoužije — ne proto, že by je neznala, ale proto, že to chce odvahu.\n\n5 konceptů vlastními slovy — SBI, Radical Candor, Aktivní naslouchání, Crucial Conversations, NVC. Ne definice — co ti z každého zůstalo.\n\n4 situace z tvého reálného života, kde bys jeden z nástrojů mohla použít. Konkrétně — kdo, co, kdy.\n\n3 věci, které ti v komunikaci jdou přirozeně — a na které můžeš stavět.\n\n2 vzorce, které chceš změnit — mlčení místo feedbacku, zjemňování místo upřímnosti, nebo jiné.\n\n1 konverzace, kterou uděláš tento týden — ne za měsíc, ne až budeš připravená. Tuto kapitolu zakončuje akce.",
      challengeDays: 0
    }

  ]
};
