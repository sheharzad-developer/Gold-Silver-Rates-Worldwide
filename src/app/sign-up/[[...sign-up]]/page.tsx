import { SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk";

export default function SignUpPage() {
  if (!isClerkConfigured()) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p className="text-neutral-600">
          Sign-up is not configured. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to .env.local.
        </p>
      </div>
    );
  }
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <SignUp />
    </div>
  );
}
