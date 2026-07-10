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
const TESTIMONIALS = [
  {
    name: 'Danny Sanchez',
    company: 'Sanchez & Sons',
    role: 'Owner',
    location: 'Austin, TX',
    industry: 'Plumbing',
    metric: '+40% revenue',
    quote: "We kept missing calls and losing jobs. Raff built us a clean website and a system that books estimates for us, even at night. Felt like hiring two extra people.",
    color:  '#0E3B2A',  // deep forest
    text:   '#F0B5C4',  // soft pink
    accent: '#F2C811',
  },
  {
    name: 'Maria Delgado',
    company: 'Evergreen Co.',
    role: 'Operations',
    location: 'Phoenix, AZ',
    industry: 'Landscaping',
    metric: '2× close rate',
    quote: "Our quotes used to take three days. Raff built us a system that sends them in three minutes. Clients are stunned, and we close twice as many jobs.",
    color:  '#F2C811',  // bright yellow
    text:   '#3D2E00',  // olive
    accent: '#0E3B2A',
  },
  {
    name: 'Yuki Tanaka',
    company: 'The Morning Fold',
    role: 'Owner',
    location: 'Portland, OR',
    industry: 'Cafe',
    metric: '+55% covers',
    quote: "We were struggling with operations. Raff built us a beautiful website and a QR-based booking and menu system. The cafe runs itself on slow mornings now.",
    color:  '#4A1D7A',  // royal purple
    text:   '#7CFFB2',  // mint
    accent: '#F2C811',
  },
  {
    name: 'Priya Achar',
    company: 'Flour & Fern',
    role: 'Co-founder',
    location: 'Asheville, NC',
    industry: 'Bakery',
    metric: '3× online orders',
    quote: "Pre-orders used to be a mess of DMs and sticky notes. Raff built us a simple ordering page and mornings are calm now. Loaves sell out before we open.",
    color:  '#DC5828',  // burnt orange
    text:   '#FCD34D',  // sunflower
    accent: '#0E3B2A',
  },
  {
    name: 'Aanya Verma',
    company: 'Still Water',
    role: 'Studio Owner',
    location: 'Brooklyn, NY',
    industry: 'Yoga',
    metric: '+70% retention',
    quote: "I was spending nights chasing class signups and reminders. Raff built me a system that does it quietly in the background. I just teach now.",
    color:  '#1B4D5A',  // deep teal
    text:   '#F4E4C1',  // cream
    accent: '#DC5828',
  },
  {
    name: 'Esme Hartwell',
    company: 'North Loom',
    role: 'Founder',
    location: 'Santa Fe, NM',
    industry: 'Jewelry',
    metric: '+90% online sales',
    quote: "My old site felt like a craft fair table. Raff rebuilt it so it feels like the jewelry — quiet, considered, expensive. Sales nearly doubled in two months.",
    color:  '#C97B91',  // dusty rose
    text:   '#3A0F1A',  // wine
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

// ─── Front of card (the bold identity) ──────────────────────
const Front = ({ t }) => (
  <Face color={t.color}>
    {/* tiny label top */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: t.text,
        opacity: 0.7,
      }}>
        {t.industry}
      </span>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: t.accent,
        boxShadow: `0 0 12px ${t.accent}66`,
      }} />
    </div>

    {/* HUGE company name — the chunky type the video uses */}
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
        fontSize: 'clamp(2.2rem, 4.4vw, 3.6rem)',
        lineHeight: 0.95,
        letterSpacing: '-0.03em',
        color: t.text,
        margin: 0,
      }}>
        {t.company}
      </h3>
    </div>

    {/* footer row */}
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
          {t.name}
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
          {t.role} · {t.location}
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

// ─── Back of card (the quote) ───────────────────────────────
const Back = ({ t }) => (
  <Face color={t.color} rotated>
    <span style={{
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: '3rem',
      lineHeight: 0.7,
      color: t.accent,
      opacity: 0.85,
    }}>
      &ldquo;
    </span>

    <p style={{
      flex: 1,
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 'clamp(0.98rem, 1.35vw, 1.18rem)',
      lineHeight: 1.45,
      color: t.text,
      margin: '8px 0 0',
    }}>
      {t.quote}
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
          {t.name}
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
          {t.company}
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
      //    the section moves through the viewport. Gives the "mould"
      //    depth feel the user asked for.
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
          // testimonials
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
          Real people.{' '}
          <em style={{
            fontStyle: 'italic',
            color: 'var(--color-accent)',
          }}>
            Real shifts.
          </em>
        </h2>
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
