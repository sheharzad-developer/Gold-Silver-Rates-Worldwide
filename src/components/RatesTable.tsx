"use client";

import type { GramRateRow } from "@/lib/types";
import { ar } from "@/config/translations";
import { TOLA_GRAMS } from "@/config/countries";

interface Props {
  rows: GramRateRow[];
  currencyNameForTable: string;
  metalLabel: string;
  sectionTitle: string;
  sectionDate: string;
  locale?: "ar" | "en";
  /** Show tola column (India, Pakistan) */
  showTola?: boolean;
}

function rowDescription(
  metal: string,
  karat: number,
  locale: "ar" | "en"
): string {
  if (locale === "ar") {
    if (metal.toLowerCase() === "silver") return karat === 24 ? ar.rowSilver : `${karat} ${ar.silver}`;
    return ar.rowGold(karat);
  }
  if (metal.toLowerCase() === "silver") {
    return karat === 24 ? "Silver (999)" : `${karat}K ${metal}`;
  }
  return `${karat}K gold`;
}

export function RatesTable({
  rows,
  currencyNameForTable,
  metalLabel,
  sectionTitle,
  sectionDate,
  locale = "en",
  showTola,
}: Props) {
  const isRtl = locale === "ar";

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] shadow-xl">
      <div
        className={`flex flex-col gap-1 border-b border-[var(--border)] bg-[var(--background-elevated)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between ${isRtl ? "sm:flex-row-reverse" : ""}`}
      >
        <h3 className="font-semibold text-[var(--foreground)]">{sectionTitle}</h3>
        <span className="text-sm text-[var(--foreground-muted)]">{sectionDate}</span>
      </div>
      <div className="overflow-x-auto">
        <table className={`w-full min-w-[320px] ${isRtl ? "[direction:rtl]" : ""}`}>
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] ${isRtl ? "text-right" : "text-left"}`}>
                {isRtl ? ar.karat : "Karat"}
              </th>
              <th className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] ${isRtl ? "text-right" : "text-left"}`}>
                {isRtl ? ar.usdPerGram : "USD / gram"}
              </th>
              {showTola && (
                <th className={`px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--gold)] ${isRtl ? "text-right" : "text-left"}`}>
                  {currencyNameForTable} / tola
                </th>
              )}
              <th className={`px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--gold)] ${isRtl ? "text-right" : "text-left"}`}>
                {currencyNameForTable} / {isRtl ? ar.perGramIn : "gram"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const localPerTola = row.localPerGram * TOLA_GRAMS;
              return (
                <tr
                  key={`${metalLabel}-${row.karat}`}
                  className={`border-b border-[var(--border)] last:border-0 transition hover:bg-[var(--background-elevated)] ${
                    i % 2 === 1 ? "bg-[var(--background)]/30" : ""
                  }`}
                >
                  <td className={`px-6 py-4 font-medium text-[var(--foreground)] ${isRtl ? "text-right" : "text-left"}`}>
                    {rowDescription(metalLabel, row.karat, locale)}
                  </td>
                  <td className={`px-6 py-4 font-mono font-semibold text-[var(--foreground)] ${isRtl ? "text-right" : "text-left"}`}>
                    ${row.usdPerGram.toFixed(2)}
                  </td>
                  {showTola && (
                    <td className={`px-6 py-4 text-lg font-mono font-semibold text-[var(--foreground)] ${isRtl ? "text-right" : "text-left"}`}>
                      {localPerTola.toFixed(2)} {currencyNameForTable}
                    </td>
                  )}
                  <td className={`px-6 py-4 text-lg font-mono font-semibold text-[var(--foreground)] ${isRtl ? "text-right" : "text-left"}`}>
                    {row.localPerGram.toFixed(2)} {currencyNameForTable}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showTola && (
        <p className="border-t border-[var(--border)] px-6 py-3 text-center text-xs text-[var(--foreground-muted)]">
          Per tola = Per gram × 11.664
        </p>
      )}
    </div>
  );
}
