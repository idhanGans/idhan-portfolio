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
      viewBox="0 0 140 140"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id="logoGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer circle background */}
      <circle
        cx="70"
        cy="70"
        r="65"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Tech accent icons in orbit */}
      {/* React/Component icon - top */}
      <g opacity="0.5" filter="url(#glow)">
        <circle cx="70" cy="15" r="2.5" fill="#ffffff" />
        <circle cx="65" cy="18" r="1.5" fill="#ffffff" />
        <circle cx="75" cy="18" r="1.5" fill="#ffffff" />
      </g>

      {/* Code bracket icon - top right */}
      <g opacity="0.5" filter="url(#glow)">
        <path
          d="M 120 32 L 118 35 L 120 38"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Gear/Settings icon - right */}
      <g opacity="0.5" filter="url(#glow)">
        <circle cx="130" cy="70" r="3" fill="none" stroke="#ffffff" strokeWidth="1" />
        <line x1="126" y1="70" x2="124" y2="70" stroke="#ffffff" strokeWidth="1" />
        <line x1="134" y1="70" x2="136" y2="70" stroke="#ffffff" strokeWidth="1" />
        <line x1="130" y1="66" x2="130" y2="64" stroke="#ffffff" strokeWidth="1" />
        <line x1="130" y1="76" x2="130" y2="78" stroke="#ffffff" strokeWidth="1" />
      </g>

      {/* Code bracket icon - bottom right */}
      <g opacity="0.5" filter="url(#glow)">
        <path
          d="M 115 105 L 118 110 L 115 115"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Database/Stack icon - bottom */}
      <g opacity="0.5" filter="url(#glow)">
        <ellipse cx="70" cy="128" rx="4" ry="2" fill="none" stroke="#ffffff" strokeWidth="1" />
        <path
          d="M 66 128 L 66 125 Q 70 126 74 125 L 74 128"
          stroke="#ffffff"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* Code bracket icon - bottom left */}
      <g opacity="0.5" filter="url(#glow)">
        <path
          d="M 25 105 L 22 110 L 25 115"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Terminal/Dev icon - left */}
      <g opacity="0.5" filter="url(#glow)">
        <rect x="12" y="65" width="10" height="10" fill="none" stroke="#ffffff" strokeWidth="1" />
        <line x1="14" y1="68" x2="18" y2="68" stroke="#ffffff" strokeWidth="1" />
        <line x1="14" y1="72" x2="20" y2="72" stroke="#ffffff" strokeWidth="1" />
      </g>

      {/* Triangle/Arrow icon - top left */}
      <g opacity="0.5" filter="url(#glow)">
        <path
          d="M 30 30 L 28 35 L 32 35 Z"
          stroke="#ffffff"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* Central circle background for IZ */}
      <circle
        cx="70"
        cy="70"
        r="35"
        fill="#ffffff"
        fillOpacity="0.05"
        stroke="url(#logoGradient)"
        strokeWidth="1.5"
      />

      {/* IZ Text - Main Focus */}
      <text
        x="70"
        y="78"
        textAnchor="middle"
        fontSize="42"
        fontWeight="bold"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="#ffffff"
        opacity="0.95"
      >
        IZ
      </text>

      {/* Subtle decorative elements under IZ */}
      <line x1="48" y1="88" x2="92" y2="88" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
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
            <p className="text-white font-tech text-base tracking-wider leading-tight">
              Idhan Zarkasyah
            </p>
            <p className="text-accent-dim text-xs font-light tracking-wide mt-0.5">Front End Developer</p>
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
