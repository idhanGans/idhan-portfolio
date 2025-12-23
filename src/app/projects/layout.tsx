import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the portfolio of projects built by Idhan Zarkasyah, showcasing expertise in React, Next.js, and modern web development.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
