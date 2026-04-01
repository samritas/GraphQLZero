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
  trendNote?: string;
  emptyDisplay?: string;
};

export function StatsCard({
  totalRecords,
  showPlaceholder,
  label = "Total Records",
  trendNote = "+12% from last node sync",
  emptyDisplay = POSTS_ROW_FALLBACKS.empty,
}: StatsCardProps) {
  return (
    <div className="relative box-border h-[127px] w-full max-w-[309.33px] overflow-hidden rounded-[16px]  bg-[#DBE1FF] p-6 ">
      <DatabaseWatermark />
      <p className="relative text-[10px] font-bold uppercase tracking-[0.1em] text-[#0048BF]">
        {label}
      </p>
      <p className="relative mt-1 text-[30px] font-bold leading-none tracking-tight text-[#0048BF]">
        {formatMetricCount(totalRecords, showPlaceholder, emptyDisplay)}
      </p>
      <p className="relative mt-1.5 text-xs font-medium leading-snug text-[#2563eb]">
        {trendNote}
      </p>
    </div>
  );
}
