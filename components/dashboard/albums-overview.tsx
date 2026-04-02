"use client";

import { useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AlbumsDataTable } from "@/components/ui/albums-data-table";
import { AlbumsFilterPanel } from "@/components/ui/albums-filter-panel";
import { AlbumsRecentGallery } from "@/components/ui/albums-recent-gallery";
import { AlbumsStatCard } from "@/components/ui/albums-stat-card";
import { AlbumsToolbar } from "@/components/ui/albums-toolbar";
import {
  DataTablePaginationSkeleton,
  DataTableSkeleton,
  TableEmptyState,
} from "@/components/ui/data-table-states";
import { QueryErrorPanel } from "@/components/ui/query-error-panel";
import {
  GET_ALBUMS,
  GET_ALBUMS_OVERVIEW_STATS,
  GET_USER_ALBUMS,
  buildAlbumQueryOptions,
  type AlbumsOverviewStatsQueryResult,
  type AlbumsPage,
  type AlbumsQueryResult,
  type UserAlbumsQueryResult,
} from "@/graphql/queries/albums";
import {
  GET_USERS_FOR_AUTHOR_FILTER,
  type UsersForFilterQueryResult,
} from "@/graphql/queries/users";
import {
  ALBUMS_DEFAULT_PAGE_SIZE,
  ALBUMS_SEARCH_DEBOUNCE_MS,
  ALBUMS_TABLE_GRID,
  ALBUMS_TABLE_HEADERS,
  POSTS_USERS_FILTER_OPTIONS,
} from "@/lib/constants";
import {
  albumsStoragePercentFromTotals,
  formatAlbumPhotosShort,
} from "@/lib/albums-display";
import { getErrorMessage } from "@/lib/get-error-message";

