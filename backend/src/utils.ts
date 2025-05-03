export function yes(value: string | undefined): boolean {
  return value?.toLowerCase() === "true";
}
