"use client";

import { ArrowDownUp, ChevronDown, ListFilter } from "lucide-react";
import type { PhotoSortOrder } from "@/graphql/queries/photos";

export type PhotosLibraryToolbarProps = {
  albumId: string;
  onAlbumIdChange: (id: string) => void;
  albums: Array<{ id: string; title: string }>;
  albumsLoading: boolean;
  sortOrder: PhotoSortOrder;
  onSortOrderToggle: () => void;
  advancedOpen: boolean;
  onToggleAdvanced: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export function PhotosLibraryToolbar({
  albumId,
  onAlbumIdChange,
  albums,
  albumsLoading,
  sortOrder,
  onSortOrderToggle,
  advancedOpen,
  onToggleAdvanced,
  searchQuery,
  onSearchChange,
}: PhotosLibraryToolbarProps) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] bg-white px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              className="inline-flex h-10 min-w-[140px] cursor-pointer appearance-none rounded-lg border border-[#d1d5db] bg-white py-2 pl-4 pr-10 text-sm font-medium text-[#374151]"
              value={albumId}
              onChange={(e) => onAlbumIdChange(e.target.value)}
              disabled={albumsLoading && albums.length === 0}
              aria-label="Filter by album"
            >
              <option value="">All Albums</option>
              {albums.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title || `Album ${a.id}`}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]"
              strokeWidth={2}
              aria-hidden
            />
          </div>
          <button
            type="button"
            className="inline-flex h-10 min-w-[128px] items-center justify-between rounded-lg border border-[#d1d5db] bg-white px-4 text-sm font-medium text-[#374151]"
            onClick={onSortOrderToggle}
            aria-label={`Sort by ID, ${sortOrder === "ASC" ? "ascending" : "descending"}`}
          >
            Sort by ID
            <ArrowDownUp className="h-3.5 w-3.5 text-[#6b7280]" strokeWidth={2} />
          </button>
        </div>
        <button
          type="button"
          className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b] ${advancedOpen ? "text-[#0b57d0]" : ""}`}
          onClick={onToggleAdvanced}
          aria-expanded={advancedOpen}
        >
          <ListFilter className="h-3.5 w-3.5" strokeWidth={2} />
          Advanced Filters
        </button>
      </div>

      {advancedOpen ? (
        <div className="border-b border-[#f1f5f9] bg-[#fafbfc] px-5 py-3">
          <label htmlFor="photos-title-search" className="sr-only">
            Search photos by title
          </label>
          <input
            id="photos-title-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search titles…"
            className="w-full max-w-md rounded-lg border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#374151] placeholder:text-[#9ca3af] focus:border-[#93c5fd] focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20"
          />
        </div>
      ) : null}
    </>
  );
}
