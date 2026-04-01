"use client";

import { useQuery } from "@apollo/client/react";
import { ChevronDown } from "lucide-react";
import {
  GET_COMMENTS_SIDEBAR_AGGREGATES,
  GET_POSTS_FOR_COMMENT_ASSOCIATION,
  type CommentsSidebarAggregatesResult,
  type PostsForCommentAssociationResult,
} from "@/graphql/queries/comments";
import {
  COMMENTS_DATE_RANGE_OPTIONS,
  COMMENTS_POST_ASSOCIATION_PAGE,
  COMMENTS_SIDEBAR_SAMPLE_LIMIT,
  COMMENTS_SUBSTANTIVE_BODY_MIN_CHARS,
  type CommentsDatePreset,
} from "@/lib/constants";
import {
  avgCommentsPerPostDisplay,
  substantiveSharePercent,
} from "@/lib/comment-display";

function QuickStatsCardsSkeleton() {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      <div className="h-[76px] animate-pulse rounded-md bg-[#e2e8f0]/90" />
      <div className="h-[76px] animate-pulse rounded-md bg-[#e2e8f0]/90" />
    </div>
  );
}

export type CommentsFiltersRailProps = {
  postFilterId: string;
  onPostFilterIdChange: (postId: string) => void;
  datePreset: CommentsDatePreset;
  onDatePresetChange: (preset: CommentsDatePreset) => void;
};

export function CommentsFiltersRail({
  postFilterId,
  onPostFilterIdChange,
  datePreset,
  onDatePresetChange,
}: CommentsFiltersRailProps) {
  const { data: aggData, loading: aggLoading } = useQuery<CommentsSidebarAggregatesResult>(
    GET_COMMENTS_SIDEBAR_AGGREGATES,
    {
      variables: { sampleLimit: COMMENTS_SIDEBAR_SAMPLE_LIMIT },
      errorPolicy: "all",
    },
  );

  const { data: postsPickData, loading: postsPickLoading } =
    useQuery<PostsForCommentAssociationResult>(GET_POSTS_FOR_COMMENT_ASSOCIATION, {
      variables: { options: { paginate: COMMENTS_POST_ASSOCIATION_PAGE } },
    });

  const posts = postsPickData?.posts?.data ?? [];
  const postsTotal = aggData?.posts?.meta?.totalCount;
  const commentsTotal = aggData?.commentsTotal?.meta?.totalCount;
  const sampleBodies = aggData?.commentsSample?.data ?? [];

  const avgDisplay = avgCommentsPerPostDisplay(commentsTotal, postsTotal);
  const sentimentDisplay = substantiveSharePercent(
    sampleBodies,
    COMMENTS_SUBSTANTIVE_BODY_MIN_CHARS,
  );

  return (
    <aside className="rounded-xl bg-white p-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
          Post Association
        </p>
        <div className="relative mt-3">
          <select
            value={postFilterId}
            onChange={(e) => onPostFilterIdChange(e.target.value)}
            disabled={postsPickLoading}
            aria-label="Filter comments by post"
            className="h-11 w-full cursor-pointer appearance-none rounded-md border border-[#e5e7eb] bg-[#eef2f6] px-3 pr-9 text-sm text-[#374151] shadow-sm focus:border-[#0048C1] focus:outline-none focus:ring-2 focus:ring-[#0048C1]/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">All Post IDs</option>
            {posts.map((p) => (
              <option key={p.id} value={p.id}>
                #{p.id} — {p.title.length > 46 ? `${p.title.slice(0, 46)}…` : p.title}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>
      </div>

      <div className="mt-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
          Date Range
        </p>
        <div className="mt-3 space-y-2">
          {COMMENTS_DATE_RANGE_OPTIONS.map(({ id, label }) => {
            const active = datePreset === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onDatePresetChange(id)}
                className={`h-11 w-full rounded-md border px-3 text-left text-sm transition ${
                  active
                    ? "border-[#dbe3ee] bg-[#eef2f6] font-medium text-[#374151]"
                    : "border-[#e5e7eb] bg-white text-[#4b5563] hover:bg-[#f9fafb]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
          Quick Stats
        </p>
        {aggLoading ? (
          <QuickStatsCardsSkeleton />
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <article
              className="rounded-md border border-[#dbe3ee] bg-[#e9eff8] px-3 py-3"
              title="Average comments per post (total comments ÷ total posts, GraphQLZero)"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0048C1]">
                Avg/day
              </p>
              <p className="mt-1 text-[28px] font-bold leading-none text-[#0048C1]">
                {avgDisplay}
              </p>
            </article>
            <article
              className="rounded-md border border-[#dbe3ee] bg-[#edf2f8] px-3 py-3"
              title="Share of sampled comments with longer bodies (GraphQL sample)"
            >
              <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.1em] text-[#6b7280]">
                Sentiment
              </p>
              <p className="mt-1 text-[28px] font-bold leading-none text-[#374151]">
                {sentimentDisplay}
              </p>
            </article>
          </div>
        )}
      </div>

      <article className="relative mt-5 overflow-hidden rounded-[10px] bg-[radial-gradient(circle_at_82%_22%,#10284f_0%,#071322_48%,#050b13_100%)] px-6 py-6">
        <h3 className="text-[18px] font-bold leading-[1.04] tracking-tight text-white">
          Need a custom query?
        </h3>
        <p className="mt-3 max-w-[210px] text-[12px] leading-[1.45] text-[#94a3b8]">
          Use the GraphQL Explorer to build complex filters on comments.
        </p>
        <button
          type="button"
          className="mt-5 text-[14px] font-semibold text-[#dbe6ff] transition hover:text-white"
        >
          Open Explorer →
        </button>
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-8 right-3 text-[170px] font-black leading-none text-white/10"
        >
          {"}"}
        </span>
      </article>
    </aside>
  );
}
