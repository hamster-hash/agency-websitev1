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
import GrainOverlay from '@/components/ui/GrainOverlay'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar       from '@/components/ui/Navbar'

export const metadata = {
  title: 'Anti-Chaos | Business Engineer',  // ← change your agency name here
  description: 'Not an agency. A business engineer who builds the systems, strategy, and identity your business actually needs.',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
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