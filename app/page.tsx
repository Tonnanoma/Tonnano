import { About } from '@/components/tonnano/about'
import { Collection } from '@/components/tonnano/collection'
import { Countdown } from '@/components/tonnano/countdown'
import { Drop } from '@/components/tonnano/drop'
import { Experience } from '@/components/tonnano/experience'
import { Footer } from '@/components/tonnano/footer'
import { Hero } from '@/components/tonnano/hero'
import { InnerCode } from '@/components/tonnano/inner-code'
import { Instagram } from '@/components/tonnano/instagram'
import { Navbar } from '@/components/tonnano/navbar'
import { Whitelist } from '@/components/tonnano/whitelist'
import { WinterCode } from '@/components/tonnano/winter-code'
import { Monogram3D } from '@/components/tonnano/monogram-3d'

export default function Page() {
  return (
    <Experience>
      <Navbar />
      <main className="bg-background">
        <Hero />
        <About />
        <Drop />
        <WinterCode />
        <section id="3d-experience" className="bg-[#050505] px-5 py-20 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="font-sans text-[0.65rem] tracking-luxury text-primary">THE OBJECT / 001</p>
            <h2 className="mt-4 max-w-xl font-serif text-5xl leading-[0.9] text-foreground sm:text-7xl">Inspect the code.</h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-foreground/55">A digital study of the TONNANO monogram. Rotate the object, zoom into the surface and stay with the detail.</p>
            <div className="mt-10"><Monogram3D /></div>
          </div>
        </section>
        <InnerCode />
        <Collection />
        <Countdown />
        <Whitelist />
        <Instagram />
      </main>
      <Footer />
    </Experience>
  )
}
