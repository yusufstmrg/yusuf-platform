import Link from "next/link";
import { ArrowLeft, Coins, CreditCard, Landmark, TrendingUp } from "lucide-react";
import { requirePrivateDb } from "@/lib/os/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Wealth — Yusuf Personal OS", robots: { index: false, follow: false } };

export default async function WealthPage() {
  const { user, db } = await requirePrivateDb();
  const [assets, liabilities, investments, snapshot, fi] = await Promise.all([
    db`SELECT id, name, category, current_value, currency, valuation_date FROM public.assets WHERE owner_id=${user.id}::uuid ORDER BY current_value DESC NULLS LAST LIMIT 30`,
    db`SELECT id, name, category, balance, currency, valuation_date FROM public.liabilities WHERE owner_id=${user.id}::uuid ORDER BY balance DESC NULLS LAST LIMIT 30`,
    db`SELECT id, name, asset_class, invested_amount, current_value, currency, as_of_date FROM public.investments WHERE owner_id=${user.id}::uuid ORDER BY current_value DESC NULLS LAST LIMIT 30`,
    db`SELECT snapshot_date, total_assets, total_liabilities, net_worth, currency FROM public.net_worth_snapshots WHERE owner_id=${user.id}::uuid ORDER BY snapshot_date DESC LIMIT 1`,
    db`SELECT annual_essential_expenses, withdrawal_rate, target_capital, current_capital, target_date, currency FROM public.fi_targets WHERE owner_id=${user.id}::uuid ORDER BY updated_at DESC NULLS LAST LIMIT 1`,
  ]);
  const s=snapshot[0]; const f=fi[0];
  return <main className="os-shell"><div className="container">
    <div className="actions" style={{marginTop:0}}><Link className="btn btn-dark" href="/os"><ArrowLeft size={15}/> Command Center</Link></div>
    <div className="section-head" style={{marginTop:35}}><div><div className="kicker">Wealth engine</div><h1 style={{fontSize:"clamp(44px,6vw,76px)"}}>Wealth & financial freedom.</h1></div><p className="section-lead">Build a private wealth ledger that connects cash flow, assets, liabilities, investments, net worth and the freedom trajectory.</p></div>
    <div className="os-module-grid"><article className="card os-module"><Coins size={19}/><h3>Net worth</h3><p>{s ? `${Number(s.net_worth).toLocaleString()} ${s.currency}` : "No snapshot yet."}</p></article><article className="card os-module"><Landmark size={19}/><h3>Assets</h3><p>{assets.length} tracked asset records.</p></article><article className="card os-module"><CreditCard size={19}/><h3>Liabilities</h3><p>{liabilities.length} tracked liabilities.</p></article></div>
    <section style={{marginTop:48}}><div className="section-head"><div><div className="kicker">Freedom target</div><h2>FI trajectory.</h2></div></div><div className="os-module-grid">{f?<><article className="card os-module"><TrendingUp size={18}/><h3>Target capital</h3><p>{Number(f.target_capital).toLocaleString()} {f.currency}</p></article><article className="card os-module"><TrendingUp size={18}/><h3>Current capital</h3><p>{Number(f.current_capital).toLocaleString()} {f.currency}</p></article><article className="card os-module"><TrendingUp size={18}/><h3>Target date</h3><p>{f.target_date ? new Date(f.target_date).toLocaleDateString("en-GB") : "Not set"} · withdrawal rate {f.withdrawal_rate}%</p></article></>:<article className="card"><h3>FI target not configured</h3><p>Once configured, this section will compare current investable capital with the required freedom capital.</p></article>}</div></section>
    <section style={{marginTop:55}}><div className="section-head"><div><div className="kicker">Balance sheet</div><h2>Assets, liabilities & investments.</h2></div></div><div className="timeline">{[...assets.map(a=>({...a,_kind:"asset"})),...liabilities.map(l=>({...l,_kind:"liability"})),...investments.map(i=>({...i,_kind:"investment"}))].map((x:{id:string;_kind:string;name:string;category?:string|null;asset_class?:string|null;current_value?:number|null;balance?:number|null;invested_amount?:number|null;currency:string|null})=><article className="timeline-item" key={`${x._kind}-${x.id}`}><div className="period">{x._kind}</div><div><h3>{x.name}</h3><p>{x.category || x.asset_class || "Finance"} · {Number(x.current_value ?? x.balance ?? 0).toLocaleString()} {x.currency || ""}{x._kind === "investment" ? ` invested ${Number(x.invested_amount ?? 0).toLocaleString()}` : ""}</p></div></article>)}</div></section>
  </div></main>;
}
