import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentCredits = Number(body.credits ?? 0);

    if (currentCredits <= 0) {
      return NextResponse.json(
        { error: "No credits left" },
        { status: 400 }
      );
    }

    const updatedCredits = currentCredits - 1;

    return NextResponse.json({
      credits: updatedCredits,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Credits update failed" },
      { status: 500 }
    );
  }
}
