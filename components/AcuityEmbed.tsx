"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  ACUITY_LABELS,
  ACUITY_LINKS,
  type AcuityServiceKey,
} from "@/lib/acuity";

const SERVICE_ORDER: AcuityServiceKey[] = [
  "hbot",
  "redLight",
  "pemf",
  "consultation",
];

const SERVICE_LABELS: Record<AcuityServiceKey, string> = {
  hbot: "HBOT",
  redLight: "Red Light",
  pemf: "PEMF",
  consultation: "Free consult",
};

function isServiceKey(value: string | null): value is AcuityServiceKey {
  return value !== null && (SERVICE_ORDER as string[]).includes(value);
}

export default function AcuityEmbed() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("service");
  const [active, setActive] = useState<AcuityServiceKey>(
    isServiceKey(initial) ? initial : "consultation",
  );

  // Append embed-friendly query params. The `ref=embedded_csp` flag tells
  // Acuity to render a simplified chrome suited to iframe embedding.
  const iframeSrc = useMemo(() => {
    const base = ACUITY_LINKS[active];
    const joiner = base.includes("?") ? "&" : "?";
    return `${base}${joiner}ref=embedded_csp`;
  }, [active]);

  return (
    <div>
      {/* Service picker */}
      <div
        role="tablist"
        aria-label="Choose a service to book"
        className="flex flex-wrap gap-2"
      >
        {SERVICE_ORDER.map((key) => {
          const selected = key === active;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(key)}
              className={
                selected
                  ? "rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-ink)] transition"
                  : "rounded-full border border-[var(--rule)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--wordmark)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }
            >
              {SERVICE_LABELS[key]}
            </button>
          );
        })}
      </div>

      {/* HBOT-specific notice, shown only when HBOT is selected */}
      {active === "hbot" ? (
        <p
          role="note"
          className="mt-4 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent-soft)] p-4 text-sm leading-relaxed text-[var(--fg)]"
        >
          <strong>First HBOT visit?</strong> We'll send a short health
          questionnaire after you book. Some conditions require a brief
          pre-screening consultation before your first session.
          {/* TODO: legal review */}
        </p>
      ) : null}

      {/* The iframe. `key` forces a full remount when the active service
          changes so Acuity's internal state resets cleanly. `scrolling="no"`
          + `embed.js` hand scrolling to the host page so there's never a
          nested scrollbar inside the scheduler card (matches the HotBox
          pattern). `height={1100}` is a conservative starting point — tall
          enough to fit Acuity's date/time picker on first paint, and
          `embed.js` grows the iframe as the flow progresses. */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--surface)]">
        <iframe
          key={active}
          src={iframeSrc}
          title={`Book ${ACUITY_LABELS[active]}`}
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
          href={ACUITY_LINKS[active]}
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
