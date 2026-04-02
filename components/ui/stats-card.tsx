import { Loader2 } from "lucide-react";
import { DatabaseWatermark } from "@/components/ui/database-watermark";
import { POSTS_ROW_FALLBACKS } from "@/lib/constants";

function formatMetricCount(
  n: number | null | undefined,
  isPlaceholder: boolean,
  emptyDisplay: string,
) {
  if (isPlaceholder) {
    return (
      <span className="inline-flex items-center gap-2 text-[#4338ca]/70">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        <span className="sr-only">Loading count</span>
      </span>
    );
  }
  if (n == null) return emptyDisplay;
  return n.toLocaleString();
}

export type StatsCardProps = {
  totalRecords: number | null;
  showPlaceholder: boolean;
  label?: string;
  /** Subtitle from GraphQL or other live data (see `trendLoading`). */
  trendNote?: string;
  trendLoading?: boolean;
  emptyDisplay?: string;
};

export function StatsCard({
  totalRecords,
  showPlaceholder,
  label = "Total Records",
  trendNote,
  trendLoading = false,
  emptyDisplay = POSTS_ROW_FALLBACKS.empty,
}: StatsCardProps) {
  const trendContent =
    trendLoading ? (
      <span className="inline-flex items-center gap-1.5">
        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />
        <span>Loading network stats…</span>
      </span>
    ) : trendNote ? (
      trendNote
    ) : (
      "—"
    );

  return (
    <div className="relative box-border min-w-0 w-full max-w-full overflow-hidden rounded-[16px] bg-[#DBE1FF] p-4 sm:h-[127px] sm:max-w-[309.33px] sm:p-6">
      <DatabaseWatermark />
      <p className="relative text-[10px] font-bold uppercase tracking-[0.1em] text-[#0048BF]">
        {label}
      </p>
      <p className="relative mt-1 text-[26px] font-bold leading-none tracking-tight text-[#0048BF] sm:text-[30px]">
        {formatMetricCount(totalRecords, showPlaceholder, emptyDisplay)}
      </p>
      <p className="relative mt-1.5 break-words text-sm font-medium leading-snug text-[#2563eb] sm:text-xs">
        {trendContent}
      </p>
    </div>
  );
}
