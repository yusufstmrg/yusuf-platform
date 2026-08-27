import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ListChecks, CircleGauge } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "90-Day Sprint — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function SprintPage() {
  const { user, db } = await requirePrivateDb();
  const [sprints, tasks] = await Promise.all([
    db`SELECT id, title, start_date, end_date, status, progress FROM public.sprints WHERE owner_id=${user.id}::uuid ORDER BY end_date DESC NULLS LAST LIMIT 12`,
    db`SELECT id, title, domain, status, priority, due_date, estimated_minutes FROM public.tasks WHERE owner_id=${user.id}::uuid ORDER BY due_date ASC NULLS LAST, priority ASC NULLS LAST LIMIT 50`,
  ]);
  const openTasks = tasks.filter(t => t.status !== "done" && t.status !== "completed").length;
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link><Link className="btn btn-secondary" href="/os/quick-capture">Quick Capture <ArrowUpRight size={15}/></Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Execution layer</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>90-day sprint.</h1></div><p className="section-lead">Create a focused execution window, then make the work visible through tasks, deadlines and reviews.</p></div>
    <div className="os-module-grid"><article className="card os-module"><CircleGauge size={19}/><h3>{sprints.length} sprint records</h3><p>Quarterly execution containers ready to connect to the masterplan.</p></article><article className="card os-module"><ListChecks size={19}/><h3>{openTasks} open tasks</h3><p>Prioritized work that can move goals, capability and proof forward.</p></article><article className="card os-module"><TargetlessIcon/><h3>{tasks.length} tasks visible</h3><p>Use realistic estimates and due dates to protect execution capacity.</p></article></div>
    <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">Sprint timeline</div><h2>Execution windows.</h2></div></div><div className="timeline">{sprints.map((s:{id:string;title:string;start_date:string|null;end_date:string|null;status:string|null;progress:number|null})=><article className="timeline-item" key={s.id}><div className="period">{s.status || "planned"}</div><div><h3>{s.title}</h3><p>{s.progress ?? 0}% progress · {s.start_date ? new Date(s.start_date).toLocaleDateString("en-GB") : "—"} → {s.end_date ? new Date(s.end_date).toLocaleDateString("en-GB") : "—"}</p></div></article>)}</div></section>
    <section style={{marginTop:60}}><div className="section-head"><div><div className="kicker">Task queue</div><h2>Next work.</h2></div></div><div className="timeline">{tasks.map((t:{id:string;title:string;domain:string|null;status:string|null;priority:string|null;due_date:string|null;estimated_minutes:number|null})=><article className="timeline-item" key={t.id}><div className="period">{t.priority || "normal"}</div><div><h3>{t.title}</h3><p>{t.domain || "General"} · {t.status || "planned"} · {t.estimated_minutes ?? 0} min{t.due_date ? ` · due ${new Date(t.due_date).toLocaleDateString("en-GB")}` : ""}</p></div></article>)}</div></section>
  </div></main>;
}
function TargetlessIcon() { return <CircleGauge size={19}/>; }
