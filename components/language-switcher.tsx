"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const translations: Record<string, { en: string; id: string }> = {
  about: { en: "About", id: "Tentang" },
  expertise: { en: "Expertise", id: "Keahlian" },
  experience: { en: "Experience", id: "Pengalaman" },
  building: { en: "Building", id: "Membangun" },
  insights: { en: "Insights", id: "Insight" },
  projects: { en: "Projects", id: "Proyek" },
  resume: { en: "Resume", id: "CV" },
  contact: { en: "Contact Me", id: "Hubungi Saya" },
  explore: { en: "Explore My Work", id: "Lihat Karya Saya" },
  whatsapp: { en: "WhatsApp Me", id: "WhatsApp Saya" },
  story: { en: "Read My Story", id: "Baca Cerita Saya" },
  exploreExpertise: { en: "Explore Expertise", id: "Lihat Keahlian" },
  career: { en: "View Career Journey", id: "Lihat Perjalanan Karier" },
  resumeView: { en: "View My Resume", id: "Lihat CV Saya" },
  insightsHub: { en: "Open Insights Hub", id: "Buka Pusat Insight" },
};

function applyLanguage(lang: "en" | "id") {
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (key && translations[key]) node.textContent = translations[key][lang];
  });
  document.querySelectorAll<HTMLElement>("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (key && translations[key]) {
      node.setAttribute("aria-label", translations[key][lang]);
    }
  });
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"en" | "id">("en");

  useEffect(() => {
    const saved = (window.localStorage.getItem("yusuf-language") as "en" | "id" | null);
    const next = saved === "id" ? "id" : "en";
    setLang(next);
    applyLanguage(next);
  }, []);

  useEffect(() => {
    const saved = (window.localStorage.getItem("yusuf-language") as "en" | "id" | null);
    applyLanguage(saved === "id" ? "id" : lang);
  }, [pathname, lang]);

  function change(next: "en" | "id") {
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
