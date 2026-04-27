"use client";
import { useState, useEffect } from "react";
import { chapter1, type PathNode } from "@/data/chapter1";
import { supabase } from "@/lib/supabase";

const TYPES: Record<string, { label: string; icon: string; bg: string; accent: string; accentBg: string; btnClass: string }> = {
  theory:     { label: "Teorie",  icon: "\u{1F4D6}", bg: "#e8f0ea", accent: "#4a7c59", accentBg: "#d0e2d4", btnClass: "bg-[#4a7c59] hover:bg-[#3a6347]" },
  game:       { label: "Hra",     icon: "\u{1F3AE}", bg: "#fef3e2", accent: "#d4913b", accentBg: "#fce5c0", btnClass: "bg-[#d4913b] hover:bg-[#b87a2e]" },
  reflection: { label: "Reflexe", icon: "\u270D\uFE0F", bg: "#e6f2f8", accent: "#4a90b8", accentBg: "#cce4f0", btnClass: "bg-[#4a90b8] hover:bg-[#3a7a9e]" },
  challenge:  { label: "V\u00FDzva",   icon: "\u{1F3C6}", bg: "#fce8e8", accent: "#c45c5c", accentBg: "#f5cfcf", btnClass: "bg-[#c45c5c] hover:bg-[#a84a4a]" },
};

const POS: [number, number][] = [
  [50, 0],
  [22, 1], [18, 2],
  [35, 3], [62, 4],
  [82, 5], [75, 6],
  [48, 7], [25, 8],
  [18, 9], [32, 10],
  [55, 11], [75, 12],
  [50, 13],
];
const ROW_H = 130;
const NS = 72;
const CY = (r: number) => r * ROW_H + NS / 2 + 10;
const TOTAL_H = CY(13) + NS + 50;
const MASK_R = 6;

function buildCurve(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = "M " + pts[0].x + " " + pts[0].y;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1]; const c = pts[i]; const my = (p.y + c.y) / 2;
    d += " C " + p.x + " " + my + ", " + c.x + " " + my + ", " + c.x + " " + c.y;
  }
  return d;
}

const ALL_PTS = POS.map(([xp, r]) => ({ x: xp, y: CY(r) }));
const FULL_PATH = buildCurve(ALL_PTS);

/* Helper: get profile_id from localStorage */
function getProfileId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("profile_id");
}

function PathCircle({ node, index, unlocked, done, isNext, onClick }: {
  node: PathNode; index: number; unlocked: boolean; done: boolean; isNext: boolean; onClick: () => void;
}) {
  const t = TYPES[node.type];
  const [xp, row] = POS[index] || [50, index];
  return (
    <div className="absolute animate-fade-up" style={{ left: xp + "%", top: row * ROW_H + 10 + "px", transform: "translateX(-50%)", animationDelay: index * 70 + "ms", zIndex: 10 }}>
      <button onClick={onClick} disabled={!unlocked && !done}
        className={"flex items-center justify-center rounded-full transition-all duration-200 " + (isNext ? "node-active" : "")}
        style={{
          width: NS, height: NS,
          background: done ? "#c6eacf" : unlocked ? "white" : "#f5f3ee",
          border: "4px solid " + (done ? "#4a7c59" : unlocked ? t.accent : "#e0ddd5"),
          opacity: unlocked || done ? 1 : 0.6,
          filter: unlocked || done ? "none" : "grayscale(0.3)",
          cursor: unlocked || done ? "pointer" : "default",
          fontSize: 30,
          boxShadow: done ? "0 2px 8px rgba(74,124,89,0.2)" : unlocked ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
        }}>
        {done ? <span style={{ color: "#2d5a3a", fontSize: 28, fontWeight: 800 }}>{"\u2713"}</span> : node.emoji}
      </button>
      <div style={{ width: 120, textAlign: "center", marginTop: 6, marginLeft: (NS - 120) / 2 }}>
        <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
          style={{ background: done ? "#d0e2d4" : unlocked ? t.accentBg : "#ece9e1", color: done ? "#2d5a3a" : unlocked ? t.accent : "#c0bdb5" }}>
          {t.icon} {t.label}
        </span>
        <p className="text-[11px] font-semibold leading-tight mt-1" style={{ color: done ? "#2d5a3a" : unlocked ? "#1a2e1f" : "#c0bdb5" }}>{node.title}</p>
      </div>
    </div>
  );
}

