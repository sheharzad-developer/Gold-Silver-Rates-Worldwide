import { defineType, defineArrayMember, defineField } from "sanity";

export const countryPageSchema = defineType({
  name: "countryPage",
  title: "Country Page",
  type: "document",
  fields: [
    defineField({
      name: "countryId",
      title: "Country ID",
      type: "string",
      description: "Lowercase: saudi, india, pakistan, qatar, uae, kuwait",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Saudi Arabia", value: "saudi" },
          { title: "India", value: "india" },
          { title: "Pakistan", value: "pakistan" },
          { title: "Qatar", value: "qatar" },
          { title: "UAE", value: "uae" },
          { title: "Kuwait", value: "kuwait" },
        ],
      },
    }),
    defineField({
      name: "article",
      title: "Article",
      type: "object",
      fields: [
        defineField({ name: "h1", title: "Article heading (H1)", type: "string", validation: (Rule) => Rule.required() }),
        defineField({
          name: "sections",
          title: "Sections",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "h2", title: "Section heading (H2)", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "body", title: "Body text", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
              ],
              preview: {
                select: { title: "h2" },
                prepare({ title }) {
                  return { title: title || "(no heading)" };
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faqTitle",
      title: "FAQ section title",
      type: "string",
      description: "e.g. Frequently Asked Questions About Gold Prices in India",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "q", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "a", title: "Answer", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: "q" },
            prepare({ title }) {
              return { title: title ? (String(title).slice(0, 50) + (String(title).length > 50 ? "…" : "")) : "(no question)" };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { countryId: "countryId" },
    prepare({ countryId }) {
      const labels: Record<string, string> = {
        saudi: "Saudi Arabia",
        india: "India",
        pakistan: "Pakistan",
        qatar: "Qatar",
        uae: "UAE",
        kuwait: "Kuwait",
      };
      return { title: labels[countryId ?? ""] || countryId || "Country Page" };
    },
  },
});
