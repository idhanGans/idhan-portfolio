"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiCode } from "react-icons/fi";
import { SectionHeading, CTASection } from "@/components/ui";

const experiments = [
  {
    id: "shader-art",
    title: "Shader Art Gallery",
    description:
      "A collection of GLSL shader experiments exploring procedural patterns, noise functions, and visual effects.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    tags: ["GLSL", "Three.js", "WebGL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "particle-physics",
    title: "Particle Physics Simulation",
    description:
      "Interactive particle system simulating gravitational forces and collision detection in real-time.",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    tags: ["React Three Fiber", "Physics", "WebGL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "audio-visualizer",
    title: "Audio Visualizer",
    description:
      "Real-time audio visualization using Web Audio API and procedural mesh deformation.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
    tags: ["Web Audio API", "Canvas", "Three.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "generative-art",
    title: "Generative Art Collection",
    description:
      "Algorithmic art pieces created using mathematical functions and randomness for unique visual patterns.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    tags: ["p5.js", "Canvas", "Algorithms"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "motion-study",
    title: "Motion & Easing Study",
    description:
      "Exploring different easing functions and motion principles for UI animations.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    tags: ["Framer Motion", "GSAP", "CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "3d-typography",
    title: "3D Typography",
    description:
      "Experimental 3D text rendering with custom shaders and interactive camera controls.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    tags: ["Three.js", "Typography", "Shaders"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export default function PlaygroundPage() {
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
              subtitle="Experiments"
              title="Creative Playground"
              description="A space for creative coding experiments, exploring new technologies, and pushing the boundaries of web experiences."
            />
          </motion.div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={experiment.image}
                      alt={experiment.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Overlay Links */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <a
                        href={experiment.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-primary-dark/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-colors"
                      >
                        <FiGithub size={18} />
                      </a>
                      <a
                        href={experiment.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-primary-dark/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-colors"
                      >
                        <FiExternalLink size={18} />
                      </a>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white flex items-center gap-1">
                        <FiCode size={12} />
                        Experiment
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-accent-silver transition-colors">
                      {experiment.title}
                    </h3>
                    <p className="text-accent-dim text-sm mb-4 line-clamp-2">
                      {experiment.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {experiment.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 lg:py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Why a Playground?
              </h2>
              <p className="text-accent-dim text-lg mb-8 leading-relaxed">
                The playground is where I push boundaries and explore ideas
                without constraints. These experiments often lead to techniques
                and solutions I later apply to client projects. It&apos;s my
                creative laboratory for innovation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  {
                    title: "Learn by Doing",
                    description:
                      "Hands-on experimentation is the best way to master new technologies.",
                  },
                  {
                    title: "Stay Curious",
                    description:
                      "Exploring new ideas keeps creativity flowing and skills sharp.",
                  },
                  {
                    title: "Share Knowledge",
                    description:
                      "Open-sourcing experiments helps the community grow together.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-mono-white border border-mono-grey-200 rounded-lg hover:border-accent hover:shadow-lg transition-all"
                  >
                    <h3 className="text-mono-black font-display font-medium mb-2">
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

      {/* CTA Section */}
      <CTASection
        title="Let's Create Something Unique"
        description="Interested in collaborating on an experimental project or want to bring a creative vision to life? I'm always excited to push boundaries."
        buttonText="Discuss Your Idea"
        variant="dark"
      />
    </>
  );
}
