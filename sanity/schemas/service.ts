import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(180),
    }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "whatItIs", title: "What it is", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "benefits", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "sessionExperience",
      title: "What a session looks like",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "contraindications",
      title: "Contraindications & safety",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "faqs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({
      name: "acuityLinkKey",
      title: "Acuity link key",
      description: "Must match a key in lib/acuity.ts (hbot, redLight, pemf, consultation)",
      type: "string",
      options: {
        list: [
          { title: "HBOT", value: "hbot" },
          { title: "Red Light", value: "redLight" },
          { title: "PEMF", value: "pemf" },
          { title: "Consultation", value: "consultation" },
        ],
      },
      validation: (r) => r.required(),
    }),
  ],
});
