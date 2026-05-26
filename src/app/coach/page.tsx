"use client";

export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { supabase, type Profile } from "@/lib/supabase";

const COACH_PASSWORD = "buddycoach2024";

type SortKey = "name" | "streak" | "record" | "completedCount";

type ProfileRow = Profile & { completedCount: number };

export default function CoachPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<"profiles" | "comparison" | "notes">("profiles");
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("streak");
  const [sortAsc, setSortAsc] = useState(false);
  const [noteMap, setNoteMap] = useState<Record<string, string>>({});
  const [savingNote, setSavingNote] = useState<string | null>(null);

  function handleLogin() {
    if (pw === COACH_PASSWORD) {
      setAuthed(true);
    } else {
      setPwError(true);
      setPw("");
    }
  }

  useEffect(() => {
    if (!authed) return;
    loadProfiles();
  }, [authed]);

  async function loadProfiles() {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!profileData) return;

    const rows: ProfileRow[] = await Promise.all(
      (profileData as Profile[]).map(async (p) => {
        const { count } = await supabase
          .from("progress")
          .select("id", { count: "exact", head: true })
          .eq("profile_id", p.id);
        return { ...p, completedCount: count ?? 0 };
      })
    );
    setProfiles(rows);

    const { data: noteData } = await supabase
      .from("coach_notes")
      .select("profile_id, note")
      .order("created_at", { ascending: false });
    if (noteData) {
      const map: Record<string, string> = {};
      noteData.forEach((n: { profile_id: string; note: string }) => {
        if (!map[n.profile_id]) map[n.profile_id] = n.note;
      });
      setNoteMap(map);
    }
  }

  function sorted(rows: ProfileRow[]) {
    return [...rows].sort((a, b) => {
      const va = a[sortKey] as string | number;
      const vb = b[sortKey] as string | number;
      const cmp = typeof va === "string" ? va.localeCompare(vb as string) : (va as number) - (vb as number);
      return sortAsc ? cmp : -cmp;
    });
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((p) => !p);
    else { setSortKey(key); setSortAsc(false); }
  }

  async function saveNote(profileId: string) {
    const note = noteMap[profileId]?.trim();
    if (!note) return;
    setSavingNote(profileId);
    await supabase.from("coach_notes").insert({ profile_id: profileId, note });
    setSavingNote(null);
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-6">🔐</div>
          <h1 className="text-xl font-bold text-stone-800 mb-6">Coach přístup</h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Heslo…"
            className={`w-full px-4 py-3 rounded-2xl border text-center text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-3 ${
              pwError ? "border-red-400 bg-red-50" : "border-stone-200 bg-white"
            }`}
          />
          {pwError && <p className="text-red-500 text-sm mb-3">Nesprávné heslo.</p>}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-semibold hover:bg-emerald-600 transition-colors"
          >
            Vstoupit
          </button>
        </div>
      </main>
    );
  }

  const sortedProfiles = sorted(profiles);

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-stone-800 mb-6">Coach dashboard</h1>

        <div className="flex gap-2 mb-6">
          {(["profiles", "comparison", "notes"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              {t === "profiles" ? "Profily" : t === "comparison" ? "Porovnání" : "Poznámky"}
            </button>
          ))}
        </div>

        {tab === "profiles" && (
          <div className="space-y-3">
            {profiles.length === 0 && (
              <p className="text-center text-stone-400 text-sm py-8">Žádní uživatelé.</p>
            )}
            {profiles.map((p) => (
              <a
                key={p.id}
                href={`/coach/profile/${p.id}`}
                className="flex items-center gap-4 bg-white rounded-2xl border border-stone-100 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{p.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-800">{p.name}</p>
                  <p className="text-xs text-stone-400">
                    Splneno: {p.completedCount} uzlu · Aktivita: {p.last_active ?? "–"}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <span>🔥</span>
                  <span className="font-semibold text-sm">{p.streak}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {tab === "comparison" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-stone-500 border-b border-stone-100">
                  {(
                    [
                      { key: "name", label: "Jméno" },
                      { key: "streak", label: "Série" },
                      { key: "record", label: "Rekord" },
                      { key: "completedCount", label: "Uzlů" },
                    ] as { key: SortKey; label: string }[]
                  ).map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => toggleSort(key)}
                      className="pb-2 pr-4 cursor-pointer select-none hover:text-stone-800 font-medium"
                    >
                      {label}{" "}
                      {sortKey === key ? (sortAsc ? "↑" : "↓") : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedProfiles.map((p) => (
                  <tr key={p.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                    <td className="py-2 pr-4">
                      <span className="mr-2">{p.avatar}</span>
                      <a href={`/coach/profile/${p.id}`} className="text-emerald-600 hover:underline">
                        {p.name}
                      </a>
                    </td>
                    <td className="py-2 pr-4 text-amber-600 font-medium">🔥 {p.streak}</td>
                    <td className="py-2 pr-4 text-stone-600">{p.record}</td>
                    <td className="py-2 pr-4 text-stone-600">{p.completedCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {profiles.length === 0 && (
              <p className="text-center text-stone-400 text-sm py-8">Žádná data.</p>
            )}
          </div>
        )}

        {tab === "notes" && (
          <div className="space-y-4">
            {profiles.length === 0 && (
              <p className="text-center text-stone-400 text-sm py-8">Žádní uživatelé.</p>
            )}
            {profiles.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{p.avatar}</span>
                  <span className="font-semibold text-stone-800">{p.name}</span>
                </div>
                <textarea
                  value={noteMap[p.id] ?? ""}
                  onChange={(e) =>
                    setNoteMap((prev) => ({ ...prev, [p.id]: e.target.value }))
                  }
                  placeholder="Poznámky ke klientovi…"
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-2"
                />
                <button
                  onClick={() => saveNote(p.id)}
                  disabled={savingNote === p.id}
                  className="text-xs px-3 py-1.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-40"
                >
                  {savingNote === p.id ? "Ukládám…" : "Uložit poznámku"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
