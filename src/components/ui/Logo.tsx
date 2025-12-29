"use client";

import { motion } from "framer-motion";
import { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  showText?: boolean;
}

const sizeMap = {
  sm: { svg: 32, dot: 8 },
  md: { svg: 48, dot: 10 },
  lg: { svg: 64, dot: 14 },
};

export default function Logo({
  size = "md",
  animated = true,
  showText = false,
  className = "",
  ...props
}: LogoProps) {
  const dimensions = sizeMap[size];

  const LogoSVG = (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Background circle with gradient border */}
      <defs>
        <linearGradient
          id="logoGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Inner circle */}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="#ffffff"
        fillOpacity="0.03"
      />

      {/* Letter I - vertical line */}
      <line
        x1="50"
        y1="28"
        x2="50"
        y2="72"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Decorative dots */}
      {/* Top-left dot */}
      <circle
        cx="32"
        cy="30"
        r="2.5"
        fill="#ffffff"
        opacity="0.4"
      />

      {/* Top-right dot */}
      <circle
        cx="68"
        cy="35"
        r="2"
        fill="#ffffff"
        opacity="0.5"
      />

      {/* Bottom-left dot */}
      <circle
        cx="28"
        cy="70"
        r="2"
        fill="#ffffff"
        opacity="0.3"
      />

      {/* Bottom-right accent */}
      <circle
        cx="72"
        cy="68"
        r="2.5"
        fill="#ffffff"
        opacity="0.6"
      />
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: dimensions.svg, height: dimensions.svg }}
        >
          {LogoSVG}
        </motion.div>
        {showText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white font-display font-medium text-sm">
              Idhan Zarkasyah
            </p>
            <p className="text-accent-dim text-xs">Front End Developer</p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div
      style={{ width: dimensions.svg, height: dimensions.svg }}
      className="flex items-center justify-center"
    >
      {LogoSVG}
    </div>
  );
}
