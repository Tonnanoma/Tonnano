'use client'

import { IMAGES } from '@/lib/site'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-svh min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={IMAGES.snakeCoupleArch || '/placeholder.svg'}
          alt="TONNANO campaign — model wearing the black Snake collection tee"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlay }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/40" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.span
          className="font-sans text-[0.65rem] tracking-luxury text-foreground/70 sm:text-xs"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        >
          EST. 2026 — MADE IN MOROCCO
        </motion.span>

        <motion.h1
          className="mt-5 font-sans text-5xl font-semibold tracking-luxury text-primary sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
        >
          TONNANO
        </motion.h1>

        <motion.p
          className="mt-6 font-serif text-2xl italic text-foreground sm:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}
        >
          Welcome To The Inner Code
        </motion.p>

        <motion.p
          className="mt-5 max-w-md font-sans text-sm leading-relaxed text-foreground/65 sm:text-base"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.75 }}
        >
          The first chapter begins before the first drop.
        </motion.p>

        <motion.a
          href="#whitelist"
          className="mt-10 inline-block border border-primary bg-primary px-10 py-4 font-sans text-[0.7rem] tracking-wide-lux text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.95 }}
        >
          JOIN THE WHITELIST
        </motion.a>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.4 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-sans text-[0.6rem] tracking-luxury text-foreground/50">
            SCROLL
          </span>
          <motion.span
            className="block h-12 w-px bg-foreground/30"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
