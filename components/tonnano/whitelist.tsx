'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { type FormEvent, useState } from 'react'
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

export function Whitelist() {
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!agreed) {
      setError('Please agree to receive updates from TONNANO.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section id="whitelist" className="relative bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-xl px-5 sm:px-8">
        <Reveal>
          <div className="relative border border-border bg-secondary/30 p-7 backdrop-blur-sm sm:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/10" />
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary text-primary">
                    <Check className="h-6 w-6" strokeWidth={1.2} />
                  </span>
                  <h3 className="mt-8 font-serif text-3xl text-foreground sm:text-4xl">
                    Welcome To TONNANO
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/65">
                    You are now part of the Inner Code. Your founding member
                    status is reserved ahead of Drop 01.
                  </p>
                  <div className="mt-9 border border-border px-8 py-5">
                    <p className="font-sans text-[0.6rem] tracking-wide-lux text-foreground/45">
                      MEMBER ID
                    </p>
                    <p className="mt-2 font-sans text-2xl tracking-luxury text-primary">
                      #000427
                    </p>
                  </div>
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
                          className="border-0 border-b border-border bg-transparent pb-2 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-primary"
                        />
                      </div>
                    ))}

                    <label className="col-span-1 mt-2 flex cursor-pointer items-start gap-3 sm:col-span-2">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={agreed}
                        onClick={() => setAgreed((v) => !v)}
                        className={cn(
                          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-colors',
                          agreed
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-transparent',
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

                    <button
                      type="submit"
                      className="col-span-1 mt-3 border border-primary bg-primary py-4 font-sans text-[0.7rem] tracking-wide-lux text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary sm:col-span-2"
                    >
                      JOIN THE INNER CODE
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
