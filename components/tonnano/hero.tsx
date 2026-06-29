'use client'

import { IMAGES } from '@/lib/site'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'
import { EASE, stagger, fadeUpVariant, usePrefersReducedMotion } from './animation'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85])

  const prefersReduced = usePrefersReducedMotion()

  const containerVariants = {
    initial: {},
    enter: (delay = 0) => ({
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    }),
  }

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
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/40" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial="initial"
        animate="enter"
        variants={containerVariants}
        transition={{ ease: EASE as any }}
      >
        <motion.span
          className="font-sans text-[0.65rem] tracking-luxury text-foreground/70 sm:text-xs"
          variants={fadeUpVariant(16)}
          transition={{ duration: 0.9, ease: EASE as any, delay: 0.2 }}
        >
          EST. 2026 — MADE IN MOROCCO
        </motion.span>

        <motion.h1
          className="mt-5 font-sans text-5xl font-semibold tracking-luxury text-primary sm:text-7xl lg:text-8xl"
          variants={fadeUpVariant(22)}
          transition={{ duration: 1.05, ease: EASE as any, delay: 0.35 }}
        >
          TONNANO
        </motion.h1>

        <motion.p
          className="mt-6 font-serif text-2xl italic text-foreground sm:text-3xl lg:text-4xl"
          variants={fadeUpVariant(22)}
          transition={{ duration: 1.05, ease: EASE as any, delay: 0.55 }}
        >
          Welcome To The Inner Code
        </motion.p>

        <motion.p
          className="mt-5 max-w-md font-sans text-sm leading-relaxed text-foreground/65 sm:text-base"
          variants={fadeUpVariant(22)}
          transition={{ duration: 1.05, ease: EASE as any, delay: 0.75 }}
        >
          The first chapter begins before the first drop.
        </motion.p>

        <motion.a
          href="#whitelist"
          className="mt-10 inline-block border border-primary bg-primary px-10 py-4 font-sans text-[0.7rem] tracking-wide-lux text-primary-foreground transition-all duration-300 hover:bg-transparent hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-primary/20 will-change-transform"
          variants={fadeUpVariant(22)}
          transition={{ duration: 1.05, ease: EASE as any, delay: 0.95 }}
        >
          JOIN THE WHITELIST
        </motion.a>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        {/* Subtle scroll indicator — respects reduced motion */}
        {!prefersReduced ? (
          <div className="flex flex-col items-center gap-3">
            <span className="font-sans text-[0.6rem] tracking-luxury text-foreground/50">SCROLL</span>
            <div className="h-12 w-px bg-foreground/30 animate-pulse-slow" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="font-sans text-[0.6rem] tracking-luxury text-foreground/50">SCROLL</span>
            <div className="h-12 w-px bg-foreground/30" />
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
          100% { transform: scaleY(0.3); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.4s ease-in-out infinite;
          transform-origin: top;
        }
      `}</style>
    </section>
  )
}
