import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCollectionProduct } from '@/data/collections'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getCollectionProduct(slug)
  if (!product) notFound()
  return <main className="min-h-screen px-5 pb-24 pt-32 sm:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20"><div className="grid grid-cols-2 gap-3">{product.images.map((image, index) => <div key={image} className={`relative aspect-[4/5] overflow-hidden bg-secondary ${index === 0 ? 'col-span-2' : ''}`}><Image src={image} alt={`${product.name} view ${index + 1}`} fill sizes="(max-width: 1024px) 50vw, 55vw" className="object-cover" /></div>)}</div><div className="self-center lg:sticky lg:top-32 lg:h-fit"><Link href={`/collections/${product.collection}`} className="eyebrow text-primary">← {product.collection.replace('-', ' ')}</Link><h1 className="mt-7 font-serif text-6xl sm:text-8xl">{product.name}</h1><p className="mt-4 text-[.65rem] tracking-[.18em] text-foreground/50">{product.descriptor}</p><p className="mt-9 max-w-md text-sm leading-7 text-foreground/70">{product.description}</p><div className="mt-10 border-y border-border py-6 text-[.7rem] tracking-[.16em] text-foreground/60">MADE IN MOROCCO · DROP 01 · {product.status.replace('-', ' ').toUpperCase()}</div><button type="button" disabled className="mt-8 w-full border border-primary px-7 py-4 text-[.65rem] tracking-[.2em] text-primary disabled:cursor-not-allowed disabled:opacity-60">JOIN THE INNER CODE FOR ACCESS</button></div></div></main>
}
