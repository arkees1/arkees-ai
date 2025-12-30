import { NextResponse } from "next/server";

function escapeCSV(value: string) {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    /**
     * Simple deterministic CSV from prompt.
     * Later: plug real data extraction / AI parsing here.
     */
    const rows = [
      ["Field", "Value"],
      ["Prompt", prompt],
      ["GeneratedBy", "ARKEES AI"],
      ["Timestamp", new Date().toISOString()],
    ];

    const csvContent =
      rows.map((r) => r.map(escapeCSV).join(",")).join("\n") + "\n";

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="arkees-ai.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "CSV generation failed" },
      { status: 500 }
    );
  }
}
