import type { SiteSettings } from "@/lib/sanity/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dlusrecovery.com";

export default function LocalBusinessJsonLd({ settings }: { settings: SiteSettings | null }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: settings?.businessName ?? "Dlús Recovery Limited",
    description:
      settings?.tagline ??
      "Recovery and wellness studio offering Hyperbaric Oxygen, Red Light, and PEMF therapy.",
    url: SITE_URL,
    email: settings?.contactEmail,
    telephone: settings?.contactPhone,
    address: settings?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: [settings.address.line1, settings.address.line2]
            .filter(Boolean)
            .join(", "),
          addressLocality: settings.address.city,
          addressRegion: settings.address.region,
          postalCode: settings.address.postcode,
          addressCountry: settings.address.country,
        }
      : undefined,
    openingHoursSpecification: settings?.openingHours?.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.day,
      description: row.hours,
    })),
    sameAs: settings?.socialLinks
      ? Object.values(settings.socialLinks).filter(Boolean)
      : undefined,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
