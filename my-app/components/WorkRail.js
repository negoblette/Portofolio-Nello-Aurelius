"use client";

import { useEffect, useRef, useState } from "react";

// Kartu project berjajar ke samping, supaya project baru tidak memanjangkan halaman.
export default function WorkRail({ children }) {
  const list = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const node = list.current;
    const update = () => {
      setEdges({
        start: node.scrollLeft <= 1,
        end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 1,
      });
    };
    update();
    node.addEventListener("scroll", update, { passive: true });
    const resized = new ResizeObserver(update);
    resized.observe(node);
    return () => {
      node.removeEventListener("scroll", update);
      resized.disconnect();
    };
  }, []);

  const move = (direction) => {
    const node = list.current;
    const step = node.firstElementChild.getBoundingClientRect().width + 24;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="rail">
      <ul className="work" ref={list}>{children}</ul>
      {!(edges.start && edges.end) && (
        <div className="rail__controls">
          <button type="button" aria-label="Previous projects" disabled={edges.start} onClick={() => move(-1)}>←</button>
          <button type="button" aria-label="More projects" disabled={edges.end} onClick={() => move(1)}>→</button>
        </div>
      )}
    </div>
  );
}
