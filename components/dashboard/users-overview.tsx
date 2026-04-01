import { BadgeCheck, Bot, ChevronLeft, ChevronRight, Filter, Globe, Mail, Phone, Printer, Sparkles, UserRoundPlus, Zap } from "lucide-react";

type CuratorRow = {
  id: string;
  name: string;
  subtitle: string;
  email: string;
  phone: string;
  website: string;
  affiliation: string;
  locale: string;
  posts: string;
  albums: string;
  avatarBg: string;
};

const curatorRows: CuratorRow[] = [
  {
    id: "#101",
    name: "Leanne Graham",
    subtitle: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031",
    website: "hildegard.org",
    affiliation: "Romaguera-Crona",
    locale: "Gwenborough",
    posts: "10",
    albums: "4",
    avatarBg: "from-[#f7d4c7] to-[#8b5e3b]",
  },
  {
    id: "#102",
    name: "Ervin Howell",
    subtitle: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593",
    website: "anastasia.net",
    affiliation: "Deckow-Crist",
    locale: "Wisokyburgh",
    posts: "12",
    albums: "8",
    avatarBg: "from-[#f6c85b] to-[#5a3a1f]",
  },
  {
    id: "#103",
    name: "Clementine Bauch",
    subtitle: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    affiliation: "Romaguera-Jacobson",
    locale: "McKenziehaven",
    posts: "8",
    albums: "3",
    avatarBg: "from-[#f8d7c8] to-[#6b4a33]",
  },
];

function TopMetricCard({
  icon,
  title,
  value,
  accent,
  helper,
  dark = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  accent?: string;
  helper?: string;
  dark?: boolean;
}) {
  return (
    <article
      className={
        dark
          ? "relative overflow-hidden rounded-lg bg-[#0f4dbd] px-7 py-6 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
          : "rounded-lg border border-[#edf2f7] bg-[#fbfdff] px-7 py-6"
      }
    >
      <div className="flex items-start justify-between">
        <span
          className={
            dark
              ? "inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/12 text-white"
              : "inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#eef2ff] text-[#2563eb]"
          }
        >
          {icon}
        </span>
        {accent ? (
          <span
            className={
              dark
                ? "rounded-md bg-white/12 px-2.5 py-1 text-[11px] font-semibold text-white/85"
                : "rounded-md bg-[#eef2ff] px-2.5 py-1 text-[11px] font-semibold text-[#2563eb]"
            }
          >
            {accent}
          </span>
        ) : null}
      </div>
      <p className={dark ? "mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#bfdbfe]" : "mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b7280]"}>
        {title}
      </p>
      <p className={dark ? "mt-1 text-[38px] font-bold leading-none tracking-tight" : "mt-1 text-[38px] font-bold leading-none tracking-tight text-[#1f2937]"}>
        {value}
      </p>
      {helper ? <p className={dark ? "mt-0.5 text-xs text-[#dbeafe]" : "mt-0.5 text-xs text-[#64748b]"}>{helper}</p> : null}

      {dark ? (
        <>
          <Sparkles className="absolute bottom-9 right-20 h-5 w-5 text-white/20" />
          <Sparkles className="absolute bottom-12 right-8 h-7 w-7 text-white/20" />
          <Bot className="absolute -bottom-2 right-3 h-12 w-12 text-white/20" />
        </>
      ) : null}
    </article>
  );
}

function FiltersToolbar() {
  return (
    <div className="mt-6 flex items-center justify-between rounded-lg bg-[#f1f5f9] px-3 py-2.5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#e5e7eb] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#374151]"
        >
          <Filter className="h-3 w-3" strokeWidth={1.75} />
          Advanced Filters
        </button>
        {["All Roles", "Admins", "Editors"].map((role, idx) => (
          <button
            key={role}
            type="button"
            className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.06em] ${
              idx === 0 ? "bg-[#dbeafe] text-[#2563eb]" : "bg-[#dbe3ea] text-[#64748b]"
            }`}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[11px] text-[#6b7280]">Export:</span>
        <button type="button" className="rounded border border-[#cbd5e1] bg-white px-1.5 py-0.5 text-[8px] font-bold text-[#6b7280]">
          CSV
        </button>
        <button type="button" className="text-[#4b5563]" aria-label="Print table">
          <Printer className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

function CuratorsTable() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-[#dbe3ee] bg-white">
      <div className="grid grid-cols-[56px_1.2fr_1.15fr_0.75fr_1fr_0.8fr] bg-[#eef2f6] px-3 py-3.5">
        {["ID", "Curator / Username", "Contact Points", "Website", "Affiliation & Locale", "Engagement"].map((header) => (
          <p key={header} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
            {header}
          </p>
        ))}
      </div>

      {curatorRows.map((row, index) => (
        <div
          key={row.id}
          className={`grid grid-cols-[56px_1.2fr_1.15fr_0.75fr_1fr_0.8fr] items-center px-3 py-4 ${
            index === curatorRows.length - 1 ? "" : "border-b border-[#edf2f7]"
          }`}
        >
          <p className="text-[12px] font-semibold text-[#2563eb]">{row.id}</p>
          <div className="flex items-center gap-2.5">
            <span className={`h-8 w-8 rounded-md bg-gradient-to-br ${row.avatarBg}`} />
            <div>
              <p className="text-[14px] font-bold leading-[1.2] text-[#1f2937]">{row.name}</p>
              <p className="mt-0.5 text-[11px] text-[#6b7280]">{row.subtitle}</p>
            </div>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[12px] text-[#374151]">
              <Mail className="h-3 w-3 text-[#6b7280]" strokeWidth={1.8} />
              {row.email}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#6b7280]">
              <Phone className="h-3 w-3 text-[#6b7280]" strokeWidth={1.8} />
              {row.phone}
            </p>
          </div>
          <a href="#" className="text-[12px] text-[#2563eb] hover:underline">
            {row.website}
          </a>
          <div>
            <p className="text-[14px] font-semibold leading-[1.2] text-[#374151]">{row.affiliation}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#6b7280]">
              <Globe className="h-3 w-3 text-[#6b7280]" strokeWidth={1.8} />
              {row.locale}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[14px] font-bold leading-none text-[#1f2937]">{row.posts}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                Posts
              </p>
            </div>
            <div>
              <p className="text-[14px] font-bold leading-none text-[#1f2937]">{row.albums}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                Albums
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between border-t border-[#edf2f7] bg-white px-3 py-4">
        <p className="text-[13px] text-[#4b5563]">Showing 1-10 of 1,284 curators</p>
        <div className="flex items-center gap-2">
          <button type="button" className="px-1 text-[#cbd5e1]">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button type="button" className="h-7 w-7 rounded-md bg-[#0b57d0] text-[12px] font-bold text-white">
            1
          </button>
          <button type="button" className="h-7 w-7 text-[12px] font-semibold text-[#4b5563]">
            2
          </button>
          <button type="button" className="h-7 w-7 text-[12px] font-semibold text-[#4b5563]">
            3
          </button>
          <span className="px-1 text-[12px] text-[#9ca3af]">...</span>
          <button type="button" className="h-7 w-7 text-[12px] font-semibold text-[#4b5563]">
            129
          </button>
          <button type="button" className="px-1 text-[#4b5563]">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function UsersOverview() {
  return (
    <section className="px-6 py-8 lg:px-8">
      <p className="text-xs text-[#94a3b8]">
        Console <span className="text-[#0b57d0]">› Users Management</span>
      </p>
      <h1 className="mt-1.5 text-[40px] font-bold leading-[1.02] tracking-tight text-[#1f2937]">
        The Directory
      </h1>
      <p className="mt-2 max-w-3xl text-[16px] leading-[1.45] text-[#4b5563]">
        A curated overview of all registered system architects and contributors.
        Manage permissions, monitor activity, and explore entity relationships.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <TopMetricCard
          icon={<UserRoundPlus className="h-4 w-4" strokeWidth={1.9} />}
          title="Total Curators"
          value="1,284"
          accent="+12.4%"
        />
        <TopMetricCard
          icon={<BadgeCheck className="h-4 w-4" strokeWidth={1.9} />}
          title="Entity Connections"
          value="14,892"
          accent="Stable"
        />
        <TopMetricCard
          icon={<Zap className="h-4 w-4" strokeWidth={1.9} />}
          title="System Health"
          value="99.98%"
          dark
        />
      </div>

      <FiltersToolbar />
      <CuratorsTable />

      <button
        type="button"
        className="fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b57d0] text-white shadow-lg"
        aria-label="Add curator"
      >
        <UserRoundPlus className="h-4.5 w-4.5" />
      </button>
    </section>
  );
}
