"use client";

import { useEffect } from "react";
import Link from "next/link";
import Section from "@/components/Section";

/**
 * Marketing segment error boundary. Catches runtime errors thrown by
 * any page under `/(marketing)/*` and renders an editorial apology
 * that keeps the Header/Footer chrome. A hard reload option plus a
 * soft `reset()` retry — the latter is usually all that's needed
 * for transient data-fetch failures.
 */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to monitoring. In dev this shows up in the terminal;
    // in prod the Vercel runtime captures it automatically.
    console.error("Marketing route error:", error);
  }, [error]);

  return (
    <Section bleed className="pt-32 pb-32 sm:pt-44">
      <span className="t-eyebrow">Something slipped</span>
      <h1 className="t-display-sm mt-4 max-w-[16ch]">
        We hit a snag loading this page.
      </h1>
      <p
        className="t-lead mt-6 max-w-2xl"
        style={{ color: "var(--muted)" }}
      >
        A retry usually does it. If it keeps happening, let us know
        and we&rsquo;ll take a look — nothing to do on your end.
      </p>

      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 font-medium uppercase tracking-wide text-[var(--accent-ink)] transition hover:bg-[var(--accent-deep)]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-[var(--fg)]/30 px-6 py-3 font-medium uppercase tracking-wide transition hover:border-[var(--fg)]"
        >
          Return home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 self-center underline underline-offset-4 hover:text-[var(--accent)]"
        >
          Contact the studio →
        </Link>
      </div>

      {error.digest ? (
        <p className="mt-8 text-xs text-[var(--muted)]">
          Reference: <code className="font-mono">{error.digest}</code>
        </p>
      ) : null}
    </Section>
  );
}
