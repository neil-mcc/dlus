"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * PageTransition — wraps every route in app/template.tsx so that
 * navigating between routes produces a short cross-fade + 12px
 * Y-offset. This is the "soft-nav" equivalent of a page flip: it
 * smooths router transitions enough that the site feels like a
 * single continuous document instead of a collection of pages.
 *
 * Why not the native View Transitions API? We plan to progressively
 * enhance with it later as a tier-4 polish pass — it's not in every
 * browser yet. `motion/react` + `AnimatePresence` gives us a
 * guaranteed baseline today.
 *
 * `mode="wait"` ensures the outgoing page finishes exiting before
 * the new page begins entering — important on small screens where
 * stacked transforms can get messy.
 */

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{
          duration: 0.36,
          ease: [0.22, 1, 0.36, 1], // quint-out
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
