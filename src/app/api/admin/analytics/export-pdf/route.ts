import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const startDate = searchParams.get("startDate") || "N/A";
    const endDate = searchParams.get("endDate") || "N/A";

    // 1️⃣ Create PDF
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // A4 size
    const page = pdfDoc.addPage([595, 842]);
    const { height } = page.getSize();

    let y = height - 60;

    // 2️⃣ Title
    page.drawText("ARKEES AI — Analytics Report", {
      x: 50,
      y,
      size: 20,
      font,
      color: rgb(0, 0, 0),
    });

    y -= 40;

    // 3️⃣ Date Range
    page.drawText(`Start Date: ${startDate}`, {
      x: 50,
      y,
      size: 12,
      font,
    });

    y -= 18;

    page.drawText(`End Date: ${endDate}`, {
      x: 50,
      y,
      size: 12,
      font,
    });

    y -= 40;

    // 4️⃣ Section Header
    page.drawText("Key Metrics", {
      x: 50,
      y,
      size: 16,
      font,
    });

    y -= 25;

    // 5️⃣ Static metrics (safe baseline)
    const metrics = [
      "Total Users: 120",
      "Active Users: 28",
      "Credits Used: 340",
      "Credits Remaining: 860",
    ];

    for (const line of metrics) {
      page.drawText(line, {
        x: 70,
        y,
        size: 12,
        font,
      });
      y -= 18;
    }

    // 6️⃣ Save PDF
    const pdfBytes = await pdfDoc.save();

    // 7️⃣ Return as downloadable file
    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="arkees-analytics-report.pdf"',
        "Content-Length": pdfBytes.length.toString(),
      },
    });
  } catch (err: any) {
    console.error("❌ PDF EXPORT ERROR:", err);

    return new Response("PDF generation failed", { status: 500 });
  }
}
