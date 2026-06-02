"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

// Chart data
const corridorData = [
  { name: "US-41", rent: 42.83 },
  { name: "I-75", rent: 38.45 },
  { name: "Gulf Shore", rent: 36.92 },
  { name: "College", rent: 35.67 },
  { name: "Daniels", rent: 33.21 },
  { name: "McGregor", rent: 31.58 },
  { name: "Fort Myers", rent: 29.45 },
];

const homeValueData = [
  { month: "Jan", fort_myers: 285, estero: 395, bonita: 425 },
  { month: "Feb", fort_myers: 287, estero: 398, bonita: 428 },
  { month: "Mar", fort_myers: 290, estero: 402, bonita: 432 },
  { month: "Apr", fort_myers: 293, estero: 406, bonita: 436 },
  { month: "May", fort_myers: 296, estero: 410, bonita: 440 },
  { month: "Jun", fort_myers: 299, estero: 414, bonita: 444 },
  { month: "Jul", fort_myers: 303, estero: 419, bonita: 449 },
  { month: "Aug", fort_myers: 306, estero: 424, bonita: 454 },
  { month: "Sep", fort_myers: 310, estero: 429, bonita: 460 },
];

const metricsData = [
  { label: "Active Permits", value: "1,247", change: "+12.3%", color: "teal" },
  { label: "Avg Rent Growth", value: "6.8%", change: "+2.1%", color: "cyan" },
  {
    label: "Home Value Growth",
    value: "18.7%",
    change: "+4.2%",
    color: "teal",
  },
  { label: "Job Postings", value: "8,943", change: "+15.2%", color: "cyan" },
  {
    label: "Commercial Spaces",
    value: "2,156",
    change: "+8.4%",
    color: "teal",
  },
  { label: "Data Freshness", value: "< 48h", change: "Always", color: "cyan" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-dark border border-teal-primary/20 rounded-lg p-3 shadow-xl">
        <p className="text-teal-primary font-mono text-sm">
          {payload[0].name}: ${payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function Charts() {
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    setShowCharts(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="relative py-32 px-6 md:px-8 z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-teal-primary/80 bg-clip-text text-transparent">
            Live Market Intelligence
          </h2>
          <p className="text-lg text-gray-300 font-light">
            Real-time data insights for Southwest Florida
          </p>
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Corridor Rents - Horizontal Bar Chart */}
          <motion.div variants={chartVariants} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-primary/20 to-cyan-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
            <div className="relative bg-white/10 border border-teal-primary/30 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/[0.15] hover:border-teal-primary/40 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">
                Corridor Rents
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Average $/SF by corridor
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={corridorData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="rgba(255,255,255,0.5)"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="rent"
                    fill="url(#colorGradient)"
                    isAnimationActive={showCharts}
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#00b894"
                        stopOpacity={0.4}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Home Values - Area Chart */}
          <motion.div variants={chartVariants} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-primary/20 to-cyan-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
            <div className="relative bg-white/10 border border-teal-primary/30 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/[0.15] hover:border-teal-primary/40 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">
                36-Month Home Values
              </h3>
              <p className="text-sm text-gray-400 mb-6">Index trends by city</p>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={homeValueData}>
                  <defs>
                    <linearGradient
                      id="colorFortMyers"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorEstero"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#00b894" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00b894" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorBonita"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#0dd9c7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0dd9c7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="fort_myers"
                    stroke="#00d4aa"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorFortMyers)"
                    isAnimationActive={showCharts}
                  />
                  <Area
                    type="monotone"
                    dataKey="estero"
                    stroke="#00b894"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorEstero)"
                    isAnimationActive={showCharts}
                  />
                  <Area
                    type="monotone"
                    dataKey="bonita"
                    stroke="#0dd9c7"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBonita)"
                    isAnimationActive={showCharts}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          variants={chartVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {metricsData.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white/10 border rounded-2xl p-6 backdrop-blur-xl hover:bg-white/[0.15] transition-all hover:scale-105 ${
                metric.color === "teal"
                  ? "border-teal-primary/30 hover:border-teal-primary/50"
                  : "border-cyan-400/30 hover:border-cyan-400/50"
              }`}
            >
              <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold text-white font-mono">
                    {metric.value}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      metric.color === "teal"
                        ? "text-teal-primary"
                        : "text-cyan-400"
                    }`}
                  >
                    {metric.change}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                    metric.color === "teal"
                      ? "bg-teal-primary/20 text-teal-primary"
                      : "bg-cyan-400/20 text-cyan-400"
                  }`}
                >
                  📊
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
