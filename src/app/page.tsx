"use client";

import { useEffect, useState } from "react";
import PathMap from "@/components/PathMap";
import HomeHeader from "@/components/HomeHeader";
import Onboarding from "@/components/Onboarding";
import Notes from "@/components/Notes";
import Evaluation from "@/components/Evaluation";

type MobileTab = "cesta" | "poznamky" | "hodnoceni";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("cesta");

  useEffect(() => {
    const profileId = localStorage.getItem("profile_id");
    setNeedsOnboarding(!profileId);
    setReady(true);
  }, []);

  if (!ready) return null;

  if (needsOnboarding) {
    return <Onboarding onComplete={() => setNeedsOnboarding(false)} />;
  }

  const tabs: { id: MobileTab; label: string }[] = [
    { id: "poznamky",  label: "Poznamky"  },
    { id: "cesta",     label: "Cesta"     },
    { id: "hodnoceni", label: "Hodnoceni" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(to bottom, #fafaf9, rgba(251,191,36,0.05))" }}>

      {/* ── Mobile tab bar (md+ skryta) ──────────────────────────────────── */}
      <div className="md:hidden flex border-b" style={{ background: "white", borderColor: "#e8e3db" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setMobileTab(tab.id)}
            className="flex-1 py-2.5 text-xs font-semibold transition-colors"
            style={{
              color:        mobileTab === tab.id ? "#18283a" : "#9e9288",
              borderBottom: `2px solid ${mobileTab === tab.id ? "#2f5fa3" : "transparent"}`,
              background:   "transparent",
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 3-sloupcovy layout ───────────────────────────────────────────── */}
      <div className="flex flex-1">

        {/* Levy sloupec: Poznamky
            Na mobilu: videt jen kdyz mobileTab === "poznamky"
            Na md+: vzdy videt */}
        <aside
          className={`flex-shrink-0 overflow-y-auto border-r flex-col p-5 pt-7 ${
            mobileTab === "poznamky" ? "flex" : "hidden md:flex"
          }`}
          style={{
            width:    250,
            background: "white",
            borderColor: "#e8e3db",
            position: "sticky",
            top:      0,
            height:   "100vh",
          }}>
          <Notes />
        </aside>

        {/* Prostredni sloupec: Cesta (HomeHeader + PathMap)
            Na mobilu: videt jen kdyz mobileTab === "cesta"
            Na md+: vzdy videt */}
        <div
          className={`flex-1 min-w-0 ${mobileTab !== "cesta" ? "hidden md:block" : ""}`}>
          <HomeHeader />
          <PathMap />
        </div>

        {/* Pravy sloupec: Hodnoceni
            Na mobilu: videt jen kdyz mobileTab === "hodnoceni"
            Na md+: vzdy videt */}
        <aside
          className={`flex-shrink-0 overflow-y-auto border-l flex-col p-5 pt-7 ${
            mobileTab === "hodnoceni" ? "flex" : "hidden md:flex"
          }`}
          style={{
            width:    220,
            background: "white",
            borderColor: "#e8e3db",
            position: "sticky",
            top:      0,
            height:   "100vh",
          }}>
          <Evaluation />
        </aside>

      </div>
    </div>
  );
}
