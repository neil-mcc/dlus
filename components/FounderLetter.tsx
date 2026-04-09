import Reveal from "@/components/motion/Reveal";
import SanityImage from "@/components/SanityImage";
import type { Image as SanityImageSource } from "sanity";

/**
 * FounderLetter — a two-column "letter from the founder" editorial
 * block. Left column holds a portrait (or a duotone fallback via
 * SanityImage); right column holds an eyebrow, a headline, three
 * paragraphs of body copy and a handwritten-style signature.
 *
 * The signature is a single SVG path in Fraunces-ish curve style —
 * not a real handwriting font, because importing one would bloat
 * the page. It reads as "handwritten" from a metre away, which
 * is all it needs to do visually.
 *
 * Content comes via props so future Sanity wiring can pass in
 * a `person` document without this component having to know.
 */

type Props = {
  portrait?: SanityImageSource | null;
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  signatureName: string;
  role: string;
};

export default function FounderLetter({
  portrait,
  eyebrow = "A letter",
  heading,
  paragraphs,
  signatureName,
  role,
}: Props) {
  return (
    <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
      {/* Portrait column. SanityImage renders the brand duotone
          fallback when no portrait exists — so the column never
          feels empty even pre-photography. */}
      <div>
        <SanityImage
          source={portrait}
          alt={`Portrait of ${signatureName}`}
          aspect="4/5"
          variant="ember"
          widthHint={520}
          className="rounded-3xl shadow-[var(--shadow-lg)]"
        />
      </div>

      <div className="flex flex-col justify-center">
        <span className="t-eyebrow" style={{ color: "var(--ember-deep)" }}>
          {eyebrow}
        </span>
        <h2 className="t-h1 mt-4">{heading}</h2>
        <div className="mt-8 flex flex-col gap-5 text-[var(--fg)]/85">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        {/* Signature block — SVG handwritten-ish script. We render
            the name text in serif italics because a real script
            font would be overkill for four words. */}
        <div className="mt-10 flex items-end gap-5">
          <svg
            width="110"
            height="40"
            viewBox="0 0 110 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 26 C14 4, 24 46, 34 18 S 56 2, 72 26 S 98 8, 106 22"
              stroke="var(--ember)"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div>
            <p
              className="font-serif text-xl italic"
              style={{ color: "var(--fg)" }}
            >
              {signatureName}
            </p>
            <p
              className="text-xs uppercase tracking-[0.24em]"
              style={{ color: "var(--muted)" }}
            >
              {role}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
