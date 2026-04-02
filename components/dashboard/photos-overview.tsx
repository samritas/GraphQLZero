"use client";

import { useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DataTablePaginationSkeleton,
  DataTableSkeleton,
  TableEmptyState,
} from "@/components/ui/data-table-states";
import { PhotosApiTip } from "@/components/ui/photos-api-tip";
import { PhotosCollaboratorsFab } from "@/components/ui/photos-collaborators-fab";
import { PhotosDataTable } from "@/components/ui/photos-data-table";
import { PhotosLibraryHeader } from "@/components/ui/photos-library-header";
import { PhotosLibraryToolbar } from "@/components/ui/photos-library-toolbar";
import { PhotosTopStats } from "@/components/ui/photos-top-stats";
import { QueryErrorPanel } from "@/components/ui/query-error-panel";
import { GET_ALBUMS, type AlbumsQueryResult } from "@/graphql/queries/albums";
import {
  GET_ALBUM_PHOTOS,
  GET_PHOTOS,
  GET_PHOTOS_OVERVIEW_STATS,
  buildPhotoQueryOptions,
  type AlbumPhotosQueryResult,
  type PhotoSortOrder,
  type PhotosOverviewStatsQueryResult,
  type PhotosQueryResult,
} from "@/graphql/queries/photos";
import {
  PHOTOS_ALBUM_FILTER_OPTIONS,
  PHOTOS_DEFAULT_PAGE_SIZE,
  PHOTOS_SEARCH_DEBOUNCE_MS,
  PHOTOS_TABLE_CENTER_HEADER_INDICES,
  PHOTOS_TABLE_GRID,
  PHOTOS_TABLE_HEADERS,
} from "@/lib/constants";
import { getErrorMessage } from "@/lib/get-error-message";

