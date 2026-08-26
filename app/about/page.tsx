import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import { profile } from "@/lib/content";
import { whatsappMessage } from "@/lib/whatsapp";

export const metadata = {
  title: "About — Yusuf B. Situmorang",
  description: "About Yusuf B. Situmorang and the direction behind his work.",
};

export default function AboutPage() {
  return (
    <main className="section section-white">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 48 }}>
          <Link className="btn btn-dark" href="/"><ArrowLeft size={15} /> Back to Yusuf</Link>
        </div>
        <div className="section-head">
          <div><div className="kicker">About</div><h1 style={{ fontSize: "clamp(44px, 7vw, 76px)" }}>Finance is the foundation. Building is the direction.</h1></div>
          <p className="section-lead">A public profile designed to evolve as the underlying work evolves.</p>
        </div>
        <div className="editorial-grid">
          <article className="editorial-lead">
            <span className="large-mark">YBS</span>
            <p>I am a finance professional building toward a broader stack across business, technology, communication and ownership.</p>
            <p>The aim is practical: understand how organisations make decisions, build useful systems, and make complex ideas easier to act on.</p>
            <p>The site is deliberately evidence-led. Claims should become stronger as projects, results and proof accumulate.</p>
          </article>
          <div className="statement-stack">
            <article><span>POSITIONING</span><h3>{profile.positioning}</h3></article>
            <article><span>ROLE</span><h3>{profile.title}</h3></article>
            <article><span>PHILOSOPHY</span><h3>{profile.philosophy}</h3></article>
          </div>
        </div>
        <div className="actions" style={{ marginTop: 50 }}>
          <Link className="btn btn-dark" href="/projects">Explore proof of work <ArrowUpRight size={15} /></Link>
          <a className="btn btn-secondary" href={whatsappMessage("general")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
        </div>
      </div>
    </main>
  );
}
