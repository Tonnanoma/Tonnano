'use client'

import { useEffect, useState } from 'react'
import { Reveal } from './reveal'
import { WhitelistCtaButton } from './whitelist-cta-button'

const SIGNALS = ['TOMORROW', '12:10:00', 'NEXT MONTH', '12/11/2026', 'SOON', 'NOW', 'DEMAIN', 'DROP 01', 'INNER CODE ACCESS', 'WHITELIST ONLY']

export function Countdown() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setIndex((value) => (value + 1) % SIGNALS.length), 4200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden border-y border-border bg-[#0b0b0b] py-28 sm:py-40">
      <div className="grain absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="font-sans text-[0.62rem] tracking-[0.35em] text-primary">THE NEXT CHAPTER</span>
          <h2 className="mt-6 font-serif text-4xl font-light text-foreground sm:text-6xl">THE FIRST DROP APPROACHES</h2>
          <p className="mx-auto mt-5 max-w-md font-sans text-sm text-muted-foreground">No date. No announcement. Only access.</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative mx-auto mt-16 flex min-h-28 items-center justify-center border-y border-border py-8 sm:min-h-40">
            <div key={SIGNALS[index]} className="chapter-signal font-serif text-4xl font-light tracking-[0.12em] text-foreground sm:text-7xl">
              {SIGNALS[index]}
            </div>
          </div>
          <p className="mt-6 font-sans text-[0.6rem] tracking-[0.28em] text-muted-foreground">DROP 01 — WHITELIST ONLY</p>
          <div className="mt-9"><WhitelistCtaButton variant="solid" /></div>
        </Reveal>
      </div>
    </section>
  )
}
