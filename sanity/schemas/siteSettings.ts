import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "businessName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "contactEmail", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "contactPhone", type: "string" }),
    defineField({
      name: "address",
      type: "object",
      fields: [
        { name: "line1", type: "string" },
        { name: "line2", type: "string" },
        { name: "city", type: "string" },
        { name: "region", type: "string" },
        { name: "postcode", type: "string" },
        { name: "country", type: "string", initialValue: "United Kingdom" },
      ],
    }),
    defineField({
      name: "openingHours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", type: "string" },
            { name: "hours", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      type: "object",
      fields: [
        { name: "instagram", type: "url" },
        { name: "facebook", type: "url" },
        { name: "tiktok", type: "url" },
      ],
    }),
    defineField({ name: "googleMapsEmbedUrl", type: "url" }),

    /* ------------------------------------------------------------------
       Photography fields. Every slot has a duotone fallback rendered via
       <SanityImage />, so these are all optional — upload when real
       photography lands and the page automatically swaps the fallback
       for AVIF + blur-up, no code change required.
       ------------------------------------------------------------------ */
    defineField({
      name: "heroImage",
      title: "Home hero image",
      description:
        "Wide interior or atmospheric shot layered behind the home hero display type. Horizontal, 16:9 or 3:2 recommended.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "founderPortrait",
      title: "Founder portrait",
      description:
        "Vertical 4:5 editorial portrait used in the About founder letter.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "founderName",
      title: "Founder name",
      description: "Appears below the portrait in the About founder letter.",
      type: "string",
    }),
    defineField({
      name: "founderRole",
      title: "Founder role",
      description: "Small-caps label under the founder name (e.g. \"Founder, Dlús Recovery\").",
      type: "string",
    }),
    defineField({
      name: "receptionImage",
      title: "Reception / interior image",
      description:
        "Shown in the home location section and the About 'The space' collage. Horizontal.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "exteriorImage",
      title: "Exterior / building image",
      description:
        "Lurgyvallen Business Park exterior. Used in the location strip when present.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutCollage",
      title: "About page gallery",
      description:
        "Optional extra photographs for the About 'The space' editorial collage. The first three images are used.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Short descriptive line (e.g. 'Room 01 · The HBOT chamber').",
            },
          ],
        },
      ],
      validation: (r) => r.max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
