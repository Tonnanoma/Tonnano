import { notFound } from 'next/navigation'

export const locales = ['en', 'fr', 'ar', 'nl', 'es', 'de', 'it', 'pt', 'tr', 'ru', 'zh', 'ja', 'ary'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
export const rtlLocales: Locale[] = ['ar', 'ary']

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export async function getMessages(locale: string) {
  if (!isLocale(locale)) notFound()
  return (await import(`./messages/${locale}.json`)).default
}
