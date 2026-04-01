"use client";

import Link from "next/link";
import {
  Cpu,
  FileText,
  Image,
  Images,
  LayoutDashboard,
  LifeBuoy,
  ListTodo,
  MessageSquare,
  Plus,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navItems: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Posts", href: "/dashboard/posts", icon: FileText },
  { label: "Comments", href: "/dashboard/comments", icon: MessageSquare },
  { label: "Albums", href: "/dashboard/albums", icon: Images },
  { label: "Photos", href: "/dashboard/photos", icon: Image },
  { label: "Todos", href: "/dashboard/todos", icon: ListTodo },
];

function navItemIsActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Brand() {
  return (
    <div className="border-b border-[#1e293b] px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-[#2563eb]">
          <Cpu className="h-4 w-4 text-white" strokeWidth={2} aria-hidden />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-white">
            GraphQLZero
          </p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
            Admin Console
          </p>
        </div>
      </div>
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="mt-auto border-t border-[#1e293b] px-4 pb-5 pt-4">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b57d0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a4dc0]"
      >
        <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
        New Request
      </button>
      <div className="mt-3 space-y-1 px-1">
        <Link
          href="#"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#7f95ad] transition hover:bg-[#1e293b]/60 hover:text-white"
        >
          <Settings className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          Settings
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#7f95ad] transition hover:bg-[#1e293b]/60 hover:text-white"
        >
          <LifeBuoy className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          Support
        </Link>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[260px] flex-col bg-[#0F172A]">
      <Brand />
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navItems.map((item) => {
          const active = navItemIsActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#1E293B] text-white"
                  : "text-[#94a3b8] hover:bg-[#1e293b]/60 hover:text-white"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-[#94a3b8]"}`}
                strokeWidth={1.5}
                aria-hidden
              />
              <span>{item.label}</span>
              {active ? (
                <span
                  className="absolute right-0 top-1/2 h-[60%] w-[3px] -translate-y-1/2 rounded-l-sm bg-[#2563eb]"
                  aria-hidden
                />
              ) : null}
            </Link>
          );
        })}
      </nav>
      <SidebarFooter />
    </aside>
  );
}
