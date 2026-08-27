import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Handshake, UsersRound, MessageCircle } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Network — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function NetworkPage() {
  const { user, db } = await requirePrivateDb();
  const [contacts, relationships, followups, interactions] = await Promise.all([
    db`SELECT id, name, organization, role_title, category, private, updated_at FROM public.contacts WHERE owner_id=${user.id}::uuid ORDER BY updated_at DESC NULLS LAST LIMIT 50`,
    db`SELECT r.id, r.strength, r.relationship_status, r.last_interaction_at, r.next_touch_at, c.name, c.organization FROM public.relationships r LEFT JOIN public.contacts c ON c.id=r.contact_id WHERE r.owner_id=${user.id}::uuid ORDER BY r.next_touch_at ASC NULLS LAST LIMIT 50`,
    db`SELECT f.id, f.title, f.due_at, f.completed_at, c.name AS contact_name FROM public.followups f LEFT JOIN public.contacts c ON c.id=f.contact_id WHERE f.owner_id=${user.id}::uuid ORDER BY f.due_at ASC NULLS LAST LIMIT 30`,
    db`SELECT i.id, i.interaction_type, i.summary, i.occurred_at, c.name AS contact_name FROM public.interactions i LEFT JOIN public.contacts c ON c.id=i.contact_id WHERE i.owner_id=${user.id}::uuid ORDER BY i.occurred_at DESC LIMIT 30`,
  ]);
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link><Link className="btn btn-secondary" href="/os/growth">Brand & content <ArrowUpRight size={15}/></Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Phase 3 · Network</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Relationships & network.</h1></div><p className="section-lead">Treat relationships as a long-term asset: remember context, protect privacy, follow through and create mutual value.</p></div>
    <div className="os-module-grid"><article className="card os-module"><UsersRound size={19}/><h3>{contacts.length} contacts</h3><p>People, organizations and categories in the private relationship graph.</p></article><article className="card os-module"><Handshake size={19}/><h3>{relationships.length} relationships</h3><p>Relationship strength, status and next-touch signals.</p></article><article className="card os-module"><MessageCircle size={19}/><h3>{interactions.length} interactions</h3><p>Memory of conversations and meaningful touchpoints.</p></article></div>
    <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">Relationship graph</div><h2>People worth staying close to.</h2></div></div><div className="os-module-grid">{relationships.map((r:{id:string;strength:number|null;relationship_status:string|null;last_interaction_at:string|null;next_touch_at:string|null;name:string|null;organization:string|null})=><article className="card os-module" key={r.id}><Handshake size={18}/><h3>{r.name || "Contact"}</h3><p>{r.organization || "Independent"} · {r.relationship_status || "active"}</p><div className="os-stat-row"><span><small>Strength</small><b>{r.strength ?? "—"}</b></span><span><small>Next touch</small><b>{r.next_touch_at ? new Date(r.next_touch_at).toLocaleDateString("en-GB") : "—"}</b></span></div></article>)}</div></section>
    <section style={{marginTop:55}}><div className="section-head"><div><div className="kicker">Follow-up queue</div><h2>Do what you said you would do.</h2></div></div><div className="timeline">{followups.map((f:{id:string;title:string;due_at:string|null;completed_at:string|null;contact_name:string|null})=><article className="timeline-item" key={f.id}><div className="period">{f.completed_at ? "done" : "due"}</div><div><h3>{f.title}</h3><p>{f.contact_name || "Contact"}{f.due_at ? ` · ${new Date(f.due_at).toLocaleDateString("en-GB")}` : ""}</p></div></article>)}</div></section>
    <section style={{marginTop:55}}><div className="section-head"><div><div className="kicker">Interaction memory</div><h2>Context compounds.</h2></div></div><div className="timeline">{interactions.map((i:{id:string;interaction_type:string;summary:string|null;occurred_at:string;contact_name:string|null})=><article className="timeline-item" key={i.id}><div className="period">{new Date(i.occurred_at).toLocaleDateString("en-GB")}</div><div><h3>{i.contact_name || "Contact"} · {i.interaction_type}</h3><p>{i.summary || "No summary recorded."}</p></div></article>)}</div></section>
  </div></main>;
}