export function PhotosOverview() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PHOTOS_DEFAULT_PAGE_SIZE);
  const [albumId, setAlbumId] = useState("");
  const [sortOrder, setSortOrder] = useState<PhotoSortOrder>("ASC");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const lastTotalCountRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setTimeout(
      () => setDebouncedSearch(searchInput.trim()),
      PHOTOS_SEARCH_DEBOUNCE_MS,
    );
    return () => window.clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
    lastTotalCountRef.current = null;
  }, [debouncedSearch, albumId, sortOrder]);

  const photoOptions = useMemo(
    () => buildPhotoQueryOptions(debouncedSearch, page, pageSize, sortOrder),
    [debouncedSearch, page, pageSize, sortOrder],
  );

  const { data: albumsFilterData, loading: albumsFilterLoading } = useQuery<AlbumsQueryResult>(
    GET_ALBUMS,
    { variables: { options: PHOTOS_ALBUM_FILTER_OPTIONS } },
  );

  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery<PhotosOverviewStatsQueryResult>(GET_PHOTOS_OVERVIEW_STATS, {
    notifyOnNetworkStatusChange: true,
  });

  const rootPhotosQuery = useQuery<PhotosQueryResult>(GET_PHOTOS, {
    variables: { options: photoOptions },
    notifyOnNetworkStatusChange: true,
    skip: Boolean(albumId),
  });

  const albumPhotosQuery = useQuery<AlbumPhotosQueryResult>(GET_ALBUM_PHOTOS, {
    variables: { albumId, options: photoOptions },
    notifyOnNetworkStatusChange: true,
    skip: !albumId,
  });

  const activeQuery = albumId ? albumPhotosQuery : rootPhotosQuery;
  const photosPage = albumId ? albumPhotosQuery.data?.album?.photos : rootPhotosQuery.data?.photos;

  const albumNotFound =
    Boolean(albumId) &&
    !albumPhotosQuery.loading &&
    !albumPhotosQuery.error &&
    albumPhotosQuery.data != null &&
    albumPhotosQuery.data.album == null;

  useEffect(() => {
    const t = photosPage?.meta?.totalCount;
    if (t != null) lastTotalCountRef.current = t;
  }, [photosPage]);

  const totalRecords = photosPage?.meta?.totalCount ?? lastTotalCountRef.current;
  const totalPages =
    totalRecords != null && totalRecords > 0
      ? Math.max(1, Math.ceil(totalRecords / pageSize))
      : 1;

  useEffect(() => {
    if (totalRecords == null) return;
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages, totalRecords]);

  const loading = activeQuery.loading;
  const error = activeQuery.error;
  const isInitialLoading = loading && !photosPage && page === 1;
  const isPagingWithoutRows = loading && !photosPage && page > 1;
  const isRefetching = loading && Boolean(photosPage);

  const rows = photosPage?.data ?? [];
  const albumsForFilter = albumsFilterData?.albums?.data ?? [];

  const refetchPhotos = () => {
    void (albumId ? albumPhotosQuery.refetch() : rootPhotosQuery.refetch());
  };

  const refetchAll = () => {
    refetchPhotos();
    void refetchStats();
  };

  const totalPhotosStat = statsData?.photos?.meta?.totalCount ?? null;
  const totalAlbumsStat = statsData?.albums?.meta?.totalCount ?? null;

  const listError = error;
  const statsFailed = Boolean(statsError);

  const columnHeaders = [...PHOTOS_TABLE_HEADERS];

  return (
    <section className="font-inter px-6 py-8 lg:px-8">
      <PhotosLibraryHeader isRefetching={isRefetching} />

      {listError ? (
        <QueryErrorPanel
          title="Could not load photos"
          message={getErrorMessage(listError)}
          onRetry={refetchAll}
        />
      ) : null}

      {!listError && statsFailed ? (
        <QueryErrorPanel
          title="Could not load photos overview"
          message={getErrorMessage(statsError!)}
          onRetry={() => void refetchStats()}
        />
      ) : null}

      <PhotosTopStats
        statsLoading={statsLoading}
        totalPhotos={totalPhotosStat}
        totalAlbums={totalAlbumsStat}
      />

      {!listError ? (
        isInitialLoading ? (
          <DataTableSkeleton
            columnHeaders={columnHeaders}
            gridTemplateColumns={PHOTOS_TABLE_GRID}
            rowCount={Math.min(pageSize, 25)}
            centerHeaderIndices={PHOTOS_TABLE_CENTER_HEADER_INDICES}
            loadingMessage="Loading photos…"
            className="mt-6 rounded-xl border border-[#e2e8f0] shadow-sm"
            aria-label="Loading photos table"
          />
        ) : albumNotFound ? (
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
            <TableEmptyState
              title="Album not found"
              description="That album is not in the dataset. Choose another album or “All Albums”."
            />
          </div>
        ) : isPagingWithoutRows ? (
          <DataTableSkeleton
            columnHeaders={columnHeaders}
            gridTemplateColumns={PHOTOS_TABLE_GRID}
            rowCount={Math.min(pageSize, 25)}
            centerHeaderIndices={PHOTOS_TABLE_CENTER_HEADER_INDICES}
            loadingMessage="Loading page…"
            footer={<DataTablePaginationSkeleton />}
            className="mt-6 rounded-xl border border-[#e2e8f0] shadow-sm"
            aria-label="Loading photos page"
          />
        ) : !loading && rows.length === 0 ? (
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
            <TableEmptyState
              title={
                debouncedSearch || albumId ? "No photos match your filters" : "No photos found"
              }
              description={
                debouncedSearch || albumId
                  ? "Try another album, clear the title search, or adjust sort order."
                  : "There are no photos available for this view."
              }
            />
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
            <PhotosLibraryToolbar
              albumId={albumId}
              onAlbumIdChange={setAlbumId}
              albums={albumsForFilter}
              albumsLoading={albumsFilterLoading}
              sortOrder={sortOrder}
              onSortOrderToggle={() => setSortOrder((o) => (o === "ASC" ? "DESC" : "ASC"))}
              advancedOpen={advancedOpen}
              onToggleAdvanced={() => setAdvancedOpen((v) => !v)}
              searchQuery={searchInput}
              onSearchChange={setSearchInput}
            />
            <PhotosDataTable
              rows={rows}
              totalCount={totalRecords}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(next) => {
                setPageSize(next);
                setPage(1);
              }}
            />
          </div>
        )
      ) : null}

      <PhotosApiTip />
      <PhotosCollaboratorsFab />
    </section>
  );
}
