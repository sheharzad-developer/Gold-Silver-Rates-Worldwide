import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Plus_Jakarta_Sans } from "next/font/google";
import { isClerkConfigured } from "@/lib/clerk";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: "Gold & Silver Rates", template: "%s | Gold & Silver Rates" },
  description: "Live gold and silver prices in USD and local currencies. Saudi Arabia, UAE, Qatar, Kuwait, Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );

  if (isClerkConfigured()) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }
  return content;
}
