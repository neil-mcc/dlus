import { OG_SIZE, OG_CONTENT_TYPE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "HBOT at Dlús Recovery — Hyperbaric Oxygen Therapy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Hyperbaric Oxygen",
    title: "Descend. Breathe.",
    subtitle: "A slow hour of pressurised oxygen in Armagh.",
    variant: "hbot",
  });
}
