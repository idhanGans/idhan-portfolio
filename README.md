# Idhan Zarkasyah Portfolio

An interactive portfolio website built with Next.js, React Three Fiber, and Framer Motion.

## 🚀 Features

- **Immersive 3D Background**: Animated nebula and star particles using GLSL shaders
- **Smooth Animations**: Page transitions and micro-interactions with Framer Motion
- **Responsive Design**: Optimized for all devices with mobile fallbacks
- **Performance Optimized**: Dynamic imports, reduced motion support, and WebGL fallbacks
- **SEO Ready**: Metadata, Open Graph, and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Graphics**: React Three Fiber, Three.js
- **Shaders**: Custom GLSL shaders for nebula effects
- **Animation**: Framer Motion
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Icons**: React Icons

## 📁 Project Structure

```
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   ├── robots.txt
│   └── site.webmanifest
└── src/
    ├── app/                    # Next.js App Router pages
    │   ├── about/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── contact/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── experience/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── playground/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── projects/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── skills/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── error.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── loading.tsx
    │   ├── not-found.tsx
    │   ├── page.tsx
    │   └── sitemap.ts
    ├── components/
    │   ├── providers/          # Context providers
    │   │   ├── index.ts
    │   │   └── SmoothScrollProvider.tsx
    │   ├── three/              # 3D components
    │   │   ├── CameraController.tsx
    │   │   ├── Nebula.tsx
    │   │   ├── Scene.tsx
    │   │   ├── StarField.tsx
    │   │   └── index.ts
    │   └── ui/                 # UI components
    │       ├── Button.tsx
    │       ├── ExperienceCard.tsx
    │       ├── Footer.tsx
    │       ├── Navigation.tsx
    │       ├── PageTransition.tsx
    │       ├── ProjectCard.tsx
    │       ├── SectionHeading.tsx
    │       ├── SkillCard.tsx
    │       └── index.ts
    ├── hooks/                  # Custom React hooks
    │   ├── index.ts
    │   ├── useMediaQuery.ts
    │   ├── useMousePosition.ts
    │   ├── useScrollProgress.ts
    │   └── useWindowSize.ts
    ├── lib/
    │   ├── data/               # Static data
    │   │   ├── experience.ts
    │   │   ├── index.ts
    │   │   ├── projects.ts
    │   │   └── skills.ts
    │   └── utils.ts            # Utility functions
    ├── shaders/                # GLSL shader files
    │   ├── nebula/
    │   │   ├── fragment.glsl
    │   │   └── vertex.glsl
    │   └── stars/
    │       ├── fragment.glsl
    │       └── vertex.glsl
    └── types/                  # TypeScript type definitions
        └── glsl.d.ts
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/idhanGans/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for any environment-specific configuration:

```env
# Example
NEXT_PUBLIC_SITE_URL=https://idhanzarkasyah.com
```

### Customization

- **Colors**: Edit `tailwind.config.ts` to customize the color palette
- **Content**: Update files in `src/lib/data/` for skills, projects, and experience
- **3D Effects**: Modify shader parameters in `src/components/three/` components

## 📱 Performance & Mobile

The site implements several optimization strategies:

- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Mobile Detection**: Reduces particle count and disables heavy shaders on mobile
- **Dynamic Imports**: Three.js components are loaded client-side only
- **Fallback UI**: Gradient background shown while 3D scene loads

## 🚢 Deployment

Deploy to Vercel:

```bash
npm run build
vercel --prod
```

Or use the Vercel GitHub integration for automatic deployments.

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 👤 Author

**Idhan Zarkasyah**

- Website: [idhanzarkasyah.com](https://idhanzarkasyah.com)
- GitHub: [@idhanzarkasyah](https://github.com/idhanGans)
- LinkedIn: [Idhan Zarkasyah](https://www.linkedin.com/in/idhan-zarkasyah-225b42261/)
