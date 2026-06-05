"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import PixelTextAnimation from "./PixelTextAnimation";

type Particle = {
  id: number;
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  x2: number;
  y2: number;
  delay: number;
  duration: number;
};

function FloridaDataViz() {
  // SWFL focal point (inside viewBox 0 0 600 520)
  const swfl = { x: 245, y: 355 };

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 32 }, (_, i) => {
        const edge = i % 4;
        let x1 = 0;
        let y1 = 0;

        if (edge === 0) {
          x1 = Math.random() * 600;
          y1 = -20;
        } else if (edge === 1) {
          x1 = 620;
          y1 = Math.random() * 520;
        } else if (edge === 2) {
          x1 = Math.random() * 600;
          y1 = 540;
        } else {
          x1 = -20;
          y1 = Math.random() * 520;
        }

        return {
          id: i,
          x1,
          y1,
          cx: (x1 + swfl.x) / 2 + (Math.random() - 0.5) * 70,
          cy: (y1 + swfl.y) / 2 + (Math.random() - 0.5) * 70,
          x2: swfl.x + (Math.random() - 0.5) * 18,
          y2: swfl.y + (Math.random() - 0.5) * 18,
          delay: Math.random() * 2.2,
          duration: 2.8 + Math.random() * 2.2,
        };
      }),
    [],
  );

  return (
    <div className="absolute inset-0 rounded-3xl overflow-hidden">
      <svg
        viewBox="0 0 600 520"
        className="w-full h-full"
        aria-label="Florida data connectivity visualization"
      >
        <defs>
          <linearGradient id="flStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.85" />
          </linearGradient>

          {/* Subtle modern grid backdrop */}
          <pattern
            id="grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Grid background */}
        <rect x="0" y="0" width="600" height="520" fill="url(#grid)" />

        {/* Florida outline (stylized) */}
        <path
          d="M150 70
             L315 68 L360 78 L398 96 L428 124 L445 152 L442 175
             L425 195 L390 208 L350 216 L322 232 L317 258 L330 290
             L358 325 L370 350 L360 372 L338 392 L310 404 L283 413
             L256 416 L234 408 L220 390 L214 366 L208 342 L196 322
             L176 302 L164 278 L160 252 L167 228 L180 206 L193 182
             L197 154 L191 128 L174 103 Z"
          fill="rgba(255,255,255,0.02)"
          stroke="url(#flStroke)"
          strokeWidth="1.6"
        />

        {/* Lee County highlight (approx) */}
        <path
          d="M220 330 L245 324 L268 332 L272 350 L258 366 L232 370 L216 356 Z"
          fill="rgba(0,212,170,0.16)"
          stroke="#00d4aa"
          strokeWidth="1.1"
        />

        {/* Collier County highlight (approx) */}
        <path
          d="M272 350 L300 344 L320 360 L316 386 L292 404 L262 396 L258 366 Z"
          fill="rgba(34,211,238,0.14)"
          stroke="#22d3ee"
          strokeWidth="1.1"
        />

        {/* Animated incoming data lines + packets */}
        {particles.map((p) => (
          <g key={p.id}>
            <motion.path
              d={`M ${p.x1} ${p.y1} Q ${p.cx} ${p.cy} ${p.x2} ${p.y2}`}
              fill="none"
              stroke="rgba(94,234,212,0.28)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1], opacity: [0, 0.7, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                repeatDelay: 0.4,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              r="1.8"
              fill="#5eead4"
              initial={{ cx: p.x1, cy: p.y1, opacity: 0 }}
              animate={{
                cx: [p.x1, p.x2],
                cy: [p.y1, p.y2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                repeatDelay: 0.4,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        {/* Data Connected center node */}
        <circle cx={swfl.x} cy={swfl.y} r="6" fill="#00d4aa" />
        <circle
          cx={swfl.x}
          cy={swfl.y}
          r="6"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
        />

        {/* Calm expanding ring (no glow) */}
        <motion.circle
          cx={swfl.x}
          cy={swfl.y}
          r="16"
          fill="none"
          stroke="rgba(0,212,170,0.5)"
          strokeWidth="1.2"
          animate={{ r: [16, 40, 16], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <text
          x={swfl.x + 20}
          y={swfl.y - 12}
          fill="#a7f3e4"
          fontSize="12"
          fontWeight="600"
          style={{ letterSpacing: "0.4px" }}
        >
          Data Connected
        </text>
      </svg>
    </div>
  );
}

export default function Hero() {
  const badgeColor = "#00d4aa";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-8 z-10 pt-24">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full backdrop-blur-sm"
              style={{
                border: `1px solid ${badgeColor}33`,
                background: `linear-gradient(to right, ${badgeColor}14, rgba(34,211,238,0.06))`,
              }}
            >
              <PixelTextAnimation
                text="✨ AI Data Layer for SWFL"
                align="left"
                color={badgeColor}
                fontSize={14}
                fontWeight={600}
                className="w-[230px] h-[18px]"
              />
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight mb-6 bg-gradient-to-br from-white via-teal-primary to-cyan-400 bg-clip-text text-transparent">
              Real Data. Real Answers.
            </h1>

            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-xl">
              Stop guessing. Get instant access to Southwest Florida&apos;s most
              accurate property, labor, permits, and market intelligence powered
              by AI.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Florida Data Visualization */}
        <motion.div
          variants={itemVariants}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] animate-float"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent rounded-3xl border border-white/10 backdrop-blur-sm glass-card-modern" />
          <FloridaDataViz />
        </motion.div>
      </div>
    </section>
  );
}
