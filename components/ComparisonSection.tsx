"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QAData } from "@/types";
import Image from "next/image";

/**
 * Q&A data for comparing generic AI vs SWFL Data Gulf responses
 * (Old content kept unchanged)
 */
const qaData: QAData[] = [
  {
    question: "What commercial corridor has the highest average rent?",
    generic: {
      response:
        "The highest average rent is likely found in a major commercial district, although market conditions may vary.",
    },
    data: {
      value: "US-41 Corridor",
      subtext: "$42.83/SF",
      source: "Lee County CRE Survey",
      freshness: "Updated 3 Days Ago",
      confidence: "97%",
    },
  },
  {
    question: "How many residential permits were issued this month?",
    generic: {
      response:
        "Permit activity fluctuates seasonally, and exact numbers would require checking local building department records.",
    },
    data: {
      value: "1,247 Permits",
      subtext: "+12.3% YoY",
      source: "Lee & Collier Building Departments",
      freshness: "Updated 2 Days Ago",
      confidence: "99%",
    },
  },
  {
    question: "Which city had the strongest home value growth?",
    generic: {
      response:
        "Home values have been rising across the region, though specific growth rates vary by location and property type.",
    },
    data: {
      value: "Estero",
      subtext: "+18.7% YoY",
      source: "Lee County Property Appraiser",
      freshness: "Updated 5 Days Ago",
      confidence: "96%",
    },
  },
  {
    question: "Where is labor demand increasing fastest?",
    generic: {
      response:
        "Labor demand typically follows development patterns, though specific growth areas would require detailed market analysis.",
    },
    data: {
      value: "Bonita Springs",
      subtext: "+15.2% Job Postings",
      source: "FL Dept of Economic Opportunity",
      freshness: "Updated 1 Day Ago",
      confidence: "94%",
    },
  },
];

export default function ComparisonSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showContent, setShowContent] = useState(true);

  const currentQA = qaData[currentQuestionIndex];
  const displayedText = currentQA.question;

  useEffect(() => {
    setShowContent(false);
    const t = setTimeout(() => setShowContent(true), 180);
    return () => clearTimeout(t);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % qaData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-28 md:py-32 px-6 md:px-8 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="min-h-[96px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl"
              >
                {displayedText}
              </motion.h2>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center items-center gap-2.5 relative z-20">
            {qaData.map((_, idx) => {
              const isActive = idx === currentQuestionIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentQuestionIndex(idx)}
                  aria-label={`Go to question ${idx + 1}`}
                  className="group relative h-2.5 flex items-center"
                  style={{ width: isActive ? 32 : 10 }}
                >
                  <motion.span
                    layout
                    initial={false}
                    animate={{
                      width: isActive ? 32 : 10,
                      backgroundColor: isActive
                        ? "#2dd4bf"
                        : "rgba(255,255,255,0.2)",
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={
                      !isActive
                        ? { backgroundColor: "rgba(255,255,255,0.4)" }
                        : undefined
                    }
                    className="block h-2.5 rounded-full will-change-[width]"
                  />
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Generic AI Panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative glass-card-modern rounded-3xl p-8 lg:p-10 border border-white/10 transition-all min-h-[450px] hover:border-white/20">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                  🤖
                </div>
                <h3 className="text-2xl font-semibold text-gray-300">
                  Your AI
                </h3>
              </div>

              <div className="text-gray-400 text-lg leading-relaxed">
                <AnimatePresence mode="wait">
                  {showContent && (
                    <motion.div
                      key={`generic-${currentQuestionIndex}`}
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="italic mb-8">
                        {currentQA.generic.response}
                      </p>
                      <div className="mt-8 pt-6 border-t border-white/5 space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Source:</span>
                          <span className="text-gray-600">Unknown</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Updated:</span>
                          <span className="text-gray-600">Unknown</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* SWFL Data Gulf Panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.75,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-teal-primary/50 via-cyan-300/40 to-teal-primary/50">
              <div className="relative glass-card-modern rounded-3xl p-8 lg:p-10 border border-cyan-300/20 transition-all min-h-[450px] bg-gradient-to-b from-teal-primary/[0.08] to-cyan-400/[0.04]">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-cyan-300/20">
                  <div className="w-14 h-14 rounded-2xl bg-teal-primary/20 flex items-center justify-center text-2xl ring-1 ring-cyan-300/35">
                    <Image
                      alt="website logo"
                      src="/logo.webp"
                      width={44}
                      height={44}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-cyan-300">
                    SWFL Data Gulf
                  </h3>
                </div>

                <div className="text-white text-lg leading-relaxed font-mono">
                  <AnimatePresence mode="wait">
                    {showContent && (
                      <motion.div
                        key={`data-${currentQuestionIndex}`}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                        transition={{
                          duration: 0.58,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="space-y-6"
                      >
                        <motion.div
                          initial={{ scale: 0.985, opacity: 0.9 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          className="p-6 bg-teal-primary/10 rounded-2xl border-l-4 border-teal-primary"
                        >
                          <div className="text-3xl font-bold text-teal-primary mb-2">
                            {currentQA.data.value}
                          </div>
                          {currentQA.data.subtext && (
                            <div className="text-xl text-white">
                              {currentQA.data.subtext}
                            </div>
                          )}
                        </motion.div>

                        <div className="mt-8 pt-6 border-t border-cyan-300/20 space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Source:</span>
                            <span className="text-teal-primary">
                              {currentQA.data.source}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Freshness:</span>
                            <span className="text-teal-primary">
                              {currentQA.data.freshness}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Confidence:</span>
                            <span className="text-teal-primary">
                              {currentQA.data.confidence}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
