import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FolderKanban, ShieldCheck } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects & Proof — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function ProjectsOsPage() {
  const { user, db } = await requirePrivateDb();
  const [projects, evidence, achievements] = await Promise.all([
    db`SELECT id, title, kind, summary, outcome, visibility, is_featured, updated_at FROM public.projects WHERE owner_id=${user.id}::uuid ORDER BY updated_at DESC NULLS LAST, created_at DESC LIMIT 40`,
    db`SELECT e.id, e.title, e.project_id, e.visibility, p.title AS project_title FROM public.evidence e LEFT JOIN public.projects p ON p.id=e.project_id WHERE e.owner_id=${user.id}::uuid ORDER BY e.updated_at DESC NULLS LAST, e.created_at DESC LIMIT 40`,
    db`SELECT id, title, date, visibility FROM public.achievements WHERE owner_id=${user.id}::uuid ORDER BY date DESC NULLS LAST, created_at DESC LIMIT 20`,
  ]);
  const published = projects.filter(p => p.visibility === "published").length;
  const privateCount = projects.filter(p => p.visibility !== "published").length;
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link><Link className="btn btn-secondary" href="/projects">Public portfolio <ArrowUpRight size={15}/></Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Phase 2 · Proof</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Projects & evidence.</h1></div><p className="section-lead">Build a durable proof layer: projects, evidence and achievements, with publication explicitly controlled.</p></div>
    <div className="os-hero-grid" style={{width:"100%",marginTop:0}}><article className="os-highlight"><span className="kicker">Proof inventory</span><h2>{projects.length} projects.</h2><p>{evidence.length} evidence items connect execution to outcomes. Public proof stays separated from private working material.</p><Link className="btn btn-primary" href="/projects">Review public proof <ArrowUpRight size={15}/></Link></article><article className="os-status"><div><span className="kicker">Publication</span><strong>{published} published · {privateCount} private/draft</strong><p>Publishing is a deliberate decision, not an accidental side effect of storing data.</p></div><div className="os-stat-row"><span><small>Evidence</small><b>{evidence.length}</b></span><span><small>Achievements</small><b>{achievements.length}</b></span></div></article></div>
    <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">Proof library</div><h2>Work worth remembering.</h2></div></div><div className="os-module-grid">{projects.map((p:{id:string;title:string;kind:string|null;summary:string|null;outcome:string|null;visibility:string;is_featured:boolean})=><article className="card os-module" key={p.id}><FolderKanban size={19}/><h3>{p.title}</h3><p>{p.kind || "Project"} · {p.summary || "No summary yet."}</p><p style={{marginTop:10}}>{p.outcome || "Outcome not captured yet."}</p><span className="os-module-link">{p.visibility === "published" ? "Published" : "Private / draft"} <ShieldCheck size={14}/></span></article>)}</div></section>
    <section style={{marginTop:60}}><div className="section-head"><div><div className="kicker">Evidence graph</div><h2>Proof attached to work.</h2></div></div><div className="timeline">{evidence.map((e:{id:string;title:string;project_title:string|null;visibility:string})=><article className="timeline-item" key={e.id}><div className="period">{e.visibility}</div><div><h3>{e.title}</h3><p>{e.project_title || "Unlinked project"} · Evidence is retained in the private source layer until deliberately published.</p></div></article>)}</div></section>
  </div></main>;
}
