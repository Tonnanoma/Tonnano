'use client'

import { LocaleProvider } from './locale-provider'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { BackToTop } from './back-to-top'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <div className="min-h-screen" id="main-content">{children}</div>
      <BackToTop />
      <Footer />
    </LocaleProvider>
  )
}
