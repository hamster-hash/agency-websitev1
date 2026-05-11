'use client'
// components/sections/HeroSection.jsx
// ============================================================
// HERO SECTION
// Full-viewport dark section with:
//   1. Cursor-following spotlight (mouse glow effect)
//   2. Word-by-word headline reveal on load
//   3. Pin + scrub on scroll — SYNCED DUAL ANIMATION:
//        → Headline scales DOWN + moves UP to top-left
//        → Mascot scales UP + slides in from right to left
//
// KEY TWEAKS:
//   - Headline text     → edit HEADLINE_LINES array
//   - Mascot image      → place smile.png in /public/mascot.png
//   - Mascot start pos  → edit gsap.set x value (how far right it starts)
//   - Mascot end size   → edit tl.to scale value (how big it gets)
//   - Scroll distance   → edit 'end: +=700' in ScrollTrigger config
//   - Scrub smoothness  → edit scrub: 1.5 (higher = more floaty lag)
//   - Mascot position   → edit bottom/right in mascot wrapper styles
// ============================================================

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── CONTENT — edit your copy here ──────────────────────────

const HEADLINE_LINES = [
  ['Your', 'business'],
  ["isn't", { word: 'broken.', highlight: true, altFont: true }],
  ["It's", 'just', 'missing'],
  ['a', { word: 'system.', altFont: true }],
]

const SUBLINE  = `[ not an agency. an engineer who gives a damn. ]`
const CTA_TEXT = `→ let's diagnose your business`

// Cheeky label above the mascot
const MASCOT_LABEL = `Heyya fellas, I am Raff`

// ─────────────────────────────────────────────────────────────

