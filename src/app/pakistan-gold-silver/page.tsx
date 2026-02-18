import { fetchCountryRates } from "@/lib/goldapi";
import { getCountryPageContent } from "@/lib/sanity";
import { CountryGoldSilverLayout } from "@/components/CountryGoldSilverLayout";
import { getCountryById } from "@/config/countries";
import { pakistanPageContent } from "@/content/pakistan";

const COUNTRY_ID = "pakistan";

export async function generateMetadata() {
  const config = getCountryById(COUNTRY_ID);
  return {
    title: config.title,
    description: config.description,
    openGraph: { title: config.title, description: config.description },
  };
}

export const revalidate = 300;

export default async function PakistanGoldSilverPage() {
  const config = getCountryById(COUNTRY_ID);
  const rates = await fetchCountryRates(COUNTRY_ID);
  const pageContent = (await getCountryPageContent(COUNTRY_ID)) ?? pakistanPageContent;
  return (
    <CountryGoldSilverLayout
      config={config}
      rates={rates}
      pageContent={pageContent}
    />
  );
}
