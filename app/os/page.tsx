import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, CircleGauge, Coins, Flag, Layers3, ListChecks, Sparkles, Target, UserRoundCheck } from "lucide-react";

export const metadata = {
  title: "Personal OS — Yusuf B. Situmorang",
  description: "Private Yusuf Personal OS command center.",
  robots: { index: false, follow: false },
};

const modules = [
  ["Command Center", "Daily priorities, momentum and executive brief", CircleGauge],
  ["Life Strategy", "North Star, domains and long-term direction", Flag],
  ["Goals / OKR", "Objectives, key results and measurable outcomes", Target],
  ["90-Day Sprint", "Quarterly execution with visible progress", ListChecks],
  ["Skills", "Capability gaps, learning and proof", Layers3],
  ["Career", "Targets, opportunities and readiness", BriefcaseBusiness],
  ["Business", "BuildUp, Tradevance and commercial pipeline", Sparkles],
  ["Wealth", "Cash flow, assets, net worth and FI trajectory", Coins],
  ["Reviews", "Weekly, monthly and quarterly reflection", UserRoundCheck],
] as const;

export default function PersonalOsPage() {
  return (
    <main className="section section-white">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 42 }}>
          <Link className="btn btn-dark" href="/"><ArrowUpRight size={15} style={{ transform: "rotate(225deg)" }} /> Public Profile</Link>
        </div>

        <div className="section-head">
          <div>
            <div className="kicker">Private Personal OS</div>
            <h1 style={{ fontSize: "clamp(42px, 7vw, 76px)" }}>Command your next move.</h1>
          </div>
          <p className="section-lead">
            A private operating system for turning strategy into execution, execution into proof, and proof into higher personal value, commercial opportunity and freedom.
          </p>
        </div>

        <div className="card-grid" style={{ marginTop: 30 }}>
          <div className="card" style={{ gridColumn: "span 2" }}>
            <div className="kicker">Status</div>
            <h2 style={{ marginTop: 8 }}>Authentication required</h2>
            <p>Supabase Auth is the next infrastructure gate. Until it is connected, this route remains inaccessible in production through the middleware safety gate.</p>
          </div>
        </div>

        <div className="section-head" style={{ marginTop: 64 }}>
          <div><div className="kicker">Core workspace</div><h2>What the OS will manage.</h2></div>
          <p className="section-lead">Built from the Master Integrated Roadmap and designed as one unified personal platform.</p>
        </div>

        <div className="card-grid" style={{ marginTop: 28 }}>
          {modules.map(([title, text, Icon]) => (
            <div className="card" key={title}>
              <Icon size={19} />
              <h3 style={{ marginTop: 16 }}>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <section className="cta" style={{ marginTop: 70, borderRadius: 26 }}>
          <div className="container" style={{ padding: "56px 0" }}>
            <div className="kicker">Operating loop</div>
            <h2>Plan → Execute → Capture → Prove → Measure → Review → Replan.</h2>
            <p>The AI layer will recommend the highest-leverage next actions. Yusuf remains the decision maker.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
