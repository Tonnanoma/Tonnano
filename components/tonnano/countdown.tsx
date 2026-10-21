'use client'

import { DROP_DATE } from '@/lib/site'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Reveal } from './reveal'

function getMysteryValue(index: number) {
  const meaningful = [1, 8, 9, 12, 26, 98, 1000]
  const seed = Math.floor(Date.now() / 1000) + index * 17
  return meaningful[seed % meaningful.length] % 100
}

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return [Math.floor(diff / 86400000), Math.floor((diff / 3600000) % 24), Math.floor((diff / 60000) % 60), Math.floor((diff / 1000) % 60)]
}

export function Countdown() {
  const t = useTranslations('countdown')
  const [values, setValues] = useState<number[] | null>(null)
  const mystery = DROP_DATE === null

  useEffect(() => {
    const update = () => setValues(mystery ? [getMysteryValue(0), getMysteryValue(1), getMysteryValue(2), new Date().getSeconds()] : getRemaining(new Date(DROP_DATE).getTime()))
    update()
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [mystery])

  const units = [t('days'), t('hours'), t('minutes'), t('seconds')]
  return <section className="relative border-y border-border bg-secondary/40 py-24 sm:py-32" aria-labelledby="countdown-title">
    <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
      <Reveal>
        <span className="font-sans text-[0.65rem] tracking-luxury text-primary">DROP 01 — DATE UNREVEALED</span>
        <h2 id="countdown-title" className="mt-6 font-serif text-4xl text-foreground sm:text-5xl">The Code Reveals Itself In Time</h2>
        <p className="mt-3 text-sm text-muted-foreground">Some things are worth waiting for.</p>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-4 gap-3 sm:gap-6">
          {units.map((label, index) => <div key={label} className="flex flex-col items-center border border-border bg-background py-6 sm:py-9">
            <span className="font-serif text-3xl font-light tabular-nums text-foreground sm:text-6xl">{values ? String(values[index]).padStart(2, '0') : '??'}</span>
            <span className="mt-3 font-sans text-[0.55rem] tracking-wide-lux text-foreground/50 sm:text-[0.65rem]">{label}</span>
          </div>)}
        </div>
      </Reveal>
      <p className="sr-only">Drop 01 countdown; launch date is intentionally unrevealed.</p>
    </div>
  </section>
}
