'use client'

import { DROP_DATE } from '@/lib/site'
import { useEffect, useState } from 'react'
import { Reveal } from './reveal'
import { CountdownScene } from './countdown-scene'
import { useLocale } from './locale-provider'

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
  const { locale } = useLocale()
  const target = new Date(DROP_DATE).getTime()
  const [time, setTime] = useState<ReturnType<typeof getRemaining> | null>(null)

  useEffect(() => {
    setTime(getRemaining(target))
    const id = setInterval(() => setTime(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const labels: Record<string, [string, string, string, string]> = {
    en: ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'], fr: ['JOURS', 'HEURES', 'MINUTES', 'SECONDES'], ar: ['أيام', 'ساعات', 'دقائق', 'ثوانٍ'], es: ['DÍAS', 'HORAS', 'MINUTOS', 'SEGUNDOS'], de: ['TAGE', 'STUNDEN', 'MINUTEN', 'SEKUNDEN'], it: ['GIORNI', 'ORE', 'MINUTI', 'SECONDI'], pt: ['DIAS', 'HORAS', 'MINUTOS', 'SEGUNDOS'], nl: ['DAGEN', 'UREN', 'MINUTEN', 'SECONDEN'], tr: ['GÜN', 'SAAT', 'DAKİKA', 'SANİYE'], zh: ['天', '小时', '分钟', '秒'], ja: ['日', '時間', '分', '秒'], ru: ['ДНИ', 'ЧАСЫ', 'МИНУТЫ', 'СЕКУНДЫ'],
  }
  const units = [time?.days, time?.hours, time?.minutes, time?.seconds].map((value, index) => ({ label: labels[locale][index], value: value === undefined ? '--' : String(value).padStart(2, '0') }))

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
          <div className="mx-auto mt-10 max-w-5xl">
            <CountdownScene items={units} />
            <div className="grid grid-cols-4 gap-2 sm:gap-6" aria-label="Countdown">
              {units.map(({ label, value }) => (
                <div key={label} className="border border-border bg-background py-3 sm:py-4">
                  <span className="font-sans text-xl font-light tabular-nums text-foreground sm:text-3xl">{value}</span>
                  <span className="mt-2 block font-sans text-[0.5rem] tracking-wide-lux text-foreground/50 sm:text-[0.6rem]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
