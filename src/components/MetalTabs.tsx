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
}

export function MetalTabs({
  gold,
  silver,
  currencyNameForTable,
  countryName,
  sectionDate,
  locale = "en",
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
      <div className="inline-flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-1.5">
        <button
          type="button"
          onClick={() => setActive("gold")}
          className={`rounded-lg px-6 py-3 text-sm font-semibold transition ${
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
          className={`rounded-lg px-6 py-3 text-sm font-semibold transition ${
            active === "silver"
              ? "bg-[var(--silver)] text-[var(--background)] shadow-lg"
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {isAr ? ar.silver : "Silver"}
        </button>
      </div>
      <RatesTable
        rows={current.perGram}
        currencyNameForTable={currencyNameForTable}
        metalLabel={active === "gold" ? "Gold" : "Silver"}
        sectionTitle={sectionTitle}
        sectionDate={sectionDate}
        locale={locale}
      />
    </section>
  );
}
