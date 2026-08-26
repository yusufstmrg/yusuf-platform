import {
  ArrowUpRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Play,
  Sparkles,
  TikTok,
  Youtube,
} from "lucide-react";
import { building, contentPillars, experience, expertise, profile } from "@/lib/content";

const socials = [
  ["LinkedIn", profile.linkedin, "Professional authority", Linkedin],
  ["Instagram", profile.instagram, "Personal brand", Instagram],
  ["TikTok", profile.tiktok, "Short-form ideas", TikTok],
  ["YouTube", profile.youtube, "Deep-dive content", Youtube],
] as const;

const proofPrinciples = [
  ["01", "Show, don’t tell", "Every major claim should eventually have a project, result, case study, credential, or other evidence behind it."],
  ["02", "Build in public", "The portfolio starts from zero by design. New work will be documented as it becomes real and useful."],
  ["03", "Compound value", "Skills, audience, relationships, assets and ownership should reinforce one another over time."],
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label="Yusuf B. Situmorang home">YUSUF<span>.</span></a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#expertise">Expertise</a>
            <a href="#experience">Experience</a>
            <a href="#building">Building</a>
            <a href="#insights">Insights</a>
          </div>
          <a className="nav-cta" href="#contact">Work with me</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="container hero-grid">
          <div className="reveal">
            <p className="hero-label">Yusuf B. Situmorang</p>
            <h1>Finance.<br /><em>Business.</em><br />AI. Growth.</h1>
            <p className="hero-copy">{profile.intro} I&apos;m building a career and body of work around practical finance, business building, emerging technology and meaningful impact.</p>
            <div className="hero-meta">
              <span>Finance Professional</span><span>Builder</span><span>Lifelong Learner</span>
            </div>
            <div className="actions">
              <a className="btn btn-primary" href="#building">Explore my work <ArrowUpRight size={16} /></a>
              <a className="btn btn-secondary" href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Linkedin size={16} /></a>
            </div>
          </div>
          <div className="hero-card reveal delay">
            <div className="hero-portrait">
              <img src="https://github.com/yusufstmrg.png?size=900" alt="Yusuf B. Situmorang" loading="eager" />
              <div className="portrait-shade" />
              <div className="portrait-frame" />
              <div className="portrait-caption"><strong>Build. Serve. Grow. Give.</strong><span>Finance • Business • Technology • Purpose</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section section-white">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker">01 / About</div><h2>Numbers are only the beginning.</h2></div>
            <p className="section-lead">My work starts with finance, but the bigger ambition is to connect financial thinking with business decisions, technology and human growth.</p>
          </div>
          <div className="editorial-grid">
            <article className="editorial-lead"><span className="large-mark">YBS</span><p>I am deliberately building from a strong finance foundation toward a broader stack of business, technology, communication and ownership.</p><p>The public website is designed to evolve with that journey. It will show the work as it is built—not pretend that tomorrow&apos;s achievements already exist.</p></article>
            <div className="statement-stack">
              <article><span>POSITIONING</span><h3>{profile.positioning}</h3></article>
              <article><span>PHILOSOPHY</span><h3>{profile.philosophy}</h3></article>
              <article><span>HOME BASE</span><h3>{profile.location}</h3></article>
            </div>
          </div>
        </div>
      </section>

      <section id="expertise" className="section">
        <div className="container">
          <div className="section-head"><div><div className="kicker">02 / Expertise</div><h2>A stack built for leverage.</h2></div><p className="section-lead">Established finance capability forms the base. Business, data, AI and communication are the next layers being intentionally developed.</p></div>
          <div className="expertise-list">
            {expertise.map((item) => <article className="expertise-row" key={item.number}><span className="number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight className="row-arrow" size={20} /></article>)}
          </div>
        </div>
      </section>

      <section id="experience" className="section section-white">
        <div className="container">
          <div className="section-head"><div><div className="kicker">03 / Experience</div><h2>A finance career in progress.</h2></div><p className="section-lead">Professional experience is the foundation. Proof-of-work is the next layer.</p></div>
          <div className="timeline">
            {experience.map((item) => <article className="timeline-item" key={item.role + item.company}><div className="period">{item.period}</div><div><h3>{item.role} <span className="gold-dot">·</span> {item.company}</h3><p>{item.text}</p></div></article>)}
          </div>
          <div className="actions"><a className="btn btn-dark" href="/resume.pdf"><Download size={16} /> View / Download CV</a></div>
        </div>
      </section>

      <section id="building" className="section dark-band">
        <div className="container">
          <div className="section-head"><div><div className="kicker">04 / Building</div><h2>Proof, not promises.</h2></div><p className="section-lead">The portfolio is intentionally starting from zero. These are the systems and ventures being built now; each will become richer as real evidence accumulates.</p></div>
          <div className="build-grid">
            {building.map((item) => <article className="build-item" key={item.title}><div className="build-index">{item.tag}</div><h3>{item.title}</h3><p>{item.text}</p><span className="build-status">IN PROGRESS <span /></span></article>)}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-head"><div><div className="kicker">05 / Proof standard</div><h2>How this portfolio will compound.</h2></div><p className="section-lead">The objective is not to collect certificates or decorate a profile. It is to create a visible trail of useful work.</p></div>
          <div className="proof-grid">
            {proofPrinciples.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="insights" className="section">
        <div className="container">
          <div className="section-head"><div><div className="kicker">06 / Insights</div><h2>Learning in public.</h2></div><p className="section-lead">Practical ideas across finance, business, AI, career growth and purpose—shared while the underlying knowledge is being built.</p></div>
          <div className="pill-row">{contentPillars.map((p) => <span className="pill" key={p}>{p}</span>)}</div>
          <div className="social-grid">
            {socials.map(([name, url, desc, Icon]) => <a className="social" href={url} target="_blank" rel="noreferrer" key={name}><Icon size={18} /><span><strong>{name}</strong><small>{desc}</small></span><ArrowUpRight size={15} /></a>)}
          </div>
        </div>
      </section>

      <section className="section technology-section">
        <div className="container technology-grid">
          <div><div className="kicker">07 / Technology</div><h2>Building the system behind the journey.</h2><p className="section-lead">Yusuf OS is the private operating system behind the public platform—tracking personal value, career capital, execution, wealth and purpose with an AI-assisted decision layer.</p></div>
          <div className="tech-stack">
            <article><Sparkles size={19} /><div><strong>AI Chief of Staff</strong><p>Reviews, bottleneck detection and next-best actions.</p></div></article>
            <article><Github size={19} /><div><strong>Open Build</strong><p>Selected technical experiments and future proof-of-work.</p></div></article>
            <article><Play size={19} /><div><strong>Build in Public</strong><p>Documenting what I learn and build across media.</p></div></article>
          </div>
        </div>
      </section>

      <section id="contact" className="cta">
        <div className="container cta-inner"><div><div className="kicker">08 / Contact</div><h2>Let&apos;s build something useful.</h2><p>Open to meaningful professional conversations, collaboration and opportunities aligned with finance, business, technology and growth.</p></div><div className="actions"><a className="btn btn-primary" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> Connect</a><a className="btn btn-secondary" href="mailto:yusufstmrg@gmail.com">Start a conversation <ArrowUpRight size={16} /></a></div></div>
      </section>

      <footer className="footer"><div className="container footer-inner"><div>© {new Date().getFullYear()} <strong>Yusuf B. Situmorang</strong></div><div className="footer-links"><a href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={profile.tiktok} target="_blank" rel="noreferrer">TikTok</a><a href={profile.youtube} target="_blank" rel="noreferrer">YouTube</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div></div></footer>
    </main>
  );
}
