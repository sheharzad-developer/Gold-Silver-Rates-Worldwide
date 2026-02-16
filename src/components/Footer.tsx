import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-elevated)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-[var(--gold)]/10 px-4 py-2 text-sm font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)]/20"
        >
          <span>◆</span>
          Gold & Silver
        </Link>
        <p className="text-sm text-[var(--foreground-muted)]">
          Live gold and silver prices · Updated every 5 minutes
        </p>
      </div>
    </footer>
  );
}
