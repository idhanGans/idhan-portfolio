"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/idhanGans",
      icon: FiGithub,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/idhan-zarkasyah-225b42261/",
      icon: FiLinkedin,
    },
    {
      name: "Email",
      href: "mailto:idhan.arbeitsplatz@gmail.com",
      icon: FiMail,
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-mono-grey-200 bg-mono-grey-50/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mono-grey-200 to-mono-grey-100 border border-mono-grey-300 flex items-center justify-center">
                  <span className="font-display font-bold text-mono-black text-xl">
                    IZ
                  </span>
                </div>
                <div>
                  <p className="text-mono-black font-display font-semibold">
                    Idhan Zarkasyah
                  </p>
                  <p className="text-accent text-sm">Front End Developer</p>
                </div>
              </motion.div>
            </Link>
            <p className="text-accent text-sm leading-relaxed max-w-sm mb-6">
              Crafting immersive digital experiences through creative coding,
              interactive design, and cutting-edge web technologies. Helping You
              to Bring Your Ideas to Life.
            </p>
            <p className="text-accent text-sm mb-4">
              Connect with me on social media:
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-mono-white border border-mono-grey-300 flex items-center justify-center text-accent hover:text-mono-black hover:border-accent transition-colors"
                >
                  <item.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-mono-black font-display font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="text-accent hover:text-mono-black transition-colors text-sm flex items-center gap-1 group"
                    >
                      {item.name}
                      <FiArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-mono-black font-display font-semibold mb-4">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <p className="text-accent text-sm">
                Available for freelance projects and full-time opportunities.
              </p>
              <a
                href="mailto:idhan.arbeitsplatz@gmail.com"
                className="text-mono-black font-medium hover:text-accent-dim transition-colors"
              >
                idhan.arbeitsplatz@gmail.com
              </a>
              <div className="pt-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-mono-black text-mono-white font-medium text-sm rounded-lg hover:bg-mono-charcoal transition-colors inline-flex items-center gap-2"
                  >
                    Start a Project
                    <FiArrowUpRight size={16} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-mono-grey-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-accent text-sm">
            © {currentYear} Idhan Zarkasyah. All rights reserved.
          </p>
          <p className="text-accent text-xs">
            Built with Next.js, React Three Fiber & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
