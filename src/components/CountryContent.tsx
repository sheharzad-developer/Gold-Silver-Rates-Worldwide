import type { ContentSection, FaqItem } from "@/content/saudi";

interface CountryContentProps {
  article: {
    h1: string;
    sections: ContentSection[];
  };
  faq: FaqItem[];
}

export function CountryContent({ article, faq }: CountryContentProps) {
  return (
    <article className="mt-8 space-y-6 border-t border-[var(--border)] pt-8 sm:mt-10 sm:space-y-8 sm:pt-10">
      {/* Article sections */}
      <section>
        <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] sm:mb-4 sm:text-2xl md:text-3xl">
          {article.h1}
        </h2>
        <div className="space-y-6">
          {article.sections.map((sec, i) => (
            <div key={i}>
              <h3 className="mb-2 text-base font-semibold text-[var(--foreground)] sm:text-lg">{sec.h2}</h3>
              <p className="text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">{sec.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-[var(--foreground)] sm:mb-4 sm:text-xl">الأسئلة الشائعة</h2>
        <dl className="space-y-3 sm:space-y-4">
          {faq.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-3 sm:p-4"
            >
              <dt className="mb-1 text-sm font-semibold text-[var(--foreground)] sm:mb-2 sm:text-base">{item.q}</dt>
              <dd className="text-sm text-[var(--foreground-muted)] sm:text-base">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
