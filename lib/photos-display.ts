/** Row preview fallbacks when `thumbnailUrl` / `url` are missing or fail to load. */
export const PHOTO_TABLE_FALLBACK_IMAGES = [
  "/photos-placeholders/placeholder-1.png",
  "/photos-placeholders/placeholder-2.png",
  "/photos-placeholders/placeholder-3.png",
] as const;

function hashPhotoId(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function photoTableFallbackSrc(photoId: string): string {
  const i = hashPhotoId(photoId) % PHOTO_TABLE_FALLBACK_IMAGES.length;
  return PHOTO_TABLE_FALLBACK_IMAGES[i];
}

/** e.g. `1` → `#001`, `5000` → `#5000`. */
export function photoTableIdLabel(photoId: string): string {
  const n = Number.parseInt(String(photoId), 10);
  if (Number.isFinite(n)) {
    return `#${String(n).padStart(3, "0")}`;
  }
  return `#${String(photoId).padStart(3, "0")}`;
}

/** Strip scheme for compact URL column display. */
export function photoUrlDisplayHost(url: string | undefined | null): string {
  if (!url) return "—";
  return url.replace(/^https?:\/\//, "");
}
