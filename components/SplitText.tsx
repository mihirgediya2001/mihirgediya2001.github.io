"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  by?: "word" | "char";
  className?: string;
  stagger?: number;
  delay?: number;
  show?: boolean;
  trailing?: ReactNode;
};

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function SplitText({
  text,
  as = "h1",
  by = "word",
  className = "",
  stagger = 0.05,
  delay = 0,
  show = true,
  trailing,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.h1;
  const tokens = by === "word" ? text.split(/(\s+)/) : Array.from(text);

  if (reduce) {
    return (
      <Tag className={className}>
        {text}
        {trailing}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        return (
          <span key={i} className="split-mask" aria-hidden>
            <motion.span
              className="split-inner"
              initial={{ y: "110%" }}
              animate={show ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.75, delay: delay + i * stagger, ease }}
            >
              {tok}
            </motion.span>
          </span>
        );
      })}
      {trailing}
    </Tag>
  );
}
