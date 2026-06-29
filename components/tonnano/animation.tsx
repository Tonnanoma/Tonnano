import { useEffect, useState, useRef } from 'react'
import type { RefObject } from 'react'
import { useScroll, useTransform } from 'motion/react'

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

// Variants (compatible with motion/react usage in the repo)
export const fade = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeUp = (y = 18) => ({
  initial: { opacity: 0, y },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y },
})

export const fadeDown = (y = 18) => ({
  initial: { opacity: 0, y: -y },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -y },
})

export const fadeLeft = (x = 18) => ({
  initial: { opacity: 0, x },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x },
})

export const fadeRight = (x = 18) => ({
  initial: { opacity: 0, x: -x },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -x },
})

export const scaleIn = (s = 0.98) => ({
  initial: { opacity: 0, scale: s },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: s },
})

// Stagger container helper
export const staggerContainer = (delay = 0, staggerChildren = 0.06) => ({
  initial: {},
  enter: {
    transition: {
      staggerChildren,
      delayChildren: delay,
    },
  },
})

// Hover & tap props to spread into motion elements
export const hoverProps = (options?: { scale?: number; shadow?: string; duration?: number }) => {
  const { scale = 1.01, shadow = '0 18px 40px rgba(6,8,15,0.06)', duration = 0.18 } = options || {}
  return {
    whileHover: { scale },
    style: { willChange: 'transform' } as any,
    transition: { duration, ease: EASE as any },
    // custom shadow can be applied via CSS classes; motion can animate filter/boxShadow in some runtimes
    _shadow: shadow,
  }
}

export const tapProps = (options?: { scale?: number; duration?: number }) => {
  const { scale = 0.995, duration = 0.06 } = options || {}
  return {
    whileTap: { scale },
    transition: { duration, ease: 'linear' as any },
  }
}

// Floating animation: subtle up/down loop
export const floating = (amplitude = 6, duration = 4) => {
  return {
    animate: { y: [0, -amplitude, 0, amplitude, 0] },
    transition: { duration, repeat: Infinity, ease: 'easeInOut' as any },
  }
}

// Parallax helper using motion/react's useScroll/useTransform
export function useParallax(ref: RefObject<Element>, range: [number, number] = [0, 20]) {
  const prefersReduced = usePrefersReducedMotion()
  if (prefersReduced) return { y: '0%' }

  try {
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], [`${range[0]}%`, `${range[1]}%`])
    return { y }
  } catch {
    return { y: '0%' }
  }
}

// Magnetic effect: use on a button/card to slightly follow cursor
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T>, strength = 0.25) {
  const prefersReduced = usePrefersReducedMotion()
  const transformRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const tx = (dx / rect.width) * 100 * strength
      const ty = (dy / rect.height) * 100 * strength
      transformRef.current.x = tx
      transformRef.current.y = ty
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update)
      }
    }

    function update() {
      if (!el) return
      const { x, y } = transformRef.current
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      rafRef.current = null
    }

    function reset() {
      if (!el) return
      el.style.transform = ''
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', reset)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', reset)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [ref, strength, prefersReduced])
}

// Magnetic CSS will be handled via transform; ensure will-change for performance

// Utility: small helper to apply subtle shadow dynamics based on depth
export const dynamicShadow = (depth = 8) => {
  const alpha = Math.min(0.06 + depth * 0.0025, 0.18)
  return `0 ${Math.round(depth * 2)}px ${Math.round(depth * 4)}px rgba(6,8,15,${alpha})`
}
