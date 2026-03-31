import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-6 py-20">
        <section className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {siteConfig.description}
          </p>
        </section>
      </main>
    </div>
  );
}
