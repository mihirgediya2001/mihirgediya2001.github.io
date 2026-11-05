"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variant } from "@/lib/variant";

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Intro({ v, isActive = true }: { v: Variant; isActive?: boolean }) {
  const [r, setR] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setR((x) => (x + 1) % v.roles.length), 2600);
    return () => clearInterval(t);
  }, [v.roles.length]);

  return (
    <div className="mx-auto w-full max-w-6xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="flex items-center gap-3"
      >
        <span className="dot dot-pulse" />
        <span className="text-xs uppercase tracking-[0.2em] muted">
          Available · {v.location}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease }}
        className="display mt-8 text-5xl sm:text-7xl md:text-[8.5rem]"
      >
        {v.name}.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease }}
        className="mt-6 text-2xl sm:text-3xl md:text-4xl font-medium flex flex-wrap items-baseline gap-x-3"
      >
        <span className="muted">I work on</span>
        <motion.span
          key={r}
          initial={{ y: 22, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.55, ease }}
          className="inline-block text-[var(--fg)]"
        >
          {v.roles[r]}
        </motion.span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease }}
        className="mt-8 max-w-2xl text-lg muted leading-relaxed"
      >
        {v.summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease }}
        className="mt-12 flex flex-wrap items-center gap-8 sm:gap-14"
      >
        {v.stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight">{s.value}</div>
            <div className="text-xs uppercase tracking-widest muted mt-1.5">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <a href={`mailto:${v.email}`} className="btn-primary">
          Get in touch
          <span aria-hidden>→</span>
        </a>
        {v.socials.map((s) => (
          <a key={s.label} href={s.href} className="btn-ghost">
            {s.label}
          </a>
        ))}
      </motion.div>
    </div>
  );
}
