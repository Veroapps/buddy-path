"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const AVATARS = ["🦊", "🦉", "🐼", "🐱", "🦦", "🐸"];

type Props = {
  onComplete: () => void;
};

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleFinish() {
    if (!name.trim() || !avatar) return;
    setSaving(true);
    setError("");
    const { data, error: err } = await supabase
      .from("profiles")
      .insert({ name: name.trim(), avatar })
      .select("id")
      .single();
    if (err || !data) {
      setError("Nepodařilo se uložit profil. Zkus to znovu.");
      setSaving(false);
      return;
    }
    localStorage.setItem("profile_id", data.id);
    localStorage.setItem("profile_name", name.trim());
    localStorage.setItem("profile_avatar", avatar);
    setSaving(false);
    onComplete();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-stone-50 to-amber-50/30 px-4">
      {step === 1 && (
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-6">🌱</div>
          <h1 className="text-2xl font-bold text-stone-800 mb-3">Vítej v Buddy Path</h1>
          <p className="text-stone-500 mb-8 leading-relaxed">
            Malá cesta za lepším vztahem sám se sebou. Jdeme na to?
          </p>
          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-semibold text-lg hover:bg-emerald-600 transition-colors"
          >
            Jdeme!
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-xl font-bold text-stone-800 mb-1">Jak ti mám říkat?</h2>
            <p className="text-stone-500 text-sm">Klidně přezdívka.</p>
          </div>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep(3)}
            placeholder="Tvoje jméno…"
            className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-white text-stone-800 text-center text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-6"
          />
          <button
            disabled={!name.trim()}
            onClick={() => setStep(3)}
            className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-semibold text-lg hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Pokračovat
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎨</div>
            <h2 className="text-xl font-bold text-stone-800 mb-1">Vyber si avatara</h2>
            <p className="text-stone-500 text-sm">Kdo tě bude doprovázet?</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`h-20 rounded-2xl text-4xl flex items-center justify-center transition-all border-2 ${
                  avatar === a
                    ? "border-emerald-500 bg-emerald-50 scale-105"
                    : "border-stone-100 bg-white hover:border-stone-300"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
          <button
            disabled={!avatar || saving}
            onClick={handleFinish}
            className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-semibold text-lg hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? "Ukládám…" : "Začít cestu"}
          </button>
        </div>
      )}

      <div className="absolute bottom-8 flex gap-2">
        {([1, 2, 3] as const).map((s) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-colors ${
              s === step ? "bg-emerald-500" : "bg-stone-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
