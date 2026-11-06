"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Variant } from "@/lib/variant";
import Intro from "./sections/Intro";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import SectionNav from "./SectionNav";
import NextButton from "./NextButton";
import ScrollProgress from "./ScrollProgress";
import Ripple from "./Ripple";

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Portfolio({ v }: { v: Variant }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const el = document.getElementById(SECTIONS[i].id);
    if (el && wrapRef.current) {
      wrapRef.current.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = root.scrollTop + root.clientHeight / 2;
        let best = 0;
        for (let i = 0; i < SECTIONS.length; i++) {
          const el = document.getElementById(SECTIONS[i].id);
          if (!el) continue;
          if (el.offsetTop <= mid) best = i;
        }
        setActive(best);
      });
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      root.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        scrollTo(Math.min(active + 1, SECTIONS.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollTo(Math.max(active - 1, 0));
      } else if (e.key === "Home") scrollTo(0);
      else if (e.key === "End") scrollTo(SECTIONS.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, scrollTo]);

  return (
    <div ref={wrapRef} className="snap-wrap relative">
      <ScrollProgress container={wrapRef} />
      <section id="intro" className="snap-section"><Intro v={v} isActive={active === 0} /></section>
      <section id="experience" className="snap-section"><Experience v={v} isActive={active === 1} /></section>
      <section id="education" className="snap-section"><Education v={v} isActive={active === 2} /></section>
      <section id="projects" className="snap-section"><Projects v={v} isActive={active === 3} /></section>
      <section id="contact" className="snap-section"><Contact v={v} isActive={active === 4} /></section>

      <Ripple trigger={active} target={wrapRef} />
      <SectionNav sections={SECTIONS} active={active} onJump={scrollTo} />
      <NextButton
        label={active < SECTIONS.length - 1 ? `Next · ${SECTIONS[active + 1].label}` : "Back to top"}
        onClick={() => scrollTo(active < SECTIONS.length - 1 ? active + 1 : 0)}
      />
    </div>
  );
}
