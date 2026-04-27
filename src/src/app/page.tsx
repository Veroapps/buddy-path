import PathMap from "@/components/PathMap";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "rgba(250,247,242,0.85)", backdropFilter: "blur(12px)", borderColor: "var(--cream-dark)" }}>
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: "var(--sage)" }}>B</div>
            <div>
              <span className="font-semibold text-sm" style={{ color: "var(--ink)" }}>Buddy Path</span>
              <span className="block text-[10px] font-medium" style={{ color: "var(--ink-muted)" }}>tvoje cesta</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "var(--amber-light)", color: "var(--amber)" }}>
              <span>&#x1F525;</span> 1
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg cursor-pointer transition-transform hover:scale-110" style={{ background: "var(--sage-light)" }}>
              &#x1F9AB;
            </div>
          </div>
        </div>
      </header>
      <PathMap />
    </main>
  );
}
