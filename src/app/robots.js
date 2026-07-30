// app/robots.js
// ============================================================
// Next.js app-router native robots.txt. Served at /robots.txt.
// Allow everything, point crawlers at the sitemap.
// ============================================================

const SITE_URL = 'https://reachbyraff.com'

const robots = () => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/.tmp/'],
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
})

export default robots
