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

    const skipTimer = window.setTimeout(() => setShowSkip(true), 2200)
    const openingTimer = window.setTimeout(() => setPhase('video'), 5200)

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

  useEffect(() => {
    if (phase !== 'video') return

    const videoDurationTimer = window.setTimeout(() => {
      finish()
    }, 6000)

    return () => {
      window.clearTimeout(videoDurationTimer)
    }
  }, [phase, finish])

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
                <p className="mt-4 text-[10px] tracking-[0.42em] text-white/45">
                  TIME BUILDS LEGENDS
                </p>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-black/35" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,.78)_100%)]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-screen [background-image:url('/intro.png')] [background-size:480px] [filter:grayscale(1)]" />

          {phase === 'opening' && (
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
              <motion.div
                className="h-px w-16 bg-white/30"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.h1
                className="mt-8 font-serif text-4xl tracking-[0.18em] sm:text-7xl"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                TONNANO
              </motion.h1>

              <motion.p
                className="mt-6 text-[10px] tracking-[0.5em] text-white/50 sm:text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                TIME BUILDS LEGENDS
              </motion.p>

              <motion.div
                className="mt-10 h-px w-24 bg-white/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}

          {phase === 'video' && !failed && (
            <motion.button
              type="button"
              onClick={finish}
              className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 border border-white/40 px-8 py-3 text-[10px] tracking-[0.4em] text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              ENTER
            </motion.button>
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
