import BookNowButton from "./BookNowButton";
import type { AcuityServiceKey } from "@/lib/acuity";
import type { PricingTier } from "@/lib/sanity/types";

type Props = {
  tier: PricingTier;
  bookKey?: AcuityServiceKey;
};

export default function PricingCard({ tier, bookKey = "consultation" }: Props) {
  const perSession =
    tier.sessionCount && tier.sessionCount > 1
      ? `£${(tier.price / tier.sessionCount).toFixed(0)} / session`
      : null;
  return (
    <article
      className={`flex flex-col rounded-2xl border p-8 ${
        tier.featured
          ? "border-[var(--accent)] bg-[var(--surface)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_15%,transparent)]"
          : "border-[var(--rule)] bg-[var(--surface)]"
      }`}
    >
      {tier.featured ? (
        <p className="mb-4 inline-flex w-fit rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--accent-ink)]">
          Most popular
        </p>
      ) : null}
      <h3 className="font-serif text-2xl">{tier.name}</h3>
      {tier.description ? (
        <p className="mt-2 text-sm text-[var(--muted)]">{tier.description}</p>
      ) : null}
      <p className="mt-6 font-serif text-4xl">£{tier.price}</p>
      {perSession ? (
        <p className="mt-1 text-xs text-[var(--muted)]">{perSession}</p>
      ) : null}
      {tier.sessionCount ? (
        <p className="mt-1 text-xs text-[var(--muted)]">{tier.sessionCount} sessions</p>
      ) : null}
      <div className="mt-8">
        <BookNowButton serviceKey={bookKey} variant={tier.featured ? "primary" : "ghost"} />
      </div>
    </article>
  );
}
