import Link from "next/link";
import NextImage from "next/image";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import Section from "@/components/Section";
import BookNowButton from "@/components/BookNowButton";
import LocalBusinessJsonLd from "@/components/JsonLd";
import AmbientField from "@/components/AmbientField";
import TherapyGallery from "@/components/TherapyGallery";
import MinuteByMinute from "@/components/MinuteByMinute";
import QuoteSpread from "@/components/QuoteSpread";
import StatStrip from "@/components/StatStrip";
import SanityImage from "@/components/SanityImage";
import StickyBookDock from "@/components/StickyBookDock";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { getSiteSettings, getTestimonials } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dlús Recovery — HBOT, Red Light & PEMF Therapy",
  description:
    "A calm, considered recovery studio offering Hyperbaric Oxygen, Red Light, and PEMF therapy. Book a session in minutes.",
  path: "/",
});

/**
 * Home page — editorial rebuild.
 *
 * Section rhythm (top → bottom):
 *   1. Typographic hero on a brand AmbientField
 *   2. StatStrip — concrete proof
 *   3. TherapyGallery — horizontal scroll-snap, per-therapy ambient
 *   4. MinuteByMinute — pinned scroll timeline of a first visit
 *   5. QuoteSpread × N — one full-bleed slab per testimonial
 *   6. Location strip (unchanged intent, tightened visuals)
 *   7. Final CTA on an ember-soft background
 *
 * The sticky book dock lives outside <main> via the root layout
 * fragment so it persists across anchor scrolling within the page.
 */

