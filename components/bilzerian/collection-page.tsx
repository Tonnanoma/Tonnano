'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { BILZERIAN_PRODUCTS } from '@/lib/bilzerian'
const copy = {
  chapter: 'WINTER CHAPTER 01',
  intro: 'A limited winter chapter shaped by Moroccan stone, cold air and the weight of considered materials. Ten silhouettes. One code.',
  explore: 'EXPLORE THE CHAPTER',
  innerCode: 'INNER CODE',
  storyLabel: 'THE STORY',
  story: 'BILZERIAN is the first TONNANO chapter built for winter. Heavyweight cotton, wool, technical shells and collector-grade details come together in a restrained uniform for the few.',
  collectionLabel: 'THE COLLECTION',
  gridNote: 'Ten limited silhouettes. Every piece is numbered by quantity, never reproduced.',
  craftLabel: 'THE CRAFT',
  craft: 'Nothing is added without reason. Fabrics are selected for weight, texture and the way they settle over time. Details stay close to the garment, discovered rather than announced.',
  accessLabel: 'ACCESS',
  accessTitle: 'THE FEW WHO KNOW.',
  accessCopy: 'The BILZERIAN chapter is reserved for Inner Code members. Request your place before the chapter closes.',
  request: 'REQUEST INNER CODE ACCESS',
}

export function BilzerianCollectionPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#f4f1ea]">
      <section className="relative flex min-h-[82vh] items-end overflow-hidden border-b border-white/10">
        <Image src="/images/bilzerian-hero.png" alt="BILZERIAN winter campaign" fill priority className="object-cover object-center opacity-70" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
        <div className="absolute inset-0 bg-[#080808]/10" />
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 sm:pb-24">
          <p className="mb-5 text-[10px] tracking-[0.38em] text-[#d8a96b]">TONNANO / {copy.chapter}</p>
          <h1 className="font-serif text-7xl leading-[0.82] tracking-[-0.04em] sm:text-[10rem]">BILZERIAN</h1>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-sm leading-7 text-white/65">{copy.intro}</p>
            <div className="flex gap-3">
              <a href="#chapter" className="border border-[#d8a96b] bg-[#d8a96b] px-5 py-3 text-[10px] tracking-[0.25em] text-black transition hover:bg-transparent hover:text-[#d8a96b]">{copy.explore}</a>
              <a href="#access" className="border border-white/35 px-5 py-3 text-[10px] tracking-[0.25em] transition hover:border-white">{copy.innerCode}</a>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="chapter" className="mx-auto grid max-w-7xl gap-10 px-6 py-24 sm:grid-cols-[0.7fr_1fr] sm:px-10 sm:py-36">
        <div><p className="text-[10px] tracking-[0.35em] text-[#d8a96b]">01 / {copy.storyLabel}</p><h2 className="mt-6 font-serif text-5xl leading-none sm:text-7xl">BUILT FOR<br />THE COLD.</h2></div>
        <div className="max-w-xl self-end text-sm leading-8 text-white/60"><p>{copy.story}</p><p className="mt-6 text-white">MADE FOR THE FEW.</p></div>
      </section>

      <section className="border-y border-white/10 bg-[#0c0c0c] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-7xl"><div className="mb-12 flex items-end justify-between"><div><p className="text-[10px] tracking-[0.35em] text-[#d8a96b]">02 / {copy.collectionLabel}</p><h2 className="mt-5 font-serif text-5xl sm:text-7xl">THE CHAPTER</h2></div><p className="hidden max-w-xs text-right text-xs leading-6 text-white/45 sm:block">{copy.gridNote}</p></div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
            {BILZERIAN_PRODUCTS.map((product, index) => <motion.div key={product.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ delay: index % 4 * 0.06 }}><Link href={`/bilzerian/${product.slug}`} className="group block"><div className="relative aspect-[4/5] overflow-hidden bg-[#151515]"><Image src={product.image} alt={`${product.name} ${product.type}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" /></div><div className="mt-4 flex items-start justify-between gap-3"><div><p className="font-serif text-2xl">{product.name}</p><p className="mt-1 text-[9px] tracking-[0.18em] text-white/45">{product.colorway.toUpperCase()}</p></div><span className="pt-1 text-[9px] text-[#d8a96b]">{product.quantity}</span></div></Link></motion.div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 sm:grid-cols-2 sm:px-10 sm:py-36"><div><p className="text-[10px] tracking-[0.35em] text-[#d8a96b]">03 / {copy.craftLabel}</p><h2 className="mt-6 font-serif text-5xl sm:text-7xl">WEIGHT.<br />TEXTURE.<br />INTENT.</h2></div><div className="self-end text-sm leading-8 text-white/60"><p>{copy.craft}</p><div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-6 text-[10px] tracking-[0.18em] text-white/50"><span>HEAVYWEIGHT FABRICS</span><span>LIMITED QUANTITIES</span><span>MOROCCAN CRAFT</span><span>COLLECTOR DETAILS</span></div></div></section>

      <section id="access" className="border-t border-white/10 bg-[#11100e] px-6 py-24 text-center sm:py-36"><p className="text-[10px] tracking-[0.35em] text-[#d8a96b]">04 / {copy.accessLabel}</p><h2 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-[0.95] sm:text-8xl">{copy.accessTitle}</h2><p className="mx-auto mt-8 max-w-md text-sm leading-7 text-white/55">{copy.accessCopy}</p><Link href="/#whitelist" className="mt-10 inline-block border border-[#d8a96b] px-8 py-4 text-[10px] tracking-[0.25em] text-[#d8a96b] transition hover:bg-[#d8a96b] hover:text-black">{copy.request}</Link></section>
    </main>
  )
}
