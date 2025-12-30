// app/api/analytics/pdf/route.ts

import { NextResponse } from "next/server";
import { generateAnalyticsPdf } from "@/lib/pdf/analytics-pdf-composer";
import { SAMPLE_ANALYTICS_PDF_DATA } from "@/lib/contracts/sample-analytics-pdf.payload";

export const runtime = "nodejs";

export async function GET() {
  const pdfBytes = await generateAnalyticsPdf(SAMPLE_ANALYTICS_PDF_DATA);

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=analytics-report.pdf",
    },
  });
}
