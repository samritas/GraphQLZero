"use client";

import { Sparkles } from "lucide-react";

export function PhotosApiTip() {
  return (
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
            to optimize payload sizes for mobile clients. Use our schema explorer to test complex
            fragments.
          </p>
        </div>
      </div>
    </section>
  );
}
