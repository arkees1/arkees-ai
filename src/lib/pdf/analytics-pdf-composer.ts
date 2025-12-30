import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { renderLineChartPNG } from "@/lib/charts/line-chart";

export async function generateAnalyticsPDF(title: string) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([595, 842]);
  let y = 800;

  page.drawText(title || "Analytics Report", {
    x: 50,
    y,
    size: 18,
    font,
    color: rgb(0, 0, 0),
  });

  y -= 40;

  // sample data — safe placeholder
  const data = [
    { label: "2016", value: 220 },
    { label: "2017", value: 210 },
    { label: "2018", value: 230 },
    { label: "2019", value: 240 },
    { label: "2020", value: 260 },
  ];

  const chartPNG = await renderLineChartPNG(
    "Sample AQI Trend",
    data
  );

  const pngImage = await pdfDoc.embedPng(chartPNG);

  page.drawImage(pngImage, {
    x: 50,
    y: y - 300,
    width: 500,
    height: 250,
  });

  return await pdfDoc.save();
}
