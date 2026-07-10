'use client'
// components/sections/PackagesSection.jsx
// ============================================================
// PACKAGES SECTION — "Pick Your Problem"
// Three expandable offer cards framed by the CLIENT'S PAIN
// (not the package name). Price revealed only after expanding.
//
// Cards use local state to expand/collapse.
// GSAP handles entrance animations on scroll.
//
// KEY TWEAKS:
//   - Card content  → edit PACKAGES array
//   - Default open  → change defaultOpen index (or set to null)
//   - Accent colors → each card can have its own accent
// ============================================================

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGradient from '@/components/ui/CursorGradient'

gsap.registerPlugin(ScrollTrigger)

// ─── CONTENT ────────────────────────────────────────────────

const PACKAGES = [
  {
    id:       'startup',
    problem:  '"I\'m just starting out and need everything from scratch."',
    for:      'New consultant or service provider',
    name:     'The Startup Special',
    phases:   'Phase 1 + Phase 2',
    pitch:    'I will build your brand identity AND the automated system to handle your first 50 clients so you never worry about the tech.',
    includes: [
      'ICP Workshop + Core Message Guide',
      'Competitor Gap Analysis',
      'Conversion-Optimised Landing Page',
      'Professional Branding Kit',
      'Missed Call Text-Back System',
      '24/7 Automated Booking',
      'Speed-to-Lead Email/SMS Responder',
      'CRM Dashboard Setup',
    ],
    accent: 'var(--color-accent)',
  },
  {
    id:       'recovery',
    problem:  '"I\'m losing money on missed leads and low reviews."',
    for:      'Existing local business (dentist, café, gym)',
    name:     'Revenue Recovery',
    phases:   'Phase 2 + Review System',
    pitch:    'You are losing money on missed calls and low reviews. I will install the system that captures missed leads and automates your Google reviews. Starting this week.',
    includes: [
      'Missed Call Text-Back System',
      '24/7 Automated Booking',
      'Speed-to-Lead Responder',
      'CRM Dashboard',
      'Automated Review Extraction',
      'Stripe/PayPal Payment Setup',
    ],
    accent: '#FF6B35',  // ← different accent per card — orange for urgency
  },
  {
    id:       'full',
    problem:  '"I\'m completely overwhelmed. Nothing is systematised."',
    for:      'Business owner who wants everything handled',
    name:     'Full Anti-Chaos Suite',
    phases:   'All 3 Phases',
    pitch:    'I will move you from scattered to systemised in 30 days. You focus on the work. The system handles everything else.',
    includes: [
      'Everything in Phase 1 (Strategy + Brand)',
      'Everything in Phase 2 (Automation + CRM)',
      'Everything in Phase 3 (Content + Visibility)',
      '30-Day Authority Content Calendar',
      'Lead Magnet Design',
      'Platform Profile Optimisation',
    ],
    accent: '#7B61FF',  // ← purple for the premium tier
  },
  {
    id:       'diagnostic',
    problem:  '"Something is wrong with my business — help me fix it. It\'s stale and not growing."',
    for:      'Established owner stuck in a plateau',
    name:     'Growth Diagnostic',
    phases:   'Audit + Targeted Fix',
    pitch:    'I will audit your business end-to-end — offer, funnel, ops, content — find the actual bottleneck killing your growth, and install the specific fix. No guessing, no fluff.',
    includes: [
      'Full Business & Funnel Audit',
      'Bottleneck & Leak Report',
      'Offer + Positioning Review',
      'Ops & Systems Health Check',
      'Marketing & Content Diagnostic',
      'Prioritised 30-Day Fix Roadmap',
    ],
    accent: '#3DA9FC',  // ← blue for the diagnostic tier
  },
]

// ─────────────────────────────────────────────────────────────

