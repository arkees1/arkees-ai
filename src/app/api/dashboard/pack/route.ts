import { NextResponse } from "next/server"
import JSZip from "jszip"
import { buildDashboardData } from "@/lib/dashboard-export"
import { generateDashboardPDF } from "@/lib/dashboard-pdf-engine"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { success: false, error: "Messages must be an array" },
        { status: 400 }
      )
    }

    // 🔁 Convert messages[] → string (same pattern everywhere)
    const combinedPrompt = messages
      .map((m: any) => `${m.role || "user"}: ${m.content}`)
      .join("\n")

    const dashboardData = buildDashboardData(combinedPrompt)

    const zip = new JSZip()

    // 📄 PDF
    const pdfBytes = await generateDashboardPDF(dashboardData)
    zip.file("dashboard.pdf", pdfBytes)

    // 🖼️ Image placeholder (future engine)
    zip.file("dashboard-image.txt", "Image generation placeholder")

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" })

    return new Response(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition":
          'attachment; filename="arkees-dashboard-pack.zip"',
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
