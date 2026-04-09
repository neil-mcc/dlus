import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "service", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "rating", type: "number", validation: (r) => r.min(1).max(5) }),
  ],
});
