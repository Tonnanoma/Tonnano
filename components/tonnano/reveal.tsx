'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, EASE, usePrefersReducedMotion } from './animation'

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  once = true,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}) {
  const prefersReduced = usePrefersReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const variants = fadeUp(y)

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      whileInView="enter"
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.56, ease: EASE as any, delay }}
    >
      {children}
    </motion.div>
  )
}
