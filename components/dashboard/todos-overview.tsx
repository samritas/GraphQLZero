import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarClock,
  CircleCheck,
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  ListFilter,
  ListTodo,
  MoreVertical,
  Sparkles,
} from "lucide-react";

type TodoRow = {
  id: string;
  title: string;
  userId: string;
  status: "Pending" | "Completed";
};

const rows: TodoRow[] = [
  { id: "001", title: "delectus aut autem", userId: "UID-1", status: "Pending" },
  { id: "002", title: "quis ut nam facilis et officia qui", userId: "UID-1", status: "Completed" },
  { id: "003", title: "fugiat veniam minus", userId: "UID-2", status: "Pending" },
  { id: "004", title: "et porro tempora", userId: "UID-2", status: "Completed" },
  { id: "005", title: "laboriosam mollitia et enim quasi adipisci quia provident", userId: "UID-3", status: "Pending" },
];

function StatCard({
  icon,
  title,
  value,
  footerHighlight,
  footerHighlightTone,
  footerMuted,
  progress,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  footerHighlight?: string;
  footerHighlightTone?: "green" | "blue";
  footerMuted?: string;
  progress?: number;
}) {
  const highlightClass =
    footerHighlightTone === "green" ? "text-[#10b981]" : "text-[#1d4ed8]";

  return (
    <article className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#1d4ed8]">
          {icon}
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
          {title}
        </p>
      </div>
      <p className="mt-5 text-[2rem] font-bold leading-none tracking-tight text-[#1a1a1a]">
        {value}
      </p>
      {footerHighlight && footerMuted ? (
        <p className="mt-4 text-[0.85rem] leading-snug">
          <span className={`font-semibold ${highlightClass}`}>{footerHighlight}</span>{" "}
          <span className="font-normal text-[#6b7280]">{footerMuted}</span>
        </p>
      ) : null}
      {typeof progress === "number" ? (
        <div className="mt-4 h-2 w-full rounded-full bg-[#e5e7eb]">
          <span
            className="block h-full rounded-full bg-[#1d4ed8]"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
    </article>
  );
}

function StatusToggle({ done }: { done: boolean }) {
  return (
    <span
      role="presentation"
      className={`inline-flex h-[20px] w-[36px] shrink-0 items-center rounded-full p-px ${
        done ? "bg-[#2563eb]" : "bg-[#e2e8f0]"
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.18)] transition-transform duration-200 ${
          done ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </span>
  );
}

const todosTableGrid =
  "grid grid-cols-[56px_minmax(0,1.25fr)_minmax(0,0.65fr)_minmax(0,0.85fr)_44px]";

function SystemHealthWatermark() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-2 flex w-[min(52%,18rem)] select-none items-center justify-end gap-1 sm:right-4"
      aria-hidden
    >
      <BarChart3 className="h-24 w-24 shrink-0 text-[#94a3b8] opacity-[0.2]" strokeWidth={1.15} />
      <Activity className="h-28 w-28 shrink-0 text-[#3b82f6] opacity-[0.22]" strokeWidth={1.15} />
    </div>
  );
}

function TodosInsightPanels() {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_minmax(17rem,22rem)] lg:items-stretch">
      <div className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:p-8">
        <SystemHealthWatermark />
        <div className="relative z-[1] max-w-lg">
          <h3 className="text-lg font-bold tracking-tight text-[#1f2937] sm:text-xl">
            System Health & Latency
          </h3>
          <div className="mt-6 flex flex-wrap gap-10 sm:gap-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
                Avg. response
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#2563eb] sm:text-[2rem]">
                124ms
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
                Uptime
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#1f2937] sm:text-[2rem]">
                99.9%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-visible rounded-2xl bg-[#171717] p-6 text-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ca3af]">
          Developer tip
        </p>
        <p className="mt-4 max-w-[18rem] text-base font-bold leading-snug text-white sm:text-[17px]">
          Optimize your queries by using targeted fragments.
        </p>
        <a
          href="https://graphql.org/learn/queries/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b82f6] transition hover:text-[#60a5fa]"
          target="_blank"
          rel="noreferrer"
        >
          Read documentation
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </a>
        <button
          type="button"
          className="absolute -bottom-2 -right-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563eb] text-white shadow-lg shadow-blue-500/30 transition hover:bg-[#1d4ed8]"
          aria-label="Quick action"
        >
          <span className="relative inline-flex items-center justify-center">
            <CircleCheck className="h-5 w-5" strokeWidth={2} aria-hidden />
            <Sparkles className="absolute -right-1 -top-1 h-2.5 w-2.5" strokeWidth={2.2} aria-hidden />
          </span>
        </button>
      </div>
    </div>
  );
}

function TodosTable() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-[#dbe3ee] bg-white">
      <div className="flex items-center justify-between border-b border-[#edf2f7] px-6 py-4">
        <h3 className="text-[30px] font-semibold tracking-tight text-[#374151]">Entries</h3>
        <div className="flex items-center gap-4 text-[#4b5563]">
          <button type="button" className="hover:text-[#1f2937]" aria-label="Filter entries">
            <ListFilter className="h-4 w-4" strokeWidth={2} />
          </button>
          <button type="button" className="hover:text-[#1f2937]" aria-label="More options">
            <MoreVertical className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className={`${todosTableGrid} bg-[#eef2f6] px-3 py-3.5`}>
        {(["ID", "Title", "User ID", "Status", "Actions"] as const).map((h) => (
          <p key={h} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
            {h}
          </p>
        ))}
      </div>

      {rows.map((row, idx) => {
        const done = row.status === "Completed";
        return (
          <div
            key={row.id}
            className={`${todosTableGrid} items-center px-3 py-4 ${
              idx === rows.length - 1 ? "" : "border-b border-[#edf2f7]"
            }`}
          >
            <p className="text-[12px] font-semibold text-[#2563eb]">{row.id}</p>
            <p className="min-w-0 text-[14px] font-semibold leading-[1.2] text-[#374151]">{row.title}</p>
            <span className="inline-flex w-fit rounded-md bg-[#eef2f6] px-2 py-0.5 text-[11px] font-semibold text-[#4b5563]">
              {row.userId}
            </span>
            <div className="flex items-center gap-2">
              <StatusToggle done={done} />
              <span
                className={`text-[12px] font-medium ${
                  done ? "text-[#4b5563]" : "text-[#9ca3af]"
                }`}
              >
                {row.status}
              </span>
            </div>
            <button
              type="button"
              className="text-[#6b7280] hover:text-[#374151]"
              aria-label="Edit"
            >
              <FilePenLine className="h-3.5 w-3.5" strokeWidth={1.8} />
            </button>
          </div>
        );
      })}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#edf2f7] bg-white px-3 py-4">
        <p className="text-[13px] text-[#4b5563]">Showing 1-5 of 200 entries</p>
        <div className="flex items-center gap-2">
          <button type="button" className="px-1 text-[#cbd5e1]" aria-label="Previous page">
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            className="h-7 w-7 rounded-md bg-[#0b57d0] text-[12px] font-bold text-white"
          >
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
            40
          </button>
          <button type="button" className="px-1 text-[#4b5563]" aria-label="Next page">
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function TodosOverview() {
  return (
    <section className="px-6 py-8 lg:px-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[40px] font-bold leading-tight tracking-tight text-[#1f2937]">
            Task Management
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
            Curating the Graphé LZero Todos dataset with editorial precision.
          </p>
        </div>
        <div className="flex items-center rounded-lg bg-[#eef2f6] p-1">
          <button type="button" className="rounded-md bg-white px-5 py-2 text-[14px] font-bold text-[#0b57d0]">
            All
          </button>
          <button type="button" className="rounded-md px-5 py-2 text-[14px] font-medium text-[#6b7280]">
            Pending
          </button>
          <button type="button" className="rounded-md px-5 py-2 text-[14px] font-medium text-[#6b7280]">
            Completed
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard
          icon={<ListTodo className="h-4 w-4" strokeWidth={2} />}
          title="Total Tasks"
          value="200"
          footerHighlight="+12%"
          footerHighlightTone="green"
          footerMuted="from last sync"
        />
        <StatCard
          icon={<CalendarClock className="h-4 w-4" strokeWidth={2} />}
          title="Pending Sync"
          value="84"
          footerHighlight="42%"
          footerHighlightTone="blue"
          footerMuted="of total volume"
        />
        <StatCard
          icon={<BadgeCheck className="h-4 w-4" strokeWidth={2} />}
          title="Completion Rate"
          value="58%"
          progress={58}
        />
      </div>

      <TodosTable />

      <TodosInsightPanels />
    </section>
  );
}
