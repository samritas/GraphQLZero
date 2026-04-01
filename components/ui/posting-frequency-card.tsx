"use client";

import { useQuery } from "@apollo/client/react";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import {
  GET_POSTING_FREQUENCY,
  type PostingFrequencyQueryResult,
} from "@/graphql/queries/posts";
import { POSTS_POSTING_FREQUENCY } from "@/lib/constants";

export function PostingFrequencyCard() {
  const { data, loading, error } = useQuery<PostingFrequencyQueryResult>(
    GET_POSTING_FREQUENCY,
  );

  const { heightsPx, highlightIndices, counts } = useMemo(() => {
    const { barCount, topHighlightCount } = POSTS_POSTING_FREQUENCY;
    const raw = data?.posts?.data ?? [];
    const base = raw.map((p) => p.comments?.meta?.totalCount ?? 0);
    const padded = [...base];
    while (padded.length < barCount) padded.push(0);
    const bars = padded.slice(0, barCount);
    const max = Math.max(1, ...bars);
    const heightsPx = bars.map((c) =>
      Math.max(12, Math.round((c / max) * 84)),
    );
    const ranked = bars
      .map((v, i) => ({ v, i }))
      .sort((a, b) => b.v - a.v);
    const highlightIndices = new Set<number>();
    for (let r = 0; r < topHighlightCount; r++) {
      const item = ranked[r];
      if (item && item.v > 0) highlightIndices.add(item.i);
    }
    return { heightsPx, highlightIndices, counts: bars };
  }, [data]);

  return (
    <article className="rounded-[18px] border border-[#dbe3ee] bg-[#f8fafc] p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold tracking-tight text-[#1f2937]">
          Posting Frequency
        </h3>
        <TrendingUp className="h-4 w-4 text-[#2563eb]" strokeWidth={2} aria-hidden />
      </div>

      {loading && !data?.posts ? (
        <div className="mt-4 flex h-[90px] items-end gap-2 px-1" aria-busy>
          {Array.from({ length: POSTS_POSTING_FREQUENCY.barCount }, (_, i) => (
            <span
              key={i}
              className="h-10 w-[18px] animate-pulse rounded-[4px] bg-[#e2e8f0]"
            />
          ))}
        </div>
      ) : error ? (
        <p className="mt-4 text-center text-[11px] text-[#64748b]">
          Chart unavailable.
        </p>
      ) : (
        <div className="mt-4 flex h-[90px] items-end gap-2 px-1">
          {heightsPx.map((h, i) => (
            <span
              key={i}
              className={`w-[18px] rounded-[4px] ${
                highlightIndices.has(i) ? "bg-[#0b57d0]" : "bg-[#d3dbe5]"
              }`}
              style={{ height: `${h}px` }}
              title={`${counts[i]} comments (post ${i + 1} of ${POSTS_POSTING_FREQUENCY.barCount})`}
            />
          ))}
        </div>
      )}
      <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
        Last {POSTS_POSTING_FREQUENCY.barCount} posts · comment volume
      </p>
    </article>
  );
}
