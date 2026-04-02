import { ImageIcon } from "lucide-react";
import {
  albumsStoragePercentFromTotals,
  formatAlbumPhotosShort,
} from "@/lib/albums-display";

export type PhotosTopStatsProps = {
  statsLoading: boolean;
  totalPhotos: number | null;
  totalAlbums: number | null;
};

export function PhotosTopStats({ statsLoading, totalPhotos, totalAlbums }: PhotosTopStatsProps) {
  const storagePct = albumsStoragePercentFromTotals(totalPhotos, totalAlbums);
  const photosLabel =
    statsLoading && totalPhotos == null
      ? "…"
      : totalPhotos != null
        ? totalPhotos.toLocaleString()
        : "—";
  const albumsLabel =
    statsLoading && totalAlbums == null
      ? "…"
      : totalAlbums != null
        ? totalAlbums.toLocaleString()
        : "—";
  const storageUsedLabel =
    statsLoading && totalPhotos == null
      ? "…"
      : totalPhotos != null
        ? formatAlbumPhotosShort(totalPhotos)
        : "—";
  const cdnLabel =
    statsLoading && (totalPhotos == null || totalAlbums == null)
      ? "…"
      : `${storagePct}%`;

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_2.1fr]">
      <article className="min-h-[138px] rounded-lg border border-[#e5e7eb] bg-white px-5 py-5">
        <div className="flex items-start justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[#2563eb]">
            <ImageIcon className="h-4 w-4" strokeWidth={1.9} />
          </span>
          <span className="rounded bg-[#eafaf2] px-2 py-0.5 text-[11px] font-semibold text-[#0f9f63]">
            +12%
          </span>
        </div>
        <p className="mt-5 text-[30px] font-bold leading-none tracking-tight text-[#1f2937]">
          {photosLabel}
        </p>
        <p className="mt-1 text-sm text-[#6b7280]">Total Assets Indexed</p>
      </article>

      <article className="flex min-h-[138px] items-center rounded-lg border border-[#e5e7eb] bg-[#eef2f6] px-5 py-5">
        <div className="grid w-full grid-cols-4 items-center divide-x divide-[#e5e7eb]">
          <div className="pr-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
              Active Albums
            </p>
            <p className="mt-1 text-[30px] font-bold leading-none text-[#1f2937]">{albumsLabel}</p>
          </div>
          <div className="px-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
              Storage Used
            </p>
            <p className="mt-1 text-[30px] font-bold leading-none text-[#1f2937]">
              {storageUsedLabel}
            </p>
          </div>
          <div className="px-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
              CDN Hits
            </p>
            <p className="mt-1 text-[30px] font-bold leading-none text-[#1f2937]">{cdnLabel}</p>
          </div>
          <div className="flex items-center justify-end pl-4">
            <div className="flex -space-x-2">
              {["#f2c6ae", "#f3d4be", "#c58c55"].map((c) => (
                <span
                  key={c}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f8fafc]"
                  style={{ backgroundColor: c }}
                />
              ))}
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f8fafc] bg-[#cbd5e1] text-[11px] font-semibold text-[#475569]">
                +4
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
