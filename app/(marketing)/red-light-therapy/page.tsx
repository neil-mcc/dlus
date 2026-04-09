import ServicePage from "../_components/ServicePage";
import { getServiceBySlug } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";
import type { Citation } from "@/components/ResearchCitations";

export const metadata = buildMetadata({
  title: "Red Light Therapy",
  description:
    "Full-body photobiomodulation in a stand-up panel. Users report support for skin, sleep and recovery.",
  path: "/red-light-therapy",
});

// TODO: legal review
const RED_LIGHT_CITATIONS: Citation[] = [
  {
    title:
      "Photobiomodulation: lasers vs. light emitting diodes?",
    source: "Photochemical & Photobiological Sciences, 2018",
    href: "https://doi.org/10.1039/C8PP90049C",
    note: "Foundational review on how cells respond to red and near-infrared wavelengths.",
  },
  {
    title:
      "Effects of low-level laser (light) therapy on skin: stimulating, healing, restoring",
    source: "Seminars in Cutaneous Medicine and Surgery, 2013",
    href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4126803/",
  },
  {
    title:
      "Photobiomodulation in human muscle tissue: advantages of red + NIR wavelength combinations",
    source: "Lasers in Medical Science, 2016",
    href: "https://doi.org/10.1007/s10103-016-2041-5",
  },
];

export default async function RedLightPage() {
  const service = await getServiceBySlug("red-light-therapy");
  return (
    <ServicePage
      service={service}
      variant="redLight"
      fallback={{
        title: "Red Light Therapy",
        summary:
          "Stand-up full-body red and near-infrared light panel sessions. Some studies indicate it may support skin health and recovery.",
        bookKey: "redLight",
      }}
      citations={RED_LIGHT_CITATIONS}
    />
  );
}
