import { NextResponse } from "next/server";
import { resetCredits } from "@/lib/credit-store";

export const runtime = "nodejs";

export async function POST() {
  const credits = resetCredits("demo-user");
  return NextResponse.json({
    success: true,
    credits,
  });
}
