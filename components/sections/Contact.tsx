"use client";
import { motion } from "framer-motion";
import type { Variant } from "@/lib/variant";
import { useShown } from "./useShown";
import SplitText from "../SplitText";
import MagneticButton from "../MagneticButton";
import Marquee from "../Marquee";

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Contact({ v, isActive }: { v: Variant; isActive: boolean }) {
  const show = useShown(isActive);
  return (
    <div className="mx-auto w-full max-w-5xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease }}
        className="text-xs uppercase tracking-[0.25em] muted"
      >
        05 / Contact
      </motion.div>

      <SplitText
        text="Let's build something together."
        as="h2"
        by="word"
        stagger={0.1}
        delay={0.1}
        show={show}
        className="display mt-4 text-5xl sm:text-7xl md:text-8xl"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.25, ease }}
        className="mt-6 text-lg muted max-w-2xl"
      >
        I&apos;m in {v.location} and open to full-time roles. Fastest way to reach me is email, I reply within a day.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        className="mt-10"
      >
        <MagneticButton href={`mailto:${v.email}`} className="group inline-flex items-center gap-4 btn-primary pr-6 py-4">
          <span className="text-xs uppercase tracking-widest opacity-70">Email</span>
          <span className="text-base sm:text-lg font-semibold">{v.email}</span>
          <span className="text-lg">→</span>
        </MagneticButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.65, ease }}
        className="mt-8 flex flex-wrap gap-3"
      >
        {v.socials.map((s) => (
          <MagneticButton key={s.label} href={s.href} className="btn-ghost" strength={0.25}>
            {s.label} <span aria-hidden>↗</span>
          </MagneticButton>
        ))}
      </motion.div>

      <div className="mt-14 -mx-[5vw]">
        <Marquee items={["Available for hire", "Full-stack", "AI / ML", "Python · Java · TypeScript", v.location, "Open to relocate"]} />
      </div>

      <div className="mt-16 pt-6 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-2 text-xs muted">
        <span>© {new Date().getFullYear()} {v.name}</span>
        <span>Variant: <span className="text-[var(--fg-dim)]">{v.slug}</span> · Next.js · Framer Motion</span>
      </div>
    </div>
  );
}
