'use client'
// components/ui/CustomCursor.jsx
// ============================================================
// CUSTOM CURSOR
// Two-part cursor: small dot (snappy) + larger ring (smooth follow).
// Ring expands when hovering links, buttons, cards.
//
// TO DISABLE: remove from layout.jsx and set body { cursor: auto }
// TO CHANGE HOVER TARGETS: edit the querySelectorAll selector below
// TO RESTYLE: edit .cursor-dot and .cursor-ring in globals.css
// ============================================================

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CustomCursor = () => {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // --- Track mouse position ---
    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e

      // Dot snaps instantly
      gsap.set(dot, { x, y })

      // Ring follows with a slight lag (feels natural)
      gsap.to(ring, {
        x, y,
        duration: 0.35,          // ← increase for more lag, decrease for snappier
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // --- Expand ring on interactive elements ---
    // Add any selector you want to trigger the expand effect
    const interactiveEls = document.querySelectorAll(
      'a, button, [data-cursor-expand], .package-card, .diagnosis-card'
    )

    const onEnter = () => ring.classList.add('is-hovering')
    const onLeave = () => ring.classList.remove('is-hovering')

    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMouseMove)

    // --- Cleanup on unmount ---
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

export default CustomCursor