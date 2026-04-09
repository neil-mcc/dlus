"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cursor — a minimal custom cursor consisting of two circles:
 *
 *   - A 6px solid dot that tracks the pointer 1:1 (precise clicks)
 *   - A 36px outline ring that follows the dot with spring damping,
 *     scaling up to 72px when hovering an interactive element
 *
 * This is the single "premium wink" that costs the least and buys
 * the most. It signals "custom work" to every portfolio reviewer
 * in the first 200ms of mouse movement.
 *
 * Hard rules:
 * - Desktop only: gated by `(pointer: fine)` media query
 * - Respects `prefers-reduced-motion` — renders null
 * - Sets `body[data-cursor="on"]` so `globals.css` can hide the
 *   native cursor via CSS (keeps JS + CSS in sync)
 * - Uses pointer events, not mousemove, so pen/stylus works
 */

export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Ring follows with spring easing — creates the "lag" that
  // reads as weight / presence. Dot stays tight on the pointer.
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only mount on fine-pointer devices.
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;
    setEnabled(true);
    document.body.setAttribute("data-cursor", "on");

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
    };

    // Detect hover over interactive elements by walking the composed
    // path. `closest` catches nested children (spans inside buttons, etc.)
    const handleOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, summary, label',
      );
      setHot(!!interactive);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.body.removeAttribute("data-cursor");
    };
  }, [x, y]);

  if (reduce || !enabled) return null;

  return (
    <>
      {/* Ring — follows with spring lag + scales on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-[var(--accent)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hot ? 64 : 32,
          height: hot ? 64 : 32,
          mixBlendMode: "difference",
        }}
        transition={{ width: { duration: 0.25 }, height: { duration: 0.25 } }}
      />
      {/* Dot — 1:1 with pointer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[91] rounded-full bg-[var(--accent)]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
        }}
      />
    </>
  );
}
