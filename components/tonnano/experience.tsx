'use client'

import { motion } from 'motion/react'
import { type ReactNode, useEffect, useState } from 'react'
import { Intro } from './intro'
import { LanguageProvider } from './language'
import Lenis from 'lenis'

export function Experience({ children }: { children: ReactNode }) {
  const [introActive, setIntroActive] = useState(true)
  const [ready, setReady] = useState(false)

  // Avoid hydration mismatch; decide on the client whether intro plays
  useEffect(() => {
    const seen = sessionStorage.getItem('tonnano-intro')
    if (seen) {
      setIntroActive(false)
      setReady(true)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let frame = 0
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])

  useEffect(() => {
    document.body.style.overflow = introActive ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [introActive])

  const handleDone = () => {
    sessionStorage.setItem('tonnano-intro', '1')
  }

  return (
    <LanguageProvider>
      {ready && introActive && (
        <Intro
          onDone={() => {
            handleDone()
            setIntroActive(false)
          }}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introActive ? 0 : 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </LanguageProvider>
  )
}
