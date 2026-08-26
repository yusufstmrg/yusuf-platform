import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { experience } from "@/lib/content";

export const metadata = {
  title: "Experience — Yusuf B. Situmorang",
  description: "Professional experience and career direction of Yusuf B. Situmorang.",
};

export default function ExperiencePage() {
  return (
    <main className="section section-white">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 48 }}>
          <Link className="btn btn-dark" href="/"><ArrowLeft size={15} /> Back to Yusuf</Link>
        </div>
        <div className="section-head">
          <div><div className="kicker">Experience</div><h1 style={{ fontSize: "clamp(44px, 7vw, 76px)" }}>A finance career in progress.</h1></div>
          <p className="section-lead">The career track is moving from accounting and tax depth toward broader financial decision support and strategic finance.</p>
        </div>
        <div className="timeline">
          {experience.map((item) => <article className="timeline-item" key={item.role + item.company}><div className="period">{item.period}</div><div><h2>{item.role} <span className="gold-dot">·</span> {item.company}</h2><p>{item.text}</p></div></article>)}
        </div>
        <div className="actions" style={{ marginTop: 40 }}>
          <Link className="btn btn-dark" href="/resume"><Download size={16} /> View resume</Link>
        </div>
      </div>
    </main>
  );
}
