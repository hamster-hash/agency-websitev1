'use client'
// components/sections/TestimonialSection.jsx
// ============================================================
// TESTIMONIALS — Bold solid-color cards arranged in a grid.
// Each card auto-flips on its own loop with a randomised
// stagger so the page is always alive but never synced.
// Rows drift at slightly different rates while you scroll
// (subtle parallax — the "mould" effect).
//
// KEY TWEAKS:
//   - Card content   → edit TESTIMONIALS
//   - Card palette   → edit each entry's `color` / `text` / `accent`
//   - Flip cadence   → edit FLIP_HOLD / FLIP_DURATION
//   - Parallax range → edit yPercent values in useEffect
// ============================================================

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGradient from '@/components/ui/CursorGradient'

gsap.registerPlugin(ScrollTrigger)

// ─── Content ────────────────────────────────────────────────
// Each card = an industry we transformed. No business names, no owner names.
// Front  = industry + the "before state" they came to us with
// Back   = the transformation — what we actually built + the result
const TESTIMONIALS = [
  {
    industry: 'Local plumbing',
    region:   'North America',
    before:   'Missed calls every hour.',
    after:    'We wired a missed-call text-back, a 24/7 booking flow, and a locally-ranked site. Every ring now becomes a job on the calendar — even when the van is underground.',
    metric:   '+40% booked jobs',
    color:  '#0E3B2A',
    text:   '#F0B5C4',
    accent: '#F2C811',
  },
  {
    industry: 'Boutique café',
    region:   'Southern Europe',
    before:   'Nobody knew they existed.',
    after:    'A quiet, editorial site, a QR menu + booking flow, and a full local-search presence. Slow mornings became sold-out ones without hiring a single marketer.',
    metric:   '+55% covers',
    color:  '#F2C811',
    text:   '#3D2E00',
    accent: '#0E3B2A',
  },
  {
    industry: 'Yoga & wellness studio',
    region:   'South Asia',
    before:   'Class signups drowning the inbox.',
    after:    'We replaced DM chaos with an automated class calendar, member portal, and quiet SMS reminders. The teacher went back to teaching. The system holds the rest.',
    metric:   '+70% retention',
    color:  '#4A1D7A',
    text:   '#7CFFB2',
    accent: '#F2C811',
  },
  {
    industry: 'Craft bakery',
    region:   'United Kingdom',
    before:   'Pre-orders on sticky notes.',
    after:    'One clean ordering page and a stock-alert flow. Loaves sell out before opening. Mornings feel like a bakery again, not a warzone of DMs and post-its.',
    metric:   '3× online orders',
    color:  '#DC5828',
    text:   '#FCD34D',
    accent: '#0E3B2A',
  },
  {
    industry: 'Landscaping company',
    region:   'Australia',
    before:   'Three-day quote turnaround.',
    after:    'A templated quoting engine and a CRM pipeline built for the field. Quotes now go out in three minutes. Close rate doubled — same crew, same trucks.',
    metric:   '2× close rate',
    color:  '#1B4D5A',
    text:   '#F4E4C1',
    accent: '#DC5828',
  },
  {
    industry: 'Handmade jewelry brand',
    region:   'Latin America',
    before:   'A site that looked cheaper than the work.',
    after:    'Rebuilt to match the craft — quiet, considered, expensive. Traffic finally converts. Sales nearly doubled in two months without a single new ad dollar.',
    metric:   '+90% online sales',
    color:  '#C97B91',
    text:   '#3A0F1A',
    accent: '#F4E4C1',
  },
]

// ─── Animation constants ────────────────────────────────────
const FLIP_DURATION = 0.95   // seconds per flip
const FLIP_HOLD     = 4.5    // seconds each side stays visible

// ─── Card face shells ──────────────────────────────────────
const Face = ({ children, color, rotated, style }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transform: rotated ? 'rotateY(180deg)' : 'rotateY(0deg)',
    background: color,
    borderRadius: 'clamp(18px, 2vw, 26px)',
    overflow: 'hidden',
    boxShadow: '0 18px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: 'clamp(22px, 3vw, 30px)',
    ...style,
  }}>
    {children}
  </div>
)

// ─── Front of card — the "BEFORE" state ─────────────────────
const Front = ({ t }) => (
  <Face color={t.color}>
    {/* tiny label row: BEFORE tag + status dot */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: t.text,
        opacity: 0.7,
      }}>
        Before · {t.industry}
      </span>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: t.accent,
        boxShadow: `0 0 12px ${t.accent}66`,
      }} />
    </div>

    {/* The "before" pain in big chunky type */}
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 'clamp(20px, 3vh, 36px)',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(1.8rem, 3.4vw, 2.9rem)',
        lineHeight: 1.02,
        letterSpacing: '-0.02em',
        color: t.text,
        margin: 0,
      }}>
        {t.before}
      </h3>
    </div>

    {/* footer: region + metric */}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingTop: 'clamp(16px, 2.4vw, 24px)',
      borderTop: `1px solid ${t.text}33`,
    }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
          color: t.text,
          opacity: 0.95,
        }}>
          {t.region}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: t.text,
          opacity: 0.55,
          marginTop: '4px',
        }}>
          the state we found them in
        </div>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        fontWeight: 600,
        color: t.accent,
        letterSpacing: '0.02em',
      }}>
        {t.metric}
      </div>
    </div>
  </Face>
)

