# Progress

## Úkol 1 — Navigace: kliknutí na "Buddy Path" vrátí na mapu
- [x] Opraven broken import v page.tsx
- [x] Vytvořen BrandLink.tsx — "use client" tlačítko, dispatche CustomEvent("brand-click")
- [x] page.tsx aktualizován — BrandLink nahrazuje statický logo span
- [x] PathMap.tsx — listener na "brand-click" → setActive(null), zavře detail bez ztráty postupu

## Úkol 2 — Bug: kruhy zmizí po návratu z detailu
- [x] ResizeObserver nikdy nenastaví cw na 0 (guard: if (w > 0) setCw(w))
- [x] Přidán useEffect([active]) — re-measure via requestAnimationFrame při active → null
- [x] Map div zůstává vždy v DOM (display:none/block) — containerRef nikdy nepřijde o element

## Úkol 3 — 12 uzlů + PathMap POS
- [x] chapter1.ts — aktualizovaný interface (mechanic: string, bodyAreas, transformerType)
- [x] chapter1.ts — 12 uzlů: 4× theory, 5× game, 2× reflection, 1× challenge
- [x] PathMap.tsx — POS pro 12 uzlů (S-křivka: center → pravý peak → center → levý peak → center)
- [x] TheoryView — quote2 nahoře, content, examples, quote dole
- [x] BodyMapGame — používá node.bodyAreas, přidána oblast čelist
- [x] FactOrStoryGame — feedback po každé kartě (n4 i n11), porovnání n4 vs n11 na konci
- [x] AddYetGame — nápovědy z node.examples jako klikatelné chipy
- [x] SemaforReflection (n7) — vertikální slider, popisky z node.placeholder
- [x] MirrorForm (n10) — 4 povinná pole (Událost/Příběh/Pocit/Nové rozhodnutí)
- [x] GameView + ReflectionView routing aktualizovány
- [x] TypeScript — 0 chyb

## Úkol 4 — Supabase instalace + konfigurace
- [x] npm install @supabase/supabase-js
- [x] src/lib/supabase.ts — klient + typy (Profile, Progress, DiaryEntry, CoachNote)
- [x] SUPABASE_SETUP.md — instrukce + SQL migrace pro 4 tabulky

## Úkol 5 — Onboarding (3 kroky)
- [x] src/components/Onboarding.tsx — welcome → jméno → avatar (🦊🦉🐼🐱🦦🐸)
- [x] Uloží profil do Supabase profiles, zapíše profile_id do localStorage
- [x] page.tsx přepsán — kontroluje localStorage, zobrazí Onboarding nebo HomeHeader+PathMap

## Úkol 6 — HomeHeader se streak logikou
- [x] src/components/HomeHeader.tsx — streak check/update (yesterday/dnes porovnání)
- [x] Zobrazuje avatar, jméno, rekord, 🔥 série, progress bar s emoji uzlů

## Úkol 7 — Deník
- [x] src/components/Diary.tsx — nový záznam (mood emoji picker + text), seznam, mazání
- [x] src/app/diary/page.tsx — stránka deníku
- [x] Backed by Supabase diary_entries

## Úkol 8 — Coach stránka
- [x] src/app/coach/page.tsx — password gate (buddycoach2024)
- [x] 3 taby: Profily (seznam s linky), Porovnání (tabulka, sort), Poznámky (poznámky ke klientovi)

## Úkol 9 — Coach profil detail
- [x] src/app/coach/profile/[id]/page.tsx — detail uživatele
- [x] Aktivitní kalendář (6 týdnů), postup uzlů, semafor slider, story bias n4 vs n11
- [x] Deník, auto-shrnutí, poznámky kouče, export .txt
- [x] TypeScript — 0 chyb, build ✓
