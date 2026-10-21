'use client'

import { MYSTERY_LABELS, MYSTERY_LABEL_TRANSLATIONS, type MysteryLabel } from '@/config/mystery-labels'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Reveal } from './reveal'

const LOCALE_MAP: Record<string, string> = { en: 'en-US', fr: 'fr-FR', ar: 'ar', es: 'es-ES', de: 'de-DE', it: 'it-IT', pt: 'pt-PT', nl: 'nl-NL', tr: 'tr-TR', ru: 'ru-RU', zh: 'zh-CN', ja: 'ja-JP' }

function getLocale() {
  if (typeof navigator === 'undefined') return 'en-US'
  const language = navigator.language.toLowerCase().split('-')[0]
  return LOCALE_MAP[language] ?? 'en-US'
}

function formatLabel(label: MysteryLabel, locale: string) {
  const now = new Date()
  const language = locale.split('-')[0]
  if (label.kind === 'date') {
    const date = new Date(2026, label.key === 'dateOne' ? 10 : 11, label.key === 'dateOne' ? 12 : 12)
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
  }
  if (label.kind === 'time') {
    return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now)
  }
  return MYSTERY_LABEL_TRANSLATIONS[language]?.[label.key] ?? MYSTERY_LABEL_TRANSLATIONS.en[label.key]
}

function scramble(value: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return value.split('').map((character) => character === ' ' ? ' ' : alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
}

export function Countdown() {
  const [index, setIndex] = useState(0)
  const [locale, setLocale] = useState('en-US')
  const [display, setDisplay] = useState('—')
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeLabel = MYSTERY_LABELS[index]
  const label = useMemo(() => formatLabel(activeLabel, locale), [activeLabel, locale])

  useEffect(() => {
    setLocale(getLocale())
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    let frame = 0
    const decode = () => {
      frame += 1
      if (reducedMotion || frame > 8) {
        setDisplay(label)
        return
      }
      setDisplay(scramble(label))
      window.setTimeout(decode, 55)
    }
    decode()
    return () => { frame = 99 }
  }, [label, reducedMotion])

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => setIndex((current) => (current + 1) % MYSTERY_LABELS.length), 2500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused])

  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/35 py-24 sm:py-32" aria-label="Mystery countdown">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(243,107,33,0.12),transparent_42%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="font-sans text-[0.65rem] tracking-luxury text-primary">THE NEXT CHAPTER</span>
          <h2 className="mt-6 font-serif text-4xl text-foreground sm:text-5xl">Time Builds Legends</h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-foreground/55">Some moments are better felt before they are announced.</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div
            className="mystery-reveal mx-auto mt-14 flex min-h-36 min-w-[min(92vw,38rem)] items-center justify-center border border-primary/20 bg-background/70 px-5 py-8 shadow-[0_0_80px_rgba(243,107,33,0.08)] backdrop-blur-sm sm:min-h-48 sm:px-12"
            onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} tabIndex={0}
          >
            <span className={activeLabel.kind === 'now' ? 'mystery-now font-sans text-5xl font-medium tracking-[0.12em] text-primary sm:text-7xl' : 'font-sans text-5xl font-light tracking-[0.08em] text-foreground sm:text-7xl'} style={{ fontVariantNumeric: 'tabular-nums' }} aria-hidden="true">{display}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
