import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
  Share_Tech,
} from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { Navigation, Footer } from "@/components/ui";

// Dynamic import for Scene to prevent SSR issues
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-primary-dark z-0">
      <div className="absolute inset-0 bg-gradient-radial from-secondary via-primary-dark to-primary-dark opacity-50" />
    </div>
  ),
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const shareTech = Share_Tech({
  subsets: ["latin"],
  variable: "--font-share-tech",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Idhan Zarkasyah — Front End Developer",
    template: "%s | Idhan Zarkasyah",
  },
  description:
    "Front End Developer specializing in React, Next.js, and creative web experiences. Building immersive digital products with cutting-edge technologies.",
  keywords: [
    "Front End Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "UI/UX",
    "Three.js",
    "Creative Developer",
    "Indonesia",
  ],
  authors: [{ name: "Idhan Zarkasyah" }],
  creator: "Idhan Zarkasyah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://idhanzarkasyah.com",
    siteName: "Idhan Zarkasyah Portfolio",
    title: "Idhan Zarkasyah — Front End Developer",
    description:
      "Front End Developer specializing in React, Next.js, and creative web experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Idhan Zarkasyah Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Idhan Zarkasyah — Front End Developer",
    description:
      "Front End Developer specializing in React, Next.js, and creative web experiences.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${shareTech.variable}`}
    >
      <body className="min-h-screen bg-primary-dark font-sans antialiased">
        {/* 3D Background */}
        <Scene />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
