"use client";

import { useState } from "react";
import { RatesTable } from "./RatesTable";
import type { MetalRates } from "@/lib/types";

interface Props {
  gold: MetalRates;
  silver: MetalRates;
  currencyNameForTable: string;
  countryName: string;
  sectionDate: string;
}

export function MetalTabs({
  gold,
  silver,
  currencyNameForTable,
  countryName,
  sectionDate,
}: Props) {
  const [active, setActive] = useState<"gold" | "silver">("gold");
  const current = active === "gold" ? gold : silver;
  const metalLabel = active === "gold" ? "Gold" : "Silver";
  const sectionTitle = `Prices of grams of ${metalLabel.toLowerCase()} in the ${countryName}`;

  return (
    <section className="space-y-4">
      <div className="flex border-b border-[var(--border)] gap-0">
        <button
          type="button"
          onClick={() => setActive("gold")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
            active === "gold"
              ? "border-[var(--table-header)] text-[var(--table-header)]"
              : "border-transparent text-neutral-600 hover:text-neutral-900"
          }`}
        >
          Gold
        </button>
        <button
          type="button"
          onClick={() => setActive("silver")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
            active === "silver"
              ? "border-[var(--table-header)] text-[var(--table-header)]"
              : "border-transparent text-neutral-600 hover:text-neutral-900"
          }`}
        >
          Silver
        </button>
      </div>
      <RatesTable
        rows={current.perGram}
        currencyNameForTable={currencyNameForTable}
        metalLabel={metalLabel}
        sectionTitle={sectionTitle}
        sectionDate={sectionDate}
      />
    </section>
  );
}
