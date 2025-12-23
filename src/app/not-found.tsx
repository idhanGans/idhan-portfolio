"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="text-8xl md:text-9xl font-display font-bold text-gradient-animated">
              404
            </span>
          </motion.div>

          {/* Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-accent-dim text-lg mb-10"
          >
            Oops! The page you&apos;re looking for seems to have drifted into
            the nebula. Let&apos;s get you back on track.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/">
              <Button icon={<FiHome size={16} />} iconPosition="left">
                Back to Home
              </Button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 text-accent hover:text-white transition-colors"
            >
              <FiArrowLeft size={16} />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <p className="text-accent-dim text-sm mb-4">Popular pages</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "About", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Skills", href: "/skills" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link key={link.name} href={link.href}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-accent hover:text-white hover:border-white/20 transition-colors text-sm"
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
