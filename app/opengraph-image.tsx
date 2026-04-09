import { OG_SIZE, OG_CONTENT_TYPE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Dlús Recovery — Recovery, Elevated";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpenGraphImage() {
  return renderOg({
    eyebrow: "Recovery & wellness studio",
    title: "dlús.",
    subtitle: "Recovery, Elevated · HBOT · Red Light · PEMF",
    variant: "brand",
  });
}
