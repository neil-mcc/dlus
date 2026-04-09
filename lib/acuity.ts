/**
 * Central registry of Acuity Scheduling deep links.
 *
 * These are used by `components/AcuityEmbed.tsx` as the iframe `src`
 * (with `?ref=embedded_csp` appended) on the `/book` page, and as the
 * "Open in a new tab" fallback for Safari ITP users who block
 * third-party cookies in the iframe.
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

export const ACUITY_LABELS: Record<AcuityServiceKey, string> = {
  hbot: "Book HBOT",
  redLight: "Book Red Light",
  pemf: "Book PEMF",
  consultation: "Book a free 15-min consultation",
};
