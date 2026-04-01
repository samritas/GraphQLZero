"use client";

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
        className="grid bg-[#eef2f6] px-3 py-3.5"
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

      {rows.map((row, idx) => {
        const done = row.completed;
        const statusLabel = done ? "Completed" : "Pending";
        const userId = row.user?.id ?? "—";
        const userBadge = userId === "—" ? "—" : `UID-${userId}`;
        return (
          <div
            key={row.id}
            className={`grid items-center px-3 py-4 ${
              idx === rows.length - 1 ? "" : "border-b border-[#edf2f7]"
            }`}
            style={{ gridTemplateColumns: TODOS_TABLE_GRID }}
          >
            <p className="text-[12px] font-semibold text-[#2563eb]">{row.id}</p>
            <p className="min-w-0 text-[14px] font-semibold leading-[1.2] text-[#374151]">
              {row.title}
            </p>
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
            <button
              type="button"
              className="text-[#6b7280] hover:text-[#374151]"
              aria-label="Edit"
            >
              <FilePenLine className="h-3.5 w-3.5" strokeWidth={1.8} />
            </button>
          </div>
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
