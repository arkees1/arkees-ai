// src/lib/pdf/svg-chart-renderer.ts

type ChartPoint = {
  label: string;
  value: number;
};

export function renderLineChartSVG(
  title: string,
  data: ChartPoint[],
  width = 500,
  height = 220
): string {
  const padding = 40;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));

  const scaleX = (i: number) =>
    padding + (i / (data.length - 1)) * (width - padding * 2);

  const scaleY = (v: number) =>
    height - padding - ((v - minValue) / (maxValue - minValue)) * (height - padding * 2);

  const path = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${scaleX(i)} ${scaleY(d.value)}`)
    .join(" ");

  const points = data
    .map(d => `<circle cx="${scaleX(data.indexOf(d))}" cy="${scaleY(d.value)}" r="3" fill="#2563eb" />`)
    .join("");

  const labels = data
    .map(
      (d, i) =>
        `<text x="${scaleX(i)}" y="${height - 10}" font-size="10" text-anchor="middle">${d.label}</text>`
    )
    .join("");

  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <text x="${width / 2}" y="20" text-anchor="middle" font-size="14" font-weight="bold">
    ${title}
  </text>
  <path d="${path}" fill="none" stroke="#2563eb" stroke-width="2"/>
  ${points}
  ${labels}
</svg>
`;
}
