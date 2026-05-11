'use client'

import { useState } from 'react'

const LINKS = [
  { href: '#diagnosis',    label: 'Diagnosis'    },
  { href: '#how',          label: 'How'          },
  { href: '#philosophy',   label: 'Philosophy'   },
  { href: '#packages',     label: 'Packages'     },
  { href: '#testimonials', label: 'Testimonials' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="navbar" aria-label="Primary">
        <a href="#hero" className="navbar-brand">
          Re<span>:</span>ACH
        </a>

        <ul className="navbar-links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <a href="https://calendly.com/reachbyraff" target="_blank" rel="noopener noreferrer" className="btn-primary navbar-cta">
          → Book a call
        </a>

        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      <div className={`navbar-mobile-menu${mobileOpen ? ' is-open' : ''}`}>
        {LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => setMobileOpen(false)}>
            {label}
          </a>
        ))}
        <a href="https://calendly.com/reachbyraff" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} style={{ color: 'var(--color-accent)' }}>
          → Book a call
        </a>
      </div>
    </>
  )
}

export default Navbar
