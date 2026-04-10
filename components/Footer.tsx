import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/queries";

const COL_SERVICES = [
  { href: "/hbot", label: "Hyperbaric Oxygen" },
  { href: "/red-light-therapy", label: "Red Light Therapy" },
  { href: "/pemf", label: "PEMF Therapy" },
];

const COL_STUDIO = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const COL_LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default async function Footer() {
  const settings = await getSiteSettings();
  const businessName = settings?.businessName ?? "Dlús Recovery Limited";

  return (
    <footer className="mt-24 border-t border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto w-full max-w-[var(--max-w)] px-6 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4">
          <div>
            <Image
              src="/brand/Untitled.svg"
              alt={businessName}
              width={200}
              height={200}
              className="h-16 w-auto"
            />
            {settings?.tagline ? (
              <p className="mt-3 text-sm text-[var(--muted)]">{settings.tagline}</p>
            ) : (
              <p className="mt-3 text-sm text-[var(--accent)]">Recovery, Elevated.</p>
            )}
            {settings?.address ? (
              <address className="not-italic mt-4 text-sm text-[var(--muted)]">
                {settings.address.line1}
                {settings.address.line2 ? <><br />{settings.address.line2}</> : null}
                <br />
                {settings.address.city}, {settings.address.postcode}
              </address>
            ) : null}
          </div>
          <FooterCol title="Services" items={COL_SERVICES} />
          <FooterCol title="Studio" items={COL_STUDIO} />
          <FooterCol title="Legal" items={COL_LEGAL} />
        </div>

        <p className="mt-12 text-xs leading-relaxed text-[var(--muted)] max-w-2xl">
          Information on this site is for educational purposes only and is not a
          substitute for medical advice. Consult your GP before beginning any
          new wellness protocol.
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-[var(--rule)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="https://northcode.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--fg)]"
            >
              Northcode Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
        {title}
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-[var(--accent)] transition">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
