"use client";
import { motion } from "framer-motion";
import type { Variant } from "@/lib/variant";
import { useShown } from "./useShown";

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Experience({ v, isActive }: { v: Variant; isActive: boolean }) {
  const show = useShown(isActive);
  return (
    <div className="mx-auto w-full max-w-5xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease }}
        className="text-xs uppercase tracking-[0.25em] muted"
      >
        02 / Experience
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.65, delay: 0.08, ease }}
        className="display mt-3 text-4xl md:text-6xl"
      >
        Where I&apos;ve shipped.
      </motion.h2>

      <div className="relative mt-12 md:mt-14 pl-8 md:pl-10">
        <div className="tl-line left-[5px] md:left-[7px]" />
        <div className="space-y-6">
          {v.experience.map((e, i) => (
            <motion.div
              key={e.company + e.start}
              initial={{ opacity: 0, x: -20 }}
              animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.09, ease }}
              className="relative"
            >
              <div className="absolute -left-[31px] md:-left-[37px] top-3 tl-node" />
              <div className="card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="text-lg font-semibold tracking-tight">{e.role}</div>
                    <div className="text-sm muted">
                      {e.company} <span className="opacity-50">·</span> {e.location}
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-widest muted">
                    {e.start} — {e.end}
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--fg-dim)]">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className="muted mt-1.5 flex-none">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
