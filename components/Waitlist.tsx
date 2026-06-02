"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const interestOptions = [
    { id: "real-estate", label: "Real Estate" },
    { id: "franchise", label: "Franchise" },
    { id: "labor", label: "Labor" },
    { id: "development", label: "Development" },
    { id: "all", label: "All Updates" },
  ];

  const toggleInterest = (id: string) => {
    if (id === "all") {
      if (interests.includes("all")) {
        setInterests([]);
      } else {
        setInterests(["all"]);
      }
    } else {
      const filtered = interests.filter((i) => i !== "all");
      if (filtered.includes(id)) {
        setInterests(filtered.filter((i) => i !== id));
      } else {
        setInterests([...filtered, id]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || interests.length === 0) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setEmail("");
    setInterests([]);
    setIsLoading(false);

    // Reset after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="relative py-32 px-6 md:px-8 z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-primary/5 to-transparent pointer-events-none" />
      <div className="max-w-2xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-teal-primary/80 bg-clip-text text-transparent">
            Join the Waitlist
          </h2>
          <p className="text-lg text-gray-300 font-light">
            Be first to access SWFL Data Gulf when it launches
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-teal-primary/20 to-cyan-400/10 border border-teal-primary/30 rounded-2xl p-12 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-teal-primary/20 rounded-full mb-4"
              >
                <Check className="w-8 h-8 text-teal-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                You're on the list!
              </h3>
              <p className="text-gray-400">
                Check your email for updates. We'll reach out soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-primary/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </motion.div>

              {/* Interest Checkboxes */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <label className="block text-sm font-medium text-gray-400">
                  I'm interested in:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interestOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => toggleInterest(option.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                        interests.includes(option.id)
                          ? "bg-teal-primary text-navy-dark border border-teal-primary"
                          : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
                {interests.length === 0 && (
                  <p className="text-xs text-red-400/70">
                    Select at least one interest
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || interests.length === 0}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-teal-primary to-teal-secondary text-navy-dark py-4 rounded-xl font-semibold text-base transition-all shadow-lg shadow-teal-primary/25 hover:shadow-teal-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Joining..." : "Join Waitlist"}
              </motion.button>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
