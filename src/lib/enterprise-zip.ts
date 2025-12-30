import JSZip from "jszip";

type FileItem = {
  name: string;
  buffer: Uint8Array | ArrayBuffer;
};

export async function buildEnterpriseZip(
  files: FileItem[],
  meta?: {
    title?: string;
    createdAt?: string;
  }
) {
  const zip = new JSZip();

  // 📁 Add files
  for (const f of files) {
    zip.file(f.name, f.buffer);
  }

  // 📄 Add README
  zip.file(
    "README.txt",
    `ARKEES AI — Enterprise Export

${meta?.title ? `Title: ${meta.title}` : ""}
Created: ${meta?.createdAt || new Date().toISOString()}

Included files:
${files.map((f) => `- ${f.name}`).join("\n")}
`
  );

  // 📦 Generate ZIP
  const zipBuffer = await zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  return zipBuffer;
}
