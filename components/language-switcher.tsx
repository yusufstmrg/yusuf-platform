"use client";

import { Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const translations: Record<string, string> = {
  "About":"Tentang","Expertise":"Keahlian","Experience":"Pengalaman","Building":"Membangun","Insights":"Insight","Projects":"Proyek","Resume":"CV","Contact Me":"Hubungi Saya",
  "Explore My Work":"Lihat Karya Saya","WhatsApp Me":"WhatsApp Saya","Read My Story":"Baca Cerita Saya","Explore Expertise":"Lihat Keahlian","View Career Journey":"Lihat Perjalanan Karier","View My Resume":"Lihat CV Saya","Open Insights Hub":"Buka Pusat Insight",
  "Finance.":"Keuangan.","Business.":"Bisnis.","AI. Growth.":"AI. Pertumbuhan.","Finance Professional":"Profesional Keuangan","Builder":"Builder","Lifelong Learner":"Pembelajar Seumur Hidup",
  "Turning complexity into clarity.":"Mengubah kompleksitas menjadi kejelasan.","Numbers are only the beginning.":"Angka hanyalah permulaan.","A stack built for leverage.":"Kapabilitas yang dibangun untuk leverage.","A finance career in progress.":"Perjalanan karier keuangan yang terus berkembang.","Proof, not promises.":"Bukti, bukan janji.","Learning in public.":"Belajar secara terbuka.","Building the system behind the journey.":"Membangun sistem di balik perjalanan.","Choose the reason you're reaching out.":"Pilih alasan Anda menghubungi saya.","How this portfolio will compound.":"Bagaimana portofolio ini akan bertumbuh secara majemuk.",
  "Show, don’t tell":"Tunjukkan, jangan hanya katakan","Build in public":"Bangun secara terbuka","Compound value":"Nilai yang berlipat","Follow the work as it compounds.":"Ikuti perkembangan karya yang terus bertumbuh.",
  "View projects":"Lihat proyek","Back to Yusuf":"Kembali ke Yusuf","Back to projects":"Kembali ke proyek","Open WhatsApp":"Buka WhatsApp","Hire / Engage":"Hire / Engage","Career / Recruitment":"Karier / Rekrutmen","Collaborate":"Kolaborasi","Speaking / Content":"Speaking / Konten",
  "Currently building":"Sedang dibangun","In progress":"Sedang dikerjakan","Current state":"Status saat ini","Published proof":"Bukti yang dipublikasikan","Current builds":"Yang sedang dibangun","Proof of work, built in public.":"Bukti karya, dibangun secara terbuka.","Ideas worth sharing.":"Ide yang layak dibagikan.",
  "The Direction":"Arah","Career Capital Strategy":"Strategi Modal Karier","How the stack compounds":"Bagaimana kapabilitas ini bertumbuh","Discuss this project":"Diskusikan proyek ini","Interested in the work or want to collaborate?":"Tertarik dengan karya ini atau ingin berkolaborasi?",
  "Finance":"Keuangan","Business":"Bisnis","Technology & AI":"Teknologi & AI","Accounting & Tax":"Akuntansi & Pajak","Financial Analysis":"Analisis Keuangan","Corporate Finance":"Keuangan Korporasi","AI & Technology":"AI & Teknologi","Business Building":"Membangun Bisnis","Communication":"Komunikasi",
  "Home Base":"Domisili","POSITIONING":"POSITIONING","PHILOSOPHY":"FILOSOFI","ROLE":"PERAN","HOME BASE":"DOMISILI",
  "A deeper look at the person, principles and trajectory behind the public portfolio.":"Melihat lebih dekat pribadi, prinsip, dan arah perjalanan di balik portofolio publik.",
  "Finance is the foundation. Building is the direction.":"Finance adalah fondasi. Building adalah arah.",
  "A foundation in accounting and tax, deliberately expanding toward financial decision support, business building and technology.":"Fondasi di bidang akuntansi dan pajak yang terus diperluas menuju dukungan keputusan keuangan, pembangunan bisnis, dan teknologi.",
  "The Direction":"Arah", "Master the foundation":"Kuasai fondasi", "Build leverage":"Bangun leverage", "Turn value into impact":"Ubah nilai menjadi dampak",
  "A stack built for leverage.":"Kapabilitas yang dibangun untuk leverage.", "Established finance capability forms the base; business, data, AI and communication are the layers being intentionally compounded.":"Kapabilitas finance yang sudah kuat menjadi fondasi; bisnis, data, AI, dan komunikasi adalah lapisan yang sengaja terus dikembangkan.",
  "How the stack compounds":"Bagaimana kapabilitas ini bertumbuh", "Finance depth":"Kedalaman finance", "Technology + AI":"Teknologi + AI", "Communication + audience":"Komunikasi + audiens",
  "A finance career in progress.":"Perjalanan karier finance yang terus berkembang.", "Career Capital Strategy":"Strategi Modal Karier", "Finance authority":"Otoritas finance", "Business + technology":"Bisnis + teknologi", "Visible body of work":"Jejak karya yang terlihat",
  "Proof of work, built in public.":"Bukti karya, dibangun secara terbuka.", "Only explicitly published projections appear here. Private and draft work remains in the Personal OS.":"Hanya karya yang secara eksplisit dipublikasikan yang tampil di sini. Data privat dan draft tetap berada di Personal OS.",
  "Published proof":"Bukti yang dipublikasikan", "Current builds":"Yang sedang dibangun", "Have a project that could benefit from this skill stack?":"Punya proyek yang bisa mendapatkan manfaat dari kapabilitas ini?",
  "Practical ideas across finance, business, AI, career growth and purpose—shared while the underlying knowledge is being built.":"Gagasan praktis tentang finance, bisnis, AI, perkembangan karier, dan purpose—dibagikan sambil pengetahuan dasarnya terus dibangun.",
  "Professional authority":"Otoritas profesional","Personal brand":"Personal brand","Short-form ideas":"Ide short-form","Deep-dive content":"Konten mendalam","Open Insights Hub":"Buka Pusat Insight",
  "Follow the work as it compounds.":"Ikuti perkembangan karya yang terus bertumbuh.", "The public portfolio is one layer of a wider body of work. Follow the channels where I share ideas, experiments, lessons and new projects.":"Portofolio publik adalah salah satu lapisan dari keseluruhan karya. Ikuti kanal tempat saya membagikan ide, eksperimen, pelajaran, dan proyek baru.",
  "Building the system behind the journey.":"Membangun sistem di balik perjalanan.", "Reviews, bottleneck detection and next-best actions.":"Review, deteksi bottleneck, dan next-best actions.", "Selected technical experiments and future proof-of-work.":"Eksperimen teknis terpilih dan proof-of-work yang akan datang.", "Documenting what I learn and build across media.":"Mendokumentasikan apa yang saya pelajari dan bangun di berbagai media.",
  "Choose the reason you're reaching out.":"Pilih alasan Anda menghubungi saya.", "Contextual WhatsApp messages make it easier for you to start a useful conversation—and easier for me to understand what you need.":"Pesan WhatsApp yang kontekstual memudahkan Anda memulai percakapan yang relevan—dan memudahkan saya memahami kebutuhan Anda.",
  "For consulting, finance/business projects and professional engagements.":"Untuk konsultasi, proyek finance/bisnis, dan engagement profesional.","For recruiters and employers exploring relevant roles, interviews or talent conversations.":"Untuk recruiter dan perusahaan yang mengeksplorasi posisi, interview, atau percakapan talent yang relevan.","For partnerships, products, content, business ventures and strategic collaborations.":"Untuk partnership, produk, konten, venture bisnis, dan kolaborasi strategis.","For speaking, knowledge-sharing, interviews, podcasts and creator collaborations.":"Untuk speaking, knowledge-sharing, interview, podcast, dan kolaborasi creator.",
  "General WhatsApp":"WhatsApp Umum","Contact page":"Halaman Kontak","Open WhatsApp":"Buka WhatsApp",
  "Back to Public Profile":"Kembali ke Profil Publik","Public profile":"Profil publik","Yusuf Personal OS":"Yusuf Personal OS","Command your next move.":"Kendalikan langkah berikutnya.",
  "Today's Next Best Actions":"Today's Next Best Actions","90-Day Sprint progress":"Progress 90-Day Sprint","Personal Value score and movement":"Skor Personal Value dan perubahannya","Life Balance: Purpose, Career, Business, Wealth, Health, People":"Life Balance: Purpose, Career, Business, Wealth, Health, People","Current skill gaps":"Gap skill saat ini","Proof created":"Proof yang dibuat","Career pipeline":"Pipeline karier","Brand/content momentum":"Momentum brand/konten","Business pipeline and revenue":"Pipeline bisnis dan revenue","Financial freedom trajectory":"Jalur menuju financial freedom","AI executive brief":"AI executive brief",
  "Quick Capture":"Quick Capture","One operating system.":"Satu operating system.","Operating loop":"Operating loop","Plan → Execute → Capture → Prove → Measure → Review → Replan.":"Plan → Execute → Capture → Prove → Measure → Review → Replan.",
};

const keyTranslations: Record<string, [string,string]> = {
  about:["About","Tentang"], expertise:["Expertise","Keahlian"], experience:["Experience","Pengalaman"], building:["Building","Membangun"], insights:["Insights","Insight"], projects:["Projects","Proyek"], resume:["Resume","CV"], contact:["Contact Me","Hubungi Saya"],
  explore:["Explore My Work","Lihat Karya Saya"], whatsapp:["WhatsApp Me","WhatsApp Saya"], story:["Read My Story","Baca Cerita Saya"], exploreExpertise:["Explore Expertise","Lihat Keahlian"], career:["View Career Journey","Lihat Perjalanan Karier"], resumeView:["View My Resume","Lihat CV Saya"], insightsHub:["Open Insights Hub","Buka Pusat Insight"]
};

function applyLanguage(lang: "en" | "id") {
  document.documentElement.lang = lang;
  document.documentElement.dir = "ltr";

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    const entry = key ? keyTranslations[key] : undefined;
    if (entry) node.textContent = entry[lang === "en" ? 0 : 1];
  });

  const map = lang === "id" ? translations : Object.fromEntries(Object.entries(translations).map(([en,id]) => [id,en]));
  document.querySelectorAll<HTMLElement>("body *").forEach((node) => {
    if (node.children.length !== 0) return;
    if (node.hasAttribute("data-i18n")) return;
    const original = node.dataset.yusufI18nOriginal ?? node.textContent?.trim() ?? "";
    if (!original || original.length > 220) return;
    node.dataset.yusufI18nOriginal = original;
    const translated = map[original];
    if (translated) node.textContent = translated;
    else if (lang === "en" && node.textContent?.trim() !== original) node.textContent = original;
  });
}

export function LanguageSwitcher() {
  const [lang, setLang] = useState<"en" | "id">("en");
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("yusuf-language");
    const next = saved === "id" ? "id" : "en";
    setLang(next);
    applyLanguage(next);

    let queued = false;
    observerRef.current = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      queueMicrotask(() => { queued = false; applyLanguage(next); });
    });
    if (document.body) observerRef.current.observe(document.body, { childList: true, subtree: true });
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => { applyLanguage(lang); }, [lang]);

  function change(next: "en" | "id") {
    window.localStorage.setItem("yusuf-language", next);
    setLang(next);
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
