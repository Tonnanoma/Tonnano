import { About } from '@/components/tonnano/about'
import { Collection } from '@/components/tonnano/collection'
import { Countdown } from '@/components/tonnano/countdown'
import { Drop } from '@/components/tonnano/drop'
import { Experience } from '@/components/tonnano/experience'
import { Hero } from '@/components/tonnano/hero'
import { InnerCode } from '@/components/tonnano/inner-code'
import { Whitelist } from '@/components/tonnano/whitelist'

export default function Page() {
  return (
    <Experience>
      <main className="bg-background">
        <Hero />
        <About />
        <Drop />
        <InnerCode />
        <Collection />
        <Countdown />
        <Whitelist />
      </main>
    </Experience>
  )
}
