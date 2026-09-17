# Suresh Shanmugasundaram — Software Engineer & Freelance Developer

<div align="center">

[![Portfolio](https://img.shields.io/badge/Live_Portfolio-suresh--shanmugasundaram--portfolio.vercel.app-00df8f?style=for-the-badge&logo=vercel&logoColor=black)](https://suresh-shanmugasundaram-portfolio.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Suresh_Shanmugasundaram-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/suresh-shanmugasundaram-7590ab279)
[![GitHub](https://img.shields.io/badge/GitHub-sureshdeveloperofficial-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sureshdeveloperofficial)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Chat_Now-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/919361880749)
[![Email](https://img.shields.io/badge/Email-sureshdevoperofficial%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sureshdevoperofficial@gmail.com)

<br />

**Software Engineer with 3+ years of production experience** building scalable backend microservices, resilient event pipelines, and high-performance full-stack web applications with **Node.js, NestJS, TypeScript, React, Next.js, and AI**.

*📍 Coimbatore, Tamil Nadu, India • Open for Remote Engineering Roles, High-Impact Contracts & Enterprise Freelance Consulting Worldwide*

</div>

---

## ⚡ Executive Summary

I am a Software Engineer and Freelance Full-Stack Developer specializing in high-throughput backend systems, resilient microservices, and interactive modern web applications. With 3+ years of production-proven experience delivering enterprise SaaS solutions, ERP platforms, and logistics integrations, I focus on:

- **Scalable Architecture & Clean Code**: Domain-Driven Design (DDD), Clean Architecture, CQRS, and modular microservices.
- **High-Throughput Backends & Data Pipelines**: Node.js, NestJS, FastAPI, BullMQ distributed queues, Redis caching, and PostgreSQL/MySQL query tuning (eliminating N+1 bottlenecks for 75%+ latency cuts).
- **Security & Reliability**: Granular RBAC authorization, JWT/OAuth 2.0, HMAC webhook verification, and SSRF-safe headless PDF generation engines.
- **Fluid & Interactive UIs**: Next.js App Router, React 19, Zustand state management, TanStack Query optimistic hydration, and physics-driven GSAP + WebGL animations.

---

## 🛠️ Technical Proficiencies

| Domain | Technologies & Frameworks |
|:---|:---|
| **Languages** | TypeScript, JavaScript (ESNext), Python, SQL |
| **Backend & APIs** | Node.js, NestJS, Express.js, FastAPI, RESTful APIs, Microservices, BullMQ, Outbox Pattern |
| **Frontend & UI** | React.js, Next.js 16/15 (App Router), HTML5, CSS3/Vanilla CSS, Material UI, Tailwind CSS, Zustand, TanStack Query |
| **Databases & Caching** | PostgreSQL, MySQL, MongoDB, Redis, Prisma ORM, Knex.js |
| **Architecture & Security** | Clean Architecture, CQRS, Domain-Driven Design (DDD), Granular RBAC, JWT, OAuth 2.0, Multi-Tenancy, HMAC Verification, SSRF Mitigation |
| **Cloud & DevOps** | AWS Services, Docker, Kubernetes, Nginx Reverse Proxy, GitHub Actions CI/CD, Linux (Ubuntu/Debian) |
| **Testing & Quality** | Jest, xUnit, Automated API Testing, Root-Cause Analysis, Zero-Downtime Migration |
| **AI & Tooling** | LLM APIs, RAG Architectures, FastAPI AI Microservices, Cursor, Claude, Antigravity AI |

---

## 🎨 About This Portfolio Website

This portfolio website is a high-performance web experience built with **Next.js 16/15 + React 19**, combining visual aesthetics with motion design and 3D WebGL:

- **3D WebGL GridScan**: Real-time canvas grid scan tunnel with post-processing bloom, chromatic aberration, and noise.
- **GSAP Inertia & Physics**:
  - `InertiaPlugin` velocity tracking and elastic physics throw/snap on project cards and floating labels.
  - Elastic card fan-out and hover expansions with responsive mobile scroll stacking.
  - Interactive custom cursor bubble with GSAP `quickTo` spring dynamics and context-aware badges.
  - Hover wiggle system driven by centralized configuration (`lib/data.js`).
- **Interactive Case Study Modal**: In-depth modal with system architecture diagrams, key engineering challenges, and metric breakdowns.
- **Lenis Smooth Scroll**: Ultra-smooth inertia scrolling synchronized with GSAP's internal ticker.
- **Modular CSS Architecture**: Clean separation into 11 CSS partials with CSS Custom Properties — zero external UI library overhead.

---

## 📂 Repository Structure

```text
portfolio-latest/
├── app/
│   ├── styles/                  # Modular CSS partials
│   │   ├── base.css             # Design tokens, CSS variables, typography
│   │   ├── navbar.css           # Sticky navbar, drawer, theme transitions
│   │   ├── hero.css             # Hero headings, typography & underlines
│   │   ├── vimeo-hero.css       # Video player & timeline controls
│   │   ├── motion-cards.css     # Fling motion cards, tags, badges
│   │   ├── showreel.css         # Showreel metrics & 3D WebGL styling
│   │   ├── cards.css            # Service domain cards & sticker badges
│   │   ├── marquee.css          # Infinite marquee animations & logos
│   │   ├── footer.css           # Footer layout, wiggles, credits, stickers
│   │   ├── cursor.css           # Custom cursor bubble & scribble overlay
│   │   ├── horizontal-words.css # Horizontal letter-bounce section
│   │   └── responsive.css       # Breakpoints for desktop, tablet, and mobile
│   ├── globals.css              # Main stylesheet importing all partials
│   ├── layout.jsx               # Root layout, SEO metadata, openGraph tags
│   └── page.jsx                 # Page entry orchestrating all components
│
├── components/
│   ├── CursorBubble.jsx         # Spring cursor follower with GSAP quickTo
│   ├── DoubleMarquee.jsx        # Infinite tech stack logo marquee
│   ├── Footer.jsx               # Interactive contact footer with velocity stickers
│   ├── GridScan.jsx             # 3D WebGL background shader
│   ├── GsapProjectCarousel.jsx  # Interactive project showcase carousel
│   ├── HorizontalWords.jsx      # Pinned section with elastic letter entrance
│   ├── MagicBento.jsx           # Bento stat cards with tilt & spotlight effects
│   ├── MotionCards.jsx          # InertiaPlugin project cards with case studies
│   ├── Navbar.jsx               # Navigation bar with staggered menu drawer
│   ├── ProjectCaseStudyModal.jsx# Full-screen deep-dive case study modal
│   ├── ServiceCards.jsx         # Core engineering capabilities cards
│   ├── Showreel.jsx             # Key production metrics & numbers roll-up
│   ├── SmoothScroll.jsx         # Lenis smooth scrolling engine
│   ├── StaggeredMenu.jsx        # Animated full-screen drawer menu
│   ├── SvgSymbols.jsx           # Reusable SVG symbol definitions
│   ├── TransitionScribble.jsx   # GSAP scribble page transition mask
│   └── VimeoHero.jsx            # Video player with custom timeline & mute bubble
│
├── lib/
│   └── data.js                  # Centralized data (skills, projects, metrics, configs)
│
├── public/
│   ├── assets/                  # Brand logos, stickers, and decorative SVGs
│   └── fonts/                   # Epilogue & DM Sans variable fonts
│
├── PROJECT_PORTFOLIO_CASE_STUDY.md # In-depth SaaS Case Study master document
├── Suresh_Shanmugasundaram_Software_Engineer_Resume.docx # Official Resume
├── jsconfig.json                # Path aliasing (@/*)
├── next.config.mjs              # Next.js configuration
├── package.json                 # Project dependencies & scripts
└── README.md                    # Portfolio documentation & bio
```

---

## ⚙️ Getting Started Locally

### Prerequisites
- **Node.js**: v18.18.0 or higher
- **Package Manager**: `pnpm` (recommended) or `npm`

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sureshdeveloperofficial/portfolio-latest.git
   cd portfolio-latest
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **View in your browser**:
   Open [http://localhost:1919](http://localhost:1919) in your browser.

5. **Build for production**:
   ```bash
   pnpm build
   pnpm start
   ```

---

## 📜 Professional Certifications

- **Software Engineer Certification** — HackerRank
- **Generative AI Foundational Certificate** — Udemy
- **Mastering LLM Evaluation: Build Reliable, Scalable AI Systems** — Udemy
- **Resilience Patterns in Microservice Architecture, Hands-On** — Udemy
- **Python for AI and Machine Learning** — Udemy
- **Next.js Full-Stack Architecture** — Udemy

---

## 📬 Contact & Availability

I am currently open for:
- **Full-Time Software Engineer Roles** (Remote / Hybrid)
- **High-Impact Contracts & Freelance SaaS Development**
- **Backend Architecture & System Performance Consulting**

- **Email**: [sureshdevoperofficial@gmail.com](mailto:sureshdevoperofficial@gmail.com)
- **WhatsApp**: [+91 9361880749](https://wa.me/919361880749)
- **LinkedIn**: [linkedin.com/in/suresh-shanmugasundaram-7590ab279](https://linkedin.com/in/suresh-shanmugasundaram-7590ab279)
- **GitHub**: [github.com/sureshdeveloperofficial](https://github.com/sureshdeveloperofficial)
- **Live Portfolio**: [suresh-shanmugasundaram-portfolio.vercel.app](https://suresh-shanmugasundaram-portfolio.vercel.app)

---

<div align="center">
  <sub>Designed & Developed with precision by <strong>Suresh Shanmugasundaram</strong>.</sub>
</div>
