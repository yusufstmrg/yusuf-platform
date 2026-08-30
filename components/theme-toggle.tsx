"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";
const getTheme=():Theme => typeof window !== "undefined" && window.localStorage.getItem("yusuf-theme")==="light" ? "light" : "dark";
const subscribeTheme=(onStoreChange:()=>void)=>{window.addEventListener("yusuf-theme-change",onStoreChange);window.addEventListener("storage",onStoreChange);return()=>{window.removeEventListener("yusuf-theme-change",onStoreChange);window.removeEventListener("storage",onStoreChange);};};

export function ThemeToggle(){
  const theme=useSyncExternalStore(subscribeTheme,getTheme,()=> "dark" as const);
  function toggle(){
    const next:Theme=theme==="dark"?"light":"dark";
    document.documentElement.dataset.theme=next;
    document.documentElement.style.colorScheme=next;
    window.localStorage.setItem("yusuf-theme",next);
    window.dispatchEvent(new Event("yusuf-theme-change"));
  }
  return <button className="icon-btn" type="button" aria-label={theme==="dark"?"Switch to light mode":"Switch to dark mode"} title={theme==="dark"?"Light mode":"Dark mode"} onClick={toggle}>{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button>;
}
