import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { expertise } from "@/lib/content";

export const metadata = {
  title: "Expertise — Yusuf B. Situmorang",
  description: "Finance, business, technology and communication capabilities of Yusuf B. Situmorang.",
};

export default function ExpertisePage() {
  return (
    <main className="section">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 48 }}>
          <Link className="btn btn-dark" href="/"><ArrowLeft size={15} /> Back to Yusuf</Link>
        </div>
        <div className="section-head">
          <div><div className="kicker">Expertise</div><h1 style={{ fontSize: "clamp(44px, 7vw, 76px)" }}>A stack built for leverage.</h1></div>
          <p className="section-lead">Established finance capability forms the base; business, data, AI and communication are the layers being intentionally compounded.</p>
        </div>
        <div className="expertise-list">
          {expertise.map((item) => <article className="expertise-row" key={item.number}><span className="number">{item.number}</span><h2>{item.title}</h2><p>{item.text}</p><ArrowUpRight className="row-arrow" size={20} /></article>)}
        </div>
        <div className="actions" style={{ marginTop: 45 }}>
          <Link className="btn btn-dark" href="/projects">See projects <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </main>
  );
}
