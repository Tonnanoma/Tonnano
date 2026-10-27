'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setVisible(window.scrollY > 600)
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-foreground/20 bg-background/80 text-foreground backdrop-blur-md transition-all duration-500 hover:border-primary hover:text-primary ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="1" />
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="138.2" strokeDashoffset={138.2 - (138.2 * progress) / 100} />
      </svg>
      <ArrowUp aria-hidden="true" strokeWidth={1.2} />
    </button>
  )
}
