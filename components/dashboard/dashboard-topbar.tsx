"use client";

import Link from "next/link";
import { Bell, CircleHelp, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";

function DashboardSearchInput() {
  const [placeholder, setPlaceholder] = useState("Search…");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () =>
      setPlaceholder(
        mq.matches ? "Search across data architecture..." : "Search…",
      );
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <input
      id="dashboard-search"
      type="search"
      placeholder={placeholder}
      title="Search across data architecture"
      className="min-w-0 flex-1 bg-transparent text-sm text-[#334155] placeholder:text-[#94a3b8] focus:outline-none"
    />
  );
}

export function DashboardTopbar({
  onMenuClick,
  mobileNavOpen = false,
}: {
  onMenuClick?: () => void;
  mobileNavOpen?: boolean;
} = {}) {
  return (
    <header className="sticky top-0 z-10 shrink-0 border-b border-[#e2e8f0] bg-[#F0F4F7] min-h-14 py-2 lg:h-16 lg:min-h-0 lg:py-0">
      <div className="flex w-full min-w-0 items-center gap-3 px-3 sm:gap-6 sm:px-5 lg:h-full lg:justify-between lg:px-7">
        {onMenuClick ? (
          <button
            type="button"
            onClick={onMenuClick}
            className="-ml-1 inline-flex shrink-0 items-center justify-center rounded-lg p-2 text-[#475569] transition hover:bg-[#f1f5f9] hover:text-[#0f172a] lg:hidden"
            aria-label="Open navigation menu"
            aria-controls="dashboard-sidebar"
            aria-expanded={mobileNavOpen}
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </button>
        ) : null}

        {/* Original: w-full max-w-[384px] sm:w-[384px]; flex-1 only when &lt; sm for narrow phones */}
        <div className="w-full min-w-0 max-w-[384px] shrink-0 flex-1 sm:w-[384px] sm:flex-none">
          <label htmlFor="dashboard-search" className="sr-only">
            Search
          </label>
          <div className="flex h-10 items-center gap-2 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2 lg:h-[52px] lg:gap-3 lg:px-3">
            <Search
              className="h-4 w-4 shrink-0 text-[#94a3b8]"
              strokeWidth={1.5}
              aria-hidden
            />
            <DashboardSearchInput />
          </div>
        </div>

        {/* < lg: compact actions */}
        <nav
          className="flex min-w-0 shrink-0 items-center gap-1 sm:gap-2 md:gap-4 lg:hidden"
          aria-label="Top bar actions"
        >
          <div className="hidden items-center gap-4 md:flex md:gap-5">
            <Link
              href="#"
              className="whitespace-nowrap text-sm font-medium text-[#475569] transition hover:text-[#0f172a]"
            >
              Docs
            </Link>
            <Link
              href="#"
              className="whitespace-nowrap text-sm font-medium text-[#475569] transition hover:text-[#0f172a]"
            >
              API Status
            </Link>
          </div>
          <button
            type="button"
            className="rounded-lg p-1.5 text-[#64748b] transition hover:bg-[#f1f5f9] hover:text-[#475569] sm:p-2"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="rounded-lg p-1.5 text-[#64748b] transition hover:bg-[#f1f5f9] hover:text-[#475569] sm:p-2"
            aria-label="Help"
          >
            <CircleHelp className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.5} />
          </button>
          <span
            className="mx-0.5 hidden h-6 w-px shrink-0 bg-[#e2e8f0] sm:mx-1 sm:inline-block"
            aria-hidden
          />
          <div
            className="h-8 w-8 shrink-0 rounded-full bg-[linear-gradient(145deg,#cbd5e1_0%,#64748b_100%)] ring-2 ring-white ring-offset-0 sm:h-9 sm:w-9"
            role="img"
            aria-label="Profile"
          />
        </nav>

        {/* lg+: original layout — gap-5, 18px icons, 8×8 avatar, divider always */}
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
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
