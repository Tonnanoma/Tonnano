export const locales = [
  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr', intl: 'en' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr', intl: 'fr' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl', intl: 'ar-MA' },
  { code: 'nl', nativeName: 'Nederlands', englishName: 'Dutch', dir: 'ltr', intl: 'nl' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr', intl: 'es' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr', intl: 'de' },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr', intl: 'it' },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr', intl: 'pt' },
  { code: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', dir: 'ltr', intl: 'tr' },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr', intl: 'ru' },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese', dir: 'ltr', intl: 'zh-CN' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr', intl: 'ja' },
  { code: 'ary', nativeName: 'الدارجة', englishName: 'Darija', dir: 'rtl', intl: 'ar-MA' },
] as const

export type LocaleCode = (typeof locales)[number]['code']

export const defaultLocale: LocaleCode = 'en'

export function getLocaleByCode(code: string | null | undefined) {
  return locales.find((locale) => locale.code === code) ?? locales[0]
}
