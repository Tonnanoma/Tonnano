import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tonnano.com'),
  title: {
    default: 'TONNANO — Time Builds Legends',
    template: '%s · TONNANO',
  },
  description:
    'TONNANO. Luxury streetwear crafted in Morocco. Limited production, timeless design. Join the Inner Code ahead of Drop 01, August 2026.',
  keywords: [
    'TONNANO',
    'luxury streetwear',
    'old money',
    'made in Morocco',
    'limited edition',
    'Drop 01',
    'premium cotton',
  ],
  authors: [{ name: 'TONNANO' }],
  openGraph: {
    title: 'TONNANO — Time Builds Legends',
    description:
      'Luxury streetwear crafted in Morocco. Limited production, timeless design. Join the Inner Code.',
    url: 'https://tonnano.com',
    siteName: 'TONNANO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TONNANO — Time Builds Legends',
    description:
      'Luxury streetwear crafted in Morocco. Limited production, timeless design.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
