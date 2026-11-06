"use client";
import { useEffect, useRef } from "react";

type Props = {
  trigger: number;
  target: React.RefObject<HTMLElement | null>;
};

export default function Ripple({ trigger, target }: Props) {
  const first = useRef(true);
  const scaleRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    scaleRef.current = document.querySelector<SVGFEDisplacementMapElement>("#ripple-displace");
    turbRef.current = document.querySelector<SVGFETurbulenceElement>("#ripple-turb");
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = target.current;
    const disp = scaleRef.current;
    const turb = turbRef.current;
    if (!el || !disp || !turb) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    cancelAnimationFrame(rafRef.current);
    el.style.filter = "url(#ripple-filter)";
    el.style.willChange = "filter";

    const start = performance.now();
    const duration = 650;
    const peak = 40;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out curve: sharp rise, slow settle
      const wave = Math.sin(Math.PI * t) ** 1.5;
      const scale = wave * peak;
      const freq = 0.012 + wave * 0.018;
      disp.setAttribute("scale", String(scale));
      turb.setAttribute("baseFrequency", String(freq));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        el.style.filter = "";
        el.style.willChange = "";
        disp.setAttribute("scale", "0");
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, target]);

  return null;
}

export function RippleFilterDefs() {
  return (
    <svg
      aria-hidden
      style={{ position: "fixed", width: 0, height: 0, pointerEvents: "none" }}
    >
      <defs>
        <filter id="ripple-filter" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            id="ripple-turb"
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            id="ripple-displace"
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
