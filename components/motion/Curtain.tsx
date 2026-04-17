"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Curtain — plays exactly once per browser session on first paint.
 *
 * A full-viewport cream panel covers the hero, then slides up as
 * a unit revealing the content underneath. This exists for one
 * reason only: the first 900ms of a site visit sets the tone, and
 * a deliberate curtain says "this is an experience" more than any
 * amount of scroll reveal ever will.
 *
 * Implementation notes:
 * - Guarded by `sessionStorage` so repeated navigations within a
 *   single visit don't re-play it. This is critical — replaying
 *   the curtain on every soft-nav would be unbearable.
 * - Respects `prefers-reduced-motion` — returns null.
 * - `pointer-events: none` after the animation finishes so it
 *   doesn't swallow clicks on the page behind it during the
 *   tail end of the transition.
 * - Rendered at `position: fixed` with the highest z-index in the
 *   stacking context so it sits above every page element.
 */

export default function Curtain() {
  const reduce = useReducedMotion();
  const [play, setPlay] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // SSR guard — sessionStorage is not available during render.
    if (typeof window === "undefined") return;
    // The set-state-in-effect disable below is deliberate: this is a
    // one-shot read of sessionStorage that seeds initial play/done
    // state exactly once on mount. No cascading render — the effect
    // runs once, reads an external source, and settles.
    try {
      if (sessionStorage.getItem("dlus:curtain-seen") === "1") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot session seed
        setDone(true);
        return;
      }
      sessionStorage.setItem("dlus:curtain-seen", "1");
      setPlay(true);
    } catch {
      // Private mode or quota exceeded — degrade gracefully and
      // skip the curtain rather than crashing the page.
      setDone(true);
    }
  }, []);

  if (reduce || done) return null;
  if (!play) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1], // cubic in-out — the classic curtain feel
        delay: 0.25, // small hold so the cream is visible long enough to read as intentional
      }}
      onAnimationComplete={() => setDone(true)}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-end justify-center"
      style={{
        background: "var(--bg)",
        pointerEvents: done ? "none" : "auto",
      }}
    >
      {/* Tiny brand mark in the bottom-centre of the curtain.
          Gives the user something to look at during the 250ms hold. */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.0,
          times: [0, 0.25, 0.75, 1],
          ease: "easeOut",
        }}
        className="pb-24 text-[var(--accent)]"
        aria-hidden="true"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Breath-cycle ring: the loose "sigil" we reuse as a brand
              mark — a circle with a single open arc, nodding to the
              inhale/exhale rhythm that underpins the whole brand. */}
          <circle
            cx="18"
            cy="18"
            r="15"
            stroke="currentColor"
            strokeWidth="1.25"
            opacity="0.35"
          />
          <path
            d="M18 3 A15 15 0 0 1 33 18"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
