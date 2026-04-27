"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase, type Profile, type DiaryEntry, type CoachNote } from "@/lib/supabase";
import { chapter1 } from "@/data/chapter1";

type ProgressItem = { node_id: string; completed_at: string };

type InsightData = {
  node_id: string;
  input_data: Record<string, unknown>;
  created_at: string;
};

function buildAutoSummary(
  profile: Profile,
  completedNodeIds: string[],
  insights: InsightData[]
): string {
  const completedCount = completedNodeIds.length;
  const total = chapter1.nodes.length;
  const pct = Math.round((completedCount / total) * 100);

  const semafor = insights.find((i) => i.node_id === "n7");
  const mirror = insights.filter((i) => i.node_id === "n10");
  const n4 = insights.find((i) => i.node_id === "n4");
  const n11 = insights.find((i) => i.node_id === "n11");

  const lines: string[] = [];
  lines.push(`${profile.name} (${profile.avatar}) — série: ${profile.streak} dní, rekord: ${profile.record} dní`);
  lines.push(`Postup: ${completedCount}/${total} uzlů (${pct} %)`);

  if (semafor?.input_data?.value !== undefined) {
    const val = semafor.input_data.value as number;
    const label = val < 33 ? "červená (vysoký stres)" : val < 66 ? "žlutá (střední stres)" : "zelená (klid)";
    lines.push(`Semafor: ${label} (${val})`);
  }

  if (n4?.input_data?.score !== undefined) {
    lines.push(`Skóre Fakt vs. Příběh (n4): ${n4.input_data.score}`);
  }
  if (n11?.input_data?.score !== undefined) {
    lines.push(`Skóre Fakt vs. Příběh (n11): ${n11.input_data.score}`);
  }

  if (mirror.length > 0) {
    lines.push(`Mirror reflexe: ${mirror.length}× dokončena`);
  }

  return lines.join("\n");
}

