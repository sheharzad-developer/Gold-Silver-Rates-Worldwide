/**
 * Shared types for gold/silver rates.
 */

import type { Karat } from "@/config/countries";

export interface MetalRatesPerOunce {
  /** USD per troy ounce */
  usd: number;
  /** Local currency per troy ounce (optional on homepage) */
  local?: number;
  /** Last update timestamp (ISO or unix) */
  updatedAt?: number | string;
}

export interface GramRateRow {
  karat: Karat;
  /** Price per gram in USD */
  usdPerGram: number;
  /** Price per gram in local currency */
  localPerGram: number;
}

export interface MetalRates {
  perOunce: MetalRatesPerOunce;
  /** Per-gram by karat (gold) or single purity (silver as 24K equivalent) */
  perGram: GramRateRow[];
}

export interface AllRates {
  gold: MetalRates;
  silver: MetalRates;
  /** Currency code used for local (e.g. SAR, AED) */
  currencyCode: string;
}

export interface HomeRates {
  goldUsdPerOunce: number;
  silverUsdPerOunce: number;
  updatedAt?: number | string;
}
