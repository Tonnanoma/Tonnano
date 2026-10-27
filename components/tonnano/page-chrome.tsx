'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function PageChrome() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  return <><div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-primary" style={{ transform: `scaleX(${progress / 100})`, transformOrigin: 'left' }} /><button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-primary/70 bg-background text-primary shadow-xl transition-transform hover:scale-105"><svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeOpacity=".2"/><circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="132" strokeDashoffset={132 - progress * 1.32}/></svg><ArrowUp data-icon="inline-start" /></button></>
}
