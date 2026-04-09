import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "HBOT", value: "hbot" },
          { title: "Red Light", value: "redLight" },
          { title: "PEMF", value: "pemf" },
          { title: "Booking", value: "booking" },
          { title: "Safety", value: "safety" },
        ],
      },
      validation: (r) => r.required(),
    }),
  ],
});
