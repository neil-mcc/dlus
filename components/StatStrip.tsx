import Reveal from "@/components/motion/Reveal";

/**
 * StatStrip — a single horizontal row of three or four oversized
 * numbers paired with a small eyebrow label. Used as the proof
 * layer on home, about, and service pages. The stats are
 * deliberately concrete ("3 modalities", "BT60, Armagh") rather
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

export default function StatStrip({ items, className = "" }: Props) {
  return (
    <Reveal
      className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-${items.length} ${className}`}
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
