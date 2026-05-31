'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    name: 'Danny Sanchez',
    company: 'Sanchez & Sons Plumbing',
    role: 'Owner',
    location: 'Austin, TX',
    industry: 'Home Services',
    quote: "We kept missing calls and losing jobs. Raff built us a clean website and a system that books estimates for us, even at night. Felt like hiring two extra people.",
    metric: '+40% revenue',
  },
  {
    name: 'Maria Delgado',
    company: 'Evergreen Landscaping Co.',
    role: 'Operations Manager',
    location: 'Phoenix, AZ',
    industry: 'Home Services',
    quote: "Our quotes used to take three days. Raff built us a system that sends them in three minutes. Clients are stunned, and we close twice as many jobs.",
    metric: '2x close rate',
  },
  {
    name: 'Yuki Tanaka',
    company: 'The Morning Fold',
    role: 'Owner',
    location: 'Portland, OR',
    industry: 'Cafe',
    quote: "We were struggling with operations. Raff built us a beautiful website and a QR-based booking and menu system. The cafe runs itself on slow mornings now.",
    metric: '+55% weekday covers',
  },
  {
    name: 'Priya Achar',
    company: 'Flour & Fern Bakery',
    role: 'Co-founder',
    location: 'Asheville, NC',
    industry: 'Cafe',
    quote: "Pre-orders used to be a mess of DMs and sticky notes. Raff built us a simple ordering page and mornings are calm now. Loaves sell out before we open.",
    metric: '3x online orders',
  },
  {
    name: 'Aanya Verma',
    company: 'Still Water Yoga',
    role: 'Studio Owner',
    location: 'Brooklyn, NY',
    industry: 'Wellness Studio',
    quote: "I was spending nights chasing class signups and reminders. Raff built me a system that does it quietly in the background. I just teach now.",
    metric: '+70% retention',
  },
  {
    name: 'Esme Hartwell',
    company: 'North Loom Jewelry',
    role: 'Founder',
    location: 'Santa Fe, NM',
    industry: 'Handmade Goods',
    quote: "My old site felt like a craft fair table. Raff rebuilt it so it feels like the jewelry — quiet, considered, expensive. Sales nearly doubled in two months.",
    metric: '+90% online sales',
  },
]

const CARD_COUNT = TESTIMONIALS.length
const ANGLE_PER_CARD = 360 / CARD_COUNT

const StarRow = () => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

const CardFront = ({ t }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.08) 40%, rgba(236,72,153,0.10) 100%)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: `
      0 8px 32px rgba(139,92,246,0.15),
      0 0 0 1px rgba(255,255,255,0.05),
      inset 0 1px 0 rgba(255,255,255,0.1),
      inset 0 -1px 0 rgba(0,0,0,0.1)
    `,
  }}>
    {/* glass shimmer */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '45%',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
      borderRadius: '20px 20px 0 0',
      pointerEvents: 'none',
    }} />

    {/* avatar */}
    <div style={{
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(236,72,153,0.35))',
      border: '2px solid rgba(255,255,255,0.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.85rem',
      fontWeight: 700,
      color: '#fff',
      letterSpacing: '0.05em',
      marginBottom: '16px',
      boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
      position: 'relative',
      zIndex: 1,
    }}>
      {t.name.split(' ').map(n => n[0]).join('')}
    </div>

    {/* name */}
    <div style={{
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '1.05rem',
      color: '#fff',
      textAlign: 'center',
      lineHeight: 1.3,
      marginBottom: '4px',
      position: 'relative',
      zIndex: 1,
    }}>
      {t.name}
    </div>

    {/* role */}
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.65rem',
      color: 'rgba(255,255,255,0.55)',
      letterSpacing: '0.06em',
      textAlign: 'center',
      marginBottom: '12px',
      position: 'relative',
      zIndex: 1,
    }}>
      {t.role} · {t.location}
    </div>

    {/* company */}
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.68rem',
      color: 'rgba(196,181,253,0.9)',
      letterSpacing: '0.04em',
      textAlign: 'center',
      marginBottom: '16px',
      position: 'relative',
      zIndex: 1,
    }}>
      {t.company}
    </div>

    {/* stars */}
    <div style={{ marginBottom: '16px', position: 'relative', zIndex: 1 }}>
      <StarRow />
    </div>

    {/* industry pill */}
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.55rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'rgba(196,181,253,0.8)',
      background: 'rgba(139,92,246,0.12)',
      border: '1px solid rgba(139,92,246,0.2)',
      borderRadius: '100px',
      padding: '5px 14px',
      marginBottom: '20px',
      position: 'relative',
      zIndex: 1,
    }}>
      {t.industry}
    </div>

    {/* metric badge */}
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '1.1rem',
      fontWeight: 700,
      color: '#C8F400',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
      textShadow: '0 0 20px rgba(200,244,0,0.3)',
    }}>
      {t.metric}
    </div>

    {/* tap hint */}
    <div style={{
      position: 'absolute',
      bottom: '14px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.5rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.25)',
      zIndex: 1,
    }}>
      click to read
    </div>
  </div>
)

