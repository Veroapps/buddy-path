"use client";

import { useState, useRef, useEffect } from "react";
import { chapter1, type PathNode, type NodeType } from "@/data/chapter1";
import { supabase } from "@/lib/supabase";

/* ─── layout ──────────────────────────────────────────────────────────────── */
const NS     = 64;
const R      = NS / 2;
const MASK_R = R - 2;
const LABEL_W = 110;
const LABEL_H = 50;
const ROW_H  = 112;
const GAP    = 10;

/* ─── S-wave positions for 12 nodes ──────────────────────────────────────── */
const POS: [number, number][] = [
  [50,  0],
  [64,  1],
  [76,  2],
  [80,  3],
  [76,  4],
  [62,  5],
  [50,  6],
  [38,  7],
  [24,  8],
  [20,  9],
  [32, 10],
  [50, 11],
];

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

/* ── Add Yet ──────────────────────────────────────────────────────────────── */
function AddYetGame({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const [text, setText] = useState("");
  const [transformed, setTransformed] = useState("");
  const [animated, setAnimated] = useState(false);
  const t = TMAP[node.type];
  const hints = node.examples ?? [];

  const handleAddYet = (src = text) => {
    if (!src.trim()) return;
    const clean = src.trim().replace(/\.$/, "");
    const result = clean + " zatím.";
    setText(src);
    setTransformed(result);
    setAnimated(false);
    requestAnimationFrame(() => setAnimated(true));
    localStorage.setItem("first_proactive_statement", result);
    saveInsight(node.id, { original: src, transformed: result }, result);
  };

  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8e3db" }}>
        <p className="text-sm mb-4" style={{ color: "#5a6a74" }}>
          Napiš větu, která ti říká, co neumíš nebo co ti nejde.
        </p>
        <div className="flex gap-2 mb-4">
          <input value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAddYet()}
            placeholder="Neumím prezentovat."
            className="flex-1 p-3 rounded-xl border text-sm focus:outline-none"
            style={{ borderColor: "#e8e3db", color: "#18283a" }} />
          <button onClick={() => handleAddYet()} disabled={!text.trim()}
            className="px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap active:scale-[.97] transition-transform disabled:opacity-40"
            style={{ background: "#dae8f8", color: "#2f5fa3" }}>
            + ZATÍM
          </button>
        </div>
        {hints.length > 0 && !transformed && (
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: "#9e9288" }}>Nápověda:</p>
            <div className="flex flex-wrap gap-2">
              {hints.map((h, i) => (
                <button key={i} onClick={() => handleAddYet(h)}
                  className="text-xs px-3 py-1.5 rounded-full border active:scale-[.97] transition-transform"
                  style={{ borderColor: "#e8e3db", color: "#5a6a74", background: "#faf8f4" }}>
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}
        {transformed && (
          <div className="mt-3 p-4 rounded-xl" style={{ background: "#f0f7f4" }}>
            <p className="text-xs line-through mb-1" style={{ color: "#9e9288" }}>{text}</p>
            <p className="text-base font-semibold" style={{ color: "#18283a" }}>
              {transformed.replace(" zatím.", "")}
              <span style={{
                color: "#2f5fa3",
                display: "inline-block",
                animation: animated ? "slideIn 0.4s ease-out forwards" : "none",
              }}> zatím.</span>
            </p>
          </div>
        )}
      </div>
      {node.quote_cz && (
        <Quote cz={node.quote_cz} en={node.quote_en} author={node.quote_author} accent={t.accent} />
      )}
      <button onClick={onDone} disabled={!transformed}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: t.btn }}>
        Pokračovat →
      </button>
    </div>
  );
}

/* ── GameView router ──────────────────────────────────────────────────────── */
function GameView({ node, onDone }: { node: PathNode; onDone: () => void }) {
  if (node.gameType === "the-gap")        return <TheGapGame        node={node} onDone={onDone} />;
  if (node.gameType === "fact-or-story")  return <FactOrStoryGame   node={node} onDone={onDone} />;
  if (node.gameType === "body-map")       return <BodyMapGame        node={node} onDone={onDone} />;
  if (node.gameType === "add-yet")        return <AddYetGame         node={node} onDone={onDone} />;
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
function ChallengeView({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const t = TMAP[node.type];
  return (
    <div className="space-y-5">
      <NodeHeader node={node} />
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#f0cece" }}>
        <p className="mb-5 leading-relaxed" style={{ color: "#3c4a54", fontSize: 15 }}>{node.challengeDesc}</p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: node.challengeDays ?? 5 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl border-2 flex flex-col items-center justify-center"
              style={{ borderColor: "#e8e3db", background: "#faf8f4" }}>
              <span className="text-[10px]" style={{ color: "#9e9288" }}>Den</span>
              <span className="text-xl font-bold" style={{ color: "#d4cfc8" }}>{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => { saveInsight(node.id, {}, ""); onDone(); }}
        className="w-full py-4 rounded-2xl font-semibold text-base text-white active:scale-[.98] transition-transform"
        style={{ background: t.btn }}>
        Přijímám výzvu! →
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════════════ */
export default function PathMap() {
  const [done,      setDone]      = useState<string[]>([]);
  const [active,    setActive]    = useState<PathNode | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);
  const containerRef              = useRef<HTMLDivElement>(null);
  const [cw, setCw]               = useState(0);
  const NODES                     = chapter1.nodes;

  /* ── Load progress from Supabase on mount ─────────────────────────────── */
  useEffect(() => {
    const pid = localStorage.getItem("profile_id");
    setProfileId(pid);
    if (!pid) { setLoading(false); return; }
    supabase
      .from("progress")
      .select("node_id")
      .eq("profile_id", pid)
      .then(({ data }) => {
        if (data) setDone(data.map((r: { node_id: string }) => r.node_id));
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

  const finish = () => {
    if (!active) return;
    const nodeId = active.id;
    setDone(prev => [...prev, nodeId]);
    setActive(null);
    if (profileId) {
      supabase.from("progress").upsert(
        { profile_id: profileId, node_id: nodeId, completed_at: new Date().toISOString() },
        { onConflict: "profile_id,node_id" }
      );
    }
  };

  const allPts = pts.map(p => ({ x: p.cx, y: p.cy }));
  const fullD  = makePath(allPts);
  const doneD  = done.length > 0 ? makePath(allPts.slice(0, done.length + 1)) : "";

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
              Kapitola {chapter1.number}
            </span>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "#18283a" }}>{chapter1.title}</h1>
            <p className="text-base max-w-md mx-auto" style={{ color: "#5a6a74" }}>{chapter1.description}</p>
          </div>

          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "#e5e0d8" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.round((done.length / NODES.length) * 100)}%`, background: "linear-gradient(90deg,#2f5fa3,#5590d4)" }} />
            </div>
            <span className="text-sm font-bold tabular-nums w-10 text-right" style={{ color: "#2f5fa3" }}>
              {Math.round((done.length / NODES.length) * 100)}%
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

          {done.length === NODES.length && (
            <div className="mt-8 text-center rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg,#eaf3fc,#dae8f8)" }}>
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold" style={{ color: "#18283a" }}>Kapitola 1 dokončena!</h2>
              <p className="mt-2" style={{ color: "#2f5fa3" }}>Kapitola 2 se brzy odemkne…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
