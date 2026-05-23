import { Leaf, Zap, TrainFront } from "lucide-react";
import { Dashboard } from "@/components/dashboard";

const navItems = ["Dashboard", "Energy", "Mobility", "Reports", "Calculator", "Settings"];

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-[1440px] px-6 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-borderDefault bg-surface p-4">
        <div>
          <h1 className="text-2xl font-semibold">NorthGrid</h1>
          <p className="text-textSecondary">Mission control for sustainable living and organizations.</p>
        </div>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <button key={item} className="rounded-xl border border-borderDefault px-3 py-2 text-sm hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy">
              {item}
            </button>
          ))}
        </nav>
      </header>

      <section className="mb-6 grid gap-3 sm:grid-cols-3">
        <article className="rounded-2xl border border-borderDefault bg-surface p-4"><Zap className="mb-2 text-energy" />Cheapest power window today: 13:00–15:00</article>
        <article className="rounded-2xl border border-borderDefault bg-surface p-4"><Leaf className="mb-2 text-green" />Estimated daily CO₂ avoidance: 112 kg</article>
        <article className="rounded-2xl border border-borderDefault bg-surface p-4"><TrainFront className="mb-2 text-warning" />Green commute participation: 81%</article>
      </section>

      <Dashboard />
    </main>
  );
}
