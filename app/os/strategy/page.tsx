import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Flag, Target, ListChecks } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Life Strategy — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function StrategyPage() {
  const { user, db } = await requirePrivateDb();
  const [domains, goals, okrs] = await Promise.all([
    db`SELECT id, name, description, score FROM public.life_domains WHERE owner_id=${user.id}::uuid ORDER BY score DESC NULLS LAST, updated_at DESC LIMIT 30`,
    db`SELECT id, title, status, priority, progress, target_date, life_domain_id FROM public.goals WHERE owner_id=${user.id}::uuid ORDER BY priority ASC NULLS LAST, target_date ASC NULLS LAST LIMIT 40`,
    db`SELECT id, title, cycle, status, progress, start_date, end_date FROM public.okrs WHERE owner_id=${user.id}::uuid ORDER BY end_date DESC NULLS LAST LIMIT 20`,
  ]);
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Strategy layer</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Life strategy & goals.</h1></div><p className="section-lead">Keep the long-term direction visible while translating it into measurable goals and OKRs.</p></div>
    <div className="os-module-grid"><article className="card os-module"><Flag size={19}/><h3>{domains.length} life domains</h3><p>Domains provide the strategic map against which goals, reviews and trade-offs can be interpreted.</p></article><article className="card os-module"><Target size={19}/><h3>{goals.length} goals</h3><p>Goals are the outcome layer. Progress should be updated as evidence accumulates.</p></article><article className="card os-module"><ListChecks size={19}/><h3>{okrs.length} OKRs</h3><p>OKRs create execution rhythm without replacing the broader life strategy.</p></article></div>
    <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">North Star map</div><h2>Strategic domains.</h2></div></div><div className="os-module-grid">{domains.map((d:{id:string;name:string;description:string|null;score:number|null})=><article className="card os-module" key={d.id}><Flag size={18}/><h3>{d.name}</h3><p>{d.description || "No description yet."}</p><div className="os-stat-row"><span><small>Score</small><b>{d.score ?? "—"}</b></span></div></article>)}</div></section>
    <section style={{marginTop:60}}><div className="section-head"><div><div className="kicker">Outcome layer</div><h2>Goals & OKRs in motion.</h2></div></div><div className="timeline">{goals.map((g:{id:string;title:string;status:string|null;priority:string|null;progress:number|null;target_date:string|null})=><article className="timeline-item" key={g.id}><div className="period">{g.status || "planned"}</div><div><h3>{g.title}</h3><p>{g.priority || "normal"} priority · {g.progress ?? 0}% complete{g.target_date ? ` · target ${new Date(g.target_date).toLocaleDateString("en-GB")}` : ""}</p></div></article>)}</div></section>
    <section style={{marginTop:50}}><div className="os-module-grid">{okrs.map((o:{id:string;title:string;cycle:string|null;status:string|null;progress:number|null;start_date:string|null;end_date:string|null})=><article className="card os-module" key={o.id}><Target size={18}/><h3>{o.title}</h3><p>{o.cycle || "Cycle"} · {o.status || "planned"}</p><div className="os-stat-row"><span><small>Progress</small><b>{o.progress ?? 0}%</b></span><span><small>Window</small><b>{o.start_date ? new Date(o.start_date).toLocaleDateString("en-GB") : "—"} → {o.end_date ? new Date(o.end_date).toLocaleDateString("en-GB") : "—"}</b></span></div></article>)}</div></section>
  </div></main>;
}
