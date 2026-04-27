"use client";

import { useEffect, useState } from "react";
import { supabase, type DiaryEntry } from "@/lib/supabase";

const MOODS = ["😌", "😐", "😤", "😰", "💪"];

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [mood, setMood] = useState("");
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("profile_id");
    setProfileId(id);
    if (id) loadEntries(id);
  }, []);

  async function loadEntries(id: string) {
    const { data } = await supabase
      .from("diary_entries")
      .select("*")
      .eq("profile_id", id)
      .order("created_at", { ascending: false });
    if (data) setEntries(data as DiaryEntry[]);
  }

  async function handleAdd() {
    if (!profileId || !mood || !text.trim()) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("diary_entries")
      .insert({ profile_id: profileId, mood, text: text.trim() })
      .select()
      .single();
    if (!error && data) {
      setEntries((prev) => [data as DiaryEntry, ...prev]);
      setMood("");
      setText("");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await supabase.from("diary_entries").delete().eq("id", id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Deník</h1>

      <div className="bg-white rounded-3xl border border-stone-100 p-5 mb-6 shadow-sm">
        <p className="text-sm font-medium text-stone-600 mb-3">Jak se dnes cítíš?</p>
        <div className="flex gap-3 mb-4">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`text-2xl w-11 h-11 rounded-2xl flex items-center justify-center transition-all border-2 ${
                mood === m
                  ? "border-emerald-400 bg-emerald-50 scale-110"
                  : "border-transparent bg-stone-50 hover:bg-stone-100"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Co se dnes dělo? Jak jsi reagoval/a?"
          rows={3}
          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-stone-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-3"
        />
        <button
          disabled={!mood || !text.trim() || saving || !profileId}
          onClick={handleAdd}
          className="w-full py-2.5 bg-emerald-500 text-white rounded-2xl font-semibold text-sm hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? "Ukládám…" : "Přidat záznam"}
        </button>
        {!profileId && (
          <p className="text-xs text-center text-stone-400 mt-2">
            Nejprve dokonči onboarding na hlavní stránce.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-center text-stone-400 text-sm py-8">Zatím žádné záznamy.</p>
        )}
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm flex gap-3 items-start"
          >
            <span className="text-2xl mt-0.5">{entry.mood}</span>
            <div className="flex-1 min-w-0">
              <p className="text-stone-700 text-sm leading-relaxed">{entry.text}</p>
              <p className="text-xs text-stone-400 mt-1">{formatDate(entry.created_at)}</p>
            </div>
            <button
              onClick={() => handleDelete(entry.id)}
              className="text-stone-300 hover:text-red-400 transition-colors text-lg leading-none mt-0.5 flex-shrink-0"
              aria-label="Smazat"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
