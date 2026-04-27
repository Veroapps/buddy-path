export const dynamic = "force-dynamic";
import Diary from "@/components/Diary";

export default function DiaryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <Diary />
    </main>
  );
}
