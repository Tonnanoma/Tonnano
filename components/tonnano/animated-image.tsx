'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from './animation'

export default function AnimatedImage(props: ImageProps) {
  const { className, onLoadingComplete, ...rest } = props
  const [loaded, setLoaded] = useState(false)
  const prefersReduced = usePrefersReducedMotion()

  const handleLoad = (result?: any) => {
    setLoaded(true)
    onLoadingComplete?.(result)
  }

  const classes = cn(
    className,
    'transition-opacity duration-700 ease-out will-change-opacity',
    prefersReduced ? 'opacity-100' : loaded ? 'opacity-100' : 'opacity-0'
  )

  return <Image {...(rest as ImageProps)} className={classes} onLoadingComplete={handleLoad} />
}
