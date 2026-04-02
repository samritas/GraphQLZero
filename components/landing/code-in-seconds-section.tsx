export function CodeInSecondsSection() {
  return (
    <section className="w-full pb-28">
      <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 lg:px-14">
        <div className="grid overflow-hidden rounded-[30px] bg-[#dbe2e9] lg:grid-cols-[1.05fr_1fr]">
          <div className="flex items-center px-8 py-12 md:px-12 md:py-16 lg:px-14">
            <div className="max-w-[470px]">
              <h3 className="text-3xl font-bold tracking-[-0.02em] text-[#2A3439] md:text-[36px]">
                Code it in seconds.
              </h3>
              <p className="mt-6 text-lg leading-[1.55] text-[#566166] md:text-[18px]">
                Our GraphQL API is intuitive and follows best practices. Fetch
                exactly what you need, nothing more.
              </p>
              <div className="mt-8 flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-md bg-[#d9e5ff] text-[#0053DB]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8.5 12 2.2 2.2 4.8-4.8" />
                  </svg>
                </span>
                <div>
                  <p className="text-lg font-semibold text-[#2A3439] md:text-[16px]">
                    Type-Safe schemas
                  </p>
                  <p className="text-sm text-[#566166] md:text-[14px]">
                    Compatible with Apollo, Relay, and urql.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#030b14] px-6 py-8 md:px-10 md:py-10">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef5d57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f5be4f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#29c842]" />
            </div>
            <pre className="overflow-x-auto font-mono text-[12px] leading-7 text-[#d7e2f2] md:text-[14px]">
              {`# Fetch user data and their associated posts
query {
  user(id: "1") {
    id
    username
    email
    posts(options: { paginate: { page: 1, limit: 5 } }) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
}`}
            </pre>
            <div className="mt-6 border-t border-[#1d2a39] pt-4">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-[#74859d] md:text-xs">
                <span>Response Preview</span>
                <span className="text-[#29c842]">200 OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
