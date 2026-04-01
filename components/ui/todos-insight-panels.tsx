import { ArrowRight, CircleCheck, Sparkles } from "lucide-react";
import { TodosHealthWatermark } from "@/components/ui/todos-health-watermark";

export type TodosInsightPanelsProps = {
  statsLoading: boolean;
  avgResponseMs: number | null;
  completionPct: number | null;
  spotlightTitle: string | null;
};

export function TodosInsightPanels({
  statsLoading,
  avgResponseMs,
  completionPct,
  spotlightTitle,
}: TodosInsightPanelsProps) {
  const responseDisplay =
    statsLoading && avgResponseMs == null
      ? "…"
      : avgResponseMs != null
        ? `${avgResponseMs}ms`
        : "—";
  const completionDisplay =
    statsLoading && completionPct == null
      ? "…"
      : completionPct != null
        ? `${completionPct}%`
        : "—";
  const tipBody =
    statsLoading && spotlightTitle == null
      ? "…"
      : spotlightTitle != null && spotlightTitle.length > 0
        ? spotlightTitle
        : "—";

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_minmax(17rem,22rem)] lg:items-stretch">
      <div className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:p-8">
        <TodosHealthWatermark />
        <div className="relative z-[1] max-w-lg">
          <h3 className="text-lg font-bold tracking-tight text-[#1f2937] sm:text-xl">
            System Health & Latency
          </h3>
          <div className="mt-6 flex flex-wrap gap-10 sm:gap-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
                Avg. response
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#2563eb] sm:text-[2rem]">
                {responseDisplay}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
                Uptime
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#1f2937] sm:text-[2rem]">
                {completionDisplay}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-visible rounded-2xl bg-[#171717] p-6 text-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ca3af]">
          Developer tip
        </p>
        <p className="mt-4 max-w-[18rem] text-base font-bold leading-snug text-white sm:text-[17px]">
          {tipBody}
        </p>
        <a
          href="https://graphql.org/learn/queries/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b82f6] transition hover:text-[#60a5fa]"
          target="_blank"
          rel="noreferrer"
        >
          Read documentation
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </a>
        <button
          type="button"
          className="absolute -bottom-2 -right-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563eb] text-white shadow-lg shadow-blue-500/30 transition hover:bg-[#1d4ed8]"
          aria-label="Quick action"
        >
          <span className="relative inline-flex items-center justify-center">
            <CircleCheck className="h-5 w-5" strokeWidth={2} aria-hidden />
            <Sparkles className="absolute -right-1 -top-1 h-2.5 w-2.5" strokeWidth={2.2} aria-hidden />
          </span>
        </button>
      </div>
    </div>
  );
}
