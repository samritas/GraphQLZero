import Link from "next/link";

export function ReadyToBuildSection() {
  return (
    <section className="w-full pb-24">
      <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 lg:px-14">
        <div className="rounded-[2px] px-6 py-20 text-center md:py-24">
          <h3 className="text-4xl font-bold tracking-[-0.02em] text-[#2a3440] md:text-[52px]">
            Ready to build?
          </h3>
          <p className="mx-auto mt-5 max-w-[940px] text-lg leading-[1.55] text-[#5f6f84] md:text-[30px]">
            Join thousands of developers using GraphQLZero for their prototypes,
            tutorials, and test suites.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-[14px] bg-[#0b57d0] px-10 py-4 text-xl font-semibold text-white shadow-[0_10px_24px_rgba(11,87,208,0.28)] transition hover:bg-[#0a4dc0]"
            >
              Go to Dashboard
            </Link>
            <button
              type="button"
              className="rounded-[14px] bg-[#c9d3dd] px-10 py-4 text-xl font-semibold text-[#3f4f62] transition hover:bg-[#bcc8d4]"
            >
              Explore Playground
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
