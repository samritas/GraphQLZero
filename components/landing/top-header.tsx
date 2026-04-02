import Link from "next/link";
import Image from "next/image";

const navItems = ["Docs", "Schema", "Examples", "Playground"];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="GraphQLZero"
        width={32}
        height={32}
        className="h-8 w-8 rounded-md"
        priority
      />
      <span className="text-[20px] font-semibold tracking-[-0.01em] text-slate-800">
        GraphQLZero
      </span>
    </div>
  );
}

export function TopHeader() {
  return (
    <header className="border-b border-[#d9dee7] bg-[#F7F9FBCC]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1500px] items-center justify-between px-6 md:px-10 lg:px-14">
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
