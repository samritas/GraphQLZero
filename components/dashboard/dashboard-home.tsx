import Link from "next/link";

export function DashboardHome() {
  return (
    <section className="px-8 py-8">
      <h1 className="text-3xl font-bold text-[#2a3442]">Dashboard</h1>
      <p className="mt-2 text-base text-[#5c6e83]">
        Overview of GraphQLZero admin metrics and quick access to entities.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Users", href: "/dashboard/users" },
          { label: "Posts", href: "/dashboard/posts" },
          { label: "Comments", href: "/dashboard/comments" },
          { label: "Albums", href: "/dashboard/albums" },
          { label: "Photos", href: "/dashboard/photos" },
          { label: "Todos", href: "/dashboard/todos" },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-[#dce4ee] bg-white px-5 py-6 text-sm font-semibold text-[#2a3442] shadow-sm transition hover:border-[#0b57d0]/30 hover:text-[#0b57d0]"
          >
            {card.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
