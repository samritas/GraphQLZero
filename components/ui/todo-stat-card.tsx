import type { ReactNode } from "react";

export type TodoStatCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  footerHighlight?: string;
  footerHighlightTone?: "green" | "blue";
  footerMuted?: string;
  progress?: number;
};

export function TodoStatCard({
  icon,
  title,
  value,
  footerHighlight,
  footerHighlightTone,
  footerMuted,
  progress,
}: TodoStatCardProps) {
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
