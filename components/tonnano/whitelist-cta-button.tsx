'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import { type MouseEvent, type ReactNode, useState } from 'react'
import { usePrefersReducedMotion } from './animation'

type Ripple = { id: number; x: number; y: number }
const RIPPLE_SIZE = 260

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

    const target = document.getElementById('whitelist')
    if (target) {
      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      })
      window.setTimeout(
        () => window.dispatchEvent(new CustomEvent('tonnano:arrived-whitelist')),
        prefersReduced ? 0 : 650,
      )
    }

    onNavigate?.()
  }

  return (
    <a
      href="#whitelist"
      onClick={handleClick}
      className={cn(
        'group relative isolate inline-block overflow-hidden font-sans text-[0.65rem] tracking-wide-lux transition-all duration-300 active:scale-[0.97]',
        variant === 'outline' &&
          'border border-primary/60 px-5 py-2.5 text-primary hover:bg-primary hover:text-primary-foreground',
        variant === 'solid' &&
          'border border-primary bg-primary py-4 text-center text-primary-foreground hover:bg-transparent hover:text-primary',
        className,
      )}
    >
      {/* Shine sweep on hover — pure CSS, no motion dependency */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-[opacity,left] duration-700 ease-out group-hover:left-[130%] group-hover:opacity-100"
      />

      <span className="relative z-10">{children}</span>

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute z-0 rounded-full bg-current opacity-30"
            style={{ left: r.x - RIPPLE_SIZE / 2, top: r.y - RIPPLE_SIZE / 2 }}
            initial={{ width: 0, height: 0, opacity: 0.35 }}
            animate={{ width: RIPPLE_SIZE, height: RIPPLE_SIZE, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>
    </a>
  )
}
