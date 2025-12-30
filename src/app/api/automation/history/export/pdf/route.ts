// app/api/automation/history/export/pdf/route.ts
// Phase-2 Step-4: Export-aware analytics enrichment (SAFE)

import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// NOTE:
// This assumes your history source already exists.
// We enrich the PDF header only — no data mutation.

type AutomationRun = {
  id: string;
  userId: string;
  presetKey: string;
  creditsUsed: number;
  createdAt: string;
};

// 🔧 TEMP history source (replace with your real store if needed)
const runs: AutomationRun[] = [];

export async function POST(req: Request) {
  try {
    const { userId, runIds, fromDate, toDate } =
      (await req.json()) as {
        userId: string;
        runIds: string[];
        fromDate?: string;
        toDate?: string;
      };

    if (!userId || !Array.isArray(runIds)) {
      return NextResponse.json(
        { error: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    const selectedRuns = runs.filter(
      (r) =>
        r.userId === userId &&
        runIds.includes(r.id)
    );

    // ---------- ANALYTICS DERIVATION ----------
    let totalCredits = 0;
    const perDay: Record<string, number> = {};

    for (const r of selectedRuns) {
      totalCredits += r.creditsUsed;
      const day = new Date(r.createdAt).toLocaleDateString();
      perDay[day] = (perDay[day] || 0) + r.creditsUsed;
    }

    const daysCount =
      fromDate && toDate
        ? Math.max(
            1,
            Math.round(
              (new Date(toDate).getTime() -
                new Date(fromDate).getTime()) /
                86400000
            ) + 1
          )
        : 1;

    const avgPerDay = Math.round(
      totalCredits / daysCount
    );

    const peakDay = Object.entries(perDay).sort(
      (a, b) => b[1] - a[1]
    )[0];

    // ---------- PDF GENERATION ----------
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

    const page = pdfDoc.addPage([595, 842]);
    let y = 800;

    const draw = (text: string, size = 11) => {
      page.drawText(text, {
        x: 40,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
      y -= size + 6;
    };

    // ---------- HEADER ----------
    draw("ARKEES AI — Automation Analytics Report", 16);
    y -= 6;

    if (fromDate && toDate) {
      draw(`Date Range: ${fromDate} → ${toDate}`);
    }

    draw(`Generated: ${new Date().toLocaleString()}`);
    y -= 10;

    draw(`Total Credits Used: ${totalCredits}`);
    draw(`Avg Credits / Day: ${avgPerDay}`);
    draw(
      `Peak Usage Day: ${
        peakDay
          ? `${peakDay[0]} (${peakDay[1]})`
          : "—"
      }`
    );

    y -= 14;
    draw("------------------------------------------------");

    // ---------- RUN DETAILS ----------
    for (const r of selectedRuns) {
      if (y < 60) {
        y = 800;
        pdfDoc.addPage([595, 842]);
      }

      draw(
        `${new Date(
          r.createdAt
        ).toLocaleString()} | ${r.presetKey} | -${
          r.creditsUsed
        } credits`,
        10
      );
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          "attachment; filename=arkees-analytics.pdf",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "PDF_EXPORT_FAILED" },
      { status: 500 }
    );
  }
}
