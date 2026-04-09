import ServicePage from "../_components/ServicePage";
import { getServiceBySlug } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";
import type { Citation } from "@/components/ResearchCitations";

export const metadata = buildMetadata({
  title: "PEMF Therapy",
  description:
    "Pulsed electromagnetic field sessions on a full-body mat. A calming reset for the nervous system.",
  path: "/pemf",
});

// TODO: legal review
const PEMF_CITATIONS: Citation[] = [
  {
    title:
      "Therapeutic effects of pulsed electromagnetic field therapy: a review",
    source: "Journal of Alternative and Complementary Medicine, 2013",
    href: "https://doi.org/10.1089/acm.2013.0174",
    note: "Broad review of PEMF applications across recovery and pain management contexts.",
  },
  {
    title:
      "Pulsed electromagnetic fields: from first messenger to regulator of apoptosis",
    source: "Current Medicinal Chemistry, 2013",
    href: "https://doi.org/10.2174/09298673113209990113",
  },
  {
    title:
      "Effects of pulsed electromagnetic field therapy on pain and function in osteoarthritis of the knee",
    source: "Rheumatology International, 2013",
    href: "https://doi.org/10.1007/s00296-012-2587-y",
  },
];

export default async function PemfPage() {
  const service = await getServiceBySlug("pemf");
  return (
    <ServicePage
      service={service}
      variant="pemf"
      fallback={{
        title: "PEMF Therapy",
        summary:
          "Lie back on a full-body mat that delivers pulsed electromagnetic fields. Commonly used as a calming pre- or post-workout reset.",
        bookKey: "pemf",
      }}
      citations={PEMF_CITATIONS}
    />
  );
}
