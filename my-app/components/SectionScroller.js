"use client";

import { useEffect } from "react";

const DURATION = 950;
const COOLDOWN = 260;
const NAV_HEIGHT = 65;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Di desktop, satu scroll berpindah satu section penuh. Section yang lebih tinggi dari layar
// tetap bisa di-scroll biasa dulu, lalu pindah saat sudah sampai ujungnya.
export default function SectionScroller() {
  useEffect(() => {
    const root = document.documentElement;
    const pages = [...document.querySelectorAll("[data-page]")];
    const desktop = window.matchMedia("(min-width: 861px)");
    let busy = false;
    let timer = 0;
    let frame = 0;

    const topOf = (page, index) =>
      index === 0 ? 0 : Math.round(page.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT);

    const currentIndex = () => {
      const middle = window.scrollY + window.innerHeight / 2;
      let found = 0;
      pages.forEach((page, index) => {
        if (page.getBoundingClientRect().top + window.scrollY <= middle) found = index;
      });
      return found;
    };

    const goTo = (index) => {
      const next = Math.min(pages.length - 1, Math.max(0, index));
      const from = window.scrollY;
      const to = topOf(pages[next], next);
      if (busy || Math.abs(to - from) < 2) return;

      busy = true;
      const start = performance.now();
      const finish = () => {
        cancelAnimationFrame(frame);
        clearTimeout(timer);
        window.scrollTo(0, to);
        setTimeout(() => { busy = false; }, COOLDOWN);
      };
      const step = (now) => {
        const progress = Math.min(1, (now - start) / DURATION);
        window.scrollTo(0, from + (to - from) * ease(progress));
        if (progress < 1) frame = requestAnimationFrame(step);
        else finish();
      };
      frame = requestAnimationFrame(step);
      timer = setTimeout(finish, DURATION + 300);
    };

    const canScrollInside = (page, index, direction) => {
      const top = topOf(page, index);
      const bottom = top + page.offsetHeight + NAV_HEIGHT - window.innerHeight;
      if (bottom <= top + 2) return false;
      return direction > 0 ? window.scrollY < bottom - 2 : window.scrollY > top + 2;
    };

    const move = (direction, event) => {
      const index = currentIndex();
      if (busy) {
        event.preventDefault();
        return;
      }
      if (canScrollInside(pages[index], index, direction)) return;
      event.preventDefault();
      goTo(index + direction);
    };

    const onWheel = (event) => {
      if (!desktop.matches || event.ctrlKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || Math.abs(event.deltaY) < 4) return;
      move(event.deltaY > 0 ? 1 : -1, event);
    };

    const onKey = (event) => {
      if (!desktop.matches || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      if (target.closest?.("input, textarea")) return;
      if (event.key === " " && target.closest?.("a, button")) return;
      if (["ArrowDown", "PageDown", " "].includes(event.key)) move(event.shiftKey ? -1 : 1, event);
      else if (["ArrowUp", "PageUp"].includes(event.key)) move(-1, event);
      else if (event.key === "Home") { event.preventDefault(); goTo(0); }
      else if (event.key === "End") { event.preventDefault(); goTo(pages.length - 1); }
    };

    const onClick = (event) => {
      if (!desktop.matches) return;
      const link = event.target.closest?.('a[href^="#"], a[href^="/#"], a[href="/"]');
      if (!link) return;
      const target = link.getAttribute("href").replace(/^\//, "") || "#home";
      const page = document.querySelector(target);
      const index = pages.indexOf(page);
      if (index < 0) return;
      // Tahan klik di sini supaya scroll halus tidak bentrok dengan lompatan bawaan Link.
      event.preventDefault();
      event.stopPropagation();
      goTo(index);
    };

    const syncMode = () => root.classList.toggle("has-pager", desktop.matches);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle("is-active", entry.isIntersecting);
      },
      { rootMargin: "-46% 0px -46% 0px" },
    );

    syncMode();
    pages.forEach((page) => observer.observe(page));
    desktop.addEventListener("change", syncMode);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      observer.disconnect();
      root.classList.remove("has-pager");
      desktop.removeEventListener("change", syncMode);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
