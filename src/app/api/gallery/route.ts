import { NextResponse } from "next/server";
import { getGallery } from "@/lib/gallery-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    const gallery = getGallery();
    return NextResponse.json({ items: gallery });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}
