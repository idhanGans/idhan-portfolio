"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading, ProjectCard, CTASection } from "@/components/ui";
import { projects, projectCategories } from "@/lib/data";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-mono-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              subtitle="Portfolio"
              title="Featured Projects"
              description="A collection of projects that showcase my expertise in building complex, user-centric web applications."
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {projectCategories.map((category) => (
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

      {/* Projects Grid */}
      <section className="pb-24 lg:pb-32 bg-mono-grey-50">
        <div className="section-container">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                index={index}
                featured={project.featured && activeCategory === "all"}
              />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-accent-dim text-lg">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection variant="dark" />
    </>
  );
}
