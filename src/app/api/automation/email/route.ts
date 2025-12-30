import { NextResponse } from "next/server";
import { sendAutomationEmail } from "@/automations/automation-email-engine";

export async function POST(req: Request) {
  try {
    const { to, subject, body, attachments } =
      await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { error: "to, subject, body required" },
        { status: 400 }
      );
    }

    await sendAutomationEmail({
      to,
      subject,
      body,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return NextResponse.json(
      { error: "Email send failed" },
      { status: 500 }
    );
  }
}
