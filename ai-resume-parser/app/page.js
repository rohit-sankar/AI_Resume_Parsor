import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedCompanies from "@/components/TrustedCompanies";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ThreePrism from "@/components/ThreePrism";
import Statistics from "@/components/Statistics";
import CompanyBenefits from "@/components/CompanyBenefits";
import CandidateBenefits from "@/components/CandidateBenefits";
import Opportunities from "@/components/Opportunities";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedCompanies />
        <Features />
        <HowItWorks />
        <ThreePrism />
        <Statistics />
        <CompanyBenefits />
        <CandidateBenefits />
        <Opportunities />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
