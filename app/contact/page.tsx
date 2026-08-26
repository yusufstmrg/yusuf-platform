import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Linkedin, MessageCircle } from "lucide-react";
import { profile } from "@/lib/content";
import { WhatsappIntent, whatsappMessage } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact — Yusuf B. Situmorang",
  description: "Contact Yusuf B. Situmorang for hiring, collaboration, speaking and professional opportunities.",
};

const options: Array<readonly [string, string, WhatsappIntent]> = [
  ["Hire / Engage", "Professional roles, consulting and finance/business projects.", "hire"],
  ["Career / Recruitment", "Recruiter, employer and talent conversations.", "career"],
  ["Collaborate", "Business, product, venture and content partnerships.", "collaborate"],
  ["Speaking / Content", "Speaking, interviews, podcasts and knowledge-sharing.", "speaking"],
];

export default function ContactPage() {
  return (
    <main className="section dark-band">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 48 }}>
          <Link className="btn btn-secondary" href="/"><ArrowLeft size={15} /> Back to Yusuf</Link>
        </div>
        <div className="section-head">
          <div><div className="kicker">Contact</div><h1 style={{ fontSize: "clamp(44px, 7vw, 76px)" }}>Start with context.</h1></div>
          <p className="section-lead" style={{ color: "#b9c9d6" }}>Choose the reason you are reaching out. The opening WhatsApp message will be pre-filled with the context needed to make the first exchange useful.</p>
        </div>
        <div className="proof-grid contact-grid">
          {options.map(([title, text, intent]) => <article key={title}><span><MessageCircle size={14} /></span><h2>{title}</h2><p style={{ color: "#b9c9d6" }}>{text}</p><a className="btn btn-primary" href={whatsappMessage(intent)} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight size={15} /></a></article>)}
        </div>
        <div className="actions">
          <a className="btn btn-secondary" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
          <a className="btn btn-secondary" href={whatsappMessage("general")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> General WhatsApp</a>
        </div>
      </div>
    </main>
  );
}
