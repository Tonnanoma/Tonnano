'use client'

import { useState, useEffect, useRef } from 'react'

const images = {
  g1: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop',
  g2: 'https://images.unsplash.com/photo-1618519400069-cf91bb4a74c0?w=800&h=600&fit=crop',
  g3: 'https://images.unsplash.com/photo-1618519401924-dfa6f75d7ca4?w=600&h=800&fit=crop',
  g4: 'https://images.unsplash.com/photo-1612198188060-c7ba2a3c5d5f?w=600&h=800&fit=crop',
  g5: 'https://images.unsplash.com/photo-1555062545-c9a1b0c73e0f?w=600&h=800&fit=crop',
  g6: 'https://images.unsplash.com/photo-1618519402850-c414b5fb8e76?w=800&h=1000&fit=crop',
  g7: 'https://images.unsplash.com/photo-1568762690336-221eeaf4fa4d?w=800&h=600&fit=crop',
  g8: 'https://images.unsplash.com/photo-1612198188060-c7ba2a3c5d5f?w=800&h=600&fit=crop',
  g9: 'https://images.unsplash.com/photo-1512990540585-e489ec4db07e?w=600&h=800&fit=crop',
  g10: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=500&fit=crop',
  about: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=750&fit=crop',
}

export default function TonnanoLanding() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    instagram: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [whitelist, setWhitelist] = useState(0)

  const heroBgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      if (heroBgRef.current) {
        const y = window.scrollY
        if (y < window.innerHeight) {
          heroBgRef.current.style.transform = `scale(1.08) translateY(${y * 0.08}px)`
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Fetch whitelist count
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/whitelist/count')
        const data = await res.json()
        setWhitelist(data.count || 0)
      } catch (err) {
        setWhitelist(509) // fallback
      }
    }
    fetchCount()
  }, [success])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/whitelist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Submission failed')
        setLoading(false)
        return
      }

      setSuccess(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        instagram: '',
      })

      setTimeout(() => {
        setModalOpen(false)
        setSuccess(false)
      }, 3000)
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-[26px] transition-all duration-500 ${
          scrolled ? 'bg-black/55 backdrop-blur-[16px] border-b border-[#2a2a2a]' : ''
        }`}
      >
        <div className="font-serif text-xl font-medium tracking-widest">
          TONNANO<span className="text-[#ff6a00]">.</span>
        </div>
        <nav className="hidden md:flex gap-12">
          <a href="#collection" className="text-xs tracking-wider text-[#8a8a8a] hover:text-white transition-colors">
            COLLECTION
          </a>
          <a href="#about" className="text-xs tracking-wider text-[#8a8a8a] hover:text-white transition-colors">
            INNER CODE
          </a>
          <a href="#whitelist" className="text-xs tracking-wider text-[#8a8a8a] hover:text-white transition-colors">
            WHITELIST
          </a>
        </nav>
        <button
          onClick={() => setModalOpen(true)}
          className="text-xs tracking-widest border border-[#ff6a00] text-[#ff6a00] px-[22px] py-[10px] hover:bg-[#ff6a00] hover:text-black transition-all"
        >
          JOIN WHITELIST
        </button>
      </header>

      {/* Hero */}
      <section className="relative h-screen min-h-[680px] flex items-end overflow-hidden pt-[26px]">
        <div
          ref={heroBgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${images.g6}')`,
            filter: 'brightness(0.55) saturate(0.9)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/85" />

        <div className="relative z-10 px-[5vw] pb-[7vw] w-full">
          <div className="text-[#ff6a00] text-xs tracking-widest uppercase mb-[18px] font-serif">
            EST. 2024 — MADE IN MOROCCO
          </div>
          <h1 className="font-serif text-7xl font-medium leading-tight mb-[28px]">
            True Luxury
            <br />
            Is In The <em className="text-[#ff6a00]">Details</em>
          </h1>
          <p className="max-w-[480px] text-[#cfcfcf] font-light text-lg leading-relaxed mb-[40px]">
            TONNANO is a private capsule label. Each drop is limited, numbered, and released once — to those on the
            inside. The next chapter, "Inner Code," opens soon.
          </p>

          <div className="flex items-center gap-7 mb-12">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#ff6a00] text-black text-xs tracking-widest uppercase px-[38px] py-[18px] hover:translate-y-[-3px] hover:shadow-lg transition-transform"
            >
              Join the Whitelist
            </button>
            <span className="text-xs tracking-widest text-[#8a8a8a] uppercase">
              No. 004 — Whitelist Now Open
            </span>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="relative py-[140px] px-[5vw]">
        <div className="mb-20">
          <div className="text-[#ff6a00] text-xs tracking-widest uppercase mb-5">The Archive</div>
          <h2 className="font-serif text-5xl font-medium mb-5">Past Codes, Present Craft</h2>
          <p className="text-[#8a8a8a] max-w-[520px] font-light leading-relaxed">
            Every TONNANO piece is a chapter — embroidered, washed, and finished by hand in Morocco. The whitelist
            grants early access to the next one.
          </p>
        </div>

        <div className="grid grid-cols-6 gap-[18px]">
          {[
            { col: 3, row: 2, img: 'g6', title: 'Inner Code' },
            { col: 3, row: 1, img: 'g2', title: 'Time Builds Legends' },
            { col: 3, row: 1, img: 'g3', title: 'Mauve Edition' },
            { col: 2, row: 1, img: 'g1', title: 'Code Snake 009' },
            { col: 2, row: 1, img: 'g5', title: 'Taupe Edition' },
            { col: 2, row: 1, img: 'g4', title: 'Est. 2026' },
            { col: 3, row: 1, img: 'g8', title: 'Archive Cut' },
            { col: 3, row: 1, img: 'g7', title: 'Code Snake 009 — II' },
            { col: 2, row: 1, img: 'g9', title: 'The Quiet Mark' },
            { col: 6, row: 1, img: 'g10', title: 'Inner Circle' },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden bg-[#121212] hover:shadow-xl transition-all cursor-pointer`}
              style={{
                gridColumn: `span ${card.col}`,
                aspectRatio: card.col === 6 ? '21/9' : card.col > 2.5 ? '3/4' : '4/3',
              }}
            >
              <img
                src={images[card.img as keyof typeof images]}
                alt={card.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-900"
              />
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-[140px] px-[5vw]">
        <div className="grid grid-cols-2 gap-20 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={images.about} alt="TONNANO editorial" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="w-1 h-[90px] bg-gradient-to-b from-[#ff6a00] to-transparent mb-8" />
            <div className="text-[#ff6a00] text-xs tracking-widest uppercase mb-4">Inner Code</div>
            <p className="font-light text-[#d8d8d8] text-lg leading-relaxed mb-6">
              <strong className="text-white font-medium">TONNANO was built on a single idea:</strong> that luxury is
              not loud. It is felt in weight, in stitch count, in the thread that nobody else notices.
            </p>
            <p className="font-light text-[#d8d8d8] text-lg leading-relaxed mb-6">
              Every garment carries a hidden architecture — an arch, a line, a code stitched into the lining. Made in
              Morocco, in small batches, for a small number of people who were already paying attention.
            </p>
            <p className="text-[#8a8a8a] text-sm font-light">No restocks. No wide releases. Just the whitelist.</p>
          </div>
        </div>
      </section>

      {/* Whitelist CTA */}
      <section id="whitelist" className="relative py-[140px] px-[5vw] text-center border-t border-b border-[#2a2a2a]">
        <div className="text-[#ff6a00] text-xs tracking-widest uppercase mb-6">Capsule 05 — Coming Soon</div>
        <h2 className="font-serif text-5xl font-medium mb-6">Request Your Inner Code</h2>
        <p className="text-[#8a8a8a] max-w-[480px] mx-auto mb-10 font-light leading-relaxed">
          Sign up below to be notified the moment the next drop opens. Whitelist members get a 24-hour head start
          before public release.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#ff6a00] text-black text-xs tracking-widest uppercase px-[38px] py-[18px] inline-block hover:translate-y-[-3px] transition-transform"
        >
          Join the Whitelist
        </button>
        <div className="mt-8 inline-block text-xs tracking-widest text-[#8a8a8a] uppercase">
          Join <span className="text-[#ff6a00] font-semibold">{whitelist}</span> others already on the list
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-[5vw] border-t border-[#2a2a2a]">
        <div className="flex justify-between flex-wrap gap-10 mb-12">
          <div className="font-serif text-2xl tracking-widest">
            TONNANO<span className="text-[#ff6a00]">.</span>
          </div>
          <div className="flex gap-20 flex-wrap">
            <div>
              <h4 className="text-xs tracking-widest text-[#8a8a8a] uppercase mb-4">House</h4>
              <a href="#about" className="block text-sm text-[#d8d8d8] mb-2 hover:text-[#ff6a00] transition-colors">
                Inner Code
              </a>
              <a href="#collection" className="block text-sm text-[#d8d8d8] hover:text-[#ff6a00] transition-colors">
                Archive
              </a>
            </div>
            <div>
              <h4 className="text-xs tracking-widest text-[#8a8a8a] uppercase mb-4">Connect</h4>
              <a href="#" className="block text-sm text-[#d8d8d8] mb-2 hover:text-[#ff6a00] transition-colors">
                Instagram
              </a>
              <a href="#" className="block text-sm text-[#d8d8d8] hover:text-[#ff6a00] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-[#555] border-t border-[#2a2a2a] pt-6 flex-wrap gap-4">
          <span>© 2026 TONNANO. Made in Morocco.</span>
          <span>True Luxury Is In The Details.</span>
          <span>
            Design — <span className="text-[#ff6a00]">Zariry</span>
          </span>
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[900] bg-black/78 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[560px] bg-gradient-to-b from-[#0e0e0e] to-[#050505] border border-[#2a2a2a] p-14 rounded-none"
            onClick={e => e.stopPropagation()}
          >
            {!success ? (
              <>
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-6 right-7 text-xs tracking-widest text-[#8a8a8a] hover:text-[#ff6a00]"
                >
                  Close ✕
                </button>
                <h3 className="font-serif text-3xl font-medium mb-2">Join the Whitelist</h3>
                <p className="text-[#8a8a8a] text-sm mb-9">Capsule 05 — limited access. Fields marked are required.</p>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-[18px] mb-6">
                    <div>
                      <label className="text-xs tracking-widest text-[#8a8a8a] uppercase block mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-[#2a2a2a] text-white py-2 focus:border-[#ff6a00] outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest text-[#8a8a8a] uppercase block mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-[#2a2a2a] text-white py-2 focus:border-[#ff6a00] outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-[18px] mb-6">
                    <div>
                      <label className="text-xs tracking-widest text-[#8a8a8a] uppercase block mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-[#2a2a2a] text-white py-2 focus:border-[#ff6a00] outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest text-[#8a8a8a] uppercase block mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-[#2a2a2a] text-white py-2 focus:border-[#ff6a00] outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-[18px] mb-6">
                    <div>
                      <label className="text-xs tracking-widest text-[#8a8a8a] uppercase block mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-[#2a2a2a] text-white py-2 focus:border-[#ff6a00] outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest text-[#8a8a8a] uppercase block mb-2">Instagram</label>
                      <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="@username"
                        className="w-full bg-transparent border-b border-[#2a2a2a] text-white py-2 focus:border-[#ff6a00] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-xs tracking-widest text-[#8a8a8a] uppercase block mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#2a2a2a] text-white py-2 focus:border-[#ff6a00] outline-none transition-colors"
                      required
                    />
                  </div>

                  {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#ff6a00] text-black py-[18px] text-xs tracking-widest uppercase font-medium hover:translate-y-[-2px] transition-transform disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </button>

                  <p className="mt-4 text-xs text-[#8a8a8a] text-center leading-relaxed">
                    By joining, you agree to receive drop notifications from TONNANO. Your data is never sold.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="font-serif text-3xl text-[#ff6a00] mb-4">TONNANO</div>
                <h2 className="font-serif text-4xl font-medium mb-2">Welcome To TONNANO</h2>
                <div className="text-xs tracking-widest text-[#8a8a8a] uppercase">You Are Now Officially Whitelisted</div>
                <div className="border border-[#7a3300] text-[#ff6a00] px-6 py-2 text-xs tracking-widest uppercase mt-8 inline-block">
                  Capsule 05 · Inner Circle
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
