"use client";

import { Filter, Printer } from "lucide-react";
import { USERS_ROLE_TABS } from "@/lib/constants";
import type { UsersRoleFilter } from "@/graphql/queries/users";

export type UsersFiltersToolbarProps = {
  advancedOpen: boolean;
  onToggleAdvanced: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roleFilter: UsersRoleFilter;
  onRoleChange: (role: UsersRoleFilter) => void;
};

export function UsersFiltersToolbar({
  advancedOpen,
  onToggleAdvanced,
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
}: UsersFiltersToolbarProps) {
  return (
    <div className="mt-8 rounded-lg bg-[#f1f5f9] px-2 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <button
            type="button"
            aria-expanded={advancedOpen}
            onClick={onToggleAdvanced}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] font-semibold transition-colors ${
              advancedOpen
                ? "border-[#0053DB] bg-white text-[#0053DB]"
                : "border-[#e5e7eb] bg-white text-[#374151]"
            }`}
          >
            <Filter className="h-3 w-3" strokeWidth={1.75} />
            Advanced Filters
          </button>
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Curator role">
            {USERS_ROLE_TABS.map(({ id, label }) => {
              const selected = roleFilter === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => onRoleChange(id)}
                  className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.06em] transition-colors ${
                    selected ? "bg-[#dbeafe] text-[#0053DB]" : "bg-[#dbe3ea] text-[#64748b] hover:bg-[#d1dae3]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#6b7280]">Export:</span>
          <button
            type="button"
            className="rounded border border-[#cbd5e1] bg-white px-1.5 py-0.5 text-[8px] font-bold text-[#6b7280]"
          >
            CSV
          </button>
          <button type="button" className="text-[#4b5563]" aria-label="Print table">
            <Printer className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
      {advancedOpen ? (
        <div className="mt-3 border-t border-[#e2e8f0] pt-3">
          <label
            htmlFor="users-directory-search"
            className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748b]"
          >
            Search directory
          </label>
          <input
            id="users-directory-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Name, email, username, company, city…"
            autoComplete="off"
            className="w-full max-w-md rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] text-[#1f2937] shadow-sm outline-none placeholder:text-[#94a3b8] focus:border-[#93c5fd] focus:ring-2 focus:ring-[#0053DB]/20"
          />
        </div>
      ) : null}
    </div>
  );
}
