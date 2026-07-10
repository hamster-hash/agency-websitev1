'use client'
// components/ui/CursorGradient.jsx
// ============================================================
// CURSOR-FOLLOWING GRADIENT ORB
// Mount inside a section that has `position: relative` and
// `overflow: hidden`. A blurred coloured orb tracks the mouse
// with smooth lerp easing. Pointer-events: none, so it never
// blocks interactions.
//
// Uses refs + requestAnimationFrame (no React state on
// mousemove) so it stays performant on long sections.
//
// PROPS:
//   color   — any CSS colour for the orb
//   size    — orb diameter in px (default 800)
//   opacity — 0–1, base opacity (default 0.28)
//   blur    — blur radius in px (default 90)
//   blend   — CSS mix-blend-mode (default 'screen')
// ============================================================

import { useEffect, useRef } from 'react'

const CursorGradient = ({
  color,
  size    = 800,
  opacity = 0.28,
  blur    = 90,
  blend   = 'screen',
}) => {
  const orbRef = useRef(null)

  useEffect(() => {
    // Skip on touch devices — no cursor to track, no need to attach listeners.
    // The orb stays centred via its base CSS (top/left 50% + negative margins).
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover)').matches) return

    const orb = orbRef.current
    if (!orb) return
    const section = orb.parentElement
    if (!section) return

    // Orb is CSS-centred; the JS transform is the OFFSET from centre.
    const target  = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let raf = null

    const animate = () => {
      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12
      orb.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`

      if (Math.abs(target.x - current.x) > 0.3 || Math.abs(target.y - current.y) > 0.3) {
        raf = requestAnimationFrame(animate)
      } else {
        raf = null
      }
    }

    const onMove = (e) => {
      const r = section.getBoundingClientRect()
      target.x = (e.clientX - r.left) - r.width  / 2
      target.y = (e.clientY - r.top)  - r.height / 2
      if (!raf) raf = requestAnimationFrame(animate)
    }

    section.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      section.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [size])

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width:  size,
        height: size,
        marginTop:  -size / 2,
        marginLeft: -size / 2,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`,
        pointerEvents: 'none',
        mixBlendMode: blend,
        willChange: 'transform',
        zIndex: 0,
      }}
    />
  )
}

export default CursorGradient
