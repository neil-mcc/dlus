import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-[var(--fg)]/85">{children}</p>
    ),
    h2: ({ children }) => <h2 className="mt-8 mb-4 font-serif text-2xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-3 font-serif text-xl">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5 text-[var(--fg)]/85">{children}</ul>
    ),
  },
};

export default function Prose({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
