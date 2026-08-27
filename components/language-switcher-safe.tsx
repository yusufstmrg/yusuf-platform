"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

type Lang = "en" | "id";

const COPY: Record<string, string> = {
  About: "Tentang",
  Expertise: "Keahlian",
  Experience: "Pengalaman",
  Building: "Membangun",
  Insights: "Insight",
  Projects: "Proyek",
  Resume: "CV",
  "Contact Me": "Hubungi Saya",
  "Explore My Work": "Jelajahi Karya Saya",
  "WhatsApp Me": "WhatsApp Saya",
  "Read My Story": "Baca Cerita Saya",
  "Explore Expertise": "Jelajahi Keahlian",
  "View Career Journey": "Lihat Perjalanan Karier",
  "View My Resume": "Lihat CV Saya",
  "Open Insights Hub": "Buka Pusat Insight",
  "Finance Professional": "Profesional Keuangan",
  Builder: "Builder",
  "Lifelong Learner": "Pembelajar Seumur Hidup",
  "Turning complexity into clarity.": "Mengubah kompleksitas menjadi kejelasan.",
  "Numbers are only the beginning.": "Angka hanyalah permulaan.",
  "A stack built for leverage.": "Kapabilitas yang dibangun untuk leverage.",
  "A finance career in progress.": "Perjalanan karier keuangan yang terus berkembang.",
  "Proof, not promises.": "Bukti, bukan janji.",
  "Learning in public.": "Belajar secara terbuka.",
  "Building the system behind the journey.": "Membangun sistem di balik perjalanan.",
  "How this portfolio will compound.": "Bagaimana portofolio ini akan bertumbuh.",
  "Show, don’t tell": "Tunjukkan, jangan hanya katakan",
  "Build in public": "Bangun secara terbuka",
  "Compound value": "Nilai yang berlipat",
  "Home Base": "Domisili",
  Technology: "Teknologi",
  "Finance & Money": "Finance & Keuangan",
  "Business & Entrepreneurship": "Bisnis & Entrepreneurship",
  "AI & Technology": "AI & Teknologi",
  "Career & Growth": "Karier & Growth",
  "Life, Values & Purpose": "Kehidupan, Nilai & Tujuan",
  "Professional authority": "Otoritas profesional",
  "Personal brand": "Personal brand",
  "Short-form ideas": "Ide short-form",
  "Deep-dive content": "Konten mendalam",
  "Build. Serve. Grow. Give.": "Build. Serve. Grow. Give.",
  "Finance • Business • Technology • Purpose": "Finance • Business • Technology • Purpose",
  "Finance • accounting & tax": "Finance • accounting & tax",
  "Reporting • tax • controls": "Reporting • tax • controls",
  "Automation • data • software": "Automation • data • software",
  "Build • Serve • Grow • Give": "Build • Serve • Grow • Give",
};

function rememberOriginals() {
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    if (!el.dataset.i18nOriginal) el.dataset.i18nOriginal = el.textContent ?? "";
  });
}

function applyLanguage(lang: Lang) {
  rememberOriginals();
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const original = el.dataset.i18nOriginal ?? "";
    el.textContent = lang === "id" ? COPY[original] ?? original : original;
  });
}

export function LanguageSwitcherSafe() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("yusuf-language");
    const current: Lang = saved === "id" ? "id" : "en";
    setLang(current);
    applyLanguage(current);
  }, []);

  useEffect(() => {
    applyLanguage(lang);
  }, [lang]);

  const change = (next: Lang) => {
    setLang(next);
    window.localStorage.setItem("yusuf-language", next);
    applyLanguage(next);
  };

  return (
    <div className="language-switcher" aria-label="Language selector">
      <Languages size={15} aria-hidden="true" />
      <button type="button" className={lang === "en" ? "selected" : ""} aria-pressed={lang === "en"} onClick={() => change("en")}>EN</button>
      <span>/</span>
      <button type="button" className={lang === "id" ? "selected" : ""} aria-pressed={lang === "id"} onClick={() => change("id")}>ID</button>
    </div>
  );
}
