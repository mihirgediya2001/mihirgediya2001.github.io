"use client";

type Props = {
  sections: { id: string; label: string }[];
  active: number;
  onJump: (i: number) => void;
};

export default function SectionNav({ sections, active, onJump }: Props) {
  return (
    <nav className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 items-center">
      <div className="glass rounded-full px-3 py-4 flex flex-col gap-4">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onJump(i)}
            className="group relative flex items-center"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className={`text-[11px] uppercase tracking-widest transition-all duration-300 absolute right-full mr-3 whitespace-nowrap ${
                active === i ? "opacity-100 text-[var(--fg)]" : "opacity-0 group-hover:opacity-70 text-[var(--muted)]"
              }`}
            >
              {s.label}
            </span>
            <span className={`side-nav-dot ${active === i ? "active" : ""}`} />
          </button>
        ))}
      </div>
    </nav>
  );
}
