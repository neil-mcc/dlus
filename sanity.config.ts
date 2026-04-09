import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "dlus",
  title: "Dlús Recovery — Studio",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .child(
                S.editor()
                  .id("siteSettings")
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("pricingTier").title("Pricing tiers"),
            S.documentTypeListItem("faq").title("FAQs"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
