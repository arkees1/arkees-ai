import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text: string =
      body?.content ||
      "ARKEES AI\n\nThis is your generated PDF.\n\nNo errors. No drama.";

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const fontSize = 12;
    let y = 800;

    const lines = text.split("\n");
    for (const line of lines) {
      page.drawText(line, {
        x: 50,
        y,
        size: fontSize,
        font,
      });
      y -= 18;
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="arkees-ai.pdf"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
}
