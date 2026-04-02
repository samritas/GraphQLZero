"use client";

import { Grid2x2, List, Loader2, Upload } from "lucide-react";

export type PhotosLibraryHeaderProps = {
  isRefetching: boolean;
};

export function PhotosLibraryHeader({ isRefetching }: PhotosLibraryHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6b7280]">
          Dashboard <span className="mx-1">›</span> Photos
        </p>
        <h1 className="font-title mt-2 text-[30px] font-bold leading-tight tracking-tight text-[#2A3439]">
          Image Library
        </h1>
        <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-[#64748b]">
          Manage your application&apos;s visual assets across all albums. Filter by ID or album to
          optimize data retrieval.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        {isRefetching ? (
          <p className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-[#64748b]">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0b57d0]" aria-hidden />
            Refreshing…
          </p>
        ) : null}
        <div className="flex items-center gap-1 rounded-md bg-[#f1f5f9] p-1">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded bg-white text-[#0b57d0] shadow-sm"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded text-[#64748b]"
          >
            <Grid2x2 className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-[#0b57d0] px-6 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(11,87,208,0.28)]"
        >
          <Upload className="h-3.5 w-3.5" />
          Upload Photo
        </button>
      </div>
    </div>
  );
}
