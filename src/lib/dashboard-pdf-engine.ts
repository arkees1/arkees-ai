import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

export async function generateDashboardPDF(
  dashboardData: any
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const { height } = page.getSize()

  page.drawText("ARKEES AI – Dashboard Report", {
    x: 50,
    y: height - 50,
    size: 18,
    font,
    color: rgb(0, 0, 0),
  })

  page.drawText(JSON.stringify(dashboardData, null, 2), {
    x: 50,
    y: height - 100,
    size: 10,
    font,
    color: rgb(0, 0, 0),
    maxWidth: 500,
  })

  return await pdfDoc.save()
}
