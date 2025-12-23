import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Creative coding experiments and explorations by Idhan Zarkasyah.",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
