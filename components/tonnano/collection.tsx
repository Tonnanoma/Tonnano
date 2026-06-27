'use client'

import { IMAGES } from '@/lib/site'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Reveal } from './reveal'

type Item = {
  src: string
  alt: string
  label: string
  detail: string
  span?: string
  ratio: string
}

const ITEMS: Item[] = [
  {
    src: IMAGES.snakeFlat,
    alt: 'TONNANO black Snake 009 tee — front logo and red snake embroidery detail',
    label: 'Snake 009',
    detail: 'Red Snake Embroidery',
    span: 'sm:col-span-2 sm:row-span-2',
    ratio: 'aspect-square',
  },
  {
    src: IMAGES.taupeFlat,
    alt: 'TONNANO taupe monogram tee with embossed T and inside label',
    label: 'Taupe Monogram',
    detail: 'Embossed T · Front & Back',
    ratio: 'aspect-[3/4]',
  },
  {
    src: IMAGES.blackFlat,
    alt: 'TONNANO black tee front and back with orange logo and embossed T',
    label: 'Black Essential',
    detail: 'Premium Heavyweight Cotton',
    ratio: 'aspect-[3/4]',
  },
  {
    src: IMAGES.rustFlat,
    alt: 'TONNANO rust orange tee with black sunset back graphic',
    label: 'Rust Sunset',
    detail: 'Time Builds Legends',
    ratio: 'aspect-[3/4]',
  },
  {
    src: IMAGES.purpleFlat,
    alt: 'TONNANO purple tee with embossed T back and inside label',
    label: 'Violet Edition',
    detail: 'Luxury Stitching',
    ratio: 'aspect-[3/4]',
  },
  {
    src: IMAGES.whiteFlat,
    alt: 'TONNANO white tee with arch line back graphic and EST 2026',
    label: 'Ivory Arch',
    detail: 'Inside Label · EST 2026',
    span: 'sm:col-span-2',
    ratio: 'aspect-[16/9]',
  },
]

export function Collection() {
  const [active, setActive] = useState<Item | null>(null)

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="collection" className="relative bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="font-sans text-[0.65rem] tracking-luxury text-primary">
              THE COLLECTION
            </span>
            <h2 className="mt-6 font-serif text-5xl text-foreground sm:text-6xl">
              Crafted In Detail
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground/60">
              Front, back, embroidery and inside label. Every garment studied
              like an object in a collection. Select a piece to view it closer.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.label}
              delay={(i % 3) * 0.08}
              className={cn(item.span)}
            >
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group relative block h-full w-full overflow-hidden ring-1 ring-inset ring-border"
              >
                <div className={cn('relative w-full', item.ratio)}>
                  <Image
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div className="text-left">
                    <p className="font-serif text-xl text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 font-sans text-[0.6rem] tracking-wide-lux text-foreground/60">
                      {item.detail.toUpperCase()}
                    </p>
                  </div>
                  <span className="font-sans text-[0.6rem] tracking-wide-lux text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    VIEW
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 z-10 text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X className="h-7 w-7" strokeWidth={1.1} />
            </button>
            <motion.div
              className="relative max-h-[85vh] w-full max-w-4xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative mx-auto h-[70vh] w-full">
                <Image
                  src={active.src || '/placeholder.svg'}
                  alt={active.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-5 text-center">
                <p className="font-serif text-2xl text-foreground">
                  {active.label}
                </p>
                <p className="mt-1 font-sans text-[0.65rem] tracking-wide-lux text-primary">
                  {active.detail.toUpperCase()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
