# ZyniqAI 🚀
[![React](https://img.shields.io/badge/React-18.3-blue?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-green?style=flat&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-orange?style=flat&logo=framer)](https://www.framer.com/motion/)

**ZyniqAI — Turning Data Into Action**

Predictive analytics, fleet intelligence, and real-time AI insights for enterprise operations. Industry-specific OS platforms (HospitalityOS, FintechOS, EducationOS, LogisticsOS, HealthcareOS) with stunning animations, glassmorphism UI, and production-ready dashboards.

![Hero Screenshot](https://via.placeholder.com/1200x600/1e1e1e/ffffff?text=ZyniqAI+Hero) <!-- Replace with actual screenshot -->

## ✨ Features

- **Industry OS Platforms**: Modular AI systems for Hospitality, Fintech, Education, Logistics, Healthcare & Enterprise SaaS
- **Advanced Animations**: Framer Motion + AnimeJS (timelines, scroll reveals, parallax, draggable carousels)
- **Production UI**: shadcn/ui + Radix primitives, TailwindCSS (custom gold/coral themes, glassmorphism)
- **Real-time Dashboards**: Recharts graphs, Tanstack Query, Supabase backend-ready
- **AI Chat Widget**: Voice-enabled assistant with lead capture
- **Multi-region Pricing**: Dynamic ZAR/GBP/USD tiers
- **Theme System**: Dark/light mode with CSS variables
- **Performance**: Vite HMR, optimized for 60fps animations

## 🏗️ Project Structure

```
zyniqai-nexus/
├── public/                 # Static assets (favicons, logos)
├── src/
│   ├── components/         # UI components (HeroSection, Navbar, AIChatWidget, etc.)
│   │   ├── ui/             # shadcn/ui primitives
│   │   └── examples/       # Animation demos (canvas, timelines, draggables)
│   ├── pages/              # 20+ routed pages (Index, HospitalityOS, Dashboard, etc.)
│   ├── hooks/              # Custom hooks (useAnimateOnScroll, useAuth)
│   ├── lib/                # Utilities
│   ├── App.tsx             # Router + Providers (QueryClient, Theme, Auth)
│   └── main.tsx            # Entry point
├── supabase/               # Supabase config/migrations
├── examples/               # Standalone animation demos
├── tests/                  # Vitest setup
├── package.json            # Bun/Vite deps (bun.lockb)
└── tailwind.config.ts      # Custom themes/colors/keyframes
```

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Core** | React 18, TypeScript 5, Vite 5 |
| **Routing/State** | React Router 6, Tanstack Query 5 |
| **Styling** | TailwindCSS 3, shadcn/ui, class-variance-authority, Tailwind Merge |
| **Animation** | Framer Motion 12, AnimeJS 4, custom scroll hooks |
| **UI Primitives** | Radix UI (dialogs, tooltips, accordions), Lucide React icons |
| **Data/Forms** | Supabase, React Hook Form + Zod, Recharts |
| **Utils** | date-fns, sonner (toasts), next-themes, vaul (drawers) |
| **Testing** | Vitest 3, Testing Library |

## 🚀 Quick Start

```bash
# Clone & install (uses Bun for speed)
git clone <your-repo-url>
cd zyniqai-nexus
bun install

# Development server (localhost:8080)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run tests
bun run test

# Lint & format
bun run lint
```

**Note**: Bun recommended for fastest installs/builds. Falls back to npm fine.

## 📱 Pages & Navigation

| Route | Description |
|-------|-------------|
| `/` | Homepage (Hero, Features, IndustryOS, Pricing, Contact) |
| `/hospitality-os` | Hospitality OS (booking engine, revenue analytics) |
| `/fintech-os` | Fintech OS platform |
| `/education-os` | Education management OS |
| `/enterprise-saas` | Enterprise SaaS accelerator |
| `/dashboard` | Admin dashboard |
| `/client-portal` | Client-facing portal |
| `/pricing` | Multi-tier pricing |
| `/case-studies` | Real client results |

## 🎨 Customization

1. **Colors/Themes**: Edit `tailwind.config.ts` (gold, coral, accent gradients)
2. **Animations**: Extend keyframes in Tailwind config; new examples in `src/examples/`
3. **Pages**: Add to `App.tsx` Routes; new components in `src/components/`
4. **Supabase**: Configure `supabase/config.toml`; add env vars
5. **Branding**: Update logos in `public/`, meta in `index.html`

## 🚀 Deployment

```bash
# Build
bun run build

# Popular hosts:
# Vercel: Drag `dist/` folder or `vercel --prod`
# Netlify: Drag `dist/` or CLI
# Cloudflare Pages: `wrangler pages publish dist`
```

**Vercel Template**: Includes `@vercel/analytics` & `speed-insights` ready.

## 🧪 Testing & Quality

- **Unit Tests**: `bun run test` (Vitest + jsdom)
- **Linting**: ESLint 9 + React hooks config
- **TypeScript**: Strict mode enabled
- **Performance**: 50k+ star timeline animations tested

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. Create feature branch `feat/amazing-animation`
4. Add tests, PR with description/screenshots

**Code Style**: Follow existing patterns (TSX, Tailwind classes, Framer `motion.*`).

## 📄 License

MIT License - see [LICENSE](LICENSE) (add if missing).

---

⭐ **Built with ❤️ by ZyniqAI** | [Live Demo](http://localhost:8080) | [Contact](https://zyniqai.com/contact)

