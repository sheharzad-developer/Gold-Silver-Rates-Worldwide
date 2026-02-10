/**
 * Country and currency configuration for gold/silver rates.
 * Add new entries here to support more countries.
 */

export const TROY_OUNCE_GRAMS = 31.1035;

export type CountryId =
  | "saudi"
  | "uae"
  | "qatar"
  | "kuwait"
  | "pakistan"
  | "international";

export interface CountryConfig {
  id: CountryId;
  path: string;
  name: string;
  currency: string;
  /** ISO 4217 code for API (e.g. SAR, AED). Use USD for international. */
  currencyCode: string;
  /** Short label for table header, e.g. "SAR" */
  currencyLabel: string;
  /** SEO */
  title: string;
  description: string;
}

export const COUNTRIES: CountryConfig[] = [
  {
    id: "saudi",
    path: "/saudi-gold-silver",
    name: "Saudi Arabia",
    currency: "Saudi Riyal",
    currencyCode: "SAR",
    currencyLabel: "SAR",
    title: "Gold & Silver Rates in Saudi Arabia – Live SAR Prices",
    description:
      "Live gold and silver prices in Saudi Arabia (SAR). Per ounce and per gram rates for 18K, 21K, 22K, 24K. Updated every 5 minutes.",
  },
  {
    id: "uae",
    path: "/uae-gold-silver",
    name: "UAE",
    currency: "UAE Dirham",
    currencyCode: "AED",
    currencyLabel: "AED",
    title: "Gold & Silver Rates in UAE – Live AED Prices",
    description:
      "Live gold and silver prices in UAE (AED). Per ounce and per gram rates for 18K, 21K, 22K, 24K. Updated every 5 minutes.",
  },
  {
    id: "qatar",
    path: "/qatar-gold-silver",
    name: "Qatar",
    currency: "Qatari Riyal",
    currencyCode: "QAR",
    currencyLabel: "QAR",
    title: "Gold & Silver Rates in Qatar – Live QAR Prices",
    description:
      "Live gold and silver prices in Qatar (QAR). Per ounce and per gram rates for 18K, 21K, 22K, 24K. Updated every 5 minutes.",
  },
  {
    id: "kuwait",
    path: "/kuwait-gold-silver",
    name: "Kuwait",
    currency: "Kuwaiti Dinar",
    currencyCode: "KWD",
    currencyLabel: "KWD",
    title: "Gold & Silver Rates in Kuwait – Live KWD Prices",
    description:
      "Live gold and silver prices in Kuwait (KWD). Per ounce and per gram rates for 18K, 21K, 22K, 24K. Updated every 5 minutes.",
  },
  {
    id: "pakistan",
    path: "/pakistan-gold-silver",
    name: "Pakistan",
    currency: "Pakistani Rupee",
    currencyCode: "PKR",
    currencyLabel: "PKR",
    title: "Gold & Silver Rates in Pakistan – Live PKR Prices",
    description:
      "Live gold and silver prices in Pakistan (PKR). Per ounce and per gram rates for 18K, 21K, 22K, 24K. Updated every 5 minutes.",
  },
  {
    id: "international",
    path: "/",
    name: "International",
    currency: "US Dollar",
    currencyCode: "USD",
    currencyLabel: "USD",
    title: "Gold & Silver Rates – Live USD Prices",
    description:
      "Live international gold and silver prices per troy ounce in USD. View country-specific rates for Saudi Arabia, UAE, Qatar, Kuwait, and Pakistan.",
  },
];

export const KARATS = [18, 21, 22, 24] as const;
export type Karat = (typeof KARATS)[number];

/** Purity ratio (e.g. 18K = 18/24) */
export function karatPurity(k: Karat): number {
  return k / 24;
}

export function getCountryByPath(path: string): CountryConfig | undefined {
  return COUNTRIES.find((c) => c.path === path || (path === "/" && c.id === "international"));
}

export function getCountryById(id: CountryId): CountryConfig {
  return COUNTRIES.find((c) => c.id === id) ?? COUNTRIES[0];
}
