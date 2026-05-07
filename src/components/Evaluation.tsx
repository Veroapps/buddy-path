"use client";

import { useState, useEffect } from "react";

const CHAPTER_NAMES = [
  "Vsimej si",
  "Vzorce",
  "Ownership",
  "Priority",
  "Komunikace",
  "Energie",
  "Muj hlas",
  "Strategie",
  "Feedback",
  "Viditelnost",
  "Tym",
  "Reflexe",
];

const PLACEHOLDER_EVALUATIONS = [
  {
    chapter: 1,
    text: "Skvela prace s rozpoznavanim emoci. Zkus si vsimat i telesnych pocitu.",
    recommendations: "Kniha: Emotional Intelligence — Daniel Goleman",
  },
  {
    chapter: 2,
    text: "Vzorce se ti dari pojmenovavat. Pracuj na tom, aby ses nezasekla v analyze.",
    recommendations: "Clanek: The Loop of Doom (HBR)",
  },
  {
    chapter: 3,
    text: "",
    recommendations: "",
  },
];

type Evaluation = { chapter: number; text: string; recommendations: string };

export default function Evaluation() {
  const [evals, setEvals] = useState<Evaluation[]>(PLACEHOLDER_EVALUATIONS);

  useEffect(() => {
    const stored = localStorage.getItem("buddy_evaluations");
    if (stored) {
      try {
        setEvals(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
  }, []);

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: "#9e9288" }}>
        ⭐ Hodnoceni
      </p>
      <div className="space-y-5">
        {CHAPTER_NAMES.map((name, idx) => {
          const chapter = idx + 1;
          const ev = evals.find(e => e.chapter === chapter);
          return (
            <div key={chapter} className="pb-4 border-b last:border-0" style={{ borderColor: "#f0ece4" }}>
              <p className="text-xs font-bold mb-1.5" style={{ color: "#18283a" }}>
                {chapter}. {name}
              </p>
              {ev?.text ? (
                <p className="text-xs leading-relaxed mb-1.5" style={{ color: "#5a6a74" }}>
                  {ev.text}
                </p>
              ) : (
                <p className="text-xs italic" style={{ color: "#c0bab3" }}>
                  Zatim bez hodnoceni
                </p>
              )}
              {ev?.recommendations ? (
                <div className="mt-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: "#f5f3ef" }}>
                  <p className="text-[11px] leading-relaxed" style={{ color: "#9e9288" }}>
                    {ev.recommendations}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
