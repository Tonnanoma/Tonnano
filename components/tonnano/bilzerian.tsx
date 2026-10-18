'use client'

import { Reveal } from './reveal'

const PRODUCTS = [
  ['01', 'IVAR', 'Heavyweight Hoodie', 'Obsidian · Stone · Rust'],
  ['02', 'HARALD', 'Wool Overshirt', 'Charcoal · Taupe · Olive'],
  ['03', 'LOKI', 'Technical Shell Jacket', 'Black · Bone · Chocolate'],
  ['04', 'BJØRN', 'Quilted Liner Jacket', 'Black · Stone · Rust'],
  ['05', 'LEIF', 'Ribbed Knit Sweater', 'Taupe · Cream · Charcoal'],
  ['06', 'INGRID', 'Long Wool Coat', 'Charcoal · Camel · Off-White'],
  ['07', 'SIGRID', 'Cable-Knit Cardigan', 'Bone · Chocolate · Stone'],
  ['08', 'TORSTEN', 'Wide Cargo Trousers', 'Sand · Black · Olive'],
  ['09', 'CESAR', 'Tailored Winter Trouser', 'Charcoal · Black · Taupe'],
  ['10', 'RAGNAR', 'Winter Beanie', 'Black · Stone · Burgundy'],
] as const

export function Bilzerian() {
  return (
    <section id="bilzerian" className="relative border-t border-border bg-[#0b0b0b] py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 border-b border-border pb-14 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="font-sans text-[0.65rem] tracking-luxury text-primary">WINTER CHAPTER</p>
            <h2 className="mt-5 font-serif text-6xl tracking-tight text-foreground sm:text-8xl">BILZERIAN</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground/60">
              Heavyweight layers. Quiet details. A winter uniform for those who move with intention.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map(([number, name, category, colors], index) => (
            <Reveal key={name} delay={(index % 4) * 0.06}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden border border-border bg-[#12110f]">
                  <div className="absolute inset-8 border border-primary/10 transition-transform duration-700 group-hover:scale-95" />
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_42%,rgba(176,137,104,0.14),transparent_42%)]">
                    <span className="font-serif text-8xl text-foreground/[0.07] transition-transform duration-700 group-hover:scale-110">{number}</span>
                  </div>
                  <span className="absolute left-5 top-5 font-sans text-[0.6rem] tracking-wide-lux text-primary">{number}</span>
                  <span className="absolute bottom-5 left-5 font-sans text-[0.55rem] tracking-wide-lux text-foreground/40">COMING WITH BILZERIAN</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">{name}</h3>
                    <p className="mt-1 font-sans text-[0.58rem] tracking-wide-lux text-foreground/45">{category.toUpperCase()}</p>
                  </div>
                  <span className="mt-1 text-right font-sans text-[0.58rem] leading-relaxed text-foreground/45">{colors}</span>
                </div>
                <button type="button" className="mt-4 min-h-11 border-b border-primary/40 font-sans text-[0.6rem] tracking-wide-lux text-primary transition-colors hover:border-primary">
                  JOIN THE WHITELIST
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
