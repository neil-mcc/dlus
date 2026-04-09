import type { Metadata } from "next";
import AmbientField from "@/components/AmbientField";

/**
 * /_press-kit — hidden portfolio lift page.
 *
 * Single scrollable specimen sheet exposing the design system for
 * Northcode Studio portfolio use: palette swatches, type specimens,
 * motion/ambient samples, and tech stack. Noindex so search engines
 * don't surface it.
 */

export const metadata: Metadata = {
  title: "Press kit — Dlús Recovery",
  description:
    "Design system specimen sheet: palette, type, motion, stack. Internal use only.",
  robots: { index: false, follow: false },
};

const SWATCHES: { name: string; token: string; hex: string }[] = [
  { name: "Bg — cream", token: "--bg", hex: "#fdfbf2" },
  { name: "Fg — charcoal", token: "--fg", hex: "#2b2b2b" },
  { name: "Muted", token: "--muted", hex: "#7a766d" },
  { name: "Rule", token: "--rule", hex: "#ece4d2" },
  { name: "Accent — teal", token: "--accent", hex: "#509ca4" },
  { name: "Accent deep", token: "--accent-deep", hex: "#3d8088" },
  { name: "Accent soft", token: "--accent-soft", hex: "#e3efef" },
  { name: "Ember — brass", token: "--ember", hex: "#b8744a" },
  { name: "Ember soft", token: "--ember-soft", hex: "#f4e7dc" },
  { name: "Ember deep", token: "--ember-deep", hex: "#8f5632" },
  { name: "Slab", token: "--slab", hex: "#1e2a2c" },
  { name: "Slab ink", token: "--slab-ink", hex: "#eef2f0" },
];

const STACK = [
  "Next.js 16 (App Router, Turbopack)",
  "React 19",
  "Tailwind v4 (CSS-based config)",
  "Sanity (embedded studio + GROQ)",
  "motion (successor to framer-motion)",
  "Canvas 2D generative backgrounds",
  "next/og dynamic OG images",
  "Resend transactional email",
  "Acuity Scheduling (external)",
  "Fraunces + Inter via next/font",
];

const AMBIENT_VARIANTS = ["brand", "hbot", "redLight", "pemf"] as const;

export default function PressKitPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--max-w-wide)] px-6 py-24 sm:px-12 sm:py-32">
      {/* Header */}
      <header className="mb-24 border-b border-[var(--rule)] pb-10">
        <span className="t-eyebrow" style={{ color: "var(--accent)" }}>
          Northcode Studio · Press kit
        </span>
        <h1 className="t-display-sm mt-4">Dlús Recovery.</h1>
        <p
          className="t-lead mt-6 max-w-2xl"
          style={{ color: "var(--muted)" }}
        >
          A design system specimen for the wellness category flagship. Palette,
          type, motion and stack in one page. Internal — do not index.
        </p>
      </header>

      {/* Palette */}
      <section className="mb-24">
        <span className="t-eyebrow">01 · Palette</span>
        <h2 className="t-h2 mt-4 mb-10">Colour tokens.</h2>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SWATCHES.map((s) => (
            <div
              key={s.token}
              className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--surface)]"
            >
              <div
                className="h-28 w-full"
                style={{ background: s.hex }}
                aria-hidden="true"
              />
              <div className="p-4">
                <p className="font-serif text-base">{s.name}</p>
                <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                  {s.token} · {s.hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Type specimens */}
      <section className="mb-24">
        <span className="t-eyebrow">02 · Typography</span>
        <h2 className="t-h2 mt-4 mb-10">Editorial scale.</h2>
        <div className="space-y-12 border-t border-[var(--rule)] pt-10">
          <Specimen label="t-display · Fraunces opsz 144">
            <p className="t-display">Slow down.</p>
          </Specimen>
          <Specimen label="t-display-sm">
            <p className="t-display-sm">Recover deeper.</p>
          </Specimen>
          <Specimen label="t-h1">
            <p className="t-h1">A room built to slow you down.</p>
          </Specimen>
          <Specimen label="t-h2">
            <p className="t-h2">Density, closeness, care.</p>
          </Specimen>
          <Specimen label="t-h3">
            <p className="t-h3">dlús [dloos]</p>
          </Specimen>
          <Specimen label="t-lead">
            <p className="t-lead" style={{ color: "var(--muted)" }}>
              A small Armagh recovery studio built around three modalities and
              a simple idea.
            </p>
          </Specimen>
          <Specimen label="t-quote">
            <p className="t-quote">
              &ldquo;Density, closeness, compactness.&rdquo;
            </p>
          </Specimen>
          <Specimen label="t-eyebrow">
            <p className="t-eyebrow">The space · Room 01</p>
          </Specimen>
        </div>
      </section>

      {/* Ambient fields */}
      <section className="mb-24">
        <span className="t-eyebrow">03 · Ambient fields</span>
        <h2 className="t-h2 mt-4 mb-10">Generative backdrops.</h2>
        <p
          className="mb-10 max-w-xl text-sm leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Canvas 2D generative art, one variant per modality. Respects
          prefers-reduced-motion and pauses when off-screen or tab-hidden.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {AMBIENT_VARIANTS.map((variant) => (
            <div
              key={variant}
              className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--rule)]"
              style={{ background: "var(--slab)" }}
            >
              <AmbientField variant={variant} intensity={0.9} />
              <div className="absolute bottom-4 left-5 z-10">
                <span
                  className="t-eyebrow"
                  style={{ color: "var(--slab-ink)", opacity: 0.8 }}
                >
                  {variant}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mb-24">
        <span className="t-eyebrow">04 · Stack</span>
        <h2 className="t-h2 mt-4 mb-10">Under the hood.</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {STACK.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] px-5 py-4 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-[var(--rule)] pt-10">
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Built by Northcode Studio · dlusrecovery.com · internal press kit,
          not indexed.
        </p>
      </footer>
    </main>
  );
}

function Specimen({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-baseline">
      <p
        className="text-xs uppercase tracking-[0.24em]"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </p>
      <div>{children}</div>
    </div>
  );
}
