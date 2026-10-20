'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { Messages } from '@/lib/i18n'

const signals = ['TOMORROW','12:10:00','NEXT MONTH','12/11/2026','SOON','NOW','00:00:01','DEMAIN','12/12/2026','NEXT YEAR','SIGNAL DETECTED','DROP 01','CHAPTER 01','INNER CODE ACCESS','WHITELIST ONLY','CODE UNLOCKED','ACCESS PENDING','THE FIRST CHAPTER','NO RESTOCK','MEMBERS ONLY','TIME IS CLOSE','THE CODE KNOWS']
const whispers = ['T-N-0-1 // SIGNAL','CODE: TIME','ACCESS: PENDING','CHAPTER: UNLOCKING','BLACK / STONE / RUST','○  KEY  ◌  GATE']

export function MysteryCountdown({ messages }: { messages: Messages }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [whisper, setWhisper] = useState('')

  useEffect(() => {
    const rotate = () => {
      setIndex((current) => (current + 1) % signals.length)
      if (Math.random() > 0.55) {
        setWhisper(whispers[Math.floor(Math.random() * whispers.length)])
        window.setTimeout(() => setWhisper(''), 1500)
      }
    }
    const id = window.setInterval(rotate, 3600)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section id="countdown" className="relative isolate overflow-hidden border-y border-border bg-[#080808] py-28 sm:py-40" aria-labelledby="next-chapter-title">
      <div className="grain absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        <span className="font-sans text-[0.62rem] uppercase tracking-luxury text-primary">{messages.countdown.eyebrow}</span>
        <h2 id="next-chapter-title" className="mt-6 font-serif text-4xl text-foreground sm:text-6xl">{messages.countdown.body}</h2>
        <div className="mt-16 flex min-h-[9rem] items-center justify-center sm:min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.div key={signals[index]} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: 'blur(8px)' }} transition={{ duration: reduceMotion ? 0.1 : 0.75 }} className="font-mono text-[clamp(2.2rem,8vw,7.5rem)] font-light uppercase leading-none tracking-[0.08em] text-foreground">
              {signals[index]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="h-6 font-mono text-[0.62rem] uppercase tracking-[0.35em] text-primary/70" aria-live="polite">{whisper}</div>
        <div className="mt-10 flex items-center gap-4 text-[0.62rem] uppercase tracking-wide-lux text-foreground/45"><span className="h-px w-12 bg-border" />{messages.countdown.footer}<span className="h-px w-12 bg-border" /></div>
        <a href="#whitelist" className="mt-10 border border-primary px-7 py-4 font-sans text-[0.62rem] uppercase tracking-wide-lux text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{messages.countdown.cta}</a>
      </div>
    </section>
  )
}
