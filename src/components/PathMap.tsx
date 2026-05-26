"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { chapter1, type PathNode, type NodeType, type Chapter } from "@/data/chapter1";
import { chapter2 } from "@/data/chapter2";
import { chapter3 } from "@/data/chapter3";
import { supabase } from "@/lib/supabase";

const ALL_CHAPTERS: { id: string; number: number; title: string; chapter: Chapter | null }[] = [
  { id: "ch1",  number: 1,  title: "Všímej si",   chapter: chapter1 },
  { id: "ch2",  number: 2,  title: "Vzorce",       chapter: chapter2 },
  { id: "ch3",  number: 3,  title: "Ownership",    chapter: chapter3 },
  { id: "ch4",  number: 4,  title: "Priority",     chapter: null },
  { id: "ch5",  number: 5,  title: "Komunikace",   chapter: null },
  { id: "ch6",  number: 6,  title: "Energie",      chapter: null },
  { id: "ch7",  number: 7,  title: "Můj hlas",     chapter: null },
  { id: "ch8",  number: 8,  title: "Strategie",    chapter: null },
  { id: "ch9",  number: 9,  title: "Feedback",     chapter: null },
  { id: "ch10", number: 10, title: "Viditelnost",  chapter: null },
  { id: "ch11", number: 11, title: "Tým",          chapter: null },
  { id: "ch12", number: 12, title: "Reflexe",      chapter: null },
];

/* ─── layout ──────────────────────────────────────────────────────────────── */
const NS     = 64;
const R      = NS / 2;
const MASK_R = R - 2;
const LABEL_W = 160;
const LABEL_H = 66;
const ROW_H  = 112;
const GAP    = 10;

/* ─── S-wave positions — computed dynamically per chapter ─────────────────── */
function computePos(n: number): [number, number][] {
  if (n < 2) return [[50, 0]];
  const mid = Math.floor(n / 2);
  return Array.from({ length: n }, (_, i) => {
    let x: number;
    if (i <= mid) {
      x = 50 + 30 * Math.sin(Math.PI * i / mid);
    } else {
      const steps = n - 1 - mid;
      x = 50 - 30 * Math.sin(Math.PI * (i - mid) / steps);
    }
    return [Math.round(x), i] as [number, number];
  });
}

/* ─── type config ─────────────────────────────────────────────────────────── */
const TMAP: Record<NodeType, { label: string; icon: string; accent: string; accentBg: string; bg: string; btn: string }> = {
  theory:     { label: "Teorie",  icon: "📖", accent: "#2f5fa3", accentBg: "#dae8f8", bg: "#eaf3fc", btn: "#2f5fa3" },
  game:       { label: "Hra",     icon: "🎮", accent: "#b87012", accentBg: "#fde8c4", bg: "#fff4e0", btn: "#b87012" },
  reflection: { label: "Reflexe", icon: "✍️", accent: "#2e7a66", accentBg: "#c8e8e1", bg: "#e3f4ef", btn: "#2e7a66" },
  challenge:  { label: "Výzva",   icon: "🏆", accent: "#a93a3a", accentBg: "#f5cece", bg: "#fce9e9", btn: "#a93a3a" },
};

/* ─── helpers ─────────────────────────────────────────────────────────────── */
function makePath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const my = (a.y + b.y) / 2;
    d += ` C ${a.x} ${my},${b.x} ${my},${b.x} ${b.y}`;
  }
  return d;
}

function labelLeft(cx: number, xPct: number): number {
  return xPct <= 52 ? cx + R + GAP : cx - R - GAP - LABEL_W;
}

function saveInsight(nodeId: string, inputData: unknown, textResponse: string) {
  if (typeof window === "undefined") return;

  try {
    const prev = JSON.parse(localStorage.getItem("user_insights") || "[]");
    prev.push({
      timestamp:     new Date().toISOString(),
      node_id:       nodeId,
      input_data:    inputData,
      text_response: textResponse,
      status:        "completed",
    });
    localStorage.setItem("user_insights", JSON.stringify(prev));
  } catch (e) {
    console.error("[saveInsight] localStorage error:", e);
  }

  const pid = localStorage.getItem("profile_id");
  if (!pid || pid.startsWith("local_")) return;

  const content: Record<string, unknown> = {
    ...(inputData && typeof inputData === "object" ? inputData as Record<string, unknown> : {}),
    ...(textResponse ? { text: textResponse } : {}),
  };

  (async () => {
    try {
      await supabase.from("insights").upsert(
        { profile_id: pid, node_id: nodeId, content, created_at: new Date().toISOString() },
        { onConflict: "profile_id,node_id" }
      );
    } catch {
      /* tiché selhání */
    }
  })();
}

