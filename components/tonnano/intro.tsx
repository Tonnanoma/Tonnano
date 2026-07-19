'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

// Five staggered light streaks, positioned across the stage — the
// ignition beat, like runway lights switching on down a catwalk before
// the show starts. No logo mark involved.
const STREAKS = [-36, -18, 0, 18, 36]

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const settle = setTimeout(() => setClosing(true), 9300)
    const unmount = setTimeout(() => setVisible(false), 9800)
    return () => {
      clearTimeout(settle)
      clearTimeout(unmount)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] overflow-hidden bg-background">
          {/* Two panels split apart on exit — an atelier door opening */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-background"
            exit={{ x: '-100%' }}
            transition={{ duration: 1.0, ease: EASE }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-background"
            exit={{ x: '100%' }}
            transition={{ duration: 1.0, ease: EASE }}
          />

          {/* Ignition: staggered light streaks sweeping in */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {STREAKS.map((offset, i) => (
              <motion.div
                key={i}
                className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/70 to-transparent"
                style={{ left: `calc(50% + ${offset}%)`, transformOrigin: 'top' }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 1, 0.2], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.15, times: [0, 0.3, 0.7, 1], delay: i * 0.14, ease: EASE }}
              />
            ))}

            {/* Central beam gathering the light */}
            <motion.div
              className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 1.0, times: [0, 0.55, 1], delay: 1.1, ease: EASE }}
            />
          </div>

          {/* Ignition payoff flash */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-white mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.6, 0] }}
            transition={{ duration: 2.2, times: [0, 0.78, 0.86, 1], ease: 'easeOut' }}
          />

          {/* Ambient warmth, settling after ignition */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'radial-gradient(circle, rgba(243,107,33,0.14) 0%, rgba(243,107,33,0.04) 30%, rgba(0,0,0,0) 60%)',
            }}
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: closing ? 0 : 1, scale: closing ? 1.06 : 1 }}
            transition={{ duration: closing ? 0.5 : 1.4, ease: EASE, delay: closing ? 0 : 1.9 }}
          />

          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
            animate={{
              opacity: closing ? 0 : 1,
              scale: closing ? 0.97 : 1,
              filter: closing ? 'blur(6px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {/* Wordmark — a curtain lifts as the letter-spacing contracts,
                the classic luxury-house reveal, no logo mark needed. */}
            <div className="flex items-baseline justify-center gap-3">
              <motion.span
                className="font-sans text-5xl font-semibold sm:text-7xl"
                style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                initial={{ letterSpacing: '0.55em', opacity: 0, scale: 1.05, color: '#ffffff' }}
                animate={{
                  letterSpacing: '0.02em',
                  opacity: 1,
                  scale: 1,
                  clipPath: 'inset(0% 0% 0% 0%)',
                  color: ['#ffffff', '#ffffff', '#f36b21', '#f36b21', '#b3121b', '#b3121b'],
                }}
                transition={{
                  letterSpacing: { duration: 1.05, ease: EASE, delay: 2.25 },
                  opacity: { duration: 1.05, ease: EASE, delay: 2.25 },
                  scale: { duration: 1.05, ease: EASE, delay: 2.25 },
                  clipPath: { duration: 1.05, ease: EASE, delay: 2.25 },
                  color: {
                    duration: 6.5,
                    times: [0, 0.15, 0.35, 0.55, 0.78, 1],
                    ease: 'easeInOut',
                    delay: 2.25,
                  },
                }}
              >
                TONNANO
              </motion.span>

              {/* Credit — settles in beside the wordmark late in the sequence */}
              <motion.span
                className="translate-y-[3px] whitespace-nowrap font-serif text-xs italic text-foreground/45 sm:text-sm"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 8.0 }}
              >
                By <span className="text-primary">Zariry</span>
              </motion.span>
            </div>

            {/* Metallic sheen sweeping once across the settled wordmark */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-16 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent sm:w-24"
              style={{ mixBlendMode: 'overlay' }}
              initial={{ x: '-160%', opacity: 0 }}
              animate={{ x: '160%', opacity: [0, 1, 0] }}
              transition={{ duration: 1.0, ease: EASE, delay: 3.4 }}
            />

            <motion.p
              className="mt-6 font-sans text-[0.65rem] tracking-luxury text-foreground/60 sm:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 4.3 }}
            >
              TRUE LUXURY IS IN THE DETAILS
            </motion.p>

            <motion.div
              className="mt-6 h-px origin-center bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 5.1 }}
            />

            <motion.p
              className="mt-6 font-serif text-lg italic text-foreground/80 sm:text-xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 5.6 }}
            >
              Est. 2026 — Made In Morocco
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
