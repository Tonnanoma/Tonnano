import Link from 'next/link'

export default function PrivacyPage() {
  return <main className="min-h-screen bg-background px-6 py-24 text-foreground"><div className="mx-auto max-w-2xl"><Link href="/" className="font-mono text-xs tracking-[0.2em] text-primary">TONNANO</Link><h1 className="mt-16 font-serif text-6xl">Privacy</h1><p className="mt-8 leading-8 text-muted-foreground">TONNANO respects your privacy. Information submitted to the Inner Code is used only to manage whitelist access and communicate relevant collection updates. We do not sell personal information.</p><p className="mt-6 leading-8 text-muted-foreground">You may request access, correction, or deletion of your information by contacting the TONNANO team.</p><Link href="/" className="mt-12 inline-block border border-primary px-5 py-3 font-mono text-xs tracking-[0.2em] text-primary">RETURN HOME</Link></div></main>
}
