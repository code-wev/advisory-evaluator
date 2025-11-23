import AboutSection from "@/components/Home/AboutSection";
import EmpowerSection from "@/components/Home/EmpowerSection";
import GuidesInsights from "@/components/Home/GuidesInsights";
import HeroBanner from "@/components/Home/HeroBanner";

export default function Page() {
  return (
    <div>
      <HeroBanner />
      <AboutSection />
      <GuidesInsights />
      <EmpowerSection />
    </div>
  );
}
