import {
  ArrowDownUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Grid2x2,
  ImageIcon,
  Link2,
  List,
  ListFilter,
  MoreVertical,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";

type PhotoRow = {
  id: string;
  title: string;
  uploaded: string;
  url: string;
  albumId: string;
  tone: string;
};

const photoRows: PhotoRow[] = [
  {
    id: "#1001",
    title: "Structural Glass Minimalism",
    uploaded: "Uploaded 2h ago",
    url: "cdn.gqlz.io/p/1001.jpg",
    albumId: "ALB-42",
    tone: "from-[#6b7280] to-[#1f2937]",
  },
  {
    id: "#1002",
    title: "Urban Connectivity Study",
    uploaded: "Uploaded 5h ago",
    url: "cdn.gqlz.io/p/1002.jpg",
    albumId: "ALB-15",
    tone: "from-[#4b5563] to-[#111827]",
  },
  {
    id: "#1003",
    title: "Corporate Space Interior",
    uploaded: "Uploaded yesterday",
    url: "cdn.gqlz.io/p/1003.jpg",
    albumId: "ALB-42",
    tone: "from-[#9ca3af] to-[#374151]",
  },
  {
    id: "#1004",
    title: "Sustainable Dwelling Design",
    uploaded: "Uploaded yesterday",
    url: "cdn.gqlz.io/p/1004.jpg",
    albumId: "ALB-08",
    tone: "from-[#a1a1aa] to-[#52525b]",
  },
];

function TopStats() {
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_2.1fr]">
      <article className="min-h-[138px] rounded-lg border border-[#e5e7eb] bg-white px-5 py-5">
        <div className="flex items-start justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[#2563eb]">
            <ImageIcon className="h-4 w-4" strokeWidth={1.9} />
          </span>
          <span className="rounded bg-[#eafaf2] px-2 py-0.5 text-[11px] font-semibold text-[#0f9f63]">
            +12%
          </span>
        </div>
        <p className="mt-5 text-[30px] font-bold leading-none tracking-tight text-[#1f2937]">
          5,248
        </p>
        <p className="mt-1 text-sm text-[#6b7280]">Total Assets Indexed</p>
      </article>

      <article className="flex min-h-[138px] items-center rounded-lg border border-[#e5e7eb] bg-[#eef2f6] px-5 py-5">
        <div className="grid w-full grid-cols-4 items-center divide-x divide-[#e5e7eb]">
          <div className="pr-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
              Active Albums
            </p>
            <p className="mt-1 text-[30px] font-bold leading-none text-[#1f2937]">142</p>
          </div>
          <div className="px-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
              Storage Used
            </p>
            <p className="mt-1 text-[30px] font-bold leading-none text-[#1f2937]">24.8 GB</p>
          </div>
          <div className="px-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
              CDN Hits
            </p>
            <p className="mt-1 text-[30px] font-bold leading-none text-[#1f2937]">99.9%</p>
          </div>
          <div className="flex items-center justify-end pl-4">
            <div className="flex -space-x-2">
              {["#f2c6ae", "#f3d4be", "#c58c55"].map((c) => (
                <span
                  key={c}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f8fafc]"
                  style={{ backgroundColor: c }}
                />
              ))}
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f8fafc] bg-[#cbd5e1] text-[11px] font-semibold text-[#475569]">
                +4
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

const tableGrid =
  "grid grid-cols-[64px_52px_minmax(0,1.45fr)_minmax(0,1.15fr)_100px_40px]";

function PhotosTable() {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] bg-white px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 min-w-[140px] items-center justify-between rounded-lg border border-[#d1d5db] bg-white px-4 text-sm font-medium text-[#374151]"
          >
            All Albums
            <ChevronDown className="h-4 w-4 text-[#6b7280]" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="inline-flex h-10 min-w-[128px] items-center justify-between rounded-lg border border-[#d1d5db] bg-white px-4 text-sm font-medium text-[#374151]"
          >
            Sort by ID
            <ArrowDownUp className="h-3.5 w-3.5 text-[#6b7280]" strokeWidth={2} />
          </button>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]"
        >
          <ListFilter className="h-3.5 w-3.5" strokeWidth={2} />
          Advanced Filters
        </button>
      </div>

      <div className={`${tableGrid} bg-[#eef2f6] px-5 py-3.5`}>
        {(["ID", "Preview", "Title", "URL", "Album ID", "actions"] as const).map((h) => (
          <p
            key={h}
            className={`text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748b] ${h === "Album ID" || h === "actions" ? "text-center" : ""}`}
          >
            {h === "actions" ? "" : h}
          </p>
        ))}
      </div>

      {photoRows.map((row, idx) => (
        <div
          key={row.id}
          className={`${tableGrid} items-center px-5 py-4 ${
            idx === photoRows.length - 1 ? "" : "border-b border-[#f1f5f9]"
          }`}
        >
          <p className="text-sm font-normal text-[#9ca3af]">{row.id}</p>
          <span
            className={`h-9 w-9 rounded-md bg-gradient-to-br ${row.tone} grayscale`}
            aria-hidden
          />
          <div className="min-w-0 pr-2">
            <p className="text-sm font-bold leading-snug text-[#111827]">{row.title}</p>
            <p className="mt-0.5 text-xs leading-snug text-[#6b7280]">{row.uploaded}</p>
          </div>
          <a
            href="#"
            className="inline-flex min-w-0 items-center gap-1.5 truncate text-sm font-medium text-[#2563eb] hover:underline"
          >
            <Link2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            <span className="truncate">{row.url}</span>
          </a>
          <div className="flex justify-center">
            <span className="inline-flex rounded-full bg-[#e5e7eb] px-3 py-1 text-[11px] font-bold text-[#4b5563]">
              {row.albumId}
            </span>
          </div>
          <div className="flex justify-center">
            <button type="button" className="text-[#94a3b8] hover:text-[#64748b]" aria-label="Row actions">
              <MoreVertical className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f1f5f9] bg-white px-5 py-4">
        <p className="text-xs text-[#6b7280]">
          Showing <span className="font-medium text-[#374151]">1-4</span> of{" "}
          <span className="font-medium text-[#374151]">5,248</span> results
        </p>
        <div className="flex items-center gap-1">
          <button type="button" className="p-1.5 text-[#cbd5e1]" aria-label="First page">
            <ChevronsLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button type="button" className="p-1.5 text-[#cbd5e1]" aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="mx-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-[#2563eb] text-xs font-bold text-white shadow-sm"
          >
            1
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-[#4b5563] hover:bg-[#f8fafc]">
            2
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-[#4b5563] hover:bg-[#f8fafc]">
            3
          </button>
          <span className="px-1 text-xs text-[#9ca3af]">...</span>
          <button type="button" className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-[#4b5563] hover:bg-[#f8fafc]">
            132
          </button>
          <button type="button" className="p-1.5 text-[#374151]" aria-label="Next page">
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
          <button type="button" className="p-1.5 text-[#374151]" aria-label="Last page">
            <ChevronsRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PhotosOverview() {
  return (
    <section className="px-6 py-8 lg:px-8">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6b7280]">
            Dashboard <span className="mx-1">›</span> Photos
          </p>
          <h1 className="font-title mt-2 text-[30px] font-bold leading-tight tracking-tight text-[#2A3439]">
            Image Library
          </h1>
          <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-[#64748b]">
            Manage your application's visual assets across all albums. Filter by ID or album to
            optimize data retrieval.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <div className="flex items-center gap-1 rounded-md bg-[#f1f5f9] p-1">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded bg-white text-[#0b57d0] shadow-sm"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded text-[#64748b]"
            >
              <Grid2x2 className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-[#0b57d0] px-6 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(11,87,208,0.28)]"
          >
            <Upload className="h-3.5 w-3.5" />
            Upload Photo
          </button>
        </div>
      </div>

      <TopStats />

      <PhotosTable />
      <section className="mt-6 rounded-2xl border border-[#e8edf3] bg-[#f8fafc] px-6 py-5">
        <div className="flex items-start gap-5">
          <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0b57d0] text-white shadow-[0_10px_20px_rgba(11,87,208,0.28)]">
            <Sparkles className="h-7 w-7" strokeWidth={1.9} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="text-[24px] font-bold leading-tight text-[#1f2937]">
                API Integration Tip
              </h3>
              <button
                type="button"
                className="inline-flex h-10 items-center rounded-lg border border-[#d1d5db] bg-white px-4 text-[10px] font-bold uppercase tracking-[0.08em] text-[#374151]"
              >
                Open Schema
              </button>
            </div>
            <p className="mt-2 text-sm leading-[1.5] text-[#6b7280]">
              You can fetch these photos programmatically using Graphé L queries. Filter by{" "}
              <code className="rounded bg-[#e5e7eb] px-1.5 py-0.5 text-[13px] text-[#4b5563]">
                albumId
              </code>{" "}
              to optimize payload sizes for mobile clients. Use our schema explorer to test
              complex fragments.
            </p>
          </div>
        </div>
      </section>
      <button
        type="button"
        className="fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b57d0] text-white shadow-lg"
        aria-label="Open collaborators"
      >
        <Users className="h-4.5 w-4.5" />
      </button>
    </section>
  );
}
