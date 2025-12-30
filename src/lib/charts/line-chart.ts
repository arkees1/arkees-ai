import { ChartJSNodeCanvas } from "chartjs-node-canvas";

type Point = {
  label: string;
  value: number;
};

const width = 800;
const height = 400;

export function renderLineChartPNG(
  title: string,
  points: Point[]
): Buffer {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const configuration = {
    type: "line" as const,
    data: {
      labels: points.map((p) => p.label),
      datasets: [
        {
          label: title,
          data: points.map((p) => p.value),
          borderColor: "#2563eb", // blue-600
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: title,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return chartJSNodeCanvas.renderToBuffer(configuration);
}
