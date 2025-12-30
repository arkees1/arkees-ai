"use client";

// Lightweight analytics chart (no external libs)
// Phase-2: Visual analytics, read-only, zero risk

type UsagePoint = {
  date: string;   // YYYY-MM-DD
  credits: number;
};

export default function UsageChart({
  title,
  data,
}: {
  title: string;
  data: UsagePoint[];
}) {
  if (!data || data.length === 0) {
    return (
      <div className="border rounded p-4 text-sm text-gray-500">
        {title} — No data
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.credits), 1);

  return (
    <div className="border rounded p-4">
      <div className="text-sm font-medium mb-3">
        {title}
      </div>

      <div className="flex items-end gap-2 h-32">
        {data.map((d) => {
          const height = Math.round(
            (d.credits / max) * 100
          );

          return (
            <div
              key={d.date}
              className="flex flex-col items-center flex-1"
            >
              <div
                className="w-full rounded bg-blue-600"
                style={{ height: `${height}%` }}
                title={`${d.date}: ${d.credits}`}
              />
              <div className="text-[10px] mt-1 opacity-60">
                {d.date.slice(5)} {/* MM-DD */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
