import Link from 'next/link'

export const metadata = { title: 'Cart | TONNANO', description: 'Your TONNANO cart.' }

export default function Page() {
  return <main className="min-h-screen px-5 pb-24 pt-36 sm:px-8"><div className="mx-auto max-w-3xl"><p className="eyebrow text-primary">TONNANO / YOUR SELECTION</p><h1 className="mt-7 font-serif text-7xl">YOUR CART</h1><div className="mt-16 border-y border-border py-20 text-center"><p className="font-serif text-4xl">Nothing here yet.</p><p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-foreground/60">The first TONNANO drop opens soon. Join the Inner Code for early access.</p><Link href="/membership" className="mt-8 inline-flex border border-primary px-7 py-4 text-[.65rem] tracking-[.2em] text-primary transition hover:bg-primary hover:text-primary-foreground">JOIN THE INNER CODE</Link></div></div></main>
}
