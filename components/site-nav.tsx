"use client";

import Link from "next/link";
import { Menu, Moon, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["About", "/about"],
  ["Expertise", "/expertise"],
  ["Experience", "/experience"],
  ["Building", "#building"],
  ["Insights", "/insights"],
  ["Projects", "/projects"],
  ["Resume", "/resume"],
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dim, setDim] = useState(false);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="container nav-inner">
        <Link className="brand" href="/" aria-label="Yusuf B. Situmorang home">YUSUF<span>.</span></Link>
        <div className="nav-links">
          {links.map(([label, href]) => <Link className={((pathname === "/" && label === "About") || (href !== "/#building" && pathname.startsWith(href))) ? "active" : ""} key={label} href={href}>{label}</Link>)}
        </div>
        <div className="nav-actions">
          <Link className="nav-cta" href="/contact">Contact Me</Link>
          <button className="icon-btn" type="button" aria-label={dim ? "Restore contrast" : "Dim interface"} onClick={() => setDim((v) => !v)}><Moon size={18} /></button>
          <button className="icon-btn nav-menu-trigger" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {open && (
        <div className="mobile-nav-panel">
          {links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="mobile-nav-cta" href="/contact" onClick={() => setOpen(false)}>Contact Me</Link>
        </div>
      )}
      {dim && <style jsx global>{`
        body{filter:saturate(.82)}
        .site-nav{background:rgba(4,12,21,.92)!important}
        .site-nav .brand,.site-nav a,.site-nav button{color:#fff}
      `}</style>}
    </nav>
  );
}
