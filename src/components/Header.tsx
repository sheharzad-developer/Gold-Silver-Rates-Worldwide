import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk";
import { CountryDropdown } from "./CountryDropdown";

export function Header() {
  const hasClerk = isClerkConfigured();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="gradient-gold">◆</span>
          <span className="text-[var(--foreground)]">Gold & Silver</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
          <CountryDropdown />
          {hasClerk && (
            <div className="ml-2 flex items-center gap-2 border-l border-[var(--border)] pl-4">
              <SignedOut>
                <SignInButton>
                  <button className="text-sm font-medium text-[var(--foreground-muted)] transition hover:text-[var(--gold)]">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--background)] transition hover:brightness-110">
                    Sign up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
