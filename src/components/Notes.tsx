"use client";

import { useState, useEffect, useRef } from "react";

export default function Notes() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setText(localStorage.getItem("buddy_notes") || "");
  }, []);

  const handleChange = (val: string) => {
    setText(val);
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      localStorage.setItem("buddy_notes", val);
      setSaved(true);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <p className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: "#9e9288" }}>
        📝 Poznamky
      </p>
      <textarea
        value={text}
        onChange={e => handleChange(e.target.value)}
        placeholder={"Pis si sem poznamky,\nmyslenky, postřehy..."}
        className="flex-1 w-full resize-none text-sm leading-relaxed focus:outline-none bg-transparent"
        style={{ color: "#3c4a54", minHeight: 200 }}
      />
      <p
        className="text-[10px] mt-3 transition-all duration-300"
        style={{ color: "#9e9288", opacity: saved ? 1 : 0 }}>
        Automaticky ulozeno
      </p>
    </div>
  );
}
