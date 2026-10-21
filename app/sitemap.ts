import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://tonnano.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }, { url: 'https://tonnano.com/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 }, { url: 'https://tonnano.com/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 }]
}
