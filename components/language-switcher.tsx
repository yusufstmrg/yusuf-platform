"use client";

import { Languages } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

const idByEnglish: Record<string,string> = {
  "About":"Tentang","Expertise":"Keahlian","Experience":"Pengalaman","Building":"Membangun","Insights":"Insight","Projects":"Proyek","Resume":"CV","Contact Me":"Hubungi Saya",
  "Explore My Work":"Jelajahi Karya Saya","WhatsApp Me":"WhatsApp Saya","Read My Story":"Baca Cerita Saya","Explore Expertise":"Jelajahi Keahlian","View Career Journey":"Lihat Perjalanan Karier","View My Resume":"Lihat CV Saya","Open Insights Hub":"Buka Pusat Insight",
  "Finance Professional":"Profesional Finance","Builder":"Builder","Lifelong Learner":"Pembelajar Seumur Hidup","Finance.":"Keuangan.","Business.":"Bisnis.","AI. Growth.":"AI. Pertumbuhan.",
  "Turning Complexity":"Mengubah Kompleksitas","Into Clarity.":"Menjadi Kejelasan.","Numbers are only the beginning.":"Angka hanyalah permulaan.","A stack built for leverage.":"Kapabilitas yang dibangun untuk leverage.","A finance career in progress.":"Perjalanan karier finance yang terus berkembang.","Proof, not promises.":"Bukti, bukan janji.","Learning in public.":"Belajar secara terbuka.","Building the system behind the journey.":"Membangun sistem di balik perjalanan.","How this portfolio will compound.":"Bagaimana portofolio ini akan bertumbuh secara majemuk.","Show, don’t tell":"Tunjukkan, jangan hanya katakan","Build in public":"Bangun secara terbuka","Compound value":"Nilai yang berlipat","Choose the reason you’re reaching out.":"Pilih alasan Anda menghubungi saya.",
  "Back to Yusuf":"Kembali ke Yusuf","Open WhatsApp":"Buka WhatsApp","Hire / Engage":"Hire / Engage","Career / Recruitment":"Karier / Rekrutmen","Collaborate":"Kolaborasi","Speaking / Content":"Speaking / Konten",
  "Finance":"Finance","Business":"Bisnis","Technology & AI":"Teknologi & AI","Accounting & Tax":"Akuntansi & Pajak","Financial Analysis":"Analisis Keuangan","Corporate Finance":"Keuangan Korporasi","AI & Technology":"AI & Teknologi","Business Building":"Membangun Bisnis","Communication":"Komunikasi",
  "Finance is the foundation. Building is the direction.":"Finance adalah fondasi. Building adalah arah.","Master the foundation":"Kuasai fondasi","Build leverage":"Bangun leverage","Turn value into impact":"Ubah nilai menjadi dampak","Ideas worth sharing.":"Ide yang layak dibagikan."
};

const keyMap: Record<string,[string,string]> = {
  about:["About","Tentang"], expertise:["Expertise","Keahlian"], experience:["Experience","Pengalaman"], building:["Building","Membangun"], insights:["Insights","Insight"], projects:["Projects","Proyek"], resume:["Resume","CV"], contact:["Contact Me","Hubungi Saya"],
  explore:["Explore My Work","Jelajahi Karya Saya"], whatsapp:["WhatsApp Me","WhatsApp Saya"], story:["Read My Story","Baca Cerita Saya"], exploreExpertise:["Explore Expertise","Jelajahi Keahlian"], career:["View Career Journey","Lihat Perjalanan Karier"], resumeView:["View My Resume","Lihat CV Saya"], insightsHub:["Open Insights Hub","Buka Pusat Insight"]
};
const enById = Object.fromEntries(Object.entries(idByEnglish).map(([en,id])=>[id,en]));
const getLanguage = () => (typeof window !== "undefined" && window.localStorage.getItem("yusuf-language")==="id" ? "id" : "en") as "en"|"id";

function subscribeLanguage(onStoreChange:()=>void){
  window.addEventListener("yusuf-language-change",onStoreChange);
  window.addEventListener("storage",onStoreChange);
  return()=>{window.removeEventListener("yusuf-language-change",onStoreChange);window.removeEventListener("storage",onStoreChange);};
}
function translateDocument(lang:"en"|"id"){
  document.documentElement.lang=lang;
  const toEnglish=(value:string)=>idByEnglish[value]?value:(enById[value]??value);
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach(node=>{const pair=node.dataset.i18n?keyMap[node.dataset.i18n]:undefined;if(pair)node.textContent=pair[lang==="en"?0:1];});
  document.querySelectorAll<HTMLElement>("body *").forEach(node=>{
    if(node.children.length!==0||node.hasAttribute("data-i18n"))return;
    const stored=node.dataset.yusufI18nOriginal;
    const english=toEnglish(stored??node.textContent?.trim()??"");
    if(!english||english.length>240)return;
    node.dataset.yusufI18nOriginal=english;
    const translated=lang==="id"?idByEnglish[english]:english;
    if(translated&&translated!==node.textContent)node.textContent=translated;
  });
}

export function LanguageSwitcher(){
  const lang=useSyncExternalStore(subscribeLanguage,getLanguage,()=> "en" as const);
  useEffect(()=>{
    let applying=false;
    const apply=()=>{if(applying)return;applying=true;translateDocument(getLanguage());applying=false;};
    apply();
    const observer=new MutationObserver(apply);
    observer.observe(document.body,{childList:true,subtree:true});
    return()=>observer.disconnect();
  },[]);
  function change(next:"en"|"id"){
    window.localStorage.setItem("yusuf-language",next);
    translateDocument(next);
    window.dispatchEvent(new Event("yusuf-language-change"));
  }
  return <div className="language-switcher" aria-label="Language selector"><Languages size={14}/><button type="button" className={lang==="en"?"selected":""} aria-pressed={lang==="en"} onClick={()=>change("en")}>EN</button><span>/</span><button type="button" className={lang==="id"?"selected":""} aria-pressed={lang==="id"} onClick={()=>change("id")}>ID</button></div>;
}
