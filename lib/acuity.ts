/**
 * Central registry of Acuity Scheduling deep links.
 *
 * These are used by `components/AcuityEmbed.tsx` as the iframe `src`
 * (with `?ref=embedded_csp` appended) on the `/book` page, and as the
 * "Open in a new tab" fallback for Safari ITP users who block
 * third-party cookies in the iframe.
 *
 * Currently only HBOT is live — the other three are placeholder URLs
 * and are disabled at the CTA layer via `ACUITY_LIVE`. When the
 * remaining Acuity links are filled in, flip the relevant flag to
 * `true` and the BookNowButton / PricingCard CTAs pick them up
 * automatically.
 *
 * TODO: replace placeholder URLs with live Acuity links before launch.
 *       Format: https://app.acuityscheduling.com/schedule.php?owner=OWNERID&appointmentType=TYPEID
 */
export const ACUITY_LINKS = {
  hbot: "https://dlusrecovery.as.me/schedule/d65e7959/appointment/89375012/calendar/13582315",
  redLight: "https://app.acuityscheduling.com/schedule.php?owner=00000000&appointmentType=00000000",
  pemf: "https://app.acuityscheduling.com/schedule.php?owner=00000000&appointmentType=00000000",
  consultation: "https://app.acuityscheduling.com/schedule.php?owner=00000000&appointmentType=00000000",
} as const;

export type AcuityServiceKey = keyof typeof ACUITY_LINKS;

/**
 * Per-service live flag. Consumed by `BookNowButton` to decide
 * whether to render an active CTA or a muted "scheduling opens soon"
 * badge. Keep this in sync with the URLs above.
 */
export const ACUITY_LIVE: Record<AcuityServiceKey, boolean> = {
  hbot: true,
  redLight: false,
  pemf: false,
  consultation: false,
};

export const ACUITY_LABELS: Record<AcuityServiceKey, string> = {
  hbot: "Book HBOT",
  redLight: "Book Red Light",
  pemf: "Book PEMF",
  consultation: "Book a free 15-min consultation",
};

/**
 * Label shown in place of the booking CTA when the service isn't
 * scheduling live yet.
 */
export const ACUITY_SOON_LABELS: Record<AcuityServiceKey, string> = {
  hbot: "Scheduling opens soon",
  redLight: "Red Light scheduling opens soon",
  pemf: "PEMF scheduling opens soon",
  consultation: "Consultations open soon",
};
