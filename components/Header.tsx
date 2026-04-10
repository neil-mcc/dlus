import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const NAV = [
  { href: "/hbot", label: "HBOT" },
  { href: "/red-light-therapy", label: "Red Light" },
  { href: "/pemf", label: "PEMF" },
  { href: "/which", label: "Which fits?" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-[95] backdrop-blur-md bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] border-b border-[var(--rule)]">
      <div className="mx-auto flex w-full max-w-[var(--max-w)] items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-8">
        <Link href="/" aria-label="Dlús Recovery — home" className="flex items-center">
          <Image
            src="/brand/Untitled.svg"
            alt="Dlús Recovery"
            width={200}
            height={200}
            priority
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop nav — visible from lg up (1024px+) */}
        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-5 text-sm xl:gap-7">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--wordmark)] hover:text-[var(--accent)] transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium uppercase tracking-wide text-[var(--accent-ink)] transition hover:bg-[var(--accent-deep)]"
              >
                Book
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile + tablet: hamburger + compact Book CTA */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-[var(--accent-ink)] transition hover:bg-[var(--accent-deep)]"
          >
            Book
          </Link>
          <MobileNav items={NAV} />
        </div>
      </div>
    </header>
  );
}
