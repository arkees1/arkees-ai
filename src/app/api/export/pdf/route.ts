import { NextResponse } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { deductCredits } from "@/lib/userCredits"
import { logUsage } from "@/lib/usageHistory"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, content } = body

    if (!userId || !content) {
      return NextResponse.json(
        { success: false, error: "Invalid request" },
        { status: 400 }
      )
    }

    // 🔻 Credit check
    await deductCredits(userId, 1)

    // 🧾 Usage log (ONLY 2 ARGS)
    await logUsage(userId, "pdf")

    // 📄 Build PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842])
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const { height } = page.getSize()

    page.drawText("ARKEES AI PDF Export", {
      x: 50,
      y: height - 50,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    })

    page.drawText(content, {
      x: 50,
      y: height - 100,
      size: 12,
      font,
      color: rgb(0, 0, 0),
      maxWidth: 500,
    })

    const pdfBytes = await pdfDoc.save()

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="arkees-export.pdf"',
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
