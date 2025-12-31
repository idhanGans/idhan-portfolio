"use client";

import { motion } from "framer-motion";

interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  current?: boolean;
  index?: number;
}

export default function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
  technologies,
  current = false,
  index = 0,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-accent/50 to-transparent" />

      {/* Timeline Dot */}
      <div
        className={`absolute left-0 top-2 w-2 h-2 -translate-x-1/2 rounded-full ${
          current ? "bg-mono-black ring-4 ring-mono-grey-200" : "bg-accent"
        }`}
      />

      {/* Content */}
      <div className="group">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-display font-semibold text-mono-black group-hover:text-accent-dim transition-colors">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
              <span className="text-mono-black font-medium">{company}</span>
              <span className="text-accent">•</span>
              <span className="text-accent">{location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {current && (
              <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full border border-green-200">
                Current
              </span>
            )}
            <span className="text-accent text-sm font-mono">{period}</span>
          </div>
        </div>

        {/* Description */}
        <ul className="space-y-2 mb-4">
          {description.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className="text-accent-dim text-sm leading-relaxed flex items-start gap-2"
            >
              <span className="text-mono-black mt-1.5">▹</span>
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-mono-grey-50 border border-mono-grey-200 rounded-full text-mono-black hover:border-accent transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
