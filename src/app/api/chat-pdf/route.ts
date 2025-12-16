import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: { role: string; content: string }[] =
      body?.messages || [];

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 800;
    const fontSize = 12;

    page.drawText("ARKEES AI — Chat Export", {
      x: 50,
      y,
      size: 16,
      font,
    });

    y -= 30;

    for (const msg of messages) {
      const line = `${msg.role.toUpperCase()}: ${msg.content}`;
      const chunks = line.match(/.{1,90}/g) || [];

      for (const chunk of chunks) {
        if (y < 50) {
          y = 800;
        }
        page.drawText(chunk, {
          x: 50,
          y,
          size: fontSize,
          font,
        });
        y -= 16;
      }

      y -= 10;
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="arkees-chat.pdf"',
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Chat PDF failed" },
      { status: 500 }
    );
  }
}
