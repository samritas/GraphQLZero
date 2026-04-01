import Link from "next/link";

const navItems = ["Docs", "Schema", "Examples", "Playground"];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-7 w-7 place-items-center rounded-md bg-[#0b57d0] shadow-sm">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10v10H7z" />
          <path d="M12 7V3" />
          <path d="M12 21v-4" />
          <path d="M17 12h4" />
          <path d="M3 12h4" />
        </svg>
      </div>
      <span className="text-[20px] font-semibold tracking-[-0.01em] text-slate-800">
        GraphQLZero
      </span>
    </div>
  );
}

export function TopHeader() {
  return (
    <header className="border-b border-[#d9dee7] bg-[#eceff4]">
      <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between px-6 md:px-10 lg:px-14">
        <Brand />
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
          href="/dashboard"
          className="rounded-md bg-[#0b57d0] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_2px_4px_rgba(11,87,208,0.3)] transition hover:bg-[#0a4dc0]"
        >
          Go to Dashboard
        </Link>
      </div>
    </header>
  );
}
