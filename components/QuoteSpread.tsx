import Reveal from "@/components/motion/Reveal";
import type { Testimonial } from "@/lib/sanity/types";

/**
 * QuoteSpread — one testimonial per full-bleed dark slab. Meant to
 * be stacked (one per screen) instead of carousel'd so each quote
 * gets real weight. This is how we turn the current "testimonial
 * carousel" into something that feels like editorial pull-quotes.
 *
 * Styling is the dark slab from globals.css (--slab / --slab-ink)
 * with grain overlay and a small service label in the accent colour.
 * Works with any number of testimonials — render this inside a loop.
 */

type Props = {
  testimonial: Testimonial;
  /** Which side of the slab the quote marks sit. Alternate for variety. */
  align?: "left" | "right";
};

export default function QuoteSpread({
  testimonial,
  align = "left",
}: Props) {
  return (
    <section
      className="grain grain-strong vignette relative"
      style={{
        background: "var(--slab)",
        color: "var(--slab-ink)",
      }}
    >
      <div className="mx-auto flex min-h-[50vh] w-full max-w-[var(--max-w-wide)] items-center px-6 py-14 sm:min-h-[70vh] sm:px-12 sm:py-32">
        <div className={align === "right" ? "ml-auto max-w-2xl text-right" : "max-w-2xl"}>
          <Reveal>
            <span
              className="t-eyebrow"
              style={{ color: "var(--accent)" }}
            >
              {typeof testimonial.service === "object" && testimonial.service?.title
                ? testimonial.service.title
                : "A Dlús session"}
            </span>
            <blockquote className="t-quote mt-6">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <cite className="mt-8 block not-italic">
              <span className="t-eyebrow" style={{ color: "var(--slab-ink)", opacity: 0.65 }}>
                — {testimonial.name}
              </span>
            </cite>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
