"use client";

import type { CSSProperties } from "react";
import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import {
  GET_POST,
  type PostDetailQueryResult,
} from "@/graphql/queries/posts";
import { POSTS_ROW_FALLBACKS } from "@/lib/constants";

export type PostsDataTableRowData = {
  postId: string;
  id: string;
  title: string;
  excerpt: string;
  author: string;
  email: string;
  initials: string;
  initialsBg: string;
  initialsColor: string;
  interactions: string;
};

export function PostsDataTableRow({
  row,
  gridTemplateColumns,
  selected,
  isLast,
  onActivate,
}: {
  row: PostsDataTableRowData;
  gridTemplateColumns: string;
  selected: boolean;
  isLast: boolean;
  onActivate: () => void;
}) {
  const { data, loading, error } = useQuery<PostDetailQueryResult>(GET_POST, {
    variables: { id: row.postId },
    skip: !selected,
    notifyOnNetworkStatusChange: true,
  });

  const post = data?.post;
  const displayTitle = selected && post ? post.title : row.title;
  const displayBody = selected && post ? post.body : row.excerpt;
  const authorName =
    selected && post?.user?.name ? post.user.name : row.author;
  const authorEmail =
    selected && post?.user?.email ? post.user.email : row.email;
  const commentTotal =
    selected && post?.comments?.meta?.totalCount != null
      ? post.comments.meta.totalCount
      : row.interactions === POSTS_ROW_FALLBACKS.empty
        ? null
        : Number.parseInt(row.interactions, 10);
  const commentCountLabel =
    commentTotal != null && !Number.isNaN(commentTotal)
      ? String(commentTotal)
      : row.interactions;

  const previewComments = post?.comments?.data ?? [];
  const totalComments = post?.comments?.meta?.totalCount ?? 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className={`grid max-md:grid-cols-1 max-md:gap-4 md:gap-0 md:[grid-template-columns:var(--posts-grid-cols)] cursor-pointer items-start px-5 py-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#0053DB]/35 focus-visible:ring-offset-2 ${
        selected ? "bg-white" : "bg-[#f1f5f9]"
      } ${isLast ? "" : "border-b border-[#e2e8f0]"}`}
      style={
        { ["--posts-grid-cols"]: gridTemplateColumns } as CSSProperties
      }
      aria-expanded={selected}
      aria-label={`Post ${row.id}, ${row.title}`}
    >
      <div
        className={`pt-0.5 text-xs ${
          selected ? "font-bold text-[#0053DB]" : "font-semibold text-[#717C82]"
        }`}
      >
        {row.id}
      </div>
      <div className="min-w-0 max-md:pr-0 pr-4">
        <p className="text-[15px] font-bold leading-snug text-[#0f172a]">
          {displayTitle}
        </p>
        {selected ? (
          <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-[#64748b]">
            {loading && !post ? row.excerpt : displayBody}
          </p>
        ) : (
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#64748b]">
            {row.excerpt}
          </p>
        )}
        {selected ? (
          <div className="mt-4 rounded-lg bg-[#F0F4F7] p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0053DB]">
              Top comments preview
            </p>
            {loading && !post ? (
              <p className="mt-3 flex items-center gap-2 text-xs font-medium text-[#64748b]">
                <Loader2
                  className="h-4 w-4 shrink-0 animate-spin text-[#0053DB]"
                  aria-hidden
                />
                Loading comments…
              </p>
            ) : error ? (
              <p className="mt-3 text-xs font-medium text-[#b91c1c]">
                Could not load comments.
              </p>
            ) : previewComments.length > 0 ? (
              <>
                <div className="mt-2 space-y-2.5">
                  {previewComments.map((c) => (
                    <div
                      key={c.id}
                      className="border-l-2 border-[#0053DB] pl-2.5"
                    >
                      <p className="text-xs font-semibold text-[#0f172a]">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-[#64748b]">by {c.email}</p>
                    </div>
                  ))}
                </div>
                {totalComments > 0 ? (
                  <p
                    className="mt-3 cursor-default text-[11px] font-bold uppercase tracking-[0.08em] text-[#0053DB]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View all {totalComments} comments →
                  </p>
                ) : null}
              </>
            ) : (
              <p className="mt-3 text-xs text-[#64748b]">
                No comments on this post.
              </p>
            )}
          </div>
        ) : null}
      </div>
      <div className="flex min-w-0 items-start gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#455367]"
          style={{ backgroundColor: row.initialsBg }}
        >
          {row.initials}
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="text-sm font-bold text-[#2A3439]">{authorName}</p>
          <p className="mt-0.5 text-[11px] text-[#566166]">{authorEmail}</p>
        </div>
      </div>
      <div className="max-md:text-left text-center">
        <p
          className={`text-2xl font-bold ${
            selected ? "text-[#0053DB]" : "text-[#2A3439]"
          }`}
        >
          {commentCountLabel}
        </p>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#566166]">
          Comments
        </p>
      </div>
      <div
        className="flex max-md:w-full max-md:flex-row max-md:items-center max-md:justify-start max-md:gap-4 max-md:pt-0 max-md:text-left flex-col items-center justify-start gap-2 pt-1 text-center"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {selected ? (
          <>
            <button
              type="button"
              className="rounded-lg bg-[#0053DB] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm hover:bg-[#0047c7]"
            >
              Edit post
            </button>
            <button
              type="button"
              className="text-[10px] font-bold uppercase tracking-wide text-[#b91c1c] hover:underline"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            type="button"
            className="text-lg font-bold leading-none text-[#64748b]"
            aria-label="More actions"
          >
            ⋮
          </button>
        )}
      </div>
    </div>
  );
}

export type PostsDataTableProps = {
  rows: PostsDataTableRowData[];
  columnHeaders: readonly string[];
  gridTemplateColumns: string;
  centerHeaderIndices?: ReadonlyArray<number>;
  totalCount: number | null;
  page: number;
  pageSize: number;
  selectedPostId: string | null;
  onToggleSelectPost: (postId: string) => void;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextSize: number) => void;
};

export function PostsDataTable({
  rows,
  columnHeaders,
  gridTemplateColumns,
  centerHeaderIndices = [],
  totalCount,
  page,
  pageSize,
  selectedPostId,
  onToggleSelectPost,
  onPageChange,
  onPageSizeChange,
}: PostsDataTableProps) {
  const centerSet = new Set(centerHeaderIndices);
  const gridStyle = {
    ["--posts-grid-cols"]: gridTemplateColumns,
  } as CSSProperties;

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#dbe3ee] bg-[#eef2f6] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div
        className="hidden bg-[#e4ebf1] px-5 py-3.5 md:grid md:[grid-template-columns:var(--posts-grid-cols)]"
        style={gridStyle}
      >
        {columnHeaders.map((label, i) => (
          <p
            key={label}
            className={`text-[10px] font-bold uppercase tracking-[0.1em] text-[#64748b] ${
              centerSet.has(i) ? "text-center" : ""
            }`}
          >
            {label}
          </p>
        ))}
      </div>
      {rows.map((row, i) => (
        <PostsDataTableRow
          key={row.postId}
          row={row}
          gridTemplateColumns={gridTemplateColumns}
          selected={selectedPostId === row.postId}
          isLast={i === rows.length - 1}
          onActivate={() => onToggleSelectPost(row.postId)}
        />
      ))}
      <DataTablePagination
        page={page}
        pageSize={pageSize}
        rowCount={rows.length}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
