import { NextResponse } from "next/server";
import { setUserPlan } from "@/lib/subscription-engine";

export async function POST(req: Request) {
  const { plan } = await req.json();
  const userId = "demo-user";

  setUserPlan(userId, plan);

  return NextResponse.json({ success: true, plan });
}
