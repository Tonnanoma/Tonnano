'use client'

import { IMAGES } from '@/lib/site'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'
import { Reveal } from './reveal'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" className="relative bg-background py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <span className="font-sans text-[0.65rem] tracking-luxury text-primary">
            THE PHILOSOPHY
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            More Than A T-Shirt
          </h2>
          <div className="mt-8 space-y-6 font-sans text-sm leading-relaxed text-foreground/70 sm:text-base">
            <p>
              TONNANO is currently opening access to its founding members ahead
              of the official August Drop. Joining the whitelist is not simply
              reserving a garment — it is becoming part of the TONNANO story
              from day one.
            </p>
            <p>
              Every piece is designed with premium heavyweight cotton, refined
              construction and timeless design. Built around quality rather than
              quantity, created for those who appreciate craftsmanship and
              understated luxury.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
            {[
              ['Made in', 'Morocco'],
              ['Production', 'Limited'],
              ['Design', 'Timeless'],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-sans text-[0.6rem] tracking-wide-lux text-foreground/45">
                  {k.toUpperCase()}
                </p>
                <p className="mt-1.5 font-serif text-xl text-foreground">{v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal y={40}>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <motion.div style={{ y }} className="absolute inset-[-8%]">
                <Image
                  src={IMAGES.taupeDuoColumns || '/placeholder.svg'}
                  alt="Two models wearing TONNANO taupe monogram tees beside stone columns"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 ring-1 ring-inset ring-border" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
