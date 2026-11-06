"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { Variant } from "@/lib/variant";
import { useShown } from "./useShown";
import Tilt from "../Tilt";
import SplitText from "../SplitText";

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Projects({ v, isActive }: { v: Variant; isActive: boolean }) {
  const show = useShown(isActive);
  const [filter, setFilter] = useState<string>(v.projectCategories[0] ?? "All");

  const filtered = useMemo(() => {
    if (filter === "All") return v.projects;
    return v.projects.filter((p) => p.categories.includes(filter));
  }, [filter, v.projects]);

  return (
    <div className="mx-auto w-full max-w-6xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease }}
        className="text-xs uppercase tracking-[0.25em] muted"
      >
        04 / Projects
      </motion.div>
      <SplitText
        text="Things I've built."
        as="h2"
        by="word"
        stagger={0.08}
        delay={0.1}
        show={show}
        className="display mt-3 text-4xl md:text-6xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        className="mt-8 flex flex-wrap gap-2"
      >
        {v.projectCategories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`pill ${filter === c ? "active" : ""}`}
          >
            {c}
            <span className={`ml-2 text-[10px] ${filter === c ? "opacity-70" : "opacity-50"}`}>
              {c === "All" ? v.projects.length : v.projects.filter((p) => p.categories.includes(c)).length}
            </span>
          </button>
        ))}
      </motion.div>

      <LayoutGroup>
        <motion.div layout className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
                exit={{ opacity: 0, scale: 0.94, y: -12 }}
                transition={{ duration: 0.4, delay: show ? i * 0.04 : 0, ease }}
                className="h-full"
              >
                <Tilt className="h-full">
                  <div className="card flex flex-col h-full cursor-default">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-base font-semibold tracking-tight">{p.name}</div>
                        <div className="text-xs muted mt-0.5">{p.tagline}</div>
                      </div>
                      {p.metric && <span className="tag">{p.metric}</span>}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--fg-dim)]/90 flex-1">
                      {p.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className="tag">{s}</span>
                      ))}
                    </div>
                    {p.categories.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.categories.map((c) => (
                          <span key={c} className="text-[10px] uppercase tracking-widest muted">#{c.toLowerCase()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
