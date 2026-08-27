import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, Handshake, TrendingUp } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Business — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function BusinessPage() {
  const { user, db } = await requirePrivateDb();
  const [businesses, initiatives, leads, deals, revenue] = await Promise.all([
    db`SELECT id, name, category, status, description FROM public.businesses WHERE owner_id=${user.id}::uuid ORDER BY updated_at DESC NULLS LAST LIMIT 20`,
    db`SELECT bi.id, bi.title, bi.stage, bi.progress, bi.revenue_target, b.name AS business_name FROM public.business_initiatives bi LEFT JOIN public.businesses b ON b.id=bi.business_id WHERE bi.owner_id=${user.id}::uuid ORDER BY bi.updated_at DESC NULLS LAST LIMIT 30`,
    db`SELECT id, name, company, need, stage, estimated_value FROM public.leads WHERE owner_id=${user.id}::uuid ORDER BY updated_at DESC NULLS LAST LIMIT 30`,
    db`SELECT id, title, stage, value, currency, expected_close FROM public.deals WHERE owner_id=${user.id}::uuid ORDER BY expected_close ASC NULLS LAST LIMIT 30`,
    db`SELECT COALESCE(SUM(amount),0)::numeric AS total FROM public.revenue_transactions WHERE owner_id=${user.id}::uuid`,
  ]);
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link><Link className="btn btn-secondary" href="/projects">Proof <ArrowUpRight size={15}/></Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Commercial engine</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Business & ventures.</h1></div><p className="section-lead">Track ventures, initiatives, leads, deals and revenue without losing the strategic link back to personal value and ownership.</p></div>
    <div className="os-module-grid"><article className="card os-module"><BriefcaseBusiness size={19}/><h3>{businesses.length} businesses</h3><p>Ventures and business directions under management.</p></article><article className="card os-module"><Handshake size={19}/><h3>{leads.length} leads · {deals.length} deals</h3><p>Commercial pipeline from first signal to expected close.</p></article><article className="card os-module"><TrendingUp size={19}/><h3>Revenue {Number(revenue[0]?.total ?? 0).toLocaleString()}</h3><p>Recorded revenue transactions in the private ledger.</p></article></div>
    <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">Venture map</div><h2>What is being built.</h2></div></div><div className="os-module-grid">{businesses.map((b:{id:string;name:string;category:string|null;status:string|null;description:string|null})=><article className="card os-module" key={b.id}><BriefcaseBusiness size={18}/><h3>{b.name}</h3><p>{b.category || "Business"} · {b.status || "active"}</p><p style={{marginTop:8}}>{b.description || "No description yet."}</p></article>)}</div></section>
    <section style={{marginTop:55}}><div className="section-head"><div><div className="kicker">Initiatives</div><h2>From idea to execution.</h2></div></div><div className="timeline">{initiatives.map((i:{id:string;title:string;stage:string|null;progress:number|null;revenue_target:number|null;business_name:string|null})=><article className="timeline-item" key={i.id}><div className="period">{i.stage || "planned"}</div><div><h3>{i.title}</h3><p>{i.business_name || "Business"} · {i.progress ?? 0}% progress{i.revenue_target ? ` · target ${Number(i.revenue_target).toLocaleString()}` : ""}</p></div></article>)}</div></section>
    <section style={{marginTop:55}}><div className="section-head"><div><div className="kicker">Pipeline</div><h2>Leads & deals.</h2></div></div><div className="timeline">{[...leads.map(l=>({...l,_kind:"lead"})),...deals.map(d=>({...d,_kind:"deal"}))].map((x:{id:string;_kind:string;name?:string;company?:string|null;need?:string|null;title?:string;stage:string|null;estimated_value?:number|null;value?:number|null;currency?:string|null})=><article className="timeline-item" key={`${x._kind}-${x.id}`}><div className="period">{x.stage || x._kind}</div><div><h3>{x.title || x.name}</h3><p>{x.company || x.need || "Commercial opportunity"} · {x._kind === "deal" ? `${Number(x.value ?? 0).toLocaleString()} ${x.currency || ""}` : `est. ${Number(x.estimated_value ?? 0).toLocaleString()}`}</p></div></article>)}</div></section>
  </div></main>;
}
