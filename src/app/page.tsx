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
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-neutral-900 mb-6">
          Gold prices
        </h1>

        <div className="border-b border-[var(--border)] pb-4 mb-6">
          <p className="text-lg text-neutral-800">
            The price of an ounce of gold today is ${rates.goldUsdPerOunce.toLocaleString("en-US", { minimumFractionDigits: 2 })}.
          </p>
          <p className="text-neutral-600 mt-1">
            Silver per troy ounce: ${rates.silverUsdPerOunce.toLocaleString("en-US", { minimumFractionDigits: 2 })}.
          </p>
        </div>

        <p className="text-neutral-600 mb-6">
          Click your country page for local currency rates (per ounce and per gram by karat).
        </p>

        <div className="flex flex-wrap gap-3">
          {countryLinks.map((c) => (
            <Link
              key={c.id}
              href={c.path}
              className="inline-flex items-center border border-[var(--border)] px-4 py-2 text-neutral-800 font-medium hover:bg-neutral-50 hover:text-[var(--table-header)] transition"
            >
              {c.name} – {c.currencyLabel}
            </Link>
          ))}
        </div>

        {rates.updatedAt && (
          <p className="mt-8 text-sm text-neutral-500">
            Data last updated:{" "}
            {typeof rates.updatedAt === "string"
              ? new Date(rates.updatedAt).toLocaleString()
              : new Date(rates.updatedAt * 1000).toLocaleString()}
          </p>
        )}
      </main>
    </>
  );
}