/* ===== DETAIL VIEWS ===== */
function TheoryView({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const t = TYPES.theory;
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, " + t.bg + ", " + t.accentBg + ")" }}>
        <div className="text-4xl mb-3">{node.emoji}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.7)", color: t.accent }}>{t.icon} {t.label}</span>
          {node.principle && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.5)", color: "#6b7d6f" }}>{node.principle}</span>}
        </div>
        <h2 className="text-2xl font-bold" style={{ color: "#1a2e1f" }}>{node.title}</h2>
        <p className="text-sm mt-1" style={{ color: "#6b7d6f" }}>{node.subtitle}</p>
      </div>
      {(node as any).quote2_cz && (
        <div className="rounded-xl p-4" style={{ background: "#f8f6f1", borderLeft: "3px solid " + t.accent }}>
          <p className="italic text-sm leading-relaxed" style={{ color: "#3d4f42" }}>&bdquo;{(node as any).quote2_cz}&ldquo;</p>
          <p className="text-[11px] italic mt-1" style={{ color: "#a3b0a6" }}>{(node as any).quote2_en}</p>
          <p className="text-[11px] font-semibold mt-1" style={{ color: t.accent }}>&mdash; {(node as any).quote2_author}</p>
        </div>
      )}
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8f0ea" }}>
        <p className="leading-relaxed" style={{ color: "#3d4f42", fontSize: "15px" }}>{node.content}</p>
      </div>
      {node.examples && (
        <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#e8f0ea" }}>
          <h3 className="text-[11px] uppercase tracking-widest font-bold mb-4" style={{ color: "#a3b0a6" }}>P\u0159\u00EDklady ze \u017Eivota</h3>
          <div className="space-y-3">
            {node.examples.map((e, i) => (
              <div key={i} className="flex gap-3 animate-slide-right" style={{ animationDelay: i * 100 + "ms" }}>
                <div className="w-1 rounded-full flex-shrink-0" style={{ background: t.accent + "60" }} />
                <p className="text-sm leading-relaxed" style={{ color: "#3d4f42" }}>{e}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {node.quote_cz && (
        <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fef3e2, #fce5c0)" }}>
          <div className="text-5xl absolute top-2 right-4 opacity-10 font-serif">&ldquo;</div>
          <p className="italic text-lg leading-relaxed relative z-10" style={{ color: "#1a2e1f" }}>&bdquo;{node.quote_cz}&ldquo;</p>
          <p className="text-xs italic mt-2 relative z-10" style={{ color: "#a3b0a6" }}>{node.quote_en}</p>
          <p className="text-xs font-semibold mt-2 relative z-10" style={{ color: "#d4913b" }}>&mdash; {node.quote_author}</p>
        </div>
      )}
      <button onClick={onDone} className={"w-full py-4 text-white rounded-2xl font-semibold text-base transition-all active:scale-[0.98] " + t.btnClass}>
        P\u0159e\u010Dteno &mdash; pokra\u010Dovat &rarr;
      </button>
    </div>
  );
}

function ReflectionView({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const [text, setText] = useState("");
  const [color, setColor] = useState<string | null>(null);
  const [emotion, setEmotion] = useState("");
  const t = TYPES.reflection;
  const isSemafor = node.id === "n6";
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, " + t.bg + ", " + t.accentBg + ")" }}>
        <div className="text-4xl mb-3">{node.emoji}</div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.7)", color: t.accent }}>{t.icon} {t.label}</span>
        <h2 className="text-2xl font-bold mt-2" style={{ color: "#1a2e1f" }}>{node.title}</h2>
      </div>
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#cce4f0" }}>
        <p className="mb-5 leading-relaxed" style={{ color: "#3d4f42", fontSize: "15px" }}>{node.prompt}</p>
        {isSemafor ? (<>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#a3b0a6" }}>Jak se c\u00EDt\u00ED\u0161?</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[{id:"green",label:"Klid",clr:"#4ade80",bg:"#f0fdf4"},{id:"yellow",label:"N\u011Bco bubl\u00E1",clr:"#fbbf24",bg:"#fffbeb"},{id:"red",label:"V\u0159e to",clr:"#f87171",bg:"#fef2f2"}].map((s) => (
              <button key={s.id} onClick={() => setColor(s.id)}
                className={"flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-150 " + (color === s.id ? "scale-105 shadow-md" : "")}
                style={{ borderColor: color === s.id ? s.clr : "#e5e5e5", background: color === s.id ? s.bg : "white" }}>
                <div className="w-10 h-10 rounded-full shadow-inner" style={{ background: s.clr }} />
                <span className="text-xs font-semibold" style={{ color: color === s.id ? "#1a2e1f" : "#a3b0a6" }}>{s.label}</span>
              </button>
            ))}
          </div>
          <input value={emotion} onChange={(e) => setEmotion(e.target.value)} placeholder="Pojmenuj emoci jedn\u00EDm slovem..." className="w-full p-3.5 rounded-xl border text-sm mb-3 focus:outline-none focus:ring-2" style={{ borderColor: "#cce4f0", background: "#f8fcff" }} />
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Co se pr\u00E1v\u011B stalo? (voliteln\u00E9)" className="w-full p-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2" style={{ borderColor: "#cce4f0", background: "#f8fcff" }} />
        </>) : (
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={node.placeholder} className="w-full p-4 rounded-xl border min-h-[140px] text-sm leading-relaxed focus:outline-none focus:ring-2 resize-y" style={{ borderColor: "#cce4f0", background: "#f8fcff" }} />
        )}
      </div>
      <button onClick={onDone} disabled={isSemafor ? (!color || emotion.length < 2) : text.trim().length < 5}
        className={"w-full py-4 text-white rounded-2xl font-semibold text-base transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed " + t.btnClass}>
        Ulo\u017Eit &rarr;
      </button>
    </div>
  );
}

