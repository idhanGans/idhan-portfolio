"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading, SkillCard, CTASection } from "@/components/ui";
import { skills, skillCategories } from "@/lib/data";

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className=\"pt-32 pb-16 lg:pt-40 lg:pb-24 bg-mono-white\">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              subtitle="Tech Stack"
              title="Skills & Technologies"
              description="A comprehensive toolkit of technologies I use to build modern, performant, and scalable web applications."
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-mono-black text-mono-white"
                    : "bg-mono-grey-100 text-mono-black border border-mono-grey-200 hover:border-accent"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="section-container">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4"
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} {...skill} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Skills Section */}
      <section className="py-24 lg:py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Beyond the Code
              </h2>
              <p className="text-accent-dim text-lg mb-12">
                Technical skills are just part of the equation. Here are other
                competencies that help me deliver exceptional results.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "UI/UX Design",
                    description:
                      "Creating intuitive interfaces with user-centered design principles.",
                    skills: [
                      "Figma",
                      "Prototyping",
                      "User Research",
                      "Wireframing",
                    ],
                  },
                  {
                    title: "Performance Optimization",
                    description:
                      "Ensuring fast load times and smooth interactions.",
                    skills: [
                      "Core Web Vitals",
                      "Lighthouse",
                      "Bundle Analysis",
                      "Caching",
                    ],
                  },
                  {
                    title: "Accessibility",
                    description:
                      "Building inclusive experiences for all users.",
                    skills: [
                      "WCAG 2.1",
                      "Screen Readers",
                      "Keyboard Navigation",
                      "ARIA",
                    ],
                  },
                  {
                    title: "Version Control",
                    description:
                      "Collaborative development with proper Git workflows.",
                    skills: ["Git", "GitHub", "GitLab", "Code Review"],
                  },
                  {
                    title: "Testing",
                    description:
                      "Ensuring code quality through comprehensive testing.",
                    skills: [
                      "Jest",
                      "React Testing Library",
                      "Cypress",
                      "Playwright",
                    ],
                  },
                  {
                    title: "Agile Methodology",
                    description:
                      "Working effectively in agile development environments.",
                    skills: [
                      "Scrum",
                      "Kanban",
                      "Sprint Planning",
                      "Retrospectives",
                    ],
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors text-left"
                  >
                    <h3 className="text-white font-display font-semibold text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-accent-dim text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-accent"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-24 lg:py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-mono-black mb-6">
                Currently Exploring
              </h2>
              <p className="text-accent-dim text-lg mb-8">
                Technology never stops evolving, and neither do I. Here&apos;s
                what I&apos;m currently learning and experimenting with.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Rust",
                  "WebAssembly",
                  "AI/ML Integration",
                  "Edge Computing",
                  "Motion Design",
                  "Blender",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 bg-mono-grey-100 border border-mono-grey-200 rounded-lg text-mono-black text-sm font-medium hover:border-accent transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection variant="dark" />
    </>
  );
}
