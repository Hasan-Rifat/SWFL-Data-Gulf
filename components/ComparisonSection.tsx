"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QAData } from "@/types";
import { useTypewriter } from "@/hooks/useTypewriter";
import Image from "next/image";

/**
 * Q&A data for comparing generic AI vs SWFL Data Gulf responses
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
  const [showContent, setShowContent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { displayedText, type } = useTypewriter({ speed: 35 });

  // Handle question rotation and typewriter effect
  useEffect(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowContent(false);

    const qa = qaData[currentQuestionIndex];
    type(qa.question, () => {
      setTimeout(() => {
        setShowContent(true);
        setIsAnimating(false);
      }, 400);
    });
  }, [currentQuestionIndex, type]);

  // Auto-rotate questions every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % qaData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentQA = qaData[currentQuestionIndex];

  return (
    <section className="relative py-32 px-6 md:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Question Display */}
        <div className="text-center mb-20 min-h-28">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white inline-block">
            {displayedText}
          </h2>
          <span className="inline-block w-1 h-8 bg-teal-primary ml-2 animate-blink" />
        </div>

        {/* Split Screen Comparison */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Generic AI Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group card-hover"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600/20 to-gray-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group card-hover"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-primary/30 to-cyan-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            <div className="relative glass-card-modern rounded-3xl p-8 lg:p-10 border border-teal-primary/30 transition-all min-h-[450px] hover:border-teal-primary/50 glow-teal hover:glow-teal-strong">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-teal-primary/20">
                <div className="w-14 h-14 rounded-2xl bg-teal-primary/20 flex items-center justify-center text-2xl">
                  <Image
                    alt="website logo"
                    src="/logo.webp"
                    width={44}
                    height={44}
                  />
                </div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-teal-primary ">
                  SWFL Data Gulf
                </h3>
              </div>
              <div className="text-white text-lg leading-relaxed font-mono">
                <AnimatePresence mode="wait">
                  {showContent && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="p-6 bg-teal-primary/10 rounded-2xl border-l-4 border-teal-primary">
                        <div className="text-3xl font-bold text-teal-primary mb-2">
                          {currentQA.data.value}
                        </div>
                        {currentQA.data.subtext && (
                          <div className="text-xl text-white">
                            {currentQA.data.subtext}
                          </div>
                        )}
                      </div>
                      <div className="mt-8 pt-6 border-t border-teal-primary/10 space-y-3 text-sm">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
