"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({
  labels,
  data,
  title,
}: {
  labels: string[];
  data: number[];
  title: string;
}) {
  return (
    <div className="rounded-xl border p-4 bg-white dark:bg-gray-900">
      <h3 className="font-semibold mb-3">{title}</h3>

      {/* 👇 HEIGHT CONTROL */}
      <div className="h-[260px]">
        <Bar
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
          data={{
            labels,
            datasets: [
              {
                label: title,
                data,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
