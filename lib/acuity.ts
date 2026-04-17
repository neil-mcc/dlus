/**
 * Central booking URL for Dlús Recovery's Acuity scheduler.
 *
 * This is the same link shared on Instagram and other channels:
 * one top-level scheduler where visitors pick a service (HBOT, Red
 * Light, PEMF, consultation) from Acuity's own list. Keeping a
 * single source of truth means every surface — site CTAs, the
 * embed on `/book`, the "new tab" fallback — leads to the same
 * place, and we don't drift when Acuity's appointment-type IDs
 * change.
 */
export const ACUITY_BOOKING_URL = "https://dlusrecovery.as.me/schedule/d65e7959";

export type AcuityServiceKey = "hbot" | "redLight" | "pemf" | "consultation";

export const ACUITY_LABELS: Record<AcuityServiceKey, string> = {
  hbot: "Book HBOT",
  redLight: "Book Red Light",
  pemf: "Book PEMF",
  consultation: "Book a free 15-min consultation",
};
