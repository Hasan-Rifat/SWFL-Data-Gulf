import Hero from "@/components/Hero";
import Header from "@/components/Header";
import ComparisonSection from "@/components/ComparisonSection";
import MCPInstall from "@/components/MCPInstall";
import Charts from "@/components/Charts";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <ComparisonSection />
      <MCPInstall />
      <Charts />
      <Waitlist />
      <Footer />
    </main>
  );
}
