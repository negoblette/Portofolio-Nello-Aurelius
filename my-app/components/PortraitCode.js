"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { portrait } from "@/data/profile";

const CELL_W = 5;
const CELL_H = 9;
// Urut dari yang tipis ke yang padat, supaya terang-gelap wajah tetap terbaca.
const GLYPHS = ".:-;=+<>/*{}[]01#%@";
const BAND = 5;
const LENS = 120;
const FOCUS_Y = 0.1; // sama dengan object-position foto, supaya lensa pas di wajah

function makeAtlas(colour, dpr) {
  const atlas = document.createElement("canvas");
  atlas.width = GLYPHS.length * CELL_W * dpr;
  atlas.height = CELL_H * dpr;
  const ctx = atlas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = `${CELL_H}px ui-monospace, Menlo, Consolas, monospace`;
  ctx.textBaseline = "top";
  ctx.fillStyle = colour;
  [...GLYPHS].forEach((glyph, index) => ctx.fillText(glyph, index * CELL_W, 0));
  return atlas;
}

const glyphFor = (light) => {
  const start = Math.round(light * (GLYPHS.length - BAND));
  return start + Math.floor(Math.random() * BAND);
};

// Foto sudah tanpa latar, jadi setiap sel yang terisi adalah bagian dari sosoknya.
function readCells(image, width, height) {
  const cols = Math.floor(width / CELL_W);
  const rows = Math.floor(height / CELL_H);
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (image.naturalWidth - sw) / 2;
  const sy = (image.naturalHeight - sh) * FOCUS_Y;

  const sample = document.createElement("canvas");
  sample.width = cols;
  sample.height = rows;
  const ctx = sample.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, cols, rows);
  const { data } = ctx.getImageData(0, 0, cols, rows);

  const cells = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = (y * cols + x) * 4;
      if (data[i + 3] < 110) continue;
      // Dicerahkan supaya kulit jauh lebih terang dari rambut dan jas.
      const light = Math.min(1, ((data[i] + data[i + 1] + data[i + 2]) / 765) * 1.5);
      const hx = x * CELL_W;
      const hy = y * CELL_H;
      cells.push({
        hx,
        hy,
        x: hx + (Math.random() - 0.5) * width * 1.4,
        y: hy + (Math.random() - 0.5) * height * 1.4,
        vx: 0,
        vy: 0,
        light,
        alpha: 0.18 + Math.pow(light, 1.4) * 0.82,
        glyph: glyphFor(light),
      });
    }
  }
  return cells;
}

export default function PortraitCode() {
  const [open, setOpen] = useState(false);
  const stage = useRef(null);
  const canvas = useRef(null);
  const pointer = useRef(null);

  useEffect(() => {
    const node = canvas.current;
    const ctx = node.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const atlas = makeAtlas("#ededed", dpr);
    const accent = makeAtlas("#62a6ff", dpr);
    const image = new window.Image();
    let cells = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let tick = 0;
    let visible = false;
    let moving = true;

    const measure = () => {
      if (!image.complete || !image.naturalWidth) return;
      const box = node.parentElement.getBoundingClientRect();
      width = box.width;
      height = box.height;
      if (!width || !height) return;
      node.width = Math.round(width * dpr);
      node.height = Math.round(height * dpr);
      cells = readCells(image, width, height);
      moving = true;
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      tick += 1;
      const hand = pointer.current;
      // Saat diam cukup berkedip pelan, supaya tidak menghabiskan CPU.
      if (!moving && !hand && tick % 6) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      let energy = 0;
      const size = CELL_W * dpr;
      const tall = CELL_H * dpr;

      for (const cell of cells) {
        let near = false;
        let hidden = false;
        if (hand) {
          const dx = cell.x - hand.x;
          const dy = cell.y - hand.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < LENS * 1.25) {
            const push = (1 - distance / (LENS * 1.25)) * 5;
            cell.vx += (dx / distance) * push;
            cell.vy += (dy / distance) * push;
            near = true;
            hidden = distance < LENS * 0.72;
          }
        }
        cell.vx = (cell.vx + (cell.hx - cell.x) * 0.07) * 0.8;
        cell.vy = (cell.vy + (cell.hy - cell.y) * 0.07) * 0.8;
        cell.x += cell.vx;
        cell.y += cell.vy;
        energy += Math.abs(cell.vx) + Math.abs(cell.vy);
        if (Math.random() < 0.012) cell.glyph = glyphFor(cell.light);
        if (hidden) continue;

        ctx.globalAlpha = near ? 1 : cell.alpha;
        ctx.drawImage(near ? accent : atlas, cell.glyph * size, 0, size, tall, cell.x, cell.y, CELL_W, CELL_H);
      }
      ctx.globalAlpha = 1;
      moving = energy / Math.max(cells.length, 1) > 0.02;
    };

    const start = () => {
      if (!frame && visible && cells.length) frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    seen.observe(node);

    const resized = new ResizeObserver(() => {
      measure();
      start();
    });
    resized.observe(node.parentElement);

    image.onload = () => {
      measure();
      start();
    };
    image.src = portrait.src;

    return () => {
      stop();
      seen.disconnect();
      resized.disconnect();
      image.onload = null;
    };
  }, []);

  const track = (event) => {
    const box = stage.current.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    pointer.current = { x, y };
    stage.current.style.setProperty("--mx", `${x}px`);
    stage.current.style.setProperty("--my", `${y}px`);
    stage.current.classList.add("is-lit");
  };

  const leave = () => {
    pointer.current = null;
    stage.current.classList.remove("is-lit");
  };

  return (
    <div className="portrait" data-reveal>
      <button
        type="button"
        className={open ? "portrait__stage is-open" : "portrait__stage"}
        ref={stage}
        aria-pressed={open}
        aria-label={open ? "Show the portrait as code" : "Show the portrait as a photo"}
        onPointerMove={track}
        onPointerLeave={leave}
        onClick={() => setOpen((value) => !value)}
      >
        <Image className="portrait__photo" src={portrait.src} alt={portrait.alt} fill sizes="(max-width: 860px) 100vw, 40vw" />
        <canvas className="portrait__code" ref={canvas} aria-hidden="true" />
      </button>
      <p className="portrait__hint small soft">
        {open ? (
          "Click to turn it back into code."
        ) : (
          <>
            <span className="portrait__hint-hover">Hover to decode. Click for the photo.</span>
            <span className="portrait__hint-touch">Tap for the photo.</span>
          </>
        )}
      </p>
    </div>
  );
}
