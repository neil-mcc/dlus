"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";

/**
 * Magnetic — pulls its child 4–6px toward the cursor when the
 * pointer enters its bounding box. Used on the primary CTAs only
 * (Book, hero button, "Take the quiz"). Not a lot, but the right
 * amount: it's the single micro-interaction that makes the site
 * feel alive without being twee.
 *
 * Rules:
 * - Desktop only. Touch devices skip this entirely.
 * - Respects `prefers-reduced-motion` — renders as a plain span.
 * - Spring is tuned deliberately soft so it reads as "lean",
 *   not "yank". Stiffness 180, damping 18.
 */

type Props = {
  children: ReactNode;
  /** How far the element can travel toward the cursor (px). */
  strength?: number;
  className?: string;
};

export default function Magnetic({
  children,
  strength = 6,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // `useSpring` smooths the raw pointer delta so motion feels
  // physical instead of snapping. Tuned for gentleness.
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  const handleMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!ref.current || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    // Normalise pointer position to [-1, 1] relative to element centre,
    // then multiply by `strength` so the movement stays bounded.
    const mx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const my = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
