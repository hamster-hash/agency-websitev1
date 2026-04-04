'use client'
// components/sections/HeroSection.jsx
// ============================================================
// HERO SECTION
// Full-viewport dark section with:
//   1. Cursor-following spotlight (mouse glow effect)
//   2. Word-by-word headline reveal on load
//   3. Pin + scale-down on scroll (GSAP ScrollTrigger)
//      → As user scrolls down, headline shrinks to top-left corner
//
// KEY TWEAKS:
//   - Headline text  → edit HEADLINE_WORDS array
//   - Subline text   → edit SUBLINE constant
//   - CTA text       → edit CTA_TEXT constant
//   - Spotlight size → edit spotlightSize in the mousemove handler
//   - Scale target   → edit the GSAP scaleX/scaleY values
// ============================================================

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── CONTENT — edit your copy here ──────────────────────────

// Each sub-array is one line. Each string is one word.
const HEADLINE_LINES = [
  ['Your', ' business'],
  ["isn't", ' broken.'],
  ['It\'s', 'just', 'missing'],
  ['a', 'system.'],
]

const SUBLINE = `[ not an agency. an engineer who gives a damn. ]`

const CTA_TEXT = `→ let's diagnose your business`

// ─────────────────────────────────────────────────────────────

const HeroSection = () => {
  const sectionRef   = useRef(null)
  const spotlightRef = useRef(null)
  const headlineRef  = useRef(null)
  const sublineRef   = useRef(null)
  const ctaRef       = useRef(null)
  const wordRefs     = useRef([])

  // ─── 1. Cursor Spotlight Effect ─────────────────────────────
  useEffect(() => {
    const section   = sectionRef.current
    const spotlight = spotlightRef.current
    if (!section || !spotlight) return

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x    = e.clientX - rect.left
      const y    = e.clientY - rect.top

      // Move the spotlight glow to cursor position
      // TO ADJUST SIZE: change the radial-gradient pixel values
      gsap.to(spotlight, {
        '--x': `${x}px`,
        '--y': `${y}px`,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    section.addEventListener('mousemove', onMouseMove)
    return () => section.removeEventListener('mousemove', onMouseMove)
  }, [])

  // ─── 2. Word-by-word headline reveal on page load ───────────
  useEffect(() => {
    const words   = wordRefs.current.filter(Boolean)
    const subline = sublineRef.current
    const cta     = ctaRef.current

    const tl = gsap.timeline({ delay: 0.3 }) // ← change delay for load timing

    // Stagger each word upward
    tl.fromTo(words, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08, // ← seconds between each word (lower = faster cascade)
      }
    )
    // Subline after headline
    .fromTo(subline,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    )
    // CTA button last
    .fromTo(cta,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )

    return () => tl.kill()
  }, [])

  // ─── 3. Pin + Scale-down on scroll ──────────────────────────
  // The whole hero section pins, and the content scales down
  // as the user begins to scroll — next section slides up beneath
  useEffect(() => {
    const section  = sectionRef.current
    const headline = headlineRef.current
    if (!section || !headline) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:   'top top',      // ← when top of section hits top of viewport
        end:     '+=600',        // ← scroll distance before unpinning (px)
        pin:     true,           // ← pins the section while timeline plays
        scrub:   1.5,            // ← smoothness of scrub (higher = smoother lag)
        // markers: true,        // ← uncomment to debug trigger points
      }
    })

    // Scale entire headline group toward top-left
    tl.to(headlineRef.current, {
      scale:          0.55,  // ← how small it shrinks (1 = full, 0.5 = half)
      transformOrigin: 'top left',
      x:              0,
      y:              0,
      opacity:        0.4,   // ← dimmed state when shrunk
      ease:           'none',
    })
    // Subline and CTA fade out
    .to([sublineRef.current, ctaRef.current], {
      opacity: 0,
      y:       -20,
      ease:    'none',
    }, '<') // ← '<' means start at same time as previous

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  // Build a flat array ref for all words across all lines
  let wordIndex = 0

  return (
    <section
      ref={sectionRef}
      style={{
        position:       'relative',
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        'var(--space-32) var(--space-8)',
        overflow:       'hidden',
        background:     'var(--color-bg)',
      }}
    >
      {/* ── Spotlight Glow Element ────────────────────────────────
          This div follows the mouse via CSS custom properties.
          TO CHANGE SIZE: edit the 500px values in background below */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          pointerEvents: 'none',
          background: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(200,244,0,0.05) 0%, transparent 70%)',
          // ↑ Change 600px for spotlight size, 0.05 for intensity
        }}
      />

      {/* ── Background grid pattern (subtle) ─────────────────────
          TO REMOVE: delete this div */}
      <div aria-hidden="true" style={{
        position:   'absolute',
        inset:      0,
        backgroundImage: `
          linear-gradient(var(--color-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity:    0.3,
        pointerEvents: 'none',
        maskImage:  'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }} />

      {/* ── Section Label ─────────────────────────────────────── */}
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%' }}>
        <p className="section-label" style={{ marginBottom: 'var(--space-8)' }}>
          {'// the world\'s first business engineering studio'}
        </p>

        {/* ── Headline ──────────────────────────────────────────── */}
        <div ref={headlineRef}>
          {HEADLINE_LINES.map((line, lineIdx) => (
            <div
              key={lineIdx}
              style={{
                display:    'flex',
                flexWrap:   'wrap',
                gap:        '0.9em',
                lineHeight: 1.05,
                overflow:   'hidden',   /* clips the upward reveal */
                paddingBottom: '0.05em',
              }}
            >
              {line.map((word, wIdx) => {
                const currentIdx = wordIndex++
                return (
                  <span
                    key={wIdx}
                    ref={el => wordRefs.current[currentIdx] = el}
                    className="text-display"
                    style={{
                      fontSize:   'clamp(3rem, 8vw, 7rem)', // ← responsive headline size
                      display:    'inline-block',
                      // Last word on last line gets accent color
                      color: (lineIdx === HEADLINE_LINES.length - 1 && wIdx === line.length - 1)
                        ? 'var(--color-accent)'
                        : 'var(--color-text-primary)',
                    }}
                  >
                    {word}
                  </span>
                )
              })}
            </div>
          ))}
        </div>

        {/* ── Subline — mono terminal style ─────────────────────── */}
        <p
          ref={sublineRef}
          className="text-mono"
          style={{
            fontSize:   'var(--text-base)',
            color:      'var(--color-text-dim)',
            marginTop:  'var(--space-8)',
            opacity:    0, // starts hidden, GSAP reveals
          }}
        >
          {SUBLINE}
        </p>

        {/* ── CTA Button ───────────────────────────────────────── */}
        <div ref={ctaRef} style={{ marginTop: 'var(--space-12)', opacity: 0 }}>
          <a href="#packages" className="btn-primary">
            {CTA_TEXT}
          </a>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────── */}
        <div style={{
          position:   'absolute',
          bottom:     'var(--space-8)',
          left:       '50%',
          transform:  'translateX(-50%)',
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:        'var(--space-2)',
          opacity:    0.4,
        }}>
          <p className="text-mono" style={{ fontSize: 'var(--text-xs)' }}>scroll</p>
          {/* Animated scroll dot */}
          <div style={{
            width:    '1px',
            height:   '48px',
            background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
            animation: 'scrollLine 1.5s ease-in-out infinite',
          }} />
          <style>{`
            @keyframes scrollLine {
              0%, 100% { transform: scaleY(0); transform-origin: top; }
              50%       { transform: scaleY(1); transform-origin: top; }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}

export default HeroSection