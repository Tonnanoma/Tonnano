'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

function Particles() {
  // Deterministic pseudo-random so server/client match
  const dust = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280
        const r = seed / 233280
        return {
          left: `${(r * 100).toFixed(2)}%`,
          top: `${(((seed * 7) % 233280) / 233280 * 100).toFixed(2)}%`,
          size: 1 + (i % 3),
          delay: (r * 3).toFixed(2),
          duration: (4 + (i % 4)).toFixed(2),
        }
      }),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dust.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animation: `drift ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

// The stitched vertical line + dot is the same motif carried on the
// TONNANO "Est. 2026" back graphic — repeating it here ties the intro
// directly to the product line instead of feeling like generic loader art.
function SignalLine() {
  return (
    <motion.div
      className="relative mb-8 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <motion.span
        className="h-1 w-1 rounded-full bg-primary"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE, delay: 0.15 }}
      />
      <motion.div
        className="mt-1.5 w-px origin-top bg-gradient-to-b from-primary via-primary/70 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: 46 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
      />
    </motion.div>
  )
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    // Content begins settling first, then the iris collapses over it —
    // by the time the wipe finishes, the stage is already clear.
    const settle = setTimeout(() => setClosing(true), 3100)
    const unmount = setTimeout(() => setVisible(false), 3650)
    return () => {
      clearTimeout(settle)
      clearTimeout(unmount)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ clipPath: 'circle(150% at 50% 50%)', WebkitClipPath: 'circle(150% at 50% 50%)' as any }}
          animate={{ clipPath: 'circle(150% at 50% 50%)', WebkitClipPath: 'circle(150% at 50% 50%)' as any }}
          exit={{ clipPath: 'circle(0% at 50% 50%)', WebkitClipPath: 'circle(0% at 50% 50%)' as any }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          {/* Warm cinematic spotlight */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'radial-gradient(circle, rgba(243,107,33,0.16) 0%, rgba(243,107,33,0.05) 28%, rgba(0,0,0,0) 60%)',
            }}
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: closing ? 0 : 1, scale: closing ? 1.08 : 1 }}
            transition={{ duration: closing ? 0.5 : 2.1, ease: EASE, delay: closing ? 0 : 0.5 }}
          />

          <Particles />

          <motion.div
            className="relative flex flex-col items-center px-6 text-center"
            animate={{ opacity: closing ? 0 : 1, scale: closing ? 0.97 : 1, filter: closing ? 'blur(6px)' : 'blur(0px)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <SignalLine />

            <motion.div
              className="light-sweep"
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.75 }}
            >
              <span className="engraved font-sans text-4xl font-semibold tracking-luxury sm:text-6xl">
                TONNANO
              </span>
            </motion.div>

            <motion.span
              className="mt-6 font-sans text-[0.65rem] tracking-luxury text-foreground/60 sm:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 1.55 }}
            >
              EST. 2026 — MADE IN MOROCCO
            </motion.span>

            <motion.span
              className="mt-3 font-serif text-lg italic text-foreground/80 sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 2.1 }}
            >
              Crafted For The Few
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
