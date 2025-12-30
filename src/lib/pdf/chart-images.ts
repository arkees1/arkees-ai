import { ChartJSNodeCanvas } from "chartjs-node-canvas";

/* ======================================================
   CONFIG
====================================================== */
const WIDTH = 800;
const HEIGHT = 400;
const BACKGROUND = "white";

/* ======================================================
   COMMON CANVAS FACTORY
====================================================== */
function createCanvas() {
  return new ChartJSNodeCanvas({
    width: WIDTH,
    height: HEIGHT,
    backgroundColour: BACKGROUND,
  });
}

/* ======================================================
   BAR CHART
====================================================== */
export async function generateBarChartImage({
  title,
  labels,
  data,
}: {
  title: string;
  labels: string[];
  data: number[];
}): Promise<Buffer> {
  const canvas = createCanvas();

  return await canvas.renderToBuffer({
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: "#2563eb",
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
  });
}

/* ======================================================
   LINE CHART
====================================================== */
export async function generateLineChartImage({
  title,
  labels,
  data,
}: {
  title: string;
  labels: string[];
  data: number[];
}): Promise<Buffer> {
  const canvas = createCanvas();

  return await canvas.renderToBuffer({
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: title,
          data,
          borderColor: "#16a34a",
          backgroundColor: "rgba(22,163,74,0.2)",
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
  });
}

/* ======================================================
   PIE CHART
====================================================== */
export async function generatePieChartImage({
  title,
  labels,
  data,
}: {
  title: string;
  labels: string[];
  data: number[];
}): Promise<Buffer> {
  const canvas = createCanvas();

  return await canvas.renderToBuffer({
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#2563eb",
            "#16a34a",
            "#f59e0b",
            "#dc2626",
            "#7c3aed",
          ],
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });
}
