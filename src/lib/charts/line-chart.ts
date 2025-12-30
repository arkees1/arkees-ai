import { ChartJSNodeCanvas } from "chartjs-node-canvas";

export type Point = {
  label: string;
  value: number;
};

const width = 800;
const height = 400;

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour: "white",
});

export async function renderLineChartPNG(
  title: string,
  data: Point[]
): Promise<Buffer> {
  const configuration = {
    type: "line",
    data: {
      labels: data.map((d) => d.label),
      datasets: [
        {
          label: title,
          data: data.map((d) => d.value),
          borderColor: "rgb(37, 99, 235)",
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  // ✅ IMPORTANT FIX
  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  return buffer;
}
