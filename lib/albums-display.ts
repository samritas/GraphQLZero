import type { GalleryPhotoRecord } from "@/graphql/queries/albums";

/** Local assets used when an album has no preview URLs or the remote image fails to load. */
export const ALBUM_TABLE_PREVIEW_FALLBACKS = [
  "/recent-gallery/placeholder-1.png",
  "/recent-gallery/placeholder-2.png",
  "/recent-gallery/placeholder-3.png",
  "/recent-gallery/placeholder-4.png",
] as const;

export const ALBUMS_OWNER_BADGE_STYLES = [
  { initialsBg: "#dbeafe", initialsColor: "#1d4ed8" },
  { initialsBg: "#e9d5ff", initialsColor: "#6d28d9" },
  { initialsBg: "#cffafe", initialsColor: "#0e7490" },
  { initialsBg: "#ffedd5", initialsColor: "#c2410c" },
] as const;

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function albumPreviewPalette(albumId: string): [string, string] {
  const h = hashString(albumId);
  const h1 = h % 360;
  const h2 = (h * 17) % 360;
  return [`hsl(${h1}, 65%, 42%)`, `hsl(${h2}, 55%, 30%)`];
}

/** Two distinct placeholder paths for stacked preview thumbnails. */
export function albumPreviewFallbackUrls(albumId: string): [string, string] {
  const n = ALBUM_TABLE_PREVIEW_FALLBACKS.length;
  const h = hashString(albumId);
  const i = h % n;
  let j = (Math.imul(h, 3) + 1) % n;
  if (j === i) j = (j + 1) % n;
  return [ALBUM_TABLE_PREVIEW_FALLBACKS[i], ALBUM_TABLE_PREVIEW_FALLBACKS[j]];
}

export function albumPreviewPhotoSrc(p: { thumbnailUrl: string; url: string } | undefined): string {
  if (!p) return "";
  return p.thumbnailUrl?.trim() || p.url?.trim() || "";
}

/** Upper IDs in ~`recentFraction` of the id span (GraphQLZero cohort for “newest” rows). */
export function albumsCohortIdGte(minId: string, maxId: string, recentFraction = 0.12): string | null {
  const lo = Number.parseInt(minId, 10);
  const hi = Number.parseInt(maxId, 10);
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || hi < lo) return null;
  const span = hi - lo + 1;
  const recentN = Math.max(1, Math.ceil(span * recentFraction));
  return String(hi - recentN + 1);
}

/** Percent of whole count in the newest cohort (for “+12%”-style KPI). */
export function cohortSharePercent(recentCount: number | null, totalCount: number | null): number | null {
  if (recentCount == null || totalCount == null || totalCount <= 0) return null;
  return Math.round((recentCount / totalCount) * 100);
}

export function albumOwnerInitialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (parts.length === 1 && parts[0].length === 1) {
    return `${parts[0]}?`.toUpperCase();
  }
  return "?";
}

export function formatAlbumPhotosShort(n: number | null): string {
  if (n == null) return "—";
  if (n >= 1000) {
    const k = n / 1000;
    return `${k >= 10 ? Math.round(k) : Math.round(k * 10) / 10}k`;
  }
  return n.toLocaleString();
}

/** Heuristic fill for the storage card when API has no byte metric. */
export function albumsStoragePercentFromTotals(
  photosTotal: number | null,
  albumsTotal: number | null,
): number {
  if (photosTotal == null || albumsTotal == null || albumsTotal === 0) {
    return 0;
  }
  const avg = photosTotal / albumsTotal;
  return Math.min(100, Math.max(8, Math.round((avg / 60) * 100)));
}

export function galleryPhotoImageSrc(p: GalleryPhotoRecord): string {
  const u = p.thumbnailUrl?.trim() || p.url?.trim() || "";
  return u;
}
