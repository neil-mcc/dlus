import { type ElementType, type ReactNode } from "react";

type SectionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
  tone?: "default" | "muted" | "accent";
  id?: string;
};

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-[var(--bg)] text-[var(--fg)]",
  muted: "bg-[color-mix(in_srgb,var(--bg)_85%,var(--fg)_4%)] text-[var(--fg)]",
  accent: "bg-[var(--accent)] text-[var(--accent-ink)]",
};

export default function Section({
  as: Tag = "section",
  children,
  className = "",
  bleed = false,
  tone = "default",
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={`${tones[tone]} ${bleed ? "" : "py-20 sm:py-28"} ${className}`}>
      <div className="mx-auto w-full max-w-[var(--max-w)] px-6 sm:px-8">
        {children}
      </div>
    </Tag>
  );
}
