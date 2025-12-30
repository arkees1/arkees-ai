import { NextResponse } from "next/server"
import PptxGenJS from "pptxgenjs"
import { deductCredits } from "@/lib/userCredits"
import { logUsage } from "@/lib/usageHistory"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, slides } = body

    if (!userId || !Array.isArray(slides)) {
      return NextResponse.json(
        { success: false, error: "Invalid request" },
        { status: 400 }
      )
    }

    // 🔻 Credits
    await deductCredits(userId, 1)

    // 🧾 Usage log
    await logUsage(userId, "ppt")

    const pptx = new PptxGenJS()

    slides.forEach((slideContent: string) => {
      const slide = pptx.addSlide()
      slide.addText(slideContent, {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 4,
        fontSize: 18,
      })
    })

    // ✅ CORRECT write() API
    const pptBuffer = await pptx.write({ outputType: "nodebuffer" })

    return new NextResponse(pptBuffer as Buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": 'attachment; filename="arkees-workflow.pptx"',
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
