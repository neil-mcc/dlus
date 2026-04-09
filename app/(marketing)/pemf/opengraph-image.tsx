import { OG_SIZE, OG_CONTENT_TYPE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "PEMF at Dlús Recovery — Pulsed Electromagnetic Field Therapy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "PEMF",
    title: "A steady pulse.",
    subtitle: "Pulsed electromagnetic field sessions tuned for recovery.",
    variant: "pemf",
  });
}