function GameView({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const t = TYPES.game;
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, " + t.bg + ", " + t.accentBg + ")" }}>
        <div className="text-4xl mb-3">{node.emoji}</div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.7)", color: t.accent }}>{t.icon} {t.label}</span>
        <h2 className="text-2xl font-bold mt-2" style={{ color: "#1a2e1f" }}>{node.title}</h2>
      </div>
      <div className="rounded-2xl p-8 text-center border-2 border-dashed" style={{ borderColor: "#fce5c0", background: "#fffcf5" }}>
        <div className="text-5xl mb-3">{"\u{1F3AE}"}</div>
        <p className="font-semibold text-lg" style={{ color: "#1a2e1f" }}>Interaktivn\u00ED hra</p>
        <p className="text-sm mt-1" style={{ color: "#a3b0a6" }}>Brzy o\u017Eiv\u00EDme!</p>
      </div>
      <button onClick={onDone} className={"w-full py-4 text-white rounded-2xl font-semibold text-base transition-all active:scale-[0.98] " + t.btnClass}>
        Pokra\u010Dovat &rarr;
      </button>
    </div>
  );
}

function ChallengeView({ node, onDone }: { node: PathNode; onDone: () => void }) {
  const t = TYPES.challenge;
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, " + t.bg + ", " + t.accentBg + ")" }}>
        <div className="text-4xl mb-3">{node.emoji}</div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.7)", color: t.accent }}>{t.icon} {t.label}</span>
        <h2 className="text-2xl font-bold mt-2" style={{ color: "#1a2e1f" }}>{node.title}</h2>
      </div>
      <div className="rounded-2xl p-5 border" style={{ background: "white", borderColor: "#f5cfcf" }}>
        <p className="leading-relaxed mb-5" style={{ color: "#3d4f42", fontSize: "15px" }}>{node.challengeDesc}</p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: node.challengeDays || 5 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl border-2 flex flex-col items-center justify-center" style={{ borderColor: "#e5e5e5", background: "#fafaf9" }}>
              <span className="text-[10px] font-medium" style={{ color: "#a3b0a6" }}>Den</span>
              <span className="text-xl font-bold" style={{ color: "#d6d3d1" }}>{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onDone} className={"w-full py-4 text-white rounded-2xl font-semibold text-base transition-all active:scale-[0.98] " + t.btnClass}>
        P\u0159ij\u00EDm\u00E1m v\u00FDzvu! &rarr;
      </button>
    </div>
  );
}

