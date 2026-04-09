/**
 * Studio layout: skips the marketing Header/Footer (those live in
 * `(marketing)/layout.tsx`), exports robots metadata so the studio is
 * never indexed, and re-exports the viewport that next-sanity ships.
 */
import type { Metadata } from "next";
import { metadata as studioMeta, viewport as studioViewport } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMeta,
  title: "Studio",
  robots: { index: false, follow: false },
};

export const viewport = studioViewport;

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
