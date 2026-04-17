"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
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
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Progress bar fills from 0 → 100% as the pinned section scrolls
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Reduced-motion: flatten the pinned-scroll choreography entirely.
  // Each step renders as plain flow at full opacity so the content
  // is still readable and the progress bar stays parked at 100%
  // without chasing scroll.
  if (reduce) {
    return (
      <div className="mx-auto w-full max-w-[var(--max-w)] px-6 py-20 sm:px-8 sm:py-28">
        <span className="t-eyebrow">A first visit</span>
        <h2 className="t-h1 mt-4">
          Your first session, <br />
          minute by minute.
        </h2>
        <ol className="mt-12 flex flex-col gap-10">
          {STEPS.map((step) => (
            <li
              key={step.time}
              className="flex gap-6 border-l border-[var(--rule)] pl-6"
            >
              <div className="flex flex-col gap-2">
                <span className="t-eyebrow" style={{ color: "var(--accent)" }}>
                  {step.time}
                </span>
                <h3 className="t-h3">{step.title}</h3>
                <p className="t-body" style={{ color: "var(--muted)" }}>
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <>
      {/* On mobile the heading sits above the pinned scroll container
          so the steps have enough vertical room inside h-screen. */}
      <div className="px-6 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-28 lg:hidden">
        <span className="t-eyebrow">A first visit</span>
        <h2 className="t-h1 mt-4">
          Your first session, <br />
          minute by minute.
        </h2>
      </div>

      <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-[var(--max-w)] gap-8 px-6 sm:gap-12 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
          {/* Left rail — eyebrow + heading + progress line (desktop only) */}
          <div className="hidden flex-col gap-8 lg:flex">
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
          <ol className="flex flex-col gap-6 sm:gap-10">
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
    </>
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
  // Rows are spaced evenly across [0.05, 0.65] so the first row lights
  // up just after the pin starts and the last row lights up before the
  // pin releases. Once a row reaches its peak it stays at full
  // opacity — earlier steps remain legible as you read past them,
  // and rows ahead of the current scroll position keep a dim intro
  // state so the "walking line" reveal still feels directional.
  const windowStart = 0.05;
  const windowEnd = 0.65;
  const span = windowEnd - windowStart;
  const peak = windowStart + (span * (index + 0.5)) / count;
  const half = span / count;
  // Strictly monotonic, inside [0, 1].
  const fadeIn = Math.max(0, peak - half);
  const opacity = useTransform(
    progress,
    [fadeIn, peak, 1],
    [0.35, 1, 1],
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
