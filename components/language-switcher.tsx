"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Lang = "en" | "id";

const translations: Record<string, string> = {
  "About":"Tentang","Expertise":"Keahlian","Experience":"Pengalaman","Building":"Membangun","Insights":"Insight","Projects":"Proyek","Resume":"CV","Contact Me":"Hubungi Saya",
  "Explore My Work":"Jelajahi Karya Saya","WhatsApp Me":"WhatsApp Saya","Read My Story":"Baca Cerita Saya","Explore Expertise":"Jelajahi Keahlian","View Career Journey":"Lihat Perjalanan Karier","View My Resume":"Lihat CV Saya","Open Insights Hub":"Buka Pusat Insight",
  "Finance.":"Keuangan.","Business.":"Bisnis.","AI. Growth.":"AI. Pertumbuhan.","Finance Professional":"Profesional Keuangan","Builder":"Builder","Lifelong Learner":"Pembelajar Seumur Hidup",
  "Turning complexity into clarity.":"Mengubah kompleksitas menjadi kejelasan.","Numbers are only the beginning.":"Angka hanyalah permulaan.","A stack built for leverage.":"Kapabilitas yang dibangun untuk leverage.","A finance career in progress.":"Perjalanan karier keuangan yang terus berkembang.","Proof, not promises.":"Bukti, bukan janji.","Learning in public.":"Belajar secara terbuka.","Building the system behind the journey.":"Membangun sistem di balik perjalanan.","Choose the reason you're reaching out.":"Pilih alasan Anda menghubungi saya.",
  "How this portfolio will compound.":"Bagaimana portofolio ini akan bertumbuh secara majemuk.","Show, don’t tell":"Tunjukkan, jangan hanya katakan","Build in public":"Bangun secara terbuka","Compound value":"Nilai yang berlipat",
  "View projects":"Lihat proyek","Back to Yusuf":"Kembali ke Yusuf","Back to projects":"Kembali ke proyek","Open WhatsApp":"Buka WhatsApp","Hire / Engage":"Hire / Engage","Career / Recruitment":"Karier / Rekrutmen","Collaborate":"Kolaborasi","Speaking / Content":"Speaking / Konten",
  "Currently building":"Sedang dibangun","In progress":"Sedang dikerjakan","Current state":"Status saat ini","Published proof":"Bukti yang dipublikasikan","Current builds":"Pembangunan saat ini","Proof of work, built in public.":"Bukti karya, dibangun secara terbuka.","Ideas worth sharing.":"Ide yang layak dibagikan.",
  "The Direction":"Arah","Career Capital Strategy":"Strategi Modal Karier","How the stack compounds":"Bagaimana kapabilitas ini bertumbuh","Discuss this project":"Diskusikan proyek ini","Interested in the work or want to collaborate?":"Tertarik dengan karya ini atau ingin berkolaborasi?",
  "Finance":"Keuangan","Business":"Bisnis","Technology & AI":"Teknologi & AI","Accounting & Tax":"Akuntansi & Pajak","Financial Analysis":"Analisis Keuangan","Corporate Finance":"Keuangan Korporasi","AI & Technology":"AI & Teknologi","Business Building":"Membangun Bisnis","Communication":"Komunikasi",
  "Home Base":"Domisili","POSITIONING":"POSITIONING","PHILOSOPHY":"FILOSOFI","ROLE":"PERAN","HOME BASE":"DOMISILI",
  "What I Do":"Yang Saya Kerjakan","Digital Presence":"Kehadiran Digital","Technology":"Teknologi","Work / Collaborate":"Bekerja / Berkolaborasi","Stay connected":"Tetap Terhubung","Contact page":"Halaman Kontak","General WhatsApp":"WhatsApp Umum","Privacy by default":"Privasi sebagai standar",
  "Finance Foundation":"Fondasi Keuangan","AI Focused":"Berfokus pada AI","Purpose Driven":"Berorientasi pada Tujuan","Years":"Tahun","Projects":"Proyek","Certifications":"Sertifikasi","Focused":"Fokus","Driven":"Berorientasi",
  "About / The Story":"Tentang / Cerita","Expertise / Capability Stack":"Keahlian / Kapabilitas","Experience / Career Journey":"Pengalaman / Perjalanan Karier","Projects / Proof of Work":"Proyek / Bukti Karya","Insights":"Insight",
  "A deeper look at the person, principles and trajectory behind the public portfolio.":"Gambaran lebih dalam tentang pribadi, prinsip, dan arah perjalanan di balik portofolio publik.",
  "Finance is the foundation. Building is the direction.":"Finance adalah fondasi. Building adalah arah.",
  "I am a finance professional building toward a broader stack across business, technology, communication and ownership.":"Saya adalah profesional finance yang sedang membangun kapabilitas lebih luas di bidang bisnis, teknologi, komunikasi, dan ownership.",
  "My foundation is accounting, tax, reporting and finance operations. The next layer is learning how financial information becomes better business decisions—and how technology and AI can turn good decisions into scalable systems.":"Fondasi saya adalah accounting, tax, reporting, dan finance operations. Lapisan berikutnya adalah memahami bagaimana informasi keuangan menjadi keputusan bisnis yang lebih baik—serta bagaimana teknologi dan AI dapat mengubah keputusan yang baik menjadi sistem yang scalable.",
  "I am deliberately building a body of work in public: projects, analyses, experiments, systems and lessons. The goal is not to look accomplished; it is to become genuinely useful and let evidence compound.":"Saya sengaja membangun body of work secara terbuka: proyek, analisis, eksperimen, sistem, dan pembelajaran. Tujuannya bukan sekadar terlihat berhasil; tetapi menjadi benar-benar berguna dan membiarkan bukti berkembang secara kumulatif.",
  "Long term, I want my work to create both economic value and meaningful contribution—building, serving, growing and giving with purpose.":"Dalam jangka panjang, saya ingin pekerjaan saya menciptakan nilai ekonomi sekaligus kontribusi yang bermakna—membangun, melayani, bertumbuh, dan memberi dengan tujuan.",
  "Master the foundation":"Kuasai fondasi","Build leverage":"Bangun leverage","Turn value into impact":"Ubah nilai menjadi dampak","Finance authority":"Otoritas finance","Business + technology":"Bisnis + teknologi","Visible body of work":"Body of work yang terlihat",
  "A stack built for leverage.":"Kapabilitas yang dibangun untuk leverage.","Established finance capability forms the base; business, data, AI and communication are the layers being intentionally compounded.":"Kapabilitas finance yang sudah terbentuk menjadi fondasi; bisnis, data, AI, dan komunikasi adalah lapisan yang sengaja dikembangkan secara kumulatif.",
  "Financial reporting, accounting operations, tax compliance and controls.":"Pelaporan keuangan, operasional accounting, kepatuhan pajak, dan controls.",
  "Turning financial data into clear management insight, decisions and business narratives.":"Mengubah data keuangan menjadi insight manajemen, keputusan, dan business narrative yang jelas.",
  "Developing capability across FP&A, budgeting, forecasting, business partnering, valuation and strategic finance.":"Mengembangkan kapabilitas di FP&A, budgeting, forecasting, business partnering, valuation, dan strategic finance.",
  "Applying AI, automation, data workflows and software thinking to remove repetitive work and increase leverage.":"Menerapkan AI, automation, data workflows, dan software thinking untuk mengurangi pekerjaan repetitif dan meningkatkan leverage.",
  "Turning problems into offers, systems and ventures with commercial logic, execution discipline and measurable outcomes.":"Mengubah masalah menjadi penawaran, sistem, dan venture dengan logika komersial, disiplin eksekusi, dan outcome yang terukur.",
  "Making complex finance and business ideas understandable through writing, presentations, visual storytelling and content.":"Membuat ide finance dan bisnis yang kompleks lebih mudah dipahami melalui tulisan, presentasi, visual storytelling, dan konten.",
  "A finance career in progress.":"Perjalanan karier finance yang terus berkembang.","A foundation in accounting and tax, deliberately expanding toward financial decision support, business building and technology.":"Fondasi accounting dan tax yang terus diperluas menuju financial decision support, business building, dan technology.",
  "Finance, accounting and tax responsibilities in the coal mining industry, with a focus on reporting, compliance, controls and decision support.":"Tanggung jawab finance, accounting, dan tax di industri pertambangan batubara, dengan fokus pada reporting, compliance, controls, dan decision support.",
  "Progressive experience across accounting, tax, reporting, ERP/accounting systems and finance operations.":"Pengalaman berkembang di accounting, tax, reporting, ERP/accounting systems, dan finance operations.",
  "Building an international trading and resource-supply venture alongside a professional finance career.":"Membangun venture international trading dan resource supply di samping karier profesional di bidang finance.",
  "Proof of work, built in public.":"Bukti karya, dibangun secara terbuka.","Only explicitly published projections appear here. Private and draft work remains in the Personal OS.":"Hanya karya yang secara eksplisit dipublikasikan yang tampil di sini. Pekerjaan private dan draft tetap berada di Personal OS.",
  "Selected projects and current builds by Yusuf B. Situmorang.":"Proyek pilihan dan pembangunan terkini oleh Yusuf B. Situmorang.",
  "Current builds":"Pembangunan saat ini","Published proof":"Bukti yang dipublikasikan","PUBLISHED":"DIPUBLIKASIKAN","Currently building":"Sedang dibangun",
  "Ideas worth sharing.":"Ide yang layak dibagikan.","The content library will grow as the public body of work grows. For now, this page is the central map of where the conversations happen.":"Pustaka konten akan berkembang seiring bertumbuhnya body of work publik. Untuk saat ini, halaman ini menjadi pusat untuk menemukan tempat berbagai percakapan berlangsung.",
  "Professional authority":"Otoritas profesional","Personal brand and visual storytelling":"Personal brand dan visual storytelling","Short-form ideas and experiments":"Ide dan eksperimen short-form","Long-form analysis and deep dives":"Analisis mendalam dan long-form",
  "The objective is not to collect certificates or decorate a profile. It is to create a visible trail of useful work.":"Tujuannya bukan mengumpulkan sertifikat atau menghias profil. Tujuannya adalah menciptakan jejak karya yang berguna dan dapat terlihat.",
  "Every major claim should eventually have a project, result, case study, credential, or other evidence behind it.":"Setiap klaim utama pada akhirnya harus memiliki proyek, hasil, case study, credential, atau bukti lain di belakangnya.",
  "The portfolio starts from zero by design. New work will be documented as it becomes real and useful.":"Portofolio ini dirancang untuk berkembang dari nol. Karya baru akan didokumentasikan ketika benar-benar menjadi nyata dan berguna.",
  "Skills, audience, relationships, assets and ownership should reinforce one another over time.":"Skills, audience, relationships, assets, dan ownership harus saling memperkuat dari waktu ke waktu.",
  "Turning complexity into clarity.":"Mengubah kompleksitas menjadi kejelasan.","I connect finance, business thinking and emerging technology to make better decisions, build useful systems and create measurable value.":"Saya menghubungkan finance, business thinking, dan emerging technology untuk membuat keputusan yang lebih baik, membangun sistem yang berguna, dan menciptakan nilai yang terukur.",
  "Accounting, tax, financial analysis, reporting, controls and decision support.":"Accounting, tax, financial analysis, reporting, controls, dan decision support.",
  "Strategy, operating systems, venture building, commercial thinking and growth.":"Strategy, operating systems, venture building, commercial thinking, dan growth.",
  "AI-assisted workflows, automation, data and software experiments that turn ideas into leverage.":"AI-assisted workflows, automation, data, dan software experiments yang mengubah ide menjadi leverage.",
  "Follow the work as it compounds.":"Ikuti perkembangan karya ini seiring nilainya bertumbuh.","The public portfolio is one layer of a wider body of work. Follow the channels where I share ideas, experiments, lessons and new projects.":"Portofolio publik adalah salah satu lapisan dari body of work yang lebih luas. Ikuti kanal tempat saya membagikan ide, eksperimen, pembelajaran, dan proyek baru.",
  "Building the system behind the journey.":"Membangun sistem di balik perjalanan.","Yusuf OS is the private operating system behind the public platform—tracking personal value, career capital, execution, wealth and purpose with an AI-assisted decision layer.":"Yusuf OS adalah operating system private di balik platform publik—melacak personal value, career capital, execution, wealth, dan purpose dengan lapisan keputusan berbantuan AI.",
  "AI Chief of Staff":"AI Chief of Staff","Reviews, bottleneck detection and next-best actions.":"Reviews, deteksi bottleneck, dan next-best actions.","Open Build":"Open Build","Selected technical experiments and future proof-of-work.":"Eksperimen teknis pilihan dan future proof-of-work.","Build in Public":"Build in Public","Documenting what I learn and build across media.":"Mendokumentasikan apa yang saya pelajari dan bangun melalui berbagai media.",
  "Choose the reason you're reaching out.":"Pilih alasan Anda menghubungi saya.","Contextual WhatsApp messages make it easier for you to start a useful conversation—and easier for me to understand what you need.":"Pesan WhatsApp yang kontekstual memudahkan Anda memulai percakapan yang berguna—dan membantu saya memahami kebutuhan Anda.",
  "For hiring, consulting, collaboration or speaking, start with a contextual WhatsApp message.":"Untuk hiring, consulting, collaboration, atau speaking, mulai dengan pesan WhatsApp yang kontekstual.",
  "For consulting, finance/business projects and professional engagements.":"Untuk consulting, proyek finance/business, dan professional engagement.",
  "For recruiters and employers exploring relevant roles, interviews or talent conversations.":"Untuk recruiter dan employer yang mengeksplorasi role, interview, atau percakapan talent yang relevan.",
  "For partnerships, products, content, business ventures and strategic collaborations.":"Untuk partnership, product, content, business venture, dan strategic collaboration.",
  "For speaking, knowledge-sharing, interviews, podcasts and creator collaborations.":"Untuk speaking, knowledge-sharing, interview, podcast, dan creator collaboration.",
  "General WhatsApp":"WhatsApp Umum","Discuss an Opportunity":"Diskusikan Peluang","Open Insights Hub":"Buka Pusat Insight","Explore Projects":"Jelajahi Proyek","Discuss this project":"Diskusikan proyek ini",
  "Build. Serve. Grow. Give.":"Build. Serve. Grow. Give.","Finance • Business • Technology • Purpose":"Finance • Business • Technology • Purpose",
  "Finance • accounting & tax":"Finance • accounting & tax","Reporting • tax • controls":"Reporting • tax • controls","Automation • data • software":"Automation • data • software","Build • Serve • Grow • Give":"Build • Serve • Grow • Give"
};