function ActivityCalendar({ dates }: { dates: string[] }) {
  const set = new Set(dates.map((d) => d.split("T")[0]));
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
          {week.map((day) => (
            <div
              key={day}
              title={day}
              className={`w-3 h-3 rounded-sm ${
                set.has(day) ? "bg-emerald-400" : "bg-stone-100"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function CoachProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [notes, setNotes] = useState<CoachNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [loading, setLoading] = useState(true);
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
        supabase.from("user_insights").select("*").eq("profile_id", id).order("created_at").then((r) => r.error ? { data: [] } : r),
        supabase.from("coach_notes").select("*").eq("profile_id", id).order("created_at", { ascending: false }),
      ]);

      setProfile(profileData as Profile);
      setProgress((progressData as ProgressItem[]) ?? []);
      setDiary((diaryData as DiaryEntry[]) ?? []);
      setInsights((insightData as InsightData[]) ?? []);
      setNotes((noteData as CoachNote[]) ?? []);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleSaveNote() {
    if (!newNote.trim() || !id) return;
    setSavingNote(true);
    const { data } = await supabase
      .from("coach_notes")
      .insert({ profile_id: id, note: newNote.trim() })
      .select()
      .single();
    if (data) {
      setNotes((prev) => [data as CoachNote, ...prev]);
      setNewNote("");
    }
    setSavingNote(false);
  }

  function handleExport() {
    if (!profile) return;
    const completedIds = progress.map((p) => p.node_id);
    const summary = buildAutoSummary(profile, completedIds, insights);
    const diaryLines = diary
      .map((d) => `${d.created_at.split("T")[0]} ${d.mood} — ${d.text}`)
      .join("\n");
    const notesLines = notes.map((n) => `${n.created_at.split("T")[0]}: ${n.note}`).join("\n");

    const content = [
      `=== BUDDY PATH — ${profile.name} ===`,
      "",
      "--- AUTO-SHRNUTÍ ---",
      summary,
      "",
      "--- DENÍK ---",
      diaryLines || "(prázdný)",
      "",
      "--- POZNÁMKY KOUČE ---",
      notesLines || "(žádné)",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `buddypath_${profile.name.toLowerCase().replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30 flex items-center justify-center">
        <p className="text-stone-400">Načítám…</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30 flex items-center justify-center">
        <p className="text-stone-500">Profil nenalezen.</p>
      </main>
    );
  }

  const completedIds = new Set(progress.map((p) => p.node_id));
  const autoSummary = buildAutoSummary(profile, progress.map((p) => p.node_id), insights);
  const activityDates = [
    ...progress.map((p) => p.completed_at),
    ...diary.map((d) => d.created_at),
  ];

  const semaforInsight = insights.find((i) => i.node_id === "n7");
  const semaforVal = semaforInsight?.input_data?.value as number | undefined;
  const n4Insight = insights.find((i) => i.node_id === "n4");
  const n11Insight = insights.find((i) => i.node_id === "n11");

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <div ref={exportRef} className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <a href="/coach" className="text-sm text-stone-400 hover:text-stone-600">← Zpět</a>
          <button
            onClick={handleExport}
            className="text-xs px-3 py-1.5 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors"
          >
            Exportovat .txt
          </button>
        </div>

        {/* Profile header */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm flex items-center gap-4">
          <span className="text-5xl">{profile.avatar}</span>
          <div>
            <h1 className="text-xl font-bold text-stone-800">{profile.name}</h1>
            <p className="text-sm text-stone-400">
              Série: 🔥 {profile.streak} · Rekord: {profile.record} · Od:{" "}
              {profile.created_at.split("T")[0]}
            </p>
          </div>
        </div>

        {/* Activity calendar */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-3 text-sm">Aktivita (6 týdnů)</h2>
          <ActivityCalendar dates={activityDates} />
        </div>

        {/* Progress nodes */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-3 text-sm">Postup</h2>
          <div className="flex flex-wrap gap-2">
            {chapter1.nodes.map((n) => (
              <div
                key={n.id}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${
                  completedIds.has(n.id)
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-stone-50 border-stone-100 text-stone-400"
                }`}
              >
                <span>{n.emoji}</span>
                <span>{n.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Semafor trend */}
        {semaforVal !== undefined && (
          <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
            <h2 className="font-semibold text-stone-700 mb-3 text-sm">Semafor (stres)</h2>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gradient-to-r from-red-400 via-yellow-300 to-green-400 rounded-full relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-stone-600 rounded-full shadow"
                  style={{ left: `${semaforVal}%`, transform: "translateY(-50%) translateX(-50%)" }}
                />
              </div>
              <span className="text-sm font-medium text-stone-600">{Math.round(semaforVal)}%</span>
            </div>
          </div>
        )}

        {/* Story bias */}
        {(n4Insight || n11Insight) && (
          <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
            <h2 className="font-semibold text-stone-700 mb-3 text-sm">Tendence k příběhu</h2>
            <div className="flex gap-6">
              {n4Insight?.input_data?.score !== undefined && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-stone-800">
                    {n4Insight.input_data.score as number}
                  </p>
                  <p className="text-xs text-stone-400">Začátek (n4)</p>
                </div>
              )}
              {n11Insight?.input_data?.score !== undefined && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    {n11Insight.input_data.score as number}
                  </p>
                  <p className="text-xs text-stone-400">Po tréninku (n11)</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Diary */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-3 text-sm">Deník ({diary.length})</h2>
          {diary.length === 0 && <p className="text-stone-400 text-sm">Prázdný.</p>}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {diary.map((d) => (
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

        {/* Auto-summary */}
        <div className="bg-amber-50 rounded-3xl border border-amber-100 p-5 shadow-sm">
          <h2 className="font-semibold text-amber-700 mb-3 text-sm">Auto-shrnutí</h2>
          <pre className="text-xs text-stone-700 whitespace-pre-wrap font-mono leading-relaxed">
            {autoSummary}
          </pre>
        </div>

        {/* Coach notes */}
        <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-3 text-sm">Poznámky kouče</h2>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Nová poznámka…"
            rows={2}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-2"
          />
          <button
            onClick={handleSaveNote}
            disabled={!newNote.trim() || savingNote}
            className="text-xs px-3 py-1.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-40 mb-4"
          >
            {savingNote ? "Ukládám…" : "Přidat poznámku"}
          </button>
          <div className="space-y-2">
            {notes.map((n) => (
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
