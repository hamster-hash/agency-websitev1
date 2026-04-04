# Agency Site — Setup & File Map

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:3000

---

## Dependencies

Only one non-Next.js package needed:
```bash
npm install gsap
```

---

## File Structure

```
agency-site/
├── app/
│   ├── layout.jsx          ← Root layout: grain + cursor
│   └── page.jsx            ← Home page: section order
│
├── components/
│   ├── ui/
│   │   ├── CustomCursor.jsx     ← Two-part mouse cursor (dot + ring)
│   │   └── GrainOverlay.jsx     ← Film grain texture overlay
│   │
│   └── sections/
│       ├── HeroSection.jsx       ← Spotlight + word reveal + pin-scroll
│       ├── DiagnosisSection.jsx  ← Horizontal scroll pain points
│       ├── HowIHelpSection.jsx   ← Sticky left + staggered deliverables
│       ├── PhilosophySection.jsx ← Editorial quote + marquee ticker
│       ├── PackagesSection.jsx   ← Expandable offer cards
│       └── CTASection.jsx        ← Final booking CTA
│
└── styles/
    └── globals.css          ← All design tokens (colors, fonts, spacing)
```

---

## How to Customise

### Change Colors
Edit `styles/globals.css` → `:root` block
- `--color-accent` = the acid yellow-green (#C8F400) — change this one value to retheme

### Change Copy
Every section has a `CONTENT` block at the top — edit the arrays/constants there.

### Change GSAP Timing
Each section's `useEffect` has commented values explaining what controls speed.

### Change Fonts  
In `globals.css`:
1. Change the `@import` URL to your new Google Fonts
2. Update `--font-display`, `--font-mono`, `--font-body` variables

### Add a Navbar
1. Create `components/ui/Navbar.jsx`
2. Import and add above `{children}` in `app/layout.jsx`

### Connect your Calendly
In `CTASection.jsx` → change `CTA_HREF` to your Calendly URL.

---

## GSAP ScrollTrigger Notes
- `scrub: 1` → smooth lag follow (increase for more smoothness)
- `pin: true` → freezes the section while animation plays
- `start: 'top 75%'` → triggers when element top is 75% down viewport
- Uncomment `// markers: true` in any section to debug trigger points