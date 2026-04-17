import Section from "@/components/Section";
import FAQAccordion from "@/components/FAQAccordion";
import { getFaqsByCategory } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about HBOT, Red Light, PEMF, booking and safety.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqsByCategory();

  return (
    <>
      <Section bleed className="pt-24 pb-16 sm:pt-32">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)]">
            FAQ
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl">
            Questions, answered
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)]">
            If you can&rsquo;t find what you&rsquo;re looking for, drop us a message — we
            usually reply within a working day.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <FAQAccordion items={faqs} groupByCategory />
        </div>
      </Section>
    </>
  );
}
