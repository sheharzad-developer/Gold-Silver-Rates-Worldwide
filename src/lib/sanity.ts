import { createClient } from "@sanity/client";
import type { ContentSection, FaqItem } from "@/content/saudi";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const client = createClient({
  projectId: projectId ?? "",
  dataset,
  apiVersion,
  useCdn: true,
});

export type CountryPageContent = {
  article: { h1: string; sections: ContentSection[] };
  faq: FaqItem[];
  faqTitle?: string;
};

const COUNTRY_PAGE_QUERY = `*[_type == "countryPage" && countryId == $countryId][0]{
  article {
    h1,
    sections[] { h2, body }
  },
  faq[] { q, a },
  faqTitle
}`;

export async function getCountryPageContent(
  countryId: string
): Promise<CountryPageContent | null> {
  if (!projectId) return null;
  try {
    const data = await client.fetch<{
      article?: { h1: string; sections: { h2: string; body: string }[] };
      faq?: { q: string; a: string }[];
      faqTitle?: string;
    } | null>(COUNTRY_PAGE_QUERY, { countryId });
    if (!data?.article?.sections?.length || !data?.faq?.length) return null;
    return {
      article: {
        h1: data.article.h1,
        sections: data.article.sections.map((s) => ({ h2: s.h2, body: s.body })),
      },
      faq: data.faq.map((f) => ({ q: f.q, a: f.a })),
      faqTitle: data.faqTitle ?? undefined,
    };
  } catch {
    return null;
  }
}
