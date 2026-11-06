"use client";
import { useEffect, useRef } from "react";

type Props = {
  items: string[];
  speed?: number;
};

export default function Marquee({ items, speed = 40 }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const velocityBoost = useRef(0);
  const lastScroll = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const dt = now - lastScroll.current || 16;
      lastScroll.current = now;
      const container = document.querySelector(".snap-wrap") as HTMLElement | null;
      const top = container ? container.scrollTop : window.scrollY;
      const dy = Math.abs(top - (onScroll as unknown as { prev?: number }).prev! || 0);
      (onScroll as unknown as { prev?: number }).prev = top;
      velocityBoost.current = Math.min(6, velocityBoost.current + (dy / dt) * 8);
    };
    const container = document.querySelector(".snap-wrap") as HTMLElement | null;
    (container ?? window).addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      velocityBoost.current *= 0.92;
      const el = trackRef.current;
      if (el) {
        offset.current -= (speed + velocityBoost.current * 60) / 60;
        const w = el.scrollWidth / 2;
        if (w > 0 && -offset.current >= w) offset.current += w;
        el.style.transform = `translate3d(${offset.current}px, 0, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      (container ?? window).removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div ref={trackRef} className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}
            <span className="marquee-dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
