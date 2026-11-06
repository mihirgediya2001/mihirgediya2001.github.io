"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  active: number;
  labels: string[];
};

const ease = [0.65, 0, 0.35, 1] as const;

export default function SectionTransition({ active, labels }: Props) {
  const [key, setKey] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setKey((k) => k + 1);
  }, [active]);

  const label = labels[active] ?? "";
  const number = String(active + 1).padStart(2, "0");

  return (
    <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden">
      <AnimatePresence>
        {key > 0 && (
          <motion.div
            key={key}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease }}
            className="absolute inset-0 flex items-center"
          >
            {/* Lime wedge sweeping across */}
            <div className="absolute inset-0 flex">
              <div className="h-full w-[55%] bg-[var(--bg)]" />
              <div className="h-full w-[12%] bg-[var(--accent)] skew-x-[-18deg] -ml-6" />
              <div className="h-full flex-1 bg-[var(--bg)]" />
            </div>
            {/* Big section label riding the wedge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.1, times: [0, 0.3, 0.7, 1], ease: "linear" }}
              className="relative w-full flex items-center justify-center gap-6 px-10"
            >
              <span className="font-mono text-[var(--accent-ink)] text-2xl md:text-4xl font-bold tracking-tight">
                {number}
              </span>
              <span className="text-[var(--fg)] font-bold tracking-[-0.03em] text-[clamp(3rem,10vw,9rem)] uppercase leading-none">
                {label}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
