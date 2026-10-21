import Link from 'next/link'

export default function TermsPage() {
  return <main className="min-h-screen bg-background px-6 py-24 text-foreground"><div className="mx-auto max-w-2xl"><Link href="/" className="font-mono text-xs tracking-[0.2em] text-primary">TONNANO</Link><h1 className="mt-16 font-serif text-6xl">Terms</h1><p className="mt-8 leading-8 text-muted-foreground">The TONNANO website shares information about our collections and Inner Code whitelist. Product availability, release dates, and imagery may change before launch.</p><p className="mt-6 leading-8 text-muted-foreground">By joining the whitelist, you confirm that the information you provide is accurate and that you agree to receive launch-related communications.</p><Link href="/" className="mt-12 inline-block border border-primary px-5 py-3 font-mono text-xs tracking-[0.2em] text-primary">RETURN HOME</Link></div></main>
}
