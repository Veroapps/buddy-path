"use client";

export default function BrandLink() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("brand-click"))}
      className="flex items-center gap-3 hover:opacity-75 transition-opacity"
    >
      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-lg">🌱</div>
      <span className="font-medium text-stone-700">Buddy Path</span>
    </button>
  );
}
