'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, X, ArrowUpRight } from 'lucide-react'
import { Wordmark } from './wordmark'
import { SocialLinks } from './social-links'
import { WhitelistCtaButton } from './whitelist-cta-button'
import { useLocale } from './locale-provider'
import { localeNames, locales, type Locale } from '@/lib/i18n'
import { INNER_CODE_PRODUCTS } from '@/data/collections'

const collectionLinks = [
  { href: '/collection/inner-code', label: 'INNER CODE', meta: '06 PIECES · CHAPTER 01', image: INNER_CODE_PRODUCTS[0]?.images[0] },
  { href: '/collection/bilzerian', label: 'BILZERIAN', meta: 'COLLECTION · CHAPTER 02', image: INNER_CODE_PRODUCTS[1]?.images[0] },
]

const flags: Record<Locale, string> = { en: '🇬🇧', fr: '🇫🇷', ar: '🇲🇦', es: '🇪🇸', de: '🇩🇪', it: '🇮🇹', pt: '🇵🇹', nl: '🇳🇱', tr: '🇹🇷', zh: '🇨🇳', ja: '🇯🇵', ru: '🇷🇺' }

function TextLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return <Link href={href} onClick={onClick} className="tn-roll-link"><span>{children}</span><span aria-hidden>{children}</span></Link>
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const languageRef = useRef<HTMLDivElement>(null)
  const collectionRef = useRef<HTMLDivElement>(null)
  const { locale, setLocale } = useLocale()

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
      setScrolled(window.scrollY > 24)
    }
    const onClick = (event: MouseEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) setLanguageOpen(false)
      if (!collectionRef.current?.contains(event.target as Node)) setCollectionOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick)
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('click', onClick) }
  }, [])

  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [menuOpen])
  const closeMenu = () => setMenuOpen(false)
  const changeLocale = (next: Locale) => { setLocale(next); setLanguageOpen(false); closeMenu() }

  return <header className={`tn-header ${scrolled ? 'tn-header-scrolled' : ''}`}>
    <div className="tn-progress" style={{ transform: `scaleX(${progress / 100})` }} />
    <nav className="tn-nav" aria-label="Primary navigation">
      <button className="tn-mobile-menu" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><span className="tn-menu-lines" /><span>MENU</span></button>
      <div className="tn-desktop-links">
        <TextLink href="/about">ABOUT</TextLink>
        <TextLink href="/drop">DROP 01</TextLink>
        <div ref={collectionRef} className="tn-nav-popover">
          <button className="tn-roll-link" aria-expanded={collectionOpen} onClick={(event) => { event.stopPropagation(); setCollectionOpen(!collectionOpen); setLanguageOpen(false) }}><span>COLLECTION <ChevronDown aria-hidden /></span><span aria-hidden>COLLECTION <ChevronDown /></span></button>
          {collectionOpen && <div className="tn-mega-menu">
            <div className="tn-mega-rows">{collectionLinks.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setCollectionOpen(false)} className="tn-mega-row"><span><strong>{item.label}</strong><small>{item.meta}</small></span><ArrowUpRight /></Link>)}</div>
            <div className="tn-mega-image" style={{ backgroundImage: `url(${collectionLinks[0].image})` }} aria-label="TONNANO campaign" />
            <div className="tn-mega-footer"><Link href="/collections">VIEW ALL PIECES <ArrowUpRight /></Link><TextLink href="/membership">MEMBERSHIP</TextLink></div>
          </div>}
        </div>
        <TextLink href="/membership">MEMBERSHIP</TextLink>
      </div>
      <Link href="/" className="tn-logo" aria-label="TONNANO home"><Wordmark /></Link>
      <div className="tn-desktop-actions">
        <div ref={languageRef} className="tn-language"><button className="tn-language-trigger" aria-expanded={languageOpen} onClick={(event) => { event.stopPropagation(); setLanguageOpen(!languageOpen); setCollectionOpen(false) }}><span>{flags[locale]}</span><span>{locale.toUpperCase()}</span>{languageOpen ? <ChevronUp /> : <ChevronDown />}</button>{languageOpen && <div className="tn-language-panel">{locales.map((item) => <button key={item} className={item === locale ? 'active' : ''} onClick={() => changeLocale(item)}><span>{flags[item]}</span><span>{localeNames[item]}</span><small>{item.toUpperCase()}</small></button>)}</div>}</div>
        <Link href="/bag" className="tn-bag">BAG (0)</Link>
        <WhitelistCtaButton variant="solid" />
      </div>
      <div className="tn-mobile-actions"><button className="tn-flag-button" onClick={() => setLanguageOpen(!languageOpen)} aria-label="Change language">{flags[locale]}</button><Link href="/bag" className="tn-bag-icon" aria-label="Bag">0</Link></div>
    </nav>
    {languageOpen && <div className="tn-mobile-language">{locales.map((item) => <button key={item} className={item === locale ? 'active' : ''} onClick={() => changeLocale(item)}><span>{flags[item]}</span><small>{item.toUpperCase()}</small></button>)}</div>}
    {menuOpen && <div className="tn-mobile-overlay"><div className="tn-mobile-top"><Wordmark /><button onClick={closeMenu} aria-label="Close menu"><X /></button></div><div className="tn-mobile-links"><TextLink href="/about" onClick={closeMenu}>ABOUT</TextLink><TextLink href="/drop" onClick={closeMenu}>DROP 01</TextLink><TextLink href="/collection/inner-code" onClick={closeMenu}>INNER CODE</TextLink><TextLink href="/collection/bilzerian" onClick={closeMenu}>BILZERIAN</TextLink><TextLink href="/membership" onClick={closeMenu}>MEMBERSHIP</TextLink></div><div className="tn-mobile-bottom"><div className="tn-language-grid">{locales.map((item) => <button key={item} className={item === locale ? 'active' : ''} onClick={() => changeLocale(item)}><span>{flags[item]}</span>{item.toUpperCase()}</button>)}</div><WhitelistCtaButton variant="solid" onNavigate={closeMenu} /><SocialLinks /><small>© TONNANO · MADE IN MOROCCO</small></div></div>}
    <button className="tn-top-button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
  </header>
}
