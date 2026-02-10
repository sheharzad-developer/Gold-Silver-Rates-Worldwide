/**
 * GoldAPI.io integration.
 * Set GOLDAPI_KEY in .env.local for live data. Without it, fallback data is used.
 * Docs: https://www.goldapi.io/
 */

import { TROY_OUNCE_GRAMS } from "@/config/countries";
import type { CountryId } from "@/config/countries";
import type { AllRates, HomeRates } from "./types";
import { getFallbackCountryRates, getFallbackHomeRates } from "./fallback-data";

const BASE = "https://www.goldapi.io/api";
const METALS = { gold: "XAU", silver: "XAG" } as const;
const CURRENCY_MAP: Record<CountryId, string> = {
  saudi: "SAR",
  uae: "AED",
  qatar: "QAR",
  kuwait: "KWD",
  pakistan: "PKR",
  international: "USD",
};

interface GoldApiResponse {
  price: number;
  price_gram_24k?: number;
  price_gram_22k?: number;
  currency?: string;
}

async function fetchMetal(
  metal: keyof typeof METALS,
  currency: string,
  apiKey: string
): Promise<GoldApiResponse | null> {
  const symbol = METALS[metal];
  const url = `${BASE}/${symbol}/${currency}`;
  try {
    const res = await fetch(url, {
      headers: { "x-access-token": apiKey },
      next: { revalidate: 300 }, // 5 min
    });
    if (!res.ok) return null;
    return (await res.json()) as GoldApiResponse;
  } catch {
    return null;
  }
}

function buildGramRowsFromOunce(
  usdPerOunce: number,
  localPerOunce: number,
  karats: readonly number[]
): { karat: 18 | 21 | 22 | 24; usdPerGram: number; localPerGram: number }[] {
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

export async function fetchHomeRates(): Promise<HomeRates> {
  const apiKey = process.env.GOLDAPI_KEY;
  if (!apiKey) return getFallbackHomeRates();

  const [gold, silver] = await Promise.all([
    fetchMetal("gold", "USD", apiKey),
    fetchMetal("silver", "USD", apiKey),
  ]);

  if (gold?.price != null && silver?.price != null) {
    return {
      goldUsdPerOunce: gold.price,
      silverUsdPerOunce: silver.price,
      updatedAt: new Date().toISOString(),
    };
  }
  return getFallbackHomeRates();
}

export async function fetchCountryRates(countryId: CountryId): Promise<AllRates> {
  const apiKey = process.env.GOLDAPI_KEY;
  const currency = CURRENCY_MAP[countryId];
  if (!apiKey) return getFallbackCountryRates(currency);

  const [goldUsd, silverUsd, goldLocal, silverLocal] = await Promise.all([
    fetchMetal("gold", "USD", apiKey),
    fetchMetal("silver", "USD", apiKey),
    currency === "USD"
      ? Promise.resolve(null as GoldApiResponse | null)
      : fetchMetal("gold", currency, apiKey),
    currency === "USD"
      ? Promise.resolve(null as GoldApiResponse | null)
      : fetchMetal("silver", currency, apiKey),
  ]);

  const goldUsdPerOunce = goldUsd?.price ?? 2650;
  const silverUsdPerOunce = silverUsd?.price ?? 31.5;
  const goldLocalPerOunce = goldLocal?.price ?? goldUsdPerOunce;
  const silverLocalPerOunce = silverLocal?.price ?? silverUsdPerOunce;
  const karats = [18, 21, 22, 24] as const;

  return {
    currencyCode: currency,
    gold: {
      perOunce: { usd: goldUsdPerOunce, local: goldLocalPerOunce },
      perGram: buildGramRowsFromOunce(goldUsdPerOunce, goldLocalPerOunce, karats),
    },
    silver: {
      perOunce: { usd: silverUsdPerOunce, local: silverLocalPerOunce },
      perGram: buildGramRowsFromOunce(silverUsdPerOunce, silverLocalPerOunce, [24]).map(
        (r) => ({ ...r, karat: 24 as const })
      ),
    },
  };
}
