import { NextResponse } from "next/server";
import { getCredits } from "@/lib/credit-store";

export const runtime = "nodejs";

export async function GET() {
  const credits = getCredits("demo-user");
  return NextResponse.json({ credits });
}
