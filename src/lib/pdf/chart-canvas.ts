import { createCanvas } from "canvas";

type Point = { label: string; value: number };

export function renderLineChartPNG(
  title: string,
  data: Point[]
): Buffer {
  const width = 800;
  const height = 400;
  const padding = 60;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // title
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText(title, padding, 30);

  // axes
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.lineTo(width - padding, padding);
  ctx.stroke();

  // scale
  const maxValue = Math.max(...data.map(d => d.value));
  const stepX = (width - 2 * padding) / (data.length - 1);
  const scaleY = (height - 2 * padding) / maxValue;

  // line
  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 3;
  ctx.beginPath();

  data.forEach((point, i) => {
    const x = padding + i * stepX;
    const y = height - padding - point.value * scaleY;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  return canvas.toBuffer("image/png");
}
