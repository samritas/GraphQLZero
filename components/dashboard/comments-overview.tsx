"use client";

import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildCommentQueryOptions,
  GET_COMMENTS,
  GET_COMMENTS_FOR_POST,
  type CommentsForPostQueryResult,
  type CommentsPage,
  type CommentsQueryResult,
} from "@/graphql/queries/comments";
import { CommentsDataTable } from "@/components/ui/comments-data-table";
import { CommentsFiltersRail } from "@/components/ui/comments-filters-rail";
import {
  DataTablePaginationSkeleton,
  DataTableSkeleton,
  TableEmptyState,
} from "@/components/ui/data-table-states";
import { QueryErrorPanel } from "@/components/ui/query-error-panel";
import {
  COMMENTS_BULK_FETCH_LIMIT,
  COMMENTS_DEFAULT_PAGE_SIZE,
  COMMENTS_FLAGGED_IDS_STORAGE_KEY,
  COMMENTS_READ_IDS_STORAGE_KEY,
  COMMENTS_SEARCH_DEBOUNCE_MS,
  COMMENTS_TABLE_GRID,
  COMMENTS_TABLE_HEADERS,
  type CommentsDatePreset,
  type CommentsInboxTab,
} from "@/lib/constants";
import { loadIdSetFromStorage, saveIdSetToStorage } from "@/lib/comments-id-storage";
import { getErrorMessage } from "@/lib/get-error-message";

