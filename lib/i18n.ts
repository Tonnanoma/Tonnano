export const locales = ['en', 'fr', 'ar', 'es', 'de', 'it', 'pt', 'nl', 'tr', 'zh', 'ja', 'ru'] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: 'English', fr: 'Français', ar: 'العربية', es: 'Español', de: 'Deutsch', it: 'Italiano', pt: 'Português', nl: 'Nederlands', tr: 'Türkçe', zh: '中文', ja: '日本語', ru: 'Русский',
}

export const rtlLocales: Locale[] = ['ar']

export type Messages = typeof import('@/messages/en.json')

export async function getMessages(locale: Locale): Promise<Messages> {
  return (await import(`@/messages/${locale}.json`)).default as Messages
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}
