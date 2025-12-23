"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiDownload,
  FiMapPin,
  FiCalendar,
  FiCode,
} from "react-icons/fi";
import { Button, SectionHeading } from "@/components/ui";

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Technologies", value: "20+" },
];

const interests = [
  "Creative Coding",
  "WebGL & Shaders",
  "UI/UX Design",
  "Open Source",
  "Performance Optimization",
  "Design Systems",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              subtitle="About Me"
              title="The Story Behind the Code"
              align="left"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 lg:pb-32">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=face"
                    alt="Idhan Zarkasyah"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
                </div>

                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 p-4 bg-secondary/90 backdrop-blur-lg border border-white/10 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <FiCode size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        Frontend Focus
                      </p>
                      <p className="text-accent-dim text-xs">React & Next.js</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quick Info */}
              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-3 text-accent-dim">
                  <FiMapPin size={18} />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-3 text-accent-dim">
                  <FiCalendar size={18} />
                  <span>Available for new projects</span>
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-7"
            >
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-accent leading-relaxed mb-6">
                  I&apos;m a Front End Developer with over 5 years of experience
                  building web applications that combine beautiful design with
                  exceptional user experience.
                </p>

                <p className="text-accent-dim leading-relaxed mb-6">
                  My journey in web development started when I was fascinated by
                  how websites could create immersive experiences. Since then,
                  I&apos;ve been dedicated to mastering the craft of building
                  interactive, performant, and accessible web applications.
                </p>

                <p className="text-accent-dim leading-relaxed mb-6">
                  I specialize in React ecosystem, particularly Next.js, and
                  have a strong passion for creative coding using Three.js and
                  WebGL. I believe that the best digital products are born from
                  the intersection of solid engineering and thoughtful design.
                </p>

                <p className="text-accent-dim leading-relaxed mb-8">
                  When I&apos;m not coding, you can find me exploring new design
                  trends, contributing to open-source projects, or experimenting
                  with generative art and creative coding experiments.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-white/10 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center sm:text-left"
                  >
                    <p className="text-3xl font-display font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-accent-dim text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Interests */}
              <div className="mb-8">
                <h3 className="text-white font-display font-semibold text-lg mb-4">
                  Areas of Interest
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-accent text-sm hover:border-white/20 transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button icon={<FiArrowRight size={16} />}>
                    Let&apos;s Work Together
                  </Button>
                </Link>
                <a href="/resume.pdf" download>
                  <Button variant="secondary" icon={<FiDownload size={16} />}>
                    Download Resume
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="text-accent text-sm font-mono uppercase tracking-widest mb-3 block">
                My Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Code is Poetry, Design is Emotion
              </h2>
              <p className="text-accent-dim text-lg leading-relaxed mb-8">
                I believe that great software is not just about
                functionality—it&apos;s about creating experiences that resonate
                with users. Every line of code I write is crafted with
                intention, every animation is designed to delight, and every
                interaction is optimized for seamless user experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "User-Centric",
                    description:
                      "Every decision starts with understanding user needs and behaviors.",
                  },
                  {
                    title: "Performance First",
                    description:
                      "Fast, responsive applications that work flawlessly on any device.",
                  },
                  {
                    title: "Continuous Learning",
                    description:
                      "Staying ahead of trends while mastering the fundamentals.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                  >
                    <h3 className="text-white font-display font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-accent-dim text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
