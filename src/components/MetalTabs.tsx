"use client";

import { useState } from "react";
import { RatesTable } from "./RatesTable";
import { ar } from "@/config/translations";
import type { MetalRates } from "@/lib/types";

interface Props {
  gold: MetalRates;
  silver: MetalRates;
  currencyNameForTable: string;
  countryName: string;
  sectionDate: string;
  locale?: "ar" | "en";
  /** Optional subtitle below tabs (e.g. أسعار جرام الذهب في السعودية) */
  subtitleAr?: string;
  /** Show tola column (India, Pakistan) */
  showTola?: boolean;
  /** Hide USD column (India, Pakistan – focus on local currency) */
  hideUsdInTable?: boolean;
}

export function MetalTabs({
  gold,
  silver,
  currencyNameForTable,
  countryName,
  sectionDate,
  locale = "en",
  subtitleAr,
  showTola,
  hideUsdInTable,
}: Props) {
  const [active, setActive] = useState<"gold" | "silver">("gold");
  const current = active === "gold" ? gold : silver;
  const isAr = locale === "ar";
  const metalLabel = active === "gold" ? (isAr ? ar.gold : "Gold") : (isAr ? ar.silver : "Silver");
  const sectionTitle = isAr
    ? `${ar.perGramIn} – ${metalLabel} – ${countryName}`
    : `Per gram – ${metalLabel} in ${countryName}`;

  return (
    <section className="space-y-4">
      <div className="inline-flex w-full flex-wrap gap-1 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-1.5 sm:w-auto">
        <button
          type="button"
          onClick={() => setActive("gold")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:flex-none sm:px-6 sm:py-3 ${
            active === "gold"
              ? "bg-[var(--gold)] text-[var(--background)] shadow-lg"
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {isAr ? ar.gold : "Gold"}
        </button>
        <button
          type="button"
          onClick={() => setActive("silver")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:flex-none sm:px-6 sm:py-3 ${
            active === "silver"
              ? "bg-[var(--silver)] text-[var(--background)] shadow-lg"
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {isAr ? ar.silver : "Silver"}
        </button>
      </div>
      {subtitleAr && (
        <p className="text-right text-sm font-medium text-[var(--foreground-muted)]">
          {subtitleAr}
        </p>
      )}
      <RatesTable
        rows={current.perGram}
        currencyNameForTable={currencyNameForTable}
        metalLabel={active === "gold" ? "Gold" : "Silver"}
        sectionTitle={sectionTitle}
        sectionDate={sectionDate}
        locale={locale}
        showTola={showTola}
        hideUsdInTable={hideUsdInTable}
      />
    </section>
  );
}
