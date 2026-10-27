'use client'

import { LocaleProvider } from './locale-provider'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { PageChrome } from './page-chrome'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <LocaleProvider><Navbar /><PageChrome /><div className="min-h-screen">{children}</div><Footer /></LocaleProvider>
}
