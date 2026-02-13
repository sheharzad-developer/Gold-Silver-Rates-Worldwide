import { Header } from "@/components/Header";
import { MetalTabs } from "@/components/MetalTabs";
import type { CountryConfig } from "@/config/countries";
import type { AllRates } from "@/lib/types";

interface Props {
  config: CountryConfig;
  rates: AllRates;
}

function formatSectionDate() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDay() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

export function CountryGoldSilverLayout({ config, rates }: Props) {
  const sectionDate = formatSectionDate();
  const dayName = formatDay();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-neutral-900 mb-6">
          Gold prices
        </h1>

        <div className="border-b border-[var(--border)] pb-4 mb-6">
          <p className="text-lg text-neutral-800">
            The price of an ounce of gold today is ${rates.gold.perOunce.usd.toLocaleString("en-US", { minimumFractionDigits: 2 })}.
          </p>
          <p className="text-neutral-600 mt-1">
            Gold price today, {dayName}, in the {config.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 border-b border-[var(--border)] pb-6">
          <div>
            <p className="text-sm text-neutral-600">Gold per troy ounce</p>
            <p className="text-neutral-900 font-semibold">
              ${rates.gold.perOunce.usd.toFixed(2)} / {rates.gold.perOunce.local?.toFixed(2)} {config.currencyLabel}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-600">Silver per troy ounce</p>
            <p className="text-neutral-900 font-semibold">
              ${rates.silver.perOunce.usd.toFixed(2)} / {rates.silver.perOunce.local?.toFixed(2)} {config.currencyLabel}
            </p>
          </div>
        </div>

        <MetalTabs
          gold={rates.gold}
          silver={rates.silver}
          currencyNameForTable={config.currencyNameForTable}
          countryName={config.name}
          sectionDate={sectionDate}
        />

        <div className="mt-6 pt-4 border-t border-[var(--border)] text-sm text-neutral-600 space-y-1">
          <p>The gold gram price table shows the price of raw gold.</p>
          <p>Data last updated {dayName} {sectionDate}.</p>
        </div>
      </main>
    </>
  );
}
