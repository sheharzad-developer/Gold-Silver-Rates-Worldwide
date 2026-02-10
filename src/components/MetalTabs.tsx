"use client";

import { useState } from "react";
import { RatesTable } from "./RatesTable";
import type { MetalRates } from "@/lib/types";

interface Props {
  gold: MetalRates;
  silver: MetalRates;
  currencyLabel: string;
}

export function MetalTabs({ gold, silver, currencyLabel }: Props) {
  const [active, setActive] = useState<"gold" | "silver">("gold");
  const current = active === "gold" ? gold : silver;
  const label = active === "gold" ? "Gold" : "Silver";

  return (
    <section className="space-y-4">
      <div className="flex rounded-lg border border-amber-200 bg-amber-50/50 p-1 w-fit">
        <button
          type="button"
          onClick={() => setActive("gold")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
            active === "gold"
              ? "bg-amber-200 text-amber-900 shadow"
              : "text-amber-800 hover:bg-amber-100"
          }`}
        >
          Gold
        </button>
        <button
          type="button"
          onClick={() => setActive("silver")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
            active === "silver"
              ? "bg-amber-200 text-amber-900 shadow"
              : "text-amber-800 hover:bg-amber-100"
          }`}
        >
          Silver
        </button>
      </div>
      <RatesTable
        rows={current.perGram}
        currencyLabel={currencyLabel}
        metalLabel={label}
      />
    </section>
  );
}
