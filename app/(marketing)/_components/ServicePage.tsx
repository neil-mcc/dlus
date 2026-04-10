import { CheckCircle2, AlertCircle } from "lucide-react";
import NextImage from "next/image";
import Section from "@/components/Section";
import BookNowButton from "@/components/BookNowButton";
import FAQAccordion from "@/components/FAQAccordion";
import Prose from "@/components/Prose";
import AmbientField from "@/components/AmbientField";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { urlFor } from "@/lib/sanity/image";
import ResearchCitations, {
  type Citation,
} from "@/components/ResearchCitations";
import type { Service } from "@/lib/sanity/types";
import type { AcuityServiceKey } from "@/lib/acuity";

/**
 * ServicePage — shared template consumed by /hbot, /red-light-therapy
 * and /pemf. It takes a `variant` prop that swaps per-therapy art
 * direction (hero backdrop, eyebrow colour, "mood"), while the
 * content backbone and information architecture stay identical so
 * editors have one Sanity schema to populate.
 *
 * Per-variant art direction summary:
 *
 *   hbot      — dark slab hero, AmbientField "hbot" (pressure rings),
 *               teal eyebrow, pre-screening notice banner, "descent"
 *               metaphor in copy voice.
 *   redLight  — ember/terracotta hero, AmbientField "redLight"
 *               (breathing bloom), warm accent overrides.
 *   pemf      — mid-teal hero, AmbientField "pemf" (Schumann
 *               lattice), rhythmic language.
 */

type Variant = "hbot" | "redLight" | "pemf";

type Props = {
  service: Service | null;
  fallback: {
    title: string;
    summary: string;
    bookKey: AcuityServiceKey;
  };
  variant: Variant;
  showHbotNotice?: boolean;
  /**
   * Optional research citations rendered near the bottom of the
   * page. Per-therapy defaults live in the page files themselves
   * so they can stay editable without touching the template.
   */
  citations?: Citation[];
};

// Eyebrow + small styling tokens per variant. Keeps the variant
// config in one place so adding a fourth therapy is one line.
const VARIANTS: Record<
  Variant,
  {
    eyebrow: string;
    accent: string;
    accentInk: string;
    slab: string;
    slabInk: string;
  }
> = {
  hbot: {
    eyebrow: "HBOT · Pressure & oxygen",
    accent: "var(--accent)",
    accentInk: "var(--slab-ink)",
    slab: "var(--slab)",
    slabInk: "var(--slab-ink)",
  },
  redLight: {
    eyebrow: "Red Light · Photobiomodulation",
    accent: "var(--ember)",
    accentInk: "var(--ember-soft)",
    slab: "#1a0a05",
    slabInk: "var(--ember-soft)",
  },
  pemf: {
    eyebrow: "PEMF · Pulsed fields",
    accent: "#78bec6",
    accentInk: "var(--slab-ink)",
    slab: "#0f1a1c",
    slabInk: "var(--slab-ink)",
  },
};

