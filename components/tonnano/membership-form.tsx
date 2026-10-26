'use client'

import { FormEvent, useState } from 'react'

export function MembershipForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (step === 1) {
      const values = new FormData(form)
      if (!values.get('firstName') || !values.get('lastName') || !String(values.get('email')).includes('@')) { setError('Please complete your name and a valid email.'); return }
      setError(''); setStep(2); return
    }
    if (!(form.elements.namedItem('consent') as HTMLInputElement)?.checked) { setError('Please accept the membership terms.'); return }
    setError(''); setSubmitted(true)
  }
  if (submitted) return <div className="border border-primary/40 bg-primary/5 p-8 text-center"><p className="font-serif text-3xl">You are in.</p><p className="mt-3 text-sm text-foreground/60">Your founding member request has been received.</p></div>
  return <form id="join" onSubmit={next} className="mt-12 space-y-5" noValidate>
    <div className="mb-8 flex items-center gap-2" aria-label={`Step ${step} of 2`}><span className={`h-px flex-1 ${step >= 1 ? 'bg-primary' : 'bg-border'}`} /><span className={`h-px flex-1 ${step >= 2 ? 'bg-primary' : 'bg-border'}`} /></div>
    {step === 1 ? <div className="grid gap-5 sm:grid-cols-2"><label className="field"><span>First name</span><input name="firstName" required /></label><label className="field"><span>Last name</span><input name="lastName" required /></label><label className="field sm:col-span-2"><span>Email</span><input name="email" type="email" required /></label></div> : <div className="grid gap-5 sm:grid-cols-2"><label className="field"><span>Country</span><input name="country" required /></label><label className="field"><span>City</span><input name="city" required /></label><label className="field"><span>Phone</span><input name="phone" type="tel" required /></label><label className="field"><span>Instagram (optional)</span><input name="instagram" /></label><label className="flex items-start gap-3 text-xs leading-5 text-foreground/60 sm:col-span-2"><input name="consent" type="checkbox" className="mt-1 accent-primary" /> I agree to receive TONNANO membership updates.</label></div>}
    {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
    <div className="flex gap-3"><button type="submit" className="min-h-11 bg-primary px-7 text-[0.65rem] tracking-wide-lux text-primary-foreground">{step === 1 ? 'CONTINUE' : 'JOIN THE INNER CODE'}</button>{step === 2 && <button type="button" onClick={() => setStep(1)} className="min-h-11 border border-border px-7 text-[0.65rem] tracking-wide-lux">BACK</button>}</div>
  </form>
}
