import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/simulator/show',
    },
    sitemap: 'https://cookierun.pokugi.com/sitemap.xml',
    host: 'https://cookierun.pokugi.com',
  };
}
