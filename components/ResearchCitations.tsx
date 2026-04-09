import { ExternalLink } from "lucide-react";

/**
 * ResearchCitations — a collapsible `<details>` list of peer-reviewed
 * sources for a service. Semantic, keyboard-accessible, zero JS.
 *
 * Deliberately not a "claim generator" — the copy around it upstream
 * (in ServicePage) is what keeps the language hedged. This component
 * is just the presentational wrapper for the source list.
 */

export type Citation = {
  /** Title of the paper / article as written in the source */
  title: string;
  /** Journal, organisation or domain (e.g. "J Appl Physiol, 2019") */
  source: string;
  /** The link to the article or abstract (DOI.org preferred) */
  href: string;
  /** Optional one-sentence note in our own words */
  note?: string;
};

type Props = {
  items: Citation[];
  className?: string;
};

export default function ResearchCitations({ items, className = "" }: Props) {
  if (items.length === 0) return null;
  return (
    <details
      className={`group rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 ${className}`}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
        <span>View {items.length} sources</span>
        <span
          className="text-[var(--muted)] transition-transform group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <ul className="mt-6 space-y-5 border-t border-[var(--rule)] pt-6">
        {items.map((c) => (
          <li key={c.href} className="text-sm">
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-start gap-2 font-medium text-[var(--fg)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
            >
              <span>{c.title}</span>
              <ExternalLink
                className="mt-1 h-3 w-3 shrink-0 opacity-60 transition-opacity group-hover/link:opacity-100"
                aria-hidden="true"
              />
            </a>
            <p className="mt-1 text-xs text-[var(--muted)]">{c.source}</p>
            {c.note ? (
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                {c.note}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </details>
  );
}
