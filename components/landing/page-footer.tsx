export function PageFooter() {
  return (
    <footer className="w-full border-t border-[#d6dce4] bg-[#dce1e7]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col justify-between gap-10 px-6 py-10 md:flex-row md:items-start md:px-10 lg:px-14">
        <div>
          <h4 className="text-[34px] font-semibold tracking-[-0.02em] text-[#2b3541]">
            GraphQLZero
          </h4>
          <p className="mt-3 max-w-[460px] text-[15px] leading-[1.6] text-[#5d6b7f]">
            &copy; 2024 GraphQLZero. Built for the Graph. Providing the
            infrastructure for modern web exploration.
          </p>
        </div>

        <div className="text-left md:text-right">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#5f6f84] md:justify-end">
            <a href="#" className="transition hover:text-[#2f3a47]">
              Status
            </a>
            <a href="#" className="transition hover:text-[#2f3a47]">
              GitHub
            </a>
            <a href="#" className="transition hover:text-[#2f3a47]">
              Twitter
            </a>
            <a href="#" className="transition hover:text-[#2f3a47]">
              Terms
            </a>
            <a href="#" className="transition hover:text-[#2f3a47]">
              Privacy
            </a>
          </nav>
          <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6b788a]">
            ZERO CONFIGURATION • GLOBAL EDGE
          </p>
        </div>
      </div>
    </footer>
  );
}
