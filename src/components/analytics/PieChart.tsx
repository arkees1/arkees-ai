"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({
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
      <Pie
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
  );
}
