'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { WhitelistCtaButton } from './whitelist-cta-button'
import { SocialLinks } from './social-links'
import { useLocale } from './locale-provider'
import { EASE, usePrefersReducedMotion } from './animation'

const links = [{ href: '/about', label: 'ABOUT' }, { href: '/membership', label: 'MEMBERSHIP' }]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, localeNames } = useLocale()
  const reduced = usePrefersReducedMotion()
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 32); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  const close = () => setOpen(false)
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/85 shadow-sm backdrop-blur-xl' : 'bg-transparent'}`}>
    <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8"><Link href="/" className="font-sans text-sm tracking-luxury text-primary">TONNANO</Link><div className="hidden items-center gap-7 md:flex"><div className="group relative"><button className="text-[0.65rem] tracking-wide-lux text-foreground/70 hover:text-foreground">COLLECTION⌄</button><div className="invisible absolute left-0 top-full w-44 border border-border bg-background/95 p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100"><Link href="/collection/inner-code" className="block px-3 py-3 text-[0.65rem] tracking-wide-lux hover:bg-secondary">INNER CODE</Link><Link href="/collection/bilzerian" className="block px-3 py-3 text-[0.65rem] tracking-wide-lux hover:bg-secondary">BILZERIAN</Link></div></div>{links.map((link) => <Link key={link.href} href={link.href} className="text-[0.65rem] tracking-wide-lux text-foreground/70 hover:text-foreground">{link.label}</Link>)}<label className="sr-only" htmlFor="language-select">Language</label><select id="language-select" value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)} className="max-w-24 bg-transparent text-[0.65rem] tracking-wide-lux outline-none">{Object.entries(localeNames).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><SocialLinks /><WhitelistCtaButton className="ml-1" /></div><button type="button" onClick={() => setOpen(true)} className="min-h-11 min-w-11 md:hidden" aria-label="Open menu"><Menu className="mx-auto h-6 w-6" strokeWidth={1.2} /></button></nav>
    <AnimatePresence>{open && <motion.div className="fixed inset-0 z-50 flex min-h-screen flex-col overflow-y-auto bg-background px-7 py-5 md:hidden" initial={reduced ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55, ease: EASE as any }}><div className="flex items-center justify-between"><Link href="/" onClick={close} className="text-sm tracking-luxury text-primary">TONNANO</Link><button type="button" onClick={close} aria-label="Close menu" className="min-h-11 min-w-11"><X className="mx-auto h-6 w-6" strokeWidth={1.2} /></button></div><div className="flex flex-1 flex-col justify-center gap-5 py-10">{links.map((link, index) => <motion.div key={link.href} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06, duration: .5 }}><Link href={link.href} onClick={close} className="font-serif text-5xl">{link.label}</Link></motion.div>)}<div><p className="mb-3 text-[0.65rem] tracking-luxury text-primary">COLLECTION</p><div className="flex gap-4"><Link href="/collection/inner-code" onClick={close} className="text-sm">INNER CODE</Link><Link href="/collection/bilzerian" onClick={close} className="text-sm">BILZERIAN</Link></div></div><WhitelistCtaButton onNavigate={close} /></div><div className="flex items-center justify-between border-t border-border pt-5"><select value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)} className="bg-transparent text-xs outline-none">{Object.entries(localeNames).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><SocialLinks /></div></motion.div>}</AnimatePresence>
  </header>
}
