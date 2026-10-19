'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const VIDEO_PATH = '/videos/tonnano-intro.mp4'
const POSTER_PATH = '/placeholder.jpg'

type IntroPhase = 'signal' | 'decode' | 'film'

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<IntroPhase>('signal')
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const paintFrame = window.requestAnimationFrame(() => setVideoReady(true))
    const decodeTimer = window.setTimeout(() => setPhase('decode'), 1800)
    const filmTimer = window.setTimeout(() => setPhase('film'), 4000)
    const skipTimer = window.setTimeout(() => setShowSkip(true), 2000)

    return () => {
      window.cancelAnimationFrame(paintFrame)
      window.clearTimeout(decodeTimer)
      window.clearTimeout(filmTimer)
      window.clearTimeout(skipTimer)
    }
  }, [])

  useEffect(() => {
    if (!videoReady || videoFailed) return
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch {
        // Autoplay can be blocked by the browser; the video remains available via controls.
      }
    }
    void playVideo()
  }, [videoReady, videoFailed])

  const close = () => setVisible(false)

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-black text-[#f2efe8]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="TONNANO cinematic introduction"
        >
          {!videoFailed && (
            <motion.video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              autoPlay
              muted
              playsInline
              preload="metadata"
              poster={POSTER_PATH}
              onEnded={close}
              onError={() => setVideoFailed(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'film' ? 0.62 : 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              {videoReady && <source src={VIDEO_PATH} type="video/mp4" />}
            </motion.video>
          )}

          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_12%,rgba(0,0,0,0.88)_100%)]" aria-hidden="true" />
          <div className="grain absolute inset-0 opacity-25" aria-hidden="true" />

          {videoFailed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black" role="status">
              <p className="font-serif text-4xl tracking-[0.28em] text-[#f2efe8] sm:text-6xl">TONNANO</p>
            </div>
          )}

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <AnimatePresence mode="wait">
              {phase === 'signal' && (
                <motion.p
                  key="signal"
                  className="chapter-signal font-sans text-[0.68rem] tracking-[0.38em] text-[#f2efe8]/70"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.9 }}
                >
                  A SIGNAL HAS BEEN SENT
                </motion.p>
              )}
              {phase === 'decode' && (
                <motion.p
                  key="decode"
                  className="max-w-3xl font-serif text-3xl font-light leading-tight tracking-[0.08em] text-[#f2efe8] sm:text-5xl"
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, filter: 'blur(0)' }}
                  exit={{ opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 1.2 }}
                >
                  YOU DO NOT VISIT TONNANO. YOU DECODE IT.
                </motion.p>
              )}
              {phase === 'film' && (
                <motion.div
                  key="film"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <p className="font-serif text-5xl font-light tracking-[0.12em] text-[#f2efe8] sm:text-7xl">TIME BUILDS LEGENDS</p>
                  <p className="mt-5 font-sans text-sm tracking-[0.12em] text-[#f2efe8]/70">The first chapter begins before the first drop.</p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-10 border border-[#b08968]/75 px-8 py-3 font-sans text-[0.62rem] tracking-[0.28em] text-[#f2efe8] transition-colors hover:bg-[#b08968] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b08968]"
                  >
                    BEGIN DECODING
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {showSkip && (
            <motion.button
              type="button"
              onClick={close}
              className="absolute inset-x-0 bottom-7 z-10 mx-auto w-fit font-sans text-[0.58rem] tracking-[0.24em] text-[#f2efe8]/55 transition-colors hover:text-[#f2efe8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b08968]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              aria-label="Skip cinematic introduction"
            >
              SKIP INTRO
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
