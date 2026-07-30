// app/layout.jsx
// ============================================================
// ROOT LAYOUT
// Wraps every page. Add global UI here:
//   - Grain overlay (texture effect)
//   - Custom cursor
//   - Navbar (when you build it)
//   - Footer (when you build it)
//
// TO ADD A NAV: import Navbar and place it above {children}
// TO REMOVE GRAIN: delete <GrainOverlay />
// ============================================================

import '@/app/globals.css'
import { Playfair_Display, IBM_Plex_Mono, DM_Sans } from 'next/font/google'
import GrainOverlay from '@/components/ui/GrainOverlay'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar       from '@/components/ui/Navbar'
import { FAQS }     from '@/lib/faqs'

const SITE_URL = 'https://reachbyraff.com'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

// ============================================================
// SEO METADATA — every field is deliberate. Change with care.
//  - `title.template` gives us "Page name — Re:ACH" on inner pages
//  - `metadataBase` makes OG/Twitter absolute URLs resolve correctly
//  - `keywords` are hints only (Google mostly ignores) — the real
//    SEO work is done via the FAQ copy + JSON-LD below
// ============================================================
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Re:ACH · an agency only for business owners',
    template: '%s · Re:ACH',
  },
  description:
    'Re:ACH is an agency exclusively for business owners. We install the strategy, automation, and visibility systems that let owners run ON the business, not IN it. One client per city, per industry.',
  applicationName: 'Re:ACH',
  authors: [{ name: 'Raff', url: SITE_URL }],
  creator: 'Raff',
  publisher: 'Re:ACH',
  keywords: [
    'business engineer',
    'business systemisation',
    'small business automation',
    'business automation for coaches',
    'business automation for consultants',
    'restaurant automation',
    'café website design',
    'missed call text back system',
    'GoHighLevel setup',
    'n8n automation',
    'lead generation for coaches',
    'business transformation',
    '3 phase business transformation',
    'chaos killer engine',
    'business systems for small business',
  ],
  category: 'Business Services',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Re:ACH',
    title: 'Re:ACH · an agency only for business owners',
    description:
      'The transformation every business deserves, and needs. Systems, strategy, and visibility for owners who want to work ON the business, not IN it.',
    locale: 'en_US',
    images: [
      {
        url: '/smile.webp',
        width: 1200,
        height: 630,
        alt: 'Re:ACH — Business Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Re:ACH · an agency only for business owners',
    description:
      'Systems, strategy, and visibility for owners who want to run ON the business, not IN it. One client per city, per industry.',
    images: ['/smile.webp'],
    creator: '@raff_senseii',
  },
  icons: {
    // We serve a pre-trimmed 512×512 copy (generated from
    // transparenticon.png with sharp) so the glyph actually
    // fills the browser tab instead of floating in a padded box.
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: 'any' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
}

// ============================================================
// JSON-LD structured data
// Three schemas emitted in <head>:
//   1. Organization — brand identity for Knowledge Panel
//   2. Service      — the offering (business systemisation)
//   3. FAQPage      — sourced from lib/faqs.js so it never drifts
// Rendered via dangerouslySetInnerHTML — this is the standard
// and only reliable way to inject ld+json in Next 15.
// ============================================================
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Re:ACH',
  alternateName: 'Re:ACH by Raff',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    'An agency exclusively for business owners. Strategy, automation, and visibility systems that let owners work ON the business, not IN it.',
  founder: { '@type': 'Person', name: 'Raff' },
  sameAs: ['https://www.instagram.com/reach_byraff/', 'https://www.youtube.com/@sensei_raff'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'raff@reachbyraff.com',
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
  ],
}

const jsonLdService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Business systemisation and automation',
  provider: { '@type': 'Organization', name: 'Re:ACH', url: SITE_URL },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'Canada' },
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '2500',
    highPrice: '6000',
    offerCount: '4',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Re:ACH transformation phases',
    itemListElement: [
      { '@type': 'Offer', name: 'Phase 1 — Authority & Strategy', description: 'Positioning, brand, and converting landing page.' },
      { '@type': 'Offer', name: 'Phase 2 — Chaos-Killer Engine', description: 'Automation, CRM, missed-call text-back, and booking flows.' },
      { '@type': 'Offer', name: 'Phase 3 — Visibility Architecture', description: 'Content pillars, on-page SEO, and lead-gen infrastructure.' },
      { '@type': 'Offer', name: 'Growth Diagnostic', description: 'End-to-end audit + prioritised 30-day fix roadmap.' },
    ],
  },
}

const jsonLdFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${playfair.variable} ${plexMono.variable} ${dmSans.variable}`}>
      <head>
        {/* Structured data — see the schema definitions above */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
      </head>
      <body>
        {/* Grain film texture over entire site — subtle but makes it feel premium */}
        <GrainOverlay />

        {/* Custom cursor — hidden on mobile automatically via CSS */}
        <CustomCursor />

        {/* Fixed top navigation */}
        <Navbar />

        {/* Page content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="site-footer">
          <span className="site-footer-brand">Re<span>:</span>ACH</span>
          <span className="site-footer-by">by<span>raff</span></span>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
