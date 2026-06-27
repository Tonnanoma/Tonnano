import { cn } from '@/lib/utils'

export function Wordmark({
  className,
  tagline = false,
}: {
  className?: string
  tagline?: boolean
}) {
  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span className="font-sans font-medium tracking-luxury text-primary">
        TONNANO
      </span>
      {tagline && (
        <span className="mt-1.5 font-sans text-[0.5em] tracking-wide-lux text-foreground/70">
          TIME BUILDS LEGENDS
        </span>
      )}
    </span>
  )
}
