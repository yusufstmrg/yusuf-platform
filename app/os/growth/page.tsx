import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BarChart3, Megaphone, Share2 } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Brand & Content — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function GrowthPage() {
  const { user, db } = await requirePrivateDb();
  const [accounts, pillars, content, metrics] = await Promise.all([
    db`SELECT id, platform, handle, url, active FROM public.social_accounts WHERE owner_id=${user.id}::uuid ORDER BY platform`,
    db`SELECT id, name, target_share, description FROM public.content_pillars WHERE owner_id=${user.id}::uuid ORDER BY created_at`,
    db`SELECT ci.id, ci.title, ci.format, ci.platform, ci.status, ci.published_at, cp.name AS pillar_name FROM public.content_items ci LEFT JOIN public.content_pillars cp ON cp.id=ci.pillar_id WHERE ci.owner_id=${user.id}::uuid ORDER BY ci.updated_at DESC NULLS LAST LIMIT 40`,
    db`SELECT COALESCE(SUM(reach),0)::numeric AS reach, COALESCE(SUM(leads),0)::numeric AS leads, COALESCE(SUM(clicks),0)::numeric AS clicks FROM public.content_metrics WHERE owner_id=${user.id}::uuid`,
  ]);
  const m=metrics[0];
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link><Link className="btn btn-secondary" href="/insights">Public insights <ArrowUpRight size={15}/></Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Phase 3 · Distribution</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Brand & content.</h1></div><p className="section-lead">Turn proof into distribution through a disciplined content system without confusing attention with value.</p></div>
    <div className="os-module-grid"><article className="card os-module"><Share2 size={19}/><h3>{accounts.length} social accounts</h3><p>Connected identity surfaces for professional distribution.</p></article><article className="card os-module"><Megaphone size={19}/><h3>{content.length} content items</h3><p>Content pipeline linked to pillars and publication status.</p></article><article className="card os-module"><BarChart3 size={19}/><h3>{Number(m?.leads ?? 0).toLocaleString()} leads</h3><p>Recorded leads attributed to content measurement.</p></article></div>
    <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">Content architecture</div><h2>What the brand talks about.</h2></div></div><div className="os-module-grid">{pillars.map((p:{id:string;name:string;target_share:number|null;description:string|null})=><article className="card os-module" key={p.id}><Megaphone size={18}/><h3>{p.name}</h3><p>{p.description || "No description yet."}</p><span className="os-module-link">Target share {p.target_share ?? "—"}%</span></article>)}</div></section>
    <section style={{marginTop:55}}><div className="section-head"><div><div className="kicker">Publishing pipeline</div><h2>Create with intent.</h2></div></div><div className="timeline">{content.map((c:{id:string;title:string;format:string|null;platform:string|null;status:string|null;published_at:string|null;pillar_name:string|null})=><article className="timeline-item" key={c.id}><div className="period">{c.status || "planned"}</div><div><h3>{c.title}</h3><p>{c.platform || "Platform"} · {c.format || "format"} · {c.pillar_name || "No pillar"}{c.published_at ? ` · ${new Date(c.published_at).toLocaleDateString("en-GB")}` : ""}</p></div></article>)}</div></section>
    <section className="cta" style={{marginTop:70,borderRadius:26}}><div className="container" style={{padding:"56px 0"}}><div className="kicker">Distribution principle</div><h2>Proof first. Distribution second. Conversion third.</h2><p>Content should amplify real capability, not manufacture credentials or outcomes.</p></div></section>
  </div></main>;
}
