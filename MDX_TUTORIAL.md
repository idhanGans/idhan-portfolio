# Complete MDX Tutorial: Adding Projects to Your Portfolio

> **Note:** This tutorial is kept for reference. Your portfolio currently uses JSON-based projects (simpler approach). Use this guide if you want to upgrade to MDX for richer content in the future.

---

## 📚 Table of Contents

1. [What is MDX?](#what-is-mdx)
2. [Why Use MDX?](#why-use-mdx)
3. [Installation Steps](#installation-steps)
4. [Configuration](#configuration)
5. [Adding a New Project](#adding-a-new-project)
6. [Complete Example](#complete-example)
7. [Troubleshooting](#troubleshooting)

---

## What is MDX?

MDX = **Markdown** + **JSX**

It allows you to write your project content in Markdown (simple text formatting) while also embedding React components. Perfect for portfolio projects that need:
- Rich text descriptions
- Multiple images/galleries
- Code snippets with syntax highlighting
- Custom interactive components

---

## Why Use MDX?

**Current Approach (JSON):**
```typescript
{
  id: "my-project",
  title: "My Project",
  description: "A short description...",
  image: "https://...",
}
```

**MDX Approach:**
```mdx
---
title: My Project
date: 2024-01-15
featured: true
---

# My Project

A **rich** description with:
- Multiple paragraphs
- Formatting options
- Image galleries
- Code examples
```

**Choose MDX when:**
- ✅ You want detailed project case studies
- ✅ You need multiple images per project
- ✅ You want to show code snippets
- ✅ You're comfortable with command line

**Stick with JSON when:**
- ✅ You want simplicity (current setup)
- ✅ Quick 2-month updates
- ✅ Short project descriptions are enough

---

## Installation Steps

### 1. Install Required Packages

```bash
npm install contentlayer next-contentlayer --legacy-peer-deps
npm install rehype-pretty-code shiki rehype-autolink-headings rehype-slug
```

### 2. Create Contentlayer Config

Create `contentlayer.config.ts` in your project root:

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the project',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the project',
      required: true,
    },
    description: {
      type: 'string',
      description: 'Short description for cards',
      required: true,
    },
    image: {
      type: 'string',
      description: 'Main project image URL',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    category: {
      type: 'enum',
      options: ['frontend', 'fullstack', 'mobile'],
      required: true,
    },
    liveUrl: {
      type: 'string',
      required: false,
    },
    githubUrl: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('projects/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/projects/${doc._raw.flattenedPath.replace('projects/', '')}`,
    },
  },
}));

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Project],
});
```

### 3. Update next.config.js

Wrap your Next.js config with Contentlayer:

```javascript
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your existing config
};

module.exports = withContentlayer(nextConfig);
```

### 4. Update tsconfig.json

Add Contentlayer to paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "contentlayer/generated": ["./.contentlayer/generated"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".contentlayer/generated"
  ]
}
```

### 5. Update .gitignore

Add Contentlayer cache:

```
# Contentlayer
.contentlayer
```

---

## Configuration

### Create Content Directory Structure

```bash
mkdir -p src/content/projects
```

Your structure will look like:
```
src/
  content/
    projects/
      ecommerce-platform.mdx
      hr-dashboard.mdx
      my-new-project.mdx
```

---

## Adding a New Project

### Step 1: Create MDX File

Create `src/content/projects/my-awesome-project.mdx`:

```mdx
---
title: "My Awesome Project"
date: "2024-12-31"
description: "A stunning web application built with modern technologies"
image: "https://images.unsplash.com/photo-1234567890"
tags: ["Next.js", "TypeScript", "TailwindCSS"]
featured: true
category: "fullstack"
liveUrl: "https://my-project.com"
githubUrl: "https://github.com/username/project"
---

# Project Overview

This is my awesome project built with **Next.js 14** and **TypeScript**.

## Key Features

- 🚀 Lightning fast performance
- 🎨 Beautiful UI with TailwindCSS
- 📱 Fully responsive design
- ♿ Accessible components

## Technical Highlights

Built using modern web technologies:

```typescript
const myComponent = () => {
  return <div>Hello World</div>;
};
```

## Gallery

![Dashboard View](https://images.unsplash.com/photo-1...)
*Main dashboard interface*

![Mobile View](https://images.unsplash.com/photo-2...)
*Responsive mobile design*

## Challenges & Solutions

### Challenge 1: State Management
We needed complex state management across multiple components.

**Solution:** Implemented Zustand for lightweight, efficient state management.

### Challenge 2: Performance
Initial load times were too slow.

**Solution:** Added React Server Components and optimized images with Next.js Image component.

## Results

- ⚡ 95+ Lighthouse score
- 🎯 10k+ monthly users
- 💚 Positive user feedback

## What I Learned

This project taught me:
1. Advanced TypeScript patterns
2. Performance optimization techniques
3. Building accessible UIs
4. Working with modern React patterns
```

