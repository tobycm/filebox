export function normalizeFileName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/[^a-z0-9.-]/g, "") // remove funky stuff
    .slice(0, 175); // max length
}

export function promisesProgress<T>(promises: Promise<T>[], onProgress?: (progress: number) => void): Promise<T>[] {
  let completed = 0;

  promises.forEach((promise) => {
    promise
      .then(() => {
        completed += 1;
        onProgress?.(completed);
      })
      .catch(() => {
        completed += 1;
        onProgress?.(completed);
      });
  });

  return promises;
}
