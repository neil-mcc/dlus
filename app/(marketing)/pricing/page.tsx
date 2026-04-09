import Section from "@/components/Section";
import PricingCard from "@/components/PricingCard";
import BookNowButton from "@/components/BookNowButton";
import { getPricingTiers } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";
import type { PricingTier } from "@/lib/sanity/types";

export const metadata = buildMetadata({
  title: "Pricing & Packages",
  description:
    "Single sessions, bundles and memberships for HBOT, Red Light and PEMF therapy.",
  path: "/pricing",
});

const TYPES: { key: PricingTier["type"]; label: string }[] = [
  { key: "single", label: "Single sessions" },
  { key: "bundle", label: "Bundles" },
  { key: "membership", label: "Memberships" },
];

export default async function PricingPage() {
  const tiers = await getPricingTiers();

  return (
    <>
      <Section bleed className="pt-24 pb-16 sm:pt-32">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)]">
            Pricing
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)]">
            Try a single session, save with a bundle, or commit to weekly recovery
            with a membership. Not sure where to start?{" "}
            <span className="underline underline-offset-4">Book a free 15-minute consultation</span>.
          </p>
          <div className="mt-8">
            <BookNowButton serviceKey="consultation" />
          </div>
        </div>
      </Section>

      {TYPES.map(({ key, label }) => {
        const group = tiers.filter((t) => t.type === key);
        if (group.length === 0) return null;
        return (
          <Section key={key} tone={key === "bundle" ? "muted" : "default"}>
            <h2 className="font-serif text-3xl">{label}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.map((tier) => (
                <PricingCard
                  key={tier._id}
                  tier={tier}
                  bookKey="consultation"
                />
              ))}
            </div>
          </Section>
        );
      })}

      {tiers.length === 0 ? (
        <Section>
          <p className="text-sm text-[var(--muted)]">
            Pricing tiers will appear here once added in Sanity Studio.
          </p>
        </Section>
      ) : null}
    </>
  );
}
