"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { SectionHeading, ExperienceCard, Button } from "@/components/ui";
import { experiences } from "@/lib/data";

const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Institut Teknologi Bandung",
    period: "2015 - 2019",
    description:
      "Focused on software engineering, web development, and human-computer interaction.",
  },
];

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
  },
  {
    name: "Meta Front-End Developer Professional Certificate",
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
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
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
      <section className="pb-24 lg:pb-32">
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
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Education
              </h2>
            </motion.div>

            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-accent mb-2">{edu.institution}</p>
                    <p className="text-accent-dim text-sm">{edu.description}</p>
                  </div>
                  <span className="text-accent-dim text-sm font-mono whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 lg:py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
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
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                >
                  <p className="text-accent-dim text-xs font-mono mb-2">
                    {cert.date}
                  </p>
                  <h3 className="text-white font-display font-medium mb-2">
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
      <section className="py-24 lg:py-32 border-t border-white/10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-accent-dim text-lg mb-8">
              I&apos;m currently open to new opportunities and exciting
              projects. Let&apos;s create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button icon={<FiArrowRight size={16} />}>Get In Touch</Button>
              </Link>
              <a href="/resume.pdf" download>
                <Button variant="secondary">Download Resume</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
