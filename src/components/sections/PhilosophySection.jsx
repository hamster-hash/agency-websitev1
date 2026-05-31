'use client'
// components/sections/PhilosophySection.jsx
// ============================================================
// PHILOSOPHY SECTION — "Why I'm Different"
// Two parts:
//   1. Large editorial quote with GSAP word-split reveal
//   2. Horizontal marquee ticker strip in accent color
//
// KEY TWEAKS:
//   - Quote text      → edit QUOTE_PARTS array
//   - Ticker items    → edit TICKER_ITEMS array
//   - Ticker speed    → edit animation duration in .marquee-track CSS
//   - Background grid → toggle the grid overlay div
// ============================================================

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── CONTENT ────────────────────────────────────────────────

// Quote broken into lines for fine-grained animation control
const QUOTE_PARTS = [
  { text: 'We bridge the gap',          accent: false },
  { text: 'between business and tech.', accent: false },
  { text: 'Tech is just 40% of it —',   accent: false },
  { text: 'understanding your market,', accent: true  },
  { text: 'analysing your business,',   accent: true  },
  { text: 'comes first.',               accent: true  },
]

// Ticker items — will repeat to fill the screen
const TICKER_ITEMS = [
  'BUSINESS ENGINEER',
  'NOT A FREELANCER',
  'NOT AN AGENCY',
  'SYSTEMS THINKER',
  'GROWTH PARTNER',
  'STRATEGY FIRST',
  'AUTOMATION NATIVE',
  'CHAOS KILLER',
]

// ─────────────────────────────────────────────────────────────

const PhilosophySection = () => {
  const quoteRef  = useRef(null)
  const lineRefs  = useRef([])

  // ─── Staggered line reveal on scroll ────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = lineRefs.current.filter(Boolean)

      gsap.fromTo(lines,
        { opacity: 0, y: 50 },
        {
          opacity:  1,
          y:        0,
          duration: 0.8,
          ease:     'power3.out',
          stagger:  0.15,
          scrollTrigger: {
            trigger: quoteRef.current,
            start:   'top 70%',
          }
        }
      )
    }, quoteRef)

    return () => ctx.revert()
  }, [])

  const allTicker = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section id="philosophy" style={{
      background:     'linear-gradient(175deg, #12100E 0%, #141210 40%, #100E12 100%)',
      borderTop:      '1px solid var(--color-border)',
      paddingTop:     'var(--space-32)',
      paddingBottom:  0,
      overflow:       'hidden',
      position:       'relative',
    }}>
      {/* ── Large Background Text (decorative) ───────────────── */}
      <div aria-hidden="true" style={{
        position:   'absolute',
        top:        '50%',
        left:       '50%',
        transform:  'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize:   'clamp(8rem, 20vw, 20rem)',
        fontWeight: 900,
        color:      'var(--color-text-ghost)',
        opacity:    0.15,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 1,
      }}>
        WHY
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Section Label ──────────────────────────────────── */}
        <p className="section-label" style={{ marginBottom: 'var(--space-12)' }}>
          {'// the philosophy'}
        </p>

        {/* ── Editorial Quote ────────────────────────────────── */}
        <blockquote ref={quoteRef} style={{ maxWidth: '900px' }}>
          {QUOTE_PARTS.map((part, idx) => (
            <div
              key={idx}
              ref={el => lineRefs.current[idx] = el}
              style={{ overflow: 'hidden', paddingBottom: '0.05em', opacity: 0 }}
            >
              <span
                className={part.accent ? 'text-display-italic' : 'text-display'}
                style={{
                  display:    'block',
                  fontSize:   'clamp(2rem, 4.5vw, 4rem)',
                  lineHeight: 1.15,
                  color:      part.accent ? 'var(--color-accent)' : 'var(--color-text-primary)',
                }}
              >
                {part.text}
              </span>
            </div>
          ))}
        </blockquote>

        {/* ── YouTube Plug ─────────────────────────────────────── */}
        <div style={{
          marginTop:    'var(--space-12)',
          padding:      'var(--space-8)',
          border:       '1px solid rgba(200,244,0,0.15)',
          borderRadius: '4px',
          background:   'rgba(200,244,0,0.03)',
          maxWidth:     '700px',
        }}>
          <p className="text-mono" style={{
            fontSize: 'var(--text-base)',
            color:    'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}>
            I also make content on YouTube to teach you business in a fun way.
            They call me <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>Sensei</span> over there.
          </p>
          <a
            href="https://www.youtube.com/@sensei_raff"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '10px',
              marginTop:     'var(--space-4)',
              padding:       '10px 20px',
              background:    '#FF0000',
              color:         '#fff',
              borderRadius:  '4px',
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-sm)',
              fontWeight:    600,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              transition:    'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor">
              <path d="M19.615 2.184A2.516 2.516 0 0017.847.418C16.28 0 10 0 10 0S3.72 0 2.153.418A2.516 2.516 0 00.385 2.184 26.386 26.386 0 000 7a26.386 26.386 0 00.385 4.816A2.516 2.516 0 002.153 13.582C3.72 14 10 14 10 14s6.28 0 7.847-.418a2.516 2.516 0 001.768-1.766A26.386 26.386 0 0020 7a26.386 26.386 0 00-.385-4.816zM8 10V4l5.196 3L8 10z"/>
            </svg>
            Watch on YouTube
          </a>
        </div>

        {/* ── Attribution ─────────────────────────────────────── */}
        <div style={{
          display:   'flex',
          alignItems: 'center',
          gap:        'var(--space-4)',
          marginTop:  'var(--space-12)',
          marginBottom: 'var(--space-24)',
        }}>
          <div style={{ width: 40, height: 1, background: 'var(--color-border)' }} />
          <p className="text-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
            the engineer behind your growth
          </p>
        </div>
      </div>

      {/* ── Marquee Ticker Strip ──────────────────────────────── */}
      {/* 
        The ticker runs two copies of TICKER_ITEMS to create
        a seamless infinite loop. Speed = animation-duration in CSS.
        TO CHANGE SPEED: edit the 25s value below.
        TO ADD ITEMS: add to TICKER_ITEMS array above.
      */}
      <div style={{
        background:  'var(--color-accent)',
        padding:     'var(--space-4) 0',
        overflow:    'hidden',
        borderTop:   '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{
          display:   'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee 25s linear infinite', // ← change 25s for speed
        }}>
          {allTicker.map((item, idx) => (
            <span
              key={idx}
              className="text-mono"
              style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        'var(--space-4)',
                color:      'var(--color-bg)',
                fontSize:   'var(--text-sm)',
                letterSpacing: '0.1em',
                padding:    '0 var(--space-8)',
              }}
            >
              {item}
              {/* Separator dot */}
              <span style={{ fontSize: '6px', color: 'rgba(0,0,0,0.4)' }}>●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PhilosophySection