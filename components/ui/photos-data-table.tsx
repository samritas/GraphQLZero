"use client";

import { Link2, MoreVertical } from "lucide-react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import type { PhotoRecord } from "@/graphql/queries/photos";
import { albumPreviewPalette } from "@/lib/albums-display";
import {
  PHOTOS_TABLE_CENTER_HEADER_INDICES,
  PHOTOS_TABLE_GRID,
  PHOTOS_TABLE_HEADERS,
} from "@/lib/constants";
import { photoUrlDisplayHost } from "@/lib/photos-display";

export type PhotosDataTableProps = {
  rows: PhotoRecord[];
  totalCount: number | null;
  page: number;
  pageSize: number;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextSize: number) => void;
};

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
        className="grid bg-[#eef2f6] px-5 py-3.5"
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
        const [g0, g1] = albumPreviewPalette(row.id);
        const idLabel = `#${row.id}`;
        const subtitle = row.album?.title?.trim()
          ? `Album · ${row.album.title}`
          : "—";

        return (
          <div
            key={row.id}
            className={`grid items-center px-5 py-4 ${
              idx === rows.length - 1 ? "" : "border-b border-[#f1f5f9]"
            }`}
            style={{ gridTemplateColumns: PHOTOS_TABLE_GRID }}
          >
            <p className="text-sm font-normal text-[#9ca3af]">{idLabel}</p>
            {thumb ? (
              <img
                src={thumb}
                alt=""
                className="h-9 w-9 rounded-md object-cover grayscale"
              />
            ) : (
              <span
                className="h-9 w-9 rounded-md grayscale"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${g0}, ${g1})`,
                }}
                aria-hidden
              />
            )}
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
