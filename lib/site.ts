import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://tonnano.vercel.app', lastModified: new Date() },
    { url: 'https://tonnano.vercel.app/en', lastModified: new Date() },
    { url: 'https://tonnano.vercel.app/fr', lastModified: new Date() },
    { url: 'https://tonnano.vercel.app/ar', lastModified: new Date() },
    { url: 'https://tonnano.vercel.app/es', lastModified: new Date() },
    { url: 'https://tonnano.vercel.app/hi', lastModified: new Date() },
    { url: 'https://tonnano.vercel.app/zh', lastModified: new Date() },
    { url: 'https://tonnano.vercel.app/nl', lastModified: new Date() },
    { url: 'https://tonnano.vercel.app/ru', lastModified: new Date() },
  ]
}
