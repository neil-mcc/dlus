import Link from "next/link";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Not found",
  description:
    "That page doesn't exist — or has moved. Here are a few ways back to the studio.",
  path: "/404",
});

/**
 * 404 for the marketing segment. Lives inside (marketing) so the
 * Header/Footer chrome is preserved — a missing page shouldn't feel
 * like the whole site broke.
 */
export default function NotFound() {
  return (
    <Section bleed className="pt-32 pb-32 sm:pt-44">
      <span className="t-eyebrow">404 · not here</span>
      <h1 className="t-display-sm mt-4 max-w-[16ch]">
        This path didn&rsquo;t land.
      </h1>
      <p
        className="t-lead mt-6 max-w-2xl"
        style={{ color: "var(--muted)" }}
      >
        The page you were after has moved, been renamed, or never
        existed. Nothing&rsquo;s broken — the studio is still here.
      </p>

      <ul className="mt-12 grid gap-3 text-sm sm:grid-cols-2">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-[var(--accent)]"
          >
            Return home →
          </Link>
        </li>
        <li>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-[var(--accent)]"
          >
            Book an HBOT session →
          </Link>
        </li>
        <li>
          <Link
            href="/hbot"
            className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-[var(--accent)]"
          >
            Read about HBOT →
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-[var(--accent)]"
          >
            Contact the studio →
          </Link>
        </li>
      </ul>
    </Section>
  );
}
