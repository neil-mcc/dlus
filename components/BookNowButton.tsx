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
 * `/book` page, which embeds the top-level Acuity scheduler where
 * visitors pick their service. `serviceKey` is kept so callers can
 * still tag CTAs by intent — it scopes the default label and is
 * forwarded as a query param for analytics / future preselection.
 *
 * We stay on-site rather than deep-linking to Acuity so the brand
 * chrome, cancellation policy and HBOT pre-screening notice stay
 * alongside the scheduler.
 */
export default function BookNowButton({
  serviceKey = "hbot",
  label,
  variant = "primary",
  className = "",
}: Props) {
  const text = label ?? ACUITY_LABELS[serviceKey];
  const href = `/book?service=${serviceKey}`;
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide uppercase transition";
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {text}
    </Link>
  );
}
