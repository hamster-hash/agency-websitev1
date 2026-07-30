'use client'
// components/sections/FAQSection.jsx
// ============================================================
// FAQ SECTION — "The Common Ground"
// SEO-first. Keyword-optimised questions targeting the two
// niches (coaches/consultants + restaurants/cafés) and the
// service verticals (systemisation, automation, missed-call
// text-back, GoHighLevel/n8n setup, 3-phase transformation).
//
// The parent layout emits FAQPage JSON-LD from the FAQS array
// (see src/app/layout.js) so Google can render rich results.
// If you edit copy here, mirror the change there.
// ============================================================

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGradient from '@/components/ui/CursorGradient'
import { FAQS } from '@/lib/faqs'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0)   // first question open by default
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const rowRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })

      gsap.from(rowRefs.current.filter(Boolean), {
        y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggle = (idx) => setOpenIdx(openIdx === idx ? null : idx)

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        position:      'relative',
        overflow:      'hidden',
        background:    'linear-gradient(180deg, #0B0C10 0%, #0E1014 50%, #0A0B0F 100%)',
        borderTop:     '1px solid var(--color-border)',
        paddingTop:    'var(--space-32)',
        paddingBottom: 'var(--space-32)',
      }}
    >
      <CursorGradient color="#3DA9FC" opacity={0.24} size={880} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div ref={headingRef} style={{ marginBottom: 'var(--space-16)', maxWidth: '780px' }}>
          <p className="section-label" style={{ marginBottom: 'var(--space-6)' }}>
            {'// the common questions'}
          </p>
          <h2 className="text-display" style={{
            fontSize:   'clamp(2.4rem, 5vw, 4.2rem)',
            lineHeight: 1.06,
          }}>
            The questions{' '}
            <em className="text-display-italic" style={{ color: 'var(--color-accent)' }}>
              every owner
            </em>{' '}
            asks first.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            color:      'var(--color-text-dim)',
            marginTop:  'var(--space-6)',
            fontSize:   'var(--text-lg)',
            lineHeight: 1.7,
            maxWidth:   '620px',
          }}>
            Straight answers on scope, pricing, tools, and how a business
            engineer differs from an agency or a freelancer.
          </p>
        </div>

        {/* ── Accordion ──────────────────────────────────────── */}
        <div
          itemScope
          itemType="https://schema.org/FAQPage"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
        >
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                ref={el => rowRefs.current[idx] = el}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                style={{
                  background:   'var(--color-bg-3)',
                  border:       `1px solid ${isOpen ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--border-radius)',
                  overflow:     'hidden',
                  transition:   'border-color 0.3s ease',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  style={{
                    width:       '100%',
                    display:     'grid',
                    gridTemplateColumns: '1fr auto',
                    gap:         'var(--space-6)',
                    alignItems:  'center',
                    padding:     'var(--space-6) var(--space-8)',
                    textAlign:   'left',
                    cursor:      'pointer',
                    background:  'none',
                  }}
                >
                  <h3
                    itemProp="name"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize:   'clamp(1.05rem, 1.6vw, 1.35rem)',
                      lineHeight: 1.35,
                      color:      isOpen ? 'var(--color-accent)' : 'var(--color-text-primary)',
                      transition: 'color 0.3s ease',
                      margin:     0,
                    }}
                  >
                    {item.q}
                  </h3>

                  <div style={{
                    width:  36,
                    height: 36,
                    border: `1px solid ${isOpen ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s, border-color 0.3s',
                    transform:  isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    color:      isOpen ? 'var(--color-accent)' : 'var(--color-text-dim)',
                    fontFamily: 'var(--font-mono)',
                    fontSize:   '1.2rem',
                  }}>
                    +
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    style={{
                      padding:  '0 var(--space-8) var(--space-8)',
                      animation: 'fadeInUp 0.4s ease forwards',
                    }}
                  >
                    <p
                      itemProp="text"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   'var(--text-lg)',
                        lineHeight: 1.7,
                        color:      'var(--color-text-dim)',
                        maxWidth:   '780px',
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Bottom nudge ────────────────────────────────────── */}
        <p style={{
          marginTop:  'var(--space-16)',
          fontFamily: 'var(--font-mono)',
          fontSize:   'var(--text-sm)',
          color:      'var(--color-text-dim)',
          textAlign:  'center',
        }}>
          Question not covered here?{' '}
          <a
            href="#cta"
            style={{
              color: 'var(--color-accent)',
              borderBottom: '1px solid var(--color-accent)',
              paddingBottom: '2px',
            }}
          >
            Ask it on a free diagnostic call →
          </a>
        </p>
      </div>
    </section>
  )
}

export default FAQSection
