import { PDFDocument, StandardFonts } from "pdf-lib";
import { renderLineChartPNG } from "@/lib/charts/line-chart";

// 🔹 Chart expects this
type Point = {
  label: string;
  value: number;
};

// 🔹 Your AQI data
type AQIDataPoint = {
  year: number;
  aqi: number;
};

// 🔹 Sample AQI data
const delhiAQISample: AQIDataPoint[] = [
  { year: 2014, aqi: 210 },
  { year: 2015, aqi: 225 },
  { year: 2016, aqi: 235 },
  { year: 2017, aqi: 240 },
  { year: 2018, aqi: 250 },
  { year: 2019, aqi: 255 },
  { year: 2020, aqi: 230 },
  { year: 2021, aqi: 220 },
  { year: 2022, aqi: 235 },
  { year: 2023, aqi: 245 },
];

// 🔹 ADAPTER (THIS WAS MISSING)
const aqiToChartPoints = (data: AQIDataPoint[]): Point[] => {
  return data.map((d) => ({
    label: d.year.toString(),
    value: d.aqi,
  }));
};

export async function generateAnalyticsPDF() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([595, 842]);
  let y = 800;

  page.drawText("ARKEES AI – Air Quality Analytics", {
    x: 50,
    y,
    size: 18,
    font,
  });

  y -= 40;

  // ✅ FIXED: Correct type passed
  const chartPNG = renderLineChartPNG(
    "Delhi Average AQI Trend (Last 10 Years)",
    aqiToChartPoints(delhiAQISample)
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
