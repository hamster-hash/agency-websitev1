// lib/faqs.js
// ============================================================
// Single source of truth for FAQ content.
// Consumed by:
//   - components/sections/FAQSection.jsx  (renders the accordion)
//   - app/layout.js                       (emits FAQPage JSON-LD)
//
// Edit here → both the UI and the schema.org markup update.
// ============================================================

export const FAQS = [
  {
    q: 'What is a business engineer, and how is it different from a marketing agency?',
    a: 'A marketing agency runs ads, designs logos, or ships a website — one lane. A business engineer looks at your business as a system: positioning, offer, operations, automation, and visibility. Then we install the specific system your business is missing. Fewer moving parts, one accountable person, one transformation.',
  },
  {
    q: 'How much does it cost to systemise a small business?',
    a: 'Our bundles run $2,500–$6,000 depending on which phase you need. Phase 1 (Authority & Strategy) handles positioning, brand, and a converting landing page. Phase 2 (Chaos-Killer Engine) installs the automation and CRM. Phase 3 (Visibility Architecture) builds the content and lead-gen layer. Most small businesses start with one phase and expand.',
  },
  {
    q: 'Do you work with coaches and consultants, or with restaurants and cafés?',
    a: "Both. Our two focus niches are coaches / consultants and restaurants / cafés — because the underlying problem is identical: manual chaos eating the owner's time. The tooling differs (booking flows for restaurants, funnel-heavy setups for coaches) but the transformation shape is the same.",
  },
  {
    q: 'How does a missed-call text-back system work, and does my business need one?',
    a: 'The moment a call goes unanswered, an automated SMS fires to the caller — "Sorry we missed you, quick reply and we\'ll book you in." Most local service businesses (plumbers, dentists, salons, cafés) lose 20–40% of new leads to missed calls. Text-back captures that revenue silently while you\'re working.',
  },
  {
    q: 'How long does the full 3-phase business transformation take?',
    a: "Phase 1 is 5 days, Phase 2 is 10 days, Phase 3 is 7 days. End-to-end you're looking at roughly 22 working days — call it a month with buffers. Most businesses see the first revenue shift inside the first two weeks, before the full stack is even live.",
  },
  {
    q: 'Do I need a new website, or just the automations running behind the scenes?',
    a: 'Depends on your bottleneck. If you have leads but no follow-up, automation alone. If people find you and bounce, the site is the leak. We diagnose which layer is actually costing you money before recommending scope — no reflexive "you need a rebuild" pitch.',
  },
  {
    q: 'What tools do you use — GoHighLevel, n8n, Calendly, others?',
    a: "Our primary automation stack is n8n and GoHighLevel, with Calendly and Stripe for booking + payment, Supabase or Airtable for data, and Next.js for custom builds. Every stack decision is driven by your specific operation — never a template we're forcing you into.",
  },
  {
    q: 'How is this different from hiring a freelancer on Fiverr or Upwork?',
    a: 'A freelancer executes a task — "build a page", "wire a Zap". A business engineer diagnoses the problem before touching anything, then owns the outcome across strategy, systems, and visibility. You get one person accountable for the transformation, not four disconnected specialists.',
  },
  {
    q: 'Do you help with SEO and content marketing after launch?',
    a: "Yes — that's Phase 3 (Visibility Architecture). We install a content pillar blueprint, a 30-day authority calendar, on-page SEO, platform-optimised profiles, and a repurposing workflow. Then we teach you or your team to run it, so growth compounds without ongoing agency fees.",
  },
  {
    q: 'Can I book a free diagnostic call before committing?',
    a: "Yes. It's a 30-minute call — no pitch, no slide deck. We look at your business end-to-end and give you the honest diagnosis. If we're the right fit we'll scope from there. If not, you leave with a clear picture of what's actually broken.",
  },
]
