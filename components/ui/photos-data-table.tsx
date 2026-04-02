"use client";

import { Link2, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import type { PhotoRecord } from "@/graphql/queries/photos";
import {
  PHOTOS_TABLE_CENTER_HEADER_INDICES,
  PHOTOS_TABLE_GRID,
  PHOTOS_TABLE_HEADERS,
} from "@/lib/constants";
import {
  photoTableFallbackSrc,
  photoTableIdLabel,
  photoUrlDisplayHost,
} from "@/lib/photos-display";

function PhotoTableThumbnail({ photoId, src }: { photoId: string; src: string }) {
  const [remoteFailed, setRemoteFailed] = useState(false);
  const [localFailed, setLocalFailed] = useState(false);
  const fallbackSrc = photoTableFallbackSrc(photoId);
  const remote = src.trim();
  const showRemote = Boolean(remote) && !remoteFailed;
  const showLocal = !showRemote && !localFailed;

  useEffect(() => {
    setRemoteFailed(false);
    setLocalFailed(false);
  }, [src, photoId]);

  return (
    <span className="relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-md bg-[#e5e7eb]">
      {showRemote ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote CDN URLs; onError fallback
        <img
          src={remote}
          alt=""
          className="h-9 w-9 object-cover grayscale"
          onError={() => setRemoteFailed(true)}
        />
      ) : null}
      {showLocal ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackSrc}
          alt=""
          className="h-9 w-9 object-cover grayscale"
          onError={() => setLocalFailed(true)}
        />
      ) : null}
      {!showRemote && !showLocal ? (
        <span className="block h-9 w-9 bg-gradient-to-br from-slate-300 to-slate-500" aria-hidden />
      ) : null}
    </span>
  );
}

export type PhotosDataTableProps = {
  rows: PhotoRecord[];
  totalCount: number | null;
  page: number;
  pageSize: number;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextSize: number) => void;
};

function PhotoRowMobile({
  row,
  isLast,
}: {
  row: PhotoRecord;
  isLast: boolean;
}) {
  const thumb = row.thumbnailUrl?.trim() || row.url?.trim() || "";
  const idLabel = photoTableIdLabel(String(row.id));
  const subtitle = row.album?.title?.trim()
    ? `Album · ${row.album.title}`
    : "—";

  return (
    <div
      className={`px-4 py-4 md:hidden ${isLast ? "" : "border-b border-[#f1f5f9]"}`}
    >
      <div className="flex gap-3">
        <PhotoTableThumbnail photoId={String(row.id)} src={thumb} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold leading-snug text-[#111827]">
              {row.title || "Untitled"}
            </p>
            <button
              type="button"
              className="shrink-0 text-[#94a3b8] hover:text-[#64748b]"
              aria-label="Row actions"
            >
              <MoreVertical className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
          <p className="mt-0.5 text-xs leading-snug text-[#6b7280]">{subtitle}</p>
          <p className="mt-2 text-xs font-medium text-[#9ca3af]">ID · {idLabel}</p>
          <a
            href={row.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-w-0 items-center gap-1.5 text-sm font-medium text-[#2563eb] hover:underline"
          >
            <Link2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            <span className="min-w-0 truncate">{photoUrlDisplayHost(row.url)}</span>
          </a>
          <div className="mt-3">
            <span className="inline-flex rounded-full bg-[#e5e7eb] px-3 py-1 text-[11px] font-bold text-[#4b5563]">
              Album ID · {row.album?.id ?? "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhotosDataTable({
  rows,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PhotosDataTableProps) {
  const centerSet = new Set<number>(PHOTOS_TABLE_CENTER_HEADER_INDICES);

  return (
    <>
      <div
        className="hidden bg-[#eef2f6] px-5 py-3.5 md:grid"
        style={{ gridTemplateColumns: PHOTOS_TABLE_GRID }}
      >
        {PHOTOS_TABLE_HEADERS.map((h, i) => (
          <p
            key={`${h}-${i}`}
            className={`text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748b] ${centerSet.has(i) ? "text-center" : ""}`}
          >
            {h}
          </p>
        ))}
      </div>

      {rows.map((row, idx) => {
        const thumb = row.thumbnailUrl?.trim() || row.url?.trim() || "";
        const idLabel = photoTableIdLabel(String(row.id));
        const subtitle = row.album?.title?.trim()
          ? `Album · ${row.album.title}`
          : "—";

        return (
          <div key={row.id}>
            <PhotoRowMobile row={row} isLast={idx === rows.length - 1} />
            <div
              className={`hidden items-center px-5 py-4 md:grid ${
                idx === rows.length - 1 ? "" : "border-b border-[#f1f5f9]"
              }`}
              style={{ gridTemplateColumns: PHOTOS_TABLE_GRID }}
            >
              <p className="text-sm font-normal text-[#9ca3af]">{idLabel}</p>
              <PhotoTableThumbnail photoId={String(row.id)} src={thumb} />
              <div className="min-w-0 pr-2">
                <p className="text-sm font-bold leading-snug text-[#111827]">
                  {row.title || "Untitled"}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-[#6b7280]">{subtitle}</p>
              </div>
              <a
                href={row.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-0 items-center gap-1.5 truncate text-sm font-medium text-[#2563eb] hover:underline"
              >
                <Link2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                <span className="truncate">{photoUrlDisplayHost(row.url)}</span>
              </a>
              <div className="flex justify-center">
                <span className="inline-flex rounded-full bg-[#e5e7eb] px-3 py-1 text-[11px] font-bold text-[#4b5563]">
                  {row.album?.id ?? "—"}
                </span>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-[#94a3b8] hover:text-[#64748b]"
                  aria-label="Row actions"
                >
                  <MoreVertical className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="border-t border-[#f1f5f9]">
        <DataTablePagination
          page={page}
          pageSize={pageSize}
          rowCount={rows.length}
          totalCount={totalCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </>
  );
}
