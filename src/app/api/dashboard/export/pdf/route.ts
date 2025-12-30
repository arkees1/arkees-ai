import { NextResponse } from "next/server"
import { generateDashboardPDF } from "@/lib/dashboard-pdf-engine"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { dashboardData } = body

    if (!dashboardData) {
      return NextResponse.json(
        { success: false, error: "Dashboard data missing" },
        { status: 400 }
      )
    }

    const pdfBytes = await generateDashboardPDF(dashboardData)

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="arkees-dashboard.pdf"',
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
