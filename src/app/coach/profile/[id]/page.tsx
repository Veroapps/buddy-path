"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase, type Profile, type DiaryEntry, type CoachNote } from "@/lib/supabase";
import { chapter1 } from "@/data/chapter1";
import { chapter2 } from "@/data/chapter2";
import { chapter3 } from "@/data/chapter3";

/* ── Lookup: node_id → { title, type, chapter } ─────────────────────────── */
const NODE_MAP: Record<string, { title: string; type: string; chapter: number }> = {};
[
  { chapter: 1, nodes: chapter1.nodes },
  { chapter: 2, nodes: chapter2.nodes },
  { chapter: 3, nodes: chapter3.nodes },
].forEach(({ chapter, nodes }) => {
  nodes.forEach(n => {
    NODE_MAP[n.id] = { title: n.title, type: n.type, chapter };
  });
});

const TYPE_LABELS: Record<string, string> = {
  theory:     "Teorie",
  game:       "Hra",
  reflection: "Reflexe",
  challenge:  "Shrnuti",
};

type ProgressItem = { node_id: string; completed_at: string };

type InsightRow = {
  id:         string;
  node_id:    string;
  node_title?: string;
  node_type?:  string;
  content:    Record<string, unknown>;
  created_at: string;
};

/* ── Activity calendar ───────────────────────────────────────────────────── */
function ActivityCalendar({ dates }: { dates: string[] }) {
  const set = new Set(dates.map(d => d.split("T")[0]));
  const weeks: string[][] = [];
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 6 * 7 + 1);
  for (let w = 0; w < 6; w++) {
    const week: string[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      week.push(date.toISOString().split("T")[0]);
    }
    weeks.push(week);
  }
  return (
    <div className="flex gap-1">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map(day => (
            <div key={day} title={day}
              className={`w-3 h-3 rounded-sm ${set.has(day) ? "bg-emerald-400" : "bg-stone-100"}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Zobrazeni jednoho insight ───────────────────────────────────────────── */
function InsightCard({ ins }: { ins: InsightRow }) {
  const meta    = NODE_MAP[ins.node_id];
  const nodeType = ins.node_type ?? meta?.type ?? "";
  const label   = TYPE_LABELS[nodeType] ?? nodeType;
  const title   = ins.node_title ?? meta?.title ?? ins.node_id;
  const content   = ins.content ?? {};
  const textVal   = typeof content.text === "string" ? content.text : null;
  const answers   = Array.isArray(content.answers) ? (content.answers as string[]) : null;
  const labels    = Array.isArray(content.labels)  ? (content.labels  as string[]) : ["5", "4", "3", "2", "1"];
  const semafor   = typeof content.semafor_value === "number" ? content.semafor_value : null;
  const hasFact   = typeof content.fact === "string";
  const hasFallback = !textVal && !answers && semafor === null && !hasFact && Object.keys(content).length > 0;

  return (
    <div className="rounded-xl border p-4" style={{ background: "white", borderColor: "#e8e3db" }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ background: "#f5f3ef", color: "#9e9288" }}>{label}</span>
        <span className="text-xs font-semibold" style={{ color: "#18283a" }}>{title}</span>
        <span className="ml-auto text-[11px]" style={{ color: "#c0bab3" }}>{ins.created_at.split("T")[0]}</span>
      </div>

      {textVal && (
        <p className="text-sm leading-relaxed" style={{ color: "#3c4a54" }}>{textVal}</p>
      )}

      {answers && (
        <div className="space-y-2 mt-1">
          {labels.map((lbl, i) =>
            answers[i] ? (
              <div key={i}>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "#9e9288" }}>{lbl}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#3c4a54" }}>{answers[i]}</p>
              </div>
            ) : null
          )}
        </div>
      )}

      {semafor !== null && (
        <p className="text-sm" style={{ color: "#3c4a54" }}>
          Semafor: <strong>{Math.round(semafor * 100)}%</strong>
        </p>
      )}

      {hasFact && (
        <div className="space-y-2 mt-1">
          {(["fact", "story", "feeling", "choice"] as const).map((key) =>
            typeof content[key] === "string" ? (
              <div key={key}>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "#9e9288" }}>
                  {key === "fact" ? "Událost" : key === "story" ? "Příběh" : key === "feeling" ? "Pocit" : "Nové rozhodnutí"}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#3c4a54" }}>{String(content[key])}</p>
              </div>
            ) : null
          )}
        </div>
      )}

      {hasFallback && (
        <pre className="text-xs whitespace-pre-wrap" style={{ color: "#5a6a74" }}>
          {JSON.stringify(content, null, 2)}
        </pre>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════ */
export default function CoachProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile,  setProfile]  = useState<Profile | null>(null);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [diary,    setDiary]    = useState<DiaryEntry[]>([]);
  const [insights, setInsights] = useState<InsightRow[]>([]);
  const [notes,    setNotes]    = useState<CoachNote[]>([]);
  const [newNote,  setNewNote]  = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [loading, setLoading] = useState(true);
  const [insightChapter, setInsightChapter] = useState<number | "vse">("vse");
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const [
        { data: profileData },
        { data: progressData },
        { data: diaryData },
        { data: insightData },
        { data: noteData },
      ] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", id).single(),
        supabase.from("progress").select("node_id, completed_at").eq("profile_id", id).order("completed_at"),
        supabase.from("diary_entries").select("*").eq("profile_id", id).order("created_at", { ascending: false }),
        supabase.from("insights").select("*").eq("profile_id", id).order("created_at").then(r => r.error ? { data: [] } : r),
        supabase.from("coach_notes").select("*").eq("profile_id", id).order("created_at", { ascending: false }),
      ]);

      setProfile(profileData as Profile);
      setProgress((progressData as ProgressItem[]) ?? []);
      setDiary((diaryData as DiaryEntry[]) ?? []);
      setInsights((insightData as InsightRow[]) ?? []);
      setNotes((noteData as CoachNote[]) ?? []);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleSaveNote() {
    if (!newNote.trim() || !id) return;
    setSavingNote(true);
    const { data } = await supabase.from("coach_notes").insert({ profile_id: id, note: newNote.trim() }).select().single();
    if (data) { setNotes(prev => [data as CoachNote, ...prev]); setNewNote(""); }
    setSavingNote(false);
  }

  function handleExport() {
    if (!profile) return;
    const lines = [
      `=== BUDDY PATH — ${profile.name} ===`,
      `Serie: ${profile.streak}  |  Rekord: ${profile.record}  |  Od: ${profile.created_at.split("T")[0]}`,
      `Splneno: ${progress.length} uzlu`,
      "",
      "--- ODPOVEDI (insights) ---",
      ...insights.map(ins => {
        const title = ins.node_title ?? NODE_MAP[ins.node_id]?.title ?? ins.node_id;
        const c = ins.content ?? {};
        let body = "";
        if (c.text) body = String(c.text);
        else if (c.answers && Array.isArray(c.answers)) {
          body = (c.labels as string[] ?? []).map((lbl, i) => `${lbl}: ${(c.answers as string[])[i] ?? ""}`).join(" | ");
        } else if (Object.keys(c).length > 0) {
          body = JSON.stringify(c);
        }
        return `[${title}] ${body}`;
      }),
      "",
      "--- DENIK ---",
      ...diary.map(d => `${d.created_at.split("T")[0]} ${d.mood} — ${d.text}`),
      "",
      "--- POZNAMKY KOUCE ---",
      ...notes.map(n => `${n.created_at.split("T")[0]}: ${n.note}`),
    ].join("\n");

    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `buddypath_${profile.name.toLowerCase().replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-50 to-amber-50/30">
        <p className="text-stone-400">Nacitam...</p>
      </main>
    );
  }
  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-50 to-amber-50/30">
        <p className="text-stone-500">Profil nenalezen.</p>
      </main>
    );
  }

  const completedIds  = new Set(progress.map(p => p.node_id));
  const activityDates = [...progress.map(p => p.completed_at), ...diary.map(d => d.created_at)];

  /* Insights filtrovane podle kapitoly */
  const filteredInsights = insightChapter === "vse"
    ? insights
    : insights.filter(ins => NODE_MAP[ins.node_id]?.chapter === insightChapter);

  /* Kapitoly serazene pro tab */
  const allChapters = [1, 2, 3] as const;

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <div ref={exportRef} className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* Navigace */}
        <div className="flex items-center justify-between">
          <a href="/coach" className="text-sm text-stone-400 hover:text-stone-600">← Zpet</a>
          <button onClick={handleExport}
            className="text-xs px-3 py-1.5 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors">
            Exportovat .txt
          </button>
        </div>

        {/* Profil */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm flex items-center gap-4">
          <span className="text-5xl">{profile.avatar}</span>
          <div>
            <h1 className="text-xl font-bold text-stone-800">{profile.name}</h1>
            <p className="text-sm text-stone-400">
              Serie: 🔥 {profile.streak} · Rekord: {profile.record} · Od: {profile.created_at.split("T")[0]}
            </p>
          </div>
        </div>

        {/* Aktivita */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-3 text-sm">Aktivita (6 tydnu)</h2>
          <ActivityCalendar dates={activityDates} />
        </div>

        {/* Postup — vsechny kapitoly */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-3 text-sm">
            Postup — {completedIds.size} uzlu splneno
          </h2>
          {[
            { label: "Kapitola 1", nodes: chapter1.nodes },
            { label: "Kapitola 2", nodes: chapter2.nodes },
            { label: "Kapitola 3", nodes: chapter3.nodes },
          ].map(({ label, nodes }) => (
            <div key={label} className="mb-4 last:mb-0">
              <p className="text-[11px] uppercase tracking-widest font-bold mb-2" style={{ color: "#9e9288" }}>{label}</p>
              <div className="flex flex-wrap gap-2">
                {nodes.map(n => (
                  <div key={n.id}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${
                      completedIds.has(n.id)
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-stone-50 border-stone-100 text-stone-400"
                    }`}>
                    <span>{n.emoji}</span>
                    <span>{n.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Insights — odpovedi uzivatele */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-3 text-sm">
            Odpovedi a reflexe ({insights.length})
          </h2>

          {/* Filtry podle kapitoly */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {(["vse", ...allChapters] as const).map(ch => (
              <button key={ch}
                onClick={() => setInsightChapter(ch)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                style={{
                  background: insightChapter === ch ? "#18283a" : "#f5f3ef",
                  color:      insightChapter === ch ? "white"   : "#9e9288",
                }}>
                {ch === "vse" ? "Vse" : `Kap. ${ch}`}
              </button>
            ))}
          </div>

          {filteredInsights.length === 0 ? (
            <p className="text-sm text-stone-400">Zadne odpovedi.</p>
          ) : (
            <div className="space-y-3">
              {filteredInsights.map(ins => (
                <InsightCard key={ins.id} ins={ins} />
              ))}
            </div>
          )}
        </div>

        {/* Denik */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-3 text-sm">Denik ({diary.length})</h2>
          {diary.length === 0 && <p className="text-stone-400 text-sm">Prazdny.</p>}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {diary.map(d => (
              <div key={d.id} className="flex gap-2 items-start text-sm">
                <span>{d.mood}</span>
                <div>
                  <p className="text-stone-700 leading-snug">{d.text}</p>
                  <p className="text-xs text-stone-400">{d.created_at.split("T")[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Poznamky kouce */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-3 text-sm">Poznamky kouce</h2>
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Nova poznamka..."
            rows={2}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-2"
          />
          <button onClick={handleSaveNote} disabled={!newNote.trim() || savingNote}
            className="text-xs px-3 py-1.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-40 mb-4">
            {savingNote ? "Ukladam..." : "Pridat poznamku"}
          </button>
          <div className="space-y-2">
            {notes.map(n => (
              <div key={n.id} className="text-sm text-stone-700 border-l-2 border-emerald-200 pl-3">
                <p>{n.note}</p>
                <p className="text-xs text-stone-400 mt-0.5">{n.created_at.split("T")[0]}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
