"use client";

import { useEffect, useState } from "react";
import PathMap from "@/components/PathMap";
import HomeHeader from "@/components/HomeHeader";
import Onboarding from "@/components/Onboarding";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const profileId = localStorage.getItem("profile_id");
    setNeedsOnboarding(!profileId);
    setReady(true);
  }, []);

  if (!ready) return null;

  if (needsOnboarding) {
    return (
      <Onboarding
        onComplete={() => {
          setNeedsOnboarding(false);
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <HomeHeader />
      <PathMap />
    </main>
  );
}
