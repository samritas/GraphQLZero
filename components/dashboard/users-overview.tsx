"use client";

import { useQuery } from "@apollo/client/react";
import { BadgeCheck, Loader2, UserRoundPlus, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DataTablePaginationSkeleton,
  DataTableSkeleton,
  TableEmptyState,
} from "@/components/ui/data-table-states";
import { QueryErrorPanel } from "@/components/ui/query-error-panel";
import { UsersCuratorFab } from "@/components/ui/users-curator-fab";
import { UsersDataTable } from "@/components/ui/users-data-table";
import { UsersFiltersToolbar } from "@/components/ui/users-filters-toolbar";
import { UsersTopMetricCard } from "@/components/ui/users-top-metric-card";
import {
  GET_USERS,
  GET_USERS_OVERVIEW_STATS,
  buildUsersQueryOptions,
  type UsersOverviewStatsQueryResult,
  type UsersQueryResult,
  type UsersRoleFilter,
} from "@/graphql/queries/users";
import {
  USERS_DEFAULT_PAGE_SIZE,
  USERS_SEARCH_DEBOUNCE_MS,
  USERS_TABLE_GRID,
  USERS_TABLE_HEADERS,
} from "@/lib/constants";
import { getErrorMessage } from "@/lib/get-error-message";
import { usersEntityConnectionsSum } from "@/lib/users-directory";

export function UsersOverview() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(USERS_DEFAULT_PAGE_SIZE);
  const [roleFilter, setRoleFilter] = useState<UsersRoleFilter>("all");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const lastTotalCountRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setTimeout(
      () => setDebouncedSearch(searchInput.trim()),
      USERS_SEARCH_DEBOUNCE_MS,
    );
    return () => window.clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
    lastTotalCountRef.current = null;
  }, [debouncedSearch, roleFilter]);

  const userOptions = useMemo(
    () => buildUsersQueryOptions(page, pageSize, roleFilter, debouncedSearch),
    [page, pageSize, roleFilter, debouncedSearch],
  );

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery<UsersQueryResult>(GET_USERS, {
    variables: { options: userOptions },
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery<UsersOverviewStatsQueryResult>(GET_USERS_OVERVIEW_STATS, {
    notifyOnNetworkStatusChange: true,
  });

  const usersPage = usersData?.users;

  useEffect(() => {
    const t = usersPage?.meta?.totalCount;
    if (t != null) lastTotalCountRef.current = t;
  }, [usersPage]);

  const totalRecords =
    usersPage?.meta?.totalCount ?? lastTotalCountRef.current;
  const totalPages =
    totalRecords != null && totalRecords > 0
      ? Math.max(1, Math.ceil(totalRecords / pageSize))
      : 1;

  useEffect(() => {
    if (totalRecords == null) return;
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages, totalRecords]);

  const isInitialLoading = usersLoading && !usersPage && page === 1;
  const isPagingWithoutRows = usersLoading && !usersPage && page > 1;
  const isRefetching = usersLoading && Boolean(usersPage);

  const rows = usersPage?.data ?? [];

  const totalUsers = statsData?.users?.meta?.totalCount ?? null;
  const postsTotal = statsData?.posts?.meta?.totalCount ?? null;
  const albumsTotal = statsData?.albums?.meta?.totalCount ?? null;
  const entityConnections = usersEntityConnectionsSum(postsTotal, albumsTotal);

  const refetchAll = () => {
    void refetchUsers();
    void refetchStats();
  };

  const listError = usersError;
  const statsFailed = Boolean(statsError);

  return (
    <section className="font-inter px-5 py-8 lg:px-7">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-[#94a3b8]">
            Console <span className="text-[#0053DB]">› Users Management</span>
          </p>
          <h1 className="font-title mt-1.5 text-[30px] font-bold leading-tight tracking-tight text-[#2A3439]">
            The Directory
          </h1>
          <p className="mt-2 max-w-3xl text-[16px] leading-relaxed text-[#64748b]">
            A curated overview of all registered system architects and contributors.
            Manage permissions, monitor activity, and explore entity relationships.
          </p>
        </div>
        {isRefetching ? (
          <p className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-[#64748b] sm:pt-6">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0053DB]" aria-hidden />
            Refreshing…
          </p>
        ) : null}
      </div>

      {listError ? (
        <QueryErrorPanel
          title="Could not load users"
          message={getErrorMessage(listError)}
          onRetry={refetchAll}
        />
      ) : null}

      {!listError && statsFailed ? (
        <QueryErrorPanel
          title="Could not load directory stats"
          message={getErrorMessage(statsError!)}
          onRetry={() => void refetchStats()}
        />
      ) : null}

      <div className="mt-12 mb-6 grid gap-4 lg:grid-cols-3">
        <UsersTopMetricCard
          icon={<UserRoundPlus className="h-4 w-4" strokeWidth={1.9} />}
          title="Total Curators"
          value={
            statsLoading && totalUsers == null
              ? "…"
              : totalUsers != null
                ? totalUsers.toLocaleString()
                : "—"
          }
          accent="+12.4%"
        />
        <UsersTopMetricCard
          icon={<BadgeCheck className="h-4 w-4" strokeWidth={1.9} />}
          title="Entity Connections"
          value={
            statsLoading && entityConnections == null
              ? "…"
              : entityConnections != null
                ? entityConnections.toLocaleString()
                : "—"
          }
          accent="Stable"
          tone="entity"
        />
        <UsersTopMetricCard
          icon={<Zap className="h-4 w-4" strokeWidth={1.9} />}
          title="System Health"
          value="99.98%"
          dark
        />
      </div>

      <UsersFiltersToolbar
        advancedOpen={advancedOpen}
        onToggleAdvanced={() => setAdvancedOpen((v) => !v)}
        searchQuery={searchInput}
        onSearchChange={setSearchInput}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
      />

      {!listError ? (
        <div className="mt-5 overflow-hidden rounded-xl border border-[#dbe3ee] bg-white">
          {isInitialLoading ? (
            <DataTableSkeleton
              columnHeaders={[...USERS_TABLE_HEADERS]}
              gridTemplateColumns={USERS_TABLE_GRID}
              rowCount={Math.min(pageSize, 25)}
              loadingMessage="Loading users…"
              className="rounded-none border-0 shadow-none"
              aria-label="Loading users table"
            />
          ) : isPagingWithoutRows ? (
            <DataTableSkeleton
              columnHeaders={[...USERS_TABLE_HEADERS]}
              gridTemplateColumns={USERS_TABLE_GRID}
              rowCount={Math.min(pageSize, 25)}
              loadingMessage="Loading page…"
              footer={<DataTablePaginationSkeleton />}
              className="rounded-none border-0 shadow-none"
              aria-label="Loading users page"
            />
          ) : !usersLoading && rows.length === 0 ? (
            <TableEmptyState
              title={
                debouncedSearch || roleFilter !== "all"
                  ? "No users match your filters"
                  : "No users found"
              }
              description={
                debouncedSearch || roleFilter !== "all"
                  ? "Try another role tab, clear the search, or open Advanced Filters to adjust your query."
                  : "There are no users in this directory view."
              }
            />
          ) : (
            <UsersDataTable
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
        </div>
      ) : null}

      <UsersCuratorFab />
    </section>
  );
}
