import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNginx,
  SiMongodb,
  SiMysql,
  SiSupabase,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiCss3,
  SiTrello,
  SiNotion,
  SiGooglesheets,
  SiLooker,
} from "react-icons/si";

export const skills = [
  {
    name: "JavaScript",
    description:
      "Dynamic scripting for interactive web experiences and modern applications.",
    icon: SiJavascript,
    color: "#F7DF1E",
    category: "frontend",
  },
  {
    name: "TypeScript",
    description:
      "Type-safe JavaScript for scalable and maintainable codebases.",
    icon: SiTypescript,
    color: "#3178C6",
    category: "frontend",
  },
  {
    name: "CSS3",
    description:
      "Modern styling with animations, grid, flexbox, and responsive design.",
    icon: SiCss3,
    color: "#1572B6",
    category: "frontend",
  },
  {
    name: "React",
    description:
      "Component-based UI library for building dynamic user interfaces.",
    icon: SiReact,
    color: "#61DAFB",
    category: "frontend",
  },
  {
    name: "Next.js",
    description:
      "Full-stack React framework with SSR, SSG, and edge capabilities.",
    icon: SiNextdotjs,
    color: "#0F0F0F",
    category: "frontend",
  },
  {
    name: "Vue.js",
    description:
      "Progressive framework for building approachable and versatile UIs.",
    icon: SiVuedotjs,
    color: "#4FC08D",
    category: "frontend",
  },
  {
    name: "Vite",
    description: "Lightning-fast build tool for modern frontend development.",
    icon: SiVite,
    color: "#646CFF",
    category: "frontend",
  },
  {
    name: "TailwindCSS",
    description: "Utility-first CSS framework for rapid UI development.",
    icon: SiTailwindcss,
    color: "#06B6D4",
    category: "frontend",
  },
  {
    name: "Node.js",
    description:
      "JavaScript runtime for building scalable server-side applications.",
    icon: SiNodedotjs,
    color: "#339933",
    category: "backend",
  },
  {
    name: "Express.js",
    description: "Minimalist web framework for Node.js backend services.",
    icon: SiExpress,
    color: "#000000",
    category: "backend",
  },
  {
    name: "Nginx",
    description: "High-performance web server and reverse proxy configuration.",
    icon: SiNginx,
    color: "#009639",
    category: "backend",
  },
  {
    name: "MongoDB",
    description:
      "NoSQL database for flexible, scalable data storage solutions.",
    icon: SiMongodb,
    color: "#47A248",
    category: "database",
  },
  {
    name: "MySQL",
    description:
      "Relational database management for structured data applications.",
    icon: SiMysql,
    color: "#4479A1",
    category: "database",
  },
  {
    name: "Supabase",
    description: "Open-source Firebase alternative with PostgreSQL backend.",
    icon: SiSupabase,
    color: "#3ECF8E",
    category: "database",
  },
  {
    name: "Vercel",
    description: "Edge deployment platform optimized for frontend frameworks.",
    icon: SiVercel,
    color: "#0F0F0F",
    category: "deployment",
  },
  {
    name: "Netlify",
    description: "Automated deployment and serverless backend services.",
    icon: SiNetlify,
    color: "#00C7B7",
    category: "deployment",
  },
  {
    name: "Figma",
    description:
      "Collaborative design tool for UI/UX and prototyping workflows.",
    icon: SiFigma,
    color: "#F24E1E",
    category: "design",
  },
  {
    name: "Trello",
    description: "Project management and task organization tool.",
    icon: SiTrello,
    color: "#0052CC",
    category: "tools",
  },
  {
    name: "Notion",
    description:
      "All-in-one workspace for notes, databases, and documentation.",
    icon: SiNotion,
    color: "#0F0F0F",
    category: "tools",
  },
  {
    name: "Google Workspace",
    description: "Collaborative suite including Docs, Sheets, and Drive.",
    icon: SiGooglesheets,
    color: "#34A853",
    category: "tools",
  },
  {
    name: "Google Looker Studio",
    description: "Data visualization and business intelligence dashboards.",
    icon: SiLooker,
    color: "#EA4335",
    category: "tools",
  },
];

export const skillCategories = [
  { id: "all", name: "All Skills" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "database", name: "Database" },
  { id: "deployment", name: "Deployment" },
  { id: "design", name: "Design" },
  { id: "tools", name: "Tools" },
];
