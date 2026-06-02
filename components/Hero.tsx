"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Particle class for the AI data visualization
 * Represents a data point that moves toward the central AI node
 */
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  targetX: number;
  targetY: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.targetX = canvasWidth / 2;
    this.targetY = canvasHeight / 2;
  }

  update(canvasWidth: number, canvasHeight: number) {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Move toward target if far away, otherwise drift
    if (distance > 100) {
      this.x += dx * 0.001 + this.speedX;
      this.y += dy * 0.001 + this.speedY;
    } else {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    // Bounce off edges
    if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 212, 170, ${this.opacity})`;
    ctx.fill();
  }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas setup
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const particles: Particle[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw the central AI node with glow effect
    const drawAINode = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Outer glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        60,
      );
      gradient.addColorStop(0, "rgba(0, 212, 170, 0.3)");
      gradient.addColorStop(0.5, "rgba(0, 212, 170, 0.1)");
      gradient.addColorStop(1, "rgba(0, 212, 170, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 170, 0.8)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#00d4aa";
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      drawConnections();
      drawAINode();
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-8 z-10 pt-24">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Content */}
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
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-teal-primary/10 to-cyan-400/10 border border-teal-primary/20 rounded-full backdrop-blur-sm">
              <span className="text-sm font-medium text-teal-primary">
                ✨ AI Data Layer for SWFL
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight mb-6 bg-gradient-to-br from-white via-teal-primary to-cyan-400 bg-clip-text text-transparent">
              Real Data. Real Answers.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-xl">
              Stop guessing. Get instant access to Southwest Florida's most
              accurate property, labor, permits, and market intelligence—powered
              by AI.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 flex-wrap pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 font-semibold text-base text-navy-dark rounded-xl overflow-hidden group btn-gradient shadow-lg shadow-teal-primary/25 hover:shadow-teal-primary/40 transition-all"
            >
              <span className="relative">Connect Your AI</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl font-semibold text-base text-white border-2 border-teal-primary/50 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-teal-primary shadow-lg shadow-teal-primary/0 hover:shadow-teal-primary/20"
            >
              See How It Works
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right: AI/Data Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] animate-float"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-primary/10 to-transparent rounded-3xl border border-white/5 backdrop-blur-sm glass-card-modern glow-teal" />
          <canvas ref={canvasRef} className="w-full h-full rounded-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
