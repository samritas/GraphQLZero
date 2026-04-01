import { AlertCircle } from "lucide-react";

export type QueryErrorPanelProps = {
  title: string;
  message: string;
  onRetry: () => void;
  retryLabel?: string;
  className?: string;
};

export function QueryErrorPanel({
  title,
  message,
  onRetry,
  retryLabel = "Try again",
  className = "",
}: QueryErrorPanelProps) {
  return (
    <div
      className={`mb-6 flex flex-col gap-3 rounded-xl border border-[#fecaca] bg-[#fef2f2] p-4 text-[#991b1b] sm:flex-row sm:items-center sm:justify-between ${className}`.trim()}
      role="alert"
    >
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-[#b91c1c]/90">{message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="shrink-0 rounded-lg bg-[#991b1b] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7f1d1d]"
      >
        {retryLabel}
      </button>
    </div>
  );
}
