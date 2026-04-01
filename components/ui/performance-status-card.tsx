import { ChartColumnIncreasing } from "lucide-react";

export type PerformanceStatusCardProps = {
  badgeLabel?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  streamCaption?: string;
  onAction?: () => void;
};

export function PerformanceStatusCard({
  badgeLabel = "System Status",
  title = "API Performance is optimal at 99.8% uptime",
  description = "The GraphQL resolver for Posts entity is responding with sub-200ms latency across global clusters.",
  actionLabel = "Check Detailed Logs",
  streamCaption = "Live Schema Stream",
  onAction,
}: PerformanceStatusCardProps) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-[#12233c] bg-[radial-gradient(circle_at_82%_28%,#0d2f69_0%,#071a31_34%,#050f1c_58%,#040b14_100%)] p-6 shadow-[0_14px_30px_rgba(2,6,23,0.45)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded bg-[#0b57d0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
            {badgeLabel}
          </span>
          <h3 className="mt-4 max-w-[410px] text-[18px] font-bold leading-[1.2] tracking-tight text-[#e5edff]">
            {title}
          </h3>
          <p className="mt-4 max-w-[430px] text-[13px] leading-[1.5] text-[#8ea3c2]">
            {description}
          </p>
          <button
            type="button"
            onClick={onAction}
            className="mt-6 rounded-[9px] bg-[#26303a] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#eef4ff] transition hover:bg-[#313d49]"
          >
            {actionLabel}
          </button>
        </div>

        <div className="shrink-0 md:self-center">
          <div className="rounded-2xl border border-[#1d3457] bg-[#10253f]/78 p-3.5 shadow-xl backdrop-blur-[2px]">
            <div className="rounded-xl border border-dashed border-[#2f4e75] px-7 py-4 text-center">
              <ChartColumnIncreasing
                className="mx-auto h-6 w-6 text-[#0053DB]"
                strokeWidth={2}
                aria-hidden
              />
              <p className="mt-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8ea3c2]">
                {streamCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
