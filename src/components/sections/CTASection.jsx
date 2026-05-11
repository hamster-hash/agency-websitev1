'use client'
// components/sections/CTASection.jsx
// ============================================================
// FINAL CTA SECTION
// Minimal, impactful. One statement. One action.
// Centered, full-width, dark background.
//
// KEY TWEAKS:
//   - Headline   → edit HEADLINE / HEADLINE_ACCENT
//   - Subtext    → edit SUBTEXT
//   - Button     → edit CTA_TEXT and href
//   - Email link → edit CONTACT_EMAIL
//   - Socials    → add/remove social links in SOCIALS array
// ============================================================

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── CONTENT ────────────────────────────────────────────────

const HEADLINE        = 'Ready to stop'
const HEADLINE_ACCENT = 'the chaos?'
const SUBTEXT         = 'Free 30-minute diagnostic call. No pitch. Just clarity.'
const CTA_TEXT        = '→ Book your free call'
const CTA_HREF        = 'https://calendly.com/reachbyraff'

const CONTACT_EMAIL   = 'raffsenseireach@gmail.com'

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/raff_senseii/' },
]

// Footer note
const FOOTER_NOTE = `© ${new Date().getFullYear()} · Built different.`

// ─────────────────────────────────────────────────────────────

const CTASection = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  // ─── Fade in on scroll ──────────────────────────────────────
  useEffect(() => {
    if (!contentRef.current) return

    const ctx = gsap.context(() => {
      const children = contentRef.current.children

      gsap.fromTo(children,
        { opacity: 0, y: 50 },
        {
          opacity:  1,
          y:        0,
          duration: 0.8,
          ease:     'power3.out',
          stagger:  0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   'top 75%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{
        background:     'linear-gradient(180deg, #0E1010 0%, #121014 50%, #0A0C10 100%)',
        borderTop:      '1px solid var(--color-border)',
        paddingTop:     'var(--space-32)',
        paddingBottom:  'var(--space-24)',
        textAlign:      'center',
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* ── Accent glow behind CTA ────────────────────────────── */}
      <div aria-hidden="true" style={{
        position:   'absolute',
        bottom:     '-40%',
        left:       '50%',
        transform:  'translateX(-50%)',
        width:      '800px',
        height:     '800px',
        borderRadius: '50%',
        background:  'radial-gradient(circle, rgba(200,244,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={contentRef}>

          {/* ── Label ───────────────────────────────────────────── */}
          <p className="section-label" style={{ marginBottom: 'var(--space-8)' }}>
            {'// let\'s work together'}
          </p>

          {/* ── Headline ────────────────────────────────────────── */}
          <h2 className="text-display" style={{
            fontSize:     'clamp(3rem, 8vw, 7rem)',
            lineHeight:   1.05,
            marginBottom: 'var(--space-8)',
          }}>
            {HEADLINE}{' '}
            <em className="text-display-italic" style={{ color: 'var(--color-accent)' }}>
              {HEADLINE_ACCENT}
            </em>
          </h2>

          {/* ── Punchline ─────────────────────────────────────────── */}
          <p className="text-mono" style={{
            fontSize:     'var(--text-lg)',
            color:        'var(--color-accent)',
            fontStyle:    'italic',
            marginBottom: 'var(--space-6)',
          }}>
            &ldquo;Business is fun if you do it right.&rdquo;
            <span style={{ color: 'var(--color-text-dim)', fontStyle: 'normal', marginLeft: '8px' }}>
              Raff
            </span>
          </p>

          {/* ── Subtext ─────────────────────────────────────────── */}
          <p style={{
            fontFamily:   'var(--font-body)',
            fontSize:     'var(--text-xl)',
            color:        'var(--color-text-dim)',
            maxWidth:     '500px',
            margin:       '0 auto var(--space-12)',
            lineHeight:   1.6,
          }}>
            {SUBTEXT}
          </p>

          {/* ── CTA Button ──────────────────────────────────────── */}
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: 'var(--text-lg)', padding: 'var(--space-6) var(--space-16)' }}
          >
            {CTA_TEXT}
          </a>

          {/* ── Or email ────────────────────────────────────────── */}
          <p style={{
            marginTop:  'var(--space-8)',
            fontFamily: 'var(--font-mono)',
            fontSize:   'var(--text-sm)',
            color:      'var(--color-text-dim)',
          }}>
            or email{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{
                color:             'var(--color-text-primary)',
                textDecoration:    'underline',
                textUnderlineOffset: '4px',
                textDecorationColor: 'var(--color-border)',
              }}
            >
              {CONTACT_EMAIL}
            </a>
          </p>

          {/* ── Divider ─────────────────────────────────────────── */}
          <div style={{
            width:      '60px',
            height:     '1px',
            background: 'var(--color-border)',
            margin:     'var(--space-24) auto var(--space-8)',
          }} />

          {/* ── Footer row ──────────────────────────────────────── */}
          <div style={{
            display:        'flex',
            justifyContent: 'center',
            alignItems:     'center',
            gap:            'var(--space-8)',
            flexWrap:       'wrap',
          }}>
            <p className="text-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
              {FOOTER_NOTE}
            </p>

            {SOCIALS.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mono"
                style={{
                  fontSize:   'var(--text-xs)',
                  color:      'var(--color-text-dim)',
                  transition: 'color var(--duration-fast)',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-text-dim)'}
              >
                {s.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default CTASection