/* ─── shared header ───────────────────────────────────────────────────────── */
function NodeHeader({ node }: { node: PathNode }) {
  const t = TMAP[node.type];
  return (
    <div className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg,${t.bg},${t.accentBg})` }}>
      <div className="text-4xl mb-3">{node.emoji}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,.82)", color: t.accent }}>
          {t.icon} {t.label}
        </span>
        {node.principle && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,.55)", color: "#5a6a74" }}>
            {node.principle}
          </span>
        )}
      </div>
      <h2 className="text-2xl font-bold mt-1" style={{ color: "#18283a" }}>{node.title}</h2>
      <p className="text-sm mt-0.5" style={{ color: "#5a6a74" }}>{node.subtitle}</p>
    </div>
  );
}

function Quote({ cz, en, author, accent }: { cz: string; en?: string; author?: string; accent: string }) {
  return (
    <blockquote className="rounded-xl p-4" style={{ background: "#f8f5ef", borderLeft: `3px solid ${accent}` }}>
      <p className="italic text-sm leading-relaxed" style={{ color: "#3c4a54" }}>„{cz}"</p>
      {en && <p className="text-[11px] italic mt-1" style={{ color: "#9e9288" }}>{en}</p>}
      {author && <p className="text-[11px] font-semibold mt-1" style={{ color: accent }}>— {author}</p>}
    </blockquote>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   THEORY VIEW
   ════════════════════════════════════════════════════════════════════════════ */
function TheoryView({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const t = TMAP[node.type];
  return (
    <div className="space-y-5">
      <NodeHeader node={node} />

      {node.quote2_cz && (
        <Quote cz={node.quote2_cz} en={node.quote2_en} author={node.quote2_author} accent={t.accent} />
      )}

      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        {(node.content ?? "").split("\n\n").map((para, i) => (
          <p key={i} className="leading-relaxed mb-3 last:mb-0" style={{ color: "#3c4a54", fontSize: 15 }}>{para}</p>
        ))}
      </div>

      {node.examples && node.examples.length > 0 && (
        <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <h3 className="text-[11px] uppercase tracking-widest font-bold mb-4" style={{ color: "#9e9288" }}>
            Příklady ze života
          </h3>
          {node.examples.map((ex, i) => (
            <div key={i} className="flex gap-3 mb-3 last:mb-0">
              <div className="w-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: t.accent + "55" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#3c4a54" }}>{ex}</p>
            </div>
          ))}
        </div>
      )}

      {node.quote_cz && (
        <Quote cz={node.quote_cz} en={node.quote_en} author={node.quote_author} accent={t.accent} />
      )}

      <button onClick={() => { saveInsight(node.id, {}, ""); onDone(); }}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
        style={{ background: t.btn }}>
        Pokračovat →
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME COMPONENTS
   ════════════════════════════════════════════════════════════════════════════ */

/* ── The Gap ──────────────────────────────────────────────────────────────── */
function TheGapGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const [gap, setGap] = useState(10);
  const unlocked = gap >= 200;
  const t = TMAP[node.type];
  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-6 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-[11px] uppercase tracking-widest font-bold mb-6 text-center" style={{ color: "#9e9288" }}>
          Roztáhni prostor mezi nimi
        </p>
        <div className="flex items-center justify-center overflow-hidden" style={{ minHeight: 72 }}>
          <div className="flex items-center flex-nowrap" style={{ gap: Math.min(gap, 260) }}>
            <span className="text-lg font-bold tracking-widest uppercase select-none" style={{ color: "#2f5fa3" }}>PODNĚT</span>
            <span className="text-lg font-bold tracking-widest uppercase select-none" style={{ color: "#a93a3a" }}>REAKCE</span>
          </div>
        </div>
        {unlocked && (
          <p className="text-center text-sm font-semibold mt-2" style={{ color: "#2e7a66" }}>
            Tady jsi svobodný/á.
          </p>
        )}
        <input type="range" min={10} max={280} value={gap}
          onChange={e => setGap(parseInt(e.target.value))}
          className="w-full mt-5" style={{ accentColor: "#2f5fa3" }} />
        <p className="text-xs text-center mt-2" style={{ color: unlocked ? "#2e7a66" : "#9e9288" }}>
          {unlocked ? "✓ Prostor je tady" : `ještě ${200 - gap} px`}
        </p>
      </div>
      {unlocked && node.quote_cz && (
        <Quote cz={node.quote_cz} en={node.quote_en} author={node.quote_author} accent={t.accent} />
      )}
      <button onClick={() => { saveInsight(node.id, { gap }, ""); onDone(); }}
        disabled={!unlocked}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        Pokračovat →
      </button>
    </div>
  );
}

/* ── Fact or Story ────────────────────────────────────────────────────────── */
function FactOrStoryGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const cards = node.cards ?? [];
  const isAdvanced = node.id === "n11";
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; label: string } | null>(null);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const t = TMAP[node.type];

  const answer = (choice: "fact" | "story") => {
    const isRight = choice === cards[idx].type;
    const nextCorrect = correct + (isRight ? 1 : 0);
    setFeedback({ ok: isRight, label: cards[idx].type === "fact" ? "FAKT" : "PŘÍBĚH" });
    setTimeout(() => {
      setFeedback(null);
      if (idx + 1 >= cards.length) {
        const bias = parseFloat(((cards.length - nextCorrect) / cards.length).toFixed(2));
        const key = isAdvanced ? "story_bias_n11" : "story_bias_n4";
        localStorage.setItem(key, String(bias));
        localStorage.setItem("story_bias_index", String(bias));
        saveInsight(node.id, { score: nextCorrect, story_bias_index: bias }, "");
        setFinalScore(nextCorrect);
        setFinished(true);
      } else {
        setCorrect(nextCorrect);
        setIdx(i => i + 1);
      }
      setOffset(0);
      setDragging(false);
    }, isAdvanced ? 900 : 300);
  };

  const onDS = (x: number) => { setDragging(true); setStartX(x); };
  const onDM = (x: number) => { if (dragging && !feedback) setOffset(x - startX); };
  const onDE = () => {
    if (!feedback && Math.abs(offset) > 80) answer(offset > 0 ? "fact" : "story");
    else if (!feedback) { setOffset(0); setDragging(false); }
  };

  if (finished) {
    const total = cards.length;
    const prevBias = isAdvanced ? parseFloat(localStorage.getItem("story_bias_n4") || "1") : null;
    const improved = prevBias !== null && parseFloat(((total - finalScore) / total).toFixed(2)) < prevBias;
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-8 text-center border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-5xl mb-4">🎯</p>
          <p className="text-3xl font-bold mb-1" style={{ color: "#18283a" }}>{finalScore} / {total}</p>
          <p className="text-sm leading-relaxed mt-3" style={{ color: "#5a6a74" }}>
            {finalScore >= Math.ceil(total * 0.8)
              ? "Výborně! Dobře rozlišuješ fakta od příběhů."
              : finalScore >= Math.ceil(total * 0.5)
              ? "Dobrý základ. Naše mysl ráda tvoří příběhy."
              : "Naše mysl je tvůrčí — příběhy vznikají automaticky."}
          </p>
          {isAdvanced && prevBias !== null && (
            <p className="text-sm font-semibold mt-3" style={{ color: improved ? "#2e7a66" : "#b87012" }}>
              {improved ? "✓ Zlepšil/a ses oproti prvnímu kolu!" : "Příběhy jsou zákeřné — zkus to znovu."}
            </p>
          )}
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <p className="text-xs text-center" style={{ color: "#9e9288" }}>
        Swipe nebo tlačítka — {idx + 1} / {cards.length}
      </p>
      <div className="relative" style={{ minHeight: 180 }}>
        <div
          className="rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing select-none border"
          style={{
            background: feedback
              ? (feedback.ok ? "#f0fdf4" : "#fef2f2")
              : "white",
            borderColor: feedback
              ? (feedback.ok ? "#86efac" : "#fca5a5")
              : "#e8e3db",
            minHeight: 180,
            transform: `translateX(${offset}px) rotate(${offset * 0.04}deg)`,
            transition: dragging ? "none" : "transform 0.3s ease-out, background 0.2s",
            opacity: Math.max(0.4, 1 - Math.abs(offset) / 350),
          }}
          onMouseDown={e => onDS(e.clientX)}
          onMouseMove={e => onDM(e.clientX)}
          onMouseUp={onDE}
          onMouseLeave={onDE}
          onTouchStart={e => onDS(e.touches[0].clientX)}
          onTouchMove={e => { e.preventDefault(); onDM(e.touches[0].clientX); }}
          onTouchEnd={onDE}
        >
          {!feedback && offset < -50 && (
            <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full"
              style={{ background: "#fce9e9", color: "#a93a3a" }}>PŘÍBĚH</span>
          )}
          {!feedback && offset > 50 && (
            <span className="absolute top-4 left-4 text-[10px] font-bold px-2 py-1 rounded-full"
              style={{ background: "#dae8f8", color: "#2f5fa3" }}>FAKT</span>
          )}
          {feedback ? (
            <div className="space-y-2">
              <p className="text-2xl">{feedback.ok ? "✓" : "×"}</p>
              <p className="font-bold text-sm" style={{ color: feedback.ok ? "#16a34a" : "#dc2626" }}>
                {feedback.ok ? "Správně!" : "Špatně —"} {feedback.label}
              </p>
            </div>
          ) : (
            <p className="text-lg font-semibold leading-snug" style={{ color: "#18283a", maxWidth: 260 }}>
              {cards[idx].text}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => !feedback && answer("story")}
          className="py-3 rounded-xl font-semibold text-sm active:scale-[.97] transition-transform"
          style={{ background: "#fce9e9", color: "#a93a3a", opacity: feedback ? 0.5 : 1 }}>← Příběh</button>
        <button onClick={() => !feedback && answer("fact")}
          className="py-3 rounded-xl font-semibold text-sm active:scale-[.97] transition-transform"
          style={{ background: "#dae8f8", color: "#2f5fa3", opacity: feedback ? 0.5 : 1 }}>Fakt →</button>
      </div>
    </div>
  );
}

/* ── Body Map ─────────────────────────────────────────────────────────────── */
function BodyMapGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const areas = node.bodyAreas ?? ["hlava", "krk", "hruď", "břicho", "ruce", "nohy"];
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const t = TMAP[node.type];

  const toggle = (r: string) => {
    setSel(prev => {
      const s = new Set(prev);
      s.has(r) ? s.delete(r) : s.add(r);
      return s;
    });
    setLastClicked(r);
  };

  const fc = (r: string) => sel.has(r) ? "#fbbf24" : "#e5e0d8";
  const sc = (r: string) => sel.has(r) ? "#b87012" : "#ccc8c0";

  const svgParts: Record<string, React.ReactNode> = {
    hlava:  <circle key="hlava"  cx={70} cy={25} r={22} fill={fc("hlava")}  stroke={sc("hlava")}  strokeWidth={2} onClick={() => toggle("hlava")}  style={{ cursor: "pointer" }} />,
    čelist: <rect   key="celist" x={55}  y={47}  width={30} height={11} rx={5} fill={fc("čelist")} stroke={sc("čelist")} strokeWidth={2} onClick={() => toggle("čelist")} style={{ cursor: "pointer" }} />,
    krk:    <rect   key="krk"    x={62}  y={59}  width={16} height={12} fill={fc("krk")}   stroke={sc("krk")}   strokeWidth={2} onClick={() => toggle("krk")}    style={{ cursor: "pointer" }} />,
    hruď:   <rect   key="hrud"   x={36}  y={72}  width={68} height={48} rx={5} fill={fc("hruď")}  stroke={sc("hruď")}  strokeWidth={2} onClick={() => toggle("hruď")}   style={{ cursor: "pointer" }} />,
    břicho: <rect   key="bricho" x={39}  y={121} width={62} height={44} rx={5} fill={fc("břicho")} stroke={sc("břicho")} strokeWidth={2} onClick={() => toggle("břicho")} style={{ cursor: "pointer" }} />,
    ruce: (
      <g key="ruce" onClick={() => toggle("ruce")} style={{ cursor: "pointer" }}>
        <rect x={11}  y={75} width={22} height={65} rx={9} fill={fc("ruce")} stroke={sc("ruce")} strokeWidth={2} />
        <rect x={107} y={75} width={22} height={65} rx={9} fill={fc("ruce")} stroke={sc("ruce")} strokeWidth={2} />
      </g>
    ),
    nohy: (
      <g key="nohy" onClick={() => toggle("nohy")} style={{ cursor: "pointer" }}>
        <rect x={41} y={166} width={24} height={88} rx={10} fill={fc("nohy")} stroke={sc("nohy")} strokeWidth={2} />
        <rect x={75} y={166} width={24} height={88} rx={10} fill={fc("nohy")} stroke={sc("nohy")} strokeWidth={2} />
      </g>
    ),
  };

  const labelPos: Record<string, [number, number]> = {
    hlava: [70, 29], čelist: [70, 55], krk: [70, 67], hruď: [70, 99],
    břicho: [70, 146], ruce: [22, 110], nohy: [53, 212],
  };

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: "#3c4a54" }}>{node.prompt}</p>
        <div className="flex justify-center">
          <svg viewBox="0 0 140 258" width={155} style={{ display: "block" }}>
            {areas.filter(a => svgParts[a]).map(a => svgParts[a])}
            {areas.filter(a => labelPos[a]).map(a => (
              <text key={a + "l"} x={labelPos[a][0]} y={labelPos[a][1]}
                textAnchor="middle" fontSize={9}
                fill={sel.has(a) ? "#7c5606" : "#9e9288"}
                style={{ pointerEvents: "none" }}>
                {a}
              </text>
            ))}
          </svg>
        </div>
        {lastClicked && sel.has(lastClicked) && (
          <p className="text-xs text-center mt-3 leading-relaxed" style={{ color: "#b87012" }}>
            Vidíš to. Je to fyzický vjem v {lastClicked}. Už tě neovládá, protože o něm víš.
          </p>
        )}
        {sel.size === 0 && !lastClicked && (
          <p className="text-xs text-center mt-3" style={{ color: "#9e9288" }}>Klikni na oblast kde cítíš napětí</p>
        )}
      </div>
      <button onClick={() => {
        const pts = Array.from(sel);
        localStorage.setItem("somatic_trigger_points", JSON.stringify(pts));
        saveInsight(node.id, { somatic_trigger_points: pts }, "");
        onDone();
      }} disabled={sel.size === 0}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        Pokračovat →
      </button>
    </div>
  );
}

/* ── Highlight Words ──────────────────────────────────────────────────────── */
function HighlightWordsGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as { sentences: { text: string; reactive: string[] }[] };
  const sentences = data.sentences;
  const [idx, setIdx] = useState(0);
  const [clicked, setClicked] = useState<Map<string, boolean>>(new Map());
  const [shaking, setShaking] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];

  const current = sentences[idx];

  function tokenize(text: string, reactive: string[]) {
    const sorted = [...reactive].sort((a, b) => b.length - a.length);
    type Span = { start: number; end: number };
    const spans: Span[] = [];
    for (const phrase of sorted) {
      let i = text.toLowerCase().indexOf(phrase.toLowerCase());
      while (i !== -1) {
        if (!spans.some(s => !(i + phrase.length <= s.start || i >= s.end)))
          spans.push({ start: i, end: i + phrase.length });
        i = text.toLowerCase().indexOf(phrase.toLowerCase(), i + 1);
      }
    }
    spans.sort((a, b) => a.start - b.start);
    const tokens: { word: string; isReactive: boolean }[] = [];
    let pos = 0;
    for (const span of spans) {
      const before = text.slice(pos, span.start);
      if (before) before.split(/(\s+)/).filter(Boolean).forEach(w => tokens.push({ word: w, isReactive: false }));
      tokens.push({ word: text.slice(span.start, span.end), isReactive: true });
      pos = span.end;
    }
    const rest = text.slice(pos);
    if (rest) rest.split(/(\s+)/).filter(Boolean).forEach(w => tokens.push({ word: w, isReactive: false }));
    return tokens;
  }

  const tokens = tokenize(current.text, current.reactive);
  const correctFound = Array.from(clicked.values()).filter(Boolean).length;
  const allFound = correctFound === current.reactive.length;

  const handleClick = (word: string, isReactive: boolean) => {
    if (clicked.has(word)) return;
    if (isReactive) {
      setClicked(prev => new Map(prev).set(word, true));
    } else {
      setShaking(word);
      setTimeout(() => setShaking(null), 500);
      setClicked(prev => new Map(prev).set(word, false));
    }
  };

  const next = () => {
    const newTotal = totalScore + correctFound;
    setTotalScore(newTotal);
    if (idx + 1 >= sentences.length) {
      saveInsight(node.id, { score: newTotal }, "");
      setFinished(true);
    } else {
      setIdx(i => i + 1);
      setClicked(new Map());
    }
  };

  if (finished) {
    const total = sentences.reduce((s, sen) => s + sen.reactive.length, 0);
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-8 text-center border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-5xl mb-4">🎯</p>
          <p className="text-3xl font-bold mb-2" style={{ color: "#18283a" }}>{totalScore} / {total}</p>
          <p className="text-sm" style={{ color: "#5a6a74" }}>reaktivních slov nalezeno</p>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: "#9e9288" }}>
          Věta {idx + 1} / {sentences.length} — klikni na reaktivní slova
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tokens.map((tok, i) => {
            if (/^\s+$/.test(tok.word)) return <span key={i} style={{ width: 4 }} />;
            const wasClicked = clicked.has(tok.word);
            const isCorrect  = wasClicked && tok.isReactive;
            const isWrong    = wasClicked && !tok.isReactive;
            return (
              <span key={i} onClick={() => !wasClicked && handleClick(tok.word, tok.isReactive)}
                style={{
                  display: "inline-block", padding: "3px 10px", borderRadius: 8, fontSize: 15,
                  cursor: wasClicked ? "default" : "pointer",
                  background: isCorrect ? "#d1fae5" : isWrong ? "#fee2e2" : "#f5f3ef",
                  color: isCorrect ? "#065f46" : isWrong ? "#991b1b" : "#3c4a54",
                  border: `1.5px solid ${isCorrect ? "#6ee7b7" : isWrong ? "#fca5a5" : "#e5e0d8"}`,
                  fontWeight: tok.isReactive && !wasClicked ? 500 : 400,
                  animation: shaking === tok.word ? "shake 0.4s ease" : "none",
                  transition: "background 0.2s, color 0.2s",
                }}>
                {tok.word}
              </span>
            );
          })}
        </div>
        {allFound && (
          <p className="mt-4 text-sm font-semibold" style={{ color: "#2e7a66" }}>
            ✓ Našla jsi všechna reaktivní slova v této větě!
          </p>
        )}
      </div>
      <button onClick={next} disabled={!allFound}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        {idx + 1 < sentences.length ? "Další věta →" : "Zobrazit výsledek →"}
      </button>
    </div>
  );
}

/* ── Emotion Picker ───────────────────────────────────────────────────────── */
function EmotionPickerGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as {
    scenarios: { situation: string; topEmotions: string[]; deeperOptions: Record<string, string[]> }[];
  };
  const [idx, setIdx]           = useState(0);
  const [selectedTop, setTop]   = useState<string | null>(null);
  const [selectedDeep, setDeep] = useState<string | null>(null);
  const [history, setHistory]   = useState<{ top: string; deep: string }[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];
  const current = data.scenarios[idx];

  const next = () => {
    if (!selectedTop || !selectedDeep) return;
    const nh = [...history, { top: selectedTop, deep: selectedDeep }];
    setHistory(nh);
    if (idx + 1 >= data.scenarios.length) { saveInsight(node.id, { history: nh }, ""); setFinished(true); }
    else { setIdx(i => i + 1); setTop(null); setDeep(null); }
  };

  if (finished) {
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="space-y-3">
          {history.map((h, i) => (
            <div key={i} className="rounded-xl p-4 border" style={{ background: "white", borderColor: "#e8e3db" }}>
              <p className="text-xs mb-2" style={{ color: "#9e9288" }}>{data.scenarios[i].situation}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#3c4a54" }}>
                Šla jsi od <strong style={{ color: "#b87012" }}>{h.top}</strong> k{" "}
                <strong style={{ color: "#2e7a66" }}>{h.deep}</strong> — to je síla přesného pojmenování.
              </p>
            </div>
          ))}
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#9e9288" }}>
          Situace {idx + 1} / {data.scenarios.length}
        </p>
        <p className="text-base font-semibold mb-5 leading-snug" style={{ color: "#18283a" }}>{current.situation}</p>
        {!selectedTop ? (
          <>
            <p className="text-xs mb-3" style={{ color: "#9e9288" }}>Co cítíš?</p>
            <div className="grid grid-cols-2 gap-3">
              {current.topEmotions.map(em => (
                <button key={em} onClick={() => { setTop(em); setDeep(null); }}
                  className="py-5 px-3 rounded-xl font-semibold text-sm active:scale-[.97] transition-all"
                  style={{ background: "#fff4e0", color: "#b87012", border: "2px solid #fde8c4" }}>
                  {em}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 p-3 rounded-xl flex items-center gap-2" style={{ background: "#fff4e0" }}>
              <span className="text-sm font-semibold" style={{ color: "#b87012" }}>{selectedTop}</span>
              <span className="text-xs" style={{ color: "#9e9288" }}>→ přesněji?</span>
              <button onClick={() => { setTop(null); setDeep(null); }} className="ml-auto text-xs px-2 py-1 rounded-lg"
                style={{ background: "#fde8c4", color: "#b87012" }}>změnit</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(current.deeperOptions[selectedTop] ?? []).map(deep => (
                <button key={deep} onClick={() => setDeep(deep)}
                  className="py-5 px-3 rounded-xl font-semibold text-sm active:scale-[.97] transition-all"
                  style={{
                    background: selectedDeep === deep ? "#d1fae5" : "#f0fdf4",
                    color: selectedDeep === deep ? "#065f46" : "#2e7a66",
                    border: `2px solid ${selectedDeep === deep ? "#6ee7b7" : "#c8e8e1"}`,
                  }}>
                  {deep}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {selectedTop && (
        <button onClick={next} disabled={!selectedDeep}
          className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: t.btn }}>
          {idx + 1 < data.scenarios.length ? "Další situace →" : "Zobrazit shrnutí →"}
        </button>
      )}
    </div>
  );
}

/* ── Add Yet ──────────────────────────────────────────────────────────────── */
function AddYetGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as { sentences: { fixed: string; hint: string }[] };
  const sentences = data.sentences;
  const [idx, setIdx]           = useState(0);
  const [text, setText]         = useState("");
  const [rewrites, setRewrites] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];

  const submit = () => {
    if (!text.trim()) return;
    const nr = [...rewrites, text.trim()];
    setRewrites(nr);
    if (idx + 1 >= sentences.length) { saveInsight(node.id, { rewrites: nr }, ""); setFinished(true); }
    else { setIdx(i => i + 1); setText(""); }
  };

  if (finished) {
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: "#9e9288" }}>Tvoje přepisy</p>
          <div className="space-y-4">
            {sentences.map((s, i) => (
              <div key={i} className="pb-3 border-b last:border-0" style={{ borderColor: "#f0ece4" }}>
                <p className="text-xs line-through mb-1" style={{ color: "#9e9288" }}>{s.fixed}</p>
                <p className="text-sm font-medium" style={{ color: "#2f5fa3" }}>{rewrites[i] || "—"}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  const current = sentences[idx];
  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9288" }}>
          Věta {idx + 1} / {sentences.length}
        </p>
        <div className="p-4 rounded-xl mb-4" style={{ background: "#fff4e0" }}>
          <p className="font-semibold leading-snug" style={{ color: "#b87012", fontSize: 15 }}>{current.fixed}</p>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)}
          placeholder="Přepiš větu se 'zatím'…"
          className="w-full p-4 rounded-xl border min-h-[90px] text-sm leading-relaxed resize-none focus:outline-none"
          style={{ borderColor: "#e8e3db", color: "#18283a" }} />
        <p className="text-xs mt-2" style={{ color: "#9e9288" }}>💡 {current.hint}</p>
      </div>
      <button onClick={submit} disabled={!text.trim()}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        {idx + 1 < sentences.length ? "Odeslat →" : "Zobrazit přehled →"}
      </button>
    </div>
  );
}

/* ── Softener ─────────────────────────────────────────────────────────────── */
function SoftenerGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as { sentences: { hard: string; hint: string }[] };
  const sentences = data.sentences;
  const [idx, setIdx]           = useState(0);
  const [text, setText]         = useState("");
  const [rewrites, setRewrites] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];

  const submit = () => {
    if (!text.trim()) return;
    const nr = [...rewrites, text.trim()];
    setRewrites(nr);
    if (idx + 1 >= sentences.length) { saveInsight(node.id, { rewrites: nr }, ""); setFinished(true); }
    else { setIdx(i => i + 1); setText(""); }
  };

  if (finished) {
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: "#9e9288" }}>Tvoje přepisy</p>
          <div className="space-y-4">
            {sentences.map((s, i) => (
              <div key={i} className="pb-3 border-b last:border-0" style={{ borderColor: "#f0ece4" }}>
                <p className="text-xs line-through mb-1" style={{ color: "#9e9288" }}>{s.hard}</p>
                <p className="text-sm font-medium" style={{ color: "#2e7a66" }}>{rewrites[i] || "—"}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  const current = sentences[idx];
  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9288" }}>
          Věta {idx + 1} / {sentences.length}
        </p>
        <div className="p-4 rounded-xl mb-4" style={{ background: "#fce9e9" }}>
          <p className="font-semibold leading-snug" style={{ color: "#a93a3a", fontSize: 15 }}>{current.hard}</p>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)}
          placeholder="Napiš měkčí verzi, která říká totéž…"
          className="w-full p-4 rounded-xl border min-h-[90px] text-sm leading-relaxed resize-none focus:outline-none"
          style={{ borderColor: "#e8e3db", color: "#18283a" }} />
        <p className="text-xs mt-2" style={{ color: "#9e9288" }}>💡 {current.hint}</p>
      </div>
      <button onClick={submit} disabled={!text.trim()}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        {idx + 1 < sentences.length ? "Odeslat →" : "Zobrazit přehled →"}
      </button>
    </div>
  );
}

/* ── Rewrite Speed ────────────────────────────────────────────────────────── */
function RewriteSpeedGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as { sentences: string[]; timePerSentence: number };
  const { sentences, timePerSentence } = data;
  const [idx, setIdx]           = useState(0);
  const [text, setText]         = useState("");
  const [timeLeft, setTimeLeft] = useState(timePerSentence);
  const [rewrites, setRewrites] = useState<{ sentence: string; rewrite: string; inTime: boolean }[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];
  const stateRef = useRef({ idx, text, rewrites });
  stateRef.current = { idx, text, rewrites };

  const advance = useCallback((timedOut: boolean) => {
    const { idx, text, rewrites } = stateRef.current;
    const nr = [...rewrites, { sentence: sentences[idx], rewrite: text.trim() || "(prázdné)", inTime: !timedOut }];
    setRewrites(nr);
    if (idx + 1 >= sentences.length) { saveInsight(node.id, { rewrites: nr }, ""); setFinished(true); }
    else { setIdx(i => i + 1); setText(""); }
  }, [sentences, node.id]);

  useEffect(() => {
    if (finished) return;
    setTimeLeft(timePerSentence);
    const tl = { value: timePerSentence };
    const interval = setInterval(() => {
      tl.value -= 1;
      setTimeLeft(tl.value);
      if (tl.value <= 0) { clearInterval(interval); advance(true); }
    }, 1000);
    return () => clearInterval(interval);
  }, [idx, finished, advance, timePerSentence]);

  if (finished) {
    const inTimeCount = rewrites.filter(r => r.inTime && r.rewrite !== "(prázdné)").length;
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-6 border text-center" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-4xl mb-2">⚡</p>
          <p className="text-2xl font-bold mb-1" style={{ color: "#18283a" }}>{inTimeCount} / {sentences.length}</p>
          <p className="text-sm" style={{ color: "#5a6a74" }}>přepisů stihl/a v čase</p>
        </div>
        <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: "#9e9288" }}>Tvoje přepisy</p>
          <div className="space-y-4">
            {rewrites.map((r, i) => (
              <div key={i} className="pb-3 border-b last:border-0" style={{ borderColor: "#f0ece4" }}>
                <p className="text-xs line-through mb-1" style={{ color: "#9e9288" }}>{r.sentence}</p>
                <p className="text-sm font-medium" style={{ color: r.inTime ? "#2e7a66" : "#b87012" }}>{r.rewrite}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  const pct = timeLeft / timePerSentence;
  const timerColor = pct > 0.5 ? "#2e7a66" : pct > 0.25 ? "#b87012" : "#a93a3a";

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#9e9288" }}>
            {idx + 1} / {sentences.length}
          </p>
          <span className="text-2xl font-bold tabular-nums" style={{ color: timerColor }}>{timeLeft}s</span>
        </div>
        <div className="h-1.5 rounded-full mb-5 overflow-hidden" style={{ background: "#e5e0d8" }}>
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct * 100}%`, background: timerColor }} />
        </div>
        <div className="p-4 rounded-xl mb-4" style={{ background: "#fce9e9" }}>
          <p className="font-semibold leading-snug" style={{ color: "#a93a3a", fontSize: 15 }}>{sentences[idx]}</p>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)}
          placeholder="Přepiš proaktivně…"
          className="w-full p-4 rounded-xl border min-h-[90px] text-sm leading-relaxed resize-none focus:outline-none"
          style={{ borderColor: "#e8e3db", color: "#18283a" }} />
      </div>
      <button onClick={() => advance(false)}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
        style={{ background: t.btn }}>
        {idx + 1 < sentences.length ? "Odeslat →" : "Zobrazit výsledek →"}
      </button>
    </div>
  );
}

