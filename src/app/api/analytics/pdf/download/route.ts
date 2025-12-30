import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      error:
        "Analytics PDF with charts is temporarily disabled. Coming soon.",
    },
    { status: 503 }
  );
}
