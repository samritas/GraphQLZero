import { CodeInSecondsSection } from "@/components/landing/code-in-seconds-section";
import { CuratedGrowthSection } from "@/components/landing/curated-growth-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PageFooter } from "@/components/landing/page-footer";
import { ReadyToBuildSection } from "@/components/landing/ready-to-build-section";
import { TopHeader } from "@/components/landing/top-header";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopHeader />
      <HeroSection />
      <CuratedGrowthSection />
      <CodeInSecondsSection />
      <ReadyToBuildSection />
      <PageFooter />
    </div>
  );
}
