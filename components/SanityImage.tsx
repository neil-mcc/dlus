import Image from "next/image";
import type { Image as SanityImageSource } from "sanity";
import { urlFor } from "@/lib/sanity/image";

/**
 * SanityImage — the site's single image primitive.
 *
 * The reason this exists:
 *
 * 1. Dlús Recovery will not have real photography at launch. Every
 *    hero, gallery tile and service card still needs to feel designed.
 * 2. When photography *does* arrive later (via a shoot or Sanity
 *    upload), nothing in the page code should have to change — the
 *    same component must seamlessly swap a placeholder for the real
 *    asset without layout shift.
 *
 * How it achieves both:
 *
 * - If a Sanity image source is passed, it renders a `next/image`
 *   with AVIF/WebP delivery and Sanity's LQIP as the blur placeholder.
 * - If no source is passed, it renders a **duotone gradient slab**
 *   built from brand tokens, overlaid with the grain texture and a
 *   subtle vignette. These slabs are intentional — they read as
 *   "design decision", not "missing image".
 *
 * The `variant` prop picks which duotone to use so the fallback can
 * echo per-therapy accent colours without the caller having to
 * compose it manually.
 */

type Variant = "brand" | "hbot" | "redLight" | "pemf" | "ember" | "slab";

type Props = {
  source?: SanityImageSource | null;
  alt: string;
  /** Aspect ratio as "w/h". Defaults to 4/5 (editorial portrait). */
  aspect?: string;
  /** Duotone fallback palette when source is missing. */
  variant?: Variant;
  /** Full width of the image in the layout (for sizes hint). */
  widthHint?: number;
  className?: string;
  priority?: boolean;
  /** Max pixel width when requesting from Sanity's CDN. */
  maxW?: number;
};

/* ----------------------------------------------------------------
   Duotone fallback palettes.
   Each variant is a two-stop gradient sampled from the brand
   tokens in globals.css. When you change `--accent` or `--ember`
   these automatically follow because they reference via CSS vars.
   ---------------------------------------------------------------- */
const DUOTONES: Record<Variant, { from: string; to: string; ink: string }> = {
  brand: {
    from: "color-mix(in oklab, var(--accent) 70%, var(--slab) 30%)",
    to: "color-mix(in oklab, var(--slab) 85%, var(--accent) 15%)",
    ink: "var(--slab-ink)",
  },
  hbot: {
    // Deep, still, pressurised — the HBOT "descent" metaphor
    from: "color-mix(in oklab, var(--accent-deep) 60%, var(--slab) 40%)",
    to: "var(--slab)",
    ink: "var(--slab-ink)",
  },
  redLight: {
    // Warm radiant bloom — maps to the Red Light art direction
    from: "color-mix(in oklab, var(--ember) 70%, #3a1a0e 30%)",
    to: "#2a0d06",
    ink: "var(--ember-soft)",
  },
  pemf: {
    // Soft rhythmic field — cooler, calmer than HBOT
    from: "color-mix(in oklab, var(--accent) 50%, var(--bg) 50%)",
    to: "color-mix(in oklab, var(--accent-deep) 80%, var(--slab) 20%)",
    ink: "var(--accent-ink)",
  },
  ember: {
    from: "var(--ember-soft)",
    to: "var(--ember)",
    ink: "var(--slab)",
  },
  slab: {
    from: "var(--slab)",
    to: "#0d1617",
    ink: "var(--slab-ink)",
  },
};

export default function SanityImage({
  source,
  alt,
  aspect = "4/5",
  variant = "brand",
  widthHint = 800,
  className = "",
  priority = false,
  maxW = 1600,
}: Props) {
  // Real image path — `next/image` + Sanity URL builder
  if (source) {
    const url = urlFor(source).width(maxW).auto("format").fit("max").url();

    // Sanity's image pipeline exposes an LQIP base64 under `asset.metadata`.
    // We fall back to plain blur if it's not present on this fetch.
    type Asset = { metadata?: { lqip?: string } };
    type Sourceable = { asset?: Asset };
    const lqip =
      (source as Sourceable)?.asset?.metadata?.lqip ?? undefined;

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={url}
          alt={alt}
          fill
          sizes={`(max-width: 768px) 100vw, ${widthHint}px`}
          priority={priority}
          placeholder={lqip ? "blur" : "empty"}
          blurDataURL={lqip}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Fallback: duotone slab + grain. Built purely from CSS vars so
  // the brand colours can shift in one place.
  const tone = DUOTONES[variant];
  return (
    <div
      aria-label={alt}
      role="img"
      className={`grain relative overflow-hidden ${className}`}
      style={{
        aspectRatio: aspect,
        background: `linear-gradient(135deg, ${tone.from} 0%, ${tone.to} 100%)`,
        color: tone.ink,
      }}
    >
      {/* Soft vignette on top of the gradient — mimics a lens falloff
          without needing a second SVG. Pure CSS, paints on the GPU. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, transparent 30%, rgb(0 0 0 / 0.25) 100%)",
        }}
      />
    </div>
  );
}
