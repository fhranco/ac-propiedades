export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/dashboard-my-properties/', '/dashboard-add-property/', '/dashboard-agents/', '/dashboard-profile/'],
    },
    sitemap: 'https://acpropiedadesmagallanes.cl/sitemap.xml',
  }
}