const reverse: Record<string, string> = Object.fromEntries(
  Object.entries(translations).map(([en, id]) => [id, en])
);

const originals = new WeakMap<Text, string>();

function walkTextNodes(root: Node, callback: (node: Text) => void) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node) {
    const parent = node.parentElement;
    if (parent && !parent.closest(".language-switcher") && !["SCRIPT","STYLE","NOSCRIPT"].includes(parent.tagName)) {
      callback(node);
    }
    node = walker.nextNode() as Text | null;
  }
}

function applyLanguage(lang: Lang) {
  document.documentElement.lang = lang;
  walkTextNodes(document.body, (node) => {
    const current = node.textContent ?? "";
    if (!originals.has(node) && current.trim()) originals.set(node, current);
    const original = originals.get(node) ?? current;
    const trimmed = original.trim();
    if (!trimmed || trimmed.length > 220) return;
    const mapped = lang === "id" ? translations[trimmed] : reverse[trimmed];
    if (!mapped) return;
    const leading = original.match(/^\s*/)?.[0] ?? "";
    const trailing = original.match(/\s*$/)?.[0] ?? "";
    node.textContent = leading + mapped + trailing;
  });
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("yusuf-language");
    const next: Lang = saved === "id" ? "id" : "en";
    setLang(next);
    applyLanguage(next);

    const observer = new MutationObserver(() => applyLanguage(next));
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    applyLanguage(lang);
  }, [lang, pathname]);

  function change(next: Lang) {
    setLang(next);
    window.localStorage.setItem("yusuf-language", next);
    applyLanguage(next);
  }

  return (
    <div className="language-switcher" aria-label="Language selector">
      <Languages size={15} aria-hidden="true" />
      <button type="button" className={lang === "en" ? "selected" : ""} aria-pressed={lang === "en"} onClick={() => change("en")}>EN</button>
      <span>/</span>
      <button type="button" className={lang === "id" ? "selected" : ""} aria-pressed={lang === "id"} onClick={() => change("id")}>ID</button>
    </div>
  );
}
