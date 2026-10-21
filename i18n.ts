import { notFound } from 'next/navigation'

export const locales = [
  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr', font: 'latin' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr', font: 'latin' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl', font: 'arabic' },
  { code: 'nl', nativeName: 'Nederlands', englishName: 'Dutch', dir: 'ltr', font: 'latin' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr', font: 'latin' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr', font: 'latin' },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr', font: 'latin' },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr', font: 'latin' },
  { code: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', dir: 'ltr', font: 'latin-ext' },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr', font: 'cyrillic' },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese', dir: 'ltr', font: 'cjk' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr', font: 'cjk' },
  { code: 'ary', nativeName: 'الدارجة', englishName: 'Moroccan Arabic', dir: 'rtl', font: 'arabic' },
] as const

export type Locale = (typeof locales)[number]['code']
export const localeCodes = locales.map(({ code }) => code) as [Locale, ...Locale[]]
export const defaultLocale: Locale = 'en'
export const rtlLocales: Locale[] = ['ar', 'ary']

export function isLocale(value: string): value is Locale {
  return localeCodes.includes(value as Locale)
}

export function getLocaleConfig(locale: Locale) {
  return locales.find((item) => item.code === locale)!
}

export async function getMessages(locale: string) {
  if (!isLocale(locale)) notFound()
  return (await import(`./messages/${locale}.json`)).default
}
