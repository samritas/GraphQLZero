/** Strip scheme for compact URL column display. */
export function photoUrlDisplayHost(url: string | undefined | null): string {
  if (!url) return "—";
  return url.replace(/^https?:\/\//, "");
}
