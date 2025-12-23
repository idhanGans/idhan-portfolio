"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  featured = false,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`group relative ${featured ? "md:col-span-2" : ""}`}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500">
        {/* Image Container */}
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[2/1]" : "aspect-video"
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Links */}
          <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-primary-dark/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-colors"
              >
                <FiGithub size={18} />
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-primary-dark/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-colors"
              >
                <FiExternalLink size={18} />
              </motion.a>
            )}
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white">
                Featured Project
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-accent-silver transition-colors">
            {title}
          </h3>
          <p className="text-accent-dim text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-silver via-accent to-transparent origin-left"
        />
      </div>
    </motion.div>
  );
}
