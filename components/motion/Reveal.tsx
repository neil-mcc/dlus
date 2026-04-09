"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reveal — the site's single scroll-triggered entrance animation.
 *
 * Philosophy: one reveal, applied consistently. Fighting the urge to
 * invent per-component entrances is what keeps a motion system
 * feeling considered instead of busy.
 *
 * - Fades from 0 → 1 opacity
 * - Rises 24px on Y
 * - Triggers via IntersectionObserver inside `whileInView`
 * - Fires once (`viewport.once`) so back-scroll doesn't replay
 * - Staggers children by default so headings + leads feel grouped
 * - Respects `prefers-reduced-motion` at the JS level (skips entirely)
 *
 * Use as a wrapper on any block:
 *
 *   <Reveal>
 *     <h2 className="t-h2">…</h2>
 *     <p className="t-lead">…</p>
 *   </Reveal>
 */

type Props = {
  children: ReactNode;
  /** Delay before the reveal fires, in seconds. */
  delay?: number;
  /** Override the default Y offset (24px). */
  y?: number;
  /** Forward className to the outer motion wrapper. */
  className?: string;
  /** Stagger between direct children (seconds). 0 = no stagger. */
  stagger?: number;
  /** Render as an inline element (default is block div). */
  as?: "div" | "section" | "article" | "li";
};

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  stagger = 0.08,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();

  // With reduced-motion on, skip the animation entirely and render
  // a static wrapper. We still emit the element so layouts don't
  // shift when reduced-motion flips at runtime.
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {/* One child variant applied to every direct descendant.
          We wrap each child in a motion.div so the parent stagger
          has something to drive. This is the only place we nest
          motion elements — everything else uses top-level Reveal. */}
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.72,
                    ease: [0.16, 1, 0.3, 1], // matches --ease-out-smooth
                  },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : (
            <motion.div
              variants={{
                hidden: { opacity: 0, y },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {children}
            </motion.div>
          )}
    </MotionTag>
  );
}