/* ===== MAIN ===== */
export default function PathMap() {
  const [done, setDone] = useState<string[]>([]);
  const [active, setActive] = useState<PathNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);

  // Load progress from Supabase on mount
  useEffect(() => {
    async function loadProgress() {
      const pid = getProfileId();
      setProfileId(pid);

      if (!pid) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("progress")
          .select("node_id")
          .eq("profile_id", pid);

        if (!error && data) {
          setDone(data.map((row: { node_id: string }) => row.node_id));
        }
      } catch (e) {
        console.error("Failed to load progress:", e);
      }

      setLoading(false);
    }

    loadProgress();
  }, []);

  const unlocked = (i: number) => i === 0 || done.includes(chapter1.nodes[i - 1].id);
  const nextIdx = chapter1.nodes.findIndex((_, i) => unlocked(i) && !done.includes(chapter1.nodes[i].id));

  // Save progress to Supabase
  const finish = async () => {
    if (!active) return;
    const nodeId = active.id;

    // Update local state immediately
    setDone((p) => [...p, nodeId]);
    setActive(null);

    // Save to Supabase
    if (profileId) {
      try {
        await supabase.from("progress").upsert(
          { profile_id: profileId, node_id: nodeId },
          { onConflict: "profile_id,node_id" }
        );
      } catch (e) {
        console.error("Failed to save progress:", e);
      }
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">{"\u{1F331}"}</div>
          <p className="text-sm" style={{ color: "#a3b0a6" }}>Na\u010D\u00EDt\u00E1m cestu...</p>
        </div>
      </div>
    );
  }

  if (active) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-6">
        <button onClick={() => setActive(null)} className="flex items-center gap-2 text-sm font-medium mb-5 transition-colors"
          style={{ color: "#a3b0a6" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#1a2e1f"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#a3b0a6"; }}>
          &larr; Zp\u011Bt na cestu
        </button>
        {active.type === "theory" && <TheoryView node={active} onDone={finish} />}
        {active.type === "reflection" && <ReflectionView node={active} onDone={finish} />}
        {active.type === "game" && <GameView node={active} onDone={finish} />}
        {active.type === "challenge" && <ChallengeView node={active} onDone={finish} />}
      </div>
    );
  }

  const pct = Math.round((done.length / chapter1.nodes.length) * 100);
  const completedPath = done.length > 0 ? buildCurve(ALL_PTS.slice(0, done.length + 1)) : "";

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <div className="text-center mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>Kapitola {chapter1.number}</div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--ink)" }}>{chapter1.title}</h1>
        <p className="text-base" style={{ color: "var(--ink-soft)" }}>{chapter1.description}</p>
      </div>
      <div className="flex items-center gap-4 mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--cream-dark)" }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: pct + "%", background: "linear-gradient(90deg, var(--sage), #6ea65d)" }} />
        </div>
        <span className="text-sm font-bold tabular-nums" style={{ color: "var(--sage)" }}>{pct}%</span>
      </div>
      <div className="flex justify-center gap-5 mb-8 animate-fade-up" style={{ animationDelay: "150ms" }}>
        {Object.entries(TYPES).map(([, v]) => (
          <div key={v.label} className="flex items-center gap-1.5">
            <span className="text-xs">{v.icon}</span>
            <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>{v.label}</span>
          </div>
        ))}
      </div>

      <div className="relative w-full" style={{ height: TOTAL_H + "px" }}>
        {/* SVG: path line + mask circles */}
        <svg className="absolute inset-0 w-full h-full" viewBox={"0 0 100 " + TOTAL_H} preserveAspectRatio="none" style={{ zIndex: 1 }}>
          {/* Grey base path */}
          <path d={FULL_PATH} fill="none" stroke="#e0ddd5" strokeWidth="0.5" strokeLinecap="round" />
          {/* Animated dashes */}
          <path d={FULL_PATH} fill="none" stroke="#d5d0c5" strokeWidth="0.25" strokeDasharray="1 1.5" className="path-line" />
          {/* Green completed path */}
          {completedPath && <path d={completedPath} fill="none" stroke="#4a7c59" strokeWidth="0.6" strokeLinecap="round" />}
          {/* MASK CIRCLES: cream-colored circles at each node to hide path behind them */}
          {POS.map(([xp, r], i) => (
            <circle key={i} cx={xp} cy={CY(r)} r={MASK_R} fill="#faf7f2" stroke="none" />
          ))}
        </svg>

        {/* Interactive node circles */}
        {chapter1.nodes.map((node, i) => (
          <PathCircle key={node.id} node={node} index={i} unlocked={unlocked(i)}
            done={done.includes(node.id)} isNext={i === nextIdx}
            onClick={() => (unlocked(i) || done.includes(node.id)) && setActive(node)} />
        ))}
      </div>

      {done.length === chapter1.nodes.length && (
        <div className="mt-8 text-center rounded-2xl p-8 animate-scale-in" style={{ background: "linear-gradient(135deg, #e8f0ea, #d0e2d4)" }}>
          <div className="text-5xl mb-3">{"\u{1F389}"}</div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--sage-dark)" }}>Kapitola 1 dokon\u010Dena!</h2>
          <p className="mt-2" style={{ color: "var(--sage)" }}>Kapitola 2 se brzy odemkne...</p>
        </div>
      )}
    </div>
  );
}
