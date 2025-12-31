"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { SectionHeading, ExperienceCard, CTASection } from "@/components/ui";
import { experiences } from "@/lib/data";

const education = [
  {
    degree: "Bachelor of Economics",
    institution: "Brawijaya University, Indonesia",
    period: "2020",
    description: "Focused on economics and business management.",
  },
  {
    degree: "Bachelor of Arts",
    institution: "Leipzig University, Germany",
    period: "2015",
    description: "Focused on administration and social sciences.",
  },
];

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
  },
  {
    name: "Meta Programming With Javascript Certification",
    issuer: "Meta (Coursera)",
    date: "2022",
  },
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google (Coursera)",
    date: "2021",
  },
];

export default function ExperiencePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-1 bg-mono-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              subtitle="Career"
              title="Professional Experience"
              description="My journey through the tech industry, building products and leading teams."
            />
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="pb-24 lg:pb-32 bg-mono-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.title + experience.company}
                {...experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-container">
        <div className="section-divider" />
      </div>

      {/* Education Section */}
      <section className="py-24 lg:py-32 bg-mono-grey-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-mono-black mb-4">
                Education
              </h2>
            </motion.div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-mono-white border border-mono-grey-200 rounded-lg hover:border-accent hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-mono-black mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-mono-black font-medium mb-2">
                        {edu.institution}
                      </p>
                      <p className="text-accent-dim text-sm">
                        {edu.description}
                      </p>
                    </div>
                    <span className="text-accent text-sm font-mono whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 lg:py-32 border-t border-mono-grey-200 bg-mono-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-mono-black mb-4">
                Certifications
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-mono-white border border-mono-grey-200 rounded-lg hover:border-accent hover:shadow-lg transition-all"
                >
                  <p className="text-accent text-xs font-mono mb-2">
                    {cert.date}
                  </p>
                  <h3 className="text-mono-black font-display font-medium mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-accent-dim text-sm">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Work Together?"
        description="I'm currently open to new opportunities and exciting projects. Let's create something amazing together."
        buttonText="Get In Touch"
        variant="dark"
      />
    </>
  );
}
