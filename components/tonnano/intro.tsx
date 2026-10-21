'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const POSTER = '/intro.png'

export function Intro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [phase, setPhase] = useState<'opening' | 'video' | 'closing'>('opening')
  const [visible, setVisible] = useState(true)
  const [failed, setFailed] = useState(false)
  const [showSkip, setShowSkip] = useState(false)

  const finish = useCallback(() => {
    if (phase === 'closing') return
    setPhase('closing')
    window.setTimeout(() => setVisible(false), 900)
  }, [phase])

  useEffect(() => {
    const paint = window.requestAnimationFrame(() => {
      window.setTimeout(() => setVideoSrc('/videos/tonnano-intro.mp4'), 120)
    })
    const skipTimer = window.setTimeout(() => setShowSkip(true), 2000)
    const openingTimer = window.setTimeout(() => setPhase('video'), 4100)
    return () => {
      window.cancelAnimationFrame(paint)
      window.clearTimeout(skipTimer)
      window.clearTimeout(openingTimer)
    }
  }, [])

  useEffect(() => {
    if (phase === 'video' && videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => undefined)
    }
  }, [phase, videoSrc])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.section
          aria-label="TONNANO cinematic introduction"
          className="fixed inset-0 z-[100] overflow-hidden bg-black text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'closing' ? 0 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {videoSrc && !failed ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={videoSrc}
              poster={POSTER}
              autoPlay
              muted
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
              onEnded={finish}
              aria-label="TONNANO film intro"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center">
                <p className="font-serif text-5xl tracking-[0.18em] sm:text-7xl">TONNANO</p>
                <p className="mt-4 text-[10px] tracking-[0.42em] text-white/45">TIME BUILDS LEGENDS</p>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-black/35" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,.78)_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-screen [background-image:url('/intro.png')] [background-size:480px] [filter:grayscale(1)]" />

          {phase === 'opening' && (
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
              <motion.p
                className="text-[10px] font-medium tracking-[0.45em] text-white/75 sm:text-xs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
                transition={{ duration: 3.2, times: [0, 0.25, 0.78, 1], ease: 'easeInOut' }}
              >
                A SIGNAL HAS BEEN SENT
              </motion.p>
              <motion.h1
                className="mt-7 max-w-3xl font-serif text-3xl leading-tight sm:text-6xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: [0, 0, 1, 1, 0], y: [12, 12, 0, 0, -10] }}
                transition={{ duration: 4, times: [0, 0.24, 0.42, 0.82, 1], ease: 'easeInOut' }}
              >
                YOU DO NOT VISIT TONNANO. YOU DECODE IT.
              </motion.h1>
            </div>
          )}

          {phase === 'video' && !failed && (
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: [0, 1, 1, 0], y: [18, 0, 0, -14] }}
                transition={{ duration: 5.5, delay: 0.35, times: [0, 0.18, 0.72, 1], ease: 'easeInOut' }}
              </motion.div>
              <motion.button
                type="button"
                onClick={finish}
                className="absolute bottom-20 border border-white/45 px-7 py-3 text-[10px] tracking-[0.35em] text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.2, duration: 0.8 }}
              >
                BEGIN DECODING
              </motion.button>
            </div>
          )}

          {showSkip && phase !== 'closing' && (
            <button
              type="button"
              onClick={finish}
              className="absolute bottom-7 right-6 z-20 text-[9px] tracking-[0.3em] text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-10"
            >
              SKIP INTRO
            </button>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  )
}