const PackagesSection = () => {
  const [openIdx, setOpenIdx]       = useState(null) // null = all collapsed
  const sectionRef                  = useRef(null)
  const cardRefs                    = useRef([])

  // ─── Entrance animation ─────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRefs.current.filter(Boolean),
        { opacity: 0, y: 60 },
        {
          opacity:  1,
          y:        0,
          duration: 0.7,
          ease:     'power3.out',
          stagger:  0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   'top 70%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggle = (idx) => setOpenIdx(openIdx === idx ? null : idx)

  return (
    <section
      id="packages"
      ref={sectionRef}
      style={{
        position:      'relative',
        overflow:      'hidden',
        background:    'linear-gradient(180deg, #100E0A 0%, #18140E 50%, #110F0A 100%)',
        borderTop:     '1px solid var(--color-border)',
        paddingTop:    'var(--space-32)',
        paddingBottom: 'var(--space-32)',
      }}
    >
      <CursorGradient color="#FBBF24" opacity={0.26} size={900} />

      <div className="container">

        {/* ── Section Header ─────────────────────────────────── */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <p className="section-label" style={{ marginBottom: 'var(--space-6)' }}>
            {'// pick your problem'}
          </p>
          <h2 className="text-display" style={{
            fontSize:   'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.05,
            maxWidth:   '600px',
          }}>
            What&apos;s the problem{' '}
            <em className="text-display-italic" style={{ color: 'var(--color-accent)' }}>
              we solve
            </em>{' '}
            first?
          </h2>
        </div>

        {/* ── Package Cards ──────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {PACKAGES.map((pkg, idx) => {
            const isOpen = openIdx === idx

            return (
              <div
                key={pkg.id}
                ref={el => cardRefs.current[idx] = el}
                className="package-card"
                style={{
                  background:   'var(--color-bg-3)',
                  border:       `1px solid ${isOpen ? pkg.accent : 'var(--color-border)'}`,
                  borderRadius: 'var(--border-radius)',
                  overflow:     'hidden',
                  transition:   'border-color 0.3s ease',
                  opacity:      0,  // starts hidden — GSAP reveals
                }}
              >
                {/* ── Card Header (always visible) ─────────────── */}
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width:          '100%',
                    display:        'grid',
                    gridTemplateColumns: '1fr auto',
                    gap:            'var(--space-8)',
                    alignItems:     'center',
                    padding:        'var(--space-8)',
                    textAlign:      'left',
                    cursor:         'pointer',
                    background:     'none',
                    borderBottom:   isOpen ? `1px solid var(--color-border)` : 'none',
                  }}
                >
                  <div>
                    {/* For who */}
                    <p className="text-mono" style={{
                      fontSize:     'var(--text-xs)',
                      color:        'var(--color-text-dim)',
                      marginBottom: 'var(--space-3)',
                      letterSpacing: '0.1em',
                    }}>
                      FOR: {pkg.for.toUpperCase()}
                    </p>

                    {/* The problem headline */}
                    <h3 className="text-display" style={{
                      fontSize:   'clamp(1.25rem, 2.5vw, 2rem)',
                      lineHeight: 1.2,
                      color:      isOpen ? pkg.accent : 'var(--color-text-primary)',
                      transition: 'color 0.3s ease',
                    }}>
                      {pkg.problem}
                    </h3>
                  </div>

                  {/* Expand / Collapse toggle */}
                  <div style={{
                    width:    44,
                    height:   44,
                    minWidth: 44,
                    border:   `1px solid ${isOpen ? pkg.accent : 'var(--color-border)'}`,
                    borderRadius: '50%',
                    display:  'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.3s, transform 0.3s',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    color:     isOpen ? pkg.accent : 'var(--color-text-dim)',
                    fontSize:  '1.5rem',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    +
                  </div>
                </button>

                {/* ── Expanded Content ─────────────────────────── */}
                {isOpen && (
                  <div className="package-expanded" style={{
                    padding:    'var(--space-8)',
                    display:    'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap:        'var(--space-12)',
                    animation:  'fadeInUp 0.4s ease forwards',
                  }}>
                    {/* Left: pitch + includes */}
                    <div>
                      <p className="text-mono" style={{
                        fontSize:     'var(--text-xs)',
                        color:        pkg.accent,
                        marginBottom: 'var(--space-4)',
                        letterSpacing: '0.1em',
                      }}>
                        {pkg.phases.toUpperCase()}
                      </p>

                      <p style={{
                        fontFamily:   'var(--font-body)',
                        fontSize:     'var(--text-lg)',
                        lineHeight:   1.7,
                        color:        'var(--color-text-primary)',
                        marginBottom: 'var(--space-8)',
                        fontStyle:    'italic',
                      }}>
                        &ldquo;{pkg.pitch}&rdquo;
                      </p>

                      {/* What's included */}
                      <p className="section-label" style={{ marginBottom: 'var(--space-4)' }}>
                        WHAT&apos;S INCLUDED
                      </p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {pkg.includes.map((item, iIdx) => (
                          <li key={iIdx} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                            <span style={{ color: pkg.accent, marginTop: '2px' }}>✓</span>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-text-dim)' }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: CTA */}
                    <div style={{
                      display:        'flex',
                      flexDirection:  'column',
                      justifyContent: 'center',
                      alignItems:     'center',
                      textAlign:      'center',
                      background:     'var(--color-surface)',
                      borderRadius:   'var(--border-radius)',
                      padding:        'var(--space-12)',
                      border:         `1px solid ${pkg.accent}22`,
                    }}>
                      <p className="section-label" style={{ marginBottom: 'var(--space-4)' }}>
                        READY WHEN YOU ARE
                      </p>
                      <p className="text-display" style={{
                        fontSize:     'clamp(2rem, 4vw, 3rem)',
                        color:        pkg.accent,
                        marginBottom: 'var(--space-6)',
                        lineHeight:   1.1,
                      }}>
                        {pkg.name}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   'var(--text-sm)',
                        color:      'var(--color-text-dim)',
                        marginBottom: 'var(--space-8)',
                        lineHeight: 1.6,
                      }}>
                        Let&apos;s talk scope on a free call. No pitch. Just clarity.
                      </p>
                      <a
                        href="https://calendly.com/reachbyraff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ background: pkg.accent, width: '100%', justifyContent: 'center' }}
                      >
                        → Book a free call
                      </a>
                    </div>

                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PackagesSection