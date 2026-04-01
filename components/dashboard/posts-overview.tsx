import { Database, Filter, LayoutGrid, Table, TrendingUp } from "lucide-react";

function ViewToggle() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center rounded-lg border border-[#e2e8f0] bg-white p-0.5 shadow-sm">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#2563eb] bg-[#eff6ff] px-3 py-1.5 text-xs font-semibold text-[#2563eb]"
        >
          <Table className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          Table View
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
        >
          <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          Grid View
        </button>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#64748b] shadow-sm transition hover:bg-[#f8fafc]"
      >
        <Filter className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        Filters
      </button>
    </div>
  );
}

function FiltersCard() {
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748b]">
            Title Query
          </p>
          <input
            readOnly
            value="Search post titles..."
            className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#64748b]"
          />
        </label>
        <label className="block">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748b]">
            Author Entity
          </p>
          <div className="flex items-center justify-between rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#334155]">
            <span>All Users</span>
            <span className="text-[#94a3b8]">⌄</span>
          </div>
        </label>
      </div>
    </div>
  );
}

function DatabaseWatermark() {
  return (
    <Database
      aria-hidden
      className="absolute right-3 top-1/2 h-20 w-24 -translate-y-1/2 opacity-[0.12] text-[#1e40af]"
      strokeWidth={1.15}
    />
  );
}

function StatsCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#c7d2fe]/60 bg-[#eef2ff] p-5 shadow-sm">
      <DatabaseWatermark />
      <p className="relative text-[10px] font-bold uppercase tracking-[0.1em] text-[#4338ca]">
        Total Records
      </p>
      <p className="relative mt-1 text-4xl font-bold tracking-tight text-[#1e3a8a]">
        1,248
      </p>
      <p className="relative mt-1 text-xs font-medium text-[#4f46e5]">
        +12% from last node sync
      </p>
    </div>
  );
}

type Row = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  email: string;
  initials: string;
  initialsBg: string;
  initialsColor: string;
  interactions: string;
  tags?: string[];
  showPreview?: boolean;
  active?: boolean;
  tone?: "tinted" | "white";
};

const rows: Row[] = [
  {
    id: "#001",
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    excerpt:
      "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas...",
    author: "Leanne Graham",
    email: "Sincere@april.biz",
    initials: "LG",
    initialsBg: "#dbeafe",
    initialsColor: "#1d4ed8",
    interactions: "12",
    tags: ["FEATURED", "TECH"],
    tone: "tinted",
  },
  {
    id: "#002",
    title: "qui est esse",
    excerpt:
      "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate",
    author: "Ervin Howell",
    email: "Shanna@melissa.tv",
    initials: "EH",
    initialsBg: "#ede9fe",
    initialsColor: "#6d28d9",
    interactions: "8",
    showPreview: true,
    active: true,
    tone: "white",
  },
  {
    id: "#003",
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    excerpt:
      "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium...",
    author: "Leanne Graham",
    email: "Sincere@april.biz",
    initials: "LG",
    initialsBg: "#dbeafe",
    initialsColor: "#1d4ed8",
    interactions: "24",
    tone: "tinted",
  },
];

function TopCommentsPreview() {
  return (
    <div className="mt-4 max-w-[410px] rounded-lg bg-[#f1f5f9] p-3.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2563eb]">
        Top Comments Preview
      </p>
      <div className="mt-2 space-y-2.5">
        <div className="border-l-2 border-[#bfdbfe] pl-2">
          <p className="text-xs font-semibold text-[#1e293b]">id labore ex et quam laborum</p>
          <p className="text-[11px] text-[#64748b]">by Eliseo@gardner.biz</p>
        </div>
        <div className="border-l-2 border-[#bfdbfe] pl-2">
          <p className="text-xs font-semibold text-[#1e293b]">
            quo vero reiciendis velit similique earum
          </p>
          <p className="text-[11px] text-[#64748b]">by Jayne_Kuhic@sydney.com</p>
        </div>
      </div>
      <button
        type="button"
        className="mt-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#2563eb]"
      >
        View all 8 comments →
      </button>
    </div>
  );
}

