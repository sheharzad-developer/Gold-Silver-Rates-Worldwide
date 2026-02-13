import Link from "next/link";
import { fetchHomeRates } from "@/lib/goldapi";
import { Header } from "@/components/Header";
import { COUNTRIES } from "@/config/countries";

export const metadata = {
  title: "Gold & Silver Rates – Live USD Prices",
  description:
    "Live international gold and silver prices per troy ounce in USD. View country-specific rates for Saudi Arabia, UAE, Qatar, Kuwait, and Pakistan.",
  openGraph: {
    title: "Gold & Silver Rates – Live USD Prices",
    description:
      "Live international gold and silver prices per troy ounce in USD.",
  },
};

export const revalidate = 300;

export default async function HomePage() {
  const rates = await fetchHomeRates();

  const countryLinks = COUNTRIES.filter((c) => c.id !== "international");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-8">
        {/* Hero */}
        <div className="relative mb-20 overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card-bg)] via-[var(--background-elevated)] to-[var(--card-bg)] p-12 sm:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--gold)]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[var(--silver)]/10 blur-3xl" />
          <div className="relative">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Live Spot Prices
            </p>
            <h1 className="mb-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
              Precious metal rates,{" "}
              <span className="gradient-gold">updated in real time</span>
            </h1>
            <p className="max-w-xl text-lg text-[var(--foreground-muted)]">
              Gold and silver prices per troy ounce in USD. Select your country for per-gram rates in local currency.
            </p>
          </div>
        </div>

        {/* Price Cards */}
        <div className="mb-20 grid gap-8 sm:grid-cols-2">
          <div className="card-premium card-gold animate-fade-in animate-delay-1 flex flex-col rounded-2xl p-8 sm:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--gold)]/20 text-3xl">
              ◆
            </div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Gold · Per Troy Ounce
            </p>
            <p className="mb-2 font-mono text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              ${rates.goldUsdPerOunce.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[var(--foreground-muted)]">Spot price · Live</p>
          </div>
          <div className="card-premium card-silver animate-fade-in animate-delay-2 flex flex-col rounded-2xl p-8 sm:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--silver)]/20 text-3xl">
              ◇
            </div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--silver)]">
              Silver · Per Troy Ounce
            </p>
            <p className="mb-2 font-mono text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              ${rates.silverUsdPerOunce.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[var(--foreground-muted)]">Spot price · Live</p>
          </div>
        </div>

        {/* Countries */}
        <div className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-[var(--foreground)]">
            Rates by country
          </h2>
          <p className="mb-8 text-[var(--foreground-muted)]">
            Per-gram prices in 18K, 21K, 22K, 24K for your region.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countryLinks.map((c, i) => (
              <Link
                key={c.id}
                href={c.path}
                className="group card-premium flex items-center justify-between rounded-xl border border-[var(--border)] p-6 transition hover:border-[var(--gold)]/40 hover:bg-[var(--background-elevated)]"
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
