export type AlbumsStatCardProps = {
  label: string;
  value: string;
  detail?: string;
  detailTone?: "blue" | "muted";
  labelBlue?: boolean;
  valueBlue?: boolean;
  progressBeside?: number;
};

export function AlbumsStatCard({
  label,
  value,
  detail,
  detailTone = "blue",
  labelBlue = false,
  valueBlue = false,
  progressBeside,
}: AlbumsStatCardProps) {
  const labelClass = labelBlue
    ? "text-[12px] font-bold uppercase tracking-[0.12em] text-[#0b57d0]"
    : "text-[12px] font-bold uppercase tracking-[0.12em] text-[#9ca3af]";

  const valueClass = valueBlue
    ? "text-[32px] font-bold leading-none tracking-tight text-[#0b57d0]"
    : "text-[32px] font-bold leading-none tracking-tight text-[#111827]";

  const detailClass =
    detailTone === "muted"
      ? "text-sm font-medium text-[#9ca3af]"
      : "text-sm font-bold text-[#2563eb]";

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
    <article className="rounded-[16px] bg-[#F0F4F7] p-5">
      <p className={labelClass}>{label}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <p className={valueClass}>{value}</p>
        {detail ? <span className={detailClass}>{detail}</span> : null}
      </div>
    </article>
  );
}
