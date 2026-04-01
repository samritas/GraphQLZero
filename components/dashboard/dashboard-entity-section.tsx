type Props = {
  title: string;
  subtitle: string;
};

export function DashboardEntitySection({ title, subtitle }: Props) {
  return (
    <section className="px-8 py-8">
      <h1 className="text-3xl font-bold text-[#2a3442]">{title}</h1>
      <p className="mt-2 max-w-2xl text-base text-[#5c6e83]">{subtitle}</p>
      <div className="mt-8 rounded-2xl border border-dashed border-[#c5d0dc] bg-white/80 px-6 py-12 text-center text-sm text-[#708096]">
        Content for this section will load here.
      </div>
    </section>
  );
}
