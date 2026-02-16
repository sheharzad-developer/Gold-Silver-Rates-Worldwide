import Link from "next/link";
import { fetchHomeRates } from "@/lib/goldapi";
import { Header } from "@/components/Header";
import { COUNTRIES, TROY_OUNCE_GRAMS } from "@/config/countries";

export const metadata = {
  title: "Gold & Silver Rates – Live USD Prices",
  description:
    "Live international gold and silver prices per gram in USD. View country-specific rates for Saudi Arabia, UAE, Qatar, Kuwait, Pakistan, and India.",
  openGraph: {
    title: "Gold & Silver Rates – Live USD Prices",
    description:
      "Live international gold and silver prices per gram in USD.",
  },
};

export const revalidate = 300;

export default async function HomePage() {
  const rates = await fetchHomeRates();

  const goldPerGram = rates.goldUsdPerOunce / TROY_OUNCE_GRAMS;
  const silverPerGram = rates.silverUsdPerOunce / TROY_OUNCE_GRAMS;

  const countryLinks = COUNTRIES.filter((c) => c.id !== "international");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-8">
        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] via-[var(--background-elevated)] to-[var(--card-bg)] p-5 sm:p-8 md:p-10">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--gold)]/10 blur-3xl sm:-right-16 sm:-top-16 sm:h-48 sm:w-48" />
          <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-[var(--silver)]/10 blur-3xl sm:-bottom-16 sm:-left-16 sm:h-36 sm:w-36" />
          <div className="relative">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Live Spot Prices
            </p>
            <h1 className="mb-3 max-w-2xl text-2xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
              Live Gold Price Today & Silver Prices in the International Market
            </h1>
            <p className="max-w-xl text-sm text-[var(--foreground-muted)]">
              Gold and silver prices per gram and per ounce in USD. Select your country for all karats in local currency.
            </p>
          </div>
        </div>

        {/* Price Cards: Gold ounce, Gold gram | space | Silver ounce, Silver gram */}
        <div className="mb-10 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          <div className="flex w-full gap-3 sm:w-auto sm:gap-4">
            <div className="card-premium card-gold animate-fade-in animate-delay-1 flex min-w-0 flex-1 flex-col rounded-xl p-4 sm:min-w-[130px] sm:flex-none sm:p-5">
              <div className="mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--gold)]/20 text-lg sm:mb-3 sm:h-10 sm:w-10 sm:rounded-xl sm:text-xl">◆</div>
              <p className="mb-1 truncate text-[10px] font-semibold uppercase leading-tight tracking-wider text-[var(--gold)] sm:text-xs">Gold · Per Ounce</p>
              <p className="font-mono text-lg font-bold text-[var(--foreground)] sm:text-2xl">${rates.goldUsdPerOunce.toFixed(2)}</p>
              <p className="mt-1 text-[10px] text-[var(--foreground-muted)] sm:text-xs">Spot · Live</p>
            </div>
            <div className="card-premium card-gold animate-fade-in animate-delay-1 flex min-w-0 flex-1 flex-col rounded-xl p-4 sm:min-w-[130px] sm:flex-none sm:p-5">
              <div className="mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--gold)]/20 text-lg sm:mb-3 sm:h-10 sm:w-10 sm:rounded-xl sm:text-xl">◆</div>
              <p className="mb-1 truncate text-[10px] font-semibold uppercase leading-tight tracking-wider text-[var(--gold)] sm:text-xs">Gold · Per Gram</p>
              <p className="font-mono text-lg font-bold text-[var(--foreground)] sm:text-2xl">${goldPerGram.toFixed(2)}</p>
              <p className="mt-1 text-[10px] text-[var(--foreground-muted)] sm:text-xs">Spot · Live</p>
            </div>
          </div>
          <div className="hidden w-4 shrink-0 sm:block" aria-hidden />
          <div className="flex w-full gap-3 sm:w-auto sm:gap-4">
            <div className="card-premium card-silver animate-fade-in animate-delay-2 flex min-w-0 flex-1 flex-col rounded-xl p-4 sm:min-w-[130px] sm:flex-none sm:p-5">
              <div className="mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--silver)]/20 text-lg sm:mb-3 sm:h-10 sm:w-10 sm:rounded-xl sm:text-xl">◇</div>
              <p className="mb-1 truncate text-[10px] font-semibold uppercase leading-tight tracking-wider text-[var(--silver)] sm:text-xs">Silver · Per Ounce</p>
              <p className="font-mono text-lg font-bold text-[var(--foreground)] sm:text-2xl">${rates.silverUsdPerOunce.toFixed(2)}</p>
              <p className="mt-1 text-[10px] text-[var(--foreground-muted)] sm:text-xs">Spot · Live</p>
            </div>
            <div className="card-premium card-silver animate-fade-in animate-delay-2 flex min-w-0 flex-1 flex-col rounded-xl p-4 sm:min-w-[130px] sm:flex-none sm:p-5">
              <div className="mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--silver)]/20 text-lg sm:mb-3 sm:h-10 sm:w-10 sm:rounded-xl sm:text-xl">◇</div>
              <p className="mb-1 truncate text-[10px] font-semibold uppercase leading-tight tracking-wider text-[var(--silver)] sm:text-xs">Silver · Per Gram</p>
              <p className="font-mono text-lg font-bold text-[var(--foreground)] sm:text-2xl">${silverPerGram.toFixed(2)}</p>
              <p className="mt-1 text-[10px] text-[var(--foreground-muted)] sm:text-xs">Spot · Live</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="mb-10 space-y-6 sm:space-y-8">
          <p className="max-w-3xl text-[var(--foreground-muted)] leading-relaxed">
            Track the gold price today with real-time updates from the global bullion market. Our platform monitors the live gold price, including the latest spot gold rates from the USA and major international trading centers. Whether you are an investor, trader, or buyer, staying updated with global gold prices and silver prices helps you make informed financial decisions based on accurate and timely market data.
          </p>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[var(--foreground)] sm:text-xl">Live Gold Price & Spot Gold Updates</h2>
            <p className="max-w-3xl text-[var(--foreground-muted)] leading-relaxed">
              Our website provides continuous updates on the live gold price, directly reflecting movements in the international market. The spot gold rate is updated in real time, influenced by economic data from the USA, US dollar strength, inflation trends, interest rates, and global geopolitical developments. By tracking these indicators, you can better understand short-term volatility and long-term gold price trends. We ensure that every update reflects accurate international benchmarks so you can follow gold price fluctuations instantly.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[var(--foreground)] sm:text-xl">Global Gold Prices & Silver Prices Analysis</h2>
            <p className="max-w-3xl text-[var(--foreground-muted)] leading-relaxed">
              Alongside the gold price today, we also provide real-time silver prices to give you a complete overview of the precious metals market. Gold and silver often move together, but silver is additionally impacted by industrial demand and global production levels. Our international market coverage includes USA trading sessions and worldwide bullion exchanges, giving you a comprehensive perspective on gold prices, spot gold performance, and live silver market movements. By monitoring both metals together, investors can identify trends, hedge risks, and capitalize on global market opportunities.
            </p>
          </section>
        </article>

        {/* Countries */}
        <div className="mb-12">
          <h2 className="mb-1 text-xl font-bold text-[var(--foreground)]">
            Rates by country
          </h2>
          <p className="mb-4 text-sm text-[var(--foreground-muted)]">
            Per-gram and per-ounce prices in 18K, 21K, 22K, 24K for your region.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {countryLinks.map((c, i) => (
              <Link
                key={c.id}
                href={c.path}
                className="group card-premium flex items-center justify-between rounded-xl border border-[var(--border)] p-4 transition hover:border-[var(--gold)]/40 hover:bg-[var(--background-elevated)]"
                style={
                  {
                    animation: "fade-in 0.6s ease-out forwards",
                    animationDelay: `${0.15 * (i + 3)}s`,
                    opacity: 0,
                  } as React.CSSProperties
                }
              >
                <div>
                  <p className="font-semibold text-[var(--foreground)]">{c.name}</p>
                  <p className="text-sm text-[var(--foreground-muted)]">{c.currencyLabel}</p>
                </div>
                <span className="text-xl text-[var(--foreground-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--gold)]">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {rates.updatedAt && (
          <p className="text-center text-sm text-[var(--foreground-muted)]">
            Last updated ·{" "}
            {typeof rates.updatedAt === "string"
              ? new Date(rates.updatedAt).toLocaleString()
              : new Date(rates.updatedAt * 1000).toLocaleString()}
          </p>
        )}
      </main>
    </>
  );
}