export function CommentsOverview() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [postFilterId, setPostFilterId] = useState("");
  const [datePreset, setDatePreset] = useState<CommentsDatePreset>("24h");
  const [inboxTab, setInboxTab] = useState<CommentsInboxTab>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(COMMENTS_DEFAULT_PAGE_SIZE);
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(() => new Set());
  const [storageReady, setStorageReady] = useState(false);
  const lastTotalCountRef = useRef<number | null>(null);

  const useClientInboxFilter = inboxTab !== "all";

  useEffect(() => {
    setReadIds(loadIdSetFromStorage(COMMENTS_READ_IDS_STORAGE_KEY));
    setFlaggedIds(loadIdSetFromStorage(COMMENTS_FLAGGED_IDS_STORAGE_KEY));
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    saveIdSetToStorage(COMMENTS_READ_IDS_STORAGE_KEY, readIds);
  }, [readIds, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    saveIdSetToStorage(COMMENTS_FLAGGED_IDS_STORAGE_KEY, flaggedIds);
  }, [flaggedIds, storageReady]);

  useEffect(() => {
    const id = window.setTimeout(
      () => setDebouncedSearch(searchInput.trim()),
      COMMENTS_SEARCH_DEBOUNCE_MS,
    );
    return () => window.clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
    lastTotalCountRef.current = null;
    setExpandedCommentId(null);
  }, [debouncedSearch, postFilterId, inboxTab]);

  useEffect(() => {
    setExpandedCommentId(null);
  }, [page, pageSize]);

  const commentOptions = useMemo(
    () => buildCommentQueryOptions(debouncedSearch, page, pageSize),
    [debouncedSearch, page, pageSize],
  );

  const commentOptionsBulk = useMemo(
    () => buildCommentQueryOptions(debouncedSearch, 1, COMMENTS_BULK_FETCH_LIMIT),
    [debouncedSearch],
  );

  const rootCommentsQuery = useQuery<CommentsQueryResult>(GET_COMMENTS, {
    variables: { options: commentOptions },
    notifyOnNetworkStatusChange: true,
    skip: Boolean(postFilterId) || useClientInboxFilter,
  });

  const postCommentsQuery = useQuery<CommentsForPostQueryResult>(GET_COMMENTS_FOR_POST, {
    variables: { postId: postFilterId, options: commentOptions },
    notifyOnNetworkStatusChange: true,
    skip: !postFilterId || useClientInboxFilter,
  });

  const rootBulkQuery = useQuery<CommentsQueryResult>(GET_COMMENTS, {
    variables: { options: commentOptionsBulk },
    notifyOnNetworkStatusChange: true,
    skip: Boolean(postFilterId) || !useClientInboxFilter,
  });

  const postBulkQuery = useQuery<CommentsForPostQueryResult>(GET_COMMENTS_FOR_POST, {
    variables: { postId: postFilterId, options: commentOptionsBulk },
    notifyOnNetworkStatusChange: true,
    skip: !postFilterId || !useClientInboxFilter,
  });

  const loading = useClientInboxFilter
    ? postFilterId
      ? postBulkQuery.loading
      : rootBulkQuery.loading
    : postFilterId
      ? postCommentsQuery.loading
      : rootCommentsQuery.loading;

  const error = useClientInboxFilter
    ? postFilterId
      ? postBulkQuery.error
      : rootBulkQuery.error
    : postFilterId
      ? postCommentsQuery.error
      : rootCommentsQuery.error;

  const commentsPage: CommentsPage | undefined = useClientInboxFilter
    ? postFilterId
      ? postBulkQuery.data?.post?.comments
      : rootBulkQuery.data?.comments
    : postFilterId
      ? postCommentsQuery.data?.post?.comments
      : rootCommentsQuery.data?.comments;

  const postMissing =
    Boolean(postFilterId) &&
    (useClientInboxFilter ? !postBulkQuery.loading : !postCommentsQuery.loading) &&
    (useClientInboxFilter ? !postBulkQuery.error : !postCommentsQuery.error) &&
    (useClientInboxFilter ? postBulkQuery.data : postCommentsQuery.data) != null &&
    (useClientInboxFilter ? postBulkQuery.data?.post : postCommentsQuery.data?.post) ==
      null;

  const sourceRows = commentsPage?.data ?? [];

  const filteredFullList = useMemo(() => {
    if (!useClientInboxFilter) return null;
    if (inboxTab === "unread") return sourceRows.filter((r) => !readIds.has(r.id));
    if (inboxTab === "flagged") return sourceRows.filter((r) => flaggedIds.has(r.id));
    return sourceRows;
  }, [useClientInboxFilter, inboxTab, sourceRows, readIds, flaggedIds]);

  const listTotalCount =
    useClientInboxFilter && commentsPage == null
      ? null
      : useClientInboxFilter
        ? (filteredFullList?.length ?? 0)
        : (commentsPage?.meta?.totalCount ?? lastTotalCountRef.current);

  useEffect(() => {
    if (useClientInboxFilter) {
      const n = filteredFullList?.length;
      if (n != null) lastTotalCountRef.current = n;
    } else {
      const t = commentsPage?.meta?.totalCount;
      if (t != null) lastTotalCountRef.current = t;
    }
  }, [useClientInboxFilter, filteredFullList, commentsPage]);

  const totalPages =
    listTotalCount != null && listTotalCount > 0
      ? Math.max(1, Math.ceil(listTotalCount / pageSize))
      : 1;

  useEffect(() => {
    if (listTotalCount == null) return;
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages, listTotalCount]);

  const rows = useMemo(() => {
    if (!useClientInboxFilter) return sourceRows;
    const full = filteredFullList ?? [];
    const start = (page - 1) * pageSize;
    return full.slice(start, start + pageSize);
  }, [useClientInboxFilter, sourceRows, filteredFullList, page, pageSize]);

  const isInitialLoading =
    !postMissing && loading && !commentsPage && page === 1;
  const isPagingWithoutRows =
    !postMissing && loading && !commentsPage && page > 1;
  const isRefetching = !postMissing && loading && Boolean(commentsPage);
  const statsPlaceholder = isInitialLoading || isPagingWithoutRows;

  const refetchComments = () => {
    if (useClientInboxFilter) {
      void (postFilterId ? postBulkQuery.refetch() : rootBulkQuery.refetch());
    } else {
      void (postFilterId ? postCommentsQuery.refetch() : rootCommentsQuery.refetch());
    }
  };

  const markCommentRead = (commentId: string) => {
    setReadIds((prev) => {
      if (prev.has(commentId)) return prev;
      const next = new Set(prev);
      next.add(commentId);
      return next;
    });
  };

  const handleToggleExpand = (commentId: string) => {
    setExpandedCommentId((current) => {
      const next = current === commentId ? null : commentId;
      if (next != null) markCommentRead(next);
      return next;
    });
  };

  const handleApproveComment = (commentId: string) => {
    markCommentRead(commentId);
    setFlaggedIds((prev) => {
      if (!prev.has(commentId)) return prev;
      const next = new Set(prev);
      next.delete(commentId);
      return next;
    });
  };

  const handleDeleteComment = (commentId: string) => {
    setFlaggedIds((prev) => {
      if (!prev.has(commentId)) return prev;
      const next = new Set(prev);
      next.delete(commentId);
      return next;
    });
  };

  const handleMarkFlagged = (commentId: string) => {
    setFlaggedIds((prev) => {
      if (prev.has(commentId)) return prev;
      const next = new Set(prev);
      next.add(commentId);
      return next;
    });
  };

  const totalTitleDisplay =
    statsPlaceholder && listTotalCount == null
      ? "…"
      : listTotalCount != null
        ? listTotalCount.toLocaleString()
        : "—";

  const tabButtonClass = (tab: CommentsInboxTab) =>
    `rounded px-4 py-2 text-[12px] font-semibold transition ${
      inboxTab === tab
        ? "bg-white font-bold text-[#0048C1] shadow-sm"
        : "text-[#6b7280]"
    }`;

  return (
    <section className="font-inter px-6 py-8 lg:px-7">
      <div className="mb-7">
        <h1 className="font-title text-[30px] font-bold leading-tight tracking-tight text-[#2A3439]">
          Comments{" "}
          <span className="text-[22px] font-semibold text-[#0048C1]">
            / {totalTitleDisplay} total
          </span>
        </h1>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="max-w-2xl text-[16px] leading-relaxed text-[#64748b]">
            Manage and curate community feedback across all editorial posts.
            <br />
            Utilize inline inspection for content moderation.
          </p>
          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
            <div
              className="flex items-center rounded-md bg-[#f3f6fa] p-1"
              role="tablist"
              aria-label="Comment inbox filter"
            >
              <button
                type="button"
                role="tab"
                aria-selected={inboxTab === "all"}
                className={tabButtonClass("all")}
                onClick={() => setInboxTab("all")}
              >
                All
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={inboxTab === "unread"}
                className={tabButtonClass("unread")}
                onClick={() => setInboxTab("unread")}
              >
                Unread
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={inboxTab === "flagged"}
                className={tabButtonClass("flagged")}
                onClick={() => setInboxTab("flagged")}
              >
                Flagged
              </button>
            </div>
            {isRefetching ? (
              <p className="flex items-center justify-end gap-1.5 text-[11px] font-medium text-[#64748b]">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0048C1]" aria-hidden />
                Refreshing…
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {error ? (
        <QueryErrorPanel
          title="Could not load comments"
          message={getErrorMessage(error)}
          onRetry={refetchComments}
        />
      ) : null}

      <div className="grid gap-7 lg:grid-cols-[222px_minmax(0,714px)]">
        <CommentsFiltersRail
          postFilterId={postFilterId}
          onPostFilterIdChange={setPostFilterId}
          datePreset={datePreset}
          onDatePresetChange={setDatePreset}
        />
        <div className="min-w-0">
          {isInitialLoading ? (
            <DataTableSkeleton
              columnHeaders={[...COMMENTS_TABLE_HEADERS]}
              gridTemplateColumns={COMMENTS_TABLE_GRID}
              rowCount={Math.min(pageSize, 25)}
              loadingMessage="Loading comments…"
              aria-label="Loading comments table"
            />
          ) : error ? null : postMissing ? (
            <TableEmptyState
              title="Post not found"
              description="That post ID is not in the dataset. Choose another post or “All Post IDs”."
            />
          ) : isPagingWithoutRows ? (
            <DataTableSkeleton
              columnHeaders={[...COMMENTS_TABLE_HEADERS]}
              gridTemplateColumns={COMMENTS_TABLE_GRID}
              rowCount={Math.min(pageSize, 25)}
              loadingMessage="Loading page…"
              footer={<DataTablePaginationSkeleton />}
              aria-label="Loading comments page"
            />
          ) : !loading && rows.length === 0 ? (
            inboxTab === "flagged" && flaggedIds.size === 0 ? (
              <TableEmptyState
                title="No flagged comments yet"
                description="Expand a comment and choose Mark as Spam. Flagged items are stored in this browser for the Flagged tab."
              />
            ) : inboxTab === "unread" ? (
              <TableEmptyState
                title="No unread comments"
                description="Every comment in the current scope is marked read, or there are no matches. Open All to browse the full list."
              />
            ) : (
              <TableEmptyState
                title="No comments match your filters"
                description="Try a different search, pick another post, or clear the search field."
              />
            )
          ) : (
            <CommentsDataTable
              rows={rows}
              expandedCommentId={expandedCommentId}
              onToggleExpand={handleToggleExpand}
              flaggedIds={flaggedIds}
              onApproveComment={handleApproveComment}
              onDeleteComment={handleDeleteComment}
              onMarkFlagged={handleMarkFlagged}
              totalCount={listTotalCount}
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
      </div>
    </section>
  );
}
