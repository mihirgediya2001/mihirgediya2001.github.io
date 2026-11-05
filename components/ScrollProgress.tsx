"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import type { RefObject } from "react";

export default function ScrollProgress({ container }: { container: RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({ container });
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  return <motion.div className="progress-bar" style={{ scaleX: x }} />;
}