const CardBack = ({ t }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '28px 22px',
    background: 'linear-gradient(135deg, rgba(236,72,153,0.14) 0%, rgba(139,92,246,0.10) 50%, rgba(59,130,246,0.12) 100%)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: `
      0 8px 32px rgba(236,72,153,0.15),
      0 0 0 1px rgba(255,255,255,0.05),
      inset 0 1px 0 rgba(255,255,255,0.1),
      inset 0 -1px 0 rgba(0,0,0,0.1)
    `,
  }}>
    {/* glass shimmer */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '40%',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
      borderRadius: '20px 20px 0 0',
      pointerEvents: 'none',
    }} />

    {/* big quote mark */}
    <span style={{
      fontFamily: 'var(--font-display)',
      fontSize: '3rem',
      lineHeight: 1,
      color: 'rgba(236,72,153,0.4)',
      marginBottom: '8px',
      position: 'relative',
      zIndex: 1,
    }}>&ldquo;</span>

    {/* quote */}
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(0.78rem, 1.2vw, 0.88rem)',
      lineHeight: 1.75,
      color: 'rgba(255,255,255,0.9)',
      position: 'relative',
      zIndex: 1,
      flex: 1,
    }}>
      {t.quote}
    </p>

    {/* divider */}
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.3), rgba(139,92,246,0.3), transparent)',
      margin: '14px 0',
    }} />

    {/* bottom info */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 1,
    }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '0.78rem',
          color: '#fff',
        }}>
          {t.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.04em',
        }}>
          {t.company}
        </div>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: '#C8F400',
        textShadow: '0 0 16px rgba(200,244,0,0.3)',
      }}>
        {t.metric}
      </div>
    </div>

    {/* tap hint */}
    <div style={{
      position: 'absolute',
      bottom: '12px',
      left: 0,
      right: 0,
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.5rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.2)',
    }}>
      click to flip back
    </div>
  </div>
)

const TestimonialSection = () => {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const [flipped, setFlipped] = useState({})
  const cardInnerRefs = useRef([])
  const getRadius = () => typeof window !== 'undefined'
    ? (window.innerWidth < 640 ? 240 : window.innerWidth < 1024 ? 340 : 420)
    : 420
  const [radius, setRadius] = useState(getRadius)

  const handleFlip = useCallback((idx) => {
    const inner = cardInnerRefs.current[idx]
    if (!inner) return

    const isFlipped = flipped[idx]
    gsap.to(inner, {
      rotateY: isFlipped ? 0 : 180,
      duration: 0.7,
      ease: 'power2.inOut',
    })

    setFlipped(prev => ({ ...prev, [idx]: !prev[idx] }))
  }, [flipped])

  useEffect(() => {
    const section = sectionRef.current
    const carousel = carouselRef.current
    if (!section || !carousel) return

    const ctx = gsap.context(() => {
      gsap.set(carousel, { rotateY: 0 })

      gsap.to(carousel, {
        rotateY: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${CARD_COUNT * 600}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })
    }, section)

    const onResize = () => {
      setRadius(getRadius())
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0c0a14 50%, #0A0A0A 100%)',
      }}
    >
      {/* ambient glow blobs */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* heading */}
      <div style={{
        position: 'absolute',
        top: 'clamp(50px, 7vh, 90px)',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 20,
      }}>
        <p className="section-label" style={{ marginBottom: 'var(--space-3)' }}>
          {'// testimonials'}
        </p>
        <h2
          className="text-display"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            lineHeight: 1.08,
            color: 'var(--color-text-primary)',
          }}
        >
          What Our{' '}
          <span style={{
            color: 'var(--color-accent)',
            fontStyle: 'italic',
            fontFamily: 'var(--font-mono)',
          }}>
            Clients
          </span>{' '}
          Say
        </h2>
      </div>

      {/* 3D carousel */}
      <div style={{
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        perspective: '1200px',
        perspectiveOrigin: 'center center',
        width: '260px',
        height: '360px',
        zIndex: 10,
      }}>
        <div
          ref={carouselRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)',
          }}
        >
          {TESTIMONIALS.map((t, i) => {
            const angle = ANGLE_PER_CARD * i
            return (
              <div
                key={i}
                onClick={() => handleFlip(i)}
                style={{
                  position: 'absolute',
                  width: '240px',
                  height: '340px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-120px',
                  marginTop: '-170px',
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  cursor: 'pointer',
                }}
              >
                {/* inner flipper */}
                <div
                  ref={el => cardInnerRefs.current[i] = el}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'none',
                  }}
                >
                  <CardFront t={t} />
                  <CardBack t={t} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(20px, 4vh, 40px)',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 20,
      }}>
        <p className="text-mono" style={{
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
        }}>
          scroll to rotate · click to flip
        </p>
      </div>

      {/* background grid */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(var(--color-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity: 0.08,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        zIndex: 0,
      }} />

      <style>{`
        @media (max-width: 639px) {
          #testimonials [style*="perspective"] {
            perspective: 800px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default TestimonialSection
