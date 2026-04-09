import Image from "next/image";
import Link from "next/link";

const NAV = [
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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] border-b border-[var(--rule)]">
      <div className="mx-auto flex w-full max-w-[var(--max-w)] items-center justify-between gap-6 px-6 py-3 sm:px-8">
        <Link href="/" aria-label="Dlús Recovery — home" className="flex items-center">
          <Image
            src="/brand/logo38454221.svg"
            alt="Dlús Recovery"
            width={400}
            height={400}
            priority
            className="h-24 w-auto sm:h-14"
          />
        </Link>
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-7 text-sm">
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
        {/* Mobile: compact Book CTA (full nav lives in a future mobile menu) */}
        <Link
          href="/book"
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-medium uppercase tracking-wide text-[var(--accent-ink)] transition hover:bg-[var(--accent-deep)] md:hidden"
        >
          Book
        </Link>
      </div>
    </header>
  );
}