// ─── Back of card — the "AFTER" transformation ──────────────
const Back = ({ t }) => (
  <Face color={t.color} rotated>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '6px',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: t.accent,
        opacity: 0.9,
      }}>
        After · {t.industry}
      </span>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: t.accent,
        boxShadow: `0 0 14px ${t.accent}88`,
      }} />
    </div>

    <p style={{
      flex: 1,
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 'clamp(0.98rem, 1.3vw, 1.15rem)',
      lineHeight: 1.5,
      color: t.text,
      margin: '10px 0 0',
    }}>
      {t.after}
    </p>

    <div style={{
      marginTop: 'clamp(14px, 2vw, 20px)',
      paddingTop: '14px',
      borderTop: `1px solid ${t.text}33`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.92rem',
          color: t.text,
        }}>
          {t.region}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: t.text,
          opacity: 0.55,
          marginTop: '3px',
        }}>
          the transformation
        </div>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        fontWeight: 600,
        color: t.accent,
      }}>
        {t.metric}
      </div>
    </div>
  </Face>
)

// ─── Single card with auto-flip ─────────────────────────────
const FlipCard = ({ t, innerRef, outerRef }) => (
  <div
    ref={outerRef}
    style={{
      perspective: '1600px',
      aspectRatio: '4 / 5',
      width: '100%',
      willChange: 'transform',
    }}
  >
    <div
      ref={innerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
      }}
    >
      <Front t={t} />
      <Back  t={t} />
    </div>
  </div>
)

// ─── Section ────────────────────────────────────────────────
const TestimonialSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const rowRefs    = useRef([])
  const innerRefs  = useRef([])
  const outerRefs  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. AUTO-FLIP — each card on its own loop, randomised offset
      innerRefs.current.forEach((inner, i) => {
        if (!inner) return
        const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 3 + i * 0.4 })
        tl.to(inner, { rotateY: 180, duration: FLIP_DURATION, ease: 'power2.inOut' })
          .to(inner, { rotateY: 180, duration: FLIP_HOLD })   // hold back
          .to(inner, { rotateY: 360, duration: FLIP_DURATION, ease: 'power2.inOut' })
          .to(inner, { rotateY: 360, duration: FLIP_HOLD + Math.random() * 2 }) // hold front
          .set(inner, { rotateY: 0 })   // reset for clean repeat
      })

      // 2. ENTRANCE — cards rise + fade in when section enters viewport
      gsap.from(outerRefs.current.filter(Boolean), {
        y: 90,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: { each: 0.08, from: 'random' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      })

      // 3. ROW PARALLAX — each row drifts at a different rate while
      //    the section moves through the viewport. Desktop-only —
      //    on mobile it fights the natural scroll rhythm and feels
      //    jittery on single-column layouts.
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 900
      if (isDesktop) {
        const parallaxRates = [-60, 30]   // row 1 drifts up, row 2 drifts down
        rowRefs.current.forEach((row, i) => {
          if (!row) return
          gsap.fromTo(row,
            { y: -parallaxRates[i] / 2 },
            {
              y: parallaxRates[i] / 2,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end:   'bottom top',
                scrub: 1,
              },
            }
          )
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split testimonials into two rows of three
  const row1 = TESTIMONIALS.slice(0, 3)
  const row2 = TESTIMONIALS.slice(3, 6)
  const rowGroups = [row1, row2]

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0C0709 0%, #100A0E 50%, #0A0608 100%)',
        paddingTop:    'clamp(100px, 14vh, 180px)',
        paddingBottom: 'clamp(120px, 16vh, 200px)',
        overflow: 'hidden',
      }}
    >
      <CursorGradient color="#EC4899" opacity={0.26} size={900} />

      {/* ambient halos */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '10%', left: '5%',
        width: 520, height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: '5%', right: '5%',
        width: 460, height: 460,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,88,40,0.09) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      {/* heading */}
      <div
        ref={headingRef}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 48px)',
          marginBottom: 'clamp(60px, 8vh, 100px)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(245,242,236,0.4)',
          marginBottom: '18px',
        }}>
          {'// transformations, not testimonials'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          maxWidth: '900px',
        }}>
          What{' '}
          <em style={{
            fontStyle: 'italic',
            color: 'var(--color-accent)',
          }}>
            transformation
          </em>{' '}
          looks like.
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'clamp(0.98rem, 1.4vw, 1.15rem)',
          color:      'var(--color-text-dim)',
          maxWidth:   '620px',
          marginTop:  '18px',
          lineHeight: 1.6,
        }}>
          Six industries. Six quiet before-and-afters. No names, no logos — the
          shape of the shift is what matters.
        </p>
      </div>

      {/* card rows */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(20px, 4vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(24px, 3vw, 36px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {rowGroups.map((row, rowIdx) => (
          <div
            key={rowIdx}
            ref={el => rowRefs.current[rowIdx] = el}
            className="testimonial-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(20px, 2.4vw, 32px)',
              willChange: 'transform',
            }}
          >
            {row.map((t, colIdx) => {
              const flatIdx = rowIdx * 3 + colIdx
              return (
                <FlipCard
                  key={flatIdx}
                  t={t}
                  innerRef={el => innerRefs.current[flatIdx] = el}
                  outerRef={el => outerRefs.current[flatIdx] = el}
                />
              )
            })}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonial-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .testimonial-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default TestimonialSection
