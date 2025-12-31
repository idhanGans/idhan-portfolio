"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: "dark" | "light";
}

export default function CTASection({
  title = "Have a Project in Mind?",
  description = "I'm always excited to work on new challenges. Let's discuss how I can help bring your ideas to life.",
  buttonText = "Start a Conversation",
  buttonHref = "/contact",
  variant = "dark",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative py-6 lg:py-8 overflow-hidden ${
        isDark ? "bg-mono-black" : "bg-mono-grey-50"
      }`}
    >
      {/* Animated background particles/stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomDelay = Math.random() * 3;
          const randomDuration = 4 + Math.random() * 4;
          
          return (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? "bg-mono-grey-400" : "bg-mono-grey-300"
              }`}
              initial={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                opacity: 0.2,
                scale: 1,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.8, 1],
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 ${
              isDark ? "text-mono-white" : "text-mono-black"
            }`}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg lg:text-xl mb-10 leading-relaxed ${
              isDark ? "text-mono-grey-200" : "text-accent-dim"
            }`}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href={buttonHref}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center gap-2 px-8 py-4 font-medium text-base rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isDark
                    ? "bg-mono-white text-mono-black hover:bg-mono-grey-100"
                    : "bg-mono-black text-mono-white hover:bg-mono-charcoal"
                }`}
              >
                {buttonText}
                <FiArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`mt-16 h-px w-32 mx-auto ${
              isDark
                ? "bg-gradient-to-r from-transparent via-mono-grey-400 to-transparent"
                : "bg-gradient-to-r from-transparent via-mono-grey-300 to-transparent"
            }`}
          />
        </motion.div>
      </div>
    </section>
  );
}
