import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AmbientField from "@/components/AmbientField";
import Reveal from "@/components/motion/Reveal";

/**
 * ModalityGallery — a horizontal scroll-snap row of three big
 * "cards", one per modality. Each card uses the per-modality
 * AmbientField as its hero backdrop with large serif type on top.
 * This replaces the previous 3-up `<ServiceCard>` grid on the
 * home page with something that looks like a spread, not a layout.
 *
 * Scroll-snap is CSS-only (no JS carousel library). On wide
 * viewports the three cards fit with room to spare; on mobile
 * they scroll horizontally and each card snaps into place.
 */

type Modality = {
  title: string;
  blurb: string;
  href: string;
  variant: "hbot" | "redLight" | "pemf";
  eyebrow: string;
};

const MODALITIES: Modality[] = [
  {
    title: "Hyperbaric Oxygen",
    blurb:
      "Pressurised oxygen in a single-occupant chamber. Commonly used for post-exertion recovery and deep rest.",
    href: "/hbot",
    variant: "hbot",
    eyebrow: "HBOT",
  },
  {
    title: "Red Light Therapy",
    blurb:
      "Full-body photobiomodulation in a stand-up panel. Users report support for skin, sleep and recovery.",
    href: "/red-light-therapy",
    variant: "redLight",
    eyebrow: "Red light",
  },
  {
    title: "PEMF Therapy",
    blurb:
      "Pulsed electromagnetic fields on a full-body mat. Often used as a calming pre- or post-workout reset.",
    href: "/pemf",
    variant: "pemf",
    eyebrow: "PEMF",
  },
];

export default function ModalityGallery() {
  return (
    <Reveal className="relative">
      {/* Horizontal row. The negative margins let the scroll track
          bleed to the viewport edges on mobile; the inner cards
          sit inside the normal gutter on desktop via `px-6 sm:px-8`. */}
      <div
        role="list"
        aria-label="Three modalities"
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 sm:-mx-8 sm:px-8"
      >
        {MODALITIES.map((m) => (
          <Link
            role="listitem"
            key={m.href}
            href={m.href}
            className="group relative flex aspect-[4/5] min-w-[82%] snap-start overflow-hidden rounded-3xl sm:min-w-[520px] lg:min-w-[420px] lg:flex-1"
            style={{ background: "var(--slab)" }}
          >
            {/* Canvas backdrop */}
            <div className="absolute inset-0 opacity-90">
              <AmbientField variant={m.variant} intensity={0.9} />
            </div>

            {/* Grain overlay via the utility — gives each card the
                print-on-uncoated feel so they stop looking like pure
                canvas fills. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.25) 100%)",
              }}
            />

            {/* Content */}
            <div className="relative flex h-full w-full flex-col justify-between p-8 text-[var(--slab-ink)]">
              <div className="flex items-center justify-between">
                <span
                  className="t-eyebrow"
                  style={{ color: "var(--slab-ink)", opacity: 0.75 }}
                >
                  {m.eyebrow}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3
                  className="t-h2"
                  style={{ color: "var(--slab-ink)" }}
                >
                  {m.title}
                </h3>
                <p
                  className="mt-4 max-w-sm text-sm leading-relaxed"
                  style={{ color: "var(--slab-ink)", opacity: 0.8 }}
                >
                  {m.blurb}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
