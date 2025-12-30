import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const HISTORY_FILE = path.join(
  process.cwd(),
  "data",
  "automation-history.json"
);

export async function POST(req: Request) {
  const { userId, runIds } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: "userId missing" },
      { status: 400 }
    );
  }

  if (!fs.existsSync(HISTORY_FILE)) {
    return NextResponse.json(
      { error: "No history found" },
      { status: 404 }
    );
  }

  const allRuns = JSON.parse(
    fs.readFileSync(HISTORY_FILE, "utf-8")
  );

  let runs = allRuns.filter((r: any) => r.userId === userId);

  // ✅ If specific runs requested → export only those
  if (Array.isArray(runIds) && runIds.length > 0) {
    const set = new Set(runIds);
    runs = runs.filter((r: any) => set.has(r.id));
  }

  const header = "id,userId,preset,creditsUsed,createdAt\n";
  const rows = runs
    .map(
      (r: any) =>
        `${r.id},${r.userId},${r.presetKey},${r.creditsUsed},${r.createdAt}`
    )
    .join("\n");

  const csv = header + rows;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="automation-history.csv"',
    },
  });
}
