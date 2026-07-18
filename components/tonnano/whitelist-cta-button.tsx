'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import { type MouseEvent, type ReactNode, useState } from 'react'
import { usePrefersReducedMotion } from './animation'

type Ripple = { id: number; x: number; y: number }

// Custom eased scroll — smoother and slower than the browser default,
// so clicking the CTA feels like a deliberate cut to the next scene
// rather than an instant anchor jump.
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function scrollToWhitelist(duration = 950) {
  const target = document.getElementById('whitelist')
  if (!target) return

  const startY = window.scrollY
  const targetY = target.getBoundingClientRect().top + startY - 24
  const distance = targetY - startY
  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      window.dispatchEvent(new CustomEvent('tonnano:arrived-whitelist'))
    }
  }

  requestAnimationFrame(step)
}

export function WhitelistCtaButton({
  className,
  variant = 'outline',
  children = 'JOIN THE WHITELIST',
  onNavigate,
}: {
  className?: string
  variant?: 'outline' | 'solid'
  children?: ReactNode
  onNavigate?: () => void
}) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const prefersReduced = usePrefersReducedMotion()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (!prefersReduced) {
      const rect = e.currentTarget.getBoundingClientRect()
      const ripple: Ripple = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      setRipples((prev) => [...prev, ripple])
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
      }, 700)
    }

    scrollToWhitelist(prefersReduced ? 0 : 950)
    onNavigate?.()
  }

  return (
    <a
      href="#whitelist"
      onClick={handleClick}
      className={cn(
        'relative isolate inline-block overflow-hidden font-sans text-[0.65rem] tracking-wide-lux transition-colors',
        variant === 'outline' &&
          'border border-primary/60 px-5 py-2.5 text-primary hover:bg-primary hover:text-primary-foreground',
        variant === 'solid' &&
          'border border-primary bg-primary py-4 text-center text-primary-foreground',
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute z-0 rounded-full bg-current opacity-30"
            style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 0.35 }}
            animate={{ width: 260, height: 260, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>
    </a>
  )
}
