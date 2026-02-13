/**
 * Gold/Silver price providers.
 * Set GOLD_PRICE_PROVIDER in .env.local:
 *   - "gold_api_com" (default): gold-api.com – free, unlimited, USD only
 *   - "goldapi_io": GoldAPI.io – requires GOLDAPI_KEY, supports all currencies
 */

import { TROY_OUNCE_GRAMS } from "@/config/countries";
import type { CountryId } from "@/config/countries";
import type { AllRates, HomeRates } from "./types";
import {
  getFallbackCountryRates,
  getFallbackHomeRates,
  FALLBACK_FX,
} from "./fallback-data";

const CURRENCY_MAP: Record<CountryId, string> = {
  saudi: "SAR",
  uae: "AED",
  qatar: "QAR",
  kuwait: "KWD",
  pakistan: "PKR",
  india: "INR",
  international: "USD",
};

function getProvider(): "gold_api_com" | "goldapi_io" {
  const p = process.env.GOLD_PRICE_PROVIDER?.trim().toLowerCase();
  if (p === "goldapi_io" && process.env.GOLDAPI_KEY?.trim()) return "goldapi_io";
  return "gold_api_com";
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

// ─── gold-api.com (unlimited, USD only) ───
const GOLD_API_COM = "https://api.gold-api.com";

interface GoldApiComResponse {
  price: number;
  symbol: string;
  name: string;
  updatedAt?: string;
}

async function fetchGoldApiCom(metal: "XAU" | "XAG"): Promise<number | null> {
  try {
    const apiKey = process.env.GOLD_API_COM_KEY?.trim();
    const headers: Record<string, string> = {};
    if (apiKey) headers["x-access-token"] = apiKey;
    const res = await fetch(`${GOLD_API_COM}/price/${metal}`, {
      headers: Object.keys(headers).length ? headers : undefined,
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as GoldApiComResponse;
    if (typeof data?.price !== "number") return null;
    return data.price;
  } catch (err) {
    console.error(`gold-api.com ${metal} fetch error:`, err);
    return null;
  }
}

// ─── GoldAPI.io (requires key, all currencies) ───
const GOLDAPI_IO_BASE = "https://www.goldapi.io/api";

interface GoldApiIoResponse {
  price: number;
  price_gram_24k?: number;
  price_gram_22k?: number;
  currency?: string;
}

async function fetchGoldApiIo(
  metal: "gold" | "silver",
  currency: string,
  apiKey: string
): Promise<GoldApiIoResponse | null> {
  const symbol = metal === "gold" ? "XAU" : "XAG";
  const url = `${GOLDAPI_IO_BASE}/${symbol}/${currency}`;
  try {
    const res = await fetch(url, {
      headers: { "x-access-token": apiKey },
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      const text = await res.text();
      console.error(`GoldAPI.io ${metal} ${currency}: ${res.status}`, text.slice(0, 200));
      return null;
    }
    const data = (await res.json()) as GoldApiIoResponse;
    if (typeof data?.price !== "number") return null;
    return data;
  } catch (err) {
    console.error(`GoldAPI.io ${metal} ${currency} fetch error:`, err);
    return null;
  }
}

// ─── Public API ───

export async function fetchHomeRates(): Promise<HomeRates> {
  const provider = getProvider();

  if (provider === "gold_api_com") {
    const [gold, silver] = await Promise.all([
      fetchGoldApiCom("XAU"),
      fetchGoldApiCom("XAG"),
    ]);
    if (gold != null && silver != null) {
      return {
        goldUsdPerOunce: gold,
        silverUsdPerOunce: silver,
        updatedAt: new Date().toISOString(),
      };
    }
  }

  if (provider === "goldapi_io") {
    const apiKey = process.env.GOLDAPI_KEY?.trim();
    if (apiKey) {
      const [gold, silver] = await Promise.all([
        fetchGoldApiIo("gold", "USD", apiKey),
        fetchGoldApiIo("silver", "USD", apiKey),
      ]);
      if (gold?.price != null && silver?.price != null) {
        return {
          goldUsdPerOunce: gold.price,
          silverUsdPerOunce: silver.price,
          updatedAt: new Date().toISOString(),
        };
      }
    }
  }

  return getFallbackHomeRates();
}

export async function fetchCountryRates(countryId: CountryId): Promise<AllRates> {
  const currency = CURRENCY_MAP[countryId];
  const provider = getProvider();

  if (provider === "gold_api_com") {
    const [goldUsd, silverUsd] = await Promise.all([
      fetchGoldApiCom("XAU"),
      fetchGoldApiCom("XAG"),
    ]);
    if (goldUsd != null && silverUsd != null) {
      const fx = FALLBACK_FX[currency] ?? 1;
      const goldLocal = goldUsd * fx;
      const silverLocal = silverUsd * fx;
      const karats = [18, 21, 22, 24] as const;
      return {
        currencyCode: currency,
        gold: {
          perOunce: { usd: goldUsd, local: goldLocal },
          perGram: buildGramRowsFromOunce(goldUsd, goldLocal, karats),
        },
        silver: {
          perOunce: { usd: silverUsd, local: silverLocal },
          perGram: buildGramRowsFromOunce(silverUsd, silverLocal, [24]).map(
            (r) => ({ ...r, karat: 24 as const })
          ),
        },
      };
    }
  }

  if (provider === "goldapi_io") {
    const apiKey = process.env.GOLDAPI_KEY?.trim();
    if (apiKey) {
      const [goldUsd, silverUsd, goldLocal, silverLocal] = await Promise.all([
        fetchGoldApiIo("gold", "USD", apiKey),
        fetchGoldApiIo("silver", "USD", apiKey),
        currency === "USD"
          ? Promise.resolve(null as GoldApiIoResponse | null)
          : fetchGoldApiIo("gold", currency, apiKey),
        currency === "USD"
          ? Promise.resolve(null as GoldApiIoResponse | null)
          : fetchGoldApiIo("silver", currency, apiKey),
      ]);
      if (goldUsd?.price != null && silverUsd?.price != null) {
        const gUsd = goldUsd.price;
        const sUsd = silverUsd.price;
        const gLocal = goldLocal?.price ?? gUsd * (FALLBACK_FX[currency] ?? 1);
        const sLocal = silverLocal?.price ?? sUsd * (FALLBACK_FX[currency] ?? 1);
        const karats = [18, 21, 22, 24] as const;
        return {
          currencyCode: currency,
          gold: {
            perOunce: { usd: gUsd, local: gLocal },
            perGram: buildGramRowsFromOunce(gUsd, gLocal, karats),
          },
          silver: {
            perOunce: { usd: sUsd, local: sLocal },
            perGram: buildGramRowsFromOunce(sUsd, sLocal, [24]).map(
              (r) => ({ ...r, karat: 24 as const })
            ),
          },
        };
      }
    }
  }

  return getFallbackCountryRates(currency);
}
