'use client'

import { ChevronDown, Globe, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { locales } from '@/i18n'
import { EASE, usePrefersReducedMotion } from './animation'
import { WhitelistCtaButton } from './whitelist-cta-button'

const nativeNames: Record<string, string> = { en: 'English', fr: 'Français', ar: 'العربية', nl: 'Nederlands', es: 'Español', de: 'Deutsch', it: 'Italiano', pt: 'Português', tr: 'Türkçe', ru: 'Русский', zh: '中文', ja: '日本語', ary: 'الدارجة' }
const links = [{ key: 'about', href: '#about' }, { key: 'drop', href: '#drop' }, { key: 'innerCode', href: '#inner-code' }, { key: 'collection', href: '#collection' }, { key: 'whitelist', href: '#whitelist' }] as const

export function Navbar() {
  const locale = useLocale()
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const prefersReduced = usePrefersReducedMotion()
  const languageRef = useRef<HTMLDivElement>(null)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  useEffect(() => { const close = (event: MouseEvent) => { if (!languageRef.current?.contains(event.target as Node)) setLanguageOpen(false) }; document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close) }, [])
  function switchLanguage(next: string) { document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`; const url = new URL(window.location.href); const parts = url.pathname.split('/'); parts[1] = next; url.pathname = parts.join('/'); window.location.assign(url.toString()) }
  return <motion.header className="fixed inset-x-0 top-0 z-50 transition-all duration-500" initial={false} animate={scrolled ? { backdropFilter: 'blur(12px)' } : { backdropFilter: 'none'}} transition={{ duration: 0.45, ease: EASE as any }}>
    <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
      <a href="#top" className="font-sans text-sm font-medium tracking-luxury text-primary" aria-label={t('home')}>TONNANO</a>
      <ul className="hidden items-center gap-9 md:flex">{links.map((link) => <li key={link.href}><a href={link.href} className="font-sans text-[0.7rem] tracking-wide-lux text-foreground/70 transition-colors hover:text-foreground">{t(link.key).toUpperCase()}</a></li>)}</ul>
      <div className="hidden items-center gap-5 md:flex"><div ref={languageRef} className="relative"><button type="button" className="inline-flex items-center gap-2 font-sans text-[0.65rem] tracking-wide-lux text-foreground/80 focus-visible:outline-2 focus-visible:outline-primary" aria-haspopup="menu" aria-expanded={languageOpen} onClick={() => setLanguageOpen(!languageOpen)}><Globe aria-hidden className="size-3.5" />{locale.toUpperCase()}<ChevronDown aria-hidden className={cn('size-3 transition-transform', languageOpen && 'rotate-180')} /></button><AnimatePresence>{languageOpen && <motion.div role="menu" initial={{opacity:0,y:-5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} className="absolute end-0 top-8 grid w-72 grid-cols-2 gap-px border border-primary/30 bg-background/95 p-2 shadow-2xl backdrop-blur-xl">{locales.map((item) => <button key={item} role="menuitem" lang={item} type="button" onClick={() => switchLanguage(item)} className="flex items-center gap-2 px-3 py-3 text-start font-sans text-xs text-foreground/75 transition-colors hover:bg-primary/10 hover:text-foreground"> <span className={cn('size-1.5 rounded-full', item === locale ? 'bg-primary' : 'bg-transparent')} />{nativeNames[item]}</button>)}</motion.div>}</AnimatePresence></div><WhitelistCtaButton /></div>
      <button type="button" onClick={() => setOpen(true)} className="text-foreground md:hidden" aria-label={t('openMenu')}><Menu className="size-6" strokeWidth={1.25} /></button>
    </nav>
    <AnimatePresence>{open && <motion.div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden" initial={prefersReduced ? {opacity:1}:{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={prefersReduced ? {opacity:1}:{opacity:0,y:-8}} transition={{duration:.36,ease:EASE as any}}><div className="flex h-16 items-center justify-between px-5"><span className="font-sans text-sm font-medium tracking-luxury text-primary">TONNANO</span><button type="button" onClick={() => setOpen(false)} aria-label={t('closeMenu')}><X className="size-6" strokeWidth={1.25}/></button></div><ul className="flex flex-1 flex-col justify-center gap-8 px-8">{links.map((link) => <li key={link.href}><a href={link.href} onClick={() => setOpen(false)} className="font-serif text-3xl text-foreground">{t(link.key)}</a></li>)}<li><button type="button" className="flex w-full items-center justify-between border-b border-border py-4 text-start font-sans text-sm" onClick={() => setLanguageOpen(!languageOpen)}>{t('language')}<span>{locale.toUpperCase()}</span></button>{languageOpen && <div className="grid grid-cols-2 gap-2 pt-4">{locales.map((item) => <button key={item} lang={item} type="button" onClick={() => switchLanguage(item)} className="min-h-12 border border-border px-3 text-start text-sm">{nativeNames[item]}</button>)}</div>}</li></ul><div className="px-8 pb-12"><WhitelistCtaButton variant="solid" className="block w-full" onNavigate={() => setOpen(false)} /></div></motion.div>}</AnimatePresence>
  </motion.header>
}
