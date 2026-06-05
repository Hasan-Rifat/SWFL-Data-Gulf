"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <Image
              src="/logo.webp"
              alt="SWFL Data Gulf"
              width={44}
              height={44}
              className="relative rounded-xl"
            />
          </div>
          <span className="text-xl font-semibold text-white tracking-tight">
            SWFL Data Gulf
          </span>
        </motion.div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          <Link
            href="#"
            className="relative text-gray-400 hover:text-white transition-colors group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-primary transition-all group-hover:w-full" />
          </Link>
          <Link
            href="#"
            className="relative text-gray-400 hover:text-white transition-colors group"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-primary transition-all group-hover:w-full" />
          </Link>
          <Link
            href="#"
            className="relative text-gray-400 hover:text-white transition-colors group"
          >
            Documentation
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-primary transition-all group-hover:w-full" />
          </Link>
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gradient text-navy-dark px-6 py-2.5 rounded-xl font-medium transition-all"
          >
            Get Started
          </motion.button>
        </motion.nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-white p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
