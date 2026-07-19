'use client'

import { cn } from '@/lib/utils'
import { WhitelistFormInput, WhitelistResponse } from '@/lib/supabase/types'
import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { EASE } from './animation'
import { Reveal } from './reveal'

const FIELDS = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'country', label: 'Country', type: 'text', required: true },
  { name: 'city', label: 'City', type: 'text', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  {
    name: 'instagram',
    label: 'Instagram Username (Optional)',
    type: 'text',
    required: false,
    full: true,
  },
] as const

const WELCOME_WORDS = ['Welcome', 'To', 'TONNANO']

// Soft orange embers that bloom once around the seal on success —
// restrained and brief, so it reads as premium rather than a confetti drop.
function SuccessEmbers() {
  const embers = Array.from({ length: 10 }).map((_, i) => {
    const angle = (i / 10) * Math.PI * 2
    return {
      x: Math.cos(angle) * (60 + (i % 3) * 14),
      y: Math.sin(angle) * (60 + (i % 3) * 14),
      delay: 0.15 + (i % 4) * 0.05,
    }
  })

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 h-0 w-0" aria-hidden>
      {embers.map((e, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.9, 0], x: e.x, y: e.y, scale: [0.5, 1, 0.3] }}
          transition={{ duration: 1.3, delay: e.delay, ease: EASE as any }}
        />
      ))}
    </div>
  )
}

