'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Globe2, Menu, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { WhitelistCtaButton } from './whitelist-cta-button'
import { SocialLinks } from './social-links'
import { useLocale } from './locale-provider'
import { EASE, usePrefersReducedMotion } from './animation'

const links = [
  { href: '/about', label: 'ABOUT' },
  { href: '/drop-01', label: 'DROP 01' },
  { href: '/membership', label: 'INNER CODE' },
  { href: '/contact', label: 'CONTACT' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)
  const { locale, setLocale, localeNames } = useLocale()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setScrolled(current > 24)
      setHidden(current > 120 && current > lastScroll)
      setLastScroll(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScroll])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  const close = () => setOpen(false)

  const languageOptions = Object.entries(localeNames)
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-500 ${scrolled ? 'border-border bg-background/80 backdrop-blur-xl' : 'bg-transparent'} ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="h-px bg-primary/70" aria-hidden="true" />
      <nav className="mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="font-sans text-sm font-medium tracking-[0.35em] text-primary" aria-label="TONNANO home">TONNANO</Link>
        <div className="hidden items-center gap-7 lg:flex">
          <Link href="/about" className="nav-link">ABOUT</Link><Link href="/drop-01" className="nav-link">DROP 01</Link>
          <div className="group relative">
            <button type="button" className="nav-link inline-flex items-center gap-1" aria-expanded={collectionOpen} onClick={() => setCollectionOpen(!collectionOpen)} onMouseEnter={() => setCollectionOpen(true)}>
              COLLECTION <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
            </button>
            <div onMouseLeave={() => setCollectionOpen(false)} className={`absolute left-0 top-full w-52 border border-border bg-background/95 p-2 pt-4 shadow-2xl backdrop-blur-xl transition-all duration-300 ${collectionOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
              <Link href="/collections/inner-code" className="menu-link">01 / INNER CODE</Link><Link href="/collections/bilzerian" className="menu-link">02 / BILZERIAN</Link>
            </div>
          </div>
          <Link href="/membership" className="nav-link">INNER CODE</Link><Link href="/contact" className="nav-link">CONTACT</Link>
        </div>
        <div className="hidden items-center justify-end gap-5 lg:flex">
          <label className="sr-only" htmlFor="language-select">Language</label><div className="flex items-center gap-1"><Globe2 className="size-3 text-foreground/50" /><select id="language-select" value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)} className="max-w-24 bg-transparent text-[0.62rem] tracking-[0.18em] outline-none"><option value="en">EN</option>{languageOptions.filter(([value]) => value !== 'en').map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
          <Link href="/cart" className="relative text-foreground/70 transition hover:text-primary" aria-label="Cart"><ShoppingBag className="size-4" strokeWidth={1.2} /><span className="absolute -right-2 -top-2 grid size-3 place-items-center rounded-full bg-primary text-[8px] text-primary-foreground">0</span></Link><WhitelistCtaButton />
        </div>
        <button type="button" onClick={() => setOpen(true)} className="grid size-12 place-items-center lg:hidden" aria-label="Open menu"><Menu className="size-6" strokeWidth={1.1} /></button>
      </nav>
      <div className="hidden h-px bg-primary/70 lg:block" aria-hidden="true" />
      <AnimatePresence>{open && <motion.div className="fixed inset-0 flex min-h-screen flex-col bg-background px-6 py-5 lg:hidden" initial={reduced ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4, ease: EASE as any }}>
        <div className="flex items-center justify-between"><Link href="/" onClick={close} className="text-sm tracking-[0.35em] text-primary">TONNANO</Link><button type="button" onClick={close} className="grid size-12 place-items-center" aria-label="Close menu"><X className="size-6" strokeWidth={1.1} /></button></div>
        <div className="flex flex-1 flex-col justify-center gap-4">{links.map((link, index) => <motion.div key={link.href} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}><Link href={link.href} onClick={close} className="font-serif text-[clamp(2.8rem,13vw,5rem)] leading-none">{link.label}</Link></motion.div>)}<div className="pt-4"><button type="button" onClick={() => setCollectionOpen(!collectionOpen)} className="flex items-center gap-2 font-serif text-4xl">COLLECTION <ChevronDown className={`size-5 transition-transform ${collectionOpen ? 'rotate-180' : ''}`} /></button>{collectionOpen && <div className="mt-4 flex gap-5 pl-1 text-[0.65rem] tracking-[0.2em]"><Link href="/collections/inner-code" onClick={close}>INNER CODE</Link><Link href="/collections/bilzerian" onClick={close}>BILZERIAN</Link></div>}</div><WhitelistCtaButton onNavigate={close} className="mt-6 w-fit" /></div>
        <div className="flex items-center justify-between border-t border-border pt-5"><div className="flex items-center gap-2"><Globe2 className="size-3" /><select value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)} className="bg-transparent text-xs outline-none"><option value="en">English</option>{languageOptions.filter(([value]) => value !== 'en').map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><SocialLinks /></div>
      </motion.div>}</AnimatePresence>
    </header>
  )
}
