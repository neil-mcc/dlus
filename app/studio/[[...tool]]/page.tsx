"use client";

/**
 * Embedded Sanity Studio at /studio.
 * Must be a client component — Sanity ships React context that cannot run
 * during server prerendering.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
