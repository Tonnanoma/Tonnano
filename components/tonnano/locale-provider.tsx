'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getMessages, isLocale, localeNames, locales, rtlLocales, type Locale, type Messages } from '@/lib/i18n'

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; messages: Messages; localeNames: typeof localeNames }
const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  useEffect(() => {
    const saved = document.cookie.match(/(?:^|; )tonnano_locale=([^;]+)/)?.[1]
    const browser = navigator.language.split('-')[0]
    const next = saved && isLocale(saved) ? saved : isLocale(browser) ? browser : 'en'
    setLocaleState(next)
  }, [])
  const setLocale = (next: Locale) => {
    setLocaleState(next)
    document.cookie = `tonnano_locale=${next}; path=/; max-age=31536000; samesite=lax`
  }
  const value = useMemo(() => ({ locale, setLocale, messages: getMessages(locale), localeNames }), [locale])
  return <LocaleContext.Provider value={value}><div dir={rtlLocales.includes(locale) ? 'rtl' : 'ltr'}>{children}</div></LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used inside LocaleProvider')
  return context
}

export { locales }
