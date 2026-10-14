import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 · TONNANO',
  description: 'The archive for this channel cannot be found.',
}

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#080909', color: '#f3efe9' }}>
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <p style={{ letterSpacing: '0.28em', textTransform: 'uppercase', fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)' }}>
          ARCHIVE ERROR
        </p>
        <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(3rem, 8vw, 7rem)', margin: '18px 0 10px' }}>
          CODE NOT FOUND
        </h1>
        <p style={{ maxWidth: '540px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
          The route you accessed does not exist inside the TONNANO archive. Return to the signal and continue.
        </p>
      </div>
    </main>
  )
}
