"use client";

import type { GramRateRow } from "@/lib/types";

interface Props {
  rows: GramRateRow[];
  currencyLabel: string;
  metalLabel: string;
}

export function RatesTable({ rows, currencyLabel, metalLabel }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-amber-200 bg-white shadow-sm">
      <table className="w-full min-w-[280px] text-left">
        <thead>
          <tr className="border-b border-amber-200 bg-amber-50/70">
            <th className="px-4 py-3 font-semibold text-amber-900">
              Karat
            </th>
            <th className="px-4 py-3 font-semibold text-amber-900">
              Price per gram (USD)
            </th>
            <th className="px-4 py-3 font-semibold text-amber-900">
              Price per gram ({currencyLabel})
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${metalLabel}-${row.karat}`}
              className="border-b border-amber-100 last:border-0 hover:bg-amber-50/50"
            >
              <td className="px-4 py-3 text-amber-900 font-medium">
                {row.karat}K
              </td>
              <td className="px-4 py-3 text-amber-800">
                ${row.usdPerGram.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-amber-800">
                {row.localPerGram.toFixed(2)} {currencyLabel}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
