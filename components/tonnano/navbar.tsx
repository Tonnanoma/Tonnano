'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { WhitelistCtaButton } from './whitelist-cta-button'
import { SocialLinks } from './social-links'
import { useLocale } from './locale-provider'
import { localeNames, locales, type Locale } from '@/lib/i18n'
import { EASE, usePrefersReducedMotion } from './animation'

const navigation = [{ href: '/about', label: 'ABOUT' }, { href: '/membership', label: 'MEMBERSHIP' }]
const collections = [
  { href: '/collection/inner-code', label: 'INNER CODE', count: '12 PIECES', image: '/images/bilzerian-bjorn.png' },
  { href: '/collection/bilzerian', label: 'BILZERIAN', count: '10 PIECES', image: '/images/bilzerian-hero.png' },
]
const flagLabels: Record<Locale, string> = { en: 'EN', fr: 'FR', ar: 'AR', es: 'ES', de: 'DE', it: 'IT', pt: 'PT', nl: 'NL', tr: 'TR', zh: '中', ja: '日', ru: 'RU' }

function Flag({ locale, className = 'size-5' }: { locale: Locale; className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 60 40"><use href={`/flags.svg#${locale}`} /></svg>
}

function LanguagePicker({ sheet = false }: { sheet?: boolean }) {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (event: MouseEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false) }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close); document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', escape) }
  }, [open])
  const choose = (value: Locale) => { setLocale(value); setOpen(false) }
  return <div ref={ref} className={sheet ? 'relative w-full' : 'relative'} onMouseEnter={() => !sheet && setOpen(true)}>
    <button type="button" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((value) => !value)} className={sheet ? 'flex w-full items-center justify-between border border-white/20 bg-black px-4 py-3 text-xs tracking-wide-lux' : 'flex min-h-11 items-center gap-2 px-2 text-[0.65rem] tracking-wide-lux text-foreground'}>
      <span className="flex items-center gap-2"><Flag locale={locale} className="size-5" /><span>{flagLabels[locale]}</span></span>{open ? <ChevronUp data-icon="inline-end" /> : <ChevronDown data-icon="inline-end" />}
    </button>
    <AnimatePresence>{open && <motion.div role="listbox" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .18 }} className={sheet ? 'absolute bottom-full left-0 right-0 mb-2 grid grid-cols-4 gap-1 border border-white/20 bg-black p-2' : 'absolute right-0 top-full z-50 grid w-[420px] grid-cols-4 gap-px border border-white/20 bg-black p-2 shadow-2xl'}>
      {locales.map((value) => <button key={value} type="button" role="option" aria-selected={locale === value} onClick={() => choose(value)} className={`flex min-h-20 flex-col items-center justify-center gap-2 border border-white/10 px-2 text-center text-[0.6rem] transition-colors hover:bg-white/10 ${locale === value ? 'text-primary' : 'text-white'}`}><Flag locale={value} className="h-6 w-9" /><span>{localeNames[value]}</span><span className="text-[0.55rem] tracking-wide-lux opacity-70">{flagLabels[value]}</span></button>)}
    </motion.div>}</AnimatePresence>
  </div>
}

function Socials() { return <SocialLinks className="gap-1" /> }

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = usePrefersReducedMotion()
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  const close = () => setOpen(false)
  return <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-black shadow-lg' : 'bg-black/80 lg:bg-transparent'}`}>
    <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 lg:h-20">
      <button type="button" onClick={() => setOpen(true)} className="flex min-h-12 items-center gap-2 text-[0.65rem] tracking-wide-lux lg:hidden"><span className="relative block w-5"><span className="absolute left-0 top-[-5px] h-px w-5 bg-current" /><span className="absolute left-0 top-[5px] h-px w-5 bg-current" /></span><span>MENU</span></button>
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-sm tracking-luxury text-primary">TONNANO</Link>
      <div className="hidden items-center gap-7 lg:flex"><div className="group relative"><button type="button" className="text-[0.65rem] tracking-wide-lux text-foreground/80">COLLECTION <ChevronDown className="inline size-3" /></button><div className="invisible absolute left-0 top-full grid w-52 gap-1 border border-white/20 bg-black p-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">{collections.map((item) => <Link key={item.href} href={item.href} className="px-3 py-3 text-[0.65rem] tracking-wide-lux hover:bg-white/10">{item.label}</Link>)}</div></div>{navigation.map((link) => <Link key={link.href} href={link.href} className="text-[0.65rem] tracking-wide-lux text-foreground/80 hover:text-primary">{link.label}</Link>)}<LanguagePicker /><Socials /><WhitelistCtaButton className="ml-1" /></div>
      <div className="lg:hidden"><LanguagePicker /></div>
    </nav>
    <AnimatePresence>{open && <motion.div className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col overflow-y-auto bg-[#080808] px-5 py-4" initial={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: reduced ? 0 : .45, ease: EASE as any }}>
      <div className="pointer-events-none absolute inset-0 opacity-[.04]" style={{ backgroundImage: 'url(/icon.svg)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '50%' }} />
      <div className="relative flex h-12 items-center justify-between"><span className="text-[0.65rem] tracking-wide-lux text-primary">TONNANO / MENU</span><button type="button" onClick={close} aria-label="Close menu" className="min-h-12 text-[0.65rem] tracking-wide-lux"><span className="mr-2">CLOSE</span><span className="text-lg">×</span></button></div>
      <div className="relative flex flex-1 flex-col justify-start gap-3 py-10 sm:justify-center"><Link href="/about" onClick={close} className="font-sans text-[clamp(40px,11vw,72px)] font-extrabold leading-[.95] tracking-[-.05em]">ABOUT</Link><div><button type="button" onClick={() => setCollectionsOpen((value) => !value)} className="flex items-center gap-3 font-sans text-[clamp(40px,11vw,72px)] font-extrabold leading-[.95] tracking-[-.05em]">COLLECTION {collectionsOpen ? <ChevronUp /> : <ChevronDown />}</button><AnimatePresence>{collectionsOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid max-w-2xl grid-cols-2 gap-2 overflow-hidden py-4">{collections.map((item) => <Link key={item.href} href={item.href} onClick={close} className="group relative min-h-24 overflow-hidden border border-white/20 p-3"><img src={item.image} alt="" className="absolute inset-0 size-full object-cover opacity-50 transition-opacity group-hover:opacity-80" /><span className="relative flex h-full flex-col justify-end text-xs tracking-wide-lux"><strong>{item.label}</strong><small>{item.count}</small></span></Link>)}</motion.div>}</AnimatePresence></div><Link href="/membership" onClick={close} className="font-sans text-[clamp(40px,11vw,72px)] font-extrabold leading-[.95] tracking-[-.05em]">MEMBERSHIP</Link></div>
      <div className="relative mt-auto flex flex-col gap-4 border-t border-white/20 pt-4"><LanguagePicker sheet /><WhitelistCtaButton onNavigate={close} className="h-14 w-full" /><div className="flex items-center justify-between"><Socials /><span className="text-[0.55rem] tracking-wide-lux text-white/60">© TONNANO 2026</span></div></div>
    </motion.div>}</AnimatePresence>
  </header>
}
