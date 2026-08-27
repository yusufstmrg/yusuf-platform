import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { experience } from "@/lib/content";

export const metadata = { title: "Experience — Yusuf B. Situmorang", description: "Professional experience and career direction of Yusuf B. Situmorang." };

export default function ExperiencePage() {
  return (
    <main className="section section-white">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 48 }}><Link className="btn btn-dark" href="/"><ArrowLeft size={15} /> Back to Yusuf</Link></div>
        <div className="section-head">
          <div><div className="kicker">Experience / Career Journey</div><h1 style={{ fontSize: "clamp(44px, 7vw, 82px)" }}>A finance career in progress.</h1></div>
          <p className="section-lead">A foundation in accounting and tax, deliberately expanding toward financial decision support, business building and technology.</p>
        </div>
        <div className="timeline">{experience.map((item) => <article className="timeline-item" key={item.role + item.company}><div className="period">{item.period}</div><div><h2>{item.role} <span className="gold-dot">·</span> {item.company}</h2><p>{item.text}</p></div></article>)}</div>
        <section style={{ marginTop: 70 }}>
          <div className="kicker">Career Capital Strategy</div>
          <div className="proof-grid">
            <article><span>DEPTH</span><h3>Finance authority</h3><p>Continue turning technical finance experience into stronger commercial judgment.</p></article>
            <article><span>BREADTH</span><h3>Business + technology</h3><p>Build practical systems, automation and ventures that demonstrate broader capability.</p></article>
            <article><span>PROOF</span><h3>Visible body of work</h3><p>Convert learning into projects, case studies, writing, videos and measurable outcomes.</p></article>
          </div>
        </section>
        <div className="actions" style={{ marginTop: 40 }}><Link className="btn btn-dark" href="/resume"><Download size={16} /> View My Resume</Link><Link className="btn btn-dark" href="/contact">Discuss an Opportunity <ArrowUpRight size={15} /></Link></div>
      </div>
    </main>
  );
}
