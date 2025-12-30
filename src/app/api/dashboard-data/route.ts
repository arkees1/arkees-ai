import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/credits-engine";
import { generateDashboardData } from "@/lib/dashboardEngine";

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { success: false, error: "Invalid messages" },
        { status: 400 }
      );
    }

    deductCredits(userId, 1);

    const data = generateDashboardData(messages);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Dashboard generation failed" },
      { status: 500 }
    );
  }
}
