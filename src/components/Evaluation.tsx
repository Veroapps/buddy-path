"use client";

import { useState, useEffect } from "react";

const ADEL_PROFILE_ID = "c9ffd630-2e1c-47fa-915c-9545cb7382a5";

interface Tag {
  label: string;
  bg: string;
  color: string;
}

interface ChapterReview {
  chapter: number;
  name: string;
  completed: boolean;
  text?: string;
  tags?: Tag[];
  tip?: string;
  resource?: string;
  resourceAuthor?: string;
}

const REVIEWS: ChapterReview[] = [
  {
    chapter: 1,
    name: "Všimej si",
    completed: true,
    text: "Skvěle ti jde pojmenovávat emoce přesným slovem — to je základ všeho ostatního. Teorie ti sedí, teď ji přenést do reflexu.",
    tags: [
      { label: "RAIN zvládnutý",           bg: "#EAF3DE", color: "#3B6D11" },
      { label: "Zatím — používáš",          bg: "#EAF3DE", color: "#3B6D11" },
      { label: "Kruh vlivu — procvičovat",  bg: "#FAEEDA", color: "#633806" },
    ],
    tip: "Tvoje věta navždy: \"Dvě minuty mezi emocí a reakcí změní všechno.\" Pamatuj na ni, až bude horko.",
    resource: "Emotional Intelligence",
    resourceAuthor: "Daniel Goleman",
  },
  {
    chapter: 2,
    name: "Vzorce",
    completed: true,
    text: "6/6 v Převrať obvinění — plný počet, to není samozřejmost. Racionálně ownership chápeš dobře. Tvůj přirozený žánr je dokumentarista — silný základ.",
    tags: [
      { label: "5× proč — oblíbená",        bg: "#EAF3DE", color: "#3B6D11" },
      { label: "Dokumentarista přirozeně",   bg: "#EAF3DE", color: "#3B6D11" },
      { label: "Horor trigger: kritika",     bg: "#FAECE7", color: "#712B13" },
    ],
    tip: "Když tě šéfka přímo kritizuje, automaticky skočíš do hororu. Zkus v tu chvíli vědomě přepnout na dokumentaristu.",
    resource: "The Loop of Doom",
    resourceAuthor: "HBR",
  },
  { chapter: 3,  name: "Ownership",   completed: false },
  { chapter: 4,  name: "Priority",    completed: false },
  { chapter: 5,  name: "Komunikace",  completed: false },
  { chapter: 6,  name: "Energie",     completed: false },
  { chapter: 7,  name: "Můj hlas",    completed: false },
  { chapter: 8,  name: "Strategie",   completed: false },
  { chapter: 9,  name: "Feedback",    completed: false },
  { chapter: 10, name: "Viditelnost", completed: false },
  { chapter: 11, name: "Tým",         completed: false },
  { chapter: 12, name: "Reflexe",     completed: false },
];

export default function Evaluation() {
  const [openChapter, setOpenChapter] = useState<number | null>(null);
  const [isAdel, setIsAdel] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("profile_id") || "";
    setIsAdel(id === ADEL_PROFILE_ID);
  }, []);

  const toggle = (chapter: number) => {
    setOpenChapter(prev => prev === chapter ? null : chapter);
  };

  return (
    <div>
      <p
        className="text-[10px] uppercase tracking-widest font-bold mb-4"
        style={{ color: "#9e9288" }}
      >
        ⭐ Hodnocení
      </p>

      <div className="space-y-1">
        {REVIEWS.map((rev) => {
          const r = isAdel ? rev : { ...rev, completed: false };
          const isOpen = openChapter === r.chapter;

          return (
            <div
              key={r.chapter}
              style={{
                borderRadius: 8,
                border: "0.5px solid #f0ece4",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => r.completed && toggle(r.chapter)}
                disabled={!r.completed}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  background: isOpen ? "#f0f9f3" : "white",
                  border: "none",
                  cursor: r.completed ? "pointer" : "default",
                  textAlign: "left",
                  gap: 6,
                  opacity: r.completed ? 1 : 0.5,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#9e9288", flexShrink: 0 }}>
                    {r.chapter}.
                  </span>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#18283a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {r.name}
                  </span>
                </div>
                {r.completed && (
                  <span style={{
                    fontSize: 12,
                    color: "#9e9288",
                    flexShrink: 0,
                    display: "inline-block",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}>
                    ›
                  </span>
                )}
              </button>

              {isOpen && r.completed && (
                <div style={{
                  padding: "10px 11px 12px",
                  borderTop: "0.5px solid #f0ece4",
                  background: "#faf8f5",
                }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "2px 8px",
                    borderRadius: 12,
                    fontSize: 10,
                    fontWeight: 500,
                    marginBottom: 8,
                    background: "#E6F1FB",
                    color: "#0C447C",
                  }}>
                    ✓ Dokončeno
                  </div>

                  {r.text && (
                    <p style={{ fontSize: 12, color: "#18283a", lineHeight: 1.65, marginBottom: 8 }}>
                      {r.text}
                    </p>
                  )}

                  {r.tags && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                      {r.tags.map((tag) => (
                        <span key={tag.label} style={{
                          fontSize: 10, padding: "2px 7px", borderRadius: 10,
                          background: tag.bg, color: tag.color,
                        }}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {r.tip && (
                    <div style={{
                      background: "#fef3e2", borderRadius: 6,
                      padding: "7px 9px", fontSize: 11, color: "#92400e",
                      lineHeight: 1.55, display: "flex", gap: 6, marginBottom: 8,
                    }}>
                      <span style={{ flexShrink: 0 }}>💡</span>
                      <span>{r.tip}</span>
                    </div>
                  )}

                  {r.resource && (
                    <div style={{ borderLeft: "2px solid #4a7c59", paddingLeft: 8 }}>
                      <p style={{ fontSize: 11, fontStyle: "italic", color: "#6b7d6f", lineHeight: 1.55 }}>
                        {r.resource}
                      </p>
                      <p style={{ fontSize: 10, color: "#a3b0a6", marginTop: 2 }}>
                        — {r.resourceAuthor}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p style={{
        fontSize: 11, color: "#c0bab3", lineHeight: 1.6,
        marginTop: 16, paddingTop: 12,
        borderTop: "0.5px solid #f0ece4",
      }}>
        Hodnocení koučky se zobrazí po uzavření každé kapitoly.
      </p>
    </div>
  );
}
