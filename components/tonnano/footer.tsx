import { INSTAGRAM_URL } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <p className="font-sans text-xl tracking-luxury text-primary">
              TONNANO
            </p>
            <p className="mt-4 font-sans text-[0.65rem] tracking-wide-lux text-foreground/45">
              EST. 2026 — MADE IN MOROCCO
            </p>
            <p className="mt-2 font-serif text-base italic text-foreground/70">
              Time Builds Legends
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { label: 'About', href: '#about' },
              { label: 'Collection', href: '#collection' },
              { label: 'Whitelist', href: '#whitelist' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms', href: '#' },
              { label: 'Contact', href: INSTAGRAM_URL },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-sans text-[0.65rem] tracking-wide-lux text-foreground/55 transition-colors hover:text-foreground"
              >
                {l.label.toUpperCase()}
              </a>
            ))}
          </nav>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[0.65rem] tracking-wide-lux text-primary transition-colors hover:text-foreground"
          >
            INSTAGRAM
          </a>
        </div>

        <div className="mt-14 hairline" />
        <p className="mt-8 text-center font-sans text-[0.6rem] tracking-wide-lux text-foreground/35">
          © 2026 TONNANO. ALL RIGHTS RESERVED. CRAFTED FOR THE FEW.
        </p>
      </div>
    </footer>
  )
}
