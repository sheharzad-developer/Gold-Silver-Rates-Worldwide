import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { countryPageSchema } from "./schemas/countryPage";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "gold-silver-content",
  title: "Gold & Silver – Content",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [countryPageSchema],
  },
});
