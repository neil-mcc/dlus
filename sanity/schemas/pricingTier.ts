import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricingTier",
  title: "Pricing tier",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Single session", value: "single" },
          { title: "Bundle", value: "bundle" },
          { title: "Membership", value: "membership" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "serviceRef",
      title: "Service",
      type: "reference",
      to: [{ type: "service" }],
    }),
    defineField({ name: "price", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "sessionCount", type: "number", description: "Sessions in a bundle" }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
  ],
});
