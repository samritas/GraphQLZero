import { Bot, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export type UsersTopMetricCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  accent?: string;
  helper?: string;
  dark?: boolean;
  tone?: "blue" | "entity";
};

export function UsersTopMetricCard({
  icon,
  title,
  value,
  accent,
  helper,
  dark = false,
  tone = "blue",
}: UsersTopMetricCardProps) {
  const shell =
    "relative flex h-[160px] w-full min-w-0 max-w-full min-h-0 flex-col overflow-hidden rounded-lg px-5 py-5 lg:w-[309.33px]";
  const metricIconShell =
    "inline-flex h-[39px] w-[40px] shrink-0 items-center justify-center rounded-[4px]";
  const iconPadding = !dark && tone === "entity" ? "p-1" : "p-2";
  const metricIconBox = `${metricIconShell} ${iconPadding}`;
  const lightIconBox =
    tone === "entity"
      ? `${metricIconBox} bg-[#DFD5F780] text-[#625B77]`
      : `${metricIconBox} bg-[#eef2ff] text-[#0053DB]`;
  const lightAccent =
    tone === "entity"
      ? "inline-flex min-h-[24px] shrink-0 items-center justify-center  bg-[#DFD5F780] px-2.5 py-0.5 text-[12px] font-semibold text-[#625B77]"
      : "inline-flex min-h-[24px] shrink-0 items-center justify-center bg-[#eef2ff] px-2.5 py-0.5 text-[12px] font-semibold text-[#0053DB]";

  return (
    <article
      className={
        dark
          ? `${shell} bg-[#0053DB] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]`
          : `${shell} border border-[#edf2f7] bg-white`
      }
    >
      <div className="flex shrink-0 items-start justify-between gap-2">
        <span
          className={
            dark ? `${metricIconShell} p-2 bg-black/15 text-white` : lightIconBox
          }
        >
          {icon}
        </span>
        {accent ? (
          <span
            className={
              dark
                ? "inline-flex min-h-[24px] shrink-0 items-center justify-center rounded-full bg-white/15 px-2.5 py-0.5 text-[12px] font-semibold text-white/90"
                : lightAccent
            }
          >
            {accent}
          </span>
        ) : null}
      </div>
      <div className="mt-auto min-w-0 text-left">
        <p
          className={
            dark
              ? "truncate text-[14px] font-bold uppercase leading-tight tracking-[0.08em] text-white/90"
              : "truncate text-[14px] font-bold uppercase leading-tight tracking-[0.08em] text-[#6b7280]"
          }
        >
          {title}
        </p>
        <p
          className={
            dark
              ? "mt-1 truncate text-[30px] font-bold leading-none tracking-tight text-white"
              : "mt-1 truncate text-[30px] font-bold leading-none tracking-tight text-[#1f2937]"
          }
        >
          {value}
        </p>
        {helper ? (
          <p
            className={
              dark
                ? "mt-1 truncate text-[11px] text-white/80"
                : "mt-1 truncate text-[11px] text-[#64748b]"
            }
          >
            {helper}
          </p>
        ) : null}
      </div>

      {dark ? (
        <>
          <Sparkles className="pointer-events-none absolute bottom-2 right-14 h-4 w-4 text-white/20" />
          <Sparkles className="pointer-events-none absolute bottom-3 right-6 h-5 w-5 text-white/20" />
          <Bot className="pointer-events-none absolute -bottom-1 right-1 h-9 w-9 text-white/20" />
        </>
      ) : null}
    </article>
  );
}
