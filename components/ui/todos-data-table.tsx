"use client";

import { Fragment } from "react";
import { FilePenLine } from "lucide-react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { TodoStatusToggle } from "@/components/ui/todo-status-toggle";
import type { TodoRecord } from "@/graphql/queries/todos";
import { TODOS_TABLE_GRID, TODOS_TABLE_HEADERS } from "@/lib/constants";

export type TodosDataTableProps = {
  rows: TodoRecord[];
  totalCount: number | null;
  page: number;
  pageSize: number;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextSize: number) => void;
};

export function TodosDataTable({
  rows,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: TodosDataTableProps) {
  return (
    <>
      <div
        className="hidden bg-[#eef2f6] px-4 py-4 md:grid md:px-8"
        style={{ gridTemplateColumns: TODOS_TABLE_GRID }}
      >
        {TODOS_TABLE_HEADERS.map((h) => (
          <p
            key={h}
            className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]"
          >
            {h}
          </p>
        ))}
      </div>

      <div className="border-b border-[#edf2f7] bg-[#eef2f6] px-4 py-3 md:hidden">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
          Todos
        </p>
      </div>

      {rows.map((row, idx) => {
        const done = row.completed;
        const statusLabel = done ? "Completed" : "Pending";
        const userId = row.user?.id ?? "—";
        const userBadge = userId === "—" ? "—" : `UID-${userId}`;
        const n = Number.parseInt(String(row.id), 10);
        const idLabel = Number.isFinite(n)
          ? `#${String(n).padStart(3, "0")}`
          : `#${String(row.id).padStart(3, "0")}`;
        const isLast = idx === rows.length - 1;

        return (
          <Fragment key={row.id}>
            <div
              className={`hidden items-start px-4 py-4 md:grid md:px-8 ${
                isLast ? "" : "border-b border-[#edf2f7]"
              }`}
              style={{ gridTemplateColumns: TODOS_TABLE_GRID }}
            >
              <p className="shrink-0 pt-0.5 text-[12px] font-semibold text-[#2563eb]">
                {idLabel}
              </p>
              <div className="min-w-0 overflow-hidden pr-2">
                <p className="break-words text-[14px] font-semibold leading-snug text-[#374151]">
                  {row.title}
                </p>
              </div>
              <span className="inline-flex w-fit shrink-0 rounded-md bg-[#eef2f6] px-2 py-0.5 text-[11px] font-semibold text-[#4b5563]">
                {userBadge}
              </span>
              <div className="flex items-center gap-2 pt-0.5">
                <TodoStatusToggle done={done} />
                <span
                  className={`text-[12px] font-medium ${
                    done ? "text-[#4b5563]" : "text-[#9ca3af]"
                  }`}
                >
                  {statusLabel}
                </span>
              </div>
              <button
                type="button"
                className="pt-0.5 text-[#6b7280] hover:text-[#374151]"
                aria-label="Edit"
              >
                <FilePenLine className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
            </div>

            <article className="border-b border-[#edf2f7] px-4 py-4 md:hidden">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[12px] font-semibold text-[#2563eb]">{idLabel}</p>
                <button
                  type="button"
                  className="-mr-1 -mt-1 shrink-0 rounded-lg p-2 text-[#6b7280] hover:bg-slate-100 hover:text-[#374151]"
                  aria-label="Edit"
                >
                  <FilePenLine className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
              </div>
              <p className="mt-2 break-words text-[14px] font-semibold leading-snug text-[#374151]">
                {row.title}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 gap-y-2">
                <span className="inline-flex w-fit rounded-md bg-[#eef2f6] px-2 py-0.5 text-[11px] font-semibold text-[#4b5563]">
                  {userBadge}
                </span>
                <div className="flex items-center gap-2">
                  <TodoStatusToggle done={done} />
                  <span
                    className={`text-[12px] font-medium ${
                      done ? "text-[#4b5563]" : "text-[#9ca3af]"
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
            </article>
          </Fragment>
        );
      })}

      <DataTablePagination
        page={page}
        pageSize={pageSize}
        rowCount={rows.length}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  );
}
