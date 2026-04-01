import { PerformanceStatusCard } from "@/components/ui/performance-status-card";
import { PostingFrequencyCard } from "@/components/ui/posting-frequency-card";

export function PostsInsightsStrip() {
  return (
    <section className="mt-6 grid gap-3 lg:grid-cols-[1fr_2fr]">
      <PostingFrequencyCard />
      <PerformanceStatusCard />
    </section>
  );
}
