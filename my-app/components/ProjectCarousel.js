"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const INTERVAL = 4500;
const SWIPE = 40;

export default function ProjectCarousel({ slides, title }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [zoom, setZoom] = useState(null);
  const pointer = useRef(null);
  const closeButton = useRef(null);
  const stage = useRef(null);
  const count = slides.length;
  const current = slides[viewing ?? active];

  const go = useCallback((index) => setActive((index + count) % count), [count]);

  const openViewer = (index) => {
    setActive(index);
    setViewing(index);
    setZoom(null);
  };
  const closeViewer = useCallback(() => {
    setViewing(null);
    setZoom(null);
    // Pointer bisa sudah di luar carousel, jadi jeda otomatis harus dilepas di sini.
    setHovering(false);
    stage.current?.querySelector('.carousel__slide[tabindex="0"]')?.focus({ preventScroll: true });
  }, []);
  const moveViewer = useCallback(
    (step) => {
      setViewing((index) => {
        const next = (index + step + count) % count;
        setActive(next);
        return next;
      });
      setZoom(null);
    },
    [count],
  );

  // Berganti otomatis, berhenti saat disorot atau saat gambar sedang dibuka besar.
  useEffect(() => {
    if (count < 2 || hovering || viewing !== null) return;
    const timer = setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % count);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [count, hovering, viewing, active]);

  useEffect(() => {
    if (viewing === null) return;
    closeButton.current?.focus();
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") closeViewer();
      else if (event.key === "ArrowRight" && count > 1) moveViewer(1);
      else if (event.key === "ArrowLeft" && count > 1) moveViewer(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [viewing, count, closeViewer, moveViewer]);

  const pointAt = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    };
  };

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label={`${title} media`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={(event) => { if (event.target.matches(":focus-visible")) setHovering(true); }}
      onBlurCapture={() => setHovering(false)}
    >
      <div
        className="carousel__stage"
        ref={stage}
        onPointerDown={(event) => { pointer.current = event.clientX; }}
        onPointerUp={(event) => {
          if (pointer.current === null) return;
          const moved = event.clientX - pointer.current;
          pointer.current = moved;
          if (count > 1 && Math.abs(moved) > SWIPE) go(active + (moved < 0 ? 1 : -1));
        }}
      >
        <div className="carousel__track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className="carousel__slide"
              aria-hidden={index !== active}
              aria-label={`Enlarge ${slide.caption || slide.alt}`}
              tabIndex={index === active ? 0 : -1}
              onClick={() => {
                if (Math.abs(pointer.current ?? 0) <= SWIPE) openViewer(index);
                pointer.current = null;
              }}
            >
              <Image
                className={slide.shot ? "carousel__img carousel__img--shot" : "carousel__img"}
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 860px) 100vw, 1060px"
                preload={index === 0}
                draggable={false}
                style={slide.shot ? undefined : { objectPosition: slide.position }}
              />
            </button>
          ))}
        </div>
        {count > 1 && (
          <>
            <button type="button" className="carousel__arrow carousel__arrow--prev" aria-label="Previous image" onClick={() => go(active - 1)}>←</button>
            <button type="button" className="carousel__arrow carousel__arrow--next" aria-label="Next image" onClick={() => go(active + 1)}>→</button>
          </>
        )}
      </div>

      <p className="carousel__caption small soft" aria-live="polite">
        {slides[active].caption || slides[active].alt}
      </p>

      {count > 1 && (
        <div className="carousel__thumbs" role="group" aria-label="Choose an image">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className="carousel__thumb"
              aria-label={`Show ${slide.caption || slide.alt}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => go(index)}
            >
              <Image
                className={slide.shot ? "carousel__img carousel__img--cover" : "carousel__img"}
                src={slide.src}
                alt=""
                fill
                sizes="140px"
                style={{ objectPosition: slide.shot ? "0 0" : slide.position }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Di body, karena animasi masuk carousel mengurung z-index viewer di bawah nav. */}
      {viewing !== null && createPortal(
        <div className="viewer" role="dialog" aria-modal="true" aria-label={current.caption || current.alt} onClick={closeViewer}>
          <div className="viewer__bar" onClick={(event) => event.stopPropagation()}>
            <span className="small">{current.caption || current.alt}</span>
            <span className="viewer__tools">
              {count > 1 && <span className="small soft">{viewing + 1} / {count}</span>}
              <button type="button" className="viewer__button" ref={closeButton} aria-label="Close" onClick={closeViewer}>×</button>
            </span>
          </div>
          <div
            className={zoom ? "viewer__frame is-zoomed" : "viewer__frame"}
            onClick={(event) => {
              event.stopPropagation();
              setZoom(zoom ? null : pointAt(event));
            }}
            onPointerMove={(event) => { if (zoom) setZoom(pointAt(event)); }}
          >
            <Image
              className="viewer__img"
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              unoptimized
              draggable={false}
              style={zoom ? { transform: "scale(2.4)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
          </div>
          {count > 1 && (
            <>
              <button type="button" className="viewer__button viewer__button--prev" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); moveViewer(-1); }}>←</button>
              <button type="button" className="viewer__button viewer__button--next" aria-label="Next image" onClick={(event) => { event.stopPropagation(); moveViewer(1); }}>→</button>
            </>
          )}
        </div>,
        document.body,
      )}
    </section>
  );
}
