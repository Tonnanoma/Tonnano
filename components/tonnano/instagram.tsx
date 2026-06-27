'use client'

import { IMAGES, INSTAGRAM_URL } from '@/lib/site'
import { AtSign as InstagramIcon } from 'lucide-react'
import Image from 'next/image'
import { Reveal } from './reveal'

export function Instagram() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.snakeDuoMarble || '/placeholder.svg'}
          alt="TONNANO Snake collection editorial against marble"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <span className="font-sans text-[0.65rem] tracking-luxury text-primary">
            @TONNANOMA
          </span>
          <h2 className="mt-6 font-serif text-4xl text-foreground sm:text-6xl">
            Follow The Story
          </h2>
          <p className="mx-auto mt-5 max-w-md font-sans text-sm leading-relaxed text-foreground/65">
            Be the first to witness each chapter unfold. Campaign films,
            behind-the-craft and members-only moments.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 border border-primary bg-primary px-9 py-4 font-sans text-[0.7rem] tracking-wide-lux text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
          >
            <InstagramIcon className="h-4 w-4" strokeWidth={1.4} />
            FOLLOW TONNANO
          </a>
        </Reveal>
      </div>
    </section>
  )
}
