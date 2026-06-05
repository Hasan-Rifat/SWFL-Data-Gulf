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
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id="swGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
          </radialGradient>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Florida outline (stylized) */}
        <path
          d="M150 70
             L315 68 L360 78 L398 96 L428 124 L445 152 L442 175
             L425 195 L390 208 L350 216 L322 232 L317 258 L330 290
             L358 325 L370 350 L360 372 L338 392 L310 404 L283 413
             L256 416 L234 408 L220 390 L214 366 L208 342 L196 322
             L176 302 L164 278 L160 252 L167 228 L180 206 L193 182
             L197 154 L191 128 L174 103 Z"
          fill="rgba(255,255,255,0.03)"
          stroke="url(#flStroke)"
          strokeWidth="2.4"
        />

        {/* SWFL zoom glow */}
        <circle cx={swfl.x} cy={swfl.y} r="95" fill="url(#swGlow)" />

        {/* Lee County highlight (approx) */}
        <path
          d="M220 330 L245 324 L268 332 L272 350 L258 366 L232 370 L216 356 Z"
          fill="rgba(0,212,170,0.28)"
          stroke="#00d4aa"
          strokeWidth="1.3"
          filter="url(#softGlow)"
        />

        {/* Collier County highlight (approx) */}
        <path
          d="M272 350 L300 344 L320 360 L316 386 L292 404 L262 396 L258 366 Z"
          fill="rgba(34,211,238,0.22)"
          stroke="#22d3ee"
          strokeWidth="1.3"
          filter="url(#softGlow)"
        />

        {/* Animated incoming data lines + packets */}
        {particles.map((p) => (
          <g key={p.id}>
            <motion.path
              d={`M ${p.x1} ${p.y1} Q ${p.cx} ${p.cy} ${p.x2} ${p.y2}`}
              fill="none"
              stroke="rgba(94,234,212,0.35)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1], opacity: [0, 0.9, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                repeatDelay: 0.4,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              r="2.1"
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

        {/* Data Connected center pulse */}
        <motion.circle
          cx={swfl.x}
          cy={swfl.y}
          r="9"
          fill="#00d4aa"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.22, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ transformOrigin: `${swfl.x}px ${swfl.y}px` }}
        />
        <motion.circle
          cx={swfl.x}
          cy={swfl.y}
          r="20"
          fill="none"
          stroke="rgba(0,212,170,0.7)"
          strokeWidth="1.5"
          animate={{ r: [20, 44, 20], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />

        <text
          x={swfl.x + 22}
          y={swfl.y - 14}
          fill="#8fffe8"
          fontSize="13"
          fontWeight="600"
          style={{ letterSpacing: "0.3px" }}
        >
          Data Connected
        </text>
      </svg>
    </div>
  );
}

export default function Hero() {
  const badgeColor = "#00d4aa";

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-8 z-10 pt-24">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full backdrop-blur-sm"
              style={{
                border: `1px solid ${badgeColor}`,
                background: `linear-gradient(to right, ${badgeColor}1A, rgba(34,211,238,0.10))`,
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
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] animate-float"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-primary/10 to-transparent rounded-3xl border border-white/5 backdrop-blur-sm glass-card-modern glow-teal" />
          <FloridaDataViz />
        </motion.div>
      </div>
    </section>
  );
}