export default async function HomePage() {
  const [testimonials, settings] = await Promise.all([
    getTestimonials(),
    getSiteSettings(),
  ]);

  // Optional home-hero photograph. If present, we layer it under the
  // AmbientField at reduced canvas opacity and push the vignette
  // darker so the display type keeps its contrast.
  const heroImage = settings?.heroImage;
  type Asset = { metadata?: { lqip?: string } };
  type Sourceable = { asset?: Asset };
  const heroLqip =
    (heroImage as Sourceable | undefined)?.asset?.metadata?.lqip;
  const heroUrl = heroImage
    ? urlFor(heroImage).width(2400).auto("format").fit("max").url()
    : null;

  return (
    <>
      <LocalBusinessJsonLd settings={settings} />
      <StickyBookDock />

      {/* --------------------------------------------------------
          1. HERO — typographic, full-bleed, AmbientField backdrop
          -------------------------------------------------------- */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "var(--slab)" }}
      >
        {/* Photography layer — only renders when a Sanity heroImage is
            set, otherwise the AmbientField carries the hero on its own. */}
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
        {/* Canvas backdrop — brand variant is the slow teal/brass
            orbit, intentionally calm behind the display type. */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ opacity: heroUrl ? 0.35 : 1 }}
        >
          <AmbientField variant="brand" intensity={0.9} />
        </div>
        {/* Grain + vignette overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 40% 30%, transparent 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-[var(--max-w-wide)] flex-col justify-between px-6 pb-12 pt-24 sm:px-12 sm:pb-24 sm:pt-48">
          {/* Top-left eyebrow */}
          <div className="flex items-center justify-between">
            <span className="t-eyebrow" style={{ color: "var(--accent)" }}>
              Dlús Recovery · {settings?.address?.city ?? "Armagh"}
            </span>
            <span
              className="hidden text-sm sm:inline"
              style={{ color: "var(--slab-ink)", opacity: 0.6 }}
            >
              Est. 2026 · Now open
            </span>
          </div>

          {/* Display type */}
          <div className="mt-16">
            <Reveal>
              <h1
                className="t-display max-w-[18ch]"
                style={{ color: "var(--slab-ink)" }}
              >
                Recovery,
                <br />
                Elevated
              </h1>
              <p
                className="t-lead mt-8 max-w-xl"
                style={{ color: "var(--slab-ink)", opacity: 0.75 }}
              >
                Hyperbaric Oxygen,
                Red Light and PEMF therapy in a space designed for the nervous
                system, not the algorithm.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <Magnetic>
                  <BookNowButton
                    serviceKey="consultation"
                    label="Book a session"
                  />
                </Magnetic>
                <Link
                  href="/which"
                  className="group inline-flex items-center gap-2 text-sm font-medium underline-offset-4"
                  style={{ color: "var(--slab-ink)" }}
                >
                  Which therapy fits me?
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------
          2. PROOF STRIP
          -------------------------------------------------------- */}
      <Section className="border-t border-[var(--rule)]">
        <StatStrip
          items={[
            { value: "3", label: "Therapies under one roof" },
            { value: "60", label: "Min. buffer between slots" },
            { value: "2026", label: "Opened this spring" },
            { value: "BT60", label: "Lurgyvallen, Armagh" },
          ]}
        />
      </Section>

      {/* --------------------------------------------------------
          3. THERAPY GALLERY
          -------------------------------------------------------- */}
      <Section tone="muted">
        <Reveal className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="t-eyebrow">Three therapies</span>
            <h2 className="t-h1 mt-4 max-w-xl">
              One studio. Three ways to recover.
            </h2>
          </div>
          <p className="t-body max-w-md" style={{ color: "var(--muted)" }}>
            Use them on their own or stack them. Not sure which fits your goals?
            Take the 30-second quiz or book a free 15-minute consultation.
          </p>
        </Reveal>
        <TherapyGallery />
      </Section>

      {/* --------------------------------------------------------
          4. MINUTE BY MINUTE — pinned scroll timeline
          -------------------------------------------------------- */}
      <MinuteByMinute />

      {/* --------------------------------------------------------
          5. QUOTE SPREADS — one slab per testimonial
          -------------------------------------------------------- */}
      {testimonials.slice(0, 2).map((t, i) => (
        <QuoteSpread
          key={t._id}
          testimonial={t}
          align={i % 2 === 0 ? "left" : "right"}
        />
      ))}

      {/* --------------------------------------------------------
          6. LOCATION
          -------------------------------------------------------- */}
      {settings?.address ? (
        <Section>
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-stretch">
            {/* Left: address + hours */}
            <div className="flex flex-col justify-between gap-10">
              <div>
                <span className="t-eyebrow">Find us</span>
                <h2 className="t-h2 mt-4">
                  {settings.address.line1},<br />
                  {settings.address.city} {settings.address.postcode}
                </h2>
                <p
                  className="mt-6 max-w-sm text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  Tucked into Lurgyvallen Business Park on the edge of Armagh.
                  Free parking at the door, a slower room the moment you step
                  inside.
                </p>
              </div>
              {settings.openingHours ? (
                <ul
                  className="space-y-3 border-t border-[var(--rule)] pt-6 text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {settings.openingHours.map((row) => (
                    <li key={row.day} className="flex justify-between gap-6">
                      <span className="font-medium text-[var(--fg)]">
                        {row.day}
                      </span>
                      <span>{row.hours}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Right: exterior or reception photograph with duotone fallback */}
            <SanityImage
              source={settings.exteriorImage ?? settings.receptionImage}
              alt={`${settings.businessName} — ${settings.address.city}`}
              aspect="4/5"
              variant="brand"
              widthHint={900}
              className="rounded-3xl shadow-[var(--shadow-lg)]"
            />
          </Reveal>
        </Section>
      ) : null}

      {/* --------------------------------------------------------
          7. FINAL CTA — ember-soft background (the second accent)
          -------------------------------------------------------- */}
      <section
        className="grain relative"
        style={{ background: "var(--ember-soft)" }}
      >
        <div className="relative mx-auto flex w-full max-w-[var(--max-w-wide)] flex-col items-start gap-10 px-6 py-28 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-36">
          <Reveal>
            <span className="t-eyebrow" style={{ color: "var(--ember-deep)" }}>
              Ready when you are
            </span>
            <h2 className="t-display-sm mt-4 max-w-xl">
              Your slower hour
              <br />
              starts here.
            </h2>
          </Reveal>
          <Magnetic>
            <BookNowButton
              serviceKey="consultation"
              label="Book your first session"
            />
          </Magnetic>
        </div>
      </section>
    </>
  );
}
