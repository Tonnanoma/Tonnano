import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tonnano.vercel.app'),
  title: 'TONNANO CODE — Time Builds Legends',
  description: 'Enter the TONNANO Code. Premium Moroccan streetwear. Limited drops. Inner Code access. Made in Morocco.',
  alternates: { languages: { en: '/en', fr: '/fr', ar: '/ar', es: '/es', de: '/de', it: '/it', pt: '/pt', nl: '/nl', tr: '/tr', zh: '/zh', ja: '/ja', ru: '/ru' } },
  openGraph: { title: 'TONNANO CODE — Time Builds Legends', description: 'Premium Moroccan streetwear. Limited drops. Inner Code access.', type: 'website', url: 'https://tonnano.vercel.app' },
  twitter: { card: 'summary_large_image', title: 'TONNANO CODE — Time Builds Legends', description: 'Premium Moroccan streetwear. Limited drops. Inner Code access.' },
}


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
