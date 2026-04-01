import { ChevronDown, ChevronRight, MessageSquare } from "lucide-react";

type CommentRow = {
  id: string;
  author: string;
  email: string;
  excerpt: string;
  expanded?: boolean;
};

const commentRows: CommentRow[] = [
  {
    id: "#1001",
    author: "Eliseo",
    email: "eliseo@gardner.biz",
    excerpt: "laudantium enim quasi est quidem mag...",
    expanded: true,
  },
  {
    id: "#1002",
    author: "Jayne Kuhic",
    email: "jayne_kuhic@sydney.com",
    excerpt: "est natus enim nihil est dolore omnis v...",
  },
  {
    id: "#1003",
    author: "Nikita",
    email: "nikita@garfield.biz",
    excerpt: "quia molestiae reprehenderit quasi asp...",
  },
  {
    id: "#1004",
    author: "Lew",
    email: "lew@alysha.tv",
    excerpt: "non et expedita unde itaque eos volupt...",
  },
  {
    id: "#1005",
    author: "Hayden",
    email: "hayden@althea.biz",
    excerpt: "harum non quasi et ratione tempore iur...",
  },
];

function FiltersRail() {
  return (
    <aside className="rounded-xl bg-[#f8fafc] p-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
          Post Association
        </p>
        <button
          type="button"
          className="mt-3 flex h-11 w-full items-center justify-between rounded-md border border-[#e5e7eb] bg-[#eef2f6] px-3 text-sm text-[#374151]"
        >
          <span>All Post IDs</span>
          <ChevronDown className="h-4 w-4 text-[#6b7280]" strokeWidth={1.75} />
        </button>
      </div>

      <div className="mt-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
          Date Range
        </p>
        <div className="mt-3 space-y-2">
          <button
            type="button"
            className="h-11 w-full rounded-md border border-[#e5e7eb] bg-[#eef2f6] px-3 text-left text-sm text-[#374151]"
          >
            Last 24 Hours
          </button>
          <button
            type="button"
            className="h-11 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-left text-sm text-[#4b5563]"
          >
            Last 7 Days
          </button>
          <button
            type="button"
            className="h-11 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-left text-sm text-[#4b5563]"
          >
            Custom Range
          </button>
        </div>
      </div>

      <div className="mt-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
          Quick Stats
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <article className="rounded-md border border-[#dbe3ee] bg-[#e9eff8] px-3 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0b57d0]">
              Avg/Day
            </p>
            <p className="mt-1 text-[31px] font-bold leading-none text-[#0b57d0]">42.8</p>
          </article>
          <article className="rounded-md border border-[#dbe3ee] bg-[#edf2f8] px-3 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
              Sentiment
            </p>
            <p className="mt-1 text-[31px] font-bold leading-none text-[#374151]">92%</p>
          </article>
        </div>
      </div>

      <article className="relative mt-5 overflow-hidden rounded-[10px] bg-[radial-gradient(circle_at_82%_22%,#10284f_0%,#071322_48%,#050b13_100%)] px-6 py-6">
        <h3 className="text-[30px] font-bold leading-[1.04] tracking-tight text-white">
          Need a custom query?
        </h3>
        <p className="mt-3 max-w-[210px] text-[16px] leading-[1.45] text-[#94a3b8]">
          Use the GraphQL Explorer to build complex filters on comments.
        </p>
        <button
          type="button"
          className="mt-5 text-[18px] font-semibold text-[#dbe6ff] transition hover:text-white"
        >
          Open Explorer →
        </button>
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-8 right-3 text-[170px] font-black leading-none text-white/10"
        >
          {"}"}
        </span>
      </article>
    </aside>
  );
}

function ExpandedMessageRow() {
  return (
    <div className="mx-4 mb-4 rounded-md border border-[#dbe3ee] bg-white px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8effa]">
          <MessageSquare className="h-4 w-4 text-[#2563eb]" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#2563eb]">
            Full Message Body
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#374151]">
            "Laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo
            necessitatibus autem quasi reiciendis et nam sapiente accusantium."
          </p>
          <div className="mt-3 flex items-center gap-4">
            <button type="button" className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#2563eb]">
              Approve
            </button>
            <button type="button" className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#dc2626]">
              Delete
            </button>
            <button type="button" className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#6b7280]">
              Mark as Spam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#dbe3ee] bg-[#f8fafc]">
      <div className="grid grid-cols-[90px_1fr_1.3fr_1.7fr] bg-[#eef2f6] px-4 py-4">
        {["ID", "Author", "Email Address", "Excerpt"].map((label) => (
          <p key={label} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
            {label}
          </p>
        ))}
      </div>

      {commentRows.map((row, index) => (
        <div key={row.id} className={`${index === commentRows.length - 1 ? "" : "border-b border-[#e5e7eb]"} bg-white`}>
          <div className="grid grid-cols-[90px_1fr_1.3fr_1.7fr] items-center px-4 py-5">
            <p className="text-sm text-[#9ca3af]">{row.id}</p>
            <p className="text-sm font-semibold text-[#2b313c]">
              {row.author.includes(" ") ? (
                <>
                  {row.author.split(" ")[0]}
                  <br />
                  {row.author.split(" ").slice(1).join(" ")}
                </>
              ) : (
                row.author
              )}
            </p>
            <p className="text-sm text-[#0b57d0]">{row.email}</p>
            <p className="text-sm text-[#4b5563]">{row.excerpt}</p>
          </div>
          {row.expanded ? <ExpandedMessageRow /> : null}
        </div>
      ))}

      <div className="flex items-center justify-between border-t border-[#e5e7eb] bg-white px-4 py-4">
        <p className="text-sm text-[#4b5563]">Showing 1 - 5 of 500 comments</p>
        <div className="flex items-center gap-2">
          <button type="button" className="px-1 text-[#c4cbd6]">
            <ChevronRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            className="h-8 w-8 rounded-md bg-[#0b57d0] text-sm font-bold text-white"
          >
            1
          </button>
          <button type="button" className="h-8 w-8 text-sm font-semibold text-[#4b5563]">
            2
          </button>
          <button type="button" className="h-8 w-8 text-sm font-semibold text-[#4b5563]">
            3
          </button>
          <span className="px-1 text-[#9ca3af]">...</span>
          <button type="button" className="h-8 w-8 text-sm font-semibold text-[#4b5563]">
            100
          </button>
          <button type="button" className="px-1 text-[#4b5563]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CommentsOverview() {
  return (
    <section className="px-6 py-8 lg:px-8">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-[40px] font-bold leading-[1.05] tracking-tight text-[#1f2937]">
            Comments <span className="text-[28px] font-semibold text-[#0b57d0]">/ 500 total</span>
          </h1>
          <p className="mt-2 text-[16px] leading-[1.45] text-[#4b5563]">
            Manage and curate community feedback across all editorial posts.
            <br />
            Utilize inline inspection for content moderation.
          </p>
        </div>
        <div className="mt-1 flex items-center rounded-md bg-[#f3f6fa] p-1">
          <button
            type="button"
            className="rounded bg-white px-4 py-2 text-[12px] font-bold text-[#0b57d0] shadow-sm"
          >
            All
          </button>
          <button
            type="button"
            className="rounded px-4 py-2 text-[12px] font-semibold text-[#6b7280]"
          >
            Unread
          </button>
          <button
            type="button"
            className="rounded px-4 py-2 text-[12px] font-semibold text-[#6b7280]"
          >
            Flagged
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <FiltersRail />
        <CommentsTable />
      </div>
    </section>
  );
}
