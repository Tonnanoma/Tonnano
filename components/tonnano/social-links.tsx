'use client'

import { FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL } from '@/config/site'

const links = [
  { label: 'Instagram', href: INSTAGRAM_URL, path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 12 16.5 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5ZM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z' },
  { label: 'LinkedIn', href: LINKEDIN_URL, path: 'M5 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 10h4v11H3V10Zm6 0h4v1.6c.8-1.2 2.1-2 4-2 3.2 0 5 2 5 6.1V21h-4v-4.8c0-2-.7-3-2.2-3-1.8 0-2.8 1.2-2.8 3.4V21H9V10Z' },
  { label: 'Facebook', href: FACEBOOK_URL, path: 'M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.9-1.8h2V2.2c-.9-.1-1.8-.2-2.7-.2-2.7 0-4.6 1.7-4.6 4.8v2.7H7v3.5h3.1v9h3.4Z' },
]

export function SocialLinks({ className = '' }: { className?: string }) {
  return <nav aria-label="TONNANO social links" className={`flex items-center gap-2 ${className}`}>
    {links.map(({ label, href, path }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`TONNANO on ${label}`} className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-foreground/80 transition-all duration-700 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
    </a>)}
  </nav>
}
