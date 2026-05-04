"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { chapter1, type PathNode, type NodeType } from "@/data/chapter1";
import { chapter2 } from "@/data/chapter2";
import { supabase } from "@/lib/supabase";

/* ─── layout ──────────────────────────────────────────────────────────────── */
const NS     = 64;
const R      = NS / 2;
const MASK_R = R - 2;
const LABEL_W = 110;
const LABEL_H = 50;
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
  const prev = JSON.parse(localStorage.getItem("user_insights") || "[]");
  prev.push({ timestamp: new Date().toISOString(), node_id: nodeId, input_data: inputData, text_response: textResponse, status: "completed" });
  localStorage.setItem("user_insights", JSON.stringify(prev));
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
  const [choices, setChoices] = useState<Record<number, "concern" | "influence">>(
    Object.fromEntries(situations.map((s, i) => [i, s.default]))
  );
  const [actions, setActions]   = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);
  const t = TMAP[node.type];

  const concernIdxs = situations.reduce<number[]>((acc, _, i) => choices[i] === "concern" ? [...acc, i] : acc, []);
  const canSubmit = concernIdxs.every(i => (actions[i] || "").trim().length >= 3);

  const submit = () => {
    const result = situations.map((s, i) => ({ text: s.text, choice: choices[i], action: actions[i] || "" }));
    saveInsight(node.id, { result }, "");
    setFinished(true);
  };

  if (finished) {
    const influenceCount = situations.filter((_, i) => choices[i] === "influence").length;
    return (
      <div className="space-y-5">
        <NodeHeader node={node} />
        <div className="rounded-2xl p-8 border text-center" style={{ background: "white", borderColor: "#e8e3db" }}>
          <p className="text-4xl mb-3">⭕</p>
          <p className="text-2xl font-bold mb-1" style={{ color: "#18283a" }}>{influenceCount} / {situations.length}</p>
          <p className="text-sm" style={{ color: "#5a6a74" }}>situací v kruhu vlivu</p>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
          style={{ background: t.btn }}>Pokračovat →</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <p className="text-sm px-1 leading-relaxed" style={{ color: "#5a6a74" }}>
        Zařaď každou situaci. U těch mimo tvůj vliv napiš konkrétní akci.
      </p>
      <div className="space-y-3">
        {situations.map((s, i) => (
          <div key={i} className="rounded-xl p-4 border transition-colors"
            style={{ background: "white", borderColor: choices[i] === "influence" ? "#c8e8e1" : "#f5cece" }}>
            <p className="text-sm mb-3 leading-snug" style={{ color: "#18283a" }}>{s.text}</p>
            <div className="flex gap-2">
              <button onClick={() => setChoices(p => ({ ...p, [i]: "influence" }))}
                className="flex-1 py-2 rounded-lg text-xs font-bold transition-all active:scale-[.97]"
                style={{
                  background: choices[i] === "influence" ? "#2e7a66" : "#e3f4ef",
                  color: choices[i] === "influence" ? "white" : "#2e7a66",
                }}>Ovlivním ✓</button>
              <button onClick={() => setChoices(p => ({ ...p, [i]: "concern" }))}
                className="flex-1 py-2 rounded-lg text-xs font-bold transition-all active:scale-[.97]"
                style={{
                  background: choices[i] === "concern" ? "#a93a3a" : "#fce9e9",
                  color: choices[i] === "concern" ? "white" : "#a93a3a",
                }}>Neovlivním</button>
            </div>
            {choices[i] === "concern" && (
              <div className="mt-3">
                {s.hint && <p className="text-[11px] mb-1.5" style={{ color: "#9e9288" }}>💡 {s.hint}</p>}
                <input value={actions[i] || ""} onChange={e => setActions(p => ({ ...p, [i]: e.target.value }))}
                  placeholder="Co konkrétně mohu udělat místo toho?"
                  className="w-full p-2.5 rounded-lg border text-xs focus:outline-none"
                  style={{ borderColor: "#f5cece", color: "#18283a" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={submit} disabled={!canSubmit}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        Zobrazit výsledek →
      </button>
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
function SemaforReflection({ node, onDone }: { node: PathNode; onDone: () => void }) {
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
        saveInsight(node.id, { semafor_value: value }, "");
        onDone();
      }}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
        style={{ background: t.btn }}>
        Pokračovat →
      </button>
    </div>
  );
}

/* ── Mirror Form ──────────────────────────────────────────────────────────── */
function MirrorForm({ node, onDone }: { node: PathNode; onDone: () => void }) {
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
        saveInsight(node.id, fields, fields.choice);
        onDone();
      }} disabled={!valid}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        Uložit →
      </button>
    </div>
  );
}

/* ── Generic reflection (text area) ──────────────────────────────────────── */
function GenericReflection({ node, onDone }: { node: PathNode; onDone: () => void }) {
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
      <button onClick={() => { saveInsight(node.id, {}, text); onDone(); }} disabled={!valid}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        Uložit →
      </button>
    </div>
  );
}

/* ── ReflectionView router ────────────────────────────────────────────────── */
function ReflectionView({ node, onDone }: { node: PathNode; onDone: () => void }) {
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

function ChallengeView({ node, onDone }: { node: PathNode; onDone: () => void }) {
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
        onClick={() => { saveInsight(node.id, isSummary ? { answers } : {}, ""); onDone(); }}
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

  /* ── Load progress from Supabase on mount ─────────────────────────────── */
  useEffect(() => {
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

    supabase
      .from("progress")
      .select("node_id")
      .eq("profile_id", pid)
      .then(({ data, error }) => {
        console.log("[PathMap] loaded progress:", data, "error:", error);
        if (data) setDone(data.map((r: { node_id: string }) => r.node_id));
        setLoading(false);
      })
      .catch(() => {
        const saved = localStorage.getItem("progress_local");
        if (saved) setDone(JSON.parse(saved));
        setLoading(false);
      });
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

  const finish = async () => {
    if (!active) return;
    const nodeId = active.id;
    setDone(prev => {
      const next = [...prev, nodeId];
      localStorage.setItem("progress_local", JSON.stringify(next));
      return next;
    });
    setActive(null);
    const pid = localStorage.getItem("profile_id");
    console.log("[PathMap] saving:", pid, nodeId);
    if (!pid || pid.startsWith("local_")) {
      console.log("[PathMap] local profile — progress saved to localStorage only");
      return;
    }
    try {
      const { data, error } = await supabase.from("progress").upsert(
        { profile_id: pid, node_id: nodeId, completed_at: new Date().toISOString() },
        { onConflict: "profile_id,node_id" }
      );
      console.log("[PathMap] save result:", data, error);
    } catch {
      console.log("[PathMap] Supabase save failed — progress kept in localStorage");
    }
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
          {active?.type === "theory"     && <TheoryView     node={active} onDone={finish} />}
          {active?.type === "game"       && <GameView       node={active} onDone={finish} />}
          {active?.type === "reflection" && <ReflectionView node={active} onDone={finish} />}
          {active?.type === "challenge"  && <ChallengeView  node={active} onDone={finish} />}
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

          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setCurrentChapter(chapter1)}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              style={{
                background: currentChapter.id === "ch1" ? "#2e7a55" : "#e5e0d8",
                color: currentChapter.id === "ch1" ? "white" : "#7a7570",
              }}>
              1. Všímej si
            </button>
            <button
              onClick={() => setCurrentChapter(chapter2)}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              style={{
                background: currentChapter.id === "ch2" ? "#2e7a55" : "#e5e0d8",
                color: currentChapter.id === "ch2" ? "white" : "#7a7570",
              }}>
              2. Vzorce
            </button>
          </div>

          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "#e5e0d8" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.round((chapterDoneCount / NODES.length) * 100)}%`, background: "linear-gradient(90deg,#2f5fa3,#5590d4)" }} />
            </div>
            <span className="text-sm font-bold tabular-nums w-10 text-right" style={{ color: "#2f5fa3" }}>
              {Math.round((chapterDoneCount / NODES.length) * 100)}%
            </span>
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
                      style={{
                        color: isDone ? "#1e5e38" : isUn ? "#18283a" : "#a8a39e",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
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
              {currentChapter.id === "ch1" && (
                <p className="mt-2" style={{ color: "#2f5fa3" }}>Kapitola 2 je odemčena.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
