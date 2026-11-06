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

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item = {
    hidden: { y: "0.6em", opacity: 0, filter: "blur(10px)" },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease },
    },
  };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      aria-label={text}
    >
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        return (
          <motion.span
            key={i}
            variants={item}
            style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
            aria-hidden
          >
            {tok}
          </motion.span>
        );
      })}
      {trailing}
    </Tag>
  );
}
