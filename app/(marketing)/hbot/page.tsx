import ServicePage from "../_components/ServicePage";
import { getServiceBySlug } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";
import type { Citation } from "@/components/ResearchCitations";

export const metadata = buildMetadata({
  title: "Hyperbaric Oxygen Therapy (HBOT)",
  description:
    "Pressurised oxygen sessions in a single-occupant chamber. Commonly used for post-exertion recovery and general wellbeing.",
  path: "/hbot",
});

// Hand-picked, intentionally small set of sources. Kept in the
// page file (not Sanity) because they're slow-moving and should
// pass legal review once rather than on every content edit.
// TODO: legal review
const HBOT_CITATIONS: Citation[] = [
  {
    title:
      "Hyperbaric oxygen therapy in sports medicine: a review of the evidence",
    source: "Sports Medicine, 2020",
    href: "https://doi.org/10.1007/s40279-020-01360-2",
    note: "Review of HBOT use cases across musculoskeletal recovery. Calls out heterogeneity in trial protocols.",
  },
  {
    title:
      "Effect of hyperbaric oxygen on the recovery of athletes after strenuous exercise",
    source: "Journal of Sports Science & Medicine, 2018",
    href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6033895/",
  },
  {
    title:
      "Hyperbaric oxygen therapy and the quality of life in healthy individuals",
    source: "Aging, 2020",
    href: "https://doi.org/10.18632/aging.202188",
  },
];

export default async function HbotPage() {
  const service = await getServiceBySlug("hbot");
  return (
    <ServicePage
      service={service}
      variant="hbot"
      fallback={{
        title: "Hyperbaric Oxygen Therapy",
        summary:
          "Breathe oxygen at increased atmospheric pressure inside a single-occupant chamber. Research suggests it may support recovery, sleep and general wellbeing.",
        bookKey: "hbot",
      }}
      showHbotNotice
      citations={HBOT_CITATIONS}
    />
  );
}
