import Link from 'next/link'
import { IMAGES } from '@/lib/site'
import Image from 'next/image'

export const metadata = { title: 'Drop 01 | TONNANO', description: 'Drop 01: the first TONNANO release.' }

export default function Page() {
  return <main className="min-h-screen bg-background"><section className="relative flex min-h-svh items-end overflow-hidden px-5 pb-16 pt-32 sm:px-10 sm:pb-24"><Image src={IMAGES.snakeCoupleStreet} alt="TONNANO Drop 01 campaign" fill priority className="object-cover object-center opacity-55" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" /><div className="relative max-w-3xl"><p className="eyebrow text-primary">TONNANO / DROP 01 / AUGUST 2026</p><h1 className="mt-6 font-serif text-7xl leading-[.85] sm:text-9xl">THE FIRST<br /><em>CODE.</em></h1><p className="mt-8 max-w-md text-sm leading-7 text-foreground/65">Six considered silhouettes. One quiet uniform. Made in Morocco for the days that become stories.</p><Link href="/collections/inner-code" className="mt-9 inline-flex border border-primary px-7 py-4 text-[.65rem] tracking-[.2em] text-primary transition hover:bg-primary hover:text-primary-foreground">EXPLORE THE COLLECTION</Link></div></section></main>
}
