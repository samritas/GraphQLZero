"use client";

import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildPostQueryOptions,
  GET_POSTS,
  GET_USER_POSTS,
  type PostsPage,
  type PostsQueryResult,
  type UserPostsQueryResult,
} from "@/graphql/queries/posts";
import {
  GET_USERS_FOR_AUTHOR_FILTER,
  type UsersForFilterQueryResult,
} from "@/graphql/queries/users";
import { PostsDataTable } from "@/components/ui/posts-data-table";
import { PostsInsightsStrip } from "@/components/ui/posts-insights-strip";
import {
  DataTablePaginationSkeleton,
  DataTableSkeleton,
  TableEmptyState,
} from "@/components/ui/data-table-states";
import { PostsFiltersCard } from "@/components/ui/posts-filters-card";
import { QueryErrorPanel } from "@/components/ui/query-error-panel";
import { StatsCard } from "@/components/ui/stats-card";
import { ViewToggle } from "@/components/ui/view-toggle";
import {
  POSTS_DEFAULT_PAGE_SIZE,
  POSTS_TABLE_HEADERS,
  POSTS_TITLE_SEARCH_DEBOUNCE_MS,
  POSTS_USERS_FILTER_OPTIONS,
} from "@/lib/constants";
import { getErrorMessage } from "@/lib/get-error-message";
import { mapPostToTableRow } from "@/lib/map-post-to-table-row";

const POSTS_TABLE_GRID =
  "72px minmax(0,1.6fr) minmax(0,200px) 100px 100px" as const;

const POSTS_CENTER_HEADER_INDICES = [3, 4] as const;

