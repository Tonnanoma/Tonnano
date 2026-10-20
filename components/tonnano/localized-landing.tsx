'use client'

import type { Locale, Messages } from '@/lib/i18n'
import { localeNames, locales } from '@/lib/i18n'
import { MysteryCountdown } from '@/components/sections/MysteryCountdown'
import { useState } from 'react'

const archiveImages = ['/hero.png', '/hero2.png', '/intro.png']

export function LocalizedLanding({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [languageOpen, setLanguageOpen] = useState(false)
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-background/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main navigation">
          <a href={`/${locale}`} className="font-sans text-sm font-medium tracking-luxury text-primary">TONNANO</a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#archive" className="text-[0.65rem] uppercase tracking-wide-lux text-foreground/65 hover:text-foreground">{messages.nav.archive}</a>
            <a href="#inner-code" className="text-[0.65rem] uppercase tracking-wide-lux text-foreground/65 hover:text-foreground">{messages.nav.innerCode}</a>
            <a href="#countdown" className="text-[0.65rem] uppercase tracking-wide-lux text-foreground/65 hover:text-foreground">{messages.nav.journal}</a>
            <a href="#whitelist" className="text-[0.65rem] uppercase tracking-wide-lux text-foreground/65 hover:text-foreground">{messages.nav.whitelist}</a>
            <LanguageMenu locale={locale} open={languageOpen} setOpen={setLanguageOpen} />
          </div>
          <a href="#whitelist" className="border border-primary px-4 py-3 text-[0.6rem] uppercase tracking-wide-lux text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{messages.nav.join}</a>
        </nav>
      </header>

      <main>
        <section className="relative flex min-h-[calc(100svh-1px)] items-end overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-28">
          <img src="/hero.png" alt="TONNANO editorial garment" className="absolute inset-0 size-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/10" />
          <div className="relative mx-auto w-full max-w-7xl">
            <p className="mb-6 text-[0.65rem] uppercase tracking-luxury text-primary">{messages.hero.eyebrow}</p>
            <h1 className="max-w-4xl font-serif text-6xl leading-[0.92] sm:text-8xl lg:text-[9rem]">{messages.hero.title}</h1>
            <p className="mt-8 max-w-lg text-base leading-8 text-foreground/65 sm:text-lg">{messages.hero.body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href="#whitelist" className="bg-primary px-6 py-4 text-[0.65rem] uppercase tracking-wide-lux text-primary-foreground transition-transform hover:-translate-y-1">{messages.hero.cta}</a>
              <span className="text-[0.6rem] uppercase tracking-wide-lux text-foreground/45">{messages.hero.note}</span>
            </div>
          </div>
        </section>

        <section id="archive" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
          <p className="text-[0.65rem] uppercase tracking-luxury text-primary">{messages.archive.eyebrow}</p>
          <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-tight sm:text-7xl">{messages.archive.title}</h2>
          <p className="mt-7 max-w-xl leading-8 text-foreground/55">{messages.archive.body}</p>
          <div className="mt-16 grid gap-4 md:grid-cols-3">{archiveImages.map((src, index) => <figure key={src} className={`overflow-hidden bg-secondary ${index === 1 ? 'md:translate-y-12' : ''}`}><img src={src} alt={`TONNANO archive ${index + 1}`} className="aspect-[3/4] size-full object-cover transition-transform duration-700 hover:scale-105" /></figure>)}</div>
        </section>

        <section id="inner-code" className="border-y border-border bg-secondary/40 px-5 py-28 sm:px-8 sm:py-40">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1fr] md:items-center md:gap-24">
            <div className="aspect-[4/5] overflow-hidden"><img src="/intro.png" alt="TONNANO craft detail" className="size-full object-cover" /></div>
            <div><p className="text-[0.65rem] uppercase tracking-luxury text-primary">{messages.philosophy.eyebrow}</p><h2 className="mt-5 font-serif text-5xl sm:text-7xl">{messages.philosophy.title}</h2><p className="mt-8 text-xl leading-9 text-foreground/80">{messages.philosophy.body}</p><p className="mt-6 leading-8 text-foreground/55">{messages.philosophy.detail}</p><p className="mt-10 text-[0.65rem] uppercase tracking-wide-lux text-primary">{messages.philosophy.quiet}</p></div>
          </div>
        </section>

        <MysteryCountdown messages={messages} />

        <section id="whitelist" className="border-b border-border px-5 py-28 text-center sm:px-8 sm:py-40">
          <p className="text-[0.65rem] uppercase tracking-luxury text-primary">{messages.whitelist.eyebrow}</p><h2 className="mx-auto mt-5 max-w-3xl font-serif text-5xl sm:text-7xl">{messages.whitelist.title}</h2><p className="mx-auto mt-7 max-w-lg leading-8 text-foreground/55">{messages.whitelist.body}</p><a href="mailto:code@tonnano.com?subject=Inner%20Code" className="mt-10 inline-block bg-primary px-7 py-4 text-[0.65rem] uppercase tracking-wide-lux text-primary-foreground">{messages.whitelist.cta}</a>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between"><div><div className="font-sans text-sm tracking-luxury text-primary">TONNANO</div><p className="mt-4 text-xs text-foreground/40">{messages.footer.copyright}</p></div><div className="flex items-center gap-8 text-[0.6rem] uppercase tracking-wide-lux text-foreground/45"><a href="#inner-code">{messages.footer.house}</a><a href="mailto:code@tonnano.com">{messages.footer.contact}</a><LanguageMenu locale={locale} open={languageOpen} setOpen={setLanguageOpen} /></div></footer>
    </div>
  )
}

function LanguageMenu({ locale, open, setOpen }: { locale: Locale; open: boolean; setOpen: (value: boolean) => void }) {
  return <div className="relative"><button type="button" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen(!open)} className="text-[0.6rem] uppercase tracking-wide-lux text-foreground/70">{locale}</button>{open && <div role="listbox" className="absolute bottom-full end-0 mb-3 grid min-w-36 gap-1 border border-border bg-background p-2 shadow-2xl md:top-full md:bottom-auto md:mt-3 md:mb-0">{locales.map((item) => <a role="option" aria-selected={item === locale} key={item} href={`/${item}`} className="px-3 py-2 text-start text-[0.62rem] uppercase tracking-wide-lux text-foreground/65 hover:bg-secondary hover:text-foreground">{localeNames[item]}</a>)}</div>}</div>
}
