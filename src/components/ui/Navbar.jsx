'use client'

import { useState } from 'react'
import Image from 'next/image'

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
        <a href="#hero" className="navbar-brand" aria-label="Re:ACH home">
          <Image
            src="/transparent.png"
            alt="Re:ACH"
            width={2000}
            height={1055}
            priority
            sizes="(max-width: 768px) 140px, 200px"
            className="navbar-logo"
          />
          <span className="navbar-brand-tag">an agency only for business owners</span>
        </a>

        <ul className="navbar-links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <a
          href="https://calendly.com/reachbyraff"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-cta"
        >
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
        <a
          href="https://calendly.com/reachbyraff"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="navbar-mobile-cta"
        >
          → Book a call
        </a>
      </div>
    </>
  )
}

export default Navbar
