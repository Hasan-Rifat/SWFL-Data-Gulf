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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient leading-tight mb-6">
              The Proof Is In The Data
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-normal leading-relaxed max-w-xl">
              Southwest Florida's AI-ready data layer for property, labor,
              permits, commercial real estate, and tourism intelligence.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-teal-primary to-teal-secondary text-navy-dark px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg shadow-teal-primary/25 hover:shadow-teal-primary/40"
            >
              Connect Your AI
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/5 text-white px-8 py-4 rounded-xl font-medium text-base border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
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
          className="relative h-[400px] md:h-[500px] lg:h-[600px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-primary/10 to-transparent rounded-3xl border border-white/5 backdrop-blur-sm" />
          <canvas ref={canvasRef} className="w-full h-full rounded-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
