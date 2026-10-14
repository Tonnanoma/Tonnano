'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export const LOCALES = [
  ['en', 'English'], ['fr', 'Français'], ['ar', 'العربية'], ['es', 'Español'],
  ['hi', 'हिन्दी'], ['zh', '中文'], ['nl', 'Nederlands'], ['ru', 'Русский'],
] as const

type Locale = (typeof LOCALES)[number][0]
const LanguageContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({ locale: 'en', setLocale: () => undefined })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  useEffect(() => {
    const saved = window.localStorage.getItem('tonnano-locale') as Locale | null
    if (saved && LOCALES.some(([code]) => code === saved)) setLocaleState(saved)
  }, [])
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem('tonnano-locale', locale)
  }, [locale])
  const value = useMemo(() => ({ locale, setLocale: setLocaleState }), [locale])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() { return useContext(LanguageContext) }

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  return (
    <label className="inline-flex items-center gap-2 font-sans text-[0.6rem] tracking-wide-lux text-foreground/55">
      <span className="sr-only">Language</span>
      <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)} className="cursor-pointer appearance-none bg-transparent text-inherit outline-none">
        {LOCALES.map(([code, label]) => <option key={code} value={code} className="bg-black text-white">{label}</option>)}
      </select>
    </label>
  )
}
