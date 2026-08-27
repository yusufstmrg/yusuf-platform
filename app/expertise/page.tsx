import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { expertise } from "@/lib/content";

export const metadata = { title: "Expertise — Yusuf B. Situmorang", description: "Finance, business, technology and communication capabilities of Yusuf B. Situmorang." };

const detail: Record<string,string> = {
  "Accounting & Tax":"Financial reporting, accounting operations, tax compliance, reconciliations, controls and disciplined financial close.",
  "Financial Analysis":"Management reporting, variance thinking, financial storytelling and translating numbers into decisions and priorities.",
  "Corporate Finance":"Developing capability across FP&A, budgeting, forecasting, business partnering, valuation and strategic finance.",
  "AI & Technology":"Applying AI, automation, data workflows and software thinking to remove repetitive work and increase leverage.",
  "Business Building":"Turning problems into offers, systems and ventures with commercial logic, execution discipline and measurable outcomes.",
  "Communication":"Making complex finance and business ideas understandable through writing, presentations, visual storytelling and content."
};

export default function ExpertisePage() {
  return (
    <main className="section">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 48 }}><Link className="btn btn-dark" href="/"><ArrowLeft size={15} /> Back to Yusuf</Link></div>
        <div className="section-head">
          <div><div className="kicker">Expertise / Capability Stack</div><h1 style={{ fontSize: "clamp(44px, 7vw, 82px)" }}>A stack built for leverage.</h1></div>
          <p className="section-lead">Established finance capability forms the base; business, data, AI and communication are the layers being intentionally compounded.</p>
        </div>
        <div className="expertise-list">
          {expertise.map((item) => <article className="expertise-row" key={item.number}><span className="number">{item.number}</span><h2>{item.title}</h2><p>{detail[item.title] ?? item.text}</p><ArrowUpRight className="row-arrow" size={20} /></article>)}
        </div>
        <section style={{ marginTop: 70 }}>
          <div className="kicker">How the stack compounds</div>
          <div className="proof-grid">
            <article><span>FOUNDATION</span><h3>Finance depth</h3><p>Accuracy, compliance, controls and commercial understanding create trust.</p></article>
            <article><span>LEVERAGE</span><h3>Technology + AI</h3><p>Automation and systems increase speed, scale and quality of execution.</p></article>
            <article><span>DISTRIBUTION</span><h3>Communication + audience</h3><p>Clear ideas, content and relationships turn capability into opportunity.</p></article>
          </div>
        </section>
        <div className="actions" style={{ marginTop: 45 }}><Link className="btn btn-dark" href="/projects">Explore Projects <ArrowUpRight size={15} /></Link><Link className="btn btn-dark" href="/experience">View Career Journey <ArrowUpRight size={15} /></Link></div>
      </div>
    </main>
  );
}
