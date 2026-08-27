import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CircleGauge, Coins, Flag, Layers3, ListChecks, Sparkles, Target, UserRoundCheck } from "lucide-react";
import { UserButton } from "@neondatabase/auth-ui";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";
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

export default async function PersonalOsPage() {
  if (!auth) redirect("/login?reason=auth_setup");

  const result = await auth.getSession();
  const session = result.data?.session;
  const user = result.data?.user;
  if (!session || !user) redirect("/auth/sign-in");

  return (
    <main className="os-shell">
      <header className="os-topbar">
        <div>
          <Link className="text-link" href="/"><ArrowLeft size={15} /> Public profile</Link>
          <div className="kicker" style={{ marginTop: 20 }}>Yusuf Personal OS</div>
          <h1>Command your next move.</h1>
          <p className="section-lead">Private command center for turning strategy into execution, execution into proof, and proof into higher personal value, opportunity and freedom.</p>
        </div>
        <div className="os-user"><div><strong>{user.name || "Yusuf"}</strong><span>{user.email}</span></div><UserButton /></div>
      </header>

      <section className="os-hero-grid">
        <article className="os-highlight">
          <span className="kicker">Today</span>
          <h2>Make progress visible.</h2>
          <p>Start with one meaningful action. The workspace will progressively connect goals, skills, projects, proof, business and wealth data into one operating loop.</p>
          <div className="actions"><Link className="btn btn-dark" href="/os/quick-capture">Quick Capture <ArrowUpRight size={15} /></Link><Link className="btn btn-secondary" href="/projects">View public proof <ArrowUpRight size={15} /></Link></div>
        </article>
        <article className="os-status">
          <div><span className="kicker">System state</span><strong>Identity verified</strong><p>Neon Auth is active for this session. Private records remain owner-scoped and public publishing is explicit.</p></div>
          <div className="os-stat-row"><span><small>Personal Value</small><b>Not measured</b></span><span><small>90-Day Sprint</small><b>Ready to configure</b></span></div>
        </article>
      </section>

      <section style={{ marginTop: 48 }}>
        <div className="section-head"><div><div className="kicker">Core workspace</div><h2>What the OS will manage.</h2></div><p className="section-lead">Built from the Master Integrated Roadmap. Modules become fully data-driven as each domain is connected.</p></div>
        <div className="os-module-grid">
          {modules.map(([title, text, Icon]) => (
            <article className="card os-module" key={title}>
              <Icon size={19} />
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="os-module-link">Open module <ArrowUpRight size={14} /></span>
            </article>
          ))}
        </div>
      </section>

      <section className="cta" style={{ marginTop: 70, borderRadius: 26 }}>
        <div className="container" style={{ padding: "56px 0" }}>
          <div className="kicker">Operating loop</div>
          <h2>Plan → Execute → Capture → Prove → Measure → Review → Replan.</h2>
          <p>The AI layer will recommend high-leverage next actions. Yusuf remains the decision maker.</p>
        </div>
      </section>
    </main>
  );
}
