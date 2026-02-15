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
      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-8">
        {/* Hero */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] via-[var(--background-elevated)] to-[var(--card-bg)] p-8 sm:p-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--gold)]/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-[var(--silver)]/10 blur-3xl" />
          <div className="relative">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Live Spot Prices
            </p>
            <h1 className="mb-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
              Precious metal rates,{" "}
              <span className="gradient-gold">updated in real time</span>
            </h1>
            <p className="max-w-xl text-sm text-[var(--foreground-muted)]">
              Gold and silver prices per gram and per ounce in USD. Select your country for all karats in local currency.
            </p>
          </div>
        </div>

        {/* Price Cards - Per Gram & Per Ounce */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-premium card-gold animate-fade-in animate-delay-1 flex flex-col rounded-xl p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--gold)]/20 text-xl">
              ◆
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
              Gold · Per Gram (24K)
            </p>
            <p className="font-mono text-2xl font-bold tracking-tight text-[var(--foreground)]">
              ${goldPerGram.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">Spot · Live</p>
          </div>
          <div className="card-premium card-gold animate-fade-in animate-delay-1 flex flex-col rounded-xl p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--gold)]/20 text-xl">
              ◆
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
              Gold · Per Ounce
            </p>
            <p className="font-mono text-2xl font-bold tracking-tight text-[var(--foreground)]">
              ${rates.goldUsdPerOunce.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">Spot · Live</p>
          </div>
          <div className="card-premium card-silver animate-fade-in animate-delay-2 flex flex-col rounded-xl p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--silver)]/20 text-xl">
              ◇
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--silver)]">
              Silver · Per Gram (999)
            </p>
            <p className="font-mono text-2xl font-bold tracking-tight text-[var(--foreground)]">
              ${silverPerGram.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">Spot · Live</p>
          </div>
          <div className="card-premium card-silver animate-fade-in animate-delay-2 flex flex-col rounded-xl p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--silver)]/20 text-xl">
              ◇
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--silver)]">
              Silver · Per Ounce
            </p>
            <p className="font-mono text-2xl font-bold tracking-tight text-[var(--foreground)]">
              ${rates.silverUsdPerOunce.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">Spot · Live</p>
          </div>
        </div>

        {/* Countries */}
        <div className="mb-12">
          <h2 className="mb-1 text-xl font-bold text-[var(--foreground)]">
            Rates by country
          </h2>
          <p className="mb-4 text-sm text-[var(--foreground-muted)]">
            Per-gram and per-ounce prices in 18K, 21K, 22K, 24K for your region.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
