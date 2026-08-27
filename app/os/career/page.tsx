import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CircleGauge } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Career — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function CareerPage() {
  const { user, db } = await requirePrivateDb();
  const [targets, applications] = await Promise.all([
    db`SELECT id, role_title, company, target_date, priority, readiness_score, notes FROM public.career_targets WHERE owner_id=${user.id}::uuid ORDER BY priority ASC NULLS LAST, target_date ASC NULLS LAST LIMIT 30`,
    db`SELECT ca.id, ca.company, ca.role_title, ca.stage, ca.applied_at, ca.confidential, ct.role_title AS target_role FROM public.career_applications ca LEFT JOIN public.career_targets ct ON ct.id=ca.career_target_id WHERE ca.owner_id=${user.id}::uuid ORDER BY ca.updated_at DESC NULLS LAST, ca.created_at DESC LIMIT 30`,
  ]);
  const avg = targets.length ? Math.round(targets.reduce((n, t) => n + Number(t.readiness_score ?? 0), 0) / targets.length) : 0;
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Career engine</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Career & opportunity.</h1></div><p className="section-lead">Manage target roles, readiness, applications and the evidence required to earn the next level.</p></div>
    <div className="os-hero-grid" style={{width:"100%",marginTop:0}}>
      <article className="os-highlight"><span className="kicker">Readiness</span><h2>{avg}% average.</h2><p>Readiness is treated as a moving score supported by skills, evidence, experience and interview/application progress.</p><Link className="btn btn-primary" href="/os/skills">Improve capability <ArrowUpRight size={15}/></Link></article>
      <article className="os-status"><div><span className="kicker">Pipeline</span><strong>{applications.length} applications</strong><p>Keep confidential applications private. Only explicitly approved proof should reach the public portfolio.</p></div><div className="os-stat-row"><span><small>Targets</small><b>{targets.length}</b></span><span><small>Open stages</small><b>{new Set(applications.map(a=>a.stage)).size}</b></span></div></article>
    </div>
    <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">Target map</div><h2>Where you are aiming.</h2></div></div><div className="os-module-grid">{targets.map((t:{id:string;role_title:string;company:string|null;target_date:string|null;priority:string|null;readiness_score:number|null;notes:string|null})=><article className="card os-module" key={t.id}><BriefcaseBusiness size={19}/><h3>{t.role_title}</h3><p>{t.company || "Company target not specified"}{t.notes ? ` · ${t.notes}` : ""}</p><div className="os-stat-row"><span><small>Readiness</small><b>{t.readiness_score ?? 0}%</b></span><span><small>Priority</small><b>{t.priority || "—"}</b></span></div></article>)}</div></section>
    <section style={{marginTop:60}}><div className="section-head"><div><div className="kicker">Application pipeline</div><h2>Protect the details. Improve the process.</h2></div></div><div className="timeline">{applications.map((a:{id:string;company:string;role_title:string;stage:string|null;applied_at:string|null;confidential:boolean;target_role:string|null})=><article className="timeline-item" key={a.id}><div className="period">{a.stage || "planned"}</div><div><h3>{a.role_title} · {a.company}</h3><p>{a.confidential ? "Confidential" : "Private"} · {a.target_role ? `Target: ${a.target_role}` : "No target linked"}{a.applied_at ? ` · applied ${new Date(a.applied_at).toLocaleDateString("en-GB")}` : ""}</p></div></article>)}</div></section>
    <section className="cta" style={{marginTop:70,borderRadius:26}}><div className="container" style={{padding:"56px 0"}}><div className="kicker">Career loop</div><h2>Target → Diagnose → Prepare → Apply → Interview → Learn → Upgrade.</h2><p>Career capital compounds when every attempt produces reusable capability and evidence.</p></div></section>
  </div></main>;
}
