"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMapPin, FiCalendar, FiCode } from "react-icons/fi";
import { Button, SectionHeading } from "@/components/ui";

const stats = [
  { label: "Years of Experience", value: "7+" },
  { label: "Leadership Track", value: "Deputy CEO" },
  { label: "Full-Stack View", value: "Op. to Tech" },
  { label: "Technologies", value: "20+" },
];

const interests = [
  "Strategic Operations",
  "Frontend Development",
  "React.js & Next.js",
  "Business-Tech Integration",
  "UI/UX Design",
  "Generative Art",
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
              title="Strategy Meets Code"
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
                    src="/idhan-profile.jpg"
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
                  <span>Malang, Indonesia</span>
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
                  I am Idhan Zarkasyah. I thrive at the intersection of
                  high-level business strategy and modern technical execution.
                </p>

                <p className="text-accent-dim leading-relaxed mb-6">
                  My professional foundation was forged in the Food and
                  Beverages industry, where I transitioned from managing daily
                  operations to serving as Deputy CEO at Start Up Company. This
                  journey has given me a rare full-cycle perspective—from
                  designing optimized layouts to architecting company-wide
                  growth strategies.
                </p>

                <p className="text-accent-dim leading-relaxed mb-6">
                  Driven by a passion for technology, I am currently leveraging
                  my problem-solving and strategic planning skills as a Junior
                  Web Developer specializing in the Front-End. My approach to
                  development is unique: I do not just write code; I build
                  solutions that are technically robust and perfectly aligned
                  with core business objectives and operational efficiency.
                </p>

                <p className="text-accent-dim leading-relaxed mb-8">
                  Whether you need a developer who understands the bottom line
                  or a strategist who can speak the language of tech, I am ready
                  to deliver. My experience covers the full cycle from
                  operational processes to executive leadership, now integrated
                  with modern development techniques.
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
                Professional Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Full-Cycle Expertise: From Operations to Technology
              </h2>
              <p className="text-accent-dim text-lg leading-relaxed mb-8">
                My unique value proposition comes from understanding both sides
                of business—the operational reality that makes companies run and
                the technical innovation that drives competitive advantage. I
                combine strategic thinking with hands-on development to create
                solutions that work.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Junior Web Developer",
                    description:
                      "High-performance UI with React.js, AI tool integration, and optimized code development.",
                  },
                  {
                    title: "Strategic Operations",
                    description:
                      "Executive liaison skills, inventory management, cost optimization, and project innovation.",
                  },
                  {
                    title: "Business Intelligence",
                    description:
                      "Financial planning, HR guidance, data analysis, and operational efficiency optimization.",
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
