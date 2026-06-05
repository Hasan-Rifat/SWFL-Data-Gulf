"use client";

import Hero from "@/components/Hero";
import Header from "@/components/Header";
import ComparisonSection from "@/components/ComparisonSection";
import MCPInstall from "@/components/MCPInstall";
import Charts from "@/components/Charts";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  return (
    <motion.main
      className="relative"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <Header />
      <Hero />
      <ComparisonSection />
      <MCPInstall />
      <Charts />
      <Waitlist />
      <Footer />
    </motion.main>
  );
}
