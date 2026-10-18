'use client'

import { INTRO_VIDEO } from '@/lib/site'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [soundOn, setSoundOn] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 11000)
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = !soundOn
  }, [soundOn])

  const close = () => setVisible(false)

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted={!soundOn}
            playsInline
            onEnded={close}
            poster="/intro.png"
            className="absolute inset-0 size-full object-cover opacity-70"
          >
            <source src={INTRO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#050505]/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#050505_100%)] opacity-75" />
          <div className="grain absolute inset-0 opacity-25" aria-hidden="true" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.p
              className="font-sans text-[0.62rem] tracking-[0.38em] text-[#f2efe8]/60"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              EST. 2026 — MADE IN MOROCCO
            </motion.p>
            <motion.h1
              className="mt-6 font-serif text-6xl font-light tracking-[0.14em] text-[#f2efe8] sm:text-8xl"
              initial={{ opacity: 0, letterSpacing: '0.35em' }}
              animate={{ opacity: 1, letterSpacing: '0.14em' }}
              transition={{ delay: 1.15, duration: 1.4 }}
            >
              TONNANO
            </motion.h1>
            <motion.p
              className="mt-8 max-w-xl font-serif text-2xl italic text-[#f2efe8]/90 sm:text-4xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1 }}
            >
              TIME BUILDS LEGENDS
            </motion.p>
            <motion.p
              className="mt-5 font-sans text-sm text-[#f2efe8]/65"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
            >
              The first chapter begins before the first drop.
            </motion.p>
            <motion.button
              type="button"
              onClick={close}
              className="mt-10 border border-[#b08968]/70 px-7 py-3 font-sans text-[0.62rem] tracking-[0.28em] text-[#f2efe8] transition-colors hover:bg-[#b08968] hover:text-[#050505]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 1 }}
            >
              ENTER THE INNER CODE
            </motion.button>
          </div>

          <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-between px-6 sm:px-10">
            <button type="button" onClick={() => setSoundOn((value) => !value)} className="font-sans text-[0.58rem] tracking-[0.22em] text-[#f2efe8]/60 hover:text-[#f2efe8]">
              SOUND {soundOn ? 'ON' : 'OFF'}
            </button>
            <button type="button" onClick={close} className="font-sans text-[0.58rem] tracking-[0.22em] text-[#f2efe8]/60 hover:text-[#f2efe8]">
              SKIP INTRO
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
