import React, { useEffect, useMemo, useRef } from "react";
import "../styles/Lookbook.css";

const DEFAULT_ITEMS = [
  { type: "img", src: "/assets/images/sinuoCherryDrink.png", w: 520 },
  { type: "img", src: "/assets/images/sinuoBack.jpeg", w: 740 },
  { type: "img", src: "/assets/images/sinuo1.jpeg", w: 520 },
  { type: "video", src: "/assets/videos/sinuoCherryOud.mp4", w: 560 },
  { type: "img", src: "/assets/images/sinuoFather.png", w: 760 },
  { type: "img", src: "/assets/images/sinuoRivers.png", w: 720 },
];

export default function Lookbook({ items = DEFAULT_ITEMS, speed = 0.8 }) {
  const viewportRef = useRef(null);
  const topTrackRef = useRef(null);

  // Dos filas: arriba normal, abajo invertida (misma longitud => loop perfecto)
  const topRow = useMemo(() => items, [items]);
  const bottomRow = useMemo(() => [...items].reverse(), [items]);

  // Duplicamos (A + B) para loop seamless
  const topLoop = useMemo(() => [...topRow, ...topRow], [topRow]);
  const bottomLoop = useMemo(() => [...bottomRow, ...bottomRow], [bottomRow]);

  // Wheel vertical -> scroll horizontal
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e) => {
      e.preventDefault();
      viewport.scrollLeft += e.deltaY * 1.2;
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, []);

  // Auto-move + loop real
  useEffect(() => {
    const viewport = viewportRef.current;
    const topTrack = topTrackRef.current;
    if (!viewport || !topTrack) return;

    let raf = 0;
    let last = performance.now();

    const step = (t) => {
      const dt = t - last;
      last = t;

      viewport.scrollLeft += speed * (dt / 16.67);

      // Como el track es A+B, cuando cruzas A (la mitad), vuelves a A
      const half = topTrack.scrollWidth / 2;
      if (half > 0 && viewport.scrollLeft >= half) viewport.scrollLeft -= half;
      if (half > 0 && viewport.scrollLeft < 0) viewport.scrollLeft += half;

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  // Drag (opcional, pero queda súper natural)
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let isDown = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e) => {
      isDown = true;
      viewport.classList.add("lb-grabbing");
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      startLeft = viewport.scrollLeft;
    };

    const onMove = (e) => {
      if (!isDown) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      viewport.scrollLeft = startLeft - (x - startX);
    };

    const onUp = () => {
      isDown = false;
      viewport.classList.remove("lb-grabbing");
    };

    viewport.addEventListener("mousedown", onDown);
    viewport.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    viewport.addEventListener("touchstart", onDown, { passive: true });
    viewport.addEventListener("touchmove", onMove, { passive: true });
    viewport.addEventListener("touchend", onUp);

    return () => {
      viewport.removeEventListener("mousedown", onDown);
      viewport.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);

      viewport.removeEventListener("touchstart", onDown);
      viewport.removeEventListener("touchmove", onMove);
      viewport.removeEventListener("touchend", onUp);
    };
  }, []);

  const renderItem = (it, idx) => (
    <div
      key={`${it.src}-${idx}`}
      className="lb-item"
      style={{ width: `${it.w}px` }}
      aria-hidden="true"
    >
      {it.type === "video" ? (
        <video
          className="lb-media"
          src={it.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          className="lb-media"
          src={it.src}
          alt=""
          loading="lazy"
          draggable={false}
        />
      )}
    </div>
  );

  return (
    <section className="lb">
      <div ref={viewportRef} className="lb-viewport">
        <div className="lb-stack">
          <div ref={topTrackRef} className="lb-track">
            {topLoop.map(renderItem)}
          </div>
          <div className="lb-track">
            {bottomLoop.map(renderItem)}
          </div>
        </div>
      </div>
    </section>
  );
}