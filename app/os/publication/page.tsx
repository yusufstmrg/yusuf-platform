import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Eye, Send } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";
import { publishProject } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Publication — Yusuf Personal OS", robots: { index: false, follow: false } };

type SearchParams = Promise<{ published?: string; error?: string }>;

export default async function PublicationPage({ searchParams }: { searchParams: SearchParams }) {
  const { user, db } = await requirePrivateDb();
  const params = await searchParams;
  const [projects, publications] = await Promise.all([
    db`SELECT id, title, slug, summary, visibility, updated_at FROM public.projects WHERE owner_id=${user.id}::uuid AND visibility IN ('ready_to_publish','published') ORDER BY updated_at DESC NULLS LAST`,
    db`SELECT entity_id, public_slug, public_title, public_summary, published_at, updated_at FROM public.public_publications WHERE entity_type='project' ORDER BY published_at DESC LIMIT 30`,
  ]);
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link><Link className="btn btn-secondary" href="/projects">Public portfolio <ArrowUpRight size={15}/></Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Publication engine</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Publish with proof.</h1></div><p className="section-lead">Private source objects stay private until reviewed, sanitized and explicitly promoted into the public projection layer.</p></div>
    {params.published && <div className="capture-message success" style={{marginBottom:24}}><CheckCircle2 size={16}/> Publication updated successfully.</div>}
    {params.error && <div className="capture-message error" style={{marginBottom:24}}>Publication was not completed: {params.error.replaceAll("_"," ")}.</div>}
    <div className="grid-2">
      <section className="card"><div className="kicker">Eligible projects</div><h2 style={{fontSize:32,marginBottom:18}}>Ready to publish.</h2>{projects.length===0?<p>No project is currently marked ready_to_publish or published.</p>:<div style={{display:"grid",gap:14}}>{projects.map((p:{id:string;title:string;slug:string;summary:string|null;visibility:string})=><form action={publishProject} key={p.id} className="card" style={{padding:18,boxShadow:"none"}}><input type="hidden" name="project_id" value={p.id}/><strong>{p.title}</strong><p style={{margin:"6px 0"}}>{p.summary || "No summary."}</p><div className="os-stat-row"><span><small>Status</small><b>{p.visibility}</b></span><button className="btn btn-dark" type="submit"><Send size={14}/> {p.visibility==='published' ? 'Republish' : 'Publish'}</button></div></form>)}</div>}</section>
      <section className="card"><div className="kicker">Public projection</div><h2 style={{fontSize:32,marginBottom:18}}>What the world can see.</h2>{publications.length===0?<p>No public projections yet. That is safe by default.</p>:<div className="timeline">{publications.map((p:{entity_id:string;public_slug:string;public_title:string;public_summary:string|null;published_at:string;updated_at:string})=><article className="timeline-item" key={p.entity_id}><div className="period">published</div><div><h3>{p.public_title}</h3><p>{p.public_summary || "No summary."}</p><p style={{marginTop:8}}><Eye size={14} style={{verticalAlign:"middle"}}/> {new Date(p.published_at).toLocaleDateString("en-GB")} · /projects/{p.public_slug}</p></div></article>)}</div>}</section>
    </div>
    <section className="cta" style={{marginTop:70,borderRadius:26}}><div className="container" style={{padding:"56px 0"}}><div className="kicker">Publication principle</div><h2>Private source → reviewed proof → public projection.</h2><p>Public routes are designed to consume the projection layer, never raw private workspace records.</p></div></section>
  </div></main>;
}
