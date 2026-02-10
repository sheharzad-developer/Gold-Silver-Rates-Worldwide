import Link from "next/link";
import { COUNTRIES } from "@/config/countries";

export function Header() {
  const countryLinks = COUNTRIES.filter((c) => c.id !== "international");

  return (
    <header className="border-b border-amber-200/50 bg-amber-50/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link
          href="/"
          className="text-xl font-semibold text-amber-900 hover:text-amber-700 transition"
        >
          Gold & Silver Rates
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {countryLinks.map((c) => (
            <Link
              key={c.id}
              href={c.path}
              className="text-amber-800 hover:text-amber-600 hover:underline"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
