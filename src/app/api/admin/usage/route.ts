import { NextResponse } from "next/server";
import {
  getAllUsage,
  getUsageSummary,
} from "@/lib/usage-logger";

export async function GET() {
  return NextResponse.json({
    summary: getUsageSummary(),
    events: getAllUsage(),
  });
}
