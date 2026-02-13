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
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
        {/* Hero */}
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
            {config.name}
          </p>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
            Gold & Silver Rates
          </h1>
          <p className="text-[var(--foreground-muted)]">
            {dayName} · {sectionDate}
          </p>
        </div>

        {/* Ounce Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          <div className="card-premium card-gold rounded-2xl border border-[var(--border)] p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold)]/20 text-2xl">
              ◆
            </div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Gold per troy ounce
            </p>
            <p className="font-mono text-3xl font-bold text-[var(--foreground)]">
              ${rates.gold.perOunce.usd.toFixed(2)}
            </p>
            <p className="mt-2 text-lg text-[var(--foreground-muted)]">
              {rates.gold.perOunce.local?.toFixed(2)} {config.currencyLabel}
            </p>
          </div>
          <div className="card-premium card-silver rounded-2xl border border-[var(--border)] p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--silver)]/20 text-2xl">
              ◇
            </div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[var(--silver)]">
              Silver per troy ounce
            </p>
            <p className="font-mono text-3xl font-bold text-[var(--foreground)]">
              ${rates.silver.perOunce.usd.toFixed(2)}
            </p>
            <p className="mt-2 text-lg text-[var(--foreground-muted)]">
              {rates.silver.perOunce.local?.toFixed(2)} {config.currencyLabel}
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

        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-4 text-sm text-[var(--foreground-muted)]">
          Raw metal prices · Updated {dayName} {sectionDate}
        </div>
      </main>
    </>
  );
}
