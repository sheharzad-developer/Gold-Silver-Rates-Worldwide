import { fetchHomeRates } from "@/lib/goldapi";
import { NextResponse } from "next/server";

export const revalidate = 300; // 5 minutes

export async function GET() {
  try {
    const rates = await fetchHomeRates();
    return NextResponse.json(rates);
  } catch (e) {
    console.error("Home rates error:", e);
    return NextResponse.json(
      { error: "Failed to fetch rates" },
      { status: 500 }
    );
  }
}
