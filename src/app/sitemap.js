// app/sitemap.js
// ============================================================
// Next.js app-router native sitemap. Served at /sitemap.xml.
// Currently a single-page site — every meaningful destination
// is a hash anchor on the home page, listed with different
// priorities so crawlers understand structure.
// ============================================================

const SITE_URL = 'https://reachbyraff.com'

const sitemap = () => {
  const now = new Date()

  return [
    { url: SITE_URL,                 lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/#diagnosis`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/#how`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/#philosophy`,lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/#packages`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/#testimonials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/#faq`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/#cta`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]
}

export default sitemap