export function AlbumsOverview() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ALBUMS_DEFAULT_PAGE_SIZE);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [ownerUserId, setOwnerUserId] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const lastTotalCountRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setTimeout(
      () => setDebouncedSearch(searchInput.trim()),
      ALBUMS_SEARCH_DEBOUNCE_MS,
    );
    return () => window.clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
    lastTotalCountRef.current = null;
  }, [debouncedSearch, ownerUserId]);

  const albumOptions = useMemo(
    () => buildAlbumQueryOptions(debouncedSearch, page, pageSize),
    [debouncedSearch, page, pageSize],
  );

  const { data: usersData, loading: authorsLoading } = useQuery<UsersForFilterQueryResult>(
    GET_USERS_FOR_AUTHOR_FILTER,
    { variables: { options: POSTS_USERS_FILTER_OPTIONS } },
  );
  const authors = usersData?.users?.data ?? [];

  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery<AlbumsOverviewStatsQueryResult>(GET_ALBUMS_OVERVIEW_STATS, {
    notifyOnNetworkStatusChange: true,
  });

  const allAlbumsQuery = useQuery<AlbumsQueryResult>(GET_ALBUMS, {
    variables: { options: albumOptions },
    notifyOnNetworkStatusChange: true,
    skip: Boolean(ownerUserId),
  });

  const userAlbumsQuery = useQuery<UserAlbumsQueryResult>(GET_USER_ALBUMS, {
    variables: { userId: ownerUserId, options: albumOptions },
    notifyOnNetworkStatusChange: true,
    skip: !ownerUserId,
  });

  const activeQuery = ownerUserId ? userAlbumsQuery : allAlbumsQuery;
  const albumsPage: AlbumsPage | undefined = ownerUserId
    ? userAlbumsQuery.data?.user?.albums
    : allAlbumsQuery.data?.albums;

  const userNotFound =
    Boolean(ownerUserId) &&
    !userAlbumsQuery.loading &&
    !userAlbumsQuery.error &&
    userAlbumsQuery.data != null &&
    userAlbumsQuery.data.user == null;

  useEffect(() => {
    const t = albumsPage?.meta?.totalCount;
    if (t != null) lastTotalCountRef.current = t;
  }, [albumsPage]);

  const totalRecords = albumsPage?.meta?.totalCount ?? lastTotalCountRef.current;
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
  const isInitialLoading = loading && !albumsPage && page === 1;
  const isPagingWithoutRows = loading && !albumsPage && page > 1;
  const isRefetching = loading && Boolean(albumsPage);

  const rows = albumsPage?.data ?? [];

  const refetchAlbums = () => {
    void (ownerUserId ? userAlbumsQuery.refetch() : allAlbumsQuery.refetch());
  };

  const refetchAll = () => {
    refetchAlbums();
    void refetchStats();
  };

  const totalAlbumsCount = statsData?.albums?.meta?.totalCount ?? null;
  const totalPhotosCount = statsData?.photos?.meta?.totalCount ?? null;
  const totalUsersCount = statsData?.users?.meta?.totalCount ?? null;
  const galleryPhotos = statsData?.galleryPhotos?.data ?? [];

  const headlineTotal =
    totalAlbumsCount != null ? totalAlbumsCount.toLocaleString() : "…";

  const statsPlaceholder = statsLoading && totalAlbumsCount == null;

  const storageUsedPct = albumsStoragePercentFromTotals(
    totalPhotosCount,
    totalAlbumsCount,
  );

  return (
    <section className="font-inter px-6 py-8 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-title text-[30px] font-bold leading-tight tracking-tight text-[#2A3439]">
            Albums
          </h1>
          <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-[#64748b]">
            Curating {headlineTotal} digital collections across the Graphé LZero ecosystem.
          </p>
        </div>

        <AlbumsToolbar
          filterOpen={filterOpen}
          onToggleFilter={() => setFilterOpen((v) => !v)}
          isRefetching={isRefetching}
        />
      </div>

      {error ? (
        <QueryErrorPanel
          title="Could not load albums"
          message={getErrorMessage(error)}
          onRetry={refetchAll}
        />
      ) : null}

      {!error && statsError ? (
        <QueryErrorPanel
          title="Could not load albums overview"
          message={getErrorMessage(statsError)}
          onRetry={() => void refetchStats()}
        />
      ) : null}

      {filterOpen ? (
        <AlbumsFilterPanel
          searchQuery={searchInput}
          onSearchChange={setSearchInput}
          ownerUserId={ownerUserId}
          onOwnerUserIdChange={setOwnerUserId}
          owners={authors}
          ownersLoading={authorsLoading}
        />
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AlbumsStatCard
          label="Total Collections"
          value={
            statsPlaceholder
              ? "…"
              : totalAlbumsCount != null
                ? totalAlbumsCount.toLocaleString()
                : "—"
          }
        />
        <AlbumsStatCard
          label="Total Photos"
          value={
            statsPlaceholder
              ? "…"
              : totalPhotosCount != null
                ? formatAlbumPhotosShort(totalPhotosCount)
                : "—"
          }
        />
        <AlbumsStatCard
          label="Active Curators"
          value={
            statsPlaceholder
              ? "…"
              : totalUsersCount != null
                ? totalUsersCount.toLocaleString()
                : "—"
          }
          detail="Real-time"
          detailTone="muted"
        />
        <AlbumsStatCard
          label="Storage Used"
          value={statsPlaceholder ? "…" : `${storageUsedPct}%`}
          labelBlue
          valueBlue
          progressBeside={storageUsedPct}
        />
      </div>

      {isInitialLoading ? (
        <DataTableSkeleton
          columnHeaders={[...ALBUMS_TABLE_HEADERS]}
          gridTemplateColumns={ALBUMS_TABLE_GRID}
          rowCount={Math.min(pageSize, 25)}
          loadingMessage="Loading albums…"
          className="mt-6 rounded-[28px] border-[#dbe3ee] shadow-sm"
          aria-label="Loading albums table"
        />
      ) : error ? null : userNotFound ? (
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#dbe3ee] bg-[#eef2f6] shadow-sm">
          <TableEmptyState
            title="Owner not found"
            description="That user ID is not in the dataset. Choose another owner or clear the owner filter."
          />
        </div>
      ) : isPagingWithoutRows ? (
        <DataTableSkeleton
          columnHeaders={[...ALBUMS_TABLE_HEADERS]}
          gridTemplateColumns={ALBUMS_TABLE_GRID}
          rowCount={Math.min(pageSize, 25)}
          loadingMessage="Loading page…"
          footer={<DataTablePaginationSkeleton />}
          className="mt-6 rounded-[28px] border-[#dbe3ee] shadow-sm"
          aria-label="Loading albums page"
        />
      ) : !loading && rows.length === 0 ? (
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#dbe3ee] bg-[#eef2f6] shadow-sm">
          <TableEmptyState
            title={
              debouncedSearch || ownerUserId
                ? "No albums match your filters"
                : "No albums found"
            }
            description={
              debouncedSearch || ownerUserId
                ? "Try another search phrase, pick a different owner, or open Sort & Filter to adjust your query."
                : "There are no albums available for this view."
            }
          />
        </div>
      ) : (
        <AlbumsDataTable
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
      )}

      <AlbumsRecentGallery
        photos={galleryPhotos}
        showPlaceholder={statsLoading && galleryPhotos.length === 0}
      />
    </section>
  );
}
