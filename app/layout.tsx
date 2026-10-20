import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TONNANO CODE — Time Builds Legends',
  description: 'Enter the TONNANO Code. Premium Moroccan streetwear. Limited drops. Inner Code access. Made in Morocco.',
  openGraph: { title: 'TONNANO CODE — Time Builds Legends', description: 'Premium Moroccan streetwear. Limited drops. Inner Code access.', type: 'website' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
