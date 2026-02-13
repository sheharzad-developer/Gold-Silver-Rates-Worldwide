import { fetchCountryRates } from "@/lib/goldapi";
import { getCountryById } from "@/config/countries";
import type { CountryId } from "@/config/countries";
import { NextResponse } from "next/server";

export const revalidate = 300; // 5 minutes

const VALID_IDS: CountryId[] = [
  "saudi",
  "uae",
  "qatar",
  "kuwait",
  "pakistan",
  "india",
  "international",
];

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params;
  if (!VALID_IDS.includes(country as CountryId)) {
    return NextResponse.json({ error: "Invalid country" }, { status: 400 });
  }
  try {
    const config = getCountryById(country as CountryId);
    const rates = await fetchCountryRates(config.id);
    return NextResponse.json(rates);
  } catch (e) {
    console.error("Country rates error:", e);
    return NextResponse.json(
      { error: "Failed to fetch rates" },
      { status: 500 }
    );
  }
}
