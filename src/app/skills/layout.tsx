import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore the technologies and skills Idhan Zarkasyah uses to build modern web applications.",
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
