import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Layers3, Target, CheckCircle2 } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Skills — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function SkillsPage() {
  const { user, db } = await requirePrivateDb();
  const [skills, learning, assessments] = await Promise.all([
    db`SELECT id, name, category, current_level, target_level, validated, description FROM public.skills WHERE owner_id=${user.id}::uuid ORDER BY updated_at DESC NULLS LAST, created_at DESC LIMIT 40`,
    db`SELECT li.id, li.title, li.status, li.progress, li.due_date, s.name AS skill_name FROM public.learning_items li LEFT JOIN public.skills s ON s.id=li.skill_id WHERE li.owner_id=${user.id}::uuid ORDER BY li.updated_at DESC NULLS LAST, li.created_at DESC LIMIT 20`,
    db`SELECT COUNT(*)::int AS count, ROUND(AVG(score)::numeric,1) AS avg_score FROM public.skill_assessments WHERE owner_id=${user.id}::uuid`,
  ]);
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Phase 2 · Capability</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Skills & learning.</h1></div><p className="section-lead">Turn capability gaps into deliberate learning, validation and proof.</p></div>
    <div className="os-hero-grid" style={{width:"100%",marginTop:0}}>
      <article className="os-highlight"><span className="kicker">Capability map</span><h2>{skills.length} skills tracked.</h2><p>Each skill has a current level, target level and validation state. The learning layer turns gaps into concrete practice.</p><Link className="btn btn-primary" href="/projects">Connect to proof <ArrowUpRight size={15}/></Link></article>
      <article className="os-status"><div><span className="kicker">Assessment signal</span><strong>{assessments[0]?.count ?? 0} assessments</strong><p>Average assessment score: {assessments[0]?.avg_score ?? "—"}. Use evidence, not self-perception, to validate progress.</p></div><div className="os-stat-row"><span><small>Validated</small><b>{skills.filter((s:{validated:boolean})=>s.validated).length}</b></span><span><small>Learning items</small><b>{learning.length}</b></span></div></article>
    </div>
    <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">Capability inventory</div><h2>What you are building.</h2></div></div><div className="os-module-grid">
      {skills.map((s:{id:string;name:string;category:string|null;current_level:number|null;target_level:number|null;validated:boolean;description:string|null})=><article className="card os-module" key={s.id}><Layers3 size={19}/><h3>{s.name}</h3><p>{s.category || "Uncategorized"}{s.description ? ` · ${s.description}` : ""}</p><div className="os-stat-row"><span><small>Current → target</small><b>{s.current_level ?? "—"} → {s.target_level ?? "—"}</b></span><span><small>Status</small><b>{s.validated ? "Validated" : "Needs proof"}</b></span></div></article>)}
    </div></section>
    <section style={{marginTop:60}}><div className="section-head"><div><div className="kicker">Learning pipeline</div><h2>Learn → practice → validate.</h2></div></div><div className="timeline">{learning.map((l:{id:string;title:string;status:string|null;progress:number|null;due_date:string|null;skill_name:string|null})=><article className="timeline-item" key={l.id}><div className="period">{l.status || "planned"}</div><div><h3>{l.title}</h3><p>{l.skill_name || "Skill not mapped"} · {l.progress ?? 0}% complete{l.due_date ? ` · due ${new Date(l.due_date).toLocaleDateString("en-GB")}` : ""}</p></div></article>)}</div></section>
    <section className="cta" style={{marginTop:70,borderRadius:26}}><div className="container" style={{padding:"56px 0"}}><div className="kicker">Capability loop</div><h2>Learn something. Produce evidence. Reassess. Raise the bar.</h2><p>Every meaningful skill should eventually connect to proof, opportunity and measurable personal value.</p></div></section>
  </div></main>;
}