const HeroSection = () => {
  const sectionRef   = useRef(null)
  const spotlightRef = useRef(null)
  const headlineRef  = useRef(null)
  const sublineRef   = useRef(null)
  const ctaRef       = useRef(null)
  const mascotRef    = useRef(null)
  const wordRefs     = useRef([])

  // ─── 1. Cursor Spotlight Effect (rAF-throttled, no GSAP) ────
  useEffect(() => {
    const section   = sectionRef.current
    const spotlight = spotlightRef.current
    if (!section || !spotlight) return

    let x = 0, y = 0, ticking = false

    const update = () => {
      spotlight.style.setProperty('--x', `${x}px`)
      spotlight.style.setProperty('--y', `${y}px`)
      ticking = false
    }

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      x = e.clientX - rect.left
      y = e.clientY - rect.top
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    section.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => section.removeEventListener('mousemove', onMouseMove)
  }, [])

  // ─── 2. Word-by-word headline reveal on load ────────────────
  useEffect(() => {
    const words  = wordRefs.current.filter(Boolean)
    const mascot = mascotRef.current

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(words,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 }
    )
    .fromTo(sublineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    // Mascot slides in from bottom-right on load
    .fromTo(mascot,
      { opacity: 0, x: 60, y: 30 },
      { opacity: 1, x: 0,  y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.5'
    )

    return () => tl.kill()
  }, [])

  // ─── 3. Scroll: Headline DOWN ←→ Mascot UP (synced scrub) ───
  useEffect(() => {
    const section  = sectionRef.current
    const headline = headlineRef.current
    const mascot   = mascotRef.current
    if (!section || !headline || !mascot) return

    const ctx = gsap.context(() => {
      gsap.set(mascot, {
        scale:           0.65,
        x:               100,
        transformOrigin: 'bottom center',
        force3D:         true,
      })
      gsap.set(headline, { force3D: true })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start:   'top top',
          end:     '+=700',
          pin:     true,
          scrub:   0.8,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: 'none', force3D: true },
      })

      tl.to(headline, {
        scale:           0.45,
        transformOrigin: 'top left',
        opacity:         0.3,
      }, 0)
      .to(sublineRef.current, {
        opacity: 0,
        y:       -30,
      }, 0)
      .to(mascot, {
        scale: 1.9,
        x:     -30,
      }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  let wordIndex = 0

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position:       'relative',
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        'var(--space-32) var(--space-8)',
        overflow:       'hidden',
        background:     'linear-gradient(165deg, #0D1117 0%, #0A0A0A 40%, #111118 100%)',
      }}
    >
      {/* ── Spotlight glow follows cursor ────────────────────── */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          background:    'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(200,244,0,0.05) 0%, transparent 70%)',
        }}
      />

      {/* ── Subtle grid overlay ───────────────────────────────── */}
      <div aria-hidden="true" style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: `
          linear-gradient(var(--color-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
        `,
        backgroundSize:  '80px 80px',
        opacity:         0.3,
        pointerEvents:   'none',
        maskImage:       'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }} />

      {/* ================================================================
          MASCOT WRAPPER
          Positioned absolute at bottom-right. GSAP moves it during scroll.

          Image setup:
            1. Take your smile.png file
            2. Copy it into your /public folder
            3. Rename it to mascot.png  (or change src below)

          The image has a black background — we use mixBlendMode: 'screen'
          which makes pure black pixels invisible on a dark background.
          Result: only the drawn character shows, background disappears.

          TO REPOSITION: change bottom / right values below
          TO RESIZE:     change the width clamp values
          TO DISABLE blend mode: remove mixBlendMode and filter lines
          ================================================================ */}
      <div
        ref={mascotRef}
        className="hero-mascot"
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        0,
          right:         '5vw',
          width:         'clamp(200px, 26vw, 400px)',
          pointerEvents: 'none',
          userSelect:    'none',
          zIndex:        2,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '10px',
        }}
      >
        {/* ── Cheeky label above mascot ─────────────────────── */}
        {/* TO CHANGE: edit MASCOT_LABEL at top of file */}
        <div style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'clamp(0.6rem, 1.1vw, 0.8rem)',
          color:         'var(--color-accent)',
          letterSpacing: '0.04em',
          whiteSpace:    'nowrap',
          padding:       '5px 12px',
          border:        '1px solid rgba(200,244,0,0.2)',
          borderRadius:  '2px',
          background:    'rgba(200,244,0,0.04)',
          position:      'relative',
        }}>
          {MASCOT_LABEL}
          {/* Down-arrow pointing toward mascot */}
          <span aria-hidden="true" style={{
            position:     'absolute',
            bottom:       '-7px',
            left:         '50%',
            transform:    'translateX(-50%)',
            width:        0,
            height:       0,
            borderLeft:   '4px solid transparent',
            borderRight:  '4px solid transparent',
            borderTop:    '7px solid rgba(200,244,0,0.2)',
          }} />
        </div>

        {/* ── Mascot image ──────────────────────────────────────
            mixBlendMode 'screen' = black bg disappears on dark surfaces
            This is the key trick — no need to manually remove background */}
        <Image
          src="/smile.webp"
          alt="mascot"
          width={400}
          height={580}
          priority
          style={{
            width:        '100%',
            height:       'auto',
            objectFit:    'contain',
            display:      'block',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* ── Main text content ─────────────────────────────────── */}
      <div style={{
        maxWidth:  'var(--max-width)',
        margin:    '0 auto',
        width:     '100%',
        position:  'relative',
        zIndex:    3,   // ← above mascot so text stays on top
      }}>

        <p className="section-label" style={{ marginBottom: 'var(--space-8)' }}>
          {'// the world\'s first business engineering studio'}
        </p>

        {/* ── Headline ──────────────────────────────────────── */}
        <div ref={headlineRef} className="hero-headline">
          {HEADLINE_LINES.map((line, lineIdx) => (
            <div
              key={lineIdx}
              style={{
                display:       'flex',
                flexWrap:      'wrap',
                gap:           '0.6em',
                lineHeight:    1.05,
                overflow:      'hidden',
                paddingBottom: '0.05em',
              }}
            >
              {line.map((wordItem, wIdx) => {
                const currentIdx = wordIndex++
                const isObj = typeof wordItem === 'object'
                const word = isObj ? wordItem.word : wordItem
                const isHighlight = isObj && wordItem.highlight
                const isAltFont = isObj && wordItem.altFont
                const isLastWord = lineIdx === HEADLINE_LINES.length - 1 && wIdx === line.length - 1
                return (
                  <span
                    key={wIdx}
                    ref={el => wordRefs.current[currentIdx] = el}
                    className="text-display"
                    style={{
                      fontSize:      'clamp(2.4rem, 6.5vw, 5.5rem)',
                      display:       'inline-block',
                      letterSpacing: '-0.02em',
                      fontFamily:    isAltFont ? 'var(--font-mono)' : undefined,
                      fontStyle:     isAltFont ? 'italic' : undefined,
                      color:         isHighlight
                        ? 'var(--color-accent)'
                        : isLastWord
                          ? 'var(--color-accent)'
                          : 'var(--color-text-primary)',
                      textDecoration: isHighlight ? 'line-through' : 'none',
                      textDecorationColor: isHighlight ? 'var(--color-accent)' : undefined,
                    }}
                  >
                    {word}
                  </span>
                )
              })}
            </div>
          ))}
        </div>

        {/* ── Subline ────────────────────────────────────────── */}
        <p
          ref={sublineRef}
          className="text-mono"
          style={{
            fontSize:  'var(--text-base)',
            color:     'var(--color-text-dim)',
            marginTop: 'var(--space-8)',
            opacity:   0,
          }}
        >
          {SUBLINE}
        </p>

        {/* ── CTA button — in flow, below hero text ───────────── */}
        <div
          ref={ctaRef}
          style={{
            marginTop: 'var(--space-12)',
            opacity:   0,
          }}
        >
          <a href="#packages" className="btn-primary">
            {CTA_TEXT}
          </a>
        </div>

        {/* ── Scroll indicator ──────────────────────────────── */}
        <div style={{
          position:      'absolute',
          bottom:        'var(--space-8)',
          left:          '50%',
          transform:     'translateX(-50%)',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           'var(--space-2)',
          opacity:       0.4,
        }}>
          <p className="text-mono" style={{ fontSize: 'var(--text-xs)' }}>scroll</p>
          <div style={{
            width:      '1px',
            height:     '48px',
            background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
            animation:  'scrollLine 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}

export default HeroSection