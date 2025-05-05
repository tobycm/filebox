export function yes(value: string | undefined): boolean {
  return value?.toLowerCase() === "true";
}

export function trimPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, "").replace(/\/{2,}/g, "/");
}

export function joinPath(...parts: string[]) {
  return parts
    .map((p) => p.trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
}
