import { fetchCountryRates } from "@/lib/goldapi";
import { Header } from "@/components/Header";
import { MetalTabs } from "@/components/MetalTabs";
import { getCountryById } from "@/config/countries";

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

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">
          Gold & Silver Rates – {config.name}
        </h1>
        <p className="text-amber-800/90 mb-6">
          Per troy ounce in USD and {config.currencyLabel}. Per-gram rates by karat below.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wide">
              Gold per troy ounce
            </p>
            <p className="text-2xl font-bold text-amber-900 mt-1">
              ${rates.gold.perOunce.usd.toFixed(2)} / {rates.gold.perOunce.local?.toFixed(2)} {config.currencyLabel}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              Silver per troy ounce
            </p>
            <p className="text-2xl font-bold text-slate-800 mt-1">
              ${rates.silver.perOunce.usd.toFixed(2)} / {rates.silver.perOunce.local?.toFixed(2)} {config.currencyLabel}
            </p>
          </div>
        </div>

        <MetalTabs
          gold={rates.gold}
          silver={rates.silver}
          currencyLabel={config.currencyLabel}
        />
      </main>
    </>
  );
}
