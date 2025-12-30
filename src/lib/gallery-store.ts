import fs from "fs";
import path from "path";

export type GalleryItem = {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "gallery.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }
}

export function getGallery(): GalleryItem[] {
  ensureFile();
  const raw = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(raw);
}

export function addToGallery(item: GalleryItem) {
  const gallery = getGallery();
  gallery.unshift(item); // latest first
  fs.writeFileSync(FILE_PATH, JSON.stringify(gallery, null, 2));
}