function TableRow({ row, isLast = false }: { row: Row; isLast?: boolean }) {
  return (
    <div
      className={`grid grid-cols-[72px_minmax(0,1.6fr)_minmax(0,200px)_100px_100px] items-start px-5 py-6 ${
        row.tone === "tinted" ? "bg-[#f1f5f9]" : "bg-white"
      } ${
        isLast ? "" : "border-b border-[#e2e8f0]"
      }`}
    >
      <div className="pt-0.5 text-xs font-semibold text-[#60a5fa]">{row.id}</div>
      <div className="min-w-0 pr-4">
        <p className="text-[15px] font-bold leading-snug text-[#0f172a]">
          {row.title}
        </p>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#64748b]">
          {row.excerpt}
        </p>
        {row.tags && row.tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {row.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#475569]"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
        {row.showPreview ? <TopCommentsPreview /> : null}
      </div>
      <div className="flex min-w-0 items-start gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{
            backgroundColor: row.initialsBg,
            color: row.initialsColor,
          }}
        >
          {row.initials}
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="text-sm font-bold text-[#0f172a]">{row.author}</p>
          <p className="mt-0.5 text-[11px] text-[#64748b]">{row.email}</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-[#2563eb]">{row.interactions}</p>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
          Comments
        </p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2 pt-1 text-center">
        {row.active ? (
          <>
            <button
              type="button"
              className="rounded-lg bg-[#2563eb] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm hover:bg-[#1d4ed8]"
            >
              Edit Post
            </button>
            <button
              type="button"
              className="text-[10px] font-bold uppercase tracking-wide text-[#dc2626] hover:underline"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            type="button"
            className="text-lg font-bold leading-none text-[#64748b]"
            aria-label="More actions"
          >
            ⋮
          </button>
        )}
      </div>
    </div>
  );
}

function PaginationBar() {
  return (
    <div className="flex items-center justify-between border-t border-[#dbe3ee] bg-[#eef2f6] px-5 py-4 text-sm text-[#64748b]">
      <p>Showing 1 - 10 of 100 entries</p>
      <div className="flex items-center gap-2">
        <button type="button" className="px-2 text-[#94a3b8]">
          |&lt;
        </button>
        <button type="button" className="px-2 text-[#94a3b8]">
          &lt;
        </button>
        <button
          type="button"
          className="rounded-md border border-[#dbe3ee] bg-white px-3 py-1.5 text-xs font-semibold text-[#2563eb]"
        >
          1
        </button>
        <button type="button" className="px-2 text-xs font-semibold">
          2
        </button>
        <button type="button" className="px-2 text-xs font-semibold">
          3
        </button>
        <span className="px-2">...</span>
        <button type="button" className="px-2 text-xs font-semibold">
          10
        </button>
        <button type="button" className="px-2 text-[#334155]">
          &gt;
        </button>
        <button type="button" className="px-2 text-[#334155]">
          &gt;|
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <button
          type="button"
          className="rounded-md border border-[#dbe3ee] bg-white px-3 py-1 text-xs font-semibold text-[#334155]"
        >
          10
        </button>
      </div>
    </div>
  );
}

function PostsTable() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#dbe3ee] bg-[#eef2f6] shadow-sm">
      <div className="grid grid-cols-[72px_minmax(0,1.6fr)_minmax(0,200px)_100px_100px] bg-[#e4ebf1] px-5 py-3.5">
        {["ID", "Content Architecture", "Author", "Interactions", "Actions"].map(
          (label, i) => (
            <p
              key={label}
              className={`text-[10px] font-bold uppercase tracking-[0.1em] text-[#64748b] ${
                i >= 3 ? "text-center" : ""
              }`}
            >
              {label}
            </p>
          ),
        )}
      </div>
      {rows.map((row, index) => (
        <TableRow key={row.id} row={row} isLast={index === rows.length - 1} />
      ))}
      <PaginationBar />
    </div>
  );
}

function PostingFrequencyCard() {
  return (
    <article className="rounded-[18px] border border-[#dbe3ee] bg-[#f8fafc] p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold tracking-tight text-[#1f2937]">
          Posting Frequency
        </h3>
        <TrendingUp className="h-4 w-4 text-[#2563eb]" strokeWidth={2} aria-hidden />
      </div>

      <div className="mt-4 flex h-[90px] items-end gap-2 px-1">
        {[38, 62, 78, 54, 44, 68, 84].map((h, i) => (
          <span
            key={`${h}-${i}`}
            className={`w-[18px] rounded-[4px] ${
              i === 2 || i === 6 ? "bg-[#0b57d0]" : "bg-[#d3dbe5]"
            }`}
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
        Last 7 Node Updates
      </p>
    </article>
  );
}

function PerformanceStatusCard() {
  return (
    <article className="overflow-hidden rounded-[20px] border border-[#12233c] bg-[radial-gradient(circle_at_82%_28%,#0d2f69_0%,#071a31_34%,#050f1c_58%,#040b14_100%)] p-6 shadow-[0_14px_30px_rgba(2,6,23,0.45)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded bg-[#0b57d0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
            System Status
          </span>
          <h3 className="mt-4 max-w-[410px] text-[18px] font-bold leading-[1.2] tracking-tight text-[#e5edff]">
            API Performance is optimal at 99.8% uptime
          </h3>
          <p className="mt-4 max-w-[430px] text-[13px] leading-[1.5] text-[#8ea3c2]">
            The GraphQL resolver for Posts entity is responding with sub-200ms
            latency across global clusters.
          </p>
          <button
            type="button"
            className="mt-6 rounded-[9px] bg-[#26303a] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#eef4ff] transition hover:bg-[#313d49]"
          >
            Check Detailed Logs
          </button>
        </div>

        <div className="shrink-0 md:self-center">
          <div className="rounded-2xl border border-[#1d3457] bg-[#10253f]/78 p-3.5 shadow-xl backdrop-blur-[2px]">
            <div className="rounded-xl border border-dashed border-[#2f4e75] px-7 py-4 text-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mx-auto h-6 w-6 text-[#3b82f6]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M17 7h4v4" />
              </svg>
              <p className="mt-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8ea3c2]">
                Live Schema Stream
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function InsightsStrip() {
  return (
    <section className="mt-6 grid gap-3 lg:grid-cols-[1fr_2fr]">
      <PostingFrequencyCard />
      <PerformanceStatusCard />
    </section>
  );
}

export function PostsOverview() {
  return (
    <section className="px-6 py-8 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-[#0f172a]">
            Editorial Posts
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64748b]">
            Managing the foundational data nodes of GraphQLZero.
          </p>
        </div>
        <ViewToggle />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1.65fr_1fr]">
        <FiltersCard />
        <StatsCard />
      </div>

      <PostsTable />
      <InsightsStrip />
    </section>
  );
}
