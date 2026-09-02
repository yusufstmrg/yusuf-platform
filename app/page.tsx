import { ArrowUpRight, Briefcase, Building2, Calculator, Download, Github, Heart, Linkedin, Instagram, MessageCircle, Music2, Play, Sparkles, Target, TrendingUp, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { building, contentPillars, credibility, experience, expertise, highlights, profile } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { WhatsappIntent, whatsappMessage } from "@/lib/whatsapp";

const socials = [
  ["LinkedIn", profile.linkedin, "Professional authority", Linkedin],
  ["Instagram", profile.instagram, "Personal brand", Instagram],
  ["TikTok", profile.tiktok, "Short-form ideas", Music2],
  ["YouTube", profile.youtube, "Deep-dive content", Youtube],
] as const;

const proofPrinciples = [
  ["01", "Show, don’t tell", "Every major claim should eventually have a project, result, case study, credential, or other evidence behind it."],
  ["02", "Build in public", "The portfolio grows from verified work. New projects are documented as they become real and useful."],
  ["03", "Compound value", "Skills, audience, relationships, assets and ownership should reinforce one another over time."],
];

const contactOptions: Array<readonly [string, string, WhatsappIntent]> = [
  ["Hire / Engage", "For consulting, finance/business projects and professional engagements.", "hire"],
  ["Career / Recruitment", "For recruiters and employers exploring relevant roles, interviews or talent conversations.", "career"],
  ["Collaborate", "For partnerships, products, content, business ventures and strategic collaborations.", "collaborate"],
  ["Speaking / Content", "For speaking, knowledge-sharing, interviews, podcasts and creator collaborations.", "speaking"],
];

function slugify(value: string) { return value.toLowerCase().replace(/×/g, "x").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

export default function Home() {
  return <main>
    <SiteNav />
    <section id="top" className="hero">
      <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
      <div className="hero-grid container">
        <div className="hero-copy-block reveal">
          <p className="hero-label">Yusuf B. Situmorang</p>
          <h1>Finance.<br/><em>Business.</em><br/>AI. Growth.</h1>
          <p className="hero-copy">{profile.intro} I’m building a career and body of work around practical finance, business building, emerging technology and meaningful impact.</p>
          <div className="hero-meta"><span>Finance Professional</span><span>Builder</span><span>Lifelong Learner</span></div>
          <div className="actions">
            <Link className="btn btn-primary" href="/projects"><span data-i18n="explore">Explore My Work</span><ArrowUpRight size={16}/></Link>
            <a className="btn btn-secondary" href={whatsappMessage("general")} target="_blank" rel="noreferrer"><MessageCircle size={16}/><span data-i18n="whatsapp">WhatsApp Me</span></a>
          </div>
        </div>
        <div className="hero-card reveal delay">
          <div className="hero-portrait">
            <Image src="/yusuf-portrait.webp" alt="Yusuf B. Situmorang" width={694} height={1158} priority quality={100} sizes="(max-width: 900px) 86vw, 552px"/>
            <div className="portrait-glow" aria-hidden="true"/><div className="portrait-frame" aria-hidden="true"/>
            <div className="portrait-caption"><strong>Build. Serve. Grow. Give.</strong><span>Finance • Business • Technology • Purpose</span></div>
          </div>
        </div>
      </div>
      <div className="hero-proof-bar container">
        {highlights.map((item, i) => {
          const Icons=[Target, Briefcase, TrendingUp, Heart] as const; const Icon=Icons[i];
          return <article key={item.label}><span className="proof-icon"><Icon size={18}/></span><strong>{item.value}</strong><span>{item.label}</span><small>{item.detail}</small></article>
        })}
      </div>
    </section>

    <section className="section what-i-do"><div className="container"><div className="section-head"><div><div className="kicker">01 / What I Do</div><h2>Turning Complexity<br/><em>Into Clarity.</em></h2></div><p className="section-lead">I connect finance, business thinking and emerging technology to make better decisions, build useful systems and create measurable value.</p></div><div className="what-grid">
      {[[Calculator,"Finance","Accounting, tax, financial analysis, reporting, controls and decision support."],[Building2,"Business","Strategy, operating systems, venture building, commercial thinking and growth."],[Sparkles,"Technology & AI","AI-assisted workflows, automation, data and software experiments that turn ideas into leverage."]].map(([Icon,title,text],i)=><article key={String(title)}><div className="what-icon"><Icon size={19}/></div><span>0{i+1}</span><h3>{title as string}</h3><p>{text as string}</p></article>)}
    </div></div></section>

    <section id="about" className="section section-white"><div className="container"><div className="section-head"><div><div className="kicker">02 / About</div><h2>Numbers are only the beginning.</h2></div><p className="section-lead">My foundation is accounting, tax and finance. The direction is broader: business judgment, technology, communication and ownership.</p></div>
      <div className="editorial-grid"><article className="editorial-lead"><span className="large-mark">YBS</span><p>I’m a Senior Accountant & Tax professional with 5+ years of finance, accounting and tax experience across multiple industries.</p><p>My work spans financial reporting, tax compliance, reconciliations, controls, audit support, ERP/accounting systems and operational finance. I’m now deliberately extending that foundation into business building and AI-enabled systems.</p><p>The public portfolio is evidence-first: real work, verified credentials and clearly labelled experiments. It should become more valuable as the underlying work compounds.</p></article>
      <div className="statement-stack"><article><span>POSITIONING</span><h3>{profile.positioning}</h3></article><article><span>CREDENTIAL</span><h3>{profile.credential}</h3></article><article><span>EDUCATION</span><h3>{profile.education}</h3></article><article><span>HOME BASE</span><h3>{profile.location}</h3></article></div></div>
      <div className="credibility-strip">{credibility.map((x)=><span key={x}>{x}</span>)}</div>
      <div className="actions"><Link className="btn btn-dark" href="/about"><span data-i18n="story">Read My Story</span><ArrowUpRight size={15}/></Link></div>
    </div></section>

    <section id="expertise" className="section"><div className="container"><div className="section-head"><div><div className="kicker">03 / Expertise</div><h2>A stack built for leverage.</h2></div><p className="section-lead">Established finance capability forms the base. Business, data, AI and communication are the next layers being intentionally developed.</p></div><div className="expertise-list">{expertise.map(item=><article className="expertise-row" key={item.number}><span className="number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight className="row-arrow" size={20}/></article>)}</div><div className="actions"><Link className="btn btn-dark" href="/expertise"><span data-i18n="exploreExpertise">Explore Expertise</span><ArrowUpRight size={15}/></Link></div></div></section>

    <section id="experience" className="section section-white"><div className="container"><div className="section-head"><div><div className="kicker">04 / Experience</div><h2>A finance career in progress.</h2></div><p className="section-lead">A progressive path from audit and accounting operations into senior finance and tax responsibility.</p></div><div className="timeline">{experience.map(item=><article className="timeline-item" key={item.role+item.company}><div className="period">{item.period}</div><div><h3>{item.role}<span className="gold-dot"> · </span>{item.company}</h3><p>{item.text}</p></div></article>)}</div><div className="actions"><Link className="btn btn-dark" href="/experience"><span data-i18n="career">View Career Journey</span><ArrowUpRight size={15}/></Link><Link className="btn btn-dark" href="/resume"><Download size={16}/><span data-i18n="resumeView">View My Resume</span></Link></div></div></section>

    <section id="building" className="section dark-band"><div className="container"><div className="section-head"><div><div className="kicker">05 / Building</div><h2>Proof, not promises.</h2></div><p className="section-lead">The portfolio separates current builds from proven outcomes. Nothing is presented as completed before the evidence exists.</p></div><div className="build-grid">{building.map(item=><Link href={"/projects/"+slugify(item.title)} className="build-item" key={item.title}><div className="build-index">{item.tag}</div><h3>{item.title}</h3><p>{item.text}</p><span className="build-status">VIEW PROJECT <span/></span></Link>)}</div></div></section>

    <section className="section section-white"><div className="container"><div className="section-head"><div><div className="kicker">06 / Proof Standard</div><h2>How this portfolio will compound.</h2></div><p className="section-lead">This is a public-facing philosophy: show useful work, document progress and let evidence compound.</p></div><div className="proof-grid">{proofPrinciples.map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section id="insights" className="section"><div className="container"><div className="section-head"><div><div className="kicker">07 / Insights</div><h2>Learning in public.</h2></div><p className="section-lead">Practical ideas across finance, business, AI, career growth and purpose—shared while the underlying knowledge is being built.</p></div><div className="pill-row">{contentPillars.map(p=><span className="pill" key={p}>{p}</span>)}</div><div className="social-grid">{socials.map(([name,url,desc,Icon])=><a className="social" href={url} target="_blank" rel="noreferrer" key={name}><Icon size={18}/><span><strong>{name}</strong><small>{desc}</small></span><ArrowUpRight size={15}/></a>)}</div><div className="actions"><Link className="btn btn-dark" href="/insights"><span data-i18n="insightsHub">Open Insights Hub</span><ArrowUpRight size={15}/></Link></div></div></section>

    <section className="section technology-section"><div className="container technology-grid"><div><div className="kicker">08 / Technology</div><h2>Building the system behind the journey.</h2><p className="section-lead">Yusuf OS is the private operating system behind the public platform—tracking personal value, career capital, execution, wealth and purpose with an AI-assisted decision layer.</p></div><div className="tech-stack"><article><Sparkles size={19}/><div><strong>AI Chief of Staff</strong><p>Reviews, bottleneck detection and next-best actions.</p></div></article><article><Github size={19}/><div><strong>Open Build</strong><p>Selected technical experiments and future proof-of-work.</p></div></article><article><Play size={19}/><div><strong>Build in Public</strong><p>Documenting what I learn and build across media.</p></div></article></div></div></section>

    <section id="contact" className="cta"><div className="container"><div className="section-head"><div><div className="kicker">09 / Work With Me</div><h2>Choose the reason you’re reaching out.</h2></div><p className="section-lead">Contextual WhatsApp messages make the first conversation more useful.</p></div><div className="proof-grid contact-grid">{contactOptions.map(([title,text,intent])=><article key={title}><span><MessageCircle size={14}/></span><h3>{title}</h3><p>{text}</p><a className="btn btn-primary" href={whatsappMessage(intent)} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight size={15}/></a></article>)}</div></div></section>
    <footer className="footer"><div className="container footer-inner"><div>© {new Date().getFullYear()} <strong>Yusuf B. Situmorang</strong></div><div className="footer-links"><Link href="/about">About</Link><Link href="/expertise">Expertise</Link><Link href="/experience">Experience</Link><Link href="/projects">Projects</Link><Link href="/insights">Insights</Link><Link href="/resume">Resume</Link><Link href="/contact">Contact</Link><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={profile.youtube} target="_blank" rel="noreferrer">YouTube</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div></div></footer>
  </main>;
}
