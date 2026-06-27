'use client'

import { Tag, Package, KeyRound, Crown } from 'lucide-react'
import { Reveal } from './reveal'

const CARDS = [
  {
    icon: Tag,
    title: 'Personalized Inside Label',
    body: 'Each founding member receives a personalized inside label with their name alongside TONNANO branding.',
  },
  {
    icon: Package,
    title: 'Official Signature Box',
    body: 'Every order is delivered inside the official TONNANO presentation box.',
  },
  {
    icon: KeyRound,
    title: 'Exclusive Access',
    body: 'Private drops, early access and members-only collections reserved for the Inner Code.',
  },
  {
    icon: Crown,
    title: 'Founding Member Status',
    body: 'Become one of the first people shaping the TONNANO story from its very first chapter.',
  },
]

export function InnerCode() {
  return (
    <section id="inner-code" className="relative bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <span className="font-sans text-[0.65rem] tracking-luxury text-primary">
              MEMBERSHIP
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-5xl text-foreground sm:text-7xl">
              Inner Code
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 font-sans text-sm tracking-wide-lux text-foreground/60">
              LIMITED TO THE FIRST 1,000 MEMBERS
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="group flex h-full flex-col bg-background p-8 transition-colors duration-500 hover:bg-secondary">
                <c.icon
                  className="h-7 w-7 text-primary"
                  strokeWidth={1.1}
                  aria-hidden
                />
                <h3 className="mt-8 font-serif text-2xl text-foreground">
                  {c.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/60">
                  {c.body}
                </p>
                <span className="mt-8 font-sans text-[0.6rem] tracking-luxury text-foreground/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
