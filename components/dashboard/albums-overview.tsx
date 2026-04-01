import Image from "next/image";

function SortFilterIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function CollectionIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="5" width="16" height="14" rx="2.5" />
      <path d="m8 14 2.5-2.5L13 14l3-3" />
    </svg>
  );
}

type AlbumRow = {
  id: string;
  preview: [string, string];
  title: string;
  meta: string;
  owner: string;
  initials: string;
  initialsBg: string;
  initialsColor: string;
  quantity: string;
};

const albumRows: AlbumRow[] = [
  {
    id: "#001",
    preview: ["#0ea5e9", "#164e63"],
    title: "quidem molestiae enim",
    meta: "Created 2 days ago",
    owner: "Leanne Graham",
    initials: "LT",
    initialsBg: "#dbeafe",
    initialsColor: "#1d4ed8",
    quantity: "50",
  },
  {
    id: "#002",
    preview: ["#f59e0b", "#0f172a"],
    title: "sunt qui excepturi placeat omnis",
    meta: "Updated 5 hours ago",
    owner: "Ervin Howell",
    initials: "ER",
    initialsBg: "#e9d5ff",
    initialsColor: "#6d28d9",
    quantity: "124",
  },
  {
    id: "#003",
    preview: ["#0ea5e9", "#1e293b"],
    title: "omnis laborum odio",
    meta: "Created last week",
    owner: "Clementine Bauch",
    initials: "CB",
    initialsBg: "#dbeafe",
    initialsColor: "#1e40af",
    quantity: "32",
  },
  {
    id: "#004",
    preview: ["#0f172a", "#b45309"],
    title: "non esse culpa molestiae omnis sed optio",
    meta: "Created 1 month ago",
    owner: "Patricia Lebsack",
    initials: "PA",
    initialsBg: "#e9d5ff",
    initialsColor: "#6d28d9",
    quantity: "218",
  },
];

function AlbumsStatCard({
  label,
  value,
  detail,
  detailTone = "blue",
  labelBlue = false,
  valueBlue = false,
  progressBeside,
}: {
  label: string;
  value: string;
  detail?: string;
  detailTone?: "blue" | "muted";
  labelBlue?: boolean;
  valueBlue?: boolean;
  progressBeside?: number;
}) {
  const labelClass = labelBlue
    ? "text-[10px] font-bold uppercase tracking-[0.12em] text-[#0b57d0]"
    : "text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ca3af]";

  const valueClass = valueBlue
    ? "text-[32px] font-bold leading-none tracking-tight text-[#0b57d0]"
    : "text-[32px] font-bold leading-none tracking-tight text-[#111827]";

  const detailClass =
    detailTone === "muted"
      ? "text-sm font-medium text-[#9ca3af]"
      : "text-sm font-semibold text-[#0b57d0]";

  if (typeof progressBeside === "number") {
    return (
      <article className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-5">
        <p className={labelClass}>{label}</p>
        <div className="mt-3 flex items-center gap-4">
          <p className={valueClass}>{value}</p>
          <div className="h-2 min-w-0 flex-1 rounded-full bg-[#e5e7eb]">
            <span
              className="block h-full rounded-full bg-[#0b57d0]"
              style={{ width: `${progressBeside}%` }}
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-5">
      <p className={labelClass}>{label}</p>
      <div className="mt-3 flex flex-wrap items-baseline gap-2">
        <p className={valueClass}>{value}</p>
        {detail ? <span className={detailClass}>{detail}</span> : null}
      </div>
    </article>
  );
}

function AlbumPreview({ palette }: { palette: [string, string] }) {
  return (
    <div className="relative h-10 w-[68px] overflow-hidden rounded-lg border border-[#dbe3ee] bg-[#e2e8f0]">
      <span
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          background: `linear-gradient(135deg, ${palette[0]} 0%, #0f172a 100%)`,
        }}
      />
      <span
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          background: `linear-gradient(135deg, ${palette[1]} 0%, #111827 100%)`,
        }}
      />
      <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full border border-white bg-white/60" />
    </div>
  );
}

