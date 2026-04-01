import { Filter, LayoutGrid, Table } from "lucide-react";

export function ViewToggle() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center rounded-lg border border-[#e2e8f0] bg-white p-0.5 shadow-sm">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#2563eb] bg-[#eff6ff] px-3 py-1.5 text-xs font-semibold text-[#2563eb]"
        >
          <Table className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          Table View
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
        >
          <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          Grid View
        </button>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#64748b] shadow-sm transition hover:bg-[#f8fafc]"
      >
        <Filter className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        Filters
      </button>
    </div>
  );
}
