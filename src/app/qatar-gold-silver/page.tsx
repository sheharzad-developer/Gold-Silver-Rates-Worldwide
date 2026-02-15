import { fetchCountryRates } from "@/lib/goldapi";
import { CountryGoldSilverLayout } from "@/components/CountryGoldSilverLayout";
import { getCountryById } from "@/config/countries";
import { qatarPageContent } from "@/content/qatar";

const COUNTRY_ID = "qatar";

export async function generateMetadata() {
  const config = getCountryById(COUNTRY_ID);
  return {
    title: config.title,
    description: config.description,
    openGraph: { title: config.title, description: config.description },
  };
}

export const revalidate = 300;

export default async function QatarGoldSilverPage() {
  const config = getCountryById(COUNTRY_ID);
  const rates = await fetchCountryRates(COUNTRY_ID);
  return (
    <CountryGoldSilverLayout
      config={config}
      rates={rates}
      pageContent={qatarPageContent}
    />
  );
}
