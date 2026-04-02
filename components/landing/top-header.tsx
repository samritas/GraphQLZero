import Link from "next/link";

import { Brand } from "@/components/brand";

const navItems = ["Docs", "Schema", "Examples", "Playground"];

export function TopHeader() {
  return (
    <header className="border-b border-[#d9dee7] bg-[#F7F9FBCC]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1500px] items-center justify-between px-6 md:px-10 lg:px-14">
        <Brand priority />
        <nav className="hidden items-center gap-12 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[15px] font-medium text-slate-600 transition hover:text-slate-800"
            >
              {item}
            </a>
          ))}
        </nav>
        <Link
          href="/dashboard/posts"
          className="rounded-md bg-[#0b57d0] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_2px_4px_rgba(11,87,208,0.3)] transition hover:bg-[#0a4dc0]"
        >
          Go to Dashboard
        </Link>
      </div>
    </header>
  );
}
