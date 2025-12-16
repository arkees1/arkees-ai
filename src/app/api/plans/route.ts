import { NextResponse } from "next/server";
import { PLANS } from "@/lib/plans";

export function GET() {
  return NextResponse.json({
    success: true,
    plans: PLANS,
  });
}
