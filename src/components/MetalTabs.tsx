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
  const sectionTitle = `Per gram – ${metalLabel} in ${countryName}`;

  return (
    <section className="space-y-6">
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
          Gold
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