export function Whitelist() {
  const formRef = useRef<HTMLFormElement>(null)
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [memberId, setMemberId] = useState<string | null>(null)
  const [arrivalPulse, setArrivalPulse] = useState(false)

  // Triggered by the navbar/hero "Join The Whitelist" CTA once its
  // custom eased scroll settles here — a brief glow confirms arrival.
  useEffect(() => {
    const handleArrival = () => {
      setArrivalPulse(true)
      window.setTimeout(() => setArrivalPulse(false), 1500)
    }
    window.addEventListener('tonnano:arrived-whitelist', handleArrival)
    return () => window.removeEventListener('tonnano:arrived-whitelist', handleArrival)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!agreed) {
      setError('Please agree to receive updates from TONNANO.')
      return
    }

    if (!formRef.current) return

    setError('')
    setIsLoading(true)

    try {
      // Collect form data
      const formData = new FormData(formRef.current)
      const data: WhitelistFormInput = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        country: formData.get('country') as string,
        city: formData.get('city') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        instagram: (formData.get('instagram') as string) || undefined,
      }

      // Submit to API endpoint
      const response = await fetch('/api/whitelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: WhitelistResponse = await response.json()

      if (!response.ok) {
        setError(result.error || 'An error occurred. Please try again.')
        setIsLoading(false)
        return
      }

      // Only show success if database insert was successful
      if (result.data?.member_id) {
        setMemberId(result.data.member_id)
        setSubmitted(true)
      } else {
        setError('An error occurred. Please try again.')
      }
      setIsLoading(false)
    } catch (err) {
      console.error('Form submission error:', err)
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <section id="whitelist" className="relative bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-xl px-5 sm:px-8">
        <Reveal>
          <motion.div
            className="relative border border-border bg-secondary/30 p-7 backdrop-blur-sm sm:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            animate={
              arrivalPulse
                ? { boxShadow: '0 0 0 1px rgba(243,107,33,0.55), 0 30px 80px -30px rgba(0,0,0,0.9)' }
                : { boxShadow: '0 0 0 0px rgba(243,107,33,0), 0 30px 80px -30px rgba(0,0,0,0.9)' }
            }
            transition={{ duration: 0.6, ease: EASE as any }}
          >
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/10" />
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE as any }}
                  className="relative flex flex-col items-center py-8 text-center"
                >
                  <SuccessEmbers />

                  {/* Drawn seal — the ring traces itself, then the check strokes in */}
                  <motion.span
                    className="relative flex h-16 w-16 items-center justify-center"
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.05 }}
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full border border-primary/50"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: [0, 0.5, 0], scale: [1, 1.7, 2.1] }}
                      transition={{ duration: 1.8, ease: 'easeOut', delay: 1.1, repeat: Infinity, repeatDelay: 1.4 }}
                    />
                    <svg
                      viewBox="0 0 64 64"
                      className="absolute inset-0 h-full w-full -rotate-90"
                      aria-hidden
                    >
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="29"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        className="text-primary"
                        strokeDasharray="182"
                        initial={{ strokeDashoffset: 182 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 0.9, ease: EASE as any, delay: 0.1 }}
                      />
                    </svg>
                    <motion.svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none">
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: EASE as any, delay: 0.75 }}
                      />
                    </motion.svg>
                  </motion.span>

                  <h3 className="mt-8 flex flex-wrap items-center justify-center gap-x-2 font-serif text-3xl text-foreground sm:text-4xl">
                    {WELCOME_WORDS.map((word, i) => (
                      <motion.span
                        key={word}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE as any, delay: 1.0 + i * 0.12 }}
                        className={word === 'TONNANO' ? 'text-primary' : undefined}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h3>

                  <motion.p
                    className="mt-4 font-sans text-sm leading-relaxed text-foreground/65"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE as any, delay: 1.5 }}
                  >
                    You are now part of the Inner Code. Your founding member
                    status is reserved ahead of Drop 01.
                  </motion.p>

                  <motion.div
                    className="relative mt-9 overflow-hidden border border-border px-8 py-5"
                    style={{ perspective: 800 }}
                    initial={{ opacity: 0, rotateX: -35, y: 10 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    transition={{ duration: 0.65, ease: EASE as any, delay: 1.75 }}
                  >
                    <motion.span
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary/15 to-transparent"
                      initial={{ x: '-120%' }}
                      animate={{ x: '260%' }}
                      transition={{ duration: 1.1, ease: EASE as any, delay: 2.15 }}
                    />
                    <p className="font-sans text-[0.6rem] tracking-wide-lux text-foreground/45">
                      MEMBER ID
                    </p>
                    <p className="mt-2 font-sans text-2xl tracking-luxury text-primary">
                      {memberId || 'TN-000000'}
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center">
                    <h2 className="font-serif text-4xl text-foreground sm:text-5xl">
                      Join The Inner Code
                    </h2>
                    <p className="mt-4 font-sans text-sm text-foreground/60">
                      Limited to the first 1,000 founding members.
                    </p>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
                    noValidate
                  >
                    {FIELDS.map((f) => (
                      <div
                        key={f.name}
                        className={cn(
                          'flex flex-col gap-2',
                          'full' in f && f.full && 'sm:col-span-2',
                        )}
                      >
                        <label
                          htmlFor={f.name}
                          className="font-sans text-[0.6rem] tracking-wide-lux text-foreground/45"
                        >
                          {f.label.toUpperCase()}
                        </label>
                        <input
                          id={f.name}
                          name={f.name}
                          type={f.type}
                          required={f.required}
                          autoComplete="off"
                          disabled={isLoading}
                          className="border-0 border-b border-border bg-transparent pb-2 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-primary disabled:opacity-50"
                        />
                      </div>
                    ))}

                    <label className="col-span-1 mt-2 flex cursor-pointer items-start gap-3 sm:col-span-2">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={agreed}
                        onClick={() => setAgreed((v) => !v)}
                        disabled={isLoading}
                        className={cn(
                          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-colors',
                          agreed
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-transparent',
                          isLoading && 'opacity-50 cursor-not-allowed',
                        )}
                      >
                        {agreed && <Check className="h-3 w-3" strokeWidth={2.5} />}
                      </button>
                      <span className="font-sans text-xs leading-relaxed text-foreground/60">
                        I agree to receive exclusive updates from TONNANO.
                      </span>
                    </label>

                    {error && (
                      <p className="col-span-1 font-sans text-xs text-destructive sm:col-span-2">
                        {error}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="col-span-1 mt-3 border border-primary bg-primary py-4 font-sans text-[0.7rem] tracking-wide-lux text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isLoading ? (
                        <motion.span
                          className="inline-flex items-center gap-2"
                          initial={{ opacity: 0.6 }}
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          JOINING...
                        </motion.span>
                      ) : (
                        'JOIN THE INNER CODE'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
