'use client'

import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
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

        <a
          href="#whitelist"
          className="hidden border border-primary/60 px-5 py-2.5 font-sans text-[0.65rem] tracking-wide-lux text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-block"
        >
          JOIN THE WHITELIST
        </a>

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-sans text-sm font-medium tracking-luxury text-primary">
                TONNANO
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-8 px-8">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-3xl text-foreground"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-8 pb-12">
              <a
                href="#whitelist"
                onClick={() => setOpen(false)}
                className="block border border-primary bg-primary py-4 text-center font-sans text-xs tracking-wide-lux text-primary-foreground"
              >
                JOIN THE WHITELIST
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
