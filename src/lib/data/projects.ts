export const projects = [
  {
    id: "ecommerce-platform",
    title: "Modern Clothing E-Commerce",
    description:
      "A sophisticated fashion e-commerce platform featuring advanced product filtering, dynamic shopping cart, secure Stripe payment integration, and real-time inventory management. Includes user authentication, order tracking, wishlist functionality, and a responsive design optimized for seamless shopping across all devices.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop&q=80",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma", "TailwindCSS", "NextAuth"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/idhanGans",
    featured: true,
    category: "fullstack",
  },
  {
    id: "hr-dashboard",
    title: "HR Management Dashboard",
    description:
      "A comprehensive HR dashboard for managing employees, tracking attendance, monitoring performance metrics, and handling payroll. Features real-time analytics, employee self-service portal, and automated reporting with interactive data visualizations.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop&q=80",
    tags: ["React", "Node.js", "PostgreSQL", "Chart.js", "TailwindCSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/idhanGans",
    featured: false,
    category: "fullstack",
  },
  {
    id: "task-management",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team workspace features.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Firebase", "Vuetify", "WebSocket"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/idhanGans",
    featured: false,
    category: "frontend",
  },
  {
    id: "ai-dashboard",
    title: "AI Analytics Dashboard",
    description:
      "An interactive dashboard for visualizing AI model performance metrics with real-time data streaming and customizable widgets.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    tags: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/idhanGans",
    featured: true,
    category: "fullstack",
  },
  {
    id: "weather-app",
    title: "Weather Forecast App",
    description:
      "A beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
    tags: ["React Native", "TypeScript", "OpenWeather API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/idhanGans",
    featured: false,
    category: "mobile",
  },
  {
    id: "blog-platform",
    title: "Developer Blog Platform",
    description:
      "A modern blogging platform for developers with Markdown support, syntax highlighting, and SEO optimization.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    tags: ["Next.js", "MDX", "Prisma", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/idhanGans",
    featured: false,
    category: "fullstack",
  },
];

export const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "frontend", name: "Frontend" },
  { id: "fullstack", name: "Full Stack" },
  { id: "mobile", name: "Mobile" },
];