/* ── Espoused vs Actual ───────────────────────────────────────────────────── */
function EspousedVsActualGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as {
    scenarios: { situation: string; idealLabel: string; realLabel: string }[];
  };
  const scenarios = data.scenarios;
  const [idx, setIdx]           = useState(0);
  const [ideal, setIdeal]       = useState("");
  const [real, setReal]         = useState("");
  const [gap, setGap]           = useState(5);
  const [results, setResults]   = useState<{ situation: string; ideal: string; real: string; gap: number }[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];

  const submit = () => {
    if (!ideal.trim() || !real.trim()) return;
    const nr = [...results, { situation: scenarios[idx].situation, ideal: ideal.trim(), real: real.trim(), gap }];
    setResults(nr);
    if (idx + 1 >= scenarios.length) { saveInsight(node.id, { results: nr }, ""); setFinished(true); }
    else { setIdx(i => i + 1); setIdeal(""); setReal(""); setGap(5); }
  };

  if (finished) {
    const avgGap = Math.round(results.reduce((s, r) => s + r.gap, 0) / results.length * 10) / 10;
    const maxItem = results.reduce((m, r) => r.gap > m.gap ? r : m, results[0]);
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-6 border text-center" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-4xl mb-3">🧬</p>
          <p className="text-2xl font-bold mb-1" style={{ color: "#18283a" }}>Průměrná mezera: {avgGap}/10</p>
          <p className="text-xs mt-3" style={{ color: "#9e9288" }}>Největší mezera:</p>
          <p className="text-sm font-medium mt-1" style={{ color: "#a93a3a" }}>{maxItem.situation}</p>
        </div>
        <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
          {results.map((r, i) => (
            <div key={i} className="mb-4 pb-4 border-b last:border-0 last:mb-0 last:pb-0" style={{ borderColor: "#f0ece4" }}>
              <p className="text-xs font-bold mb-2" style={{ color: "#9e9288" }}>{r.situation}</p>
              <p className="text-xs mb-1"><span style={{ color: "#2f5fa3" }}>Řekla bych:</span> {r.ideal}</p>
              <p className="text-xs mb-1"><span style={{ color: "#a93a3a" }}>Doopravdy:</span> {r.real}</p>
              <p className="text-xs font-semibold" style={{ color: "#b87012" }}>Mezera: {r.gap}/10</p>
            </div>
          ))}
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  const current = scenarios[idx];
  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9288" }}>
          Situace {idx + 1} / {scenarios.length}
        </p>
        <div className="p-4 rounded-xl mb-5" style={{ background: "#f5f3ef" }}>
          <p className="font-semibold leading-snug" style={{ color: "#18283a", fontSize: 15 }}>{current.situation}</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold mb-2" style={{ color: "#2f5fa3" }}>{current.idealLabel}</p>
            <textarea value={ideal} onChange={e => setIdeal(e.target.value)}
              placeholder="Co bych řekla, že udělám…"
              className="w-full p-3 rounded-xl border min-h-[80px] text-sm resize-none focus:outline-none"
              style={{ borderColor: "#dae8f8", color: "#18283a" }} />
          </div>
          <div>
            <p className="text-xs font-bold mb-2" style={{ color: "#a93a3a" }}>{current.realLabel}</p>
            <textarea value={real} onChange={e => setReal(e.target.value)}
              placeholder="Co doopravdy udělám…"
              className="w-full p-3 rounded-xl border min-h-[80px] text-sm resize-none focus:outline-none"
              style={{ borderColor: "#f5cece", color: "#18283a" }} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-xs font-bold" style={{ color: "#5a6a74" }}>Jak velká je mezera?</p>
              <span className="text-xs font-bold" style={{ color: "#b87012" }}>{gap}/10</span>
            </div>
            <input type="range" min={1} max={10} value={gap} onChange={e => setGap(parseInt(e.target.value))}
              className="w-full" style={{ accentColor: "#b87012" }} />
            <div className="flex justify-between text-[10px] mt-1" style={{ color: "#9e9288" }}>
              <span>žádná</span><span>obrovská</span>
            </div>
          </div>
        </div>
      </div>
      <button onClick={submit} disabled={!ideal.trim() || !real.trim()}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        {idx + 1 < scenarios.length ? "Další situace →" : "Zobrazit analýzu →"}
      </button>
    </div>
  );
}

