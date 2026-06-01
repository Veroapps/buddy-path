"use client";
import { useState } from "react";
import Link from "next/link";
import { CHEAT_SHEETS, type CheatSheet } from "@/data/cheatsheets";

export default function CheatSheetPage() {
  const [active, setActive] = useState<CheatSheet>(CHEAT_SHEETS[0]);

  return (
    <main className="min-h-screen" style={{ background: "#fafaf9" }}>

      {/* Header */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          borderColor: "#e8e3db",
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: "#18283a" }}>Cheat sheet</p>
            <p className="text-xs" style={{ color: "#9e9288" }}>přehled metod</p>
          </div>
          <Link
            href="/"
            className="text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ background: "#f0f4f8", color: "#5a6a74" }}
          >
            ← zpět na cestu
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Přepínač kapitol */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {CHEAT_SHEETS.map((cs) => (
            <button
              key={cs.chapterId}
              onClick={() => setActive(cs)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
              style={{
                background:   active.chapterId === cs.chapterId ? cs.accentBg    : "white",
                color:        active.chapterId === cs.chapterId ? cs.accentColor : "#9e9288",
                border:       `0.5px solid ${active.chapterId === cs.chapterId ? cs.accentBorder : "#e8e3db"}`,
              }}
            >
              {cs.chapterNumber}. {cs.chapterTitle}
            </button>
          ))}
        </div>

        {/* Záhlaví kapitoly */}
        <div className="mb-6">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{ background: active.accentBg, color: active.accentColor }}
          >
            Kapitola {active.chapterNumber}
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#18283a" }}>
            {active.chapterTitle}
          </h1>
          <p className="text-sm mb-4" style={{ color: "#5a6a74" }}>{active.tagline}</p>
          <div
            className="text-sm italic leading-relaxed px-4 py-3"
            style={{
              background:   active.accentBg,
              borderLeft:   `3px solid ${active.accentColor}`,
              borderRadius: "0 8px 8px 0",
              color:        active.accentColor,
            }}
          >
            &ldquo;{active.keyInsight}&rdquo;
          </div>
        </div>

        {/* Karty metod */}
        <div className="flex flex-col gap-3">
          {active.methods.map((method) => (
            <div
              key={method.name}
              className="rounded-2xl p-5"
              style={{ background: "white", border: "0.5px solid #e8e3db" }}
            >
              {/* Hlavička */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{method.emoji}</span>
                <div>
                  <div className="font-semibold text-base" style={{ color: "#18283a" }}>
                    {method.name}
                  </div>
                  <div className="text-sm leading-snug mt-0.5" style={{ color: "#5a6a74" }}>
                    {method.oneliner}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "0.5px solid #f0ece4", paddingTop: 14 }}>

                {/* Kroky */}
                {method.steps && (
                  <div className="flex flex-col gap-2 mb-3">
                    {method.steps.map((step, i) => (
                      <div key={i} className="flex gap-2.5 items-start">
                        <div
                          className="flex-shrink-0 flex items-center justify-center"
                          style={{
                            width: 20, height: 20,
                            borderRadius: "50%",
                            background: "#f0ece4",
                            color: "#9e9288",
                            fontSize: 11, fontWeight: 500,
                            marginTop: 1,
                          }}
                        >
                          {i + 1}
                        </div>
                        <span className="text-sm leading-snug" style={{ color: "#18283a" }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tip */}
                <div
                  className="flex gap-2.5 items-start rounded-lg px-3 py-2 mb-3 text-sm leading-snug"
                  style={{ background: "#fff4e0", color: "#92400e" }}
                >
                  <span className="flex-shrink-0 mt-0.5">💡</span>
                  <span>{method.tip}</span>
                </div>

                {/* Citát */}
                {method.quote && (
                  <div
                    style={{
                      paddingLeft: 12,
                      borderLeft: `2.5px solid ${active.accentColor}`,
                    }}
                  >
                    <p className="text-sm italic leading-snug" style={{ color: "#5a6a74" }}>
                      &ldquo;{method.quote}&rdquo;
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#9e9288" }}>
                      — {method.quoteAuthor}
                    </p>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
