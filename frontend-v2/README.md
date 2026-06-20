# Insights

A premium SaaS frontend for turning scattered thoughts into structured plans.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **React Router v7** — client-side routing (Data mode)
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** (`motion/react`) — scroll animations and transitions
- **Lucide React** — icons

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — Hero, Features, Pricing, Contact |
| `/auth` | Auth page — Google OAuth (UI only) |
| `/workspace` | Workspace — Sidebar + infinite canvas |

## Architecture

```
src/
  app/
    App.tsx                    # Router entry point
    routes.ts                  # React Router configuration
    pages/
      landing/
        LandingPage.tsx
        components/
          FloatingNav.tsx       # Fixed floating dock nav
          HeroSection.tsx       # Sticky scroll reveal animation
          ProductMockup.tsx     # Product UI preview
          FeaturesSection.tsx
          PricingSection.tsx
          ContactSection.tsx
      auth/
        AuthPage.tsx            # Split layout with brain illustration
      workspace/
        WorkspacePage.tsx
        components/
          WorkspaceSidebar.tsx  # Dark graphite sidebar
          CanvasTabs.tsx        # Browser-style canvas tabs
          CanvasArea.tsx        # Infinite canvas (React Flow placeholder)
    components/
      figma/
        ImageWithFallback.tsx
      ui/                       # Radix UI components
  imports/
    brain.png                   # Auth page illustration
  styles/
    fonts.css                   # Google Fonts + canvas grid utility
    theme.css                   # Design tokens + Tailwind theme
    index.css                   # Entry CSS
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Environment

Copy `.env.example` to `.env` and configure values before connecting a backend.

---

Built by Dwaragesh C