function AlbumsTable() {
  return (
    <div className="mt-6 overflow-hidden rounded-[28px] border border-[#dbe3ee] bg-[#eef2f6] shadow-sm">
      <div className="grid grid-cols-[78px_120px_minmax(0,1.8fr)_minmax(0,1.3fr)_88px_90px] bg-[#e8edf3] px-6 py-4">
        {["ID", "Preview", "Album Title", "Owner / User", "Quantity", "Actions"].map(
          (header) => (
            <p
              key={header}
              className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]"
            >
              {header}
            </p>
          ),
        )}
      </div>

      {albumRows.map((row, index) => (
        <div
          key={row.id}
          className={`grid grid-cols-[78px_120px_minmax(0,1.8fr)_minmax(0,1.3fr)_88px_90px] items-center bg-white px-6 py-5 ${
            index === albumRows.length - 1 ? "" : "border-b border-[#e2e8f0]"
          }`}
        >
          <p className="text-xs font-semibold text-[#64748b]">{row.id}</p>
          <AlbumPreview palette={row.preview} />
          <div className="pr-4">
            <p className="text-[15px] font-bold leading-[1.2] tracking-tight text-[#1f2937]">
              {row.title}
            </p>
            <p className="mt-1 text-[13px] text-[#6b7280]">{row.meta}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold"
              style={{
                backgroundColor: row.initialsBg,
                color: row.initialsColor,
              }}
            >
              {row.initials}
            </span>
            <p className="text-sm font-semibold leading-tight text-[#1f2937]">
              {row.owner}
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#dbeafe] px-2.5 py-1 text-xs font-semibold text-[#1d4ed8]">
            <CollectionIcon className="h-3.5 w-3.5" />
            {row.quantity}
          </span>
          <button
            type="button"
            className="text-center text-lg font-bold text-[#94a3b8]"
            aria-label="More actions"
          >
            ⋮
          </button>
        </div>
      ))}

      <div className="flex items-center justify-between border-t border-[#dbe3ee] bg-[#f3f6fa] px-6 py-4">
        <p className="text-sm text-[#6b7280]">Showing 1 to 4 of 1,248 albums</p>
        <div className="flex items-center gap-2">
          <button type="button" className="px-2 text-[#94a3b8]">
            ‹
          </button>
          <button
            type="button"
            className="h-9 w-9 rounded-lg bg-[#0b57d0] text-base font-bold text-white shadow-sm"
          >
            1
          </button>
          <button type="button" className="h-9 w-9 text-base font-semibold text-[#4b5563]">
            2
          </button>
          <button type="button" className="h-9 w-9 text-base font-semibold text-[#4b5563]">
            3
          </button>
          <span className="px-2 text-[20px] text-[#9ca3af]">...</span>
          <button type="button" className="h-9 w-9 text-base font-semibold text-[#4b5563]">
            125
          </button>
          <button type="button" className="px-2 text-[#6b7280]">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

const galleryImages = {
  architecture:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  interior:
    "https://images.unsplash.com/photo-1618221195716-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
  pool:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a8?auto=format&fit=crop&w=600&q=80",
  kitchen:
    "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=900&q=80",
} as const;

function RecentGalleryActivity() {
  return (
    <section className="mt-8" aria-labelledby="recent-gallery-heading">
      <h2
        id="recent-gallery-heading"
        className="mb-6 text-xl font-bold tracking-tight text-[#111827]"
      >
        Recent Gallery Activity
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)] lg:items-stretch">
        <article className="relative min-h-[200px] overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5 lg:min-h-[240px]">
          <Image
            src={galleryImages.architecture}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 28vw"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pt-20 pb-5 pl-5 pr-5">
            <p className="text-lg font-bold text-white">Architecture Weekly</p>
            <p className="mt-1 text-sm font-medium text-white/75">
              Curated by Leanne Graham
            </p>
          </div>
        </article>

        <article className="relative min-h-[220px] overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5 sm:min-h-[260px] lg:min-h-[240px]">
          <Image
            src={galleryImages.interior}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 14vw"
          />
        </article>

        <article className="relative min-h-[220px] overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5 sm:min-h-[260px] lg:min-h-[240px]">
          <Image
            src={galleryImages.pool}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 14vw"
          />
        </article>

        <article className="relative min-h-[200px] overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5 lg:min-h-[240px]">
          <Image
            src={galleryImages.kitchen}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 28vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pt-20 pb-5 pl-5 pr-5">
            <p className="text-lg font-bold text-white">Interiors Collective</p>
            <p className="mt-1 text-sm font-medium text-white/75">
              Updated 12 mins ago
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function AlbumsOverview() {
  return (
    <section className="px-6 py-8 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-title text-[30px] font-bold leading-tight tracking-tight text-[#2A3439]">
            Albums
          </h1>
          <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-[#64748b]">
            Curating 1,248 digital collections across the Graphé LZero ecosystem.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 sm:pt-0">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-[13px] font-semibold text-[#374151] shadow-sm"
          >
            <SortFilterIcon className="h-4 w-4 text-[#6b7280]" />
            Sort &amp; Filter
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#2563eb] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
          >
            <span className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border border-white/90 text-[14px] font-normal leading-none">
              +
            </span>
            Create Album
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AlbumsStatCard label="Total Collections" value="1,248" detail="+12%" />
        <AlbumsStatCard label="Total Photos" value="42.5k" detail="↑ 3k" />
        <AlbumsStatCard
          label="Active Curators"
          value="89"
          detail="Real-time"
          detailTone="muted"
        />
        <AlbumsStatCard
          label="Storage Used"
          value="84%"
          labelBlue
          valueBlue
          progressBeside={84}
        />
      </div>

      <AlbumsTable />
      <RecentGalleryActivity />
    </section>
  );
}
