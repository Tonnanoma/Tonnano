'use client'

import { IMAGES } from '@/lib/site'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'
import { EASE, staggerContainer, fadeUp, usePrefersReducedMotion, useParallax, hoverProps, tapProps } from './animation'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { y } = useParallax(parallaxRef, [0, 12])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-svh min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Parallax image layer (transform-only) */}
      <motion.div style={{ y }} className="absolute inset-0" ref={parallaxRef} aria-hidden>
        <Image
          src={IMAGES.snakeCoupleArch || '/placeholder.svg'}
          alt="TONNANO campaign — model wearing the black Snake collection tee"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Subtle overlay depth */}
      <motion.div className="absolute inset-0 bg-background" style={{ opacity: 0.6 }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/40" />

      {/* Content with staggered entrance */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial="initial"
        animate="enter"
        variants={staggerContainer(0.04)}
        transition={{ ease: EASE as any }}
      >
        <motion.span
          className="font-sans text-[0.65rem] tracking-luxury text-foreground/70 sm:text-xs"
          variants={fadeUp(12)}
          transition={{ duration: 0.56, ease: EASE as any, delay: 0.12 }}
        >
          EST. 2026 — MADE IN MOROCCO
        </motion.span>

        <motion.h1
          className="mt-5 font-sans text-5xl font-semibold tracking-luxury text-primary sm:text-7xl lg:text-8xl"
          variants={fadeUp(20)}
          transition={{ duration: 0.64, ease: EASE as any, delay: 0.22 }}
        >
          TONNANO
        </motion.h1>

        <motion.p
          className="mt-6 font-serif text-2xl italic text-foreground sm:text-3xl lg:text-4xl"
          variants={fadeUp(18)}
          transition={{ duration: 0.6, ease: EASE as any, delay: 0.34 }}
        >
          Welcome To The Inner Code
        </motion.p>

        <motion.p
          className="mt-5 max-w-md font-sans text-sm leading-relaxed text-foreground/65 sm:text-base"
          variants={fadeUp(16)}
          transition={{ duration: 0.56, ease: EASE as any, delay: 0.46 }}
        >
          The first chapter begins before the first drop.
        </motion.p>

        <motion.a
          href="#whitelist"
          className="mt-10 inline-block border border-primary bg-primary px-10 py-4 font-sans text-[0.7rem] tracking-wide-lux text-primary-foreground transition-all duration-300 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-primary/20 will-change-transform"
          variants={fadeUp(14)}
          transition={{ duration: 0.56, ease: EASE as any, delay: 0.58 }}
          {...(!reduced ? hoverProps({ scale: 1.01 }) : {})}
          {...(!reduced ? tapProps() : {})}
        >
          JOIN THE WHITELIST
        </motion.a>
      </motion.div>

      {/* Subtle scroll indicator — reduced-motion aware */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        {!reduced ? (
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
        .animate-pulse-slow { animation: pulse-slow 2.4s ease-in-out infinite; transform-origin: top; }
      `}</style>
    </section>
  )
}