### Step 2: Update Projects Page

Update `src/app/projects/page.tsx`:

```typescript
import { allProjects } from 'contentlayer/generated';

export default function ProjectsPage() {
  // Sort by date, newest first
  const sortedProjects = allProjects.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sortedProjects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
```

### Step 3: Create Project Detail Page (Optional)

Create `src/app/projects/[slug]/page.tsx`:

```typescript
import { allProjects } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function ProjectDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = allProjects.find(p => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }

  const MDXContent = useMDXComponent(project.body.code);

  return (
    <article>
      <h1>{project.title}</h1>
      <p>{new Date(project.date).toLocaleDateString()}</p>
      <MDXContent />
    </article>
  );
}

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}
```

---

## Complete Example

### Example: Architect Portfolio Project

**File:** `src/content/projects/architect-studio.mdx`

```mdx
---
title: "Architect Studio Portfolio"
date: "2024-11-20"
description: "Modern architecture portfolio website showcasing residential and commercial projects with 3D visualizations"
image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
tags: ["Next.js", "Three.js", "Framer Motion", "TypeScript", "TailwindCSS"]
featured: true
category: "frontend"
---

# Architect Studio Portfolio

A stunning portfolio website for a modern architecture firm, featuring interactive 3D visualizations, smooth animations, and a clean, minimalist design.

## 🎯 Project Goals

- Showcase architectural projects with high-quality imagery
- Provide interactive 3D model exploration
- Create an immersive, memorable user experience
- Optimize for mobile and tablet viewing

## ✨ Key Features

### Interactive 3D Models
Integrated Three.js to allow clients to explore building designs in 3D space. Users can rotate, zoom, and inspect architectural details interactively.

### Project Gallery System
Custom-built gallery component with:
- Lightbox functionality
- Smooth transitions between images
- Touch gestures support for mobile
- Lazy loading for performance

### Responsive Design
The website adapts seamlessly across all devices:
- Desktop: Full 3D experience with detailed navigation
- Tablet: Optimized touch interactions
- Mobile: Streamlined content with gesture controls

## 🛠️ Technical Implementation

### Frontend Stack
```typescript
// Tech stack
const techStack = {
  framework: 'Next.js 14',
  styling: 'TailwindCSS',
  animations: 'Framer Motion',
  3d: 'Three.js + React Three Fiber',
  language: 'TypeScript'
};
```

### Performance Optimizations
- Image optimization using Next.js Image component
- Lazy loading for 3D models
- Code splitting for faster initial load
- WebP format for all gallery images

### Key Code Snippets

**3D Model Viewer Component:**
```typescript
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export function ModelViewer({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} />
      <Model url={modelUrl} />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
```

## 📸 Project Gallery

![Homepage Hero](https://images.unsplash.com/photo-1503387762-592deb58ef4e)
*Clean, minimalist homepage with hero section*

![Project Grid](https://images.unsplash.com/photo-1487958449943-2429e8be8625)
*Responsive project grid layout*

![3D Model Viewer](https://images.unsplash.com/photo-1545324418-cc1a3fa10c00)
*Interactive 3D model exploration*

## 🚧 Challenges Overcome

### Challenge 1: 3D Model Performance
**Problem:** Large 3D models caused performance issues on mobile devices.

**Solution:** 
- Implemented progressive loading
- Created lower-poly versions for mobile
- Added loading states and fallback images

### Challenge 2: Image Gallery UX
**Problem:** Traditional galleries felt clunky and slow.

**Solution:**
- Built custom gallery with Framer Motion
- Added predictive loading for next/previous images
- Implemented keyboard navigation

### Challenge 3: Cross-browser Compatibility
**Problem:** Three.js rendering inconsistencies across browsers.

**Solution:**
- Added feature detection
- Provided 2D fallbacks for unsupported browsers
- Extensive testing on Safari, Firefox, Chrome

## 📊 Results & Impact

- 🎨 **Improved Engagement:** 3x increase in time spent on site
- 📱 **Mobile Traffic:** 60% of visitors now on mobile
- 💼 **Client Acquisitions:** 5 new clients directly from website
- ⚡ **Performance:** 90+ Lighthouse score across all metrics

## 🎓 Key Learnings

1. **3D on the Web:** Gained deep understanding of WebGL and Three.js optimization
2. **Animation Performance:** Learned to balance visual appeal with performance
3. **Responsive 3D:** Discovered techniques for making 3D experiences work on all devices
4. **User Testing:** Importance of testing with actual target audience

## 🔮 Future Enhancements

- [ ] VR support for immersive walkthroughs
- [ ] AI-powered design suggestions
- [ ] Real-time collaboration features
- [ ] Advanced filtering by project type/location

---

## Technologies Deep Dive

### Why Three.js?
Three.js was chosen for its:
- Robust 3D rendering capabilities
- Large community and ecosystem
- Excellent documentation
- React integration via React Three Fiber

### Animation Strategy
Used Framer Motion for:
- Page transitions
- Scroll-triggered animations
- Micro-interactions
- Gesture handling

### TypeScript Benefits
TypeScript provided:
- Type safety for complex 3D calculations
- Better IDE autocomplete
- Fewer runtime errors
- Improved code documentation
```

---

## Troubleshooting

### Error: "Module not found: Package path ./generated is not exported"

**Solution:** This is a known issue with Contentlayer 0.3.4 and Next.js 14.

**Fix 1 - Use Contentlayer 0.3.3:**
```bash
npm uninstall contentlayer next-contentlayer
npm install contentlayer@0.3.3 next-contentlayer@0.3.3 --legacy-peer-deps
```

**Fix 2 - Manual path configuration:**
Add to `next.config.js`:
```javascript
webpack: (config) => {
  config.resolve.alias['contentlayer/generated'] = path.resolve(__dirname, '.contentlayer/generated');
  return config;
}
```

### Error: "Content directory not found"

**Solution:** Ensure directory structure is correct:
```bash
mkdir -p src/content/projects
```

### Build Error: "Cannot read property 'body' of undefined"

**Cause:** Contentlayer hasn't generated files yet.

**Solution:**
```bash
# Clear cache and regenerate
rm -rf .contentlayer .next
npm run dev
```

### MDX Images Not Loading

**Solution:** Add image domain to `next.config.js`:
```javascript
images: {
  domains: ['images.unsplash.com', 'your-domain.com'],
}
```

---

## Quick Commands Reference

```bash
# Install dependencies
npm install contentlayer next-contentlayer --legacy-peer-deps

# Start dev server (auto-generates content)
npm run dev

# Build for production
npm run build

# Clear Contentlayer cache
rm -rf .contentlayer

# Add new project
touch src/content/projects/new-project.mdx
```

---

## When to Use JSON vs MDX

| Factor | JSON (Current) | MDX |
|--------|----------------|-----|
| Complexity | ⭐ Simple | ⭐⭐⭐ Advanced |
| Setup Time | ✅ 0 minutes | ⏱️ 30 minutes |
| Content Richness | Basic | Rich (images, code, formatting) |
| Learning Curve | ✅ Easy | 📚 Moderate |
| Best For | Quick updates | Detailed case studies |

**Recommendation for your 2-month update cycle:**
- **Now (Junior Dev):** Stick with JSON ✅
- **In 6-12 months:** Consider MDX when comfortable 🚀

---

## Additional Resources

- [Contentlayer Docs](https://contentlayer.dev/)
- [MDX Documentation](https://mdxjs.com/)
- [Next.js MDX Guide](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)

---

## Final Tips

1. **Start Simple:** Begin with one MDX project as a test
2. **Keep JSON Backup:** Don't delete your `src/lib/data/projects.ts` initially
3. **Use Template:** Copy an existing MDX file and modify it
4. **Test Locally:** Always test with `npm run dev` before deploying
5. **Commit Often:** Small, frequent git commits make troubleshooting easier

---

**Created:** December 31, 2024  
**Last Updated:** December 31, 2024  
**Status:** Reference Guide (Not Currently Implemented)

---

## Your Current Setup

You're currently using the **JSON approach** at [src/lib/data/projects.ts](src/lib/data/projects.ts), which is perfect for:
- ✅ Quick updates every 2 months
- ✅ Simple workflow
- ✅ No build complexity
- ✅ Easy to understand

Use this MDX tutorial when you're ready to level up! 🚀
