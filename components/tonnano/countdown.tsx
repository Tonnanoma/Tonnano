'use client'

import { DROP_DATE } from '@/lib/site'
import { useEffect, useState } from 'react'
import { Reveal } from './reveal'

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const target = new Date(DROP_DATE).getTime()
  const [time, setTime] = useState<ReturnType<typeof getRemaining> | null>(null)

  useEffect(() => {
    setTime(getRemaining(target))
    const id = setInterval(() => setTime(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units: [string, number | undefined][] = [
    ['Days', time?.days],
    ['Hours', time?.hours],
    ['Minutes', time?.minutes],
    ['Seconds', time?.seconds],
  ]

  return (
    <section className="relative border-y border-border bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="font-sans text-[0.65rem] tracking-luxury text-primary">
            DROP 01 — AUGUST 2026
          </span>
          <h2 className="mt-6 font-serif text-4xl text-foreground sm:text-5xl">
            The Countdown Has Begun
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-4 gap-3 sm:gap-6">
            {units.map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col items-center border border-border bg-background py-6 sm:py-9"
              >
                <span className="font-sans text-3xl font-light tabular-nums text-foreground sm:text-6xl">
                  {value === undefined
                    ? '--'
                    : String(value).padStart(2, '0')}
                </span>
                <span className="mt-3 font-sans text-[0.55rem] tracking-wide-lux text-foreground/50 sm:text-[0.65rem]">
                  {label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
