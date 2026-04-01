"use client";

import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { CommentExpandedMessageRow } from "@/components/ui/comment-expanded-message-row";
import type { CommentRecord } from "@/graphql/queries/comments";
import {
  COMMENTS_EXCERPT_MAX_LENGTH,
  COMMENTS_TABLE_GRID,
  COMMENTS_TABLE_HEADERS,
} from "@/lib/constants";
import {
  authorDisplayFromEmail,
  excerptCommentBody,
  formatCommentId,
} from "@/lib/comment-display";

export type CommentsDataTableProps = {
  rows: CommentRecord[];
  expandedCommentId: string | null;
  onToggleExpand: (commentId: string) => void;
  flaggedIds: Set<string>;
  onApproveComment: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
  onMarkFlagged: (commentId: string) => void;
  totalCount: number | null;
  page: number;
  pageSize: number;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextSize: number) => void;
};

export function CommentsDataTable({
  rows,
  expandedCommentId,
  onToggleExpand,
  flaggedIds,
  onApproveComment,
  onDeleteComment,
  onMarkFlagged,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: CommentsDataTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#dbe3ee] bg-[#f8fafc]">
      <div
        className="grid bg-[#eef2f6] px-4 py-4"
        style={{ gridTemplateColumns: COMMENTS_TABLE_GRID }}
      >
        {COMMENTS_TABLE_HEADERS.map((label) => (
          <p
            key={label}
            className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]"
          >
            {label}
          </p>
        ))}
      </div>

      {rows.map((row, index) => {
        const isExpanded = expandedCommentId === row.id;
        const authorLabel = authorDisplayFromEmail(row.email, row.name);
        return (
          <div
            key={row.id}
            className={`${index === rows.length - 1 ? "" : "border-b border-[#e5e7eb]"} ${
              isExpanded ? "bg-[#f8fafc]" : "bg-white"
            }`}
          >
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={`comment-detail-${row.id}`}
              id={`comment-row-${row.id}`}
              onClick={() => onToggleExpand(row.id)}
              className="w-full cursor-pointer px-4 py-5 text-left transition hover:bg-[#f1f5f9]/90"
            >
              <div
                className="grid items-center gap-x-2"
                style={{ gridTemplateColumns: COMMENTS_TABLE_GRID }}
              >
                <p className="text-sm text-[#9ca3af]">{formatCommentId(row.id)}</p>
                <p className="text-sm font-semibold text-[#2b313c]">
                  {authorLabel.includes(" ") ? (
                    <>
                      {authorLabel.split(" ")[0]}
                      <br />
                      {authorLabel.split(" ").slice(1).join(" ")}
                    </>
                  ) : (
                    authorLabel
                  )}
                </p>
                <p className="min-w-0 break-all text-sm text-[#0048C1]">{row.email}</p>
                <p className="text-sm text-[#4b5563]">
                  {excerptCommentBody(row.body, COMMENTS_EXCERPT_MAX_LENGTH)}
                </p>
              </div>
            </button>
            {isExpanded ? (
              <div
                id={`comment-detail-${row.id}`}
                role="region"
                aria-labelledby={`comment-row-${row.id}`}
              >
                <CommentExpandedMessageRow
                  commentId={row.id}
                  body={row.body}
                  isFlagged={flaggedIds.has(row.id)}
                  onApprove={onApproveComment}
                  onDelete={onDeleteComment}
                  onMarkFlagged={onMarkFlagged}
                />
              </div>
            ) : null}
          </div>
        );
      })}

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
