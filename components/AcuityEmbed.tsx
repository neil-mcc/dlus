"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { ACUITY_BOOKING_URL } from "@/lib/acuity";

// Acuity URL params that are safe to forward from the page URL into
// the iframe — UTM attribution plus their own `ref` escape hatch.
const FORWARDABLE = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "source",
  "ref",
]);

export default function AcuityEmbed() {
  const searchParams = useSearchParams();

  // Forward tracking params so the booking attributes back to the
  // originating CTA/campaign. `ref=embedded_csp` tells Acuity to
  // render the iframe-friendly chrome — keep it whether the page URL
  // supplied one or not.
  const iframeSrc = useMemo(() => {
    const forward = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      if (FORWARDABLE.has(key)) forward.set(key, value);
    }
    if (!forward.has("ref")) forward.set("ref", "embedded_csp");
    return `${ACUITY_BOOKING_URL}?${forward.toString()}`;
  }, [searchParams]);

  return (
    <div>
      {/* The iframe. `scrolling="no"` hands scroll to the host page so
          there's never a nested scrollbar inside the scheduler card.
          `height={2150}` is a conservative starting point — tall enough
          to fit Acuity's service picker + date/time views on first
          paint, and `embed.js` grows the iframe as the flow progresses. */}
      <div className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--surface)]">
        <iframe
          src={iframeSrc}
          title="Book a session at Dlús Recovery"
          width="100%"
          height={2150}
          frameBorder={0}
          scrolling="no"
          loading="lazy"
          className="block w-full"
        />
      </div>

      {/* Safari ITP / third-party cookie fallback */}
      <p className="mt-3 text-center text-xs text-[var(--muted)]">
        Having trouble booking?{" "}
        <a
          href={ACUITY_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-[var(--accent)]"
        >
          Open the scheduler in a new tab
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </p>

      {/* Acuity's auto-resize helper. Lazy-loaded so it never blocks the
          critical render path — the iframe still works without it, the
          script just adds smooth height transitions as users move between
          Acuity's steps. */}
      <Script
        src="https://embed.acuityscheduling.com/js/embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
