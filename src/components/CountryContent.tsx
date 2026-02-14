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
    <article className="mt-10 space-y-8 border-t border-[var(--border)] pt-10">
      {/* Article sections */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
          {article.h1}
        </h2>
        <div className="space-y-6">
          {article.sections.map((sec, i) => (
            <div key={i}>
              <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)]">{sec.h2}</h3>
              <p className="leading-relaxed text-[var(--foreground-muted)]">{sec.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">الأسئلة الشائعة</h2>
        <dl className="space-y-4">
          {faq.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4"
            >
              <dt className="mb-2 font-semibold text-[var(--foreground)]">{item.q}</dt>
              <dd className="text-[var(--foreground-muted)]">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
