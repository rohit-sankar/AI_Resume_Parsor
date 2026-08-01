# AI Resume Parser — Landing Page

A premium, animated marketing site for an AI-powered resume parsing and skill
validation platform, built with Next.js 16 (App Router), Tailwind CSS,
Framer Motion, GSAP + ScrollTrigger, and React Three Fiber.

## Stack

- **Next.js 16** — App Router, JavaScript (no TypeScript)
- **Tailwind CSS** — design tokens in `tailwind.config.js`
- **Framer Motion** — entrance animations, hover states, crossfades
- **GSAP + ScrollTrigger** — timeline reveal, scroll-driven 3D prism rotation
- **React Three Fiber + drei** — the centerpiece glass prism
- **lucide-react** — icon set

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.js        Root layout, fonts, metadata
  page.js           Composes every section
  globals.css       Design tokens, glass utility, gradients
components/
  Navbar.js             Sticky, blurs on scroll
  Hero.js               Headline, CTA, animated resume-scan illustration
  ParticleField.js      Canvas ambient particle background
  TrustedCompanies.js   Logo marquee
  Features.js           10 feature glass cards
  HowItWorks.js         7-step scroll timeline (GSAP ScrollTrigger)
  ThreePrism.js          Centerpiece section: scroll progress + info panel
  PrismScene.js          The actual React Three Fiber glass prism
  Statistics.js         Animated counters
  CompanyBenefits.js    Why companies should use the platform
  CandidateBenefits.js  Why candidates should use the platform
  Opportunities.js      Who the platform serves
  Testimonials.js       Auto-sliding glass testimonial cards
  CTA.js                 Final call to action
  Footer.js              Site footer
```

## Notes

- All copy is original placeholder content — swap in real company names,
  testimonials, and stats before shipping.
- `PrismScene.js` is loaded via `next/dynamic` with `ssr: false` since
  React Three Fiber requires the browser's WebGL context.
- Motion respects `prefers-reduced-motion` globally (see `globals.css`).
- Colors, type scale, and the glass-card treatment all live in
  `tailwind.config.js` / `globals.css` — change tokens there to re-theme
  the whole site.
