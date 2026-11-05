"use client";

import { useRef } from "react";

const RANGE = 260;
const LIFT = 0.17;

// Nama raksasa di footer: huruf di dekat kursor terangkat, seperti melawan gravitasi.
export default function FootWordmark({ name }) {
  const root = useRef(null);
  const frame = useRef(0);

  const letters = () => [...root.current.children];

  const move = (event) => {
    const x = event.clientX;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      for (const letter of letters()) {
        const box = letter.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - x);
        const lift = Math.max(0, 1 - distance / RANGE) * LIFT;
        letter.style.transform = `translateY(${-lift}em)`;
      }
    });
  };

  const rest = () => {
    cancelAnimationFrame(frame.current);
    for (const letter of letters()) letter.style.transform = "";
  };

  return (
    <p className="wordmark" ref={root} aria-label={name} onPointerMove={move} onPointerLeave={rest}>
      {[...name].map((letter, index) => (
        <span key={`${letter}-${index}`} aria-hidden="true">{letter === " " ? " " : letter}</span>
      ))}
    </p>
  );
}
