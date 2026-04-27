"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { chapter1 } from "@/data/chapter1";

const TOTAL_NODES = chapter1.nodes.length;

type HeaderData = {
  name: string;
  avatar: string;
  streak: number;
  record: number;
  completedCount: number;
};

export default function HomeHeader() {
  const [data, setData] = useState<HeaderData | null>(null);

  useEffect(() => {
    const profileId = localStorage.getItem("profile_id");
    if (!profileId) return;

    async function load() {
      const today = new Date().toISOString().split("T")[0];

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, avatar, streak, record, last_active")
        .eq("id", profileId)
        .single();

      if (!profile) return;

      const { count } = await supabase
        .from("progress")
        .select("id", { count: "exact", head: true })
        .eq("profile_id", profileId);

      const completedCount = count ?? 0;
      let { streak, record, last_active } = profile;

      if (last_active !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split("T")[0];

        if (last_active === yStr) {
          streak = streak + 1;
        } else if (last_active !== today) {
          streak = 1;
        }

        const newRecord = Math.max(streak, record);
        await supabase
          .from("profiles")
          .update({ streak, record: newRecord, last_active: today })
          .eq("id", profileId);

        record = newRecord;
      }

      setData({
        name: profile.name,
        avatar: profile.avatar,
        streak,
        record,
        completedCount,
      });
    }

    load();
  }, []);

  if (!data) return null;

  const pct = Math.round((data.completedCount / TOTAL_NODES) * 100);
  const nodeEmojis = chapter1.nodes.map((n) => n.emoji);

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-xl">
              {data.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-800 leading-tight">{data.name}</p>
              <p className="text-xs text-stone-400 leading-tight">
                Rekord: {data.record} dní
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 rounded-full">
              <span className="text-sm">🔥</span>
              <span className="text-sm font-medium text-amber-700">{data.streak}</span>
            </div>
          </div>
        </div>

        <div className="relative h-2 bg-stone-100 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex justify-between">
          {nodeEmojis.map((emoji, i) => (
            <span
              key={i}
              className={`text-xs transition-opacity ${
                i < data.completedCount ? "opacity-100" : "opacity-20"
              }`}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
