import Link from "next/link";
import type { ReactNode } from "react";

function MainButton({
  children,
  variant = "primary",
  href,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
}) {
  const base =
    "rounded-[10px] px-8 py-3.5 text-lg font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b57d0]/35";

  if (variant === "secondary") {
    const className = `${base} bg-[#d6dbe3] text-[#4f5f72] hover:bg-[#ccd2dc]`;
    return href ? (
      <Link href={href} className={className}>
        {children}
      </Link>
    ) : (
      <button type="button" className={className}>
        {children}
      </button>
    );
  }

  const className = `${base} bg-[#0b57d0] text-white shadow-[0_10px_24px_rgba(11,87,208,0.28)] hover:bg-[#0a4dc0]`;
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <button type="button" className={className}>
      {children}
    </button>
  );
}

function CodeWindow() {
  return (
    <div className="relative w-full max-w-[620px] rounded-[30px] bg-[#f7f8fb] px-8 pb-8 pt-6 shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e7bac5]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#c5d2e6]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#c9d8ed]" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-[88%] rounded bg-[#eef1f5]" />
        <div className="h-4 w-[62%] rounded bg-[#eef1f5]" />
        <div className="h-4 w-[95%] rounded bg-[#eef1f5]" />
      </div>
      <div className="my-4 h-px bg-[#e9edf3]" />
      <pre className="font-mono text-[14px] leading-7 text-[#1e5ccf]">
        {`query {
  user(id: 1) {
    name
    email
    posts {
      data {
        title
      }
    }
  }
}`}
      </pre>

      <div className="absolute -bottom-5 right-[-24px] flex items-center gap-3 rounded-2xl border border-[#ebeff4] bg-white px-5 py-3 shadow-[0_16px_30px_rgba(15,23,42,0.12)]">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#ebf2ff] text-[#0b57d0]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path d="M11 2L5 13h5l-1 9 10-14h-6l2-6z" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Response Time
          </p>
          <p className="text-[34px] font-bold leading-none text-slate-900">12ms</p>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <main className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-16 px-6 pb-24 pt-24 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:px-14">
      <section>
        <p className="mb-10 inline-block rounded bg-[#dce5fb] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0b57d0]">
          The Developer&apos;s Choice
        </p>
        <h1 className="max-w-[680px] text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#1f2937] md:text-5xl">
          The API for your <span className="text-[#0b57d0]">next big idea.</span>
        </h1>
        <p className="mt-8 max-w-[720px] text-lg leading-[1.5] text-[#5e6d82] md:text-xl">
          Access mock data for users, posts, comments, albums, photos, and todos
          through a powerful GraphQL endpoint. Zero setup, infinite scale.
        </p>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <MainButton href="/dashboard">Go to Dashboard</MainButton>
          <MainButton variant="secondary">Read Docs</MainButton>
        </div>
      </section>

      <section className="flex justify-end">
        <CodeWindow />
      </section>
    </main>
  );
}
