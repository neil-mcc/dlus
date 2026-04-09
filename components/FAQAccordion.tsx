import { PortableText } from "@portabletext/react";
import type { Faq, FaqCategory } from "@/lib/sanity/types";

const CATEGORY_LABEL: Record<FaqCategory, string> = {
  general: "General",
  hbot: "HBOT",
  redLight: "Red Light",
  pemf: "PEMF",
  booking: "Booking",
  safety: "Safety",
};

type Props = {
  items: Faq[];
  groupByCategory?: boolean;
};

export default function FAQAccordion({ items, groupByCategory = false }: Props) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-[var(--muted)]">
        FAQs will appear here once added in Sanity.
      </p>
    );
  }

  if (!groupByCategory) {
    return <List items={items} />;
  }

  const grouped = items.reduce<Record<string, Faq[]>>((acc, faq) => {
    (acc[faq.category] ||= []).push(faq);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {Object.entries(grouped).map(([category, group]) => (
        <div key={category}>
          <h3 className="font-serif text-2xl">
            {CATEGORY_LABEL[category as FaqCategory] ?? category}
          </h3>
          <div className="mt-4">
            <List items={group} />
          </div>
        </div>
      ))}
    </div>
  );
}

function List({ items }: { items: Faq[] }) {
  return (
    <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
      {items.map((faq) => (
        <li key={faq._id}>
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-base font-medium">
              <span>{faq.question}</span>
              <span
                className="mt-1 text-[var(--muted)] transition group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <div className="prose prose-sm mt-3 max-w-none text-[var(--muted)]">
              <PortableText value={faq.answer} />
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
