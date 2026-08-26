import Link from "next/link";
import { ArrowLeft, Download, Linkedin } from "lucide-react";
import { experience, expertise, profile } from "@/lib/content";

export const metadata = {
  title: "Resume — Yusuf B. Situmorang",
  description: "Professional profile and resume overview for Yusuf B. Situmorang.",
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="container resume-shell">
        <div className="resume-toolbar">
          <Link href="/" className="text-link"><ArrowLeft size={15}/> Back to Yusuf</Link>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-link"><Linkedin size={15}/> LinkedIn</a>
        </div>
        <header className="resume-header">
          <div>
            <div className="kicker">PROFESSIONAL PROFILE</div>
            <h1>{profile.name}</h1>
            <p className="resume-title">{profile.title}</p>
            <p>{profile.location} · 5+ years of finance, accounting and tax experience</p>
          </div>
          <div className="resume-mark">YBS</div>
        </header>
        <section className="resume-section">
          <h2>Profile</h2>
          <p>{profile.intro}</p>
          <p>Professional direction: {profile.positioning}. Core philosophy: {profile.philosophy}</p>
        </section>
        <section className="resume-section">
          <h2>Experience</h2>
          {experience.map((item) => (
            <article className="resume-item" key={item.role + item.company}>
              <div className="resume-period">{item.period}</div>
              <div><h3>{item.role}</h3><p className="resume-company">{item.company}</p><p>{item.text}</p></div>
            </article>
          ))}
        </section>
        <section className="resume-section">
          <h2>Expertise</h2>
          <div className="resume-skills">{expertise.map((item) => <span key={item.title}>{item.title}</span>)}</div>
        </section>
        <section className="resume-section resume-note">
          <h2>Full CV</h2>
          <p>The downloadable CV file will be added here once the final public PDF asset is placed in the repository. This page intentionally avoids fabricating or altering credentials that are not available in the public source.</p>
          <a className="btn btn-primary" href="mailto:yusufstmrg@gmail.com"><Download size={16}/> Request CV PDF</a>
        </section>
      </div>
    </main>
  );
}
