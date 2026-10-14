'use client'

import { IMAGES } from '@/lib/site'
import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Reveal } from './reveal'

const PRODUCTS = [
  ['TN-WC-001', 'COLD BLOOD', 'Heavy brushed fleece hoodie', IMAGES.winterDogs],
  ['TN-WC-002', 'NIGHT PROTOCOL', 'Technical zip jacket · orange coded lining', IMAGES.winterJacket],
  ['TN-WC-003', 'MARBLE ASH', 'Stone-knit sweater', IMAGES.winterPortraitAlt],
  ['TN-WC-004', 'ZERO DEGREE', 'Sculptural insulated outerwear', IMAGES.winterThrone],
  ['TN-WC-005', 'STONE ROUTE', 'Wide-leg utility cargo', IMAGES.winterPortraitAlt],
  ['TN-WC-006', 'GHOST UNIT', 'Ribbed headwear system', IMAGES.winterLining],
  ['TN-WC-007', 'BEFORE THE DROP', 'Encrypted long sleeve', IMAGES.winterBox],
  ['TN-WC-008', 'LEGACY BOX', 'Numbered access set', IMAGES.winterLining],
] as const

export function WinterCode() {
  return (
    <section id="winter-code" className="relative overflow-hidden bg-[#080808] py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <span className="font-sans text-[0.65rem] tracking-luxury text-primary">WINTER ARCHIVE / CHAPTER II</span>
              <h2 className="mt-6 max-w-xl font-serif text-6xl leading-[0.9] text-foreground sm:text-8xl">COLD<br />BLOOD</h2>
              <p className="mt-8 max-w-sm font-sans text-sm leading-relaxed text-foreground/60">Winter is not a season. It is the period when ambitious people continue building while others wait.</p>
              <p className="mt-6 font-sans text-[0.65rem] tracking-wide-lux text-primary">THE WINTER CODE IS FORMING</p>
            </Reveal>
            <div className="mt-12 hidden aspect-[4/5] overflow-hidden lg:block">
              <Image src={IMAGES.winterJacket} alt="TONNANO Night Protocol jacket with orange coded lining" fill sizes="30vw" className="object-cover grayscale-[0.1] transition-transform duration-1000 hover:scale-105" />
            </div>
          </div>

          <div className="grid gap-x-4 gap-y-12 sm:grid-cols-2">
            {PRODUCTS.map(([code, name, detail, image], index) => (
              <Reveal key={code} delay={(index % 2) * 0.08}>
                <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.4 }} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-black ring-1 ring-white/10">
                    <Image src={image} alt={`TONNANO ${name} ${detail}`} fill sizes="(max-width: 640px) 100vw, 40vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2 font-sans text-[0.6rem] tracking-wide-lux text-white/60"><LockKeyhole className="h-3 w-3" /> LOCKED</div>
                    <ArrowUpRight className="absolute bottom-4 right-4 h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1} />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div><p className="font-serif text-2xl text-foreground">{name}</p><p className="mt-1 font-sans text-[0.65rem] tracking-wide-lux text-foreground/50">{detail.toUpperCase()}</p></div>
                    <span className="font-mono text-[0.6rem] text-primary">{code}</span>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
