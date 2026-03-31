function SectionIcon({ type }: { type: "network" | "chip" }) {
  if (type === "chip") {
    return (
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#cfdaf0] text-[#355eab]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" />
        </svg>
      </div>
    );
  }

  return (
    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#cfdaf0] text-[#2f62c8]">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7" cy="7" r="1.5" />
        <circle cx="17" cy="7" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="7" cy="17" r="1.5" />
        <circle cx="17" cy="17" r="1.5" />
        <path d="M8.5 7h7M7.8 8.3l3.2 2.5M16.2 8.3l-3.2 2.5M7.8 15.7l3.2-2.5M16.2 15.7l-3.2-2.5M8.5 17h7" />
      </svg>
    </div>
  );
}

export function CuratedGrowthSection() {
  return (
    <section className="w-full pb-28">
      <div className="w-full bg-[#dce1e7]">
        <div className="mx-auto w-full max-w-[1500px] px-6 py-8 md:px-10 md:py-10 lg:px-14">
          <h2 className="text-xl font-bold tracking-[-0.02em] text-[#2a3440] md:text-[28px]">
            Engineered for Curated Growth.
          </h2>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[#627084] md:text-base">
            Skip the backend boilerplate and start building your frontend with real
            relationships and low latency.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-[2fr_1fr]">
            <article className="rounded-[26px] bg-[#eef1f5] p-7 md:p-10">
              <SectionIcon type="network" />
              <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-[#2b3541] md:text-[30px]">
                Interconnected Data (Relational)
              </h3>
              <p className="mt-4 max-w-[920px] text-base leading-[1.5] text-[#626f82] md:text-[18px]">
                Our schema isn&apos;t just flat lists. Explore deep relationships
                between users, posts, and comments to build complex nested UIs
                instantly.
              </p>
              <div className="mt-8 h-[145px] rounded-lg bg-[linear-gradient(120deg,#e8edf2_0%,#edf2f7_55%,#e7edf3_100%)]" />
            </article>

            <article className="rounded-[26px] bg-[#eef1f5] p-7 md:p-10">
              <SectionIcon type="chip" />
              <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-[#2b3541] md:text-[30px]">
                6 Real-time Entities
              </h3>
              <ul className="mt-6 space-y-3 text-base text-[#556379] md:text-[18px]">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2f62c8]" />
                  Users &amp; Posts
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2f62c8]" />
                  Comments &amp; Todos
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2f62c8]" />
                  Albums &amp; Photos
                </li>
              </ul>
            </article>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-[22px] bg-[#030b14] p-6 md:p-8">
              <div className="grid h-10 w-10 place-items-center rounded-lg text-[#e6efff]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 8l-3 4 3 4M16 8l3 4-3 4" />
                  <path d="M10 18h4" />
                  <path d="M10 6h4" />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-[#eaf0f9] md:text-[30px]">
                Developer-First Tooling
              </h3>
              <p className="mt-3 max-w-[720px] text-sm leading-[1.55] text-[#93a2b8] md:text-base">
                Integrated GraphiQL playground, comprehensive type definitions, and
                auto-generated documentation for every endpoint.
              </p>
            </article>

            <article className="rounded-[22px] bg-[#eef1f5] p-6 md:p-8">
              <div className="grid h-10 w-10 place-items-center rounded-lg text-[#1d67db]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M4 12h16" />
                  <path d="M12 4a14 14 0 0 1 0 16" />
                  <path d="M12 4a14 14 0 0 0 0 16" />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-[#2b3541] md:text-[30px]">
                Global Edge Network
              </h3>
              <p className="mt-3 max-w-[720px] text-sm leading-[1.55] text-[#66758a] md:text-base">
                Powered by a globally distributed infrastructure. Get sub-50ms
                response times from anywhere in the world, guaranteed.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
