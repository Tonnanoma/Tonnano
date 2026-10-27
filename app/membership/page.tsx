import { Tag, Package, KeyRound, Crown } from 'lucide-react'
import { JoinForm } from '@/components/tonnano/whitelist'

export const metadata = { title: 'Membership', description: 'The first 1,000 founding members of the TONNANO Inner Code.' }
const benefits = [['Personalized Inside Label', Tag], ['Official Signature Box', Package], ['Exclusive Access', KeyRound], ['Founding Member Status', Crown]] as const

export default function Page() {
  return <main className="min-h-screen bg-background px-5 pb-24 pt-36 sm:px-8"><div className="mx-auto max-w-5xl"><p className="text-[0.65rem] tracking-luxury text-primary">TONNANO / INNER CODE</p><h1 className="mt-7 font-serif text-6xl sm:text-8xl">MEMBERSHIP</h1><p className="mt-8 max-w-xl text-sm leading-8 text-foreground/65">Limited to the first 1,000 founding members</p><div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">{benefits.map(([title, Icon]) => <div key={title} className="bg-background p-7"><Icon className="h-6 w-6 text-primary" strokeWidth={1.2} /><h2 className="mt-6 font-serif text-2xl">{title}</h2></div>)}</div><JoinForm /></div></main>
}
