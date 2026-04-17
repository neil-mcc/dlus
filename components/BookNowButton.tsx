import Link from "next/link";
import {
  ACUITY_LABELS,
  ACUITY_LIVE,
  ACUITY_SOON_LABELS,
  type AcuityServiceKey,
} from "@/lib/acuity";

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
 * Primary booking CTA used across the site.
 *
 * If the requested `serviceKey` is flagged live in `ACUITY_LIVE`,
 * this routes to the on-site `/book` page with a `?service=` query
 * param so `<AcuityEmbed />` can preselect the right appointment
 * type on arrival. (Today only `hbot` is live.)
 *
 * If it isn't live yet, we render a muted, non-interactive
 * "scheduling opens soon" chip rather than a CTA that silently falls
 * back to HBOT. This is the honest UX — a red-light tier shouldn't
 * hand people an HBOT scheduler.
 *
 * We intentionally stay on-site for live bookings rather than
 * deep-linking to Acuity — it keeps the brand chrome, reduces
 * bounce, and lets us surface cancellation policy + HBOT
 * pre-screening copy alongside the scheduler.
 */
export default function BookNowButton({
  serviceKey = "hbot",
  label,
  variant = "primary",
  className = "",
}: Props) {
  const live = ACUITY_LIVE[serviceKey];
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide uppercase transition";

  if (!live) {
    // Non-interactive "coming soon" state. Matches the ghost variant
    // visually so it sits quietly alongside real CTAs without looking
    // broken. `aria-disabled` because it's semantically a disabled
    // action, even though it's a span (a button would invite clicks).
    return (
      <span
        aria-disabled="true"
        className={`${baseClasses} cursor-not-allowed border border-dashed border-[var(--fg)]/25 bg-transparent text-[var(--muted)] ${className}`}
      >
        {label ?? ACUITY_SOON_LABELS[serviceKey]}
      </span>
    );
  }

  const text = label ?? ACUITY_LABELS[serviceKey];
  const href = `/book?service=${serviceKey}`;
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {text}
    </Link>
  );
}
