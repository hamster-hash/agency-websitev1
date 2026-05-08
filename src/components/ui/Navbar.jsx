// components/ui/Navbar.jsx
// ============================================================
// NAVBAR
// Fixed top bar. Anchor links use native smooth scroll
// (html { scroll-behavior: smooth } in globals.css).
// Section targets use scroll-margin-top: var(--nav-height).
// ============================================================

const LINKS = [
  { href: '#diagnosis',  label: 'Diagnosis'  },
  { href: '#how',        label: 'How'        },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#packages',   label: 'Packages'   },
]

const Navbar = () => {
  return (
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

      <a href="#cta" className="btn-primary navbar-cta">
        → Book a call
      </a>
    </nav>
  )
}

export default Navbar
