'use client'
// components/sections/DiagnosisSection.jsx
// ============================================================
// DIAGNOSIS SECTION — "What's Actually Wrong"
// Horizontal scroll section pinned with GSAP ScrollTrigger.
// Shows 4 pain-point cards that slide in as user scrolls right.
// Ends with a closing statement before unpinning.
//
// KEY TWEAKS:
//   - Pain points   → edit DIAGNOSIS_CARDS array
//   - Scroll speed  → edit 'end' value in ScrollTrigger config
//   - Card colors   → edit card background/border styles
//   - Closing line  → edit CLOSING_LINE constant
// ============================================================

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── CONTENT — edit your pain points here ───────────────────

const DIAGNOSIS_CARDS = [
  {
    number:    '01',
    symptom:   'Missed calls going unanswered',
    detail:    'Every missed call is a missed client. You\'re losing $$$ every single day without even knowing it.',
    icon:      '📞',
  },
  {
    number:    '02',
    symptom:   'You run the business. The business doesn\'t run itself.',
    detail:    'No systems, no automation. Everything depends on you being online, available, and sharp — 24/7.',
    icon:      '🔥',
  },
  {
    number:    '03',
    symptom:   'Your online presence looks cheap.',
    detail:    'First impressions are made in 3 seconds. If your brand doesn\'t look premium, you\'re losing premium clients.',
    icon:      '👁',
  },
  {
    number:    '04',
    symptom:   'You\'re too busy working IN the business to grow it.',
    detail:    'There\'s no time to think about marketing, strategy, or systems when you\'re drowning in the daily work.',
    icon:      '⏳',
  },
]

const CLOSING_LINE = 'Sound familiar? That\'s exactly why I exist.'

// ─────────────────────────────────────────────────────────────

const DiagnosisSection = () => {
  const sectionRef    = useRef(null)
  const wrapperRef    = useRef(null)  // the pinned outer container
  const trackRef      = useRef(null)  // the horizontal moving track
  const closingRef    = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track   = trackRef.current
    if (!wrapper || !track) return

    // Calculate how far to scroll horizontally
    // = total width of track minus viewport width
    const getScrollDistance = () => track.scrollWidth - window.innerWidth

    const st = ScrollTrigger.create({
      trigger:  wrapper,
      start:    'top top',
      end:      () => `+=${getScrollDistance() + 200}`, // ← +200 is extra breathing room
      pin:      true,
      scrub:    1,              // ← smoothness: 0 = instant, 2 = very smooth
      // markers: true,         // ← uncomment to debug
      animation: gsap.to(track, {
        x:       () => -getScrollDistance(),
        ease:    'none',
      }),
      invalidateOnRefresh: true, // recalculates on window resize
    })

    // Fade in closing line after cards pass
    gsap.fromTo(closingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y:       0,
        scrollTrigger: {
          trigger: wrapper,
          start:   'top top',
          end:     '+=200',
          scrub:   true,
          // markers: true,
        }
      }
    )

    return () => st.kill()
  }, [])

  return (
    /* ── Outer wrapper — this gets PINNED by ScrollTrigger ───── */
    <section
      id="diagnosis"
      ref={wrapperRef}
      style={{
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0F0F12 0%, #141418 50%, #0F1014 100%)',
      }}
    >
      {/* ── Section label ─────────────────────────────────────── */}
      <div style={{
        padding:    'var(--space-12) var(--space-8) var(--space-8)',
        maxWidth:   'var(--max-width)',
        margin:     '0 auto',
      }}>
        <p className="section-label">{'// the diagnosis'}</p>
      </div>

      {/* ── Horizontal scrolling track ────────────────────────── */}
      <div
        ref={trackRef}
        className="gsap-horizontal-wrapper"
        style={{
          alignItems:  'center',
          paddingLeft: 'var(--space-8)',
          gap:         'var(--space-6)',
          paddingBottom: 'var(--space-16)',
        }}
      >
        {/* Opening text panel */}
        <div style={{
          width:    'clamp(280px, 30vw, 420px)',
          flexShrink: 0,
          padding:  'var(--space-8) var(--space-6)',
        }}>
          <h2 className="text-display" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.1,
          }}>
            Does your{' '}
            <em className="text-display-italic" style={{ color: 'var(--color-accent)' }}>
              business
            </em>{' '}
            feel like this?
          </h2>
          <p className="text-mono" style={{
            fontSize: 'var(--text-sm)',
            color:    'var(--color-text-dim)',
            marginTop: 'var(--space-6)',
          }}>
            scroll to see →
          </p>
        </div>

        {/* ── Pain Point Cards ─────────────────────────────────── */}
        {DIAGNOSIS_CARDS.map((card, idx) => (
          <div
            key={idx}
            className={`diagnosis-card diagnosis-card-${idx}${hoveredIdx === idx ? ' is-hovered' : ''}`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              width:      'clamp(280px, 28vw, 380px)',
              flexShrink: 0,
              background: 'var(--color-bg-3)',
              border:     '1px solid var(--color-border)',
              borderRadius: 'var(--border-radius)',
              padding:    'var(--space-8)',
              position:   'relative',
              overflow:   'hidden',
            }}
          >
            {/* Ghost number watermark */}
            <span aria-hidden="true" style={{
              position:   'absolute',
              top:        '-0.2em',
              right:      '-0.1em',
              fontSize:   'var(--text-8xl)',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              color:      'var(--color-text-ghost)',
              lineHeight: 1,
              userSelect: 'none',
            }}>
              {card.number}
            </span>

            {/* Icon */}
            <div
              className="diagnosis-icon"
              style={{ fontSize: '2rem', marginBottom: 'var(--space-6)', position: 'relative', zIndex: 2 }}
            >
              {card.icon}
            </div>

            {/* Red status dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', position: 'relative', zIndex: 2 }}>
              <div
                className="diagnosis-dot"
                style={{
                  width:  8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#FF4040',
                  boxShadow: '0 0 8px #FF4040',
                }}
              />
              <span className="text-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
                SYMPTOM DETECTED
              </span>
            </div>

            {/* Symptom headline */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-2xl)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 'var(--space-4)',
              position:   'relative',
              zIndex:     2,
            }}>
              {card.symptom}
            </h3>

            {/* Detail */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-base)',
              color:      'var(--color-text-dim)',
              lineHeight: 1.6,
              position:   'relative',
              zIndex:     2,
            }}>
              {card.detail}
            </p>

            {/* Bottom accent line */}
            <div
              className="diagnosis-accent-line"
              style={{
                position:   'absolute',
                bottom:     0,
                left:       0,
                height:     '2px',
                width:      `${(idx + 1) * 25}%`,
                background: 'var(--color-accent)',
                zIndex:     2,
              }}
            />
          </div>
        ))}

        {/* ── Closing Statement ─────────────────────────────────── */}
        <div
          ref={closingRef}
          style={{
            width:    'clamp(280px, 35vw, 500px)',
            flexShrink: 0,
            padding:  'var(--space-8) var(--space-6)',
            opacity:  0,
          }}
        >
          <h2 className="text-display" style={{
            fontSize:  'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: 1.15,
          }}>
            Sound familiar?{' '}
            <em className="text-display-italic" style={{ color: 'var(--color-accent)' }}>
              That&apos;s exactly
            </em>{' '}
            why I exist.
          </h2>
        </div>
      </div>
    </section>
  )
}

export default DiagnosisSection