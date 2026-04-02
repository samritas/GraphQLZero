"use client";

import { Loader2 } from "lucide-react";
import { AlbumsSortFilterIcon } from "@/components/ui/albums-icons";

export type AlbumsToolbarProps = {
  filterOpen: boolean;
  onToggleFilter: () => void;
  isRefetching: boolean;
};

export function AlbumsToolbar({ filterOpen, onToggleFilter, isRefetching }: AlbumsToolbarProps) {
  return (
    <div className="flex shrink-0 flex-col items-end gap-2 sm:pt-0">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-expanded={filterOpen}
          onClick={onToggleFilter}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-[13px] font-semibold text-[#374151] shadow-sm"
        >
          <AlbumsSortFilterIcon className="h-4 w-4 text-[#6b7280]" />
          Sort &amp; Filter
        </button>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#2563eb] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
        >
          <span className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border border-white/90 text-[14px] font-normal leading-none">
            +
          </span>
          Create Album
        </button>
      </div>
      {isRefetching ? (
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#64748b]">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#2563eb]" aria-hidden />
          Refreshing…
        </p>
      ) : null}
    </div>
  );
}
