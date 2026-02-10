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
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-6">
          Live Gold & Silver Prices (USD)
        </h1>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wide">
              Gold per troy ounce
            </p>
            <p className="text-3xl font-bold text-amber-900 mt-1">
              ${rates.goldUsdPerOunce.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              Silver per troy ounce
            </p>
            <p className="text-3xl font-bold text-slate-800 mt-1">
              ${rates.silverUsdPerOunce.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <p className="text-amber-800/90 mb-6">
          Click your country page for local currency rates (per ounce and per gram by karat).
        </p>

        <div className="flex flex-wrap gap-3">
          {countryLinks.map((c) => (
            <Link
              key={c.id}
              href={c.path}
              className="inline-flex items-center rounded-lg bg-amber-100 px-4 py-2 text-amber-900 font-medium hover:bg-amber-200 transition"
            >
              {c.name} – {c.currencyLabel}
            </Link>
          ))}
        </div>

        {rates.updatedAt && (
          <p className="mt-8 text-sm text-amber-700/80">
            Last updated:{" "}
            {typeof rates.updatedAt === "string"
              ? new Date(rates.updatedAt).toLocaleString()
              : new Date(rates.updatedAt * 1000).toLocaleString()}
          </p>
        )}
      </main>
    </>
  );
}
