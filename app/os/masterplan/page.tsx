import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Masterplan — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function MasterplanPage() {
  const { user, db } = await requirePrivateDb();
  const items = await db`SELECT id, title, domain, sequence_no, status, progress, due_date, notes FROM public.masterplan_items WHERE owner_id=${user.id}::uuid ORDER BY sequence_no ASC NULLS LAST, due_date ASC NULLS LAST LIMIT 80`;
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link><Link className="btn btn-secondary" href="/os/strategy">Strategy <ArrowUpRight size={15}/></Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Strategic execution</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Masterplan.</h1></div><p className="section-lead">The ordered roadmap that connects life domains to measurable execution. Every item should eventually flow into sprint work and proof.</p></div>
    <div className="card" style={{marginBottom:35}}><div className="kicker">Roadmap status</div><h2 style={{marginTop:8}}>{items.length} roadmap items.</h2><p>Progress is tracked at the item level; sequence creates a deliberate order of operations.</p></div>
    <div className="timeline">{items.map((i:{id:string;title:string;domain:string|null;sequence_no:number|null;status:string|null;progress:number|null;due_date:string|null;notes:string|null})=><article className="timeline-item" key={i.id}><div className="period">{String(i.sequence_no ?? "—").padStart(2,"0")}</div><div><h3>{i.title}</h3><p>{i.domain || "General"} · {i.status || "planned"} · {i.progress ?? 0}%{i.due_date ? ` · due ${new Date(i.due_date).toLocaleDateString("en-GB")}` : ""}</p>{i.notes && <p style={{marginTop:8}}>{i.notes}</p>}</div></article>)}</div>
    <section className="cta" style={{marginTop:70,borderRadius:26}}><div className="container" style={{padding:"56px 0"}}><div className="kicker">Execution rule</div><h2>Direction stays stable. Tactics can change.</h2><p>The masterplan gives the system a northbound sequence while reviews and evidence determine what changes next.</p></div></section>
  </div></main>;
}
