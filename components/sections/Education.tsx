"use client";
import { motion } from "framer-motion";
import type { Variant } from "@/lib/variant";
import { useShown } from "./useShown";
import SplitText from "../SplitText";

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Education({ v, isActive }: { v: Variant; isActive: boolean }) {
  const show = useShown(isActive);
  return (
    <div className="mx-auto w-full max-w-5xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease }}
        className="text-xs uppercase tracking-[0.25em] muted"
      >
        03 / Education
      </motion.div>
      <SplitText
        text="Where I learned the fundamentals."
        as="h2"
        by="word"
        stagger={0.07}
        delay={0.1}
        show={show}
        className="display mt-3 text-4xl md:text-6xl"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {v.education.map((ed, i) => (
          <motion.div
            key={ed.school}
            initial={{ opacity: 0, y: 24 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, delay: 0.2 + i * 0.12, ease }}
            className="card"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-11 h-11 rounded-xl border border-[var(--line-2)] flex items-center justify-center font-mono text-sm muted">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-xs uppercase tracking-widest muted">
                {ed.start} — {ed.end}
              </div>
            </div>
            <div className="mt-6 text-xl font-semibold tracking-tight">{ed.school}</div>
            <div className="text-sm muted mt-0.5">{ed.degree}</div>
            {ed.detail && (
              <p className="mt-4 text-sm leading-relaxed text-[var(--fg-dim)]/90">{ed.detail}</p>
            )}
            {ed.courses && ed.courses.length > 0 && (
              <>
                <div className="mt-5 text-[10px] uppercase tracking-widest muted">Key coursework</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {ed.courses.map((c) => (
                    <span key={c} className="tag">{c}</span>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
