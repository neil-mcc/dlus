import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import LocalBusinessJsonLd from "@/components/JsonLd";
import { getSiteSettings } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Dlús Recovery — message us or visit the studio.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <LocalBusinessJsonLd settings={settings} />

      <Section bleed className="pt-24 pb-12 sm:pt-32">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)]">
            Contact
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl">Say hello</h1>
          <p className="mt-6 text-lg text-[var(--muted)]">
            For bookings, please use our online scheduler — it&rsquo;s the fastest way
            to lock in a session. For everything else, this form lands in our
            inbox.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <ContactForm />
          </div>
          <aside className="space-y-8 rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-8 text-sm">
            {settings?.contactEmail ? (
              <Detail icon={Mail} label="Email">
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-[var(--accent)]">
                  {settings.contactEmail}
                </a>
              </Detail>
            ) : null}
            {settings?.contactPhone ? (
              <Detail icon={Phone} label="Phone">
                <a href={`tel:${settings.contactPhone}`} className="hover:text-[var(--accent)]">
                  {settings.contactPhone}
                </a>
              </Detail>
            ) : null}
            {settings?.address ? (
              <Detail icon={MapPin} label="Address">
                {settings.address.line1}
                <br />
                {settings.address.city}, {settings.address.postcode}
              </Detail>
            ) : null}
            {settings?.openingHours ? (
              <Detail icon={Clock} label="Hours">
                <ul className="space-y-1">
                  {settings.openingHours.map((row) => (
                    <li key={row.day}>
                      <span className="font-medium text-[var(--fg)]">{row.day}</span> · {row.hours}
                    </li>
                  ))}
                </ul>
              </Detail>
            ) : null}
          </aside>
        </div>
      </Section>

      {settings?.googleMapsEmbedUrl ? (
        <Section bleed className="pb-24">
          <div className="mx-auto w-full max-w-[var(--max-w)] px-6 sm:px-8">
            <div className="overflow-hidden rounded-2xl border border-[var(--rule)]">
              <iframe
                src={settings.googleMapsEmbedUrl}
                title="Map"
                loading="lazy"
                className="h-[360px] w-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Section>
      ) : null}
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
        <Icon className="h-4 w-4" aria-hidden />
        {label}
      </div>
      <div className="mt-2 text-[var(--fg)]/85">{children}</div>
    </div>
  );
}
