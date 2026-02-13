/** Check if Clerk is configured (valid publishable key set). */
export function isClerkConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && key.startsWith("pk_") && !key.endsWith("..."));
}
