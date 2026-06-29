import { useEffect, useState } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      const handle = () => setPrefersReduced(Boolean(mq.matches))
      handle()
      mq.addEventListener?.('change', handle)
      return () => mq.removeEventListener?.('change', handle)
    } catch {
      return
    }
  }, [])

  return prefersReduced
}

export const fadeUpVariant = (y = 20) => ({
  initial: { opacity: 0, y },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y },
})

export const stagger = {
  initial: {},
  enter: (delay = 0) => ({
    transition: {
      staggerChildren: 0.08,
      delayChildren: delay,
    },
  }),
}
