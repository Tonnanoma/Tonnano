'use client'

import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/site'
import { EASE, usePrefersReducedMotion } from './animation'
import { WhitelistCtaButton } from './whitelist-cta-button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      initial={false}
      animate={scrolled ? { backdropFilter: 'blur(12px)' } : { backdropFilter: 'none' }}
      transition={{ duration: 0.45, ease: EASE as any }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a
          href="#top"
          className="font-sans text-sm font-medium tracking-luxury text-primary"
          aria-label="TONNANO home"
        >
          TONNANO
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-sans text-[0.7rem] tracking-wide-lux text-foreground/70 transition-colors hover:text-foreground"
              >
                {l.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        <WhitelistCtaButton className="hidden md:inline-block" />

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-foreground md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" strokeWidth={1.25} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.36, ease: EASE as any }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-sans text-sm font-medium tracking-luxury text-primary">TONNANO</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-8 px-8">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -12 }}
                  animate={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.36, ease: EASE as any }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="font-serif text-3xl text-foreground">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-8 pb-12">
              <WhitelistCtaButton
                variant="solid"
                className="block w-full"
                onNavigate={() => setOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
