import { PDFDocument, StandardFonts } from "pdf-lib";

export async function GET() {
  try {
    const automation = {
      totalRules: 6,
      activeRules: 4,
      pausedRules: 2,
      executionsToday: 42,
      successRate: "92%",
      insights: [
        "Most automations run during peak usage hours.",
        "2 rules are currently paused and can be optimized.",
        "Automation success rate is healthy."
      ]
    };

    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);

    const page = pdf.addPage([595, 842]);
    let y = 780;

    page.drawText("ARKEES AI — Automation Report", {
      x: 50,
      y,
      size: 18,
      font,
    });

    y -= 40;

    const draw = (label: string, value: any) => {
      page.drawText(`${label}: ${value}`, {
        x: 50,
        y,
        size: 12,
        font,
      });
      y -= 20;
    };

    draw("Total Rules", automation.totalRules);
    draw("Active Rules", automation.activeRules);
    draw("Paused Rules", automation.pausedRules);
    draw("Executions Today", automation.executionsToday);
    draw("Success Rate", automation.successRate);

    y -= 20;
    page.drawText("Insights:", { x: 50, y, size: 14, font });
    y -= 20;

    automation.insights.forEach((msg) => {
      page.drawText(`• ${msg}`, {
        x: 60,
        y,
        size: 11,
        font,
      });
      y -= 16;
    });

    const bytes = await pdf.save();

    return new Response(bytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          "attachment; filename=arkees-automation-analytics.pdf",
      },
    });
  } catch {
    return new Response("PDF export failed", { status: 500 });
  }
}
