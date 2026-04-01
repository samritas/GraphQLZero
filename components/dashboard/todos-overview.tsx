"use client";

import { useQuery } from "@apollo/client/react";
import {
  BadgeCheck,
  CalendarClock,
  ListTodo,
  Loader2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DataTablePaginationSkeleton,
  DataTableSkeleton,
  TableEmptyState,
} from "@/components/ui/data-table-states";
import { QueryErrorPanel } from "@/components/ui/query-error-panel";
import { TodoStatCard } from "@/components/ui/todo-stat-card";
import { TodosDataTable } from "@/components/ui/todos-data-table";
import { TodosInsightPanels } from "@/components/ui/todos-insight-panels";
import { TodosStatusTabs } from "@/components/ui/todos-status-tabs";
import { TodosTableToolbar } from "@/components/ui/todos-table-toolbar";
import {
  GET_TODOS,
  GET_TODOS_STATS,
  buildTodoQueryOptions,
  type TodoStatusFilter,
  type TodosQueryResult,
  type TodosStatsQueryResult,
} from "@/graphql/queries/todos";
import {
  TODOS_DEFAULT_PAGE_SIZE,
  TODOS_TABLE_GRID,
  TODOS_TABLE_HEADERS,
} from "@/lib/constants";
import { getErrorMessage } from "@/lib/get-error-message";
import {
  todosCompletionPercent,
  todosEstimatedAvgResponseMs,
  todosPendingSharePercent,
} from "@/lib/todo-metrics";

export function TodosOverview() {
  const [statusFilter, setStatusFilter] = useState<TodoStatusFilter>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(TODOS_DEFAULT_PAGE_SIZE);
  const lastTotalCountRef = useRef<number | null>(null);

  const todoOptions = useMemo(
    () => buildTodoQueryOptions(page, pageSize, statusFilter, ""),
    [page, pageSize, statusFilter],
  );

  const {
    data: todosData,
    loading: todosLoading,
    error: todosError,
    refetch: refetchTodos,
  } = useQuery<TodosQueryResult>(GET_TODOS, {
    variables: { options: todoOptions },
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery<TodosStatsQueryResult>(GET_TODOS_STATS, {
    notifyOnNetworkStatusChange: true,
  });

  const todosPage = todosData?.todos;

  useEffect(() => {
    setPage(1);
    lastTotalCountRef.current = null;
  }, [statusFilter]);

  useEffect(() => {
    const t = todosPage?.meta?.totalCount;
    if (t != null) lastTotalCountRef.current = t;
  }, [todosPage]);

  const totalRecords =
    todosPage?.meta?.totalCount ?? lastTotalCountRef.current;
  const totalPages =
    totalRecords != null && totalRecords > 0
      ? Math.max(1, Math.ceil(totalRecords / pageSize))
      : 1;

  useEffect(() => {
    if (totalRecords == null) return;
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages, totalRecords]);

  const isInitialLoading = todosLoading && !todosPage && page === 1;
  const isPagingWithoutRows = todosLoading && !todosPage && page > 1;
  const isRefetching = todosLoading && Boolean(todosPage);

  const rows = todosPage?.data ?? [];

  const totalAll = statsData?.todosAll?.meta?.totalCount ?? null;
  const totalPending = statsData?.todosPending?.meta?.totalCount ?? null;
  const totalCompleted = statsData?.todosCompleted?.meta?.totalCount ?? null;

  const completionPct = todosCompletionPercent(totalAll, totalCompleted);
  const pendingSharePct = todosPendingSharePercent(totalAll, totalPending);

  const postsTotal = statsData?.postsMeta?.meta?.totalCount ?? null;
  const commentsTotal = statsData?.commentsMeta?.meta?.totalCount ?? null;
  const avgResponseMs = todosEstimatedAvgResponseMs(postsTotal, commentsTotal);

  const refetchAll = () => {
    void refetchTodos();
    void refetchStats();
  };

  const listError = todosError;
  const statsFailed = Boolean(statsError);

  return (
    <section className="font-inter px-6 py-8 lg:px-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-title text-[30px] font-bold leading-tight tracking-tight text-[#2A3439]">
            Task Management
          </h1>
          <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-[#64748b]">
            Curating the Graphé LZero Todos dataset with editorial precision.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <TodosStatusTabs value={statusFilter} onChange={setStatusFilter} />
          {isRefetching ? (
            <p className="flex items-center justify-end gap-1.5 text-[11px] font-medium text-[#64748b]">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-[#2563eb]" aria-hidden />
              Refreshing…
            </p>
          ) : null}
        </div>
      </div>

      {listError ? (
        <QueryErrorPanel
          title="Could not load todos"
          message={getErrorMessage(listError)}
          onRetry={refetchAll}
        />
      ) : null}

      {!listError && statsFailed ? (
        <QueryErrorPanel
          title="Could not load todo stats"
          message={getErrorMessage(statsError!)}
          onRetry={() => void refetchStats()}
        />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <TodoStatCard
          icon={<ListTodo className="h-4 w-4" strokeWidth={2} />}
          title="Total Tasks"
          value={
            statsLoading && totalAll == null
              ? "…"
              : totalAll != null
                ? totalAll.toLocaleString()
                : "—"
          }
          footerHighlight={
            totalCompleted != null ? totalCompleted.toLocaleString() : statsLoading ? "…" : "—"
          }
          footerHighlightTone="green"
          footerMuted="completed tasks"
        />
        <TodoStatCard
          icon={<CalendarClock className="h-4 w-4" strokeWidth={2} />}
          title="Pending Sync"
          value={
            statsLoading && totalPending == null
              ? "…"
              : totalPending != null
                ? totalPending.toLocaleString()
                : "—"
          }
          footerHighlight={
            pendingSharePct != null ? `${pendingSharePct}%` : statsLoading ? "…" : "—"
          }
          footerHighlightTone="blue"
          footerMuted="of total volume"
        />
        <TodoStatCard
          icon={<BadgeCheck className="h-4 w-4" strokeWidth={2} />}
          title="Completion Rate"
          value={
            completionPct != null
              ? `${completionPct}%`
              : statsLoading
                ? "…"
                : "—"
          }
          progress={completionPct ?? undefined}
        />
      </div>

      {!listError ? (
        <div className="mt-5 overflow-hidden rounded-xl border border-[#dbe3ee] bg-white">
          <TodosTableToolbar />

          {isInitialLoading ? (
            <DataTableSkeleton
              columnHeaders={[...TODOS_TABLE_HEADERS]}
              gridTemplateColumns={TODOS_TABLE_GRID}
              rowCount={Math.min(pageSize, 25)}
              loadingMessage="Loading todos…"
              aria-label="Loading todos table"
            />
          ) : isPagingWithoutRows ? (
            <DataTableSkeleton
              columnHeaders={[...TODOS_TABLE_HEADERS]}
              gridTemplateColumns={TODOS_TABLE_GRID}
              rowCount={Math.min(pageSize, 25)}
              loadingMessage="Loading page…"
              footer={<DataTablePaginationSkeleton />}
              aria-label="Loading todos page"
            />
          ) : !todosLoading && rows.length === 0 ? (
            <TableEmptyState
              title="No todos in this view"
              description="Try another status tab to see more tasks."
            />
          ) : (
            <TodosDataTable
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

      <TodosInsightPanels
        statsLoading={statsLoading}
        avgResponseMs={avgResponseMs}
        completionPct={completionPct}
        spotlightTitle={statsData?.spotlightTodo?.title ?? null}
      />
    </section>
  );
}
