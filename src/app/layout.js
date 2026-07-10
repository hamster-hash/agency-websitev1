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

export const metadata = {
  title: 'Re:ACH — Business Engineer',
  description: 'Not an agency. A business engineer who builds the systems, strategy, and identity your business actually needs.',
  icons: {
    icon: [
      { url: '/smile.webp', type: 'image/webp' },
    ],
    shortcut: '/smile.webp',
    apple: '/smile.webp',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${playfair.variable} ${plexMono.variable} ${dmSans.variable}`}>
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
