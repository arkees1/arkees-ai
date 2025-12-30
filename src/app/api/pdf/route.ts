import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { deductCredits, hasCredits } from "@/lib/credit-store";

export const runtime = "nodejs";

const CREDIT_COST = 1;

export async function POST(req: Request) {
  try {
    const CREDIT_COST = 2;
const userId = "demo-user"; // or from req

if (!hasCredits(userId, CREDIT_COST)) {

      return NextResponse.json(
        { error: "Not enough credits" },
        { status: 402 }
      );
    }

    const { prompt, imageUrl } = await req.json();
    if (!prompt && !imageUrl) {
      return NextResponse.json(
        { error: "No data for PDF" },
        { status: 400 }
      );
    }

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.addPage([595, 842]);

    let y = 800;
    page.drawText("ARKEES AI – Report", { x: 50, y, size: 18, font });

    y -= 40;
    if (prompt) {
      page.drawText(prompt, {
        x: 50,
        y,
        size: 11,
        font,
        maxWidth: 500,
        lineHeight: 14,
      });
    }

    const pdfBytes = await pdfDoc.save();

    // ✅ SUCCESS ONLY
    deductCredits(CREDIT_COST);

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="arkees-ai-report.pdf"',
      },
    });
  } catch (err: any) {
    console.error("PDF API ERROR:", err);
    return NextResponse.json(
      { error: err.message || "PDF generation failed" },
      { status: 500 }
    );
  }
}
