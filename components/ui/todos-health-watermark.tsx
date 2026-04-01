import { Activity, BarChart3 } from "lucide-react";

export function TodosHealthWatermark() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-2 flex w-[min(52%,18rem)] select-none items-center justify-end gap-1 sm:right-4"
      aria-hidden
    >
      <BarChart3 className="h-24 w-24 shrink-0 text-[#94a3b8] opacity-[0.2]" strokeWidth={1.15} />
      <Activity className="h-28 w-28 shrink-0 text-[#3b82f6] opacity-[0.22]" strokeWidth={1.15} />
    </div>
  );
}
