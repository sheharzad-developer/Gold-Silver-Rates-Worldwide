import { Header } from "@/components/Header";
import { MetalTabs } from "@/components/MetalTabs";
import { CountryContent } from "@/components/CountryContent";
import { TOLA_GRAMS, type CountryConfig } from "@/config/countries";
import { ar } from "@/config/translations";
import type { AllRates } from "@/lib/types";

interface Props {
  config: CountryConfig;
  rates: AllRates;
  /** Optional page content (article + FAQ) for Saudi, India etc. */
  pageContent?: {
    article: { h1: string; sections: { h2: string; body: string }[] };
    faq: { q: string; a: string }[];
    faqTitle?: string;
  };
}

function formatSectionDate() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDay(locale: "ar" | "en") {
  return new Date().toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    weekday: "long",
  });
}

export function CountryGoldSilverLayout({ config, rates, pageContent }: Props) {
  const locale = config.locale ?? "en";
  const sectionDate = formatSectionDate();
  const dayName = formatDay(locale);
  const isRtl = locale === "ar";
  const t = isRtl ? ar : null;

  return (
    <>
      <Header />
      <main
        className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5 md:px-8"
        dir={isRtl ? "rtl" : "ltr"}
        lang={isRtl ? "ar" : "en"}
      >
        {/* Hero */}
        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
            {config.name}
          </p>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            {config.heading ?? (t ? (config.titleAr ?? t.title) : "Gold & Silver Rates")}
          </h1>
          {(config.subtitle || config.subtitleAr) && (
            <p className="mb-2 text-sm font-medium text-[var(--foreground-muted)]">
              {config.subtitle ?? config.subtitleAr}
            </p>
          )}
          <p className="text-[var(--foreground-muted)]">
            {dayName} · {sectionDate}
          </p>
        </div>

        {!config.hideOunceCards && (
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="card-premium card-gold rounded-2xl border border-[var(--border)] p-4 sm:p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold)]/20 text-2xl">◆</div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">{t ? t.goldPerOunce : "Gold per troy ounce"}</p>
              <p className="font-mono text-3xl font-bold text-[var(--foreground)]">${rates.gold.perOunce.usd.toFixed(2)}</p>
              <p className="mt-2 text-lg text-[var(--foreground-muted)]">{rates.gold.perOunce.local?.toFixed(2)} {config.currencyLabel}</p>
            </div>
            <div className="card-premium card-silver rounded-2xl border border-[var(--border)] p-4 sm:p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--silver)]/20 text-2xl">◇</div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[var(--silver)]">{t ? t.silverPerOunce : "Silver per troy ounce"}</p>
              <p className="font-mono text-3xl font-bold text-[var(--foreground)]">${rates.silver.perOunce.usd.toFixed(2)}</p>
              <p className="mt-2 text-lg text-[var(--foreground-muted)]">{rates.silver.perOunce.local?.toFixed(2)} {config.currencyLabel}</p>
            </div>
          </div>
        )}

        {/* India/Pakistan: Per tola cards only (Rs) */}
        {config.showTola && (() => {
          const gold24 = rates.gold.perGram.find((r) => r.karat === 24);
          const silver = rates.silver.perGram[0];
          const gold24Tola = gold24 ? gold24.localPerGram * TOLA_GRAMS : 0;
          const silverTola = silver ? silver.localPerGram * TOLA_GRAMS : 0;
          return (
            <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8">
              <div className="card-premium card-gold rounded-xl border border-[var(--border)] p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">Gold · Rs · Per tola</p>
                <p className="font-mono text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                  Rs {gold24Tola.toFixed(2)}
                </p>
                <p className="mt-1 text-xs text-[var(--foreground-muted)]">Gold 24K</p>
              </div>
              <div className="card-premium card-silver rounded-xl border border-[var(--border)] p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--silver)]">Silver · Rs · Per tola</p>
                <p className="font-mono text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                  Rs {silverTola.toFixed(2)}
                </p>
                <p className="mt-1 text-xs text-[var(--foreground-muted)]">Silver</p>
              </div>
            </div>
          );
        })()}

        <MetalTabs
          gold={rates.gold}
          silver={rates.silver}
          currencyNameForTable={isRtl && config.currencyNameForTableAr ? config.currencyNameForTableAr : config.currencyNameForTable}
          countryName={config.name}
          sectionDate={sectionDate}
          locale={locale}
          subtitleAr={config.subtitleAr ?? config.subtitle}
          showTola={config.showTola}
          hideUsdInTable={config.hideUsdInTable}
        />

        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-4 text-sm text-[var(--foreground-muted)]">
          {t ? `${t.rawPrices} · ${t.updated} ${dayName} ${sectionDate}` : `Raw metal prices · Updated ${dayName} ${sectionDate}`}
        </div>

        {pageContent && (
          <CountryContent
            article={pageContent.article}
            faq={pageContent.faq}
            faqTitle={pageContent.faqTitle}
          />
        )}
      </main>
    </>
  );
}
