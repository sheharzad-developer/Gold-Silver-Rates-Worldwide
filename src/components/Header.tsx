import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { COUNTRIES } from "@/config/countries";
import { isClerkConfigured } from "@/lib/clerk";

export function Header() {
  const countryLinks = COUNTRIES.filter((c) => c.id !== "international");
  const hasClerk = isClerkConfigured();

  return (
    <header className="border-b border-[var(--border)] bg-white sticky top-0 z-10">
      <div className="mx-auto max-w-4xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link
          href="/"
          className="text-[var(--table-header)] font-semibold hover:underline"
        >
          Browse sections
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-700">
            {countryLinks.map((c) => (
              <Link
                key={c.id}
                href={c.path}
                className="hover:text-[var(--table-header)] hover:underline"
              >
                {c.name}
              </Link>
            ))}
          </nav>
          {hasClerk && (
            <>
              <SignedOut>
                <SignInButton>
                  <button className="text-sm text-neutral-600 hover:text-[var(--table-header)]">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button
                    className="rounded border border-[var(--table-header)] px-3 py-1.5 text-sm font-medium"
                    style={{ color: "var(--table-header)" }}
                  >
                    Sign up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
