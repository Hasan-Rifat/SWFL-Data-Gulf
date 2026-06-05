"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const installCommands = {
  "claude-cli": {
    title: "Claude CLI",
    command:
      "mcp install model-context-protocol://swfl-data-gulf --name swfl-data-gulf",
    description: "Install directly to your Claude CLI configuration",
  },
  "claude-desktop": {
    title: "Claude Desktop",
    command:
      'Add to your config.json:\n{\n  "mcpServers": {\n    "swfl-data-gulf": {\n      "command": "node",\n      "args": ["./swfl-data-gulf-mcp"]\n    }\n  }\n}',
    description: "Configure for Claude Desktop App",
  },
  cursor: {
    title: "Cursor",
    command:
      "mcp install model-context-protocol://swfl-data-gulf --name swfl-data-gulf --for cursor",
    description: "Set up MCP server for Cursor IDE",
  },
  windsurf: {
    title: "Windsurf",
    command:
      "mcp install model-context-protocol://swfl-data-gulf --name swfl-data-gulf --for windsurf",
    description: "Configure for Windsurf editor",
  },
};

export default function MCPInstall() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof installCommands>("claude-cli");
  const [copiedTab, setCopiedTab] = useState<
    keyof typeof installCommands | null
  >(null);

  const handleCopy = (tab: keyof typeof installCommands) => {
    navigator.clipboard.writeText(installCommands[tab].command);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <section className="relative py-32 px-6 md:px-8 z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-teal-primary/80 bg-clip-text text-transparent">
            Install MCP Server
          </h2>
          <p className="text-lg text-gray-300 font-light">
            Connect SWFL Data Gulf to your preferred AI tool in seconds
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {(
              Object.keys(installCommands) as Array<
                keyof typeof installCommands
              >
            ).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab
                    ? "btn-gradient text-navy-dark"
                    : "bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {installCommands[tab].title}
              </motion.button>
            ))}
          </div>

          {/* Command Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="relative glass-card-modern border border-white/10 rounded-2xl p-8 hover:border-teal-primary/30 transition-all">
                <p className="text-sm text-gray-400 mb-6">
                  {installCommands[activeTab].description}
                </p>
                <div className="relative">
                  <pre className="text-teal-primary font-mono text-sm overflow-x-auto pb-4">
                    <code>{installCommands[activeTab].command}</code>
                  </pre>
                  <motion.button
                    onClick={() =>
                      handleCopy(activeTab as keyof typeof installCommands)
                    }
                    className="absolute top-4 right-4 p-2 bg-white/[0.06] hover:bg-teal-primary/20 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copiedTab === activeTab ? (
                      <Check className="w-5 h-5 text-teal-primary" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-300" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="inline-block bg-white/[0.04] border border-white/10 rounded-full px-6 py-3 text-gray-300 font-light">
            ✨ One-click install coming · ChatGPT integration in progress
          </p>
        </motion.div>
      </div>
    </section>
  );
}
