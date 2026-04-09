import PageTransition from "@/components/motion/PageTransition";
import type { ReactNode } from "react";

/**
 * app/template.tsx — renders a fresh instance on every navigation.
 *
 * Unlike `layout.tsx`, Next.js re-mounts templates when the route
 * changes. That's exactly what we want for `PageTransition`: it
 * lets `AnimatePresence` see the key change and run the exit/enter
 * sequence. The layout above still holds the header, footer, and
 * global motion chrome (Curtain, Cursor), which all persist across
 * navigations.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
