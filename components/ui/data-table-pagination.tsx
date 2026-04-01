import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  DEFAULT_TABLE_PAGE_SIZE_OPTIONS,
  TABLE_PAGINATION,
} from "@/lib/constants";

function paginationPageItems(
  currentPage: number,
  totalPages: number,
  config: typeof TABLE_PAGINATION = TABLE_PAGINATION,
): Array<number | "ellipsis"> {
  const { maxFullRange, nearStart, nearEndOffset } = config;
  if (totalPages <= maxFullRange) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= nearStart) {
    return [1, 2, 3, "ellipsis", totalPages];
  }
  if (currentPage >= totalPages - nearEndOffset) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }
  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

export type DataTablePaginationProps = {
  page: number;
  pageSize: number;
  rowCount: number;
  totalCount: number | null;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextSize: number) => void;
  pageSizeOptions?: readonly number[];
  paginationWindow?: typeof TABLE_PAGINATION;
};

export function DataTablePagination({
  page,
  pageSize,
  rowCount,
  totalCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_TABLE_PAGE_SIZE_OPTIONS,
  paginationWindow = TABLE_PAGINATION,
}: DataTablePaginationProps) {
  const total = totalCount ?? 0;
  const totalPages = Math.max(1, total > 0 ? Math.ceil(total / pageSize) : 1);

  const showFrom = rowCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const showTo = rowCount === 0 ? 0 : showFrom + rowCount - 1;
  const totalLabel =
    totalCount != null
      ? totalCount.toLocaleString()
      : rowCount > 0
        ? `${showTo}+`
        : "0";

  const items = paginationPageItems(page, totalPages, paginationWindow);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex flex-col gap-4 border-t border-[#dbe3ee] bg-[#f1f5f9] px-5 py-4 text-sm text-[#64748b] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
      <p className="shrink-0 text-sm text-[#64748b]">
        Showing{" "}
        <span className="font-bold text-[#475569]">
          {showFrom} - {showTo}
        </span>{" "}
        of{" "}
        <span className="font-bold text-[#475569]">{totalLabel}</span> entries
      </p>

      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-0.5 rounded-xl bg-[#e2e8f0]/90 px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <button
            type="button"
            disabled={!canPrev}
            aria-label="First page"
            onClick={() => onPageChange(1)}
            className="rounded-md p-1.5 text-[#334155] transition hover:bg-white/60 disabled:cursor-not-allowed disabled:text-[#94a3b8] disabled:hover:bg-transparent"
          >
            <ChevronsLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            disabled={!canPrev}
            aria-label="Previous page"
            onClick={() => onPageChange(page - 1)}
            className="rounded-md p-1.5 text-[#334155] transition hover:bg-white/60 disabled:cursor-not-allowed disabled:text-[#94a3b8] disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>

          <div className="flex items-center gap-1 px-1">
            {items.map((item, idx) =>
              item === "ellipsis" ? (
                <span
                  key={`e-${idx}`}
                  className="min-w-[1.25rem] px-1 text-center text-sm text-[#64748b]"
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => onPageChange(item)}
                  className={`min-w-[2rem] rounded-md px-2.5 py-1 text-sm font-medium transition ${
                    item === page
                      ? "border border-[#dbe3ee] bg-white text-[#3b82f6] shadow-sm"
                      : "text-[#334155] hover:bg-white/50"
                  }`}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <button
            type="button"
            disabled={!canNext}
            aria-label="Next page"
            onClick={() => onPageChange(page + 1)}
            className="rounded-md p-1.5 text-[#334155] transition hover:bg-white/60 disabled:cursor-not-allowed disabled:text-[#94a3b8] disabled:hover:bg-transparent"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            disabled={!canNext}
            aria-label="Last page"
            onClick={() => onPageChange(totalPages)}
            className="rounded-md p-1.5 text-[#334155] transition hover:bg-white/60 disabled:cursor-not-allowed disabled:text-[#94a3b8] disabled:hover:bg-transparent"
          >
            <ChevronsRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2">
        <span className="text-sm text-[#64748b]">Rows per page</span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Rows per page"
            className="appearance-none rounded-lg border border-[#dbe3ee] bg-white py-2 pl-3 pr-9 text-sm font-semibold text-[#334155] shadow-sm focus:border-[#93c5fd] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/25"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]"
            strokeWidth={2}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
