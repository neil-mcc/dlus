import { Suspense } from "react";
import Link from "next/link";
import {
  CalendarClock,
  Sparkles,
  Info,
  CircleCheck,
  Leaf,
  Clock,
} from "lucide-react";
import Section from "@/components/Section";
import AcuityEmbed from "@/components/AcuityEmbed";
import Reveal from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a session",
  description:
    "Book HBOT, Red Light or PEMF at Dlús Recovery, or a free 15-minute consultation.",
  path: "/book",
});

/**
 * /book — editorial rebuild.
 *
 * The scheduler iframe remains the business end of the page, but we
 * wrap it in a three-step "what happens next" strip that turns the
 * Acuity embed from a tool dump into part of the brand experience.
 *
 * Top-to-bottom:
 *   1. Short hero
 *   2. "What happens next" — three numbered cards
 *   3. The scheduler (aside + iframe, same structure as before)
 */

const STEPS = [
  {
    icon: CircleCheck,
    title: "Choose your session",
    body: "Pick a modality and a time that fits. You'll get a confirmation email the moment your slot is held.",
  },
  {
    icon: Leaf,
    title: "We confirm",
    body: "If you're new to HBOT we'll send a short health questionnaire. Everything else runs automatically — no back-and-forth.",
  },
  {
    icon: Clock,
    title: "Arrive ten early",
    body: "Get changed, settle in, sip something warm. Your session starts when you're ready, not when the clock says so.",
  },
];

export default function BookPage() {
  return (
    <>
      {/* --------------------------------------------------------
          1. HERO
          -------------------------------------------------------- */}
      <Section bleed className="pt-36 pb-14 sm:pt-44">
        <Reveal>
          <span className="t-eyebrow">Book</span>
          <h1 className="t-display-sm mt-4 max-w-[14ch]">
            Reserve your
            <br />
            slower hour.
          </h1>
          <p
            className="t-lead mt-6 max-w-2xl"
            style={{ color: "var(--muted)" }}
          >
            Live availability for HBOT, Red Light and PEMF — plus a free 15-minute
            consultation if you&rsquo;re new to Dlús.
          </p>
        </Reveal>
      </Section>

      {/* --------------------------------------------------------
          2. "WHAT HAPPENS NEXT" — three numbered cards
          -------------------------------------------------------- */}
      <Section className="py-12">
        <Reveal className="mb-10">
          <span className="t-eyebrow">What happens next</span>
        </Reveal>
        <Reveal
          as="div"
          className="grid gap-6 sm:grid-cols-3"
          stagger={0.12}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-[var(--rule)] bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="t-eyebrow"
                    style={{ color: "var(--muted)" }}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className="h-5 w-5 text-[var(--accent)]"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="t-h3 mt-6">{step.title}</h2>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {step.body}
                </p>
              </div>
            );
          })}
        </Reveal>
      </Section>

      {/* --------------------------------------------------------
          3. SCHEDULER
          -------------------------------------------------------- */}
      <Section bleed className="pb-32">
        <div className="mx-auto w-full max-w-[var(--max-w)] px-6 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            {/* Supporting copy column */}
            <aside className="space-y-8">
              {/* Free consult cross-link */}
              <div className="rounded-3xl border border-[var(--accent)]/40 bg-[var(--accent-soft)] p-6">
                <Sparkles
                  className="h-5 w-5 text-[var(--accent-deep)]"
                  aria-hidden="true"
                />
                <h3 className="mt-3 t-h4">Not sure where to start?</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/80">
                  Book a free 15-minute consultation. We&rsquo;ll walk you
                  through the space, answer questions, and help you pick the
                  right modality for your goals.
                </p>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  Select <strong>Free consult</strong> in the picker →
                </p>
                <p className="mt-4 text-xs">
                  <Link
                    href="/which"
                    className="text-[var(--accent-deep)] underline underline-offset-4 hover:text-[var(--accent)]"
                  >
                    Or take the 30-second quiz →
                  </Link>
                </p>
              </div>

              {/* Cancellation policy */}
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
                  <CalendarClock className="h-4 w-4" aria-hidden="true" />
                  Cancellation & reschedule
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/80">
                  Reschedule or cancel up to{" "}
                  <strong>24 hours before your session</strong> at no charge.
                  Late cancellations and no-shows are charged at full rate so
                  we can keep slots available for everyone.
                </p>
                <p className="mt-3 text-xs text-[var(--muted)]">
                  You&rsquo;ll receive a confirmation email as soon as you
                  book — your session isn&rsquo;t held until that email
                  arrives.
                </p>
              </div>

              {/* HBOT pre-screening */}
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
                  <Info className="h-4 w-4" aria-hidden="true" />
                  First HBOT session?
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/80">
                  HBOT requires a short health questionnaire before your first
                  visit. Some conditions need a brief pre-screening
                  consultation — we&rsquo;ll be in touch if so.
                  {/* TODO: legal review */}
                </p>
                <p className="mt-3 text-xs">
                  <Link
                    href="/hbot"
                    className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-deep)]"
                  >
                    Read about HBOT →
                  </Link>
                </p>
              </div>
            </aside>

            {/* Embed column */}
            <div>
              <Suspense fallback={<EmbedFallback />}>
                <AcuityEmbed />
              </Suspense>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function EmbedFallback() {
  return (
    <div
      className="flex h-[800px] items-center justify-center rounded-3xl border border-[var(--rule)] bg-[var(--surface)] text-sm text-[var(--muted)]"
      aria-busy="true"
    >
      Loading the scheduler…
    </div>
  );
}
