import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { renderLineChartPNG } from "./chart-canvas";
import { delhiAQISample } from "./chart-sample-data";

export async function generateAnalyticsPDF(
  prompt: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  /* ======================
     PAGE 1 — TEXT CONTENT
  ====================== */
  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();

  let cursorY = height - 60;

  const drawText = (text: string, size = 12, gap = 18) => {
    page.drawText(text, {
      x: 50,
      y: cursorY,
      size,
      font,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
    });
    cursorY -= gap;
  };

  drawText("ARKEES AI – Analytics Report", 18, 30);
  drawText("User Prompt:", 12, 18);
  drawText(prompt, 11, 30);

  drawText("Executive Summary:", 14, 22);
  drawText(
    "This report analyzes long-term air pollution trends using indicative data patterns. The analysis highlights seasonal pollution spikes, long-term AQI degradation, and structural emission drivers impacting public health.",
    11,
    40
  );

  /* ======================
     PAGE 2 — PNG CHART
  ====================== */
  const chartPage = pdfDoc.addPage([595, 842]);

  chartPage.drawText("Analytics Visualization", {
    x: 50,
    y: height - 60,
    size: 16,
    font,
  });

  // 🔥 Render PNG chart
  const chartPNG = renderLineChartPNG(
    "Delhi Average AQI Trend (Last 10 Years)",
    delhiAQISample
  );

  // Embed PNG into PDF
  const chartImage = await pdfDoc.embedPng(chartPNG);

  const chartWidth = 500;
  const chartHeight = (chartImage.height / chartImage.width) * chartWidth;

  chartPage.drawImage(chartImage, {
    x: (width - chartWidth) / 2,
    y: height - chartHeight - 120,
    width: chartWidth,
    height: chartHeight,
  });

  chartPage.drawText(
    "Note: Chart values are indicative and generated for analytical demonstration.",
    {
      x: 50,
      y: 80,
      size: 10,
      font,
      color: rgb(0.4, 0.4, 0.4),
    }
  );

  return pdfDoc.save();
}
