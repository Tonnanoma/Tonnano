'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const
const WORDMARK = 'TONNANO'.split('')

// A stylised, layered "T" — drawn like an engraving, then struck like a
// wax seal. This is the emblem beat the whole intro is built around,
// instead of a generic loader graphic.
const T_PATH =
  'M20,10 L80,10 L80,24 L58,24 L58,96 L70,96 L70,110 L30,110 L30,96 L42,96 L42,24 L20,24 Z'

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    // ~10s of composition, then a clean cut into the double-door wipe.
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
        <motion.div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Two panels split apart on exit — an atelier door opening,
              rather than a plain fade or circular wipe. */}
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

          {/* Impact flash — the moment the seal strikes */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-white mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.55, 0] }}
            transition={{ duration: 2.9, times: [0, 0.74, 0.79, 0.88], ease: 'easeOut' }}
          />

          {/* Ambient warmth */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'radial-gradient(circle, rgba(243,107,33,0.14) 0%, rgba(243,107,33,0.04) 30%, rgba(0,0,0,0) 60%)',
            }}
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: closing ? 0 : 1, scale: closing ? 1.06 : 1 }}
            transition={{ duration: closing ? 0.5 : 2.2, ease: EASE, delay: closing ? 0 : 0.6 }}
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
            {/* Monogram: drawn, then struck */}
            <motion.div
              className="relative mb-7 text-primary [filter:drop-shadow(0_0_20px_rgba(243,107,33,0.35))]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 1, 1, 1, 1, 1],
                scale: [0.8, 0.8, 1, 1.16, 0.96, 1.02, 1],
                x: [0, 0, 0, -3, 3, -1, 0],
                y: [0, 0, 0, -2, 2, -1, 0],
              }}
              transition={{ duration: 2.9, times: [0, 0.05, 0.74, 0.79, 0.84, 0.9, 1], ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 100 120" className="h-16 w-14 sm:h-20 sm:w-16" aria-hidden>
                <motion.path
                  d={T_PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.9, ease: EASE, delay: 0.35 }}
                />
              </svg>
            </motion.div>

            {/* Wordmark, revealed letter by letter */}
            <div className="flex items-baseline justify-center gap-3">
              <span className="engraved font-sans text-5xl font-semibold tracking-luxury sm:text-7xl">
                {WORDMARK.map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 3.1 + i * 0.09 }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>

              {/* Signature credit — settles in beside the wordmark late in
                  the sequence, between roughly the 8th and 10th second. */}
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
              transition={{ duration: 1.1, ease: EASE, delay: 4.1 }}
            />

            <motion.p
              className="mt-6 font-sans text-[0.65rem] tracking-luxury text-foreground/60 sm:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 5.1 }}
            >
              TRUE LUXURY IS IN THE DETAILS
            </motion.p>

            <motion.div
              className="mt-6 h-px origin-center bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 5.9 }}
            />

            <motion.p
              className="mt-6 font-serif text-lg italic text-foreground/80 sm:text-xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 6.4 }}
            >
              Est. 2026 — Made In Morocco
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
