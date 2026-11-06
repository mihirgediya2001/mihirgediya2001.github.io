"use client";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
};

export default function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.35,
  onClick,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.3 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      ref={ref as never}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      <motion.span style={{ x: sx, y: sy, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
        {children}
      </motion.span>
    </Tag>
  );
}
