"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
    ],
    Company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
    Legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Disclaimer", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: "𝕏", href: "#", label: "Twitter" },
    { icon: "in", href: "#", label: "LinkedIn" },
    { icon: "gh", href: "#", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-navy-dark border-t border-white/5 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Image
                  src="/logo.webp"
                  alt="SWFL Data Gulf"
                  width={40}
                  height={40}
                  className="relative rounded-lg"
                />
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                SWFL Data
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI-ready data layer for Southwest Florida. Property, labor,
              permits, CRE, tourism intelligence.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white hover:bg-teal-primary hover:border-teal-primary hover:text-navy-dark transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map((section, idx) => (
            <motion.div
              key={section[0]}
              initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4">{section[0]}</h4>
              <ul className="space-y-3">
                {section[1].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-teal-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/5 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-gray-500">
              <p>© {currentYear} SWFL Data Gulf. All rights reserved.</p>
              <p className="mt-2 text-xs">
                Powered by real-time data intelligence for Southwest Florida.
              </p>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 glass-card-modern border border-white/10 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-teal-primary rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Systems Operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
