"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { COUNTRIES } from "@/config/countries";

const countryLinks = COUNTRIES.filter((c) => c.id !== "international");

export function CountryDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--gold)]/40"
      >
        Countries
        <span className={`text-[var(--foreground-muted)] transition ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 min-w-[180px] rounded-xl border border-[var(--border)] bg-[var(--card-bg)] py-1 shadow-xl sm:left-auto">
          {countryLinks.map((c) => (
            <Link
              key={c.id}
              href={c.path}
              className="block px-4 py-2.5 text-sm text-[var(--foreground-muted)] transition hover:bg-[var(--border)] hover:text-[var(--foreground)]"
              onClick={() => setOpen(false)}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
