import { PDFDocument, StandardFonts } from "pdf-lib";

export async function generateAnalyticsPDF() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([595, 842]);
  let y = 800;

  page.drawText("ARKEES AI – Analytics Report", {
    x: 50,
    y,
    size: 18,
    font,
  });

  y -= 40;

  const lines = [
    "This is a summary analytics report.",
    "",
    "• Total Credits Used: 120",
    "• Active Users: 15",
    "• Most Used Feature: Dashboard",
    "",
    "Charts will be added in a future update.",
  ];

  for (const line of lines) {
    page.drawText(line, {
      x: 50,
      y,
      size: 11,
      font,
    });
    y -= 18;
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
