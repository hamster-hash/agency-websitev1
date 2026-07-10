'use client'
// components/sections/HowIHelpSection.jsx
// ============================================================
// HOW I HELP SECTION — The 3-Phase Reveal
// Layout: sticky left panel (phase label) + right side scrolls
// through each phase's deliverables with staggered GSAP reveals.
//
// GSAP: Each phase block triggers its stagger animation when
// it enters the viewport (not scrub — discrete reveals).
//
// KEY TWEAKS:
//   - Phases & deliverables → edit PHASES array below
//   - Left panel stays visible while right side scrolls
//   - Ghost phase numbers   → edit inside the card render
//   - Timing scale of stagger → edit stagger value in useEffect
// ============================================================

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGradient from '@/components/ui/CursorGradient'

gsap.registerPlugin(ScrollTrigger)

// ─── CONTENT — edit phases here ─────────────────────────────

const PHASES = [
  {
    number:  '01',
    label:   'Phase One',
    title:   'The Authority & Strategy',
    subtitle: 'Build trust before they even talk to you.',
    tag:     'The Brain',
    duration: '5 days',
    deliverables: [
      { name: 'ICP Workshop',         desc: '1-hour deep session to define exactly who your customer is.' },
      { name: 'Core Message Guide',   desc: 'Your tagline, elevator pitch, and Unique Value Proposition.' },
      { name: 'Competitor Gap Report', desc: '3–5 competitors analysed. Where you can win, clearly mapped.' },
      { name: 'Landing Page',         desc: 'High-speed, conversion-optimised 1-page site (built with Next.js / GSAP ScrollTrigger).' },
      { name: 'Branding Kit',         desc: 'Logo, color palette, typography. US-standard professional look.' },
    ],
  },
  {
    number:  '02',
    label:   'Phase Two',
    title:   'The Chaos-Killer Engine',
    subtitle: 'Build systems for your business that smooth the workflow and boost efficiency.',
    note:    'Every industry runs differently — the system we build is shaped to your specific operation, not a generic template.',
    tag:     'The Body',
    duration: '10 days',
    deliverables: [
      { name: 'Missed Call Text-Back', desc: 'Auto-SMS fires within seconds of a missed call. No lead left behind.' },
      { name: '24/7 Automated Booking', desc: 'Calendar integration with payments, time zones, and reminders.' },
      { name: 'Speed-to-Lead Responder', desc: 'Auto email/SMS within 2 minutes of any form submission.' },
      { name: 'CRM Dashboard',          desc: '"Command center". All leads visible in one pipeline.' },
      { name: 'Review Extraction System', desc: 'Auto thank-you message that asks for Google/Yelp review.' },
      { name: 'Payment & Invoicing',    desc: 'Stripe/PayPal connected. Accept deposits instantly.' },
    ],
  },
  {
    number:  '03',
    label:   'Phase Three',
    title:   'The Visibility Architecture',
    subtitle: 'In today\'s age, content is the best marketing — we help you create it, and teach you how to keep it running yourself.',
    tag:     'The Fuel',
    duration: '7 days',
    deliverables: [
      { name: 'Content Pillar Blueprint', desc: '3–5 core topics that position you as the obvious expert.' },
      { name: '30-Day Authority Calendar', desc: 'A logic map of what to post. Not fluff, just what works.' },
      { name: 'Platform Playbook',         desc: 'LinkedIn / Instagram profile optimised for credibility.' },
      { name: 'Repurposing Workflow',      desc: '1 long video → 5 Reels → 10 Tweets. Automated process.' },
      { name: 'Lead Magnet',               desc: 'A free guide or calculator that captures emails for you.' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────

const HowIHelpSection = () => {
  const phaseRefs = useRef([])

  // ─── Staggered reveal for each phase block ──────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      phaseRefs.current.forEach((phaseEl) => {
        if (!phaseEl) return

        const children = phaseEl.querySelectorAll('.deliverable-row, .phase-header')

        gsap.fromTo(children,
          { opacity: 0, y: 35 },
          {
            opacity:  1,
            y:        0,
            duration: 0.6,
            ease:     'power3.out',
            stagger:  0.1,
            scrollTrigger: {
              trigger: phaseEl,
              start:   'top 75%',
            }
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="how" style={{
      position:    'relative',
      overflow:    'hidden',
      background:  'linear-gradient(170deg, #0A0F14 0%, #0C1218 40%, #0A1015 100%)',
      borderTop:   '1px solid var(--color-border)',
      paddingTop:  'var(--space-24)',
      paddingBottom: 'var(--space-32)',
    }}>
      <CursorGradient color="#3DA9D9" opacity={0.32} size={900} />

      <div className="container">

        {/* ── Section Header ─────────────────────────────────── */}
        <div style={{ marginBottom: 'var(--space-24)', maxWidth: '640px' }}>
          <p className="section-label" style={{ marginBottom: 'var(--space-6)' }}>
            {'// how i help'}
          </p>
          <h2 className="text-display" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.05,
          }}>
            Three phases.{' '}
            <em className="text-display-italic" style={{ color: 'var(--color-accent)' }}>
              One complete
            </em>{' '}
            transformation.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            color:      'var(--color-text-dim)',
            marginTop:  'var(--space-6)',
            fontSize:   'var(--text-lg)',
            lineHeight: 1.7,
          }}>
            Tech is only 40% of it. The rest is strategy, marketing, and market research.
            The part nobody else does with you.
          </p>
        </div>

        {/* ── Phase Blocks ───────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>

          {PHASES.map((phase, idx) => (
            <div
              key={idx}
              ref={el => phaseRefs.current[idx] = el}
              className="phase-grid"
              style={{
                display:    'grid',
                gridTemplateColumns: '1fr 2fr',
                gap:        'var(--space-12)',
                paddingTop: 'var(--space-12)',
                borderTop:  '1px solid var(--color-border)',
                position:   'relative',
              }}
            >
              {/* ── Left: Phase Label (sticky while right scrolls) ─ */}
              <div
                className="phase-header"
                style={{
                  position:   'sticky',
                  top:        'var(--space-8)',
                  alignSelf:  'start',
                  paddingRight: 'var(--space-8)',
                }}
              >
                {/* Ghost number */}
                <div aria-hidden="true" style={{
                  fontFamily:  'var(--font-display)',
                  fontSize:    'var(--text-8xl)',
                  fontWeight:  900,
                  color:       'var(--color-text-ghost)',
                  lineHeight:  0.9,
                  marginBottom: '-0.1em',
                  userSelect:  'none',
                }}>
                  {phase.number}
                </div>

                <p className="section-label" style={{ marginBottom: 'var(--space-3)' }}>
                  {phase.label}
                </p>

                <h3 className="text-display" style={{
                  fontSize:   'var(--text-2xl)',
                  marginBottom: 'var(--space-2)',
                }}>
                  {phase.title}
                </h3>

                {/* Tag pill */}
                <span style={{
                  display:     'inline-block',
                  fontFamily:  'var(--font-mono)',
                  fontSize:    'var(--text-xs)',
                  background:  'var(--color-accent-dim)',
                  color:       'var(--color-accent)',
                  border:      '1px solid rgba(200,244,0,0.2)',
                  borderRadius: '2px',
                  padding:     '2px 10px',
                  marginBottom: 'var(--space-6)',
                }}>
                  {phase.tag}
                </span>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  color:      'var(--color-text-dim)',
                  fontSize:   'var(--text-base)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-6)',
                }}>
                  {phase.subtitle}
                </p>

                {phase.note && (
                  <p style={{
                    fontFamily:   'var(--font-mono)',
                    fontSize:     'var(--text-xs)',
                    color:        'var(--color-accent)',
                    lineHeight:   1.6,
                    padding:      'var(--space-3) var(--space-4)',
                    border:       '1px solid rgba(200,244,0,0.2)',
                    borderRadius: '2px',
                    background:   'var(--color-accent-dim)',
                    marginBottom: 'var(--space-6)',
                  }}>
                    Note: {phase.note}
                  </p>
                )}

                {/* Meta: duration */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                    <span className="text-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
                      DELIVERY
                    </span>
                    <span className="text-mono" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                      {phase.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Right: Deliverables List ─────────────────────── */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {phase.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="deliverable-row"
                    style={{
                      display:       'flex',
                      gap:           'var(--space-6)',
                      padding:       'var(--space-6) 0',
                      borderBottom:  '1px solid var(--color-border)',
                      alignItems:    'flex-start',
                      opacity: 0,  // starts hidden, GSAP reveals
                    }}
                  >
                    {/* Index dot */}
                    <div style={{
                      width:      32,
                      height:     32,
                      minWidth:   32,
                      border:     '1px solid var(--color-border)',
                      borderRadius: '50%',
                      display:    'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop:  '2px',
                    }}>
                      <span className="text-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
                        {String(dIdx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                        {/* Accent check */}
                        <span style={{ color: 'var(--color-accent)', fontSize: 'var(--text-sm)' }}>✓</span>
                        <h4 style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize:   'var(--text-base)',
                          fontWeight: 500,
                        }}>
                          {item.name}
                        </h4>
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   'var(--text-base)',
                        color:      'var(--color-text-dim)',
                        lineHeight: 1.6,
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowIHelpSection