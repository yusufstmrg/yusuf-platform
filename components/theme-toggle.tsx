"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "yusuf-theme";

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "light" || saved === "dark" ? saved : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.yusufTheme = theme;
  root.classList.toggle("yusuf-light", theme === "light");
  root.classList.toggle("yusuf-dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = readTheme();
    applyTheme(current);
    setTheme(current);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const next: Theme = event.newValue === "light" ? "light" : "dark";
      applyTheme(next);
      setTheme(next);
    };

    const onThemeChange = (event: Event) => {
      const next = (event as CustomEvent<Theme>).detail;
      if (next !== "light" && next !== "dark") return;
      applyTheme(next);
      setTheme(next);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("yusuf-theme-change", onThemeChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("yusuf-theme-change", onThemeChange);
    };
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent("yusuf-theme-change", { detail: next }));
    setTheme(next);
  }

  return (
    <button
      className="icon-btn theme-toggle"
      type="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      aria-pressed={theme === "light"}
      onClick={toggle}
    >
      {theme === "dark" ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
    </button>
  );
}
