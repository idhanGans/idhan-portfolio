"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import {
  Button,
  SectionHeading,
  ProjectCard,
  SkillCard,
} from "@/components/ui";
import { skills, projects } from "@/lib/data";

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);
  const featuredSkills = skills.slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="section-container py-32">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-accent">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
            >
              Hi, I&apos;m{" "}
              <span className="text-gradient-animated">Idhan Zarkasyah</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-accent mb-4"
            >
              Front End Developer & Creative Technologist
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-accent-dim text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              I craft immersive digital experiences through creative coding,
              interactive design, and cutting-edge web technologies.
              Specializing in React, Next.js, and WebGL.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link href="/projects">
                <Button size="lg" icon={<FiArrowRight size={18} />}>
                  View My Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Get In Touch
                </Button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4"
            >
              <motion.a
                href="https://github.com/idhanzarkasyah"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent hover:text-white hover:border-white/20 transition-colors"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/idhanzarkasyah"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent hover:text-white hover:border-white/20 transition-colors"
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="h-12 px-5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-accent hover:text-white hover:border-white/20 transition-colors text-sm font-medium"
              >
                <FiDownload size={16} />
                Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Skills Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <SectionHeading
            subtitle="Tech Stack"
            title="Skills & Technologies"
            description="A curated set of technologies I use to build modern, performant, and scalable web applications."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {featuredSkills.map((skill, index) => (
              <SkillCard key={skill.name} {...skill} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/skills">
              <Button variant="outline" icon={<FiArrowRight size={16} />}>
                View All Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-container">
        <div className="section-divider" />
      </div>

      {/* Featured Projects Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <SectionHeading
            subtitle="Portfolio"
            title="Featured Projects"
            description="Selected work that showcases my expertise in building complex, user-centric web applications."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} {...project} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/projects">
              <Button variant="outline" icon={<FiArrowRight size={16} />}>
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-container">
        <div className="section-divider" />
      </div>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Let&apos;s Build Something{" "}
              <span className="text-gradient">Amazing Together</span>
            </h2>
            <p className="text-accent-dim text-lg mb-10">
              I&apos;m currently available for freelance projects and full-time
              opportunities. If you have a project in mind or just want to chat,
              feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" icon={<FiArrowRight size={18} />}>
                  Start a Project
                </Button>
              </Link>
              <a href="mailto:hello@idhanzarkasyah.com">
                <Button variant="ghost" size="lg">
                  hello@idhanzarkasyah.com
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
