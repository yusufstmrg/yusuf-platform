import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import { profile } from "@/lib/content";
import { whatsappMessage } from "@/lib/whatsapp";

export const metadata = { title: "About — Yusuf B. Situmorang", description: "The story, positioning and direction behind Yusuf B. Situmorang's work." };

export default function AboutPage() {
  return (
    <main className="section section-white">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 48 }}><Link className="btn btn-dark" href="/"><ArrowLeft size={15} /> Back to Yusuf</Link></div>
        <div className="section-head">
          <div><div className="kicker">About / The Story</div><h1 style={{ fontSize: "clamp(44px, 7vw, 82px)" }}>Finance is the foundation. Building is the direction.</h1></div>
          <p className="section-lead">A deeper look at the person, principles and trajectory behind the public portfolio.</p>
        </div>
        <div className="editorial-grid">
          <article className="editorial-lead">
            <span className="large-mark">YBS</span>
            <p>I am a finance professional building toward a broader stack across business, technology, communication and ownership.</p>
            <p>My foundation is accounting, tax, reporting and finance operations. The next layer is learning how financial information becomes better business decisions—and how technology and AI can turn good decisions into scalable systems.</p>
            <p>I am deliberately building a body of work in public: projects, analyses, experiments, systems and lessons. The goal is not to look accomplished; it is to become genuinely useful and let evidence compound.</p>
            <p>Long term, I want my work to create both economic value and meaningful contribution—building, serving, growing and giving with purpose.</p>
          </article>
          <div className="statement-stack">
            <article><span>POSITIONING</span><h3>{profile.positioning}</h3></article>
            <article><span>ROLE</span><h3>{profile.title}</h3></article>
            <article><span>HOME BASE</span><h3>{profile.location}</h3></article>
            <article><span>PHILOSOPHY</span><h3>{profile.philosophy}</h3></article>
          </div>
        </div>
        <section style={{ marginTop: 70 }}>
          <div className="kicker">The Direction</div>
          <div className="proof-grid">
            <article><span>01</span><h3>Master the foundation</h3><p>Keep deepening finance, accounting, tax, controls and decision support.</p></article>
            <article><span>02</span><h3>Build leverage</h3><p>Add business, AI, technology, communication, audience and ownership.</p></article>
            <article><span>03</span><h3>Turn value into impact</h3><p>Use the platform, network and ventures to create opportunities and serve others.</p></article>
          </div>
        </section>
        <div className="actions" style={{ marginTop: 50 }}>
          <Link className="btn btn-dark" href="/expertise">Explore Expertise <ArrowUpRight size={15} /></Link>
          <Link className="btn btn-dark" href="/projects">Explore Projects <ArrowUpRight size={15} /></Link>
          <a className="btn btn-secondary" href={whatsappMessage("general")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp Me</a>
        </div>
      </div>
    </main>
  );
}
