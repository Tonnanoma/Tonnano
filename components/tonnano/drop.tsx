'use client'

import { IMAGES } from '@/lib/images'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'
import { Reveal } from './reveal'
import { useLocale } from './locale-provider'

export function Drop() {
  const { messages: m } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])

  return (
    <section id="drop" ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src={IMAGES.snakeCoupleStreet || '/placeholder.svg'}
            alt="TONNANO Snake collection campaign on a city street"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-background/75" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-44">
        <Reveal>
          <span className="font-sans text-[0.65rem] tracking-luxury text-primary">
            {m.drop.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif text-6xl text-foreground sm:text-8xl">
            {m.nav.drop}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-3 font-sans text-sm tracking-luxury text-foreground/70">
            {m.drop.month}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-xl font-sans text-sm leading-relaxed text-foreground/70 sm:text-base">
            {m.drop.body}
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic text-foreground/85 sm:text-xl">
            {m.drop.quote}
          </p>
        </Reveal>

        <Reveal delay={0.36}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[m.drop.noRestocks, m.drop.limitedQuantities, m.drop.reserved].map(
              (t) => (
                <span
                  key={t}
                  className="font-sans text-[0.6rem] tracking-wide-lux text-foreground/50"
                >
                  {t.toUpperCase()}
                </span>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