export default function ServicePage({
  service,
  fallback,
  variant,
  showHbotNotice = false,
  citations,
}: Props) {
  const v = VARIANTS[variant];
  const title = service?.title ?? fallback.title;
  const summary = service?.shortDescription ?? fallback.summary;
  const bookKey = service?.acuityLinkKey ?? fallback.bookKey;

  // When real photography exists for this therapy, layer it under the
  // AmbientField and crank the dark overlay so the type still reads.
  const heroImage = service?.heroImage;
  type Asset = { metadata?: { lqip?: string } };
  type Sourceable = { asset?: Asset };
  const heroLqip =
    (heroImage as Sourceable | undefined)?.asset?.metadata?.lqip;
  const heroUrl = heroImage
    ? urlFor(heroImage).width(2000).auto("format").fit("max").url()
    : null;

  return (
    <>
      {/* --------------------------------------------------------
          HERO — full-bleed slab with AmbientField backdrop
          -------------------------------------------------------- */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: v.slab }}
      >
        {/* Photography layer — only renders when Sanity has a heroImage
            set; otherwise the AmbientField carries the hero on its own. */}
        {heroUrl ? (
          <div className="absolute inset-0" aria-hidden="true">
            <NextImage
              src={heroUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              placeholder={heroLqip ? "blur" : "empty"}
              blurDataURL={heroLqip}
              className="object-cover opacity-80"
            />
          </div>
        ) : null}
        {/* Ambient canvas — stays behind the image at reduced opacity
            when a photo is present so the brand motion still breathes
            through the background. */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ opacity: heroUrl ? 0.35 : 1 }}
        >
          <AmbientField variant={variant} intensity={0.95} />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, transparent 35%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[78vh] w-full max-w-[var(--max-w-wide)] flex-col justify-end px-6 pb-20 pt-40 sm:px-12 sm:pb-28 sm:pt-52">
          <Reveal>
            <span
              className="t-eyebrow"
              style={{ color: v.accent }}
            >
              {v.eyebrow}
            </span>
            <h1
              className="t-display-sm mt-6 max-w-[14ch]"
              style={{ color: v.slabInk }}
            >
              {title}
            </h1>
            <p
              className="t-lead mt-8 max-w-2xl"
              style={{ color: v.slabInk, opacity: 0.75 }}
            >
              {summary}
            </p>
            <div className="mt-12">
              <Magnetic>
                <BookNowButton serviceKey={bookKey} />
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------
          HBOT pre-screening notice — only on /hbot
          -------------------------------------------------------- */}
      {showHbotNotice ? (
        <Section bleed className="py-10">
          <div
            className="flex items-start gap-4 rounded-2xl border p-6"
            style={{
              borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)",
              background:
                "color-mix(in srgb, var(--accent) 8%, var(--bg))",
            }}
          >
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed">
              <strong>Pre-screening required.</strong> Some conditions require a
              short consultation before your first HBOT session. We&rsquo;ll
              send a brief health questionnaire when you book.
              {/* TODO: legal review */}
            </p>
          </div>
        </Section>
      ) : null}

      {/* --------------------------------------------------------
          WHAT IT IS — prose + benefits aside
          -------------------------------------------------------- */}
      <Section>
        <Reveal className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="t-eyebrow">The protocol</span>
            <h2 className="t-h1 mt-4">What it is</h2>
            <div className="mt-8">
              <Prose value={service?.whatItIs} />
              {!service?.whatItIs ? (
                <p className="text-sm text-[var(--muted)]">
                  Detailed explanation will appear here once added in Sanity.
                </p>
              ) : null}
            </div>
          </div>
          {service?.benefits && service.benefits.length > 0 ? (
            <aside
              className="relative rounded-3xl border p-8"
              style={{
                borderColor: "var(--rule)",
                background: "var(--surface)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span
                className="t-eyebrow"
                style={{ color: "var(--muted)" }}
              >
                Commonly used for
              </span>
              <ul className="mt-5 space-y-4">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: v.accent }}
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[10px] leading-relaxed text-[var(--muted)]">
                Hedged language only. Users report &mdash; no claims of
                treatment, cure or prevention.
                {/* TODO: legal review */}
              </p>
            </aside>
          ) : null}
        </Reveal>
      </Section>

      {/* --------------------------------------------------------
          SESSION EXPERIENCE
          -------------------------------------------------------- */}
      {service?.sessionExperience ? (
        <Section tone="muted">
          <Reveal>
            <span className="t-eyebrow">Inside a session</span>
            <h2 className="t-h1 mt-4">What to expect</h2>
            <div className="mt-8 max-w-3xl">
              <Prose value={service.sessionExperience} />
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* --------------------------------------------------------
          CONTRAINDICATIONS
          -------------------------------------------------------- */}
      <Section>
        <Reveal>
          <span className="t-eyebrow">Safety first</span>
          <h2 className="t-h1 mt-4">Contraindications &amp; safety</h2>
          <div className="mt-8 max-w-3xl">
            <Prose value={service?.contraindications} />
            {!service?.contraindications ? (
              <p className="text-sm text-[var(--muted)]">
                Safety information will appear here once added in Sanity.
                {/* TODO: legal review */}
              </p>
            ) : null}
          </div>
        </Reveal>
      </Section>

      {/* --------------------------------------------------------
          RESEARCH CITATIONS — collapsible sources
          -------------------------------------------------------- */}
      {citations && citations.length > 0 ? (
        <Section tone="muted">
          <Reveal className="max-w-3xl">
            <span className="t-eyebrow">The science</span>
            <h2 className="t-h2 mt-4">What research suggests</h2>
            <p
              className="mt-4 text-sm"
              style={{ color: "var(--muted)" }}
            >
              A small selection of peer-reviewed sources we find useful.
              Research suggests, users report &mdash; claims remain hedged
              until larger trials say otherwise.
            </p>
            <ResearchCitations items={citations} className="mt-8" />
          </Reveal>
        </Section>
      ) : null}

      {/* --------------------------------------------------------
          FAQ
          -------------------------------------------------------- */}
      {service?.faqs && service.faqs.length > 0 ? (
        <Section>
          <Reveal>
            <span className="t-eyebrow">FAQ</span>
            <h2 className="t-h1 mt-4">Frequently asked</h2>
            <div className="mt-8 max-w-3xl">
              <FAQAccordion items={service.faqs} />
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* --------------------------------------------------------
          FINAL CTA — uses the variant's slab for continuity
          -------------------------------------------------------- */}
      <section
        className="grain relative isolate"
        style={{ background: v.slab, color: v.slabInk }}
      >
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          <AmbientField variant={variant} intensity={0.6} />
        </div>
        <div className="relative mx-auto flex w-full max-w-[var(--max-w-wide)] flex-col items-start gap-8 px-6 py-28 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-32">
          <div>
            <span className="t-eyebrow" style={{ color: v.accent }}>
              Book a session
            </span>
            <h2
              className="t-display-sm mt-4 max-w-xl"
              style={{ color: v.slabInk }}
            >
              Ready to try {title.toLowerCase()}?
            </h2>
          </div>
          <Magnetic>
            <BookNowButton serviceKey={bookKey} />
          </Magnetic>
        </div>
      </section>
    </>
  );
}
