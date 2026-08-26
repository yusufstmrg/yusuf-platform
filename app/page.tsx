import Image from "next/image";
import { ArrowUpRight, Download, Github, Instagram, Linkedin, Play, Sparkles } from "lucide-react";
import { building, contentPillars, experience, expertise, profile } from "@/lib/content";

const socials = [
  ["LinkedIn", profile.linkedin, "Professional authority"],
  ["Instagram", profile.instagram, "Personal brand"],
  ["TikTok", profile.tiktok, "Short-form ideas"],
  ["YouTube", profile.youtube, "Deep-dive content"],
] as const;

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="container nav-inner">
          <a className="brand" href="#top">YUSUF<span>.</span></a>
          <div className="nav-links">
            <a href="#about">About</a><a href="#expertise">Expertise</a><a href="#experience">Experience</a><a href="#building">Building</a><a href="#insights">Insights</a>
          </div>
          <a className="nav-cta" href="#contact">Work with me</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="container hero-grid">
          <div className="reveal">
            <div className="eyebrow">Personal Digital Headquarters</div>
            <h1>Finance.<br/><em>Business.</em><br/>AI. Growth.</h1>
            <p className="hero-copy">{profile.intro} I&apos;m building a career and body of work around practical finance, business building, emerging technology and meaningful impact.</p>
            <div className="actions">
              <a className="btn btn-primary" href="#building">Explore what I&apos;m building <ArrowUpRight size={16}/></a>
              <a className="btn btn-secondary" href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Linkedin size={16}/></a>
            </div>
          </div>
          <div className="hero-card reveal delay">
            <Image className="hero-photo" src="/yusuf.jpg" alt="Yusuf B. Situmorang in professional attire" width={900} height={1100} priority />
            <div className="hero-card-caption"><strong>Build. Serve. Grow. Give.</strong>Finance • Business • Technology • Purpose</div>
          </div>
        </div>
      </section>

      <section id="about" className="section section-white">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker">01 / About</div><h2>Numbers are only the beginning.</h2></div>
            <p className="section-lead">My work starts with finance, but the bigger ambition is to connect financial thinking with business decisions, technology and human growth.</p>
          </div>
          <div className="grid-2">
            <article className="card"><div className="number">THE POSITIONING</div><h3>{profile.positioning}</h3><p>Not a claim of being everything at once. A deliberate direction: deepen finance expertise, build real products and projects, learn publicly, and create useful things.</p></article>
            <article className="card"><div className="number">THE PHILOSOPHY</div><h3>{profile.philosophy}</h3><p>Build capability and assets. Serve people. Grow with discipline. Give time, knowledge and resources toward a purpose bigger than career status.</p></article>
          </div>
        </div>
      </section>

      <section id="expertise" className="section">
        <div className="container">
          <div className="section-head"><div><div className="kicker">02 / Expertise</div><h2>Where I create value.</h2></div><p className="section-lead">A practical stack combining established finance capability with the technology and business skills I am intentionally building next.</p></div>
          <div className="grid-3">
            {expertise.map((item) => <article className="card" key={item.number}><div className="number">{item.number}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="experience" className="section section-white">
        <div className="container">
          <div className="section-head"><div><div className="kicker">03 / Experience</div><h2>A finance career in progress.</h2></div><p className="section-lead">Experience is the foundation. Proof-of-work is the next layer.</p></div>
          <div className="timeline">
            {experience.map((item) => <article className="timeline-item" key={item.role + item.company}><div className="period">{item.period}</div><div><h3>{item.role} <span style={{color:"#c9973e"}}>·</span> {item.company}</h3><p>{item.text}</p></div></article>)}
          </div>
          <div className="actions"><a className="btn" style={{border:"1px solid #dfe6eb"}} href="/resume.pdf"><Download size={16}/> Download CV</a></div>
        </div>
      </section>

      <section id="building" className="section dark-band">
        <div className="container">
          <div className="section-head"><div><div className="kicker">04 / Building</div><h2>Proof, not promises.</h2></div><p className="section-lead">I am deliberately building a public body of work from zero. This section will grow as each project becomes real, documented and useful.</p></div>
          <div className="build-grid">
            {building.map((item) => <article className="card build-card" key={item.title}><div><div className="tag">{item.tag}</div><h3>{item.title}</h3><p>{item.text}</p></div><div className="arrow"><ArrowUpRight size={22}/></div></article>)}
          </div>
        </div>
      </section>

      <section id="insights" className="section section-white">
        <div className="container">
          <div className="section-head"><div><div className="kicker">05 / Insights</div><h2>Learning in public.</h2></div><p className="section-lead">I share practical ideas across finance, business, AI, career growth and purpose—while building the knowledge behind them.</p></div>
          <div className="pill-row" style={{marginBottom:32}}>{contentPillars.map((p) => <span className="pill" key={p}>{p}</span>)}</div>
          <div className="social-grid">
            {socials.map(([name, url, desc]) => <a className="social" href={url} target="_blank" rel="noreferrer" key={name}>{name}<small>{desc} <ArrowUpRight size={12} style={{verticalAlign:"-2px"}}/></small></a>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="kicker">06 / Technology</div><h2>Building the system behind the journey.</h2></div><p className="section-lead">Yusuf OS is the private operating system behind the public platform—tracking personal value, career capital, execution, wealth and purpose with an AI-assisted decision layer.</p></div>
          <div className="grid-3">
            <article className="card"><Sparkles size={20} color="#c9973e"/><h3>AI Chief of Staff</h3><p>Turning progress data into reviews, bottleneck detection and next-best actions.</p></article>
            <article className="card"><Github size={20} color="#c9973e"/><h3>Open Build</h3><p>Selected technical experiments and future proof-of-work will live in my GitHub ecosystem.</p></article>
            <article className="card"><Play size={20} color="#c9973e"/><h3>Build in Public</h3><p>Documenting what I learn and build across video, social content and practical case studies.</p></article>
          </div>
        </div>
      </section>

      <section id="contact" className="cta">
        <div className="container cta-inner">
          <div><div className="kicker">07 / Contact</div><h2>Let&apos;s build something useful.</h2></div>
          <div className="actions"><a className="btn btn-primary" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> Connect</a><a className="btn btn-secondary" href={`mailto:hello@yusufstmrg.com`}>Start a conversation <ArrowUpRight size={16}/></a></div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner"><div>© {new Date().getFullYear()} <strong>Yusuf B. Situmorang</strong></div><div><a href={profile.instagram} target="_blank" rel="noreferrer"><Instagram size={13} style={{verticalAlign:"-2px"}}/> Instagram</a> &nbsp;·&nbsp; <a href={profile.github} target="_blank" rel="noreferrer"><Github size={13} style={{verticalAlign:"-2px"}}/> GitHub</a></div></div>
      </footer>
    </main>
  );
}
