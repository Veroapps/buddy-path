"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { chapter1 } from "@/data/chapter1";
import { chapter2 } from "@/data/chapter2";
import { chapter3 } from "@/data/chapter3";

const ALL_NODES   = [...chapter1.nodes, ...chapter2.nodes, ...chapter3.nodes];
const TOTAL_NODES = ALL_NODES.length;

/* ── Streak z localStorage (vola se jen na klientovi) ─────────────────────── */
function resolveLocalStreak(): { streak: number; record: number } {
  try {
    const today    = new Date().toISOString().split("T")[0];
    const lastDate = localStorage.getItem("last_active_date") || "";
    const saved    = Math.max(1, parseInt(localStorage.getItem("buddy_streak") || "1", 10));
    const savedRec = Math.max(1, parseInt(localStorage.getItem("buddy_record") || "1", 10));

    let streak: number;
    if (lastDate === today) {
      streak = saved;
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      streak = lastDate === yesterday.toISOString().split("T")[0] ? saved + 1 : 1;
    }

    const record = Math.max(streak, savedRec);
    localStorage.setItem("last_active_date", today);
    localStorage.setItem("buddy_streak",     String(streak));
    localStorage.setItem("buddy_record",     String(record));
    return { streak, record };
  } catch {
    return { streak: 1, record: 1 };
  }
}

function localCompletedCount(): number {
  try {
    const done: string[] = JSON.parse(localStorage.getItem("progress_local") || "[]");
    return done.filter(id => ALL_NODES.some(n => n.id === id)).length;
  } catch {
    return 0;
  }
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function HomeHeader() {
  /* Defaultni hodnoty — header se nikdy nevyrenderuje jako null */
  const [name,           setName]           = useState("...");
  const [avatar,         setAvatar]         = useState("🦊");
  const [streak,         setStreak]         = useState(1);
  const [record,         setRecord]         = useState(1);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    /* ── KROK 1: okamzite z localStorage ─────────────────────────────── */
    const localName   = localStorage.getItem("profile_name")   || "Buddy";
    const localAvatar = localStorage.getItem("profile_avatar") || "🦊";
    const { streak: ls, record: lr } = resolveLocalStreak();
    const lc = localCompletedCount();

    setName(localName);
    setAvatar(localAvatar);
    setStreak(ls);
    setRecord(lr);
    setCompletedCount(lc);

    /* ── KROK 2: Supabase (primarne, ale async) ───────────────────────── */
    const profileId = localStorage.getItem("profile_id");
    if (!profileId || profileId.startsWith("local_")) return;
    const pid = profileId;

    (async () => {
      try {
        const today = new Date().toISOString().split("T")[0];

        const [profileRes, countRes] = await Promise.all([
          supabase
            .from("profiles")
            .select("name, avatar, streak, record, last_active")
            .eq("id", pid)
            .single(),
          supabase
            .from("progress")
            .select("id", { count: "exact", head: true })
            .eq("profile_id", pid),
        ]);

        const profile = profileRes.data;
        if (!profile) return;

        let { streak: sb, record: sbRec, last_active } = profile;

        /* Streak update — jen streak/record/last_active, nic jineho se nemeni */
        if (last_active !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yStr = yesterday.toISOString().split("T")[0];
          sb    = last_active === yStr ? sb + 1 : 1;
          sbRec = Math.max(sb, sbRec);
          await supabase
            .from("profiles")
            .update({ streak: sb, record: sbRec, last_active: today })
            .eq("id", pid);
        }

        /* Aktualizuj zobrazenou hodnotu Supabase daty */
        setName(profile.name);
        setAvatar(profile.avatar || localAvatar);
        setStreak(sb);
        setRecord(sbRec);
        setCompletedCount(countRes.count ?? lc);
      } catch {
        /* Supabase neni dostupne — localStorage data zustava, nic se nedela */
      }
    })();
  }, []);

  const pct = Math.round((completedCount / TOTAL_NODES) * 100);

  return (
    <div
      className="sticky top-0 z-40 border-b"
      style={{
        background:     "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
        borderColor:    "#e8e3db",
      }}>
      <div className="max-w-2xl mx-auto px-4 py-3">

        <div className="flex items-center gap-3">

          {/* Maskot — velky avatar */}
          <span className="text-4xl leading-none select-none flex-shrink-0">
            {avatar}
          </span>

          {/* Jmeno + rekord */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight truncate" style={{ color: "#18283a" }}>
              {name}
            </p>
            <p className="text-xs leading-tight" style={{ color: "#9e9288" }}>
              Rekord: {record} dni
            </p>
          </div>

          {/* Streak */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full flex-shrink-0"
            style={{ background: "#fff4e0" }}>
            <span className="text-sm">🔥</span>
            <span className="text-sm font-semibold" style={{ color: "#b87012" }}>{streak}</span>
          </div>

          {/* Celkovy pokrok % */}
          <span className="text-sm font-bold tabular-nums flex-shrink-0" style={{ color: "#2f5fa3" }}>
            {pct}%
          </span>

        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden mt-2.5" style={{ background: "#e5e0d8" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width:      `${pct}%`,
              background: "linear-gradient(90deg,#2f5fa3,#5590d4)",
            }}
          />
        </div>

      </div>
    </div>
  );
}
