export function normalizeFileName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/[^a-z0-9.-]/g, "") // remove funky stuff
    .slice(0, 175); // max length
}
