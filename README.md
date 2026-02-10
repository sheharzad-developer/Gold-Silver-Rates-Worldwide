# Gold & Silver Rates Website

A responsive website for **live Gold and Silver prices** in USD and local currencies (Saudi Arabia, UAE, Qatar, Kuwait, Pakistan). Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- **Homepage**: Gold and Silver per troy ounce in USD; links to country pages.
- **Country pages**: Clean URLs (`/saudi-gold-silver`, `/uae-gold-silver`, etc.) with:
  - Gold & Silver per ounce in USD + local currency
  - **Tabs**: Gold (default) and Silver
  - **Table**: 18K, 21K, 22K, 24K with price per gram in USD and local currency
- **API integration**: Single provider (GoldAPI.io) with configurable caching (default 5 min).
- **Fallback**: If no API key or API is down, built-in fallback rates are used.
- **SEO**: Per-page metadata and Open Graph tags; scalable structure for more countries.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live Rates (Optional)

1. Sign up at [GoldAPI.io](https://www.goldapi.io/) (free tier available).
2. Create `.env.local` in the project root:
   ```env
   GOLDAPI_KEY=your_api_key_here
   ```
3. Restart the dev server. Without `GOLDAPI_KEY`, the site uses fallback data.

## Project Structure

```
src/
├── app/
│   ├── api/rates/          # API routes (home + country)
│   ├── saudi-gold-silver/  # Country pages
│   ├── uae-gold-silver/
│   ├── qatar-gold-silver/
│   ├── kuwait-gold-silver/
│   ├── pakistan-gold-silver/
│   ├── layout.tsx
│   └── page.tsx            # Homepage
├── components/
│   ├── Header.tsx
│   ├── MetalTabs.tsx       # Gold / Silver tabs
│   └── RatesTable.tsx
├── config/
│   └── countries.ts        # Country list, currencies, SEO text
└── lib/
    ├── goldapi.ts          # API client + fallback
    ├── fallback-data.ts    # Fallback rates when API unavailable
    └── types.ts
```

## Adding a New Country

1. **Edit `src/config/countries.ts`**:
   - Add a new `CountryId` and entry in `COUNTRIES` with `path`, `name`, `currencyCode`, `currencyLabel`, `title`, `description`.
   - Add the currency to `FALLBACK_FX` in `src/lib/fallback-data.ts` if using fallback.
2. **API**: In `src/lib/goldapi.ts`, add the new country to `CURRENCY_MAP` and `VALID_IDS` in `src/app/api/rates/[country]/route.ts`.
3. **Page**: Create `src/app/{slug}-gold-silver/page.tsx` (copy from an existing country page and change `COUNTRY_ID` and metadata).

## Cache & Update Interval

- **Revalidation**: 300 seconds (5 minutes) in:
  - `src/app/api/rates/home/route.ts`
  - `src/app/api/rates/[country]/route.ts`
  - Each page that fetches rates (`revalidate = 300`).
- To change the interval, update `revalidate` in these places.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **GoldAPI.io** (optional) for live prices

## License

Private / use as needed.
