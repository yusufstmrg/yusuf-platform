import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Instagram, Linkedin, MessageCircle, Music2, Youtube } from "lucide-react";
import { contentPillars, profile } from "@/lib/content";
import { whatsappMessage } from "@/lib/whatsapp";

export const metadata = {
  title: "Insights — Yusuf B. Situmorang",
  description: "Finance, business, AI, career and purpose insights from Yusuf B. Situmorang.",
};

const channels = [
  ["LinkedIn", "Professional authority", profile.linkedin, Linkedin],
  ["Instagram", "Personal brand and visual storytelling", profile.instagram, Instagram],
  ["TikTok", "Short-form ideas and experiments", profile.tiktok, Music2],
  ["YouTube", "Long-form analysis and deep dives", profile.youtube, Youtube],
] as const;

export default function InsightsPage() {
  return (
    <main className="section section-white">
      <div className="container">
        <div className="actions" style={{ marginTop: 0, marginBottom: 48 }}>
          <Link className="btn btn-dark" href="/"><ArrowLeft size={15} /> Back to Yusuf</Link>
        </div>
        <div className="section-head">
          <div><div className="kicker">Insights</div><h1 style={{ fontSize: "clamp(44px, 7vw, 76px)" }}>Ideas worth sharing.</h1></div>
          <p className="section-lead">The content library will grow as the public body of work grows. For now, this page is the central map of where the conversations happen.</p>
        </div>
        <div className="pill-row">{contentPillars.map((pillar) => <span className="pill" key={pillar}>{pillar}</span>)}</div>
        <div className="social-grid" style={{ marginTop: 34 }}>
          {channels.map(([name, text, url, Icon]) => (
            <a className="social" href={url} target="_blank" rel="noreferrer" key={name}>
              <Icon size={18} />
              <span><strong>{name}</strong><small>{text}</small></span>
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
        <section className="cta" style={{ marginTop: 70, borderRadius: 26 }}>
          <div className="container" style={{ padding: "58px 0" }}>
            <div className="kicker">Stay connected</div>
            <h2>Want to discuss an idea directly?</h2>
            <p>Use WhatsApp for a focused conversation. The site prepares a contextual opening message so the first interaction starts with useful information.</p>
            <div className="actions">
              <a className="btn btn-primary" href={whatsappMessage("general")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
              <Link className="btn btn-secondary" href="/projects">View projects <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