export function PostsOverview() {
  const [titleInput, setTitleInput] = useState("");
  const [debouncedTitleQuery, setDebouncedTitleQuery] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(POSTS_DEFAULT_PAGE_SIZE);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  /** Keeps meta.totalCount while Apollo clears `data` during variable changes so pagination state is not reset. */
  const lastTotalCountRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setTimeout(
      () => setDebouncedTitleQuery(titleInput.trim()),
      POSTS_TITLE_SEARCH_DEBOUNCE_MS,
    );
    return () => window.clearTimeout(id);
  }, [titleInput]);

  useEffect(() => {
    setPage(1);
    lastTotalCountRef.current = null;
    setSelectedPostId(null);
  }, [debouncedTitleQuery, authorUserId]);

  useEffect(() => {
    setSelectedPostId(null);
  }, [page, pageSize]);

  const postOptions = useMemo(
    () => buildPostQueryOptions(debouncedTitleQuery, page, pageSize),
    [debouncedTitleQuery, page, pageSize],
  );

  const { data: usersData, loading: authorsLoading } = useQuery<UsersForFilterQueryResult>(
    GET_USERS_FOR_AUTHOR_FILTER,
    { variables: { options: POSTS_USERS_FILTER_OPTIONS } },
  );
  const authors = usersData?.users?.data ?? [];

  const allPostsQuery = useQuery<PostsQueryResult>(GET_POSTS, {
    variables: { options: postOptions },
    notifyOnNetworkStatusChange: true,
    skip: Boolean(authorUserId),
  });

  const userPostsQuery = useQuery<UserPostsQueryResult>(GET_USER_POSTS, {
    variables: { userId: authorUserId, options: postOptions },
    notifyOnNetworkStatusChange: true,
    skip: !authorUserId,
  });

  const activeQuery = authorUserId ? userPostsQuery : allPostsQuery;
  const postsPage: PostsPage | undefined = authorUserId
    ? userPostsQuery.data?.user?.posts
    : allPostsQuery.data?.posts;

  const userNotFound =
    Boolean(authorUserId) &&
    !userPostsQuery.loading &&
    !userPostsQuery.error &&
    userPostsQuery.data != null &&
    userPostsQuery.data.user == null;

  const rows = useMemo(
    () =>
      postsPage?.data?.map((post, index) => mapPostToTableRow(post, index)) ?? [],
    [postsPage],
  );

  useEffect(() => {
    const t = postsPage?.meta?.totalCount;
    if (t != null) lastTotalCountRef.current = t;
  }, [postsPage]);

  const totalRecords =
    postsPage?.meta?.totalCount ?? lastTotalCountRef.current;
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
  /** First paint only (page 1, no rows yet). Avoid treating page 2+ refetches as “initial”. */
  const isInitialLoading = loading && !postsPage && page === 1;
  const isPagingWithoutRows = loading && !postsPage && page > 1;
  const isRefetching = loading && Boolean(postsPage);

  const refetchPosts = () => {
    void (authorUserId ? userPostsQuery.refetch() : allPostsQuery.refetch());
  };

  return (
    <section className="font-inter px-5 py-8 lg:px-7">
      <div className="mb-7">
        <h1 className="font-title text-[30px] font-bold leading-tight tracking-tight text-[#2A3439]">
          Editorial Posts
        </h1>
        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="max-w-2xl text-[16px] leading-relaxed text-[#566166]">
            Managing the foundational data nodes of GraphQLZero .
          </p>
          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
            <ViewToggle />
            {isRefetching ? (
              <p className="flex items-center justify-end gap-1.5 text-[11px] font-medium text-[#64748b]">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#2563eb]" aria-hidden />
                Refreshing…
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {error ? (
        <QueryErrorPanel
          title="Could not load posts"
          message={getErrorMessage(error)}
          onRetry={refetchPosts}
        />
      ) : null}

      <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,642.67px)_1fr] lg:items-stretch lg:gap-4">
        <PostsFiltersCard
          titleQuery={titleInput}
          onTitleQueryChange={setTitleInput}
          authorUserId={authorUserId}
          onAuthorUserIdChange={setAuthorUserId}
          authors={authors}
          authorsLoading={authorsLoading}
        />
        <div className="flex min-w-0 justify-start lg:justify-end">
          <StatsCard
            totalRecords={totalRecords}
            showPlaceholder={isInitialLoading || isPagingWithoutRows}
          />
        </div>
      </div>

      {isInitialLoading ? (
        <DataTableSkeleton
          columnHeaders={[...POSTS_TABLE_HEADERS]}
          gridTemplateColumns={POSTS_TABLE_GRID}
          centerHeaderIndices={POSTS_CENTER_HEADER_INDICES}
          rowCount={Math.min(pageSize, 25)}
          loadingMessage="Loading posts…"
          aria-label="Loading posts table"
        />
      ) : error ? null : userNotFound ? (
        <TableEmptyState
          title="No user found for this author filter"
          description="Try choosing a different author or return to all users."
        />
      ) : isPagingWithoutRows ? (
        <DataTableSkeleton
          columnHeaders={[...POSTS_TABLE_HEADERS]}
          gridTemplateColumns={POSTS_TABLE_GRID}
          centerHeaderIndices={POSTS_CENTER_HEADER_INDICES}
          rowCount={Math.min(pageSize, 25)}
          loadingMessage="Loading page…"
          footer={<DataTablePaginationSkeleton />}
          aria-label="Loading posts page"
        />
      ) : !loading && rows.length === 0 ? (
        <TableEmptyState
          title="No posts match your filters"
          description="Adjust the title search or author filter, or clear filters to see all posts."
        />
      ) : (
        <PostsDataTable
          rows={rows}
          columnHeaders={POSTS_TABLE_HEADERS}
          gridTemplateColumns={POSTS_TABLE_GRID}
          centerHeaderIndices={POSTS_CENTER_HEADER_INDICES}
          totalCount={totalRecords}
          page={page}
          pageSize={pageSize}
          selectedPostId={selectedPostId}
          onToggleSelectPost={(postId) =>
            setSelectedPostId((current) => (current === postId ? null : postId))
          }
          onPageChange={setPage}
          onPageSizeChange={(next) => {
            setPageSize(next);
            setPage(1);
          }}
        />
      )}

      <PostsInsightsStrip />
    </section>
  );
}
