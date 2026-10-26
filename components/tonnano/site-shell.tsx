'use client'

import { LocaleProvider } from './locale-provider'
import { Navbar } from './navbar'
import { Footer } from './footer'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <LocaleProvider><Navbar /><div className="min-h-screen">{children}</div><Footer /></LocaleProvider>
}
