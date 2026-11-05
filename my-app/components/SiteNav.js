"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollProgress from "@/components/ScrollProgress";
import { profile, socials } from "@/data/profile";

const links = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
];

export default function SiteNav() {
  const [current, setCurrent] = useState(null);
  const github = socials.find((social) => social.label === "GitHub");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setCurrent(id);
          // URL mengikuti section yang tampil. Landing page tanpa hash.
          const hash = id === "home" ? "" : `#${id}`;
          if (window.location.hash !== hash) {
            window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}${hash}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    // Semua section dipantau. Landing page dan Contact tidak punya link, jadi tidak ada yang menyala di sana.
    document.querySelectorAll("[data-page]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <div className="nav__left">
          <Link className="nav__name" href="/">{profile.name}&apos;s Portofolio</Link>
          <nav className="nav__links" aria-label="Main">
            {links.map((link) => (
              <Link key={link.id} href={`/#${link.id}`} aria-current={link.id === current ? "true" : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="nav__right">
          <a className="pill pill--ghost pill--sm nav__github" href={github.href} target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link className="pill pill--sm" href="/#contact">Contact</Link>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
