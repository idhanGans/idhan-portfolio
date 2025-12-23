"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface SkillCardProps {
  name: string;
  description: string;
  icon: IconType;
  color?: string;
  index?: number;
}

export default function SkillCard({
  name,
  description,
  icon: Icon,
  color = "#ffffff",
  index = 0,
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
        {/* Glow Effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
          style={{
            background: `radial-gradient(circle at center, ${color}20, transparent)`,
          }}
        />

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}10)`,
            border: `1px solid ${color}30`,
          }}
        >
          <Icon size={24} style={{ color }} />
        </div>

        {/* Content */}
        <h3 className="text-white font-display font-medium text-lg mb-2">
          {name}
        </h3>
        <p className="text-accent-dim text-sm leading-relaxed">{description}</p>

        {/* Hover Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full origin-left"
          style={{
            background: `linear-gradient(90deg, ${color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}
