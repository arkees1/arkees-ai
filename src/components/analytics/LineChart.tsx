"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function LineChart({
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
      <Line
        data={{
          labels,
          datasets: [
            {
              label: title,
              data,
              tension: 0.3,
            },
          ],
        }}
      />
    </div>
  );
}
