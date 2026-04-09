import { OG_SIZE, OG_CONTENT_TYPE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Red Light Therapy at Dlús Recovery";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Red Light Therapy",
    title: "Warm light, quiet room.",
    subtitle: "Clinical panels, domestic feel. Ten minutes, standing still.",
    variant: "redLight",
  });
}
