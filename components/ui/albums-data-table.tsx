"use client";

import { Fragment } from "react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { AlbumPreview } from "@/components/ui/album-preview";
import { AlbumsCollectionIcon } from "@/components/ui/albums-icons";
import type { AlbumRecord } from "@/graphql/queries/albums";
import { ALBUMS_TABLE_GRID, ALBUMS_TABLE_HEADERS } from "@/lib/constants";
import {
  ALBUMS_OWNER_BADGE_STYLES,
  albumOwnerInitialsFromName,
} from "@/lib/albums-display";

function albumPhotosMetaLine(row: AlbumRecord): string {
  return row.photos?.meta?.totalCount != null
    ? `${row.photos.meta.totalCount} photos in collection`
    : "Photos loading…";
}

export type AlbumsDataTableProps = {
  rows: AlbumRecord[];
  totalCount: number | null;
  page: number;
  pageSize: number;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextSize: number) => void;
};

export function AlbumsDataTable({
  rows,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: AlbumsDataTableProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#dbe3ee] bg-[#eef2f6] shadow-sm">
      <div
        className="hidden bg-[#F0F4F780] px-8 py-4 md:grid md:px-6"
        style={{ gridTemplateColumns: ALBUMS_TABLE_GRID }}
      >
        {ALBUMS_TABLE_HEADERS.map((header) => (
          <p
            key={header}
            className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]"
          >
            {header}
          </p>
        ))}
      </div>

      <div className="border-b border-[#e2e8f0] bg-[#F0F4F780] px-4 py-3 md:hidden">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
          Albums
        </p>
      </div>

      {rows.map((row, index) => {
        const idLabel = `#${String(row.id).padStart(3, "0")}`;
        const ownerName = row.user?.name?.trim() || "—";
        const badge = ALBUMS_OWNER_BADGE_STYLES[index % ALBUMS_OWNER_BADGE_STYLES.length];
        const qty =
          row.photos?.meta?.totalCount != null ? String(row.photos.meta.totalCount) : "0";
        const metaLine = albumPhotosMetaLine(row);
        const isLast = index === rows.length - 1;

        return (
          <Fragment key={row.id}>
            <div
              className={`hidden items-center bg-white px-8 py-5 md:grid md:px-6 ${
                isLast ? "" : "border-b border-[#e2e8f0]"
              }`}
              style={{ gridTemplateColumns: ALBUMS_TABLE_GRID }}
            >
              <p className="text-xs font-semibold text-[#64748b]">{idLabel}</p>
              <AlbumPreview albumId={row.id} photos={row.photos?.data ?? []} />
              <div className="pr-4">
                <p className="text-[15px] font-bold leading-[1.2] tracking-tight text-[#1f2937]">
                  {row.title || "Untitled"}
                </p>
                <p className="mt-1 text-[13px] text-[#6b7280]">{metaLine}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{
                    backgroundColor: badge.initialsBg,
                    color: badge.initialsColor,
                  }}
                >
                  {albumOwnerInitialsFromName(ownerName)}
                </span>
                <p className="min-w-0 text-sm font-semibold leading-tight text-[#1f2937]">
                  {ownerName}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#dbeafe] px-2.5 py-1 text-xs font-semibold text-[#1d4ed8]">
                <AlbumsCollectionIcon className="h-3.5 w-3.5" />
                {qty}
              </span>
              <button
                type="button"
                className="text-center text-lg font-bold text-[#94a3b8]"
                aria-label="More actions"
              >
                ⋮
              </button>
            </div>

            <article
              className={`bg-white px-4 py-4 md:hidden ${
                isLast ? "" : "border-b border-[#e2e8f0]"
              }`}
            >
              <div className="flex gap-3">
                <AlbumPreview albumId={row.id} photos={row.photos?.data ?? []} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-semibold text-[#64748b]">{idLabel}</p>
                    <button
                      type="button"
                      className="-mr-1 -mt-1 shrink-0 rounded-lg p-2 text-lg font-bold leading-none text-[#94a3b8] hover:bg-slate-100"
                      aria-label="More actions"
                    >
                      ⋮
                    </button>
                  </div>
                  <p className="mt-1 text-[15px] font-bold leading-snug tracking-tight text-[#1f2937]">
                    {row.title || "Untitled"}
                  </p>
                  <p className="mt-1 text-[13px] text-[#6b7280]">{metaLine}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 gap-y-2">
                    <div className="flex min-w-0 max-w-full items-center gap-2">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                        style={{
                          backgroundColor: badge.initialsBg,
                          color: badge.initialsColor,
                        }}
                      >
                        {albumOwnerInitialsFromName(ownerName)}
                      </span>
                      <p className="min-w-0 truncate text-sm font-semibold text-[#1f2937]">
                        {ownerName}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#dbeafe] px-2.5 py-1 text-xs font-semibold text-[#1d4ed8]">
                      <AlbumsCollectionIcon className="h-3.5 w-3.5 shrink-0" />
                      {qty}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Fragment>
        );
      })}

      <DataTablePagination
        page={page}
        pageSize={pageSize}
        rowCount={rows.length}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
