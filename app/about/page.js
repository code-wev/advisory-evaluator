import AboutBanner from "@/components/About/AboutBanner";
import MissionSection from "@/components/About/MissionSection";
import EmpowerSection from "@/components/Home/EmpowerSection";
import Footer from "@/components/Shared/Footer";
import React from "react";

const page = () => {
  return (
    <div>
      <AboutBanner />
      <MissionSection />
      <EmpowerSection />
      <Footer />
    </div>
  );
};

export default page;
