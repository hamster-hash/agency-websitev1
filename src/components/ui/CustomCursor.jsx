'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor-expand], .package-card, .diagnosis-card'

const CustomCursor = () => {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e
      gsap.set(dot, { x, y })
      gsap.to(ring, {
        x, y,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // Event delegation — works for dynamically rendered elements
    const onMouseOver = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        ring.classList.add('is-hovering')
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        ring.classList.remove('is-hovering')
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
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