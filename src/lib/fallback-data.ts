/**
 * Fallback rates when the external API is unavailable.
 * Update these periodically or use as demo values.
 */

import { TROY_OUNCE_GRAMS } from "@/config/countries";
import type { AllRates, HomeRates } from "./types";

// Approximate spot prices (USD per troy ounce) – replace with recent values
const FALLBACK_GOLD_USD_PER_OUNCE = 2650;
const FALLBACK_SILVER_USD_PER_OUNCE = 31.5;

/** USD to local currency – used for fallback and gold-api.com (USD-only API) */
export const FALLBACK_FX: Record<string, number> = {
  SAR: 3.75,
  AED: 3.67,
  QAR: 3.64,
  KWD: 0.31,
  PKR: 278,
  INR: 83,
  USD: 1,
};

function buildGramRows(
  usdPerOunce: number,
  localPerOunce: number,
  karats: readonly number[]
): { karat: (typeof karats)[number]; usdPerGram: number; localPerGram: number }[] {
  const usdPerGram24 = usdPerOunce / TROY_OUNCE_GRAMS;
  return karats.map((k) => {
    const purity = k / 24;
    return {
      karat: k as 18 | 21 | 22 | 24,
      usdPerGram: Math.round(usdPerGram24 * purity * 100) / 100,
      localPerGram: Math.round((localPerOunce / TROY_OUNCE_GRAMS) * purity * 100) / 100,
    };
  });
}

export function getFallbackHomeRates(): HomeRates {
  return {
    goldUsdPerOunce: FALLBACK_GOLD_USD_PER_OUNCE,
    silverUsdPerOunce: FALLBACK_SILVER_USD_PER_OUNCE,
    updatedAt: new Date().toISOString(),
  };
}

export function getFallbackCountryRates(currencyCode: string): AllRates {
  const rate = FALLBACK_FX[currencyCode] ?? 1;
  const goldLocal = FALLBACK_GOLD_USD_PER_OUNCE * rate;
  const silverLocal = FALLBACK_SILVER_USD_PER_OUNCE * rate;
  const karats = [18, 21, 22, 24] as const;

  return {
    currencyCode,
    gold: {
      perOunce: { usd: FALLBACK_GOLD_USD_PER_OUNCE, local: goldLocal },
      perGram: buildGramRows(
        FALLBACK_GOLD_USD_PER_OUNCE,
        goldLocal,
        karats
      ) as AllRates["gold"]["perGram"],
    },
    silver: {
      perOunce: { usd: FALLBACK_SILVER_USD_PER_OUNCE, local: silverLocal },
      // Silver shown as 24K equivalent (pure) for table consistency
      perGram: buildGramRows(
        FALLBACK_SILVER_USD_PER_OUNCE,
        silverLocal,
        [24]
      ).map((r) => ({ ...r, karat: 24 as const })),
    },
  };
}
