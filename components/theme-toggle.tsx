"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("yusuf-theme") as Theme | null;
    const current = saved === "light" || saved === "dark"
      ? saved
      : (document.documentElement.dataset.theme as Theme) || "dark";
    document.documentElement.dataset.theme = current;
    document.documentElement.style.colorScheme = current;
    setTheme(current);
  }, []);

  function setDocumentTheme(next: Theme) {
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    window.localStorage.setItem("yusuf-theme", next);
    window.dispatchEvent(new CustomEvent("yusuf-theme-change", { detail: next }));
    setTheme(next);
  }

  function toggle() {
    setDocumentTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      className="icon-btn"
      type="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      onClick={toggle}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
