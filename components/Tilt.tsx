"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Tilt — subtle 3D parallax on hover with a cursor-following specular highlight.
 */
export default function Tilt({
  children,
  max = 7,
  className = "",
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const active = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  const bg = useTransform([px, py, active], (values) => {
    const [x, y, a] = values as number[];
    return `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(190,242,100,${0.18 * a}), transparent 45%)`;
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onEnter = () => active.set(1);
  const onLeave = () => {
    active.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full will-change-transform"
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{ background: bg, mixBlendMode: "screen" }}
        />
      </motion.div>
    </div>
  );
}
