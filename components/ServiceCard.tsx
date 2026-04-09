import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export default function ServiceCard({ title, description, href, icon: Icon }: Props) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-5 rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-8 transition hover:border-[var(--accent)]"
    >
      <Icon className="h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
      <div>
        <h3 className="font-serif text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-2 text-sm text-[var(--accent)]">
        Learn more
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
