import { NextResponse } from "next/server";
import { saveAutomation } from "@/lib/automation-store";

export async function POST(req: Request) {
  const { name, workflowType, prompt, userId = "demo-user" } = await req.json();

  const automation = saveAutomation({
    userId,
    name,
    workflowType,
    prompt,
  });

  return NextResponse.json({ success: true, automation });
}
