"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiGithub, FiLinkedin } from "react-icons/fi";
import {
  Button,
  SectionHeading,
  ProjectCard,
  SkillCard,
  CTASection,
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
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mono-white">
        <div className="section-container py-20 lg:py-24">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-mono-grey-100 border border-mono-grey-200 rounded-full text-sm text-mono-black font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-mono-black leading-tight mb-6"
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
              Specializing in React, Next.js, and WebGL. Helping You to grow
              Your business through innovative tech solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
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
                href="https://github.com/idhanGans"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-lg bg-mono-grey-100 border border-mono-grey-200 flex items-center justify-center text-accent hover:text-mono-black hover:border-accent transition-colors"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/idhan-zarkasyah-225b42261/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-lg bg-mono-grey-100 border border-mono-grey-200 flex items-center justify-center text-accent hover:text-mono-black hover:border-accent transition-colors"
              >
                <FiLinkedin size={20} />
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
            className="w-6 h-10 rounded-full border-2 border-mono-grey-300 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-accent rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-24 lg:py-32 bg-mono-grey-50">
        <div className="section-container">
          <SectionHeading
            subtitle="Tech Stack"
            title="Skills & Technologies"
            description="A comprehensive toolkit of technologies I use to build modern, performant, and scalable web applications."
          />

          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4"
          >
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} {...skill} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-container">
        <div className="section-divider" />
      </div>

      {/* Featured Projects Section */}
      <section className="py-20 lg:py-28 bg-mono-white">
        <div className="section-container">
          <SectionHeading
            subtitle="Portfolio"
            title="Featured Projects"
            description="Selected work that showcases my expertise in building complex, user-centric web applications."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-3 mb-8">
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
      <CTASection
        title="Let's Build Something Amazing Together"
        description="I'm currently available for freelance projects and full-time opportunities. If you have a project in mind or just want to chat, feel free to reach out."
        buttonText="Start a Project"
        variant="dark"
      />
    </>
  );
}
