import Link from "next/link";
import { Bell, CircleHelp, Search } from "lucide-react";

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-[#e2e8f0] bg-white">
      <div className="flex h-[68px] items-center justify-between gap-6 px-6 lg:px-8">
        <div className="min-w-0 flex-1 max-w-xl">
          <label htmlFor="dashboard-search" className="sr-only">
            Search
          </label>
          <div className="flex items-center gap-3 rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2.5">
            <Search
              className="h-4 w-4 shrink-0 text-[#94a3b8]"
              strokeWidth={1.5}
              aria-hidden
            />
            <input
              id="dashboard-search"
              type="search"
              placeholder="Search across data architecture..."
              className="min-w-0 flex-1 bg-transparent text-sm text-[#334155] placeholder:text-[#94a3b8] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <Link
            href="#"
            className="text-sm font-medium text-[#475569] transition hover:text-[#0f172a]"
          >
            Docs
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-[#475569] transition hover:text-[#0f172a]"
          >
            API Status
          </Link>
          <button
            type="button"
            className="rounded-lg p-1.5 text-[#64748b] transition hover:bg-[#f1f5f9] hover:text-[#475569]"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="rounded-lg p-1.5 text-[#64748b] transition hover:bg-[#f1f5f9] hover:text-[#475569]"
            aria-label="Help"
          >
            <CircleHelp className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <span className="h-6 w-px shrink-0 bg-[#e2e8f0]" aria-hidden />
          <div
            className="h-8 w-8 shrink-0 rounded-full bg-[linear-gradient(145deg,#cbd5e1_0%,#64748b_100%)] ring-2 ring-white ring-offset-0"
            role="img"
            aria-label="Profile"
          />
        </div>
      </div>
    </header>
  );
}
