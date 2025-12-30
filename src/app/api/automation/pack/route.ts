import { NextResponse } from "next/server";
import JSZip from "jszip";
import { PDFDocument, StandardFonts } from "pdf-lib";

/* ---------------- BUILD AUTOMATION DATA ---------------- */
function buildAutomationData(messages: any[]) {
  return {
    trigger: "New user message received",
    conditions: [
      "Message length > 20",
      "Contains business keyword",
    ],
    actions: [
      "Classify intent",
      "Store in database",
      "Generate summary",
      "Send notification",
    ],
    tools: ["LLM", "Database", "Email / Webhook"],
  };
}

/* ---------------- IMAGE (BLUEPRINT MOCK) ---------------- */
async function generateBlueprint(data: any): Promise<Buffer> {
  const blueprint = `
ARKEES AI — AUTOMATION BLUEPRINT

Trigger:
- ${data.trigger}

Conditions:
- ${data.conditions.join("\n- ")}

Actions:
- ${data.actions.join("\n- ")}

Tools:
- ${data.tools.join(", ")}
`;
  return Buffer.from(blueprint);
}

/* ---------------- PDF EXPLAINER ---------------- */
async function generatePDF(data: any): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const page = pdf.addPage([595, 842]);

  page.drawText("ARKEES AI — Automation Blueprint", {
    x: 50,
    y: 780,
    size: 22,
    font,
  });

  const sections = [
    `Trigger: ${data.trigger}`,
    `Conditions:\n- ${data.conditions.join("\n- ")}`,
    `Actions:\n- ${data.actions.join("\n- ")}`,
    `Tools: ${data.tools.join(", ")}`,
  ];

  sections.forEach((text, i) => {
    page.drawText(text, {
      x: 50,
      y: 720 - i * 120,
      size: 14,
      font,
    });
  });

  return await pdf.save();
}

/* ---------------- MAIN PACK ---------------- */
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages" },
        { status: 400 }
      );
    }

    const data = buildAutomationData(messages);
    const zip = new JSZip();

    zip.file(
      "automation-blueprint.png",
      await generateBlueprint(data)
    );

    zip.file(
      "automation-explainer.pdf",
      await generatePDF(data)
    );

    zip.file(
      "automation-steps.txt",
      `
1. Trigger activates on new message
2. Conditions evaluated
3. AI classifies intent
4. Data stored
5. Notification sent
      `.trim()
    );

    zip.file(
      "automation-input-data.json",
      JSON.stringify(data, null, 2)
    );

    const zipBuffer = await zip.generateAsync({
      type: "nodebuffer",
    });

    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition":
          "attachment; filename=arkees-automation-pack.zip",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Automation pack generation failed" },
      { status: 500 }
    );
  }
}
