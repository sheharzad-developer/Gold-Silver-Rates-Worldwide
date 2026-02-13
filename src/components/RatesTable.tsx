"use client";

import type { GramRateRow } from "@/lib/types";

interface Props {
  rows: GramRateRow[];
  currencyNameForTable: string;
  metalLabel: string;
  sectionTitle: string;
  sectionDate: string;
}

function rowDescription(metal: string, karat: number): string {
  if (metal.toLowerCase() === "silver") {
    return karat === 24 ? "The price of a gram of silver (999)" : `The price of a gram of ${karat} karat ${metal.toLowerCase()}`;
  }
  return `The price of a gram of ${karat} karat gold`;
}

export function RatesTable({
  rows,
  currencyNameForTable,
  metalLabel,
  sectionTitle,
  sectionDate,
}: Props) {
  return (
    <div className="overflow-x-auto border border-[var(--border)]">
      <div
        className="px-4 py-3 text-white font-semibold flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
        style={{ backgroundColor: "var(--table-header)" }}
      >
        <span>{sectionTitle}</span>
        <span className="text-sm font-normal opacity-90">{sectionDate}</span>
      </div>
      <table className="w-full min-w-[320px] text-left">
        <thead>
          <tr className="border-b border-[var(--border)]" style={{ backgroundColor: "var(--table-header)", color: "white" }}>
            <th className="px-4 py-3 font-semibold">Price in dollars</th>
            <th className="px-4 py-3 font-semibold">Price in {currencyNameForTable}</th>
            <th className="px-4 py-3 font-semibold">Prices of a gram of {metalLabel.toLowerCase()} today</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${metalLabel}-${row.karat}`}
              className="border-b border-[var(--border)] last:border-b-0 hover:bg-neutral-50"
            >
              <td className="px-4 py-3 text-neutral-800">${row.usdPerGram.toFixed(2)}</td>
              <td className="px-4 py-3 text-neutral-800">{row.localPerGram.toFixed(2)}</td>
              <td className="px-4 py-3 text-neutral-700 text-sm">
                {rowDescription(metalLabel, row.karat)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
