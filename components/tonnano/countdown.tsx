'use client'

import { CLUES, DROP_DATE } from '@/lib/site'
import { motion, useInView } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Reveal } from './reveal'

const DAY = 86400000

type Remaining = { days: number; hours: number; minutes: number; seconds: number }

function getRemaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function ClueCard({ clue, index }: { clue: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [revealed, setRevealed] = useState(false)
  useEffect(() => { if (inView) setRevealed(true) }, [inView])
  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setRevealed(true)}
      onFocus={() => setRevealed(true)}
      tabIndex={0}
      className="group min-w-[154px] border border-border bg-card/80 px-4 py-4 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary sm:min-w-0"
      initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: index * 0.04 }}
      aria-label={`Clue ${String(index + 1).padStart(2, '0')}: ${clue}`}
    >
      <span className="font-mono text-[9px] tracking-[0.28em] text-primary">CLUE {String(index + 1).padStart(2, '0')}</span>
      <span className={`mt-3 block min-h-5 font-mono text-xs tracking-[0.12em] text-foreground transition-all duration-700 ${revealed ? 'blur-0 opacity-100' : 'select-none text-transparent blur-sm'}`}>
        {revealed ? clue : '████████████'}
      </span>
    </motion.div>
  )
}

export function Countdown() {
  const target = DROP_DATE.getTime()
  const [time, setTime] = useState<Remaining | null>(null)
  const live = time?.days === 0 && time?.hours === 0 && time?.minutes === 0 && time?.seconds === 0 && Date.now() >= target
  useEffect(() => {
    setTime(getRemaining(target))
    const id = window.setInterval(() => setTime(getRemaining(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])
  const units = useMemo(() => [['DAYS', time?.days], ['HOURS', time?.hours], ['MINUTES', time?.minutes], ['SECONDS', time?.seconds]] as const, [time])
  const totalDays = Math.max(1, Math.ceil((target - new Date().setHours(0, 0, 0, 0)) / DAY))
  const elapsed = Math.min(totalDays, Math.max(0, totalDays - (time?.days ?? totalDays)))
  const progress = `${(elapsed / totalDays) * 100}%`

  return (
    <section id="countdown" className="relative overflow-hidden border-y border-border bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-primary"><span className="size-1.5 rounded-full bg-primary" /> CLASSIFIED — CHAPTER I</div>
          <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-[0.95] text-foreground sm:text-7xl">The Countdown Has Begun</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-4 border-y border-border sm:mx-auto sm:max-w-4xl">
            {units.map(([label, value], index) => <div key={label} className={`relative py-6 text-center sm:py-10 ${index > 0 ? 'border-l border-border' : ''}`}>
              <span aria-hidden="true" className="font-mono text-3xl tabular-nums tracking-[-0.08em] text-foreground sm:text-7xl">{value === undefined ? '--' : String(value).padStart(2, '0')}</span>
              <span className="mt-3 block font-mono text-[9px] tracking-[0.25em] text-muted-foreground">{label}</span>
            </div>)}
          </div>
          <p className="sr-only" aria-live="polite">{time ? `${time.days} days, ${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds remaining.` : 'Countdown loading.'}</p>
          {live ? <div className="mt-8 text-center"><p className="font-serif text-3xl text-primary">The Drop Is Live</p></div> : <div className="mx-auto mt-8 max-w-4xl"><div className="flex justify-between font-mono text-[9px] tracking-[0.2em] text-muted-foreground"><span>DAY {elapsed} OF {totalDays}</span><span>12 NOV 2026</span></div><div className="mt-3 h-px bg-border"><div className="h-px bg-primary transition-[width] duration-1000" style={{ width: progress }} /></div></div>}
        </Reveal>
        <div className="mt-14 overflow-hidden" aria-label="Story clues">
          <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] sm:grid sm:grid-cols-4 lg:grid-cols-6">{CLUES.map((clue, index) => <ClueCard key={clue} clue={clue} index={index} />)}</div>
        </div>
        <div className="mt-12 flex flex-col items-start gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-md font-serif text-xl text-muted-foreground">Every clue is a piece of the story. Join the Inner Code to be first to know.</p><a href="#whitelist" className="border border-primary px-6 py-4 font-mono text-[10px] tracking-[0.22em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">JOIN THE INNER CODE</a></div>
      </div>
    </section>
  )
}
