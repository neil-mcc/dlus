import Section from "@/components/Section";
import BookNowButton from "@/components/BookNowButton";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import AmbientField from "@/components/AmbientField";
import SanityImage from "@/components/SanityImage";
import FounderLetter from "@/components/FounderLetter";
import StatStrip from "@/components/StatStrip";
import { getSiteSettings } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Dlús Recovery",
  description:
    "A calm, considered recovery studio in Lurgyvallen Business Park, Armagh. The story, the space, and the people behind it.",
  path: "/about",
});

/**
 * About — editorial rebuild.
 *
 * Sections (top → bottom):
 *   1. Hero with brand AmbientField and Irish-language eyebrow
 *   2. Pull-quote defining "Dlús" over an ember slab
 *   3. Founder letter (uses duotone fallback until photography lands)
 *   4. The space — editorial collage of duotone slabs (stand-ins for
 *      future facility photography) with caption cards
 *   5. Values strip
 *   6. Stat strip — the proof layer
 *   7. Final CTA on ember-soft background
 */

const VALUES = [
  {
    title: "Honest hedges",
    body: "We use \"may support\" and \"users report\" because the science deserves humility. If a modality doesn't fit you, we'll say so.",
  },
  {
    title: "Clinical equipment, domestic feel",
    body: "Chambers, panels and mats you'd find in a clinic, wrapped in a room you'd want to spend an hour in.",
  },
  {
    title: "Time to land",
    body: "Sessions are booked with buffers. No stacked slots, no rush. Arrive ten minutes early; leave ten minutes after.",
  },
  {
    title: "Armagh, easy to reach",
    body: "Tucked into Lurgyvallen Business Park on the edge of the city. Free parking at the door, no traffic, no tram — step out of your day and into a slower room.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const collage = settings?.aboutCollage ?? [];
  const collageTile = (i: number) => collage[i] ?? null;
  return (
    <>
      {/* --------------------------------------------------------
          1. HERO — editorial, with brand AmbientField
          -------------------------------------------------------- */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "var(--slab)" }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <AmbientField variant="brand" intensity={0.85} />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 35% 25%, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[72vh] w-full max-w-[var(--max-w-wide)] flex-col justify-end px-6 pb-20 pt-40 sm:px-12 sm:pb-28 sm:pt-48">
          <Reveal>
            <span
              className="t-eyebrow"
              style={{ color: "var(--accent)" }}
            >
              About · Dlús (dloos), n., Irish
            </span>
            <h1
              className="t-display mt-6 max-w-[14ch]"
              style={{ color: "var(--slab-ink)" }}
            >
              Density.
              <br />
              Closeness.
              <br />
              Care.
            </h1>
            <p
              className="t-lead mt-8 max-w-xl"
              style={{ color: "var(--slab-ink)", opacity: 0.75 }}
            >
              A small Armagh recovery studio built around three modalities and a
              simple idea: the work you do to recover should feel as good as the
              work you do to perform.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------
          2. PULL QUOTE — ember slab, defines the name
          -------------------------------------------------------- */}
      <section
        className="grain relative"
        style={{ background: "var(--ember-soft)" }}
      >
        <div className="mx-auto grid w-full max-w-[var(--max-w-wide)] gap-10 px-6 py-28 sm:grid-cols-[1fr_1.3fr] sm:items-center sm:px-12 sm:py-36">
          <Reveal>
            <span className="t-eyebrow" style={{ color: "var(--ember-deep)" }}>
              The name
            </span>
            <h2 className="t-h3 mt-3" style={{ color: "var(--ember-deep)" }}>
              dlús [dloos]
            </h2>
          </Reveal>
          <Reveal>
            <p className="t-quote" style={{ color: "var(--fg)" }}>
              &ldquo;Density, closeness, compactness.&rdquo;
            </p>
            <p
              className="mt-6 max-w-md text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              The Irish word for the quiet weight a thing has when it&rsquo;s
              small and solid and carefully put together. It&rsquo;s how we
              think about the studio.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------
          3. FOUNDER LETTER
          -------------------------------------------------------- */}
      <Section className="py-32">
        <FounderLetter
          portrait={settings?.founderPortrait}
          eyebrow="A letter"
          heading="Why we built Dlús."
          paragraphs={[
            "We opened Dlús this spring because every recovery space we walked into either felt like a gym without the workout or a clinic without the care. Armagh deserved somewhere that respected the equipment and the time it takes to actually switch off.",
            "We started with three modalities — HBOT, red light, PEMF — because the evidence base is promising and the experience is genuinely pleasant. We avoid the grand claims. Research suggests, users report. The rest you'll feel for yourself.",
            "If you're new to any of this, book a free fifteen-minute consultation. No upsell. We'd rather you leave understanding what a session will and won't do than have you guess.",
          ]}
          signatureName={settings?.founderName ?? "Aoife Delaney"}
          role={settings?.founderRole ?? "Founder, Dlús Recovery"}
        />
      </Section>

      {/* --------------------------------------------------------
          4. THE SPACE — editorial collage (duotone stand-ins)
          -------------------------------------------------------- */}
      <Section tone="muted">
        <Reveal className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="t-eyebrow">The space</span>
            <h2 className="t-h1 mt-4 max-w-lg">
              A room built to slow you down.
            </h2>
          </div>
          <p
            className="t-body max-w-md"
            style={{ color: "var(--muted)" }}
          >
            Warm cream, low light, quiet floors. Clinical where it matters;
            domestic where it can be.
          </p>
        </Reveal>

        {/* Six-tile editorial collage. Mixes three duotone slabs (stand-ins
            for facility photography) with three caption cards that work
            even when the slabs are replaced by real shots. */}
        {/* Six-tile editorial collage. Three picture slots pull from
            `siteSettings.aboutCollage[0..2]` in order. When the array
            is empty (or has fewer than three items) each empty slot
            falls back to its per-modality duotone. */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:grid-rows-2">
          <div className="sm:col-span-2 sm:row-span-2">
            <SanityImage
              source={collageTile(0)}
              alt={collageTile(0)?.alt ?? "The HBOT chamber"}
              aspect="1/1"
              variant="hbot"
              widthHint={1200}
              className="h-full rounded-3xl"
            />
          </div>
          <div className="rounded-3xl bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
            <span className="t-eyebrow" style={{ color: "var(--muted)" }}>
              Room 01
            </span>
            <p className="mt-3 font-serif text-2xl leading-tight">
              {collageTile(0)?.caption ?? "The HBOT chamber"}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Single-occupant. Clear crown. Room to stretch out.
            </p>
          </div>
          <div>
            <SanityImage
              source={collageTile(1)}
              alt={collageTile(1)?.alt ?? "Red light panel room"}
              aspect="1/1"
              variant="redLight"
              className="h-full rounded-3xl"
            />
          </div>
          <div className="rounded-3xl bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
            <span className="t-eyebrow" style={{ color: "var(--muted)" }}>
              Room 02
            </span>
            <p className="mt-3 font-serif text-2xl leading-tight">
              {collageTile(1)?.caption ?? "Red light room"}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Stand-up panel. Warm floor. Goggles included.
            </p>
          </div>
          <div>
            <SanityImage
              source={collageTile(2)}
              alt={collageTile(2)?.alt ?? "PEMF mat setup"}
              aspect="1/1"
              variant="pemf"
              className="h-full rounded-3xl"
            />
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------
          5. VALUES STRIP
          -------------------------------------------------------- */}
      <Section>
        <Reveal className="mb-16 max-w-2xl">
          <span className="t-eyebrow">Four principles</span>
          <h2 className="t-h1 mt-4">How we work.</h2>
        </Reveal>
        <Reveal
          as="div"
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.12}
        >
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="border-t border-[var(--rule)] pt-6"
            >
              <h3 className="t-h4">{v.title}</h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* --------------------------------------------------------
          6. STAT STRIP
          -------------------------------------------------------- */}
      <Section tone="muted">
        <StatStrip
          items={[
            { value: "3", label: "Modalities" },
            { value: "60", label: "Min. buffer per slot" },
            { value: "2026", label: "Year we opened" },
            { value: "BT60", label: "Lurgyvallen, Armagh" },
          ]}
        />
      </Section>

      {/* --------------------------------------------------------
          7. FINAL CTA — ember-soft background
          -------------------------------------------------------- */}
      <section
        className="grain relative"
        style={{ background: "var(--ember-soft)" }}
      >
        <div className="relative mx-auto flex w-full max-w-[var(--max-w-wide)] flex-col items-start gap-8 px-6 py-28 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-32">
          <Reveal>
            <span className="t-eyebrow" style={{ color: "var(--ember-deep)" }}>
              Come and visit
            </span>
            <h2 className="t-display-sm mt-4 max-w-xl">
              The door is open.
            </h2>
          </Reveal>
          <Magnetic>
            <BookNowButton
              serviceKey="consultation"
              label="Book a tour or session"
            />
          </Magnetic>
        </div>
      </section>
    </>
  );
}
