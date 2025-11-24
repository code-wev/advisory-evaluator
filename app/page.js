import AboutSection from "@/components/Home/AboutSection";
import EmpowerSection from "@/components/Home/EmpowerSection";
import GuidesInsights from "@/components/Home/GuidesInsights";
import HeroBanner from "@/components/Home/HeroBanner";
import Footer from "@/components/Shared/Footer";

export default function Page() {
  return (
    <div>
      <HeroBanner />
      <AboutSection />
      <GuidesInsights />
      <EmpowerSection />
      <Footer />
    </div>
  );
}