/* ── Devil's Advocate ─────────────────────────────────────────────────────── */
function DevilsAdvocateGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as { beliefs: string[]; biasOptions: string[]; timePerBelief: number };
  const { beliefs, biasOptions, timePerBelief } = data;
  const [idx, setIdx]           = useState(0);
  const [pro, setPro]           = useState("");
  const [contra, setContra]     = useState("");
  const [bias, setBias]         = useState("");
  const [timeLeft, setTimeLeft] = useState(timePerBelief);
  const [results, setResults]   = useState<{ belief: string; pro: string; contra: string; bias: string }[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];
  const stateRef = useRef({ idx, pro, contra, bias, results });
  stateRef.current = { idx, pro, contra, bias, results };

  const advance = useCallback(() => {
    const { idx, pro, contra, bias, results } = stateRef.current;
    const nr = [...results, { belief: beliefs[idx], pro: pro || "—", contra: contra || "—", bias: bias || "—" }];
    setResults(nr);
    if (idx + 1 >= beliefs.length) { saveInsight(node.id, { results: nr }, ""); setFinished(true); }
    else { setIdx(i => i + 1); setPro(""); setContra(""); setBias(""); }
  }, [beliefs, node.id]);

  useEffect(() => {
    if (finished) return;
    setTimeLeft(timePerBelief);
    const tl = { value: timePerBelief };
    const interval = setInterval(() => {
      tl.value -= 1;
      setTimeLeft(tl.value);
      if (tl.value <= 0) { clearInterval(interval); advance(); }
    }, 1000);
    return () => clearInterval(interval);
  }, [idx, finished, advance, timePerBelief]);

  if (finished) {
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="space-y-4">
          {results.map((r, i) => (
            <div key={i} className="rounded-xl p-4 border" style={{ background: "white", borderColor: "#e8e3db" }}>
              <p className="text-sm font-bold mb-2" style={{ color: "#18283a" }}>{r.belief}</p>
              <p className="text-xs mb-1"><span style={{ color: "#2e7a66" }}>✓ Pro:</span> {r.pro}</p>
              <p className="text-xs mb-1"><span style={{ color: "#a93a3a" }}>✗ Proti:</span> {r.contra}</p>
              <p className="text-xs font-semibold mt-1" style={{ color: "#b87012" }}>Zkreslení: {r.bias}</p>
            </div>
          ))}
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  const pct = timeLeft / timePerBelief;
  const timerColor = pct > 0.5 ? "#2e7a66" : pct > 0.25 ? "#b87012" : "#a93a3a";

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#9e9288" }}>
            Přesvědčení {idx + 1} / {beliefs.length}
          </p>
          <span className="text-2xl font-bold tabular-nums" style={{ color: timerColor }}>{timeLeft}s</span>
        </div>
        <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: "#e5e0d8" }}>
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct * 100}%`, background: timerColor }} />
        </div>
        <div className="p-4 rounded-xl mb-4" style={{ background: "#faf0d8" }}>
          <p className="font-semibold leading-snug" style={{ color: "#7c5606", fontSize: 15 }}>{beliefs[idx]}</p>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: "#2e7a66" }}>2 důkazy PRO (proč tomu věříš)</p>
            <textarea value={pro} onChange={e => setPro(e.target.value)}
              placeholder="Co toto přesvědčení potvrzuje…"
              className="w-full p-3 rounded-xl border min-h-[68px] text-sm resize-none focus:outline-none"
              style={{ borderColor: "#c8e8e1", color: "#18283a" }} />
          </div>
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: "#a93a3a" }}>2 důkazy PROTI (co to vyvrací)</p>
            <textarea value={contra} onChange={e => setContra(e.target.value)}
              placeholder="Co toto přesvědčení zpochybňuje…"
              className="w-full p-3 rounded-xl border min-h-[68px] text-sm resize-none focus:outline-none"
              style={{ borderColor: "#f5cece", color: "#18283a" }} />
          </div>
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: "#b87012" }}>Které kognitivní zkreslení?</p>
            <select value={bias} onChange={e => setBias(e.target.value)}
              className="w-full p-3 rounded-xl border text-sm focus:outline-none appearance-none"
              style={{ borderColor: "#e8e3db", color: bias ? "#18283a" : "#9e9288", background: "white" }}>
              <option value="">Vyber zkreslení…</option>
              {biasOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>
      <button onClick={advance} disabled={!pro.trim() || !contra.trim() || !bias}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        {idx + 1 < beliefs.length ? "Další přesvědčení →" : "Zobrazit shrnutí →"}
      </button>
    </div>
  );
}

/* ── Circle of Influence ──────────────────────────────────────────────────── */
function CircleOfInfluenceGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as {
    situations: { text: string; default: "concern" | "influence"; hint: string }[];
  };
  const situations = data.situations;
  const [assignments, setAssignments] = useState<Record<number, "concern" | "influence">>({});
  const [selected, setSelected]       = useState<number | null>(null);
  const [dragOver, setDragOver]       = useState<string | null>(null);
  const [finished, setFinished]       = useState(false);
  const t = TMAP[node.type];

  const assign = (idx: number, zone: "concern" | "influence") => {
    setAssignments(prev => ({ ...prev, [idx]: zone }));
    setSelected(null);
  };

  const allAssigned = situations.every((_, i) => assignments[i] !== undefined);

  const submit = () => {
    const result = situations.map((s, i) => ({
      text: s.text,
      placed: assignments[i],
      correct: s.default,
      isCorrect: assignments[i] === s.default,
    }));
    saveInsight(node.id, { result }, "");
    setFinished(true);
  };

  if (finished) {
    const correctCount = situations.filter((s, i) => assignments[i] === s.default).length;
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-6 text-center border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-4xl mb-3">⭕</p>
          <p className="text-3xl font-bold mb-1" style={{ color: "#18283a" }}>{correctCount} / {situations.length}</p>
          <p className="text-sm" style={{ color: "#5a6a74" }}>situaci spravne zarazeno</p>
        </div>
        <div className="space-y-3">
          {situations.map((s, i) => {
            const ok = assignments[i] === s.default;
            return (
              <div key={i} className="rounded-xl p-4 border" style={{
                background: ok ? "#e3f4ef" : "#fce9e9",
                borderColor: ok ? "#c8e8d2" : "#f5cece",
              }}>
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 font-bold" style={{ color: ok ? "#2e7a66" : "#a93a3a" }}>{ok ? "✓" : "✗"}</span>
                  <div>
                    <p className="text-sm mb-1" style={{ color: "#18283a" }}>{s.text}</p>
                    <p className="text-xs font-medium" style={{ color: ok ? "#2e7a66" : "#a93a3a" }}>
                      {s.default === "influence" ? "Kruh vlivu" : "Kruh zajmu"}
                      {!ok && s.hint ? ` — ${s.hint}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokracovat →</button>
      </div>
    );
  }

  const unassigned = situations.reduce<number[]>((acc, _, i) =>
    assignments[i] === undefined ? [...acc, i] : acc, []);
  const influenceIdxs = Object.entries(assignments).filter(([, v]) => v === "influence").map(([k]) => parseInt(k));
  const concernIdxs   = Object.entries(assignments).filter(([, v]) => v === "concern").map(([k]) => parseInt(k));

  const makeDropZone = (zone: "influence" | "concern", label: string, icon: string, color: string, bg: string, border: string, assigned: number[]) => (
    <div
      onClick={() => { if (selected !== null) assign(selected, zone); }}
      onDragOver={e => { e.preventDefault(); setDragOver(zone); }}
      onDragLeave={() => setDragOver(null)}
      onDrop={e => {
        e.preventDefault();
        const idx = parseInt(e.dataTransfer.getData("card-idx"));
        if (!isNaN(idx)) assign(idx, zone);
        setDragOver(null);
      }}
      className="flex flex-col items-center rounded-full transition-all"
      style={{
        aspectRatio: "1",
        flex: "1",
        maxWidth: 170,
        background: dragOver === zone ? border + "55" : bg,
        border: `3px solid ${dragOver === zone || selected !== null ? color : border}`,
        cursor: selected !== null ? "pointer" : "default",
        padding: "14px 10px",
        overflow: "hidden",
      }}>
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-[11px] font-bold text-center mb-2" style={{ color }}>{label}</span>
      <div className="w-full space-y-1 overflow-y-auto" style={{ maxHeight: 90 }}>
        {assigned.map(i => (
          <div key={i}
            className="text-[10px] px-1.5 py-0.5 rounded text-center leading-tight cursor-pointer"
            style={{ background: color + "22", color }}
            onClick={e => { e.stopPropagation(); setAssignments(prev => { const n = { ...prev }; delete n[i]; return n; }); }}>
            {situations[i].text}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <p className="text-sm px-1 leading-relaxed" style={{ color: "#5a6a74" }}>
        {selected !== null
          ? "Klikni na kruh, kam kartcka patri. Nebo ji pretahni mysis."
          : "Klikni na kartrcku, pak na spravny kruh. Na pocitaci muzs i pretahnout."}
      </p>

      <div className="flex justify-center gap-4">
        {makeDropZone("influence", "Kruh vlivu", "⭕", "#2e7a66", "#e3f4ef", "#c8e8d2", influenceIdxs)}
        {makeDropZone("concern",   "Kruh zajmu", "🔴", "#a93a3a", "#fce9e9", "#f5cece", concernIdxs)}
      </div>

      {unassigned.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#9e9288" }}>
            Karticky k zarazeni ({unassigned.length})
          </p>
          {unassigned.map(i => (
            <div
              key={i}
              draggable
              onDragStart={e => { e.dataTransfer.setData("card-idx", String(i)); setSelected(null); }}
              onClick={() => setSelected(selected === i ? null : i)}
              className="rounded-xl p-3 border cursor-grab active:cursor-grabbing transition-all select-none"
              style={{
                background: selected === i ? "#dae8f8" : "white",
                borderColor: selected === i ? "#2f5fa3" : "#e8e3db",
                boxShadow: selected === i ? "0 0 0 2px #2f5fa355" : "none",
              }}>
              <p className="text-sm leading-snug" style={{ color: "#18283a" }}>{situations[i].text}</p>
            </div>
          ))}
        </div>
      )}

      {unassigned.length === 0 && (
        <button onClick={submit}
          className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>
          Zobrazit vysledek →
        </button>
      )}
    </div>
  );
}

/* ── Three Genres ─────────────────────────────────────────────────────────── */
function ThreeGenresGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as { situations: string[]; genres: string[] };
  const { situations, genres } = data;
  const [idx, setIdx]           = useState(0);
  const [texts, setTexts]       = useState<Record<string, string>>({});
  const [autoGenre, setAuto]    = useState("");
  const [results, setResults]   = useState<{ situation: string; versions: Record<string, string>; auto: string }[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];

  const genreStyle: Record<string, { bg: string; color: string; border: string; icon: string; placeholder: string }> = {
    horor:          { bg: "#fce9e9", color: "#a93a3a", border: "#f5cece", icon: "🎃", placeholder: "Nejhorší interpretace situace…" },
    dokument:       { bg: "#eaf3fc", color: "#2f5fa3", border: "#dae8f8", icon: "📹", placeholder: "Jen fakta, žádná interpretace…" },
    "coming-of-age":{ bg: "#e3f4ef", color: "#2e7a66", border: "#c8e8e1", icon: "🌱", placeholder: "Co mě tahle situace učí, jak mě posouvá…" },
  };
  const fallbackStyle = { bg: "#f5f3ef", color: "#5a6a74", border: "#e8e3db", icon: "✏️", placeholder: "Napiš verzi…" };

  const allFilled = genres.every(g => (texts[g] || "").trim().length >= 3) && autoGenre;

  const next = () => {
    if (!allFilled) return;
    const nr = [...results, { situation: situations[idx], versions: { ...texts }, auto: autoGenre }];
    setResults(nr);
    if (idx + 1 >= situations.length) { saveInsight(node.id, { results: nr }, ""); setFinished(true); }
    else { setIdx(i => i + 1); setTexts({}); setAuto(""); }
  };

  if (finished) {
    const autoCount: Record<string, number> = {};
    results.forEach(r => { autoCount[r.auto] = (autoCount[r.auto] || 0) + 1; });
    const dominant = Object.entries(autoCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
    const ds = genreStyle[dominant] || fallbackStyle;
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-6 border text-center" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-4xl mb-3">🎬</p>
          <p className="text-sm mb-2" style={{ color: "#5a6a74" }}>Tvůj automatický žánr:</p>
          <p className="text-2xl font-bold" style={{ color: ds.color }}>{ds.icon} {dominant}</p>
        </div>
        <div className="space-y-4">
          {results.map((r, i) => (
            <div key={i} className="rounded-xl p-4 border" style={{ background: "white", borderColor: "#e8e3db" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "#9e9288" }}>{r.situation}</p>
              {genres.map(g => {
                const gs = genreStyle[g] || fallbackStyle;
                return (
                  <div key={g} className="mb-2 last:mb-0">
                    <span className="text-[10px] font-bold uppercase" style={{ color: gs.color }}>{gs.icon} {g}:</span>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#3c4a54" }}>{r.versions[g]}</p>
                  </div>
                );
              })}
              <p className="text-xs font-semibold mt-2 pt-2 border-t" style={{ color: "#b87012", borderColor: "#f0ece4" }}>
                Automaticky: {r.auto}
              </p>
            </div>
          ))}
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9288" }}>
          Situace {idx + 1} / {situations.length}
        </p>
        <div className="p-4 rounded-xl mb-5" style={{ background: "#f5f3ef" }}>
          <p className="font-semibold leading-snug" style={{ color: "#18283a", fontSize: 15 }}>{situations[idx]}</p>
        </div>
        <div className="space-y-4">
          {genres.map(g => {
            const gs = genreStyle[g] || fallbackStyle;
            return (
              <div key={g}>
                <p className="text-xs font-bold mb-1.5" style={{ color: gs.color }}>{gs.icon} {g.toUpperCase()}</p>
                <textarea value={texts[g] || ""} onChange={e => setTexts(p => ({ ...p, [g]: e.target.value }))}
                  placeholder={gs.placeholder}
                  className="w-full p-3 rounded-xl border min-h-[70px] text-sm resize-none focus:outline-none"
                  style={{ borderColor: gs.border, color: "#18283a" }} />
              </div>
            );
          })}
          <div>
            <p className="text-xs font-bold mb-2" style={{ color: "#5a6a74" }}>Kterou verzi si vyprávím automaticky?</p>
            <div className="flex gap-2">
              {genres.map(g => {
                const gs = genreStyle[g] || fallbackStyle;
                return (
                  <button key={g} onClick={() => setAuto(g)}
                    className="flex-1 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-[.97]"
                    style={{
                      background: autoGenre === g ? gs.color : gs.bg,
                      color: autoGenre === g ? "white" : gs.color,
                      border: `1.5px solid ${gs.border}`,
                    }}>
                    {gs.icon} {g}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <button onClick={next} disabled={!allFilled}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        {idx + 1 < situations.length ? "Další situace →" : "Zobrazit vzorec →"}
      </button>
    </div>
  );
}

/* ── SortInfluenceTimedGame ───────────────────────────────────────────────── */
function SortInfluenceTimedGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as {
    timePerItem: number;
    situations: { text: string; correct: "concern" | "influence"; flip: string }[];
  };
  const { timePerItem, situations } = data;
  const [idx, setIdx]           = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerItem);
  const [feedback, setFeedback] = useState<{ ok: boolean; flip: string } | null>(null);
  const [score, setScore]       = useState(0);
  const [results, setResults]   = useState<{ text: string; answer: string; correct: string }[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];
  const stateRef = useRef({ idx, score, results });
  stateRef.current = { idx, score, results };

  const answer = useCallback((choice: "influence" | "concern" | "timeout") => {
    const { idx, score, results } = stateRef.current;
    const sit = situations[idx];
    const ok = choice !== "timeout" && choice === sit.correct;
    const newScore = score + (ok ? 1 : 0);
    const newResults = [...results, { text: sit.text, answer: choice, correct: sit.correct }];
    setFeedback({ ok, flip: sit.correct === "concern" && sit.flip ? sit.flip : "" });
    setTimeout(() => {
      setFeedback(null);
      if (idx + 1 >= situations.length) {
        saveInsight(node.id, { score: newScore, total: situations.length }, "");
        setScore(newScore); setResults(newResults); setFinished(true);
      } else {
        setScore(newScore); setResults(newResults); setIdx(i => i + 1);
      }
    }, 2000);
  }, [situations, node.id]);

  useEffect(() => {
    if (finished || feedback) return;
    setTimeLeft(timePerItem);
    const tl = { value: timePerItem };
    const interval = setInterval(() => {
      tl.value -= 1; setTimeLeft(tl.value);
      if (tl.value <= 0) { clearInterval(interval); answer("timeout"); }
    }, 1000);
    return () => clearInterval(interval);
  }, [idx, finished, feedback, answer, timePerItem]);

  if (finished) {
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-8 text-center border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-5xl mb-4">🎯</p>
          <p className="text-3xl font-bold mb-1" style={{ color: "#18283a" }}>{score} / {situations.length}</p>
          <p className="text-sm" style={{ color: "#5a6a74" }}>správných odpovědí</p>
        </div>
        <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9288" }}>Přehled</p>
          <div className="space-y-3">
            {situations.map((s, i) => {
              const ok = results[i]?.answer === s.correct;
              return (
                <div key={i} className="pb-2 border-b last:border-0" style={{ borderColor: "#f0ece4" }}>
                  <p className="text-sm" style={{ color: "#18283a" }}>{s.text}</p>
                  <p className="text-xs mt-1 font-semibold" style={{ color: ok ? "#2e7a66" : "#a93a3a" }}>
                    {ok ? "✓" : "×"} {s.correct === "influence" ? "Ovlivním" : "Neovlivním"}
                    {!ok && s.correct === "concern" && s.flip && (
                      <span style={{ color: "#b87012" }}> — Ale můžeš: {s.flip}</span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  const sit = situations[idx];
  const pct = timeLeft / timePerItem;
  const timerColor = pct > 0.5 ? "#2e7a66" : pct > 0.25 ? "#b87012" : "#a93a3a";

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#9e9288" }}>
            {idx + 1} / {situations.length}
          </p>
          <span className="text-2xl font-bold tabular-nums" style={{ color: timerColor }}>{timeLeft}s</span>
        </div>
        <div className="h-1.5 rounded-full mb-5 overflow-hidden" style={{ background: "#e5e0d8" }}>
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct * 100}%`, background: timerColor }} />
        </div>
        {feedback ? (
          <div className="py-8 text-center">
            <p className="text-4xl mb-2">{feedback.ok ? "✓" : "×"}</p>
            <p className="font-semibold text-lg" style={{ color: feedback.ok ? "#2e7a66" : "#a93a3a" }}>
              {feedback.ok ? "Správně!" : "Špatně"}
            </p>
            {feedback.flip && (
              <p className="text-sm mt-3 leading-relaxed" style={{ color: "#b87012" }}>
                Ale můžeš: {feedback.flip}
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="p-5 rounded-xl mb-5 text-center" style={{ background: "#f5f3ef" }}>
              <p className="text-base font-semibold leading-snug" style={{ color: "#18283a" }}>{sit.text}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => answer("influence")}
                className="py-4 rounded-xl font-semibold text-sm active:scale-[.97] transition-transform"
                style={{ background: "#e3f4ef", color: "#2e7a66" }}>✓ Ovlivním</button>
              <button onClick={() => answer("concern")}
                className="py-4 rounded-xl font-semibold text-sm active:scale-[.97] transition-transform"
                style={{ background: "#fce9e9", color: "#a93a3a" }}>× Neovlivním</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── BlameFlipGame ────────────────────────────────────────────────────────── */
function BlameFlipGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as {
    timePerItem: number;
    complaints: { complaint: string; options: string[]; correct: number }[];
  };
  const { timePerItem, complaints } = data;
  const [idx, setIdx]           = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerItem);
  const [feedback, setFeedback] = useState<{ ok: boolean; chosen: number } | null>(null);
  const [score, setScore]       = useState(0);
  const [results, setResults]   = useState<{ complaint: string; chosen: number; correct: number }[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];
  const stateRef = useRef({ idx, score, results });
  stateRef.current = { idx, score, results };

  const answer = useCallback((chosen: number) => {
    const { idx, score, results } = stateRef.current;
    const q = complaints[idx];
    const ok = chosen === q.correct;
    const newScore = score + (ok ? 1 : 0);
    const newResults = [...results, { complaint: q.complaint, chosen, correct: q.correct }];
    setFeedback({ ok, chosen });
    setTimeout(() => {
      setFeedback(null);
      if (idx + 1 >= complaints.length) {
        saveInsight(node.id, { score: newScore, total: complaints.length }, "");
        setScore(newScore); setResults(newResults); setFinished(true);
      } else {
        setScore(newScore); setResults(newResults); setIdx(i => i + 1);
      }
    }, 1800);
  }, [complaints, node.id]);

  useEffect(() => {
    if (finished || feedback) return;
    setTimeLeft(timePerItem);
    const tl = { value: timePerItem };
    const interval = setInterval(() => {
      tl.value -= 1; setTimeLeft(tl.value);
      if (tl.value <= 0) { clearInterval(interval); answer(-1); }
    }, 1000);
    return () => clearInterval(interval);
  }, [idx, finished, feedback, answer, timePerItem]);

  if (finished) {
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-8 text-center border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-5xl mb-4">⚡</p>
          <p className="text-3xl font-bold mb-1" style={{ color: "#18283a" }}>{score} / {complaints.length}</p>
          <p className="text-sm" style={{ color: "#5a6a74" }}>Extreme Ownership nalezeno</p>
        </div>
        <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9288" }}>Přehled</p>
          <div className="space-y-4">
            {complaints.map((q, i) => {
              const r = results[i];
              const ok = r?.chosen === q.correct;
              return (
                <div key={i} className="pb-3 border-b last:border-0" style={{ borderColor: "#f0ece4" }}>
                  <p className="text-xs font-bold mb-1" style={{ color: "#9e9288" }}>{q.complaint}</p>
                  <p className="text-sm" style={{ color: ok ? "#2e7a66" : "#a93a3a" }}>
                    {ok ? "✓" : "×"} {q.options[q.correct]}
                  </p>
                  {!ok && r && r.chosen >= 0 && (
                    <p className="text-xs mt-1" style={{ color: "#9e9288" }}>Tvoje odpověď: {q.options[r.chosen]}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  const q = complaints[idx];
  const pct = timeLeft / timePerItem;
  const timerColor = pct > 0.5 ? "#2e7a66" : pct > 0.25 ? "#b87012" : "#a93a3a";

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#9e9288" }}>
            {idx + 1} / {complaints.length}
          </p>
          <span className="text-2xl font-bold tabular-nums" style={{ color: timerColor }}>{timeLeft}s</span>
        </div>
        <div className="h-1.5 rounded-full mb-5 overflow-hidden" style={{ background: "#e5e0d8" }}>
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct * 100}%`, background: timerColor }} />
        </div>
        <div className="p-4 rounded-xl mb-4" style={{ background: "#fff4e0" }}>
          <p className="font-semibold text-base leading-snug" style={{ color: "#b87012" }}>{q.complaint}</p>
        </div>
        {feedback ? (
          <div className="py-4 text-center">
            <p className="text-4xl mb-2">{feedback.ok ? "✓" : "×"}</p>
            <p className="font-semibold" style={{ color: feedback.ok ? "#2e7a66" : "#a93a3a" }}>
              {feedback.ok ? "Správně! Extreme Ownership." : "Tohle je výmluva nebo sebemrskání."}
            </p>
            {!feedback.ok && (
              <p className="text-sm mt-2" style={{ color: "#2e7a66" }}>Správně: {q.options[q.correct]}</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {q.options.map((opt, j) => (
              <button key={j} onClick={() => answer(j)}
                className="w-full p-3 rounded-xl text-left text-sm font-medium active:scale-[.98] transition-transform"
                style={{ background: "#f5f3ef", color: "#18283a", border: "1.5px solid #e8e3db" }}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── OzSequenceGame ───────────────────────────────────────────────────────── */
type StepKey = "see" | "own" | "solve" | "do";
const OZ_ORDER: StepKey[] = ["see", "own", "solve", "do"];
const OZ_LABELS: Record<StepKey, string> = { see: "See it", own: "Own it", solve: "Solve it", do: "Do it" };

function shuffleKeys(): StepKey[] {
  const keys: StepKey[] = ["see", "own", "solve", "do"];
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }
  return keys;
}

function OzSequenceGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as {
    situations: { situation: string; steps: Record<StepKey, string> }[];
  };
  const [idx, setIdx]             = useState(0);
  const [shuffled, setShuffled]   = useState<StepKey[]>(() => shuffleKeys());
  const [assigned, setAssigned]   = useState<Partial<Record<StepKey, number>>>({});
  const [nextNum, setNextNum]     = useState(1);
  const [revealed, setRevealed]   = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished]   = useState(false);
  const t = TMAP[node.type];

  const situation = data.situations[idx];
  const allAssigned = Object.keys(assigned).length === 4;

  const clickStep = (key: StepKey) => {
    if (assigned[key] !== undefined || revealed) return;
    setAssigned(prev => ({ ...prev, [key]: nextNum }));
    setNextNum(n => n + 1);
  };

  const checkAndNext = () => {
    const isCorrect = OZ_ORDER.every((key, i) => assigned[key] === i + 1);
    const newCount = correctCount + (isCorrect ? 1 : 0);
    if (idx + 1 >= data.situations.length) {
      saveInsight(node.id, { correctCount: newCount, total: data.situations.length }, "");
      setCorrectCount(newCount); setFinished(true);
    } else {
      setCorrectCount(newCount);
      setIdx(i => i + 1);
      setShuffled(shuffleKeys());
      setAssigned({});
      setNextNum(1);
      setRevealed(false);
    }
  };

  if (finished) {
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-8 text-center border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-5xl mb-4">🧩</p>
          <p className="text-3xl font-bold mb-1" style={{ color: "#18283a" }}>{correctCount} / {data.situations.length}</p>
          <p className="text-sm" style={{ color: "#5a6a74" }}>situací seřazeno správně napoprvé</p>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9288" }}>
          Situace {idx + 1} / {data.situations.length}
        </p>
        <div className="p-4 rounded-xl mb-4" style={{ background: "#fff4e0" }}>
          <p className="font-semibold leading-snug" style={{ color: "#b87012", fontSize: 15 }}>{situation.situation}</p>
        </div>
        <p className="text-xs mb-3" style={{ color: "#9e9288" }}>Seřaď kroky: klikni v pořadí 1→2→3→4 (See it → Own it → Solve it → Do it)</p>
        <div className="space-y-2">
          {shuffled.map(key => {
            const num = assigned[key];
            const correctPos = OZ_ORDER.indexOf(key) + 1;
            const isCorrectPos = revealed && num === correctPos;
            const isWrongPos   = revealed && num !== correctPos;
            return (
              <button key={key} onClick={() => clickStep(key)}
                disabled={num !== undefined || revealed}
                className="w-full p-3 rounded-xl text-left text-sm transition-all"
                style={{
                  background: num !== undefined
                    ? (revealed ? (isCorrectPos ? "#d1fae5" : "#fee2e2") : "#dae8f8")
                    : "#f5f3ef",
                  border: `1.5px solid ${num !== undefined
                    ? (revealed ? (isCorrectPos ? "#6ee7b7" : "#fca5a5") : "#93c5fd")
                    : "#e5e0d8"}`,
                  color: "#18283a",
                  cursor: num !== undefined ? "default" : "pointer",
                }}>
                <span className="font-bold mr-2" style={{ color: num !== undefined ? "#2f5fa3" : "#9e9288" }}>
                  {num !== undefined ? `${num}.` : "·"}
                </span>
                {situation.steps[key]}
                {revealed && num !== undefined && (
                  <span className="ml-2 text-xs font-semibold" style={{ color: isCorrectPos ? "#16a34a" : "#dc2626" }}>
                    {isCorrectPos ? `✓ ${OZ_LABELS[key]}` : `× má být ${correctPos}. ${OZ_LABELS[key]}`}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {revealed && (
          <div className="mt-4 p-3 rounded-xl" style={{ background: "#e3f4ef" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "#2e7a66" }}>Správné pořadí:</p>
            {OZ_ORDER.map((key, i) => (
              <p key={key} className="text-xs" style={{ color: "#3c4a54" }}>{i + 1}. {situation.steps[key]}</p>
            ))}
          </div>
        )}
      </div>
      {allAssigned && !revealed && (
        <button onClick={() => setRevealed(true)}
          className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Zkontrolovat →</button>
      )}
      {revealed && (
        <button onClick={checkAndNext}
          className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>
          {idx + 1 < data.situations.length ? "Další situace →" : "Zobrazit výsledek →"}
        </button>
      )}
    </div>
  );
}

/* ── LocusMeterGame ───────────────────────────────────────────────────────── */
function LocusMeterGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as { statements: { text: string; correct: number }[] };
  const [idx, setIdx]           = useState(0);
  const [value, setValue]       = useState(50);
  const [confirmed, setConfirmed] = useState(false);
  const [results, setResults]   = useState<{ text: string; answer: number; correct: number; diff: number }[]>([]);
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];

  const statement = data.statements[idx];

  const confirm = () => {
    const diff = Math.abs(value - statement.correct);
    const nr = [...results, { text: statement.text, answer: value, correct: statement.correct, diff }];
    setResults(nr);
    setConfirmed(true);
    if (idx + 1 >= data.statements.length) {
      saveInsight(node.id, { results: nr, avgDiff: Math.round(nr.reduce((s, r) => s + r.diff, 0) / nr.length) }, "");
    }
  };

  const next = () => {
    if (idx + 1 >= data.statements.length) { setFinished(true); }
    else { setIdx(i => i + 1); setValue(50); setConfirmed(false); }
  };

  const diffColor = (diff: number) => diff <= 15 ? "#2e7a66" : diff <= 30 ? "#b87012" : "#a93a3a";

  if (finished) {
    const avgDiff = Math.round(results.reduce((s, r) => s + r.diff, 0) / results.length);
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-8 text-center border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-5xl mb-4">✈️</p>
          <p className="text-3xl font-bold mb-1" style={{ color: "#18283a" }}>±{avgDiff}</p>
          <p className="text-sm" style={{ color: "#5a6a74" }}>průměrná odchylka</p>
          <p className="text-sm font-semibold mt-3" style={{ color: diffColor(avgDiff) }}>
            {avgDiff <= 15 ? "Výborný odhad!" : avgDiff <= 30 ? "Dobrý základ." : "Zkus se zamyslet hlouběji."}
          </p>
        </div>
        <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9288" }}>Přehled</p>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className="pb-2 border-b last:border-0" style={{ borderColor: "#f0ece4" }}>
                <p className="text-sm mb-1" style={{ color: "#18283a" }}>{r.text}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full relative" style={{ background: "#e5e0d8" }}>
                    <div className="absolute top-0 h-2 w-2 rounded-full -translate-x-1/2" style={{ left: `${r.answer}%`, background: "#2f5fa3" }} />
                    <div className="absolute top-0 h-2 w-2 rounded-full -translate-x-1/2" style={{ left: `${r.correct}%`, background: "#2e7a66" }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: diffColor(r.diff) }}>±{r.diff}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] mt-2" style={{ color: "#9e9288" }}>🔵 tvůj odhad &nbsp; 🟢 správně</p>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  const diff = confirmed ? Math.abs(value - statement.correct) : 0;

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9288" }}>
          Výrok {idx + 1} / {data.statements.length}
        </p>
        <div className="p-4 rounded-xl mb-5" style={{ background: "#f5f3ef" }}>
          <p className="font-semibold leading-snug" style={{ color: "#18283a", fontSize: 15 }}>{statement.text}</p>
        </div>
        <div className="flex justify-between text-xs font-semibold mb-1" style={{ color: "#9e9288" }}>
          <span>Oběť okolností</span><span>Pilot</span>
        </div>
        <div className="relative mb-2">
          <input type="range" min={0} max={100} value={value}
            onChange={e => !confirmed && setValue(parseInt(e.target.value))}
            className="w-full" style={{ accentColor: "#2f5fa3" }}
            disabled={confirmed} />
          {confirmed && (
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white"
              style={{ left: `calc(${statement.correct}% - 8px)`, background: "#2e7a66", zIndex: 10, pointerEvents: "none" }} />
          )}
        </div>
        <div className="flex justify-between text-[10px]" style={{ color: "#9e9288" }}>
          <span>0 — Externí</span><span>100 — Interní</span>
        </div>
        {confirmed && (
          <div className="mt-4 p-3 rounded-xl text-center" style={{ background: diffColor(diff) + "18", border: `1px solid ${diffColor(diff)}44` }}>
            <p className="text-sm font-semibold" style={{ color: diffColor(diff) }}>
              Odchylka: ±{diff}
              {diff <= 15 ? " — Přesný odhad! ✓" : diff <= 30 ? " — Blízko" : " — Zkus se zamyslet"}
            </p>
            <p className="text-xs mt-1" style={{ color: "#5a6a74" }}>Správná hodnota: {statement.correct}</p>
          </div>
        )}
      </div>
      {!confirmed ? (
        <button onClick={confirm}
          className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Potvrdit odhad →</button>
      ) : (
        <button onClick={next}
          className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>
          {idx + 1 < data.statements.length ? "Další výrok →" : "Zobrazit výsledek →"}
        </button>
      )}
    </div>
  );
}

/* ── BossEmailBuilderGame ─────────────────────────────────────────────────── */
function BossEmailBuilderGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const data = node.gameData as { fragments: { text: string; category: "done" | "plan" | "input" | "wrong" }[] };
  const [assignments, setAssignments] = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];

  const ZONES = [
    { id: "done",  label: "Co jsem udělala",       color: "#2e7a66", bg: "#e3f4ef" },
    { id: "plan",  label: "Co plánuji",             color: "#2f5fa3", bg: "#eaf3fc" },
    { id: "input", label: "Kde potřebuji input",    color: "#b87012", bg: "#fff4e0" },
    { id: "wrong", label: "Vyhodit",                color: "#9e9288", bg: "#f5f3ef" },
  ];

  const allAssigned = data.fragments.every((_, i) => assignments[i] !== undefined);

  const submit = () => {
    const correct = data.fragments.filter((f, i) => assignments[i] === f.category).length;
    saveInsight(node.id, { correct, total: data.fragments.length, assignments }, "");
    setFinished(true);
  };

  if (finished) {
    const correct = data.fragments.filter((f, i) => assignments[i] === f.category).length;
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-8 text-center border" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-5xl mb-4">📧</p>
          <p className="text-3xl font-bold mb-1" style={{ color: "#18283a" }}>{correct} / {data.fragments.length}</p>
          <p className="text-sm" style={{ color: "#5a6a74" }}>fragmentů správně zařazeno</p>
        </div>
        {ZONES.filter(z => z.id !== "wrong").map(zone => {
          const frags = data.fragments.filter((f, i) => assignments[i] === zone.id);
          if (!frags.length) return null;
          return (
            <div key={zone.id} className="rounded-2xl p-4 border" style={{ background: "white", borderColor: "#e8e3db" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: zone.color }}>
                {zone.label}
              </p>
              {frags.map((f, i) => {
                const origIdx = data.fragments.indexOf(f);
                const ok = assignments[origIdx] === f.category;
                return (
                  <p key={i} className="text-sm mb-1.5 pl-2 border-l-2"
                    style={{ borderColor: ok ? zone.color : "#fca5a5", color: ok ? "#18283a" : "#a93a3a" }}>
                    {f.text}
                  </p>
                );
              })}
            </div>
          );
        })}
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      {node.prompt && (
        <div className="rounded-xl p-4 border" style={{ background: "#fff4e0", borderColor: "#fde8c4" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#b87012" }}>{node.prompt}</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {ZONES.map(z => (
          <div key={z.id} className="rounded-xl px-3 py-2 text-xs font-bold"
            style={{ background: z.bg, color: z.color }}>
            {z.label}
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {data.fragments.map((f, i) => (
          <div key={i} className="rounded-xl border p-3" style={{ background: "white", borderColor: assignments[i] !== undefined ? "#c8e8e1" : "#e8e3db" }}>
            <p className="text-sm mb-2.5" style={{ color: "#18283a" }}>{f.text}</p>
            <div className="flex flex-wrap gap-1.5">
              {ZONES.map(z => (
                <button key={z.id}
                  onClick={() => setAssignments(prev => ({ ...prev, [i]: z.id }))}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all active:scale-[.97]"
                  style={{
                    background: assignments[i] === z.id ? z.color : z.bg,
                    color: assignments[i] === z.id ? "white" : z.color,
                  }}>
                  {z.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={submit} disabled={!allAssigned}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        Sestavit mail →
      </button>
    </div>
  );
}

/* ── GameView router ──────────────────────────────────────────────────────── */
function GameView({ node, onDone }: { node: PathNode; onDone: () => void }) {
  if (node.gameType === "the-gap")             return <TheGapGame            node={node} onDone={onDone} />;
  if (node.gameType === "fact-or-story")       return <FactOrStoryGame       node={node} onDone={onDone} />;
  if (node.gameType === "body-map")            return <BodyMapGame            node={node} onDone={onDone} />;
  if (node.gameType === "highlight-words")     return <HighlightWordsGame    node={node} onDone={onDone} />;
  if (node.gameType === "emotion-picker")      return <EmotionPickerGame     node={node} onDone={onDone} />;
  if (node.gameType === "add-yet")             return <AddYetGame            node={node} onDone={onDone} />;
  if (node.gameType === "softener")            return <SoftenerGame          node={node} onDone={onDone} />;
  if (node.gameType === "rewrite-speed")       return <RewriteSpeedGame      node={node} onDone={onDone} />;
  if (node.gameType === "espoused-vs-actual")  return <EspousedVsActualGame  node={node} onDone={onDone} />;
  if (node.gameType === "devils-advocate")     return <DevilsAdvocateGame    node={node} onDone={onDone} />;
  if (node.gameType === "circle-of-influence") return <CircleOfInfluenceGame node={node} onDone={onDone} />;
  if (node.gameType === "three-genres")        return <ThreeGenresGame       node={node} onDone={onDone} />;
  if (node.gameType === "sort-influence-timed") return <SortInfluenceTimedGame node={node} onDone={onDone} />;
  if (node.gameType === "blame-flip")           return <BlameFlipGame          node={node} onDone={onDone} />;
  if (node.gameType === "oz-sequence")          return <OzSequenceGame         node={node} onDone={onDone} />;
  if (node.gameType === "locus-meter")          return <LocusMeterGame         node={node} onDone={onDone} />;
  if (node.gameType === "boss-email-builder")   return <BossEmailBuilderGame   node={node} onDone={onDone} />;
  const t = TMAP[node.type];
  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-10 text-center border-2 border-dashed"
        style={{ borderColor: t.accentBg, background: "white" }}>
        <div className="text-5xl mb-3">🎮</div>
        <p className="font-semibold text-lg" style={{ color: "#18283a" }}>Interaktivní hra</p>
        <p className="text-sm mt-1" style={{ color: "#9e9288" }}>Brzy oživíme!</p>
      </div>
      <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
        style={{ background: t.btn }}>Pokračovat →</button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   REFLECTION COMPONENTS
   ════════════════════════════════════════════════════════════════════════════ */

/* ── Semafor slider ───────────────────────────────────────────────────────── */
function SemaforReflection({ node, onDone }: { node: PathNode; onDone: (content: Record<string, unknown>) => void }) {
  const [value, setValue] = useState(0.3);
  const [popup, setPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const t = TMAP[node.type];
  const hue = Math.round(120 * (1 - value));
  const fillColor = `hsl(${hue},65%,42%)`;
  const labels = (node.placeholder ?? "").split("\n").filter(Boolean);
  const labelIdx = value < 0.4 ? 0 : value < 0.7 ? 1 : 2;
  const labelColors = ["#16a34a", "#ca8a04", "#dc2626"];

  const handleChange = (v: number) => {
    setValue(v);
    if (v > 0.7 && !popupShown) { setPopup(true); setPopupShown(true); }
  };

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      {node.prompt && <p className="text-sm leading-relaxed px-1" style={{ color: "#5a6a74" }}>{node.prompt}</p>}
      <div className="rounded-2xl p-8 border text-center" style={{ background: "white", borderColor: "#e8e3db" }}>
        <div className="flex justify-center mb-6">
          <div className="relative flex flex-col items-center" style={{ height: 160 }}>
            <div className="w-8 rounded-full flex-1" style={{
              background: "linear-gradient(to bottom, #f87171, #fbbf24, #4ade80)",
              position: "relative",
            }}>
              <div className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md -translate-x-1/2 left-1/2"
                style={{ top: `${value * 100}%`, transform: "translate(-50%, -50%)", background: fillColor }} />
            </div>
            <input type="range" min={0} max={100} value={Math.round(value * 100)}
              onChange={e => handleChange(parseInt(e.target.value) / 100)}
              style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", writingMode: "vertical-lr", direction: "rtl" }} />
          </div>
        </div>
        {labels[labelIdx] && (
          <p className="text-sm font-semibold leading-relaxed" style={{ color: labelColors[labelIdx] }}>
            {labels[labelIdx]}
          </p>
        )}
      </div>
      {popup && (
        <div className="rounded-2xl p-5 border-2" style={{ background: "#fffbeb", borderColor: "#fbbf24" }}>
          <p className="font-semibold mb-1" style={{ color: "#92400e" }}>Tvá pila je teď tupá.</p>
          <p className="text-sm leading-relaxed" style={{ color: "#78350f" }}>
            Než začneš jednat, dej si 3 nádechy.
          </p>
          <button onClick={() => setPopup(false)}
            className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold active:scale-[.97] transition-transform"
            style={{ background: "#fbbf24", color: "#78350f" }}>
            OK, chápu
          </button>
        </div>
      )}
      <button onClick={() => {
        localStorage.setItem("semafor_value", String(value));
        onDone({ semafor_value: value });
      }}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
        style={{ background: t.btn }}>
        Pokračovat →
      </button>
    </div>
  );
}

/* ── Mirror Form ──────────────────────────────────────────────────────────── */
function MirrorForm({ node, onDone }: { node: PathNode; onDone: (content: Record<string, unknown>) => void }) {
  const [fields, setFields] = useState({ fact: "", story: "", feeling: "", choice: "" });
  const t = TMAP[node.type];
  const valid = Object.values(fields).every(v => v.trim().length >= 3);
  type Key = keyof typeof fields;
  const set = (k: Key) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFields(prev => ({ ...prev, [k]: e.target.value }));

  const rows: [Key, string, string][] = [
    ["fact",    "Událost",         "Co se konkrétně stalo — jen fakta bez hodnocení."],
    ["story",   "Příběh",          "Co ti o tom nakecala tvoje hlava?"],
    ["feeling", "Pocit",           "Jakou emoci jsi cítil/a? Přesné slovo."],
    ["choice",  "Nové rozhodnutí", "Jak by to vypadalo s přidáním slova zatím nebo změnou reakce?"],
  ];

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      {node.prompt && <p className="text-sm leading-relaxed px-1" style={{ color: "#5a6a74" }}>{node.prompt}</p>}
      <div className="space-y-3">
        {rows.map(([key, label, placeholder]) => (
          <div key={key} className="rounded-xl border p-4" style={{ background: "white", borderColor: "#e8e3db" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: t.accent }}>{label}</p>
            <textarea value={fields[key]} onChange={set(key)} placeholder={placeholder}
              className="w-full text-sm leading-relaxed focus:outline-none resize-none"
              style={{ color: "#3c4a54", minHeight: 54 }} />
          </div>
        ))}
      </div>
      <button onClick={() => {
        localStorage.setItem("mirror_entry", JSON.stringify(fields));
        onDone(fields);
      }} disabled={!valid}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        Uložit →
      </button>
    </div>
  );
}

/* ── Generic reflection (text area) ──────────────────────────────────────── */
function GenericReflection({ node, onDone }: { node: PathNode; onDone: (content: Record<string, unknown>) => void }) {
  const [text, setText] = useState("");
  const t = TMAP[node.type];
  const valid = text.trim().length >= 5;
  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: t.accentBg }}>
        {node.prompt && <p className="mb-4 leading-relaxed" style={{ color: "#3c4a54", fontSize: 15 }}>{node.prompt}</p>}
        <textarea value={text} onChange={e => setText(e.target.value)}
          placeholder={node.placeholder}
          className="w-full p-4 rounded-xl border min-h-[130px] text-sm leading-relaxed resize-y focus:outline-none"
          style={{ borderColor: t.accentBg }} />
      </div>
      <button onClick={() => onDone({ text })} disabled={!valid}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        Uložit →
      </button>
    </div>
  );
}

/* ── ReflectionView router ────────────────────────────────────────────────── */
function ReflectionView({ node, onDone }: { node: PathNode; onDone: (content: Record<string, unknown>) => void }) {
  if (node.gameType === "semafor-slider") return <SemaforReflection node={node} onDone={onDone} />;
  if (node.gameType === "mirror-form")    return <MirrorForm         node={node} onDone={onDone} />;
  return <GenericReflection node={node} onDone={onDone} />;
}

/* ── ChallengeView ────────────────────────────────────────────────────────── */
const SUMMARY_LABELS = [
  "5 věcí, které se probíraly",
  "4 věci, které znáš jinak",
  "3 nástroje k používání",
  "2 překvapení o sobě",
  "1 věta navždy",
];

function ChallengeView({ node, onDone }: { node: PathNode; onDone: (content: Record<string, unknown>) => void }) {
  const t = TMAP[node.type];
  const [answers, setAnswers] = useState<string[]>(["", "", "", "", ""]);
  const isSummary = node.challengeDays === 0;

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#f0cece" }}>
        <p className="mb-5 leading-relaxed" style={{ color: "#3c4a54", fontSize: 15 }}>{node.challengeDesc}</p>
        {isSummary ? (
          <div className="space-y-3">
            {SUMMARY_LABELS.map((label, i) => (
              <div key={i} className="rounded-xl border p-4" style={{ background: "#faf8f4", borderColor: "#e8e3db" }}>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: t.accent }}>{label}</p>
                <textarea
                  value={answers[i]}
                  onChange={e => setAnswers(prev => { const next = [...prev]; next[i] = e.target.value; return next; })}
                  className="w-full text-sm leading-relaxed focus:outline-none resize-none"
                  style={{ color: "#3c4a54", minHeight: 48 }}
                  placeholder="..."
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: node.challengeDays ?? 5 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl border-2 flex flex-col items-center justify-center"
                style={{ borderColor: "#e8e3db", background: "#faf8f4" }}>
                <span className="text-[10px]" style={{ color: "#9e9288" }}>Den</span>
                <span className="text-xl font-bold" style={{ color: "#d4cfc8" }}>{i + 1}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => onDone(isSummary ? { answers, labels: SUMMARY_LABELS } : {})}
        disabled={isSummary && !answers.some(a => a.trim().length >= 3)}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        {isSummary ? "Uložit shrnutí →" : "Přijímám výzvu! →"}
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════════════ */
export default function PathMap() {
  const [done,           setDone]           = useState<string[]>([]);
  const [active,         setActive]         = useState<PathNode | null>(null);
  const [loading,        setLoading]        = useState(true);
  const [profileId,      setProfileId]      = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState(chapter1);
  const containerRef                        = useRef<HTMLDivElement>(null);
  const [cw, setCw]                         = useState(0);
  const NODES                               = currentChapter.nodes;
  const POS                                 = computePos(NODES.length);
  const chapterDoneCount                    = NODES.filter(n => done.includes(n.id)).length;
  const allChapterNodes                     = ALL_CHAPTERS.filter(c => c.chapter !== null).flatMap(c => c.chapter!.nodes);
  const totalNodeCount                      = allChapterNodes.length;
  const totalDoneCount                      = done.filter(id => allChapterNodes.some(n => n.id === id)).length;
  const totalProgressPct                    = totalNodeCount > 0 ? Math.round((totalDoneCount / totalNodeCount) * 100) : 0;

  /* ── Load progress from Supabase on mount ─────────────────────────────── */
  useEffect(() => {
    async function loadProgress() {
      const pid = localStorage.getItem("profile_id");
      console.log("[PathMap] profile_id from localStorage:", pid);
      setProfileId(pid);
      if (!pid) { setLoading(false); return; }

      if (pid.startsWith("local_")) {
        const saved = localStorage.getItem("progress_local");
        if (saved) setDone(JSON.parse(saved));
        setLoading(false);
        return;
      }

      try {
        const [progressRes, insightsRes] = await Promise.all([
          supabase.from("progress").select("node_id").eq("profile_id", pid),
          supabase.from("insights").select("*").eq("profile_id", pid),
        ]);

        console.log("[PathMap] loaded progress:", progressRes.data, "error:", progressRes.error);
        if (progressRes.data) setDone(progressRes.data.map((r: { node_id: string }) => r.node_id));

        /* Synchronizuj insights do localStorage */
        if (insightsRes.data && insightsRes.data.length > 0) {
          const mapped = insightsRes.data.map((r: {
            created_at: string; node_id: string;
            input_data: unknown; text_response: string; status: string;
          }) => ({
            timestamp:     r.created_at,
            node_id:       r.node_id,
            input_data:    r.input_data,
            text_response: r.text_response,
            status:        r.status,
          }));
          localStorage.setItem("user_insights", JSON.stringify(mapped));
          console.log("[PathMap] naceteno", mapped.length, "insights ze Supabase");
        }
      } catch {
        const saved = localStorage.getItem("progress_local");
        if (saved) setDone(JSON.parse(saved));
        console.log("[PathMap] Supabase neni dostupny — pouzivam localStorage");
      }
      setLoading(false);
    }
    loadProgress();
  }, []);

  /* ── BrandLink event → close detail ───────────────────────────────────── */
  useEffect(() => {
    const handler = () => setActive(null);
    window.addEventListener("brand-click", handler);
    return () => window.removeEventListener("brand-click", handler);
  }, []);

  /* ── ResizeObserver — re-run after loading so containerRef is in DOM ──── */
  useEffect(() => {
    if (loading) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      const w = el.offsetWidth;
      if (w > 0) setCw(w);
    });
    obs.observe(el);
    if (el.offsetWidth > 0) setCw(el.offsetWidth);
    return () => obs.disconnect();
  }, [loading]);

  /* ── Re-measure when returning from detail view ───────────────────────── */
  useEffect(() => {
    if (active !== null) return;
    const id = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (el && el.offsetWidth > 0) setCw(el.offsetWidth);
    });
    return () => cancelAnimationFrame(id);
  }, [active]);

  const pts = POS.map(([xp, row]) => ({
    cx: (xp / 100) * cw,
    cy: row * ROW_H + R + 24,
  }));
  const totalH = pts.length ? pts[pts.length - 1].cy + R + 40 : POS.length * ROW_H + 100;

  const isUnlocked = (i: number) => i === 0 || done.includes(NODES[i - 1].id);
  const nextIdx    = NODES.findIndex((_, i) => isUnlocked(i) && !done.includes(NODES[i].id));

  const saveInsight = async (
    nodeId: string,
    nodeTitle: string,
    nodeType: string,
    content: Record<string, unknown>
  ) => {
    const pid = localStorage.getItem("profile_id");
    if (!pid || pid.startsWith("local_")) return;
    try {
      await supabase.from("insights").upsert(
        {
          profile_id: pid,
          node_id: nodeId,
          node_title: nodeTitle,
          node_type: nodeType,
          content,
          created_at: new Date().toISOString(),
        },
        { onConflict: "profile_id,node_id" }
      );
    } catch {
      /* tiché selhání */
    }
  };

  const finish = async (content?: Record<string, unknown>) => {
    if (!active) return;
    const nodeId    = active.id;
    const nodeTitle = active.title;
    const nodeType  = active.type;

    setDone(prev => {
      const next = [...prev, nodeId];
      localStorage.setItem("progress_local", JSON.stringify(next));
      return next;
    });

    if (content && Object.keys(content).length > 0) {
      await saveInsight(nodeId, nodeTitle, nodeType, content);
    }

    const pid = localStorage.getItem("profile_id");
    if (pid && !pid.startsWith("local_")) {
      try {
        await supabase.from("progress").upsert(
          { profile_id: pid, node_id: nodeId, completed_at: new Date().toISOString() },
          { onConflict: "profile_id,node_id" }
        );
      } catch {
        /* tiché selhání */
      }

      const today = new Date().toISOString().split("T")[0];
      try {
        await supabase.from("profiles").update({ last_active: today }).eq("id", pid);
      } catch {
        /* tiché selhání */
      }
    }

    setActive(null);
  };

  const allPts = pts.map(p => ({ x: p.cx, y: p.cy }));
  const fullD  = makePath(allPts);
  const doneD  = chapterDoneCount > 0 ? makePath(allPts.slice(0, chapterDoneCount + 1)) : "";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <span className="text-4xl">🗺️</span>
        <p className="text-sm font-medium" style={{ color: "#9e9288" }}>Načítám cestu…</p>
      </div>
    );
  }

  return (
    <div>
      {/* Detail panel */}
      <div style={{ display: active ? "block" : "none" }}>
        <div className="max-w-2xl mx-auto px-5 py-6">
          <button onClick={() => setActive(null)}
            className="mb-6 flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#18283a]"
            style={{ color: "#9e9288" }}>
            ← Zpět na cestu
          </button>
          {active?.type === "theory"     && <TheoryView     node={active} onDone={() => finish()} />}
          {active?.type === "game"       && <GameView       node={active} onDone={() => finish()} />}
          {active?.type === "reflection" && <ReflectionView node={active} onDone={(c) => finish(c)} />}
          {active?.type === "challenge"  && <ChallengeView  node={active} onDone={(c) => finish(c)} />}
        </div>
      </div>

      {/* Map panel — always mounted */}
      <div style={{ display: active ? "none" : "block" }}>
        <div className="max-w-2xl mx-auto px-5 py-8">

          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ background: "#dae8f8", color: "#2f5fa3" }}>
              Kapitola {currentChapter.number}
            </span>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "#18283a" }}>{currentChapter.title}</h1>
            <p className="text-base max-w-md mx-auto" style={{ color: "#5a6a74" }}>{currentChapter.description}</p>
          </div>

          <div className="overflow-x-auto -mx-5 px-5 mb-5">
            <div className="flex gap-2" style={{ minWidth: "max-content" }}>
              {ALL_CHAPTERS.map((ch, i) => {
                const prevCh = i > 0 ? ALL_CHAPTERS[i - 1] : null;
                const isUnlockedCh = ch.chapter != null || (prevCh?.chapter != null && prevCh.chapter.nodes.every(n => done.includes(n.id)));
                const isActive = currentChapter.id === ch.id;
                const canClick = isUnlockedCh && ch.chapter != null;
                return (
                  <button
                    key={ch.id}
                    onClick={() => { if (canClick) setCurrentChapter(ch.chapter!); }}
                    disabled={!canClick}
                    className="py-2 px-3 rounded-xl font-semibold text-xs whitespace-nowrap transition-colors"
                    style={{
                      background: isActive ? "#2e7a55" : canClick ? "#e5e0d8" : "#f0ede8",
                      color: isActive ? "white" : canClick ? "#5a6a74" : "#c0bab3",
                      cursor: canClick ? "pointer" : "not-allowed",
                    }}
                  >
                    {!isUnlockedCh ? "🔒 " : ""}{ch.number}. {ch.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "#e5e0d8" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${totalProgressPct}%`, background: "linear-gradient(90deg,#2f5fa3,#5590d4)" }} />
            </div>
            <span className="text-sm font-bold tabular-nums w-10 text-right" style={{ color: "#2f5fa3" }}>
              {totalProgressPct}%
            </span>
          </div>
          <div className="flex items-center justify-between mb-7">
            <p className="text-[11px]" style={{ color: "#9e9288" }}>
              Celkovy pokrok: {totalDoneCount} / {totalNodeCount} uzlu
            </p>
            <button
              onClick={() => {
                const insights    = JSON.parse(localStorage.getItem("user_insights")      || "[]");
                const evaluations = JSON.parse(localStorage.getItem("buddy_evaluations") || "[]");
                const notes       = localStorage.getItem("buddy_notes") || "";
                const profile     = localStorage.getItem("profile_id") || "neznamy";
                const date        = new Date().toISOString().slice(0, 10);
                const exportData  = {
                  datumExportu:    new Date().toISOString(),
                  profil:          profile,
                  reflexeAOdpovedi: insights,
                  hotoveUzly:      done,
                  celkovyPokrok:   `${totalProgressPct}%`,
                  poznamky:        notes,
                  hodnoceniKoucky: evaluations,
                };
                const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `buddy-path-export-${date}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="text-[11px] px-3 py-1 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{ background: "#e5e0d8", color: "#5a6a74" }}>
              Export
            </button>
          </div>

          <div className="flex justify-center flex-wrap gap-5 mb-10">
            {(Object.entries(TMAP) as [NodeType, typeof TMAP[NodeType]][]).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="text-xs">{v.icon}</span>
                <span className="text-xs font-medium" style={{ color: "#9e9288" }}>{v.label}</span>
              </div>
            ))}
          </div>

          <div ref={containerRef} className="relative w-full" style={{ height: totalH }}>
            {cw > 0 && (
              <svg className="absolute inset-0" width={cw} height={totalH} style={{ zIndex: 0, pointerEvents: "none" }}>
                <defs>
                  <mask id="path-mask">
                    <rect x={0} y={0} width={cw} height={totalH} fill="white" />
                    {pts.map((p, i) => {
                      const lx = labelLeft(p.cx, POS[i][0]);
                      return (
                        <g key={i}>
                          <circle cx={p.cx} cy={p.cy} r={MASK_R} fill="black" />
                          <rect x={lx} y={p.cy - LABEL_H / 2} width={LABEL_W} height={LABEL_H} fill="black" />
                        </g>
                      );
                    })}
                  </mask>
                </defs>
                <path d={fullD} fill="none" stroke="#d6d1c8" strokeWidth={3} strokeLinecap="round" mask="url(#path-mask)" />
                <path d={fullD} fill="none" stroke="#c8c3ba" strokeWidth={1} strokeDasharray="5 8" mask="url(#path-mask)" />
                {doneD && <path d={doneD} fill="none" stroke="#2e7a55" strokeWidth={3.5} strokeLinecap="round" mask="url(#path-mask)" />}
              </svg>
            )}

            {cw > 0 && NODES.map((node, i) => {
              const p      = pts[i];
              const isDone = done.includes(node.id);
              const isUn   = isUnlocked(i);
              const isNext = i === nextIdx;
              const locked = !isUn && !isDone;
              const t      = TMAP[node.type];
              const xPct   = POS[i][0];
              const lx     = labelLeft(p.cx, xPct);

              return (
                <div key={node.id}>
                  <button
                    onClick={() => !locked && setActive(node)}
                    disabled={locked}
                    className="absolute flex items-center justify-center rounded-full transition-all duration-150"
                    style={{
                      left: p.cx - R, top: p.cy - R, width: NS, height: NS, zIndex: 10,
                      background: isDone ? "#b2e2c2" : isNext ? t.accentBg : isUn ? "#ffffff" : "#edeae4",
                      border: `3px solid ${isDone ? "#2e7a55" : isNext ? t.accent : isUn ? t.accent + "70" : "#ccc8c0"}`,
                      cursor: locked ? "default" : "pointer",
                      fontSize: 26,
                      boxShadow: isDone  ? "0 2px 10px rgba(46,122,85,.22)"
                               : isNext  ? `0 0 0 6px ${t.accent}22, 0 4px 14px rgba(0,0,0,.11)`
                               : isUn    ? "0 3px 10px rgba(0,0,0,.07)"
                               :           "none",
                    }}>
                    {isDone
                      ? <span style={{ color: "#1e5e38", fontSize: 21, fontWeight: 800 }}>✓</span>
                      : <span style={{ filter: locked ? "grayscale(1) opacity(.35)" : "none" }}>{node.emoji}</span>
                    }
                  </button>

                  <div className="absolute" style={{
                    left: lx, top: p.cy - LABEL_H / 2, width: LABEL_W, height: LABEL_H,
                    zIndex: 10, padding: "5px 7px 6px",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                  }}>
                    <span className="inline-block self-start text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full mb-1"
                      style={{
                        background: isDone ? "#c8e8d2" : isNext ? t.accentBg : isUn ? t.accentBg : "#e5e0d8",
                        color: isDone ? "#1e5e38" : isNext ? t.accent : isUn ? t.accent : "#a8a39e",
                      }}>
                      {t.icon} {t.label}
                    </span>
                    <p className="text-[11px] font-semibold leading-tight"
                      title={node.title}
                      style={{
                        color: isDone ? "#1e5e38" : isUn ? "#18283a" : "#a8a39e",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}>
                      {node.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {chapterDoneCount === NODES.length && (
            <div className="mt-8 text-center rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg,#eaf3fc,#dae8f8)" }}>
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold" style={{ color: "#18283a" }}>Kapitola {currentChapter.number} dokončena!</h2>
              {ALL_CHAPTERS.some(ch => ch.number === currentChapter.number + 1) && (
                <p className="mt-2" style={{ color: "#2f5fa3" }}>
                  Kapitola {currentChapter.number + 1} je odemčena.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
