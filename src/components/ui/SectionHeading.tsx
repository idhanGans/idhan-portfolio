"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  children?: ReactNode;
}

export default function SectionHeading({
  title,
  subtitle,
  description,
  align = "center",
  children,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  const containerAlign = {
    left: "items-start",
    center: "items-center",
    right: "items-end",
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${containerAlign} mb-12 lg:mb-16`}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-accent text-sm font-mono uppercase tracking-widest mb-4"
        >
          {subtitle}
        </motion.span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold text-mono-black ${alignClass}`}
      >
        {title}
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`mt-4 text-accent-dim text-lg max-w-2xl ${alignClass}`}
        >
          {description}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}
