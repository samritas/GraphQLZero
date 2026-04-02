import type { CSSProperties, ReactNode } from "react";

const headerLabelClass =
  "text-[10px] font-bold uppercase tracking-[0.1em] text-[#64748b]";

const pulseBar = "animate-pulse rounded-md bg-[#cbd5e1]/70";

export type DataTableSkeletonProps = {
  columnHeaders: string[];
  gridTemplateColumns: string;
  centerHeaderIndices?: ReadonlyArray<number>;
  rowCount?: number;
  loadingMessage?: string;
  footer?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/**
 * Single reusable table skeleton: header + pulsing placeholder rows + optional footer.
 * Pass the same `gridTemplateColumns` and headers as the real table for alignment.
 */
export function DataTableSkeleton({
  columnHeaders,
  gridTemplateColumns,
  centerHeaderIndices = [],
  rowCount = 8,
  loadingMessage,
  footer,
  className = "",
  "aria-label": ariaLabel = "Loading table",
}: DataTableSkeletonProps) {
  const centerSet = new Set(centerHeaderIndices);
  const gridStyle = {
    ["--data-table-skel-cols"]: gridTemplateColumns,
  } as CSSProperties;

  return (
    <div
      className={`overflow-hidden rounded-[16px] border border-[#dbe3ee] bg-[#eef2f6] shadow-[0_1px_2px_rgba(15,23,42,0.05)] ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
    >
      <div
        className="hidden bg-[#e4ebf1] px-5 py-3.5 md:grid md:[grid-template-columns:var(--data-table-skel-cols)]"
        style={gridStyle}
      >
        {columnHeaders.map((label, i) => (
          <p
            key={label}
            className={`${headerLabelClass} ${centerSet.has(i) ? "text-center" : ""}`}
          >
            {label}
          </p>
        ))}
      </div>

      <div className="divide-y divide-[#e2e8f0] bg-white">
        {Array.from({ length: rowCount }, (_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid max-md:grid-cols-1 max-md:gap-3 md:gap-0 md:[grid-template-columns:var(--data-table-skel-cols)] items-center px-5 py-5"
            style={gridStyle}
          >
            {columnHeaders.map((_, colIdx) => (
              <div
                key={colIdx}
                className={`min-h-[1.25rem] ${centerSet.has(colIdx) ? "flex justify-center" : ""}`}
              >
                <div
                  className={`${pulseBar} h-4 ${
                    colIdx === 0
                      ? "w-10"
                      : colIdx === 1
                        ? "w-full max-w-[95%]"
                        : colIdx === columnHeaders.length - 1
                          ? "w-8"
                          : "w-3/4 max-w-[120px]"
                  }`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {loadingMessage ? (
        <p className="border-t border-[#e2e8f0] bg-white px-5 py-4 text-center text-sm font-medium text-[#64748b]">
          {loadingMessage}
        </p>
      ) : null}

      {footer}
    </div>
  );
}

/** Lightweight pagination bar placeholder (height/rhythm similar to real pagination). */
export function DataTablePaginationSkeleton() {
  return (
    <div
      className="flex flex-col gap-3 border-t border-[#dbe3ee] bg-[#f1f5f9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      aria-hidden
    >
      <div className={`h-4 w-52 ${pulseBar}`} />
      <div
        className={`mx-auto h-9 w-full max-w-[280px] rounded-xl ${pulseBar} bg-[#cbd5e1]/60`}
      />
      <div className={`h-10 w-40 rounded-lg sm:ml-auto ${pulseBar}`} />
    </div>
  );
}

export type TableEmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
};

/** Dashed card for “no results” / empty filtered lists (any dashboard table). */
export function TableEmptyState({
  title,
  description,
  className = "",
}: TableEmptyStateProps) {
  return (
    <div
      className={`rounded-[16px] border border-dashed border-[#cbd5e1] bg-[#f8fafc] px-6 py-16 text-center ${className}`}
      role="status"
    >
      <p className="text-sm font-semibold text-[#475569]">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#64748b]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
