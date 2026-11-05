"use client";

import { useEffect } from "react";

// Elemen data-reveal di bawah layar disembunyikan oleh skrip ini lalu muncul satu per satu.
// Kalau skrip gagal jalan, semua isi tetap terlihat.
export default function Motion() {
  useEffect(() => {
    const items = [...document.querySelectorAll("[data-reveal]")].filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight * 0.9,
    );
    items.forEach((element) => element.classList.add("pre"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            entry.target.style.setProperty("--delay", `${index * 70}ms`);
            entry.target.classList.add("pre-done");
            entry.target.classList.remove("pre");
            observer.unobserve(entry.target);
          });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
