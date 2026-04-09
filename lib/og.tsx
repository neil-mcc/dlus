import { ImageResponse } from "next/og";

/**
 * og.tsx — shared OG image renderer.
 *
 * One function, four variants. Next's ImageResponse uses a JSX
 * subset compiled to Satori under the hood, so we can't import
 * our React components directly — everything needs to be written
 * as inline styles on primitive elements.
 *
 * Variant palettes mirror the AmbientField and SanityImage
 * duotones so the OG cards match the on-site art direction.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Variant = "brand" | "hbot" | "redLight" | "pemf";

const PALETTES: Record<
  Variant,
  {
    from: string;
    to: string;
    fg: string;
    accent: string;
    mutedFg: string;
  }
> = {
  brand: {
    from: "#1c2729",
    to: "#0e1617",
    fg: "#eef2f0",
    accent: "#509ca4",
    mutedFg: "rgba(238, 242, 240, 0.7)",
  },
  hbot: {
    from: "#142024",
    to: "#060c0e",
    fg: "#eef2f0",
    accent: "#509ca4",
    mutedFg: "rgba(238, 242, 240, 0.7)",
  },
  redLight: {
    from: "#3a1a0e",
    to: "#140502",
    fg: "#f4e7dc",
    accent: "#ffaa6e",
    mutedFg: "rgba(244, 231, 220, 0.7)",
  },
  pemf: {
    from: "#16272a",
    to: "#0b1618",
    fg: "#eef2f0",
    accent: "#78bec6",
    mutedFg: "rgba(238, 242, 240, 0.7)",
  },
};

export function renderOg({
  eyebrow,
  title,
  subtitle,
  variant = "brand",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  variant?: Variant;
}) {
  const p = PALETTES[variant];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`,
          color: p.fg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Decorative arc — mimics the brand "breath ring" sigil,
            placed top-right so it doesn't compete with the type. */}
        <div
          style={{
            position: "absolute",
            top: 72,
            right: 72,
            width: 72,
            height: 72,
            borderRadius: 999,
            border: `2px solid ${p.accent}`,
            opacity: 0.85,
            display: "flex",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: p.accent,
            fontFamily: "sans-serif",
          }}
        >
          {eyebrow}
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 132,
            lineHeight: 0.96,
            color: p.fg,
            fontWeight: 500,
            letterSpacing: -3,
            maxWidth: "90%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            color: p.mutedFg,
            letterSpacing: 0.5,
            fontFamily: "sans-serif",
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
