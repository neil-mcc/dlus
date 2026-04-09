"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

/**
 * StickyBookDock — a slim "Book" pill that materialises bottom-centre
 * after the user scrolls past ~70% of the first viewport and stays
 * pinned while they read the rest of the page. It's the editorial-
 * magazine version of a floating CTA: a single, deliberate button
 * framed with a line of context copy, not a nag banner.
 *
 * Visibility is driven by `useScroll` (scrollY → opacity) so the
 * dock truly appears/disappears based on scroll progress instead
 * of a hardcoded scrollY threshold (which would fight different
 * viewport heights). The dock is always mounted so enter/exit
 * transitions stay smooth.
 */
export default function StickyBookDock() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Viewport-aware fade: dock starts revealing at 500px scrollY,
  // fully visible by 700px. Works on any screen height because
  // that's well clear of the hero by design.
  const opacity = useTransform(scrollY, [500, 700], [0, 1]);
  const y = useTransform(scrollY, [500, 700], [24, 0]);
  const pointerEvents = useTransform(scrollY, (v) =>
    v > 600 ? "auto" : "none",
  );

  if (reduce) {
    // Reduced motion: render a static dock that only appears via
    // simple CSS visibility (no scroll listener). Keeps accessible
    // parity without a JS scroll handler.
    return (
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4 sm:bottom-10">
        <Link
          href="/book"
          className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-[var(--slab)]/15 bg-[var(--surface)] px-5 py-3 text-sm shadow-[var(--shadow-lg)]"
        >
          <span className="t-eyebrow" style={{ color: "var(--muted)" }}>
            Ready when you are
          </span>
          <span className="font-medium">Book a session</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4 sm:bottom-10"
    >
      <Link
        href="/book"
        className="group pointer-events-auto inline-flex items-center gap-3 rounded-full border border-[var(--slab)]/15 bg-[var(--surface)] px-5 py-3 text-sm shadow-[var(--shadow-lg)] backdrop-blur"
      >
        <span
          className="t-eyebrow"
          style={{ color: "var(--muted)" }}
          aria-hidden="true"
        >
          Ready when you are
        </span>
        <span className="font-medium">Book a session</span>
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}
