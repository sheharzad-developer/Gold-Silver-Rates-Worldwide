"use client";

import type { GramRateRow } from "@/lib/types";
import { ar } from "@/config/translations";

interface Props {
  rows: GramRateRow[];
  currencyNameForTable: string;
  metalLabel: string;
  sectionTitle: string;
  sectionDate: string;
  locale?: "ar" | "en";
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
              <th className={`px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--gold)] ${isRtl ? "text-right" : "text-left"}`}>
                {currencyNameForTable} / {isRtl ? ar.perGramIn : "gram"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
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
                <td className={`px-6 py-4 text-lg font-mono font-semibold text-[var(--foreground)] ${isRtl ? "text-right" : "text-left"}`}>
                  {row.localPerGram.toFixed(2)} {currencyNameForTable}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
