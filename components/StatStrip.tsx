import Reveal from "@/components/motion/Reveal";

/**
 * StatStrip — a single horizontal row of three or four oversized
 * numbers paired with a small eyebrow label. Used as the proof
 * layer on home, about, and service pages. The stats are
 * deliberately concrete ("3 therapies", "BT60, Armagh") rather
 * than vanity metrics — credibility without claims.
 *
 * Numbers sit in serif (Fraunces display opsz) so they match the
 * editorial rhythm. Eyebrows use the shared `.t-eyebrow` class.
 */

export type Stat = {
  value: string;
  label: string;
  /** Optional suffix rendered smaller to the right of the number. */
  suffix?: string;
};

type Props = {
  items: Stat[];
  className?: string;
};

// Tailwind's JIT can't resolve interpolated class names — it scans
// source for literal strings. We look up the desktop column count
// against a static map so the correct class is always in the build.
// If a consumer passes 5+ items, we fall back to 4 columns.
const LG_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

export default function StatStrip({ items, className = "" }: Props) {
  const lgCols = LG_COLS[items.length] ?? "lg:grid-cols-4";
  return (
    <Reveal
      className={`grid gap-10 sm:grid-cols-2 ${lgCols} ${className}`}
    >
      {items.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2">
          <span className="t-eyebrow" style={{ color: "var(--muted)" }}>
            {stat.label}
          </span>
          <span className="flex items-baseline gap-2">
            <span className="t-display-sm" style={{ color: "var(--fg)" }}>
              {stat.value}
            </span>
            {stat.suffix ? (
              <span className="t-h4" style={{ color: "var(--muted)" }}>
                {stat.suffix}
              </span>
            ) : null}
          </span>
        </div>
      ))}
    </Reveal>
  );
}
