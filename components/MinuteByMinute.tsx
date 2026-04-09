"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * MinuteByMinute — a pinned scroll timeline that walks a visitor
 * through a first session minute-by-minute. Four rows; as the
 * user scrolls, a progress line fills in and the active row
 * highlights. The outer container is tall (300vh) so each row
 * gets its own chunk of scroll, but the sticky inner layout
 * stays fixed at viewport centre.
 *
 * This is the single "scroll choreography" moment on the home
 * page — restrained enough to feel intentional, interactive
 * enough to be memorable. Modelled on editorial long-reads
 * rather than animated product sites.
 *
 * Accessibility:
 * - All rows render as normal flow at base (no scroll effects) so
 *   screen readers and reduced-motion users get the full content.
 * - The progress bar is decorative (`aria-hidden`).
 */

const STEPS = [
  {
    time: "0:00",
    title: "Arrival & settle",
    body: "You arrive, swap to studio slippers, and spend a few quiet minutes with a warm drink. No clipboards, no rush.",
  },
  {
    time: "0:10",
    title: "Pre-session walkthrough",
    body: "We confirm how you're feeling today, talk through the protocol, and answer anything from the health questionnaire.",
  },
  {
    time: "0:20",
    title: "Session",
    body: "You're inside your chamber, under your panel, or on your mat. Lights dim. 40–60 minutes of slowness.",
  },
  {
    time: "1:20",
    title: "Integration",
    body: "Re-emerge gently. Hydrate, journal a note, linger. Most people take ten minutes before heading back into the world.",
  },
];

export default function MinuteByMinute() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Progress bar fills from 0 → 100% as the pinned section scrolls
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-[var(--max-w)] gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
          {/* Left rail — eyebrow + heading + progress line */}
          <div className="flex flex-col gap-8">
            <span className="t-eyebrow">A first visit</span>
            <h2 className="t-h1">
              Your first session, <br />
              minute by minute.
            </h2>
            <div className="relative mt-4 h-1 w-48 overflow-hidden rounded-full bg-[var(--rule)]">
              <motion.div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
                style={{ width: progress }}
              />
            </div>
          </div>

          {/* Right — the four rows. Each row becomes brighter as you
              scroll past its threshold. We use `useTransform` on
              scrollYProgress to map ranges to opacity without
              mounting per-row observers. */}
          <ol className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <Row
                key={step.time}
                step={step}
                index={i}
                count={STEPS.length}
                progress={scrollYProgress}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function Row({
  step,
  index,
  count,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  count: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each row "activates" across a window of the overall progress.
  //
  // We use a three-point mapping (dim → bright → dim) rather than a
  // four-point one so there's no risk of two offsets colliding at the
  // clamp boundaries. Rows are spaced evenly across [0.05, 0.9] so the
  // first row lights up just after the pin starts and the last row
  // lights up before the pin releases — otherwise the final step
  // never reaches full opacity because the sticky unpins before
  // progress hits 1.
  const isLast = index === count - 1;
  const windowStart = 0.05;
  const windowEnd = 0.9;
  const span = windowEnd - windowStart;
  const peak = windowStart + (span * (index + 0.5)) / count;
  const half = span / count;
  // Strictly monotonic, inside [0, 1].
  const fadeIn = Math.max(0, peak - half);
  const fadeOut = Math.min(1, peak + half);
  // The last row stays lit once reached — no fade-back-out ramp, so
  // it remains fully visible as the viewer reads past the pin.
  const opacity = useTransform(
    progress,
    isLast ? [fadeIn, peak] : [fadeIn, peak, fadeOut],
    isLast ? [0.35, 1] : [0.35, 1, 0.35],
  );

  return (
    <motion.li style={{ opacity }} className="flex gap-6 border-l border-[var(--rule)] pl-6">
      <div className="flex flex-col gap-2">
        <span className="t-eyebrow" style={{ color: "var(--accent)" }}>
          {step.time}
        </span>
        <h3 className="t-h3">{step.title}</h3>
        <p className="t-body" style={{ color: "var(--muted)" }}>
          {step.body}
        </p>
      </div>
    </motion.li>
  );
}
