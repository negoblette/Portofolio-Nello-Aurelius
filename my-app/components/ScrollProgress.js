"use client";

import { useEffect, useRef } from "react";

// Menggantikan scrollbar: bar di bawah nav mengikuti posisi scroll halaman.
export default function ScrollProgress() {
  const root = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // Saat berpindah halaman elemennya bisa sudah tidak ada.
      const node = root.current;
      if (!node) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      node.style.setProperty("--progress", progress.toFixed(4));
      node.dataset.started = progress > 0.005 ? "true" : "false";
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <div className="progress" ref={root} aria-hidden="true">
      <div className="progress__bar" />
    </div>
  );
}
