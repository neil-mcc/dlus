import Link from "next/link";
import { ACUITY_LABELS, type AcuityServiceKey } from "@/lib/acuity";

type Props = {
  serviceKey?: AcuityServiceKey;
  label?: string;
  variant?: "primary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-deep)]",
  ghost:
    "bg-transparent text-[var(--fg)] border border-[var(--fg)]/30 hover:border-[var(--fg)]",
} as const;

/**
 * Primary booking CTA used across the site. Routes to the on-site
 * `/book` page with a `?service=` query param so `<AcuityEmbed />`
 * can preselect the right appointment type on arrival.
 *
 * We intentionally stay on-site rather than deep-linking to Acuity
 * in a new tab — it keeps the brand chrome, reduces bounce, and
 * lets us surface cancellation policy + HBOT pre-screening copy
 * alongside the scheduler.
 */
export default function BookNowButton({
  serviceKey = "consultation",
  label,
  variant = "primary",
  className = "",
}: Props) {
  const text = label ?? ACUITY_LABELS[serviceKey];
  const href = `/book?service=${serviceKey}`;
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide uppercase transition ${variants[variant]} ${className}`}
    >
      {text}
    </Link>
  );
}
