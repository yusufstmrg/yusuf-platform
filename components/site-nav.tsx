"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

const links = [
  ["About", "/about", "about"],
  ["Expertise", "/expertise", "expertise"],
  ["Experience", "/experience", "experience"],
  ["Building", "#building", "building"],
  ["Insights", "/insights", "insights"],
  ["Projects", "/projects", "projects"],
  ["Resume", "/resume", "resume"],
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const resolveHref = (href: string) => href === "#building" && pathname !== "/" ? "/#building" : href;

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="container nav-inner">
        <Link className="brand" href="/" aria-label="Yusuf B. Situmorang home">YUSUF<span>.</span></Link>
        <div className="nav-links">
          {links.map(([label, href, key]) => (
            <Link
              className={((pathname === "/" && label === "About") || (href !== "#building" && pathname.startsWith(href))) ? "active" : ""}
              key={label}
              href={resolveHref(href)}
              data-i18n={key}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <Link className="nav-cta" href="/contact" data-i18n="contact">Contact Me</Link>
          <LanguageSwitcher />
          <ThemeToggle />
          <button className="icon-btn nav-menu-trigger" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-navigation" className="mobile-nav-panel">
          {links.map(([label, href, key]) => (
            <Link key={label} href={resolveHref(href)} onClick={() => setOpen(false)} data-i18n={key}>{label}</Link>
          ))}
          <div className="mobile-controls">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Link className="mobile-nav-cta" href="/contact" onClick={() => setOpen(false)} data-i18n="contact">Contact Me</Link>
        </div>
      )}
    </nav>
  );
}
